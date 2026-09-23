'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';
import {
  IconCheck,
  IconCar,
  IconBuilding,
  IconDiamond,
  IconCalendar,
  IconWhatsApp,
  IconArrowRight,
  IconShieldCheck,
} from '@/components/Icons';

const RATE_DISCLAIMERS: Record<Locale, string> = {
  ru: '* Расчет носит предварительный характер. В соответствии с законодательством КР оплата производится в национальной валюте (сом) по официальному учетному курсу НБКР на день фактической оплаты. Возможна индивидуальная фиксация курса в договоре.',
  kg: '* Эсептөө болжолдуу мүнөзгө ээ. КР мыйзамдарына ылайык төлөмдөр төлөнгөн күндөгү КР Улуттук банкынын (УБ) расмий курсу боюнча улуттук валютада (сом) жүргүзүлөт. Келишимде курсту бекитүү мүмкүнчүлүгү каралган.',
  kz: '* Есептеу алдын ала сипатқа ие. ҚР заңнамасына сәйкес төлем нақты төленген күнгі ҚР Ұлттық Банкінің ресми бағамы бойынша ұлттық валютада (сом) жүзеге асырылады. Келісімшартта бағамды бекіту мүмкіндігі бар.',
  uk: '* Розрахунок має попередній характер. Відповідно до законодавства КР оплата здійснюється у національній валюті (сом) за офіційним курсом НБКР на день фактичної оплати. Можлива індивідуальна фіксація курсу в договорі.',
  en: '* Calculations are preliminary estimates. Under Kyrgyz Republic law, payments are settled in the national currency (KGS) based on the official NBKR exchange rate on the payment date. Contractual exchange rate pegging is available.',
  zh: '* 本测算结果仅供参考。根据吉尔吉斯共和国现行法规，所有房款均按实际付款当日吉尔吉斯国家银行 (NBKR) 官方挂牌基准汇率以国家法定货币（索姆）进行结算。合同中可约定专属汇率锁定保护机制。',
};

const BANNER_WA_TEXTS: Record<Locale, string> = {
  ru: 'Здравствуйте! Хочу получить консультацию по условиям покупки и рассрочки в EL ORDO GROUP.',
  kg: 'Саламатсызбы! EL ORDO GROUP компаниясындагы сатып алуу жана бөлүп төлөө шарттары боюнча кеңеш алгым келет.',
  kz: 'Сәлеметсіз бе! EL ORDO GROUP компаниясының сатып алу және бөліп төлеу шарттары бойынша кеңес алғым келеді.',
  uk: 'Доброго дня! Хочу отримати консультацію щодо умов купівлі та розстрочки в EL ORDO GROUP.',
  en: 'Hello! I would like to get a consultation on purchase conditions and installment plans at EL ORDO GROUP.',
  zh: '您好！我想咨询 EL ORDO GROUP 旗下的置业购房政策及免息分期付款细则。',
};

