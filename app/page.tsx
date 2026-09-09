'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';
import {
  IconBuilding,
  IconCrane,
  IconCheck,
  IconMapPin,
  IconCalendar,
  IconArrowRight,
  IconWhatsApp,
  IconDiamond,
  IconCar,
  IconStar,
} from '@/components/Icons';

// Динамический импорт карты с нейтральным скелетоном загрузки
const BishkekMap = dynamic(() => import('@/components/BishkekMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] lg:h-[490px] rounded-3xl bg-gray-100 dark:bg-white/5 animate-pulse flex flex-col items-center justify-center text-xs font-bold text-gray-400 gap-2">
      <div className="w-8 h-8 rounded-full border-2 border-[#064734] dark:border-[#d4b26f] border-t-transparent animate-spin" />
      <span>Map Loading...</span>
    </div>
  ),
});

interface HomeContent {
  heroTag: string;
  heroTitle: string;
  heroDesc: string;
  heroBtnCatalog: string;
  heroBtnWa: string;
  statTotalLabel: string;
  statTotalVal: string;
  statPriceLabel: string;
  statPriceVal: string;
  statInstallmentLabel: string;
  statInstallmentVal: string;
  statHandoverLabel: string;
  statHandoverVal: string;
  projectsBadge: string;
  projectsTitle: string;
  projectsDesc: string;
  viewAllBtn: string;
  detailsBtn: string;
  fromPrice: string;
  sqm: string;
  statusFinished: string;
  mapBadge: string;
  mapTitle: string;
  mapDesc: string;
  purchaseBadge: string;
  purchaseTitle: string;
  p1Title: string;
  p1Desc: string;
  p1Action: string;
  p2Title: string;
  p2Desc: string;
  p2Action: string;
  p3Title: string;
  p3Desc: string;
  p3Action: string;
  advBadge: string;
  advTitle: string;
  adv1Title: string;
  adv1Desc: string;
  adv2Title: string;
  adv2Desc: string;
  adv3Title: string;
  adv3Desc: string;
  reviewsBadge: string;
  reviewsTitle: string;
  ctaBadge: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  waHeroMsg: string;
}

