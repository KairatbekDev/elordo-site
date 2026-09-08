'use client';

import Link from 'next/link';
import PaymentLayout from '@/components/PaymentLayout';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import {
  IconCheck,
  IconDiamond,
  IconWhatsApp,
  IconArrowRight,
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
}

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
        standardPrice: '$61 026',
        cashPrice: 'от $57 500',
        saving: 'Экономия до $3 500',
        savingKgs: '≈ 306 000 сом выгоды',
        benefit: 'Покрывает стоимость полного дизайн-проекта',
        badge: 'Центр Бишкека',
        slug: 'madina-residence',
        waText: 'Здравствуйте! Хочу узнать размер скидки при единовременной 100% оплате в ЖК Madina Residence. Отправьте планировки.',
      },
      {
        complex: 'ЖД Айкол +',
        classType: 'Комфорт+ (Кок-Жар)',
        area: '42.00 м²',
        standardPrice: '$46 200',
        cashPrice: 'от $43 200',
        saving: 'Экономия до $3 000',
        savingKgs: '≈ 262 000 сом выгоды',
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
        desc: 'Заключаем официальный Договор долевого участия за 40 минут с полным юридическим разъяснением всех пунктов.',
      },
      {
        num: '04',
        title: 'Оплата и полный пакет документов',
        desc: 'Вносите оплату через кассу компании или безналичным банковским переводом с выдачей всех финансовых чеков.',
      },
    ],
  },
  kg: {
    pageTitle: '100% төлөм',
    heroTitle: '100% ТӨЛӨМДӨ МАКСИМАЛДУУ ПАЙДА ЖАНА АРЗАНДАТУУЛАР',
    heroSubtitle: 'EL ORDO GROUP куруучусунан кыймылсыз мүлк сатып алуунун эң пайдалуу жолу. Чарчы метрдин минималдуу баасын бекитиңиз, мыкты пландарды биринчилерден болуп тандаңыз жана 24 саатта ДДУ тариздеңиз.',
    noticeText: 'Батирдин баасын толук бир жолу төлөгөндө EL ORDO GROUP компаниясы максималдуу жеке арзандатууну сунуштайт. Сиз олуттуу сумманы үнөмдөп, карыздык милдеттенмелерсиз мүлктүн толук ээси болосуз жана каражатыңызды инфляциядан коргойсуз.',
    blockTitle: 'ТОЛУК ЭСЕПТЕШҮҮНҮН ШАРТТАРЫ ЖАНА АРТЫКЧЫЛЫКТАРЫ',
    descriptionText: 'Үлүштүк катышуу келишимине (ДДУ) кол койгондон кийин батирдин наркын бир жолку толук төлөө. Төлөмдү компаниянын расмий кассасы аркылуу накталай же банктык эсепке которуу менен жүргүзүүгө болот. Сатып алуучуга панорамалык кабаттарды артыкчылыктуу брондоо мүмкүнчүлүгү берилет жана кийинки кайра эсептөөлөрсүз баа кепилденет.',
    documentsText: 'Кыргыз Республикасынын жаранынын паспорту (ID-карта же жалпы жарандык паспорт). Чет элдик жарандар үчүн — нотариалдык жактан күбөлөндүрүлгөн котормосу бар паспорт. Киреше маалымкаты талап кылынбайт.',
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
        standardPrice: '$61 026',
        cashPrice: 'от $57 500',
        saving: '$3 500 чейин үнөмдөө',
        savingKgs: '≈ 306 000 сом пайда',
        benefit: 'Толук дизайн-долбоордун наркын жабат',
        badge: 'Бишкектин борбору',
        slug: 'madina-residence',
        waText: 'Саламатсызбы! ЖК Madina Residence комплексинен 100% төлөмдөгү арзандатуу өлчөмүн билгим келет. Пландарын жөнөтөсүзбү?',
      },
      {
        complex: 'ЖД Айкол +',
        classType: 'Комфорт+ (Көк-Жар)',
        area: '42.00 м²',
        standardPrice: '$46 200',
        cashPrice: 'от $43 200',
        saving: '$3 000 чейин үнөмдөө',
        savingKgs: '≈ 262 000 сом пайда',
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
        desc: 'Бардык пункттарды юридикалык түшүндүрүү менен 40 мүнөттө расмий ДДУ түзөбүз.',
      },
      {
        num: '04',
        title: 'Төлөм жана документтерди алуу',
        desc: 'Касса аркылуу же банктык которуу менен төлөп, бардык каржылык чектерди аласыз.',
      },
    ],
  },
  kz: {
    pageTitle: '100% төлем',
    heroTitle: '100% ТӨЛЕМ КЕЗІНДЕГІ МАКСИМАЛДЫ ПАЙДА МЕН ЖЕҢІЛДІКТЕР',
    heroSubtitle: 'EL ORDO GROUP құрылыс салушысынан жылжымайтын мүлікті сатып алудың ең тиімді тәсілі. Шаршы метрдің ең төмен бағасын бекітіңіз, үздік жоспарларды таңдап, 24 сағатта ДДУ рәсімдеңіз.',
    noticeText: 'Пәтердің толық құнын бірден төлеген кезде EL ORDO GROUP максималды жеке жеңілдік ұсынады. Сіз қомақты қаражатты үнемдеп, қарызсыз баспана иесі боласыз және инфляциядан қорғанасыз.',
    blockTitle: 'ТОЛЫҚ ЕСЕП АЙЫРЫСУДЫҢ ШАРТТАРЫ МЕН АРТЫҚШЫЛЫҚТАРЫ',
    descriptionText: 'Үлестік қатысу шартына (ДДУ) қол қойылғаннан кейін пәтердің толық құнын біржолғы төлеу. Төлемді компанияның ресми кассасы арқылы қолма-қол немесе банктік аударыммен жүргізуге болады. Сатып алушыға видовой қабаттарды басымдықпен брондау мүмкіндігі беріледі.',
    documentsText: 'Қырғыз Республикасы азаматының төлқұжаты. Шетелдіктер үшін — нотариалды куәландырылған аудармасы бар төлқұжат. Кіріс туралы анықтама қажет емес.',
    faqList: [
      {
        q: '100% төлемде қандай жеңілдік алуға болады?',
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
        q: 'Үй тапсырылғанға дейін пәтерді қайта сатуға бола ма?',
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
        standardPrice: '$61 026',
        cashPrice: 'от $57 500',
        saving: '$3 500 дейін үнемдеу',
        savingKgs: '≈ 306 000 сом пайда',
        benefit: 'Толық дизайн-жобаның құнын жабады',
        badge: 'Бішкек орталығы',
        slug: 'madina-residence',
        waText: 'Сәлеметсіз бе! ЖК Madina Residence кешеніндегі 100% төлем жеңілдігі туралы ақпарат жібересіз бе?',
      },
      {
        complex: 'ЖД Айкол +',
        classType: 'Комфорт+ (Көк-Жар)',
        area: '42.00 м²',
        standardPrice: '$46 200',
        cashPrice: 'от $43 200',
        saving: '$3 000 дейін үнемдеу',
        savingKgs: '≈ 262 000 сом пайда',
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
        desc: 'Шаршы метрге ең төменгі бағаны аласыз. Үнемделген қаржыны жөндеуге немесе жиһазға жұмсауға болады.',
      },
      {
        iconType: 'crown',
        title: 'Көріністі қабаттарды басымдықпен таңдау',
        desc: 'Үздік жоспарларға, жоғарғы қабаттарға және Ала-Тоо тауларына қарайтын панорамаға ерте қолжетімділік.',
      },
      {
        iconType: 'flash',
        title: '24 сағатта ДДУ-ны жедел тіркеу',
        desc: 'Құрылыс салушының заңгерлері тарапынан толық заңгерлік сүйемелдеу. Мемлекеттік органдарда кезексіз тіркеу.',
      },
      {
        iconType: 'trending',
        title: 'Жоғары инвестициялық табыстылық (ROI)',
        desc: 'Құрылыс кезеңінде толық бағасына сатып алу үй тапсырылғанға дейін 25–35% көлемінде капитал өсімін қамтамасыз етеді.',
      },
    ],
    investBadge: 'Бішкек жылжымайтын мүлкіне инвестиция',
    investTitle: 'Нысан тапсырылғанға дейін капиталдың 25%-дан 35%-ға дейін өсуі',
    investDesc: 'Бастапқы кезеңде пәтерді 100% төлеммен сатып алу — Қырғызстандағы ең табысты әрі қауіпсіз инвестициялық құрал.',
    investStat1Val: '+25–35%',
    investStat1Label: 'Құрылыс кезіндегі капиталдандыру',
    investStat2Val: '8–11%',
    investStat2Label: 'Жалға беруден жылдық табыс',
    investStat3Val: 'Цессия',
    investStat3Label: 'Үй тапсырылғанға дейін оңай сату',
    stepsBadge: 'Жылдам және заңды',
    stepsTitle: 'Баспанаға қол жеткізудің 4 қадамы',
    steps: [
      {
        num: '01',
        title: 'Видовой пәтерді таңдау',
        desc: 'Сайттан жоспарларды көресіз немесе 3D-макеттен таңдау үшін сату кеңсесіне келесіз.',
      },
      {
        num: '02',
        title: 'Арнайы бағаны бекіту',
        desc: 'Басшылықпен жеңілдікті келісіп, таңдалған пәтерді брондаймыз.',
      },
      {
        num: '03',
        title: 'ДДУ-ға қол қою',
        desc: 'Барлық тармақтарды түсіндіре отырып, 40 минут ішінде ресми ДДУ жасаймыз.',
      },
      {
        num: '04',
        title: 'Төлем және құжаттарды алу',
        desc: 'Касса арқылы немесе аударыммен төлеп, барлық қаржылық чектерді аласыз.',
      },
    ],
  },
  uk: {
    pageTitle: '100% розрахунок',
    heroTitle: 'МАКСИМАЛЬНА ВИГОДА ТА ЗНИЖКИ ПРИ 100% ОПЛАТІ',
    heroSubtitle: 'Найвигідніший спосіб придбання нерухомості від забудовника EL ORDO GROUP. Зафіксуйте мінімальну ціну за квадратний метр, отримайте пріоритет у виборі планувань та оформіть ДДУ за 24 години.',
    noticeText: 'При одноразовій повній оплаті квартири компанія EL ORDO GROUP надає максимальний індивідуальний дисконт. Ви заощаджуєте значну суму, стаєте повноправним власником без боргових зобов\'язань та захищаєте капітал від інфляції.',
    blockTitle: 'УМОВИ ТА ПЕРЕВАГИ ПОВНОГО РОЗРАХУНКУ',
    descriptionText: 'Одноразовий розрахунок вартості квартири одразу після підписання Договору пайової участі (ДДУ). Оплата готівкою через касу компанії або безготівковим банківським переказом. Пріоритетне бронювання видових поверхів та фіксована ціна метра.',
    documentsText: 'Паспорт громадянина. Для іноземців — паспорт із нотаріальним перекладом. Довідки про доходи не потрібні.',
    faqList: [
      {
        q: 'Який розмір знижки можна отримати при 100% оплаті?',
        a: 'Розмір знижки залежить від обраного ЖК, площі та стадії будівництва. Економія становить від $2 500 до $10 000+ порівняно з базовою ціною.',
      },
      {
        q: 'В якій валюті здійснюються розрахунки?',
        a: 'Усі офіційні розрахунки здійснюються в національній валюті (сом) за узгодженим курсом або через банк.',
      },
      {
        q: 'Як оплатити покупцям з-за кордону?',
        a: 'Надаємо банківські реквізити для SWIFT-переказу, або угоду може провести довірена особа за довіреністю.',
      },
      {
        q: 'Чи видаються офіційні фінансові документи?',
        a: 'Обов\'язково. Банківське платіжне доручення або касовий ордер та довідка про 100% закриття зобов\'язань.',
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
        waText: 'Доброго дня! Цікавить розмір знижки при 100% оплаті в ЖК Abu Dhabi.',
      },
      {
        complex: 'ЖК Madina Residence',
        classType: 'Бізнес-клас',
        area: '43.59 м²',
        standardPrice: '$61 026',
        cashPrice: 'от $57 500',
        saving: 'Економія до $3 500',
        savingKgs: '≈ 306 000 сом вигоди',
        benefit: 'Покриває вартість повного дизайн-проєкту',
        badge: 'Центр Бішкека',
        slug: 'madina-residence',
        waText: 'Доброго дня! Хочу дізнатися розмір знижки при 100% оплаті в ЖК Madina Residence.',
      },
      {
        complex: 'ЖД Айкол +',
        classType: 'Комфорт+ (Кок-Жар)',
        area: '42.00 м²',
        standardPrice: '$46 200',
        cashPrice: 'от $43 200',
        saving: 'Економія до $3 000',
        savingKgs: '≈ 262 000 сом вигоди',
        benefit: 'Чиста економія бюджету сім\'ї',
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
        desc: 'Узгоджуємо розмір знижки та бронюємо квартиру.',
      },
      {
        num: '03',
        title: 'Підписання ДДУ',
        desc: 'Укладаємо офіційний договір за 40 хвилин.',
      },
      {
        num: '04',
        title: 'Оплата та отримання документів',
        desc: 'Вносите оплату через банк або касу з видачею чеків.',
      },
    ],
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
        standardPrice: '$81,642',
        cashPrice: 'from $76,690',
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
        area: '43.59 m²',
        standardPrice: '$61,026',
        cashPrice: 'from $57,500',
        saving: 'Save up to $3,500',
        savingKgs: '≈ 306,000 KGS benefit',
        benefit: 'Covers full professional interior design project',
        badge: 'Bishkek Center',
        slug: 'madina-residence',
        waText: 'Hello! Please provide the lump-sum discount details for Madina Residence and share available floor plans.',
      },
      {
        complex: 'Aykol + Club House',
        classType: 'Comfort+ (Kok-Jar)',
        area: '42.00 m²',
        standardPrice: '$46,200',
        cashPrice: 'from $43,200',
        saving: 'Save up to $3,000',
        savingKgs: '≈ 262,000 KGS benefit',
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
    investStat2Label: 'Annual rental yields',
    investStat3Val: 'Assignment',
    investStat3Label: 'Seamless resale before handover',
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
        desc: 'Sign the official Equity Participation Agreement in 40 minutes with comprehensive legal guidance.',
      },
      {
        num: '04',
        title: 'Complete Payment & Receive Deeds',
        desc: 'Transfer funds via wire or company cashier and receive official payment documentation.',
      },
    ],
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
        standardPrice: '$61 026',
        cashPrice: '从 $57 500 起',
        saving: '直省高达 $3 500',
        savingKgs: '≈ 306 000 索姆优惠',
        benefit: '全额覆盖专业室内高端精装设计全套费用',
        badge: '市政核心商务区',
        slug: 'madina-residence',
        waText: '您好！想咨询玛迪娜公馆一次性全款付款的特惠政策与销控表，请发送户型图纸。',
      },
      {
        complex: '艾科尔+ (Aykol +)',
        classType: '舒适+ (Kok-Jar麓区)',
        area: '42.00 м²',
        standardPrice: '$46 200',
        cashPrice: '从 $43 200 起',
        saving: '直省高达 $3 000',
        savingKgs: '≈ 262 000 索姆优惠',
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
        desc: '在专职法务陪同下40分钟内审阅并签署官方备案的正规购房合同。',
      },
      {
        num: '04',
        title: '支付房款并领取全套凭证',
        desc: '通过银行电汇或财务室缴费，当场领取完税凭据及100%全款结清公函。',
      },
    ],
  },
};

export default function FullPaymentPage() {
  const { locale } = useLanguage();
  const lang: Locale = (locale as Locale) || 'ru';
  const c = CONTENT[lang] || CONTENT.ru;

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
      {/* 1. КАРТОЧКИ РЕАЛЬНОЙ ЭКОНОМИИ */}
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
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(item.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
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

      {/* 2. ПРИВИЛЕГИИ 100% ПОКУПАТЕЛЯ */}
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

      {/* 3. ИНВЕСТИЦИОННЫЙ ПОТЕНЦИАЛ */}
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

      {/* 4. ПОШАГОВЫЙ ПРОЦЕСС ОФОРМЛЕНИЯ */}
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