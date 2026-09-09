import { NextResponse } from 'next/server';

// Защита от частых запросов с одного IP (до 4 заявок за 5 минут)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
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

// Экранирование спецсимволов для безопасности Telegram HTML
function escapeHtml(str: string = ''): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: Request) {
  try {
    // Получаем реальный IP клиента
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    // 1. Проверка на частоту запросов (Anti-flood)
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { success: false, error: 'Слишком много запросов. Подождите 5 минут.' },
        { status: 429 }
      );
    }

    const data = await req.json();
    const { name, phone, project, goal, lang, website } = data;

    // 2. Honeypot-ловушка: если скрытое поле заполнено ботом, делаем вид, что всё ок
    if (website && website.trim().length > 0) {
      console.warn(`[SPAM BLOCKED] Honeypot сработал для IP ${clientIp}`);
      return NextResponse.json({ success: true });
    }

    // 3. Валидация номера телефона
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
    if (!cleanPhone || cleanPhone.length < 9 || cleanPhone.length > 15) {
      return NextResponse.json(
        { success: false, error: 'Некорректный формат номера телефона' },
        { status: 400 }
      );
    }

    // 4. Валидация имени (не длиннее 80 символов)
    const safeName = escapeHtml((name || '').trim().slice(0, 80)) || 'Не указано';
    const safeProject = escapeHtml(project || 'Не выбран');
    const safeGoal = escapeHtml(goal || 'Консультация');
    const safeLang = escapeHtml(lang?.toUpperCase() || 'RU');

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const clientWaUrl = `https://wa.me/${cleanPhone}`;

      // Время по Бишкеку (UTC+6)
      const bishkekTime = new Date().toLocaleTimeString('ru-RU', {
        timeZone: 'Asia/Bishkek',
        hour: '2-digit',
        minute: '2-digit',
      });

      const messageHtml =
        `🏛 <b>НОВАЯ ЗАЯВКА С САЙТА EL ORDO GROUP</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 <b>Клиент:</b> ${safeName}\n` +
        `📞 <b>Телефон:</b> <code>${phone}</code>\n` +
        `🏢 <b>Интересует:</b> ${safeProject}\n` +
        `🎯 <b>Цель:</b> ${safeGoal}\n` +
        `🌐 <b>Язык интерфейса:</b> ${safeLang}\n` +
        `⏰ <b>Время (Бишкек):</b> ${bishkekTime}\n` +
        `━━━━━━━━━━━━━━━━━━`;

      const replyMarkup = {
        inline_keyboard: [
          [
            { text: '💬 Открыть диалог в WhatsApp', url: clientWaUrl },
          ],
        ],
      };

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageHtml,
          parse_mode: 'HTML',
          reply_markup: replyMarkup,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API lead error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}