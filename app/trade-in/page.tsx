'use client';

import Link from 'next/link';
import PaymentLayout from '@/components/PaymentLayout';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import {
  IconCheck,
  IconCar,
  IconBuilding,
  IconWhatsApp,
  IconArrowRight,
} from '@/components/Icons';

interface TradeInCase {
  asset: string;
  assetCategory: string;
  valuation: string;
  valuationKgs: string;
  targetComplex: string;
  targetApartment: string;
  result: string;
  surplus: string;
  badge: string;
  slug: string;
  waText: string;
}

interface AcceptedCategory {
  type: 'car' | 'realty' | 'land';
  title: string;
  desc: string;
  reqs: string;
}

interface TradeInStep {
  num: string;
  title: string;
  desc: string;
}

interface TradeInContent {
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
  cases: TradeInCase[];
  valuationLabel: string;
  selectedObjectLabel: string;
  btnEvaluateCase: string;
  aboutComplexBtn: string;
  tableBadge: string;
  tableTitle: string;
  tableSubtitle: string;
  colCriteria: string;
  colElOrdo: string;
  colMarket: string;
  row1Criteria: string;
  row1ElOrdo: string;
  row1Market: string;
  row2Criteria: string;
  row2ElOrdo: string;
  row2Market: string;
  row3Criteria: string;
  row3ElOrdo: string;
  row3Market: string;
  row4Criteria: string;
  row4ElOrdo: string;
  row4Market: string;
  row5Criteria: string;
  row5ElOrdo: string;
  row5Market: string;
  categoriesBadge: string;
  categoriesTitle: string;
  requirementsLabel: string;
  categories: AcceptedCategory[];
  stepsBadge: string;
  stepsTitle: string;
  steps: TradeInStep[];
}

