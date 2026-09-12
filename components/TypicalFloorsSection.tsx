'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { IconWhatsApp } from '@/components/Icons';

export interface TypicalFloorItem {
  id: string;
  label: string;
  image: string;
  description?: string;
}

interface TypicalFloorsSectionProps {
  projectName: string;
  floors: TypicalFloorItem[];
  whatsappNumber?: string;
  theme?: 'dark' | 'light';
}

const UI_TEXTS: Record<Locale, {
  badge: string;
  title: string;
  desc: string;
  schemeLabel: string;
  zoomLabel: string;
  resetBtn: string;
  fullscreenBtn: string;
  zoomHint: string;
  room1: string;
  room2: string;
  elevators: string;
  requestBtn: (floor: string) => string;
  waMessage: (floor: string, proj: string) => string;
  fullscreenExitHint: string;
  prevFloor: string;
  nextFloor: string;
  zoomIn: string;
  zoomOut: string;
}> = {
  ru: {
    badge: 'Архитектурный план здания',
    title: 'Типовые этажи',
    desc: 'Выберите интересующий уровень, чтобы изучить схему подъезда, лифтовых холлов и ориентацию квартир по сторонам света.',
    schemeLabel: 'Схема:',
    zoomLabel: 'Масштаб:',
    resetBtn: 'Сброс',
    fullscreenBtn: 'Во весь экран',
    zoomHint: 'Кликните для быстрого увеличения',
    room1: '1-комнатные квартиры',
    room2: '2-комнатные квартиры',
    elevators: 'Бесшумные скоростные лифты',
    requestBtn: (floor) => `Запросить шахматку ${floor}`,
    waMessage: (floor, proj) => `Здравствуйте! Интересует поэтажная шахматка (${floor}) в объекте ${proj}. Отправьте, пожалуйста, список свободных квартир и актуальные цены.`,
    fullscreenExitHint: 'Нажмите Esc или кликните за пределами схемы для выхода',
    prevFloor: 'Предыдущий этаж',
    nextFloor: 'Следующий этаж',
    zoomIn: 'Приблизить',
    zoomOut: 'Уменьшить',
  },
  kg: {
    badge: 'Имараттын архитектуралык планы',
    title: 'Типтүү кабаттар',
    desc: 'Кененирээк таанышуу үчүн кабатты тандаңыз: подъезддин түзүлүшү, лифт холлу жана батирлердин жайгашуусу.',
    schemeLabel: 'Схема:',
    zoomLabel: 'Масштаб:',
    resetBtn: 'Баштапкы',
    fullscreenBtn: 'Толук экранда',
    zoomHint: 'Чоңойтуу үчүн басыңыз',
    room1: '1 бөлмөлүү батирлер',
    room2: '2 бөлмөлүү батирлер',
    elevators: 'Ылдам үндү чыгарбаган лифттер',
    requestBtn: (floor) => `${floor} шахматкасын суроо`,
    waMessage: (floor, proj) => `Саламатсызбы! ${proj} объектиндеги поэтаждык шахматка (${floor}) кызыктырат. Бош батирлердин тизмесин жана бааларын жөнөтүңүзчү.`,
    fullscreenExitHint: 'Чыгуу үчүн Esc баскычын же сүрөттөн тышкары басыңыз',
    prevFloor: 'Мурунку кабат',
    nextFloor: 'Кийинки кабат',
    zoomIn: 'Чоңойтуу',
    zoomOut: 'Кичирейтүү',
  },
  kz: {
    badge: 'Ғимараттың сәулеттік жоспары',
    title: 'Үлгілік қабаттар',
    desc: 'Қабатты таңдап, кіреберіс сызбасын, лифт холлдарын және пәтерлердің орналасуын қараңыз.',
    schemeLabel: 'Сұлба:',
    zoomLabel: 'Масштаб:',
    resetBtn: 'Бастапқы',
    fullscreenBtn: 'Толық экранда',
    zoomHint: 'Үлкейту үшін басыңыз',
    room1: '1 бөлмелі пәтерлер',
    room2: '2 бөлмелі пәтерлер',
    elevators: 'Дыбыссыз жүрдек лифттер',
    requestBtn: (floor) => `${floor} шахматкасын сұрау`,
    waMessage: (floor, proj) => `Сәлеметсіз бе! ${proj} нысанындағы қабаттық шахматка (${floor}) қызықтырады. Бос пәтерлер тізімі мен бағасын жіберіңізші.`,
    fullscreenExitHint: 'Шығу үшін Esc пернесін немесе сызбадан тыс жерді басыңыз',
    prevFloor: 'Алдыңғы қабат',
    nextFloor: 'Келесі қабат',
    zoomIn: 'Үлкейту',
    zoomOut: 'Кішірейту',
  },
  uk: {
    badge: 'Архітектурний план будівлі',
    title: 'Типові поверхи',
    desc: 'Оберіть потрібний рівень, щоб вивчити схему під’їзду, ліфтових холів та планування квартир.',
    schemeLabel: 'Схема:',
    zoomLabel: 'Масштаб:',
    resetBtn: 'Скинути',
    fullscreenBtn: 'На весь екран',
    zoomHint: 'Клікніть для швидкого збільшення',
    room1: '1-кімнатні квартири',
    room2: '2-кімнатні квартири',
    elevators: 'Безшумні швидкісні ліфти',
    requestBtn: (floor) => `Запитати шахматку ${floor}`,
    waMessage: (floor, proj) => `Доброго дня! Цікавить поверхова шахматка (${floor}) в об’єкті ${proj}. Надішліть, будь ласка, список вільних квартир та ціни.`,
    fullscreenExitHint: 'Натисніть Esc або клікніть за межами схеми для виходу',
    prevFloor: 'Попередній поверх',
    nextFloor: 'Наступний поверх',
    zoomIn: 'Збільшити',
    zoomOut: 'Зменшити',
  },
  en: {
    badge: 'Architectural Floor Plate',
    title: 'Typical Floor Plans',
    desc: 'Select a floor level to view floor plate circulation, elevator lobby positioning, and unit orientation.',
    schemeLabel: 'Layout:',
    zoomLabel: 'Scale:',
    resetBtn: 'Reset',
    fullscreenBtn: 'Fullscreen',
    zoomHint: 'Click to zoom in / out',
    room1: '1-Bedroom apartments',
    room2: '2-Bedroom apartments',
    elevators: 'High-speed silent elevators',
    requestBtn: (floor) => `Request ${floor} Availability Grid`,
    waMessage: (floor, proj) => `Hello! I am interested in the floor plate grid (${floor}) for ${proj}. Please provide availability and up-to-date pricing.`,
    fullscreenExitHint: 'Press Esc or click outside the scheme to close',
    prevFloor: 'Previous Floor',
    nextFloor: 'Next Floor',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
  },
  zh: {
    badge: '建筑标准层平面图',
    title: '典型标准层平面',
    desc: '选择特定层数，即刻查阅公共梯厅、单元动线及户型采光朝向细节。',
    schemeLabel: '标准层平面：',
    zoomLabel: '缩放比例：',
    resetBtn: '重置',
    fullscreenBtn: '全屏模式',
    zoomHint: '轻点图片快速缩放细节',
    room1: '一居室户型',
    room2: '二居室户型',
    elevators: '品牌静音高速电梯',
    requestBtn: (floor) => `索取 ${floor} 在售销控表`,
    waMessage: (floor, proj) => `您好！我对 ${proj} 项目的标准层平面销控表 (${floor}) 很感兴趣，请发送可选房源明细与最新报价。`,
    fullscreenExitHint: '按 Esc 键或轻点空白区域即可退出全屏',
    prevFloor: '上一层',
    nextFloor: '下一层',
    zoomIn: '放大',
    zoomOut: '缩小',
  },
};