const CALC_STRINGS: Record<Locale, {
  down: string;
  balance: string;
  editHint: string;
  rateLabel: string;
  rateFixedBadge: string;
  btnOpenCatalog: string;
  btnCloseCatalog: string;
  filterComplexAll: string;
  filterRoomsAll: string;
  selectedAptPrefix: string;
  btnResetSelected: string;
  payFrequency: string;
  monthly: string;
  quarterly: string;
  savingsTitle: string;
  savingsDesc: string;
  btnSchedule: string;
  btnScheduleHide: string;
  colNum: string;
  colPeriod: string;
  colPayment: string;
  colRemaining: string;
}> = {
  ru: {
    down: 'Первый взнос',
    balance: 'В рассрочку 0%',
    editHint: 'нажмите, чтобы изменить вручную',
    rateLabel: 'Курс НБКР онлайн:',
    rateFixedBadge: 'Возможна фиксация курса в ДДУ',
    btnOpenCatalog: 'Выбрать планировку из каталога (11 вариантов)',
    btnCloseCatalog: 'Свернуть каталог планировок',
    filterComplexAll: 'Все комплексы',
    filterRoomsAll: 'Все комнаты',
    selectedAptPrefix: 'Выбрана квартира:',
    btnResetSelected: 'Сбросить',
    payFrequency: 'Периодичность выплат:',
    monthly: 'Ежемесячно',
    quarterly: 'Поквартально (раз в 3 мес.)',
    savingsTitle: 'Переплата: $0 • Без скрытых процентов банка',
    savingsDesc: 'Экономия до $15 000+ по сравнению со стандартной банковской ипотекой (18–22% годовых).',
    btnSchedule: 'Посмотреть детальный график выплат',
    btnScheduleHide: 'Скрыть график выплат',
    colNum: '№',
    colPeriod: 'Период',
    colPayment: 'Платеж',
    colRemaining: 'Остаток',
  },
  kg: {
    down: 'Баштапкы төлөм',
    balance: '0% бөлүп төлөө калдыгы',
    editHint: 'кол менен өзгөртүү үчүн басыңыз',
    rateLabel: 'УБ онлайн курсу:',
    rateFixedBadge: 'Келишимде курсту бекитүү мүмкүнчүлүгү',
    btnOpenCatalog: 'Планировкалар каталогун тандоо (11 вариант)',
    btnCloseCatalog: 'Каталогду жашыруу',
    filterComplexAll: 'Бардык комплекстер',
    filterRoomsAll: 'Бардык бөлмөлөр',
    selectedAptPrefix: 'Тандалган батир:',
    btnResetSelected: 'Тазалоо',
    payFrequency: 'Төлөм мезгилдүүлүгү:',
    monthly: 'Ай сайын',
    quarterly: 'Квартал сайын (3 айда 1)',
    savingsTitle: 'Ашыкча төлөм: $0 • Банк пайыздары жок',
    savingsDesc: 'Банктык ипотекага (18–22%) салыштырмалуу $15 000+ чейин үнөмдөө.',
    btnSchedule: 'Төлөм графигин толук көрүү',
    btnScheduleHide: 'Графикти жашыруу',
    colNum: '№',
    colPeriod: 'Мөөнөтү',
    colPayment: 'Төлөм',
    colRemaining: 'Калдык',
  },
  kz: {
    down: 'Бастапқы жарна',
    balance: '0% бөліп төлеу қалдығы',
    editHint: 'қолмен өзгерту үшін басыңыз',
    rateLabel: 'ҰБ онлайн бағамы:',
    rateFixedBadge: 'Келісімшартта бағамды бекіту мүмкіндігі',
    btnOpenCatalog: 'Жоспарлар каталогынан таңдау (11 нұсқа)',
    btnCloseCatalog: 'Каталогты жасыру',
    filterComplexAll: 'Барлық кешендер',
    filterRoomsAll: 'Барлық бөлмелер',
    selectedAptPrefix: 'Таңдалған пәтер:',
    btnResetSelected: 'Қайтару',
    payFrequency: 'Төлем мерзімділігі:',
    monthly: 'Ай сайын',
    quarterly: 'Тоқсан сайын (3 айда 1)',
    savingsTitle: 'Артық төлем: $0 • Банк пайызы жоқ',
    savingsDesc: 'Банк ипотекасына (18–22%) қарағанда $15 000+ дейін үнемдеу.',
    btnSchedule: 'Төлем кестесін толық қарау',
    btnScheduleHide: 'Күктені жасыру',
    colNum: '№',
    colPeriod: 'Кезең',
    colPayment: 'Төлем',
    colRemaining: 'Қалдық',
  },
  uk: {
    down: 'Перший внесок',
    balance: 'У розстрочку 0%',
    editHint: 'натисніть, щоб змінити вручну',
    rateLabel: 'Курс НБКР онлайн:',
    rateFixedBadge: 'Можлива фіксація курсу в договорі',
    btnOpenCatalog: 'Обрати планування з каталогу (11 варіантів)',
    btnCloseCatalog: 'Згорнути каталог планувань',
    filterComplexAll: 'Всі комплекси',
    filterRoomsAll: 'Всі кімнати',
    selectedAptPrefix: 'Обрана квартира:',
    btnResetSelected: 'Скинути',
    payFrequency: 'Періодичність виплат:',
    monthly: 'Щомісяця',
    quarterly: 'Поквартально (раз на 3 міс.)',
    savingsTitle: 'Переплата: $0 • Без банківських відсотків',
    savingsDesc: 'Економія до $15 000+ порівняно зі звичайною іпотекою банку.',
    btnSchedule: 'Переглянути графік платежів',
    btnScheduleHide: 'Сховати графік платежів',
    colNum: '№',
    colPeriod: 'Період',
    colPayment: 'Платіж',
    colRemaining: 'Залишок',
  },
  en: {
    down: 'Down Payment',
    balance: '0% Installment Balance',
    editHint: 'click to edit manually',
    rateLabel: 'Live NBKR Rate:',
    rateFixedBadge: 'Exchange rate pegging in contract',
    btnOpenCatalog: 'Select Floor Plan from Catalog (11 Units)',
    btnCloseCatalog: 'Collapse Layouts Catalog',
    filterComplexAll: 'All Developments',
    filterRoomsAll: 'All Rooms',
    selectedAptPrefix: 'Selected Apartment:',
    btnResetSelected: 'Reset',
    payFrequency: 'Payment frequency:',
    monthly: 'Monthly',
    quarterly: 'Quarterly (every 3 mos)',
    savingsTitle: 'Overpayment: $0 • Zero Bank Markups',
    savingsDesc: 'Save up to $15,000+ compared to commercial mortgage interest rates.',
    btnSchedule: 'View Full Payment Schedule',
    btnScheduleHide: 'Hide Schedule',
    colNum: '#',
    colPeriod: 'Period',
    colPayment: 'Payment',
    colRemaining: 'Balance',
  },
  zh: {
    down: '首付款',
    balance: '0% 免息分期余款',
    editHint: '点击可手动输入金额',
    rateLabel: '央行实时汇率:',
    rateFixedBadge: '合同中支持锁定汇率机制',
    btnOpenCatalog: '在售主力户型库中挑选 (共11款)',
    btnCloseCatalog: '收起户型列表',
    filterComplexAll: '全部楼盘',
    filterRoomsAll: '全部房型',
    selectedAptPrefix: '当前选定房源：',
    btnResetSelected: '重置',
    payFrequency: '还款周期频率：',
    monthly: '按月还款',
    quarterly: '按季度还款 (每3个月)',
    savingsTitle: '利息支出: $0 • 无商业银行附加成本',
    savingsDesc: '相较商业银行 18%–22% 高息按揭贷款，全周期立省 $15,000+。',
    btnSchedule: '展开还款明细测算表',
    btnScheduleHide: '收起还款明细',
    colNum: '序号',
    colPeriod: '期数',
    colPayment: '还款金额',
    colRemaining: '剩余本金',
  },
};

// Все реальные планировки девелопера
interface ApartmentUnit {
  id: string;
  complex: string;
  complexSlug: 'abu-dhabi' | 'madina-residence' | 'ajkol-plus';
  rooms: 1 | 2 | 3;
  area: number;
  priceM2: number;
  totalPrice: number;
  floor: string;
  badge?: string;
}

