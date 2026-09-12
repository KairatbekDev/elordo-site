'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import {
  IconWhatsApp,
  IconArrowRight,
  IconDocument,
  IconCheck,
} from '@/components/Icons';

export interface ApartmentPlan {
  rooms: 1 | 2 | 3 | number;
  title: string;
  area: string;
  block?: string;
  image?: string;
  ceiling?: string;
  finish?: string;
}

interface FloorPlansSectionProps {
  projectName: string;
  plans: ApartmentPlan[];
  whatsappNumber?: string;
  theme?: 'dark' | 'light';
  botUsername?: string;
}

const UI_TEXTS: Record<Locale, {
  catalogBadge: string;
  sectionTitle: string;
  allPlans: string;
  room1: string;
  room2: string;
  room3: string;
  roomTag: (r: number) => string;
  statusAvailable: string;
  detailsBtn: string;
  collapse: string;
  fullscreen: string;
  resetZoom: string;
  zoomHint: string;
  ceilings: string;
  defaultCeiling: string;
  finish: string;
  defaultFinish: string;
  seismic: string;
  seismicVal: string;
  installment: string;
  installmentVal: string;
  guarantee: string;
  btnWa: string;
  btnDownloadPdf: string;
  managerTime: string;
  otherPlans: string;
  blueprintTitle: string;
  blueprintSub: string;
  waMessage: (title: string, area: string, proj: string) => string;
}> = {
  ru: {
    catalogBadge: 'Каталог квартир',
    sectionTitle: 'Планировочные решения',
    allPlans: 'Все планировки',
    room1: '1-комнатные',
    room2: '2-комнатные',
    room3: '3-комнатные',
    roomTag: (r) => `${r}-КОМНАТНАЯ`,
    statusAvailable: 'В наличии',
    detailsBtn: 'Подробнее о квартире',
    collapse: 'Свернуть',
    fullscreen: 'На весь экран',
    resetZoom: 'Сброс',
    zoomHint: 'Нажмите на изображение для быстрого увеличения',
    ceilings: 'Потолки',
    defaultCeiling: '3.45 метра',
    finish: 'Отделка',
    defaultFinish: 'Под самоотделку (ПСО)',
    seismic: 'Сейсмостойкость',
    seismicVal: '9 баллов',
    installment: 'Рассрочка',
    installmentVal: 'до 40 мес. 0%',
    guarantee: 'Прямой договор с застройщиком. Возможность оформления по программе Trade-in (бартер на авто или вторичную недвижимость).',
    btnWa: 'Узнать цену и свободные этажи',
    btnDownloadPdf: 'Получить PDF планировки в Telegram',
    managerTime: 'Менеджер отдела продаж ответит в течение 2 минут',
    otherPlans: 'Другие планировки в этом объекте:',
    blueprintTitle: 'Архитектурный чертеж',
    blueprintSub: 'Схема на согласовании',
    waMessage: (title, area, proj) => `Здравствуйте! Меня интересует планировка: ${title} (${area}) в ${proj}. Отправьте, пожалуйста, свободные этажи и расчет рассрочки.`,
  },
  kg: {
    catalogBadge: 'Батирлер каталогу',
    sectionTitle: 'Батирлердин пландары',
    allPlans: 'Бардык пландар',
    room1: '1 бөлмөлүү',
    room2: '2 бөлмөлүү',
    room3: '3 бөлмөлүү',
    roomTag: (r) => `${r} БӨЛМӨЛҮҮ`,
    statusAvailable: 'Сатыкта бар',
    detailsBtn: 'Батир тууралуу толук',
    collapse: 'Жыйноо',
    fullscreen: 'Толук экранда',
    resetZoom: 'Баштапкы',
    zoomHint: 'Чоңойтуу үчүн сүрөттү басыңыз',
    ceilings: 'Шыптын бийиктиги',
    defaultCeiling: '3.45 метр',
    finish: 'Бүткөрүү абалы',
    defaultFinish: 'Өз алдынча оңдоого (ПСО)',
    seismic: 'Сейсмотуруктуулук',
    seismicVal: '9 балл',
    installment: 'Бөлүп төлөө',
    installmentVal: '40 айга чейин 0%',
    guarantee: 'Куруучу менен түз келишим. Trade-in программасы боюнча тариздөө мүмкүнчүлүгү (унаа же эски батирге алмашуу).',
    btnWa: 'Баасын жана бош кабаттарды билүү',
    btnDownloadPdf: 'Telegram аркылуу PDF алуу',
    managerTime: 'Сатуу бөлүмүнүн менеджери 2 мүнөттө жооп берет',
    otherPlans: 'Бул объекттеги башка пландар:',
    blueprintTitle: 'Архитектуралык план',
    blueprintSub: 'План такталууда',
    waMessage: (title, area, proj) => `Саламатсызбы! Мени ${proj} комплексиндеги план кызыктырат: ${title} (${area}). Бош кабаттарды жана бөлүп төлөө эсебин жөнөтүңүзчү.`,
  },
  kz: {
    catalogBadge: 'Пәтерлер каталогы',
    sectionTitle: 'Жоспарлау шешімдері',
    allPlans: 'Барлық жоспарлар',
    room1: '1 бөлмелі',
    room2: '2 бөлмелі',
    room3: '3 бөлмелі',
    roomTag: (r) => `${r} БӨЛМЕЛІ`,
    statusAvailable: 'Қолжетімді',
    detailsBtn: 'Пәтер туралы толық',
    collapse: 'Жию',
    fullscreen: 'Толық экранда',
    resetZoom: 'Бастапқы',
    zoomHint: 'Үлкейту үшін суретті басыңыз',
    ceilings: 'Төбе биіктігі',
    defaultCeiling: '3.45 метр',
    finish: 'Әрлеу күйі',
    defaultFinish: 'Өздігінен әрлеуге (ПСО)',
    seismic: 'Сейсмотөзімділік',
    seismicVal: '9 балл',
    installment: 'Бөліп төлеу',
    installmentVal: '40 айға дейін 0%',
    guarantee: 'Құрылыс салушымен тікелей шарт. Trade-in бағдарламасы бойынша рәсімдеу мүмкіндігі (көлік немесе баспана айырбасы).',
    btnWa: 'Бағасы мен бос қабаттарды білу',
    btnDownloadPdf: 'Telegram-да PDF жүктеу',
    managerTime: 'Сату бөлімінің менеджері 2 минутта жауап береді',
    otherPlans: 'Осы нысандағы басқа жоспарлар:',
    blueprintTitle: 'Сәулет сызбасы',
    blueprintSub: 'Сызба нақтылануда',
    waMessage: (title, area, proj) => `Сәлеметсіз бе! Мені ${proj} кешеніндегі ${title} (${area}) жоспары қызықтырады. Бос қабаттар мен бөліп төлеу есебін жіберіңізші.`,
  },
  uk: {
    catalogBadge: 'Каталог квартир',
    sectionTitle: 'Планувальні рішення',
    allPlans: 'Всі планування',
    room1: '1-кімнатні',
    room2: '2-кімнатні',
    room3: '3-кімнатні',
    roomTag: (r) => `${r}-КІМНАТНА`,
    statusAvailable: 'В наявності',
    detailsBtn: 'Детальніше про квартиру',
    collapse: 'Згорнути',
    fullscreen: 'На весь екран',
    resetZoom: 'Скинути',
    zoomHint: 'Натисніть на зображення для швидкого збільшення',
    ceilings: 'Стеля',
    defaultCeiling: '3.45 метра',
    finish: 'Оздоблення',
    defaultFinish: 'Під чистове оздоблення (ПСО)',
    seismic: 'Сейсмостійкість',
    seismicVal: '9 балів',
    installment: 'Розстрочка',
    installmentVal: 'до 40 міс. 0%',
    guarantee: 'Прямий договір із забудовником. Можливість оформлення за програмою Trade-in (бартер на авто чи вторинне житло).',
    btnWa: 'Дізнатися ціну та вільні поверхи',
    btnDownloadPdf: 'Отримати PDF планування в Telegram',
    managerTime: 'Менеджер відділу продажів відповість протягом 2 хвилин',
    otherPlans: 'Інші планування в цьому об’єкті:',
    blueprintTitle: 'Архітектурне креслення',
    blueprintSub: 'Схема на узгодженні',
    waMessage: (title, area, proj) => `Доброго дня! Мене цікавить планування: ${title} (${area}) в ${proj}. Надішліть, будь ласка, вільні поверхи та розрахунок розстрочки.`,
  },
  en: {
    catalogBadge: 'Apartment Catalog',
    sectionTitle: 'Floor Plans & Layouts',
    allPlans: 'All Layouts',
    room1: '1-Bedroom',
    room2: '2-Bedroom',
    room3: '3-Bedroom',
    roomTag: (r) => `${r}-BEDROOM`,
    statusAvailable: 'Available',
    detailsBtn: 'View Layout Details',
    collapse: 'Exit Fullscreen',
    fullscreen: 'Fullscreen',
    resetZoom: 'Reset',
    zoomHint: 'Click image to zoom in / out',
    ceilings: 'Ceiling Height',
    defaultCeiling: '3.45 meters',
    finish: 'Handover State',
    defaultFinish: 'Shell & Core (PSO)',
    seismic: 'Seismic Safety',
    seismicVal: '9 points',
    installment: 'Installment',
    installmentVal: 'up to 40 mos. 0%',
    guarantee: 'Direct developer equity contract. Trade-in barter options available (vehicle or secondary property exchange).',
    btnWa: 'Inquire Price & Floor Availability',
    btnDownloadPdf: 'Download Blueprint PDF in Telegram',
    managerTime: 'Sales manager will reply within 2 minutes',
    otherPlans: 'Other layouts in this development:',
    blueprintTitle: 'Architectural Blueprint',
    blueprintSub: 'Layout in preparation',
    waMessage: (title, area, proj) => `Hello! I am interested in layout: ${title} (${area}) at ${proj}. Please send floor availability and 0% installment calculations.`,
  },
  zh: {
    catalogBadge: '精选户型图册',
    sectionTitle: '空间规划格局',
    allPlans: '全部户型',
    room1: '一居室',
    room2: '二居室',
    room3: '三居室',
    roomTag: (r) => `${r === 1 ? '一' : r === 2 ? '二' : '三'}居室户型`,
    statusAvailable: '在售房源',
    detailsBtn: '查看户型详情',
    collapse: '退出全屏',
    fullscreen: '全屏模式',
    resetZoom: '重置',
    zoomHint: '轻点图片快速缩放查看格局细节',
    ceilings: '室内净高',
    defaultCeiling: '3.45米',
    finish: '交付标准',
    defaultFinish: '毛坯自装 (PSO)',
    seismic: '抗震设防',
    seismicVal: '9度抗震',
    installment: '免息分期',
    installmentVal: '最长40个月 0%',
    guarantee: '开发商直签正规购房合同。支持申请以旧换新 (Trade-in) 置换服务（现有车辆或房产折价冲抵房款）。',
    btnWa: '查询底价与可选楼层',
    btnDownloadPdf: '在 Telegram 中索取户型图册 (PDF)',
    managerTime: '专属置业顾问将在2分钟内在线回复',
    otherPlans: '本楼盘其他热销户型：',
    blueprintTitle: '建筑空间规划图',
    blueprintSub: '户型图深化中',
    waMessage: (title, area, proj) => `您好！我对 ${proj} 项目中的户型非常感兴趣：${title} (${area})。请发送当前可选楼层及0%免息分期明细。`,
  },
};

