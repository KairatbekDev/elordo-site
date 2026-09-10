// app/api/telegram-webhook/route.ts
import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SALES_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '5661031258';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  'https://elordo-site.vercel.app';

type Lang = 'ru' | 'kg';

// =============================================================================
// МАТЕРИАЛЫ И БУКЛЕТЫ (RU / KG)
// =============================================================================
interface LocalizedMaterial {
  titleRu: string;
  titleKg: string;
  captionRu: string;
  captionKg: string;
  fileUrl: string;
}

const MATERIALS: Record<string, LocalizedMaterial> = {
  abudhabi_pdf: {
    titleRu: 'ЖК Abu Dhabi • Презентация и планировки',
    titleKg: 'Abu Dhabi ТК • Бет ачар жана пландар',
    captionRu:
      '🏢 <b>ЖК Abu Dhabi (ул. Сухомлинова, 29)</b>\n\n' +
      'Две 25-этажные башни премиум-класса с панорамой на Ала-Тоо.\n' +
      '• Потолки: 3.45 м\n' +
      '• Рассрочка: 0% до 40 месяцев без участия банка\n' +
      '• Trade-in: зачет авто и недвижимости\n\n' +
      'В файле: шахматка площадей, инженерные спецификации и рендеры.',
    captionKg:
      '🏢 <b>«Abu Dhabi» турак жай комплекси (Сухомлинов көч., 29)</b>\n\n' +
      'Ала-Тоо тоолоруна панорамасы бар премиум-класстагы 25 кабаттуу эки мунара.\n' +
      '• Шыптын бийиктиги: 3.45 м\n' +
      '• Бөлүп төлөө: банксыз 40 айга чейин 0%\n' +
      '• Trade-in: автоунаа жана кыймылсыз мүлктү алмашуу\n\n' +
      'Файлда: батирлердин аянттары, инженердик мүнөздөмөлөрү жана рендерлер.',
    fileUrl: `${SITE_URL}/projects/Abu-Dhabi.png`,
  },
  madina_pdf: {
    titleRu: 'ЖК Madina Residence • Презентация бизнес-класса',
    titleKg: 'Madina Residence ТК • Бизнес-класс бет ачары',
    captionRu:
      '🏛 <b>ЖК Madina Residence (ул. Огонбаева, 12)</b>\n\n' +
      'Статусный комплекс в историческом и деловом центре столицы.\n' +
      '• Закрытый двор без машин\n' +
      '• Центральные городские коммуникации\n' +
      '• Сдача: 2027 г. 3 квартал',
    captionKg:
      '🏛 <b>«Madina Residence» турак жай комплекси (Огонбаев көч., 12)</b>\n\n' +
      'Борбор калаанын тарыхый жана ишкердик борборундагы статустуу комплекс.\n' +
      '• Унаасыз жабык коопсуз короо\n' +
      '• Борбордук шаардык коммуникациялар\n' +
      '• Бүткөрүү мөөнөтү: 2027-ж. 3-квартал',
    fileUrl: `${SITE_URL}/projects/Madina-Residense.png`,
  },
  ajkol_plus_pdf: {
    titleRu: 'ЖД Айкол+ • Буклет клубного дома в Кок-Жаре',
    titleKg: 'Айкол+ ТҮ • Көк-Жардагы клуб үйүнүн букллети',
    captionRu:
      '🌲 <b>ЖД Айкол + (с. Кок-Жар, ул. Баялинова, 6)</b>\n\n' +
      'Клубный дом повышенной комфортности в экологическом предгорье.\n' +
      '• Чистейший горный воздух\n' +
      '• 10 этажей, монолит-жженый кирпич\n' +
      '• Цены: от $1 100 / м²',
    captionKg:
      '🌲 <b>«Айкол +» турак үйү (Көк-Жар а., Баялинов көч., 6)</b>\n\n' +
      'Экологиялык тоо этегиндеги жогорку ыңгайлуулуктагы клуб үйү.\n' +
      '• Таза тоо абасы\n' +
      '• 10 кабат, бышкан кыш жана монолит\n' +
      '• Баасы: 1 100 $/м² баштап',
    fileUrl: `${SITE_URL}/projects/Aikolplus.png`,
  },
};

