'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';
import MortgageComparison from '@/components/MortgageComparison';
import PurchaseRoadmap from '@/components/PurchaseRoadmap';
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

const TRADE_IN_STRINGS: Record<Locale, {
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  targetComplexLabel: string;
  targetComplexAll: string;
  photoTip: string;
  previewTitle: string;
  previewDownCovered: string;
  previewRemaining: string;
}> = {
  ru: {
    step1Title: 'Оценка за 24 часа',
    step1Desc: 'Онлайн по фото и техпаспорту или с бесплатным выездом эксперта.',
    step2Title: '100% рыночная цена',
    step2Desc: 'Честный зачет стоимости напрямую в счет первоначального взноса.',
    step3Title: 'Юридическая чистота',
    step3Desc: 'Безопасное снятие с учета и официальная регистрация ДДУ в Госрегистре.',
    targetComplexLabel: 'В счет какого ЖК зачесть:',
    targetComplexAll: 'Любой объект компании',
    photoTip: '📸 Фотографии авто или техпаспорта можно прикрепить прямо в диалог WhatsApp',
    previewTitle: 'Предварительный результат зачета:',
    previewDownCovered: '✓ Полностью закрывает 30% взнос (наличными = $0)!',
    previewRemaining: 'Остаток к доплате в рассрочку 0%:',
  },
  kg: {
    step1Title: '24 саатта баалоо',
    step1Desc: 'Сүрөт жана техпаспорт боюнча онлайн же эксперттин акысыз келиши менен.',
    step2Title: '100% базар баасы',
    step2Desc: 'Бааны түшүрбөстөн, баштапкы төлөм катары адилеттүү эсепке алуу.',
    step3Title: 'Юридикалык тазалык',
    step3Desc: 'Коопсуз бүтүм, тариздөөгө жардам жана Мамкаттоодо катталган ДДУ.',
    targetComplexLabel: 'Кайсы ЖК эсебине алуу:',
    targetComplexAll: 'Компаниянын каалаган объектиси',
    photoTip: '📸 Унаанын же техпаспорттун сүрөттөрүн түз эле WhatsApp чатына жиберсеңиз болот',
    previewTitle: 'Алдын ала эсептөө натыйжасы:',
    previewDownCovered: '✓ Баштапкы 30% төлөмдү толук жабат (накталай = $0)!',
    previewRemaining: '0% бөлүп төлөөгө калган сумма:',
  },
  kz: {
    step1Title: '24 сағатта бағалау',
    step1Desc: 'Фото мен техпаспорт бойынша онлайн немесе сарапшының тегін келуімен.',
    step2Title: '100% нарықтық құны',
    step2Desc: 'Бағаны төмендетпей, бастапқы жарна ретінде әділ есепке алу.',
    step3Title: 'Заңдық тазалық',
    step3Desc: 'Қауіпсіз мәміле, ресімдеуге көмек және Мемтіркеуде тіркелген ДДУ.',
    targetComplexLabel: 'Қайсы ТҮК есебіне жазу:',
    targetComplexAll: 'Компанияның кез келген нысаны',
    photoTip: '📸 Көліктің немесе техпаспорттың суреттерін WhatsApp чатына тікелей жібере аласыз',
    previewTitle: 'Алдын ала есептеу нәтижесі:',
    previewDownCovered: '✓ Бастапқы 30% жарнаны толық жабады (қолма-қол = $0)!',
    previewRemaining: '0% бөліп төлеуге қалған сома:',
  },
  uk: {
    step1Title: 'Оцінка за 24 години',
    step1Desc: 'Онлайн за фото та техпаспортом або з безкоштовним виїздом експерта.',
    step2Title: '100% ринкова вартість',
    step2Desc: 'Чесний залік без заниження вартості прямо в рахунок першого внеску.',
    step3Title: 'Юридична чистота',
    step3Desc: 'Безпечна угода, допомога в оформленні та ДДУ з реєстрацією у Держреєстрі.',
    targetComplexLabel: 'В рахунок якого ЖК зарахувати:',
    targetComplexAll: 'Будь-який об’єкт компанії',
    photoTip: '📸 Фотографії авто або техпаспорта можна надіслати безпосередньо у WhatsApp',
    previewTitle: 'Попередній результат заліку:',
    previewDownCovered: '✓ Повністю закриває 30% внесок (готівкою = $0)!',
    previewRemaining: 'Залишок до доплати в розстрочку 0%:',
  },
  en: {
    step1Title: 'Valuation within 24 Hours',
    step1Desc: 'Online appraisal via photos/documents or free on-site expert inspection.',
    step2Title: '100% Fair Market Value',
    step2Desc: 'Honest credit toward your down payment without undervaluation discounts.',
    step3Title: 'Guaranteed Legal Title',
    step3Desc: 'Safe transaction, official deregistration assistance, and registered state contracts.',
    targetComplexLabel: 'Select target complex:',
    targetComplexAll: 'Any Company Development',
    photoTip: '📸 You can attach photos of your car or property documents directly in WhatsApp',
    previewTitle: 'Preliminary Trade-In Coverage:',
    previewDownCovered: '✓ Fully covers the 30% down payment ($0 cash required)!',
    previewRemaining: 'Remaining balance in 0% installment:',
  },
  zh: {
    step1Title: '24小时极速估值',
    step1Desc: '通过车辆照片及权属证明在线评估，或由专业评估师上门查验。',
    step2Title: '100%公允市场价折算',
    step2Desc: '按真实市场行情公允作价，全额直接冲抵新房首期款项。',
    step3Title: '法务全程规范保障',
    step3Desc: '合规过户，开发商直接签订国家官方备案购房合同，产权安全清晰。',
    targetComplexLabel: '意向抵扣的目标楼盘：',
    targetComplexAll: '旗下全线在售楼盘均可',
    photoTip: '📸 可在打开的 WhatsApp 聊天中直接发送爱车照片或产证资料',
    previewTitle: '资产置换测算概览：',
    previewDownCovered: '✓ 完全冲抵30%首付款（现金首付款 = $0）！',
    previewRemaining: '剩余款项可享受0%免息分期：',
  },
};

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
  const tr = TRADE_IN_STRINGS[currentLang] || TRADE_IN_STRINGS.ru;

  // 1. Стоимость квартиры
  const [apartmentPrice, setApartmentPrice] = useState<number>(65000);
  const [priceInput, setPriceInput] = useState<string>('65 000');

  // 2. Первоначальный взнос (число + строка)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(19500);
  const [downPaymentInput, setDownPaymentInput] = useState<string>('19 500');

  // 3. Срок рассрочки
  const [months, setMonths] = useState<number>(36);
  const [monthsInput, setMonthsInput] = useState<string>('36');

  // 4. Периодичность и валюта
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly'>('monthly');
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'KGS'>('USD');
  const [usdRate, setUsdRate] = useState<number>(87.45);
  const [rateInput, setRateInput] = useState<string>('87.45');
  const [rateDate, setRateDate] = useState<string>('');
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  // Сворачиваемый каталог планировок
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [selectedComplexFilter, setSelectedComplexFilter] = useState<string>('all');
  const [selectedRoomsFilter, setSelectedRoomsFilter] = useState<number | 'all'>('all');
  const [selectedApartment, setSelectedApartment] = useState<ApartmentUnit | null>(null);

  // Trade-in калькулятор
  const [tradeInType, setTradeInType] = useState<'auto' | 'realty'>('auto');
  const [tradeInTargetComplex, setTradeInTargetComplex] = useState<string>('all');
  const [assetName, setAssetName] = useState<string>('');
  const [assetYear, setAssetYear] = useState<string>('');
  const [estimatedValue, setEstimatedValue] = useState<string>('25000');
  const [estimatedInput, setEstimatedInput] = useState<string>('25 000');

  // FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Автоматическая загрузка официального курса из API
  useEffect(() => {
    let isMounted = true;
    fetch('/api/currency')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.rate && typeof data.rate === 'number') {
          setUsdRate(data.rate);
          setRateInput(String(data.rate));
          if (data.date) setRateDate(data.date);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Фильтрация планировок в каталоге
  const filteredCatalog = useMemo(() => {
    return APARTMENTS_CATALOG.filter((apt) => {
      const matchComplex = selectedComplexFilter === 'all' || apt.complexSlug === selectedComplexFilter;
      const matchRooms = selectedRoomsFilter === 'all' || apt.rooms === selectedRoomsFilter;
      return matchComplex && matchRooms;
    });
  }, [selectedComplexFilter, selectedRoomsFilter]);

  // Расчет остатка и ежемесячных выплат
  const remainingAmount = Math.max(0, apartmentPrice - downPaymentAmount);
  const numberOfPayments = frequency === 'monthly' ? months : Math.max(1, Math.ceil(months / 3));
  const paymentPerPeriodUsd = numberOfPayments > 0 ? Math.round(remainingAmount / numberOfPayments) : 0;
  const paymentPerPeriodKgs = Math.round(paymentPerPeriodUsd * usdRate);

  const rateDisclaimer = RATE_DISCLAIMERS[currentLang] || RATE_DISCLAIMERS.ru;

  // Расчеты Trade-in
  const parsedEstimatedValue = useMemo(() => {
    const raw = estimatedValue.replace(/\D/g, '');
    return raw ? parseInt(raw, 10) : 0;
  }, [estimatedValue]);

  const targetApartmentPrice = useMemo(() => {
    if (tradeInTargetComplex === 'abu-dhabi') return 81642;
    if (tradeInTargetComplex === 'madina-residence') return 65385;
    if (tradeInTargetComplex === 'ajkol-plus') return 50400;
    return apartmentPrice;
  }, [tradeInTargetComplex, apartmentPrice]);

  const tradeInCoveragePercent = useMemo(() => {
    if (targetApartmentPrice <= 0 || parsedEstimatedValue <= 0) return 0;
    return Math.min(100, Math.round((parsedEstimatedValue / targetApartmentPrice) * 100));
  }, [parsedEstimatedValue, targetApartmentPrice]);

  const tradeInRemainingToPay = useMemo(() => {
    return Math.max(0, targetApartmentPrice - parsedEstimatedValue);
  }, [targetApartmentPrice, parsedEstimatedValue]);

  // Выбор планировки из каталога
  const handleSelectApartment = (apt: ApartmentUnit) => {
    setApartmentPrice(apt.totalPrice);
    setPriceInput(apt.totalPrice.toLocaleString('ru-RU'));
    setSelectedApartment(apt);

    const newDown = Math.round((apt.totalPrice * downPaymentPercent) / 100);
    setDownPaymentAmount(newDown);
    setDownPaymentInput(newDown.toLocaleString('ru-RU'));
  };

  const handleResetApartment = () => {
    setSelectedApartment(null);
  };

  // 1. Изменение стоимости квартиры
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 7);
    const num = raw ? parseInt(raw, 10) : 0;
    setPriceInput(raw ? Number(raw).toLocaleString('ru-RU') : '');
    setApartmentPrice(num);
    setSelectedApartment(null);

    const newDown = Math.round((num * downPaymentPercent) / 100);
    setDownPaymentAmount(newDown);
    setDownPaymentInput(newDown > 0 ? newDown.toLocaleString('ru-RU') : '');
  };

  const handlePriceBlur = () => {
    let valid = apartmentPrice;
    if (!valid || valid < 10000) valid = 30000;
    if (valid > 500000) valid = 500000;
    setApartmentPrice(valid);
    setPriceInput(valid.toLocaleString('ru-RU'));

    const newDown = Math.round((valid * downPaymentPercent) / 100);
    setDownPaymentAmount(newDown);
    setDownPaymentInput(newDown.toLocaleString('ru-RU'));
  };

  const handlePriceSlider = (val: number) => {
    setApartmentPrice(val);
    setPriceInput(val.toLocaleString('ru-RU'));
    setSelectedApartment(null);

    const newDown = Math.round((val * downPaymentPercent) / 100);
    setDownPaymentAmount(newDown);
    setDownPaymentInput(newDown.toLocaleString('ru-RU'));
  };

  // 2. Изменение первоначального взноса
  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 7);
    const num = raw ? parseInt(raw, 10) : 0;
    setDownPaymentInput(raw ? Number(raw).toLocaleString('ru-RU') : '');
    setDownPaymentAmount(num);

    if (apartmentPrice > 0) {
      const pct = Number(((num / apartmentPrice) * 100).toFixed(1));
      setDownPaymentPercent(Math.min(100, Math.max(0, pct)));
    }
  };

  const handleDownPaymentBlur = () => {
    let valid = downPaymentAmount;
    const minDown = Math.round(apartmentPrice * 0.1);
    if (valid < minDown) valid = Math.round(apartmentPrice * 0.2);
    if (valid > apartmentPrice) valid = apartmentPrice;

    setDownPaymentAmount(valid);
    setDownPaymentInput(valid.toLocaleString('ru-RU'));
    if (apartmentPrice > 0) {
      setDownPaymentPercent(Number(((valid / apartmentPrice) * 100).toFixed(1)));
    }
  };

  const handleDownPercentChange = (pct: number) => {
    setDownPaymentPercent(pct);
    const newDown = Math.round((apartmentPrice * pct) / 100);
    setDownPaymentAmount(newDown);
    setDownPaymentInput(newDown.toLocaleString('ru-RU'));
  };

  // 3. Изменение срока выплат
  const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMonthsInput(raw);
    const num = raw ? parseInt(raw, 10) : 0;
    setMonths(num);
  };

  const handleMonthsBlur = () => {
    let valid = months;
    if (!valid || valid < 12) valid = 12;
    if (valid > 36) valid = 36;
    setMonths(valid);
    setMonthsInput(String(valid));
  };

  const handleMonthsSelect = (m: number) => {
    setMonths(m);
    setMonthsInput(String(m));
  };

  // 4. Изменение курса НБКР
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRateInput(e.target.value);
    const parsed = parseFloat(e.target.value.replace(',', '.'));
    if (!isNaN(parsed) && parsed > 0) {
      setUsdRate(parsed);
    }
  };

  const handleRateBlur = () => {
    const parsed = parseFloat(rateInput.replace(',', '.'));
    if (isNaN(parsed) || parsed < 50 || parsed > 200) {
      setUsdRate(87.45);
      setRateInput('87.45');
    } else {
      const clean = Number(parsed.toFixed(2));
      setUsdRate(clean);
      setRateInput(String(clean));
    }
  };

  // 5. Изменение суммы Trade-in
  const handleTradeInEstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 8);
    setEstimatedValue(raw);
    setEstimatedInput(raw ? Number(raw).toLocaleString('ru-RU') : '');
  };

  // График платежей
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
    const numEst = parsedEstimatedValue;
    const kgsEst = numEst > 0 ? Math.round(numEst * usdRate) : 0;
    const targetLabel =
      tradeInTargetComplex === 'abu-dhabi'
        ? 'ЖК Abu Dhabi'
        : tradeInTargetComplex === 'madina-residence'
        ? 'ЖК Madina Residence'
        : tradeInTargetComplex === 'ajkol-plus'
        ? 'ЖД Айкол +'
        : 'Все объекты компании';

    const text =
      `${t.termsPage.waTradeGreeting}\n\n` +
      `• ${t.termsPage.waTradeType} ${typeLabel}\n` +
      `• ${t.termsPage.waTradeDesc} ${assetName || '—'}\n` +
      (tradeInType === 'auto' && assetYear ? `• ${t.termsPage.labelYear} ${assetYear}\n` : '') +
      `• В счет объекта: ${targetLabel}\n` +
      `• ${t.termsPage.waTradeValue} $${numEst.toLocaleString('ru-RU')} (~${kgsEst.toLocaleString('ru-RU')} ${t.termsPage.somUnit})\n\n` +
      `Готов отправить фотографии и документы актива для экспресс-оценки. ${t.termsPage.waTradeQuestion}`;

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
                    type="text"
                    inputMode="decimal"
                    value={rateInput}
                    onChange={handleRateChange}
                    onBlur={handleRateBlur}
                    onFocus={(e) => e.target.select()}
                    autoComplete="off"
                    spellCheck="false"
                    className="w-16 text-center font-black text-[#064734] dark:text-[#d4b26f] bg-transparent focus:outline-none cursor-pointer"
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

            {/* Параметр 1: Стоимость квартиры (с мягким редактированием) */}
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
                      value={priceInput}
                      onChange={handlePriceChange}
                      onBlur={handlePriceBlur}
                      onFocus={(e) => e.target.select()}
                      autoComplete="off"
                      spellCheck="false"
                      placeholder="0"
                      className="w-28 sm:w-36 bg-transparent text-right text-lg sm:text-xl font-black text-[#064734] dark:text-[#d4b26f] focus:outline-none cursor-pointer"
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
                value={apartmentPrice || 30000}
                onChange={(e) => handlePriceSlider(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#064734] dark:accent-[#d4b26f]"
              />
            </div>

            {/* Параметр 2: Первоначальный взнос (с мягким вводом любой суммы) */}
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
                      value={downPaymentInput}
                      onChange={handleDownPaymentChange}
                      onBlur={handleDownPaymentBlur}
                      onFocus={(e) => e.target.select()}
                      autoComplete="off"
                      spellCheck="false"
                      placeholder="0"
                      className="w-24 sm:w-32 bg-transparent text-right text-lg sm:text-xl font-black text-[#064734] dark:text-[#d4b26f] focus:outline-none cursor-pointer"
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
                onChange={(e) => handleDownPercentChange(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#064734] dark:accent-[#d4b26f]"
              />

              <div className="flex gap-2 mt-3">
                {[20, 30, 40, 50].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleDownPercentChange(pct)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      Math.round(downPaymentPercent) === pct
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
                      value={monthsInput}
                      onChange={handleMonthsChange}
                      onBlur={handleMonthsBlur}
                      onFocus={(e) => e.target.select()}
                      autoComplete="off"
                      spellCheck="false"
                      className="w-8 text-center text-sm font-black text-[#064734] dark:text-[#d4b26f] bg-transparent focus:outline-none cursor-pointer"
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
                  value={months || 12}
                  onChange={(e) => handleMonthsSelect(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#064734] dark:accent-[#d4b26f]"
                />

                <div className="flex gap-2 mt-3">
                  {[12, 18, 24, 36].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleMonthsSelect(m)}
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
                  style={{ width: `${Math.min(100, Math.max(0, downPaymentPercent))}%` }}
                  className="h-full bg-[#d4b26f] rounded-full transition-all duration-300"
                />
                <div
                  style={{ width: `${Math.max(0, 100 - downPaymentPercent)}%` }}
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

      {/* 5. УЛУЧШЕННЫЙ ИНТЕРАКТИВНЫЙ TRADE-IN */}
      <section id="trade-in" className="max-w-5xl mx-auto px-4 sm:px-6 mt-20 scroll-mt-24">
        <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-12 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none grid grid-cols-1 lg:grid-cols-12 gap-10 items-start transition-colors">
          
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
                {t.termsPage.tradeInBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f] mb-4">
                {t.termsPage.tradeInTitle}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                {t.termsPage.tradeInDesc}
              </p>
            </div>

            {/* Карточки 3 ключевых преимуществ */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center shrink-0">
                  <IconCalendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    {tr.step1Title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                    {tr.step1Desc}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center shrink-0">
                  <IconDiamond className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    {tr.step2Title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                    {tr.step2Desc}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center shrink-0">
                  <IconShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    {tr.step3Title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                    {tr.step3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Интерактивный расчет покрытия актива */}
            {parsedEstimatedValue > 0 && (
              <div className="p-4 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/10 border border-[#064734]/20 dark:border-[#d4b26f]/30 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#064734] dark:text-[#d4b26f] uppercase tracking-wider">
                    {tr.previewTitle}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">
                    {tradeInCoveragePercent}% квартиры
                  </span>
                </div>

                <div className="h-2.5 w-full bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden p-0.5">
                  <div
                    style={{ width: `${tradeInCoveragePercent}%` }}
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  />
                </div>

                <div className="text-[11px] text-gray-700 dark:text-neutral-300 space-y-1 pt-1">
                  <p className="text-emerald-800 dark:text-emerald-400 font-bold">
                    {tr.previewDownCovered}
                  </p>
                  <p className="text-gray-500 dark:text-neutral-400">
                    {tr.previewRemaining} <strong className="text-gray-900 dark:text-white font-black">${tradeInRemainingToPay.toLocaleString('ru-RU')}</strong> (~${Math.round(tradeInRemainingToPay / 36).toLocaleString('ru-RU')}/мес на 36 мес)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Правая колонка: Форма быстрой оценки */}
          <div className="lg:col-span-6 bg-[#f7faf8] dark:bg-[#040c09] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-inner transition-colors space-y-4">
            <h3 className="text-sm font-black uppercase text-gray-900 dark:text-white">
              {t.termsPage.formTitle}
            </h3>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setTradeInType('auto');
                  setAssetName('');
                }}
                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  tradeInType === 'auto'
                    ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-md'
                    : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                }`}
              >
                <IconCar className="w-4 h-4" />
                <span>{t.termsPage.tabAuto}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTradeInType('realty');
                  setAssetName('');
                }}
                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  tradeInType === 'realty'
                    ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-md'
                    : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                }`}
              >
                <IconBuilding className="w-4 h-4" />
                <span>{t.termsPage.tabRealty}</span>
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-1.5">
                {tr.targetComplexLabel}
              </label>
              <select
                value={tradeInTargetComplex}
                onChange={(e) => setTradeInTargetComplex(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f] cursor-pointer"
              >
                <option value="all">{tr.targetComplexAll}</option>
                <option value="abu-dhabi">ЖК Abu Dhabi (ул. Сухомлинова, 29)</option>
                <option value="madina-residence">ЖК Madina Residence (ул. Огонбаева, 12)</option>
                <option value="ajkol-plus">ЖД Айкол + (с. Кок-Жар)</option>
              </select>
            </div>

            <form onSubmit={handleSendTradeIn} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-1">
                  {tradeInType === 'auto' ? t.termsPage.labelAutoModel : t.termsPage.labelRealtyAddress}
                </label>
                <input
                  type="text"
                  required
                  placeholder={tradeInType === 'auto' ? t.termsPage.phAutoModel : t.termsPage.phRealtyAddress}
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f]"
                />

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(tradeInType === 'auto'
                    ? ['Toyota Camry', 'Lexus RX / GX', 'Kia K5', 'Hyundai', 'Кроссовер']
                    : ['1-комн. вторичка', '2-комн. вторичка', '3-комн. вторичка', 'Участок / Дом']
                  ).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setAssetName(tag)}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 transition-colors cursor-pointer"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>

              {tradeInType === 'auto' && (
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-1">
                    {t.termsPage.labelYear}
                  </label>
                  <input
                    type="text"
                    placeholder={t.termsPage.phYear}
                    value={assetYear}
                    onChange={(e) => setAssetYear(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f]"
                  />
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-gray-600 dark:text-gray-300 font-semibold">
                    {t.termsPage.labelEstimated}
                  </label>
                  {parsedEstimatedValue > 0 && (
                    <span className="text-[11px] text-gray-400 dark:text-neutral-500 font-medium">
                      ≈ {Math.round(parsedEstimatedValue * usdRate).toLocaleString('ru-RU')} {t.termsPage.somUnit}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-[#064734] dark:text-[#d4b26f]">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="25 000"
                    value={estimatedInput}
                    onChange={handleTradeInEstChange}
                    onFocus={(e) => e.target.select()}
                    autoComplete="off"
                    spellCheck="false"
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 font-black text-gray-900 dark:text-white focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f] cursor-pointer"
                  />
                </div>
              </div>

              <p className="text-[10px] text-gray-400 dark:text-neutral-400 italic">
                {tr.photoTip}
              </p>

              <button
                type="submit"
                className="w-full mt-2 bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black py-4 rounded-xl uppercase tracking-wider transition-all shadow-md text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <IconWhatsApp className="w-4 h-4 text-[#064734]" />
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

      {/* 7. ИНТЕРАКТИВНОЕ СРАВНЕНИЕ С БАНКОВСКОЙ ИПОТЕКОЙ */}
      <MortgageComparison usdRate={usdRate} />
      
{/* 8. ДОРОЖНАЯ КАРТА СДЕЛКИ: 5 ШАГОВ ОТ БРОНИ ДО КЛЮЧЕЙ */}
      <PurchaseRoadmap />

      {/* 9. Вопросы и ответы (FAQ Accordion) */}
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

      {/* 9. Консультация юриста и менеджера */}
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