const APARTMENTS_CATALOG: ApartmentUnit[] = [
  // ЖК Abu Dhabi
  { id: 'ad-1k-49', complex: 'ЖК Abu Dhabi', complexSlug: 'abu-dhabi', rooms: 1, area: 49.48, priceM2: 1650, totalPrice: 81642, floor: '4–22 этажи', badge: 'Панорама гор' },
  { id: 'ad-1k-55', complex: 'ЖК Abu Dhabi', complexSlug: 'abu-dhabi', rooms: 1, area: 55.62, priceM2: 1650, totalPrice: 91773, floor: '3–20 этажи', badge: 'Видовая' },
  { id: 'ad-2k-78', complex: 'ЖК Abu Dhabi', complexSlug: 'abu-dhabi', rooms: 2, area: 78.30, priceM2: 1650, totalPrice: 129195, floor: '5–24 этажи', badge: 'Премиум' },
  { id: 'ad-2k-83', complex: 'ЖК Abu Dhabi', complexSlug: 'abu-dhabi', rooms: 2, area: 83.58, priceM2: 1650, totalPrice: 137907, floor: '6–22 этажи', badge: 'Двусторонняя' },
  { id: 'ad-3k-119', complex: 'ЖК Abu Dhabi', complexSlug: 'abu-dhabi', rooms: 3, area: 119.32, priceM2: 1650, totalPrice: 196878, floor: 'блок Б', badge: 'Премиум • Блок Б' },

  // ЖК Madina Residence
  { id: 'mr-1k-43', complex: 'ЖК Madina Residence', complexSlug: 'madina-residence', rooms: 1, area: 43.59, priceM2: 1500, totalPrice: 65385, floor: '3–12 этажи', badge: 'Хит продаж' },
  { id: 'mr-2k-68', complex: 'ЖК Madina Residence', complexSlug: 'madina-residence', rooms: 2, area: 68.20, priceM2: 1500, totalPrice: 102300, floor: '2–14 этажи', badge: 'Бизнес в центре' },
  { id: 'mr-3k-92', complex: 'ЖК Madina Residence', complexSlug: 'madina-residence', rooms: 3, area: 92.40, priceM2: 1500, totalPrice: 138600, floor: '6–14 этажи', badge: 'Для семьи' },

  // ЖД Айкол +
  { id: 'aik-1k-42', complex: 'ЖД Айкол +', complexSlug: 'ajkol-plus', rooms: 1, area: 42.00, priceM2: 1200, totalPrice: 50400, floor: '2–9 этажи', badge: 'Эко-предгорье' },
  { id: 'aik-2k-74', complex: 'ЖД Айкол +', complexSlug: 'ajkol-plus', rooms: 2, area: 74.30, priceM2: 1200, totalPrice: 89160, floor: '3–8 этажи', badge: 'Чистый воздух' },
  { id: 'aik-3k-88', complex: 'ЖД Айкол +', complexSlug: 'ajkol-plus', rooms: 3, area: 88.50, priceM2: 1200, totalPrice: 106200, floor: '3–7 этажи', badge: 'Просторная' },
];