const CONTENT: Record<Locale, HomeContent> = {
  ru: {
    heroTag: 'EL ORDO GROUP • НАДЕЖНЫЙ ЗАСТРОЙЩИК',
    heroTitle: 'СОВРЕМЕННЫЕ ЖИЛЫЕ КОМПЛЕКСЫ В БИШКЕКЕ',
    heroDesc: 'Строительство статусных жилых комплексов и уютных клубных домов в лучших локациях Бишкека. Беспроцентная рассрочка 0% до 40 месяцев без банка и выгодный обмен по Trade-in.',
    heroBtnCatalog: 'Смотреть объекты',
    heroBtnWa: 'Консультация в WhatsApp',
    statTotalLabel: 'Объектов в портфолио:',
    statTotalVal: '6 комплексов',
    statPriceLabel: 'Стоимость метра:',
    statPriceVal: 'от 950 $/м²',
    statInstallmentLabel: 'Рассрочка без банка:',
    statInstallmentVal: 'до 40 месяцев 0%',
    statHandoverLabel: 'Надежность:',
    statHandoverVal: '100% сдача в срок',
    projectsBadge: 'Наши проекты',
    projectsTitle: 'Флагманские жилые комплексы',
    projectsDesc: 'Инновационная архитектура, монолитно-кирпичный конструктив и развитая инфраструктура для комфортной жизни.',
    viewAllBtn: 'Все объекты компании',
    detailsBtn: 'Подробнее о проекте',
    fromPrice: 'от',
    sqm: '$/м²',
    statusFinished: 'Сдан',
    mapBadge: 'Локации на карте',
    mapTitle: 'Объекты EL ORDO на карте Бишкека',
    mapDesc: 'Выберите интересующий объект или посетите наш главный офис продаж для детальной консультации.',
    purchaseBadge: 'Условия покупки',
    purchaseTitle: 'Программы приобретения недвижимости',
    p1Title: '100% ОПЛАТА СО СКИДКОЙ',
    p1Desc: 'Максимальная персональная скидка от руководства компании за квадратный метр и приоритетный выбор лучших этажей.',
    p1Action: 'Узнать размер скидки',
    p2Title: 'РАССРОЧКА 0% ДО 40 МЕСЯЦЕВ',
    p2Desc: 'Внутренняя беспроцентная рассрочка напрямую от застройщика. Без справок о доходах, поручителей и банковских процентов.',
    p2Action: 'Калькулятор рассрочки',
    p3Title: 'TRADE-IN (ОБМЕН АВТО И ЖИЛЬЯ)',
    p3Desc: 'Быстрый зачет вашего автомобиля или вторичной квартиры по честной рыночной оценке в счет первого взноса за 24 часа.',
    p3Action: 'Оценить свое имущество',
    advBadge: 'Стандарты качества',
    advTitle: 'Почему выбирают EL ORDO GROUP',
    adv1Title: 'Сейсмостойкость 9 баллов',
    adv1Desc: 'Строгое соответствие СНиП КР. Армированный монолитный железобетонный каркас с заполнением из экологичного жженого кирпича.',
    adv2Title: 'Юридическая чистота',
    adv2Desc: 'Строительство на собственных участках с Красными книгами. Оформление ДДУ с обязательной регистрацией в Госрегистре.',
    adv3Title: 'Развитая инфраструктура',
    adv3Desc: 'Подземные паркинги, безопасные закрытые дворы без машин, современные детские площадки и дизайнерские холлы.',
    reviewsBadge: 'Репутация и доверие',
    reviewsTitle: 'Отзывы наших резидентов',
    ctaBadge: 'Персональный расчет',
    ctaTitle: 'Подберите идеальную квартиру уже сегодня',
    ctaDesc: 'Оставьте запрос, и менеджер отдела продаж отправит вам полную шахматку свободных квартир с расчетом рассрочки 0%.',
    ctaBtn: 'Получить консультацию',
    waHeroMsg: 'Здравствуйте! Хочу получить актуальную шахматку и консультацию по объектам EL ORDO GROUP.',
  },
  kg: {
    heroTag: 'EL ORDO GROUP • ИШЕНИМДҮҮ КУРУУЧУ',
    heroTitle: 'БИШКЕКТЕГИ ЗАМАНБАП ТУРАК ЖАЙ КОМПЛЕКСТЕРИ',
    heroDesc: 'Бишкектин мыкты аймактарында премиум-класстагы турак жайларды жана клубдук үйлөрдү куруу. Банксыз 40 айга чейин 0% пайызсыз бөлүп төлөө жана Trade-in алмашуу.',
    heroBtnCatalog: 'Объекттерди көрүү',
    heroBtnWa: 'WhatsApp аркылуу байланышуу',
    statTotalLabel: 'Портфолиодогу объекттер:',
    statTotalVal: '6 комплекс',
    statPriceLabel: 'Чарчы метр баасы:',
    statPriceVal: '950 $/м² баштап',
    statInstallmentLabel: 'Бөлүп төлөө:',
    statInstallmentVal: '40 айга чейин 0%',
    statHandoverLabel: 'Ишенимдүүлүк:',
    statHandoverVal: '100% өз убагында',
    projectsBadge: 'Биздин долбоорлор',
    projectsTitle: 'Флагмандык турак жай комплекстери',
    projectsDesc: 'Инновациялык архитектура, бышкан кыштан курулган конструкция жана ыңгайлуу жашоо үчүн өнүккөн инфраструктура.',
    viewAllBtn: 'Компаниянын бардык объектилери',
    detailsBtn: 'Долбоор тууралуу толук',
    fromPrice: 'баштап',
    sqm: '$/м²',
    statusFinished: 'Бүткөн',
    mapBadge: 'Картадагы жайгашуусу',
    mapTitle: 'EL ORDO объекттери Бишкектин картасында',
    mapDesc: 'Кызыктырган объектти тандаңыз же толук кеңеш алуу үчүн башкы сатуу кеңсесине келиңиз.',
    purchaseBadge: 'Сатып алуу шарттары',
    purchaseTitle: 'Турак жай сатып алуу программалары',
    p1Title: 'АРЗАНДАТУУ МЕНЕН 100% ТӨЛӨМ',
    p1Desc: 'Жетекчиликтен чарчы метрге максималдуу жеке арзандатуу жана мыкты кабаттарды артыкчылыктуу тандоо.',
    p1Action: 'Арзандатуу өлчөмүн билүү',
    p2Title: '40 АЙГА ЧЕЙИН 0% БӨЛҮП ТӨЛӨӨ',
    p2Desc: 'Куруучудан банксыз түздөн-түз пайызсыз бөлүп төлөө. Киреше маалымкатысыз жана ашыкча пайыздарсыз.',
    p2Action: 'Төлөмдөрдү эсептөө',
    p3Title: 'TRADE-IN (УНАА ЖАНА ҮЙ АЛМАШУУ)',
    p3Desc: 'Баштапкы төлөм катары унааңызды же эски батириңизди 24 сааттын ичинде базар баасында эсепке алуу.',
    p3Action: 'Мүлктү баалоо',
    advBadge: 'Сапат стандарттары',
    advTitle: 'Эмне үчүн EL ORDO GROUP тандашат',
    adv1Title: '9 баллдык сейсмотуруктуулук',
    adv1Desc: 'КР СНиП нормаларына так ылайык. Бышкан кыш менен толтурулган бекем темир-бетон каркас.',
    adv2Title: 'Юридикалык тазалык',
    adv2Desc: 'Кызыл китеби бар жеке жер тилкелеринде курулуш. Мамкаттоодо милдеттүү каттоосу бар ДДУ.',
    adv3Title: 'Өнүккөн инфраструктура',
    adv3Desc: 'Жер астындагы унаа токтотуучу жайлар, унаасыз коопсуз короолор жана заманбап ойноо аянтчалары.',
    reviewsBadge: 'Аброю жана ишеним',
    reviewsTitle: 'Тургундарыбыздын пикирлери',
    ctaBadge: 'Жеке эсептөө',
    ctaTitle: 'Ыңгайлуу батириңизди бүгүн тандаңыз',
    ctaDesc: 'Суроо-талап калтырыңыз, менеджер бош батирлердин шахматкасын жана эсептөөсүн жөнөтөт.',
    ctaBtn: 'Кеңеш алуу',
    waHeroMsg: 'Саламатсызбы! EL ORDO GROUP турак жай комплекстери боюнча кеңеш жана шахматка алгым келет.',
  },
  kz: {
    heroTag: 'EL ORDO GROUP • СЕНІМДІ ҚҰРЫЛЫС САЛУШЫ',
    heroTitle: 'БІШКЕКТЕГІ ЗАМАНАУИ ТҰРҒЫН ҮЙ КЕШЕНДЕРІ',
    heroDesc: 'Бішкектің ең жақсы аудандарында премиум-санаттағы кешендер мен клубтық үйлер салу. Банксіз 40 айға дейін 0% бөліп төлеу және тиімді Trade-in айырбасы.',
    heroBtnCatalog: 'Нысандарды көру',
    heroBtnWa: 'WhatsApp-та кеңес алу',
    statTotalLabel: 'Портфолиодағы нысандар:',
    statTotalVal: '6 кешен',
    statPriceLabel: 'Шаршы метр құны:',
    statPriceVal: '950 $/м² бастап',
    statInstallmentLabel: 'Банксіз бөліп төлеу:',
    statInstallmentVal: '40 айға дейін 0%',
    statHandoverLabel: 'Сенімділік:',
    statHandoverVal: '100% уақытында',
    projectsBadge: 'Біздің жобалар',
    projectsTitle: 'Флагмандық тұрғын үй кешендері',
    projectsDesc: 'Инновациялық сәулет, күйдірілген кірпіштен қаланған конструкция және жайлы өмір үшін дамыған инфрақұрылым.',
    viewAllBtn: 'Компанияның барлық нысандары',
    detailsBtn: 'Жоба туралы толық',
    fromPrice: 'бастап',
    sqm: '$/м²',
    statusFinished: 'Берілген',
    mapBadge: 'Картадағы орналасуы',
    mapTitle: 'EL ORDO нысандары Бішкек картасында',
    mapDesc: 'Қызықтырған нысанды таңдаңыз немесе толық кеңес алу үшін сату кеңсесіне келіңіз.',
    purchaseBadge: 'Сатып алу шарттары',
    purchaseTitle: 'Баспана сатып алу бағдарламалары',
    p1Title: 'ЖЕҢІЛДІКПЕН 100% ТӨЛЕМ',
    p1Desc: 'Шаршы метрге ең жоғары дербес жеңілдік және жақсы қабаттарды басымдықпен таңдау құқығы.',
    p1Action: 'Жеңілдік көлемін білу',
    p2Title: '40 АЙҒА ДЕЙІН 0% БӨЛІП ТӨЛЕУ',
    p2Desc: 'Құрылыс салушыдан тікелей пайызсыз бөліп төлеу. Кіріс туралы анықтамасыз және банктік үстемесіз.',
    p2Action: 'Төлем калькуляторы',
    p3Title: 'TRADE-IN (КӨЛІК ПЕН БАСПАНА АЙЫРБАСЫ)',
    p3Desc: 'Бастапқы жарна ретінде көлігіңізді немесе ескі пәтеріңізді нарықтық бағамен 24 сағатта есепке алу.',
    p3Action: 'Мүлікті бағалау',
    advBadge: 'Сапа стандарттары',
    advTitle: 'Неліктен EL ORDO GROUP таңдайды',
    adv1Title: '9 балдық сейсмотөзімділік',
    adv1Desc: 'ҚР ҚНжЕ талаптарына толық сай. Күйдірілген кірпішпен толтырылған берік монолитті темірбетон қаңқа.',
    adv2Title: 'Заңдық тазалық',
    adv2Desc: 'Қызыл кітабы бар жеке жер телімдерінде құрылыс. Мемтіркеуде міндетті түрде тіркелетін ДДУ.',
    adv3Title: 'Дамыған инфрақұрылым',
    adv3Desc: 'Жерасты тұрақтары, көліксіз қауіпсіз жабық аулалар және заманауи ойын алаңдары.',
    reviewsBadge: 'Бедел мен сенім',
    reviewsTitle: 'Тұрғындарымыздың пікірлері',
    ctaBadge: 'Дербес есептеу',
    ctaTitle: 'Өзіңізге лайықты баспананы бүгін таңдаңыз',
    ctaDesc: 'Өтінім қалдырыңыз, сату бөлімі бос пәтерлер шахматкасын және 0% есебін жібереді.',
    ctaBtn: 'Кеңес алу',
    waHeroMsg: 'Сәлеметсіз бе! EL ORDO GROUP нысандары бойынша кеңес және бос пәтерлер кестесін алғым келеді.',
  },
  uk: {
    heroTag: 'EL ORDO GROUP • НАДІЙНИЙ ДЕВЕЛОПЕР',
    heroTitle: 'СУЧАСНІ ЖИТЛОВІ КОМПЛЕКСИ В БІШКЕКУ',
    heroDesc: 'Будівництво статусних житлових комплексів та затишних клубних будинків у найкращих районах Бішкека. Безвідсоткова розстрочка 0% до 40 місяців без банку та обмін за Trade-in.',
    heroBtnCatalog: 'Дивитися об’єкти',
    heroBtnWa: 'Консультація у WhatsApp',
    statTotalLabel: 'Об’єктів у портфоліо:',
    statTotalVal: '6 комплексів',
    statPriceLabel: 'Вартість метра:',
    statPriceVal: 'від 950 $/м²',
    statInstallmentLabel: 'Розстрочка без банку:',
    statInstallmentVal: 'до 40 місяців 0%',
    statHandoverLabel: 'Надійність:',
    statHandoverVal: '100% здача в строк',
    projectsBadge: 'Наші проєкти',
    projectsTitle: 'Флагманські житлові комплекси',
    projectsDesc: 'Інноваційна архітектура, монолітно-цегляний конструктив та розвинена інфраструктура для життя.',
    viewAllBtn: 'Всі об’єкти компанії',
    detailsBtn: 'Детальніше про проєкт',
    fromPrice: 'від',
    sqm: '$/м²',
    statusFinished: 'Зданий',
    mapBadge: 'Локації на карті',
    mapTitle: 'Об’єкти EL ORDO на карті Бішкека',
    mapDesc: 'Оберіть об’єкт або завітайте до нашого головного офісу продажів для детальної консультації.',
    purchaseBadge: 'Умови купівлі',
    purchaseTitle: 'Програми придбання нерухомості',
    p1Title: '100% ОПЛАТА ЗІ ЗНИЖКОЮ',
    p1Desc: 'Максимальна персональна знижка за квадратний метр та пріоритетний вибір кращих поверхів.',
    p1Action: 'Дізнатися розмір знижки',
    p2Title: 'РОЗСТРОЧКА 0% ДО 40 МІСЯЦІВ',
    p2Desc: 'Внутрішня безвідсоткова розстрочка від забудовника. Без довідок про доходи та банківських відсотків.',
    p2Action: 'Калькулятор розстрочки',
    p3Title: 'TRADE-IN (ОБМІН АВТО ТА ЖИТЛА)',
    p3Desc: 'Швидкий залік авто або вторинної квартири за справедливою ринковою оцінкою у перший внесок за 24 години.',
    p3Action: 'Оцінити своє майно',
    advBadge: 'Стандарти якості',
    advTitle: 'Чому обирають EL ORDO GROUP',
    adv1Title: 'Сейсмостійкість 9 балів',
    adv1Desc: 'Сувора відповідність СНіП. Армований монолітний залізобетонний каркас та екологічна обпалена цегла.',
    adv2Title: 'Юридична чистота',
    adv2Desc: 'Будівництво на власних ділянках із Червоними книгами. Оформлення ДДУ з обов’язковою реєстрацією.',
    adv3Title: 'Розвинена інфраструктура',
    adv3Desc: 'Підземні паркінги, безпечні закриті двори без машин, дитячі майданчики та дизайнерські лобі.',
    reviewsBadge: 'Репутація та довіра',
    reviewsTitle: 'Відгуки наших резидентів',
    ctaBadge: 'Персональний розрахунок',
    ctaTitle: 'Оберіть ідеальну квартиру вже сьогодні',
    ctaDesc: 'Залиште запит, і менеджер надішле вам актуальну шахматку та розрахунок розстрочки 0%.',
    ctaBtn: 'Отримати консультацію',
    waHeroMsg: 'Доброго дня! Хочу отримати консультацію та шахматку об’єктів EL ORDO GROUP.',
  },
  en: {
    heroTag: 'EL ORDO GROUP • TRUSTED DEVELOPER',
    heroTitle: 'MODERN RESIDENTIAL PROPERTIES IN BISHKEK',
    heroDesc: 'Constructing prestigious residential high-rises and boutique club residences across prime Bishkek districts. 0% interest-free developer installment plans up to 40 months and seamless Trade-in exchange.',
    heroBtnCatalog: 'Explore Projects',
    heroBtnWa: 'WhatsApp Consultation',
    statTotalLabel: 'Portfolio Projects:',
    statTotalVal: '6 Complexes',
    statPriceLabel: 'Price per Sq.m:',
    statPriceVal: 'from $950/m²',
    statInstallmentLabel: 'No-Bank Installment:',
    statInstallmentVal: 'up to 40 mo. 0%',
    statHandoverLabel: 'Reliability Track:',
    statHandoverVal: '100% On-Time',
    projectsBadge: 'Our Developments',
    projectsTitle: 'Flagship Residential Developments',
    projectsDesc: 'Innovative architecture, monolithic baked-brick engineering, and comprehensive living infrastructure.',
    viewAllBtn: 'Browse All Projects',
    detailsBtn: 'Project Details',
    fromPrice: 'from',
    sqm: '$/m²',
    statusFinished: 'Delivered',
    mapBadge: 'Interactive Map',
    mapTitle: 'EL ORDO Developments Across Bishkek',
    mapDesc: 'Select an address on the map or visit our head sales gallery for architectural model walkthroughs.',
    purchaseBadge: 'Buying Programs',
    purchaseTitle: 'Flexible Property Acquisition Options',
    p1Title: '100% PAYMENT WITH TOP DISCOUNT',
    p1Desc: 'Secure the lowest price per square meter directly from leadership with priority access to top panoramic floors.',
    p1Action: 'View Discount Terms',
    p2Title: '0% INSTALLMENT UP TO 40 MONTHS',
    p2Desc: 'Internal developer financing with zero interest. No bank approval, proof of income, or hidden fees required.',
    p2Action: 'Payment Calculator',
    p3Title: 'TRADE-IN (CAR & PROPERTY BARTER)',
    p3Desc: 'Fair market appraisal of your vehicle or secondary property within 24 hours credited toward your down payment.',
    p3Action: 'Get Asset Valuation',
    advBadge: 'Engineering Standards',
    advTitle: 'Why Discerning Buyers Choose EL ORDO',
    adv1Title: '9-Point Seismic Safety',
    adv1Desc: 'Strict compliance with state codes. Reinforced concrete structural core with solid baked brick partition walls.',
    adv2Title: 'Guaranteed Legal Title',
    adv2Desc: 'Constructed on company-owned land with official Red Book deeds. Mandatory registered contracts.',
    adv3Title: 'Holistic Infrastructure',
    adv3Desc: 'Underground parking, car-free private courtyards, landscaped greens, and designer arrival lobbies.',
    reviewsBadge: 'Reputation & Trust',
    reviewsTitle: 'Resident Testimonials',
    ctaBadge: 'Bespoke Consultation',
    ctaTitle: 'Find Your Ideal Home Today',
    ctaDesc: 'Send a request and our sales team will provide an up-to-date availability sheet with customized 0% calculation.',
    ctaBtn: 'Request Information',
    waHeroMsg: 'Hello! I would like to receive availability details and consultation on EL ORDO GROUP projects.',
  },
  zh: {
    heroTag: 'EL ORDO GROUP • 值得信赖的品牌开发商',
    heroTitle: '比什凯克现代高品质人居标杆楼盘',
    heroDesc: '深耕比什凯克核心政商及生态宜居腹地，精工筑造高端住宅区与静谧洋房。提供最长40个月开发商直营0%免息分期，尊享以旧换新置换服务。',
    heroBtnCatalog: '浏览热销楼盘',
    heroBtnWa: '在 WhatsApp 中咨询',
    statTotalLabel: '旗下开发项目：',
    statTotalVal: '6 大品质园区',
    statPriceLabel: '每平米起售价：',
    statPriceVal: '950 $/m² 起',
    statInstallmentLabel: '免息分期周期：',
    statInstallmentVal: '最长40个月 0%利息',
    statHandoverLabel: '交付履约保障：',
    statHandoverVal: '100% 官方综合验收',
    projectsBadge: '精选项目',
    projectsTitle: '代表性标杆住宅项目',
    projectsDesc: '前沿现代建筑设计美学，现浇钢筋混凝土框架搭配环保烧结砖，匠心构筑品质生活。',
    viewAllBtn: '查看全部楼盘',
    detailsBtn: '查看楼盘详情',
    fromPrice: '起',
    sqm: '$/m²',
    statusFinished: '已交付',
    mapBadge: '核心地理区位',
    mapTitle: 'EL ORDO 项目全景电子沙盘',
    mapDesc: '轻点地图查看各楼盘精准定位，或亲临集团总部营销中心鉴赏实体规划沙盘。',
    purchaseBadge: '置业尊享方案',
    purchaseTitle: '全维置业付款与置换通道',
    p1Title: '100% 一次性全款特惠',
    p1Desc: '直享高管特批底价直减，优先选定高区南北通透及开阔全景天幕房源。',
    p1Action: '查看全款优惠',
    p2Title: '0% 最长40个月免息分期',
    p2Desc: '开发商自营零利息分期方案，无需银行信贷审核与工作流水证明。',
    p2Action: '测算还款计划',
    p3Title: '以旧换新 (汽车与房产置换)',
    p3Desc: '专业评估团队24小时公允估值现有车辆或二手房产，全额冲抵新房首期房款。',
    p3Action: '申请资产估值',
    advBadge: '精工品质准则',
    advTitle: '为何选择 EL ORDO GROUP',
    adv1Title: '9度抗震结构保障',
    adv1Desc: '严格恪守国家建筑抗震设防标准，高标号钢筋混凝土现浇主体与环保实心砖砌体。',
    adv2Title: '正规产权合法合规',
    adv2Desc: '项目均坐落于拥有国家正式土地红本的自有地块，正规购房合同在国家机构备案登记。',
    adv3Title: '全龄段社区成熟配套',
    adv3Desc: '地下智能双层停车场、人车分流景观庭院、生态环保儿童乐园与轻奢艺术入户大堂。',
    reviewsBadge: '卓越声誉与信赖',
    reviewsTitle: '业主真实入住评价',
    ctaBadge: '一对一专属置业',
    ctaTitle: '立即挑选契合您的理想居所',
    ctaDesc: '随时联络我们，专属置业顾问将向您直接发送最新在售销控表及0%免息分期测算方案。',
    ctaBtn: '获取专属咨询',
    waHeroMsg: '您好！我对 EL ORDO GROUP 旗下住宅楼盘很感兴趣，想获取最新在售房源表及免息分期方案。',
  },
};

