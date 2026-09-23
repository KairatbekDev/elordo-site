'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import {
  IconWhatsApp,
  IconArrowRight,
  IconBuilding,
  IconCheck,
  IconShieldCheck,
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
}

// Все 11 реальных планировок жилых комплексов компании
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
  },
];

const SELECTOR_STRINGS: Record<Locale, {
  badge: string;
  title: string;
  subtitle: string;
  complexLabel: string;
  roomsLabel: string;
  all: string;
  downPayment: string;
  term: string;
  monthsUnit: string;
  maxBadge: string;
  minBadge: string;
  totalPriceLabel: string;
  monthlyLabel: string;
  btnBookWa: string;
  linkDetails: string;
  rateLabel: string;
  fixedRateBadge: string;
  sqm: string;
  somUnit: string;
  roomPlural: string;
  foundUnits: string;
}> = {
  ru: {
    badge: 'Интерактивный конфигуратор',
    title: 'Выберите квартиру с онлайн-расчетом 0%',
    subtitle: 'Настройте взнос и срок рассрочки для моментального расчета точного графика без переплат.',
    complexLabel: 'Жилой комплекс:',
    roomsLabel: 'Комнатность:',
    all: 'Все',
    downPayment: 'Первый взнос:',
    term: 'Срок выплат:',
    monthsUnit: 'мес.',
    maxBadge: 'макс.',
    minBadge: 'мин.',
    totalPriceLabel: 'Полная стоимость:',
    monthlyLabel: 'Платеж в месяц (0% переплат):',
    btnBookWa: 'Зафиксировать условия в WhatsApp',
    linkDetails: 'О комплексе',
    rateLabel: 'Курс НБКР онлайн:',
    fixedRateBadge: '0% переплат без участия банка',
    sqm: '$/м²',
    somUnit: 'сом',
    roomPlural: 'комнатная',
    foundUnits: 'Доступно планировок:',
  },
  kg: {
    badge: 'Интерактивдүү конфигуратор',
    title: 'Батир тандаңыз жана 0% эсебин алыңыз',
    subtitle: 'Баштапкы төлөм менен мөөнөттү жылдырып, ашыкча төлөмсүз так ай сайын төлөмдү дароо билиңиз.',
    complexLabel: 'Турак жай комплекси:',
    roomsLabel: 'Бөлмөлөр:',
    all: 'Баары',
    downPayment: 'Баштапкы төлөм:',
    term: 'Төлөө мөөнөтү:',
    monthsUnit: 'ай',
    maxBadge: 'макс.',
    minBadge: 'мин.',
    totalPriceLabel: 'Жалпы наркы:',
    monthlyLabel: 'Ай сайын төлөм (0% ашыкча төлөмсүз):',
    btnBookWa: 'WhatsApp аркылуу шартты бекитүү',
    linkDetails: 'Комплекс тууралуу',
    rateLabel: 'УБ онлайн курсу:',
    fixedRateBadge: 'Банксыз 0% үстөксүз бөлүп төлөө',
    sqm: '$/м²',
    somUnit: 'сом',
    roomPlural: 'бөлмөлүү',
    foundUnits: 'Жеткиликтүү планировкалар:',
  },
  kz: {
    badge: 'Интерактивті конфигуратор',
    title: 'Пәтер таңдап, 0% есебін алыңыз',
    subtitle: 'Бастапқы жарна мен мерзімді таңдап, артық төлемсіз нақты ай сайынғы төлемді көріңіз.',
    complexLabel: 'Тұрғын үй кешені:',
    roomsLabel: 'Бөлме саны:',
    all: 'Барлығы',
    downPayment: 'Бастапқы жарна:',
    term: 'Төлем мерзімі:',
    monthsUnit: 'ай',
    maxBadge: 'макс.',
    minBadge: 'мин.',
    totalPriceLabel: 'Жалпы құны:',
    monthlyLabel: 'Ай сайынғы төлем (0% үстемесіз):',
    btnBookWa: 'WhatsApp-та шартты бекіту',
    linkDetails: 'Кешен туралы',
    rateLabel: 'ҰБ онлайн бағамы:',
    fixedRateBadge: 'Банксіз 0% пайызсыз бөліп төлеу',
    sqm: '$/м²',
    somUnit: 'сом',
    roomPlural: 'бөлмелі',
    foundUnits: 'Қолжетімді жоспарлар:',
  },
  uk: {
    badge: 'Інтерактивний конфігуратор',
    title: 'Оберіть квартиру з онлайн-розрахунком 0%',
    subtitle: 'Налаштуйте внесок та термін розстрочки, щоб миттєво побачити точний графік без переплат.',
    complexLabel: 'Житловий комплекс:',
    roomsLabel: 'Кімнатність:',
    all: 'Всі',
    downPayment: 'Перший внесок:',
    term: 'Термін виплат:',
    monthsUnit: 'міс.',
    maxBadge: 'макс.',
    minBadge: 'мін.',
    totalPriceLabel: 'Повна вартість:',
    monthlyLabel: 'Платіж на місяць (0% переплат):',
    btnBookWa: 'Зафіксувати умови у WhatsApp',
    linkDetails: 'Про комплекс',
    rateLabel: 'Курс НБКР онлайн:',
    fixedRateBadge: '0% переплат без банків',
    sqm: '$/м²',
    somUnit: 'сом',
    roomPlural: 'кімнатна',
    foundUnits: 'Доступно планувань:',
  },
  en: {
    badge: 'Interactive Configurator',
    title: 'Select Apartment with 0% Calculation',
    subtitle: 'Adjust down payment and payment term to instantly calculate zero-interest monthly installments.',
    complexLabel: 'Residential Complex:',
    roomsLabel: 'Number of Rooms:',
    all: 'All',
    downPayment: 'Down Payment:',
    term: 'Payment Term:',
    monthsUnit: 'mo.',
    maxBadge: 'max',
    minBadge: 'min',
    totalPriceLabel: 'Total Price:',
    monthlyLabel: 'Monthly Payment (0% Interest):',
    btnBookWa: 'Lock In Terms on WhatsApp',
    linkDetails: 'About Complex',
    rateLabel: 'Live NBKR Rate:',
    fixedRateBadge: '0% developer terms with no bank fees',
    sqm: '$/sq.m',
    somUnit: 'som',
    roomPlural: '-room',
    foundUnits: 'Available layouts:',
  },
  zh: {
    badge: '交互式全维选房测算',
    title: '精选房源与 0% 免息在线测算',
    subtitle: '灵活调节首付比例与还款周期，实时生成透明零利息还款计划。',
    complexLabel: '所属楼盘：',
    roomsLabel: '户型居室：',
    all: '全部',
    downPayment: '首付款：',
    term: '分期周期：',
    monthsUnit: '个月',
    maxBadge: '最长',
    minBadge: '最低',
    totalPriceLabel: '房屋总价：',
    monthlyLabel: '每月还款金额（0%利息）：',
    btnBookWa: '在 WhatsApp 中锁定此方案',
    linkDetails: '查看楼盘详情',
    rateLabel: '央行实时汇率：',
    fixedRateBadge: '开发商直营0%免息无中间费',
    sqm: '$/m²',
    somUnit: '索姆',
    roomPlural: '居室',
    foundUnits: '可选户型套数：',
  },
};

