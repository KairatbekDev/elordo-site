'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';

// =========================================================================
// 📹 1. БАЗА ВИДЕО КОММЕРЧЕСКИХ ПЛОЩАДЕЙ
// =========================================================================
export const COMMERCIAL_VIDEOS = {
  madinaRetail: 'https://youtube.com/shorts/bElPGpP-5oI?feature=share', // пр. Чуй (витрины, трафик)
  abuDhabiBank: 'https://youtube.com/shorts/xWB55Ogjxkk?feature=share',  // ул. Токомбаева
  ajkolPlusClinic: 'https://youtube.com/shorts/t-DxuulNuCw?feature=share', // Кок-Жар
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
  category: 'retail' | 'food' | 'office' | 'medical';
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
// 🏢 2. СПИСОК ПЛОЩАДЕЙ В ПРОДАЖЕ
// =========================================================================
const COMMERCIAL_DATA: CommercialItem[] = [
  {
    id: 'com-madina-retail',
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
      ru: 'Пересечение пр. Чуй и ул. 7 Апреля (высокий трафик)',
      kg: 'Чүй кең көчөсү жана 7-Апрель көчөсү (эл көп өткөн жер)',
      kz: 'Шүй даңғылы мен 7 Сәуір көшесінің қиылысы',
      uk: 'Перехрестя просп. Чуй та вул. 7 Квітня',
      en: 'Chuy Ave & 7 April St intersection (max footfall)',
      zh: '楚河大道与4月7日街黄金十字枢纽口（日均巨幅客流）',
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
      ru: 'Идеальная локация для сетевых супермаркетов, кофеен, аптек и флагманских бутиков. Полный пакет центральных коммуникаций, удобная парковка перед входом.',
      kg: 'Супермаркет, дарыкана жана кофеканалар үчүн мыкты чечим. Бардык шаардык байланыш түйүндөрү бар.',
      kz: 'Супермаркеттер, дәріханалар және кофеханалар үшін мінсіз орын. Орталық желілер толық тартылған.',
      uk: 'Ідеальне місце для супермаркетів, кав’ярень та брендових магазинів. Центральні комунікації.',
      en: 'Designed for brand boutiques, supermarkets, cafes and pharmacies. Direct street parking and robust infrastructure.',
      zh: '专为大型品牌连锁商超、精品咖啡馆、大型医药连锁及旗舰展厅量身定制。市政基础设施完备，门前配备充裕泊车区。',
    },
  },
  {
    id: 'com-abudhabi-bank',
    projectSlug: 'abu-dhabi',
    projectName: 'ЖК Abu Dhabi',
    category: 'office',
    title: {
      ru: 'Просторные площади под банки, офисы и медцентры',
      kg: 'Банк, кеңселер жана медициналык борборлор үчүн аянттар',
      kz: 'Банктер, кеңселер және медициналық орталықтар үшін алаңдар',
      uk: 'Просторі площі під банки, офіси та клініки',
      en: 'Spacious Spaces for Banks, HQs & Medical Clinics',
      zh: '专设银行机构、企业总部基地与大型医疗中心',
    },
    location: {
      ru: 'Южная магистраль (ул. Аалы Токомбаева)',
      kg: 'Түштүк магистраль (Аалы Токомбаев көч.)',
      kz: 'Оңтүстік магистраль (Аалы Токомбаев көш.)',
      uk: 'Південна магістраль (вул. Аали Токомбаєва)',
      en: 'Southern Highway (Aaly Tokombaev St)',
      zh: '南部主干道快速路（托孔巴耶夫街尊贵区位）',
    },
    area: 'от 120 до 550 м²',
    ceiling: 'Высота потолков 4.5 м',
    electricity: 'до 60 кВт',
    statusBadge: {
      ru: 'Бронирование • Выгодная цена',
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
      ru: 'Коммерческие этажи жилого комплекса премиум-класса «Abu Dhabi». Возможность объединения помещений, круглосуточная охрана, престижный район столицы.',
      kg: 'Премиум класстагы «Abu Dhabi» турак жайынын коммерциялык кабаттары. 24/7 кайтаруу, шаардын эң кадыр-барктуу аймагы.',
      kz: '«Abu Dhabi» премиум кешенінің коммерциялық қабаттары. Тәулік бойғы күзет, беделді аудан.',
      uk: 'Комерційні поверхи преміум-комплексу «Abu Dhabi». Престижний район, охорона 24/7.',
      en: 'High-end commercial real estate in prestigious Abu Dhabi complex. Open architecture, 24/7 security, high-net-worth neighborhood.',
      zh: 'Abu Dhabi 奢华住区底商。支持大面积灵活自由组合打通，配备24小时全维智能安保系统与高端圈层配套。',
    },
  },
  {
    id: 'com-ajkol-clinic',
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
      ru: 'Оптимальное решение для стоматологии, развивающего детского центра, салона красоты или семейного кафе формата «у дома».',
      kg: 'Стоматология, балдар борбору, сулуулук салону же үй жанындагы үй-бүлөлүк кафе үчүн ылайыктуу.',
      kz: 'Стоматология, балалар орталығы, сұлулық салоны немесе отбасылық дәмхана үшін тамаша таңдау.',
      uk: 'Ідеально під стоматологію, дитячий центр або салон краси.',
      en: 'Ideal for dental clinics, kids education centers, beauty lounges or neighbourhood bakeries.',
      zh: '口腔门诊、儿童早教益智中心、轻奢美容会所以及社区温馨家庭咖啡馆的理想之选。',
    },
  },
];

