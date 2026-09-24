'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import PaymentLayout from '@/components/PaymentLayout';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { exportPdfQuote } from '@/lib/exportPdfQuote';
import { trackWhatsAppClick, trackLeadSubmit } from '@/lib/analytics';
import { getStoredUtm } from '@/lib/utm';
import {
  IconWhatsApp,
  IconArrowRight,
  IconShieldCheck,
} from '@/components/Icons';

interface InstallmentContent {
  pageTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  noticeText: string;
  blockTitle: string;
  descriptionText: string;
  documentsText: string;
  faqList: { q: string; a: string }[];
  examplesBadge: string;
  examplesTitle: string;
  examplesSubtitle: string;
  examples: {
    complex: string;
    type: string;
    area: string;
    priceM2: string;
    totalPrice: string;
    downPayment: string;
    downPaymentKgs: string;
    monthly: string;
    monthlyKgs: string;
    term: string;
    slug: string;
    badge?: string;
    waText: string;
  }[];
  totalPriceLabel: string;
  downPaymentLabel: string;
  monthlyLabel: string;
  perMonthSuffix: string;
  bookBtn: string;
  aboutBtn: string;
  tableBadge: string;
  tableTitle: string;
  tableSubtitle: string;
  colCriteria: string;
  colElOrdo: string;
  colBank: string;
  row1Criteria: string;
  row1ElOrdo: string;
  row1Bank: string;
  row2Criteria: string;
  row2ElOrdo: string;
  row2Bank: string;
  row3Criteria: string;
  row3ElOrdo: string;
  row3Bank: string;
  row4Criteria: string;
  row4ElOrdo: string;
  row4Bank: string;
  row5Criteria: string;
  row5ElOrdo: string;
  row5Bank: string;
  row6Criteria: string;
  row6ElOrdo: string;
  row6Bank: string;
  stepsBadge: string;
  stepsTitle: string;
  steps: { step: string; title: string; desc: string }[];
}

