'use client';

import Link from 'next/link';
import PaymentLayout from '@/components/PaymentLayout';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { IconWhatsApp, IconArrowRight } from '@/components/Icons';

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

const CONTENT: Record<Locale, InstallmentContent> = {
  ru: {
    pageTitle: 'Рассрочка 0%',
    heroTitle: 'КВАРТИРЫ В РАССРОЧКУ 0% БЕЗ УЧАСТИЯ БАНКА',
    heroSubtitle: 'Комфортный вход в сделку напрямую от застройщика EL ORDO GROUP. Индивидуальный график платежей на срок до 40 месяцев без процентов, скрытых комиссий и справок о доходах.',
    noticeText: 'Внутренняя рассрочка от застройщика позволяет приобрести квартиру без банковских переплат и кредитных проверок. Вы выплачиваете только фактическую стоимость недвижимости равными долями в процессе строительства.',
    blockTitle: 'ДЕТАЛИ И ПРЕИМУЩЕСТВА РАССРОЧКИ',
    descriptionText: 'Первоначальный взнос составляет от 20% до 30% от общей стоимости квартиры. Остаток распределяется равными долями на срок до 40 месяцев. График выплат согласовывается индивидуально: ежемесячно, поквартально (раз в 3 месяца) или с учетом сезонных поступлений вашего бизнеса. Переплата составляет 0%.',
    documentsText: 'Для заключения Договора долевого участия (ДДУ) требуется исключительно паспорт гражданина (ID-карта или загранпаспорт). Справки с места работы о подтверждении доходов и поручители не требуются.',
    faqList: [
      {
        q: 'Фиксируется ли стоимость квадратного метра в договоре?',
        a: 'Да. Стоимость квадратного метра фиксируется в официальном Договоре долевого участия (ДДУ) в момент подписания и остается неизменной на протяжении всего срока выплат, независимо от рыночных колебаний цен.',
      },
      {
        q: 'Нужен ли залог или поручители?',
        a: 'Нет, поручители и сторонние залоги не требуются. Обеспечением выполнения обязательств выступает сама строящаяся квартира до момента завершения всех взаиморасчетов.',
      },
      {
        q: 'Можно ли погасить рассрочку досрочно?',
        a: 'Да. Вы можете закрыть остаток задолженности в любой момент без каких-либо скрытых комиссий, штрафов или дополнительных переплат.',
      },
      {
        q: 'Можно ли использовать автомобиль как первоначальный взнос?',
        a: 'Да, в компании действует программа Trade-in. Мы проводим независимую экспертную оценку вашего автомобиля по рыночной стоимости за 24 часа и засчитываем эту сумму в счет первого взноса.',
      },
      {
        q: 'Как юридически защищен покупатель?',
        a: 'С каждым дольщиком заключается официальный ДДУ, подлежащий обязательной государственной регистрации в соответствии с законодательством Кыргызской Республики. Все объекты имеют утвержденные Красные книги и лицензии Госстроя КР.',
      },
      {
        q: 'Какой минимальный первоначальный взнос?',
        a: 'Минимальный первоначальный взнос начинается от 20% в зависимости от выбранного жилого комплекса и этапа строительства.',
      },
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
        priceM2: 'от 1 400 $',
        totalPrice: '$61 026',
        downPayment: '$18 307 (30%)',
        downPaymentKgs: '≈ 1 601 000 сом',
        monthly: '$1 186',
        monthlyKgs: '≈ 103 700 сом',
        term: '36 месяцев',
        slug: 'madina-residence',
        badge: 'Хит продаж',
        waText: 'Здравствуйте! Интересует расчет рассрочки на 1-комн. (43.59 м²) в ЖК Madina Residence с платежом $1186/мес. Отправьте планировку.',
      },
      {
        complex: 'ЖД Айкол +',
        type: '1-комнатная квартира',
        area: '42.00 м²',
        priceM2: 'от 1 100 $',
        totalPrice: '$46 200',
        downPayment: '$13 860 (30%)',
        downPaymentKgs: '≈ 1 212 000 сом',
        monthly: '$898',
        monthlyKgs: '≈ 78 500 сом',
        term: '36 месяцев',
        slug: 'ajkol-plus',
        badge: 'Эко-предгорье',
        waText: 'Здравствуйте! Интересует расчет рассрочки на 1-комн. в ЖД Айкол+ (Кок-Жар) с платежом $898/мес. Подскажите наличие.',
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
    row6ElOrdo: 'В день обращения (40 минут)',
    row6Bank: 'от 2 до 4 недель рассмотрения',
    stepsBadge: 'Прозрачная сделка',
    stepsTitle: '4 простых шага к вашей квартире',
    steps: [
      {
        step: '01',
        title: 'Выбор планировки и этажа',
        desc: 'Выбираете квартиру в каталоге или приезжаете в офис продаж для просмотра детальных архитектурных 3D-макетов.',
      },
      {
        step: '02',
        title: 'Согласование графика 0%',
        desc: 'Определяем комфортный размер первоначального взноса (от 20–30%) и график выплат: ежемесячно или поквартально.',
      },
      {
        step: '03',
        title: 'Подписание ДДУ по паспорту',
        desc: 'Заключаем официальный Договор долевого участия за 40 минут. Без подтверждения доходов, поручителей и банков.',
      },
      {
        step: '04',
        title: 'Госрегистрация и получение ключей',
        desc: 'Договор регистрируется в госорганах КР. После сдачи дома вы получаете ключи и техпаспорт на ваше имя.',
      },
    ],
  },
  kg: {
    pageTitle: '0% Бөлүп төлөө',
    heroTitle: 'БАНК КАТЫШУУСУЗ 0% БӨЛҮП ТӨЛӨӨ БАТИРЛЕРИ',
    heroSubtitle: 'EL ORDO GROUP куруучусунан түз келишимге ыңгайлуу кирүү. 40 айга чейин пайыздарсыз, жашыруун комиссияларсыз жана киреше маалымкатысыз жеке төлөм графиги.',
    noticeText: 'Куруучунун ички бөлүп төлөөсү батирди банктык ашыкча төлөмдөрсүз жана кредиттик текшерүүсүз сатып алууга мүмкүндүк берет. Сиз курулуш жүрүшүндө мүлктүн чыныгы наркын гана тең үлүштөр менен төлөйсүз.',
    blockTitle: 'БӨЛҮП ТӨЛӨӨНҮН ДЕТАЛДАРЫ ЖАНА АРТЫКЧЫЛЫКТАРЫ',
    descriptionText: 'Баштапкы төлөм батирдин жалпы наркынын 20%дан 30%га чейинки бөлүгүн түзөт. Калган сумма 40 айга чейин тең үлүштөр менен бөлүштүрүлөт. Төлөм графиги жекече макулдашылат: ай сайын, квартал сайын же бизнесиңиздин кирешесине жараша. Ашыкча төлөм 0%.',
    documentsText: 'Үлүштүк катышуу келишимин (ДДУ) түзүү үчүн жарандын паспорту гана талап кылынат. Иштеген жеринен киреше маалымкаты жана кепилдер талап кылынбайт.',
    faqList: [
      {
        q: 'Квадрат метрдин баасы келишимде бекитилеби?',
        a: 'Ооба. Квадрат метрдин баасы кол коюлган учурда расмий Үлүштүк катышуу келишиминде бекитилет жана базардагы өзгөрүүлөргө карабастан төлөө мөөнөтү бою өзгөрүүсүз калат.',
      },
      {
        q: 'Күрөө же кепилдер керекпи?',
        a: 'Жок, кепилдер жана кошумча күрөө талап кылынбайт. Бардык эсептешүүлөр аяктаганга чейин курулуп жаткан батир өзү милдеттенмелердин камсыздоосу болуп саналат.',
      },
      {
        q: 'Бөлүп төлөөнү мөөнөтүнөн мурда жабууга болобу?',
        a: 'Ооба. Калган сумманы каалаган убакта эч кандай жашыруун комиссияларсыз жана айып пулдарсыз мөөнөтүнөн мурда жаба аласыз.',
      },
      {
        q: 'Унааны баштапкы төлөм катары колдонсо болобу?',
        a: 'Ооба, компанияда Trade-in программасы иштейт. Биз унааңызды 24 сааттын ичинде базар баасында баалап, ал сумманы биринчи взнос катары эсептейбиз.',
      },
      {
        q: 'Сатып алуучу юридикалык жактан кантип корголгон?',
        a: 'Ар бир үлүшчү менен Кыргыз Республикасынын мыйзамдарына ылайык милдеттүү мамлекеттик каттоодон өтүүчү расмий ДДУ түзүлөт. Бардык объектилерде Кызыл китептери жана лицензиялары бар.',
      },
      {
        q: 'Минималдуу баштапкы төлөм канча?',
        a: 'Минималдуу баштапкы төлөм тандалган турак жай комплексине жана курулуш баскычына жараша 20%дан башталат.',
      },
    ],
    examplesBadge: 'Көрсөтмөлүү эсептөөлөр',
    examplesTitle: 'Батирлер боюнча төлөм мисалдары',
    examplesSubtitle: '36 айга 30% баштапкы төлөм менен 1 бөлмөлүү батирлердин чыныгы эсептөөлөрү',
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
        waText: 'Саламатсызбы! ЖК Abu Dhabi комплексиндеги 1 бөлмөлүү (49.48 м²) батирдин бөлүп төлөө эсеби боюнча жазып жатам. Бош кабаттар барбы?',
      },
      {
        complex: 'ЖК Madina Residence',
        type: '1 бөлмөлүү батир',
        area: '43.59 м²',
        priceM2: '1 400 $ баштап',
        totalPrice: '$61 026',
        downPayment: '$18 307 (30%)',
        downPaymentKgs: '≈ 1 601 000 сом',
        monthly: '$1 186',
        monthlyKgs: '≈ 103 700 сом',
        term: '36 ай',
        slug: 'madina-residence',
        badge: 'Хит сатуу',
        waText: 'Саламатсызбы! ЖК Madina Residence комплексиндеги 1 бөлмөлүү (43.59 м²) батирдин бөлүп төлөө эсеби боюнча планын жөнөтөсүзбү?',
      },
      {
        complex: 'ЖД Айкол +',
        type: '1 бөлмөлүү батир',
        area: '42.00 м²',
        priceM2: '1 100 $ баштап',
        totalPrice: '$46 200',
        downPayment: '$13 860 (30%)',
        downPaymentKgs: '≈ 1 212 000 сом',
        monthly: '$898',
        monthlyKgs: '≈ 78 500 сом',
        term: '36 ай',
        slug: 'ajkol-plus',
        badge: 'Эко-предгорье',
        waText: 'Саламатсызбы! ЖД Айкол+ боюнча 1 бөлмөлүү батирдин бөлүп төлөө эсеби боюнча бар-жогун тактап бересизби?',
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
    row4Bank: 'Жыл сайын өмүрдү жана мүлктү камсыздандыруу',
    row5Criteria: 'Документтердин топтому',
    row5ElOrdo: 'Паспорт гана',
    row5Bank: '8+ маалымкаттар топтому, кепилдер',
    row6Criteria: 'Тариздөө мөөнөтү',
    row6ElOrdo: 'Кайрылган күнү (40 мүнөт)',
    row6Bank: '2ден 4 жумага чейин кароо',
    stepsBadge: 'Ачык бүтүм',
    stepsTitle: 'Батириңизге жетүүчү 4 жөнөкөй кадам',
    steps: [
      {
        step: '01',
        title: 'Пландоо жана кабатты тандоо',
        desc: 'Каталогдон батир тандайсыз же толук 3D-макеттерди көрүү үчүн сатуу кеңсесине келесиз.',
      },
      {
        step: '02',
        title: '0% графикти макулдашуу',
        desc: 'Баштапкы төлөмдүн ыңгайлуу өлчөмүн (20–30%дан) жана ай сайын же квартал сайын төлөө графигин аныктайбыз.',
      },
      {
        step: '03',
        title: 'Паспорт менен ДДУга кол коюу',
        desc: '40 мүнөттүн ичинде расмий ДДУ келишимин түзөбүз. Киреше тастыктоосуз жана банктарсыз.',
      },
      {
        step: '04',
        title: 'Мамкаттоо жана ачкычтарды алуу',
        desc: 'Келишим КР мамлекеттик органдарында катталат. Үй тапшырылгандан кийин ачкычтарды жана техпаспортту аласыз.',
      },
    ],
  },
  kz: {
    pageTitle: '0% Бөліп төлеу',
    heroTitle: 'БАНК ҚАТЫСУЫНСЫЗ 0% БӨЛІП ТӨЛЕУ ПӘТЕРЛЕРІ',
    heroSubtitle: 'EL ORDO GROUP құрылыс салушысынан тікелей мәмілеге ыңғайлы кіру. 40 айға дейін пайыздарсыз, жасырын комиссияларсыз және кіріс туралы анықтамасыз дербес төлем кестесі.',
    noticeText: 'Құрылыс салушының ішкі бөліп төлеуі пәтерді банктік артық төлемдерсіз және несиелік тексерусіз сатып алуға мүмкіндік береді. Сіз құрылыс барысында жылжымайтын мүліктің нақты құнын ғана тең бөліктермен төлейсіз.',
    blockTitle: 'БӨЛІП ТӨЛЕУДІҢ МӘН-ЖАЙЫ ЖӘНЕ АРТЫҚШЫЛЫҚТАРЫ',
    descriptionText: 'Бастапқы жарна пәтердің жалпы құнының 20%-дан 30%-ға дейінгі мөлшерін құрайды. Қалдық сома 40 айға дейін тең үлестермен бөлінеді. Төлем кестесі жеке келісіледі: ай сайын, тоқсан сайын немесе бизнесіңіздің маусымдық түсіміне қарай. Артық төлем 0%.',
    documentsText: 'Үлестік қатысу шартын (ДДУ) жасасу үшін тек азаматтың төлқұжаты қажет. Жұмыс орнынан кіріс туралы анықтама және кепілгерлер талап етілмейді.',
    faqList: [
      {
        q: 'Квадрат метрдің құны шартта бекітіле ме?',
        a: 'Иә. Квадрат метрдің құны қол қойылған сәтте ресми Үлестік қатысу шартында бекітіледі және нарықтағы баға өзгерістеріне қарамастан өзгеріссіз қалады.',
      },
      {
        q: 'Кепіл немесе кепілгерлер қажет пе?',
        a: 'Жоқ, кепілгерлер мен қосымша кепілдер талап етілмейді. Барлық есеп айырысулар аяқталғанға дейін салынып жатқан пәтердің өзі міндеттемелердің кепілі болып табылады.',
      },
      {
        q: 'Бөліп төлеуді мерзімінен бұрын өтеуге бола ма?',
        a: 'Иә. Қалған берешекті кез келген уақытта жасырын комиссияларсыз және айыппұлдарсыз мерзімінен бұрын жабуға болады.',
      },
      {
        q: 'Автокөлікті бастапқы жарна ретінде пайдалануға бола ма?',
        a: 'Иә, компанияда Trade-in бағдарламасы жұмыс істейді. Біз автокөлігіңізді 24 сағатта нарықтық бағамен бағалап, соманы бастапқы жарнаға есептейміз.',
      },
      {
        q: 'Сатып алушы заңды түрде қалай қорғалған?',
        a: 'Әрбір үлескермен Қырғыз Республикасының заңнамасына сәйкес мемлекеттік тіркеуден өтетін ресми ДДУ жасалады. Барлық нысандарда Қызыл кітаптары бар.',
      },
      {
        q: 'Ең төменгі бастапқы жарна қанша?',
        a: 'Минималды бастапқы жарна таңдалған тұрғын үй кешеніне байланысты 20%-дан басталады.',
      },
    ],
    examplesBadge: 'Көрнекі есептеулер',
    examplesTitle: 'Пәтерлер бойынша төлем мысалдары',
    examplesSubtitle: '36 айға 30% бастапқы жарнамен 1 бөлмелі пәтерлердің нақты есептеулері',
    examples: [
      {
        complex: 'ЖК Abu Dhabi',
        type: '1 бөлмелі пәтер',
        area: '49.48 м²',
        priceM2: '1 650 $ бастап',
        totalPrice: '$81 642',
        downPayment: '$24 492 (30%)',
        downPaymentKgs: '≈ 2 143 000 сом',
        monthly: '$1 587',
        monthlyKgs: '≈ 138 800 сом',
        term: '36 ай',
        slug: 'abu-dhabi',
        waText: 'Сәлеметсіз бе! ЖК Abu Dhabi кешеніндегі 1 бөлмелі пәтердің бөліп төлеу есебі бойынша бос қабаттар бар ма?',
      },
      {
        complex: 'ЖК Madina Residence',
        type: '1 бөлмелі пәтер',
        area: '43.59 м²',
        priceM2: '1 400 $ бастап',
        totalPrice: '$61 026',
        downPayment: '$18 307 (30%)',
        downPaymentKgs: '≈ 1 601 000 сом',
        monthly: '$1 186',
        monthlyKgs: '≈ 103 700 сом',
        term: '36 ай',
        slug: 'madina-residence',
        badge: 'Хит сатылым',
        waText: 'Сәлеметсіз бе! ЖК Madina Residence кешеніндегі 1 бөлмелі пәтердің бөліп төлеу есебі бойынша жоспарын жібересіз бе?',
      },
      {
        complex: 'ЖД Айкол +',
        type: '1 бөлмелі пәтер',
        area: '42.00 м²',
        priceM2: '1 100 $ бастап',
        totalPrice: '$46 200',
        downPayment: '$13 860 (30%)',
        downPaymentKgs: '≈ 1 212 000 сом',
        monthly: '$898',
        monthlyKgs: '≈ 78 500 сом',
        term: '36 ай',
        slug: 'ajkol-plus',
        badge: 'Эко-бөктер',
        waText: 'Сәлеметсіз бе! ЖД Айкол+ бойынша 1 бөлмелі пәтердің бөліп төлеу есебі бойынша мәлімет алғым келеді.',
      },
    ],
    totalPriceLabel: 'Жалпы құны:',
    downPaymentLabel: 'Бастапқы жарна:',
    monthlyLabel: 'Ай сайынғы төлем (0% артық төлемсіз):',
    perMonthSuffix: '/ айына',
    bookBtn: 'WhatsApp арқылы брондау',
    aboutBtn: 'Кешен туралы',
    tableBadge: 'Қаржылық пайда',
    tableTitle: 'EL ORDO бөліп төлеуі немесе Банк ипотекасы?',
    tableSubtitle: 'Тікелей құрылыс салушыдан және банк арқылы баспана сатып алу шарттарын салыстыру',
    colCriteria: 'Критерий',
    colElOrdo: 'EL ORDO бөліп төлеу',
    colBank: 'Банк ипотекасы',
    row1Criteria: 'Пайыздық артық төлем',
    row1ElOrdo: '0% (Артық төлем жоқ)',
    row1Bank: 'жылдық 14%-дан 18%-ға дейін',
    row2Criteria: '3 жылдағы артық сома',
    row2ElOrdo: '$0 сом',
    row2Bank: '$18 000-нан $35 000+ дейін',
    row3Criteria: 'Кіріс туралы анықтама',
    row3ElOrdo: 'Талап етілмейді',
    row3Bank: 'Ресми жұмыс орнынан міндетті',
    row4Criteria: 'Қосымша сақтандыру',
    row4ElOrdo: 'Жоқ',
    row4Bank: 'Өмір мен мүлікті жыл сайын сақтандыру',
    row5Criteria: 'Құжаттар топтамасы',
    row5ElOrdo: 'Тек төлқұжат',
    row5Bank: '8+ анықтама, кепілгерлер',
    row6Criteria: 'Ресімдеу мерзімі',
    row6ElOrdo: 'Өтініш берген күні (40 минут)',
    row6Bank: '2-ден 4 аптаға дейін қарау',
    stepsBadge: 'Ашық мәміле',
    stepsTitle: 'Баспанаңызға апаратын 4 қарапайым қадам',
    steps: [
      {
        step: '01',
        title: 'Жоспарлау мен қабатты таңдау',
        desc: 'Каталогтан пәтер таңдайсыз немесе 3D-макеттерді көру үшін сату кеңсесіне келесіз.',
      },
      {
        step: '02',
        title: '0% кестені келісу',
        desc: 'Бастапқы жарнаның ыңғайлы көлемін және ай сайын не тоқсан сайын төлеу кестесін анықтаймыз.',
      },
      {
        step: '03',
        title: 'Төлқұжатпен ДДУ-ға қол қою',
        desc: '40 минут ішінде ресми ДДУ шартын жасаймыз. Кірісті растаусыз және банктерсіз.',
      },
      {
        step: '04',
        title: 'Мемтіркеу және кілттерді алу',
        desc: 'Шарт ҚР мемлекеттік органдарында тіркеледі. Үй тапсырылған соң кілттер мен техпаспортты аласыз.',
      },
    ],
  },
  uk: {
    pageTitle: 'Розстрочка 0%',
    heroTitle: 'КВАРТИРИ В РОЗСТРОЧКУ 0% БЕЗ УЧАСТІ БАНКУ',
    heroSubtitle: 'Комфортний вхід в угоду безпосередньо від забудовника EL ORDO GROUP. Індивідуальний графік платежів терміном до 40 місяців без відсотків, прихованих комісій та довідок про доходи.',
    noticeText: 'Внутрішня розстрочка від забудовника дозволяє придбати квартиру без банківських переплат та кредитних перевірок. Ви сплачуєте лише фактичну вартість нерухомості рівними частинами в процесі будівництва.',
    blockTitle: 'ДЕТАЛІ ТА ПЕРЕВАГИ РОЗСТРОЧКИ',
    descriptionText: 'Перший внесок становить від 20% до 30% від загальної вартості квартири. Залишок розподіляється рівними частинами на термін до 40 місяців. Графік виплат узгоджується індивідуально: щомісяця, щокварталу або з урахуванням сезонності вашого бізнесу. Переплата становить 0%.',
    documentsText: 'Для укладення Договору пайової участі (ДДУ) потрібен виключно паспорт громадянина (ID-карта або закордонний паспорт). Довідки з місця роботи та поручителі не потрібні.',
    faqList: [
      {
        q: 'Чи фіксується вартість квадратного метра в договорі?',
        a: 'Так. Вартість квадратного метра фіксується в офіційному Договорі пайової участі (ДДУ) в момент підписання та залишається незмінною протягом усього терміну виплат.',
      },
      {
        q: 'Чи потрібна застава або поручителі?',
        a: 'Ні, поручителі та сторонні застави не потрібні. Забезпеченням зобов\'язань виступає сама квартира до завершення всіх взаєморозрахунків.',
      },
      {
        q: 'Чи можна погасити розстрочку достроково?',
        a: 'Так. Ви можете закрити залишок заборгованості в будь-який момент без прихованих комісій чи штрафів.',
      },
      {
        q: 'Чи можна використати автомобіль як перший внесок?',
        a: 'Так, у компанії діє програма Trade-in. Ми проводимо незалежну оцінку вашого автомобіля за ринковою вартістю за 24 години та зараховуємо суму в рахунок першого внеску.',
      },
      {
        q: 'Як юридично захищений покупець?',
        a: 'З кожним пайовиком укладається офіційний ДДУ з обов\'язковою державною реєстрацією згідно із законодавством Киргизької Республіки.',
      },
      {
        q: 'Який мінімальний перший внесок?',
        a: 'Мінімальний перший внесок починається від 20% залежно від обраного житлового комплексу.',
      },
    ],
    examplesBadge: 'Наочні розрахунки',
    examplesTitle: 'Приклади платежів по квартирах',
    examplesSubtitle: 'Реальні розрахунки для 1-кімнатних квартир при першому внеску 30% на 36 місяців',
    examples: [
      {
        complex: 'ЖК Abu Dhabi',
        type: '1-кімнатна квартира',
        area: '49.48 м²',
        priceM2: 'від 1 650 $',
        totalPrice: '$81 642',
        downPayment: '$24 492 (30%)',
        downPaymentKgs: '≈ 2 143 000 сом',
        monthly: '$1 587',
        monthlyKgs: '≈ 138 800 сом',
        term: '36 місяців',
        slug: 'abu-dhabi',
        waText: 'Доброго дня! Цікавить розрахунок розстрочки на 1-кімн. (49.48 м²) в ЖК Abu Dhabi. Чи є вільні поверхи?',
      },
      {
        complex: 'ЖК Madina Residence',
        type: '1-кімнатна квартира',
        area: '43.59 м²',
        priceM2: 'від 1 400 $',
        totalPrice: '$61 026',
        downPayment: '$18 307 (30%)',
        downPaymentKgs: '≈ 1 601 000 сом',
        monthly: '$1 186',
        monthlyKgs: '≈ 103 700 сом',
        term: '36 місяців',
        slug: 'madina-residence',
        badge: 'Хіт продажів',
        waText: 'Доброго дня! Цікавить розрахунок розстрочки на 1-кімн. в ЖК Madina Residence. Надішліть планування.',
      },
      {
        complex: 'ЖД Айкол +',
        type: '1-кімнатна квартира',
        area: '42.00 м²',
        priceM2: 'від 1 100 $',
        totalPrice: '$46 200',
        downPayment: '$13 860 (30%)',
        downPaymentKgs: '≈ 1 212 000 сом',
        monthly: '$898',
        monthlyKgs: '≈ 78 500 сом',
        term: '36 місяців',
        slug: 'ajkol-plus',
        badge: 'Еко-передгір\'я',
        waText: 'Доброго дня! Цікавить розрахунок розстрочки на 1-кімн. в ЖД Айкол+ (Кок-Жар). Підкажіть наявність.',
      },
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
    row3Criteria: 'Довідка про доходи / Податки',
    row3ElOrdo: 'Не вимагається',
    row3Bank: 'Обов\'язково з офіційного місця',
    row4Criteria: 'Додаткові страховки',
    row4ElOrdo: 'Відсутні',
    row4Bank: 'Страхування життя та об\'єкта щороку',
    row5Criteria: 'Пакет документів',
    row5ElOrdo: 'Тільки паспорт',
    row5Bank: 'Пакет із 8+ довідок, поручителі',
    row6Criteria: 'Термін оформлення',
    row6ElOrdo: 'У день звернення (40 хвилин)',
    row6Bank: 'від 2 до 4 тижнів розгляду',
    stepsBadge: 'Прозора угода',
    stepsTitle: '4 прості кроки до вашої квартири',
    steps: [
      {
        step: '01',
        title: 'Вибір планування та поверху',
        desc: 'Обираєте квартиру в каталозі або приїжджаєте до відділу продажів для перегляду 3D-макетів.',
      },
      {
        step: '02',
        title: 'Узгодження графіка 0%',
        desc: 'Визначаємо комфортний розмір першого внеску (від 20–30%) та графік виплат.',
      },
      {
        step: '03',
        title: 'Підписання ДДУ за паспортом',
        desc: 'Укладаємо офіційний Договір пайової участі за 40 хвилин. Без поручителів і банків.',
      },
      {
        step: '04',
        title: 'Держреєстрація та отримання ключів',
        desc: 'Договір реєструється в держорганах КР. Після здачі будинку ви отримуєте ключі та техпаспорт.',
      },
    ],
  },
  en: {
    pageTitle: '0% Installment',
    heroTitle: '0% APARTMENT INSTALLMENT PLANS WITHOUT BANKS',
    heroSubtitle: 'Direct entry into property ownership from developer EL ORDO GROUP. Custom payment schedule up to 40 months with zero interest, no hidden commissions, and no income verification.',
    noticeText: 'Developer internal installment allows purchasing an apartment without bank surcharges and credit scoring. You pay only the actual price of the property in equal parts during construction.',
    blockTitle: 'INSTALLMENT DETAILS & ADVANTAGES',
    descriptionText: 'Down payment ranges from 20% to 30% of total apartment cost. The remaining balance is split into equal payments for up to 40 months. Schedules are tailored individually: monthly, quarterly, or aligned with business cashflow. 0% extra fee.',
    documentsText: 'An official Equity Participation Agreement (DDU) requires only a national passport (ID or international passport). No employment certificates or guarantors needed.',
    faqList: [
      {
        q: 'Is the price per square meter fixed in the agreement?',
        a: 'Yes. The price per square meter is locked upon signing the official DDU and remains unchanged throughout the repayment period, immune to market fluctuations.',
      },
      {
        q: 'Is collateral or a guarantor required?',
        a: 'No collateral or third-party guarantors are necessary. The apartment under construction itself serves as the security until complete payment.',
      },
      {
        q: 'Can I repay early without penalties?',
        a: 'Yes. You can pay off the outstanding balance ahead of schedule at any moment without hidden commissions or fines.',
      },
      {
        q: 'Can I use a vehicle as a down payment?',
        a: 'Yes, our Trade-in program enables you to exchange your car at fair market evaluation within 24 hours toward the initial deposit.',
      },
      {
        q: 'How is the buyer legally protected?',
        a: 'Each buyer signs a formal DDU registered with state regulatory authorities under Kyrgyz Republic law. All developments have certified Red Books.',
      },
      {
        q: 'What is the minimum down payment?',
        a: 'The minimum down payment starts from 20% depending on the chosen complex and construction stage.',
      },
    ],
    examplesBadge: 'Transparent Estimates',
    examplesTitle: 'Apartment Payment Examples',
    examplesSubtitle: 'Real payment breakdowns for 1-room apartments with 30% down payment over 36 months',
    examples: [
      {
        complex: 'Abu Dhabi RC',
        type: '1-Room Apartment',
        area: '49.48 m²',
        priceM2: 'from $1,650',
        totalPrice: '$81,642',
        downPayment: '$24,492 (30%)',
        downPaymentKgs: '≈ 2,143,000 KGS',
        monthly: '$1,587',
        monthlyKgs: '≈ 138,800 KGS',
        term: '36 months',
        slug: 'abu-dhabi',
        waText: 'Hello! I am interested in installment calculation for 1-room (49.48 m²) in Abu Dhabi RC with $1587/mo. Are there available floors?',
      },
      {
        complex: 'Madina Residence',
        type: '1-Room Apartment',
        area: '43.59 m²',
        priceM2: 'from $1,400',
        totalPrice: '$61,026',
        downPayment: '$18,307 (30%)',
        downPaymentKgs: '≈ 1,601,000 KGS',
        monthly: '$1,186',
        monthlyKgs: '≈ 103,700 KGS',
        term: '36 months',
        slug: 'madina-residence',
        badge: 'Bestseller',
        waText: 'Hello! Interested in installment calculation for 1-room in Madina Residence ($1186/mo). Please share the layout.',
      },
      {
        complex: 'Aykol + Club House',
        type: '1-Room Apartment',
        area: '42.00 m²',
        priceM2: 'from $1,100',
        totalPrice: '$46,200',
        downPayment: '$13,860 (30%)',
        downPaymentKgs: '≈ 1,212,000 KGS',
        monthly: '$898',
        monthlyKgs: '≈ 78,500 KGS',
        term: '36 months',
        slug: 'ajkol-plus',
        badge: 'Eco Foothills',
        waText: 'Hello! Inquiring about installment terms for 1-room apartment in Aykol+ ($898/mo). Please advise on availability.',
      },
    ],
    totalPriceLabel: 'Total Price:',
    downPaymentLabel: 'Down Payment:',
    monthlyLabel: 'Monthly Payment (0% Extra):',
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
    row6ElOrdo: 'Same day (40 minutes)',
    row6Bank: '2 to 4 weeks review',
    stepsBadge: 'Transparent Process',
    stepsTitle: '4 Easy Steps to Your Apartment',
    steps: [
      {
        step: '01',
        title: 'Floor Plan & Unit Selection',
        desc: 'Select an apartment in the catalog or visit the sales gallery to review physical 3D architectural scale models.',
      },
      {
        step: '02',
        title: '0% Schedule Negotiation',
        desc: 'Agree on a comfortable down payment (from 20–30%) and choose monthly or quarterly payment cadence.',
      },
      {
        step: '03',
        title: 'Sign Agreement by Passport',
        desc: 'Execute an official Equity Participation Agreement in 40 minutes without income statements or banks.',
      },
      {
        step: '04',
        title: 'State Registration & Key Handover',
        desc: 'Agreement is registered with state authorities. Upon handover, you receive property deeds and keys.',
      },
    ],
  },
  zh: {
    pageTitle: '0% 免息分期',
    heroTitle: '无需银行介入 0% 零息置业分期方案',
    heroSubtitle: '由 EL ORDO GROUP 开发商直签购房，门槛亲民。支持长达40个月免息个性化还款，零隐藏手续费，无需工作单位收入证明。',
    noticeText: '开发商自营免息分期付款让您彻底摆脱银行高额利息和繁琐信贷审核，在工程建设工期内按均摊节奏直接向开发商支付房款。',
    blockTitle: '免息分期细则与优势',
    descriptionText: '首付款比例仅需房屋总价的20%至30%，剩余款项在最长40个月内均摊付清。付款周期支持按月、按季度或根据企业经营周期量身定制，实际利率为0%。',
    documentsText: '直接签署经国家正式备案的购房合同（DDU），仅需出示个人有效身份证件（身份证或护照），完全免除收入流水证明与担保人。',
    faqList: [
      {
        q: '合同中的每平米价格是否固定？',
        a: '是的。在正式签署具有法律效力的购房合同（DDU）时即已锁定每平米单价，在整个分期履行期间保持不变，不受市场波动影响。',
      },
      {
        q: '是否需要财产抵押或担保人？',
        a: '不需要。在所有房款结清前，在建住宅物业本身即作为履行担保，无需额外第三方抵押或联名担保。',
      },
      {
        q: '分期付款能否申请提前结清？',
        a: '可以。您可以随时提前结清剩余欠款，开发商绝不收取任何违约金、滞纳金或额外手续费。',
      },
      {
        q: '能否用现有汽车抵扣首付款？',
        a: '可以。我们提供便捷的以旧换新（Trade-in）置换服务，专业评估师在24小时内出具公允市价估值并直接抵扣新房首付款。',
      },
      {
        q: '置业者的合法权益如何保障？',
        a: '与每位业主签订官方正式购房合同，并按吉尔吉斯共和国现行法规向国家机关登记备案，所有楼盘均具有正式红本产权。',
      },
      {
        q: '最低首付比例是多少？',
        a: '根据所选楼盘及当前工程施工进度，最低首付比例仅需20%起。',
      },
    ],
    examplesBadge: '真实测算参考',
    examplesTitle: '精选户型月供测算样例',
    examplesSubtitle: '按首付30%、分期36个月测算的1居室真实月供测算',
    examples: [
      {
        complex: '阿布扎比住宅区 (Abu Dhabi)',
        type: '精致一居室',
        area: '49.48 м²',
        priceM2: '1 650 $ 起',
        totalPrice: '$81 642',
        downPayment: '$24 492 (30%)',
        downPaymentKgs: '≈ 2 143 000 索姆',
        monthly: '$1 587',
        monthlyKgs: '≈ 138 800 索姆',
        term: '36个月',
        slug: 'abu-dhabi',
        waText: '您好！我对阿布扎比住宅区49.48平米一居室月供$1587的分期方案很感兴趣，请问目前有哪些可选楼层？',
      },
      {
        complex: '玛迪娜公馆 (Madina Residence)',
        type: '商务一居室',
        area: '43.59 м²',
        priceM2: '1 400 $ 起',
        totalPrice: '$61 026',
        downPayment: '$18 307 (30%)',
        downPaymentKgs: '≈ 1 601 000 索姆',
        monthly: '$1 186',
        monthlyKgs: '≈ 103 700 索姆',
        term: '36个月',
        slug: 'madina-residence',
        badge: '热销户型',
        waText: '您好！想了解玛迪娜公馆43.59平米一居室月供$1186分期方案，请发送户型图纸及付款测算。',
      },
      {
        complex: '艾科尔+ 精品洋房 (Aykol +)',
        type: '生态一居室',
        area: '42.00 м²',
        priceM2: '1 100 $ 起',
        totalPrice: '$46 200',
        downPayment: '$13 860 (30%)',
        downPaymentKgs: '≈ 1 212 000 索姆',
        monthly: '$898',
        monthlyKgs: '≈ 78 500 索姆',
        term: '36个月',
        slug: 'ajkol-plus',
        badge: '生态麓区',
        waText: '您好！咨询艾科尔+（Kok-Jar）月供$898的分期房源，请告知当前可售楼层及房号。',
      },
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
    row6ElOrdo: '即到即签 (约40分钟)',
    row6Bank: '需等待2至4周银行审核',
    stepsBadge: '透明置业流程',
    stepsTitle: '轻松入驻理想新居的4个步骤',
    steps: [
      {
        step: '01',
        title: '优选户型与心仪楼层',
        desc: '在项目目录中甄选合适房源，或亲临营销中心鉴赏实体规划沙盘与样板间。',
      },
      {
        step: '02',
        title: '确认0%免息还款计划',
        desc: '根据家庭预算定制首付额度（20%至30%起）并确定按月或按季度的还款周期。',
      },
      {
        step: '03',
        title: '凭有效证件签约',
        desc: '40分钟内高效签订正规国家备案购房合同，无需收入流水证明与银行介入。',
      },
      {
        step: '04',
        title: '官方登记与交付钥匙',
        desc: '购房合同在国家不动产机构完成备案。房屋验收交付后直接领取钥匙与不动产红本。',
      },
    ],
  },
};

export default function InstallmentPage() {
  const { locale } = useLanguage();
  const lang: Locale = (locale as Locale) || 'ru';
  const c = CONTENT[lang] || CONTENT.ru;

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
      {/* 1. БЛОК ГОТОВЫХ РАСЧЕТОВ ПО ОБЪЕКТАМ */}
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
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(item.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
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

      {/* 2. СРАВНИТЕЛЬНАЯ ТАБЛИЦА: EL ORDO vs БАНКОВСКАЯ ИПОТЕКА */}
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
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20">
                  {c.row1ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-rose-600 dark:text-rose-400 font-bold">
                  {c.row1Bank}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row2Criteria}</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20">
                  {c.row2ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-rose-600 dark:text-rose-400 font-bold">
                  {c.row2Bank}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row3Criteria}</td>
                <td className="py-3.5 px-3 font-semibold text-gray-900 dark:text-gray-200 bg-emerald-50/40 dark:bg-emerald-950/20">
                  {c.row3ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-500 dark:text-neutral-400">
                  {c.row3Bank}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row4Criteria}</td>
                <td className="py-3.5 px-3 font-semibold text-gray-900 dark:text-gray-200 bg-emerald-50/40 dark:bg-emerald-950/20">
                  {c.row4ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-500 dark:text-neutral-400">
                  {c.row4Bank}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row5Criteria}</td>
                <td className="py-3.5 px-3 font-semibold text-gray-900 dark:text-gray-200 bg-emerald-50/40 dark:bg-emerald-950/20">
                  {c.row5ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-500 dark:text-neutral-400">
                  {c.row5Bank}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row6Criteria}</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-b-xl">
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

      {/* 3. ПОШАГОВЫЙ ПРОЦЕСС ПОКУПКИ */}
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
                  {s.step}
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