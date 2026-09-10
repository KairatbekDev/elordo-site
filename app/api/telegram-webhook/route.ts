// app/api/telegram-webhook/route.ts
import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SALES_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  'https://elordo-site.vercel.app';

// База доступных для отправки документов и буклетов
interface MaterialInfo {
  title: string;
  caption: string;
  // URL к файлу на сайте (в public/docs/...) или прямой file_id в Telegram
  fileUrl: string;
  fileName: string;
}

const MATERIALS: Record<string, MaterialInfo> = {
  abudhabi_pdf: {
    title: 'ЖК Abu Dhabi • Официальная презентация и планировки',
    caption:
      '🏢 <b>ЖК Abu Dhabi (ул. Сухомлинова, 29)</b>\n\n' +
      'Две 25-этажные башни премиум-класса с панорамой на Ала-Тоо.\n' +
      '• Потолки: 3.45 м\n' +
      '• Рассрочка: 0% до 40 месяцев без участия банка\n' +
      '• Trade-in: зачет авто и недвижимости\n\n' +
      'В прикрепленном файле: полная шахматка площадей, инженерные спецификации и рендеры холлов.',
    fileUrl: `${SITE_URL}/projects/Abu-Dhabi.png`, // Замените на прямой путь к PDF в public/docs/
    fileName: 'Abu-Dhabi-Presentation.pdf',
  },
  madina_pdf: {
    title: 'ЖК Madina Residence • Презентация бизнес-класса',
    caption:
      '🏛 <b>ЖК Madina Residence (ул. Огонбаева, 12)</b>\n\n' +
      'Статусный комплекс в историческом и деловом центре столицы.\n' +
      '• Закрытый двор без машин\n' +
      '• Центральные городские коммуникации\n' +
      '• Сдача: 2027 г. 3 квартал\n\n' +
      'В документе: поэтажные планы, варианты отделки и график оплат 0%.',
    fileUrl: `${SITE_URL}/projects/Madina-Residense.png`,
    fileName: 'Madina-Residence-Presentation.pdf',
  },
  ajkol_plus_pdf: {
    title: 'ЖД Айкол+ • Буклет клубного дома в Кок-Жаре',
    caption:
      '🌲 <b>ЖД Айкол + (с. Кок-Жар, ул. Баялинова, 6)</b>\n\n' +
      'Клубный дом повышенной комфортности в экологическом предгорье.\n' +
      '• Чистейший горный воздух\n' +
      '• 10 этажей, монолит-жженый кирпич\n' +
      '• Цены: от $1 100 / м²\n\n' +
      'В файле: генеральный план территории, планировки 1-2-3 комнатных квартир.',
    fileUrl: `${SITE_URL}/projects/Aikolplus.png`,
    fileName: 'Aikol-Plus-Presentation.pdf',
  },
  investor_deck: {
    title: 'Инвестиционный меморандум EL ORDO GROUP',
    caption:
      '📈 <b>Инвестиции в недвижимость Бишкека • EL ORDO GROUP</b>\n\n' +
      '• Прирост капитала за цикл строительства: <b>+25% – 35%</b>\n' +
      '• Средняя валютная доходность от аренды: <b>8% – 11% годовых</b>\n' +
      '• Возможность выхода из сделки по переуступке (цессии)\n\n' +
      'В меморандуме: финансовые модели капитализации, динамика цен за м² и юридическая структура сделки.',
    fileUrl: `${SITE_URL}/projects/Abu-Dhabi.png`,
    fileName: 'EL-ORDO-Investor-Deck.pdf',
  },
  legal_pack: {
    title: 'Юридический аудит-пакет застройщика',
    caption:
      '⚖️ <b>Юридическая чистота объектов EL ORDO GROUP</b>\n\n' +
      '• Государственная строительная лицензия Госстроя КР\n' +
      '• Государственные акты на частную собственность (Красные книги)\n' +
      '• Положительные заключения государственной сейсмоэкспертизы (9 баллов)\n' +
      '• Типовой договор долевого участия (ДДУ)',
    fileUrl: `${SITE_URL}/projects/Abu-Dhabi.png`,
    fileName: 'EL-ORDO-Legal-Documents.pdf',
  },
};

// Отправка текстового сообщения через Telegram Bot API
async function sendTelegramMessage(chatId: number | string, text: string, replyMarkup?: object) {
  if (!BOT_TOKEN) return;
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: replyMarkup,
      disable_web_page_preview: false,
    }),
  }).catch((e) => console.error('Telegram sendMessage error:', e));
}