interface ScheduleItem {
  num: number;
  period: string;
  paymentUsd: number;
  paymentKgs: number;
  balanceUsd: number;
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

const CONTENT: Record<Locale, InstallmentContent> = {
  ru: {
    pageTitle: 'Рассрочка 0%',
    heroTitle: 'КВАРТИРЫ В РАССРОЧКУ 0% БЕЗ УЧАСТИЯ БАНКА',
    heroSubtitle: 'Комфортный вход в сделку напрямую от застройщика EL ORDO GROUP. Индивидуальный график платежей на срок до 36 месяцев без процентов, скрытых комиссий и справок о доходах.',
    noticeText: 'Внутренняя рассрочка от застройщика позволяет приобрести квартиру без банковских переплат и кредитных проверок. Вы выплачиваете только фактическую стоимость недвижимости равными долями в процессе строительства.',
    blockTitle: 'ДЕТАЛИ И ПРЕИМУЩЕСТВА РАССРОЧКИ',
    descriptionText: 'Первоначальный взнос составляет от 20% до 30% от общей стоимости квартиры. Остаток распределяется равными долями на срок до 36 месяцев. График выплат согласовывается индивидуально: ежемесячно, поквартально (раз в 3 месяца) или с учетом сезонных поступлений вашего бизнеса. Переплата составляет 0%.',
    documentsText: 'Для заключения Договора долевого участия (ДДУ) требуется исключительно паспорт гражданина (ID-карта или загранпаспорт). Справки с места работы о подтверждении доходов и поручители не требуются.',
    faqList: [
      { q: 'Фиксируется ли стоимость квадратного метра в договоре?', a: 'Да. Стоимость квадратного метра фиксируется в официальном Договоре долевого участия (ДДУ) в момент подписания и остается неизменной на протяжении всего срока выплат.' },
      { q: 'Нужен ли залог или поручители?', a: 'Нет, поручители и сторонние залоги не требуются. Обеспечением обязательств выступает сама квартира.' },
      { q: 'Можно ли погасить рассрочку досрочно?', a: 'Да. Вы можете закрыть остаток в любой момент без скрытых комиссий и штрафов.' },
      { q: 'Можно ли использовать автомобиль как первоначальный взнос?', a: 'Да, в компании действует программа Trade-in с экспресс-оценкой авто за 24 часа.' },
      { q: 'Как юридически защищен покупатель?', a: 'С каждым дольщиком заключается официальный ДДУ с обязательной госрегистрацией.' },
      { q: 'Какой минимальный первоначальный взнос?', a: 'Минимальный первоначальный взнос начинается от 20%.' },
    ],
    examplesBadge: 'Наглядные расчеты',
    examplesTitle: 'Примеры платежей по квартирам',
    examplesSubtitle: 'Реальные расчеты для 1-комнатных квартир при первоначальном взносе 30% на 36 месяцев',
    examples: [
      {
        complex: 'ЖК Abu Dhabi',
        type: '1-комнатная квартира',
        area: '49.48 м²',
        priceM2: 'от 1 650 $',
        totalPrice: '$81 642',
        downPayment: '$24 492 (30%)',
        downPaymentKgs: '≈ 2 143 000 сом',
        monthly: '$1 587',
        monthlyKgs: '≈ 138 800 сом',
        term: '36 месяцев',
        slug: 'abu-dhabi',
        waText: 'Здравствуйте! Интересует расчет рассрочки на 1-комн. (49.48 м²) в ЖК Abu Dhabi с платежом $1587/мес. Есть ли свободные этажи?',
      },
      {
        complex: 'ЖК Madina Residence',
        type: '1-комнатная квартира',
        area: '43.59 м²',
        priceM2: 'от 1 500 $',
        totalPrice: '$65 385',
        downPayment: '$19 615 (30%)',
        downPaymentKgs: '≈ 1 716 000 сом',
        monthly: '$1 271',
        monthlyKgs: '≈ 111 200 сом',
        term: '36 месяцев',
        slug: 'madina-residence',
        badge: 'Хит продаж',
        waText: 'Здравствуйте! Интересует расчет рассрочки на 1-комн. (43.59 м²) в ЖК Madina Residence с платежом $1271/мес. Отправьте планировку.',
      },
      {
        complex: 'ЖД Айкол +',
        type: '1-комнатная квартира',
        area: '42.00 м²',
        priceM2: 'от 1 200 $',
        totalPrice: '$50 400',
        downPayment: '$15 120 (30%)',
        downPaymentKgs: '≈ 1 323 000 сом',
        monthly: '$980',
        monthlyKgs: '≈ 85 700 сом',
        term: '36 месяцев',
        slug: 'ajkol-plus',
        badge: 'Эко-предгорье',
        waText: 'Здравствуйте! Интересует расчет рассрочки на 1-комн. в ЖД Айкол+ (Кок-Жар) с платежом $980/мес. Подскажите наличие.',
      },
    ],
    totalPriceLabel: 'Общая стоимость:',
    downPaymentLabel: 'Первый взнос:',
    monthlyLabel: 'Платеж в месяц (0% переплат):',
    perMonthSuffix: '/ мес.',
    bookBtn: 'Забронировать в WhatsApp',
    aboutBtn: 'О комплексе',
    tableBadge: 'Финансовая выгода',
    tableTitle: 'Рассрочка EL ORDO или Ипотека в банке?',
    tableSubtitle: 'Сравнение условий приобретения жилья напрямую от застройщика и через коммерческий банк',
    colCriteria: 'Критерий',
    colElOrdo: 'Рассрочка EL ORDO',
    colBank: 'Ипотека в банке',
    row1Criteria: 'Процентная переплата',
    row1ElOrdo: '0% (Переплаты нет)',
    row1Bank: 'от 14% до 18% годовых',
    row2Criteria: 'Сумма переплаты за 3 года',
    row2ElOrdo: '$0 сом',
    row2Bank: 'от $18 000 до $35 000+',
    row3Criteria: 'Справка о доходах / Налоги',
    row3ElOrdo: 'Не требуется',
    row3Bank: 'Обязательно с официального места',
    row4Criteria: 'Дополнительные страховки',
    row4ElOrdo: 'Отсутствуют',
    row4Bank: 'Страхование жизни и объекта каждый год',
    row5Criteria: 'Пакет документов',
    row5ElOrdo: 'Только паспорт',
    row5Bank: 'Пакет из 8+ справок, поручители',
    row6Criteria: 'Срок оформления',
    row6ElOrdo: 'В день обращения (30 минут)',
    row6Bank: 'от 2 до 4 недель рассмотрения',
    stepsBadge: 'Прозрачная сделка',
    stepsTitle: '4 простых шага к вашей квартире',
    steps: [
      { step: '01', title: 'Выбор планировки и этажа', desc: 'Выбираете квартиру в каталоге или приезжаете в офис продаж.' },
      { step: '02', title: 'Согласование графика 0%', desc: 'Определяем размер первоначального взноса и график выплат.' },
      { step: '03', title: 'Подписание ДДУ по паспорту', desc: 'Заключаем официальный Договор долевого участия за 30 минут.' },
      { step: '04', title: 'Госрегистрация и получение ключей', desc: 'Договор регистрируется в госорганах КР. Получаете ключи и техпаспорт.' },
    ],
  },
  kg: {
    pageTitle: '0% Бөлүп төлөө',
    heroTitle: 'БАНК КАТЫШУУСУЗ 0% БӨЛҮП ТӨЛӨӨ БАТИРЛЕРИ',
    heroSubtitle: 'EL ORDO GROUP куруучусунан түз келишимге ыңгайлуу кирүү. 36 айга чейин пайыздарсыз, комиссияларсыз жеке төлөм графиги.',
    noticeText: 'Куруучунун ички бөлүп төлөөсү батирди банктык ашыкча төлөмдөрсүз сатып алууга мүмкүндүк берет.',
    blockTitle: 'БӨЛҮП ТӨЛӨӨНҮН ДЕТАЛДАРЫ ЖАНА АРТЫКЧЫЛЫКТАРЫ',
    descriptionText: 'Баштапкы төлөм 20%дан 30%га чейин. Калган сумма 36 айга чейин бөлүштүрүлөт. Ашыкча төлөм 0%.',
    documentsText: 'Үлүштүк катышуу келишимин (ДДУ) түзүү үчүн жарандын паспорту гана талап кылынат.',
    faqList: [
      { q: 'Квадрат метрдин баасы келишимде бекитилеби?', a: 'Ооба, расмий ДДУда толук бекитилет.' },
      { q: 'Күрөө же кепилдер керекпи?', a: 'Жок, кепилдер талап кылынбайт.' },
      { q: 'Мөөнөтүнөн мурда жабууга болобу?', a: 'Ооба, эч кандай айып пулсуз жабууга болот.' },
      { q: 'Унааны колдонсо болобу?', a: 'Ооба, Trade-in программасы иштейт.' },
      { q: 'Юридикалык коргоо барбы?', a: 'Мамкаттоодон өтүүчү ДДУ түзүлөт.' },
      { q: 'Минималдуу төлөм канча?', a: '20%дан башталат.' },
    ],
    examplesBadge: 'Көрсөтмөлүү эсептөөлөр',
    examplesTitle: 'Батирлер боюнча төлөм мисалдары',
    examplesSubtitle: '36 айга 30% баштапкы төлөм менен эсептөөлөр',
    examples: [
      {
        complex: 'ЖК Abu Dhabi',
        type: '1 бөлмөлүү батир',
        area: '49.48 м²',
        priceM2: '1 650 $ баштап',
        totalPrice: '$81 642',
        downPayment: '$24 492 (30%)',
        downPaymentKgs: '≈ 2 143 000 сом',
        monthly: '$1 587',
        monthlyKgs: '≈ 138 800 сом',
        term: '36 ай',
        slug: 'abu-dhabi',
        waText: 'Саламатсызбы! ЖК Abu Dhabi боюнча 1 бөлмөлүү батирдин бөлүп төлөө эсебин алгым келет.',
      },
      {
        complex: 'ЖК Madina Residence',
        type: '1 бөлмөлүү батир',
        area: '43.59 м²',
        priceM2: '1 500 $ баштап',
        totalPrice: '$65 385',
        downPayment: '$19 615 (30%)',
        downPaymentKgs: '≈ 1 716 000 сом',
        monthly: '$1 271',
        monthlyKgs: '≈ 111 200 сом',
        term: '36 ай',
        slug: 'madina-residence',
        badge: 'Хит сатуу',
        waText: 'Саламатсызбы! ЖК Madina Residence боюнча 1 бөлмөлүү батирдин бөлүп төлөө эсебин жөнөтүңүзчү.',
      },
      {
        complex: 'ЖД Айкол +',
        type: '1 бөлмөлүү батир',
        area: '42.00 м²',
        priceM2: '1 200 $ баштап',
        totalPrice: '$50 400',
        downPayment: '$15 120 (30%)',
        downPaymentKgs: '≈ 1 323 000 сом',
        monthly: '$980',
        monthlyKgs: '≈ 85 700 сом',
        term: '36 ай',
        slug: 'ajkol-plus',
        badge: 'Эко-предгорье',
        waText: 'Саламатсызбы! ЖД Айкол+ боюнча 1 бөлмөлүү батирдин бөлүп төлөө эсебин тактап бересизби?',
      },
    ],
    totalPriceLabel: 'Жалпы наркы:',
    downPaymentLabel: 'Баштапкы төлөм:',
    monthlyLabel: 'Ай сайын төлөм (0% ашыкча төлөмсүз):',
    perMonthSuffix: '/ айына',
    bookBtn: 'WhatsApp аркылуу брондоо',
    aboutBtn: 'Комплекс тууралуу',
    tableBadge: 'Каржылык пайда',
    tableTitle: 'EL ORDO бөлүп төлөөсү же Банк ипотекасыбы?',
    tableSubtitle: 'Түздөн-түз куруучудан жана коммерциялык банк аркылуу батир сатып алуу шарттарын салыштыруу',
    colCriteria: 'Критерий',
    colElOrdo: 'EL ORDO бөлүп төлөө',
    colBank: 'Банк ипотекасы',
    row1Criteria: 'Пайыздык ашыкча төлөм',
    row1ElOrdo: '0% (Ашыкча төлөм жок)',
    row1Bank: 'жылдык 14%дан 18%га чейин',
    row2Criteria: '3 жылдагы ашыкча сумма',
    row2ElOrdo: '$0 сом',
    row2Bank: '$18 000ден $35 000+ чейин',
    row3Criteria: 'Киреше маалымкаты',
    row3ElOrdo: 'Талап кылынбайт',
    row3Bank: 'Расмий жумуш ордунан милдеттүү',
    row4Criteria: 'Кошумча камсыздандыруу',
    row4ElOrdo: 'Жок',
    row4Bank: 'Жыл сайын камсыздандыруу',
    row5Criteria: 'Документтердин топтому',
    row5ElOrdo: 'Паспорт гана',
    row5Bank: '8+ маалымкаттар, кепилдер',
    row6Criteria: 'Тариздөө мөөнөтү',
    row6ElOrdo: 'Кайрылган күнү (30 мүнөт)',
    row6Bank: '2ден 4 жумага чейин',
    stepsBadge: 'Ачык бүтүм',
    stepsTitle: 'Батириңизге жетүүчү 4 жөнөкөй кадам',
    steps: [
      { step: '01', title: 'Пландоо жана кабатты тандоо', desc: 'Каталогдон батир тандайсыз.' },
      { step: '02', title: '0% графикти макулдашуу', desc: 'Баштапкы төлөмдү жана графикти аныктайбыз.' },
      { step: '03', title: 'Паспорт менен ДДУга кол коюу', desc: '30 мүнөттүн ичинде расмий ДДУ түзөбүз.' },
      { step: '04', title: 'Мамкаттоо жана ачкычтарды алуу', desc: 'Келишим катталып, ачкычтарды аласыз.' },
    ],
  },
  kz: {
    pageTitle: '0% Бөліп төлеу',
    heroTitle: 'БАНК ҚАТЫСУЫНСЫЗ 0% БӨЛІП ТӨЛЕУ ПӘТЕРЛЕРІ',
    heroSubtitle: 'EL ORDO GROUP құрылыс салушысынан 36 айға дейін пайыздарсыз төлем кестесі.',
    noticeText: 'Құрылыс салушының ішкі бөліп төлеуі пәтерді банктік артық төлемдерсіз сатып алуға мүмкіндік береді.',
    blockTitle: 'БӨЛІП ТӨЛЕУДІҢ МӘН-ЖАЙЫ ЖӘНЕ АРТЫҚШЫЛЫҚТАРЫ',
    descriptionText: 'Бастапқы жарна 20%-дан 30%-ға дейін. Қалдық сома 36 айға дейін бөлінеді. Артық төлем 0%.',
    documentsText: 'Тек төлқұжат қажет.',
    faqList: [
      { q: 'Баға бекітіле ме?', a: 'Иә, ресми ДДУ шартында бекітіледі.' },
      { q: 'Кепілгерлер қажет пе?', a: 'Жоқ, талап етілмейді.' },
      { q: 'Мерзімінен бұрын жабуға бола ма?', a: 'Иә, айыппұлсыз.' },
      { q: 'Автокөлікті пайдалануға бола ма?', a: 'Иә, Trade-in арқылы.' },
      { q: 'Заңдық кепілдік қандай?', a: 'Мемтіркеуден өтетін ДДУ жасалады.' },
      { q: 'Ең төменгі бастапқы жарна қанша?', a: '20%-дан басталады.' },
    ],
    examplesBadge: 'Көрнекі есептеулер',
    examplesTitle: 'Пәтерлер бойынша төлем мысалдары',
    examplesSubtitle: '36 айға 30% бастапқы жарнамен есептеулер',
    examples: [
      { complex: 'ЖК Abu Dhabi', type: '1 бөлмелі пәтер', area: '49.48 м²', priceM2: '1 650 $ бастап', totalPrice: '$81 642', downPayment: '$24 492 (30%)', downPaymentKgs: '≈ 2 143 000 сом', monthly: '$1 587', monthlyKgs: '≈ 138 800 сом', term: '36 ай', slug: 'abu-dhabi', waText: 'Сәлеметсіз бе! ЖК Abu Dhabi бойынша бөліп төлеу есебін алғым келеді.' },
      { complex: 'ЖК Madina Residence', type: '1 бөлмелі пәтер', area: '43.59 м²', priceM2: '1 500 $ бастап', totalPrice: '$65 385', downPayment: '$19 615 (30%)', downPaymentKgs: '≈ 1 716 000 сом', monthly: '$1 271', monthlyKgs: '≈ 111 200 сом', term: '36 ай', slug: 'madina-residence', badge: 'Хит сатылым', waText: 'Сәлеметсіз бе! ЖК Madina Residence бойынша бөліп төлеу есебін жіберіңізші.' },
      { complex: 'ЖД Айкол +', type: '1 бөлмелі пәтер', area: '42.00 м²', priceM2: '1 200 $ бастап', totalPrice: '$50 400', downPayment: '$15 120 (30%)', downPaymentKgs: '≈ 1 323 000 сом', monthly: '$980', monthlyKgs: '≈ 85 700 сом', term: '36 ай', slug: 'ajkol-plus', badge: 'Эко-бөктер', waText: 'Сәлеметсіз бе! ЖД Айкол+ бойынша бөліп төлеу шартын білгім келеді.' },
    ],
    totalPriceLabel: 'Жалпы құны:',
    downPaymentLabel: 'Бастапқы жарна:',
    monthlyLabel: 'Ай сайынғы төлем (0% артық төлемсіз):',
    perMonthSuffix: '/ айына',
    bookBtn: 'WhatsApp арқылы брондау',
    aboutBtn: 'Кешен туралы',
    tableBadge: 'Қаржылық пайда',
    tableTitle: 'EL ORDO бөлүп төлеуі немесе Банк ипотекасыбы?',
    tableSubtitle: 'Тікелей құрылыс салушыдан және банк арқылы баспана сатып алу шарттарын салыстыру',
    colCriteria: 'Критерий',
    colElOrdo: 'EL ORDO бөлүп төлеу',
    colBank: 'Банк ипотекасы',
    row1Criteria: 'Пайыздық артық төлем',
    row1ElOrdo: '0% (Артық төлем жок)',
    row1Bank: 'жылдық 14%-дан 18%-ға дейін',
    row2Criteria: '3 жылдағы артық сома',
    row2ElOrdo: '$0 сом',
    row2Bank: '$18 000-нан $35 000+ дейін',
    row3Criteria: 'Киреше туралы анықтама',
    row3ElOrdo: 'Талап етілмейді',
    row3Bank: 'Ресми жұмыс орнынан міндетті',
    row4Criteria: 'Қосымша сақтандыру',
    row4ElOrdo: 'Жоқ',
    row4Bank: 'Жыл сайын сақтандыру',
    row5Criteria: 'Құжаттар топтамасы',
    row5ElOrdo: 'Тек төлқұжат',
    row5Bank: '8+ анықтама, кепілгерлер',
    row6Criteria: 'Ресімдеу мерзімі',
    row6ElOrdo: 'Өтініш берген күні (30 минут)',
    row6Bank: '2-ден 4 аптаға дейін',
    stepsBadge: 'Ачык мәміле',
    stepsTitle: 'Батириңизге жетүүчү 4 жөнөкөй кадам',
    steps: [
      { step: '01', title: 'Жоспарлау мен қабатты таңдау', desc: 'Каталогтан пәтер таңдайсыз.' },
      { step: '02', title: '0% кестені келісу', desc: 'Бастапқы жарнаны және кестені анықтаймыз.' },
      { step: '03', title: 'Төлқұжатпен ДДУ-ға қол қою', desc: '30 минут ішінде рәсімдейміз.' },
      { step: '04', title: 'Мемтіркеу және кілттерді алу', desc: 'Шарт мемлекеттік органдарда тіркеледі.' },
    ],
  },
  uk: {
    pageTitle: 'Розстрочка 0%',
    heroTitle: 'КВАРТИРИ В РОЗСТРОЧКУ 0% БЕЗ УЧАСТІ БАНКУ',
    heroSubtitle: 'Комфортний вхід в угоду від забудовника EL ORDO GROUP на термін до 36 місяців без відсотків.',
    noticeText: 'Внутрішня розстрочка від забудовника дозволяє придбати квартиру без банківських переплат.',
    blockTitle: 'ДЕТАЛІ ТА ПЕРЕВАГИ РОЗСТРОЧКИ',
    descriptionText: 'Перший внесок від 20% до 30%. Залишок на термін до 36 місяців. Переплата 0%.',
    documentsText: 'Потрібен лише паспорт громадянина.',
    faqList: [
      { q: 'Чи фіксується вартість у договорі?', a: 'Так, фіксується в офіційному ДДУ.' },
      { q: 'Чи потрібна застава?', a: 'Ні, поручителі не потрібні.' },
      { q: 'Чи можна погасити достроково?', a: 'Так, без штрафів.' },
      { q: 'Чи можна використати авто?', a: 'Так, за програмою Trade-in.' },
      { q: 'Як захищений покупець?', a: 'Укладається ДДУ з держреєстрацією.' },
      { q: 'Який мінімальний внесок?', a: 'Від 20%.' },
    ],
    examplesBadge: 'Наочні розрахунки',
    examplesTitle: 'Приклади платежів по квартирах',
    examplesSubtitle: 'Реальні розрахунки для 1-кімнатних квартир при першому внеску 30% на 36 місяців',
    examples: [
      { complex: 'ЖК Abu Dhabi', type: '1-кімнатна квартира', area: '49.48 м²', priceM2: 'від 1 650 $', totalPrice: '$81 642', downPayment: '$24 492 (30%)', downPaymentKgs: '≈ 2 143 000 сом', monthly: '$1 587', monthlyKgs: '≈ 138 800 сом', term: '36 місяців', slug: 'abu-dhabi', waText: 'Доброго дня! Цікавить розрахунок розстрочки в ЖК Abu Dhabi.' },
      { complex: 'ЖК Madina Residence', type: '1-кімнатна квартира', area: '43.59 м²', priceM2: 'від 1 500 $', totalPrice: '$65 385', downPayment: '$19 615 (30%)', downPaymentKgs: '≈ 1 716 000 сом', monthly: '$1 271', monthlyKgs: '≈ 111 200 сом', term: '36 місяців', slug: 'madina-residence', badge: 'Хіт продажів', waText: 'Доброго дня! Цікавить розрахунок розстрочки в ЖК Madina Residence.' },
      { complex: 'ЖД Айкол +', type: '1-кімнатна квартира', area: '42.00 м²', priceM2: 'від 1 200 $', totalPrice: '$50 400', downPayment: '$15 120 (30%)', downPaymentKgs: '≈ 1 323 000 сом', monthly: '$980', monthlyKgs: '≈ 85 700 сом', term: '36 місяців', slug: 'ajkol-plus', badge: 'Еко-передгір\'я', waText: 'Доброго дня! Цікавить розрахунок розстрочки в ЖД Айкол+.' },
    ],
    totalPriceLabel: 'Загальна вартість:',
    downPaymentLabel: 'Перший внесок:',
    monthlyLabel: 'Платіж на місяць (0% переплат):',
    perMonthSuffix: '/ міс.',
    bookBtn: 'Забронювати у WhatsApp',
    aboutBtn: 'Про комплекс',
    tableBadge: 'Фінансова вигода',
    tableTitle: 'Розстрочка EL ORDO чи Іпотека в банку?',
    tableSubtitle: 'Порівняння умов придбання житла безпосередньо від забудовника та через комерційний банк',
    colCriteria: 'Критерій',
    colElOrdo: 'Розстрочка EL ORDO',
    colBank: 'Іпотека в банку',
    row1Criteria: 'Відсоткова переплата',
    row1ElOrdo: '0% (Переплати немає)',
    row1Bank: 'від 14% до 18% річних',
    row2Criteria: 'Сума переплати за 3 роки',
    row2ElOrdo: '$0 сом',
    row2Bank: 'від $18 000 до $35 000+',
    row3Criteria: 'Довідка про доходи',
    row3ElOrdo: 'Не вимагається',
    row3Bank: 'Обов\'язково з офіційного місця',
    row4Criteria: 'Додаткові страховки',
    row4ElOrdo: 'Відсутні',
    row4Bank: 'Щорічне страхування',
    row5Criteria: 'Пакет документів',
    row5ElOrdo: 'Тільки паспорт',
    row5Bank: '8+ довідок, поручителі',
    row6Criteria: 'Термін оформлення',
    row6ElOrdo: 'У день звернення (30 хвилин)',
    row6Bank: 'від 2 до 4 тижнів',
    stepsBadge: 'Прозора угода',
    stepsTitle: '4 прості кроки до вашої квартири',
    steps: [
      { step: '01', title: 'Вибір планування', desc: 'Обираєте квартиру в каталозі.' },
      { step: '02', title: 'Узгодження графіка 0%', desc: 'Визначаємо розмір першого внеску.' },
      { step: '03', title: 'Підписання ДДУ', desc: 'Укладаємо офіційний договір за 30 хвилин.' },
      { step: '04', title: 'Отримання ключів', desc: 'Отримуєте ключі та техпаспорт.' },
    ],
  },
  en: {
    pageTitle: '0% Installment',
    heroTitle: '0% APARTMENT INSTALLMENT PLANS WITHOUT BANKS',
    heroSubtitle: 'Direct entry into property ownership from developer EL ORDO GROUP up to 36 months with zero interest.',
    noticeText: 'Developer internal installment allows purchasing an apartment without bank surcharges.',
    blockTitle: 'INSTALLMENT DETAILS & ADVANTAGES',
    descriptionText: 'Down payment ranges from 20% to 30%. Balance split up to 36 months with 0% interest.',
    documentsText: 'Only a passport is required.',
    faqList: [
      { q: 'Is the price locked in the contract?', a: 'Yes, locked upon signing the official DDU.' },
      { q: 'Is collateral needed?', a: 'No, no third-party collateral needed.' },
      { q: 'Can I pay off early?', a: 'Yes, without fees.' },
      { q: 'Can I use a vehicle?', a: 'Yes, via Trade-in.' },
      { q: 'How is buyer protected?', a: 'Registered DDU under state law.' },
      { q: 'What is the minimum deposit?', a: 'From 20%.' },
    ],
    examplesBadge: 'Transparent Estimates',
    examplesTitle: 'Apartment Payment Examples',
    examplesSubtitle: 'Real payment breakdowns for 1-room apartments with 30% down payment over 36 months',
    examples: [
      { complex: 'Abu Dhabi RC', type: '1-Room Apartment', area: '49.48 m²', priceM2: 'from $1,650', totalPrice: '$81,642', downPayment: '$24,492 (30%)', downPaymentKgs: '≈ 2,143,000 KGS', monthly: '$1,587', monthlyKgs: '≈ 138,800 KGS', term: '36 months', slug: 'abu-dhabi', waText: 'Hello! Interested in installment calculation for Abu Dhabi RC.' },
      { complex: 'Madina Residence', type: '1-Room Apartment', area: '43.59 m²', priceM2: 'from $1,500', totalPrice: '$65,385', downPayment: '$19,615 (30%)', downPaymentKgs: '≈ 1,716,000 KGS', monthly: '$1,271', monthlyKgs: '≈ 111,200 KGS', term: '36 months', slug: 'madina-residence', badge: 'Bestseller', waText: 'Hello! Interested in installment calculation for Madina Residence.' },
      { complex: 'Aykol + Club House', type: '1-Room Apartment', area: '42.00 m²', priceM2: 'from $1,200', totalPrice: '$50,400', downPayment: '$15,120 (30%)', downPaymentKgs: '≈ 1,323,000 KGS', monthly: '$980', monthlyKgs: '≈ 85,700 KGS', term: '36 months', slug: 'ajkol-plus', badge: 'Eco Foothills', waText: 'Hello! Inquiring about installment terms for Aykol+.' },
    ],
    totalPriceLabel: 'Total Price:',
    downPaymentLabel: 'Down Payment:',
    monthlyLabel: 'Monthly Payment (0% Interest):',
    perMonthSuffix: '/ mo.',
    bookBtn: 'Book via WhatsApp',
    aboutBtn: 'About Complex',
    tableBadge: 'Financial Advantage',
    tableTitle: 'EL ORDO Installment or Bank Mortgage?',
    tableSubtitle: 'Comparison of purchasing property directly from developer versus commercial banking mortgage',
    colCriteria: 'Criteria',
    colElOrdo: 'EL ORDO Installment',
    colBank: 'Bank Mortgage',
    row1Criteria: 'Interest Surcharge',
    row1ElOrdo: '0% (No Surcharges)',
    row1Bank: '14% to 18% per annum',
    row2Criteria: 'Overpayment over 3 years',
    row2ElOrdo: '$0',
    row2Bank: '$18,000 to $35,000+',
    row3Criteria: 'Proof of Income / Tax Papers',
    row3ElOrdo: 'Not required',
    row3Bank: 'Mandatory proof of official employment',
    row4Criteria: 'Mandatory Insurance',
    row4ElOrdo: 'None',
    row4Bank: 'Annual life & real estate insurance',
    row5Criteria: 'Document Package',
    row5ElOrdo: 'Passport only',
    row5Bank: '8+ certificates, co-signers',
    row6Criteria: 'Processing Time',
    row6ElOrdo: 'Same day (30 minutes)',
    row6Bank: '2 to 4 weeks review',
    stepsBadge: 'Transparent Process',
    stepsTitle: '4 Easy Steps to Your Apartment',
    steps: [
      { step: '01', title: 'Unit Selection', desc: 'Select an apartment in the catalog.' },
      { step: '02', title: '0% Schedule', desc: 'Agree on down payment and timeframe.' },
      { step: '03', title: 'Sign Agreement', desc: 'Execute official DDU in 30 minutes.' },
      { step: '04', title: 'Handover & Keys', desc: 'Receive property deeds upon completion.' },
    ],
  },
  zh: {
    pageTitle: '0% 免息分期',
    heroTitle: '无需银行介入 0% 零息置业分期方案',
    heroSubtitle: '由 EL ORDO GROUP 开发商直签购房，门槛亲民。支持最长36个月免息个性化还款。',
    noticeText: '开发商自营免息分期付款让您彻底摆脱银行高额利息和繁琐信贷审核。',
    blockTitle: '免息分期细则与优势',
    descriptionText: '首付仅需20%至30%，剩余款项最长36个月内均摊付清，实际利率为0%。',
    documentsText: '仅需出示个人有效身份证件，免收入流水证明。',
    faqList: [
      { q: '合同单价是否固定？', a: '是的，正式DDU合同签署即锁定。' },
      { q: '是否需要担保人？', a: '不需要额外担保。' },
      { q: '能否提前结清？', a: '可以随时提前还款，无违约金。' },
      { q: '能否置换现有车辆？', a: '支持 Trade-in 评估直接抵扣。' },
      { q: '权益如何保障？', a: '国家官方正规备案合同保障。' },
      { q: '最低首付比例是多少？', a: '20%起。' },
    ],
    examplesBadge: '真实测算参考',
    examplesTitle: '精选户型月供测算样例',
    examplesSubtitle: '按首付30%、分期36个月测算的1居室真实月供测算',
    examples: [
      { complex: '阿布扎比住宅区 (Abu Dhabi)', type: '精致一居室', area: '49.48 м²', priceM2: '1 650 $ 起', totalPrice: '$81 642', downPayment: '$24 492 (30%)', downPaymentKgs: '≈ 2 143 000 索姆', monthly: '$1 587', monthlyKgs: '≈ 138 800 索姆', term: '36个月', slug: 'abu-dhabi', waText: '您好！想了解阿布扎比一居室月供$1587分期房源。' },
      { complex: '玛迪娜公馆 (Madina Residence)', type: '商务一居室', area: '43.59 м²', priceM2: '1 500 $ 起', totalPrice: '$65 385', downPayment: '$19 615 (30%)', downPaymentKgs: '≈ 1 716 000 索姆', monthly: '$1 271', monthlyKgs: '≈ 111 200 索姆', term: '36个月', slug: 'madina-residence', badge: '热销户型', waText: '您好！想了解玛迪娜公馆一居室月供$1271分期房源。' },
      { complex: '艾科尔+ 精品洋房 (Aykol +)', type: '生态一居室', area: '42.00 м²', priceM2: '1 200 $ 起', totalPrice: '$50 400', downPayment: '$15 120 (30%)', downPaymentKgs: '≈ 1 323 000 索姆', monthly: '$980', monthlyKgs: '≈ 85 700 索姆', term: '36个月', slug: 'ajkol-plus', badge: '生态麓区', waText: '您好！想了解艾科尔+一居室月供$980分期房源。' },
    ],
    totalPriceLabel: '房屋总价:',
    downPaymentLabel: '首付款:',
    monthlyLabel: '每月还款金额（0%利息）:',
    perMonthSuffix: '/ 月',
    bookBtn: '在 WhatsApp 中预约锁定',
    aboutBtn: '了解楼盘详情',
    tableBadge: '财务优势对比',
    tableTitle: 'EL ORDO 免息分期 vs 银行按揭贷款',
    tableSubtitle: '开发商自营零利息分期与商业银行传统房贷全维度对比',
    colCriteria: '对比指标',
    colElOrdo: 'EL ORDO 免息分期',
    colBank: '商业银行贷款',
    row1Criteria: '贷款利息支出',
    row1ElOrdo: '0% (完全免息)',
    row1Bank: '年化 14% 至 18%',
    row2Criteria: '3年累计多付利息',
    row2ElOrdo: '$0 索姆',
    row2Bank: '$18 000 至 $35 000+ 美元',
    row3Criteria: '收入证明与纳税流水',
    row3ElOrdo: '无需提供',
    row3Bank: '必须提供正式单位纳税及收入流水',
    row4Criteria: '强制附加保险',
    row4ElOrdo: '无任何附加险',
    row4Bank: '每年强制缴纳人身与财产保险费',
    row5Criteria: '签约所需材料',
    row5ElOrdo: '仅需个人身份证件',
    row5Bank: '需提供8项以上证明文件及共同担保人',
    row6Criteria: '签约审批时效',
    row6ElOrdo: '即到即签 (约30分钟)',
    row6Bank: '需等待2至4周银行审核',
    stepsBadge: '透明置业流程',
    stepsTitle: '轻松入驻理想新居的4个步骤',
    steps: [
      { step: '01', title: '优选户型', desc: '在项目目录中甄选合适房源。' },
      { step: '02', title: '确认0%还款计划', desc: '定制首付额度与月供节奏。' },
      { step: '03', title: '凭身份证件签约', desc: '30分钟内高效签订正规国家备案合同。' },
      { step: '04', title: '交付钥匙', desc: '验收交付后直接领取钥匙与不动产红本。' },
    ],
  },
};

export default function InstallmentPage() {
  const { locale } = useLanguage();
  const lang: Locale = (locale as Locale) || 'ru';
  const c = CONTENT[lang] || CONTENT.ru;

  // 1. Состояние калькулятора
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(-1);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);

