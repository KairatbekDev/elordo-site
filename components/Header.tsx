'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { COMPANY_INFO } from '@/lib/data';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { reachGoal } from '@/components/YandexMetrika';
import { trackWhatsAppClick } from '@/lib/analytics';
import {
  IconWhatsApp,
  IconInstagram,
  IconArrowRight,
} from '@/components/Icons';

function normalizeLocale(loc: any): Locale {
  if (!loc) return 'ru';
  const l = String(loc).toLowerCase().trim();
  if (l.startsWith('kg') || l.startsWith('ky')) return 'kg';
  if (l.startsWith('kz') || l.startsWith('kk')) return 'kz';
  if (l.startsWith('uk') || l.startsWith('ua')) return 'uk';
  if (l.startsWith('en')) return 'en';
  if (l.startsWith('zh') || l.startsWith('cn')) return 'zh';
  return 'ru';
}

const CONSTRUCTION_LABELS: Record<Locale, string> = {
  ru: 'Ход строительства',
  kg: 'Курулуш жүрүшү',
  kz: 'Құрылыс барысы',
  uk: 'Хід будівництва',
  en: 'Construction',
  zh: '工程进度',
};

const NAV_DROPDOWNS: Record<Locale, {
  commercial: string;
  buyers: string;
  shahmatka: string;
  terms: string;
  installment: string;
  tradeIn: string;
  fullPayment: string;
  company: string;
  about: string;
  reviews: string;
  contacts: string;
}> = {
  ru: {
    commercial: 'Коммерция',
    buyers: 'Покупателям',
    shahmatka: 'Шахматка квартир',
    terms: 'Условия покупки',
    installment: 'Рассрочка 0%',
    tradeIn: 'Trade-in (Обмен)',
    fullPayment: '100% оплата со скидкой',
    company: 'О компании',
    about: 'О девелопере',
    reviews: 'Видеоотзывы',
    contacts: 'Контакты',
  },
  kg: {
    commercial: 'Коммерция',
    buyers: 'Сатып алуучуларга',
    shahmatka: 'Батирлер шахматкасы',
    terms: 'Сатып алуу шарттары',
    installment: '0% бөлүп төлөө',
    tradeIn: 'Trade-in (Алмашуу)',
    fullPayment: '100% төлөм арзандатуу менен',
    company: 'Компания тууралуу',
    about: 'Куруучу жөнүндө',
    reviews: 'Видеопикирлер',
    contacts: 'Байланыштар',
  },
  kz: {
    commercial: 'Коммерция',
    buyers: 'Сатып алушыларға',
    shahmatka: 'Пәтерлер шахматкасы',
    terms: 'Сатып алу шарттары',
    installment: '0% бөліп төлеу',
    tradeIn: 'Trade-in (Алмасу)',
    fullPayment: '100% төлем жеңілдікпен',
    company: 'Компания туралы',
    about: 'Құрылыс салушы туралы',
    reviews: 'Бейнепікірлер',
    contacts: 'Байланыс',
  },
  uk: {
    commercial: 'Комерція',
    buyers: 'Покупцям',
    shahmatka: 'Шахматка квартир',
    terms: 'Умови купівлі',
    installment: 'Розстрочка 0%',
    tradeIn: 'Trade-in (Обмін)',
    fullPayment: '100% оплата зі знижкою',
    company: 'Про компанію',
    about: 'Про девелопера',
    reviews: 'Відеовідгуки',
    contacts: 'Контакти',
  },
  en: {
    commercial: 'Commercial',
    buyers: 'For Buyers',
    shahmatka: 'Interactive Floor Grid',
    terms: 'Purchase Terms',
    installment: '0% Installment',
    tradeIn: 'Trade-in Exchange',
    fullPayment: '100% Cash Discount',
    company: 'Company',
    about: 'About Developer',
    reviews: 'Video Reviews',
    contacts: 'Contacts',
  },
  zh: {
    commercial: '商业不动产',
    buyers: '置业通道',
    shahmatka: '交互式销控选房',
    terms: '置业方案',
    installment: '0%免息分期',
    tradeIn: '以旧换新置换',
    fullPayment: '一次性全款特惠',
    company: '关于集团',
    about: '集团概况',
    reviews: '业主视频心声',
    contacts: '联系我们',
  },
};

