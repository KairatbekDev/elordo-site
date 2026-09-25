'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PaymentLayout from '@/components/PaymentLayout';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { exportPdfQuote } from '@/lib/exportPdfQuote';
import { trackWhatsAppClick, trackLeadSubmit } from '@/lib/analytics';
import { getStoredUtm } from '@/lib/utm';
import {
  IconCheck,
  IconDiamond,
  IconWhatsApp,
  IconArrowRight,
  IconShieldCheck,
} from '@/components/Icons';

interface DiscountCase {
  complex: string;
  classType: string;
  area: string;
  standardPrice: string;
  cashPrice: string;
  saving: string;
  savingKgs: string;
  benefit: string;
  badge: string;
  slug: string;
  waText: string;
}

interface PrivilegeItem {
  iconType: 'diamond' | 'crown' | 'flash' | 'trending';
  title: string;
  desc: string;
}

interface StepItem {
  num: string;
  title: string;
  desc: string;
}

interface FullPaymentContent {
  pageTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  noticeText: string;
  blockTitle: string;
  descriptionText: string;
  documentsText: string;
  faqList: { q: string; a: string }[];
  casesBadge: string;
  casesTitle: string;
  casesSubtitle: string;
  areaPrefix: string;
  basePriceLabel: string;
  specialPriceLabel: string;
  lockDiscountBtn: string;
  viewComplexBtn: string;
  cases: DiscountCase[];
  privilegesBadge: string;
  privilegesTitle: string;
  privileges: PrivilegeItem[];
  investBadge: string;
  investTitle: string;
  investDesc: string;
  investStat1Val: string;
  investStat1Label: string;
  investStat2Val: string;
  investStat2Label: string;
  investStat3Val: string;
  investStat3Label: string;
  stepsBadge: string;
  stepsTitle: string;
  steps: StepItem[];
  calcBadge: string;
  calcTitle: string;
  calcDesc: string;
  btnDownloadPdf: string;
  netSavingsLabel: string;
  calcRateOnline: string;
  calcMaxDiscountBadge: string;
  calcBtnCatalog: string;
  calcBtnCatalogSelected: string;
  calcBasePriceLabel: string;
  calcEditHint: string;
  calcDiscountHeading: string;
  calcDiscountStandard: string;
  calcDiscountVip: string;
  calcScaleSpecial: string;
  calcScaleSaving: string;
  calcBenefitTitle: string;
  calcBenefitDesc: string;
  calcResultTitle: string;
  calcSavingsLabel: string;
  calcBaseNote: string;
  calcDisclaimer: string;
  calcBtnFixWa: string;
  calcBtnPdf: string;
  calcBtnBookFloor: string;
  somUnit: string;
}

const CATALOG_APARTMENTS = [
  { complex: 'ЖК Abu Dhabi', title: '1-комн. Блок Б (49.48 м²)', price: 81642, slug: 'abu-dhabi' },
  { complex: 'ЖК Abu Dhabi', title: '1-комн. Блок А (50.88 м²)', price: 83952, slug: 'abu-dhabi' },
  { complex: 'ЖК Abu Dhabi', title: '2-комн. Блок Б (78.30 м²)', price: 129195, slug: 'abu-dhabi' },
  { complex: 'ЖК Abu Dhabi', title: '3-комн. Блок Б (119.32 м²)', price: 196878, slug: 'abu-dhabi' },
  { complex: 'ЖК Madina Residence', title: '1-комн. Блок А (43.59 м²)', price: 65385, slug: 'madina-residence' },
  { complex: 'ЖК Madina Residence', title: '1-комн. Блок В (49.03 м²)', price: 73545, slug: 'madina-residence' },
  { complex: 'ЖК Madina Residence', title: '2-комн. Блок А (71.00 м²)', price: 106500, slug: 'madina-residence' },
  { complex: 'ЖК Madina Residence', title: '3-комн. Блок Б (108.48 м²)', price: 162720, slug: 'madina-residence' },
  { complex: 'ЖД Айкол +', title: '1-комн. (42.00 м²)', price: 50400, slug: 'ajkol-plus' },
  { complex: 'ЖД Айкол +', title: '2-комн. (74.30 м²)', price: 89160, slug: 'ajkol-plus' },
  { complex: 'ЖД Айкол +', title: '3-комн. (88.50 м²)', price: 106200, slug: 'ajkol-plus' },
];