  const [apartmentPrice, setApartmentPrice] = useState<number>(65000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(19500);
  const [months, setMonths] = useState<number>(36);
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly'>('monthly');

  // Валюта отображения в карточке результата: USD ($) или KGS (сом)
  const [currencyMode, setCurrencyMode] = useState<'usd' | 'kgs'>('usd');

  const [usdRate, setUsdRate] = useState<number>(87.45);
  const [rateDate, setRateDate] = useState<string>('24.09.2026');
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

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

  // Выбор планировки из каталога
  const handleSelectCatalogApartment = (apt: typeof CATALOG_APARTMENTS[0], idx: number) => {
    setSelectedPlanIndex(idx);
    setApartmentPrice(apt.price);
    const newDown = Math.round((apt.price * downPaymentPercent) / 100);
    setDownPaymentAmount(newDown);
    setIsCatalogOpen(false);
  };

  const remainingAmount = Math.max(0, apartmentPrice - downPaymentAmount);
  const numberOfPayments = frequency === 'monthly' ? months : Math.max(1, Math.ceil(months / 3));
  const paymentPerPeriodUsd = numberOfPayments > 0 ? Math.round(remainingAmount / numberOfPayments) : 0;
  const paymentPerPeriodKgs = Math.round(paymentPerPeriodUsd * usdRate);

  const paymentSchedule = useMemo<ScheduleItem[]>(() => {
    const items: ScheduleItem[] = [];
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

  const handleDownloadPdf = () => {
    exportPdfQuote({
      apartmentPrice,
      downPaymentAmount,
      downPaymentPercent,
      months,
      frequency,
      paymentPerPeriodUsd,
      usdRate,
      rateDate,
      selectedApartment: null,
      paymentSchedule,
    });
  };
  const cleanWaNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';

  const handleFixWhatsApp = () => {
    const selectedTitle = selectedPlanIndex >= 0 ? CATALOG_APARTMENTS[selectedPlanIndex].title : 'Индивидуальный расчет';
    const complexName = selectedPlanIndex >= 0 ? CATALOG_APARTMENTS[selectedPlanIndex].complex : 'Квартира в EL ORDO GROUP';

    // 1. Отправка в CRM / Telegram
    try {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Клиент с калькулятора рассрочки',
          phone: 'Через WhatsApp',
          project: complexName,
          goal: `Рассрочка 0% (${months} мес.)`,
          budget: `$${apartmentPrice.toLocaleString('ru-RU')}`,
          rooms: selectedTitle,
          details: `Взнос: $${downPaymentAmount.toLocaleString('ru-RU')} (${downPaymentPercent}%) | Платеж: $${paymentPerPeriodUsd.toLocaleString('ru-RU')}/${frequency === 'monthly' ? 'мес' : 'кв'}`,
          comment: `Период: ${months} мес., график: ${frequency === 'monthly' ? 'ежемесячный' : 'поквартальный'}`,
          lang,
          source: 'InstallmentPage',
          utm: getStoredUtm(),
          createdAt: new Date().toISOString(),
        }),
      }).catch(() => {});
    } catch {}

