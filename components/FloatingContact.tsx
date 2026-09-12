'use client';

import { useState, useEffect } from 'react';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { reachGoal } from '@/components/YandexMetrika';
import {
  IconWhatsApp,
  IconInstagram,
  IconMapPin,
  IconPhone,
} from '@/components/Icons';

interface FloatingContactContent {
  badge: string;
  ariaLabel: string;
  salesDept: string;
  online: string;
  chatWhatsapp: string;
  replyTime: string;
  callManager: string;
  mainPhone: string;
  secondaryPhone: string;
  office2gis: string;
  waText: string;
}

const CONTENT: Record<Locale, FloatingContactContent> = {
  ru: {
    badge: 'Консультация 0%',
    ariaLabel: 'Связаться с отделом продаж',
    salesDept: 'Отдел продаж EL ORDO',
    online: 'Онлайн',
    chatWhatsapp: 'Чат в WhatsApp',
    replyTime: 'Ответим за 2 минуты',
    callManager: 'Позвонить менеджеру:',
    mainPhone: 'Основной',
    secondaryPhone: 'Доп. линия',
    office2gis: 'Офис в 2GIS',
    waText: 'Здравствуйте! Хочу получить консультацию по объектам EL ORDO GROUP.',
  },
  kg: {
    badge: 'Кеңеш алуу 0%',
    ariaLabel: 'Сатуу бөлүмү менен байланышуу',
    salesDept: 'EL ORDO сатуу бөлүмү',
    online: 'Онлайн',
    chatWhatsapp: 'WhatsApp аркылуу баарлашуу',
    replyTime: '2 мүнөттө жооп беребиз',
    callManager: 'Менеджерге чалуу:',
    mainPhone: 'Негизги',
    secondaryPhone: 'Кошумча линия',
    office2gis: '2GIS аркылуу офис',
    waText: 'Саламатсызбы! EL ORDO GROUP объектилери боюнча кеңеш алгым келет.',
  },
  kz: {
    badge: 'Кеңес алу 0%',
    ariaLabel: 'Сату бөлімімен байланысу',
    salesDept: 'EL ORDO сатуу бөлімі',
    online: 'Онлайн',
    chatWhatsapp: 'WhatsApp-та жазуу',
    replyTime: '2 минутта жауап береміз',
    callManager: 'Менеджерге қоңырау шалу:',
    mainPhone: 'Негізгі',
    secondaryPhone: 'Қосымша желі',
    office2gis: '2GIS кеңсесі',
    waText: 'Сәлеметсіз бе! EL ORDO GROUP нысандары бойынша кеңес алғым келеді.',
  },
  uk: {
    badge: 'Консультація 0%',
    ariaLabel: 'Зв’язатися з відділом продажів',
    salesDept: 'Відділ продажів EL ORDO',
    online: 'Онлайн',
    chatWhatsapp: 'Чат у WhatsApp',
    replyTime: 'Відповімо за 2 хвилини',
    callManager: 'Зателефонувати менеджеру:',
    mainPhone: 'Основний',
    secondaryPhone: 'Дод. лінія',
    office2gis: 'Офіс у 2GIS',
    waText: 'Доброго дня! Хочу отримати консультацію щодо об’єктів EL ORDO GROUP.',
  },
  en: {
    badge: '0% Consultation',
    ariaLabel: 'Contact sales department',
    salesDept: 'EL ORDO Sales Team',
    online: 'Online',
    chatWhatsapp: 'Chat on WhatsApp',
    replyTime: 'Replies within 2 minutes',
    callManager: 'Call a manager:',
    mainPhone: 'Main line',
    secondaryPhone: 'Direct line',
    office2gis: 'Office in 2GIS',
    waText: 'Hello! I would like to get a consultation on EL ORDO GROUP developments.',
  },
  zh: {
    badge: '0% 置业咨询',
    ariaLabel: '联系品牌营销中心',
    salesDept: 'EL ORDO 营销中心',
    online: '顾问在线',
    chatWhatsapp: 'WhatsApp 咨询',
    replyTime: '2分钟内极速响应',
    callManager: '一键致电顾问：',
    mainPhone: '主线电话',
    secondaryPhone: '专线电话',
    office2gis: '2GIS 导航到店',
    waText: '您好！我想咨询了解 EL ORDO GROUP 旗下各住宅楼盘详情。',
  },
};

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const c = CONTENT[currentLang] || CONTENT.ru;

  // Закрытие по нажатию клавиши Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    if (showBadge) setShowBadge(false);
  };

  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(c.waText)}`;

  return (
    <>
      {/* 1. Фоновый оверлей при открытом меню */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 backdrop-blur-[2px] transition-opacity animate-fadeIn"
          aria-hidden="true"
        />
      )}

      {/* 2. Плавающий контейнер с безопасным отступом для iPhone (safe-area) */}
      <div 
        style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
        className="fixed right-4 sm:right-6 z-50 flex flex-col items-end gap-2.5 font-sans select-none"
      >
        
        {/* Всплывающее меню каналов связи */}
        {isOpen && (
          <div className="flex flex-col gap-2.5 bg-white/95 dark:bg-[#0b1b15]/95 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-gray-100 dark:border-white/10 w-[290px] max-w-[calc(100vw-2rem)] animate-fadeIn text-gray-900 dark:text-gray-100">
            
            {/* Статус-панель отдела продаж */}
            <div className="flex items-center justify-between px-1 pb-2 border-b border-gray-100 dark:border-white/10">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-neutral-400">
                {c.salesDept}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/40 px-2 py-0.5 rounded-full font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {c.online}
              </span>
            </div>

            {/* Быстрый чат WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                reachGoal('wa_click');
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-[#25D366]/10 dark:bg-[#25D366]/15 hover:bg-[#25D366]/20 active:scale-[0.98] text-[#128C7E] dark:text-[#25D366] font-extrabold text-xs sm:text-sm transition-all border border-[#25D366]/25 shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                <IconWhatsApp className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="leading-tight">{c.chatWhatsapp}</span>
                <span className="text-[10px] text-gray-500 dark:text-neutral-400 font-normal">{c.replyTime}</span>
              </div>
            </a>

            {/* Прямые звонки в отдел продаж */}
            <div className="p-2.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 select-text">
              <span className="text-[10px] font-bold text-gray-400 dark:text-neutral-400 block mb-1 select-none">{c.callManager}</span>
              
              <a
                href={`tel:${COMPANY_INFO.phones[0]?.replace(/\s+/g, '') || '+996709115115'}`}
                onClick={() => {
                  reachGoal('call_click');
                  setIsOpen(false);
                }}
                className="flex items-center justify-between py-1 text-xs font-black text-gray-900 dark:text-white hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <IconPhone className="w-3.5 h-3.5 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{COMPANY_INFO.phones[0] || '+996 709 115 115'}</span>
                </div>
                <span className="text-[10px] font-bold text-[#d4b26f] select-none">{c.mainPhone}</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phones[1]?.replace(/\s+/g, '') || '+996990115115'}`}
                onClick={() => {
                  reachGoal('call_click');
                  setIsOpen(false);
                }}
                className="flex items-center justify-between py-1 text-xs font-black text-gray-900 dark:text-white hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors border-t border-gray-200/50 dark:border-white/10 mt-1 pt-1"
              >
                <div className="flex items-center gap-1.5">
                  <IconPhone className="w-3.5 h-3.5 text-gray-400 dark:text-neutral-400 shrink-0" />
                  <span>{COMPANY_INFO.phones[1] || '+996 990 115 115'}</span>
                </div>
                <span className="text-[10px] font-bold text-gray-400 dark:text-neutral-400 select-none">{c.secondaryPhone}</span>
              </a>
            </div>

            {/* Instagram и 2GIS */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/30 hover:bg-pink-100 dark:hover:bg-pink-900/40 text-pink-700 dark:text-pink-300 font-bold text-[11px] transition-colors border border-pink-100 dark:border-pink-900/30"
              >
                <IconInstagram className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
                <span>Instagram</span>
              </a>
              <a
                href={COMPANY_INFO.gisUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-[#064734] dark:text-[#d4b26f] font-bold text-[11px] transition-colors border border-emerald-100 dark:border-emerald-900/30"
              >
                <IconMapPin className="w-3.5 h-3.5 text-[#064734] dark:text-[#d4b26f]" />
                <span>{c.office2gis}</span>
              </a>
            </div>

          </div>
        )}

        {/* Кнопка-триггер и плавающий бейдж-подсказка */}
        <div className="flex items-center gap-2">
          
          {showBadge && !isOpen && (
            <div
              onClick={toggleMenu}
              className="cursor-pointer hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#064734] text-white border border-[#d4b26f]/50 shadow-xl animate-bounce"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black text-[#d4b26f]">{c.badge}</span>
            </div>
          )}

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label={c.ariaLabel}
            className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white shadow-2xl transition-all border-2 border-[#d4b26f]/50 cursor-pointer"
          >
            {!isOpen && (
              <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 animate-ping pointer-events-none" />
            )}

            {isOpen ? (
              <svg className="w-6 h-6 text-[#d4b26f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <IconWhatsApp className="w-7 h-7 text-[#d4b26f]" />
            )}
          </button>

        </div>

      </div>
    </>
  );
}