const CONTENT: Record<Locale, FullPaymentContent> = {
  ru: {
    pageTitle: '100% расчет',
    heroTitle: 'МАКСИМАЛЬНАЯ ВЫГОДА И СКИДКИ ПРИ 100% ОПЛАТЕ',
    heroSubtitle: 'Самый выгодный способ приобретения недвижимости от застройщика EL ORDO GROUP. Зафиксируйте минимальную цену за квадратный метр, получите приоритет в выборе лучших планировок и оформите ДДУ за 24 часа.',
    noticeText: 'При единовременной полной оплате квартиры компания EL ORDO GROUP предоставляет максимальный индивидуальный дисконт. Вы экономите существенную сумму, становитесь полноправным владельцем недвижимости без долговых обязательств и защищаете капитал от инфляции.',
    blockTitle: 'УСЛОВИЯ И ПРЕИМУЩЕСТВА ПОЛНОГО РАСЧЕТА',
    descriptionText: 'Единоразовый расчет всей стоимости квартиры сразу после подписания Договора долевого участия (ДДУ). Оплата возможна в наличной форме через официальную кассу компании с выдачей всех кассовых ордеров, либо безналичным банковским переводом. Покупателю открывается приоритетное бронирование видовых этажей и гарантируется фиксированная стоимость метра без последующих перерасчетов.',
    documentsText: 'Паспорт гражданина Кыргызской Республики (ID-карта или загранпаспорт). Для иностранных граждан — паспорт с нотариально заверенным переводом на русский язык. Справки о доходах не требуются.',
    faqList: [
      {
        q: 'Какой размер скидки можно получить при 100% оплате?',
        a: 'Размер индивидуального дисконта зависит от выбранного жилого комплекса, площади квартиры и текущей стадии строительства. В среднем экономия составляет от $2 500 до $10 000+ по сравнению с базовой стоимостью.',
      },
      {
        q: 'В какой валюте производятся взаиморасчеты?',
        a: 'В соответствии с законодательством Кыргызской Республики все официальные расчеты осуществляются в национальной валюте (сом) по согласованному курсу, зафиксированному в договоре, либо через банковский перевод.',
      },
      {
        q: 'Как могут оплатить соотечественники, находящиеся за границей?',
        a: 'Мы предоставляем официальные банковские реквизиты для прямого SWIFT-перевода со счетов в зарубежных банках, либо сделку может провести доверенное лицо по нотариальной доверенности в Бишкеке.',
      },
      {
        q: 'Выдаются ли официальные финансовые документы об оплате?',
        a: 'Обязательно. При безналичной оплате у вас остается банковское платежное поручение, при оплате через кассу компании выдается приходный кассовый ордер и официальная справка о 100% закрытии финансовых обязательств.',
      },
      {
        q: 'Можно ли перепродать квартиру до сдачи дома (по переуступке)?',
        a: 'Да. Полностью оплаченная квартира обладает максимальной юридической ликвидностью. Вы можете выгодно перепродать ее на этапе высокой готовности по договору переуступки прав требования (цессии) через отдел продаж компании.',
      },
      {
        q: 'Фиксируется ли окончательная цена в договоре?',
        a: 'Да. Цена фиксируется окончательно и бесповоротно в момент подписания ДДУ. Никакие последующие удорожания стройматериалов или инфляционные риски не влияют на стоимость вашей квартиры.',
      },
    ],
    casesBadge: 'Прямая выгода покупателя',
    casesTitle: 'Реальная экономия при 100% оплате',
    casesSubtitle: 'Примеры специальной цены на 1-комнатные квартиры при единовременном расчете',
    areaPrefix: 'Площадь квартиры:',
    basePriceLabel: 'Базовая стоимость:',
    specialPriceLabel: 'Спеццена при 100% расчете:',
    lockDiscountBtn: 'Зафиксировать скидку',
    viewComplexBtn: 'Смотреть комплекс',
    cases: [
      {
        complex: 'ЖК Abu Dhabi',
        classType: 'Премиум-класс',
        area: '49.48 м²',
        standardPrice: '$81 642',
        cashPrice: 'от $76 690',
        saving: 'Экономия до $4 950',
        savingKgs: '≈ 433 000 сом выгоды',
        benefit: 'Хватит на премиальную сантехнику и технику',
        badge: 'Флагман столицы',
        slug: 'abu-dhabi',
        waText: 'Здравствуйте! Интересует размер персональной скидки при 100% оплате 1-комнатной квартиры в ЖК Abu Dhabi. Какие видовые этажи свободны?',
      },
      {
        complex: 'ЖК Madina Residence',
        classType: 'Бизнес-класс',
        area: '43.59 м²',
        standardPrice: '$65 385',
        cashPrice: 'от $61 500',
        saving: 'Экономия до $3 885',
        savingKgs: '≈ 340 000 сом выгоды',
        benefit: 'Покрывает стоимость полного дизайн-проекта',
        badge: 'Центр Бишкека',
        slug: 'madina-residence',
        waText: 'Здравствуйте! Хочу узнать размер скидки при единовременной 100% оплате в ЖК Madina Residence. Отправьте планировки.',
      },
      {
        complex: 'ЖД Айкол +',
        classType: 'Комфорт+ (Кок-Жар)',
        area: '42.00 м²',
        standardPrice: '$50 400',
        cashPrice: 'от $47 000',
        saving: 'Экономия до $3 400',
        savingKgs: '≈ 297 000 сом выгоды',
        benefit: 'Чистая экономия бюджета молодой семьи',
        badge: 'Эко-предгорье',
        slug: 'ajkol-plus',
        waText: 'Здравствуйте! Интересует спеццена при 100% расчете в ЖД Айкол+ (Кок-Жар). Подскажите свободные квартиры.',
      },
    ],
    privilegesBadge: 'Премиальный сервис',
    privilegesTitle: 'Привилегии покупателей при 100% оплате',
    privileges: [
      {
        iconType: 'diamond',
        title: 'Максимальный дисконт от руководства',
        desc: 'Вы получаете минимально возможную цену за квадратный метр. Сэкономленные средства можно направить на дизайнерский ремонт или меблировку.',
      },
      {
        iconType: 'crown',
        title: 'Приоритетный выбор видовых этажей',
        desc: 'Покупателям со 100% оплатой открывается ранний доступ к лучшим планировкам, верхним этажам и панорамным видам на горный хребет Ала-Тоо.',
      },
      {
        iconType: 'flash',
        title: 'Моментальная регистрация ДДУ за 24 часа',
        desc: 'Полное юридическое сопровождение сделки штатными юристами застройщика. Быстрая регистрация в госорганах без очередей.',
      },
      {
        iconType: 'trending',
        title: 'Высокая инвестиционная доходность (ROI)',
        desc: 'Покупка на стадии строительства за полную стоимость обеспечивает прирост капитала до 25–35% к моменту ввода дома в эксплуатацию.',
      },
    ],
    investBadge: 'Инвестиции в недвижимость Бишкека',
    investTitle: 'Прирост капитала от 25% до 35% к моменту сдачи объекта',
    investDesc: 'Покупка квартиры на начальных стадиях строительства за 100% оплату — самый высокодоходный и безопасный инвестиционный инструмент в Кыргызстане. Рост стоимости квадратного метра гарантирован этапами строительной готовности монолита.',
    investStat1Val: '+25–35%',
    investStat1Label: 'Капитализация за период стройки',
    investStat2Val: '8–11%',
    investStat2Label: 'Годовая доходность при аренде',
    investStat3Val: 'Цессия',
    investStat3Label: 'Легкая перепродажа до сдачи дома',
    stepsBadge: 'Быстро и юридически чисто',
    stepsTitle: '4 шага к получению квартиры',
    steps: [
      {
        num: '01',
        title: 'Выбор видовой квартиры',
        desc: 'Изучаете планировки на сайте или приезжаете в офис продаж для выбора этажа на 3D-макете.',
      },
      {
        num: '02',
        title: 'Фиксация спеццены',
        desc: 'Согласовываем индивидуальный размер скидки с руководством компании и бронируем выбранную квартиру.',
      },
      {
        num: '03',
        title: 'Подписание ДДУ',
        desc: 'Заключаем официальный Договор долевого участия за 30 минут с полным юридическим разъяснением всех пунктов.',
      },
      {
        num: '04',
        title: 'Оплата и полный пакет документов',
        desc: 'Вносите оплату через кассу компании или безналичным банковским переводом с выдачей всех финансовых чеков.',
      },
    ],
    calcBadge: 'ФИНАНСОВЫЙ КАЛЬКУЛЯТОР 100% ОПЛАТЫ',
    calcTitle: 'РАСЧЕТ ВЫГОДЫ ПРИ 100% ОПЛАТЕ',
    calcDesc: 'Выберите планировку или настройте стоимость ползунком для моментального расчета персональной скидки.',
    btnDownloadPdf: 'Скачать расчет в PDF',
    netSavingsLabel: 'Ваша чистая экономия:',
    calcRateOnline: 'Курс НБКР онлайн',
    calcMaxDiscountBadge: 'Максимальный дисконт от руководства',
    calcBtnCatalog: 'ВЫБРАТЬ ПЛАНИРОВКУ ИЗ КАТАЛОГА (11 ВАРИАНТОВ)',
    calcBtnCatalogSelected: 'ВЫБРАНО:',
    calcBasePriceLabel: 'БАЗОВАЯ СТОИМОСТЬ КВАРТИРЫ:',
    calcEditHint: 'нажмите, чтобы изменить вручную',
    calcDiscountHeading: 'РАЗМЕР ДИСКОНТА ОТ ДЕВЕЛОПЕРА:',
    calcDiscountStandard: '(стандарт)',
    calcDiscountVip: '(VIP)',
    calcScaleSpecial: 'Спеццена:',
    calcScaleSaving: 'Ваша экономия:',
    calcBenefitTitle: 'ЧИСТАЯ ВЫГОДА:',
    calcBenefitDesc: 'Сэкономленные средства полностью покроют стоимость дизайн-проекта, чистового ремонта или машиноместа.',
    calcResultTitle: 'ИТОГОВАЯ СПЕЦЦЕНА ПРИ 100% ОПЛАТЕ:',
    calcSavingsLabel: 'Ваша экономия:',
    calcBaseNote: 'Базовая цена:',
    calcDisclaimer: '* Оплата производится в национальном соме по официальному учетному курсу НБКР на день фактической оплаты. Цена квадратного метра фиксируется в официальном ДДУ без права пересмотра.',
    calcBtnFixWa: 'ЗАФИКСИРОВАТЬ СКИДКУ В WHATSAPP',
    calcBtnPdf: 'СКАЧАТЬ РАСЧЕТ В PDF',
    calcBtnBookFloor: 'Забронировать видовой этаж',
    somUnit: 'сом',
  },
  kg: {
    pageTitle: '100% төлөм',
    heroTitle: '100% ТӨЛӨМДӨ МАКСИМАЛДУУ ПАЙДА ЖАНА АРЗАНДАТУУЛАР',
    heroSubtitle: 'EL ORDO GROUP куруучусунан кыймылсыз мүлк сатып алуунун эң пайдалуу жолу. Чарчы метрдин минималдуу баасын бекитиңиз, мыкты пландарды биринчилерден болуп тандаңыз жана 24 саатта ДДУ тариздеңиз.',
    noticeText: 'Батирдин баасын толук бир жолу төлөгөндө EL ORDO GROUP компаниясы максималдуу жеке арзандатууну сунуштайт. Сиз олуттуу сумманы үнөмдөп, карыздык милдеттенмелерсиз мүлктүн толук ээси болосуз жана каражатыңызды инфляциядан коргойсуз.',
    blockTitle: 'ТОЛУК ЭСЕПТЕШҮҮНҮН ШАРТТАРЫ ЖАНА АРТЫКЧЫЛЫКТАРЫ',
    descriptionText: 'Үлүштүк катышуу келишимине (ДДУ) кол койгондон кийин батирдин наркын бир жолку толук төлөө. Төлөмдү компаниянын расмий кассасы аркылуу накталай же банктык эсепке которуу менен жүргүзүүгө болот. Сатып алуучуга панорамалык кабаттарды артыкчылыктуу брондоо мүмкүнчүлүгү берилет жана кийинки кайра эсептөөлөрсүз баа кепилденет.',
    documentsText: 'Кыргыз Республикасынын жаранынын паспорты (ID-карта же жалпы жарандык паспорт). Чет элдик жарандар үчүн — нотариалдык жактан күбөлөндүрүлгөн котормосу бар паспорт. Киреше маалымкаты талап кылынбайт.',
    faqList: [
      {
        q: '100% төлөмдө кандай өлчөмдө арзандатуу алууга болот?',
        a: 'Жеке дисконттун өлчөмү тандалган комплекске, батирдин аянтына жана курулуш этабына жараша болот. Орточо үнөмдөө базалык наркка салыштырмалуу $2 500дөн $10 000+ чейин жетет.',
      },
      {
        q: 'Эсептешүүлөр кайсы валютада жүргүзүлөт?',
        a: 'Кыргыз Республикасынын мыйзамдарына ылайык бардык расмий эсептешүүлөр улуттук валютада (сом) келишимде бекитилген курс боюнча же банк аркылуу жүргүзүлөт.',
      },
      {
        q: 'Чет өлкөдө жүргөн мекендештер кантип төлөй алышат?',
        a: 'Биз чет элдик банктардан түз SWIFT-которуу үчүн расмий реквизиттерди беребиз, же бүтүмдү Бишкектеги ишенимдүү өкүл нотариалдык ишеним кат аркылуу жүргүзө алат.',
      },
      {
        q: 'Төлөм жөнүндө расмий каржылык документтер берилеби?',
        a: 'Сөзсүз. Накталай эмес төлөмдө банктык төлөм тапшырмасы, ал эми касса аркылуу төлөгөндө кириш кассалык ордери жана каржылык милдеттенмелердин 100% жабылгандыгы тууралуу расмий маалымкат берилет.',
      },
      {
        q: 'Үй тапшырылганга чейин батирди кайра сатууга (цессия) болобу?',
        a: 'Ооба. Толук төлөнгөн батир максималдуу өтүмдүүлүккө ээ. Сиз аны компаниянын сатуу бөлүмү аркылуу талап кылуу укугун өткөрүп берүү келишими (цессия) боюнча жогорку даярдык стадиясында пайдалуу кайра сата аласыз.',
      },
      {
        q: 'Акыркы баа келишимде бекитилеби?',
        a: 'Ооба. Баа ДДУга кол коюлган учурда биротоло бекитилет. Курулуш материалдарынын кымбатташы же инфляция батирдин наркына таасир этпейт.',
      },
    ],
    casesBadge: 'Сатып алуучунун пайдасы',
    casesTitle: '100% төлөмдөгү чыныгы үнөмдөө',
    casesSubtitle: 'Бир жолку эсептешүүдө 1 бөлмөлүү батирлерге атайын баалардын мисалдары',
    areaPrefix: 'Батирдин аянты:',
    basePriceLabel: 'Базалык наркы:',
    specialPriceLabel: '100% төлөмдөгү атайын баа:',
    lockDiscountBtn: 'Арзандатууну бекитүү',
    viewComplexBtn: 'Комплексти көрүү',
    cases: [
      {
        complex: 'ЖК Abu Dhabi',
        classType: 'Премиум-класс',
        area: '49.48 м²',
        standardPrice: '$81 642',
        cashPrice: 'от $76 690',
        saving: '$4 950 чейин үнөмдөө',
        savingKgs: '≈ 433 000 сом пайда',
        benefit: 'Премиум сантехникага жана техникага жетет',
        badge: 'Борбордун флагманы',
        slug: 'abu-dhabi',
        waText: 'Саламатсызбы! ЖК Abu Dhabi комплексинде 100% төлөм жүргүзгөндөгү жеке арзандатуу өлчөмүн билгим келет. Кайсы кабаттар бош?',
      },
      {
        complex: 'ЖК Madina Residence',
        classType: 'Бизнес-класс',
        area: '43.59 м²',
        standardPrice: '$65 385',
        cashPrice: 'от $61 500',
        saving: '$3 885 чейин үнөмдөө',
        savingKgs: '≈ 340 000 сом пайда',
        benefit: 'Толук дизайн-долбоордун наркын жабат',
        badge: 'Бишкектин борбору',
        slug: 'madina-residence',
        waText: 'Саламатсызбы! ЖК Madina Residence комплексинен 100% төлөмдөгү арзандатуу өлчөмүн билгим келет. Пландарын жөнөтөсүзбү?',
      },
      {
        complex: 'ЖД Айкол +',
        classType: 'Комфорт+ (Көк-Жар)',
        area: '42.00 м²',
        standardPrice: '$50 400',
        cashPrice: 'от $47 000',
        saving: '$3 400 чейин үнөмдөө',
        savingKgs: '≈ 297 000 сом пайда',
        benefit: 'Жаш үй-бүлөнүн бюджетин таза үнөмдөө',
        badge: 'Эко-тоо этеги',
        slug: 'ajkol-plus',
        waText: 'Саламатсызбы! ЖД Айкол+ комплексинен 100% эсептешүүдөгү атайын бааны билгим келет. Бош батирлер барбы?',
      },
    ],
    privilegesBadge: 'Премиалдык кызмат',
    privilegesTitle: '100% төлөм жүргүзгөн кардарлардын артыкчылыктары',
    privileges: [
      {
        iconType: 'diamond',
        title: 'Жетекчиликтен максималдуу дисконт',
        desc: 'Чарчы метр үчүн эң төмөнкү бааны аласыз. Үнөмдөлгөн каражатты оңдоп-түзөөгө же эмерекке жумшаса болот.',
      },
      {
        iconType: 'crown',
        title: 'Панорамалык кабаттарды алгачкы тандоо',
        desc: 'Мыкты пландарга, жогорку кабаттарга жана Ала-Тоо тоолоруна караган панорамалык көрүнүшкө эрте жеткилик ачылат.',
      },
      {
        iconType: 'flash',
        title: '24 саатта ДДУну ыкчам каттоо',
        desc: 'Компаниянын юристтери тарабынан толук укуктук коштоо. Мамлекеттик органдарда кезексиз тез каттоо.',
      },
      {
        iconType: 'trending',
        title: 'Жогорку инвестициялык кирешелүүлүк (ROI)',
        desc: 'Курулуш этабында толук баасына сатып алуу үй пайдаланууга берилгенге чейин 25–35%га чейин капиталдын өсүшүн камсыздайт.',
      },
    ],
    investBadge: 'Бишкектин кыймылсыз мүлкүнө инвестиция',
    investTitle: 'Объект тапшырылганга чейин капиталдын 25%дан 35%га чейин өсүшү',
    investDesc: 'Курулуштун баштапкы баскычтарында батирди 100% төлөм менен сатып алуу — Кыргызстандагы эң кирешелүү жана коопсуз инвестициялык курал. Чарчы метрдин наркынын өсүшү монолиттин даярдыгы менен кепилденет.',
    investStat1Val: '+25–35%',
    investStat1Label: 'Курулуш мезгилиндеги капиталдаштыруу',
    investStat2Val: '8–11%',
    investStat2Label: 'Ижарага берүүдөгү жылдык киреше',
    investStat3Val: 'Цессия',
    investStat3Label: 'Үй тапшырылганга чейин оңой кайра сатуу',
    stepsBadge: 'Тез жана юридикалык жактан таза',
    stepsTitle: 'Батирге ээ болуунун 4 кадамы',
    steps: [
      {
        num: '01',
        title: 'Панорамалуу батирди тандоо',
        desc: 'Сайттан пландарды көрөсүз же сатуу кеңсесине келип 3D-макеттен кабатты тандайсыз.',
      },
      {
        num: '02',
        title: 'Атайын бааны бекитүү',
        desc: 'Компаниянын жетекчилиги менен арзандатууну макулдашып, тандалган батирди брондойбуз.',
      },
      {
        num: '03',
        title: 'ДДУга кол коюу',
        desc: 'Бардык пункттарды юридикалык түшүндүрүү менен 30 мүнөттө расмий ДДУ түзөбүз.',
      },
      {
        num: '04',
        title: 'Төлөм жана документтерди алуу',
        desc: 'Касса аркылуу же банктык которуу менен төлөп, бардык каржылык чектерди аласыз.',
      },
    ],
    calcBadge: '100% ТӨЛӨМДҮН ФИНАНСЫЛЫК КАЛЬКУЛЯТОРУ',
    calcTitle: '100% ТӨЛӨМДӨГҮ ПАЙДАНЫ ЭСЕПТӨӨ',
    calcDesc: 'Планировканы тандаңыз же жеке арзандатууну дароо эсептөө үчүн сумманы жылдырыңыз.',
    btnDownloadPdf: 'PDF эсебин көчүрүп алуу',
    netSavingsLabel: 'Сиздин таза үнөмдөөңүз:',
    calcRateOnline: 'УБ онлайн курсу',
    calcMaxDiscountBadge: 'Жетекчиликтен максималдуу дисконт',
    calcBtnCatalog: 'КАТАЛОГДОН ПЛАНИРОВКАНЫ ТАНДОО (11 ВАРИАНТ)',
    calcBtnCatalogSelected: 'ТАНДАЛДЫ:',
    calcBasePriceLabel: 'БАТИРДИН БАЗАЛЫК БААСЫ:',
    calcEditHint: 'кол менен өзгөртүү үчүн басыңыз',
    calcDiscountHeading: 'КУРУУЧУДАН АРЗАНДАТУУ ӨЛЧӨМҮ:',
    calcDiscountStandard: '(стандарт)',
    calcDiscountVip: '(VIP)',
    calcScaleSpecial: 'Атайын баа:',
    calcScaleSaving: 'Сиздин үнөмдөөңүз:',
    calcBenefitTitle: 'ТАЗА ПАЙДА:',
    calcBenefitDesc: 'Үнөмдөлгөн каражат дизайн-долбоорду, оңдоп-түзөөнү же паркингди толук жабат.',
    calcResultTitle: '100% ТӨЛӨМДӨГҮ АКЫРКЫ БАА:',
    calcSavingsLabel: 'Сиздин үнөмдөөңүз:',
    calcBaseNote: 'Базалык баасы:',
    calcDisclaimer: '* Төлөмдөр накталай күндөгү КР Улуттук банкынын расмий курсу боюнча улуттук сомдо жүргүзүлөт. Чарчы метрдин баасы келишимде бекитилет.',
    calcBtnFixWa: 'АРЗАНДАТУУНУ WHATSAPP АРКЫЛУУ БЕКИТҮҮ',
    calcBtnPdf: 'PDF ЭСЕБИН КӨЧҮРҮП АЛУУ',
    calcBtnBookFloor: 'Панорамалык кабатты брондоо',
    somUnit: 'сом',
  },
  kz: {
    pageTitle: '100% төлем',
    heroTitle: '100% ТӨЛЕМ КЕЗІНДЕГІ МАКСИМАЛДЫ ПАЙДА МЕН ЖЕҢІЛДІКТЕР',
    heroSubtitle: 'EL ORDO GROUP құрылыс салушысынан жылжымайтын мүлікті сатып алудың ең тиімді тәсілі. Шаршы метрдің ең төмен бағасын бекітіңіз, үздік жоспарларды таңдап, 24 сағатта ДДУ рәсімдеңіз.',
    noticeText: 'Пәтердің толық құнын бірден төлеген кезде EL ORDO GROUP максималды жеке жеңілдік ұсынады. Сіз қомақты қаражатты үнемдеп, қарызсыз баспана иесі боласыз және инфляциядан қорғанасыз.',
    blockTitle: 'ТОЛЫҚ ЕСЕП АЙЫРЫСУДЫҢ ШАРТТАРЫ МЕН АРТЫҚШЫЛЫКТАРЫ',
    descriptionText: 'Үлестік қатысу шартына (ДДУ) қол қойылғаннан кейін пәтердің толық құнын біржолғы төлеу. Төлемді компанияның ресми кассасы арқылы қолма-қол немесе банктік аударыммен жүргізуге болады. Сатып алушыға видовой қабаттарды басымдықпен брондоо мүмкіндігі беріледі.',
    documentsText: 'Қырғыз Республикасы азаматының төлқұжаты (ID-карта или загранпаспорт). Шетелдіктер үшін — нотариалды куәландырылған аудармасы бар төлқұжат. Кіріс туралы анықтама қажет емес.',
    faqList: [
      {
        q: '100% төлемде қандай мөлшерде жеңілдік алуға болады?',
        a: 'Жеке дисконт көлемі таңдалған кешенге, пәтер көлеміне және құрылыс кезеңіне байланысты. Орташа үнемдеу $2 500-ден $10 000+ дейін жетеді.',
      },
      {
        q: 'Есеп айырысу қай валютада жүргізіледі?',
        a: 'ҚР заңнамасына сәйкес барлық есеп айырысулар ұлттық валютада (сом) шартта бекітілген бағам бойынша жүзеге асырылады.',
      },
      {
        q: 'Шетелдегі азаматтар қалай төлей алады?',
        a: 'Шетелдік банктерден тікелей SWIFT-аударым реквизиттерін ұсынамыз немесе Бішкектегі сенімді өкіл арқылы рәсімдеуге болады.',
      },
      {
        q: 'Төлем туралы ресми құжаттар беріле ме?',
        a: 'Міндетті түрде. Банктік төлем тапсырмасы немесе кассалық ордер және 100% жабылғаны туралы анықтама беріледі.',
      },
      {
        q: 'Үй тапсырылғанға дейін пәтерді қайта сатуға (цессия) бола ма?',
        a: 'Иә. Толық төленген пәтер жоғары өтімділікке ие. Оны сату бөлімі арқылы цессия шартымен тиімді сатуға болады.',
      },
      {
        q: 'Соңғы баға шартта бекітіле ме?',
        a: 'Иә. Баға ДДУ жасалған кезде түпкілікті бекітіледі және құрылыс барысында өзгермейді.',
      },
    ],
    casesBadge: 'Сатып алушының пайдасы',
    casesTitle: '100% төлемдегі нақты үнемдеу',
    casesSubtitle: 'Біржолғы есеп айырысу кезіндегі 1 бөлмелі пәтерлердің арнайы бағаларының мысалдары',
    areaPrefix: 'Пәтер ауданы:',
    basePriceLabel: 'Базалық құны:',
    specialPriceLabel: '100% төлемдегі арнайы баға:',
    lockDiscountBtn: 'Жеңілдікті бекіту',
    viewComplexBtn: 'Кешенді қарау',
    cases: [
      {
        complex: 'ЖК Abu Dhabi',
        classType: 'Премиум-класс',
        area: '49.48 м²',
        standardPrice: '$81 642',
        cashPrice: 'от $76 690',
        saving: '$4 950 дейін үнемдеу',
        savingKgs: '≈ 433 000 сом пайда',
        benefit: 'Премиум сантехника мен техникаға жетеді',
        badge: 'Елорда флагманы',
        slug: 'abu-dhabi',
        waText: 'Сәлеметсіз бе! ЖК Abu Dhabi кешенінде 100% төлем кезіндегі жеңілдік мөлшерін білгім келеді. Қай қабаттар бос?',
      },
      {
        complex: 'ЖК Madina Residence',
        classType: 'Бизнес-класс',
        area: '43.59 м²',
        standardPrice: '$65 385',
        cashPrice: 'от $61 500',
        saving: '$3 885 дейін үнемдеу',
        savingKgs: '≈ 340 000 сом пайда',
        benefit: 'Толық дизайн-жобаның құнын жабады',
        badge: 'Бішкек орталығы',
        slug: 'madina-residence',
        waText: 'Сәлеметсіз бе! ЖК Madina Residence кешеніндегі 100% төлем жеңілдігі туралы ақпарат жібересіз бе?',
      },
      {
        complex: 'ЖД Айкол +',
        classType: 'Комфорт+ (Көк-Жар)',
        area: '42.00 м²',
        standardPrice: '$50 400',
        cashPrice: 'от $47 000',
        saving: '$3 400 дейін үнемдеу',
        savingKgs: '≈ 297 000 сом пайда',
        benefit: 'Жас отбасы бюджетін нақты үнемдеу',
        badge: 'Эко-бөктер',
        slug: 'ajkol-plus',
        waText: 'Сәлеметсіз бе! ЖД Айкол+ кешенінде 100% есеп айырысудағы арнайы баға бойынша бос пәтерлер бар ма?',
      },
    ],
    privilegesBadge: 'Премиум қызмет',
    privilegesTitle: '100% төлем жасаған сатып алушылардың артықшылықтары',
    privileges: [
      {
        iconType: 'diamond',
        title: 'Басшылықтан максималды дисконт',
        desc: 'Шаршы метрге ең төменгі бағаны аласыз. Үнөмделген қаржыны жөндеуге немесе жиһазға жұмсауға болады.',
      },
      {
        iconType: 'crown',
        title: 'Панорамалық қабаттарды алгачкы тандоо',
        desc: 'Мыкты пландарга, жогорку кабаттарга жана Ала-Тоо тоолоруна караган панорамалык көрүнүшкө эрте жеткилик ачылат.',
      },
      {
        iconType: 'flash',
        title: '24 саатта ДДУну ыкчам каттоо',
        desc: 'Компаниянын юристтери тарабынан толук укуктук коштоо. Мамлекеттік органдарда кезексиз тез каттоо.',
      },
      {
        iconType: 'trending',
        title: 'Жоғары инвестициялық кирешелүүлүк (ROI)',
        desc: 'Курулуш этабында толук баасына сатып алуу үй пайдаланууга берилгенге чейин 25–35%га чейин капиталдын өсүшүн камсыздайт.',
      },
    ],
    investBadge: 'Бішкектің жылжымайтын мүлкіне инвестиция',
    investTitle: 'Объект тапшырылганга чейин капиталдын 25%дан 35%га чейин өсүшү',
    investDesc: 'Курулуштун баштапкы баскычтарында батирди 100% төлөм менен сатып алуу — Кыргызстандагы эң кирешелүү жана коопсуз инвестициялык курал. Чарчы метрдин наркынын өсүшү монолиттин даярдыгы менен кепилденет.',
    investStat1Val: '+25–35%',
    investStat1Label: 'Курулуш мезгилиндеги капиталдаштыруу',
    investStat2Val: '8–11%',
    investStat2Label: 'Ижарага берүүдөгү жылдык киреше',
    investStat3Val: 'Цессия',
    investStat3Label: 'Үй тапшырылганга чейин оңой кайра сатуу',
    stepsBadge: 'Тез және заңды түрде таза',
    stepsTitle: 'Баспана алудың 4 қадамы',
    steps: [
      {
        num: '01',
        title: 'Пәтерді таңдау',
        desc: 'Жоспарларды сайттан немесе кеңседен көресіз.',
      },
      {
        num: '02',
        title: 'Бағаны бекіту',
        desc: 'Басшылықпен жеңілдікті келісеміз.',
      },
      {
        num: '03',
        title: 'ДДУ-ға қол қою',
        desc: '30 минутта ресми шарт жасаймыз.',
      },
      {
        num: '04',
        title: 'Төлем және құжаттарды алу',
        desc: 'Төлем жасап, құжаттарды аласыз.',
      },
    ],
    calcBadge: '100% ТӨЛЕМ ҚАРЖЫЛЫҚ КАЛЬКУЛЯТОРЫ',
    calcTitle: '100% ТӨЛЕМДЕГІ ПАЙДАНЫ ЕСЕПТЕУ',
    calcDesc: 'Жоспарды таңдаңыз немесе жеке жеңілдікті есептеу үшін соманы реттеңіз.',
    btnDownloadPdf: 'PDF есебін жүктеп алу',
    netSavingsLabel: 'Сіздің таза үнемдеуіңіз:',
    calcRateOnline: 'ҰБ онлайн бағамы',
    calcMaxDiscountBadge: 'Басшылықтан максималды дисконт',
    calcBtnCatalog: 'КАТАЛОГТАН ЖОСПАРДЫ ТАҢДАУ (11 НҰСҚА)',
    calcBtnCatalogSelected: 'ТАҢДАЛДЫ:',
    calcBasePriceLabel: 'ПӘТЕРДІҢ БАЗАЛЫҚ БАҒАСЫ:',
    calcEditHint: 'қолмен өзгерту үшін басыңыз',
    calcDiscountHeading: 'ҚҰРЫЛЫС САЛУШЫДАН ЖЕҢІЛДІК МӨЛШЕРІ:',
    calcDiscountStandard: '(стандарт)',
    calcDiscountVip: '(VIP)',
    calcScaleSpecial: 'Арнайы баға:',
    calcScaleSaving: 'Сіздің үнемдеуіңіз:',
    calcBenefitTitle: 'ТАЗА ПАЙДА:',
    calcBenefitDesc: 'Үнемделген қаражат толық дизайн-жобаны немесе автотұрақты жабады.',
    calcResultTitle: '100% ТӨЛЕМДЕГІ ТҮПКІЛІКТІ БАҒА:',
    calcSavingsLabel: 'Сіздің үнемдеуіңіз:',
    calcBaseNote: 'Базалық бағасы:',
    calcDisclaimer: '* Төлем ҚР Ұлттық Банкінің нақты күнгі ресми бағамы бойынша ұлттық сомда жүргізіледі. Баға ДДУ шартында бекітіледі.',
    calcBtnFixWa: 'ЖЕҢІЛДІКТІ WHATSAPP АРҚЫЛЫ БЕКІТУ',
    calcBtnPdf: 'PDF ЕСЕБІН ЖҮКТЕП АЛУ',
    calcBtnBookFloor: 'Видовой қабатты брондау',
    somUnit: 'сом',
  },
  uk: {
    pageTitle: '100% розрахунок',
    heroTitle: 'МАКСИМАЛЬНА ВИГОДА ТА ЗНИЖКИ ПРИ 100% ОПЛАТІ',
    heroSubtitle: 'Найвигідніший спосіб придбання нерухомості від забудовника EL ORDO GROUP. Зафіксуйте мінімальну ціну за квадратний метр, отримайте пріоритет у виборі планувань та оформіть ДДУ за 24 години.',
    noticeText: 'При одноразовій повній оплаті квартири компанія EL ORDO GROUP надає максимальний індивідуальний дисконт. Ви заощаджуєте значну суму, стаєте повноправним власником без боргових зобов\'язань та захищаєте капітал від інфляції.',
    blockTitle: 'УМОВИ ТА ПЕРЕВАГИ ПОВНОГО РОЗРАХУНКУ',
    descriptionText: 'Одноразовий розрахунок вартості квартири одразу після підписання Договору пайової участі (ДДУ). Оплата готівкою через касу компанії або безготівковим банківським переказом. Пріоритетне бронювання видових поверхів та фіксована ціна метра без подальших перерахунків.',
    documentsText: 'Паспорт громадянина Киргизької Республіки (ID-карта або закордонний паспорт). Для іноземців — паспорт із нотаріальним перекладом. Довідки про доходи не потрібні.',
    faqList: [
      {
        q: 'Який розмір знижки можна отримати при 100% оплаті?',
        a: 'Розмір індивідуального дисконту залежить від обраного ЖК, площі та стадії будівництва. Економія становить від $2 500 до $10 000+ порівняно з базовою вартістю.',
      },
      {
        q: 'В якій валюті здійснюються розрахунки?',
        a: 'Відповідно до законодавства КР усі офіційні розрахунки здійснюються в національній валюті (сом) за узгодженим курсом у договорі або через банк.',
      },
      {
        q: 'Як можуть оплатити співвітчизники за кордоном?',
        a: 'Надаємо банківські реквізити для SWIFT-переказу, або угоду може провести довірена особа за довіреністю в Бішкеку.',
      },
      {
        q: 'Чи видаються офіційні фінансові документи?',
        a: 'Обов\'язково. При безготівковій оплаті залишається банківське платіжне доручення, через касу — прибутковий касовий ордер та довідка.',
      },
      {
        q: 'Чи можна перепродати квартиру до здачі будинку?',
        a: 'Так. Повністю оплачена квартира має максимальну ліквідність для перепродажу за договором цесії.',
      },
      {
        q: 'Чи фіксується остаточна ціна в договорі?',
        a: 'Так. Ціна фіксується в момент підписання ДДУ та залишається незмінною.',
      },
    ],
    casesBadge: 'Пряма вигода покупця',
    casesTitle: 'Реальна економія при 100% оплаті',
    casesSubtitle: 'Приклади спеціальної ціни на 1-кімнатні квартири при одноразовому розрахунку',
    areaPrefix: 'Площа квартири:',
    basePriceLabel: 'Базова вартість:',
    specialPriceLabel: 'Спецціна при 100% розрахунку:',
    lockDiscountBtn: 'Зафіксувати знижку',
    viewComplexBtn: 'Дивитися комплекс',
    cases: [
      {
        complex: 'ЖК Abu Dhabi',
        classType: 'Преміум-клас',
        area: '49.48 м²',
        standardPrice: '$81 642',
        cashPrice: 'от $76 690',
        saving: 'Економія до $4 950',
        savingKgs: '≈ 433 000 сом вигоди',
        benefit: 'Вистачить на преміальну сантехніку та техніку',
        badge: 'Флагман столиці',
        slug: 'abu-dhabi',
        waText: 'Доброго дня! Цікавить розмір персональної знижки при 100% оплаті 1-кімнатної квартири в ЖК Abu Dhabi.',
      },
      {
        complex: 'ЖК Madina Residence',
        classType: 'Бізнес-клас',
        area: '43.59 м²',
        standardPrice: '$65 385',
        cashPrice: 'от $61 500',
        saving: 'Економія до $3 885',
        savingKgs: '≈ 340 000 сом вигоди',
        benefit: 'Покриває вартість повного дизайн-проєкту',
        badge: 'Центр Бішкека',
        slug: 'madina-residence',
        waText: 'Доброго дня! Хочу дізнатися розмір знижки при одноразовій 100% оплаті в ЖК Madina Residence.',
      },
      {
        complex: 'ЖД Айкол +',
        classType: 'Комфорт+ (Кок-Жар)',
        area: '42.00 м²',
        standardPrice: '$50 400',
        cashPrice: 'от $47 000',
        saving: 'Економія до $3 400',
        savingKgs: '≈ 297 000 сом вигоди',
        benefit: 'Чиста економія бюджету молодої сім\'ї',
        badge: 'Еко-передгір\'я',
        slug: 'ajkol-plus',
        waText: 'Доброго дня! Цікавить спецціна при 100% розрахунку в ЖД Айкол+.',
      },
    ],
    privilegesBadge: 'Преміальний сервіс',
    privilegesTitle: 'Привілеї покупців при 100% оплаті',
    privileges: [
      {
        iconType: 'diamond',
        title: 'Максимальний дисконт від керівництва',
        desc: 'Ви отримуєте мінімальну ціну за квадратний метр для додаткової економії.',
      },
      {
        iconType: 'crown',
        title: 'Пріоритетний вибір видових поверхів',
        desc: 'Ранній доступ до кращих планувань та панорамних краєвидів на гори.',
      },
      {
        iconType: 'flash',
        title: 'Швидка реєстрація ДДУ за 24 години',
        desc: 'Повний юридичний супровід та швидка реєстрація в державних органах.',
      },
      {
        iconType: 'trending',
        title: 'Висока інвестиційна дохідність (ROI)',
        desc: 'Приріст капіталу до 25–35% до моменту введення будинку в експлуатацію.',
      },
    ],
    investBadge: 'Інвестиції в нерухомість Бішкека',
    investTitle: 'Приріст капіталу від 25% до 35% до здачі об\'єкта',
    investDesc: 'Купівля квартири на початкових стадіях за 100% оплату — високоефективний та безпечний інструмент примноження капіталу.',
    investStat1Val: '+25–35%',
    investStat1Label: 'Капіталізація за період будівництва',
    investStat2Val: '8–11%',
    investStat2Label: 'Річна дохідність при оренді',
    investStat3Val: 'Цесія',
    investStat3Label: 'Легкий перепродаж до здачі',
    stepsBadge: 'Швидко та прозоро',
    stepsTitle: '4 кроки до отримання квартири',
    steps: [
      {
        num: '01',
        title: 'Вибір квартири',
        desc: 'Обираєте планування на сайті або у відділі продажів.',
      },
      {
        num: '02',
        title: 'Фіксація спецціни',
        desc: 'Узгоджуємо індивідуальну знижку та бронюємо квартиру.',
      },
      {
        num: '03',
        title: 'Підписання ДДУ',
        desc: 'Офіційний договір за 30 хвилин.',
      },
      {
        num: '04',
        title: 'Оплата та отримання документів',
        desc: 'Вносите кошти з видачею чеків.',
      },
    ],
    calcBadge: 'ФІНАНСОВИЙ КАЛЬКУЛЯТОР 100% ОПЛАТИ',
    calcTitle: 'РОЗРАХУНОК ВИГОДИ ПРИ 100% ОПЛАТІ',
    calcDesc: 'Оберіть планування або налаштуйте вартість для розрахунку знижки.',
    btnDownloadPdf: 'Завантажити розрахунок у PDF',
    netSavingsLabel: 'Ваша чиста економія:',
    calcRateOnline: 'Курс НБКР онлайн',
    calcMaxDiscountBadge: 'Максимальний дисконт від керівництва',
    calcBtnCatalog: 'ОБРАТИ ПЛАНУВАННЯ З КАТАЛОГУ (11 ВАРІАНТІВ)',
    calcBtnCatalogSelected: 'ОБРАНО:',
    calcBasePriceLabel: 'БАЗОВА ВАРТІСТЬ КВАРТИРИ:',
    calcEditHint: 'натисніть, щоб змінити вручну',
    calcDiscountHeading: 'РОЗМІР ДИСКОНТУ ВІД ДЕВЕЛОПЕРА:',
    calcDiscountStandard: '(стандарт)',
    calcDiscountVip: '(VIP)',
    calcScaleSpecial: 'Спецціна:',
    calcScaleSaving: 'Ваша економія:',
    calcBenefitTitle: 'ЧИСТА ВИГОДА:',
    calcBenefitDesc: 'Заощаджені кошти повністю покриють вартість дизайн-проєкту або паркінгу.',
    calcResultTitle: 'ОСТАТОЧНА СПЕЦЦІНА ПРИ 100% ОПЛАТІ:',
    calcSavingsLabel: 'Ваша економія:',
    calcBaseNote: 'Базова ціна:',
    calcDisclaimer: '* Оплата здійснюється у сомах за курсом НБКР на день оплати. Ціна фіксується у договорі.',
    calcBtnFixWa: 'ЗАФІКСУВАТИ ЗНИЖКУ У WHATSAPP',
    calcBtnPdf: 'ЗАВАНТАЖИТИ РОЗРАХУНОК У PDF',
    calcBtnBookFloor: 'Забронювати видовий поверх',
    somUnit: 'сом',
  },
  en: {
    pageTitle: '100% Payment',
    heroTitle: 'MAXIMUM SAVINGS & DISCOUNTS WITH 100% PAYMENT',
    heroSubtitle: 'The most cost-effective way to purchase real estate from EL ORDO GROUP. Lock in the lowest square meter rate, gain priority access to prime panoramic floors, and execute contracts within 24 hours.',
    noticeText: 'With full upfront payment, EL ORDO GROUP provides the highest personalized discount. Save a substantial sum, assume outright ownership free of debt obligations, and protect your capital from inflation.',
    blockTitle: 'TERMS & BENEFITS OF FULL UPFRONT PAYMENT',
    descriptionText: 'One-time settlement of the total apartment cost upon signing the formal Equity Participation Agreement (DDU). Payment can be completed in cash at the company\'s official cashier desk with official receipts, or via wire transfer. Buyers receive priority reservation on prime floors and a guaranteed locked rate.',
    documentsText: 'National passport (ID card or international passport). For international buyers: passport with certified translation. Proof of income is not required.',
    faqList: [
      {
        q: 'What discount can I receive with 100% payment?',
        a: 'Discounts depend on the chosen development, floor area, and construction stage. Average savings range from $2,500 to $10,000+ compared to base prices.',
      },
      {
        q: 'In which currency are settlements conducted?',
        a: 'Under Kyrgyz Republic law, transactions are settled in the national currency (som) at the contract-fixed exchange rate, or via bank transfer.',
      },
      {
        q: 'How can overseas buyers complete the purchase?',
        a: 'We provide international SWIFT banking details for direct wire transfers, or transactions can be completed via notarized power of attorney.',
      },
      {
        q: 'Are official receipts and payment confirmations provided?',
        a: 'Yes, absolutely. You receive official bank payment orders or cashier vouchers, accompanied by a formal certificate confirming full financial clearance.',
      },
      {
        q: 'Can I resell the apartment before project completion?',
        a: 'Yes. Fully paid apartments offer maximum liquidity for resale via an assignment of rights (cessio) contract through our sales department.',
      },
      {
        q: 'Is the final purchase price fixed in the contract?',
        a: 'Yes. The price is firmly locked upon contract signing and is immune to building material cost increases or inflation.',
      },
    ],
    casesBadge: 'Direct Buyer Value',
    casesTitle: 'Actual Savings with 100% Upfront Payment',
    casesSubtitle: 'Examples of special rates for 1-room apartments with lump-sum settlement',
    areaPrefix: 'Apartment Area:',
    basePriceLabel: 'Base Price:',
    specialPriceLabel: 'Special 100% Price:',
    lockDiscountBtn: 'Lock in Discount',
    viewComplexBtn: 'View Complex',
    cases: [
      {
        complex: 'Abu Dhabi RC',
        classType: 'Premium Class',
        area: '49.48 m²',
        standardPrice: '$81 642',
        cashPrice: 'from $76 690',
        saving: 'Save up to $4,950',
        savingKgs: '≈ 433,000 KGS benefit',
        benefit: 'Covers high-end designer bathroom fixtures',
        badge: 'Capital Landmark',
        slug: 'abu-dhabi',
        waText: 'Hello! I am inquiring about the discount for 100% payment on a 1-room unit in Abu Dhabi RC. What floors are open?',
      },
      {
        complex: 'Madina Residence',
        classType: 'Business Class',
        area: '43.59 м²',
        standardPrice: '$65 385',
        cashPrice: 'from $61 500',
        saving: 'Save up to $3,885',
        savingKgs: '≈ 340,000 KGS benefit',
        benefit: 'Covers full professional interior design project',
        badge: 'Bishkek Center',
        slug: 'madina-residence',
        waText: 'Hello! Please provide the lump-sum discount details for Madina Residence and share available floor plans.',
      },
      {
        complex: 'Aykol + Club House',
        classType: 'Comfort+ (Kok-Jar)',
        area: '42.00 м²',
        standardPrice: '$50 400',
        cashPrice: 'from $47 000',
        saving: 'Save up to $3,400',
        savingKgs: '≈ 297,000 KGS benefit',
        benefit: 'Direct budget savings for young families',
        badge: 'Eco Foothills',
        slug: 'ajkol-plus',
        waText: 'Hello! Interested in the upfront cash discount for Aykol+ (Kok-Jar). What apartments are available?',
      },
    ],
    privilegesBadge: 'Premium Service',
    privilegesTitle: 'Privileges for 100% Upfront Buyers',
    privileges: [
      {
        iconType: 'diamond',
        title: 'Executive Top Discount',
        desc: 'Secure the lowest price per square meter, freeing up funds for interior finishes or furnishings.',
      },
      {
        iconType: 'crown',
        title: 'Priority Panoramic Floor Selection',
        desc: 'Early access to the most desirable floor plans, high floors, and uninterrupted mountain panoramas.',
      },
      {
        iconType: 'flash',
        title: 'Express 24-Hour Agreement Registration',
        desc: 'Complete legal guidance by in-house attorneys with rapid state registration without queues.',
      },
      {
        iconType: 'trending',
        title: 'High Capital Yield (ROI)',
        desc: 'Purchasing early at full cash value yields estimated capital appreciation of 25% to 35% upon commissioning.',
      },
    ],
    investBadge: 'Real Estate Investment in Bishkek',
    investTitle: 'Capital Appreciation of 25% to 35% by Project Completion',
    investDesc: 'Acquiring an apartment during initial construction with 100% payment represents one of the highest-yield, secure investment strategies in Kyrgyzstan.',
    investStat1Val: '+25–35%',
    investStat1Label: 'Capital gain during construction',
    investStat2Val: '8–11%',
    investStat2Label: 'Rental yield',
    investStat3Val: 'Assignment',
    investStat3Label: 'Resale before handover',
    stepsBadge: 'Fast & Legally Secure',
    stepsTitle: '4 Steps to Home Ownership',
    steps: [
      {
        num: '01',
        title: 'Select Panoramic Unit',
        desc: 'Browse layouts online or visit the showroom to pick your floor on interactive 3D scale models.',
      },
      {
        num: '02',
        title: 'Confirm Special Price',
        desc: 'Finalize your personal discount with management and reserve your selected unit.',
      },
      {
        num: '03',
        title: 'Sign Agreement',
        desc: 'Sign the official Equity Participation Agreement in 30 minutes with comprehensive legal guidance.',
      },
      {
        num: '04',
        title: 'Complete Payment & Receive Deeds',
        desc: 'Transfer funds via wire or company cashier and receive official payment documentation.',
      },
    ],
    calcBadge: '100% PAYMENT FINANCIAL CALCULATOR',
    calcTitle: 'CALCULATE YOUR 100% UPFRONT DISCOUNT',
    calcDesc: 'Select layout or adjust the slider to see your instant lump-sum savings.',
    btnDownloadPdf: 'Download PDF Quote',
    netSavingsLabel: 'Your Net Savings:',
    calcRateOnline: 'Live NBKR Rate',
    calcMaxDiscountBadge: 'Executive Management Discount',
    calcBtnCatalog: 'SELECT FLOOR PLAN FROM CATALOG (11 UNITS)',
    calcBtnCatalogSelected: 'SELECTED:',
    calcBasePriceLabel: 'BASE APARTMENT PRICE:',
    calcEditHint: 'click to edit manually',
    calcDiscountHeading: 'DEVELOPER DISCOUNT RATE:',
    calcDiscountStandard: '(Standard)',
    calcDiscountVip: '(VIP)',
    calcScaleSpecial: 'Special Rate:',
    calcScaleSaving: 'Your Savings:',
    calcBenefitTitle: 'NET SAVINGS:',
    calcBenefitDesc: 'Saved funds fully cover interior design, renovations, or an underground parking bay.',
    calcResultTitle: 'FINAL SPECIAL PRICE WITH 100% PAYMENT:',
    calcSavingsLabel: 'Your Total Savings:',
    calcBaseNote: 'Base Price:',
    calcDisclaimer: '* Payment is made in KGS based on the official NBKR exchange rate on the payment date. Rate is locked in DDU.',
    calcBtnFixWa: 'LOCK IN DISCOUNT VIA WHATSAPP',
    calcBtnPdf: 'DOWNLOAD PDF QUOTE',
    calcBtnBookFloor: 'Reserve Panoramic Floor',
    somUnit: 'KGS',
  },
  zh: {
    pageTitle: '100% 一次性全款',
    heroTitle: '一次性全款购房享专属顶格优惠与尊崇特权',
    heroSubtitle: 'EL ORDO GROUP 开发商直签置业最超值方案。锁定超低平米单价，尊享优质景观楼层优先选购权，24小时极速完成官方购房合同备案。',
    noticeText: '一次性全额付款享有开发商专属最高定制折扣。大幅缩减置业预算，直接拥有完全独立的房产产权，无需承担任何债务利息，有效抵御资产通胀。',
    blockTitle: '全款购房细则与专属优势',
    descriptionText: '正式签署官方购房合同（DDU）后一次性付清全额房款。支持通过公司官方财务室以现金形式支付并开具正式财务收据，亦可通过银行电汇结算。全款买家享有高层全景稀缺房源的优先选房权，锁定单价绝无后期加价。',
    documentsText: '吉尔吉斯斯坦公民凭身份证或护照办理；外籍置业人士仅需提供经公证翻译的护照原件。无需工作流水证明。',
    faqList: [
      {
        q: '一次性全款购房最高可享多少优惠？',
        a: '折扣幅度取决于所选楼盘、房屋总面积及当前工程施工进度。相较于基础售价，单套房屋平均可节省 $2,500 至 $10,000+ 美元不等。',
      },
      {
        q: '购房款项以何种货币进行结算？',
        a: '依据吉尔吉斯共和国法律法规，所有官方款项均按合同约定的固定汇率以国家法定货币（索姆）或合规银行转账结算。',
      },
      {
        q: '海外置业人士如何办理跨国汇款支付？',
        a: '我们提供正规国际商业银行 SWIFT 电汇账户支持海外直汇，亦可由比什凯克本地授权委托人持公证委托书代为办理。',
      },
      {
        q: '付款后是否开具正规官方财务凭证？',
        a: '必定提供。银行电汇享有银行正式电子回单，现金缴费提供正式财务收据及官方盖章的《100%房款全额付讫证明书》。',
      },
      {
        q: '房屋在竣工交付前能否转让更名（合同更名）？',
        a: '可以。全款付讫的房源具有极高的法律流动性，您可在工程主体高进度阶段通过营销中心签署正规更名协议（合同转让）进行资产变现。',
      },
      {
        q: '最终成交价格是否在合同中明确锁定？',
        a: '是的。签约时单价与总价白纸黑字锁定，后期任何建材涨价或市场通胀风险均与您的购房成本无关。',
      },
    ],
    casesBadge: '买家直观收益',
    casesTitle: '全款置业真实降幅实测',
    casesSubtitle: '按一次性全额付款测算的一居室经典户型特惠样例',
    areaPrefix: '建筑面积:',
    basePriceLabel: '官方指导总价:',
    specialPriceLabel: '一次性全款特惠价:',
    lockDiscountBtn: '锁定全款特惠',
    viewComplexBtn: '浏览该楼盘',
    cases: [
      {
        complex: '阿布扎比住宅区 (Abu Dhabi)',
        classType: '尊享级 (Premium)',
        area: '49.48 м²',
        standardPrice: '$81 642',
        cashPrice: '从 $76 690 起',
        saving: '直省高达 $4 950',
        savingKgs: '≈ 433 000 索姆优惠',
        benefit: '节省资金足以覆盖全套一线品牌厨卫电器',
        badge: '首都地标双子塔',
        slug: 'abu-dhabi',
        waText: '您好！我想了解阿布扎比住宅区49.48平米一居室全款购房的专属折扣，目前有哪些高层景观房可选？',
      },
      {
        complex: '玛迪娜公馆 (Madina Residence)',
        classType: '商务级 (Business)',
        area: '43.59 м²',
        standardPrice: '$65 385',
        cashPrice: '从 $61 500 起',
        saving: '直省高达 $3 885',
        savingKgs: '≈ 340 000 索姆优惠',
        benefit: '全额覆盖专业室内高端精装设计全套费用',
        badge: '市政核心商务区',
        slug: 'madina-residence',
        waText: '您好！想咨询玛迪娜公馆一次性全款付款的特惠政策与销控表，请发送户型图纸。',
      },
      {
        complex: '艾科尔+ (Aykol +)',
        classType: '舒适+ (Kok-Jar麓区)',
        area: '42.00 м²',
        standardPrice: '$50 400',
        cashPrice: '从 $47 000 起',
        saving: '直省高达 $3 400',
        savingKgs: '≈ 297 000 索姆优惠',
        benefit: '年轻置业家庭切切实实的现金流节省',
        badge: '生态鲜氧洋房',
        slug: 'ajkol-plus',
        waText: '您好！我对艾科尔+洋房全款特价房源感兴趣，请发送当前可选房号。',
      },
    ],
    privilegesBadge: '尊贵私享礼遇',
    privilegesTitle: '一次性全款购房者尊享特权',
    privileges: [
      {
        iconType: 'diamond',
        title: '高管专属顶格折扣通道',
        desc: '直通开发商高管特批底价，将省下的真金白银自由投入到高品质家居装潢中。',
      },
      {
        iconType: 'crown',
        title: '核心高区全景房优先选定权',
        desc: '享有首批挑选南北通透黄金户型、高区开阔观景楼层及雪山天幕房源的特权。',
      },
      {
        iconType: 'flash',
        title: '24小时极速官方合同备案',
        desc: '资深专职法务全程陪同，加急办理官方国家不动产机构正式登记备案，免去排队。',
      },
      {
        iconType: 'trending',
        title: '出众的资产增值与投资回报 (ROI)',
        desc: '在工程起步期以全款底价建仓，待项目整体交付时预计可实现 25% 至 35% 的净资产增值。',
      },
    ],
    investBadge: '首都核心不动产价值投资',
    investTitle: '至项目竣工交付期预计实现 25% 至 35% 资产增值',
    investDesc: '在项目施工早期以全款特惠锁定底价，是目前在中亚区域具备强抗通胀属性的稳健投资策略。随着工程实体拔地而起，资产价值稳步兑现。',
    investStat1Val: '+25–35%',
    investStat1Label: '工期建设全周期资本化增值',
    investStat2Val: '8–11%',
    investStat2Label: '交付后年均租金现金流回报',
    investStat3Val: '转让更名',
    investStat3Label: '交付前支持合规转让灵活套现',
    stepsBadge: '高效合规透明',
    stepsTitle: '全款置业极速4步流程',
    steps: [
      {
        num: '01',
        title: '甄选核心景观房源',
        desc: '在官网品鉴户型图册，或莅临营销中心沙盘旁锁定心仪景观楼层。',
      },
      {
        num: '02',
        title: '特批锁定全款底价',
        desc: '置业顾问协助向管理层申请全额付款专属特惠，即刻封存所选房源。',
      },
      {
        num: '03',
        title: '高效签署正规合同',
        desc: '在专职法务陪同下30分钟内审阅并签署官方备案的正规购房合同。',
      },
      {
        num: '04',
        title: '支付房款并领取全套凭证',
        desc: '通过银行电汇或财务室缴费，当场领取完税凭据及100%全款结清公函。',
      },
    ],
    calcBadge: '100%全款置业财务计算器',
    calcTitle: '在线测算全款购房特惠',
    calcDesc: '选择心仪户型或拖动滑块，即刻测算现金全款最高折扣。',
    btnDownloadPdf: '下载 PDF 格式预算单',
    netSavingsLabel: '您的净节省额：',
    calcRateOnline: '央行实时汇率',
    calcMaxDiscountBadge: '高管专属特批顶格折扣',
    calcBtnCatalog: '在售主力户型库中挑选 (共11款)',
    calcBtnCatalogSelected: '当前选定房源：',
    calcBasePriceLabel: '官方指导总价：',
    calcEditHint: '点击可手动输入金额',
    calcDiscountHeading: '开发商专属折扣比例：',
    calcDiscountStandard: '(标准)',
    calcDiscountVip: '(尊享)',
    calcScaleSpecial: '全款特惠价：',
    calcScaleSaving: '专属优惠额：',
    calcBenefitTitle: '直享现金减免：',
    calcBenefitDesc: '节省资金足以覆盖全套一线品牌家电、高端软装设计或专属地下车位。',
    calcResultTitle: '一次性全款成交总价：',
    calcSavingsLabel: '您的净节省额：',
    calcBaseNote: '指导总价：',
    calcDisclaimer: '* 房款依据国家法规按实际付款日央行汇率以索姆结算，单价锁定写入正规购房合同。',
    calcBtnFixWa: '通过 WHATSAPP 锁定底价特惠',
    calcBtnPdf: '一键下载 PDF 格式预算单',
    calcBtnBookFloor: '优先锁定高区景观房源',
    somUnit: '索姆',
  },
};