const UI: Record<Locale, {
  badge: string;
  title: string;
  desc: string;
  filterAll: string;
  filterRetail: string;
  filterOffice: string;
  filterMedical: string;
  contactBtn: string;
  watchTourBtn: string;
  consultationBtn: string;
  areaLabel: string;
  ceilingLabel: string;
  powerLabel: string;
  featuresTitle: string;
  closeModal: string;
  whatsappMessage: string;
}> = {
  ru: {
    badge: 'ИНВЕСТИЦИИ И БИЗНЕС • EL ORDO GROUP',
    title: 'КОММЕРЧЕСКАЯ НЕДВИЖИМОСТЬ',
    desc: 'Первые линии, витринное остекление, высокие потолки и максимальный пешеходный трафик для вашего успешного бизнеса.',
    filterAll: 'Все помещения',
    filterRetail: 'Ритейл и магазины',
    filterOffice: 'Банки и офисы',
    filterMedical: 'Клиники и услуги',
    contactBtn: 'Получить планировки и цены',
    watchTourBtn: 'Смотреть румтур',
    consultationBtn: 'Забронировать в WhatsApp',
    areaLabel: 'Площадь:',
    ceilingLabel: 'Потолки:',
    powerLabel: 'Мощность:',
    featuresTitle: 'Преимущества локации:',
    closeModal: 'Закрыть',
    whatsappMessage: 'Здравствуйте! Интересует коммерческая недвижимость от EL ORDO GROUP: ',
  },
  kg: {
    badge: 'ИНВЕСТИЦИЯ ЖАНА БИЗНЕС • EL ORDO GROUP',
    title: 'КОММЕРЦИЯЛЫК КЫЙМЫЛСЫЗ МҮЛК',
    desc: 'Бизнесиңиз үчүн биринчи тилкедеги витраждуу айнектер, бийик шыптар жана эл көп өткөн ыңгайлуу жайлар.',
    filterAll: 'Бардык жайлар',
    filterRetail: 'Дүкөндөр жана ритейл',
    filterOffice: 'Банк жана кеңселер',
    filterMedical: 'Клиника жана кызматтар',
    contactBtn: 'Баасын жана планын алуу',
    watchTourBtn: 'Видеону көрүү',
    consultationBtn: 'WhatsApp аркылуу ээлөө',
    areaLabel: 'Аянты:',
    ceilingLabel: 'Шыбы:',
    powerLabel: 'Кубаттуулугу:',
    featuresTitle: 'Артыкчылыктары:',
    closeModal: 'Жабуу',
    whatsappMessage: 'Саламатсызбы! Коммерциялык аянттар тууралуу маалымат алгым келет: ',
  },
  kz: {
    badge: 'ИНВЕСТИЦИЯ ЖӘНЕ БИЗНЕС • EL ORDO GROUP',
    title: 'КОММЕРЦИЯЛЫҚ ЖЫЛЖЫМАЙТЫН МҮЛІК',
    desc: 'Бизнесіңіздің табысы үшін бірінші қатар, витриналық терезелер, биік төбелер және қарқынды трафик.',
    filterAll: 'Барлық алаңдар',
    filterRetail: 'Ритейл және дүкендер',
    filterOffice: 'Банктер мен кеңселер',
    filterMedical: 'Клиникалар мен қызметтер',
    contactBtn: 'Бағасы мен жоспарын білу',
    watchTourBtn: 'Бейнені көру',
    consultationBtn: 'WhatsApp арқылы брондау',
    areaLabel: 'Ауданы:',
    ceilingLabel: 'Төбесі:',
    powerLabel: 'Қуаты:',
    featuresTitle: 'Артықшылықтары:',
    closeModal: 'Жабу',
    whatsappMessage: 'Сәлеметсіз бе! Коммерциялық жылжымайтын мүлік туралы білгім келеді: ',
  },
  uk: {
    badge: 'ІНВЕСТИЦІЇ ТА БІЗНЕС • EL ORDO GROUP',
    title: 'КОМЕРЦІЙНА НЕРУХОМІСТЬ',
    desc: 'Перша лінія, вітрини до підлоги, високі стелі та високий трафік для вашого прибуткового бізнесу.',
    filterAll: 'Всі приміщення',
    filterRetail: 'Рітейл та магазини',
    filterOffice: 'Банки та офіси',
    filterMedical: 'Клініки та послуги',
    contactBtn: 'Отримати планування та ціни',
    watchTourBtn: 'Дивитися румтур',
    consultationBtn: 'Забронювати у WhatsApp',
    areaLabel: 'Площа:',
    ceilingLabel: 'Стелі:',
    powerLabel: 'Потужність:',
    featuresTitle: 'Переваги приміщення:',
    closeModal: 'Закрити',
    whatsappMessage: 'Вітаю! Мене цікавить комерційна нерухомість: ',
  },
  en: {
    badge: 'INVESTMENT & BUSINESS • EL ORDO GROUP',
    title: 'COMMERCIAL REAL ESTATE',
    desc: 'Prime street frontages, panoramic display glazing, soaring ceilings, and dense footfall for thriving enterprise.',
    filterAll: 'All Spaces',
    filterRetail: 'Retail & Stores',
    filterOffice: 'Banks & Corporate HQs',
    filterMedical: 'Clinics & Services',
    contactBtn: 'Request Layouts & Pricing',
    watchTourBtn: 'Watch Video Tour',
    consultationBtn: 'Inquire via WhatsApp',
    areaLabel: 'Area:',
    ceilingLabel: 'Ceiling:',
    powerLabel: 'Power Supply:',
    featuresTitle: 'Location Advantages:',
    closeModal: 'Close',
    whatsappMessage: 'Hello! I am inquiring about EL ORDO GROUP commercial spaces: ',
  },
  zh: {
    badge: '商业投资与财富引擎 • EL ORDO GROUP',
    title: '高端临街商业地标空间',
    desc: '黄金一线临街、全景通透落地展窗、奢雅开阔层高与汇聚客流，护航企业稳健兴盛。',
    filterAll: '全部商用空间',
    filterRetail: '品牌零售商超',
    filterOffice: '金融银行总部',
    filterMedical: '品质医疗康养',
    contactBtn: '获取全套户型图与报价',
    watchTourBtn: '实景观摩',
    consultationBtn: '微信 / WhatsApp 专属洽谈',
    areaLabel: '建筑面积：',
    ceilingLabel: '层高净空：',
    powerLabel: '供电负荷：',
    featuresTitle: '核心商业核心优势：',
    closeModal: '关闭',
    whatsappMessage: '您好！我想了解 EL ORDO GROUP 开发的商业不动产项目：',
  },
};