const CONTENT: Record<Locale, TradeInContent> = {
  ru: {
    pageTitle: 'Trade-in (Бартер)',
    heroTitle: 'ОБМЕН АВТОМОБИЛЯ ИЛИ ВТОРИЧНОГО ЖИЛЬЯ НА НОВОСТРОЙКУ',
    heroSubtitle: 'Используйте ваше текущее авто или вторичную недвижимость как первоначальный взнос за квартиру в современных жилых комплексах EL ORDO GROUP. Честная рыночная оценка за 24 часа без очередей и авторынков.',
    noticeText: 'Программа Trade-in избавляет вас от необходимости неделями стоять на авторынке или искать покупателя на старое жилье через риелторов с комиссиями. Мы оцениваем ваш актив по объективной рыночной стоимости и сразу засчитываем эту сумму в счет покупки новой квартиры.',
    blockTitle: 'КАК РАБОТАЕТ ПРОГРАММА TRADE-IN',
    descriptionText: 'Вы выбираете квартиру в любом из наших проектов (ЖК Abu Dhabi, Madina Residence, ЖД Айкол+ или Айкол). Наш эксперт проводит оценку вашего автомобиля или вторичной недвижимости по честной рыночной цене за 24 часа. Согласованная сумма в полном объеме засчитывается в качестве первоначального взноса или частичной оплаты, а на остаток оформляется беспроцентная рассрочка 0% до 40 месяцев.',
    documentsText: 'Для автомобиля: Свидетельство о регистрации ТС (техпаспорт) и паспорт владельца. Для недвижимости: Правоустанавливающие документы (договор купли-продажи/дарения), техпаспорт БТИ и справка об отсутствии арестов.',
    faqList: [
      {
        q: 'Как определяется стоимость автомобиля при оценке?',
        a: 'Оценка строится на реальном анализе рынка (Mashina.kg, актуальные сделки авторынка Бишкека) с учетом года выпуска, комплектации, пробега и технического состояния. Мы не занижаем цену искусственно, обеспечивая честный паритет.',
      },
      {
        q: 'Что если оценка авто превышает требуемый первоначальный взнос?',
        a: 'Вся сумма сверх первого взноса направляется на погашение стоимости квартиры, пропорционально уменьшая ежемесячные платежи по рассрочке либо сокращая общий срок выплат.',
      },
      {
        q: 'Что делать, если стоимости авто недостаточно для 30% взноса?',
        a: 'Недостающую разницу вы можете доплатить наличными, безналичным переводом либо согласовать индивидуальный график внесения недостающей части первого взноса.',
      },
      {
        q: 'Кто берет на себя переоформление автомобиля в ГУ «Унаа»?',
        a: 'Юридический отдел EL ORDO GROUP полностью берет на себя подготовку документов и сопровождение перерегистрации. Процедура проходит быстро и прозрачно в строгом соответствии с законами КР.',
      },
      {
        q: 'Принимаются ли квартиры советской постройки (104, 105, 106 серии)?',
        a: 'Да. Мы принимаем ликвидные квартиры вторичного фонда в Бишкеке при наличии полного комплекта правоустанавливающих документов и отсутствии судебных арестов или залогов.',
      },
      {
        q: 'Можно ли сдать сразу два автомобиля в зачет одной квартиры?',
        a: 'Да, программа Trade-in позволяет комбинировать активы: например, сдать два автомобиля либо автомобиль плюс доплату наличными.',
      },
      {
        q: 'Фиксируется ли цена строящейся квартиры на момент оценки?',
        a: 'Да. В момент согласования оценки выбранная вами квартира бронируется, а цена квадратного метра фиксируется в официальном Договоре долевого участия (ДДУ).',
      },
    ],
    casesBadge: 'Практические примеры',
    casesTitle: 'Реальные сценарии зачета Trade-in',
    casesSubtitle: 'Как наши резиденты улучшают жилищные условия без свободных наличных средств',
    cases: [
      {
        asset: 'Toyota Camry 70 (2020 г.)',
        assetCategory: 'Легковой автомобиль',
        valuation: '$24 000',
        valuationKgs: '≈ 2 100 000 сом',
        targetComplex: 'ЖК Madina Residence',
        targetApartment: '1-комнатная квартира (43.59 м²)',
        result: 'Первый взнос 30% закрыт полностью ($18 300)',
        surplus: 'Остаток $5 700 пошел в счет ежемесячных платежей',
        badge: 'Популярный обмен',
        slug: 'madina-residence',
        waText: 'Здравствуйте! Хочу обменять легковой автомобиль (Toyota Camry / аналогичный) по программе Trade-in на квартиру в ЖК Madina Residence. Как пройти осмотр?',
      },
      {
        asset: 'Lexus GX 460 (2016 г.)',
        assetCategory: 'Премиум-внедорожник',
        valuation: '$38 000',
        valuationKgs: '≈ 3 325 000 сом',
        targetComplex: 'ЖК Abu Dhabi',
        targetApartment: '2-комнатная квартира (78.30 м²)',
        result: 'Первоначальный взнос 30% оплачен полностью',
        surplus: 'Ежемесячный платеж снижен до $1 250/мес. на 36 месяцев',
        badge: 'Премиум Trade-in',
        slug: 'abu-dhabi',
        waText: 'Здравствуйте! Интересует обмен внедорожника (Lexus / Toyota Prado) на 2-комнатную квартиру в ЖК Abu Dhabi по Trade-in. Подскажите условия оценки.',
      },
      {
        asset: '1-комн. квартира 105 серии',
        assetCategory: 'Вторичная недвижимость (Бишкек)',
        valuation: '$46 000',
        valuationKgs: '≈ 4 025 000 сом',
        targetComplex: 'ЖД Айкол + (Кок-Жар)',
        targetApartment: 'Просторная 2-комн. (74.3 м² в предгорье)',
        result: 'Покрыто более 55% от стоимости новой квартиры',
        surplus: 'Минимальный остаток в рассрочку 0% на комфортный срок',
        badge: 'Обмен жилья',
        slug: 'ajkol-plus',
        waText: 'Здравствуйте! Хочу обменять вторичную 1-комнатную квартиру на новую в ЖД Айкол+ (Кок-Жар) по Trade-in. Подскажите процедуру выезда оценщика.',
      },
    ],
    valuationLabel: 'Оценка эксперта EL ORDO:',
    selectedObjectLabel: 'Выбранный объект:',
    btnEvaluateCase: 'Оценить похожее авто',
    aboutComplexBtn: 'О комплексе',
    tableBadge: 'Экономия времени и денег',
    tableTitle: 'Trade-in EL ORDO или продажа на авторынке?',
    tableSubtitle: 'Почему обмен напрямую девелоперу выгоднее самостоятельной реализации',
    colCriteria: 'Критерий сделки',
    colElOrdo: 'Trade-in в EL ORDO',
    colMarket: 'Самостоятельная продажа',
    row1Criteria: 'Срок закрытия сделки',
    row1ElOrdo: 'Всего 24 часа',
    row1Market: 'от 1 до 4 месяцев',
    row2Criteria: 'Бронь квартиры и фиксация цены',
    row2ElOrdo: 'Квартира бронируется сразу',
    row2Market: 'Квартира может подорожать или продаться',
    row3Criteria: 'Торг и сбивание стоимости',
    row3ElOrdo: 'Честная объективная рыночная цена',
    row3Market: 'Постоянный прессинг перекупщиков',
    row4Criteria: 'Комиссии и расходы на рекламу',
    row4ElOrdo: '0 сом (Все расходы берет застройщик)',
    row4Market: 'Оплата объявлений, мойки, авторынка, риелторов',
    row5Criteria: 'Юридическое оформление',
    row5ElOrdo: 'Штатные юристы компании',
    row5Market: 'Очереди в ГУ «Унаа», риски с расчетами',
    categoriesBadge: 'Критерии активов',
    categoriesTitle: 'Какое имущество участвует в программе',
    requirementsLabel: 'Требования:',
    categories: [
      {
        type: 'car',
        title: 'Автомобили и внедорожники',
        desc: 'Ликвидные иномарки (Toyota, Lexus, Hyundai, Kia, BMW, Mercedes и др.) в исправном техническом состоянии с чистой юридической историей.',
        reqs: 'Техпаспорт ТС, паспорт владельца, отсутствие арестов и штрафов.',
      },
      {
        type: 'realty',
        title: 'Вторичные квартиры в Бишкеке',
        desc: '1-, 2-, 3-комнатные квартиры 104, 105, 106 серий, индивидуальных планировок, а также сданные новостройки в черте города.',
        reqs: 'Правоустанавливающие документы, техпаспорт БТИ, справка об отсутствии обременений.',
      },
      {
        type: 'land',
        title: 'Земельные участки и коммерция',
        desc: 'Ликвидные земельные участки под ИЖС в черте Бишкека и южном предгорье, а также помещения свободного назначения.',
        reqs: 'Красная книга (госакт), правоустанавливающие документы, согласованный АПУ.',
      },
    ],
    stepsBadge: 'Процедура за 24 часа',
    stepsTitle: 'Этапы оформления по Trade-in',
    steps: [
      {
        num: '01',
        title: 'Подача онлайн-заявки',
        desc: 'Отправляете базовые данные (марку, год, пробег или адрес и фото жилья) нам в WhatsApp для предварительного согласования диапазона цены.',
      },
      {
        num: '02',
        title: 'Осмотр и фиксация цены',
        desc: 'Эксперт-оценщик компании осматривает объект и в течение 24 часов озвучивает справедливую рыночную стоимость без скрытых дисконтов.',
      },
      {
        num: '03',
        title: 'Выбор новой квартиры',
        desc: 'Бронируете понравившуюся планировку и видовой этаж в любом жилом комплексе EL ORDO GROUP с фиксацией цены квадратного метра.',
      },
      {
        num: '04',
        title: 'Подписание ДДУ и взаимозачет',
        desc: 'Стоимость вашего авто или жилья официально засчитывается в качестве первого взноса. Юристы компании берут все переоформление на себя.',
      },
    ],
  },
  kg: {
    pageTitle: 'Trade-in (Бартер)',
    heroTitle: 'УНААНЫ ЖЕ ЭСКИ ТУРАК ЖАЙДЫ ЖАҢЫ ҮЙГӨ АЛМАШТЫРУУ',
    heroSubtitle: 'EL ORDO GROUP турак жай комплекстеринен батир алуу үчүн учурдагы унааңызды же эски кыймылсыз мүлкүңүздү баштапкы төлөм катары колдонуңуз. 24 саатта кезексиз жана автобазарсыз адилеттүү баалоо.',
    noticeText: 'Trade-in программасы сизди автобазарда жумалап туруудан же риелторлор аркылуу эски үйдү сатуу убарагерчилигинен куткарат. Биз активиңизди объективдүү базар баасында баалап, бул сумманы дароо жаңы батирдин эсебине кошобуз.',
    blockTitle: 'TRADE-IN ПРОГРАММАСЫ КАНДАЙ ИШТЕЙТ',
    descriptionText: 'Биздин долбоорлордун биринен батир тандайсыз (ЖК Abu Dhabi, Madina Residence, ЖД Айкол+ же Айкол). Биздин эксперт унааңызды же мүлкүңүздү 24 саатта адилеттүү базар баасында баалайт. Макулдашылган сумма толугу менен баштапкы төлөм же бөлүк төлөм катары эсептелинет, ал эми калган суммага 40 айга чейин 0% пайызсыз бөлүп төлөө таризделет.',
    documentsText: 'Унаа үчүн: Унааны каттоо күбөлүгү (техпаспорт) жана ээсинин паспорту. Кыймылсыз мүлк үчүн: Укук белгилөөчү документтер (сатуу-сатып алуу/белекке берүү келишими), БТИ техпаспорту жана чектөөлөр жоктугу тууралуу маалымкат.',
    faqList: [
      {
        q: 'Унаанын баасы кандай аныкталат?',
        a: 'Баалоо реалдуу базар анализине (Mashina.kg, Бишкек автобазарынын бүтүмдөрү) негизделип, чыгарылган жылы, абалы жана жүрүшү эске алынат. Бааны атайылап түшүрбөйбүз.',
      },
      {
        q: 'Унаанын баасы биринчи төлөмдөн ашып кетсе эмне болот?',
        a: 'Ашык сумма батирдин негизги баасын жабууга багытталат жана ай сайын төлөмдөрдү же жалпы мөөнөттү азайтат.',
      },
      {
        q: 'Унаанын баасы 30% взноско жетпесе эмне кылуу керек?',
        a: 'Жетпеген айырманы накталай же эсепке которуу аркылуу кошуп койсоңуз болот.',
      },
      {
        q: 'Унааны «Унаа» мекемесинен кайра каттоодон ким өткөрөт?',
        a: 'EL ORDO GROUP юристтери документтерди даярдоону жана каттоону толук өзүнө алат.',
      },
      {
        q: 'Советтик үйлөрдөгү (104, 105, 106-серия) батирлер кабыл алынабы?',
        a: 'Ооба. Толук документтери бар жана чектөөлөрү жок батирлер кабыл алынат.',
      },
      {
        q: 'Бир батирге эки унааны кошсо болобу?',
        a: 'Ооба, Trade-in программасы бир нече активди бириктирүүгө мүмкүнчүлүк берет.',
      },
      {
        q: 'Баалоо учурунда жаңы батирдин баасы бекитилеби?',
        a: 'Ооба. Баалоо макулдашылган учурда батир брондолуп, чарчы метрдин баасы ДДУ келишиминде бекитилет.',
      },
    ],
    casesBadge: 'Практикалык мисалдар',
    casesTitle: 'Trade-in алмашуунун реалдуу сценарийлери',
    casesSubtitle: 'Биздин жашоочулар кошумча накталай каражатсыз эле турак жай шарттарын кантип жакшыртышат',
    cases: [
      {
        asset: 'Toyota Camry 70 (2020-ж.)',
        assetCategory: 'Жеңил унаа',
        valuation: '$24 000',
        valuationKgs: '≈ 2 100 000 сом',
        targetComplex: 'ЖК Madina Residence',
        targetApartment: '1 бөлмөлүү батир (43.59 м²)',
        result: '30% баштапкы төлөм толук жабылды ($18 300)',
        surplus: 'Калган $5 700 ай сайын төлөмдөргө которулду',
        badge: 'Популярдуу алмашуу',
        slug: 'madina-residence',
        waText: 'Саламатсызбы! Toyota Camry унаамды Trade-in аркылуу ЖК Madina Residence батирине алмаштыргым келет. Көрүүгө качан барсам болот?',
      },
      {
        asset: 'Lexus GX 460 (2016-ж.)',
        assetCategory: 'Премиум жол тандабас',
        valuation: '$38 000',
        valuationKgs: '≈ 3 325 000 сом',
        targetComplex: 'ЖК Abu Dhabi',
        targetApartment: '2 бөлмөлүү батир (78.30 м²)',
        result: '30% баштапкы төлөм толук төлөндү',
        surplus: 'Ай сайын төлөм 36 айга $1 250 чейин төмөндөтүлдү',
        badge: 'Премиум Trade-in',
        slug: 'abu-dhabi',
        waText: 'Саламатсызбы! Жол тандабасымды ЖК Abu Dhabi 2 бөлмөлүү батирине Trade-in аркылуу алмаштыруу шарттарын билгим келет.',
      },
      {
        asset: '105-сериядагы 1 бөлмөлүү батир',
        assetCategory: 'Экинчилик турак жай (Бишкек)',
        valuation: '$46 000',
        valuationKgs: '≈ 4 025 000 сом',
        targetComplex: 'ЖД Айкол + (Көк-Жар)',
        targetApartment: 'Кенен 2 бөлмөлүү (74.3 м² тоо этегинде)',
        result: 'Жаңы батирдин наркынын 55%дан ашыгы жабылды',
        surplus: 'Калган сумма ыңгайлуу мөөнөткө 0% бөлүп төлөөгө таризделди',
        badge: 'Турак жай алмашуу',
        slug: 'ajkol-plus',
        waText: 'Саламатсызбы! Эски 1 бөлмөлүү батиримди ЖД Айкол+ комплексине Trade-in менен алмаштыруу үчүн баалоочуну кантип чакырсам болот?',
      },
    ],
    valuationLabel: 'EL ORDO эксперттик баалоосу:',
    selectedObjectLabel: 'Тандалган объект:',
    btnEvaluateCase: 'Унааны баалоо',
    aboutComplexBtn: 'Комплекс тууралуу',
    tableBadge: 'Убакытты жана каражатты үнөмдөө',
    tableTitle: 'EL ORDO Trade-in же автобазарда сатуубу?',
    tableSubtitle: 'Эмне үчүн куруучуга түз алмаштыруу өз алдынча сатуудан пайдалуураак',
    colCriteria: 'Бүтүм критерийи',
    colElOrdo: 'EL ORDO Trade-in',
    colMarket: 'Өз алдынча сатуу',
    row1Criteria: 'Бүтүмдү жабуу мөөнөтү',
    row1ElOrdo: 'Болгону 24 саат',
    row1Market: '1ден 4 айга чейин',
    row2Criteria: 'Батирди брондоо жана бааны бекитүү',
    row2ElOrdo: 'Батир дароо бекитилет',
    row2Market: 'Батир кымбаттап же сатылып кетиши мүмкүн',
    row3Criteria: 'Бааны түшүрүү жана соодалашуу',
    row3ElOrdo: 'Адилеттүү объективдүү базар баасы',
    row3Market: 'Алып-сатарлардын бааны түшүрүү басымы',
    row4Criteria: 'Комиссиялар жана жарнама чыгымдары',
    row4ElOrdo: '0 сом (Бардык чыгымдар куруучудан)',
    row4Market: 'Жарнама, жууп-тазалоо, базар акысы, риелторлор',
    row5Criteria: 'Юридикалык тариздөө',
    row5ElOrdo: 'Компаниянын штаттык юристтери',
    row5Market: '«Унаа» мекемесиндеги кезектер, тобокелдиктер',
    categoriesBadge: 'Активдердин критерийлери',
    categoriesTitle: 'Программага кандай мүлктөр катыша алат',
    requirementsLabel: 'Талаптар:',
    categories: [
      {
        type: 'car',
        title: 'Унаалар жана жол тандабастар',
        desc: 'Таза юридикалык тарыхы бар техникалык жактан жакшы чет элдик унаалар (Toyota, Lexus, Hyundai, Kia, BMW, Mercedes ж.б.).',
        reqs: 'Унаанын техпаспорту, ээсинин паспорту, айып пулдар менен камактардын жоктугу.',
      },
      {
        type: 'realty',
        title: 'Бишкектеги экинчилик батирлер',
        desc: '104, 105, 106-сериялардагы 1, 2, 3 бөлмөлүү батирлер, ошондой эле шаардагы бүткөн жаңы үйлөр.',
        reqs: 'Укук белгилөөчү документтер, БТИ техпаспорту, чектөөлөр жоктугу тууралуу маалымкат.',
      },
      {
        type: 'land',
        title: 'Жер тилкелери жана коммерция',
        desc: 'Бишкекте жана түштүк тоо этегинде жайгашкан жеке турак жай куруу үчүн жерлер жана коммерциялык жайлар.',
        reqs: 'Кызыл китеп (мамлекеттик акт), укук белгилөөчү документтер, макулдашылган АПУ.',
      },
    ],
    stepsBadge: '24 сааттык жол-жобо',
    stepsTitle: 'Trade-in боюнча тариздөө этаптары',
    steps: [
      {
        num: '01',
        title: 'Онлайн-табыштама берүү',
        desc: 'Баштапкы баасын аныктоо үчүн базалык маалыматтарды (үлгүсү, жылы, жүрүшү же сүрөтү) WhatsApp аркылуу жөнөтөсүз.',
      },
      {
        num: '02',
        title: 'Кароо жана бааны бекитүү',
        desc: 'Эксперт 24 саат ичинде карап чыгып, жашыруун төмөндөтүүлөрсүз адилеттүү базар баасын айтат.',
      },
      {
        num: '03',
        title: 'Жаңы батирди тандоо',
        desc: 'EL ORDO GROUP долбоорлорунан жаккан кабатты жана планды чарчы метрдин баасын бекитүү менен тандайсыз.',
      },
      {
        num: '04',
        title: 'ДДУ түзүү жана эсепке алуу',
        desc: 'Сиздин мүлкүңүздүн баасы расмий түрдө биринчи взнос катары эсептелет. Кайра каттоону компания өзүнө алат.',
      },
    ],
  },
  kz: {
    pageTitle: 'Trade-in (Бартер)',
    heroTitle: 'КӨЛІКТІ НЕМЕСЕ ЕСКІ БАСПАНАНЫ ЖАҢА ҮЙГЕ АЙЫРБАСТАУ',
    heroSubtitle: 'EL ORDO GROUP кешендерінен жаңа пәтер алу үшін көлігіңізді немесе ескі пәтеріңізді бастапқы жарна ретінде қолданыңыз. 24 сағатта кезексіз әділ бағалау.',
    noticeText: 'Trade-in бағдарламасы көлік базарында апталап тұрудан және риелторларға комиссия төлеуден құтқарады. Активіңізді әділ нарықтық бағамен бағалап, соманы жаңа пәтердің шотына есептейміз.',
    blockTitle: 'TRADE-IN БАҒДАРЛАМАСЫ ҚАЛАЙ ЖҰМЫС ІСТЕЙДІ',
    descriptionText: 'Жобаларымыздың бірінен пәтер таңдайсыз (ЖК Abu Dhabi, Madina Residence, ЖД Айкол+ немесе Айкол). Сарапшы көлігіңізді немесе мүлкіңізді 24 сағатта әділ бағалайды. Келісілген сома толық көлемде бастапқы жарна ретінде есептеліп, қалдық сомаға 40 айға дейін 0% бөліп төлеу ресімделеді.',
    documentsText: 'Көлік үшін: Техпаспорт және иесінің төлқұжаты. Жылжымайтын мүлік үшін: Құқық белгілейтін құжаттар, БТИ техпаспорты және ауыртпалықтардың жоқтығы туралы анықтама.',
    faqList: [
      {
        q: 'Көлік құны қалай анықталады?',
        a: 'Бағалау нақты нарықтық талдауға (Mashina.kg және нақты мәмілелер) негізделеді. Бағаны негізсіз түсірмейміз.',
      },
      {
        q: 'Көлік құны бастапқы жарнадан асып кетсе ше?',
        a: 'Артық сома пәтердің қалған құнын өтеуге бағытталып, ай сайынғы төлемді азайтады.',
      },
      {
        q: 'Көлік сомасы 30% жарнаға жетпесе не істеу керек?',
        a: 'Жетпеген соманы қолма-қол немесе аударым арқылы толықтыруға болады.',
      },
      {
        q: 'Көлікті қайта тіркеуді кім жүргізеді?',
        a: 'EL ORDO GROUP заңгерлері құжаттарды дайындап, толық сүйемелдейді.',
      },
      {
        q: '104, 105, 106-сериядағы ескі пәтерлер қабылдана ма?',
        a: 'Иә, толық құжаттары бар және кепілде жоқ пәтерлер қабылданады.',
      },
      {
        q: 'Бір пәтерге екі көлік тапсыруға бола ма?',
        a: 'Иә, Trade-in бағдарламасы бірнеше активті біріктіруге мүмкіндік береді.',
      },
      {
        q: 'Бағалау кезінде жаңа пәтердің бағасы бекітіле ме?',
        a: 'Иә, бағалау келісілген сәтте пәтер брондалып, шаршы метр құны ДДУ шартында бекітіледі.',
      },
    ],
    casesBadge: 'Тәжірибелік мысалдар',
    casesTitle: 'Trade-in айырбастаудың нақты сценарийлері',
    casesSubtitle: 'Тұрғындарымыз қосымша қолма-қол қаражатсыз тұрғын үй жағдайын қалай жақсартады',
    cases: [
      {
        asset: 'Toyota Camry 70 (2020 ж.)',
        assetCategory: 'Жеңіл автокөлік',
        valuation: '$24 000',
        valuationKgs: '≈ 2 100 000 сом',
        targetComplex: 'ЖК Madina Residence',
        targetApartment: '1 бөлмелі пәтер (43.59 м²)',
        result: '30% бастапқы жарна толық жабылды ($18 300)',
        surplus: 'Қалған $5 700 ай сайынғы төлемдерге бағытталды',
        badge: 'Танымал айырбас',
        slug: 'madina-residence',
        waText: 'Сәлеметсіз бе! Toyota Camry көлігімді Trade-in бойынша ЖК Madina Residence пәтеріне айырбастағым келеді. Қалай тексеруге болады?',
      },
      {
        asset: 'Lexus GX 460 (2016 ж.)',
        assetCategory: 'Премиум жол талғамайтын көлік',
        valuation: '$38 000',
        valuationKgs: '≈ 3 325 000 сом',
        targetComplex: 'ЖК Abu Dhabi',
        targetApartment: '2 бөлмелі пәтер (78.30 м²)',
        result: 'Бастапқы жарна толық төленді',
        surplus: 'Ай сайынғы төлем 36 айға $1 250 дейін төмендетілді',
        badge: 'Премиум Trade-in',
        slug: 'abu-dhabi',
        waText: 'Сәлеметсіз бе! Жол талғамайтын көлікті ЖК Abu Dhabi кешеніндегі 2 бөлмелі пәтерге айырбастау шарттарын білгім келеді.',
      },
      {
        asset: '105-сериялы 1 бөлмелі пәтер',
        assetCategory: 'Екінші нарықтағы баспана (Бішкек)',
        valuation: '$46 000',
        valuationKgs: '≈ 4 025 000 сом',
        targetComplex: 'ЖД Айкол + (Көк-Жар)',
        targetApartment: 'Кең 2 бөлмелі (74.3 м² тау бөктерінде)',
        result: 'Жаңа пәтер құнының 55%-дан астамы жабылды',
        surplus: 'Қалдық сомаға ыңғайлы мерзімге 0% бөліп төлеу рәсімделді',
        badge: 'Баспана айырбасы',
        slug: 'ajkol-plus',
        waText: 'Сәлеметсіз бе! 1 бөлмелі пәтерді ЖД Айкол+ жаңа пәтеріне Trade-in бойынша айырбастау үшін бағалаушыны қалай шақырамын?',
      },
    ],
    valuationLabel: 'EL ORDO сарапшылық бағалауы:',
    selectedObjectLabel: 'Таңдалған нысан:',
    btnEvaluateCase: 'Көлікті бағалау',
    aboutComplexBtn: 'Кешен туралы',
    tableBadge: 'Уақыт пен қаражатты үнемдеу',
    tableTitle: 'EL ORDO Trade-in немесе көлік базарында сату?',
    tableSubtitle: 'Неліктен құрылыс салушыға тікелей айырбастау өз бетінше сатудан тиімді',
    colCriteria: 'Мәміле критерийі',
    colElOrdo: 'EL ORDO Trade-in',
    colMarket: 'Өз бетінше сату',
    row1Criteria: 'Мәмілені жабу мерзімі',
    row1ElOrdo: 'Бар болғаны 24 сағат',
    row1Market: '1-ден 4 айға дейін',
    row2Criteria: 'Пәтерді брондау және бағаны бекіту',
    row2ElOrdo: 'Пәтер бірден бекітіледі',
    row2Market: 'Пәтер қымбаттап не сатылып кетуі мүмкін',
    row3Criteria: 'Бағаны төмендету мен саудаласу',
    row3ElOrdo: 'Әділ объективті нарықтық баға',
    row3Market: 'Алып-сатарлардың қысымы',
    row4Criteria: 'Комиссиялар мен жарнама шығындары',
    row4ElOrdo: '0 сом (Шығындарды девелопер көтереді)',
    row4Market: 'Жарнама, көлік жуу, базар ақысы, риелторлар',
    row5Criteria: 'Заңдық рәсімдеу',
    row5ElOrdo: 'Компанияның штаттық заңгерлері',
    row5Market: '«Унаа» мекемесіндегі кезектер, тәуекелдер',
    categoriesBadge: 'Активтер критерийлері',
    categoriesTitle: 'Бағдарламаға қандай мүлік қатыса алады',
    requirementsLabel: 'Талаптар:',
    categories: [
      {
        type: 'car',
        title: 'Көліктер мен жол талғамайтын көліктер',
        desc: 'Таза заңдық тарихы бар шетелдік көліктер (Toyota, Lexus, Hyundai, Kia, BMW, Mercedes т.б.).',
        reqs: 'Көлік техпаспорты, иесінің төлқұжаты, айыппұлдар мен тыйымдардың болмауы.',
      },
      {
        type: 'realty',
        title: 'Бішкектегі екінші нарық пәтерлері',
        desc: '104, 105, 106-сериядағы 1, 2, 3 бөлмелі пәтерлер және пайдалануға берілген жаңа үйлер.',
        reqs: 'Құқық белгілейтін құжаттар, БТИ техпаспорты, ауыртпалықтардың болмауы.',
      },
      {
        type: 'land',
        title: 'Жер телімдері мен коммерция',
        desc: 'Бішкекте және оңтүстік бөктерде орналасқан құрылысқа арналған жерлер мен коммерциялық орындар.',
        reqs: 'Қызыл кітап (мемлекеттік акт), құқық құжаттары, келісілген АПУ.',
      },
    ],
    stepsBadge: '24 сағаттық рәсім',
    stepsTitle: 'Trade-in бойынша рәсімдеу кезеңдері',
    steps: [
      {
        num: '01',
        title: 'Онлайн-өтінім беру',
        desc: 'Бастапқы бағаны білу үшін негізгі деректерді (маркасы, жылы, суреті) WhatsApp-қа жібересіз.',
      },
      {
        num: '02',
        title: 'Тексеру және бағаны бекіту',
        desc: 'Сарапшы 24 сағат ішінде қарап, жасырын жеңілдіктерсіз әділ нарықтық бағаны ұсынады.',
      },
      {
        num: '03',
        title: 'Жаңа пәтерді таңдау',
        desc: 'EL ORDO GROUP кешендерінен шаршы метр құнын бекіте отырып, ұнаған қабат пен жоспарды таңдайсыз.',
      },
      {
        num: '04',
        title: 'ДДУ жасасу және өзара есеп',
        desc: 'Мүлкіңіздің құны ресми түрде бастапқы жарна ретінде есептеледі. Қайта тіркеуді заңгерлер атқарады.',
      },
    ],
  },
  uk: {
    pageTitle: 'Trade-in (Бартер)',
    heroTitle: 'ОБМІН АВТОМОБІЛЯ АБО ВТОРИННОГО ЖИТЛА НА НОВОБУДОВУ',
    heroSubtitle: 'Використовуйте ваше авто або вторинну нерухомість як перший внесок за квартиру в житлових комплексах EL ORDO GROUP. Чесна ринкова оцінка за 24 години без авторинку.',
    noticeText: 'Програма Trade-in позбавляє вас необхідності тижнями шукати покупця на авторинку чи платити комісії рієлторам. Ми оцінюємо актив за справедливою ціною та зараховуємо суму у вартість квартири.',
    blockTitle: 'ЯК ПРАЦЮЄ ПРОГРАМА TRADE-IN',
    descriptionText: 'Ви обираєте квартиру в будь-якому з наших проєктів (Abu Dhabi, Madina Residence, Айкол+ чи Айкол). Наш експерт оцінює авто або житло за справедливою ціною за 24 години. Сума повністю зараховується як перший внесок, а на залишок оформлюється розстрочка 0% до 40 місяців.',
    documentsText: 'Для авто: Техпаспорт авто та паспорт власника. Для нерухомості: Правовстановлюючі документи, техпаспорт БТІ та довідка про відсутність арештів.',
    faqList: [
      {
        q: 'Як визначається вартість авто під час оцінки?',
        a: 'Оцінка ґрунтується на детальному ринковому аналізі з урахуванням року, комплектації та технічного стану.',
      },
      {
        q: 'Що якщо оцінка авто перевищує перший внесок?',
        a: 'Уся сума понад перший внесок спрямовується на зменшення загальної суми боргу.',
      },
      {
        q: 'Що робити, якщо вартості авто недостатньо?',
        a: 'Різницю можна доплатити коштами або узгодити персональний графік.',
      },
      {
        q: 'Хто здійснює переоформлення автомобіля?',
        a: 'Юридичний відділ компанії бере на себе всі процедури оформлення.',
      },
      {
        q: 'Чи приймаються старі квартири?',
        a: 'Так, ліквідне вторинне житло за наявності чистих документів.',
      },
      {
        q: 'Чи можна здати два автомобілі?',
        a: 'Так, можливо комбінувати кілька авто або авто з доплатою.',
      },
      {
        q: 'Чи фіксується ціна нової квартири?',
        a: 'Так, ціна квадратного метра фіксується в офіційному ДДУ в момент оцінки.',
      },
    ],
    casesBadge: 'Практичні приклади',
    casesTitle: 'Реальні сценарії зарахування Trade-in',
    casesSubtitle: 'Як резиденти покращують житлові умови без вільних готівкових коштів',
    cases: [
      {
        asset: 'Toyota Camry 70 (2020 р.)',
        assetCategory: 'Легковий автомобіль',
        valuation: '$24 000',
        valuationKgs: '≈ 2 100 000 сом',
        targetComplex: 'ЖК Madina Residence',
        targetApartment: '1-кімнатна квартира (43.59 м²)',
        result: 'Перший внесок 30% закрито повністю ($18 300)',
        surplus: 'Залишок $5 700 зараховано у щомісячні платежі',
        badge: 'Популярний обмін',
        slug: 'madina-residence',
        waText: 'Доброго дня! Хочу обміняти автомобіль за програмою Trade-in на квартиру в ЖК Madina Residence.',
      },
      {
        asset: 'Lexus GX 460 (2016 р.)',
        assetCategory: 'Преміум-позашляховик',
        valuation: '$38 000',
        valuationKgs: '≈ 3 325 000 сом',
        targetComplex: 'ЖК Abu Dhabi',
        targetApartment: '2-кімнатна квартира (78.30 м²)',
        result: 'Перший внесок 30% сплачено повністю',
        surplus: 'Щомісячний платіж знижено до $1 250 на 36 місяців',
        badge: 'Преміум Trade-in',
        slug: 'abu-dhabi',
        waText: 'Доброго дня! Цікавить обмін позашляховика на 2-кімнатну квартиру в ЖК Abu Dhabi.',
      },
      {
        asset: '1-кімн. квартира 105 серії',
        assetCategory: 'Вторинне житло (Бішкек)',
        valuation: '$46 000',
        valuationKgs: '≈ 4 025 000 сом',
        targetComplex: 'ЖД Айкол + (Кок-Жар)',
        targetApartment: '2-кімнатна (74.3 м² у передгір’ї)',
        result: 'Покрито понад 55% вартості нової квартири',
        surplus: 'Мінімальний залишок у розстрочку 0%',
        badge: 'Обмін житла',
        slug: 'ajkol-plus',
        waText: 'Доброго дня! Хочу обміняти вторинну квартиру на нову в ЖД Айкол+ за Trade-in.',
      },
    ],
    valuationLabel: 'Оцінка експерта EL ORDO:',
    selectedObjectLabel: 'Обраний об’єкт:',
    btnEvaluateCase: 'Оцінити авто',
    aboutComplexBtn: 'Про комплекс',
    tableBadge: 'Економія часу та коштів',
    tableTitle: 'Trade-in EL ORDO чи продаж на ринку?',
    tableSubtitle: 'Чому обмін безпосередньо забудовнику вигідніший за самостійний продаж',
    colCriteria: 'Критерій угоди',
    colElOrdo: 'Trade-in в EL ORDO',
    colMarket: 'Самостійний продаж',
    row1Criteria: 'Термін закриття угоди',
    row1ElOrdo: 'Всього 24 години',
    row1Market: 'від 1 до 4 місяців',
    row2Criteria: 'Бронь квартири та фіксація ціни',
    row2ElOrdo: 'Квартира бронюється одразу',
    row2Market: 'Квартира може подорожчати',
    row3Criteria: 'Торг та збивання ціни',
    row3ElOrdo: 'Чесна ринкова вартість',
    row3Market: 'Постійний тиск перекупників',
    row4Criteria: 'Комісії та реклама',
    row4ElOrdo: '0 сом (Витрати бере забудовник)',
    row4Market: 'Оплата реклами, авторинку, рієлторів',
    row5Criteria: 'Юридичне оформлення',
    row5ElOrdo: 'Штатні юристи компанії',
    row5Market: 'Черги в установах, ризики розрахунків',
    categoriesBadge: 'Критерії активів',
    categoriesTitle: 'Яке майно бере участь у програмі',
    requirementsLabel: 'Вимоги:',
    categories: [
      {
        type: 'car',
        title: 'Автомобілі та позашляховики',
        desc: 'Іномарки у справному стані з прозорою історією (Toyota, Lexus, Hyundai, Kia, BMW тощо).',
        reqs: 'Техпаспорт, паспорт власника, відсутність штрафів та обтяжень.',
      },
      {
        type: 'realty',
        title: 'Вторинні квартири у Бішкеку',
        desc: '1-, 2-, 3-кімнатні квартири типових серій або здані новобудови.',
        reqs: 'Правовстановлюючі документи, техпаспорт БТІ, довідка про відсутність арештів.',
      },
      {
        type: 'land',
        title: 'Земельні ділянки та комерція',
        desc: 'Ліквідні ділянки під будівництво у Бішкеку та комерційні приміщення.',
        reqs: 'Червона книга (держакт), правовстановлюючі документи.',
      },
    ],
    stepsBadge: 'Процедура за 24 години',
    stepsTitle: 'Етапи оформлення за Trade-in',
    steps: [
      {
        num: '01',
        title: 'Подання онлайн-заявки',
        desc: 'Надсилаєте базові дані нам у WhatsApp для попереднього погодження діапазону вартості.',
      },
      {
        num: '02',
        title: 'Огляд та фіксація ціни',
        desc: 'Експерт оглядає об\'єкт і протягом 24 годин озвучує справедливу ринкову ціну.',
      },
      {
        num: '03',
        title: 'Вибір нової квартири',
        desc: 'Бронюєте планування та поверх у будь-якому комплексі з фіксацією ціни.',
      },
      {
        num: '04',
        title: 'Підписання ДДУ та взаємозалік',
        desc: 'Вартість майна зараховується як перший внесок. Юристи компанії оформлюють документи.',
      },
    ],
  },
  en: {
    pageTitle: 'Trade-in (Barter)',
    heroTitle: 'TRADE YOUR CAR OR PROPERTY FOR A BRAND NEW HOME',
    heroSubtitle: 'Use your current vehicle or secondary property as the initial down payment for an apartment in modern EL ORDO GROUP developments. Fair market evaluation within 24 hours without marketplaces.',
    noticeText: 'The Trade-in program saves you from spending weeks negotiating on auto markets or paying realtor commissions. We evaluate your asset at fair market value and immediately apply the amount toward your new home.',
    blockTitle: 'HOW THE TRADE-IN PROGRAM WORKS',
    descriptionText: 'Choose an apartment in any of our projects (Abu Dhabi RC, Madina Residence, Aykol+ or Aykol). Our certified appraiser evaluates your car or secondary property at fair market value within 24 hours. The agreed amount is fully credited toward your down payment or upfront cost, with remaining balance financed via 0% installment up to 40 months.',
    documentsText: 'For vehicles: Vehicle Registration Certificate (technical passport) and owner\'s passport. For real estate: Property ownership deeds, BTI title passport, and encumbrance-free certificate.',
    faqList: [
      {
        q: 'How is the car\'s valuation determined?',
        a: 'Evaluation is based on market dynamics, model year, trim specifications, mileage, and technical condition.',
      },
      {
        q: 'What if the car\'s value exceeds the required down payment?',
        a: 'Any surplus is deducted from the principal apartment price, reducing subsequent monthly installments.',
      },
      {
        q: 'What if the car\'s valuation does not cover 30%?',
        a: 'The difference can be settled in cash or added to an individualized payment plan.',
      },
      {
        q: 'Who handles the vehicle title re-registration?',
        a: 'The legal department of EL ORDO GROUP prepares all documentation and assists with re-registration.',
      },
      {
        q: 'Are older apartments accepted for trade-in?',
        a: 'Yes, secondary market apartments in Bishkek are accepted with full ownership documentation.',
      },
      {
        q: 'Can I trade in two cars for a single apartment?',
        a: 'Yes, combining multiple assets or a car plus cash is supported under the program.',
      },
      {
        q: 'Is the price of the new apartment locked upon evaluation?',
        a: 'Yes. The chosen unit is reserved and its price per square meter is secured in the official DDU agreement.',
      },
    ],
    casesBadge: 'Practical Cases',
    casesTitle: 'Real Trade-in Scenarios',
    casesSubtitle: 'How our residents upgrade their living standards without surplus cash reserves',
    cases: [
      {
        asset: 'Toyota Camry 70 (2020)',
        assetCategory: 'Passenger Sedan',
        valuation: '$24,000',
        valuationKgs: '≈ 2,100,000 KGS',
        targetComplex: 'Madina Residence',
        targetApartment: '1-Room Apartment (43.59 m²)',
        result: '30% Down Payment Fully Covered ($18,300)',
        surplus: 'Remaining $5,700 credited toward monthly installments',
        badge: 'Popular Exchange',
        slug: 'madina-residence',
        waText: 'Hello! I want to trade in my passenger car for an apartment in Madina Residence. How do I schedule an inspection?',
      },
      {
        asset: 'Lexus GX 460 (2016)',
        assetCategory: 'Premium SUV',
        valuation: '$38,000',
        valuationKgs: '≈ 3,325,000 KGS',
        targetComplex: 'Abu Dhabi RC',
        targetApartment: '2-Room Apartment (78.30 m²)',
        result: '30% Down Payment Paid in Full',
        surplus: 'Monthly payment reduced to $1,250/mo over 36 months',
        badge: 'Premium Trade-in',
        slug: 'abu-dhabi',
        waText: 'Hello! Inquiring about trading in an SUV for a 2-room apartment in Abu Dhabi RC via Trade-in.',
      },
      {
        asset: '1-Room Apartment (Series 105)',
        assetCategory: 'Secondary Property (Bishkek)',
        valuation: '$46,000',
        valuationKgs: '≈ 4,025,000 KGS',
        targetComplex: 'Aykol + (Kok-Jar)',
        targetApartment: 'Spacious 2-Room (74.3 m² foothills)',
        result: 'Covered over 55% of the new apartment cost',
        surplus: 'Minimal balance financed at 0% installment',
        badge: 'Property Exchange',
        slug: 'ajkol-plus',
        waText: 'Hello! I would like to exchange an older 1-room apartment for a new unit in Aykol+ (Kok-Jar) via Trade-in.',
      },
    ],
    valuationLabel: 'EL ORDO Expert Valuation:',
    selectedObjectLabel: 'Selected Property:',
    btnEvaluateCase: 'Evaluate Similar Vehicle',
    aboutComplexBtn: 'About Complex',
    tableBadge: 'Time & Money Savings',
    tableTitle: 'EL ORDO Trade-in vs Car Market Sale?',
    tableSubtitle: 'Why direct exchange with developer is more beneficial than independent sale',
    colCriteria: 'Deal Criteria',
    colElOrdo: 'Trade-in at EL ORDO',
    colMarket: 'Independent Sale',
    row1Criteria: 'Deal Closing Time',
    row1ElOrdo: 'Only 24 hours',
    row1Market: '1 to 4 months',
    row2Criteria: 'Apartment Reservation & Locked Price',
    row2ElOrdo: 'Apartment reserved immediately',
    row2Market: 'Unit may sell out or increase in price',
    row3Criteria: 'Price Haggling & Undervaluation',
    row3ElOrdo: 'Fair objective market price',
    row3Market: 'Constant pressure from bargain hunters',
    row4Criteria: 'Commissions & Ad Costs',
    row4ElOrdo: '$0 (Developer covers all expenses)',
    row4Market: 'Online listings, car wash, market fees, agents',
    row5Criteria: 'Legal Formalities',
    row5ElOrdo: 'In-house company legal team',
    row5Market: 'Registry queues, transaction risks',
    categoriesBadge: 'Asset Criteria',
    categoriesTitle: 'Eligible Property for the Program',
    requirementsLabel: 'Requirements:',
    categories: [
      {
        type: 'car',
        title: 'Cars & SUVs',
        desc: 'Liquid vehicles (Toyota, Lexus, Hyundai, Kia, BMW, Mercedes, etc.) in sound mechanical condition with clean legal titles.',
        reqs: 'Vehicle technical passport, owner ID, clear of liens and fines.',
      },
      {
        type: 'realty',
        title: 'Secondary Apartments in Bishkek',
        desc: '1-, 2-, 3-room apartments of standard series or commissioned new builds in city limits.',
        reqs: 'Title deeds, BTI technical passport, clear of encumbrances.',
      },
      {
        type: 'land',
        title: 'Land Plots & Commercial',
        desc: 'Plots designated for residential development in Bishkek and southern foothills, plus commercial spaces.',
        reqs: 'Red Book state title act, legal documents, approved master plan.',
      },
    ],
    stepsBadge: '24-Hour Procedure',
    stepsTitle: 'Trade-in Deal Execution Stages',
    steps: [
      {
        num: '01',
        title: 'Submit Online Inquiry',
        desc: 'Send basic vehicle or property specifications to our WhatsApp for initial price range assessment.',
      },
      {
        num: '02',
        title: 'Inspection & Price Lock',
        desc: 'Company appraiser inspects the asset and confirms an objective fair market value within 24 hours.',
      },
      {
        num: '03',
        title: 'Choose New Apartment',
        desc: 'Reserve your desired floor plan in any EL ORDO GROUP development with a locked square-meter rate.',
      },
      {
        num: '04',
        title: 'Sign Contract & Credit Balance',
        desc: 'Asset value is formally credited as your down payment. Legal counsel handles all title transfers.',
      },
    ],
  },
  zh: {
    pageTitle: '以旧换新 (Trade-in)',
    heroTitle: '汽车或二手房产直接置换高品质新居',
    heroSubtitle: '使用您的现有汽车或二手房产作为首付款，轻松置业 EL ORDO GROUP 旗下现代住宅区。专业评估团队24小时公允估值，无需奔波二手车市。',
    noticeText: '以旧换新置换服务让您免于耗费数月在二手车市或房产中介苦等买家。我们按公允市场价值评估您的资产，评估款项直接抵扣新房购房款。',
    blockTitle: '以旧换新（置换）运作模式',
    descriptionText: '您可在旗下任一热销项目中挑选心仪房源（阿布扎比、玛迪娜公馆、艾科尔+或艾科尔）。我们的持证评估师将在24小时内按公允市价出具客观估值，该笔款项全额冲抵新房首付或部分房款，余款可享受最长40个月的0%免息分期。',
    documentsText: '车辆所需：车辆行驶证（产权证书）及车主身份证明。房产所需：不动产权属证明文件、BTI房屋技术档案及无司法查封抵押证明。',
    faqList: [
      {
        q: '车辆折价估值是如何确定的？',
        a: '评估基于本地二手车大盘成交数据，综合年份、配置、里程数及实际车况出具公允市价，绝无恶意压价。',
      },
      {
        q: '若车辆估值高于约定首付怎么办？',
        a: '超出首付款的金额将全部直接抵充新房后续款项，按比例降低每月分期月供或缩短还款期限。',
      },
      {
        q: '若车辆估值不足30%首付该如何处理？',
        a: '差额部分可通过现金、银行转账补齐，或与我们协商个性化的补足付款方案。',
      },
      {
        q: '车辆过户手续由谁负责办理？',
        a: 'EL ORDO GROUP 专业法务团队全程代办车辆过户与车管所登记手续，快捷合规。',
      },
      {
        q: '老旧二手房（104、105、106系列）是否支持置换？',
        a: '支持。只要产权清晰、无司法查封抵押且证件齐全的二手房均可参与置换评估。',
      },
      {
        q: '能否同时置换两辆汽车冲抵一套新房？',
        a: '可以。以旧换新支持组合置换，例如同时置换两辆汽车，或汽车搭配部分现金。',
      },
      {
        q: '在评估期间所选新房价格是否会被锁定？',
        a: '是的。在双方确认评估方案的瞬间，您所选房源立即被锁定保留，每平米单价正式录入官方合同。',
      },
    ],
    casesBadge: '真实置换案例',
    casesTitle: '以旧换新真实落地场景',
    casesSubtitle: '看我们的业主如何在无需动用大额流动资金的前提下实现居住品质升级',
    cases: [
      {
        asset: '丰田凯美瑞 70 (2020年款)',
        assetCategory: '家用轿车',
        valuation: '$24 000',
        valuationKgs: '≈ 2 100 000 索姆',
        targetComplex: '玛迪娜公馆 (Madina Residence)',
        targetApartment: '一居室品质户型 (43.59 м²)',
        result: '30%首付款全额冲抵 ($18 300)',
        surplus: '结余 $5 700 直接冲抵后续月供',
        badge: '经典热门置换',
        slug: 'madina-residence',
        waText: '您好！我想通过以旧换新置换服务，用轿车置换玛迪娜公馆的房源，请问如何预约上门查验车况？',
      },
      {
        asset: '雷克萨斯 GX 460 (2016年款)',
        assetCategory: '高端豪华越野车',
        valuation: '$38 000',
        valuationKgs: '≈ 3 325 000 索姆',
        targetComplex: '阿布扎比住宅区 (Abu Dhabi)',
        targetApartment: '奢阔两居室 (78.30 м²)',
        result: '30%首付款全额结清',
        surplus: '36期分期月供大幅降低至 $1 250/月',
        badge: '豪华车尊享置换',
        slug: 'abu-dhabi',
        waText: '您好！我想用豪华越野车置换阿布扎比住宅区的两居室房源，请告知评估及签约流程。',
      },
      {
        asset: '105系列单身公寓二手房',
        assetCategory: '比什凯克存量二手房',
        valuation: '$46 000',
        valuationKgs: '≈ 4 025 000 索姆',
        targetComplex: '艾科尔+ (Aykol +)',
        targetApartment: '山麓两居室 (74.3 м²)',
        result: '折抵新房总房款55%以上',
        surplus: '极低剩余尾款享受0%超长免息分期',
        badge: '以旧换新置业',
        slug: 'ajkol-plus',
        waText: '您好！我想用市区旧房置换艾科尔+的生态新居，请安排专业房屋评估师联系我。',
      },
    ],
    valuationLabel: 'EL ORDO 专业评估估值:',
    selectedObjectLabel: '所选置换新居:',
    btnEvaluateCase: '评估类似车辆',
    aboutComplexBtn: '了解楼盘详情',
    tableBadge: '省时省心省费',
    tableTitle: 'EL ORDO 置换 vs 自行二手车市出售',
    tableSubtitle: '为何直接与品牌开发商置换比自行寻找二手买家更加省心高效',
    colCriteria: '对比指标',
    colElOrdo: 'EL ORDO 以旧换新',
    colMarket: '自行挂牌出售',
    row1Criteria: '成交周期',
    row1ElOrdo: '仅需 24 小时',
    row1Market: '通常需要 1 至 4 个月',
    row2Criteria: '心仪房源锁定与保价',
    row2ElOrdo: '即刻锁定房号与价格',
    row2Market: '新房可能随时涨价或售罄',
    row3Criteria: '议价压力与恶意压价',
    row3ElOrdo: '公允客观的市场评估价',
    row3Market: '面临车贩与中介反复压价',
    row4Criteria: '佣金与广告整备成本',
    row4ElOrdo: '0 索姆 (开发商承担全部手续费)',
    row4Market: '广告置顶费、洗车整备、中介佣金',
    row5Criteria: '法务与过户手续',
    row5ElOrdo: '公司法务专人全程协助',
    row5Market: '车管所排队耗时，存在资金安全风险',
    categoriesBadge: '置换资产范围',
    categoriesTitle: '可参与置换计划的资产类别',
    requirementsLabel: '基本要求:',
    categories: [
      {
        type: 'car',
        title: '品牌乘用车与越野车',
        desc: '车况良好、无重大事故及产权清晰的各主流合资与进口品牌汽车（丰田、雷克萨斯、现代、起亚、宝马、奔驰等）。',
        reqs: '车辆行驶证及权属证书、车主有效证件、无未处理扣分罚款及查封。',
      },
      {
        type: 'realty',
        title: '比什凯克市区二手房产',
        desc: '104、105、106等系列一至三居室二手公寓，或已竣工交付办结产权的新楼盘住宅。',
        reqs: '房屋所有权凭证、BTI技术测绘档案、无抵押查封公证书。',
      },
      {
        type: 'land',
        title: '优质住宅用地与商办',
        desc: '位于比什凯克市区及南部宜居山麓的自建住宅用地（ИЖС），以及核心地段商铺。',
        reqs: '国家土地红本、规划许可证、权属清晰无争议。',
      },
    ],
    stepsBadge: '24小时极速通道',
    stepsTitle: '以旧换新4步极速置业流程',
    steps: [
      {
        num: '01',
        title: '提交在线置换意向',
        desc: '将车辆或房产的基础信息（品牌、年份、里程或房屋实景图）发送至官方 WhatsApp 预估区间。',
      },
      {
        num: '02',
        title: '专业勘验并锁定估值',
        desc: '专业评估顾问现场勘验车况或房况，并在24小时内正式出具公正透明的收购定价。',
      },
      {
        num: '03',
        title: '优选开发商热销新居',
        desc: '在 EL ORDO GROUP 任一住宅项目中挑选心仪户型与景观楼层，即刻锁定房源单价。',
      },
      {
        num: '04',
        title: '签署合同并折抵首付',
        desc: '旧资产评估款项全额折抵为新房首付款，法务团队协助办理全套合法过户手续。',
      },
    ],
  },
};