const RAW_FEATURED_PROJECTS = [
  {
    slug: 'abu-dhabi',
    name: 'ЖК Abu Dhabi',
    category: 'active' as const,
    image: '/projects/Abu-Dhabi.png',
    price: '1 650',
  },
  {
    slug: 'madina-residence',
    name: 'ЖК Madina Residence',
    category: 'active' as const,
    image: '/projects/Madina-Residense.png',
    price: '1 400',
  },
  {
    slug: 'ajkol-plus',
    name: 'ЖД Айкол +',
    category: 'active' as const,
    image: '/projects/Aikolplus.png',
    price: '1 100',
  },
  {
    slug: 'ajkol',
    name: 'ЖД Айкол',
    category: 'active' as const,
    image: '/projects/ajkol.jpg',
    price: '950',
  },
  {
    slug: 'kelechek',
    name: 'ЖК Келечек',
    category: 'finished' as const,
    image: '/projects/Kelechek.jpg',
    price: null,
  },
  {
    slug: 'ordo',
    name: 'КД Ордо',
    category: 'finished' as const,
    image: '/projects/Ordo.jpg',
    price: null,
  },
];

const ADDRESSES: Record<string, Record<Locale, string>> = {
  'abu-dhabi': {
    ru: 'ул. Сухомлинова, 29',
    kg: 'Сухомлинов көч., 29',
    kz: 'Сухомлинов к-сі, 29',
    uk: 'вул. Сухомлинова, 29',
    en: '29 Sukhomlinov Street',
    zh: '比什凯克市苏霍姆利诺夫街29号',
  },
  'madina-residence': {
    ru: 'ул. Огонбаева, 12',
    kg: 'Огонбаев көч., 12',
    kz: 'Огонбаев к-сі, 12',
    uk: 'вул. Огонбаєва, 12',
    en: '12 Ogonbaev Street',
    zh: '比什凯克市奥贡巴耶夫街12号',
  },
  'ajkol-plus': {
    ru: 'с. Кок-Жар, ул. Баялинова, 6',
    kg: 'Көк-Жар а., Баялинов көч., 6',
    kz: 'Көк-Жар а., Баялинов к-сі, 6',
    uk: 'с. Кок-Жар, вул. Баялінова, 6',
    en: '6 Bayalinov Street, Kok-Jar',
    zh: '比什凯克市Kok-Jar区巴亚利诺夫街6号',
  },
  'ajkol': {
    ru: 'ул. Арашан, 10',
    kg: 'Арашан көч., 10',
    kz: 'Арашан к-сі, 10',
    uk: 'вул. Арашан, 10',
    en: '10 Arashan Street',
    zh: '阿拉尚街10号',
  },
  'kelechek': {
    ru: 'ул. Космическая, 153',
    kg: 'Космическая көч., 153',
    kz: 'Космическая к-сі, 153',
    uk: 'вул. Космічна, 153',
    en: '153 Kosmicheskaya Street',
    zh: '比什凯克市太空街153号',
  },
  'ordo': {
    ru: 'ул. Тверская, 20',
    kg: 'Тверская көч., 20',
    kz: 'Тверская к-сі, 20',
    uk: 'вул. Тверська, 20',
    en: '20 Tverskaya Street',
    zh: '特维尔斯卡亚街20号',
  },
};