export default function CommercialVideosSection() {
  const { locale } = useLanguage();
  const currentLang = (locale as Locale) || 'ru';
  const t = UI[currentLang] || UI.ru;

  const [activeCategory, setActiveCategory] = useState<'all' | 'retail' | 'office' | 'medical'>('all');
  const [cinemaCommercial, setCinemaCommercial] = useState<CommercialItem | null>(null);

  // Клавиша Escape и блокировка скролла
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCinemaCommercial(null);
    };
    if (cinemaCommercial) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cinemaCommercial]);

  const filteredCommercial = useMemo(() => {
    if (activeCategory === 'all') return COMMERCIAL_DATA;
    return COMMERCIAL_DATA.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-20 px-6 bg-white dark:bg-[#0b1b15] border-t border-gray-200 dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Заголовок */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
              {t.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white uppercase tracking-tight mb-2">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-light max-w-2xl leading-relaxed">
              {t.desc}
            </p>
          </div>

          <a
            href="https://wa.me/996709115115"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto px-6 py-4 rounded-2xl bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] hover:text-white dark:text-[#064734] text-xs font-black uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>{t.contactBtn}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Категории фильтров */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
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
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-md'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Сетка коммерческих площадей */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCommercial.map((item) => (
            <article
              key={item.id}
              className="bg-[#fafbfa] dark:bg-[#07130e] rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Превью румтура */}
              <div
                className="relative aspect-video bg-neutral-900 overflow-hidden cursor-pointer"
                onClick={() => setCinemaCommercial(item)}
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

              {/* Характеристики и детали */}
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

                  {/* Сетка параметров помещения */}
                  <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
                    <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5">
                      <span className="text-[10px] text-gray-400 block mb-0.5">{t.areaLabel}</span>
                      <strong className="text-xs sm:text-sm font-extrabold text-[#064734] dark:text-[#d4b26f]">
                        {item.area}
                      </strong>
                    </div>
                    <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5">
                      <span className="text-[10px] text-gray-400 block mb-0.5">{t.ceilingLabel}</span>
                      <strong className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white">
                        {item.ceiling}
                      </strong>
                    </div>
                    <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5">
                      <span className="text-[10px] text-gray-400 block mb-0.5">{t.powerLabel}</span>
                      <strong className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                        {item.electricity}
                      </strong>
                    </div>
                  </div>

                  {/* Буллеты преимуществ */}
                  <div className="space-y-1.5 mb-6">
                    {(item.features[currentLang] || item.features.ru).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4b26f]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Действия: Видео и Бронь в WhatsApp */}
                <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setCinemaCommercial(item)}
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
                    <span>{t.consultationBtn}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* МОДАЛЬНЫЙ КИНОТЕАТР ДЛЯ КОММЕРЦИИ */}
      {cinemaCommercial && (() => {
        const { isDirectVideo, src } = formatVideoSource(cinemaCommercial.videoUrl);

        return (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
            onClick={() => setCinemaCommercial(null)}
          >
            <div
              className="bg-neutral-950 w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Шапка */}
              <div className="p-4 sm:px-6 flex items-center justify-between border-b border-white/10 text-white bg-neutral-900">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-black uppercase text-[#d4b26f]">
                    {cinemaCommercial.projectName} • {cinemaCommercial.area}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCinemaCommercial(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label={t.closeModal}
                >
                  ✕
                </button>
              </div>

              {/* Экран видео */}
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
                        title={cinemaCommercial.title[currentLang] || cinemaCommercial.title.ru}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    )
                  ) : null}
                </div>

                {/* Подвал плеера с кнопкой связи */}
                <div className="p-6 text-white bg-neutral-900/80 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-black text-white mb-1">
                      {cinemaCommercial.title[currentLang] || cinemaCommercial.title.ru}
                    </h4>
                    <span className="text-xs text-[#d4b26f]">
                      {cinemaCommercial.location[currentLang] || cinemaCommercial.location.ru}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/996709115115?text=${encodeURIComponent(
                      `${t.whatsappMessage}${cinemaCommercial.projectName} (${cinemaCommercial.area})`
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
    </section>
  );
}