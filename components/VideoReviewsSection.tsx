'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';

// =========================================================================
// 📹 1. БАЗА ВИДЕОССЫЛОК ОТЗЫВОВ
// Вставляйте сюда ссылки (Shorts, YouTube или прямое видео)
// =========================================================================
export const REVIEW_VIDEOS = {
  ajkolDogdurbek: 'https://youtube.com/shorts/K2z55r4Ma-s?feature=share', // 11.09.2026 — Новосёлы ЖД Айкол (сертификат 200 000 сом)
  ordoAsanov: 'https://youtu.be/BfY6nA076Zo',                             // Резидент КД Ордо
  kelechekFamily: '',                                                    // Молодая семья ЖК Келечек
  abuDhabiInvestor: '',                                                  // Инвестор ЖК Abu Dhabi
};

// =========================================================================
// 🗓 УНИВЕРСАЛЬНЫЙ ФОРМАТТЕР ДАТ ДЛЯ 6 ЯЗЫКОВ
// =========================================================================
function formatLocalizedDate(dateInput: string | undefined, locale: Locale): string {
  if (!dateInput) return '';

  let year = 0, month = -1, day = 0;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const [y, m, d] = dateInput.split('-').map(Number);
    year = y; month = m - 1; day = d;
  } else if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateInput)) {
    const [d, m, y] = dateInput.split('.').map(Number);
    year = y; month = m - 1; day = d;
  } else {
    return dateInput;
  }

  const monthsGenitive: Record<Locale, string[]> = {
    ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    kg: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    kz: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
    uk: ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  };

  const m = monthsGenitive[locale]?.[month] || monthsGenitive.ru[month];
  switch (locale) {
    case 'kg': return `${day}-${m}, ${year}-ж.`;
    case 'kz': return `${day} ${m}, ${year} ж.`;
    case 'uk': return `${day} ${m} ${year} р.`;
    case 'en': return `${m} ${day}, ${year}`;
    case 'zh': return `${year}年${month + 1}月${day}日`;
    case 'ru':
    default:   return `${day} ${m} ${year} г.`;
  }
}

// Преобразование любой ссылки в рабочий Embed плеер
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

export interface ReviewItem {
  id: string;
  projectSlug: string;
  projectName: string;
  authorName: Record<Locale, string>;
  roleBadge: Record<Locale, string>;
  rawDate: string;
  videoUrl: string;
  videoDuration: string;
  thumbnail: string;
  quote: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  rating: number; // от 1 до 5
}