export default function FullPaymentPage() {
  const { locale } = useLanguage();
  const lang: Locale = (locale as Locale) || 'ru';
  const c = CONTENT[lang] || CONTENT.ru;

  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(-1);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);

  const [apartmentPrice, setApartmentPrice] = useState<number>(65000);
  const [discountPercent, setDiscountPercent] = useState<number>(6);
  const [currencyMode, setCurrencyMode] = useState<'usd' | 'kgs'>('usd');

  const [usdRate, setUsdRate] = useState<number>(87.45);
  const [rateDate, setRateDate] = useState<string>('24.09.2026');

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = `${c.pageTitle} | EL ORDO GROUP`;
    }
  }, [c.pageTitle]);

  const cashPrice = Math.round(apartmentPrice * (1 - discountPercent / 100));
  const savingsUsd = apartmentPrice - cashPrice;
  const savingsKgs = Math.round(savingsUsd * usdRate);
  const cashPriceKgs = Math.round(cashPrice * usdRate);

  const handleSelectCatalogApartment = (apt: typeof CATALOG_APARTMENTS[0], idx: number) => {
    setSelectedPlanIndex(idx);
    setApartmentPrice(apt.price);
    setIsCatalogOpen(false);
  };

  const cleanWaNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';

  const handleDownloadPdf = () => {
    exportPdfQuote({
      apartmentPrice: cashPrice,
      downPaymentAmount: cashPrice,
      downPaymentPercent: 100,
      months: 0,
      frequency: 'monthly',
      paymentPerPeriodUsd: 0,
      usdRate,
      rateDate,
      selectedApartment: null,
      paymentSchedule: [
        {
          num: 1,
          period: `Единоразово (100% расчет со скидкой ${discountPercent}%)`,
          paymentUsd: cashPrice,
          paymentKgs: cashPriceKgs,
          balanceUsd: 0,
        },
      ],
    });
  };

  const handleFixWhatsApp = () => {
    const selectedTitle = selectedPlanIndex >= 0 ? CATALOG_APARTMENTS[selectedPlanIndex].title : 'Индивидуальный расчет';
    const complexName = selectedPlanIndex >= 0 ? CATALOG_APARTMENTS[selectedPlanIndex].complex : 'Квартира в EL ORDO GROUP';

    try {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Клиент на 100% расчет',
          phone: 'Через WhatsApp',
          project: complexName,
          goal: `100% оплата со скидкой ${discountPercent}%`,
          budget: `$${cashPrice.toLocaleString('ru-RU')}`,
          rooms: selectedTitle,
          details: `Базовая цена: $${apartmentPrice.toLocaleString('ru-RU')} | Скидка: $${savingsUsd.toLocaleString('ru-RU')} (${discountPercent}%)`,
          comment: `Спеццена при 100% оплате: $${cashPrice.toLocaleString('ru-RU')} (~${cashPriceKgs.toLocaleString('ru-RU')} сом)`,
          lang,
          source: 'FullPaymentPage',
          utm: getStoredUtm(),
          createdAt: new Date().toISOString(),
        }),
      }).catch(() => {});
    } catch {}

    trackWhatsAppClick('full_payment_discount', complexName);
    trackLeadSubmit('100% Оплата со скидкой', complexName);

    const waText =
      `Здравствуйте! Рассчитал спеццену при единовременной 100% оплате на сайте EL ORDO GROUP:\n\n` +
      `• Объект: ${complexName} (${selectedTitle})\n` +
      `• Базовая стоимость: $${apartmentPrice.toLocaleString('ru-RU')} (~${Math.round(apartmentPrice * usdRate).toLocaleString('ru-RU')} сом)\n` +
      `• Размер скидки: ${discountPercent}% (-$${savingsUsd.toLocaleString('ru-RU')} / ~${savingsKgs.toLocaleString('ru-RU')} сом)\n` +
      `• Итоговая спеццена: $${cashPrice.toLocaleString('ru-RU')} (~${cashPriceKgs.toLocaleString('ru-RU')} сом)\n\n` +
      `Хочу зафиксировать эту стоимость и забронировать видовой этаж.`;

    window.open(`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <PaymentLayout
      pageTitle={c.pageTitle}
      currentSlug="polniy-raschet"
      heroTitle={c.heroTitle}
      heroSubtitle={c.heroSubtitle}
      noticeText={c.noticeText}
      blockTitle={c.blockTitle}
      descriptionText={c.descriptionText}
      documentsText={c.documentsText}
      faqList={c.faqList}
    >
      {/* 1. ФИНАНСОВЫЙ КАЛЬКУЛЯТОР 100% ОПЛАТЫ */}
      <section className="my-16 bg-[#03150e] text-white rounded-3xl p-6 sm:p-12 border border-[#d4b26f]/30 shadow-2xl transition-all">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-black tracking-widest text-[#d4b26f] block mb-2">
            {c.calcBadge}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-3">
            {c.calcTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
            {c.calcDesc}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Плашка курса НБКР онлайн + статус максимального дисконта */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-gray-300 font-medium">
                {c.calcRateOnline} ({rateDate}):
              </span>
              <span className="bg-black/60 px-3 py-1 rounded-lg border border-white/15 text-[#d4b26f] font-black">
                {usdRate} <span className="text-gray-400 font-normal">{c.somUnit}/$</span>
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/40 px-3 py-1 rounded-xl border border-emerald-800/40">
              <IconShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{c.calcMaxDiscountBadge}</span>
            </div>
          </div>

          {/* Кнопка-дропдаун: Выбрать планировку из каталога */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
              className="w-full py-4 px-6 rounded-2xl bg-[#d4b26f] hover:bg-[#c49f57] text-[#064734] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-between shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="truncate">
                  {selectedPlanIndex >= 0
                    ? `${c.calcBtnCatalogSelected} ${CATALOG_APARTMENTS[selectedPlanIndex].complex} — ${CATALOG_APARTMENTS[selectedPlanIndex].title}`
                    : c.calcBtnCatalog}
                </span>
              </div>
              <svg className={`w-4 h-4 transition-transform duration-300 ${isCatalogOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isCatalogOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#061e15] border border-white/20 rounded-2xl p-2.5 shadow-2xl z-30 max-h-72 overflow-y-auto space-y-1 animate-fadeIn">
                {CATALOG_APARTMENTS.map((apt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectCatalogApartment(apt, idx)}
                    className="w-full text-left p-3 rounded-xl hover:bg-white/10 flex items-center justify-between text-xs transition-colors cursor-pointer"
                  >
                    <div>
                      <strong className="text-white font-bold block">{apt.complex}</strong>
                      <span className="text-gray-300 text-[11px]">{apt.title}</span>
                    </div>
                    <div className="text-right">
                      <strong className="text-[#d4b26f] font-black">${apt.price.toLocaleString('ru-RU')}</strong>
                      <span className="text-[10px] text-gray-400 block">≈ {Math.round(apt.price * usdRate).toLocaleString('ru-RU')} {c.somUnit}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Базовая стоимость */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-white block">
                  {c.calcBasePriceLabel}
                </span>
                <span className="text-[10px] text-gray-400 block">
                  {c.calcEditHint}
                </span>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="flex items-center bg-black/50 border border-white/15 px-4 py-2 rounded-2xl">
                  <span className="text-[#d4b26f] font-black text-sm mr-2">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={apartmentPrice.toLocaleString('ru-RU')}
                    onChange={(e) => {
                      const val = Number(e.target.value.replace(/\D/g, ''));
                      setApartmentPrice(val);
                      setSelectedPlanIndex(-1);
                    }}
                    className="w-28 sm:w-32 bg-transparent text-right font-black text-lg text-white focus:outline-none"
                  />
                </div>
                <span className="text-xs text-gray-400 font-semibold whitespace-nowrap hidden sm:inline">
                  ≈ {Math.round(apartmentPrice * usdRate).toLocaleString('ru-RU')} {c.somUnit}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="35000"
              max="220000"
              step="1000"
              value={apartmentPrice}
              onChange={(e) => {
                setApartmentPrice(Number(e.target.value));
                setSelectedPlanIndex(-1);
              }}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#d4b26f]"
            />
          </div>

          {/* Размер дисконта */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-white">
                {c.calcDiscountHeading}
              </span>
              <span className="bg-black/60 px-3 py-1 rounded-xl border border-white/15 text-xs font-black text-[#d4b26f]">
                {discountPercent}%
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { pct: 5, label: '5%' },
                { pct: 6, label: `6% ${c.calcDiscountStandard}` },
                { pct: 7, label: '7%' },
                { pct: 8, label: `8% ${c.calcDiscountVip}` },
              ].map((b) => (
                <button
                  key={b.pct}
                  type="button"
                  onClick={() => setDiscountPercent(b.pct)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-black transition-all cursor-pointer ${
                    discountPercent === b.pct
                      ? 'bg-[#d4b26f] text-[#064734] shadow-lg'
                      : 'bg-black/40 text-gray-300 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Двухцветная шкала выгоды */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-black">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{c.calcScaleSpecial} ${cashPrice.toLocaleString('ru-RU')} ({100 - discountPercent}%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#d4b26f]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4b26f]" />
                <span>{c.calcScaleSaving} ${savingsUsd.toLocaleString('ru-RU')} ({discountPercent}%)</span>
              </div>
            </div>

            <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden flex p-0.5 border border-white/10">
              <div
                style={{ width: `${100 - discountPercent}%` }}
                className="h-full bg-emerald-500 rounded-l-full transition-all duration-300"
              />
              <div
                style={{ width: `${discountPercent}%` }}
                className="h-full bg-[#d4b26f] rounded-r-full transition-all duration-300"
              />
            </div>
          </div>

          {/* Плашка выгоды */}
          <div className="p-4 rounded-2xl bg-black/40 border border-[#d4b26f]/30 flex items-center gap-4 text-xs">
            <div className="w-10 h-10 rounded-xl bg-[#d4b26f]/20 text-[#d4b26f] flex items-center justify-center font-black text-lg shrink-0">
              %
            </div>
            <div>
              <strong className="text-white font-black uppercase text-xs sm:text-sm block">
                {c.calcBenefitTitle} ${savingsUsd.toLocaleString('ru-RU')} (~{savingsKgs.toLocaleString('ru-RU')} {c.somUnit})
              </strong>
              <span className="text-gray-400 text-[11px] block mt-0.5">
                {c.calcBenefitDesc}
              </span>
            </div>
          </div>

          {/* Главная карточка результата */}
          <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-white/15 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-gray-300">
                  {c.calcResultTitle}
                </span>

                <div className="flex items-center p-1 rounded-xl bg-white/10 border border-white/15">
                  <button
                    type="button"
                    onClick={() => setCurrencyMode('usd')}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      currencyMode === 'usd'
                        ? 'bg-[#d4b26f] text-[#064734] shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrencyMode('kgs')}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      currencyMode === 'kgs'
                        ? 'bg-[#d4b26f] text-[#064734] shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {c.somUnit}
                  </button>
                </div>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[#d4b26f] tracking-tight">
                  {currencyMode === 'usd' ? (
                    `$${cashPrice.toLocaleString('ru-RU')}`
                  ) : (
                    `${cashPriceKgs.toLocaleString('ru-RU')} ${c.somUnit}`
                  )}
                </div>

                <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                  <IconCheck className="w-4 h-4 text-emerald-400" />
                  <span>
                    {c.calcSavingsLabel} ${savingsUsd.toLocaleString('ru-RU')} (~{savingsKgs.toLocaleString('ru-RU')} {c.somUnit})
                  </span>
                </div>

                <span className="text-xs text-gray-400 block mt-2">
                  {c.calcBaseNote} ${apartmentPrice.toLocaleString('ru-RU')}
                </span>
              </div>

              <p className="text-[10px] text-gray-400 leading-relaxed font-light italic border-t border-white/10 pt-3">
                {c.calcDisclaimer}
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleFixWhatsApp}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <IconWhatsApp className="w-5 h-5 text-white" />
                <span>{c.calcBtnFixWa}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{c.calcBtnPdf}</span>
              </button>

              <a
                href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent('Здравствуйте! Хочу уточнить условия бронирования видового этажа при 100% оплате.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/15 cursor-pointer text-center"
              >
                {c.calcBtnBookFloor}
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 2. КАРТОЧКИ РЕАЛЬНОЙ ЭКОНОМИИ ПО КОМПЛЕКСАМ */}
      <div className="mt-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            {c.casesBadge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
            {c.casesTitle}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-1">
            {c.casesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.cases.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none hover:shadow-2xl hover:border-[#064734]/30 dark:hover:border-[#d4b26f]/30 transition-all flex flex-col justify-between relative group"
            >
              {item.badge && (
                <div className="absolute -top-3 right-6 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                  {item.badge}
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-gray-400 dark:text-neutral-400 block mb-1">
                  {item.classType}
                </span>
                <h4 className="text-xl font-black text-gray-950 dark:text-white mb-1">
                  {item.complex}
                </h4>
                <div className="text-xs font-semibold text-[#064734] dark:text-[#d4b26f] mb-4">
                  {c.areaPrefix} {item.area}
                </div>

                <div className="space-y-2.5 border-t border-gray-100 dark:border-white/10 pt-3 text-xs">
                  <div className="flex justify-between text-gray-500 dark:text-neutral-400">
                    <span>{c.basePriceLabel}</span>
                    <span className="line-through">{item.standardPrice}</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#f2f6f4] dark:bg-[#040c09] border border-[#064734]/15 dark:border-white/10 my-2 transition-colors">
                    <span className="text-[11px] font-bold text-gray-500 dark:text-neutral-400 block">
                      {c.specialPriceLabel}
                    </span>
                    <div className="text-2xl font-black text-[#064734] dark:text-[#d4b26f] my-0.5">
                      {item.cashPrice}
                    </div>
                    <div className="text-xs font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <IconCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.saving} ({item.savingKgs})</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed italic pt-1">
                    {item.benefit}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 space-y-2">
                <a
                  href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(item.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('full_payment_card', item.complex)}
                  className="w-full py-3 rounded-xl bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] active:scale-95 text-white dark:text-[#064734] font-black text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <IconWhatsApp className="w-4 h-4 text-[#25D366] dark:text-[#064734]" />
                  <span>{c.lockDiscountBtn}</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </a>
                <Link
                  href={`/${item.slug}`}
                  className="block w-full text-center py-1.5 text-[11px] font-bold text-gray-500 dark:text-neutral-400 hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors"
                >
                  {c.viewComplexBtn} {item.complex}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ПРИВИЛЕГИИ 100% ПОКУПАТЕЛЯ */}
      <div className="my-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            {c.privilegesBadge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
            {c.privilegesTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {c.privileges.map((priv, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0b1b15] p-7 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-xl dark:hover:border-[#d4b26f]/30 transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center text-2xl shrink-0">
                {priv.iconType === 'diamond' && <IconDiamond className="w-6 h-6 text-[#064734] dark:text-[#d4b26f]" />}
                {priv.iconType === 'crown' && (
                  <svg className="w-6 h-6 text-[#064734] dark:text-[#d4b26f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                )}
                {priv.iconType === 'flash' && (
                  <svg className="w-6 h-6 text-[#064734] dark:text-[#d4b26f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                )}
                {priv.iconType === 'trending' && (
                  <svg className="w-6 h-6 text-[#064734] dark:text-[#d4b26f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                )}
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white mb-1.5">
                  {priv.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {priv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ИНВЕСТИЦИОННЫЙ ПОТЕНЦИАЛ */}
      <div className="my-16 bg-[#032b20] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-white/10">
        <div className="relative z-10 max-w-3xl">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
            {c.investBadge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4 leading-tight">
            {c.investTitle}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6 font-light">
            {c.investDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
              <span className="text-xl font-black text-[#d4b26f] block mb-0.5">{c.investStat1Val}</span>
              <span className="text-gray-300 text-[11px]">{c.investStat1Label}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
              <span className="text-xl font-black text-white block mb-0.5">{c.investStat2Val}</span>
              <span className="text-gray-300 text-[11px]">{c.investStat2Label}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
              <span className="text-xl font-black text-[#d4b26f] block mb-0.5">{c.investStat3Val}</span>
              <span className="text-gray-300 text-[11px]">{c.investStat3Label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. ПОШАГОВЫЙ ПРОЦЕСС ОФОРМЛЕНИЯ */}
      <div className="my-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            {c.stepsBadge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
            {c.stepsTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {c.steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0b1b15] p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col justify-between transition-colors"
            >
              <div>
                <span className="text-3xl font-black text-[#d4b26f] block mb-3">
                  {s.num}
                </span>
                <h4 className="text-sm font-black text-gray-950 dark:text-white mb-2">
                  {s.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PaymentLayout>
  );
}