    // 2. Трекинг аналитики
    trackWhatsAppClick('installment_calculator_fix', complexName);
    trackLeadSubmit('Рассрочка 0%', complexName);

    // 3. Открытие диалога WhatsApp
    const waText =
      `Здравствуйте! Рассчитал условия рассрочки 0% на сайте EL ORDO GROUP:\n\n` +
      `• Объект: ${complexName} (${selectedTitle})\n` +
      `• Стоимость квартиры: $${apartmentPrice.toLocaleString('ru-RU')} (~${Math.round(apartmentPrice * usdRate).toLocaleString('ru-RU')} сом)\n` +
      `• Первоначальный взнос: $${downPaymentAmount.toLocaleString('ru-RU')} (${downPaymentPercent}%)\n` +
      `• Срок рассрочки: ${months} месяцев (${frequency === 'monthly' ? 'ежемесячно' : 'поквартально'})\n` +
      `• Платеж: $${paymentPerPeriodUsd.toLocaleString('ru-RU')} (~${paymentPerPeriodKgs.toLocaleString('ru-RU')} сом) / ${frequency === 'monthly' ? 'месяц' : 'квартал'}\n` +
      `• Переплата: $0 (0% переплат)\n\n` +
      `Хочу зафиксировать эти условия и узнать актуальное наличие свободных этажей.`;

