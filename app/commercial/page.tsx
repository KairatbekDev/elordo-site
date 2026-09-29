'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { IconArrowRight, IconWhatsApp } from '@/components/Icons';

// =========================================================================
// 📹 1. БАЗА ВИДЕО КОММЕРЧЕСКИХ ПЛОЩАДЕЙ НА ВСЕ 6 ОБЪЕКТОВ
// =========================================================================
export const COMMERCIAL_VIDEOS = {
  // 1. ЖК Abu Dhabi (Премиум)
  abuDhabiBank: 'https://youtube.com/shorts/xWB55Ogjxkk?feature=share', // Южная магистраль (банки, штаб-квартиры)
  // 2. ЖК Madina Residence (Бизнес)
  madinaRetail: 'https://youtube.com/shorts/bElPGpP-5oI?feature=share', // пр. Чуй / ул. 7 Апреля (витринный ритейл)
  // 3. ЖД Айкол + (Строящийся)
  ajkolPlusClinic: 'https://youtube.com/shorts/t-DxuulNuCw?feature=share', // Кок-Жар (клиники, салоны, кофейни)
  // 4. ЖД Айкол (СДАН)
  ajkolFinished: 'https://youtube.com/shorts/K2z55r4Ma-s?feature=share', // Готовые коммерческие площади с техпаспортом
  // 5. ЖК Келечек (СДАН)
  kelechekRetail: '', // Заселенный квартал (готовые помещения под супермаркет и аптеку)
  // 6. КД Ордо (СДАН)
  ordoBoutique: 'https://youtu.be/BfY6nA076Zo', // Представительский офис закрытого типа (натуральный гранит)
};