// =========================================================================
// 💬 2. СПИСОК ОТЗЫВОВ С РАЗБИВКОЙ ПО ПРОЕКТАМ
// =========================================================================
const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-ajkol-1',
    projectSlug: 'ajkol',
    projectName: 'ЖД Айкол',
    authorName: {
      ru: 'Семья Догдурбековых',
      kg: 'Догдурбековдордун үй-бүлөсү',
      kz: 'Доғдурбековтер отбасы',
      uk: 'Родина Догдурбекових',
      en: 'Dogdurbekov Family',
      zh: '多格杜尔别科夫一家',
    },
    roleBadge: {
      ru: 'Новосёлы • Счастливые собственники',
      kg: 'Жаңы конуштар • Квартира ээлери',
      kz: 'Жаңа қоныстанушылар • Пәтер иелері',
      uk: 'Новосели • Щасливі власники',
      en: 'New Homeowners • Verified Buyers',
      zh: '首批交房业主 • 真实购房住户',
    },
    rawDate: '2026-09-11',
    videoUrl: REVIEW_VIDEOS.ajkolDogdurbek,
    videoDuration: '02:20 • Церемония',
    thumbnail: '/projects/ajkol.png',
    rating: 5,
    quote: {
      ru: '«Получили ключи в праздничной атмосфере! Дом сдан строго в срок, качество отделки подъездов и коммуникаций превзошло все ожидания. А сертификат на 200 000 сомов стал прекрасным подарком к ремонту!»',
      kg: '«Ачкычтарыбызды майрамдык салтанатта алдык! Үй өз убагында тапшырылды, сапаты абдан сонун. 200 000 сомдук сертификат ремонтубузга чоң белек болду!»',
      kz: '«Кілттерімізді салтанатты түрде алдық! Үй дәл уақытында тапсырылды, сапасы өте жоғары. 200 000 сомдық сертификат керемет сыйлық болды!»',
      uk: '«Отримали ключі у святковій атмосфері! Будинок зданий вчасно, якість відмінна. А сертифікат на 200 000 сомів став приємним бонусом до новосілля!»',
      en: '“We received our keys during an incredible grand ceremony! The building was delivered right on time, and winning the 200,000 KGS certificate made our move truly unforgettable.”',
      zh: '“在隆重的交房盛典上拿到了新房钥匙！工期准时履约，楼盘品质远超预期，现场还幸运抽中了20万索姆大奖！”',
    },
    highlights: {
      ru: ['Своевременная сдача дома', 'Чистота юридической документации', 'Розыгрыш 200 000 сомов'],
      kg: ['Өз убагында тапшырылышы', '100% мыйзамдуу документтер', '200 000 сом байге'],
      kz: ['Дер кезінде тапсырылуы', '100% заңды құжаттар', '200 000 сом жүлдесі'],
      uk: ['Вчасне здавання об’єкта', '100% юридична чистота', 'Виграш сертифіката'],
      en: ['On-time completion', '100% legal clarity & titles', '200,000 KGS voucher winner'],
      zh: ['按期顺利交付', '全套产权法律手续清晰', '荣获20万索姆装修大礼'],
    },
  },
  {
    id: 'rev-ordo-1',
    projectSlug: 'ordo',
    projectName: 'КД Ордо',
    authorName: {
      ru: 'Улан Асанов',
      kg: 'Улан Асанов',
      kz: 'Ұлан Асанов',
      uk: 'Улан Асанов',
      en: 'Ulan Asanov',
      zh: '乌兰·阿萨诺夫',
    },
    roleBadge: {
      ru: 'Резидент клубного дома',
      kg: 'Клубдук үйдүн тургуну',
      kz: 'Клубтық үй тұрғыны',
      uk: 'Резидент клубного будинку',
      en: 'Club House Resident',
      zh: '奢雅纯洋房常住业主',
    },
    rawDate: '2023-11-20',
    videoUrl: REVIEW_VIDEOS.ordoAsanov,
    videoDuration: '00:30 • Румтур',
    thumbnail: '/projects/Ordo.png',
    rating: 5,
    quote: {
      ru: '«Фасад из натурального камня, высокие потолки и автономная газовая котельная — здесь тепло, тихо и абсолютно безопасно для всей семьи. EL ORDO GROUP построили дом высшего класса».',
      kg: '«Табигый граниттен фасад, бийик шыптар жана өзүнүн котельнаясы — үй дайыма жылуу жана тынч. EL ORDO GROUPтун сапаты эң жогорку деңгээлде».',
      kz: '«Табиғи тастан қасбет, биік төбелер және автономды қазандық. EL ORDO GROUP жоғары деңгейдегі үй салды».',
      uk: '«Фасад із натурального каменю, високі стелі та власна котельня. Дім дуже теплий та комфортний».',
      en: '“Natural travertine and granite facade, soaring ceilings, and autonomous heating ensure absolute serenity and coziness for my family.”',
      zh: '“全干挂天然石材外立面、开阔层高与自备独立供暖，居住体验极其静谧舒适，品质无可挑剔。”',
    },
    highlights: {
      ru: ['Фасад из гранита и травертина', 'Собственная котельная', 'Приватность и тишина'],
      kg: ['Гранит жана травертин фасад', 'Жеке отказан', 'Тынчтык жана коопсуздук'],
      kz: ['Гранит пен травертин қасбеті', 'Жеке қазандық', 'Тыныштық пен қауіпсіздік'],
      uk: ['Фасад з граніту та травертину', 'Власна котельня', 'Приватність 24/7'],
      en: ['Natural stone cladding', 'Independent boiler plant', 'Quiet premium atmosphere'],
      zh: ['全天然石材幕墙', '楼栋独立燃气供暖', '高私密安防居住氛围'],
    },
  },
  {
    id: 'rev-kelechek-1',
    projectSlug: 'kelechek',
    projectName: 'ЖК Келечек',
    authorName: {
      ru: 'Айбек и Чолпон',
      kg: 'Айбек жана Чолпон',
      kz: 'Айбек пен Шолпан',
      uk: 'Айбек та Чолпон',
      en: 'Aybek & Cholpon',
      zh: '艾别克与乔尔蓬夫妇',
    },
    roleBadge: {
      ru: 'Жильцы заселенного дома',
      kg: 'Жашап жаткан тургундар',
      kz: 'Тұрып жатқан тұрғындар',
      uk: 'Мешканці заселеного будинку',
      en: 'Verified Residents',
      zh: '已入住业主代表',
    },
    rawDate: '2025-02-14',
    videoUrl: REVIEW_VIDEOS.kelechekFamily,
    videoDuration: '01:45 • Интервью',
    thumbnail: '/projects/Kelechek.png',
    rating: 5,
    quote: {
      ru: '«Живем в комплексе уже второй год. Закрытый безопасный двор для детей, все документы на руках, техпаспорт получили сразу. Рекомендуем компанию всем друзьям!»',
      kg: '«Бул комплексте экинчи жыл жашап жатабыз. Балдар үчүн коопсуз короо, бардык документтер колубузда. Компанияны баарына сунуштайбыз!»',
      kz: '«Бұл үйде тұрып жатқанымызға екінші жыл. Жабық қауіпсіз аула, құжаттары түгел. Баршаға ұсынамыз!»',
      uk: '«Живемо тут вже другий рік. Закрите безпечне подвір’я, техпаспорт на руках. Щиро рекомендуємо!»',
      en: '“Living here for over a year now. Gated courtyard for kids, prompt title registration, excellent community!”',
      zh: '“全家已经在这里温馨居住了第二年。全封闭人车分流内院，不动产权证书早已顺利到手，十分满意！”',
    },
    highlights: {
      ru: ['Безопасный закрытый двор', 'Государственный техпаспорт', 'Детская инфраструктура'],
      kg: ['Коопсуз жабык короо', 'Мамлекеттик техпаспорт', 'Балдар аянтчасы'],
      kz: ['Қауіпсіз жабық аула', 'Мемлекеттік техпаспорт', 'Балалар алаңы'],
      uk: ['Закритий двір без машин', 'Державний техпаспорт', 'Дитяча зона'],
      en: ['Car-free secured yard', 'Official state title deeds', 'Playground amenities'],
      zh: ['人车分流门禁园区', '取得国家正式不动产权属凭证', '专属儿童游乐空间'],
    },
  },
];