function BlueprintGraphic({
  title,
  sub,
  compact = false,
}: {
  title?: string;
  sub?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#f0f4f2] dark:bg-[#07130e] text-[#064734]/50 dark:text-[#d4b26f]/50">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="2 2" />
          <line x1="3" y1="11" x2="14" y2="11" />
          <line x1="14" y1="3" x2="14" y2="17" />
          <line x1="9" y1="11" x2="9" y2="21" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#f8faf9] to-[#edf3ef] dark:from-[#07130e] dark:to-[#0b1b15] border border-dashed border-[#064734]/20 dark:border-white/15 rounded-xl p-4 text-center select-none">
      <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#064734]/40 dark:text-[#d4b26f]/40 mb-2.5" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="8" width="48" height="48" rx="3" strokeDasharray="3 3" />
        <line x1="8" y1="28" x2="38" y2="28" strokeWidth="2" />
        <line x1="38" y1="8" x2="38" y2="44" strokeWidth="2" />
        <line x1="24" y1="28" x2="24" y2="56" strokeWidth="2" />
        <path d="M 38 28 A 12 12 0 0 1 50 40" strokeDasharray="2 2" />
        <line x1="38" y1="40" x2="50" y2="40" />
        <line x1="14" y1="8" x2="28" y2="8" strokeWidth="3" stroke="#d4b26f" strokeLinecap="round" />
        <line x1="38" y1="56" x2="50" y2="56" strokeWidth="3" stroke="#d4b26f" strokeLinecap="round" />
        <circle cx="32" cy="32" r="1.5" fill="#064734" />
      </svg>
      <span className="text-[11px] sm:text-xs font-black text-[#064734] dark:text-[#d4b26f] uppercase tracking-wider">
        {title}
      </span>
      {sub && (
        <span className="text-[10px] text-gray-500 dark:text-neutral-400 font-medium mt-0.5">
          {sub}
        </span>
      )}
    </div>
  );
}