function formatVideoSource(url: string) {
  if (!url) return { isDirectVideo: false, src: '' };
  const isDirectVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.startsWith('/videos/');
  if (isDirectVideo) return { isDirectVideo: true, src: url };

  let embedUrl = url;
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split(/[?#&]/)[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('watch?v=')) {
    const videoId = url.split('watch?v=')[1]?.split(/[?#&]/)[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtube.com/shorts/')) {
    const videoId = url.split('youtube.com/shorts/')[1]?.split(/[?#&]/)[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  const separator = embedUrl.includes('?') ? '&' : '?';
  return { isDirectVideo: false, src: `${embedUrl}${separator}autoplay=1&rel=0` };
}

export interface CommercialItem {
  id: string;
  projectSlug: string;
  projectName: string;
  category: 'retail' | 'office' | 'medical';
  title: Record<Locale, string>;
  location: Record<Locale, string>;
  area: string;
  ceiling: string;
  electricity: string;
  statusBadge: Record<Locale, string>;
  videoUrl: string;
  videoDuration: string;
  thumbnail: string;
  features: Record<Locale, string[]>;
  description: Record<Locale, string>;
}

// =========================================================================
// 🏢 2. СПИСОК КОММЕРЧЕСКИХ ПЛОЩАДЕЙ (ВСЕ 6 ОБЪЕКТОВ)
// =========================================================================
const COMMERCIAL_DATA: CommercialItem[] = [
  // 1. ЖК Abu Dhabi
  {
    id: 'com-abudhabi',
    projectSlug: 'abu-dhabi',
    projectName: 'ЖК Abu Dhabi',
    category: 'office',
    title: {
      ru: 'Представительские площади под банки, офисы и медцентры',
      kg: 'Банк, кеңселер жана медициналык борборлор үчүн аянттар',
      kz: 'Банктер, кеңселер және медициналық орталықтар үшін алаңдар',
      uk: 'Просторі площі під банки, офіси та клініки',
      en: 'Executive Spaces for Banks, HQs & Medical Clinics',
      zh: '专设银行机构、企业总部基地与大型医疗中心',
    },
    location: {
      ru: 'Южная магистраль (ул. Аалы Токомбаева / Сухомлинова)',
      kg: 'Түштүк магистраль (Аалы Токомбаев / Сухомлинов көч.)',
      kz: 'Оңтүстік магистраль (Аалы Токомбаев / Сухомлинов көш.)',
      uk: 'Південна магістраль (вул. Аали Токомбаєва)',
      en: 'Southern Highway (Aaly Tokombaev & Sukhomlinov St)',
      zh: '南部主干道快速路（托孔巴耶夫街尊贵区位）',
    },
    area: 'от 120 до 550 м²',
    ceiling: 'Высота потолков 4.5 м',
    electricity: 'до 60 кВт',
    statusBadge: {
      ru: 'Бронирование • Скидка 100%',
      kg: 'Ээлеп коюу • Ыңгайлуу баа',
      kz: 'Брондау • Тиімді баға',
      uk: 'Бронювання • Вигідна ціна',
      en: 'Pre-Order • Prime Rates',
      zh: '尊荣预订中 • 筑底优享价',
    },
    videoUrl: COMMERCIAL_VIDEOS.abuDhabiBank,
    videoDuration: '00:46 • Shorts',
    thumbnail: '/projects/Abu-Dhabi.png',
    features: {
      ru: ['Высота потолков 4.5 м', 'Подземный и гостевой паркинг', 'Свободная планировка Open Space'],
      kg: ['Шыптын бийиктиги 4.5 м', 'Жер астындагы жана конок паркинги', 'Ачык пландоо Open Space'],
      kz: ['Төбе биіктігі 4.5 м', 'Жерасты және қонақ тұрағы', 'Ашық еркін жоспарлау'],
      uk: ['Стелі 4.5 м', 'Підземний та наземний паркінг', 'Вільне планування Open Space'],
      en: ['4.5m ceiling height', 'Underground & surface parking', 'Flexible Open-Space layouts'],
      zh: ['净高4.5米开阔轩昂层高', '地下与地面充裕生态停车位', '大跨度无柱自由定制开敞格局'],
    },
    description: {
      ru: 'Коммерческие этажи флагманского комплекса «Abu Dhabi». Возможность свободной планировки, высокие потолки 4.5 м, 60 кВт мощности и престижный район столицы.',
      kg: 'Премиум класстагы «Abu Dhabi» комплексинин соода кабаттары. 4.5 м бийик шыптар, 60 кВт электр кубаты жана 24/7 кайтаруу.',
      kz: '«Abu Dhabi» премиум кешенінің сауда қабаттары. 4.5 м биік төбелер, 60 кВт қуат, беделді аудан.',
      uk: 'Комерційні поверхи преміум-комплексу «Abu Dhabi». Високі стелі 4.5 м, вільне планування, охорона 24/7.',
      en: 'High-end commercial real estate in prestigious Abu Dhabi complex. Open architecture, 4.5m ceilings, 60 kW power capacity.',
      zh: 'Abu Dhabi 奢华住区底商。层高4.5米，配备60千瓦大容量电力负荷与全天候安防。',
    },
  },

  // 2. ЖК Madina Residence
  {
    id: 'com-madina',
    projectSlug: 'madina-residence',
    projectName: 'ЖК Madina Residence',
    category: 'retail',
    title: {
      ru: 'Премиальные витринные помещения на первой линии',
      kg: 'Биринчи тилкедеги витраждуу соода жайлары',
      kz: 'Бірінші қатардағы витриналық сауда алаңдары',
      uk: 'Преміальні вітринні приміщення першої лінії',
      en: 'Prime First-Line Flagship Retail Spaces',
      zh: '楚河大道一线临街全景落地橱窗黄金铺位',
    },
    location: {
      ru: 'Пересечение пр. Чуй и ул. 7 Апреля (сверхвысокий трафик)',
      kg: 'Чүй кең көчөсү жана 7-Апрель көчөсү (эл көп өткөн жер)',
      kz: 'Шүй даңғылы мен 7 Сәуір көшесінің қиылысы',
      uk: 'Перехрестя просп. Чуй та вул. 7 Квітня',
      en: 'Chuy Ave & 7 April St intersection (max footfall)',
      zh: '楚河大道与4月7日街黄金十字枢纽口（巨幅客流）',
    },
    area: 'от 85 до 340 м²',
    ceiling: 'Высота потолков 4.2 м',
    electricity: 'до 45 кВт',
    statusBadge: {
      ru: 'В продаже • Рассрочка 0%',
      kg: 'Сатууда • 0% бөлүп төлөө',
      kz: 'Сатылымда • 0% бөліп төлеу',
      uk: 'У продажу • Розстрочка 0%',
      en: 'For Sale • 0% Installment',
      zh: '热销席位 • 支持无息分期',
    },
    videoUrl: COMMERCIAL_VIDEOS.madinaRetail,
    videoDuration: '00:37 • Shorts',
    thumbnail: '/projects/Madina-Residense.png',
    features: {
      ru: ['Витражные окна в пол', 'Отдельная входная группа', 'Высокий пешеходный трафик'],
      kg: ['Полдон шыпка чейин витраж', 'Өзүнчө кире бериш', 'Жөө жүргөндөрдүн чоң агымы'],
      kz: ['Еденнен төбеге дейінгі витриналар', 'Жеке кіреберіс', 'Үлкен жаяу жүргіншілер ағыны'],
      uk: ['Панорамні вітрини в підлогу', 'Окрема вхідна група', 'Максимальний трафік'],
      en: ['Floor-to-ceiling glazing', 'Independent street access', 'High pedestrian footfall'],
      zh: ['全景落地通透景观幕墙', '全独立专属客户入户门厅', '核心商圈澎湃步行客流汇聚'],
    },
    description: {
      ru: 'Идеальная локация для сетевых супермаркетов, кофеен, аптек и флагманских бутиков. Полный пакет центральных коммуникаций, витринное остекление на проспект Чуй.',
      kg: 'Супермаркет, дарыкана жана кофеканалар үчүн мыкты чечим. Бардык шаардык байланыш түйүндөрү бар.',
      kz: 'Супермаркеттер, дәріханалар және кофеханалар үшін мінсіз орын. Орталық желілер толық тартылған.',
      uk: 'Ідеальне місце для супермаркетів, кав’ярень та брендових магазинів. Центральні комунікації.',
      en: 'Designed for brand boutiques, supermarkets, cafes and pharmacies. Direct street parking and robust infrastructure.',
      zh: '专为大型品牌连锁商超、精品咖啡馆、大型医药连锁及旗舰展厅量身定制。市政基础设施完备。',
    },
  },

  // 3. ЖД Айкол +
  {
    id: 'com-ajkol-plus',
    projectSlug: 'ajkol-plus',
    projectName: 'ЖД Айкол +',
    category: 'medical',
    title: {
      ru: 'Уютные коммерческие площади в жилом массиве',
      kg: 'Турак жай конушундагы ыңгайлуу соода жайлары',
      kz: 'Тұрғын аудандағы жайлы коммерциялық алаңдар',
      uk: 'Затишні комерційні площі у житловому масиві',
      en: 'Boutique Commercial Premises in Residential Area',
      zh: '纯洋房高密居住区精致底商空间',
    },
    location: {
      ru: 'Район Кок-Жар (густонаселенный спальный район)',
      kg: 'Көк-Жар аймагы (эл көп жашаган район)',
      kz: 'Көк-Жар ауданы (тұрғын үйлер тығыз аудан)',
      uk: 'Район Кок-Жар (житловий масив)',
      en: 'Kok-Zhar District (dense residential area)',
      zh: '科克-扎尔高端住宅核心居住区',
    },
    area: 'от 65 до 180 м²',
    ceiling: 'Высота потолков 3.8 м',
    electricity: 'до 30 кВт',
    statusBadge: {
      ru: 'Строительство 7 этажа',
      kg: '7-кабат курулууда',
      kz: '7-қабат салынуда',
      uk: 'Будівництво 7 поверху',
      en: '7th Floor in Progress',
      zh: '主体结构火热建设中',
    },
    videoUrl: COMMERCIAL_VIDEOS.ajkolPlusClinic,
    videoDuration: '00:27 • Shorts',
    thumbnail: '/projects/Aikolplus.png',
    features: {
      ru: ['Удобный подъезд', 'Постоянный поток жителей', 'Автономная вентиляция'],
      kg: ['Ыңгайлуу унаа жолу', 'Тургундардын туруктуу агымы', 'Өзүнчө вентиляция'],
      kz: ['Ыңғайлы кіреберіс жолы', 'Тұрғындардың тұрақты ағыны', 'Жеке желдету'],
      uk: ['Зручний під’їзд', 'Постійний потік мешканців', 'Окрема вентиляція'],
      en: ['Easy street access', 'Steady internal resident flow', 'Independent ventilation shaft'],
      zh: ['便捷车辆出入干道连接', '坐享数千高净值常住业主客群', '预留独立专业排油烟新风管井'],
    },
    description: {
      ru: 'Оптимальное решение для стоматологии, развивающего детского центра, салона красоты или семейного кафе формата «у дома». Рассрочка 0% до окончания стройки.',
      kg: 'Стоматология, балдар борбору, сулуулук салону же үй жанындагы үй-бүлөлүк кафе үчүн ылайыктуу. Курулуш бүткөнгө чейин 0% бөлүп төлөө.',
      kz: 'Стоматология, балалар орталығы немесе сұлулық салоны үшін тамаша таңдау. 0% бөліп төлеу қарастырылған.',
      uk: 'Ідеально під стоматологію, дитячий центр або салон краси.',
      en: 'Ideal for dental clinics, kids education centers, beauty lounges or neighbourhood bakeries.',
      zh: '口腔门诊、儿童早教益智中心、轻奢美容会所以及社区温馨家庭咖啡馆的理想之选。',
    },
  },

  // 4. ЖД Айкол (СДАН)
  {
    id: 'com-ajkol',
    projectSlug: 'ajkol',
    projectName: 'ЖД Айкол',
    category: 'retail',
    title: {
      ru: 'Готовые коммерческие помещения в сданном доме',
      kg: 'Пайдаланууга берилген үйдөгү даяр соода жайлары',
      kz: 'Тапсырылған үйдегі дайын коммерциялық алаңдар',
      uk: 'Готові комерційні приміщення у зданому будинку',
      en: 'Turnkey Commercial Spaces in Delivered Building',
      zh: '已交付现房底商（即买即办产证即装修）',
    },
    location: {
      ru: 'ул. Арашан, 10 (Октябрьский район)',
      kg: 'Арашан көч., 10 (Октябрь району)',
      kz: 'Арашан к-сі, 10 (Октябрь ауданы)',
      uk: 'вул. Арашан, 10 (Октябрський район)',
      en: '10 Arashan Street (Oktyabrsky District)',
      zh: '十月区阿拉尚街10号成熟现房',
    },
    area: 'от 50 до 160 м²',
    ceiling: 'Высота потолков 3.6 м',
    electricity: 'до 25 кВт',
    statusBadge: {
      ru: 'Дом сдан • Техпаспорт',
      kg: 'Үй бүттү • Техпаспорт',
      kz: 'Үй берілді • Техпаспорт',
      uk: 'Будинок зданий • Техпаспорт',
      en: 'Delivered • Title Ready',
      zh: '现房交付 • 产权权属清晰',
    },
    videoUrl: COMMERCIAL_VIDEOS.ajkolFinished,
    videoDuration: '02:20 • Обзор',
    thumbnail: '/projects/ajkol.png',
    features: {
      ru: ['100% готовность к ремонту', 'Все центральные коммуникации', 'Ключи в день сделки'],
      kg: ['Оңдоп-түзөөгө 100% даяр', 'Бардык шаардык түйүндөр', 'Келишим күнү ачкыч'],
      kz: ['Жөндеуге 100% дайын', 'Орталық желілер қосылған', 'Кілтті бірден беру'],
      uk: ['Готовність до ремонту', 'Центральні комунікації', 'Ключі в день угоди'],
      en: ['Turnkey fit-out ready', 'All municipal utilities on', 'Keys on signing day'],
      zh: ['即刻进场装修运营', '全套市政管网接驳完毕', '签约当日即领钥匙'],
    },
    description: {
      ru: 'Помещения в уже заселяемом жилом доме. Никаких строительных рисков: оформление техпаспорта в Госрегистре, запуск бизнеса без ожидания сдачи объекта.',
      kg: 'Эл көчүп жаткан даяр үйдөн жайлар. Курулуш тобокелдиктери жок: Мамкаттоодон техпаспорт алып, дароо бизнес баштаңыз.',
      kz: 'Тұрғындар қоныстанып жатқан дайын үй. Құрылыс тәуекелдері жоқ: бірден жөндеу бастап, бизнесіңізді ашыңыз.',
      uk: 'Приміщення у вже заселеному будинку. Оформлення техпаспорта, запуск бізнесу без ризиків.',
      en: 'Premises in an occupied residential building. Zero completion risk: prompt official title deed issuance, start your business immediately.',
      zh: '现房即刻开业运营。零工程延期风险，国家不动产权证手续齐备，快速启幕财富新篇章。',
    },
  },

  // 5. ЖК Келечек (СДАН)
  {
    id: 'com-kelechek',
    projectSlug: 'kelechek',
    projectName: 'ЖК Келечек',
    category: 'retail',
    title: {
      ru: 'Торговые площади в заселенном жилом комплексе',
      kg: 'Эл жашаган турак жай комплексиндеги соода жайлары',
      kz: 'Қоныстанған тұрғын үй кешеніндегі сауда алаңдары',
      uk: 'Торгові площі у заселеному житловому комплексі',
      en: 'Commercial Retail in Fully Occupied Neighborhood',
      zh: '成熟交付大型社区底商（自带庞大客群）',
    },
    location: {
      ru: 'ул. Космическая, 153',
      kg: 'Космическая көч., 153',
      kz: 'Космическая к-сі, 153',
      uk: 'вул. Космічна, 153',
      en: '153 Kosmicheskaya Street',
      zh: '太空街153号成熟高入住率社区',
    },
    area: 'от 45 до 130 м²',
    ceiling: 'Высота потолков 3.5 м',
    electricity: 'до 20 кВт',
    statusBadge: {
      ru: 'Заселен • Готовый трафик',
      kg: 'Эл жашайт • Даяр кардарлар',
      kz: 'Тұрғындар бар • Дайын трафик',
      uk: 'Заселений • Готовий трафік',
      en: 'Occupied • Built-In Footfall',
      zh: '已全盘入住 • 坐享固定消费客群',
    },
    videoUrl: COMMERCIAL_VIDEOS.kelechekRetail,
    videoDuration: '03:10 • Обзор',
    thumbnail: '/projects/Kelechek.png',
    features: {
      ru: ['Более 200 семей постоянных жителей', 'Отдельный вход со двора и улицы', 'Высокая окупаемость'],
      kg: ['200дөн ашык жашаган үй-бүлө', 'Өзүнчө кире бериш', 'Жогорку кирешелүүлүк'],
      kz: ['200-ден астам тұрақты отбасы', 'Жеке кіреберіс', 'Жоғары кірістілік'],
      uk: ['Понад 200 сімей мешканців', 'Окремий вхід', 'Висока окупність'],
      en: ['200+ resident families', 'Dedicated street & courtyard entrance', 'Rapid ROI'],
      zh: ['超过200户常住高消费家庭', '沿街及内院双向独立出入口', '高投资回报与租金收益'],
    },
    description: {
      ru: 'Идеально под мини-маркет, пункт выдачи заказов (Wildberries/Ozon), аптеку или студию детского творчества. Постоянный поток жильцов гарантирует стабильный доход.',
      kg: 'Мини-маркет, интернет-дүкөндөрдүн буйрутма берүүчү жайы, дарыкана же чыгармачылык студиясы үчүн эң сонун чечим.',
      kz: 'Мини-маркет, тапсырыс беру пункті (Wildberries/Ozon), дәріхана немесе оқу орталығы үшін таптырмас орын.',
      uk: 'Ідеально під пункт видачі замовлень, маркет чи аптеку.',
      en: 'Ideal for neighborhood groceries, e-commerce pick-up hubs, pharmacies or craft studios. Daily traffic from complex residents.',
      zh: '电商快递自提点、精品便利店、社区药房或儿童兴趣班的黄金创富之选，自带数千居民稳定消费力。',
    },
  },

  // 6. КД Ордо (СДАН)
  {
    id: 'com-ordo',
    projectSlug: 'ordo',
    projectName: 'КД Ордо',
    category: 'office',
    title: {
      ru: 'Представительский бутик-офис в клубном доме',
      kg: 'Клубдук үйдөгү өкүлчүлүктүү бутик-кеңсе',
      kz: 'Клубтық үйдегі өкілдік бутик-кеңсе',
      uk: 'Представницький бутік-офіс у клубному будинку',
      en: 'Exclusive Boutique HQ Office in Club House',
      zh: '极罕奢雅俱乐部专属代表处空间',
    },
    location: {
      ru: 'ул. Тверская, 20 (Первомайский район)',
      kg: 'Тверская көч., 20 (Биринчи Май району)',
      kz: 'Тверская к-сі, 20 (Бірінші Май ауданы)',
      uk: 'вул. Тверська, 20 (Першотравневий район)',
      en: '20 Tverskaya Street (Pervomaysky District)',
      zh: '第一月区特维尔斯卡亚街20号隐奢地段',
    },
    area: '110 м²',
    ceiling: 'Высота потолков 3.8 м',
    electricity: 'до 35 кВт',
    statusBadge: {
      ru: 'Клубный дом • Эксклюзив',
      kg: 'Клубдук үй • Эксклюзив',
      kz: 'Клубтық үй • Эксклюзив',
      uk: 'Клубний будинок • Ексклюзив',
      en: 'Club House • Exclusive',
      zh: '奢雅纯洋房 • 典藏独家席位',
    },
    videoUrl: COMMERCIAL_VIDEOS.ordoBoutique,
    videoDuration: '00:30 • Обзор',
    thumbnail: '/projects/Ordo.png',
    features: {
      ru: ['Фасад из гранита и травертина', 'Собственная газовая котельная', 'Приватный отдельный вход'],
      kg: ['Гранит жана травертин фасад', 'Жеке газ отказаны', 'Өзүнчө жеке кире бериш'],
      kz: ['Гранит пен травертин қасбеті', 'Жеке газ қазандығы', 'Жеке кіреберіс'],
      uk: ['Фасад із натурального каменю', 'Власна газова котельня', 'Приватний вхід'],
      en: ['Natural granite & travertine', 'Autonomous gas boiler', 'Private dedicated entry'],
      zh: ['全天然花岗岩与洞石幕墙', '自建独立燃气供热站', '完全独立尊享入户玄关'],
    },
    description: {
      ru: 'Единственное коммерческое помещение в премиальном клубном доме «Ордо». Статусный офис для юридической компании, IT-агентства или частной галереи с полной приватностью.',
      kg: '«Ордо» клубдук үйүндөгү жалгыз коммерциялык аянт. Юридикалык компания, IT-кеңсе же жеке галерея үчүн жогорку даражадагы жай.',
      kz: '«Ордо» клубтық үйіндегі жалғыз коммерциялық алаң. Заң компаниясы, IT-кеңсе немесе жеке галерея үшін тамаша орын.',
      uk: 'Статусне приміщення для IT-компанії, юридичної фірми або закритого клубу.',
      en: 'The sole commercial premise in the hallmark Ordo Club House. Unmatched private prestige for legal consultancies, IT hubs or art galleries.',
      zh: '全项目唯一稀缺专属商用空间。律政事务所、高端IT科技企业基地或私人艺术沙龙的至臻之选。',
    },
  },
];

const UI: Record<Locale, {
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  filterAll: string;
  filterRetail: string;
  filterOffice: string;
  filterMedical: string;
  statProjects: string;
  statCeilings: string;
  statPower: string;
  statInstallment: string;
  watchTourBtn: string;
  consultationBtn: string;
  areaLabel: string;
  ceilingLabel: string;
  powerLabel: string;
  closeModal: string;
  whatsappMessage: string;
}> = {
  ru: {
    heroBadge: 'ИНВЕСТИЦИИ И БИЗНЕС • EL ORDO GROUP',
    heroTitle: 'КОММЕРЧЕСКАЯ НЕДВИЖИМОСТЬ',
    heroDesc: 'Коммерческие площади во всех 6 жилых комплексах компании: первые линии, витринное остекление, потолки до 4.5 метров и рассрочка 0%.',
    filterAll: 'Все 6 проектов',
    filterRetail: 'Ритейл и магазины',
    filterOffice: 'Банки и офисы',
    filterMedical: 'Клиники и услуги',
    statProjects: '6 объектов девелопера',
    statCeilings: 'Потолки до 4.5 м',
    statPower: 'Мощность до 60 кВт',
    statInstallment: 'Рассрочка 0% без банка',
    watchTourBtn: 'Смотреть видеообзор',
    consultationBtn: 'Забронировать в WhatsApp',
    areaLabel: 'Площадь:',
    ceilingLabel: 'Потолки:',
    powerLabel: 'Мощность:',
    closeModal: 'Закрыть',
    whatsappMessage: 'Здравствуйте! Интересует коммерческая недвижимость от EL ORDO GROUP: ',
  },
  kg: {
    heroBadge: 'ИНВЕСТИЦИЯ ЖАНА БИЗНЕС • EL ORDO GROUP',
    heroTitle: 'КОММЕРЦИЯЛЫК КЫЙМЫЛСЫЗ МҮЛК',
    heroDesc: 'Компаниянын бардык 6 комплексиндеги соода жайлары: биринчи тилке, витраждуу терезелер, 4.5 м шыптар жана 0% бөлүп төлөө.',
    filterAll: 'Бардык 6 долбоор',
    filterRetail: 'Дүкөндөр жана ритейл',
    filterOffice: 'Банк жана кеңселер',
    filterMedical: 'Клиника жана кызматтар',
    statProjects: '6 курулуш объектиси',
    statCeilings: 'Шыптар 4.5 м чейин',
    statPower: 'Кубаттуулук 60 кВт',
    statInstallment: '0% бөлүп төлөө',
    watchTourBtn: 'Видеону көрүү',
    consultationBtn: 'WhatsApp аркылуу ээлөө',
    areaLabel: 'Аянты:',
    ceilingLabel: 'Шыбы:',
    powerLabel: 'Кубаты:',
    closeModal: 'Жабуу',
    whatsappMessage: 'Саламатсызбы! Коммерциялык аянттар тууралуу маалымат алгым келет: ',
  },
  kz: {
    heroBadge: 'ИНВЕСТИЦИЯ ЖӘНЕ БИЗНЕС • EL ORDO GROUP',
    heroTitle: 'КОММЕРЦИЯЛЫҚ ЖЫЛЖЫМАЙТЫН МҮЛІК',
    heroDesc: 'Барлық 6 кешендегі сауда алаңдары: бірінші қатар, панорамалық витриналар, 4.5 м төбелер және 0% бөліп төлеу.',
    filterAll: 'Барлық 6 нысан',
    filterRetail: 'Ритейл және дүкендер',
    filterOffice: 'Банктер мен кеңселер',
    filterMedical: 'Клиникалар мен қызметтер',
    statProjects: '6 ірі нысан',
    statCeilings: 'Төбелер 4.5 м дейін',
    statPower: 'Қуат 60 кВт дейін',
    statInstallment: '0% бөліп төлеу',
    watchTourBtn: 'Бейнені көру',
    consultationBtn: 'WhatsApp арқылы брондау',
    areaLabel: 'Ауданы:',
    ceilingLabel: 'Төбесі:',
    powerLabel: 'Қуаты:',
    closeModal: 'Жабу',
    whatsappMessage: 'Сәлеметсіз бе! Коммерциялық жылжымайтын мүлік туралы білгім келеді: ',
  },
  uk: {
    heroBadge: 'ІНВЕСТИЦІЇ ТА БІЗНЕС • EL ORDO GROUP',
    heroTitle: 'КОМЕРЦІЙНА НЕРУХОМІСТЬ',
    heroDesc: 'Комерційні площі в усіх 6 житлових комплексах: перша лінія, вітрини, високі стелі та розстрочка 0%.',
    filterAll: 'Всі 6 об’єктів',
    filterRetail: 'Рітейл та магазини',
    filterOffice: 'Банки та офіси',
    filterMedical: 'Клініки та послуги',
    statProjects: '6 проєктів девелопера',
    statCeilings: 'Стелі до 4.5 м',
    statPower: 'Потужність до 60 кВт',
    statInstallment: 'Розстрочка 0% без банку',
    watchTourBtn: 'Дивитися відеоогляд',
    consultationBtn: 'Забронювати у WhatsApp',
    areaLabel: 'Площа:',
    ceilingLabel: 'Стелі:',
    powerLabel: 'Потужність:',
    closeModal: 'Закрити',
    whatsappMessage: 'Вітаю! Мене цікавить комерційна нерухомість: ',
  },
  en: {
    heroBadge: 'INVESTMENT & BUSINESS • EL ORDO GROUP',
    heroTitle: 'COMMERCIAL REAL ESTATE',
    heroDesc: 'Commercial premises across all 6 company developments: highway frontages, display windows, ceilings up to 4.5m and 0% financing.',
    filterAll: 'All 6 Projects',
    filterRetail: 'Retail & Stores',
    filterOffice: 'Banks & Corporate HQs',
    filterMedical: 'Clinics & Services',
    statProjects: '6 Active Developments',
    statCeilings: 'Ceilings up to 4.5m',
    statPower: 'Power up to 60 kW',
    statInstallment: '0% Direct Financing',
    watchTourBtn: 'Watch Video Tour',
    consultationBtn: 'Inquire via WhatsApp',
    areaLabel: 'Area:',
    ceilingLabel: 'Ceiling:',
    powerLabel: 'Power Supply:',
    closeModal: 'Close',
    whatsappMessage: 'Hello! I am inquiring about EL ORDO GROUP commercial spaces: ',
  },
  zh: {
    heroBadge: '商业投资与财富引擎 • EL ORDO GROUP',
    heroTitle: '高端临街商业地标空间',
    heroDesc: '覆盖旗下全系6大品质楼盘：一线临街黄金干道枢纽、落地大展窗、4.5米挑高与0%免息分期。',
    filterAll: '全部6大开发项目',
    filterRetail: '品牌零售商超',
    filterOffice: '金融银行总部',
    filterMedical: '品质医疗康养',
    statProjects: '6大标杆项目',
    statCeilings: '挑高最高达 4.5米',
    statPower: '供电负荷达 60千瓦',
    statInstallment: '无息自营分期 0%',
    watchTourBtn: '实景观摩',
    consultationBtn: '在 WhatsApp 中专属洽谈',
    areaLabel: '建筑面积：',
    ceilingLabel: '层高净空：',
    powerLabel: '供电负荷：',
    closeModal: '关闭',
    whatsappMessage: '您好！我想了解 EL ORDO GROUP 开发的商业不动产项目：',
  },
};

export default function CommercialPage() {
  const { locale, t: globalT } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const t = UI[currentLang] || UI.ru;

  const [activeCategory, setActiveCategory] = useState<'all' | 'retail' | 'office' | 'medical'>('all');
  const [selectedSlug, setSelectedSlug] = useState<string>('all');
  const [cinemaModal, setCinemaModal] = useState<CommercialItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCinemaModal(null);
    };
    if (cinemaModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cinemaModal]);

  const filteredCommercial = useMemo(() => {
    return COMMERCIAL_DATA.filter((c) => {
      if (activeCategory !== 'all' && c.category !== activeCategory) return false;
      if (selectedSlug !== 'all' && c.projectSlug !== selectedSlug) return false;
      return true;
    });
  }, [activeCategory, selectedSlug]);

  const projectsFilterList = [
    { slug: 'all', label: t.filterAll },
    { slug: 'abu-dhabi', label: 'ЖК Abu Dhabi' },
    { slug: 'madina-residence', label: 'ЖК Madina Residence' },
    { slug: 'ajkol-plus', label: 'ЖД Айкол +' },
    { slug: 'ajkol', label: 'ЖД Айкол' },
    { slug: 'kelechek', label: 'ЖК Келечек' },
    { slug: 'ordo', label: 'КД Ордо' },
  ];

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200 pb-20">
      
      {/* Хлебные крошки */}
      <div className="bg-white dark:bg-[#0b1b15] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
            {globalT.common?.home || 'Главная'}
          </Link>
          <span>/</span>
          <span className="text-[#064734] dark:text-[#d4b26f] font-semibold">
            {t.heroTitle}
          </span>
        </div>
      </div>

      {/* Hero-баннер */}
      <section className="bg-[#064734] text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {t.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            {t.heroDesc}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
            <div className="p-2.5">
              <strong className="text-2xl font-black text-[#d4b26f] block">6 объектов</strong>
              <span className="text-[11px] text-white/80">{t.statProjects}</span>
            </div>
            <div className="p-2.5">
              <strong className="text-2xl font-black text-white block">до 4.5 м</strong>
              <span className="text-[11px] text-white/80">{t.statCeilings}</span>
            </div>
            <div className="p-2.5">
              <strong className="text-2xl font-black text-emerald-400 block">до 60 кВт</strong>
              <span className="text-[11px] text-white/80">{t.statPower}</span>
            </div>
            <div className="p-2.5">
              <strong className="text-2xl font-black text-[#d4b26f] block">0%</strong>
              <span className="text-[11px] text-white/80">{t.statInstallment}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Двойная панель фильтрации: по комплексам и по типам бизнеса */}
      <div className="max-w-6xl mx-auto px-6 mt-8 space-y-4">
        {/* Фильтр по ЖК */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {projectsFilterList.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setSelectedSlug(item.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSlug === item.slug
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-md'
                  : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Фильтр по назначению */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'retail', label: t.filterRetail },
            { id: 'office', label: t.filterOffice },
            { id: 'medical', label: t.filterMedical },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Список всех 6 коммерческих объектов */}
      <section className="max-w-6xl mx-auto px-6 mt-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCommercial.map((item) => (
            <article
              key={item.id}
              className="bg-white dark:bg-[#0b1b15] rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div
                className="relative aspect-video bg-neutral-900 overflow-hidden cursor-pointer"
                onClick={() => setCinemaModal(item)}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title[currentLang] || item.title.ru}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/95 dark:bg-[#07130e]/95 text-gray-950 dark:text-white shadow-2xl group-hover:scale-105 transition-transform">
                    <span className="w-9 h-9 rounded-full bg-[#064734] text-white flex items-center justify-center">
                      <svg className="w-4 h-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider">{t.watchTourBtn}</span>
                  </div>
                </div>

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-[11px] font-black uppercase shadow">
                    {item.statusBadge[currentLang] || item.statusBadge.ru}
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-[#d4b26f] text-[11px] font-bold shadow">
                    {item.projectName}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#8c6b23] dark:text-[#d4b26f] block mb-1">
                    📍 {item.location[currentLang] || item.location.ru}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-gray-950 dark:text-white mb-3">
                    {item.title[currentLang] || item.title.ru}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-6">
                    {item.description[currentLang] || item.description.ru}
                  </p>

                  <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
                    <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                      <span className="text-[10px] text-gray-400 block mb-0.5">{t.areaLabel}</span>
                      <strong className="text-xs sm:text-sm font-extrabold text-[#064734] dark:text-[#d4b26f]">
                        {item.area}
                      </strong>
                    </div>
                    <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                      <span className="text-[10px] text-gray-400 block mb-0.5">{t.ceilingLabel}</span>
                      <strong className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white">
                        {item.ceiling}
                      </strong>
                    </div>
                    <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                      <span className="text-[10px] text-gray-400 block mb-0.5">{t.powerLabel}</span>
                      <strong className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                        {item.electricity}
                      </strong>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-6">
                    {(item.features[currentLang] || item.features.ru).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4b26f]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setCinemaModal(item)}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 text-gray-900 dark:text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t.watchTourBtn}</span>
                  </button>

                  <a
                    href={`https://wa.me/996709115115?text=${encodeURIComponent(
                      `${t.whatsappMessage}${item.projectName} (${item.area})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-4 rounded-xl bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] hover:text-white dark:text-[#064734] font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                    <span>{t.consultationBtn}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* МОДАЛЬНЫЙ КИНОТЕАТР */}
      {cinemaModal && (() => {
        const { isDirectVideo, src } = formatVideoSource(cinemaModal.videoUrl);

        return (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
            onClick={() => setCinemaModal(null)}
          >
            <div
              className="bg-neutral-950 w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:px-6 flex items-center justify-between border-b border-white/10 text-white bg-neutral-900">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-black uppercase text-[#d4b26f]">
                    {cinemaModal.projectName} • {cinemaModal.area}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCinemaModal(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label={t.closeModal}
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto bg-black flex flex-col">
                <div className="relative aspect-video w-full flex items-center justify-center bg-black">
                  {src ? (
                    isDirectVideo ? (
                      <video
                        src={src}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <iframe
                        src={src}
                        title={cinemaModal.title[currentLang] || cinemaModal.title.ru}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    )
                  ) : null}
                </div>

                <div className="p-6 text-white bg-neutral-900/80 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-black text-white mb-1">
                      {cinemaModal.title[currentLang] || cinemaModal.title.ru}
                    </h4>
                    <span className="text-xs text-[#d4b26f]">
                      {cinemaModal.location[currentLang] || cinemaModal.location.ru}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/996709115115?text=${encodeURIComponent(
                      `${t.whatsappMessage}${cinemaModal.projectName} (${cinemaModal.area})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-[#d4b26f] text-[#064734] font-black text-xs uppercase tracking-wider transition-all hover:bg-white shadow text-center shrink-0"
                  >
                    {t.consultationBtn}
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </main>
  );
}