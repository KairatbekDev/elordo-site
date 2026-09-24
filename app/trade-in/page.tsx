'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import PaymentLayout from '@/components/PaymentLayout';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { trackWhatsAppClick, trackLeadSubmit } from '@/lib/analytics';
import { getStoredUtm } from '@/lib/utm';
import {
  IconCheck,
  IconCar,
  IconBuilding,
  IconWhatsApp,
  IconArrowRight,
  IconShieldCheck,
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
  calcBadge: string;
  calcTitle: string;
  calcDesc: string;
  tabAuto: string;
  tabRealty: string;
  targetComplexLabel: string;
  targetComplexAll: string;
  roomsLabel: string;
  rooms1: string;
  rooms2: string;
  rooms3: string;
  labelAutoModel: string;
  phAutoModel: string;
  labelRealtyAddress: string;
  phRealtyAddress: string;
  labelYear: string;
  phYear: string;
  labelPhone: string;
  labelEstimated: string;
  phEstimated: string;
  btnSubmit: string;
  photoTip: string;
  previewTitle: string;
  previewDownCovered: string;
  previewRemaining: string;
  downPaymentRequiredLabel: string;
  cashNeededLabel: string;
  monthlyEstimateLabel: string;
  totalApartmentCostLabel: string;
  somUnit: string;
}