export default function ApartmentSelector() {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const s = SELECTOR_STRINGS[currentLang] || SELECTOR_STRINGS.ru;

  // Фильтры
  const [selectedComplex, setSelectedComplex] = useState<string>('all');
  const [selectedRooms, setSelectedRooms] = useState<number | 'all'>('all');

  // Параметры калькулятора рассрочки
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [installmentTerm, setInstallmentTerm] = useState<number>(36);

  // Валюта и курс НБКР
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'KGS'>('USD');
  const [usdRate, setUsdRate] = useState<number>(87.45);
  const [rateDate, setRateDate] = useState<string>('');

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

  const cleanWaNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';

  const filteredApartments = useMemo(() => {
    return APARTMENTS_DATA.filter((apt) => {
      const matchComplex = selectedComplex === 'all' || apt.complexSlug === selectedComplex;
      const matchRooms = selectedRooms === 'all' || apt.rooms === selectedRooms;
      return matchComplex && matchRooms;
    });
  }, [selectedComplex, selectedRooms]);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Заголовок блока */}
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

      {/* Панель управления: фильтры, валюта, взнос и срок */}
      <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/10 shadow-xl mb-10 transition-colors">
        
        {/* Верхняя строка: Переключатель валюты и счетчик */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-white/10 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-neutral-400">
            <IconBuilding className="w-4 h-4 text-[#d4b26f]" />
            <span>
              {s.foundUnits} <strong className="text-gray-900 dark:text-white font-black text-sm">{filteredApartments.length}</strong>
            </span>
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

          {/* Ползунок и кнопки взноса */}
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

          {/* Ползунок и кнопки срока (до 36 месяцев максимум) */}
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

      {/* Список отфильтрованных квартир */}
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
              `• Стоимость: $${totalPriceUsd.toLocaleString('ru-RU')} (~${totalPriceKgs.toLocaleString('ru-RU')} сом)\n` +
              `• Первый взнос: $${downPaymentUsd.toLocaleString('ru-RU')} (${downPaymentPercent}%)\n` +
              `• Платеж по рассрочке 0%: $${monthlyUsd.toLocaleString('ru-RU')}/мес на ${installmentTerm} месяцев (~${monthlyKgs.toLocaleString('ru-RU')} сом/мес)\n` +
              `• Официальный курс расчета: ${usdRate} сом/$\n\n` +
              `Подскажите, пожалуйста, наличие свободных этажей под эти условия.`;

            return (
              <div
                key={apt.id}
                className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none hover:shadow-2xl hover:border-[#064734]/30 dark:hover:border-[#d4b26f]/30 transition-all flex flex-col justify-between relative group"
              >
                {apt.badge && (
                  <div className="absolute -top-3 right-6 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                    {apt.badge}
                  </div>
                )}

                <div>
                  <span className="text-xs font-bold text-gray-400 dark:text-neutral-400 block mb-1">
                    {apt.rooms}-{s.roomPlural} • {apt.floor}
                  </span>
                  <h4 className="text-xl font-black text-gray-950 dark:text-white mb-1 group-hover:text-[#064734] dark:group-hover:text-[#d4b26f] transition-colors">
                    {apt.complex}
                  </h4>
                  <div className="text-xs font-semibold text-[#064734] dark:text-[#d4b26f] mb-4">
                    {apt.area} м² • от ${apt.priceM2} {s.sqm}
                  </div>

                  {/* Финансовый блок */}
                  <div className="space-y-3 border-t border-gray-100 dark:border-white/10 pt-4 text-xs">
                    
                    {/* Полная стоимость */}
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-500 dark:text-neutral-400">
                        {s.totalPriceLabel}
                      </span>
                      <div className="text-right">
                        <strong className="text-base font-black text-gray-900 dark:text-white block">
                          {currencyMode === 'USD'
                            ? `$${totalPriceUsd.toLocaleString('ru-RU')}`
                            : `${totalPriceKgs.toLocaleString('ru-RU')} ${s.somUnit}`}
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
                          {currencyMode === 'USD'
                            ? `$${downPaymentUsd.toLocaleString('ru-RU')} (${downPaymentPercent}%)`
                            : `${downPaymentKgs.toLocaleString('ru-RU')} ${s.somUnit} (${downPaymentPercent}%)`}
                        </strong>
                        <span className="text-[10px] text-gray-400">
                          {currencyMode === 'USD'
                            ? `≈ ${downPaymentKgs.toLocaleString('ru-RU')} ${s.somUnit}`
                            : `≈ $${downPaymentUsd.toLocaleString('ru-RU')}`}
                        </span>
                      </div>
                    </div>

                    {/* Мини-шкала распределения взноса и остатка */}
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

                    {/* Платеж в месяц (0% переплат) */}
                    <div className="p-3.5 rounded-2xl bg-[#f2f6f4] dark:bg-[#040c09] border border-[#064734]/15 dark:border-white/10 mt-3 transition-colors">
                      <span className="text-[11px] font-bold text-gray-500 dark:text-neutral-400 block">
                        {s.monthlyLabel}
                      </span>

                      {currencyMode === 'USD' ? (
                        <>
                          <div className="text-2xl font-black text-[#064734] dark:text-[#d4b26f] my-0.5">
                            ${monthlyUsd.toLocaleString('ru-RU')}{' '}
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
                            {monthlyKgs.toLocaleString('ru-RU')}{' '}
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

                {/* Кнопки действий */}
                <div className="mt-6 pt-3 space-y-2">
                  <a
                    href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] active:scale-95 text-[#d4b26f] hover:text-white dark:text-[#064734] dark:hover:text-[#064734] font-black text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <IconWhatsApp className="w-4 h-4 text-[#25D366] dark:text-[#064734]" />
                    <span>{s.btnBookWa}</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href={`/${apt.complexSlug}`}
                    className="block w-full text-center py-1.5 text-[11px] font-bold text-gray-500 dark:text-neutral-400 hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors"
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
    </section>
  );
}