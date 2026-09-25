import { NextResponse } from 'next/server';

// Хранилище лимитов с автоматической очисткой (до 5 заявок за 5 минут на IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (rateLimitMap.size > 500) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 5 * 60 * 1000 });
    return false;
  }

  if (record.count >= 5) {
    return true;
  }

  record.count += 1;
  return false;
}

function escapeHtml(str: string = ''): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Нормализация номеров Кыргызстана, Казахстана, РФ и международного формата
function normalizePhoneForWhatsApp(rawDigits: string): string {
  // Кыргызстан: 0700123456 -> 996700123456
  if (rawDigits.startsWith('0') && rawDigits.length === 10) {
    return `996${rawDigits.slice(1)}`;
  }
  // Кыргызстан без кода страны: 700123456 -> 996700123456
  if (rawDigits.length === 9) {
    return `996${rawDigits}`;
  }
  // Казахстан / РФ через восьмерку: 87011234567 -> 77011234567
  if (rawDigits.startsWith('8') && rawDigits.length === 11) {
    return `7${rawDigits.slice(1)}`;
  }
  return rawDigits;
}

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || '127.0.0.1';

    // 1. Защита от спама и флуда
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { success: false, error: 'Слишком много запросов. Подождите 5 минут.' },
        { status: 429 }
      );
    }

    const data = await req.json();
    const {
      name,
      phone,
      project,
      goal,
      details,
      comment,
      budget,
      rooms,
      lang,
      website,
      source,
      utm,
    } = data;

    // 2. Honeypot-ловушка для ботов
    if (website && String(website).trim().length > 0) {
      console.warn(`[SPAM BLOCKED] Honeypot сработал для IP ${clientIp}`);
      return NextResponse.json({ success: true });
    }

    // 3. Валидация номера телефона
    const cleanPhone = phone ? String(phone).replace(/\D/g, '') : '';
    if (!cleanPhone || cleanPhone.length < 9 || cleanPhone.length > 15) {
      return NextResponse.json(
        { success: false, error: 'Некорректный формат номера телефона' },
        { status: 400 }
      );
    }

    const waPhone = normalizePhoneForWhatsApp(cleanPhone);
    const clientWaUrl = `https://wa.me/${waPhone}`;

    // 4. Санитизация полей
    const safeName = escapeHtml(String(name || '').trim().slice(0, 80)) || 'Не указано';
    const safePhone = escapeHtml(String(phone || '').trim().slice(0, 30));
    const safeProject = escapeHtml(String(project || 'Не выбран').slice(0, 80));
    const safeGoal = escapeHtml(String(goal || 'Консультация').slice(0, 80));
    const safeSource = escapeHtml(String(source || 'Сайт').slice(0, 50));
    const safeLang = escapeHtml(String(lang || 'RU').toUpperCase().slice(0, 10));

    // Дополнительные параметры (из квиза, селектора или комментариев)
    const extraDetails: string[] = [];
    if (rooms) extraDetails.push(`Планировка: <b>${escapeHtml(String(rooms))}</b>`);
    if (budget) extraDetails.push(`Бюджет: <b>${escapeHtml(String(budget))}</b>`);
    if (details) extraDetails.push(`Параметры: ${escapeHtml(String(details).slice(0, 150))}`);
    if (comment) extraDetails.push(`Комментарий: <i>${escapeHtml(String(comment).slice(0, 200))}</i>`);

    // 5. Разбор рекламных меток (UTM) для отдела маркетинга
    let marketingInfo = 'Прямой заход / Органический поиск';
    if (utm && typeof utm === 'object') {
      const utmSource = escapeHtml(utm.utm_source || '');
      const utmMedium = escapeHtml(utm.utm_medium || '');
      const utmCampaign = escapeHtml(utm.utm_campaign || '');
      const utmContent = escapeHtml(utm.utm_content || '');
      const utmTerm = escapeHtml(utm.utm_term || '');

      const parts: string[] = [];
      if (utmSource) parts.push(`Источник: <b>${utmSource}</b>`);
      if (utmMedium) parts.push(`Тип: <i>${utmMedium}</i>`);
      if (utmCampaign) parts.push(`Кампания: <code>${utmCampaign}</code>`);
      if (utmTerm) parts.push(`Ключ: <u>${utmTerm}</u>`);
      if (utmContent) parts.push(`Объявление: ${utmContent}`);

      if (parts.length > 0) {
        marketingInfo = parts.join('\n📢 ');
      }
    }

    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    // Защита для локальной разработки
    if (!token || !chatId) {
      console.warn('[LEAD API DEV] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены. Логирование заявки:', {
        safeName,
        safePhone,
        safeProject,
        safeGoal,
        safeSource,
      });

      if (process.env.NODE_ENV !== 'production') {
        return NextResponse.json({ success: true, simulated: true });
      }

      return NextResponse.json(
        { success: false, error: 'Ошибка конфигурации сервера (Telegram)' },
        { status: 500 }
      );
    }

    // Время заявки по часовому поясу Бишкека (UTC+6)
    const bishkekDateTime = new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'Asia/Bishkek',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date());

    // Формирование структурированного сообщения для Telegram
    let messageHtml =
      `🏛 <b>НОВАЯ ЗАЯВКА • EL ORDO GROUP</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 <b>Клиент:</b> ${safeName}\n` +
      `📞 <b>Телефон:</b> <a href="tel:+${waPhone}">+${waPhone}</a> (<code>${safePhone}</code>)\n` +
      `🏢 <b>Объект:</b> <b>${safeProject}</b>\n` +
      `🎯 <b>Цель:</b> ${safeGoal}\n` +
      `📍 <b>Форма:</b> ${safeSource}\n`;

    if (extraDetails.length > 0) {
      messageHtml += `📋 <b>Детали:</b>\n• ${extraDetails.join('\n• ')}\n`;
    }

    messageHtml +=
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📢 <b>Реклама:</b>\n📢 ${marketingInfo}\n` +
      `🌐 <b>Язык сайта:</b> ${safeLang}\n` +
      `⏰ <b>Время (Бишкек):</b> ${bishkekDateTime}\n` +
      `━━━━━━━━━━━━━━━━━━━━`;

    // Инлайн-кнопка для моментального перехода в WhatsApp
    const replyMarkup = {
      inline_keyboard: [
        [
          { text: '💬 Написать клиенту в WhatsApp', url: clientWaUrl },
        ],
      ],
    };

    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageHtml,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        reply_markup: replyMarkup,
      }),
      signal: AbortSignal.timeout(7000),
    });

    if (!tgResponse.ok) {
      const errorText = await tgResponse.text();
      console.error(`[TELEGRAM API ERROR ${tgResponse.status}]:`, errorText);
      return NextResponse.json(
        { success: false, error: 'Ошибка отправки в Telegram' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API lead error:', error);
    return NextResponse.json({ success: false, error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}