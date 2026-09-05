// lib/data.ts

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface ReviewItem {
  author: string;
  text: string;
  role?: string;
}

export interface CompanyInfo {
  name: string;
  fullName: string;
  legalName: string;
  foundedYear: string;
  builtArea: string;
  projectsCount: string;
  address: string;
  phones: string[];
  whatsapp: string;
  instagram: string;
  gisUrl: string;
  hero: {
    title: string;
    subtitle: string;
  };
  history: {
    quote: string;
    text: string;
  };
  team: TeamMember[];
  reviews: ReviewItem[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PaymentMethod {
  slug: 'rassrochka' | 'trade-in' | 'polniy-raschet';
  title: string;
  subtitle: string;
  icon: 'calendar' | 'car' | 'cash';
  heroTitle: string;
  heroSub: string;
  notice: string;
  rules: string;
  documents: string[];
  faq: FaqItem[];
}

export interface Project {
  slug: string;
  name: string;
  type: 'ЖК' | 'ЖД' | 'КД';
  category: 'active' | 'finished';
  classType: string;
  classCategory: 'premium' | 'business' | 'comfort';
  image: string;
  address: string;
  coords: [number, number];
  deadline: string;
  price: string;
  priceNum: number;
  floors: string;
  desc: string;
  isFinished: boolean;
  hasPage: boolean;
  gisUrl: string;
  whatsappText?: string;
  videoUrl?: string;
}

// =============================================================================
// 1. ИНФОРМАЦИЯ О КОМПАНИИ
// =============================================================================
export const COMPANY_INFO: CompanyInfo = {
  name: 'EL ORDO',
  fullName: 'EL ORDO GROUP',
  legalName: 'ОсОО Строительная компания EL ORDO GROUP',
  foundedYear: '2021',
  builtArea: '180 000+ м²',
  projectsCount: '6 объектов',
  address: 'г. Бишкек, ул. Исы Ахунбаева, 137/1',
  phones: ['+996 709 115 115', '+996 990 115 115'],
  whatsapp: '996709115115',
  instagram: 'https://instagram.com/elordo.group',
  gisUrl:
    'https://2gis.kg/bishkek/search/%D0%98.%20%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1',
  hero: {
    title: 'АРХИТЕКТУРА ВАШЕГО СТАТУСА И СЕМЕЙНОГО УЮТА',
    subtitle:
      'С 2021 года строим современное жилье в Бишкеке, внедряя инновации в каждый проект. Квартиры, достойные вашего статуса.',
  },
  history: {
    quote: 'Мы не просто строим дома — мы проектируем безопасное пространство для поколений.',
    text: 'История EL ORDO началась с амбициозной цели — доказать, что качественное жилье в Бишкеке может сочетать высокую эстетику, монолитную надежность и честные условия покупки. Нашим первым флагманом стал клубный дом «Ордо», а следом был успешно сдан и заселен жилой комплекс «Келечек». Сегодня мы реализуем знаковые для столицы высотные проекты «Abu Dhabi», статусный комплекс «Madina Residence», а также экологические дома «Айкол» и «Айкол +» в предгорье.',
  },
  // Реальные пути к фотографиям из папки public/team
  team: [
    {
      name: 'Керезбек Нуралиев',
      role: 'Генеральный директор / Учредитель',
      image: '/team/kerezbek-nuraliev-1.jpg',
    },
    {
      name: 'Адилет Медетбек уулу',
      role: 'Исполнительный директор',
      image: '/team/adilet-medetbek-uulu-857x1536.jpg',
    },
    {
      name: 'Самаган Мамасыдык уулу',
      role: 'Технический директор',
      image: '/team/mamasydyk-uulu-samagany.jpg',
    },
    {
      name: 'Бектур Мусаев',
      role: 'Главный инженер проектов',
      image: '/team/musaev-bektur-768x1376.jpg',
    },
    {
      name: 'Бекжан Нуржанов',
      role: 'Руководитель отдела продаж',
      image: '/team/nurzhanov-bekzhan-857x1536.jpg',
    },
    {
      name: 'Атанас Жороев',
      role: 'Главный юрист компании',
      image: '/team/zhoroev-atanas.jpg',
    },
  ],
  reviews: [
    {
      author: 'Омурбек Нуржанов',
      text: 'Приобрели квартиру на объекте Мадина. Хочу отметить сервис и условия рассрочки. Все выполнено качественно и точно в срок.',
      role: 'Резидент ЖК Madina Residence',
    },
    {
      author: 'Жаныбек Убайдуллаев',
      text: 'Искренне благодарен компании EL ORDO за быстрое и качественное воплощение проекта. Слаженная работа бригад и профессионализм.',
      role: 'Дольщик ЖК Abu Dhabi',
    },
    {
      author: 'Nusratullo Sangakov',
      text: 'Отличная строительная компания! EL ORDO GROUP показали высокий профессионализм, пунктуальность и ответственность на всех этапах.',
      role: 'Инвестор',
    },
  ],
};

// =============================================================================
// 2. КАТАЛОГ ЖИЛЫХ КОМПЛЕКСОВ
// =============================================================================
export const PROJECTS_LIST: Project[] = [
  {
    slug: 'abu-dhabi',
    name: 'ЖК Abu Dhabi',
    type: 'ЖК',
    category: 'active',
    classType: 'Премиум-класс',
    classCategory: 'premium',
    image: '/projects/Abu-Dhabi.png',
    address: 'ул. Сухомлинова, 29',
    coords: [42.84694, 74.58175],
    deadline: '2029 г. 3 квартал',
    price: 'от 1 650 $/м²',
    priceNum: 1650,
    floors: '25 этажей (2 башни)',
    desc: 'Флагманский архитектурный проект столицы с панорамным остеклением и видами на горы Ала-Тоо.',
    isFinished: false,
    hasPage: true,
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%A1%D1%83%D1%85%D0%BE%D0%BC%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%2029',
    whatsappText: 'Здравствуйте! Интересует ЖК Abu Dhabi на ул. Сухомлинова, 29',
  },
  {
    slug: 'madina-residence',
    name: 'ЖК Madina Residence',
    type: 'ЖК',
    category: 'active',
    classType: 'Бизнес-класс',
    classCategory: 'business',
    image: '/projects/Madina-Residense.png',
    address: 'ул. Огонбаева, 12',
    coords: [42.87785, 74.63916],
    deadline: '2027 г. 3 квартал',
    price: 'от 1 400 $/м²',
    priceNum: 1400,
    floors: '14 этажей',
    desc: 'Статусный жилой комплекс в развитом деловом центре столицы с закрытой охраняемой территорией.',
    isFinished: false,
    hasPage: true,
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%9E%D0%B3%D0%BE%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%2012',
    whatsappText: 'Здравствуйте! Интересует ЖК Madina Residence на ул. Огонбаева, 12',
  },
  {
    slug: 'ajkol-plus',
    name: 'ЖД Айкол +',
    type: 'ЖД',
    category: 'active',
    classType: 'Комфорт+',
    classCategory: 'comfort',
    image: '/projects/Aikolplus.png',
    address: 'с. Кок-Жар, ул. Баялинова, 6',
    coords: [42.81725, 74.64607],
    deadline: '2028 г. 3 квартал',
    price: 'от 1 100 $/м²',
    priceNum: 1100,
    floors: '10 этажей',
    desc: 'Клубный формат жизни в экологически благоприятном южном предгорье с кристально чистым воздухом.',
    isFinished: false,
    hasPage: true,
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%9A%D0%BE%D0%BA-%D0%96%D0%B0%D1%80%20%D0%91%D0%B0%D1%8F%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%206',
    whatsappText: 'Здравствуйте! Интересует ЖД Айкол+ в с. Кок-Жар',
  },
  {
    slug: 'ajkol',
    name: 'ЖД Айкол',
    type: 'ЖД',
    category: 'active',
    classType: 'Комфорт-класс',
    classCategory: 'comfort',
    image: '/projects/ajkol.jpg',
    address: 'ул. Арашан, 10',
    coords: [42.8171, 74.64892],
    deadline: '2026 г. 2 квартал',
    price: 'от 950 $/м²',
    priceNum: 950,
    floors: '9 этажей',
    desc: 'Надежный монолитно-кирпичный дом в высокой степени готовности. Скорый ввод в эксплуатацию.',
    isFinished: false,
    hasPage: true,
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%90%D1%80%D0%B0%D1%88%D0%B0%D0%BD%2010',
    whatsappText: 'Здравствуйте, интересует ЖД Айкол по ул. Арашан, 10',
  },
  {
    slug: 'kelechek',
    name: 'ЖК Келечек',
    type: 'ЖК',
    category: 'finished',
    classType: 'Комфорт-класс',
    classCategory: 'comfort',
    image: '/projects/Kelechek.jpg',
    address: 'ул. Космическая, 153',
    coords: [42.84588, 74.55136],
    deadline: 'Сдан в эксплуатацию',
    price: 'Все квартиры проданы',
    priceNum: 0,
    floors: '9 этажей',
    desc: 'Полностью завершенный, введенный в эксплуатацию и заселенный жилой комплекс в тихом районе.',
    isFinished: true,
    hasPage: true,
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%9A%D0%BE%D1%81%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20153',
  },
  {
    slug: 'ordo',
    name: 'КД Ордо',
    type: 'КД',
    category: 'finished',
    classType: 'Клубный дом',
    classCategory: 'premium',
    image: '/projects/Ordo.jpg',
    address: 'ул. Тверская, 20',
    coords: [42.87974, 74.54623],
    deadline: 'Сдан в эксплуатацию',
    price: 'Все квартиры проданы',
    priceNum: 0,
    floors: '7 этажей',
    desc: 'Первый знаковый клубный дом компании с авторской архитектурой, подземным паркингом и террасой.',
    isFinished: true,
    hasPage: true,
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%A2%D0%B2%D0%B5%D1%80%D1%81%D0%BA%D0%B0%D1%8F%2020',
    videoUrl: 'https://www.youtube.com',
  },
];

// =============================================================================
// 3. ПРОГРАММЫ ОПЛАТЫ
// =============================================================================
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    slug: 'rassrochka',
    title: 'Рассрочка 0%',
    subtitle: 'Беспроцентная рассрочка до 40 месяцев без банка.',
    icon: 'calendar',
    heroTitle: 'КВАРТИРЫ В РАССРОЧКУ 0% БЕЗ УЧАСТИЯ БАНКА',
    heroSub:
      'Комфортный вход в сделку без справок о доходах. Индивидуальный график платежей на срок до 40 месяцев, адаптированный под ваш бюджет.',
    notice:
      'Наша внутренняя рассрочка позволяет распределить финансовую нагрузку. Вы платите напрямую застройщику, минуя банковские проценты, сложные проверки кредитной истории и подтверждение доходов.',
    rules:
      'Первоначальный взнос — от 20% до 30%. Срок — до 40 месяцев. График выплат — ежемесячно или поквартально. Переплата составляет 0% от остатка стоимости.',
    documents: [
      'Паспорт гражданина (ID-карта или загранпаспорт)',
      'Справки с места работы и поручители не требуются',
    ],
    faq: [
      {
        q: 'Нужен ли залог?',
        a: 'Залогом выступает сама приобретаемая недвижимость до момента полной выплаты стоимости по договору.',
      },
      {
        q: 'Можно ли погасить рассрочку досрочно?',
        a: 'Да, вы можете погасить остаток в любой момент без каких-либо комиссий или штрафных санкций.',
      },
      {
        q: 'В какой валюте фиксируется стоимость?',
        a: 'Все взаиморасчеты и порядок фиксации стоимости согласовываются и прописываются в договоре долевого участия.',
      },
    ],
  },
  {
    slug: 'trade-in',
    title: 'Trade-in (Бартер)',
    subtitle: 'Обмен вашего автомобиля или жилья на новостройку.',
    icon: 'car',
    heroTitle: 'ОБМЕН АВТОМОБИЛЯ ИЛИ ВТОРИЧНОГО ЖИЛЬЯ НА НОВОСТРОЙКУ',
    heroSub:
      'Используйте ваше текущее имущество как первоначальный взнос. Быстрая рыночная оценка авто или недвижимости за 24 часа.',
    notice:
      'Программа Trade-in позволяет не тратить месяцы на самостоятельную продажу авто на авторынке или поиск покупателя на старую квартиру. Мы принимаем ликвидные активы в зачет стоимости нового жилья в комплексах EL ORDO GROUP.',
    rules:
      'Вы выбираете квартиру в любом из наших ЖК. Наши эксперты проводят экспресс-оценку вашего автомобиля или жилья по честной рыночной цене. Согласованная сумма засчитывается в качестве первоначального взноса или частичной оплаты.',
    documents: [
      'Для авто: техпаспорт ТС и паспорт владельца',
      'Для недвижимости: техпаспорт БТИ, правоустанавливающие документы и справка об отсутствии арестов',
    ],
    faq: [
      {
        q: 'Какие автомобили вы принимаете?',
        a: 'Мы рассматриваем ликвидные легковые авто и внедорожники в исправном техническом состоянии без юридических обременений и арестов.',
      },
      {
        q: 'Что если стоимость моего авто меньше первоначального взноса?',
        a: 'Разницу можно доплатить наличными или оформить остаток в нашу стандартную рассрочку до 40 месяцев.',
      },
      {
        q: 'Как быстро происходит оценка?',
        a: 'Первичная оценка занимает не более 24 часов после осмотра объекта или автомобиля нашим специалистом.',
      },
    ],
  },
  {
    slug: 'polniy-raschet',
    title: '100% расчет',
    subtitle: 'Максимальная скидка и лучшие условия при полной оплате.',
    icon: 'cash',
    heroTitle: 'МАКСИМАЛЬНАЯ ВЫГОДА И СКИДКИ ПРИ 100% ОПЛАТЕ',
    heroSub:
      'Самый быстрый и выгодный путь к собственности. Зафиксируйте минимальную цену и получите приоритет в выборе лучших планировок в наших объектах.',
    notice:
      'При полной оплате вы получаете максимальную скидку от компании. Это позволяет сэкономить существенную сумму, которую можно направить на будущий ремонт или мебель. Вы становитесь полноправным владельцем недвижимости без долговых обязательств.',
    rules:
      'Единоразовый взнос всей суммы сразу после подписания договора. Оплата возможна наличным и безналичным расчетом через банк либо в кассе нашей компании.',
    documents: [
      'Паспорт КР (или паспорт иностранного гражданина с нотариальным переводом)',
      'Справки о доходах не требуются',
    ],
    faq: [
      {
        q: 'Можно ли оплатить безналичным переводом?',
        a: 'Да, мы предоставляем официальные банковские реквизиты, включая возможность международных SWIFT-переводов.',
      },
      {
        q: 'Предоставляется ли скидка при 100% оплате?',
        a: 'Да, при 100% оплате покупателю предоставляется максимальная индивидуальная скидка от базовой стоимости за квадратный метр.',
      },
    ],
  },
];

// =============================================================================
// 4. ВСПОМОГАТЕЛЬНЫЕ ХЕЛПЕРЫ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ
// =============================================================================
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS_LIST.find((p) => p.slug === slug);
}

export function getPaymentMethodBySlug(slug: string): PaymentMethod | undefined {
  return PAYMENT_METHODS.find((m) => m.slug === slug);
}

export function getActiveProjects(): Project[] {
  return PROJECTS_LIST.filter((p) => p.category === 'active');
}

export function getFinishedProjects(): Project[] {
  return PROJECTS_LIST.filter((p) => p.category === 'finished');
}