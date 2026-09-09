import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, project, goal, lang } = data;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      // Очищаем номер для прямой ссылки в WhatsApp
      const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
      const clientWaUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : '';

      // Текущее бишкекское время (UTC+6)
      const bishkekTime = new Date().toLocaleTimeString('ru-RU', {
        timeZone: 'Asia/Bishkek',
        hour: '2-digit',
        minute: '2-digit',
      });

      const messageHtml =
        `🏛 <b>НОВАЯ ЗАЯВКА С САЙТА EL ORDO GROUP</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 <b>Клиент:</b> ${name || 'Не указано'}\n` +
        `📞 <b>Телефон:</b> <code>${phone}</code>\n` +
        `🏢 <b>Интересует:</b> ${project}\n` +
        `🎯 <b>Цель:</b> ${goal}\n` +
        `🌐 <b>Язык интерфейса:</b> ${lang?.toUpperCase() || 'RU'}\n` +
        `⏰ <b>Время (Бишкек):</b> ${bishkekTime}\n` +
        `━━━━━━━━━━━━━━━━━━`;

      // Добавляем интерактивные кнопки прямо под сообщением в Telegram
      const replyMarkup = clientWaUrl
        ? {
            inline_keyboard: [
              [
                { text: '💬 Открыть диалог в WhatsApp', url: clientWaUrl },
              ],
            ],
          }
        : undefined;

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