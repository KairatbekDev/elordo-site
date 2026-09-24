'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { exportPdfQuote } from '@/lib/exportPdfQuote';
import AnimatedCounter from '@/components/AnimatedCounter';
import {
  IconWhatsApp,
  IconArrowRight,
  IconBuilding,
  IconCheck,
  IconShieldCheck,
  IconDiamond,
  IconDocument,
} from '@/components/Icons';

interface ApartmentUnit {
  id: string;
  complex: string;
  complexSlug: string;
  rooms: number;
  area: number;
  floor: string;
  priceM2: number;
  badge?: string;
  image: string;
}

// 11 реальных планировок жилых комплексов компании с привязкой к чертежам
const APARTMENTS_DATA: ApartmentUnit[] = [
  // ЖК Abu Dhabi
  {
    id: 'ad-1k-49',
    complex: 'ЖК Abu Dhabi',
    complexSlug: 'abu-dhabi',
    rooms: 1,
    area: 49.48,
    floor: '4–22 этажи',
    priceM2: 1650,
    badge: 'Панорама гор',
    image: '/layouts/abu-dhabi/1%201room-abu.png',
  },
  {
    id: 'ad-1k-55',
    complex: 'ЖК Abu Dhabi',
    complexSlug: 'abu-dhabi',
    rooms: 1,
    area: 55.62,
    floor: '3–20 этажи',
    priceM2: 1650,
    badge: 'Видовая',
    image: '/layouts/abu-dhabi/2%201room-abu.png',
  },
  {
    id: 'ad-2k-78',
    complex: 'ЖК Abu Dhabi',
    complexSlug: 'abu-dhabi',
    rooms: 2,
    area: 78.30,
    floor: '5–24 этажи',
    priceM2: 1650,
    badge: 'Премиум',
    image: '/layouts/abu-dhabi/1%202room-abu.png',
  },
  {
    id: 'ad-2k-83',
    complex: 'ЖК Abu Dhabi',
    complexSlug: 'abu-dhabi',
    rooms: 2,
    area: 83.58,
    floor: '6–22 этажи',
    priceM2: 1650,
    badge: 'Двусторонняя',
    image: '/layouts/abu-dhabi/2%202room-abu.png',
  },
  {
    id: 'ad-3k-119',
    complex: 'ЖК Abu Dhabi',
    complexSlug: 'abu-dhabi',
    rooms: 3,
    area: 119.32,
    floor: 'блок Б',
    priceM2: 1650,
    badge: 'Премиум • Блок Б',
    image: '/layouts/abu-dhabi/1%203room-abu.png',
  },

  // ЖК Madina Residence
  {
    id: 'mr-1k-43',
    complex: 'ЖК Madina Residence',
    complexSlug: 'madina-residence',
    rooms: 1,
    area: 43.59,
    floor: '3–12 этажи',
    priceM2: 1500,
    badge: 'Хит продаж',
    image: '/layouts/madina-residence/1%201room-madina.png',
  },
  {
    id: 'mr-2k-68',
    complex: 'ЖК Madina Residence',
    complexSlug: 'madina-residence',
    rooms: 2,
    area: 68.20,
    floor: '2–14 этажи',
    priceM2: 1500,
    badge: 'Бизнес в центре',
    image: '/layouts/madina-residence/1%202room-madina.png',
  },
  {
    id: 'mr-3k-92',
    complex: 'ЖК Madina Residence',
    complexSlug: 'madina-residence',
    rooms: 3,
    area: 92.40,
    floor: '6–14 этажи',
    priceM2: 1500,
    badge: 'Для семьи',
    image: '/layouts/madina-residence/1%203room-madina.png',
  },

  // ЖД Айкол +
  {
    id: 'aik-1k-42',
    complex: 'ЖД Айкол +',
    complexSlug: 'ajkol-plus',
    rooms: 1,
    area: 42.00,
    floor: '2–9 этажи',
    priceM2: 1200,
    badge: 'Эко-предгорье',
    image: '/layouts/ajkol-plus/2floor.jpg',
  },
  {
    id: 'aik-2k-74',
    complex: 'ЖД Айкол +',
    complexSlug: 'ajkol-plus',
    rooms: 2,
    area: 74.30,
    floor: '3–8 этажи',
    priceM2: 1200,
    badge: 'Чистый воздух',
    image: '/layouts/ajkol-plus/3-8floor.jpg',
  },
  {
    id: 'aik-3k-88',
    complex: 'ЖД Айкол +',
    complexSlug: 'ajkol-plus',
    rooms: 3,
    area: 88.50,
    floor: '3–7 этажи',
    priceM2: 1200,
    badge: 'Просторная',
    image: '/layouts/ajkol-plus/9floor.jpg',
  },
];