// Отправка документа (PDF) пользователю
async function sendTelegramDocument(
  chatId: number | string,
  documentUrl: string,
  caption: string,
  replyMarkup?: object
) {
  if (!BOT_TOKEN) return;
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      document: documentUrl,
      caption,
      parse_mode: 'HTML',
      reply_markup: replyMarkup,
    }),
  }).catch((e) => console.error('Telegram sendDocument error:', e));
}

export async function POST(req: Request) {
  try {
    if (!BOT_TOKEN) {
      return NextResponse.json({ error: 'TELEGRAM_BOT_TOKEN is not set' }, { status: 500 });
    }

    const update = await req.json();

    // Обрабатываем только текстовые входящие сообщения
    if (!update?.message?.text) {
      return NextResponse.json({ ok: true });
    }

    const message = update.message;
    const chatId = message.chat.id;
    const text = message.text.trim();
    const userFrom = message.from;
    const username = userFrom?.username ? `@${userFrom.username}` : 'Без username';
    const fullName = [userFrom?.first_name, userFrom?.last_name].filter(Boolean).join(' ') || 'Клиент';

    // 1. ОБРАБОТКА ДИПЛИНКОВ: /start <payload>
    if (text.startsWith('/start')) {
      const parts = text.split(' ');
      const payload = parts[1]?.toLowerCase().trim();

      const material = payload ? MATERIALS[payload] : null;

      if (material) {
        // Кнопки под выданным документом
        const replyMarkup = {
          inline_keyboard: [
            [
              {
                text: '💬 Задать вопрос в WhatsApp',
                url: `https://wa.me/996709115115?text=${encodeURIComponent(
                  `Здравствуйте! Изучаю документ «${material.title}» из Telegram-бота. Хочу уточнить наличие свободных квартир.`
                )}`,
              },
            ],
            [
              {
                text: '🌐 Открыть сайт EL ORDO',
                url: SITE_URL,
              },
              {
                text: '📞 Позвонить в офис',
                url: 'https://t.me/elordo_crm_bot?start=call_request',
              },
            ],
          ],
        };

        // Отправляем запрошенный PDF пользователю
        await sendTelegramDocument(chatId, material.fileUrl, material.caption, replyMarkup);

        // Уведомляем отдел продаж о скачивании презентации целевым клиентом
        if (SALES_CHAT_ID) {
          const leadNotification =
            `🔥 <b>Скачивание презентации из Telegram-бота!</b>\n\n` +
            `👤 <b>Клиент:</b> ${fullName} (${username})\n` +
            `🆔 <b>ID пользователя:</b> <code>${userFrom?.id}</code>\n` +
            `📄 <b>Материал:</b> ${material.title}\n` +
            `⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Bishkek' })}\n\n` +
            `<i>Клиент проявил интерес к объекту, напишите ему в Telegram при наличии диалога.</i>`;

          await sendTelegramMessage(SALES_CHAT_ID, leadNotification, {
            inline_keyboard: userFrom?.username
              ? [[{ text: '💬 Написать клиенту в Telegram', url: `https://t.me/${userFrom.username}` }]]
              : undefined,
          });
        }

        return NextResponse.json({ ok: true });
      }

      // 2. ДЕФОЛТНОЕ ПРИВЕТСТВИЕ (если пользователь зашел без параметров)
      const welcomeText =
        `Здравствуйте, <b>${fullName}</b>!\n\n` +
        `Добро пожаловать в официальный бот строительной компании <b>EL ORDO GROUP</b> (г. Бишкек).\n\n` +
        `Выберите интересующий вас раздел или скачайте официальные материалы по нашим объектам:`;

      const defaultKeyboard = {
        inline_keyboard: [
          [
            { text: '🏢 Каталог ЖК Abu Dhabi (Премиум)', url: `${SITE_URL}/abu-dhabi` },
          ],
          [
            { text: '🏛 Каталог ЖК Madina Residence', url: `${SITE_URL}/madina-residence` },
          ],
          [
            { text: '🌲 Эко-дома Айкол и Айкол+', url: `${SITE_URL}/ajkol-plus` },
          ],
          [
            {
              text: '📑 Скачать инвест-меморандум',
              callback_data: 'get_invest',
            },
            {
              text: '⚖️ Разрешительные документы',
              callback_data: 'get_legal',
            },
          ],
          [
            {
              text: '💬 Менеджер в WhatsApp (онлайн)',
              url: 'https://wa.me/996709115115',
            },
          ],
        ],
      };

      await sendTelegramMessage(chatId, welcomeText, defaultKeyboard);
      return NextResponse.json({ ok: true });
    }

    // Всегда возвращаем HTTP 200, чтобы Telegram не повторял запросы бесконечно
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook runtime error:', error);
    return NextResponse.json({ ok: true });
  }
}