const UI: Record<Locale, {
  badge: string;
  title: string;
  desc: string;
  filterAll: string;
  statTotal: string;
  statRating: string;
  statVerified: string;
  watchBtn: string;
  closeModal: string;
  verifiedOwner: string;
  placeholderTitle: string;
  placeholderDesc: string;
}> = {
  ru: {
    badge: 'ИСТОРИИ НАШИХ СОБСТВЕННИКОВ • EL ORDO GROUP',
    title: 'ВИДЕООТЗЫВЫ РЕЗИДЕНТОВ И НОВОСЁЛОВ',
    desc: 'Реальные впечатления владельцев квартир: от первого визита в офис продаж до получения ключей и жизни в сданных домах.',
    filterAll: 'Все отзывы',
    statTotal: 'Довольных семей',
    statRating: 'Рейтинг доверия',
    statVerified: 'Юридическая чистота',
    watchBtn: 'Смотреть отзыв',
    closeModal: 'Закрыть',
    verifiedOwner: 'Проверенный покупатель',
    placeholderTitle: 'Видеоматериал оцифровывается',
    placeholderDesc: 'Скоро здесь появится полная видеозапись отзыва',
  },
  kg: {
    badge: 'БИЗДИН ТУРГУНДАРДЫН ОЙ-ПИКИРЛЕРИ • EL ORDO GROUP',
    title: 'ТУРГУНДАРДЫН ВИДЕООТЗЫВТАРЫ',
    desc: 'Батир ээлеринин чын жүрөктөн чыккан пикирлери: сатуу кеңсесинен баштап ачкыч алуу салтанатына чейин.',
    filterAll: 'Бардык пикирлер',
    statTotal: 'Бактылуу үй-бүлөлөр',
    statRating: 'Ишеним рейтинги',
    statVerified: '100% мыйзамдуулук',
    watchBtn: 'Видеону көрүү',
    closeModal: 'Жабуу',
    verifiedOwner: 'Тастыкталган батир ээси',
    placeholderTitle: 'Видеону даярдоо жүрүп жатат',
    placeholderDesc: 'Жакында бул жерде толук видеоотзыв жайгаштырылат',
  },
  kz: {
    badge: 'ТҰРҒЫНДАРЫМЫЗДЫҢ ПІКІРЛЕРІ • EL ORDO GROUP',
    title: 'ТҰРҒЫНДАРДЫҢ БЕЙНЕПІКІРЛЕРІ',
    desc: 'Пәтер иелерінің шынайы лебіздері: сату бөлімінен бастап кілт табыстауға дейінгі толық жол.',
    filterAll: 'Барлық пікірлер',
    statTotal: 'Қоныстанған отбасылар',
    statRating: 'Сенім рейтингі',
    statVerified: '100% заңды кепілдік',
    watchBtn: 'Бейнені көру',
    closeModal: 'Жабу',
    verifiedOwner: 'Расталған пәтер иесі',
    placeholderTitle: 'Бейне дайындалуда',
    placeholderDesc: 'Жақын арада бейнепікір жүктеледі',
  },
  uk: {
    badge: 'ІСТОРІЇ НАШИХ ВЛАСНИКІВ • EL ORDO GROUP',
    title: 'ВІДЕОВІДГУКИ РЕЗИДЕНТІВ ТА НОВОСЕЛІВ',
    desc: 'Реальні враження власників житла: від договору до вручення ключів та затишного життя у будинках.',
    filterAll: 'Всі відгуки',
    statTotal: 'Щасливих родин',
    statRating: 'Рейтинг довіри',
    statVerified: 'Юридична чистота',
    watchBtn: 'Дивитися відгук',
    closeModal: 'Закрити',
    verifiedOwner: 'Перевірений власник',
    placeholderTitle: 'Відео монтується',
    placeholderDesc: 'Незабаром тут з’явиться повне відео',
  },
  en: {
    badge: 'HOMEOWNER STORIES • EL ORDO GROUP',
    title: 'RESIDENT & NEWCOMER VIDEO REVIEWS',
    desc: 'Authentic testimonials from genuine property owners: from signing contracts to turnkey key handover and community living.',
    filterAll: 'All Reviews',
    statTotal: 'Satisfied Families',
    statRating: 'Trust Index',
    statVerified: 'Title Compliance',
    watchBtn: 'Watch Testimonial',
    closeModal: 'Close',
    verifiedOwner: 'Verified Property Owner',
    placeholderTitle: 'Video in post-production',
    placeholderDesc: 'The full video review will be available shortly',
  },
  zh: {
    badge: '业主温情寄语 • EL ORDO GROUP',
    title: '交房业主与常住居民视频实录',
    desc: '倾听真实业主的交付心声：从置业签约到钥匙荣耀移交，见证高品质人居兑现力。',
    filterAll: '全部视频心声',
    statTotal: '圆梦安居家庭',
    statRating: '综合信赖评分',
    statVerified: '产权保障率',
    watchBtn: '观看视频专访',
    closeModal: '关闭',
    verifiedOwner: '真实认证业主',
    placeholderTitle: '视频录像后期制作中',
    placeholderDesc: '专访原片即将在此上线呈现',
  },
};