function formatFloorLabel(label: string, lang: Locale): string {
  const numMatch = label.match(/(\d+[\s-–\d]*)/);
  const num = numMatch ? numMatch[1].trim() : label;

  switch (lang) {
    case 'kg':
      return `${num}-кабат`;
    case 'kz':
      return `${num}-қабат`;
    case 'uk':
      return `${num} поверх`;
    case 'en':
      return `Floor ${num}`;
    case 'zh':
      return `${num}层`;
    default:
      return `${num} этаж`;
  }
}

export default function TypicalFloorsSection({
  projectName,
  floors,
  whatsappNumber = COMPANY_INFO.whatsapp,
}: TypicalFloorsSectionProps) {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const ui = UI_TEXTS[currentLang] || UI_TEXTS.ru;

  const [activeFloorId, setActiveFloorId] = useState<string>(floors[0]?.id || '2');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentIndex = floors.findIndex((f) => f.id === activeFloorId);
  const currentFloor = floors[currentIndex !== -1 ? currentIndex : 0] || floors[0];

  const localizedFloorLabel = useMemo(() => {
    return formatFloorLabel(currentFloor.label, currentLang);
  }, [currentFloor.label, currentLang]);

  // Переключение этажей
  const handlePrevFloor = useCallback(() => {
    setZoomLevel(1);
    const newIdx = currentIndex > 0 ? currentIndex - 1 : floors.length - 1;
    setActiveFloorId(floors[newIdx].id);
  }, [currentIndex, floors]);

  const handleNextFloor = useCallback(() => {
    setZoomLevel(1);
    const newIdx = currentIndex < floors.length - 1 ? currentIndex + 1 : 0;
    setActiveFloorId(floors[newIdx].id);
  }, [currentIndex, floors]);

  // Управление горячими клавишами
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        setZoomLevel(1);
      }
      if (e.key === 'ArrowLeft') handlePrevFloor();
      if (e.key === 'ArrowRight') handleNextFloor();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevFloor, handleNextFloor]);

  // Блокировка скролла в полноэкранном режиме
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  const waMessage = ui.waMessage(localizedFloorLabel, projectName);

  return (
    <section className="py-20 px-4 sm:px-6 relative border-t bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 border-gray-100 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Заголовок секции */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {ui.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-3 text-[#064734] dark:text-[#d4b26f]">
            {ui.title}
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-neutral-400">
            {ui.desc}
          </p>
        </div>

        {/* Навигатор по этажам */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
          <button
            type="button"
            onClick={handlePrevFloor}
            className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-[#064734] hover:text-white dark:hover:bg-[#d4b26f] dark:hover:text-[#064734] flex items-center justify-center transition-all text-sm font-bold shadow-sm cursor-pointer"
            title={ui.prevFloor}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>

          <div className="flex flex-wrap justify-center items-center gap-2 p-1.5 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            {floors.map((floor) => {
              const isActive = activeFloorId === floor.id;
              const formattedLabel = formatFloorLabel(floor.label, currentLang);
              return (
                <button
                  key={floor.id}
                  type="button"
                  onClick={() => {
                    setZoomLevel(1);
                    setActiveFloorId(floor.id);
                  }}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-md scale-105'
                      : 'text-gray-700 dark:text-neutral-300 hover:text-gray-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/10'
                  }`}
                >
                  {formattedLabel}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNextFloor}
            className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-[#064734] hover:text-white dark:hover:bg-[#d4b26f] dark:hover:text-[#064734] flex items-center justify-center transition-all text-sm font-bold shadow-sm cursor-pointer"
            title={ui.nextFloor}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Карточка со схемой этажа */}
        <div className="rounded-3xl p-4 sm:p-8 border shadow-xl max-w-5xl mx-auto flex flex-col justify-between bg-white dark:bg-[#0b1b15] border-gray-200 dark:border-white/10 transition-colors duration-200">
          
          {/* Панель инструментов масштабирования */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-[#064734] dark:text-[#d4b26f] uppercase">
                {ui.schemeLabel} {localizedFloorLabel}
              </span>
              <span className="text-gray-400 dark:text-neutral-600">•</span>
              <span className="text-xs text-gray-500 dark:text-neutral-400">{ui.zoomLabel} {Math.round(zoomLevel * 100)}%</span>
            </div>

            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.8}
                className="w-8 h-8 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-30 font-black text-sm transition-colors cursor-pointer text-gray-700 dark:text-neutral-200"
                title={ui.zoomOut}
              >
                −
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="w-8 h-8 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-30 font-black text-sm transition-colors cursor-pointer text-gray-700 dark:text-neutral-200"
                title={ui.zoomIn}
              >
                +
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-2.5 py-1 text-[11px] font-bold uppercase rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-neutral-300 transition-colors cursor-pointer"
              >
                {ui.resetBtn}
              </button>
              <div className="h-4 w-px bg-gray-300 dark:bg-white/20 mx-1" />
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="px-2.5 py-1 text-[11px] font-bold uppercase rounded-lg bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] hover:bg-[#032b20] dark:hover:bg-[#c49f57] transition-colors cursor-pointer"
              >
                {ui.fullscreenBtn}
              </button>
            </div>
          </div>

          {/* Интерактивное полотно чертежа */}
          <div
            className="relative w-full h-[420px] sm:h-[560px] bg-white p-4 sm:p-6 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner cursor-zoom-in transition-colors"
            onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.6 : 1))}
          >
            <img
              src={currentFloor.image}
              alt={`${projectName} - ${localizedFloorLabel}`}
              className="max-h-full max-w-full object-contain transition-transform duration-300 drop-shadow-sm select-none"
              style={{ transform: `scale(${zoomLevel})` }}
            />

            <span className="absolute bottom-3 right-3 text-[10px] font-semibold text-gray-600 dark:text-neutral-300 bg-white/90 dark:bg-[#0b1b15]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-gray-200 dark:border-white/10 pointer-events-none flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#064734] dark:text-[#d4b26f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <line x1="12" y1="16" x2="12" y2="12" strokeWidth="2" />
                <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2" />
              </svg>
              <span>{ui.zoomHint}</span>
            </span>
          </div>

          {/* Экспликация и кнопка запроса */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col lg:flex-row items-center justify-between gap-5">
            
            {/* Легенда цветов */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <span className="w-3.5 h-3.5 rounded bg-[#99d5b8] border border-[#52a77c]" />
                <span className="text-gray-700 dark:text-neutral-300">{ui.room1}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <span className="w-3.5 h-3.5 rounded bg-[#f5b8b8] border border-[#d67272]" />
                <span className="text-gray-700 dark:text-neutral-300">{ui.room2}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <svg className="w-4 h-4 text-gray-400 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="m9 10 3-3 3 3" />
                  <path d="m9 14 3 3 3-3" />
                </svg>
                <span className="text-gray-500 dark:text-neutral-400">{ui.elevators}</span>
              </div>
            </div>

            {/* Запрос шахматки */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] active:scale-[0.98] text-white dark:text-[#064734] font-black px-7 py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-md text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <IconWhatsApp className="w-4 h-4 text-[#25D366] dark:text-[#064734]" />
              <span>{ui.requestBtn(localizedFloorLabel)}</span>
            </a>
          </div>

        </div>

      </div>

      {/* Полноэкранный просмотр чертежа */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => {
            setIsFullscreen(false);
            setZoomLevel(1);
          }}
        >
          <div
            className="flex items-center justify-between text-white border-b border-white/15 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm sm:text-base font-black text-[#d4b26f]">
                {projectName} • {localizedFloorLabel}
              </span>
              <span className="text-xs text-gray-400">
                ({ui.zoomLabel} {Math.round(zoomLevel * 100)}%)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.8}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center font-bold cursor-pointer"
                title={ui.zoomOut}
              >
                −
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center font-bold cursor-pointer"
                title={ui.zoomIn}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFullscreen(false);
                  setZoomLevel(1);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all ml-3 cursor-pointer"
                title="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-hidden p-4">
            <img
              src={currentFloor.image}
              alt={`${projectName} - ${localizedFloorLabel}`}
              className="max-h-[85vh] max-w-[90vw] object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={(e) => {
                e.stopPropagation();
                setZoomLevel((prev) => (prev === 1 ? 1.8 : 1));
              }}
            />
          </div>

          <div className="text-center text-xs text-gray-400 pt-2">
            {ui.fullscreenExitHint}
          </div>
        </div>
      )}

    </section>
  );
}