function PlanImage({
  src,
  alt,
  className = '',
  title,
  sub,
  compact = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  title?: string;
  sub?: string;
  compact?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const isInvalid = !src || hasError || src.includes('Abu-Dhabi.png');

  if (isInvalid) {
    return <BlueprintGraphic title={title || alt} sub={sub} compact={compact} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

export default function FloorPlansSection({
  projectName,
  plans,
  whatsappNumber = COMPANY_INFO.whatsapp,
  botUsername = COMPANY_INFO.telegramBot || 'elordo_crm_bot',
}: FloorPlansSectionProps) {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const ui = UI_TEXTS[currentLang] || UI_TEXTS.ru;

  const [activeTab, setActiveTab] = useState<'all' | 1 | 2 | 3>('all');
  const [selectedPlan, setSelectedPlan] = useState<ApartmentPlan | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const filteredPlans = useMemo(() => {
    return activeTab === 'all' ? plans : plans.filter((p) => p.rooms === activeTab);
  }, [activeTab, plans]);

  const openPlanModal = (plan: ApartmentPlan) => {
    setSelectedPlan(plan);
    setZoomLevel(1);
    setIsFullscreen(false);
  };

  const closeModal = useCallback(() => {
    setSelectedPlan(null);
    setZoomLevel(1);
    setIsFullscreen(false);
  }, []);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  useEffect(() => {
    if (selectedPlan) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPlan]);

  const otherPlans = useMemo(() => {
    return selectedPlan
      ? plans.filter((p) => p.title !== selectedPlan.title || p.area !== selectedPlan.area)
      : [];
  }, [selectedPlan, plans]);

  const getWhatsAppLink = (plan: ApartmentPlan) => {
    const message = ui.waMessage(plan.title, plan.area, projectName);
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const getTelegramPlanLink = (plan: ApartmentPlan) => {
    const cleanProject = projectName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const cleanArea = plan.area.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const payload = `plan_${cleanProject}_${cleanArea}`.slice(0, 60);
    return `https://t.me/${botUsername}?start=${payload}`;
  };

  return (
    <section className="py-20 px-4 sm:px-6 relative transition-colors duration-200 bg-[#f4f7f5] dark:bg-[#141816] text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Шапка каталога */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b pb-8 border-gray-200 dark:border-white/10">
          <div>
            <span className="text-xs sm:text-sm uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
              {ui.catalogBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#064734] dark:text-white">
              {ui.sectionTitle}
            </h2>
          </div>

          {/* Фильтр по комнатам */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-black/5 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10">
            {[
              { id: 'all', label: ui.allPlans },
              { id: 1, label: ui.room1 },
              { id: 2, label: ui.room2 },
              { id: 3, label: ui.room3 },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-md scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Сетка карточек планировок */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlans.map((plan, idx) => (
            <div
              key={idx}
              onClick={() => openPlanModal(plan)}
              className="group cursor-pointer rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between border bg-white dark:bg-[#1e2421] hover:bg-[#fbfcfb] dark:hover:bg-[#252d29] border-gray-200 dark:border-white/10 hover:border-[#064734] dark:hover:border-[#d4b26f] shadow-md hover:shadow-xl dark:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-black/50"
            >
              <div>
                {/* Подложка под чертеж */}
                <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-white p-4 mb-5 flex items-center justify-center border border-gray-150 shadow-inner">
                  
                  {/* Бейдж комнатности */}
                  <span className="absolute top-3 left-3 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-[#064734] text-white shadow-sm z-20">
                    {ui.roomTag(plan.rooms)}
                  </span>

                  {/* Бейдж статуса наличия */}
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-600/90 text-white shadow-sm z-20">
                    <IconCheck className="w-3 h-3" />
                    <span>{ui.statusAvailable}</span>
                  </span>

                  {/* Иконка лупы */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#064734]/90 text-white flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-sm z-20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Безопасный рендеринг чертежа */}
                  <PlanImage
                    src={plan.image}
                    alt={plan.title}
                    title={ui.blueprintTitle}
                    sub={ui.blueprintSub}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Название квартиры */}
                <h3 className="text-sm sm:text-base font-bold leading-snug line-clamp-2 mb-3 transition-colors text-gray-900 dark:text-white group-hover:text-[#064734] dark:group-hover:text-[#d4b26f]">
                  {plan.title}
                </h3>

                {/* Площадь квартиры */}
                <div className="text-2xl sm:text-3xl font-black text-[#d4b26f] tracking-tight mb-4">
                  {plan.area}
                </div>
              </div>

              {/* Кнопка открытия */}
              <button
                type="button"
                className="mt-2 w-full py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer bg-[#eef3f0] dark:bg-white/10 hover:bg-[#064734] dark:hover:bg-[#d4b26f] text-[#064734] dark:text-white hover:text-white dark:hover:text-[#064734]"
              >
                <span>{ui.detailsBtn}</span>
                <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* МОДАЛЬНОЕ ОКНО ДЕТАЛЬНОГО ПРОСМОТРА */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className={`relative w-full ${
              isFullscreen ? 'max-w-none h-screen rounded-none' : 'max-w-6xl max-h-[94vh] rounded-3xl'
            } bg-[#161a18] text-white border border-white/15 shadow-2xl flex flex-col overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Верхняя статус-строка */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs sm:text-sm uppercase font-black tracking-wider text-[#d4b26f]">
                  {projectName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hidden sm:flex px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 transition-colors items-center gap-1.5 cursor-pointer"
                >
                  <span>{isFullscreen ? ui.collapse : ui.fullscreen}</span>
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Тело модалки */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
              
              {/* Левая часть: чертеж с зумом */}
              <div className="lg:col-span-7 relative bg-neutral-900 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[480px] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
                
                {/* Панель инструментов масштаба */}
                <div className="absolute top-4 left-4 z-30 flex items-center gap-2 p-1.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 shadow-lg">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.8}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
                    title="Zoom out"
                  >
                    −
                  </button>
                  <span className="text-xs sm:text-sm font-mono font-black px-2 text-[#d4b26f]">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 2.5}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
                    title="Zoom in"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="px-3 py-1.5 text-xs font-extrabold uppercase rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 transition-colors ml-1 cursor-pointer"
                  >
                    {ui.resetZoom}
                  </button>
                </div>

                {/* Белый подиум чертежа */}
                <div
                  className="relative z-10 w-full h-full flex items-center justify-center bg-white rounded-2xl p-6 sm:p-8 shadow-2xl transition-transform duration-300 ease-out cursor-zoom-in"
                  style={{ transform: `scale(${zoomLevel})` }}
                  onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.6 : 1))}
                >
                  <PlanImage
                    src={selectedPlan.image}
                    alt={selectedPlan.title}
                    title={ui.blueprintTitle}
                    sub={ui.blueprintSub}
                    className="max-h-[320px] sm:max-h-[420px] max-w-full object-contain"
                  />
                </div>

                <span className="relative z-20 mt-4 text-xs font-semibold text-gray-300 bg-black/60 px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#d4b26f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <line x1="12" y1="16" x2="12" y2="12" strokeWidth="2" />
                    <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2" />
                  </svg>
                  <span>{ui.zoomHint}</span>
                </span>
              </div>

              {/* Правая часть: параметры */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#1b211e]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block text-xs uppercase font-black tracking-widest text-[#d4b26f]">
                      {ui.roomTag(selectedPlan.rooms)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-600 text-white">
                      <IconCheck className="w-3 h-3" />
                      <span>{ui.statusAvailable}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                    {selectedPlan.title}
                  </h3>

                  <div className="text-4xl sm:text-5xl font-black text-[#d4b26f] tracking-tight mb-8">
                    {selectedPlan.area}
                  </div>

                  {/* Сетка характеристик */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-xs text-gray-400 font-semibold block mb-1">{ui.ceilings}</span>
                      <strong className="text-base sm:text-lg font-black text-white">
                        {selectedPlan.ceiling || ui.defaultCeiling}
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-xs text-gray-400 font-semibold block mb-1">{ui.finish}</span>
                      <strong className="text-base sm:text-lg font-black text-white">
                        {selectedPlan.finish || ui.defaultFinish}
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-xs text-gray-400 font-semibold block mb-1">{ui.seismic}</span>
                      <strong className="text-base sm:text-lg font-black text-white">
                        {ui.seismicVal}
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-xs text-gray-400 font-semibold block mb-1">{ui.installment}</span>
                      <strong className="text-base sm:text-lg font-black text-[#d4b26f]">
                        {ui.installmentVal}
                      </strong>
                    </div>
                  </div>

                  {/* Гарантии */}
                  <div className="p-4 rounded-2xl bg-[#064734]/30 border border-[#064734] flex items-start gap-3 mb-6">
                    <IconDocument className="w-5 h-5 text-[#d4b26f] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                      {ui.guarantee}
                    </p>
                  </div>
                </div>

                {/* Блок действий: WhatsApp и Telegram PDF */}
                <div className="space-y-2.5">
                  <a
                    href={getWhatsAppLink(selectedPlan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-[#064734] hover:bg-[#032b20] active:scale-[0.98] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl flex items-center justify-center gap-2.5 border border-emerald-500/30 cursor-pointer"
                  >
                    <IconWhatsApp className="w-5 h-5 text-[#25D366] shrink-0" />
                    <span>{ui.btnWa}</span>
                  </a>

                  <a
                    href={getTelegramPlanLink(selectedPlan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#229ED9] hover:bg-[#1e8ec3] active:scale-[0.98] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                    <span>{ui.btnDownloadPdf}</span>
                  </a>

                  <span className="text-xs text-gray-400 text-center block pt-1 font-medium">
                    {ui.managerTime}
                  </span>
                </div>
              </div>

            </div>

            {/* Нижняя лента: «Другие планировки» */}
            {otherPlans.length > 0 && (
              <div className="px-6 py-4 bg-black/50 border-t border-white/10">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 block mb-3">
                  {ui.otherPlans}
                </span>

                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {otherPlans.slice(0, 8).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => openPlanModal(item)}
                      className="flex-shrink-0 w-52 p-3 rounded-2xl bg-white/5 hover:bg-[#064734]/40 border border-white/10 hover:border-[#d4b26f] cursor-pointer transition-all flex items-center gap-3 group"
                    >
                      <div className="w-14 h-14 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                        <PlanImage
                          src={item.image}
                          alt={item.title}
                          compact={true}
                          className="max-h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs text-gray-200 font-bold block truncate group-hover:text-white">
                          {item.title}
                        </span>
                        <strong className="text-sm text-[#d4b26f] font-black">
                          {item.area}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}