export default function VideoReviewsSection() {
  const { locale } = useLanguage();
  const currentLang = (locale as Locale) || 'ru';
  const t = UI[currentLang] || UI.ru;

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [cinemaReview, setCinemaReview] = useState<ReviewItem | null>(null);

  // Клавиша Escape и блокировка скролла
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCinemaReview(null);
    };
    if (cinemaReview) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cinemaReview]);

  const filteredReviews = useMemo(() => {
    if (selectedFilter === 'all') return REVIEWS_DATA;
    return REVIEWS_DATA.filter((r) => r.projectSlug === selectedFilter);
  }, [selectedFilter]);

  const filterButtons = [
    { slug: 'all', label: t.filterAll },
    { slug: 'ajkol', label: 'ЖД Айкол' },
    { slug: 'ordo', label: 'КД Ордо' },
    { slug: 'kelechek', label: 'ЖК Келечек' },
    { slug: 'abu-dhabi', label: 'ЖК Abu Dhabi' },
    { slug: 'madina-residence', label: 'ЖК Madina Residence' },
  ];

  return (
    <section className="py-20 px-6 bg-[#fafbfa] dark:bg-[#07130e] border-t border-gray-200 dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Заголовок секции */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white uppercase tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-light leading-relaxed">
            {t.desc}
          </p>

          {/* Плашка доверия */}
          <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mt-6 p-2 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 shadow-sm text-center">
            <div className="p-2">
              <strong className="text-xl sm:text-2xl font-black text-[#064734] dark:text-[#d4b26f] block">600+</strong>
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{t.statTotal}</span>
            </div>
            <div className="p-2 border-x border-gray-100 dark:border-white/10">
              <strong className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 block">4.9 / 5.0</strong>
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{t.statRating}</span>
            </div>
            <div className="p-2">
              <strong className="text-xl sm:text-2xl font-black text-[#064734] dark:text-[#d4b26f] block">100%</strong>
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{t.statVerified}</span>
            </div>
          </div>
        </div>

        {/* Фильтры по комплексам */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start md:justify-center">
          {filterButtons.map((btn) => (
            <button
              key={btn.slug}
              type="button"
              onClick={() => setSelectedFilter(btn.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === btn.slug
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-md'
                  : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Сетка карточек с отзывами */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <article
              key={rev.id}
              className="bg-white dark:bg-[#0b1b15] rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Превью видео с кнопкой Play */}
              <div
                className="relative aspect-video bg-neutral-900 overflow-hidden cursor-pointer"
                onClick={() => setCinemaReview(rev)}
              >
                <Image
                  src={rev.thumbnail}
                  alt={rev.authorName[currentLang] || rev.authorName.ru}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/95 dark:bg-[#07130e]/95 group-hover:bg-[#064734] text-gray-900 group-hover:text-white dark:text-[#d4b26f] flex items-center justify-center shadow-2xl transition-all scale-100 group-hover:scale-110">
                    <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Бейдж проекта и длительность */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg bg-[#064734]/90 backdrop-blur-md text-[#d4b26f] text-[10px] font-black uppercase shadow">
                    {rev.projectName}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-bold">
                    {rev.videoDuration}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-700/90 text-white text-[10px] font-extrabold flex items-center gap-1 shadow">
                    <span>★ {t.verifiedOwner}</span>
                  </span>
                </div>
              </div>

              {/* Текстовая часть карточки */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Имя и статус */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-base font-black text-gray-950 dark:text-white">
                        {rev.authorName[currentLang] || rev.authorName.ru}
                      </h3>
                      <span className="text-[11px] font-bold text-[#8c6b23] dark:text-[#d4b26f] block">
                        {rev.roleBadge[currentLang] || rev.roleBadge.ru}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-semibold shrink-0">
                      {formatLocalizedDate(rev.rawDate, currentLang)}
                    </span>
                  </div>

                  {/* Цитата */}
                  <p className="text-xs text-gray-600 dark:text-gray-300 italic font-light leading-relaxed mb-4">
                    {rev.quote[currentLang] || rev.quote.ru}
                  </p>

                  {/* Ключевые теги */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(rev.highlights[currentLang] || rev.highlights.ru).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-[10px] font-semibold text-gray-700 dark:text-gray-300"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Кнопка открытия видео */}
                <button
                  type="button"
                  onClick={() => setCinemaReview(rev)}
                  className="w-full py-3 px-4 rounded-xl bg-gray-100 hover:bg-[#064734] dark:bg-white/5 dark:hover:bg-[#d4b26f] text-gray-800 hover:text-white dark:text-gray-200 dark:hover:text-[#064734] font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-gray-200 dark:border-white/10"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>{t.watchBtn}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* МОДАЛЬНЫЙ КИНОТЕАТР ДЛЯ ОТЗЫВА */}
      {cinemaReview && (() => {
        const { isDirectVideo, src } = formatVideoSource(cinemaReview.videoUrl);

        return (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
            onClick={() => setCinemaReview(null)}
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
                    {cinemaReview.projectName} • {cinemaReview.authorName[currentLang] || cinemaReview.authorName.ru}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCinemaReview(null)}
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
                        title={cinemaReview.authorName[currentLang] || cinemaReview.authorName.ru}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    )
                  ) : (
                    <div className="p-8 text-center text-neutral-400">
                      <span className="text-base font-bold text-white block mb-1">{t.placeholderTitle}</span>
                      <span className="text-xs text-neutral-400">{t.placeholderDesc}</span>
                    </div>
                  )}
                </div>

                {/* Описание и цитата внизу */}
                <div className="p-6 text-white bg-neutral-900/80 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#d4b26f]">
                      {cinemaReview.roleBadge[currentLang] || cinemaReview.roleBadge.ru}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {formatLocalizedDate(cinemaReview.rawDate, currentLang)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-200 italic font-light leading-relaxed">
                    {cinemaReview.quote[currentLang] || cinemaReview.quote.ru}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}