const CONTENT: Record<Locale, TradeInContent> = {
  ru: {
    pageTitle: 'Trade-in (Бартер)',
    heroTitle: 'ОБМЕН АВТОМОБИЛЯ ИЛИ ВТОРИЧНОГО ЖИЛЬЯ НА НОВОСТРОЙКУ',
    heroSubtitle: 'Используйте ваше текущее авто или вторичную недвижимость как первоначальный взнос за квартиру в современных жилых комплексах EL ORDO GROUP. Честная рыночная оценка за 24 часа без очередей и авторынков.',
    noticeText: 'Программа Trade-in избавляет вас от необходимости неделями стоять на авторынке или искать покупателя на старое жилье через риелторов с комиссиями. Мы оцениваем ваш актив по объективной рыночной стоимости и сразу засчитываем эту сумму в счет покупки новой квартиры.',
    blockTitle: 'КАК РАБОТАЕТ ПРОГРАММА TRADE-IN',
    descriptionText: 'Вы выбираете квартиру в любом из наших проектов (ЖК Abu Dhabi, Madina Residence, ЖД Айкол+ или Айкол). Наш эксперт проводит оценку вашего автомобиля или вторичной недвижимости по честной рыночной цене за 24 часа. Согласованная сумма в полном объеме засчитывается в качестве первоначального взноса или частичной оплаты, а на остаток оформляется беспроцентная рассрочка 0% до 36 месяцев.',
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
        result: 'Первый взнос 30% закрыт полностью ($19 615)',
        surplus: 'Остаток $4 385 пошел в счет ежемесячных платежей',
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
        result: 'Покрыто более 50% от стоимости новой квартиры',
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
    calcBadge: 'Интерактивный расчет зачета',
    calcTitle: 'Рассчитайте покрытие вашей квартиры',
    calcDesc: 'Укажите ориентировочную стоимость вашего актива, чтобы узнать остаток суммы в рассрочку 0%.',
    tabAuto: 'Автомобиль',
    tabRealty: 'Недвижимость',
    targetComplexLabel: 'В счет какого ЖК зачесть:',
    targetComplexAll: 'Любой объект компании',
    roomsLabel: 'Желаемая комнатность:',
    rooms1: '1-комн.',
    rooms2: '2-комн.',
    rooms3: '3-комн.',
    labelAutoModel: 'Марка, модель и год выпуска авто:',
    phAutoModel: 'Например: Toyota Camry 70, 2021',
    labelRealtyAddress: 'Адрес и параметры вторичной квартиры:',
    phRealtyAddress: 'Например: 2-комн., 60 м², ул. Киевская',
    labelYear: 'Год выпуска / Состояние:',
    phYear: 'Например: 2021, отличное состояние',
    labelPhone: 'Ваш телефон для связи:',
    labelEstimated: 'Оценочная стоимость актива ($):',
    phEstimated: '25 000',
    btnSubmit: 'Получить официальную экспресс-оценку',
    photoTip: '📸 Фотографии машины или техпаспорта можно прикрепить прямо в диалоге WhatsApp для подтверждения суммы за 2 часа.',
    previewTitle: 'Результат покрытия стоимости:',
    previewDownCovered: '✓ Полностью закрывает 30% взнос (наличными = $0)!',
    previewRemaining: 'Остаток к доплате в рассрочку 0%:',
    downPaymentRequiredLabel: 'Первый взнос (30%):',
    cashNeededLabel: 'Доплата наличными:',
    monthlyEstimateLabel: 'Платеж по 0% рассрочке:',
    totalApartmentCostLabel: 'Ориентир цены квартиры:',
    somUnit: 'сом',
  },
  kg: {
    pageTitle: 'Trade-in (Бартер)',
    heroTitle: 'УНААНЫ ЖЕ ЭСКИ ТУРАК ЖАЙДЫ ЖАҢЫ КВАРТИРАГА АЛМАШТЫРУУ',
    heroSubtitle: 'Машинаңызды же эски батирди сатууга айларча убакыт сарптабаңыз. Биз сиздин мүлкүңүздү 24 саатта базар баасы менен баалап, алгачкы төлөм катары эсептейбиз.',
    noticeText: 'EL ORDO GROUP компаниясынын Trade-in программасы унаасын же эски мүлкүн убакыт жоготпостон биздин комплекстердеги батирлерге алмаштырууну каалагандар үчүн түзүлгөн.',
    blockTitle: 'TRADE-IN ПРОГРАММАСЫНЫН ШАРТТАРЫ ЖАНА АРТЫКЧЫЛЫКТАРЫ',
    descriptionText: 'Биздин эксперттер мүлкүңүзгө көз карандысыз базар баасын аныктайт. Макулдашылган сумма жаңы батирдин баштапкы төлөмү катары түздөн-түз эсепке алынат. Калган бөлүгүн 36 айга чейин 0% бөлүп төлөөгө тариздей аласыз.',
    documentsText: 'Унаалар үчүн техникалык паспорт жана ээсинин паспорту талап кылынат. Кыймылсыз мүлк үчүн — укук күбөлөндүрүүчү документтер жана камакка алынбагандыгы тууралуу маалымкат.',
    faqList: [
      { q: 'Кандай маркадагы унаалар кабыл алынат?', a: 'Биз укуктук жактан таза, жакшы техникалык абактагы жеңил унааларды жана кроссоверлерди карайбыз.' },
      { q: 'Эгерде унаанын баасы биринчи төлөмдөн жогору болсочу?', a: 'Ашык сумма ай сайын төлөмдөргө эсептелет.' },
      { q: 'Баалоо канча убакыт алат?', a: 'Онлайн баалоо 2 саат, акыркы экспертиза 24 саат.' },
      { q: 'Бишкектин башка районундагы эски батирди өткөрсө болобу?', a: 'Ооба, юристтер жардам берет.' },
      { q: 'Унааны каттонон өзүм чечишим керекпи?', a: 'Компания өзүнө алат.' },
    ],
    casesBadge: 'Практикалык мисалдар',
    casesTitle: 'Trade-in алмашуунун реалдуу сценарийлери',
    casesSubtitle: 'Кошумча накталай каражатсыз эле турак жай шарттарын жакшыртуу',
    cases: [
      {
        asset: 'Toyota Camry 70 (2020-ж.)',
        assetCategory: 'Жеңил унаа',
        valuation: '$24 000',
        valuationKgs: '≈ 2 100 000 сом',
        targetComplex: 'ЖК Madina Residence',
        targetApartment: '1 бөлмөлүү батир (43.59 м²)',
        result: '30% баштапкы төлөм толук жабылды ($19 615)',
        surplus: 'Калган $4 385 ай сайын төлөмдөргө которулду',
        badge: 'Популярдуу алмашуу',
        slug: 'madina-residence',
        waText: 'Саламатсызбы! Toyota Camry унаамды Trade-in аркылуу ЖК Madina Residence батирине алмаштыргым келет.',
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
        result: 'Жаңы батирдин наркынын 50%дан ашыгы жабылды',
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
    colCriteria: 'Критерий',
    colElOrdo: 'EL ORDO Trade-in',
    colMarket: 'Өз алдынча сатуу',
    row1Criteria: 'Бүтүмдү жабуу мөөнөтү',
    row1ElOrdo: 'Болгону 24 саат',
    row1Market: '1ден 4 айга чейин',
    row2Criteria: 'Батирди брондоо жана бааны бекитүү',
    row2ElOrdo: 'Батир дароо бекитилет',
    row2Market: 'Батир кымбаттап кетиши мүмкүн',
    row3Criteria: 'Бааны түшүрүү жана соодалашуу',
    row3ElOrdo: 'Адилеттүү базар баасы',
    row3Market: 'Алып-сатарлардын басымы',
    row4Criteria: 'Комиссиялар жана чыгымдар',
    row4ElOrdo: '0 сом (Бардык чыгымдар куруучудан)',
    row4Market: 'Жарнама, базар акысы',
    row5Criteria: 'Юридикалык тариздөө',
    row5ElOrdo: 'Компаниянын штаттык юристтери',
    row5Market: 'Кезектер, тобокелдиктер',
    categoriesBadge: 'Активдердин критерийлери',
    categoriesTitle: 'Программага кандай мүлктөр катыша алат',
    requirementsLabel: 'Талаптар:',
    categories: [
      { type: 'car', title: 'Унаалар', desc: 'Таза юридикалык тарыхы бар техникалык жактан жакшы чет элдик унаалар.', reqs: 'Техпаспорт, паспорт.' },
      { type: 'realty', title: 'Бишкектеги экинчилик батирлер', desc: '104, 105, 106-сериялардагы батирлер.', reqs: 'Документтер, техпаспорт.' },
      { type: 'land', title: 'Жер тилкелери', desc: 'ИЖС жерлери.', reqs: 'Кызыл китеп.' },
    ],
    stepsBadge: '24 сааттык жол-жобо',
    stepsTitle: 'Trade-in боюнча тариздөө этаптары',
    steps: [
      { num: '01', title: 'Онлайн-табыштама', desc: 'Маалыматты WhatsApp аркылуу жөнөтөсүз.' },
      { num: '02', title: 'Кароо жана бааны бекитүү', desc: 'Эксперт 24 саатта базар баасын айтат.' },
      { num: '03', title: 'Жаңы батирди тандоо', desc: 'Долбоорлордон кабатты тандайсыз.' },
      { num: '04', title: 'ДДУ түзүү', desc: 'Мүлкүңүз баштапкы төлөм катары эсептелет.' },
    ],
    calcBadge: 'Интерактивдүү баалоо',
    calcTitle: 'Батириңиздин жабылышын эсептеңиз',
    calcDesc: '0% бөлүп төлөө калган суммасын билүү үчүн мүлкүңүздүн баасын жазыңыз.',
    tabAuto: 'Унаа',
    tabRealty: 'Мүлк',
    targetComplexLabel: 'Кайсы ЖК эсебине алуу:',
    targetComplexAll: 'Компаниянын каалаган объектиси',
    roomsLabel: 'Бөлмө саны:',
    rooms1: '1 бөлмөлүү',
    rooms2: '2 бөлмөлүү',
    rooms3: '3 бөлмөлүү',
    labelAutoModel: 'Унаанын маркасы, модели жана жылы:',
    phAutoModel: 'Мисалы: Toyota Camry 70, 2021',
    labelRealtyAddress: 'Эски батирдин дареги:',
    phRealtyAddress: 'Мисалы: 2 бөлмө, 60 м²',
    labelYear: 'Жылы / Абалы:',
    phYear: 'Мисалы: 2021',
    labelPhone: 'Байланыш номериңиз:',
    labelEstimated: 'Баалоо суммасы ($):',
    phEstimated: '25 000',
    btnSubmit: 'WhatsApp аркылуу баалоого өтүнүч жиберүү',
    photoTip: '📸 Экспресс-баалоо үчүн сүрөттөрдү WhatsApp чатына жөнөтсөңүз болот.',
    previewTitle: 'Алдын ала эсептөө натыйжасы:',
    previewDownCovered: '✓ Баштапкы 30% төлөмдү толук жабат (накталай = $0)!',
    previewRemaining: '0% бөлүп төлөөгө калган сумма:',
    downPaymentRequiredLabel: '30% баштапкы төлөм:',
    cashNeededLabel: 'Накталай кошумча:',
    monthlyEstimateLabel: 'Ай сайын төлөм (0%):',
    totalApartmentCostLabel: 'Батирдин баасы:',
    somUnit: 'сом',
  },
  kz: {
    pageTitle: 'Trade-in (Бартер)',
    heroTitle: 'КӨЛІКТІ НЕМЕСЕ ЕСКІ БАСПАНАНЫ ЖАҢА ҮЙГЕ АЙЫРБАСТАУ',
    heroSubtitle: 'EL ORDO GROUP кешендерінен жаңа пәтер алу үшін көлігіңізді немесе ескі пәтеріңізді бастапқы жарна ретінде қолданыңыз. 24 сағатта кезексіз әділ бағалау.',
    noticeText: 'Trade-in бағдарламасы көлік базарында апталап тұрудан құтқарады. Активіңізді әділ нарықтық бағамен бағалап, соманы жаңа пәтердің шотына есептейміз.',
    blockTitle: 'TRADE-IN БАҒДАРЛАМАСЫ ҚАЛАЙ ЖҰМЫС ІСТЕЙДІ',
    descriptionText: 'Жобаларымыздың бірінен пәтер таңдайсыз. Сарапшы көлігіңізді немесе мүлкіңізді 24 сағатта әділ бағалайды. Келісілген сома толық көлемде бастапқы жарна ретінде есептеліп, қалдық сомаға 36 айға дейін 0% бөліп төлеу ресімделеді.',
    documentsText: 'Көлік үшін: Техпаспорт және иесінің төлқұжаты. Жылжымайтын мүлік үшін: Құқық белгілейтін құжаттар.',
    faqList: [
      { q: 'Көлік құны қалай анықталады?', a: 'Нарықтық талдау негізінде.' },
      { q: 'Көлік құны бастапқы жарнадан асып кетсе ше?', a: 'Артық сома ай сайынғы төлемді азайтады.' },
      { q: 'Бағалау қанша уақыт алады?', a: '24 сағатқа дейін.' },
      { q: 'Ескі пәтерді өткізуге бола ма?', a: 'Иә, қабылданады.' },
      { q: 'Қайта тіркеуді кім жүргізеді?', a: 'Компания заңгерлері.' },
    ],
    casesBadge: 'Тәжірибелік мысалдар',
    casesTitle: 'Trade-in айырбастаудың нақты сценарийлері',
    casesSubtitle: 'Қосымша қаражатсыз тұрғын үй жағдайын жақсарту',
    cases: [
      {
        asset: 'Toyota Camry 70 (2020 ж.)',
        assetCategory: 'Жеңіл автокөлік',
        valuation: '$24 000',
        valuationKgs: '≈ 2 100 000 сом',
        targetComplex: 'ЖК Madina Residence',
        targetApartment: '1 бөлмелі пәтер (43.59 м²)',
        result: '30% бастапқы жарна толық жабылды ($19 615)',
        surplus: 'Қалған $4 385 ай сайынғы төлемдерге бағытталды',
        badge: 'Танымал айырбас',
        slug: 'madina-residence',
        waText: 'Сәлеметсіз бе! Toyota Camry көлігімді Trade-in бойынша ЖК Madina Residence пәтеріне айырбастағым келеді.',
      },
      {
        asset: 'Lexus GX 460 (2016 ж.)',
        assetCategory: 'Премиум жол таңғажайып көлік',
        valuation: '$38 000',
        valuationKgs: '≈ 3 325 000 сом',
        targetComplex: 'ЖК Abu Dhabi',
        targetApartment: '2 бөлмелі пәтер (78.30 м²)',
        result: 'Бастапқы жарна толық төленді',
        surplus: 'Ай сайынғы төлем 36 айға $1 250 дейін төмендетілді',
        badge: 'Премиум Trade-in',
        slug: 'abu-dhabi',
        waText: 'Сәлеметсіз бе! Жол таңғажайып көлікті ЖК Abu Dhabi кешеніндегі 2 бөлмелі пәтерге айырбастау шарттарын білгім келеді.',
      },
      {
        asset: '105-сериялы 1 бөлмелі пәтер',
        assetCategory: 'Екінші нарықтағы баспана (Бішкек)',
        valuation: '$46 000',
        valuationKgs: '≈ 4 025 000 сом',
        targetComplex: 'ЖД Айкол + (Көк-Жар)',
        targetApartment: 'Кең 2 бөлмелі (74.3 м²)',
        result: 'Жаңа пәтер құнының 50%-дан астамы жабылды',
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
    tableSubtitle: 'Тікелей құрылыс салушыдан айырбастаудың тиімділігі',
    colCriteria: 'Критерий',
    colElOrdo: 'EL ORDO Trade-in',
    colMarket: 'Өз бетінше сату',
    row1Criteria: 'Мәмілені жабу мерзімі',
    row1ElOrdo: 'Бар болғаны 24 сағат',
    row1Market: '1-ден 4 айға дейін',
    row2Criteria: 'Пәтерді брондау',
    row2ElOrdo: 'Пәтер бірден бекітіледі',
    row2Market: 'Пәтер сатылып кетуі мүмкін',
    row3Criteria: 'Бағаны түсіру',
    row3ElOrdo: 'Әділ нарықтық баға',
    row3Market: 'Алып-сатарлардың қысымы',
    row4Criteria: 'Шығындар',
    row4ElOrdo: '0 сом',
    row4Market: 'Жарнама, риелторлар',
    row5Criteria: 'Заңдық рәсімдеу',
    row5ElOrdo: 'Компания заңгерлері',
    row5Market: 'Кезектер, тәуекелдер',
    categoriesBadge: 'Активтер критерийлері',
    categoriesTitle: 'Қандай мүлік қатыса алады',
    requirementsLabel: 'Талаптар:',
    categories: [
      { type: 'car', title: 'Көліктер', desc: 'Таза заңдық тарихы бар шетелдік көліктер.', reqs: 'Техпаспорт.' },
      { type: 'realty', title: 'Екінші нарық пәтерлері', desc: '1, 2, 3 бөлмелі пәтерлер.', reqs: 'Құқық белгілейтін құжаттар.' },
      { type: 'land', title: 'Жер телімдері', desc: 'Құрылысқа арналған жерлер.', reqs: 'Қызыл кітап.' },
    ],
    stepsBadge: '24 сағаттық рәсім',
    stepsTitle: 'Trade-in рәсімдеу кезеңдері',
    steps: [
      { num: '01', title: 'Өтінім беру', desc: 'Деректерді WhatsApp-қа жібересіз.' },
      { num: '02', title: 'Бағалау', desc: 'Сарапшы базар баасын айтады.' },
      { num: '03', title: 'Пәтерді таңдау', desc: 'Жобадан қабатты тандайсыз.' },
      { num: '04', title: 'ДДУ жасасу', desc: 'Мүлкіңіз жарна ретінде есептеледі.' },
    ],
    calcBadge: 'Интерактивті бағалау',
    calcTitle: 'Пәтеріңіздің жабылышын есептеңіз',
    calcDesc: '0% бөлүп төлеу калган суммасын билүү үшін мүлкүңүздүн баасын жазыңыз.',
    tabAuto: 'Көлік',
    tabRealty: 'Мүлк',
    targetComplexLabel: 'Қайсы ТҮК есебіне жазу:',
    targetComplexAll: 'Компанияның кез келген нысаны',
    roomsLabel: 'Бөлме саны:',
    rooms1: '1 бөлмелі',
    rooms2: '2 бөлмелі',
    rooms3: '3 бөлмелі',
    labelAutoModel: 'Көліктің маркасы, моделі және жылы:',
    phAutoModel: 'Мысалы: Toyota Camry 70, 2021',
    labelRealtyAddress: 'Ескі пәтердің мекенжайы:',
    phRealtyAddress: 'Мысалы: 2 бөлме, 60 м²',
    labelYear: 'Жылы / Жағдайы:',
    phYear: 'Мысалы: 2021',
    labelPhone: 'Байланыс телефоныңыз:',
    labelEstimated: 'Бағалау сомасы ($):',
    phEstimated: '25 000',
    btnSubmit: 'WhatsApp арқылы баалоого өтүнүч жиберүү',
    photoTip: '📸 Суреттерді WhatsApp чатына жібере аласыз.',
    previewTitle: 'Алдын ала есептеу нәтижесі:',
    previewDownCovered: '✓ Бастапқы 30% жарнаны толық жабады (қолма-қол = $0)!',
    previewRemaining: '0% бөліп төлеуге қалған сома:',
    downPaymentRequiredLabel: '30% бастапқы жарна:',
    cashNeededLabel: 'Қолма-қол қосымша:',
    monthlyEstimateLabel: 'Ай сайынғы төлем (0%):',
    totalApartmentCostLabel: 'Пәтер құны:',
    somUnit: 'сом',
  },
  uk: {
    pageTitle: 'Trade-in (Бартер)',
    heroTitle: 'ОБМІН АВТОМОБІЛЯ АБО ВТОРИННОГО ЖИТЛА НА НОВОБУДОВУ',
    heroSubtitle: 'Використовуйте ваше авто або вторинну нерухомість як перший внесок за квартиру в житлових комплексах EL ORDO GROUP. Чесна ринкова оцінка за 24 години без авторинку.',
    noticeText: 'Програма Trade-in позбавляє вас необхідності тижнями шукати покупця на авторинку чи платити комісії рієлторам. Ми оцінюємо актив за справедливою ціною та зараховуємо суму у вартість квартири.',
    blockTitle: 'ЯК ПРАЦЮЄ ПРОГРАМА TRADE-IN',
    descriptionText: 'Ви обираєте квартиру в будь-якому з наших проєктів (Abu Dhabi, Madina Residence, Айкол+ чи Айкол). Наш експерт оцінює авто або житло за справедливою ціною за 24 години. Сума повністю зараховується як перший внесок, а на залишок оформлюється розстрочка 0% до 36 місяців.',
    documentsText: 'Для авто: Техпаспорт авто та паспорт власника. Для нерухомості: Правовстановлюючі документи, техпаспорт БТІ та довідка про відсутність арештів.',
    faqList: [
      { q: 'Як визначається вартість авто під час оцінки?', a: 'Оцінка ґрунтується на ринковому аналізі.' },
      { q: 'Що якщо оцінка авто перевищує перший внесок?', a: 'Сума йде на зменшення загального боргу.' },
      { q: 'Скільки часу займає оцінка?', a: 'До 24 годин.' },
      { q: 'Чи можна здати вторинну квартиру?', a: 'Так, за наявності чистих документів.' },
      { q: 'Хто здійснює переоформлення?', a: 'Юристи компанії.' },
    ],
    casesBadge: 'Практичні приклади',
    casesTitle: 'Реальні сценарії зарахування Trade-in',
    casesSubtitle: 'Покращення житлових умов без вільних коштів',
    cases: [
      {
        asset: 'Toyota Camry 70 (2020 р.)',
        assetCategory: 'Легковий автомобіль',
        valuation: '$24 000',
        valuationKgs: '≈ 2 100 000 сом',
        targetComplex: 'ЖК Madina Residence',
        targetApartment: '1-кімнатна квартира (43.59 м²)',
        result: 'Перший внесок 30% закрито повністю ($19 615)',
        surplus: 'Залишок $4 385 зараховано у щомісячні платежі',
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
        targetApartment: '2-кімнатна (74.3 м²)',
        result: 'Покрито понад 50% вартості нової квартири',
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
    tableSubtitle: 'Чому обмін безпосередньо забудовнику вигідніший',
    colCriteria: 'Критерій',
    colElOrdo: 'Trade-in в EL ORDO',
    colMarket: 'Самостійний продаж',
    row1Criteria: 'Термін закриття угоди',
    row1ElOrdo: 'Всього 24 години',
    row1Market: 'від 1 до 4 місяців',
    row2Criteria: 'Бронь квартири',
    row2ElOrdo: 'Бронюється одразу',
    row2Market: 'Може подорожчати',
    row3Criteria: 'Торг та збивання ціни',
    row3ElOrdo: 'Чесна ринкова вартість',
    row3Market: 'Тиск перекупників',
    row4Criteria: 'Комісії та реклама',
    row4ElOrdo: '0 сом',
    row4Market: 'Оплата реклами, рієлторів',
    row5Criteria: 'Юридичне оформлення',
    row5ElOrdo: 'Штатні юристи компанії',
    row5Market: 'Черги, ризики',
    categoriesBadge: 'Критерії активів',
    categoriesTitle: 'Яке майно бере участь у програмі',
    requirementsLabel: 'Вимоги:',
    categories: [
      { type: 'car', title: 'Автомобілі', desc: 'Іномарки у справному стані.', reqs: 'Техпаспорт, паспорт.' },
      { type: 'realty', title: 'Вторинні квартири', desc: '1-, 2-, 3-кімнатні квартири.', reqs: 'Документи, БТІ.' },
      { type: 'land', title: 'Земельні ділянки', desc: 'Ділянки під будівництво.', reqs: 'Червона книга.' },
    ],
    stepsBadge: 'Процедура за 24 години',
    stepsTitle: 'Етапи оформлення за Trade-in',
    steps: [
      { num: '01', title: 'Заявка', desc: 'Надсилаєте дані у WhatsApp.' },
      { num: '02', title: 'Огляд', desc: 'Експерт озвучує ціну за 24 години.' },
      { num: '03', title: 'Вибір нової квартири', desc: 'Бронюєте планування.' },
      { num: '04', title: 'Підписання ДДУ', desc: 'Майно зараховується як внесок.' },
    ],
    calcBadge: 'Інтерактивний розрахунок заліку',
    calcTitle: 'Розрахуйте покриття вашої квартири',
    calcDesc: 'Вкажіть орієнтовну вартість активу, щоб дізнатися залишок суми в розстрочку 0%.',
    tabAuto: 'Автомобіль',
    tabRealty: 'Нерухомість',
    targetComplexLabel: 'В рахунок якого ЖК зарахувати:',
    targetComplexAll: 'Будь-який об’єкт компанії',
    roomsLabel: 'Кількість кімнат:',
    rooms1: '1-кімн.',
    rooms2: '2-кімн.',
    rooms3: '3-кімн.',
    labelAutoModel: 'Марка та модель авто:',
    phAutoModel: 'Наприклад: Toyota Camry 70',
    labelRealtyAddress: 'Адреса квартири:',
    phRealtyAddress: 'Наприклад: 2-кімн., 60 м²',
    labelYear: 'Рік випуску:',
    phYear: 'Наприклад: 2021',
    labelPhone: 'Номер телефону для зв’язку:',
    labelEstimated: 'Бажана сума ($):',
    phEstimated: '25 000',
    btnSubmit: 'Надіслати заявку у WhatsApp',
    photoTip: '📸 Фото можна надіслати безпосередньо у WhatsApp.',
    previewTitle: 'Попередній результат заліку:',
    previewDownCovered: '✓ Повністю закриває 30% внесок (готівкою = $0)!',
    previewRemaining: 'Залишок до доплати в розстрочку 0%:',
    downPaymentRequiredLabel: 'Перший внесок (30%):',
    cashNeededLabel: 'Доплата готівкою:',
    monthlyEstimateLabel: 'Щомісячний платіж (0%):',
    totalApartmentCostLabel: 'Вартість квартири:',
    somUnit: 'сом',
  },
  en: {
    pageTitle: 'Trade-in (Barter)',
    heroTitle: 'EXCHANGE YOUR CAR OR SECONDARY PROPERTY FOR A NEW APARTMENT',
    heroSubtitle: 'Use your current vehicle or secondary property as the initial down payment for an apartment in modern EL ORDO GROUP developments. Fair market evaluation within 24 hours without marketplaces.',
    noticeText: 'The Trade-in program saves you from spending months negotiating on auto markets or paying realtor commissions. We appraise your asset at fair market value and immediately apply the amount toward your new home.',
    blockTitle: 'HOW THE TRADE-IN PROGRAM WORKS',
    descriptionText: 'Choose an apartment in any of our projects (Abu Dhabi RC, Madina Residence, Aykol+ or Aykol). Our certified appraiser evaluates your car or secondary property at fair market value within 24 hours. The agreed amount is fully credited toward your down payment or upfront cost, with remaining balance financed via 0% installment up to 36 months.',
    documentsText: 'For vehicles: Vehicle Registration Certificate (technical passport) and owner\'s passport. For real estate: Property ownership deeds, BTI title passport, and encumbrance clearance.',
    faqList: [
      { q: 'How is the car\'s valuation determined?', a: 'Based on current market analysis.' },
      { q: 'What if the car\'s value exceeds the down payment?', a: 'Surplus goes toward reducing overall debt.' },
      { q: 'How long does appraisal take?', a: 'Up to 24 hours.' },
      { q: 'Are secondary apartments accepted?', a: 'Yes, with clean documentation.' },
      { q: 'Who handles re-registration?', a: 'Company legal team.' },
    ],
    casesBadge: 'Practical Cases',
    casesTitle: 'Real Trade-in Scenarios',
    casesSubtitle: 'Upgrading living standards without cash reserves',
    cases: [
      {
        asset: 'Toyota Camry 70 (2020)',
        assetCategory: 'Passenger Sedan',
        valuation: '$24,000',
        valuationKgs: '≈ 2,100,000 KGS',
        targetComplex: 'Madina Residence',
        targetApartment: '1-Room Apartment (43.59 m²)',
        result: '30% Down Payment Fully Covered ($19,615)',
        surplus: 'Remaining $4,385 credited toward monthly installments',
        badge: 'Popular Exchange',
        slug: 'madina-residence',
        waText: 'Hello! I want to trade in my passenger car for an apartment in Madina Residence.',
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
        targetApartment: 'Spacious 2-Room (74.3 m²)',
        result: 'Covered over 50% of the new apartment cost',
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
    tableSubtitle: 'Why direct exchange with developer is more beneficial',
    colCriteria: 'Criteria',
    colElOrdo: 'Trade-in at EL ORDO',
    colMarket: 'Independent Sale',
    row1Criteria: 'Deal Closing Time',
    row1ElOrdo: 'Only 24 hours',
    row1Market: '1 to 4 months',
    row2Criteria: 'Apartment Reservation',
    row2ElOrdo: 'Reserved immediately',
    row2Market: 'Unit may sell out',
    row3Criteria: 'Price Haggling',
    row3ElOrdo: 'Fair market price',
    row3Market: 'Bargain hunters pressure',
    row4Criteria: 'Commissions & Ad Costs',
    row4ElOrdo: '$0',
    row4Market: 'Listing and agent fees',
    row5Criteria: 'Legal Formalities',
    row5ElOrdo: 'In-house legal team',
    row5Market: 'Registry queues',
    categoriesBadge: 'Asset Criteria',
    categoriesTitle: 'Eligible Property for the Program',
    requirementsLabel: 'Requirements:',
    categories: [
      { type: 'car', title: 'Cars & SUVs', desc: 'Liquid vehicles in sound mechanical condition.', reqs: 'Tech passport, ID.' },
      { type: 'realty', title: 'Secondary Apartments', desc: '1, 2, 3-room apartments.', reqs: 'Title deeds, BTI.' },
      { type: 'land', title: 'Land Plots', desc: 'Residential plots.', reqs: 'Red Book.' },
    ],
    stepsBadge: '24-Hour Procedure',
    stepsTitle: 'Trade-in Deal Execution Stages',
    steps: [
      { num: '01', title: 'Inquiry', desc: 'Send details via WhatsApp.' },
      { num: '02', title: 'Inspection', desc: 'Appraiser confirms value in 24 hours.' },
      { num: '03', title: 'Choose Apartment', desc: 'Reserve your unit.' },
      { num: '04', title: 'Sign Agreement', desc: 'Asset is credited as down payment.' },
    ],
    calcBadge: 'Interactive Trade-In Calculator',
    calcTitle: 'Calculate Your Property Coverage',
    calcDesc: 'Enter estimated value of your asset to instantly see remaining 0% installment balance.',
    tabAuto: 'Automobile',
    tabRealty: 'Real Estate',
    targetComplexLabel: 'Target Residential Complex:',
    targetComplexAll: 'Any Company Development',
    roomsLabel: 'Target Apartment Size:',
    rooms1: '1-Room',
    rooms2: '2-Room',
    rooms3: '3-Room',
    labelAutoModel: 'Car Make & Model:',
    phAutoModel: 'e.g. Toyota Camry 70',
    labelRealtyAddress: 'Property Address:',
    phRealtyAddress: 'e.g. 2-room, 60 sq.m',
    labelYear: 'Year / Condition:',
    phYear: 'e.g. 2021',
    labelPhone: 'Phone Number:',
    labelEstimated: 'Desired Valuation ($):',
    phEstimated: '25,000',
    btnSubmit: 'Send Valuation via WhatsApp',
    photoTip: '📸 Attach photos directly in WhatsApp for express evaluation within 2 hours.',
    previewTitle: 'Preliminary Trade-In Coverage:',
    previewDownCovered: '✓ Fully covers the 30% down payment ($0 cash required)!',
    previewRemaining: 'Remaining balance in 0% installment:',
    downPaymentRequiredLabel: '30% Down Payment:',
    cashNeededLabel: 'Cash Balance Needed:',
    monthlyEstimateLabel: 'Monthly Payment (0%):',
    totalApartmentCostLabel: 'Estimated Apartment Price:',
    somUnit: 'som',
  },
  zh: {
    pageTitle: '置换购房 (Trade-in)',
    heroTitle: '汽车或二手房产直接置换全新精奢华宅',
    heroSubtitle: '使用您的现有汽车或二手房产作为首付款，轻松置业 EL ORDO GROUP 旗下现代住宅区。专业评估团队24小时公允估值，无需奔波二手车市。',
    noticeText: 'EL ORDO GROUP 专属置换计划（Trade-in）旨在帮助意向客户将名下现有汽车或房产高效变现，无缝对接旗下精奢楼盘房源。',
    blockTitle: '资产置换细则与核心优势',
    descriptionText: '资深评估师对您的置换资产进行严谨的公允市场作价，双方确认的评估总额将无缝冲抵新房首期房款。剩余未结清房款可尊享最长36个月0%免息分期。',
    documentsText: '置换汽车需提供车辆行驶证及车主有效证件；置换房产需提供房产确权证、BTI技术档案及无查封证明。',
    faqList: [
      { q: '车辆折价估值是如何确定的？', a: '基于大盘成交数据及车况客观评估。' },
      { q: '若车辆估值高于约定首付怎么办？', a: '超出部分直接冲抵后续房款。' },
      { q: '资产评估需要耗时多久？', a: '不超过24小时。' },
      { q: '是否接受市区二手房置换？', a: '支持产权清晰的二手房。' },
      { q: '过户手续由谁负责办理？', a: '公司法务专人代办。' },
    ],
    casesBadge: '真实置换案例',
    casesTitle: '以旧换新真实落地场景',
    casesSubtitle: '无需动用大额流动资金轻松升级居住品质',
    cases: [
      {
        asset: '丰田凯美瑞 70 (2020年款)',
        assetCategory: '家用轿车',
        valuation: '$24 000',
        valuationKgs: '≈ 2 100 000 索姆',
        targetComplex: '玛迪娜公馆 (Madina Residence)',
        targetApartment: '一居室品质户型 (43.59 м²)',
        result: '30%首付款全额冲抵 ($19 615)',
        surplus: '结余 $4 385 直接冲抵后续月供',
        badge: '经典热门置换',
        slug: 'madina-residence',
        waText: '您好！我想通过以旧换新置换服务，用轿车置换玛迪娜公馆的房源。',
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
        waText: '您好！我想用豪华越野车置换阿布扎比住宅区的两居室房源。',
      },
      {
        asset: '105系列单身公寓二手房',
        assetCategory: '比什凯克存量二手房',
        valuation: '$46 000',
        valuationKgs: '≈ 4 025 000 索姆',
        targetComplex: '艾科尔+ (Aykol +)',
        targetApartment: '山麓两居室 (74.3 м²)',
        result: '折抵新房总房款50%以上',
        surplus: '极低剩余尾款享受0%超长免息分期',
        badge: '以旧换新置业',
        slug: 'ajkol-plus',
        waText: '您好！我想用市区旧房置换艾科尔+的生态新居。',
      },
    ],
    valuationLabel: 'EL ORDO 专业评估估值:',
    selectedObjectLabel: '所选置换新居:',
    btnEvaluateCase: '评估类似车辆',
    aboutComplexBtn: '了解楼盘详情',
    tableBadge: '省时省心省费',
    tableTitle: 'EL ORDO 置换 vs 自行二手车市出售',
    tableSubtitle: '为何直接与品牌开发商置换更加省心高效',
    colCriteria: '对比指标',
    colElOrdo: 'EL ORDO 以旧换新',
    colMarket: '自行挂牌出售',
    row1Criteria: '成交周期',
    row1ElOrdo: '仅需 24 小时',
    row1Market: '通常需要 1 至 4 个月',
    row2Criteria: '房源锁定',
    row2ElOrdo: '即刻锁定房号与价格',
    row2Market: '新房可能随时售罄',
    row3Criteria: '议价压力',
    row3ElOrdo: '公允客观的市价',
    row3Market: '面临反复压价',
    row4Criteria: '佣金成本',
    row4ElOrdo: '0 索姆',
    row4Market: '中介佣金及广告费',
    row5Criteria: '过户手续',
    row5ElOrdo: '公司法务代办',
    row5Market: '排队耗时风险高',
    categoriesBadge: '置换资产范围',
    categoriesTitle: '可参与置换计划的资产类别',
    requirementsLabel: '基本要求:',
    categories: [
      { type: 'car', title: '品牌乘用车与越野车', desc: '车况良好、无重大事故及产权清晰的各主流车型。', reqs: '行驶证、车主证件。' },
      { type: 'realty', title: '比什凯克市区二手房产', desc: '各系列一至三居室二手公寓。', reqs: '房产证、BTI档案。' },
      { type: 'land', title: '优质住宅用地', desc: '自建住宅用地（ИЖС）。', reqs: '国家土地红本。' },
    ],
    stepsBadge: '24小时极速通道',
    stepsTitle: '以旧换新4步极速置业流程',
    steps: [
      { num: '01', title: '提交意向', desc: '将基础信息发送至 WhatsApp。' },
      { num: '02', title: '专业勘验', desc: '24小时内出具公正透明的收购定价。' },
      { num: '03', title: '优选新居', desc: '在项目中挑选心仪户型。' },
      { num: '04', title: '签署合同', desc: '旧资产评估款项全额折抵为首付款。' },
    ],
    calcBadge: '交互式资产冲抵测算',
    calcTitle: '测算您的资产能冲抵多少房款',
    calcDesc: '输入拟置换资产的预估市值，实时测算能够冲抵新房多少房款。',
    tabAuto: '置换汽车',
    tabRealty: '置换房产',
    targetComplexLabel: '意向抵扣的目标楼盘：',
    targetComplexAll: '旗下全线在售楼盘均可',
    roomsLabel: '意向户型居室：',
    rooms1: '一居室',
    rooms2: '二居室',
    rooms3: '三居室',
    labelAutoModel: '车辆品牌、型号及年份：',
    phAutoModel: '例如：丰田凯美瑞 70, 2021',
    labelRealtyAddress: '二手房产地址及核心户型：',
    phRealtyAddress: '例如：2居室, 60平米',
    labelYear: '出厂年份 / 车况：',
    phYear: '例如：2021，车况极佳',
    labelPhone: '您的联系电话：',
    labelEstimated: '期望评估作价金额 ($)：',
    phEstimated: '25 000',
    btnSubmit: '通过 WhatsApp 发送评估申请',
    photoTip: '📸 可在 WhatsApp 中直接发送照片。',
    previewTitle: '资产置换测算概览：',
    previewDownCovered: '✓ 完全冲抵30%首付款（现金首付款 = $0）！',
    previewRemaining: '剩余款项可享受0%免息分期：',
    downPaymentRequiredLabel: '30%首付款：',
    cashNeededLabel: '需补足现金：',
    monthlyEstimateLabel: '每月还款金额：',
    totalApartmentCostLabel: '新房预估总价：',
    somUnit: '索姆',
  },
};

// Популярные автомобили на авторынке Бишкека и вторичное жилье с рыночными оценками
const QUICK_PRESETS = {
  auto: [
    { label: 'Camry 70 (2020)', val: 24000, name: 'Toyota Camry 70, 2020' },
    { label: 'Lexus GX 460', val: 38000, name: 'Lexus GX 460, 2016' },
    { label: 'Kia K5 (2021)', val: 19000, name: 'Kia K5, 2021' },
    { label: 'Hyundai Santa Fe', val: 25000, name: 'Hyundai Santa Fe, 2020' },
    { label: 'Zeekr 001', val: 41000, name: 'Zeekr 001, 2023' },
    { label: 'Honda CR-V', val: 15000, name: 'Honda CR-V, 2017' },
  ],
  realty: [
    { label: '1-к 105 серия (Бишкек)', val: 45000, name: '1-комн. кв., 105 серия, г. Бишкек' },
    { label: '2-к 106 серия (Бишкек)', val: 62000, name: '2-комн. кв., 106 серия, г. Бишкек' },
    { label: '3-к вторичка (Центр)', val: 85000, name: '3-комн. кв., Центр, г. Бишкек' },
    { label: 'Участок ИЖС (Юг)', val: 48000, name: 'Земельный участок ИЖС, Южная зона' },
  ],
};

export default function TradeInPage() {
  const { locale } = useLanguage();
  const lang: Locale = (locale as Locale) || 'ru';
  const c = CONTENT[lang] || CONTENT.ru;

  const [usdRate, setUsdRate] = useState<number>(87.45);
  const [tradeInType, setTradeInType] = useState<'auto' | 'realty'>('auto');
  const [tradeInTargetComplex, setTradeInTargetComplex] = useState<string>('abu-dhabi');
  const [targetRooms, setTargetRooms] = useState<1 | 2 | 3>(1);
  const [assetName, setAssetName] = useState<string>('Toyota Camry 70, 2020');
  const [assetYear, setAssetYear] = useState<string>('2020 г., отличное состояние');
  const [phone, setPhone] = useState<string>('');
  const [estimatedValue, setEstimatedValue] = useState<string>('24000');
  const [estimatedInput, setEstimatedInput] = useState<string>('24 000');

  useEffect(() => {
    let isMounted = true;
    fetch('/api/currency')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.rate && typeof data.rate === 'number') {
          setUsdRate(data.rate);
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

  const parsedEstimatedValue = useMemo(() => {
    const raw = estimatedValue.replace(/\D/g, '');
    return raw ? parseInt(raw, 10) : 0;
  }, [estimatedValue]);

  // Точный расчет стоимости квартиры исходя из проекта и комнатности
  const targetApartmentPrice = useMemo(() => {
    if (tradeInTargetComplex === 'abu-dhabi') {
      if (targetRooms === 1) return 81675; // 49.5 м² * 1650
      if (targetRooms === 2) return 129195; // 78.3 м² * 1650
      return 196845; // 119.3 м² * 1650
    }
    if (tradeInTargetComplex === 'madina-residence') {
      if (targetRooms === 1) return 65400; // 43.6 м² * 1500
      if (targetRooms === 2) return 102300; // 68.2 м² * 1500
      return 138600; // 92.4 м² * 1500
    }
    if (tradeInTargetComplex === 'ajkol-plus') {
      if (targetRooms === 1) return 50400; // 42.0 м² * 1200
      if (targetRooms === 2) return 89160; // 74.3 м² * 1200
      return 106200; // 88.5 м² * 1200
    }
    // all / общий ориентир
    if (targetRooms === 1) return 65000;
    if (targetRooms === 2) return 95000;
    return 140000;
  }, [tradeInTargetComplex, targetRooms]);

  // Необходимый первый взнос (30%)
  const requiredDownPayment = useMemo(() => {
    return Math.round(targetApartmentPrice * 0.3);
  }, [targetApartmentPrice]);

  // Процент покрытия всей квартиры автомобилем
  const tradeInCoveragePercent = useMemo(() => {
    if (targetApartmentPrice <= 0 || parsedEstimatedValue <= 0) return 0;
    return Math.min(100, Math.round((parsedEstimatedValue / targetApartmentPrice) * 100));
  }, [parsedEstimatedValue, targetApartmentPrice]);

  // Закрыт ли 30% взнос целиком
  const isDownPaymentCovered = parsedEstimatedValue >= requiredDownPayment;

  // Сколько нужно доплатить наличными к первому взносу (если авто < 30%)
  const cashNeededForDownPayment = useMemo(() => {
    return Math.max(0, requiredDownPayment - parsedEstimatedValue);
  }, [requiredDownPayment, parsedEstimatedValue]);

  // Излишек сверх первого взноса (уменьшает рассрочку)
  const surplusTowardInstallment = useMemo(() => {
    return Math.max(0, parsedEstimatedValue - requiredDownPayment);
  }, [parsedEstimatedValue, requiredDownPayment]);

  // Остаток к выплате в беспроцентную рассрочку 0%
  const tradeInRemainingToPay = useMemo(() => {
    return Math.max(0, targetApartmentPrice - parsedEstimatedValue);
  }, [targetApartmentPrice, parsedEstimatedValue]);

  // Ежемесячный платеж на 36 месяцев
  const monthlyPayment36 = useMemo(() => {
    return Math.round(tradeInRemainingToPay / 36);
  }, [tradeInRemainingToPay]);

  const handleEstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 8);
    setEstimatedValue(raw);
    setEstimatedInput(raw ? Number(raw).toLocaleString('ru-RU') : '');
  };

  const handleSelectPreset = (preset: { label: string; val: number; name: string }) => {
    setAssetName(preset.name);
    setEstimatedValue(String(preset.val));
    setEstimatedInput(preset.val.toLocaleString('ru-RU'));
  };

  const cleanWaNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';

  const handleSendTradeIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel = tradeInType === 'auto' ? c.tabAuto : c.tabRealty;
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

    const detailsStr =
      `${typeLabel}: ${assetName || '—'}${assetYear ? ` (${assetYear})` : ''} | ` +
      `Оценка: $${numEst.toLocaleString('ru-RU')} (~${kgsEst.toLocaleString('ru-RU')} ${c.somUnit}) | ` +
      `Объект: ${targetLabel} (${targetRooms}-комн.)`;

    // 1. Отправляем в Telegram через API лидогенерации
    try {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Клиент Trade-in',
          phone: phone.trim() || 'Через WhatsApp',
          project: targetLabel,
          goal: `Trade-in (${typeLabel})`,
          budget: `$${numEst.toLocaleString('ru-RU')}`,
          rooms: `${targetRooms}-комн.`,
          details: detailsStr,
          comment: `Покрытие: ${tradeInCoveragePercent}%. Остаток в рассрочку: $${tradeInRemainingToPay.toLocaleString('ru-RU')}`,
          lang,
          source: 'TradeInPage',
          utm: getStoredUtm(),
          createdAt: new Date().toISOString(),
        }),
      }).catch(() => {});
    } catch {}

    // 2. Трекинг конверсий для рекламы
    trackWhatsAppClick('trade_in_calculator', targetLabel);
    trackLeadSubmit(`Trade-in (${typeLabel})`, targetLabel);

    // 3. Формирование персонализированного сообщения в WhatsApp
    const text =
      `Здравствуйте! Хочу подать заявку по программе Trade-in (Бартер) в EL ORDO GROUP:\n\n` +
      `• Тип актива: ${typeLabel}\n` +
      `• Модель/Параметры: ${assetName || '—'}\n` +
      (tradeInType === 'auto' && assetYear ? `• Состояние/Год: ${assetYear}\n` : '') +
      (phone ? `• Мой телефон: ${phone}\n` : '') +
      `• В счет объекта: ${targetLabel} (${targetRooms}-комнатная квартира)\n` +
      `• Оценочная стоимость актива: $${numEst.toLocaleString('ru-RU')} (~${kgsEst.toLocaleString('ru-RU')} ${c.somUnit})\n` +
      `• Расчет покрытия: ${tradeInCoveragePercent}% от квартиры ($${targetApartmentPrice.toLocaleString('ru-RU')})\n` +
      (isDownPaymentCovered
        ? `• Первый взнос 30% закрыт полностью! Остаток в рассрочку: $${monthlyPayment36.toLocaleString('ru-RU')}/мес на 36 мес.\n\n`
        : `• Требуется доплата к первому взносу: $${cashNeededForDownPayment.toLocaleString('ru-RU')}.\n\n`) +
      `Готов отправить фотографии и техпаспорт актива для экспресс-оценки.`;

    window.open(`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

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
      {/* ИНТЕРАКТИВНЫЙ КАЛЬКУЛЯТОР TRADE-IN */}
      <div className="my-16 bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none transition-colors grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Левая колонка: Описание, курс и живой расчет */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
              {c.calcBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
              {c.calcTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-1">
              {c.calcDesc}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#064734]/5 dark:bg-white/5 border border-[#064734]/15 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-gray-700 dark:text-gray-200">
                Курс НБКР: <strong>{usdRate} сом/$</strong>
              </span>
            </div>
            <div className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400">
              <IconShieldCheck className="w-3.5 h-3.5" />
              <span>Оценка за 24 часа</span>
            </div>
          </div>

          {/* Интерактивный виджет покрытия */}
          {parsedEstimatedValue > 0 && (
            <div className="p-5 rounded-3xl bg-[#064734]/10 dark:bg-[#d4b26f]/10 border border-[#064734]/20 dark:border-[#d4b26f]/30 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#064734] dark:text-[#d4b26f] uppercase tracking-wider">
                  {c.previewTitle}
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-black text-sm">
                  {tradeInCoveragePercent}% стоимости квартиры
                </span>
              </div>

              {/* Шкала заполнения */}
              <div className="h-3 w-full bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden p-0.5">
                <div
                  style={{ width: `${tradeInCoveragePercent}%` }}
                  className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-500"
                />
              </div>

              {/* Финансовая раскладка */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                  <span className="text-gray-500 dark:text-neutral-400 text-[11px] block">
                    {c.totalApartmentCostLabel}
                  </span>
                  <strong className="text-gray-900 dark:text-white font-black text-sm block">
                    ${targetApartmentPrice.toLocaleString('ru-RU')}
                  </strong>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                  <span className="text-gray-500 dark:text-neutral-400 text-[11px] block">
                    {c.downPaymentRequiredLabel}
                  </span>
                  <strong className="text-[#064734] dark:text-[#d4b26f] font-black text-sm block">
                    ${requiredDownPayment.toLocaleString('ru-RU')}
                  </strong>
                </div>
              </div>

              {/* Статус первого взноса */}
              <div className="pt-1 text-xs">
                {isDownPaymentCovered ? (
                  <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800 flex items-center gap-2">
                    <IconCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Первоначальный взнос 30% закрыт полностью! Наличными = $0
                      {surplusTowardInstallment > 0 && ` (излишек $${surplusTowardInstallment.toLocaleString('ru-RU')} идет в счет рассрочки)`}.
                    </span>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
                    {c.cashNeededLabel} <strong>${cashNeededForDownPayment.toLocaleString('ru-RU')}</strong> (~{Math.round(cashNeededForDownPayment * usdRate).toLocaleString('ru-RU')} {c.somUnit}) для полного закрытия 30% взноса.
                  </div>
                )}

                <div className="mt-3 flex justify-between items-baseline pt-2 border-t border-[#064734]/15 dark:border-white/10">
                  <span className="text-gray-600 dark:text-neutral-300 text-xs font-semibold">
                    {c.monthlyEstimateLabel}
                  </span>
                  <strong className="text-base font-black text-[#064734] dark:text-[#d4b26f]">
                    ${monthlyPayment36.toLocaleString('ru-RU')}/мес{' '}
                    <span className="text-[11px] font-normal text-gray-500 dark:text-neutral-400">
                      (~{Math.round(monthlyPayment36 * usdRate).toLocaleString('ru-RU')} сом)
                    </span>
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Правая колонка: Форма с пресетами и выбором */}
        <div className="lg:col-span-6 bg-[#f7faf8] dark:bg-[#040c09] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-inner space-y-4">
          {/* Переключатель типа: Авто / Недвижимость */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setTradeInType('auto');
                setAssetName('Toyota Camry 70, 2020');
                setEstimatedValue('24000');
                setEstimatedInput('24 000');
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                tradeInType === 'auto'
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow'
                  : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
              }`}
            >
              <IconCar className="w-4 h-4" />
              <span>{c.tabAuto}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTradeInType('realty');
                setAssetName('1-комн. кв., 105 серия, г. Бишкек');
                setEstimatedValue('45000');
                setEstimatedInput('45 000');
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                tradeInType === 'realty'
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow'
                  : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
              }`}
            >
              <IconBuilding className="w-4 h-4" />
              <span>{c.tabRealty}</span>
            </button>
          </div>

          {/* Быстрые кликабельные пресеты */}
          <div>
            <span className="block text-[10px] uppercase font-bold text-gray-400 dark:text-neutral-400 mb-1.5">
              Популярные варианты на рынке Бишкека (нажмите для автозаполнения):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(tradeInType === 'auto' ? QUICK_PRESETS.auto : QUICK_PRESETS.realty).map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-white/10 hover:bg-emerald-50 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/10 transition-colors cursor-pointer shadow-sm"
                >
                  + {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Выбор ЖК и комнатности */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-neutral-400 mb-1">
                {c.targetComplexLabel}
              </label>
              <select
                value={tradeInTargetComplex}
                onChange={(e) => setTradeInTargetComplex(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:border-[#064734] cursor-pointer"
              >
                <option value="abu-dhabi">ЖК Abu Dhabi (ул. Сухомлинова)</option>
                <option value="madina-residence">ЖК Madina Residence (ул. Огонбаева)</option>
                <option value="ajkol-plus">ЖД Айкол + (с. Кок-Жар)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-neutral-400 mb-1">
                {c.roomsLabel}
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setTargetRooms(r as any)}
                    className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      targetRooms === r
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                        : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                    }`}
                  >
                    {r}-к
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Форма отправки */}
          <form onSubmit={handleSendTradeIn} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                {tradeInType === 'auto' ? c.labelAutoModel : c.labelRealtyAddress}
              </label>
              <input
                type="text"
                required
                placeholder={tradeInType === 'auto' ? c.phAutoModel : c.phRealtyAddress}
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#064734]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tradeInType === 'auto' ? (
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                    {c.labelYear}
                  </label>
                  <input
                    type="text"
                    placeholder={c.phYear}
                    value={assetYear}
                    onChange={(e) => setAssetYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#064734]"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                    Этаж / Серия дома:
                  </label>
                  <input
                    type="text"
                    placeholder="Например: 4/9 этаж, 105 серия"
                    value={assetYear}
                    onChange={(e) => setAssetYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#064734]"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                  {c.labelPhone}
                </label>
                <input
                  type="tel"
                  placeholder="+996 (700) 00-00-00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#064734]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-gray-700 dark:text-gray-300 font-bold">
                  {c.labelEstimated}
                </label>
                {parsedEstimatedValue > 0 && (
                  <span className="text-[11px] text-gray-500 dark:text-neutral-400 font-semibold">
                    ≈ {Math.round(parsedEstimatedValue * usdRate).toLocaleString('ru-RU')} {c.somUnit}
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-[#064734] dark:text-[#d4b26f]">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={c.phEstimated}
                  value={estimatedInput}
                  onChange={handleEstChange}
                  onFocus={(e) => e.target.select()}
                  autoComplete="off"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 font-black text-gray-900 dark:text-white focus:outline-none focus:border-[#064734]"
                />
              </div>
            </div>

            <p className="text-[10px] text-gray-500 dark:text-neutral-400 italic">
              {c.photoTip}
            </p>

            <button
              type="submit"
              className="w-full mt-2 bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black py-4 rounded-xl uppercase tracking-wider transition-all shadow-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <IconWhatsApp className="w-4 h-4 text-[#064734]" />
              <span>{c.btnSubmit}</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

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
                  href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(item.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('trade_in_case', item.targetComplex)}
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
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/30">
                  {c.row1ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-600 dark:text-neutral-400">
                  {c.row1Market}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row2Criteria}</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/30">
                  {c.row2ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-rose-600 dark:text-rose-400 font-medium">
                  {c.row2Market}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row3Criteria}</td>
                <td className="py-3.5 px-3 font-semibold text-gray-900 dark:text-gray-200 bg-emerald-50/40 dark:bg-emerald-950/30">
                  {c.row3ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-500 dark:text-neutral-400">
                  {c.row3Market}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row4Criteria}</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/30">
                  {c.row4ElOrdo}
                </td>
                <td className="py-3.5 px-3 text-gray-500 dark:text-neutral-400">
                  {c.row4Market}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">{c.row5Criteria}</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/30 rounded-b-xl">
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
                      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                      <line x1="9" y1="3" x2="9" y2="18" />
                      <line x1="15" y1="6" x2="15" y2="21" />
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