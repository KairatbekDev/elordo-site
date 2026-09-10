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
    fileUrl: `${SITE_URL}/projects/Abu-Dhabi.png`,
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

// Нижняя клавиатура с кнопкой запроса номера в 1 клик
const CONTACT_KEYBOARD = {
  keyboard: [
    [{ text: '📱 Отправить номер для расчета рассрочки 0%', request_contact: true }],
    [{ text: '🏢 Каталог объектов' }, { text: '📊 Рассрочка 0%' }],
    [{ text: '🚗 Trade-in (бартер)' }, { text: '📍 Офис продаж' }],
  ],
  resize_keyboard: true,
  is_persistent: true,
};

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
    const message = update?.message;

    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const userFrom = message.from;
    const username = userFrom?.username ? `@${userFrom.username}` : 'Без username';
    const fullName = [userFrom?.first_name, userFrom?.last_name].filter(Boolean).join(' ') || 'Клиент';

    // =========================================================================
    // 1. КЛИЕНТ НАЖАЛ «ОТПРАВИТЬ НОМЕР» (ПОДЕЛИЛСЯ КОНТАКТОМ В 1 КЛИК)
    // =========================================================================
    if (message.contact) {
      let phone = message.contact.phone_number;
      if (!phone.startsWith('+')) phone = `+${phone}`;
      const cleanPhone = phone.replace(/[^0-9]/g, '');

      // Подтверждение клиенту
      await sendTelegramMessage(
        chatId,
        `✅ <b>Спасибо, ${fullName}!</b>\n\n` +
        `Ваш номер <b>${phone}</b> передан старшему менеджеру отдела продаж <b>EL ORDO GROUP</b>.\n\n` +
        `Мы подготовим индивидуальный расчет рассрочки 0% и свяжемся с вами в течение 2–5 минут в WhatsApp или по телефону.`,
        CONTACT_KEYBOARD
      );

      // Карточка горячего лида в чат отдела продаж
      if (SALES_CHAT_ID) {
        const leadText =
          `🔥 <b>ГОРЯЧИЙ ЛИД (ПОДЕЛИЛСЯ НОМЕРОМ)</b>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>Имя:</b> ${fullName} (${username})\n` +
          `📱 <b>Телефон:</b> <code>${phone}</code>\n` +
          `🆔 <b>ID пользователя:</b> <code>${userFrom?.id}</code>\n` +
          `⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Bishkek' })}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `<i>Клиент ожидает персональный расчет рассрочки 0%!</i>`;

        await sendTelegramMessage(SALES_CHAT_ID, leadText, {
          inline_keyboard: [
            [
              { text: '💬 Открыть диалог в WhatsApp', url: `https://wa.me/${cleanPhone}` },
              {
                text: '✈️ Профиль Telegram',
                url: userFrom?.username ? `https://t.me/${userFrom.username}` : `tg://user?id=${userFrom?.id}`,
              },
            ],
          ],
        });
      }

      return NextResponse.json({ ok: true });
    }

    // Если это не контакт и нет текста — выходим
    if (!message.text) {
      return NextResponse.json({ ok: true });
    }

    const text = message.text.trim();

    // =========================================================================
    // 2. ОБРАБОТКА ДИПЛИНКОВ И СТАРТА: /start <payload>
    // =========================================================================
    if (text.startsWith('/start')) {
      const parts = text.split(' ');
      const payload = parts[1]?.toLowerCase().trim();
      const material = payload ? MATERIALS[payload] : null;

      if (material) {
        const docKeyboard = {
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
              { text: '🌐 Открыть сайт EL ORDO', url: SITE_URL },
              { text: '📞 Консультация по телефону', url: 'tel:+996709115115' },
            ],
          ],
        };

        // 1. Отправляем PDF
        await sendTelegramDocument(chatId, material.fileUrl, material.caption, docKeyboard);

        // 2. Предлагаем оставить номер для расчета
        await sendTelegramMessage(
          chatId,
          `💡 <b>Нужен персональный расчет рассрочки 0% или список свободных видовых этажей?</b>\n\n` +
          `Нажмите кнопку <b>«📱 Отправить номер для расчета рассрочки 0%»</b> внизу экрана 👇`,
          CONTACT_KEYBOARD
        );

        // 3. Уведомляем отдел продаж о скачивании
        if (SALES_CHAT_ID) {
          const leadNotification =
            `📥 <b>Скачивание презентации из Telegram-бота!</b>\n\n` +
            `👤 <b>Клиент:</b> ${fullName} (${username})\n` +
            `🆔 <b>ID пользователя:</b> <code>${userFrom?.id}</code>\n` +
            `📄 <b>Материал:</b> ${material.title}\n` +
            `⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Bishkek' })}\n\n` +
            `<i>Клиент просматривает буклет. Бот предложил отправить номер для расчета.</i>`;

          await sendTelegramMessage(SALES_CHAT_ID, leadNotification, {
            inline_keyboard: userFrom?.username
              ? [[{ text: '💬 Написать клиенту в Telegram', url: `https://t.me/${userFrom.username}` }]]
              : undefined,
          });
        }

        return NextResponse.json({ ok: true });
      }

      // Дефолтный приветственный экран
      const welcomeText =
        `Здравствуйте, <b>${fullName}</b>!\n\n` +
        `Добро пожаловать в официальный бот строительной компании <b>EL ORDO GROUP</b> (г. Бишкек).\n\n` +
        `Выберите интересующий вас раздел или нажмите кнопку внизу, чтобы получить расчет рассрочки 0%:`;

      const defaultInline = {
        inline_keyboard: [
          [{ text: '🏢 Каталог ЖК Abu Dhabi (Премиум)', url: `${SITE_URL}/abu-dhabi` }],
          [{ text: '🏛 Каталог ЖК Madina Residence', url: `${SITE_URL}/madina-residence` }],
          [{ text: '🌲 Эко-дома Айкол и Айкол+', url: `${SITE_URL}/ajkol-plus` }],
          [{ text: '💬 Менеджер в WhatsApp (онлайн)', url: 'https://wa.me/996709115115' }],
        ],
      };

      await sendTelegramMessage(chatId, welcomeText, defaultInline);
      await sendTelegramMessage(chatId, '👇 Выберите действие в меню или отправьте контакт:', CONTACT_KEYBOARD);
      return NextResponse.json({ ok: true });
    }

    // =========================================================================
    // 3. КНОПКИ МЕНЮ И КОМАНДЫ
    // =========================================================================
    if (text === '/catalog' || text === '🏢 Каталог объектов') {
      await sendTelegramMessage(
        chatId,
        `🏢 <b>ОБЪЕКТЫ EL ORDO GROUP В БИШКЕКЕ</b>\n\n` +
        `• <b>ЖК Abu Dhabi</b> — от 1 650 $/м²\n` +
        `  ул. Сухомлинова, 29 (Премиум-класс, 25 этажей)\n\n` +
        `• <b>ЖК Madina Residence</b> — от 1 400 $/м²\n` +
        `  ул. Огонбаева, 12 (Бизнес-класс в центре)\n\n` +
        `• <b>ЖД Айкол +</b> — от 1 100 $/м²\n` +
        `  с. Кок-Жар, ул. Баялинова, 6 (Предгорье)\n\n` +
        `• <b>ЖД Айкол</b> — от 950 $/м²\n` +
        `  ул. Арашан, 10 (Сдача 2026 г.)\n\n` +
        `<i>Все планировки и интерактивная шахматка доступны на сайте:</i>`,
        {
          inline_keyboard: [
            [{ text: '🌐 Открыть интерактивный каталог', url: SITE_URL }],
            [{ text: '💬 Уточнить цены в WhatsApp', url: 'https://wa.me/996709115115' }],
          ],
        }
      );
      return NextResponse.json({ ok: true });
    }

    if (text === '/rassrochka' || text === '📊 Рассрочка 0%') {
      await sendTelegramMessage(
        chatId,
        `📊 <b>БЕСПРОЦЕНТНАЯ РАССРОЧКА 0% БЕЗ БАНКА</b>\n\n` +
        `• Срок: <b>до 40 месяцев</b>\n` +
        `• Первоначальный взнос: <b>от 20% до 30%</b>\n` +
        `• Без справок о доходах и поручителей — оформление по паспорту\n` +
        `• Переплата: <b>0%</b>\n\n` +
        `Нажмите кнопку <b>«📱 Отправить номер»</b> ниже, чтобы получить индивидуальный расчет помесячного графика 👇`,
        CONTACT_KEYBOARD
      );
      return NextResponse.json({ ok: true });
    }

    if (text === '/tradein' || text === '🚗 Trade-in (бартер)') {
      await sendTelegramMessage(
        chatId,
        `🚗 <b>ПРОГРАММА TRADE-IN (БАРТЕР)</b>\n\n` +
        `Обменяйте ваш автомобиль или вторичное жилье на новую квартиру в EL ORDO GROUP:\n\n` +
        `1. Экспресс-оценка авто/недвижимости за <b>24 часа</b>\n` +
        `2. Согласованная сумма засчитывается в качестве первого взноса\n` +
        `3. Остаток оформляется в беспроцентную рассрочку до 40 месяцев`,
        {
          inline_keyboard: [
            [
              {
                text: '🚗 Оценить авто в WhatsApp',
                url: `https://wa.me/996709115115?text=${encodeURIComponent('Здравствуйте! Хочу оценить авто по программе Trade-in.')}`,
              },
            ],
          ],
        }
      );
      return NextResponse.json({ ok: true });
    }

    if (text === '/office' || text === '📍 Офис продаж' || text === '/manager') {
      await sendTelegramMessage(
        chatId,
        `📍 <b>ОФИС ПРОДАЖ EL ORDO GROUP</b>\n\n` +
        `г. Бишкек, ул. Исы Ахунбаева, 137/1\n` +
        `📞 +996 709 115 115\n` +
        `📞 +996 990 115 115\n\n` +
        `⏰ Пн–Сб с 09:00 до 19:00\n\n` +
        `<i>Ждем вас на кофе для подбора планировки!</i>`,
        {
          inline_keyboard: [
            [
              {
                text: '🗺 Открыть адрес в 2GIS',
                url: 'https://2gis.kg/bishkek/search/%D0%98.%20%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1',
              },
            ],
            [{ text: '💬 Написать в WhatsApp', url: 'https://wa.me/996709115115' }],
          ],
        }
      );
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook runtime error:', error);
    return NextResponse.json({ ok: true });
  }
}