    window.open(`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <PaymentLayout
      pageTitle={c.pageTitle}
      currentSlug="rassrochka"
      heroTitle={c.heroTitle}
      heroSubtitle={c.heroSubtitle}
      noticeText={c.noticeText}
      blockTitle={c.blockTitle}
      descriptionText={c.descriptionText}
      documentsText={c.documentsText}
      faqList={c.faqList}
    >
      {/* ============================================================== */}
      {/* ФИРМЕННЫЙ ФИНАНСОВЫЙ КАЛЬКУЛЯТОР 0% (ПОЛНОЕ СООТВЕТСТВИЕ МАКЕТУ) */}
      {/* ============================================================== */}
      <section className="my-16 bg-[#03150e] text-white rounded-3xl p-6 sm:p-12 border border-[#d4b26f]/30 shadow-2xl transition-all">
        
        {/* Заголовок калькулятора */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-black tracking-widest text-[#d4b26f] block mb-2">
            ФИНАНСОВЫЙ КАЛЬКУЛЯТОР 0%
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-3">
            РАСЧЕТ ЕЖЕМЕСЯЧНОГО ПЛАТЕЖА
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
            Используйте ползунки или готовые кнопки для расчета комфортного взноса под ваш бюджет.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Плашка курса НБКР онлайн + фиксация в ДДУ */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-gray-300 font-medium">
                Курс НБКР онлайн: ({rateDate}):
              </span>
              <span className="bg-black/60 px-3 py-1 rounded-lg border border-white/15 text-[#d4b26f] font-black">
                {usdRate} <span className="text-gray-400 font-normal">сом/$</span>
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/40 px-3 py-1 rounded-xl border border-emerald-800/40">
              <IconShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Возможна фиксация курса в ДДУ</span>
            </div>
          </div>

          {/* Кнопка-дропдаун: Выбрать планировку из каталога (11 вариантов) */}
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
                    ? `ВЫБРАНО: ${CATALOG_APARTMENTS[selectedPlanIndex].complex} — ${CATALOG_APARTMENTS[selectedPlanIndex].title}`
                    : 'ВЫБРАТЬ ПЛАНИРОВКУ ИЗ КАТАЛОГА (11 ВАРИАНТОВ)'}
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
                      <span className="text-[10px] text-gray-400 block">≈ {Math.round(apt.price * usdRate).toLocaleString('ru-RU')} сом</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 1. СТОИМОСТЬ КВАРТИРЫ */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-white block">
                  СТОИМОСТЬ КВАРТИРЫ:
                </span>
                <span className="text-[10px] text-gray-400 block">
                  нажмите, чтобы изменить вручную
                </span>
              </div>

              {/* Пилюля-инпут */}
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
                      setDownPaymentAmount(Math.round((val * downPaymentPercent) / 100));
                      setSelectedPlanIndex(-1);
                    }}
                    className="w-28 sm:w-32 bg-transparent text-right font-black text-lg text-white focus:outline-none"
                  />
                </div>
                <span className="text-xs text-gray-400 font-semibold whitespace-nowrap hidden sm:inline">
                  ≈ {Math.round(apartmentPrice * usdRate).toLocaleString('ru-RU')} сом
                </span>
              </div>
            </div>

            {/* Ползунок цены */}
            <input
              type="range"
              min="30000"
              max="220000"
              step="1000"
              value={apartmentPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                setApartmentPrice(val);
                setDownPaymentAmount(Math.round((val * downPaymentPercent) / 100));
                setSelectedPlanIndex(-1);
              }}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#d4b26f]"
            />
          </div>

          {/* 2. ПЕРВОНАЧАЛЬНЫЙ ВЗНОС */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-white block">
                  ПЕРВОНАЧАЛЬНЫЙ ВЗНОС ({downPaymentPercent}%):
                </span>
                <span className="text-[10px] text-gray-400 block">
                  нажмите, чтобы изменить вручную
                </span>
              </div>

              {/* Пилюля-инпут */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="flex items-center bg-black/50 border border-white/15 px-4 py-2 rounded-2xl">
                  <span className="text-[#d4b26f] font-black text-sm mr-2">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={downPaymentAmount.toLocaleString('ru-RU')}
                    onChange={(e) => {
                      const val = Number(e.target.value.replace(/\D/g, ''));
                      setDownPaymentAmount(val);
                      if (apartmentPrice > 0) {
                        setDownPaymentPercent(Math.min(100, Math.round((val / apartmentPrice) * 100)));
                      }
                    }}
                    className="w-28 sm:w-32 bg-transparent text-right font-black text-lg text-white focus:outline-none"
                  />
                </div>
                <span className="text-xs text-gray-400 font-semibold whitespace-nowrap hidden sm:inline">
                  ≈ {Math.round(downPaymentAmount * usdRate).toLocaleString('ru-RU')} сом
                </span>
              </div>
            </div>

            {/* Ползунок первого взноса */}
            <input
              type="range"
              min="20"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => {
                const pct = Number(e.target.value);
                setDownPaymentPercent(pct);
                setDownPaymentAmount(Math.round((apartmentPrice * pct) / 100));
              }}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#d4b26f]"
            />

            {/* Быстрые кнопки первого взноса */}
            <div className="flex items-center gap-2">
              {[
                { pct: 20, label: '20% (мин.)' },
                { pct: 30, label: '30%' },
                { pct: 40, label: '40%' },
                { pct: 50, label: '50%' },
              ].map((btn) => (
                <button
                  key={btn.pct}
                  type="button"
                  onClick={() => {
                    setDownPaymentPercent(btn.pct);
                    setDownPaymentAmount(Math.round((apartmentPrice * btn.pct) / 100));
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    downPaymentPercent === btn.pct
                      ? 'bg-[#d4b26f] text-[#064734] shadow'
                      : 'bg-black/40 text-gray-300 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. СРОК ВЫПЛАТ И ПЕРИОДИЧНОСТЬ ВЫПЛАТ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Срок выплат */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  СРОК ВЫПЛАТ:
                </span>
                <span className="bg-black/60 px-3 py-1 rounded-xl border border-white/15 text-xs font-black text-white">
                  {months} месяцев
                </span>
              </div>

              {/* Ползунок месяцев */}
              <input
                type="range"
                min="12"
                max="40"
                step="6"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#d4b26f]"
              />

              {/* Кнопки месяцев */}
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { m: 12, label: '12 месяцев' },
                  { m: 18, label: '18 месяцев' },
                  { m: 24, label: '24 месяца' },
                  { m: 36, label: '36 месяцев (макс.)' },
                ].map((item) => (
                  <button
                    key={item.m}
                    type="button"
                    onClick={() => setMonths(item.m)}
                    className={`py-2 px-1 text-center rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                      months === item.m
                        ? 'bg-[#d4b26f] text-[#064734] shadow'
                        : 'bg-black/40 text-gray-300 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Периодичность выплат */}
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-white block">
                ПЕРИОДИЧНОСТЬ ВЫПЛАТ:
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`p-3.5 rounded-2xl text-center border transition-all cursor-pointer ${
                    frequency === 'monthly'
                      ? 'bg-[#d4b26f] text-[#064734] border-[#d4b26f] shadow-lg'
                      : 'bg-black/40 text-gray-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <strong className="text-xs sm:text-sm font-black block">Ежемесячно</strong>
                  <span className="text-[10px] opacity-80 block">{months} выплат</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFrequency('quarterly')}
                  className={`p-3.5 rounded-2xl text-center border transition-all cursor-pointer ${
                    frequency === 'quarterly'
                      ? 'bg-[#d4b26f] text-[#064734] border-[#d4b26f] shadow-lg'
                      : 'bg-black/40 text-gray-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <strong className="text-xs sm:text-sm font-black block">Поквартально (раз в 3 мес.)</strong>
                  <span className="text-[10px] opacity-80 block">{Math.max(1, Math.ceil(months / 3))} выплат</span>
                </button>
              </div>
            </div>

          </div>

          {/* ДВУХЦВЕТНАЯ СТАТУС-ШКАЛА РАСПРЕДЕЛЕНИЯ СТОИМОСТИ */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-black">
              <div className="flex items-center gap-1.5 text-[#d4b26f]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4b26f]" />
                <span>Первый взнос: ${downPaymentAmount.toLocaleString('ru-RU')} ({downPaymentPercent}%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>В рассрочку 0%: ${remainingAmount.toLocaleString('ru-RU')} ({100 - downPaymentPercent}%)</span>
              </div>
            </div>

            <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden flex p-0.5 border border-white/10">
              <div
                style={{ width: `${downPaymentPercent}%` }}
                className="h-full bg-[#d4b26f] rounded-l-full transition-all duration-300"
              />
              <div
                style={{ width: `${100 - downPaymentPercent}%` }}
                className="h-full bg-emerald-500 rounded-r-full transition-all duration-300"
              />
            </div>
          </div>

          {/* ПЛАШКА: ПЕРЕПЛАТА $0 И ЭКОНОМИЯ */}
          <div className="p-4 rounded-2xl bg-black/40 border border-[#d4b26f]/30 flex items-center gap-4 text-xs">
            <div className="w-10 h-10 rounded-xl bg-[#d4b26f]/20 text-[#d4b26f] flex items-center justify-center font-black text-lg shrink-0">
              %
            </div>
            <div>
              <strong className="text-white font-black uppercase text-xs sm:text-sm block">
                ПЕРЕПЛАТА: $0 • БЕЗ СКРЫТЫХ ПРОЦЕНТОВ БАНКА
              </strong>
              <span className="text-gray-400 text-[11px] block mt-0.5">
                Экономия до $15 000+ по сравнению со стандартной банковской ипотекой (18-22% годовых).
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* ГЛАВНАЯ КАРТОЧКА РЕЗУЛЬТАТА И ДЕЙСТВИЙ */}
          {/* ========================================================= */}
          <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-white/15 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Левая половина: цифры и переключатель валюты */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-gray-300">
                  {frequency === 'monthly' ? 'ЕЖЕМЕСЯЧНЫЙ ПЛАТЁЖ (0% ПЕРЕПЛАТ):' : 'ЕЖЕКВАРТАЛЬНЫЙ ПЛАТЁЖ (0%):'}
                </span>

                {/* Таб переключения USD / KGS */}
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
                    KGS (сом)
                  </button>
                </div>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[#d4b26f] tracking-tight">
                  {currencyMode === 'usd' ? (
                    <>
                      ${paymentPerPeriodUsd.toLocaleString('ru-RU')}
                      <span className="text-base font-bold text-gray-400"> / {frequency === 'monthly' ? 'месяц' : 'квартал'}</span>
                    </>
                  ) : (
                    <>
                      {paymentPerPeriodKgs.toLocaleString('ru-RU')}
                      <span className="text-base font-bold text-gray-400"> сом / {frequency === 'monthly' ? 'месяц' : 'квартал'}</span>
                    </>
                  )}
                </div>

                <div className="text-sm text-gray-300 font-bold mt-1">
                  {currencyMode === 'usd'
                    ? `≈ ${paymentPerPeriodKgs.toLocaleString('ru-RU')} сом (${numberOfPayments} выплат)`
                    : `≈ $${paymentPerPeriodUsd.toLocaleString('ru-RU')} (${numberOfPayments} выплат)`}
                </div>

                <span className="text-xs text-gray-400 block mt-2">
                  Остаток к распределению: ${remainingAmount.toLocaleString('ru-RU')} • Без комиссии банка
                </span>
              </div>

              <p className="text-[10px] text-gray-400 leading-relaxed font-light italic border-t border-white/10 pt-3">
                * Расчет носит предварительный характер. В соответствии с законодательством КР оплата производится в национальной валюте (сом) по официальному учетному курсу НБКР на день фактической оплаты. Возможна индивидуальная фиксация курса в договоре.
              </p>
            </div>

            {/* Правая половина: кнопки конверсии */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleFixWhatsApp}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <IconWhatsApp className="w-5 h-5 text-white" />
                <span>ЗАФИКСИРОВАТЬ РАСЧЕТ В WHATSAPP</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>СКАЧАТЬ РАСЧЕТ В PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSchedule(!showSchedule)}
                className="w-full py-3 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/15 cursor-pointer text-center"
              >
                {showSchedule ? 'Скрыть детальный график' : 'Посмотреть детальный график выплат'}
              </button>
            </div>

          </div>

          {/* Детальный график выплат в модальном раскрытии */}
          {showSchedule && (
            <div className="border border-white/15 rounded-3xl overflow-hidden bg-black/50 animate-fadeIn">
              <div className="max-h-72 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#064734] text-white sticky top-0">
                    <tr>
                      <th className="p-3.5 font-bold">№</th>
                      <th className="p-3.5 font-bold">Период</th>
                      <th className="p-3.5 font-bold">Платеж ($ / сом)</th>
                      <th className="p-3.5 font-bold text-right">Остаток долга</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-gray-200">
                    {paymentSchedule.map((item: ScheduleItem) => (
                      <tr key={item.num} className="hover:bg-white/5">
                        <td className="p-3.5 font-bold text-[#d4b26f]">{item.num}</td>
                        <td className="p-3.5 font-medium">{item.period}</td>
                        <td className="p-3.5 font-bold text-white">
                          ${item.paymentUsd.toLocaleString('ru-RU')}{' '}
                          <span className="text-[10px] text-gray-400 font-normal">
                            (≈ {item.paymentKgs.toLocaleString('ru-RU')} сом)
                          </span>
                        </td>
                        <td className="p-3.5 text-right font-semibold text-gray-400">
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
      </section>

      {/* 2. БЛОК ГОТОВЫХ РАСЧЕТОВ ПО ОБЪЕКТАМ */}
      <div className="mt-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            {c.examplesBadge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
            {c.examplesTitle}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-1">
            {c.examplesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.examples.map((item, idx) => (
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
                  {item.type}
                </span>
                <h4 className="text-xl font-black text-gray-950 dark:text-white mb-1">
                  {item.complex}
                </h4>
                <div className="text-xs font-semibold text-[#064734] dark:text-[#d4b26f] mb-5">
                  {item.area} • {item.priceM2}
                </div>

                <div className="space-y-3 border-t border-gray-100 dark:border-white/10 pt-4 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-500 dark:text-neutral-400">{c.totalPriceLabel}</span>
                    <strong className="text-sm font-black text-gray-900 dark:text-white">{item.totalPrice}</strong>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-500 dark:text-neutral-400">{c.downPaymentLabel}</span>
                    <div className="text-right">
                      <strong className="font-bold text-gray-900 dark:text-white block">{item.downPayment}</strong>
                      <span className="text-[10px] text-gray-400 dark:text-neutral-500">{item.downPaymentKgs}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#f2f6f4] dark:bg-[#040c09] border border-[#064734]/15 dark:border-white/10 mt-3 transition-colors">
                    <span className="text-[11px] font-bold text-gray-500 dark:text-neutral-400 block">
                      {c.monthlyLabel}
                    </span>
                    <div className="text-2xl font-black text-[#064734] dark:text-[#d4b26f] my-0.5">
                      {item.monthly} <span className="text-xs font-semibold text-gray-500 dark:text-neutral-400">{c.perMonthSuffix}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#064734]/80 dark:text-neutral-300 block">
                      {item.monthlyKgs}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 space-y-2">
                <a
                  href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(item.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('installment_card', item.complex)}
                  className="w-full py-3 rounded-xl bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] active:scale-95 text-[#d4b26f] hover:text-white dark:text-[#064734] dark:hover:text-[#064734] font-black text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <IconWhatsApp className="w-4 h-4 text-[#25D366] dark:text-[#064734]" />
                  <span>{c.bookBtn}</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </a>
                <Link
                  href={`/${item.slug}`}
                  className="block w-full text-center py-2 text-[11px] font-bold text-gray-500 dark:text-neutral-400 hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors"
                >
                  {c.aboutBtn} {item.complex}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. СРАВНИТЕЛЬНАЯ ТАБЛИЦА */}
      <div className="my-16 bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none transition-colors">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            {c.tableBadge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
            {c.tableTitle}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-1">
            {c.tableSubtitle}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-white/10">
                <th className="py-4 px-3 text-gray-400 dark:text-neutral-400 font-bold uppercase text-[11px]">{c.colCriteria}</th>
                <th className="py-4 px-3 text-[#064734] dark:text-[#d4b26f] font-black uppercase text-xs sm:text-sm bg-emerald-50/70 dark:bg-emerald-950/40 rounded-t-xl">
                  {c.colElOrdo}
                </th>
                <th className="py-4 px-3 text-gray-600 dark:text-gray-300 font-bold uppercase text-xs">
                  {c.colBank}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10 text-gray-700 dark:text-gray-300">
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row1Criteria}</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/30">
                  {c.row1ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-rose-600 dark:text-rose-400 font-bold">
                  {c.row1Bank}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row2Criteria}</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/30">
                  {c.row2ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-rose-600 dark:text-rose-400 font-bold">
                  {c.row2Bank}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row3Criteria}</td>
                <td className="py-3.5 px-3 font-semibold text-gray-900 dark:text-gray-200 bg-emerald-50/40 dark:bg-emerald-950/30">
                  {c.row3ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-500 dark:text-neutral-400">
                  {c.row3Bank}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row4Criteria}</td>
                <td className="py-3.5 px-3 font-semibold text-gray-900 dark:text-gray-200 bg-emerald-50/40 dark:bg-emerald-950/30">
                  {c.row4ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-500 dark:text-neutral-400">
                  {c.row4Bank}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row5Criteria}</td>
                <td className="py-3.5 px-3 font-semibold text-gray-900 dark:text-gray-200 bg-emerald-50/40 dark:bg-emerald-950/30">
                  {c.row5ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-500 dark:text-neutral-400">
                  {c.row5Bank}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row6Criteria}</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/30 rounded-b-xl">
                  {c.row6ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-500 dark:text-neutral-400">
                  {c.row6Bank}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. ПОШАГОВЫЙ ПРОЦЕСС ПОКУПКИ */}
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
          {c.steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0b1b15] p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col justify-between transition-colors"
            >
              <div>
                <span className="text-3xl font-black text-[#d4b26f] block mb-3">
                  {st.step}
                </span>
                <h4 className="text-sm font-black text-gray-950 dark:text-white mb-2">
                  {st.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PaymentLayout>
  );
}