'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPANY_INFO } from '@/lib/data';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { reachGoal } from '@/components/YandexMetrika';
import {
  IconWhatsApp,
  IconInstagram,
  IconArrowRight,
} from '@/components/Icons';

const CONSTRUCTION_LABELS: Record<Locale, string> = {
  ru: 'Ход строительства',
  kg: 'Курулуш жүрүшү',
  kz: 'Құрылыс барысы',
  uk: 'Хід будівництва',
  en: 'Construction',
  zh: '工程进度',
};

const WA_CONSULTATION_TEXTS: Record<Locale, string> = {
  ru: 'Здравствуйте! Хочу получить подробную консультацию по объектам компании EL ORDO GROUP и условиям рассрочки.',
  kg: 'Саламатсызбы! EL ORDO GROUP компаниясынын объектилери жана бөлүп төлөө шарттары боюнча толук кеңеш алгым келет.',
  kz: 'Сәлеметсіз бе! EL ORDO GROUP компаниясының нысандары және бөліп төлеу шарттары бойынша толық кеңес алғым келеді.',
  uk: 'Доброго дня! Хочу отримати детальну консультацію щодо об’єктів компанії EL ORDO GROUP та умов розстрочки.',
  en: 'Hello! I would like to get a detailed consultation on EL ORDO GROUP properties and installment plans.',
  zh: '您好！我想详细咨询 EL ORDO GROUP 旗下的楼盘项目及免息分期方案。',
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
    madina: 'от 1 400 $/м² • Бизнес',
    ajkolPlus: 'от 1 100 $/м² • Эко-зона',
    closeMenuAria: 'Закрыть меню',
    openMenuAria: 'Открыть меню',
  },
  kg: {
    abuDhabi: '1 650 $/м² баштап • Премиум',
    madina: '1 400 $/м² баштап • Бизнес',
    ajkolPlus: '1 100 $/м² баштап • Эко-аймак',
    closeMenuAria: 'Менюну жабуу',
    openMenuAria: 'Менюну ачуу',
  },
  kz: {
    abuDhabi: '1 650 $/м² бастап • Премиум',
    madina: '1 400 $/м² бастап • Бизнес',
    ajkolPlus: '1 100 $/м² бастап • Эко-аймақ',
    closeMenuAria: 'Мәзірді жабу',
    openMenuAria: 'Мәзірді ашу',
  },
  uk: {
    abuDhabi: 'від 1 650 $/м² • Преміум',
    madina: 'від 1 400 $/м² • Бізнес',
    ajkolPlus: 'від 1 100 $/м² • Еко-зона',
    closeMenuAria: 'Закрити меню',
    openMenuAria: 'Відкрити меню',
  },
  en: {
    abuDhabi: 'from $1,650/m² • Premium',
    madina: 'from $1,400/m² • Business',
    ajkolPlus: 'from $1,100/m² • Eco-zone',
    closeMenuAria: 'Close menu',
    openMenuAria: 'Open menu',
  },
  zh: {
    abuDhabi: '1 650 $/m² 起 • 尊享级',
    madina: '1 400 $/m² 起 • 商务级',
    ajkolPlus: '1 100 $/m² 起 • 生态麓区',
    closeMenuAria: '关闭菜单',
    openMenuAria: '打开菜单',
  },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, t } = useLanguage();

  const currentLang: Locale = (locale as Locale) || 'ru';
  const quickInfo = QUICK_PROJECTS_INFO[currentLang] || QUICK_PROJECTS_INFO.ru;

  const constructionLabel =
    (t.header as Record<string, string>)?.construction ||
    CONSTRUCTION_LABELS[currentLang] ||
    CONSTRUCTION_LABELS.ru;

  const navLinks = useMemo(() => [
    { href: '/projects', label: t.header.catalog },
    { href: '/hod-stroitelstva', label: constructionLabel },
    { href: '/usloviya', label: t.header.terms },
    { href: '/o-kompanii', label: t.header.about },
    { href: '/contacts', label: t.header.contacts },
  ], [t.header, constructionLabel]);

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
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const waConsultationText = encodeURIComponent(
    WA_CONSULTATION_TEXTS[currentLang] || WA_CONSULTATION_TEXTS.ru
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/95 dark:bg-[#07130e]/95 backdrop-blur-md transition-all duration-200 border-b ${
          isScrolled
            ? 'border-gray-200 dark:border-white/10 shadow-md'
            : 'border-gray-100 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          
          {/* 1. Логотип компании */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#064734] border border-[#d4b26f]/30 flex items-center justify-center p-1.5 shadow-sm group-hover:bg-[#032b20] group-hover:scale-105 transition-all shrink-0">
              <img
                src="/logo-icon.png"
                alt="EL ORDO GROUP"
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

          {/* 2. Навигация для десктопа с переводом */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                      : 'text-gray-700 dark:text-neutral-300 hover:text-[#064734] dark:hover:text-[#d4b26f] hover:bg-gray-100/70 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. Правый блок: телефон + язык + тема + консультация */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Прямой телефон и статус */}
            <div className="hidden xl:flex flex-col items-end text-right mr-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-neutral-400 tracking-wider">
                  {t.header.salesOnline}
                </span>
              </div>
              <a
                href={`tel:${COMPANY_INFO.phones[0]?.replace(/\s+/g, '') || '+996709115115'}`}
                onClick={() => reachGoal('call_click')}
                className="text-xs sm:text-sm font-black text-gray-900 dark:text-neutral-100 hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors"
              >
                {COMPANY_INFO.phones[0] || '+996 709 115 115'}
              </a>
            </div>

            {/* Выбор языка */}
            <LanguageSelector />

            {/* Переключатель светлой / темной темы */}
            <ThemeToggle />

            {/* Кнопка WhatsApp */}
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${waConsultationText}`}
              onClick={() => reachGoal('wa_click')}
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

      {/* 4. Полноэкранное мобильное меню (Drawer) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-sm ml-auto h-full bg-white dark:bg-[#0b1b15] text-gray-900 dark:text-neutral-100 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Шапка меню */}
              <div className="flex items-center justify-between pb-5 border-b border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#064734] border border-[#d4b26f]/30 flex items-center justify-center p-1 shadow-sm shrink-0">
                    <img
                      src="/logo-icon.png"
                      alt="EL ORDO GROUP"
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

              {/* Основные ссылки навигации */}
              <nav className="flex flex-col gap-1.5 mt-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-sm font-extrabold flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734]'
                          : 'text-gray-800 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      <IconArrowRight className="w-4 h-4 opacity-70" />
                    </Link>
                  );
                })}
              </nav>

              {/* Быстрый переход к объектам */}
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

            {/* Нижняя часть меню */}
            <div className="pt-6 border-t border-gray-100 dark:border-white/10 mt-6">
              <div className="mb-4">
                <span className="text-[11px] text-gray-400 dark:text-neutral-400 block mb-1">{t.header.hotline}</span>
                <a
                  href={`tel:${COMPANY_INFO.phones[0]?.replace(/\s+/g, '') || '+996709115115'}`}
                  onClick={() => reachGoal('call_click')}
                  className="text-base font-black text-[#064734] dark:text-[#d4b26f] block"
                >
                  {COMPANY_INFO.phones[0] || '+996 709 115 115'}
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phones[1]?.replace(/\s+/g, '') || '+996990115115'}`}
                  onClick={() => reachGoal('call_click')}
                  className="text-xs text-gray-600 dark:text-neutral-300 block mt-0.5"
                >
                  {COMPANY_INFO.phones[1] || '+996 990 115 115'}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${waConsultationText}`}
                  onClick={() => reachGoal('wa_click')}
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