function formatPrice(price: string, lang: Locale, c: HomeContent) {
  if (lang === 'en') return `from $${price}/m²`;
  if (lang === 'zh') return `${price} $/m² 起`;
  if (lang === 'kg' || lang === 'kz') return `${price} $/м² ${c.fromPrice}`;
  return `${c.fromPrice} ${price} ${c.sqm}`;
}

export default function HomePage() {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const c = CONTENT[currentLang] || CONTENT.ru;
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;
  const reviews = t.reviewsSection?.items || COMPANY_INFO.reviews;

  const waHeroLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(c.waHeroMsg)}`;

  // Динамическая локализация карточек проектов
  const featuredProjects = useMemo(() => {
    const projPage = t.projectsPage;
    return RAW_FEATURED_PROJECTS.map((item) => {
      const address = ADDRESSES[item.slug]?.[currentLang] || ADDRESSES[item.slug]?.ru || '';
      let classType = '';
      let deadline = '';
      let floors = '';

      switch (item.slug) {
        case 'abu-dhabi':
          classType = projPage.abuDhabiClass;
          deadline = projPage.abuDhabiDeadline;
          floors = projPage.abuDhabiFloors;
          break;
        case 'madina-residence':
          classType = projPage.madinaClass;
          deadline = projPage.madinaDeadline;
          floors = projPage.madinaFloors;
          break;
        case 'ajkol-plus':
          classType = projPage.ajkolPlusClass;
          deadline = projPage.ajkolPlusDeadline;
          floors = projPage.ajkolPlusFloors;
          break;
        case 'ajkol':
          classType = projPage.ajkolClass;
          deadline = projPage.ajkolDeadline;
          floors = projPage.ajkolFloors;
          break;
        case 'kelechek':
          classType = projPage.kelechekClass;
          deadline = projPage.statusFinishedFull;
          floors = projPage.kelechekFloors;
          break;
        case 'ordo':
          classType = projPage.ordoClass;
          deadline = projPage.statusFinishedFull;
          floors = projPage.ordoFloors;
          break;
      }

      return {
        ...item,
        classType,
        address,
        deadline,
        floors,
      };
    });
  }, [currentLang, t.projectsPage]);

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] sm:min-h-[720px] flex items-center justify-center bg-[#064734] text-white py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="EL ORDO GROUP"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#064734] via-[#064734]/70 to-black/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d4b26f]/40 text-[#d4b26f] text-xs font-black uppercase tracking-widest mb-6 shadow">
            <span>{c.heroTag}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-6 drop-shadow-xl max-w-4xl">
            {c.heroTitle}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            {c.heroDesc}
          </p>

          <div className="flex flex-wrap justify-center gap-3.5 mb-12">
            <Link
              href="/projects"
              className="bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-8 py-4 rounded-2xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>{c.heroBtnCatalog}</span>
              <IconArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={waHeroLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl text-xs sm:text-sm border border-white/25 transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
            >
              <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
              <span>{c.heroBtnWa}</span>
            </a>
          </div>

          {/* Быстрые цифры */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl text-left">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">{c.statTotalLabel}</span>
              <strong className="text-base sm:text-lg font-black text-white">{c.statTotalVal}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">{c.statPriceLabel}</span>
              <strong className="text-base sm:text-lg font-black text-[#d4b26f]">{c.statPriceVal}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">{c.statInstallmentLabel}</span>
              <strong className="text-base sm:text-lg font-black text-white">{c.statInstallmentVal}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">{c.statHandoverLabel}</span>
              <strong className="text-base sm:text-lg font-black text-white">{c.statHandoverVal}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ФЛАГМАНСКИЕ ОБЪЕКТЫ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
              {c.projectsBadge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#064734] dark:text-[#d4b26f]">
              {c.projectsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-xl">
              {c.projectsDesc}
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#064734] dark:text-[#d4b26f] hover:underline shrink-0"
          >
            <span>{c.viewAllBtn}</span>
            <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProjects.map((p) => {
            const isFinished = p.category === 'finished';
            return (
              <div
                key={p.slug}
                className="bg-white dark:bg-[#0b1b15] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:border-[#d4b26f]/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-xl shadow ${
                          isFinished ? 'bg-[#2b2b2b] text-white' : 'bg-[#d4b26f] text-[#064734]'
                        }`}
                      >
                        {isFinished && <IconCheck className="w-3 h-3 text-emerald-400" />}
                        <span>{isFinished ? c.statusFinished : p.classType}</span>
                      </span>
                    </div>

                    {p.price && (
                      <div className="absolute bottom-3 right-3 bg-[#064734]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-xl border border-white/10 shadow">
                        {formatPrice(p.price, currentLang, c)}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-black text-gray-950 dark:text-white mb-3 group-hover:text-[#064734] dark:group-hover:text-[#d4b26f] transition-colors">
                      {p.name}
                    </h3>
                    <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <IconMapPin className="w-3.5 h-3.5 text-[#d4b26f] shrink-0" />
                        <span className="truncate">{p.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconCalendar className="w-3.5 h-3.5 text-[#d4b26f] shrink-0" />
                        <span>{p.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconBuilding className="w-3.5 h-3.5 text-[#d4b26f] shrink-0" />
                        <span>{p.floors}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/${p.slug}`}
                    className="w-full text-center bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] hover:text-white dark:text-[#064734] font-black py-3 rounded-xl uppercase tracking-wider text-xs transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{c.detailsBtn}</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ПРОГРАММЫ ПРИОБРЕТЕНИЯ */}
      <section className="bg-[#f0f4f2] dark:bg-[#040c09] py-20 px-4 sm:px-6 transition-colors border-y border-transparent dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
              {c.purchaseBadge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#064734] dark:text-[#d4b26f]">
              {c.purchaseTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/polniy-raschet"
              className="p-8 rounded-3xl bg-[#0b3b2c] text-white border border-white/10 hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between group shadow-xl cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-[#d4b26f]">
                  <IconDiamond className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black mb-2 group-hover:text-[#d4b26f] transition-colors">
                  {c.p1Title}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {c.p1Desc}
                </p>
              </div>
              <span className="mt-6 text-xs font-black text-[#d4b26f] uppercase tracking-wider flex items-center gap-1.5">
                <span>{c.p1Action}</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/rassrochka"
              className="p-8 rounded-3xl bg-[#0b3b2c] text-white border border-white/10 hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between group shadow-xl cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-[#d4b26f]">
                  <IconCalendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black mb-2 group-hover:text-[#d4b26f] transition-colors">
                  {c.p2Title}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {c.p2Desc}
                </p>
              </div>
              <span className="mt-6 text-xs font-black text-[#d4b26f] uppercase tracking-wider flex items-center gap-1.5">
                <span>{c.p2Action}</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/trade-in"
              className="p-8 rounded-3xl bg-[#0b3b2c] text-white border border-white/10 hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between group shadow-xl cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-[#d4b26f]">
                  <IconCar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black mb-2 group-hover:text-[#d4b26f] transition-colors">
                  {c.p3Title}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {c.p3Desc}
                </p>
              </div>
              <span className="mt-6 text-xs font-black text-[#d4b26f] uppercase tracking-wider flex items-center gap-1.5">
                <span>{c.p3Action}</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ИНТЕРАКТИВНАЯ КАРТА БИШКЕКА */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {c.mapBadge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#064734] dark:text-[#d4b26f]">
            {c.mapTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
            {c.mapDesc}
          </p>
        </div>

        <BishkekMap />
      </section>

      {/* 5. ПРЕИМУЩЕСТВА СТАНДАРТОВ СТРОИТЕЛЬСТВА */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {c.advBadge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#064734] dark:text-[#d4b26f]">
            {c.advTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white dark:bg-[#0b1b15] p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center mb-6">
              <IconBuilding className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2.5">
              {c.adv1Title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {c.adv1Desc}
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b1b15] p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center mb-6">
              <IconCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2.5">
              {c.adv2Title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {c.adv2Desc}
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b1b15] p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center mb-6">
              <IconCrane className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2.5">
              {c.adv3Title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {c.adv3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* 6. ОТЗЫВЫ РЕЗИДЕНТОВ (МУЛЬТИЯЗЫЧНЫЕ) */}
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden bg-neutral-900 text-white my-16">
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="Отзывы"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-[#032b20]/90" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
              {c.reviewsBadge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              {c.reviewsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-7 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#d4b26f] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <IconStar key={i} className="w-3.5 h-3.5 text-[#d4b26f]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed italic mb-6">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <h4 className="text-xs font-black text-[#d4b26f]">
                    {rev.author}
                  </h4>
                  {rev.role && (
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      {rev.role}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. БАННЕР КОНСУЛЬТАЦИИ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#064734] text-white rounded-3xl p-8 sm:p-12 border border-[#d4b26f]/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-wider text-[#d4b26f] block mb-2">
              {c.ctaBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">
              {c.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {c.ctaDesc}
            </p>
          </div>

          <a
            href={waHeroLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-8 py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center gap-2 cursor-pointer"
          >
            <IconWhatsApp className="w-4 h-4 text-[#064734]" />
            <span>{c.ctaBtn}</span>
          </a>
        </div>
      </section>

    </main>
  );
}