// =============================================================================
// МЕНЮ И КЛАВИАТУРЫ ДЛЯ RU И KG
// =============================================================================
function getKeyboard(lang: Lang) {
  if (lang === 'kg') {
    return {
      keyboard: [
        [{ text: '📱 0% бөлүп төлөө эсеби үчүн номер жөнөтүү', request_contact: true }],
        [{ text: '🏢 Объекттер каталогу' }, { text: '📊 0% бөлүп төлөө' }],
        [{ text: '🚗 Trade-in (алмашуу)' }, { text: '📍 Сатуу кеңсеси' }],
        [{ text: '🌐 Тилди алмаштыруу (Сменить язык)' }],
      ],
      resize_keyboard: true,
      is_persistent: true,
    };
  }

  return {
    keyboard: [
      [{ text: '📱 Отправить номер для расчета рассрочки 0%', request_contact: true }],
      [{ text: '🏢 Каталог объектов' }, { text: '📊 Рассрочка 0%' }],
      [{ text: '🚗 Trade-in (бартер)' }, { text: '📍 Офис продаж' }],
      [{ text: '🌐 Тилди алмаштыруу (Сменить язык)' }],
    ],
    resize_keyboard: true,
    is_persistent: true,
  };
}

// Инлайн-кнопки выбора языка
const LANG_CHOICE_INLINE = {
  inline_keyboard: [
    [
      { text: '🇷🇺 Русский', callback_data: 'set_lang_ru' },
      { text: '🇰🇬 Кыргызча', callback_data: 'set_lang_kg' },
    ],
  ],
};

// =============================================================================
// ХЕЛПЕРЫ ДЛЯ РАБОТЫ С TELEGRAM API
// =============================================================================
async function callTelegram(method: string, payload: Record<string, any>) {
  if (!BOT_TOKEN) return null;
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (e) {
    console.error(`Telegram ${method} error:`, e);
    return null;
  }
}

async function sendTelegramMessage(chatId: number | string, text: string, replyMarkup?: object) {
  return callTelegram('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    reply_markup: replyMarkup,
    disable_web_page_preview: false,
  });
}

async function sendTelegramDocument(
  chatId: number | string,
  documentUrl: string,
  caption: string,
  replyMarkup?: object
) {
  return callTelegram('sendDocument', {
    chat_id: chatId,
    document: documentUrl,
    caption,
    parse_mode: 'HTML',
    reply_markup: replyMarkup,
  });
}

async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  return callTelegram('answerCallbackQuery', {
    callback_query_id: callbackQueryId,
    text,
  });
}