export default function PurchaseTermsPage() {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;
  const s = CALC_STRINGS[currentLang] || CALC_STRINGS.ru;

  // Состояние калькулятора рассрочки
  const [apartmentPrice, setApartmentPrice] = useState<number>(65000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [months, setMonths] = useState<number>(36);
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly'>('monthly');
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'KGS'>('USD');
  const [usdRate, setUsdRate] = useState<number>(87.45);
  const [rateDate, setRateDate] = useState<string>('');
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  // Сворачиваемый каталог планировок
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [selectedComplexFilter, setSelectedComplexFilter] = useState<string>('all');
  const [selectedRoomsFilter, setSelectedRoomsFilter] = useState<number | 'all'>('all');
  const [selectedApartment, setSelectedApartment] = useState<ApartmentUnit | null>(null);

  // Автоматическая загрузка официального курса из API
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

  // Состояние Trade-in калькулятора
  const [tradeInType, setTradeInType] = useState<'auto' | 'realty'>('auto');
  const [assetName, setAssetName] = useState<string>('');
  const [assetYear, setAssetYear] = useState<string>('');
  const [estimatedValue, setEstimatedValue] = useState<string>('');

  // Состояние FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Фильтрация планировок в каталоге
  const filteredCatalog = useMemo(() => {
    return APARTMENTS_CATALOG.filter((apt) => {
      const matchComplex = selectedComplexFilter === 'all' || apt.complexSlug === selectedComplexFilter;
      const matchRooms = selectedRoomsFilter === 'all' || apt.rooms === selectedRoomsFilter;
      return matchComplex && matchRooms;
    });
  }, [selectedComplexFilter, selectedRoomsFilter]);

  // Расчеты рассрочки
  const downPaymentAmount = Math.round((apartmentPrice * downPaymentPercent) / 100);
  const remainingAmount = Math.max(0, apartmentPrice - downPaymentAmount);

  const numberOfPayments = frequency === 'monthly' ? months : Math.max(1, Math.ceil(months / 3));
  const paymentPerPeriodUsd = numberOfPayments > 0 ? Math.round(remainingAmount / numberOfPayments) : 0;
  const paymentPerPeriodKgs = Math.round(paymentPerPeriodUsd * usdRate);

  const rateDisclaimer = RATE_DISCLAIMERS[currentLang] || RATE_DISCLAIMERS.ru;

  // Клик по планировке из каталога
  const handleSelectApartment = (apt: ApartmentUnit) => {
    setApartmentPrice(apt.totalPrice);
    setSelectedApartment(apt);
  };

  const handleResetApartment = () => {
    setSelectedApartment(null);
  };

  // Ручной ввод стоимости
  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const num = raw ? parseInt(raw, 10) : 0;
    setApartmentPrice(Math.min(1000000, num));
    setSelectedApartment(null);
  };

  // Ручной ввод первоначального взноса
  const handleDownAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const num = raw ? parseInt(raw, 10) : 0;
    if (apartmentPrice > 0) {
      const pct = Math.min(90, Math.max(10, Number(((num / apartmentPrice) * 100).toFixed(1))));
      setDownPaymentPercent(pct);
    }
  };

  const handleMonthsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const num = raw ? parseInt(raw, 10) : 1;
    setMonths(Math.min(36, Math.max(1, num)));
  };

  const handleRateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value.replace(',', '.'));
    if (!isNaN(val) && val > 0) {
      setUsdRate(val);
    }
  };

  // Детальный график выплат
  const paymentSchedule = useMemo(() => {
    const items = [];
    let currentBalance = remainingAmount;

    for (let i = 1; i <= numberOfPayments; i++) {
      const isLast = i === numberOfPayments;
      const currentPay = isLast ? currentBalance : paymentPerPeriodUsd;
      currentBalance = Math.max(0, currentBalance - currentPay);
      items.push({
        num: i,
        period: frequency === 'monthly' ? `${i} мес.` : `${i * 3} мес. (${i} кв.)`,
        paymentUsd: currentPay,
        paymentKgs: Math.round(currentPay * usdRate),
        balanceUsd: currentBalance,
      });
    }
    return items;
  }, [numberOfPayments, remainingAmount, paymentPerPeriodUsd, frequency, usdRate]);

  const handleSendCalculation = () => {
    const freqLabel = frequency === 'monthly' ? s.monthly : s.quarterly;
    const aptInfo = selectedApartment
      ? `• Выбранный объект: ${selectedApartment.complex} (${selectedApartment.rooms}-комн., ${selectedApartment.area} м² • ${selectedApartment.floor})\n`
      : '';

    const text =
      `${t.termsPage.waCalcGreeting}\n\n` +
      aptInfo +
      `• ${t.termsPage.waCalcPrice} $${apartmentPrice.toLocaleString('ru-RU')} (~${Math.round(apartmentPrice * usdRate).toLocaleString('ru-RU')} ${t.termsPage.somUnit})\n` +
      `• ${t.termsPage.waCalcDown} (${downPaymentPercent}%): $${downPaymentAmount.toLocaleString('ru-RU')} (~${Math.round(downPaymentAmount * usdRate).toLocaleString('ru-RU')} ${t.termsPage.somUnit})\n` +
      `• ${t.termsPage.waCalcTerm} ${months} ${t.termsPage.calcMonths} (${freqLabel})\n` +
      `• Платеж: $${paymentPerPeriodUsd.toLocaleString('ru-RU')} (~${paymentPerPeriodKgs.toLocaleString('ru-RU')} ${t.termsPage.somUnit}) • Выплат: ${numberOfPayments}\n` +
      `• Курс НБКР: ${usdRate} сом/$\n\n` +
      `${t.termsPage.waCalcQuestion}`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendTradeIn = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel = tradeInType === 'auto' ? t.termsPage.waTradeAutoLabel : t.termsPage.waTradeRealtyLabel;
    const text =
      `${t.termsPage.waTradeGreeting}\n\n` +
      `• ${t.termsPage.waTradeType} ${typeLabel}\n` +
      `• ${t.termsPage.waTradeDesc} ${assetName || '—'}\n` +
      (tradeInType === 'auto' && assetYear ? `• ${t.termsPage.waTradeYear} ${assetYear}\n` : '') +
      `• ${t.termsPage.waTradeValue} $${estimatedValue || '—'}\n\n` +
      `${t.termsPage.waTradeQuestion}`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const faqs = useMemo(() => [
    { q: t.termsPage.faq1Q, a: t.termsPage.faq1A },
    { q: t.termsPage.faq2Q, a: t.termsPage.faq2A },
    { q: t.termsPage.faq3Q, a: t.termsPage.faq3A },
    { q: t.termsPage.faq4Q, a: t.termsPage.faq4A },
  ], [t.termsPage]);

  const bannerWaMessage = BANNER_WA_TEXTS[currentLang] || BANNER_WA_TEXTS.ru;

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 pb-24 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white dark:bg-[#0b1b15] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
            {t.common.home}
          </Link>
          <span>/</span>
          <span className="text-[#064734] dark:text-[#d4b26f] font-bold">{t.header.terms}</span>
        </div>
      </div>

      {/* 2. Hero-секция */}
      <section className="bg-[#064734] text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {t.termsPage.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            {t.termsPage.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            {t.termsPage.heroDesc}
          </p>
        </div>
      </section>

      {/* 3. Карточки программ покупки */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Рассрочка 0% */}
          <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-8 shadow-lg dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col justify-between hover:shadow-xl dark:hover:border-[#064734]/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center text-lg mb-5 font-black">
                <IconCalendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2">
                {t.termsPage.card1Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {t.termsPage.card1Desc}
              </p>
              <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card1Bullet1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card1Bullet2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card1Bullet3}</span>
                </li>
              </ul>
            </div>
            <a
              href="#calculator"
              className="mt-6 text-center bg-[#064734] hover:bg-[#032b20] dark:bg-[#064734] dark:hover:bg-[#095740] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5 border border-transparent dark:border-white/10"
            >
              <span>{t.termsPage.card1Btn}</span>
              <svg className="w-3.5 h-3.5 text-[#d4b26f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Trade-in / Бартер */}
          <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-8 shadow-xl dark:shadow-none border-2 border-[#d4b26f] flex flex-col justify-between relative hover:shadow-2xl transition-shadow">
            <div className="absolute -top-3 right-6 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
              {t.termsPage.card2Badge}
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4b26f]/20 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center mb-5">
                <IconCar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2">
                {t.termsPage.card2Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {t.termsPage.card2Desc}
              </p>
              <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card2Bullet1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card2Bullet2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card2Bullet3}</span>
                </li>
              </ul>
            </div>
            <a
              href="#trade-in"
              className="mt-6 text-center bg-[#d4b26f] hover:bg-[#c49f57] text-[#064734] font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <span>{t.termsPage.card2Btn}</span>
              <svg className="w-3.5 h-3.5 text-[#d4b26f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* 100% расчет */}
          <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-8 shadow-lg dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col justify-between hover:shadow-xl dark:hover:border-[#064734]/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center mb-5">
                <IconDiamond className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2">
                {t.termsPage.card3Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {t.termsPage.card3Desc}
              </p>
              <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card3Bullet1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card3Bullet2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card3Bullet3}</span>
                </li>
              </ul>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(t.termsPage.waFullPaymentText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-center bg-[#064734] hover:bg-[#032b20] dark:bg-[#064734] dark:hover:bg-[#095740] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5 border border-transparent dark:border-white/10"
            >
              <span>{t.termsPage.card3Btn}</span>
              <IconArrowRight className="w-3.5 h-3.5 text-[#d4b26f]" />
            </a>
          </div>

        </div>
      </div>

      {/* 4. ПРЕМИАЛЬНЫЙ КАЛЬКУЛЯТОР РАССРОЧКИ С КАТАЛОГОМ ПЛАНИРОВОК */}
      <section id="calculator" className="max-w-5xl mx-auto px-4 sm:px-6 mt-20 scroll-mt-24">
        <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-12 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none transition-colors">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-1">
              {t.termsPage.calcBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
              {t.termsPage.calcTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-2">
              {t.termsPage.calcDesc}
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Панель живого курса валют НБКР */}
            <div className="p-4 rounded-2xl bg-[#064734]/5 dark:bg-white/5 border border-[#064734]/15 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-gray-700 dark:text-gray-200">
                  {s.rateLabel} {rateDate ? `(${rateDate})` : ''}
                </span>
                <div className="inline-flex items-center gap-1 bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/20 px-2.5 py-1 rounded-lg">
                  <input
                    type="number"
                    step="0.01"
                    value={usdRate}
                    onChange={handleRateInput}
                    className="w-16 text-center font-black text-[#064734] dark:text-[#d4b26f] bg-transparent focus:outline-none"
                  />
                  <span className="text-[10px] text-gray-400">сом/$</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                <IconShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>{s.rateFixedBadge}</span>
              </div>
            </div>

            {/* КНОПКА РАСКРЫТИЯ КАТАЛОГА ПЛАНИРОВОК (С ФИРМЕННЫМ SVG) */}
            <div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                  className="py-3 px-5 rounded-2xl bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] hover:text-white dark:text-[#064734] font-black text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <IconBuilding className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span>{isCatalogOpen ? s.btnCloseCatalog : s.btnOpenCatalog}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isCatalogOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {selectedApartment && (
                  <div className="inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-white/10 border border-emerald-300 dark:border-white/20 text-xs">
                    <span className="font-bold text-emerald-900 dark:text-[#d4b26f]">
                      {s.selectedAptPrefix} <strong>{selectedApartment.complex}</strong> ({selectedApartment.rooms}-к, {selectedApartment.area} м²)
                    </span>
                    <button
                      type="button"
                      onClick={handleResetApartment}
                      className="text-[11px] font-bold text-gray-400 hover:text-rose-500 transition-colors ml-2 cursor-pointer"
                    >
                      ✕ {s.btnResetSelected}
                    </button>
                  </div>
                )}
              </div>

              {/* РАСКРЫВАЮЩИЙСЯ БЛОК ВСЕХ ПЛАНИРОВОК */}
              {isCatalogOpen && (
                <div className="mt-4 p-5 sm:p-6 rounded-3xl bg-[#f7faf8] dark:bg-[#040c09] border border-[#064734]/20 dark:border-white/15 animate-fadeIn space-y-4">
                  {/* Панель фильтров каталога */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-200 dark:border-white/10">
                    {/* Фильтр ЖК */}
                    <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                      {[
                        { id: 'all', label: s.filterComplexAll },
                        { id: 'abu-dhabi', label: 'Abu Dhabi' },
                        { id: 'madina-residence', label: 'Madina' },
                        { id: 'ajkol-plus', label: 'Айкол +' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelectedComplexFilter(c.id)}
                          className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                            selectedComplexFilter === c.id
                              ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                              : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>

                    {/* Фильтр комнатности */}
                    <div className="flex gap-1.5 text-xs font-bold">
                      {[
                        { id: 'all', label: s.filterRoomsAll },
                        { id: 1, label: '1-к' },
                        { id: 2, label: '2-к' },
                        { id: 3, label: '3-к' },
                      ].map((r) => (
                        <button
                          key={String(r.id)}
                          type="button"
                          onClick={() => setSelectedRoomsFilter(r.id as any)}
                          className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                            selectedRoomsFilter === r.id
                              ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                              : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Сетка планировок */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredCatalog.map((apt) => {
                      const isSelected = selectedApartment?.id === apt.id;
                      return (
                        <button
                          key={apt.id}
                          type="button"
                          onClick={() => handleSelectApartment(apt)}
                          className={`p-4 rounded-2xl text-left transition-all border cursor-pointer relative group ${
                            isSelected
                              ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] border-transparent shadow-lg scale-[1.01]'
                              : 'bg-white dark:bg-[#0b1b15] border-gray-200 dark:border-white/10 hover:border-[#064734]/40 dark:hover:border-[#d4b26f]/40 text-gray-900 dark:text-white'
                          }`}
                        >
                          {apt.badge && (
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full absolute top-3 right-3 ${
                              isSelected
                                ? 'bg-white/20 text-white dark:bg-black/20 dark:text-[#064734]'
                                : 'bg-[#d4b26f]/20 text-[#064734] dark:text-[#d4b26f]'
                            }`}>
                              {apt.badge}
                            </span>
                          )}

                          <span className="text-[11px] font-bold block opacity-70 mb-0.5">
                            {apt.rooms}-комнатная • {apt.area} м²
                          </span>
                          <h4 className="text-sm font-black mb-2">
                            {apt.complex}
                          </h4>

                          <div className="flex items-baseline justify-between pt-2 border-t border-current/10">
                            <strong className="text-base font-black">
                              ${apt.totalPrice.toLocaleString('ru-RU')}
                            </strong>
                            <span className="text-[10px] opacity-75">
                              от ${apt.priceM2}/м²
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Параметр 1: Стоимость квартиры */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                <div>
                  <span className="text-xs font-bold uppercase text-gray-600 dark:text-gray-300 block">
                    {t.termsPage.calcPriceLabel}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-neutral-500">
                    {s.editHint}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="flex items-center gap-1 bg-[#f2f6f4] dark:bg-[#071912] border border-[#064734]/20 dark:border-[#d4b26f]/30 px-3 py-1.5 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-[#d4b26f] transition-all">
                    <span className="text-base font-black text-[#064734] dark:text-[#d4b26f]">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={apartmentPrice > 0 ? apartmentPrice.toLocaleString('ru-RU') : ''}
                      onChange={handlePriceInput}
                      placeholder="0"
                      className="w-28 sm:w-36 bg-transparent text-right text-lg sm:text-xl font-black text-[#064734] dark:text-[#d4b26f] focus:outline-none"
                    />
                  </div>
                  <span className="text-xs text-gray-400 dark:text-neutral-500 hidden sm:inline whitespace-nowrap">
                    ≈ {Math.round(apartmentPrice * usdRate).toLocaleString('ru-RU')} {t.termsPage.somUnit}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="30000"
                max="250000"
                step="1000"
                value={apartmentPrice}
                onChange={(e) => {
                  setApartmentPrice(Number(e.target.value));
                  setSelectedApartment(null);
                }}
                className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#064734] dark:accent-[#d4b26f]"
              />
            </div>

            {/* Параметр 2: Первоначальный взнос */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                <div>
                  <span className="text-xs font-bold uppercase text-gray-600 dark:text-gray-300 block">
                    {t.termsPage.calcDownLabel} ({downPaymentPercent}%):
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-neutral-500">
                    {s.editHint}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="flex items-center gap-1 bg-[#f2f6f4] dark:bg-[#071912] border border-[#064734]/20 dark:border-[#d4b26f]/30 px-3 py-1.5 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-[#d4b26f] transition-all">
                    <span className="text-base font-black text-[#064734] dark:text-[#d4b26f]">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={downPaymentAmount > 0 ? downPaymentAmount.toLocaleString('ru-RU') : ''}
                      onChange={handleDownAmountInput}
                      placeholder="0"
                      className="w-24 sm:w-32 bg-transparent text-right text-lg sm:text-xl font-black text-[#064734] dark:text-[#d4b26f] focus:outline-none"
                    />
                  </div>
                  <span className="text-xs text-gray-400 dark:text-neutral-500 hidden sm:inline whitespace-nowrap">
                    ≈ {Math.round(downPaymentAmount * usdRate).toLocaleString('ru-RU')} {t.termsPage.somUnit}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="20"
                max="60"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#064734] dark:accent-[#d4b26f]"
              />

              <div className="flex gap-2 mt-3">
                {[20, 30, 40, 50].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPercent(pct)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      downPaymentPercent === pct
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734]'
                        : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {pct}% {pct === 20 ? t.termsPage.calcMinBadge : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Параметр 3: Срок и периодичность платежей */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase text-gray-600 dark:text-gray-300">
                    {t.termsPage.calcTermLabel}
                  </span>
                  <div className="flex items-center gap-1.5 bg-[#f2f6f4] dark:bg-[#071912] border border-[#064734]/20 dark:border-[#d4b26f]/30 px-2.5 py-1 rounded-xl">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={months}
                      onChange={handleMonthsInput}
                      className="w-8 text-center text-sm font-black text-[#064734] dark:text-[#d4b26f] bg-transparent focus:outline-none"
                    />
                    <span className="text-[11px] font-bold text-gray-500 dark:text-neutral-400">
                      {t.termsPage.calcMonths}
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min="12"
                  max="36"
                  step="1"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#064734] dark:accent-[#d4b26f]"
                />

                <div className="flex gap-2 mt-3">
                  {[12, 18, 24, 36].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMonths(m)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        months === m
                          ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734]'
                          : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {m} {t.termsPage.calcMonths} {m === 36 ? t.termsPage.calcMaxBadge : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-gray-600 dark:text-gray-300 block mb-2">
                  {s.payFrequency}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all text-center cursor-pointer border ${
                      frequency === 'monthly'
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] border-transparent shadow'
                        : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{s.monthly}</span>
                    <span className="block text-[10px] opacity-75 mt-0.5">{months} выплат</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFrequency('quarterly')}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all text-center cursor-pointer border ${
                      frequency === 'quarterly'
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] border-transparent shadow'
                        : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{s.quarterly}</span>
                    <span className="block text-[10px] opacity-75 mt-0.5">{Math.ceil(months / 3)} выплат</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Визуальная шкала распределения суммы */}
            <div className="pt-2">
              <div className="flex flex-col sm:flex-row justify-between text-xs font-bold mb-2 gap-1">
                <span className="text-[#064734] dark:text-[#d4b26f] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d4b26f] shrink-0" />
                  {s.down}: ${downPaymentAmount.toLocaleString('ru-RU')} ({downPaymentPercent}%)
                </span>
                <span className="text-gray-600 dark:text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#064734] dark:bg-emerald-500 shrink-0" />
                  {s.balance}: ${remainingAmount.toLocaleString('ru-RU')} ({Number((100 - downPaymentPercent).toFixed(1))}%)
                </span>
              </div>
              <div className="h-3.5 w-full bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden flex p-0.5 border border-gray-200 dark:border-white/10 shadow-inner">
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

            {/* Маркетинговый блок экономии на банковских процентах */}
            <div className="p-4 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/10 border border-[#064734]/20 dark:border-[#d4b26f]/20 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] flex items-center justify-center shrink-0 font-black">
                %
              </div>
              <div>
                <strong className="text-xs font-black uppercase text-[#064734] dark:text-[#d4b26f] block">
                  {s.savingsTitle}
                </strong>
                <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5">
                  {s.savingsDesc}
                </p>
              </div>
            </div>

            {/* Итоговая панель расчета */}
            <div className="bg-[#f2f6f4] dark:bg-[#040c09] rounded-3xl p-6 sm:p-8 border border-[#064734]/15 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
              <div className="max-w-xl w-full">
                
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
                    {frequency === 'monthly' ? t.termsPage.calcMonthlyLabel : 'Платеж в квартал (0% переплат):'}
                  </span>
                  
                  <div className="inline-flex p-1 rounded-xl bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-xs font-black">
                    <button
                      type="button"
                      onClick={() => setCurrencyMode('USD')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
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
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        currencyMode === 'KGS'
                          ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      KGS (сом)
                    </button>
                  </div>
                </div>

                {currencyMode === 'USD' ? (
                  <>
                    <div className="text-3xl sm:text-5xl font-black text-[#064734] dark:text-[#d4b26f]">
                      ${paymentPerPeriodUsd.toLocaleString('ru-RU')}
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-2">
                        {frequency === 'monthly' ? t.termsPage.calcPerMonth : '/ квартал'}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-[#064734]/80 dark:text-neutral-300 mt-1">
                      ≈ {paymentPerPeriodKgs.toLocaleString('ru-RU')} {t.termsPage.somUnit} ({numberOfPayments} выплат)
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-3xl sm:text-5xl font-black text-[#064734] dark:text-[#d4b26f]">
                      {paymentPerPeriodKgs.toLocaleString('ru-RU')}
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-2">
                        {t.termsPage.somUnit} {frequency === 'monthly' ? t.termsPage.calcPerMonth : '/ квартал'}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-[#064734]/80 dark:text-neutral-300 mt-1">
                      ≈ ${paymentPerPeriodUsd.toLocaleString('ru-RU')} ({numberOfPayments} выплат)
                    </div>
                  </>
                )}

                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-2 font-medium">
                  {t.termsPage.calcRemaining} ${remainingAmount.toLocaleString('ru-RU')} • {t.termsPage.calcNoBankFee}
                </p>

                <p className="text-[11px] text-gray-500 dark:text-neutral-400/90 mt-3 pt-3 border-t border-gray-200 dark:border-white/10 leading-relaxed italic">
                  {rateDisclaimer}
                </p>
              </div>

              <div className="w-full md:w-auto flex flex-col gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSendCalculation}
                  className="w-full bg-[#064734] hover:bg-[#032b20] active:scale-95 text-[#d4b26f] hover:text-white font-black px-8 py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                  <span>{t.termsPage.calcWaBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSchedule(!showSchedule)}
                  className="w-full bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors border border-gray-200 dark:border-white/10 cursor-pointer text-center"
                >
                  {showSchedule ? s.btnScheduleHide : s.btnSchedule}
                </button>
              </div>
            </div>

            {/* Раскрывающийся подробный график платежей */}
            {showSchedule && (
              <div className="mt-6 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden animate-fadeIn">
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#064734] text-white sticky top-0">
                      <tr>
                        <th className="p-3 font-bold">{s.colNum}</th>
                        <th className="p-3 font-bold">{s.colPeriod}</th>
                        <th className="p-3 font-bold">{s.colPayment} ($ / сом)</th>
                        <th className="p-3 font-bold text-right">{s.colRemaining}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/10 bg-white dark:bg-[#0b1b15]">
                      {paymentSchedule.map((item) => (
                        <tr key={item.num} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                          <td className="p-3 font-bold text-[#064734] dark:text-[#d4b26f]">{item.num}</td>
                          <td className="p-3 font-medium text-gray-700 dark:text-gray-300">{item.period}</td>
                          <td className="p-3 font-bold text-gray-900 dark:text-white">
                            ${item.paymentUsd.toLocaleString('ru-RU')}{' '}
                            <span className="text-[10px] text-gray-400 font-normal">
                              (≈ {item.paymentKgs.toLocaleString('ru-RU')} с)
                            </span>
                          </td>
                          <td className="p-3 text-right font-semibold text-gray-500 dark:text-neutral-400">
                            ${item.balanceUsd.toLocaleString('ru-RU')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 5. Trade-in / Экспресс-оценка */}
      <section id="trade-in" className="max-w-5xl mx-auto px-4 sm:px-6 mt-20 scroll-mt-24">
        <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-12 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-colors">
          
          <div className="lg:col-span-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
              {t.termsPage.tradeInBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f] mb-4">
              {t.termsPage.tradeInTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {t.termsPage.tradeInDesc}
            </p>

            <div className="space-y-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] flex items-center justify-center text-[10px] font-bold">1</span>
                <span>{t.termsPage.step1}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] flex items-center justify-center text-[10px] font-bold">2</span>
                <span>{t.termsPage.step2}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] flex items-center justify-center text-[10px] font-bold">3</span>
                <span>{t.termsPage.step3}</span>
              </div>
            </div>
          </div>

          {/* Форма быстрой оценки */}
          <div className="lg:col-span-6 bg-[#f7faf8] dark:bg-[#040c09] p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-white/10 transition-colors">
            <h3 className="text-sm font-black uppercase text-gray-900 dark:text-white mb-4">
              {t.termsPage.formTitle}
            </h3>

            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setTradeInType('auto')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  tradeInType === 'auto'
                    ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow'
                    : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                }`}
              >
                <IconCar className="w-4 h-4" />
                <span>{t.termsPage.tabAuto}</span>
              </button>
              <button
                type="button"
                onClick={() => setTradeInType('realty')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  tradeInType === 'realty'
                    ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow'
                    : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                }`}
              >
                <IconBuilding className="w-4 h-4" />
                <span>{t.termsPage.tabRealty}</span>
              </button>
            </div>

            <form onSubmit={handleSendTradeIn} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                  {tradeInType === 'auto' ? t.termsPage.labelAutoModel : t.termsPage.labelRealtyAddress}
                </label>
                <input
                  type="text"
                  required
                  placeholder={tradeInType === 'auto' ? t.termsPage.phAutoModel : t.termsPage.phRealtyAddress}
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f]"
                />
              </div>

              {tradeInType === 'auto' && (
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                    {t.termsPage.labelYear}
                  </label>
                  <input
                    type="text"
                    placeholder={t.termsPage.phYear}
                    value={assetYear}
                    onChange={(e) => setAssetYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f]"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                  {t.termsPage.labelEstimated}
                </label>
                <input
                  type="text"
                  placeholder={t.termsPage.phEstimated}
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#d4b26f] hover:bg-[#c49f57] text-[#064734] font-black py-3 rounded-xl uppercase tracking-wider transition-all shadow text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{t.termsPage.btnTradeInSubmit}</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 6. Сравнительная таблица способов оплаты */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-20">
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-center text-[#064734] dark:text-[#d4b26f] mb-8">
          {t.termsPage.tableTitle}
        </h2>

        <div className="overflow-x-auto bg-white dark:bg-[#0b1b15] rounded-3xl border border-gray-200 dark:border-white/10 shadow-md dark:shadow-none transition-colors">
          <table className="w-full text-left text-xs border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#064734] dark:bg-[#021c15] text-white">
                <th className="p-4 sm:p-5 font-bold">{t.termsPage.colParam}</th>
                <th className="p-4 sm:p-5 font-bold">{t.termsPage.colInstallment}</th>
                <th className="p-4 sm:p-5 font-bold">{t.termsPage.colTradeIn}</th>
                <th className="p-4 sm:p-5 font-bold">{t.termsPage.colFull}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10 text-gray-700 dark:text-gray-300">
              <tr>
                <td className="p-4 font-bold text-gray-900 dark:text-white">{t.termsPage.row1Param}</td>
                <td className="p-4">{t.termsPage.row1Inst}</td>
                <td className="p-4">{t.termsPage.row1Trade}</td>
                <td className="p-4">{t.termsPage.row1Full}</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-white/[0.02]">
                <td className="p-4 font-bold text-gray-900 dark:text-white">{t.termsPage.row2Param}</td>
                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">{t.termsPage.row2Inst}</td>
                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">{t.termsPage.row2Trade}</td>
                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">{t.termsPage.row2Full}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900 dark:text-white">{t.termsPage.row3Param}</td>
                <td className="p-4">{t.termsPage.row3Inst}</td>
                <td className="p-4">{t.termsPage.row3Trade}</td>
                <td className="p-4">{t.termsPage.row3Full}</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-white/[0.02]">
                <td className="p-4 font-bold text-gray-900 dark:text-white">{t.termsPage.row4Param}</td>
                <td className="p-4">{t.termsPage.row4Inst}</td>
                <td className="p-4">{t.termsPage.row4Trade}</td>
                <td className="p-4">{t.termsPage.row4Full}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900 dark:text-white">{t.termsPage.row5Param}</td>
                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">{t.termsPage.row5Inst}</td>
                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">{t.termsPage.row5Trade}</td>
                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">{t.termsPage.row5Full}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Вопросы и ответы (FAQ Accordion) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-1">
            {t.termsPage.faqBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
            {t.termsPage.faqTitle}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#0b1b15] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 dark:text-white hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[#064734] dark:text-[#d4b26f] shrink-0">
                    {isOpen ? (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Консультация юриста и менеджера */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-20">
        <div className="bg-[#032b20] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4b26f] block mb-2">
              {t.termsPage.bannerBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase mb-3">
              {t.termsPage.bannerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              {t.termsPage.bannerDesc}
            </p>
          </div>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(bannerWaMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#d4b26f] hover:bg-[#c49f57] text-[#064734] font-black px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <IconWhatsApp className="w-4 h-4 text-[#064734]" />
            <span>{t.termsPage.bannerBtn}</span>
          </a>
        </div>
      </section>

    </main>
  );
}