export default function TradeInPage() {
  const { locale } = useLanguage();
  const lang: Locale = (locale as Locale) || 'ru';
  const c = CONTENT[lang] || CONTENT.ru;

  return (
    <PaymentLayout
      pageTitle={c.pageTitle}
      currentSlug="trade-in"
      heroTitle={c.heroTitle}
      heroSubtitle={c.heroSubtitle}
      noticeText={c.noticeText}
      blockTitle={c.blockTitle}
      descriptionText={c.descriptionText}
      documentsText={c.documentsText}
      faqList={c.faqList}
    >
      {/* 1. КЕЙСЫ РЕАЛЬНОГО ОБМЕНА */}
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
              <div className="absolute -top-3 right-6 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                {item.badge}
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 dark:text-neutral-400 block mb-1">
                  {item.assetCategory}
                </span>
                <h4 className="text-lg font-black text-gray-950 dark:text-white mb-1 leading-snug">
                  {item.asset}
                </h4>

                <div className="p-3 rounded-2xl bg-[#f2f6f4] dark:bg-[#040c09] border border-[#064734]/15 dark:border-white/10 my-4 transition-colors">
                  <span className="text-[11px] text-gray-500 dark:text-neutral-400 font-semibold block">
                    {c.valuationLabel}
                  </span>
                  <div className="text-2xl font-black text-[#064734] dark:text-[#d4b26f] my-0.5">
                    {item.valuation}
                  </div>
                  <span className="text-[11px] font-bold text-[#064734]/80 dark:text-neutral-300 block">
                    {item.valuationKgs}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs border-t border-gray-100 dark:border-white/10 pt-3">
                  <div>
                    <span className="text-gray-400 dark:text-neutral-400 block text-[11px]">{c.selectedObjectLabel}</span>
                    <strong className="text-gray-900 dark:text-white font-extrabold text-sm block">
                      {item.targetComplex}
                    </strong>
                    <span className="text-gray-600 dark:text-gray-300 text-[11px]">{item.targetApartment}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold text-[11px] leading-relaxed flex items-center gap-1.5 border border-emerald-200/50 dark:border-emerald-900/50">
                    <IconCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{item.result}</span>
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-neutral-400 leading-relaxed pl-1">
                    {item.surplus}
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
                  <span>{c.btnEvaluateCase}</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </a>
                <Link
                  href={`/${item.slug}`}
                  className="block w-full text-center py-1.5 text-[11px] font-bold text-gray-500 dark:text-neutral-400 hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors"
                >
                  {c.aboutComplexBtn} {item.targetComplex}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. СРАВНЕНИЕ: TRADE-IN EL ORDO vs САМОСТОЯТЕЛЬНАЯ ПРОДАЖА */}
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
                  {c.colMarket}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10 text-gray-700 dark:text-gray-300">
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row1Criteria}</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20">
                  {c.row1ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-600 dark:text-neutral-400">
                  {c.row1Market}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row2Criteria}</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20">
                  {c.row2ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-rose-600 dark:text-rose-400 font-medium">
                  {c.row2Market}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row3Criteria}</td>
                <td className="py-3.5 px-3 font-semibold text-gray-900 dark:text-gray-200 bg-emerald-50/40 dark:bg-emerald-950/20">
                  {c.row3ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-500 dark:text-neutral-400">
                  {c.row3Market}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row4Criteria}</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20">
                  {c.row4ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-500 dark:text-neutral-400">
                  {c.row4Market}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row5Criteria}</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-b-xl">
                  {c.row5ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-500 dark:text-neutral-400">
                  {c.row5Market}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. ЧТО МЫ ПРИНИМАЕМ В ЗАЧЕТ */}
      <div className="my-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            {c.categoriesBadge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
            {c.categoriesTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0b1b15] p-7 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-xl dark:hover:border-[#d4b26f]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center mb-5">
                  {cat.type === 'car' && <IconCar className="w-7 h-7 text-[#064734] dark:text-[#d4b26f]" />}
                  {cat.type === 'realty' && <IconBuilding className="w-7 h-7 text-[#064734] dark:text-[#d4b26f]" />}
                  {cat.type === 'land' && (
                    <svg className="w-7 h-7 text-[#064734] dark:text-[#d4b26f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  )}
                </div>
                <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2">
                  {cat.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {cat.desc}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#040c09] border border-gray-100 dark:border-white/10 text-[11px] text-gray-500 dark:text-neutral-400">
                <strong className="text-gray-900 dark:text-white block mb-0.5">{c.requirementsLabel}</strong>
                {cat.reqs}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ПОШАГОВЫЙ РЕГЛАМЕНТ СДЕЛКИ */}
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