const WA_CONSULTATION_TEXTS: Record<Locale, string> = {
  ru: 'Здравствуйте! Хочу получить подробную консультацию по объектам компании EL ORDO GROUP и условиям рассрочки.',
  kg: 'Саламатсызбы! EL ORDO GROUP компаниясынын объектилери жана бөлүп төлөө шарттары боюнча толук кеңеш алгым келет.',
  kz: 'Сәлеметсіз бе! EL ORDO GROUP компаниясының нысандары және бөліп төлеу шарттары бойынша толық кеңес алгым келеді.',
  uk: 'Доброго дня! Хочу отримати детальну консультацію щодо об’єктів компанії EL ORDO GROUP та умов розстрочки.',
  en: 'Hello! I would like to get a detailed consultation on EL ORDO GROUP properties and installment plans.',
  zh: '您好！我想详细咨询 EL ORDO GROUP 旗下的楼盘项目及免息分期方案。',
};

const OFFLINE_LABELS: Record<Locale, string> = {
  ru: 'Отдел продаж офлайн',
  kg: 'Сатуу бөлүмү жабык',
  kz: 'Сату бөлімі жабық',
  uk: 'Відділ продажів офлайн',
  en: 'Sales Office Offline',
  zh: '销售部休息中',
};

const QUICK_PROJECTS_INFO: Record<Locale, {
  abuDhabi: string;
  madina: string;
  ajkolPlus: string;
  closeMenuAria: string;
  openMenuAria: string;
}> = {
  ru: {
    abuDhabi: 'от 1 650 $/м² • Премиум',
    madina: 'от 1 500 $/м² • Бизнес',
    ajkolPlus: 'от 1 200 $/м² • Эко-зона',
    closeMenuAria: 'Закрыть меню',
    openMenuAria: 'Открыть меню',
  },
  kg: {
    abuDhabi: '1 650 $/м² баштап • Премиум',
    madina: '1 500 $/м² баштап • Бизнес',
    ajkolPlus: '1 200 $/м² баштап • Эко-аймак',
    closeMenuAria: 'Менюну жабуу',
    openMenuAria: 'Менюну ачуу',
  },
  kz: {
    abuDhabi: '1 650 $/м² бастап • Премиум',
    madina: '1 500 $/м² бастап • Бизнес',
    ajkolPlus: '1 200 $/м² бастап • Эко-аймақ',
    closeMenuAria: 'Мәзірді жабу',
    openMenuAria: 'Мәзірді ашу',
  },
  uk: {
    abuDhabi: 'від 1 650 $/м² • Преміум',
    madina: 'від 1 500 $/м² • Бізнес',
    ajkolPlus: 'від 1 200 $/м² • Еко-зона',
    closeMenuAria: 'Закрити меню',
    openMenuAria: 'Відкрити меню',
  },
  en: {
    abuDhabi: 'from $1,650/m² • Premium',
    madina: 'from $1,500/m² • Business',
    ajkolPlus: 'from $1,200/m² • Eco-zone',
    closeMenuAria: 'Close menu',
    openMenuAria: 'Open menu',
  },
  zh: {
    abuDhabi: '1 650 $/m² 起 • 尊享级',
    madina: '1 500 $/m² 起 • 商务级',
    ajkolPlus: '1 200 $/m² 起 • 生态麓区',
    closeMenuAria: '关闭菜单',
    openMenuAria: '打开菜单',
  },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Состояния аккордеонов для мобильного меню
  const [mobileBuyersOpen, setMobileBuyersOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  const pathname = usePathname();
  const { locale, t } = useLanguage();

  const currentLang: Locale = normalizeLocale(locale);
  const quickInfo = QUICK_PROJECTS_INFO[currentLang] || QUICK_PROJECTS_INFO.ru;
  const navText = NAV_DROPDOWNS[currentLang] || NAV_DROPDOWNS.ru;
  const cleanWaNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';

  // Автоматическая проверка рабочего времени по Бишкеку
  useEffect(() => {
    const checkWorkingHours = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Bishkek',
          weekday: 'short',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        });

        const parts = formatter.formatToParts(new Date());
        let dayStr = 'Sun';
        let hours = 0;
        let minutes = 0;

        parts.forEach((p) => {
          if (p.type === 'weekday') dayStr = p.value;
          if (p.type === 'hour') hours = parseInt(p.value, 10) || 0;
          if (p.type === 'minute') minutes = parseInt(p.value, 10) || 0;
        });

        const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
        const day = dayMap[dayStr] ?? 0;
        const timeInMinutes = hours * 60 + minutes;

        let open = false;
        if (day >= 1 && day <= 5) {
          // Пн–Пт: 09:00 (540 мин) – 18:00 (1080 мин)
          open = timeInMinutes >= 540 && timeInMinutes < 1080;
        } else if (day === 6) {
          // Суббота: 10:00 (600 мин) – 16:00 (960 мин)
          open = timeInMinutes >= 600 && timeInMinutes < 960;
        } else {
          // Воскресенье: выходной
          open = false;
        }
        setIsOnline(open);
      } catch (e) {
        setIsOnline(true);
      }
    };

    checkWorkingHours();
    const interval = setInterval(checkWorkingHours, 60000);
    return () => clearInterval(interval);
  }, []);

  const constructionLabel =
    (t.header as Record<string, string>)?.construction ||
    CONSTRUCTION_LABELS[currentLang] ||
    CONSTRUCTION_LABELS.ru;

  // Отслеживание скролла для тени
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокировка прокрутки экрана при открытом мобильном меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const waConsultationText = encodeURIComponent(
    WA_CONSULTATION_TEXTS[currentLang] || WA_CONSULTATION_TEXTS.ru
  );

  const handleWhatsAppHeaderClick = (source: string) => {
    try {
      reachGoal('wa_click');
    } catch {}
    trackWhatsAppClick(source, 'EL ORDO GROUP');
  };

  const handlePhoneHeaderClick = () => {
    try {
      reachGoal('call_click');
    } catch {}
  };

  // Проверка активности родительских дропдаунов
  const isBuyersActive = ['/usloviya', '/rassrochka', '/trade-in', '/polniy-raschet'].includes(pathname);
  const isCompanyActive = ['/o-kompanii', '/about', '/otzyvy', '/contacts'].includes(pathname);

  return (
    <>
      <header
        className={`sticky top-0 z-[1001] bg-white/95 dark:bg-[#07130e]/95 backdrop-blur-md transition-all duration-200 border-b ${
          isScrolled
            ? 'border-gray-200 dark:border-white/10 shadow-md'
            : 'border-gray-100 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          
          {/* 1. Логотип компании */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#064734] border border-[#d4b26f]/30 flex items-center justify-center p-1.5 shadow-sm group-hover:bg-[#032b20] group-hover:scale-105 transition-all shrink-0">
              <Image
                src="/logo-icon.png"
                alt="EL ORDO GROUP"
                width={40}
                height={40}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#064734] dark:text-neutral-100 uppercase leading-none">
                  El Ordo
                </span>
                <span className="text-[10px] bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] font-bold px-1.5 py-0.5 rounded-md">
                  Group
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-gray-500 dark:text-neutral-400 font-semibold">
                {t.header.companySubtitle}
              </span>
            </div>
          </Link>

          {/* 2. Навигация для десктопа (5 сбалансированных пунктов) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Каталог */}
            <Link
              href="/projects"
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all ${
                pathname === '/projects'
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                  : 'text-gray-700 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f] hover:bg-gray-100/70 dark:hover:bg-white/5'
              }`}
            >
              {t.header.catalog}
            </Link>

            {/* Ход строительства */}
            <Link
              href="/hod-stroitelstva"
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all ${
                pathname === '/hod-stroitelstva'
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                  : 'text-gray-700 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f] hover:bg-gray-100/70 dark:hover:bg-white/5'
              }`}
            >
              {constructionLabel}
            </Link>

            {/* Коммерция */}
            <Link
              href="/commercial"
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all ${
                pathname === '/commercial'
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                  : 'text-gray-700 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f] hover:bg-gray-100/70 dark:hover:bg-white/5'
              }`}
            >
              {navText.commercial}
            </Link>

            {/* Дропдаун: Покупателям ▾ */}
            <div className="relative group">
              <button
                type="button"
                className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isBuyersActive
                    ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                    : 'text-gray-700 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f] hover:bg-gray-100/70 dark:hover:bg-white/5'
                }`}
              >
                <span>{navText.buyers}</span>
                <svg className="w-3 h-3 opacity-60 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Выпадающее окно с hover-мостом */}
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[220px]">
                <div className="bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl space-y-1">
                  <Link
                    href="/usloviya"
                    className="block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-xs font-bold text-gray-800 dark:text-neutral-200 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                  >
                    {navText.terms}
                  </Link>
                  <Link
                    href="/rassrochka"
                    className="block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-xs font-bold text-gray-800 dark:text-neutral-200 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                  >
                    {navText.installment}
                  </Link>
                  <Link
                    href="/trade-in"
                    className="block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-xs font-bold text-gray-800 dark:text-neutral-200 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                  >
                    {navText.tradeIn}
                  </Link>
                  <Link
                    href="/polniy-raschet"
                    className="block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-xs font-bold text-gray-800 dark:text-neutral-200 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                  >
                    {navText.fullPayment}
                  </Link>
                </div>
              </div>
            </div>

            {/* Дропдаун: О компании ▾ */}
            <div className="relative group">
              <button
                type="button"
                className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isCompanyActive
                    ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                    : 'text-gray-700 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f] hover:bg-gray-100/70 dark:hover:bg-white/5'
                }`}
              >
                <span>{navText.company}</span>
                <svg className="w-3 h-3 opacity-60 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px]">
                <div className="bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl space-y-1">
                  <Link
                    href="/o-kompanii"
                    className="block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-xs font-bold text-gray-800 dark:text-neutral-200 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                  >
                    {navText.about}
                  </Link>
                  <Link
                    href="/otzyvy"
                    className="block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-xs font-bold text-gray-800 dark:text-neutral-200 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                  >
                    {navText.reviews}
                  </Link>
                  <Link
                    href="/contacts"
                    className="block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-xs font-bold text-gray-800 dark:text-neutral-200 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                  >
                    {navText.contacts}
                  </Link>
                </div>
              </div>
            </div>

          </nav>

          {/* 3. Правый блок: телефон + язык + тема + консультация */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Телефон и статус работы */}
            <div className="hidden xl:flex flex-col items-end text-right mr-1">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-neutral-400 tracking-wider">
                  {isOnline ? t.header.salesOnline : (OFFLINE_LABELS[currentLang] || OFFLINE_LABELS.ru)}
                </span>
              </div>
              <a
                href={`tel:${COMPANY_INFO.phones[0]?.replace(/\s+/g, '') || '+996709115115'}`}
                onClick={handlePhoneHeaderClick}
                className="text-xs sm:text-sm font-black text-gray-900 dark:text-neutral-100 hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors"
              >
                {COMPANY_INFO.phones[0] || '+996 709 115 115'}
              </a>
            </div>

            {/* Выбор языка */}
            <LanguageSelector />

            {/* Переключатель темы */}
            <ThemeToggle />

            {/* Кнопка WhatsApp */}
            <a
              href={`https://wa.me/${cleanWaNumber}?text=${waConsultationText}`}
              onClick={() => handleWhatsAppHeaderClick('header_desktop_consultation')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#064734] hover:bg-[#032b20] active:scale-95 text-[#d4b26f] hover:text-white text-xs sm:text-sm font-extrabold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0"
            >
              <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
              <span className="hidden md:inline">{t.header.consultation}</span>
            </a>

            {/* Бургер-кнопка для мобильных */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? quickInfo.closeMenuAria : quickInfo.openMenuAria}
              className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors focus:outline-none cursor-pointer"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>

        </div>
      </header>

      {/* 4. Полноэкранное мобильное меню (Drawer) с аккордеонами */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1100] bg-black/60 backdrop-blur-sm lg:hidden animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-sm ml-auto h-full bg-white dark:bg-[#0b1b15] text-gray-900 dark:text-neutral-100 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Шапка мобильного меню */}
              <div className="flex items-center justify-between pb-5 border-b border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#064734] border border-[#d4b26f]/30 flex items-center justify-center p-1 shadow-sm shrink-0">
                    <Image
                      src="/logo-icon.png"
                      alt="EL ORDO GROUP"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-lg font-black text-[#064734] dark:text-[#d4b26f] uppercase">EL ORDO</span>
                  <span className="text-[10px] bg-[#064734]/10 dark:bg-white/10 text-[#064734] dark:text-[#d4b26f] font-bold px-1.5 py-0.5 rounded">
                    {t.header.menu}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={quickInfo.closeMenuAria}
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Основные ссылки навигации в мобильном меню */}
              <nav className="flex flex-col gap-1.5 mt-6">
                
                {/* Каталог */}
                <Link
                  href="/projects"
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-sm font-extrabold flex items-center justify-between transition-colors ${
                    pathname === '/projects'
                      ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734]'
                      : 'text-gray-800 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{t.header.catalog}</span>
                  <IconArrowRight className="w-4 h-4 opacity-70" />
                </Link>

                {/* Ход строительства */}
                <Link
                  href="/hod-stroitelstva"
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-sm font-extrabold flex items-center justify-between transition-colors ${
                    pathname === '/hod-stroitelstva'
                      ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734]'
                      : 'text-gray-800 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{constructionLabel}</span>
                  <IconArrowRight className="w-4 h-4 opacity-70" />
                </Link>

                {/* Коммерция */}
                <Link
                  href="/commercial"
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-sm font-extrabold flex items-center justify-between transition-colors ${
                    pathname === '/commercial'
                      ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734]'
                      : 'text-gray-800 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{navText.commercial}</span>
                  <IconArrowRight className="w-4 h-4 opacity-70" />
                </Link>

                {/* Аккордеон: Покупателям */}
                <div className="rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileBuyersOpen(!mobileBuyersOpen)}
                    className="w-full px-4 py-3 text-sm font-extrabold flex items-center justify-between text-gray-800 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <span>{navText.buyers}</span>
                    <span className="text-base font-bold text-[#d4b26f]">{mobileBuyersOpen ? '−' : '+'}</span>
                  </button>
                  {mobileBuyersOpen && (
                    <div className="px-4 pb-3 space-y-2 bg-gray-50/50 dark:bg-white/5 pt-1">
                      <Link
                        href="/usloviya"
                        onClick={() => setIsOpen(false)}
                        className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                      >
                        • {navText.terms}
                      </Link>
                      <Link
                        href="/rassrochka"
                        onClick={() => setIsOpen(false)}
                        className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                      >
                        • {navText.installment}
                      </Link>
                      <Link
                        href="/trade-in"
                        onClick={() => setIsOpen(false)}
                        className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                      >
                        • {navText.tradeIn}
                      </Link>
                      <Link
                        href="/polniy-raschet"
                        onClick={() => setIsOpen(false)}
                        className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                      >
                        • {navText.fullPayment}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Аккордеон: О компании */}
                <div className="rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                    className="w-full px-4 py-3 text-sm font-extrabold flex items-center justify-between text-gray-800 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <span>{navText.company}</span>
                    <span className="text-base font-bold text-[#d4b26f]">{mobileCompanyOpen ? '−' : '+'}</span>
                  </button>
                  {mobileCompanyOpen && (
                    <div className="px-4 pb-3 space-y-2 bg-gray-50/50 dark:bg-white/5 pt-1">
                      <Link
                        href="/o-kompanii"
                        onClick={() => setIsOpen(false)}
                        className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                      >
                        • {navText.about}
                      </Link>
                      <Link
                        href="/otzyvy"
                        onClick={() => setIsOpen(false)}
                        className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                      >
                        • {navText.reviews}
                      </Link>
                      <Link
                        href="/contacts"
                        onClick={() => setIsOpen(false)}
                        className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f]"
                      >
                        • {navText.contacts}
                      </Link>
                    </div>
                  )}
                </div>

              </nav>

              {/* Быстрый переход к флагманским объектам */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10">
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 dark:text-neutral-400 block mb-3">
                  {t.header.flagshipProjects}
                </span>
                <div className="space-y-2">
                  <Link
                    href="/abu-dhabi"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-[#064734]/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="text-xs font-bold text-gray-900 dark:text-neutral-100">ЖК Abu Dhabi</div>
                    <div className="text-[11px] text-[#d4b26f] font-semibold">{quickInfo.abuDhabi}</div>
                  </Link>

                  <Link
                    href="/madina-residence"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-[#064734]/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="text-xs font-bold text-gray-900 dark:text-neutral-100">ЖК Madina Residence</div>
                    <div className="text-[11px] text-[#d4b26f] font-semibold">{quickInfo.madina}</div>
                  </Link>

                  <Link
                    href="/ajkol-plus"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-[#064734]/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="text-xs font-bold text-gray-900 dark:text-neutral-100">ЖД Айкол +</div>
                    <div className="text-[11px] text-[#d4b26f] font-semibold">{quickInfo.ajkolPlus}</div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Нижняя часть мобильного меню */}
            <div className="pt-6 border-t border-gray-100 dark:border-white/10 mt-6 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <div className="mb-4">
                <span className="text-[11px] text-gray-400 dark:text-neutral-400 block mb-1">{t.header.hotline}</span>
                <a
                  href={`tel:${COMPANY_INFO.phones[0]?.replace(/\s+/g, '') || '+996709115115'}`}
                  onClick={handlePhoneHeaderClick}
                  className="text-base font-black text-[#064734] dark:text-[#d4b26f] block"
                >
                  {COMPANY_INFO.phones[0] || '+996 709 115 115'}
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phones[1]?.replace(/\s+/g, '') || '+996990115115'}`}
                  onClick={handlePhoneHeaderClick}
                  className="text-xs text-gray-600 dark:text-neutral-300 block mt-0.5"
                >
                  {COMPANY_INFO.phones[1] || '+996 990 115 115'}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${cleanWaNumber}?text=${waConsultationText}`}
                  onClick={() => handleWhatsAppHeaderClick('header_mobile_drawer')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-2 rounded-xl bg-[#064734] hover:bg-[#032b20] text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={COMPANY_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-2 rounded-xl border border-gray-200 dark:border-white/15 text-gray-800 dark:text-neutral-200 font-bold text-xs text-center flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <IconInstagram className="w-4 h-4 text-pink-600" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}