const SELECTOR_STRINGS: Record<Locale, {
  badge: string;
  title: string;
  subtitle: string;
  complexLabel: string;
  roomsLabel: string;
  sortLabel: string;
  sortPopular: string;
  sortPriceAsc: string;
  sortAreaDesc: string;
  all: string;
  downPayment: string;
  term: string;
  monthsUnit: string;
  totalPriceLabel: string;
  monthlyLabel: string;
  btnBookWa: string;
  btnDownloadPdf: string;
  linkDetails: string;
  rateLabel: string;
  fixedRateBadge: string;
  sqm: string;
  somUnit: string;
  roomPlural: string;
  foundUnits: string;
  clickToEnlarge: string;
  modalTitle: string;
  modalClose: string;
  modalCeilings: string;
  modalFinish: string;
  modalSeismic: string;
  modalResetZoom: string;
}> = {
  ru: {
    badge: 'Интерактивный конфигуратор квартир',
    title: 'Выберите квартиру с онлайн-расчетом 0%',
    subtitle: 'Настройте взнос и срок рассрочки: алгоритм мгновенно пересчитает график, а выбранную планировку можно скачать в официальном PDF.',
    complexLabel: 'Жилой комплекс:',
    roomsLabel: 'Комнатность:',
    sortLabel: 'Сортировка:',
    sortPopular: 'По популярности',
    sortPriceAsc: 'Сначала доступные по цене',
    sortAreaDesc: 'Сначала просторные по площади',
    all: 'Все',
    downPayment: 'Первый взнос:',
    term: 'Срок рассрочки:',
    monthsUnit: 'мес.',
    totalPriceLabel: 'Полная стоимость:',
    monthlyLabel: 'Платеж в месяц (0% без банка):',
    btnBookWa: 'Зафиксировать в WhatsApp',
    btnDownloadPdf: 'Скачать PDF-расчет',
    linkDetails: 'О комплексе',
    rateLabel: 'Курс НБКР онлайн:',
    fixedRateBadge: '0% переплат напрямую от застройщика',
    sqm: '$/м²',
    somUnit: 'сом',
    roomPlural: 'комнатная',
    foundUnits: 'Доступно планировок:',
    clickToEnlarge: 'Нажмите для увеличения чертежа',
    modalTitle: 'Архитектурный план и параметры квартиры',
    modalClose: 'Закрыть',
    modalCeilings: 'Высота потолков: 3.45 м',
    modalFinish: 'Отделка: Под самоотделку (ПСО)',
    modalSeismic: 'Сейсмостойкость: 9 баллов (М350)',
    modalResetZoom: 'Сброс',
  },
  kg: {
    badge: 'Интерактивдүү батир конфигуратору',
    title: 'Батир тандаңыз жана 0% эсебин алыңыз',
    subtitle: 'Баштапкы төлөм менен мөөнөттү тандаңыз: эсептөө дароо жаңыланып, расмий PDF түрүндө көчүрүүгө жеткиликтүү.',
    complexLabel: 'Турак жай комплекси:',
    roomsLabel: 'Бөлмөлөр:',
    sortLabel: 'Иреттөө:',
    sortPopular: 'Популярдуулугу боюнча',
    sortPriceAsc: 'Баасы арзан боюнча',
    sortAreaDesc: 'Аянты чоң боюнча',
    all: 'Баары',
    downPayment: 'Баштапкы төлөм:',
    term: 'Төлөө мөөнөтү:',
    monthsUnit: 'ай',
    totalPriceLabel: 'Жалпы наркы:',
    monthlyLabel: 'Ай сайын төлөм (банксыз 0%):',
    btnBookWa: 'WhatsApp аркылуу бекитүү',
    btnDownloadPdf: 'PDF эсебин көчүрүү',
    linkDetails: 'Комплекс тууралуу',
    rateLabel: 'УБ онлайн курсу:',
    fixedRateBadge: 'Куруучудан банксыз 0% бөлүп төлөө',
    sqm: '$/м²',
    somUnit: 'сом',
    roomPlural: 'бөлмөлүү',
    foundUnits: 'Жеткиликтүү планировкалар:',
    clickToEnlarge: 'Чоңойтуу үчүн планды басыңыз',
    modalTitle: 'Батирдин планы жана мүнөздөмөсү',
    modalClose: 'Жабуу',
    modalCeilings: 'Шыптын бийиктиги: 3.45 м',
    modalFinish: 'Абалы: Өз алдынча оңдоого (ПСО)',
    modalSeismic: 'Сейсмотуруктуулук: 9 балл (М350)',
    modalResetZoom: 'Баштапкы',
  },
  kz: {
    badge: 'Интерактивті пәтер конфигураторы',
    title: 'Пәтер таңдап, 0% есебін алыңыз',
    subtitle: 'Бастапқы жарна мен мерзімді реттеңіз: нақты есептеу дайын болып, PDF түрінде жүктеуге болады.',
    complexLabel: 'Тұрғын үй кешені:',
    roomsLabel: 'Бөлме саны:',
    sortLabel: 'Сұрыптау:',
    sortPopular: 'Танымалдығы бойынша',
    sortPriceAsc: 'Бағасы қолжетімді бойынша',
    sortAreaDesc: 'Ауданы кең бойынша',
    all: 'Барлығы',
    downPayment: 'Бастапқы жарна:',
    term: 'Төлем мерзімі:',
    monthsUnit: 'ай',
    totalPriceLabel: 'Жалпы құны:',
    monthlyLabel: 'Ай сайынғы төлем (банксіз 0%):',
    btnBookWa: 'WhatsApp-та бекіту',
    btnDownloadPdf: 'PDF есебін жүктеу',
    linkDetails: 'Кешен туралы',
    rateLabel: 'ҰБ онлайн бағамы:',
    fixedRateBadge: 'Құрылыс салушыдан 0% пайызсыз бөліп төлеу',
    sqm: '$/м²',
    somUnit: 'сом',
    roomPlural: 'бөлмелі',
    foundUnits: 'Қолжетімді жоспарлар:',
    clickToEnlarge: 'Үлкейту үшін сызбаны басыңыз',
    modalTitle: 'Пәтердің сәулеттік жоспары',
    modalClose: 'Жабу',
    modalCeilings: 'Төбе биіктігі: 3.45 м',
    modalFinish: 'Әрлеу күйі: Өздігінен әрлеуге (ПСО)',
    modalSeismic: 'Сейсмотөзімділік: 9 балл (М350)',
    modalResetZoom: 'Бастапқы',
  },
  uk: {
    badge: 'Інтерактивний конфігуратор квартир',
    title: 'Оберіть квартиру з онлайн-розрахунком 0%',
    subtitle: 'Налаштуйте внесок та термін: графік перерахується автоматично з можливістю завантаження PDF.',
    complexLabel: 'Житловий комплекс:',
    roomsLabel: 'Кімнатність:',
    sortLabel: 'Сортування:',
    sortPopular: 'За популярністю',
    sortPriceAsc: 'Спочатку доступніші за ціною',
    sortAreaDesc: 'Спочатку просторіші за площею',
    all: 'Всі',
    downPayment: 'Перший внесок:',
    term: 'Термін виплат:',
    monthsUnit: 'міс.',
    totalPriceLabel: 'Повна вартість:',
    monthlyLabel: 'Платіж на місяць (0% без банку):',
    btnBookWa: 'Зафіксувати у WhatsApp',
    btnDownloadPdf: 'Завантажити розрахунок у PDF',
    linkDetails: 'Про комплекс',
    rateLabel: 'Курс НБКР онлайн:',
    fixedRateBadge: '0% переплат напряму від забудовника',
    sqm: '$/м²',
    somUnit: 'сом',
    roomPlural: 'кімнатна',
    foundUnits: 'Доступно планувань:',
    clickToEnlarge: 'Натисніть для збільшення креслення',
    modalTitle: 'Архітектурний план квартири',
    modalClose: 'Закрити',
    modalCeilings: 'Висота стелі: 3.45 м',
    modalFinish: 'Оздоблення: Під чистове (ПСО)',
    modalSeismic: 'Сейсмостійкість: 9 балів (М350)',
    modalResetZoom: 'Скинути',
  },
  en: {
    badge: 'Interactive Apartment Configurator',
    title: 'Select Apartment with 0% Calculation',
    subtitle: 'Configure deposit and payment period: figures adjust dynamically, and you can download an official PDF quote.',
    complexLabel: 'Residential Complex:',
    roomsLabel: 'Number of Rooms:',
    sortLabel: 'Sort by:',
    sortPopular: 'Most Popular',
    sortPriceAsc: 'Price: Low to High',
    sortAreaDesc: 'Area: High to Low',
    all: 'All',
    downPayment: 'Down Payment:',
    term: 'Payment Term:',
    monthsUnit: 'mo.',
    totalPriceLabel: 'Total Price:',
    monthlyLabel: 'Monthly Payment (0% Developer Plan):',
    btnBookWa: 'Lock In via WhatsApp',
    btnDownloadPdf: 'Download PDF Quote',
    linkDetails: 'About Complex',
    rateLabel: 'Live NBKR Rate:',
    fixedRateBadge: '0% developer terms with no bank markups',
    sqm: '$/sq.m',
    somUnit: 'som',
    roomPlural: '-room',
    foundUnits: 'Available layouts:',
    clickToEnlarge: 'Click layout image to enlarge',
    modalTitle: 'Architectural Blueprint & Specifications',
    modalClose: 'Close',
    modalCeilings: 'Ceiling Height: 3.45 m',
    modalFinish: 'Handover State: Shell & Core (PSO)',
    modalSeismic: 'Seismic Safety: 9 points (M350)',
    modalResetZoom: 'Reset',
  },
  zh: {
    badge: '交互式全维房源配置器',
    title: '精选房源与 0% 免息在线测算',
    subtitle: '灵活调节首付比例与还款周期，实时动态测算月供，并可直接下载官方 PDF 预算单。',
    complexLabel: '所属楼盘：',
    roomsLabel: '户型居室：',
    sortLabel: '排序方式：',
    sortPopular: '热度优先',
    sortPriceAsc: '总价从低到高',
    sortAreaDesc: '面积从大到小',
    all: '全部',
    downPayment: '首付款比例：',
    term: '分期周期：',
    monthsUnit: '个月',
    totalPriceLabel: '房屋总价：',
    monthlyLabel: '每月还款金额（0%免息）：',
    btnBookWa: '在 WhatsApp 中锁定此方案',
    btnDownloadPdf: '一键下载 PDF 格式预算单',
    linkDetails: '查看楼盘详情',
    rateLabel: '央行实时汇率：',
    fixedRateBadge: '开发商直营0%免息无中间费',
    sqm: '$/m²',
    somUnit: '索姆',
    roomPlural: '居室',
    foundUnits: '可选户型套数：',
    clickToEnlarge: '点击户型图快速放大查看格局细节',
    modalTitle: '建筑空间规划图与工程标准',
    modalClose: '关闭',
    modalCeilings: '室内净高：3.45米',
    modalFinish: '交付标准：毛坯自装 (PSO)',
    modalSeismic: '抗震设防：9度抗震 (M350标号)',
    modalResetZoom: '重置',
  },
};

