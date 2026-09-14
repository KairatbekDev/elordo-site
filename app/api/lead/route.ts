import { NextResponse } from 'next/server';

// Хранилище лимитов с автоматической очисткой памяти (до 4 заявок за 5 минут на IP)
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

  if (record.count >= 4) {
    return true;
  }

  record.count += 1;
  return false;
}

// Надежное экранирование спецсимволов для Telegram HTML
function escapeHtml(str: string = ''): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Приведение номера к валидному международному формату WhatsApp (КР и СНГ)
function normalizePhoneForWhatsApp(rawDigits: string): string {
  // Если ввели 0XXX XXXXXX (10 цифр по КР) -> меняем 0 на 996
  if (rawDigits.startsWith('0') && rawDigits.length === 10) {
    return `996${rawDigits.slice(1)}`;
  }
  // Если ввели 9 цифр (709115115) -> добавляем 996
  if (rawDigits.length === 9) {
    return `996${rawDigits}`;
  }
  // Если ввели с 8 в Казахстане/РФ (87XXXXXXXXX - 11 цифр) -> меняем на 7
  if (rawDigits.startsWith('8') && rawDigits.length === 11) {
    return `7${rawDigits.slice(1)}`;
  }
  return rawDigits;
}

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '127.0.0.1');

    // 1. Защита от спама и флуда
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { success: false, error: 'Слишком много запросов. Подождите 5 минут.' },
        { status: 429 }
      );
    }

    const data = await req.json();
    const { name, phone, project, goal, lang, website } = data;

    // 2. Honeypot-ловушка для спам-ботов
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

    // 4. Нормализация под прямую ссылку WhatsApp
    const waPhone = normalizePhoneForWhatsApp(cleanPhone);
    const clientWaUrl = `https://wa.me/${waPhone}`;

    // 5. Санитизация данных для Telegram HTML
    const safeName = escapeHtml(String(name || '').trim().slice(0, 80)) || 'Не указано';
    const safePhone = escapeHtml(String(phone || '').trim().slice(0, 30));
    const safeProject = escapeHtml(String(project || 'Не выбран').slice(0, 80));
    const safeGoal = escapeHtml(String(goal || 'Консультация').slice(0, 80));
    const safeLang = escapeHtml(String(lang || 'RU').toUpperCase().slice(0, 10));

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error('[CRITICAL] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены!');
      return NextResponse.json(
        { success: false, error: 'Ошибка конфигурации сервера' },
        { status: 500 }
      );
    }

    // Дата и время по Бишкеку (Asia/Bishkek)
    const bishkekDateTime = new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'Asia/Bishkek',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    const messageHtml =
      `🏛 <b>НОВАЯ ЗАЯВКА • EL ORDO GROUP</b>\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `👤 <b>Клиент:</b> ${safeName}\n` +
      `📞 <b>Телефон:</b> <code>${safePhone}</code>\n` +
      `🏢 <b>Объект:</b> ${safeProject}\n` +
      `🎯 <b>Цель:</b> ${safeGoal}\n` +
      `🌐 <b>Язык:</b> ${safeLang}\n` +
      `⏰ <b>Время (Бишкек):</b> ${bishkekDateTime}\n` +
      `━━━━━━━━━━━━━━━━━━`;

    const replyMarkup = {
      inline_keyboard: [
        [
          { text: '💬 Открыть диалог в WhatsApp', url: clientWaUrl },
        ],
      ],
    };

    // Отправка в Telegram с таймаутом 7 секунд
    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageHtml,
        parse_mode: 'HTML',
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