// =============================================================================
// ГЛАВНЫЙ ОБРАБОТЧИК WEBHOOK
// =============================================================================
export async function POST(req: Request) {
  try {
    if (!BOT_TOKEN) {
      return NextResponse.json({ error: 'TELEGRAM_BOT_TOKEN is not set' }, { status: 500 });
    }

    const update = await req.json();

    // -------------------------------------------------------------------------
    // А. ОБРАБОТКА ИНЛАЙН-КЛИКОВ (ВЫБОР ЯЗЫКА)
    // -------------------------------------------------------------------------
    if (update.callback_query) {
      const cq = update.callback_query;
      const data = cq.data;
      const chatId = cq.message.chat.id;
      const fullName = [cq.from?.first_name, cq.from?.last_name].filter(Boolean).join(' ') || 'Конок';

      if (data === 'set_lang_kg') {
        await answerCallbackQuery(cq.id, 'Кыргыз тили тандалды');
        await sendTelegramMessage(
          chatId,
          `Саламатсызбы, <b>${fullName}</b>!\n\n` +
          `<b>EL ORDO GROUP</b> курулуш компаниясынын расмий ботуна кош келиңиз!\n\n` +
          `Төмөнкү менюдан керектүү бөлүмдү тандаңыз же 0% бөлүп төлөө эсебин алуу үчүн номериңизди жөнөтүңүз:`,
          getKeyboard('kg')
        );
        return NextResponse.json({ ok: true });
      }

      if (data === 'set_lang_ru') {
        await answerCallbackQuery(cq.id, 'Выбран русский язык');
        await sendTelegramMessage(
          chatId,
          `Здравствуйте, <b>${fullName}</b>!\n\n` +
          `Добро пожаловать в официальный бот строительной компании <b>EL ORDO GROUP</b> (г. Бишкек).\n\n` +
          `Выберите интересующий раздел в меню или отправьте контакт для расчета рассрочки 0%:`,
          getKeyboard('ru')
        );
        return NextResponse.json({ ok: true });
      }

      await answerCallbackQuery(cq.id);
      return NextResponse.json({ ok: true });
    }

    const message = update?.message;
    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const userFrom = message.from;
    const username = userFrom?.username ? `@${userFrom.username}` : 'Без username';
    const fullName = [userFrom?.first_name, userFrom?.last_name].filter(Boolean).join(' ') || 'Клиент';

    // -------------------------------------------------------------------------
    // Б. КЛИЕНТ ОТПРАВИЛ НОМЕР ТЕЛЕФОНА В 1 КЛИК
    // -------------------------------------------------------------------------
    if (message.contact) {
      let phone = message.contact.phone_number;
      if (!phone.startsWith('+')) phone = `+${phone}`;
      const cleanPhone = phone.replace(/[^0-9]/g, '');

      // Определяем язык по языковому коду Telegram клиента (fallback)
      const userLang = userFrom?.language_code === 'ky' ? 'kg' : 'ru';

      if (userLang === 'kg') {
        await sendTelegramMessage(
          chatId,
          `✅ <b>Ыраазычылык билдиребиз, ${fullName}!</b>\n\n` +
          `Сиздин <b>${phone}</b> номериңиз <b>EL ORDO GROUP</b> сатуу бөлүмүнүн башкы менеджерине өттү.\n\n` +
          `Биз 0% бөлүп төлөө графигин даярдап, 2–5 мүнөттүн ичинде WhatsApp аркылуу же телефон чалуу менен байланышабыз.`,
          getKeyboard('kg')
        );
      } else {
        await sendTelegramMessage(
          chatId,
          `✅ <b>Спасибо, ${fullName}!</b>\n\n` +
          `Ваш номер <b>${phone}</b> передан старшему менеджеру отдела продаж <b>EL ORDO GROUP</b>.\n\n` +
          `Мы подготовим индивидуальный расчет рассрочки 0% и свяжемся с вами в течение 2–5 минут в WhatsApp или по телефону.`,
          getKeyboard('ru')
        );
      }

      // Отправляем карточку лида менеджерам в рабочий чат с пометкой языка
      if (SALES_CHAT_ID) {
        const leadText =
          `🔥 <b>ГОРЯЧИЙ ЛИД (ПОДЕЛИЛСЯ НОМЕРОМ)</b>\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>Имя:</b> ${fullName} (${username})\n` +
          `📱 <b>Телефон:</b> <code>${phone}</code>\n` +
          `🌐 <b>Тил / Язык:</b> ${userLang === 'kg' ? 'Кыргызча 🇰🇬' : 'Русский 🇷🇺'}\n` +
          `🆔 <b>ID пользователя:</b> <code>${userFrom?.id}</code>\n` +
          `⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Bishkek' })}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `<i>Клиент ожидает персональный расчет рассрочки 0%!</i>`;

        await sendTelegramMessage(SALES_CHAT_ID, leadText, {
          inline_keyboard: [
            [
              { text: '💬 Открыть в WhatsApp', url: `https://wa.me/${cleanPhone}` },
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

    if (!message.text) {
      return NextResponse.json({ ok: true });
    }

    const text = message.text.trim();

    // -------------------------------------------------------------------------
    // В. ВЫБОР ЯЗЫКА ЧЕРЕЗ КНОПКУ ИЛИ КОМАНДУ /lang
    // -------------------------------------------------------------------------
    if (text === '/lang' || text.includes('Тилди алмаштыруу') || text.includes('Сменить язык')) {
      await sendTelegramMessage(
        chatId,
        `🌐 <b>Тилди тандаңыз / Выберите язык интерфейса:</b>`,
        LANG_CHOICE_INLINE
      );
      return NextResponse.json({ ok: true });
    }

    // -------------------------------------------------------------------------
    // Г. ОБРАБОТКА ДИПЛИНКОВ С САЙТА: /start <payload>
    // -------------------------------------------------------------------------
    if (text.startsWith('/start')) {
      const parts = text.split(' ');
      const payload = parts[1]?.toLowerCase().trim();
      const material = payload ? MATERIALS[payload] : null;

      if (material) {
        // Проверяем, на каком языке слаг или система
        const isKg = userFrom?.language_code === 'ky';
        const docCaption = isKg ? material.captionKg : material.captionRu;

        const docKeyboard = {
          inline_keyboard: [
            [
              {
                text: isKg ? '💬 WhatsApp аркылуу суроо берүү' : '💬 Задать вопрос в WhatsApp',
                url: `https://wa.me/996709115115?text=${encodeURIComponent(
                  isKg
                    ? `Саламатсызбы! Мен «${material.titleKg}» документин карап жатам. Бош батирлер барбы?`
                    : `Здравствуйте! Изучаю буклет «${material.titleRu}». Подскажите наличие свободных квартир.`
                )}`,
              },
            ],
            [
              { text: isKg ? '🌐 Компаниянын сайты' : '🌐 Сайт компании', url: SITE_URL },
              { text: isKg ? '📞 Чалуу' : '📞 Позвонить в офис', url: 'tel:+996709115115' },
            ],
          ],
        };

        // 1. Отправляем PDF
        await sendTelegramDocument(chatId, material.fileUrl, docCaption, docKeyboard);

        // 2. Предлагаем оставить контакт
        await sendTelegramMessage(
          chatId,
          isKg
            ? `💡 <b>0% бөлүп төлөө же бош кабаттардын тизмеси керекпи?</b>\nТөмөнкү <b>«📱 0% бөлүп төлөө эсеби үчүн номер жөнөтүү»</b> баскычын басыңыз 👇`
            : `💡 <b>Нужен персональный расчет рассрочки 0% или список свободных этажей?</b>\nНажмите кнопку <b>«📱 Отправить номер для расчета рассрочки 0%»</b> внизу экрана 👇`,
          getKeyboard(isKg ? 'kg' : 'ru')
        );

        // 3. Уведомление в чат продаж
        if (SALES_CHAT_ID) {
          const leadNotification =
            `📥 <b>Скачивание презентации из Telegram-бота!</b>\n\n` +
            `👤 <b>Клиент:</b> ${fullName} (${username})\n` +
            `🌐 <b>Тил / Язык:</b> ${isKg ? 'Кыргызча 🇰🇬' : 'Русский 🇷🇺'}\n` +
            `📄 <b>Материал:</b> ${material.titleRu}\n` +
            `⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Bishkek' })}\n\n` +
            `<i>Клиент получил буклет. Бот предложил отправить номер для расчета.</i>`;

          await sendTelegramMessage(SALES_CHAT_ID, leadNotification, {
            inline_keyboard: userFrom?.username
              ? [[{ text: '💬 Написать клиенту в Telegram', url: `https://t.me/${userFrom.username}` }]]
              : undefined,
          });
        }

        return NextResponse.json({ ok: true });
      }

      // Дефолтный старт: даем приветствие и выбор языка
      const isKg = userFrom?.language_code === 'ky';
      const welcomeText = isKg
        ? `Саламатсызбы, <b>${fullName}</b>!\n\n` +
          `<b>EL ORDO GROUP</b> курулуш компаниясынын расмий ботуна кош келиңиз (Бишкек ш.).\n\n` +
          `Керектүү бөлүмдү тандаңыз же тилди алмаштырыңыз:`
        : `Здравствуйте, <b>${fullName}</b>!\n\n` +
          `Добро пожаловать в официальный бот строительной компании <b>EL ORDO GROUP</b> (г. Бишкек).\n\n` +
          `Выберите интересующий вас раздел или смените язык:`;

      await sendTelegramMessage(chatId, welcomeText, LANG_CHOICE_INLINE);
      await sendTelegramMessage(chatId, isKg ? '👇 Төмөнкү менюну колдонуңуз:' : '👇 Используйте меню ниже:', getKeyboard(isKg ? 'kg' : 'ru'));
      return NextResponse.json({ ok: true });
    }

    // -------------------------------------------------------------------------
    // Д. КАТАЛОГ ОБЪЕКТОВ (RU И KG)
    // -------------------------------------------------------------------------
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
        `<i>Все планировки доступны на сайте:</i>`,
        {
          inline_keyboard: [
            [{ text: '🌐 Открыть интерактивный каталог', url: SITE_URL }],
            [{ text: '💬 Уточнить цены в WhatsApp', url: 'https://wa.me/996709115115' }],
          ],
        }
      );
      return NextResponse.json({ ok: true });
    }

    if (text === '🏢 Объекттер каталогу') {
      await sendTelegramMessage(
        chatId,
        `🏢 <b>EL ORDO GROUP КОМПАНИЯСЫНЫН БИШКЕКТЕГИ ОБЪЕКТТЕРИ</b>\n\n` +
        `• <b>ЖК Abu Dhabi</b> — 1 650 $/м² баштап\n` +
        `  Сухомлинов көч., 29 (Премиум-класс, 25 кабат)\n\n` +
        `• <b>ЖК Madina Residence</b> — 1 400 $/м² баштап\n` +
        `  Огонбаев көч., 12 (Борбордогу бизнес-класс)\n\n` +
        `• <b>ЖД Айкол +</b> — 1 100 $/м² баштап\n` +
        `  Көк-Жар а., Баялинов көч., 6 (Таза тоо абасы)\n\n` +
        `• <b>ЖД Айкол</b> — 950 $/м² баштап\n` +
        `  Арашан көч., 10 (2026-ж. бүткөрүлөт)\n\n` +
        `<i>Бардык пландар сайтта жеткиликтүү:</i>`,
        {
          inline_keyboard: [
            [{ text: '🌐 Сайттан толук көрүү', url: SITE_URL }],
            [{ text: '💬 WhatsApp аркылуу баасын билүү', url: 'https://wa.me/996709115115' }],
          ],
        }
      );
      return NextResponse.json({ ok: true });
    }

    // -------------------------------------------------------------------------
    // Е. РАССРОЧКА 0% (RU И KG)
    // -------------------------------------------------------------------------
    if (text === '/rassrochka' || text === '📊 Рассрочка 0%') {
      await sendTelegramMessage(
        chatId,
        `📊 <b>БЕСПРОЦЕНТНАЯ РАССРОЧКА 0% БЕЗ БАНКА</b>\n\n` +
        `• Срок: <b>до 40 месяцев</b>\n` +
        `• Первоначальный взнос: <b>от 20% до 30%</b>\n` +
        `• Без справок о доходах и поручителей\n` +
        `• Переплата: <b>0%</b>\n\n` +
        `Нажмите кнопку <b>«📱 Отправить номер»</b> ниже для расчета помесячного графика:`,
        getKeyboard('ru')
      );
      return NextResponse.json({ ok: true });
    }

    if (text === '📊 0% бөлүп төлөө') {
      await sendTelegramMessage(
        chatId,
        `📊 <b>БАНКСЫЗ 0% ПАЙЫЗСЫЗ БӨЛҮП ТӨЛӨӨ</b>\n\n` +
        `• Мөөнөтү: <b>40 айга чейин</b>\n` +
        `• Баштапкы төлөм: <b>20%дан 30%га чейин</b>\n` +
        `• Киреше маалымкаты жана кепилдиксиз — паспорт менен гана\n` +
        `• Ашыкча төлөм: <b>0%</b>\n\n` +
        `Ай сайын төлөө эсебин алуу үчүн төмөнкү <b>«📱 Номерди жөнөтүү»</b> баскычын басыңыз:`,
        getKeyboard('kg')
      );
      return NextResponse.json({ ok: true });
    }

    // -------------------------------------------------------------------------
    // Ж. TRADE-IN / БАРТЕР (RU И KG)
    // -------------------------------------------------------------------------
    if (text === '/tradein' || text === '🚗 Trade-in (бартер)') {
      await sendTelegramMessage(
        chatId,
        `🚗 <b>ПРОГРАММА TRADE-IN (БАРТЕР)</b>\n\n` +
        `Обменяйте авто или вторичное жилье на новую квартиру:\n\n` +
        `1. Экспресс-оценка за <b>24 часа</b> по рыночной стоимости\n` +
        `2. Сумма засчитывается в качестве первого взноса\n` +
        `3. Остаток — в рассрочку до 40 месяцев 0%`,
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

    if (text === '🚗 Trade-in (алмашуу)') {
      await sendTelegramMessage(
        chatId,
        `🚗 <b>TRADE-IN ПРОГРАММАСЫ (БАРТЕР)</b>\n\n` +
        `Автоунааңызды же эски батириңизди жаңы батирге алмаштырыңыз:\n\n` +
        `1. <b>24 сааттын ичинде</b> базар баасында экспресс-баалоо\n` +
        `2. Макулдашылган сумма баштапкы төлөм катары эсептелет\n` +
        `3. Калган бөлүгү 40 айга чейин 0% бөлүп төлөөгө берилет`,
        {
          inline_keyboard: [
            [
              {
                text: '🚗 WhatsApp аркылуу баалоо',
                url: `https://wa.me/996709115115?text=${encodeURIComponent('Саламатсызбы! Trade-in программасы боюнча автоунаамды баалатууну каалайм.')}`,
              },
            ],
          ],
        }
      );
      return NextResponse.json({ ok: true });
    }

    // -------------------------------------------------------------------------
    // З. ОФИС И КОНТАКТЫ (RU И KG)
    // -------------------------------------------------------------------------
    if (text === '/office' || text === '📍 Офис продаж' || text === '/manager') {
      await sendTelegramMessage(
        chatId,
        `📍 <b>ОФИС ПРОДАЖ EL ORDO GROUP</b>\n\n` +
        `г. Бишкек, ул. Исы Ахунбаева, 137/1 (пер. ул. Тыныстанова)\n` +
        `📞 +996 709 115 115\n` +
        `📞 +996 990 115 115\n\n` +
        `⏰ Пн–Сб с 09:00 до 19:00`,
        {
          inline_keyboard: [
            [
              {
                text: '🗺 Открыть в 2GIS',
                url: 'https://2gis.kg/bishkek/search/%D0%98.%20%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1',
              },
            ],
            [{ text: '💬 WhatsApp', url: 'https://wa.me/996709115115' }],
          ],
        }
      );
      return NextResponse.json({ ok: true });
    }

    if (text === '📍 Сатуу кеңсеси') {
      await sendTelegramMessage(
        chatId,
        `📍 <b>EL ORDO GROUP САТУУ КЕНСЕСИ</b>\n\n` +
        `Бишкек ш., Иса Ахунбаев көч., 137/1 (Тыныстанов көч. кесилиши)\n` +
        `📞 +996 709 115 115\n` +
        `📞 +996 990 115 115\n\n` +
        `⏰ Дш–Иш 09:00дөн 19:00гө чейин`,
        {
          inline_keyboard: [
            [
              {
                text: '🗺 2GIS аркылуу ачуу',
                url: 'https://2gis.kg/bishkek/search/%D0%98.%20%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1',
              },
            ],
            [{ text: '💬 WhatsApp', url: 'https://wa.me/996709115115' }],
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