export default function ApartmentSelector() {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const s = SELECTOR_STRINGS[currentLang] || SELECTOR_STRINGS.ru;

  // Фильтры
  const [selectedComplex, setSelectedComplex] = useState<string>('all');
  const [selectedRooms, setSelectedRooms] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'priceAsc' | 'areaDesc'>('popular');

  // Параметры калькулятора рассрочки
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [installmentTerm, setInstallmentTerm] = useState<number>(36);

  // Валюта и курс НБКР
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'KGS'>('USD');
  const [usdRate, setUsdRate] = useState<number>(87.45);
  const [rateDate, setRateDate] = useState<string>('');

  // Модальное окно просмотра планировки
  const [activePlanModal, setActivePlanModal] = useState<ApartmentUnit | null>(null);
  const [modalZoom, setModalZoom] = useState<number>(1);

  // Загрузка курса из серверного API
  useEffect(() => {
    let isMounted = true;
    fetch('/api/currency')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.rate && typeof data.rate === 'number') {
          setUsdRate(data.rate);
          if (data.date) setRateDate(data.date);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Блокировка скролла при открытом модальном окне
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePlanModal(null);
        setModalZoom(1);
      }
    };

    if (activePlanModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePlanModal]);

  const cleanWaNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';

  // Фильтрация и сортировка
  const filteredApartments = useMemo(() => {
    let list = APARTMENTS_DATA.filter((apt) => {
      const matchComplex = selectedComplex === 'all' || apt.complexSlug === selectedComplex;
      const matchRooms = selectedRooms === 'all' || apt.rooms === selectedRooms;
      return matchComplex && matchRooms;
    });

    if (sortBy === 'priceAsc') {
      list = [...list].sort((a, b) => a.area * a.priceM2 - b.area * b.priceM2);
    } else if (sortBy === 'areaDesc') {
      list = [...list].sort((a, b) => b.area - a.area);
    }

    return list;
  }, [selectedComplex, selectedRooms, sortBy]);

  // Скачивание персонального PDF-расчета
  const handleDownloadPdf = useCallback(
    (apt: ApartmentUnit) => {
      const totalPrice = Math.round(apt.area * apt.priceM2);
      const downPayment = Math.round(totalPrice * (downPaymentPercent / 100));
      const remaining = totalPrice - downPayment;
      const monthly = Math.round(remaining / installmentTerm);

      const schedule = [];
      let currentBalance = remaining;
      for (let i = 1; i <= installmentTerm; i++) {
        const isLast = i === installmentTerm;
        const currentPay = isLast ? currentBalance : monthly;
        currentBalance = Math.max(0, currentBalance - currentPay);
        schedule.push({
          num: i,
          period: `${i} мес.`,
          paymentUsd: currentPay,
          paymentKgs: Math.round(currentPay * usdRate),
          balanceUsd: currentBalance,
        });
      }

      exportPdfQuote({
        apartmentPrice: totalPrice,
        downPaymentAmount: downPayment,
        downPaymentPercent,
        months: installmentTerm,
        frequency: 'monthly',
        paymentPerPeriodUsd: monthly,
        usdRate,
        rateDate,
        selectedApartment: {
          complex: apt.complex,
          rooms: apt.rooms,
          area: apt.area,
          floor: apt.floor,
          priceM2: apt.priceM2,
        },
        paymentSchedule: schedule,
      });
    },
    [downPaymentPercent, installmentTerm, usdRate, rateDate]
  );

  return (
    <section id="apartments-catalog" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      
      {/* 1. Заголовок блока */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
          {s.badge}
        </span>
        <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f] tracking-tight">
          {s.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-2 max-w-2xl mx-auto leading-relaxed">
          {s.subtitle}
        </p>

        {/* Панель живого курса НБКР */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 mt-4 px-4 py-2 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 shadow-sm text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-gray-600 dark:text-neutral-300">
              {s.rateLabel} <strong className="text-gray-900 dark:text-white font-black">{usdRate} сом/$</strong> {rateDate ? `(${rateDate})` : ''}
            </span>
          </div>
          <span className="text-gray-300 dark:text-neutral-700 hidden sm:inline">|</span>
          <div className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
            <IconShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>{s.fixedRateBadge}</span>
          </div>
        </div>
      </div>

      {/* 2. Панель управления: фильтры, сортировка, валюта, взнос и срок */}
      <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/10 shadow-xl mb-10 transition-colors">
        
        {/* Верхняя строка: Сортировка, счетчик и переключатель валюты */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-neutral-400">
              <IconBuilding className="w-4 h-4 text-[#d4b26f]" />
              <span>
                {s.foundUnits} <strong className="text-gray-900 dark:text-white font-black text-sm">{filteredApartments.length}</strong>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-gray-400">|</span>
              <span className="text-gray-500 dark:text-neutral-400 font-bold">{s.sortLabel}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-2.5 py-1 text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none cursor-pointer"
              >
                <option value="popular">{s.sortPopular}</option>
                <option value="priceAsc">{s.sortPriceAsc}</option>
                <option value="areaDesc">{s.sortAreaDesc}</option>
              </select>
            </div>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-xs font-black">
            <button
              type="button"
              onClick={() => setCurrencyMode('USD')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                currencyMode === 'USD'
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrencyMode('KGS')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                currencyMode === 'KGS'
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              KGS (сом)
            </button>
          </div>
        </div>

        {/* Сетка фильтров и параметров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          
          {/* Фильтр ЖК */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2.5">
              {s.complexLabel}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', name: s.all },
                { id: 'abu-dhabi', name: 'Abu Dhabi' },
                { id: 'madina-residence', name: 'Madina' },
                { id: 'ajkol-plus', name: 'Айкол +' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedComplex(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedComplex === c.id
                      ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Фильтр комнат */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2.5">
              {s.roomsLabel}
            </label>
            <div className="flex gap-1.5">
              {[
                { id: 'all', label: s.all },
                { id: 1, label: '1-к' },
                { id: 2, label: '2-к' },
                { id: 3, label: '3-к' },
              ].map((r) => (
                <button
                  key={String(r.id)}
                  type="button"
                  onClick={() => setSelectedRooms(r.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedRooms === r.id
                      ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ползунок взноса */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                {s.downPayment}
              </label>
              <span className="text-xs font-black text-[#064734] dark:text-[#d4b26f] bg-emerald-50 dark:bg-white/10 px-2 py-0.5 rounded-md">
                {downPaymentPercent}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#064734] dark:accent-[#d4b26f] cursor-pointer"
            />
            <div className="flex gap-1 mt-2">
              {[20, 30, 40, 50].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPaymentPercent(pct)}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                    downPaymentPercent === pct
                      ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734]'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Ползунок срока выплат */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                {s.term}
              </label>
              <span className="text-xs font-black text-[#064734] dark:text-[#d4b26f] bg-emerald-50 dark:bg-white/10 px-2 py-0.5 rounded-md">
                {installmentTerm} {s.monthsUnit}
              </span>
            </div>
            <input
              type="range"
              min="12"
              max="36"
              step="6"
              value={installmentTerm}
              onChange={(e) => setInstallmentTerm(Number(e.target.value))}
              className="w-full accent-[#064734] dark:accent-[#d4b26f] cursor-pointer"
            />
            <div className="flex gap-1 mt-2">
              {[12, 18, 24, 36].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setInstallmentTerm(m)}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                    installmentTerm === m
                      ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734]'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {m}м
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 3. Сетка карточек квартир с чертежами и расчетом */}
      {filteredApartments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApartments.map((apt) => {
            const totalPriceUsd = Math.round(apt.area * apt.priceM2);
            const downPaymentUsd = Math.round(totalPriceUsd * (downPaymentPercent / 100));
            const remainderUsd = totalPriceUsd - downPaymentUsd;
            const monthlyUsd = Math.round(remainderUsd / installmentTerm);

            const totalPriceKgs = Math.round(totalPriceUsd * usdRate);
            const downPaymentKgs = Math.round(downPaymentUsd * usdRate);
            const monthlyKgs = Math.round(monthlyUsd * usdRate);

            const waMessage =
              `Здравствуйте! Меня интересует квартира в ${apt.complex}:\n` +
              `• Планировка: ${apt.rooms}-${s.roomPlural} (${apt.area} м² • ${apt.floor})\n` +
              `• Полная стоимость: $${totalPriceUsd.toLocaleString('ru-RU')} (~${totalPriceKgs.toLocaleString('ru-RU')} сом)\n` +
              `• Первый взнос: $${downPaymentUsd.toLocaleString('ru-RU')} (${downPaymentPercent}%)\n` +
              `• Рассрочка 0%: $${monthlyUsd.toLocaleString('ru-RU')}/мес на ${installmentTerm} месяцев (~${monthlyKgs.toLocaleString('ru-RU')} сом/мес)\n` +
              `• Курс НБКР: ${usdRate} сом/$\n\n` +
              `Подскажите, пожалуйста, какие свободные этажи сейчас доступны по этой планировке?`;

            return (
              <div
                key={apt.id}
                className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none hover:shadow-2xl hover:border-[#064734]/30 dark:hover:border-[#d4b26f]/30 transition-all flex flex-col justify-between relative group"
              >
                {/* Бейдж статуса */}
                {apt.badge && (
                  <div className="absolute top-4 right-4 z-10 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                    {apt.badge}
                  </div>
                )}

                <div>
                  {/* Подложка под чертеж с функцией быстрого просмотра */}
                  <div
                    onClick={() => setActivePlanModal(apt)}
                    className="relative h-56 w-full rounded-2xl bg-white p-3 mb-4 flex items-center justify-center border border-gray-100 shadow-inner overflow-hidden cursor-pointer group/img"
                  >
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold text-gray-400 bg-white/90 px-2 py-0.5 rounded shadow-sm z-10 opacity-0 group-hover/img:opacity-100 transition-opacity">
                      🔍 {s.clickToEnlarge}
                    </span>

                    <img
                      src={apt.image}
                      alt={apt.complex}
                      className="max-h-full max-w-full object-contain group-hover/img:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <span className="text-xs font-bold text-gray-400 dark:text-neutral-400 block mb-1">
                    {apt.rooms}-{s.roomPlural} • {apt.floor}
                  </span>
                  
                  <h4 className="text-xl font-black text-gray-950 dark:text-white mb-1 group-hover:text-[#064734] dark:group-hover:text-[#d4b26f] transition-colors">
                    {apt.complex}
                  </h4>
                  
                  <div className="text-xs font-semibold text-[#064734] dark:text-[#d4b26f] mb-4">
                    {apt.area} м² • от ${apt.priceM2} {s.sqm}
                  </div>

                  {/* Финансовый блок с анимированными счетчиками */}
                  <div className="space-y-3 border-t border-gray-100 dark:border-white/10 pt-4 text-xs">
                    
                    {/* Полная стоимость */}
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-500 dark:text-neutral-400">
                        {s.totalPriceLabel}
                      </span>
                      <div className="text-right">
                        <strong className="text-base font-black text-gray-900 dark:text-white block">
                          {currencyMode === 'USD' ? (
                            <>$<AnimatedCounter value={totalPriceUsd} /></>
                          ) : (
                            <><AnimatedCounter value={totalPriceKgs} /> {s.somUnit}</>
                          )}
                        </strong>
                        <span className="text-[10px] text-gray-400">
                          {currencyMode === 'USD'
                            ? `≈ ${totalPriceKgs.toLocaleString('ru-RU')} ${s.somUnit}`
                            : `≈ $${totalPriceUsd.toLocaleString('ru-RU')}`}
                        </span>
                      </div>
                    </div>

                    {/* Первый взнос */}
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-500 dark:text-neutral-400">
                        {s.downPayment}
                      </span>
                      <div className="text-right">
                        <strong className="font-bold text-gray-900 dark:text-white block">
                          {currencyMode === 'USD' ? (
                            <>$<AnimatedCounter value={downPaymentUsd} /> ({downPaymentPercent}%)</>
                          ) : (
                            <><AnimatedCounter value={downPaymentKgs} /> {s.somUnit} ({downPaymentPercent}%)</>
                          )}
                        </strong>
                        <span className="text-[10px] text-gray-400">
                          {currencyMode === 'USD'
                            ? `≈ ${downPaymentKgs.toLocaleString('ru-RU')} ${s.somUnit}`
                            : `≈ $${downPaymentUsd.toLocaleString('ru-RU')}`}
                        </span>
                      </div>
                    </div>

                    {/* Мини-шкала взноса */}
                    <div className="pt-1">
                      <div className="h-2 w-full bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden flex p-0.5 border border-gray-200 dark:border-white/10">
                        <div
                          style={{ width: `${downPaymentPercent}%` }}
                          className="h-full bg-[#d4b26f] rounded-full transition-all duration-300"
                        />
                        <div
                          style={{ width: `${100 - downPaymentPercent}%` }}
                          className="h-full bg-[#064734] dark:bg-emerald-600 rounded-full transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Ежемесячный платеж 0% */}
                    <div className="p-3.5 rounded-2xl bg-[#f2f6f4] dark:bg-[#040c09] border border-[#064734]/15 dark:border-white/10 mt-3 transition-colors">
                      <span className="text-[11px] font-bold text-gray-500 dark:text-neutral-400 block">
                        {s.monthlyLabel}
                      </span>

                      {currencyMode === 'USD' ? (
                        <>
                          <div className="text-2xl font-black text-[#064734] dark:text-[#d4b26f] my-0.5">
                            $<AnimatedCounter value={monthlyUsd} />{' '}
                            <span className="text-xs font-semibold text-gray-500 dark:text-neutral-400">
                              / {s.monthsUnit}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-[#064734]/80 dark:text-neutral-300 block">
                            ≈ {monthlyKgs.toLocaleString('ru-RU')} {s.somUnit}
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="text-2xl font-black text-[#064734] dark:text-[#d4b26f] my-0.5">
                            <AnimatedCounter value={monthlyKgs} />{' '}
                            <span className="text-xs font-semibold text-gray-500 dark:text-neutral-400">
                              {s.somUnit} / {s.monthsUnit}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-[#064734]/80 dark:text-neutral-300 block">
                            ≈ ${monthlyUsd.toLocaleString('ru-RU')}
                          </span>
                        </>
                      )}
                    </div>

                  </div>
                </div>

                {/* Кнопки действий: WhatsApp, Скачать PDF и ссылка на ЖК */}
                <div className="mt-6 pt-3 space-y-2">
                  <a
                    href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] active:scale-95 text-[#d4b26f] hover:text-white dark:text-[#064734] font-black text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <IconWhatsApp className="w-4 h-4 text-[#25D366] dark:text-[#064734]" />
                    <span>{s.btnBookWa}</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDownloadPdf(apt)}
                    className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 active:scale-95 text-gray-800 dark:text-gray-200 font-bold text-xs uppercase tracking-wider transition-all border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#064734] dark:text-[#d4b26f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{s.btnDownloadPdf}</span>
                  </button>

                  <Link
                    href={`/${apt.complexSlug}`}
                    className="block w-full text-center py-1 text-[11px] font-bold text-gray-500 dark:text-neutral-400 hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors"
                  >
                    {s.linkDetails} {apt.complex}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-[#0b1b15] rounded-3xl border border-gray-200 dark:border-white/10 p-6">
          <p className="text-sm font-bold text-gray-500 dark:text-neutral-400">
            По выбранным параметрам планировок не найдено. Попробуйте сбросить фильтры.
          </p>
        </div>
      )}

      {/* 4. Модальное окно детального просмотра планировки с масштабированием */}
      {activePlanModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={() => {
            setActivePlanModal(null);
            setModalZoom(1);
          }}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-[#161a18] text-white border border-white/15 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Шапка модалки */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs sm:text-sm uppercase font-black tracking-wider text-[#d4b26f]">
                  {activePlanModal.complex} • {activePlanModal.rooms}-{s.roomPlural} ({activePlanModal.area} м²)
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActivePlanModal(null);
                  setModalZoom(1);
                }}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label={s.modalClose}
              >
                ✕
              </button>
            </div>

            {/* Тело модалки */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
              
              {/* Левая часть: Чертёж с зумом */}
              <div className="lg:col-span-7 relative bg-neutral-900 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[380px] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
                
                {/* Панель зума */}
                <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 p-1 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 shadow-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setModalZoom((prev) => Math.max(prev - 0.35, 0.8))}
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center cursor-pointer"
                  >
                    −
                  </button>
                  <span className="font-mono font-black text-[#d4b26f] px-2">
                    {Math.round(modalZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalZoom((prev) => Math.min(prev + 0.35, 2.5))}
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalZoom(1)}
                    className="px-2.5 py-1 text-[11px] font-bold uppercase rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 cursor-pointer"
                  >
                    {s.modalResetZoom}
                  </button>
                </div>

                {/* Белый подиум чертежа */}
                <div
                  className="relative z-10 w-full h-full flex items-center justify-center bg-white rounded-2xl p-6 shadow-2xl transition-transform duration-300 ease-out"
                  style={{ transform: `scale(${modalZoom})` }}
                >
                  <img
                    src={activePlanModal.image}
                    alt={activePlanModal.complex}
                    className="max-h-[360px] max-w-full object-contain"
                  />
                </div>
              </div>

              {/* Правая часть: Характеристики и экспорт */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#1b211e]">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    {activePlanModal.complex}
                  </h3>
                  <div className="text-3xl font-black text-[#d4b26f] mb-4">
                    {activePlanModal.area} м²
                  </div>

                  <div className="space-y-2 text-xs text-gray-300 mb-6">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <IconCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{s.modalCeilings}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <IconCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{s.modalFinish}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <IconCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{s.modalSeismic}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#064734]/30 border border-[#064734] mb-6 text-xs text-emerald-100">
                    Прямой договор ДДУ от застройщика EL ORDO GROUP с обязательной государственной регистрацией в Госрегистре КР.
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => handleDownloadPdf(activePlanModal)}
                    className="w-full py-4 rounded-2xl bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#064734]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{s.btnDownloadPdf}</span>
                  </button>

                  <a
                    href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(`Здравствуйте! Хочу забронировать планировку ${activePlanModal.rooms}-комн. (${activePlanModal.area} м²) в ${activePlanModal.complex}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-2xl bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-emerald-500/30 cursor-pointer"
                  >
                    <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                    <span>{s.btnBookWa}</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}