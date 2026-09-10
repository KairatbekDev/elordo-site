'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FloorPlansSection, { ApartmentPlan } from '@/components/FloorPlansSection';
import TypicalFloorsSection, { TypicalFloorItem } from '@/components/TypicalFloorsSection';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';
import {
  IconCheck,
  IconMapPin,
  IconPhone,
  IconWhatsApp,
  IconInstagram,
  IconDiamond,
  IconCalendar,
  IconCar,
  IconArrowRight,
  IconStar,
} from '@/components/Icons';

interface ComplexSpecs {
  floors: Record<Locale, string>;
  ceiling: string;
  construction: Record<Locale, string>;
  seismic: Record<Locale, string>;
  heating: Record<Locale, string>;
}

export interface ComplexData {
  name: string;
  classType: Record<Locale, string>;
  theme: 'dark' | 'light';
  hero: {
    tag: Record<Locale, string>;
    title: string;
    subtitle: Record<Locale, string>;
    image: string;
    deadline: Record<Locale, string>;
    price: Record<Locale, string>;
    address: Record<Locale, string>;
  };
  specs: ComplexSpecs;
  advantages: {
    title: Record<Locale, string>;
    desc: Record<Locale, string>;
    icon: 'city' | 'security' | 'space' | 'mountain' | 'view';
  }[];
  infrastructure: {
    title: Record<Locale, string>;
    subtitle: Record<Locale, string>;
    items: {
      name: Record<Locale, string>;
      desc: Record<Locale, string>;
      image: string;
    }[];
  };
  legalText: Record<Locale, string>;
  plans?: ApartmentPlan[];
  typicalFloors?: TypicalFloorItem[];
  videoUrl?: string;
}

export const COMPLEXES: Record<string, ComplexData> = {
  'abu-dhabi': {
    name: 'ЖК Abu Dhabi',
    classType: {
      ru: 'Премиум-класс',
      kg: 'Премиум-класс',
      kz: 'Премиум-класс',
      uk: 'Преміум-клас',
      en: 'Premium Class',
      zh: '尊享级 (Premium)',
    },
    theme: 'dark',
    hero: {
      tag: {
        ru: 'ЖИЛОЙ КОМПЛЕКС',
        kg: 'ТУРАК ЖАЙ КОМПЛЕКСИ',
        kz: 'ТҰРҒЫН ҮЙ КЕШЕНІ',
        uk: 'ЖИТЛОВИЙ КОМПЛЕКС',
        en: 'RESIDENTIAL COMPLEX',
        zh: '高品质住宅区',
      },
      title: 'ABU DHABI',
      subtitle: {
        ru: 'Две 25-этажные высотные башни премиум-класса на улице Сухомлинова. Архитектура, вдохновленная восточной эстетикой, панорамное остекление и собственная клубная инфраструктура.',
        kg: 'Сухомлинов көчөсүндөгү эки 25 кабаттуу премиум-класстагы бийик мунаралар. Чыгыш эстетикасынан шыктанган архитектура, панорамалык айнектер жана жеке клубдук инфраструктура.',
        kz: 'Сухомлинов көшесіндегі екі 25 қабатты премиум-санаттағы биік мұнаралар. Шығыс эстетикасымен шабыттанған сәулет, панорамалық шынылау және жеке клубтық инфрақұрылым.',
        uk: 'Дві 25-поверхові висотні вежі преміум-класу на вулиці Сухомлинова. Архітектура, натхненна східною естетикою, панорамне скління та власна клубна інфраструктура.',
        en: 'Twin 25-story premium high-rise towers on Sukhomlinov Street. Architecture inspired by Oriental aesthetics, panoramic glazing, and private club infrastructure.',
        zh: '坐落于苏霍姆利诺夫街的两栋25层高端双子塔。汲取东方美学灵感的先锋建筑设计，全景幕墙采光与私享俱乐部级配套。',
      },
      image: '/projects/Abu-Dhabi.png',
      deadline: {
        ru: '2029 г. 3 квартал',
        kg: '2029-ж. 3-квартал',
        kz: '2029 ж. 3 тоқсан',
        uk: '3 кв. 2029 р.',
        en: 'Q3 2029',
        zh: '2029年第3季度',
      },
      price: {
        ru: 'от 1 650 $',
        kg: '1 650 $ баштап',
        kz: '1 650 $ бастап',
        uk: 'від 1 650 $',
        en: 'from $1,650',
        zh: '1 650 $ 起',
      },
      address: {
        ru: 'ул. Сухомлинова, 29',
        kg: 'Сухомлинов көч., 29',
        kz: 'Сухомлинов к-сі, 29',
        uk: 'вул. Сухомлинова, 29',
        en: '29 Sukhomlinov Street',
        zh: '比什凯克市苏霍姆利诺夫街29号',
      },
    },
    specs: {
      floors: {
        ru: '25 этажей (2 башни)',
        kg: '25 кабат (2 мунара)',
        kz: '25 қабат (2 мұнара)',
        uk: '25 поверхів (2 вежі)',
        en: '25 floors (2 towers)',
        zh: '25层 (双子塔)',
      },
      ceiling: '3.45 м',
      construction: {
        ru: 'Монолитный железобетон, жженый кирпич',
        kg: 'Монолиттүү темир-бетон, бышкан кыш',
        kz: 'Монолитті темірбетон, күйдірілген кірпіш',
        uk: 'Монолітний залізобетон, обпалена цегла',
        en: 'Reinforced concrete frame, solid baked brick',
        zh: '现浇钢筋混凝土主体，环保烧结砖',
      },
      seismic: {
        ru: '9 баллов по шкале MSK-64',
        kg: 'MSK-64 шкаласы боюнча 9 балл',
        kz: 'MSK-64 шкаласы бойынша 9 балл',
        uk: '9 балів за шкалою MSK-64',
        en: '9 points on MSK-64 scale',
        zh: 'MSK-64烈度表9度抗震设防',
      },
      heating: {
        ru: 'Автономное газовое отопление',
        kg: 'Автономдук газ менен жылытуу',
        kz: 'Автономды газбен жылыту',
        uk: 'Автономне газове опалення',
        en: 'Autonomous gas heating',
        zh: '独立智能燃气采暖系统',
      },
    },
    advantages: [
      {
        title: {
          ru: 'Концепция «Город в городе»',
          kg: '«Шаар ичиндеги шаар» концепциясы',
          kz: '«Қала ішіндегі қала» тұжырымдамасы',
          uk: 'Концепція «Місто в місті»',
          en: '"City Within a City" Concept',
          zh: '“城中之城”全景生活规划',
        },
        desc: {
          ru: 'Фитнес-клуб премиум-класса, ресторан авторской кухни и лобби прямо внутри комплекса.',
          kg: 'Премиум-класстагы фитнес-клуб, автордук ашкана рестораны жана комплекс ичиндеги кенен лобби.',
          kz: 'Премиум-санаттағы фитнес-клуб, авторлық асхана мейрамханасы және кешен ішіндегі лобби.',
          uk: 'Фітнес-клуб преміум-класу, ресторан авторської кухні та лобі безпосередньо всередині комплексу.',
          en: 'Premium fitness club, signature restaurant, and elegant lobby directly inside the complex.',
          zh: '高端健身会所、私享主题餐厅与奢华挑高大堂均位于社区内部。',
        },
        icon: 'city',
      },
      {
        title: {
          ru: 'Безопасность будущего',
          kg: 'Келечектин коопсуздугу',
          kz: 'Болашақ қауіпсіздігі',
          uk: 'Безпека майбутнього',
          en: 'Security of the Future',
          zh: '未来感智慧安防',
        },
        desc: {
          ru: 'Система Face ID, Touch ID, круглосуточная охрана, закрытый приватный двор и консьерж-сервис 24/7.',
          kg: 'Face ID, Touch ID тутуму, күнү-түнү кайтаруу, жабык жеке короо жана 24/7 консьерж кызматы.',
          kz: 'Face ID, Touch ID жүйесі, тәулік бойғы күзет, жабық аула және 24/7 консьерж қызметі.',
          uk: 'Система Face ID, Touch ID, цілодобова охорона, закритий приватний двір та консьєрж-сервіс 24/7.',
          en: 'Face ID & Touch ID access, 24/7 security patrol, gated private courtyard, and round-the-clock concierge.',
          zh: '人脸识别Face ID与指纹门禁系统，24小时保安巡查，私密围合庭院与全天候管家礼宾服务。',
        },
        icon: 'security',
      },
      {
        title: {
          ru: 'Свобода пространства',
          kg: 'Кенен мейкиндик',
          kz: 'Кеңістік еркіндігі',
          uk: 'Свобода простору',
          en: 'Expansive Living Space',
          zh: '开阔高敞空间',
        },
        desc: {
          ru: 'Высота потолков 3.45 м, панорамные окна от пола до потолка с видами на горный хребет Ала-Тоо.',
          kg: 'Шыптын бийиктиги 3.45 м, Ала-Тоо чокуларына сонун көрүнүш ачкан полдон шыпка чейинки панорамалык терезелер.',
          kz: 'Төбе биіктігі 3.45 м, Ала-Тоо тау сілемдеріне көрінісі бар еденнен төбеге дейінгі панорамалық терезелер.',
          uk: 'Висота стель 3.45 м, панорамні вікна від підлоги до стелі з видами на гірський хребет Ала-Тоо.',
          en: 'Ceiling height of 3.45 m with floor-to-ceiling panoramic windows looking out to the Ala-Too mountains.',
          zh: '室内净高3.45米，超大全景落地窗极目远眺雄浑秀美的阿拉套雪山群峰。',
        },
        icon: 'space',
      },
    ],
    infrastructure: {
      title: {
        ru: 'ЖИЗНЬ В ФОРМАТЕ ALL-IN-ONE',
        kg: 'ALL-IN-ONE ФОРМАТЫНДАГЫ ЖАШОО',
        kz: 'ALL-IN-ONE ФОРМАТЫНДАҒЫ ӨМІР',
        uk: 'ЖИТТЯ У ФОРМАТІ ALL-IN-ONE',
        en: 'ALL-IN-ONE LIFESTYLE',
        zh: 'ALL-IN-ONE 全能生活方式',
      },
      subtitle: {
        ru: 'Все для комфортной жизни внутри одной территории: приватный парк без машин, подземный двухуровневый паркинг и топовые гимназии в шаговой доступности.',
        kg: 'Бир аймактын ичинде ыңгайлуу жашоо үчүн бардыгы бар: унаасыз жеке парк, жер астындагы эки деңгээлдүү унаа токтотуучу жай жана алдыңкы гимназиялар.',
        kz: 'Бір аумақтың ішінде жайлы өмір үшін барлығы қарастырылған: көліксіз жеке саябақ, жер астындағы екі деңгейлі тұрақ және үздік мектептер.',
        uk: 'Все для комфортного життя на одній території: приватний парк без авто, підземний паркінг та найкращі гімназії у пішій доступності.',
        en: 'Everything for comfortable living: car-free private park, two-level underground parking, and premier schools nearby.',
        zh: '一站式满足高品质生活所需：无车化私享静谧花园、地下双层停车场以及步行即达的首都重点学府。',
      },
      items: [
        {
          name: { ru: 'Fitness & Spa Center', kg: 'Fitness & Spa Center', kz: 'Fitness & Spa Center', uk: 'Fitness & Spa Center', en: 'Fitness & Spa Center', zh: '私享健身与水疗中心' },
          desc: {
            ru: 'Ваш приватный зал для спорта и релаксации без выезда в город.',
            kg: 'Шаарга чыкпай эле спорт жана эс алуу үчүн жеке залыңыз.',
            kz: 'Қалаға шықпай-ақ спорт пен демалуға арналған жеке залыңыз.',
            uk: 'Ваш приватний зал для спорту та релаксації без виїзду до міста.',
            en: 'Your private wellness space for sports and relaxation without leaving home.',
            zh: '足不出户尽享专属于您的私人健身与SPA水疗养生中心。',
          },
          image: '/layouts/abu-dhabi/fitness.jpg',
        },
        {
          name: { ru: 'Premium Restaurant', kg: 'Premium Restaurant', kz: 'Premium Restaurant', uk: 'Premium Restaurant', en: 'Premium Restaurant', zh: '高端主题餐厅' },
          desc: {
            ru: 'Гастрономические ужины и деловые встречи на первом этаже комплекса.',
            kg: 'Комплекстин биринчи кабатындагы кечки тамактар жана ишкердик жолугушуулар.',
            kz: 'Кешеннің бірінші қабатындағы кешкі астар мен іскерлік кездесулер.',
            uk: 'Гастрономічні вечері та ділові зустрічі на першому поверсі комплексу.',
            en: 'Gourmet dining and business meetings right on the ground floor.',
            zh: '社区首层专设高端主题餐厅，商务宴请与温馨家宴从容自如。',
          },
          image: '/layouts/abu-dhabi/restaurant.jpg',
        },
        {
          name: { ru: 'Private Park & Lounge', kg: 'Private Park & Lounge', kz: 'Private Park & Lounge', uk: 'Private Park & Lounge', en: 'Private Park & Lounge', zh: '园林景观休闲区' },
          desc: {
            ru: 'Двор-сад без автомобилей с детскими площадками и прогулочными аллеями.',
            kg: 'Балдар аянтчалары жана сейилдөө аллеялары бар унаасыз бакча-короо.',
            kz: 'Балалар алаңдары мен серуендеу аллеялары бар көліксіз бақша-аула.',
            uk: 'Двір-сад без авто з дитячими майданчиками та прогулянковими алеями.',
            en: 'Automobile-free garden courtyard with children’s play areas and walking paths.',
            zh: '全人车分流景观园林，配备多功能儿童游乐区与观景休闲步道。',
          },
          image: '/layouts/abu-dhabi/park.jpg',
        },
      ],
    },
    legalText: {
      ru: 'ЖК Abu Dhabi возводится в строгом соответствии со СНиП КР. Полный пакет разрешительной документации, Красная книга и положительное заключение Госэкспертизы доступны в офисе продаж.',
      kg: '«Abu Dhabi» ТЖКсы КР СНиП нормаларына так ылайык курулууда. Уруксат берүүчү документтердин толук топтому, Кызыл китеп жана Мамэкспертизанын оң корутундусу сатуу кеңсесинде жеткиликтүү.',
      kz: '«Abu Dhabi» ТҮК ҚР ҚНжЕ талаптарына толық сәйкес салынуда. Рұқсат құжаттарының толық топтамасы, Қызыл кітап және Мемлекеттік сараптаманың оң қорытындысы сату кеңсесінде қолжетімді.',
      uk: 'ЖК Abu Dhabi зводиться у суворій відповідності до СНіП КР. Повний пакет дозвільної документації, Червона книга та позитивний висновок Держекспертизи доступні у відділі продажів.',
      en: 'Abu Dhabi RC is constructed in strict adherence to KR Building Standards. The complete permit package, Red Book land title, and positive State Expertise appraisal are available in the sales office.',
      zh: '阿布扎比住宅区严格恪守吉尔吉斯共和国建筑工程标准。全套施工规划审批文件、国家土地红本及国家质检合格证书均在营销中心公开查阅。',
    },
    plans: [
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '49.48 м²', image: '/layouts/abu-dhabi/1 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '49.73 м²', image: '/layouts/abu-dhabi/2 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок А', area: '50.88 м²', image: '/layouts/abu-dhabi/3 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '54.68 м²', image: '/layouts/abu-dhabi/4 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '55.62 м²', image: '/layouts/abu-dhabi/5 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '58.05 м²', image: '/layouts/abu-dhabi/6 1room-abu.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Abu Dhabi блок Б', area: '78.30 м²', image: '/layouts/abu-dhabi/1 2room-abu.png' },
      { rooms: 2, title: '2-ком квартира в ЖК Abu Dhabi блок А', area: '79.77 м²', image: '/layouts/abu-dhabi/2 2room-abu.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Abu Dhabi блок А', area: '80.26 м²', image: '/layouts/abu-dhabi/3 2room-abu.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Abu Dhabi блок Б', area: '81.59 м²', image: '/layouts/abu-dhabi/4 2room-abu.png' },
      { rooms: 2, title: '2-ком квартира в ЖК Abu Dhabi блок А', area: '83.58 м²', image: '/layouts/abu-dhabi/5 2room-abu.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Abu Dhabi блок А', area: '83.99 м²', image: '/layouts/abu-dhabi/6 2room-abu.png' },
      { rooms: 3, title: '3х ком квартира в ЖК Abu Dhabi блок Б', area: '119.32 м²', image: '/layouts/abu-dhabi/1 3room-abu.png' },
    ],
  },
  'madina-residence': {
    name: 'ЖК Madina Residence',
    classType: {
      ru: 'Бизнес-класс',
      kg: 'Бизнес-класс',
      kz: 'Бизнес-класс',
      uk: 'Бізнес-клас',
      en: 'Business Class',
      zh: '商务级 (Business)',
    },
    theme: 'light',
    hero: {
      tag: {
        ru: 'ЖИЛОЙ КОМПЛЕКС',
        kg: 'ТУРАК ЖАЙ КОМПЛЕКСИ',
        kz: 'ТҰРҒЫН ҮЙ КЕШЕНІ',
        uk: 'ЖИТЛОВИЙ КОМПЛЕКС',
        en: 'RESIDENTIAL COMPLEX',
        zh: '高品质住宅区',
      },
      title: 'MADINA RESIDENCE',
      subtitle: {
        ru: 'Символ статуса в административном и культурном центре Бишкека. Респектабельный дом для тех, кто ценит время, приватность и комфорт городской среды.',
        kg: 'Бишкектин административдик жана маданий борборундагы кадыр-барктын символу. Убакытты, купуялуулукту жана шаардык ыңгайлуулукту баалагандар үчүн татыктуу үй.',
        kz: 'Бішкектің әкімшілік және мәдени орталығындағы мәртебе символы. Уақытты, құпиялықты және қалалық жайлылықты бағалайтындар үшін лайықты баспана.',
        uk: 'Символ статусу в адміністративному та культурному центрі Бішкека. Респектабельний будинок для тих, хто цінує час, приватність та міський комфорт.',
        en: 'A symbol of prestige in the administrative and cultural heart of Bishkek. A respectable residence for those who value time, privacy, and urban comfort.',
        zh: '坐落于比什凯克政务文化核心地段的尊崇地标。专为重视时间效率、私密品质与都市格调的精英阶层量身打造。',
      },
      image: '/projects/Madina-Residense.png',
      deadline: {
        ru: '2027 г. 3 квартал',
        kg: '2027-ж. 3-квартал',
        kz: '2027 ж. 3 тоқсан',
        uk: '3 кв. 2027 р.',
        en: 'Q3 2027',
        zh: '2027年第3季度',
      },
      price: {
        ru: 'от 1 400 $',
        kg: '1 400 $ баштап',
        kz: '1 400 $ бастап',
        uk: 'від 1 400 $',
        en: 'from $1,400',
        zh: '1 400 $ 起',
      },
      address: {
        ru: 'ул. Огонбаева, 12',
        kg: 'Огонбаев көч., 12',
        kz: 'Огонбаев к-сі, 12',
        uk: 'вул. Огонбаєва, 12',
        en: '12 Ogonbaev Street',
        zh: '比什凯克市奥贡巴耶夫街12号',
      },
    },
    specs: {
      floors: {
        ru: '14 этажей',
        kg: '14 кабат',
        kz: '14 қабат',
        uk: '14 поверхів',
        en: '14 floors',
        zh: '14层',
      },
      ceiling: '3.15 м',
      construction: {
        ru: 'Монолитный каркас, кирпич, базальт 100 мм',
        kg: 'Монолиттүү каркас, бышкан кыш, 100 мм базальт',
        kz: 'Монолитті қаңқа, кірпіш, 100 мм базальт',
        uk: 'Монолітний каркас, цегла, базальт 100 мм',
        en: 'Monolithic frame, brick, 100 mm basalt insulation',
        zh: '现浇框架主体，实心砖填充，100mm岩棉保温',
      },
      seismic: {
        ru: '9 баллов',
        kg: '9 балл',
        kz: '9 балл',
        uk: '9 балів',
        en: '9 points',
        zh: '9度抗震设防',
      },
      heating: {
        ru: 'Центральные городские коммуникации',
        kg: 'Шаардык борборлоштурулган коммуникациялар',
        kz: 'Қалалық орталықтандырылған желілер',
        uk: 'Центральні міські комунікації',
        en: 'Central city district utilities',
        zh: '市政集中供暖与管网配套',
      },
    },
    advantages: [
      {
        title: {
          ru: 'Панорама на центр столицы',
          kg: 'Борборго панорамалык көрүнүш',
          kz: 'Орталыққа панорамалық көрініс',
          uk: 'Панорама на центр столиці',
          en: 'City Center Panorama',
          zh: '俯瞰首都核心繁华全景',
        },
        desc: {
          ru: 'Вид на площадь и главный флаг страны прямо из гостиной вашей квартиры.',
          kg: 'Батирыңыздын конок бөлмөсүнөн борбордук аянтка жана мамлекеттик тууга сонун көрүнүш.',
          kz: 'Пәтеріңіздің қонақ бөлмесінен орталық алаң мен мемлекеттік туға әсем көрініс.',
          uk: 'Вид на центральну площу та головний прапор країни безпосередньо з вітальні.',
          en: 'Views of the central square and the national flag directly from your living room.',
          zh: '从居室客厅即可远眺中央广场与国家标志性盛景。',
        },
        icon: 'view',
      },
      {
        title: {
          ru: 'Локация в центре',
          kg: 'Борбордук жайгашуу',
          kz: 'Орталықтағы орналасу',
          uk: 'Локація в центрі',
          en: 'Prime Central Location',
          zh: '核心政商腹地',
        },
        desc: {
          ru: 'Ул. Огонбаева, 12. Шаговая доступность до правительственных учреждений, театров и парков.',
          kg: 'Огонбаев көч., 12. Мамлекеттик мекемелерге, театрларга жана парктарга жөө басуу аралыгы.',
          kz: 'Огонбаев к-сі, 12. Мемлекеттік мекемелерге, театрлар мен саябақтарға жақын орналасу.',
          uk: 'Вул. Огонбаєва, 12. Піша доступність до урядових установ, театрів та парків.',
          en: '12 Ogonbaev St. Walking distance to government buildings, theaters, and parks.',
          zh: '坐落于奥贡巴耶夫街12号，步行即达主要政府机关、大剧院及林荫公园。',
        },
        icon: 'city',
      },
      {
        title: {
          ru: 'Европейские стандарты',
          kg: 'Европалык стандарттар',
          kz: 'Еуропалық стандарттар',
          uk: 'Європейські стандарти',
          en: 'European Standards',
          zh: '欧洲现代精工标准',
        },
        desc: {
          ru: 'Дизайнерская отделка лобби, скоростные бесшумные лифты и охраняемая закрытая территория.',
          kg: 'Дизайнердик лобби, ылдам үндү чыгарбаган лифттер жана кайтарылган жабык аймак.',
          kz: 'Дизайнерлік лобби, дыбыссыз жүрдек лифттер және күзетілетін жабық аумақ.',
          uk: 'Дизайнерське лобі, швидкісні безшумні ліфти та закрита територія під охороною.',
          en: 'Designer lobby finishes, high-speed silent elevators, and secure gated perimeter.',
          zh: '定制级艺术入户大堂，静音高速品牌电梯与全天候安防封闭式社区。',
        },
        icon: 'security',
      },
    ],
    infrastructure: {
      title: {
        ru: 'ВНУТРЕННЯЯ ИНФРАСТРУКТУРА',
        kg: 'ИЧКИ ИНФРАСТРУКТУРА',
        kz: 'ІШКІ ИНФРАҚҰРЫЛЫМ',
        uk: 'ВНУТРІШНЯ ІНФРАСТРУКТУРА',
        en: 'RESIDENTIAL INFRASTRUCTURE',
        zh: '社区全维专属配套',
      },
      subtitle: {
        ru: 'Пространство, продуманное для динамичной жизни: закрытая охраняемая территория, подземный паркинг и безопасная игровая среда для детей.',
        kg: 'Ыкчам жашоо үчүн ойлонулган мейкиндик: кайтарылган жабык аймак, жер астындагы унаа токтотуучу жай жана коопсуз балдар ойноо чөйрөсү.',
        kz: 'Қарқынды өмірге арналған кеңістік: күзетілетін аумақ, жерасты тұрағы және қауіпсіз балалар алаңы.',
        uk: 'Простір для динамічного життя: закрита територія під охороною, підземний паркінг та безпечний ігровий простір.',
        en: 'Space designed for dynamic urban living: gated grounds, underground parking, and safe play areas.',
        zh: '为都市精英潜心构筑的品质空间：封闭式安防、地下停车场与环保儿童游乐场。',
      },
      items: [
        {
          name: { ru: 'Панорамный обзор', kg: 'Панорамалык көрүнүш', kz: 'Панорамалық көрініс', uk: 'Панорамний огляд', en: 'Panoramic Views', zh: '天幕全景视野' },
          desc: {
            ru: 'Видовые террасы и остекление с видами на центр Бишкека.',
            kg: 'Бишкектин борборуна караган видовой террасалар жана панорамалык айнектер.',
            kz: 'Бішкектің орталығына қарайтын видовой террасалар мен шынылау.',
            uk: 'Видові тераси та скління з краєвидами на центр Бішкека.',
            en: 'Scenic terraces and glazing overlooking the Bishkek center.',
            zh: '广角观景露台与宽幕全景玻璃窗，坐揽市中心璀璨夜景。',
          },
          image: '/layouts/madina-residence/madina1.jpg',
        },
        {
          name: { ru: 'Kids Play Zone', kg: 'Kids Play Zone', kz: 'Kids Play Zone', uk: 'Kids Play Zone', en: 'Kids Play Zone', zh: '儿童安全游乐园' },
          desc: {
            ru: 'Экологичные детские игровые комплексы на безопасном резиновом покрытии.',
            kg: 'Коопсуз резина каптамасындагы экологиялык балдар ойноо комплекстери.',
            kz: 'Қауіпсіз резеңке төсемі бар балаларға арналған ойын алаңдары.',
            uk: 'Екологічні дитячі майданчики на безпечному гумовому покритті.',
            en: 'Eco-friendly play equipment on soft protective safety flooring.',
            zh: '甄选环保无毒安全材质，铺设高弹性防摔安全地胶。',
          },
          image: '/layouts/madina-residence/park.jpg',
        },
        {
          name: { ru: 'Дизайнерское Лобби', kg: 'Дизайнердик Лобби', kz: 'Дизайнерлік Лобби', uk: 'Дизайнерське Лобі', en: 'Designer Lobby', zh: '轻奢艺术大堂' },
          desc: {
            ru: 'Стойка консьержа, зона ожидания гостей и отделка керамогранитом.',
            kg: 'Консьерж столу, коноктор үчүн күтүү зонасы жана керамогранит менен кооздоо.',
            kz: 'Консьерж бөлмесі, күту аймағы және керамогранитпен әрлеу.',
            uk: 'Стійка консьєржа, лаунж-зона для гостей та оздоблення керамогранітом.',
            en: 'Concierge desk, stylish guest lounge, and porcelain stoneware finishes.',
            zh: '尊崇礼宾前台、访客候梯洽谈区与进口岩板典雅奢装。',
          },
          image: '/layouts/madina-residence/lobby.jpg',
        },
      ],
    },
    legalText: {
      ru: 'Объект возводится на земельном участке с Красной книгой. Оформление по ДДУ с государственной регистрацией в Госрегистре КР.',
      kg: 'Объект Кызыл китеби бар жер тилкесинде курулууда. КР Мамкаттоосунда мамлекеттик каттоосу менен ДДУ аркылуу таризделет.',
      kz: 'Нысан Қызыл кітабы бар жер телімінде салынып жатыр. ҚР Мемтіркеуінде ресми тіркелетін ДДУ арқылы ресімделеді.',
      uk: 'Об’єкт зводиться на земельній ділянці з Червоною книгою. Оформлення за ДДУ з державною реєстрацією в Держреєстрі КР.',
      en: 'Built on private land with an official Red Book title. Registered equity participation contracts under state registration.',
      zh: '项目坐落于拥有国家正式土地红本的自有地块之上，直签国家官方备案的合规购房合同。',
    },
    plans: [
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок А', area: '43.59 м²', image: '/layouts/madina-residence/1 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок А', area: '45.21 м²', image: '/layouts/madina-residence/2 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок В', area: '46.47 м²', image: '/layouts/madina-residence/3 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок Б', area: '48.60 м²', image: '/layouts/madina-residence/1 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок В', area: '49.03 м²', image: '/layouts/madina-residence/2 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок В', area: '49.14 м²', image: '/layouts/madina-residence/3 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок А', area: '49.90 м²', image: '/layouts/madina-residence/1 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок Б', area: '50.01 м²', image: '/layouts/madina-residence/2 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок А', area: '50.18 м²', image: '/layouts/madina-residence/3 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок В', area: '53.15 м²', image: '/layouts/madina-residence/1 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок А', area: '53.88 м²', image: '/layouts/madina-residence/2 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок Б', area: '57.87 м²', image: '/layouts/madina-residence/3 1room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок А', area: '71.00 м²', image: '/layouts/madina-residence/1 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок В', area: '71.07 м²', image: '/layouts/madina-residence/2 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок Б', area: '74.30 м²', image: '/layouts/madina-residence/3 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок А', area: '74.53 м²', image: '/layouts/madina-residence/4 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок В', area: '74.59 м²', image: '/layouts/madina-residence/5 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок В', area: '74.74 м²', image: '/layouts/madina-residence/6 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок А', area: '75.90 м²', image: '/layouts/madina-residence/7 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок А', area: '81.30 м²', image: '/layouts/madina-residence/8 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок В', area: '81.31 м²', image: '/layouts/madina-residence/9 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок А', area: '83.78 м²', image: '/layouts/madina-residence/10 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок В', area: '84.09 м²', image: '/layouts/madina-residence/11 2room-madina.png' },
      { rooms: 3, title: '3х ком квартира в ЖК Madina Residence блок Б', area: '108.48 м²', image: '/layouts/madina-residence/1 3room-madina.png' },
    ],
  },
  'ajkol-plus': {
    name: 'ЖД Айкол +',
    classType: {
      ru: 'Комфорт+',
      kg: 'Комфорт+',
      kz: 'Комфорт+',
      uk: 'Комфорт+',
      en: 'Comfort+',
      zh: '舒适+ (Comfort+)',
    },
    theme: 'light',
    hero: {
      tag: {
        ru: 'КЛУБНЫЙ ДОМ',
        kg: 'КЛУБДУК ҮЙ',
        kz: 'КЛУБТЫҚ ҮЙ',
        uk: 'КЛУБНИЙ БУДИНОК',
        en: 'CLUB HOUSE',
        zh: '低密静谧洋房',
      },
      title: 'АЙКОЛ+',
      subtitle: {
        ru: 'Экология и семейный уют в экологически чистом южном предгорье Бишкека (с. Кок-Жар). Жизнь в гармонии с природой без смога с кристально чистым воздухом круглый год.',
        kg: 'Бишкектин экологиялык таза түштүк тоо этегиндеги табият жана үй-бүлөлүк жылуулук (Көк-Жар айылы). Жыл бою түтүнсүз, тунук таза абада табият менен гармонияда жашоо.',
        kz: 'Бішкектің экологиялық таза оңтүстік бөктеріндегі жайлылық (Көк-Жар а.). Жыл бойы түтінсіз, мөлдір таза ауада табиғатпен үндестікте өмір сүру.',
        uk: 'Екологія та сімейний затишок в екологічно чистому південному передгір’ї Бішкека (с. Кок-Жар). Життя в гармонії з природою без смогу цілий рік.',
        en: 'Pristine ecology and family warmth in the scenic southern foothills of Bishkek (Kok-Jar). Live in harmony with nature with clean mountain air year-round.',
        zh: '坐落于比什凯克南部天然生态麓区（Kok-Jar）。远离城市雾霾，常年呼吸纯净山风，畅享自然宜居与家庭温馨。',
      },
      image: '/projects/Aikolplus.png',
      deadline: {
        ru: '2028 г. 3 квартал',
        kg: '2028-ж. 3-квартал',
        kz: '2028 ж. 3 тоқсан',
        uk: '3 кв. 2028 р.',
        en: 'Q3 2028',
        zh: '2028年第3季度',
      },
      price: {
        ru: 'от 1 100 $',
        kg: '1 100 $ баштап',
        kz: '1 100 $ бастап',
        uk: 'від 1 100 $',
        en: 'from $1,100',
        zh: '1 100 $ 起',
      },
      address: {
        ru: 'с. Кок-Жар, ул. Баялинова, 6',
        kg: 'Көк-Жар а., Баялинов көч., 6',
        kz: 'Көк-Жар а., Баялинов к-сі, 6',
        uk: 'с. Кок-Жар, вул. Баялінова, 6',
        en: '6 Bayalinov Street, Kok-Jar',
        zh: '比什凯克市Kok-Jar区巴亚利诺夫街6号',
      },
    },
    specs: {
      floors: {
        ru: '10 этажей',
        kg: '10 кабат',
        kz: '10 қабат',
        uk: '10 поверхів',
        en: '10 floors',
        zh: '10层',
      },
      ceiling: '3.00 м',
      construction: {
        ru: 'Монолитный каркас, жженый кирпич',
        kg: 'Монолиттүү каркас, бышкан кыш',
        kz: 'Монолитті қаңқа, күйдірілген кірпіш',
        uk: 'Монолітний каркас, обпалена цегла',
        en: 'Monolithic frame, baked brick',
        zh: '现浇钢筋混凝土框架，环保烧结红砖',
      },
      seismic: {
        ru: '9 баллов',
        kg: '9 балл',
        kz: '9 балл',
        uk: '9 балів',
        en: '9 points',
        zh: '9度抗震设防',
      },
      heating: {
        ru: 'Автономная газифицированная котельная',
        kg: 'Автономдук газдаштырылган отказан',
        kz: 'Автономды газдандырылған қазандық',
        uk: 'Автономна газифікована котельня',
        en: 'Autonomous gas boiler house',
        zh: '社区自营独立燃气供热站',
      },
    },
    advantages: [
      {
        title: {
          ru: 'Чистый воздух 365 дней в году',
          kg: 'Жыл бою таза аба',
          kz: 'Жыл бойы таза ауа',
          uk: 'Чисте повітря 365 днів на рік',
          en: 'Clean Mountain Air Year-Round',
          zh: '365天纯净天然山风',
        },
        desc: {
          ru: 'Расположение в южном предгорье обеспечивает постоянный приток свежего горного воздуха и отсутствие смога.',
          kg: 'Түштүк тоо этегинде жайгашуусу таза тоо абасын камсыздап, түтүндөн алыс кылат.',
          kz: 'Оңтүстік бөктерде орналасуы таза тау ауасын қамтамасыз етеді.',
          uk: 'Розташування у передгір’ї забезпечує постійний приплив свіжого повітря.',
          en: 'Positioned in the southern foothills ensuring permanent mountain breeze without city smog.',
          zh: '背靠南部山麓，常年处于清新空气对流廊道，彻底杜绝城市雾霾。',
        },
        icon: 'mountain',
      },
      {
        title: {
          ru: 'Усиленная теплоизоляция',
          kg: 'Күчөтүлгөн жылуулоо',
          kz: 'Күшейтілген жылыту',
          uk: 'Посилена теплоізоляція',
          en: 'Enhanced Thermal Insulation',
          zh: '严选强化保温系统',
        },
        desc: {
          ru: 'Энергосберегающее остекление и базальтовое утепление 100 мм защищают от любых перепадов температур.',
          kg: 'Энергияны үнөмдөөчү айнектер жана 100 мм базальт жылуулоосу температуранын өзгөрүшүнөн сактайт.',
          kz: 'Энергия үнемдейтін шынылау және 100 мм базальт жылытқышы суықтан қорғайды.',
          uk: 'Енергоощадне скління та базальтове утеплення 100 мм захищають від перепадів температур.',
          en: 'Energy-saving double glazing and 100 mm basalt insulation shield against weather changes.',
          zh: '三玻两腔节能门窗与100mm高密度防火玄武岩保温层隔热保温。',
        },
        icon: 'security',
      },
      {
        title: {
          ru: 'Камерный клубный формат',
          kg: 'Камералык клубдук формат',
          kz: 'Шағын клубтық формат',
          uk: 'Камерний клубний формат',
          en: 'Exclusive Boutique Format',
          zh: '私密低密纯粹洋房',
        },
        desc: {
          ru: 'Малое количество квартир на площадке, дружелюбное комьюнити и закрытая безопасная территория.',
          kg: 'Кабатта аз батир, ынтымактуу кошуналар жана жабык коопсуз аймак.',
          kz: 'Қабаттағы пәтер саны аз, бір-бірін танитын тұрғындар және қауіпсіз жабық аула.',
          uk: 'Мала кількість квартир на поверсі, привітна спільнота та безпечна закрита територія.',
          en: 'Low density of apartments per floor, friendly neighbor community, and private grounds.',
          zh: '一层少数尊贵住户规划，圈层纯粹，全天候封闭式安全庭院。',
        },
        icon: 'space',
      },
    ],
    infrastructure: {
      title: {
        ru: 'ПРИРОДА В СОЧЕТАНИИ С КОМФОРТОМ',
        kg: 'ТАБИЯТ ЖАНА ЫҢГАЙЛУУЛУК',
        kz: 'ТАБИҒАТ ПЕН ЖАЙЛЫЛЫҚ ҮЙЛЕСІМІ',
        uk: 'ПРИРОДА У ПОЄДНАННІ З КОМФОРТОМ',
        en: 'NATURE COMBINED WITH COMFORT',
        zh: '自然风光与当代宜居的和谐交融',
      },
      subtitle: {
        ru: 'Пространство для безопасного взросления детей и спокойного отдыха родителей. Закрытый двор без машин и близость к частным школам района.',
        kg: 'Балдардын коопсуз чоңоюшу жана ата-энелердин тынч эс алуусу үчүн мейкиндик. Унаасыз жабык короо.',
        kz: 'Балалардың қауіпсіз өсуі мен ата-аналардың тыныш демалуына арналған кеңістік. Көліксіз аула.',
        uk: 'Простір для безпечного зростання дітей та спокійного відпочинку батьків.',
        en: 'Safe space for children to grow and parents to relax. Gated car-free courtyard near top private schools.',
        zh: '呵护孩子健康成长的安全天地，父母宁静休养的理想居所。无车化静谧社区，紧邻周边知名学府。',
      },
      items: [
        {
          name: { ru: 'Eco Play Zone', kg: 'Eco Play Zone', kz: 'Eco Play Zone', uk: 'Eco Play Zone', en: 'Eco Play Zone', zh: '生态儿童游乐园' },
          desc: {
            ru: 'Детские площадки из натурального дерева и безопасных материалов.',
            kg: 'Табигый жыгачтан жана коопсуз материалдардан жасалган балдар аянтчалары.',
            kz: 'Табиғи ағаштан және қауіпсіз материалдардан жасалған балалар алаңы.',
            uk: 'Дитячі майданчики з натурального дерева та безпечних матеріалів.',
            en: 'Playgrounds crafted from natural wood and eco-certified materials.',
            zh: '全天然原木环保游乐设施，给孩子亲近自然的纯真童年。',
          },
          image: '/layouts/ajkol-plus/ecoplay.jpg',
        },
        {
          name: { ru: 'Green Walk Zone', kg: 'Green Walk Zone', kz: 'Green Walk Zone', uk: 'Green Walk Zone', en: 'Green Walk Zone', zh: '四季青翠步道' },
          desc: {
            ru: 'Прогулочные дорожки и хвойное озеленение территории дома.',
            kg: 'Сейилдөө жолдору жана үйдүн аймагын ийне жалбырактуу жашылдандыруу.',
            kz: 'Серуендеу жолдары және ауланы қылқанжапырақты ағаштармен көгалдандыру.',
            uk: 'Прогулянкові доріжки та хвойне озеленення території будинку.',
            en: 'Landscaped promenades and lush evergreen landscaping.',
            zh: '林荫散步小径搭配名贵松柏常青绿植，四季苍翠宜人。',
          },
          image: '/layouts/ajkol-plus/greenzone.jpg',
        },
        {
          name: { ru: 'Удобный паркинг', kg: 'Ыңгайлуу паркинг', kz: 'Ыңғайлы тұрақ', uk: 'Зручний паркінг', en: 'Spacious Parking', zh: '便捷业主停车场' },
          desc: {
            ru: 'Оборудованные парковочные места для резидентов и гостей комплекса.',
            kg: 'Тургундар жана коноктор үчүн ыңгайлуу унаа токтотуучу жайлар.',
            kz: 'Тұрғындар мен қонақтарға арналған автотұрақ орындары.',
            uk: 'Обладнані місця для паркування резидентів та гостей.',
            en: 'Designated parking bays for residents and visitors.',
            zh: '为业主及来访亲朋科学规划专属便捷停车位。',
          },
          image: '/layouts/ajkol-plus/parking.jpg',
        },
      ],
    },
    legalText: {
      ru: 'Строительство ведется на собственном земельном участке. Проект имеет положительное заключение государственной экспертизы.',
      kg: 'Курулуш жеке жер тилкесинде жүргүзүлүүдө. Долбоор мамлекеттик экспертизанын оң корутундусуна ээ.',
      kz: 'Құрылыс жеке жер телімінде жүргізіліп жатыр. Жоба мемлекеттік сараптаманың оң қорытындысына ие.',
      uk: 'Будівництво ведеться на власній ділянці. Проєкт має позитивний висновок державної експертизи.',
      en: 'Built on proprietary land plot. Fully certified with positive State Construction Agency appraisal.',
      zh: '项目坐落于自有土地，工程设计方案已正式通过国家工程勘察设计质检审查。',
    },
    typicalFloors: [
      { id: '2', label: '2 этаж', image: '/layouts/ajkol-plus/2floor.jpg' },
      { id: '3-8', label: '3-8 этаж', image: '/layouts/ajkol-plus/3-8floor.jpg' },
      { id: '9', label: '9 этаж', image: '/layouts/ajkol-plus/9floor.jpg' },
      { id: '10', label: '10 этаж', image: '/layouts/ajkol-plus/10floor.jpg' },
    ],
  },
  'ajkol': {
    name: 'ЖД Айкол',
    classType: {
      ru: 'Комфорт-класс',
      kg: 'Комфорт-класс',
      kz: 'Комфорт-класс',
      uk: 'Комфорт-клас',
      en: 'Comfort Class',
      zh: '舒适级 (Comfort)',
    },
    theme: 'light',
    hero: {
      tag: {
        ru: 'ЖИЛОЙ ДОМ',
        kg: 'ТУРАК ЖАЙ ҮЙҮ',
        kz: 'ТҰРҒЫН ҮЙ',
        uk: 'ЖИТЛОВИЙ БУДИНОК',
        en: 'RESIDENTIAL BUILDING',
        zh: '精工品质住宅',
      },
      title: 'АЙКОЛ',
      subtitle: {
        ru: 'Уютный малоквартирный жилой дом комфорт-класса в высокой стадии строительной готовности. Монолитно-кирпичный конструктив и надежные инженерные сети.',
        kg: 'Курулуш даярдыгы жогору болгон ыңгайлуу чакан батирлүү комфорт-класстагы турак үй. Монолит-бышкан кыш конструкциясы жана ишенимдүү инженердик тармактар.',
        kz: 'Құрылыс дайындығы жоғары жайлы шағын пәтерлі тұрғын үй. Монолитті-кірпіш конструкциясы және сенімді инженерлік желілер.',
        uk: 'Затишний житловий будинок комфорт-класу високого ступеня будівельної готовності. Монолітно-цегляний конструктив та надійні інженерні мережі.',
        en: 'A cozy comfort-class residential building nearing completion. Monolithic brick construction and robust modern utilities.',
        zh: '准现房在建的舒适型品质住宅。坚实钢筋混凝土主体与环保实心红砖结构，完备市政工程管网保障。',
      },
      image: '/projects/ajkol.jpg',
      deadline: {
        ru: '2026 г. 2 квартал',
        kg: '2026-ж. 2-квартал',
        kz: '2026 ж. 2 тоқсан',
        uk: '2 кв. 2026 р.',
        en: 'Q2 2026',
        zh: '2026年第2季度',
      },
      price: {
        ru: 'от 950 $',
        kg: '950 $ баштап',
        kz: '950 $ бастап',
        uk: 'від 950 $',
        en: 'from $950',
        zh: '950 $ 起',
      },
      address: {
        ru: 'ул. Арашан, 10',
        kg: 'Арашан көч., 10',
        kz: 'Арашан к-сі, 10',
        uk: 'вул. Арашан, 10',
        en: '10 Arashan Street',
        zh: '阿拉尚街10号',
      },
    },
    specs: {
      floors: {
        ru: '9 этажей',
        kg: '9 кабат',
        kz: '9 қабат',
        uk: '9 поверхів',
        en: '9 floors',
        zh: '9层',
      },
      ceiling: '3.00 м',
      construction: {
        ru: 'Монолитный железобетон, кирпичные стены',
        kg: 'Монолиттүү темир-бетон, бышкан кыш дубалдар',
        kz: 'Монолитті темірбетон, кірпіш қабырғалар',
        uk: 'Монолітний залізобетон, цегляні стіни',
        en: 'Reinforced concrete frame, solid brick walls',
        zh: '现浇钢筋混凝土，环保实心砖砌体',
      },
      seismic: {
        ru: '9 баллов',
        kg: '9 балл',
        kz: '9 балл',
        uk: '9 балів',
        en: '9 points',
        zh: '9度抗震设防',
      },
      heating: {
        ru: 'Газовое отопление',
        kg: 'Газ менен жылытуу',
        kz: 'Газбен жылыту',
        uk: 'Газове опалення',
        en: 'Gas heating system',
        zh: '独立燃气采暖系统',
      },
    },
    advantages: [
      {
        title: {
          ru: 'Скорый ввод в эксплуатацию',
          kg: 'Жакында пайдаланууга берүү',
          kz: 'Жуырда пайдалануға беру',
          uk: 'Швидке введення в експлуатацію',
          en: 'Fast Delivery & Commissioning',
          zh: '即将竣工验收交付',
        },
        desc: {
          ru: 'Строительные работы находятся на завершающей стадии. Сдача дома запланирована на 2026 год.',
          kg: 'Курулуш иштери аяктоо стадиясында. Үйдү тапшыруу 2026-жылга пландаштырылган.',
          kz: 'Құрылыс жұмыстары аяқталу кезеңінде. Үйді пайдалануға беру 2026 жылға жоспарланған.',
          uk: 'Будівельні роботи на завершальній стадії. Здача будинку запланована на 2026 рік.',
          en: 'Construction works in final stage with commissioning scheduled for 2026.',
          zh: '主体与砌筑工程进入收尾阶段，预计将于2026年正式验收交付。',
        },
        icon: 'city',
      },
      {
        title: {
          ru: 'Сейсмостойкость 9 баллов',
          kg: '9 баллдык сейсмотуруктуулук',
          kz: '9 балдық сейсмотөзімділік',
          uk: 'Сейсмостійкість 9 балів',
          en: '9-Point Seismic Reliability',
          zh: '9度抗震安全防护',
        },
        desc: {
          ru: 'Каркас из прочного армированного бетона с заполнением из экологичного жженого кирпича.',
          kg: 'Бекем арматураланган бетондон каркас жана экологиялык бышкан кыш.',
          kz: 'Мықты темірбетон қаңқа және экологиялық күйдірілген кірпіш.',
          uk: 'Каркас із міцного армованого бетону із заповненням з екологічної цегли.',
          en: 'Reinforced concrete structural frame with eco-friendly baked brick partition walls.',
          zh: '高标号抗震钢筋混凝土现浇结构与环保红砖砌体，安全无忧。',
        },
        icon: 'security',
      },
      {
        title: {
          ru: 'Тихий обжитой район',
          kg: 'Тынч жайлуу район',
          kz: 'Тыныш жайлы аудан',
          uk: 'Тихий обжитий район',
          en: 'Tranquil Established Area',
          zh: '配套醇熟的宁静街区',
        },
        desc: {
          ru: 'Развитая социальная инфраструктура: рядом магазины, школы, удобные транспортные развязки.',
          kg: 'Өнүккөн социалдык инфраструктура: жанында дүкөндөр, мектептер жана ыңгайлуу жолдор.',
          kz: 'Дамыған инфрақұрылым: жанында дүкендер, мектептер, ыңғайлы көлік жолдары.',
          uk: 'Розвинена інфраструктура: поруч магазини, школи, зручна транспортна розв\'язка.',
          en: 'Developed social amenities nearby: shops, schools, and convenient transport links.',
          zh: '成熟生活居住区，周边超市、学校与便利公共交通路网一应俱全。',
        },
        icon: 'space',
      },
    ],
    infrastructure: {
      title: {
        ru: 'ИНФРАСТРУКТУРА ДОМА',
        kg: 'ҮЙДҮН ИНФРАСТРУКТУРАСЫ',
        kz: 'ҮЙДІҢ ИНФРАҚҰРЫЛЫМЫ',
        uk: 'ІНФРАСТРУКТУРА БУДИНКУ',
        en: 'BUILDING INFRASTRUCTURE',
        zh: '社区全维配套',
      },
      subtitle: {
        ru: 'Все необходимое для спокойной и безопасной семейной жизни.',
        kg: 'Тынч жана коопсуз үй-бүлөлүк жашоо үчүн керектүү бардык нерселер.',
        kz: 'Тыныш әрі қауіпсіз отбасылық өмірге қажетті барлық жағдай.',
        uk: 'Все необхідне для спокійного та безпечного сімейного життя.',
        en: 'All essentials for peaceful and secure family living.',
        zh: '一应俱全的贴心配套，为全家构筑安心静谧生活。',
      },
      items: [
        {
          name: { ru: 'Детская площадка', kg: 'Балдар аянтчасы', kz: 'Балалар алаңы', uk: 'Дитячий майданчик', en: 'Children\'s Playground', zh: '安全儿童乐园' },
          desc: {
            ru: 'Безопасное огороженное игровое пространство во дворе.',
            kg: 'Короодогу коопсуз тосулган ойноо аянты.',
            kz: 'Ауладағы қауіпсіз қоршалған ойын кеңістігі.',
            uk: 'Безпечний обгороджений ігровий простір у дворі.',
            en: 'Fenced and safe outdoor play area in the courtyard.',
            zh: '围合式安全庭院儿童活动天地。',
          },
          image: '/projects/ajkol.jpg',
        },
        {
          name: { ru: 'Наземный паркинг', kg: 'Жер үстүндөгү паркинг', kz: 'Жерүсті автотұрағы', uk: 'Наземний паркінг', en: 'Surface Parking', zh: '地面专属停车区' },
          desc: {
            ru: 'Парковочные места для автомобилей жильцов дома.',
            kg: 'Үй жашоочуларынын унаалары үчүн токтотуучу орундар.',
            kz: 'Тұрғындардың көліктеріне арналған тұрақ орындары.',
            uk: 'Місця для паркування автомобілів мешканців.',
            en: 'Spacious dedicated parking spaces for residents.',
            zh: '规划规整的私家车地面专属停车位。',
          },
          image: '/projects/ajkol.jpg',
        },
        {
          name: { ru: 'Инженерные узлы', kg: 'Инженердик түйүндөр', kz: 'Инженерлік тораптар', uk: 'Інженерні вузли', en: 'Modern Utilities', zh: '现代工程机电设备' },
          desc: {
            ru: 'Современные бесшумные лифты и качественные коммуникации.',
            kg: 'Заманбап үндү чыгарбаган лифттер жана сапаттуу түйүндөр.',
            kz: 'Заманауи дыбыссыз лифттер және сапалы желілер.',
            uk: 'Сучасні безшумні ліфти та якісні комунікації.',
            en: 'Modern low-noise elevators and premium piping.',
            zh: '静音品牌高速电梯与高标准水暖电工程设施。',
          },
          image: '/projects/ajkol.jpg',
        },
      ],
    },
    legalText: {
      ru: 'Строительство ведется в строгом соответствии с нормами СНиП КР. Полная документация доступна в офисе продаж.',
      kg: 'Курулуш КР СНиП нормаларына так ылайык жүрүүдө. Документтер сатуу кеңсесинде жеткиликтүү.',
      kz: 'Құрылыс ҚР ҚНжЕ талаптарына толық сай жүргізілуде. Құжаттар сату кеңсесінде қолжетімді.',
      uk: 'Будівництво ведеться в суворій відповідності до СНіП КР. Документація у відділі продажів.',
      en: 'Constructed according to state building standards. Documentation available at the office.',
      zh: '严格按照吉尔吉斯国家工程标准规范建设施工，全套行政许可及批文供随时查阅。',
    },
  },
  'kelechek': {
    name: 'ЖК Келечек',
    classType: {
      ru: 'Комфорт-класс',
      kg: 'Комфорт-класс',
      kz: 'Комфорт-класс',
      uk: 'Комфорт-клас',
      en: 'Comfort Class',
      zh: '舒适级 (Comfort)',
    },
    theme: 'light',
    hero: {
      tag: {
        ru: 'СДАН В ЭКСПЛУАТАЦИЮ',
        kg: 'ПАЙДАЛАНУУГА БЕРИЛГЕН',
        kz: 'ПАЙДАЛАНУҒА БЕРІЛГЕН',
        uk: 'ЗДАНИЙ В ЕКСПЛУАТАЦІЮ',
        en: 'COMMISSIONED',
        zh: '已交付入住',
      },
      title: 'КЕЛЕЧЕК',
      subtitle: {
        ru: 'Успешно завершенный, введенный в эксплуатацию и заселенный жилой комплекс от EL ORDO GROUP. Реальное подтверждение надежности девелопера.',
        kg: 'EL ORDO GROUP тарабынан ийгиликтүү аяктаган, пайдаланууга берилген жана эл жашаган турак жай комплекси. Девелопердин ишенимдүүлүгүнүн чыныгы далили.',
        kz: 'EL ORDO GROUP ұсынған сәтті аяқталған, пайдалануға берілген және қоныстанған тұрғын үй кешені. Құрылыс салушының сенімділігінің нақты дәлелі.',
        uk: 'Успішно завершений, введений в експлуатацію та заселений житловий комплекс від EL ORDO GROUP. Реальне підтвердження надійності девелопера.',
        en: 'Successfully completed, commissioned, and resident-occupied residential complex by EL ORDO GROUP. Real testament to our reliability.',
        zh: 'EL ORDO GROUP 成功打造并全盘交付入驻的成熟社区。品牌硬核筑家实力的有力印证。',
      },
      image: '/projects/Kelechek.jpg',
      deadline: {
        ru: 'Сдан в эксплуатацию',
        kg: 'Пайдаланууга берилген',
        kz: 'Пайдалануға берілген',
        uk: 'Зданий в експлуатацію',
        en: 'Fully Commissioned',
        zh: '已竣工交付',
      },
      price: {
        ru: 'Все квартиры проданы',
        kg: 'Бардык батирлер сатылды',
        kz: 'Барлық пәтерлер сатылды',
        uk: 'Усі квартири продано',
        en: 'All Units Sold Out',
        zh: '全盘售罄',
      },
      address: {
        ru: 'ул. Космическая, 153',
        kg: 'Космическая көч., 153',
        kz: 'Космическая к-сі, 153',
        uk: 'вул. Космічна, 153',
        en: '153 Kosmicheskaya Street',
        zh: '比什凯克市太空街153号',
      },
    },
    specs: {
      floors: {
        ru: '9 этажей',
        kg: '9 кабат',
        kz: '9 қабат',
        uk: '9 поверхів',
        en: '9 floors',
        zh: '9层',
      },
      ceiling: '3.00 м',
      construction: {
        ru: 'Монолитный железобетон, жженый кирпич',
        kg: 'Монолиттүү темир-бетон, бышкан кыш',
        kz: 'Монолитті темірбетон, күйдірілген кірпіш',
        uk: 'Монолітний залізобетон, обпалена цегла',
        en: 'Reinforced concrete, solid baked brick',
        zh: '现浇钢筋混凝土，环保实心砖',
      },
      seismic: {
        ru: '9 баллов',
        kg: '9 балл',
        kz: '9 балл',
        uk: '9 балів',
        en: '9 points',
        zh: '9度抗震设防',
      },
      heating: {
        ru: 'Центральные городские коммуникации',
        kg: 'Шаардык борбордук коммуникациялар',
        kz: 'Қалалық орталықтандырылған желілер',
        uk: 'Центральні міські комунікації',
        en: 'Central municipal utilities',
        zh: '市政集中供暖管网配套',
      },
    },
    advantages: [
      {
        title: {
          ru: '100% сдан Госкомиссии',
          kg: '100% Мамкомиссияга тапшырылган',
          kz: '100% Мемкомиссияға тапсырылды',
          uk: '100% зданий Держкомісії',
          en: '100% Commissioned',
          zh: '100%通过国家工程综合验收',
        },
        desc: {
          ru: 'Дом подключен ко всем городским коммуникациям, жильцы получили техпаспорта на квартиры.',
          kg: 'Үй бардык шаардык коммуникацияларга кошулган, тургундар техпаспорт алышкан.',
          kz: 'Үй барлық қалалық желілерге қосылған, тұрғындар техпаспорт алған.',
          uk: 'Будинок підключений до міських мереж, мешканці отримали техпаспорти.',
          en: 'Fully connected to city networks; residents received their property titles.',
          zh: '各项市政管网全通，所有业主均已顺利取得不动产登记红本证书。',
        },
        icon: 'security',
      },
      {
        title: {
          ru: 'Благоустроенная территория',
          kg: 'Көрктөндүрүлгөн аймак',
          kz: 'Абаттандырылған аумақ',
          uk: 'Впорядкована територія',
          en: 'Comfortable Grounds',
          zh: '完善成熟的园区绿化',
        },
        desc: {
          ru: 'Детский городок, асфальтированные подъездные пути и озелененный двор.',
          kg: 'Балдар шаарчасы, асфальтталган жолдор жана жашылдандырылган короо.',
          kz: 'Балалар қалашығы, асфальтталған кірме жолдар мен көгалдандырылған аула.',
          uk: 'Дитяче містечко, асфальтовані під\'їзди та озеленений двір.',
          en: 'Children\'s town, paved driveways, and lush landscaped courtyard.',
          zh: '塑胶儿童活动场、柏油铺装车道及常绿景观庭院。',
        },
        icon: 'city',
      },
      {
        title: {
          ru: 'Тепло и экономия',
          kg: 'Жылуулук жана үнөмдүүлүк',
          kz: 'Жылылық пен үнемдеу',
          uk: 'Тепло та економія',
          en: 'Warmth & Energy Efficiency',
          zh: '冬暖夏凉高效节能',
        },
        desc: {
          ru: 'Наружное утепление негорючим базальтом и качественные пластиковые стеклопакеты.',
          kg: 'Күйбөгөн базальт менен тышкы жылуулоо жана сапаттуу терезелер.',
          kz: 'Жанбайтын базальтпен сыртқы жылыту және сапалы терезелер.',
          uk: 'Зовнішнє утеплення негорючим базальтом та якісні склопакети.',
          en: 'External non-combustible basalt insulation and energy-efficient double glazing.',
          zh: '外墙A级不燃岩棉保温与高密封中空断桥节能门窗。',
        },
        icon: 'space',
      },
    ],
    infrastructure: {
      title: {
        ru: 'ГОТОВАЯ ЖИЛАЯ СРЕДА',
        kg: 'ДАЯР ЖАШОО ЧӨЙРӨСҮ',
        kz: 'ДАЙЫН ТҰРҒЫН ОРТА',
        uk: 'ГОТОВЕ ЖИТЛОВЕ СЕРЕДОВИЩЕ',
        en: 'READY LIVING ENVIRONMENT',
        zh: '成熟交付的美好生活圈',
      },
      subtitle: {
        ru: 'Дом полностью заселен и функционирует.',
        kg: 'Үй толугу менен жашап жана иштеп жатат.',
        kz: 'Үй толық қоныстанған және жұмыс істеп тұр.',
        uk: 'Будинок повністю заселений та функціонує.',
        en: 'Building is fully occupied and functioning smoothly.',
        zh: '高品质交付入住，成熟静谧的生活环境。',
      },
      items: [
        {
          name: { ru: 'Закрытый двор', kg: 'Жабык короо', kz: 'Жабық аула', uk: 'Закритий двір', en: 'Private Courtyard', zh: '封闭式安全庭院' },
          desc: {
            ru: 'Тихая и безопасная дворовая территория для жителей.',
            kg: 'Жашоочулар үчүн тынч жана коопсуз короо аймагы.',
            kz: 'Тұрғындар үшін тыныш әрі қауіпсіз аула аумағы.',
            uk: 'Тиха та безпечна дворова територія для мешканців.',
            en: 'Quiet and safe courtyard for community residents.',
            zh: '专属于业主的安宁私密居住庭院。',
          },
          image: '/projects/Kelechek.jpg',
        },
        {
          name: { ru: 'Игровой городок', kg: 'Оюн шаарчасы', kz: 'Ойын қалашығы', uk: 'Ігрове містечко', en: 'Play Town', zh: '趣味儿童游乐场' },
          desc: {
            ru: 'Спортивные и детские зоны активного отдыха.',
            kg: 'Спорттук жана балдардын активдүү эс алуу аймактары.',
            kz: 'Спорттық және балалардың белсенді демалыс аймақтары.',
            uk: 'Спортивні та дитячі зони активного відпочинку.',
            en: 'Sports and play zones for active recreation.',
            zh: '配备全龄段健身及趣味儿童游乐设施。',
          },
          image: '/projects/Kelechek.jpg',
        },
        {
          name: { ru: 'Светлые холлы', kg: 'Жарык холлдор', kz: 'Жарық холлдар', uk: 'Світлі холи', en: 'Bright Lobbies', zh: '明亮通透单元入户厅' },
          desc: {
            ru: 'Аккуратная отделка входных групп и лестничных маршей.',
            kg: 'Кире бериштердин жана тепкичтердин тыкан жасалгасы.',
            kz: 'Кіреберістер мен баспалдақтардың ұқыпты әрленуі.',
            uk: 'Акуратне оздоблення вхідних груп та сходових маршів.',
            en: 'Clean and tidy entrance groups and stairways.',
            zh: '洁净明亮的人性化入户门厅与公共楼梯间。',
          },
          image: '/projects/Kelechek.jpg',
        },
      ],
    },
    legalText: {
      ru: 'Жилой комплекс введен в эксплуатацию. Обязательства перед всеми дольщиками закрыты в полном объеме.',
      kg: 'Турак жай комплекси пайдаланууга берилген. Бардык үлүшчүлөрдүн алдындагы милдеттенмелер толук жабылган.',
      kz: 'Тұрғын үй кешені пайдалануға берілген. Барлық үлескерлер алдындағы міндеттемелер толық жабылған.',
      uk: 'Житловий комплекс введений в експлуатацію. Зобов\'язання перед пайовиками закриті у повному обсязі.',
      en: 'The complex is commissioned. All obligations to equity investors have been fulfilled in full.',
      zh: '住宅区已全盘通过综合验收并正式交付，对全体业主的合同履约义务已全额兑现。',
    },
  },
  'ordo': {
    name: 'Клубный дом Ордо',
    classType: {
      ru: 'Клубный дом',
      kg: 'Клубдук үй',
      kz: 'Клубтық үй',
      uk: 'Клубний будинок',
      en: 'Club House',
      zh: '专属精品洋房',
    },
    theme: 'dark',
    hero: {
      tag: {
        ru: 'СДАН В ЭКСПЛУАТАЦИЮ',
        kg: 'ПАЙДАЛАНУУГА БЕРИЛГЕН',
        kz: 'ПАЙДАЛАНУҒА БЕРІЛГЕН',
        uk: 'ЗДАНИЙ В ЕКСПЛУАТАЦІЮ',
        en: 'COMMISSIONED',
        zh: '已交付入住',
      },
      title: 'КД ОРДО',
      subtitle: {
        ru: 'Первый реализованный клубный дом компании EL ORDO GROUP. Камерный формат, авторский фасад из натурального камня и панорама на горы.',
        kg: 'EL ORDO GROUP компаниясынын алгачкы бүткөрүлгөн клубдук үйү. Камералык формат, табигый таштан автордук фасад жана тоолорго панорама.',
        kz: 'EL ORDO GROUP компаниясының алғашқы жүзеге асырылған клубтық үйі. Шағын формат, табиғи тастан қаланған авторлық қасбет және тау көрінісі.',
        uk: 'Перший реалізований клубний будинок компанії EL ORDO GROUP. Камерний формат, авторський фасад із натурального каменю та панорама на гори.',
        en: 'The premier boutique club house completed by EL ORDO GROUP. Exclusive format, natural stone facade, and panoramic mountain vistas.',
        zh: 'EL ORDO GROUP 打造的首部标志性精品洋房。低密醇熟社区，甄选天然石材立面，坐拥壮阔雪山全景。',
      },
      image: '/projects/Ordo.jpg',
      deadline: {
        ru: 'Сдан в эксплуатацию',
        kg: 'Пайдаланууга берилген',
        kz: 'Пайдалануға берілген',
        uk: 'Зданий в експлуатацію',
        en: 'Fully Commissioned',
        zh: '已竣工交付',
      },
      price: {
        ru: 'Все квартиры проданы',
        kg: 'Бардык батирлер сатылды',
        kz: 'Барлық пәтерлер сатылды',
        uk: 'Усі квартири продано',
        en: 'All Units Sold Out',
        zh: '全盘售罄',
      },
      address: {
        ru: 'ул. Тверская, 20',
        kg: 'Тверская көч., 20',
        kz: 'Тверская к-сі, 20',
        uk: 'вул. Тверська, 20',
        en: '20 Tverskaya Street',
        zh: '特维尔斯卡亚街20号',
      },
    },
    specs: {
      floors: {
        ru: '7 этажей',
        kg: '7 кабат',
        kz: '7 қабат',
        uk: '7 поверхів',
        en: '7 floors',
        zh: '7层',
      },
      ceiling: '3.30 м',
      construction: {
        ru: 'Монолитный каркас, кирпич, гранит',
        kg: 'Монолиттүү каркас, бышкан кыш, гранит',
        kz: 'Монолитті қаңқа, кірпіш, гранит',
        uk: 'Монолітний каркас, цегла, граніт',
        en: 'Monolithic frame, brick, natural granite',
        zh: '现浇框架主体，实心红砖，进口花岗岩石材外立面',
      },
      seismic: {
        ru: '9 баллов',
        kg: '9 балл',
        kz: '9 балл',
        uk: '9 балів',
        en: '9 points',
        zh: '9度抗震设防',
      },
      heating: {
        ru: 'Автономная газовая котельная',
        kg: 'Автономдук газ отказаны',
        kz: 'Автономды газ қазандығы',
        uk: 'Автономна газова котельня',
        en: 'Autonomous gas heating plant',
        zh: '独立燃气供热站',
      },
    },
    advantages: [
      {
        title: {
          ru: 'Приватный клубный статус',
          kg: 'Жеке клубдук статус',
          kz: 'Жеке клубтық мәртебе',
          uk: 'Приватний клубний статус',
          en: 'Exclusive Boutique Status',
          zh: '私享纯正洋房圈层',
        },
        desc: {
          ru: 'Малоэтажное здание с ограниченным числом резидентов для максимального спокойствия.',
          kg: 'Тынчтык жана ыңгайлуулук үчүн аз сандагы тургундары бар жапыз кабаттуу имарат.',
          kz: 'Барынша тыныштық үшін шектеулі тұрғындары бар аз қабатты ғимарат.',
          uk: 'Малоповерхова будівля з обмеженою кількістю резидентів для максимального спокою.',
          en: 'Low-rise architecture with limited number of residents for maximum privacy and tranquility.',
          zh: '少席低密建筑规划，为业主定制私密安宁的品质生活。',
        },
        icon: 'space',
      },
      {
        title: {
          ru: 'Панорамный вид на горы',
          kg: 'Тоолорго панорамалык көрүнүш',
          kz: 'Тауға панорамалық көрініс',
          uk: 'Панорамний вид на гори',
          en: 'Panoramic Mountain Views',
          zh: '壮丽雪山天幕全景',
        },
        desc: {
          ru: 'Широкое остекление открывает живописный вид на горные вершины Ала-Тоо.',
          kg: 'Кең айнектер Ала-Тоонун кооз чокуларына керемет көрүнүш тартуулайт.',
          kz: 'Кең шынылар Ала-Тоо шыңдарына көркем панорама ашады.',
          uk: 'Широке скління відкриває мальовничий краєвид на вершини Ала-Тоо.',
          en: 'Broad panoramic windows reveal breathtaking views of the snowy Ala-Too peaks.',
          zh: '广角全景落地窗，无遮挡远眺圣洁壮美的阿拉套群峰。',
        },
        icon: 'view',
      },
      {
        title: {
          ru: 'Премиальные материалы',
          kg: 'Премиум материалдар',
          kz: 'Премиум материалдар',
          uk: 'Преміальні матеріали',
          en: 'Natural Stone Finishes',
          zh: '严选高端奢石材质',
        },
        desc: {
          ru: 'Фасад облицован натуральным гранитом и травертином, установлен бесшумный лифт.',
          kg: 'Фасад табигый гранит жана травертин менен капталган, үндү чыгарбаган лифт орнотулган.',
          kz: 'Қасбет табиғи гранит пен травертинмен қапталған, дыбыссыз лифт орнатылған.',
          uk: 'Фасад облицьований натуральним гранітом та травертином, встановлений безшумний ліфт.',
          en: 'Exterior cladded with genuine granite and travertine, equipped with a silent elevator.',
          zh: '外立面精镶天然花岗岩与经典洞石，专属奢配静音高端品牌电梯。',
        },
        icon: 'security',
      },
    ],
    infrastructure: {
      title: {
        ru: 'КЛУБНАЯ АТМОСФЕРА',
        kg: 'КЛУБДУК АТМОСФЕРА',
        kz: 'КЛУБТЫҚ АТМОСФЕРА',
        uk: 'КЛУБНА АТМОСФЕРА',
        en: 'CLUB-STYLE ENVIRONMENT',
        zh: '低密洋房雅致生活',
      },
      subtitle: {
        ru: 'Приватная среда для ценителей персонального комфорта.',
        kg: 'Жеке ыңгайлуулукту баалагандар үчүн купуя чөйрө.',
        kz: 'Жайлылықты бағалайтындар үшін құпия әрі тыныш орта.',
        uk: 'Приватне середовище для поціновувачів персонального комфорту.',
        en: 'A private retreat for discerning homeowners.',
        zh: '专为追求极致个人舒适体验者打造的私密领地。',
      },
      items: [
        {
          name: { ru: 'Охраняемый контур', kg: 'Кайтарылган контур', kz: 'Күзетілетін аумақ', uk: 'Охоронний контур', en: 'Secured Perimeter', zh: '全天候安防系统' },
          desc: {
            ru: 'Круглосуточный контроль доступа и система видеонаблюдения.',
            kg: 'Күнү-түнү кирүү көзөмөлү жана видеобайкоо тутуму.',
            kz: 'Тәулік бойғы бақылау және бейнебақылау жүйесі.',
            uk: 'Цілодобовий контроль доступу та відеоспостереження.',
            en: '24/7 access control and continuous digital CCTV monitoring.',
            zh: '24小时智能化门禁与全方位无死角视频安防系统。',
          },
          image: '/projects/Ordo.jpg',
        },
        {
          name: { ru: 'Паркинг', kg: 'Паркинг', kz: 'Автотұрақ', uk: 'Паркінг', en: 'Resident Parking', zh: '智能停车场' },
          desc: {
            ru: 'Подземный и гостевой паркинг для автомобилей резидентов.',
            kg: 'Тургундардын жана коноктордун унаалары үчүн токтотуучу жай.',
            kz: 'Тұрғындар мен қонақтар үшін жерасты және қонақ тұрағы.',
            uk: 'Підземний та гостьовий паркінг для авто резидентів.',
            en: 'Underground and visitor parking for residents.',
            zh: '为业主与来访宾客贴心配备地下及地面访客车位。',
          },
          image: '/projects/Ordo.jpg',
        },
        {
          name: { ru: 'Хвойный ландшафт', kg: 'Ийне жалбырактуу ландшафт', kz: 'Қылқанжапырақты ландшафт', uk: 'Хвойний ландшафт', en: 'Conifer Landscaping', zh: '松柏四季园林' },
          desc: {
            ru: 'Ухоженная придомовая территория с элементами ландшафтного дизайна.',
            kg: 'Ландшафттык дизайны бар үйдүн тыкан аймагы.',
            kz: 'Ландшафтық дизайны бар үй аумағы.',
            uk: 'Доглянута прибудинкова територія з ландшафтним дизайном.',
            en: 'Manicured grounds featuring conifer flora and evergreen design.',
            zh: '精心修剪造景的常青绿植与精致园林微景观。',
          },
          image: '/projects/Ordo.jpg',
        },
      ],
    },
    legalText: {
      ru: 'Клубный дом полностью сдан и заселен. Является визитной карточкой качества и надежности девелопера EL ORDO GROUP.',
      kg: 'Клубдук үй толугу менен пайдаланууга берилген жана эл жашайт. EL ORDO GROUP сапатынын визиттик карточкасы.',
      kz: 'Клубтық үй толық тапсырылып, қоныстанған. EL ORDO GROUP сенімділігінің белгісі.',
      uk: 'Клубний будинок повністю зданий та заселений. Візитна картка девелопера EL ORDO GROUP.',
      en: 'The club house is fully delivered and occupied. The hallmark of EL ORDO GROUP’s construction craftsmanship.',
      zh: '精品洋房已全盘高质量交付并顺利入住，成为印证 EL ORDO GROUP 品牌质造与信赖的标杆之作。',
    },
    videoUrl: 'https://www.youtube.com',
  },
};

const UI_STRINGS = {
  ru: {
    catalog: 'Каталог объектов',
    priceLabel: 'Стоимость:',
    deadlineLabel: 'Срок сдачи:',
    locationLabel: 'Локация:',
    perSqm: '/ м²',
    btnSecondary: 'Запросить вторичные варианты',
    btnWhatsappCalc: 'Получить расчет в WhatsApp',
    btnAllProjects: 'Все объекты компании',
    specsFloors: 'Этажность',
    specsCeiling: 'Высота потолков',
    specsSeismic: 'Сейсмостойкость',
    specsConstruction: 'Конструктив',
    specsHeating: 'Отопление',
    advantagesTitle: 'Преимущества проекта',
    plansSoldTitle: 'Объект сдан в эксплуатацию',
    plansSoldDesc: (name: string) => `Все квартиры от застройщика в ${name} распроданы. Чтобы узнать о наличии предложений от собственников на вторичном рынке или записаться в лист ожидания, свяжитесь с нашим отделом продаж.`,
    plansRequestTitle: 'Шахматка и планировки по запросу',
    plansRequestDesc: (name: string) => `Актуальный список свободных квартир, видовых этажей и расчет беспроцентной рассрочки в ${name} менеджер отправит вам напрямую в мессенджер.`,
    btnRequestPlans: 'Запросить планировки в WhatsApp',
    purchaseTitle: (name: string) => `Программы приобретения в ${name}`,
    fullPaymentTitle: '100% ОПЛАТА',
    fullPaymentDesc: 'Максимальная персональная скидка за квадратный метр и приоритетный выбор этажа.',
    fullPaymentAction: 'Условия скидки',
    installmentTitle: 'РАССРОЧКА 0%',
    installmentDesc: 'Беспроцентная внутренняя рассрочка до 40 месяцев напрямую от застройщика без банка.',
    installmentAction: 'Калькулятор выплат',
    tradeInTitle: 'TRADE-IN (БАРТЕР)',
    tradeInDesc: 'Рыночный зачет вашего автомобиля или вторичного жилья в счет первого взноса.',
    tradeInAction: 'Оценить имущество',
    legalTitle: 'Юридическая чистота и гарантии',
    reviewsBadge: 'Репутация и доверие',
    reviewsTitle: 'Отзывы резидентов',
    officeBadge: 'Отдел продаж',
    officeTitle: (name: string) => `Консультация по объекту ${name}`,
    officeAddressLabel: 'Фактический адрес объекта:',
    route2Gis: 'Открыть локацию в 2GIS',
    btnWhatsApp: 'Написать в WhatsApp',
    btnInstagram: 'Перейти в Instagram',
    callBtn: 'Позвонить',
    waHeroText: (name: string, addr: string) => `Здравствуйте! Интересует ${name} (${addr}). Хочу получить актуальную шахматку свободных квартир и расчет рассрочки 0%.`,
  },
  kg: {
    catalog: 'Объекттер каталогу',
    priceLabel: 'Баасы:',
    deadlineLabel: 'Бүткөрүү мөөнөтү:',
    locationLabel: 'Жайгашуусу:',
    perSqm: '/ м²',
    btnSecondary: 'Экинчилик рыноктун варианттарын суроо',
    btnWhatsappCalc: 'WhatsApp аркылуу эсептөө алуу',
    btnAllProjects: 'Компаниянын бардык объектилери',
    specsFloors: 'Кабаттуулугу',
    specsCeiling: 'Шыптын бийиктиги',
    specsSeismic: 'Сейсмотуруктуулук',
    specsConstruction: 'Конструкциясы',
    specsHeating: 'Жылытуу',
    advantagesTitle: 'Долбоордун артыкчылыктары',
    plansSoldTitle: 'Объект пайдаланууга берилген',
    plansSoldDesc: (name: string) => `Куруучудан ${name} комплексиндеги бардык батирлер сатылып бүттү. Ээлеринен экинчилик рыноктогу сунуштарды билүү же күтүү тизмесине жазылуу үчүн сатуу бөлүмүнө кайрылыңыз.`,
    plansRequestTitle: 'Шахматка жана пландар суроо-талап боюнча',
    plansRequestDesc: (name: string) => `${name} долбоору боюнча бош батирлердин, панорамалуу кабаттардын тизмесин жана пайызсыз бөлүп төлөө эсебин менеджер сизге мессенджерге жөнөтөт.`,
    btnRequestPlans: 'WhatsApp аркылуу пландарды суроо',
    purchaseTitle: (name: string) => `${name} объектисин сатып алуу программалары`,
    fullPaymentTitle: '100% ТӨЛӨМ',
    fullPaymentDesc: 'Чарчы метрге максималдуу жеке арзандатуу жана кабаттарды артыкчылыктуу тандоо.',
    fullPaymentAction: 'Арзандатуу шарттары',
    installmentTitle: '0% БӨЛҮП ТӨЛӨӨ',
    installmentDesc: 'Банксыз түздөн-түз куруучудан 40 айга чейин пайызсыз ички бөлүп төлөө.',
    installmentAction: 'Төлөмдөрдү эсептөө',
    tradeInTitle: 'TRADE-IN (БАРТЕР)',
    tradeInDesc: 'Баштапкы төлөм катары унааңызды же эски турак жайыңызды базар баасында эсепке алуу.',
    tradeInAction: 'Мүлктү баалоо',
    legalTitle: 'Юридикалык тазалык жана кепилдиктер',
    reviewsBadge: 'Аброю жана ишеним',
    reviewsTitle: 'Тургундардын пикирлери',
    officeBadge: 'Сатуу бөлүмү',
    officeTitle: (name: string) => `${name} объектиси боюнча кеңеш алуу`,
    officeAddressLabel: 'Объекттин иш жүзүндөгү дареги:',
    route2Gis: '2GIS аркылуу даректи ачуу',
    btnWhatsApp: 'WhatsApp аркылуу жазуу',
    btnInstagram: 'Instagram баракчасына өтүү',
    callBtn: 'Чалуу',
    waHeroText: (name: string, addr: string) => `Саламатсызбы! ${name} (${addr}) кызыктырып жатат. Бош батирлердин шахматкасын жана 0% бөлүп төлөө эсебин алгым келет.`,
  },
  kz: {
    catalog: 'Нысандар каталогы',
    priceLabel: 'Құны:',
    deadlineLabel: 'Тапсыру мерзімі:',
    locationLabel: 'Орналасуы:',
    perSqm: '/ м²',
    btnSecondary: 'Екінші нарықтағы нұсқаларды сұрау',
    btnWhatsappCalc: 'WhatsApp-та есептеуді алу',
    btnAllProjects: 'Компанияның барлық нысандары',
    specsFloors: 'Қабаттылығы',
    specsCeiling: 'Төбе биіктігі',
    specsSeismic: 'Сейсмотөзімділік',
    specsConstruction: 'Конструкциясы',
    specsHeating: 'Жылыту',
    advantagesTitle: 'Жобаның артықшылықтары',
    plansSoldTitle: 'Нысан пайдалануға берілген',
    plansSoldDesc: (name: string) => `Құрылыс салушыдан ${name} кешеніндегі барлық пәтерлер сатылып кетті. Екінші нарықтағы ұсыныстарды білу немесе күту парағына жазылу үшін сату бөліміне хабарласыңыз.`,
    plansRequestTitle: 'Шахматка мен жоспарлар сұраныс бойынша',
    plansRequestDesc: (name: string) => `${name} кешеніндегі бос пәтерлер тізімін және пайызсыз бөліп төлеу есебін менеджер тікелей мессенджерге жібереді.`,
    btnRequestPlans: 'WhatsApp арқылы жоспарларды сұрау',
    purchaseTitle: (name: string) => `${name} сатып алу бағдарламалары`,
    fullPaymentTitle: '100% ТӨЛЕМ',
    fullPaymentDesc: 'Шаршы метрге ең жоғары дербес жеңілдік және қабатты басымдықпен таңдау.',
    fullPaymentAction: 'Жеңілдік шарттары',
    installmentTitle: '0% БӨЛІП ТӨЛЕУ',
    installmentDesc: 'Банксіз тікелей құрылыс салушыдан 40 айға дейін пайызсыз ішкі бөліп төлеу.',
    installmentAction: 'Төлем калькуляторы',
    tradeInTitle: 'TRADE-IN (БАРТЕР)',
    tradeInDesc: 'Бастапқы жарна ретінде көлігіңізді немесе ескі баспанаңызды нарықтық бағамен есепке алу.',
    tradeInAction: 'Мүлікті бағалау',
    legalTitle: 'Заңдық тазалық пен кепілдіктер',
    reviewsBadge: 'Бедел мен сенім',
    reviewsTitle: 'Тұрғындардың пікірлері',
    officeBadge: 'Сатуу бөлімі',
    officeTitle: (name: string) => `${name} нысаны бойынша кеңес алу`,
    officeAddressLabel: 'Нысанның нақты мекенжайы:',
    route2Gis: '2GIS арқылы бағытты ашу',
    btnWhatsApp: 'WhatsApp-қа жазу',
    btnInstagram: 'Instagram парақшасына өту',
    callBtn: 'Қоңырау шалу',
    waHeroText: (name: string, addr: string) => `Сәлеметсіз бе! ${name} (${addr}) бойынша бос пәтерлер шахматкасы мен 0% бөліп төлеу есебін алғым келеді.`,
  },
  uk: {
    catalog: 'Каталог об’єктів',
    priceLabel: 'Вартість:',
    deadlineLabel: 'Термін здачі:',
    locationLabel: 'Локація:',
    perSqm: '/ м²',
    btnSecondary: 'Запитати вторинні варіанти',
    btnWhatsappCalc: 'Отримати розрахунок у WhatsApp',
    btnAllProjects: 'Всі об’єкти компанії',
    specsFloors: 'Поверховість',
    specsCeiling: 'Висота стелі',
    specsSeismic: 'Сейсмостійкість',
    specsConstruction: 'Конструктив',
    specsHeating: 'Опалення',
    advantagesTitle: 'Переваги проєкту',
    plansSoldTitle: 'Об’єкт зданий в експлуатацію',
    plansSoldDesc: (name: string) => `Усі квартири від забудовника у ${name} продані. Щоб дізнатися про наявність пропозицій від власників або записатися до списку очікування, зв’яжіться з відділом продажів.`,
    plansRequestTitle: 'Шахматка та планування за запитом',
    plansRequestDesc: (name: string) => `Актуальний список вільних квартир, видових поверхів та розрахунок розстрочки у ${name} менеджер надішле вам у месенджер.`,
    btnRequestPlans: 'Запросити планування у WhatsApp',
    purchaseTitle: (name: string) => `Програми придбання в ${name}`,
    fullPaymentTitle: '100% ОПЛАТА',
    fullPaymentDesc: 'Максимальна персональна знижка за квадратний метр та пріоритетний вибір поверху.',
    fullPaymentAction: 'Умови знижки',
    installmentTitle: 'РОЗСТРОЧКА 0%',
    installmentDesc: 'Безвідсоткова внутрішня розстрочка до 40 місяців безпосередньо від забудовника без банку.',
    installmentAction: 'Калькулятор виплат',
    tradeInTitle: 'TRADE-IN (БАРТЕР)',
    tradeInDesc: 'Ринковий залік вашого авто або вторинного житла в рахунок першого внеску.',
    tradeInAction: 'Оцінити майно',
    legalTitle: 'Юридична чистота та гарантії',
    reviewsBadge: 'Репутація та довіра',
    reviewsTitle: 'Відгуки мешканців',
    officeBadge: 'Відділ продажів',
    officeTitle: (name: string) => `Консультація щодо об’єкта ${name}`,
    officeAddressLabel: 'Фактична адреса об’єкта:',
    route2Gis: 'Відкрити локацію у 2GIS',
    btnWhatsApp: 'Написати у WhatsApp',
    btnInstagram: 'Перейти в Instagram',
    callBtn: 'Зателефонувати',
    waHeroText: (name: string, addr: string) => `Доброго дня! Цікавить ${name} (${addr}). Хочу отримати актуальну шахматку вільних квартир та розрахунок розстрочки 0%.`,
  },
  en: {
    catalog: 'Project Catalog',
    priceLabel: 'Price:',
    deadlineLabel: 'Handover:',
    locationLabel: 'Location:',
    perSqm: '/ м²',
    btnSecondary: 'Request Resale Units',
    btnWhatsappCalc: 'Get Calculation via WhatsApp',
    btnAllProjects: 'All Company Projects',
    specsFloors: 'Total Floors',
    specsCeiling: 'Ceiling Height',
    specsSeismic: 'Seismic Safety',
    specsConstruction: 'Construction Type',
    specsHeating: 'Heating System',
    advantagesTitle: 'Project Advantages',
    plansSoldTitle: 'Building Commissioned',
    plansSoldDesc: (name: string) => `All developer apartments in ${name} are sold out. To inquire about resale offers from owners or join the waiting list, please contact our sales office.`,
    plansRequestTitle: 'Floor Plans & Availability on Request',
    plansRequestDesc: (name: string) => `Our manager will directly send you the up-to-date availability list, panoramic floor selection, and 0% installment plan for ${name}.`,
    btnRequestPlans: 'Request Plans via WhatsApp',
    purchaseTitle: (name: string) => `Purchase Programs for ${name}`,
    fullPaymentTitle: '100% PAYMENT',
    fullPaymentDesc: 'Maximum bespoke discount per square meter and priority floor choice.',
    fullPaymentAction: 'Discount Terms',
    installmentTitle: '0% INSTALLMENT',
    installmentDesc: 'Interest-free developer installment plan up to 40 months with no bank involvement.',
    installmentAction: 'Payment Calculator',
    tradeInTitle: 'TRADE-IN (BARTER)',
    tradeInDesc: 'Fair market credit for your vehicle or secondary property toward the down payment.',
    tradeInAction: 'Evaluate Asset',
    legalTitle: 'Legal Integrity & Guarantees',
    reviewsBadge: 'Reputation & Trust',
    reviewsTitle: 'Resident Testimonials',
    officeBadge: 'Sales Department',
    officeTitle: (name: string) => `Consultation for ${name}`,
    officeAddressLabel: 'Project Physical Address:',
    route2Gis: 'Open Location in 2GIS',
    btnWhatsApp: 'Chat on WhatsApp',
    btnInstagram: 'Visit Instagram',
    callBtn: 'Call Now',
    waHeroText: (name: string, addr: string) => `Hello! Interested in ${name} (${addr}). I would like to receive the availability grid and 0% installment calculation.`,
  },
  zh: {
    catalog: '楼盘目录',
    priceLabel: '价格:',
    deadlineLabel: '交付周期:',
    locationLabel: '地理位置:',
    perSqm: '/ м²',
    btnSecondary: '查询二手保留房源',
    btnWhatsappCalc: '在 WhatsApp 中测算方案',
    btnAllProjects: '浏览全部楼盘',
    specsFloors: '总楼层数',
    specsCeiling: '室内净高',
    specsSeismic: '抗震设防',
    specsConstruction: '建筑结构',
    specsHeating: '采暖方式',
    advantagesTitle: '核心项目亮点',
    plansSoldTitle: '项目已顺利竣工交付',
    plansSoldDesc: (name: string) => `${name} 开发商一手房源已全盘售罄。如需了解业主二手挂牌转让房源或登记预约排卡，请联络营销中心。`,
    plansRequestTitle: '在售销控表与户型图册',
    plansRequestDesc: (name: string) => `专属置业顾问将通过在线消息直接向您发送 ${name} 当前最新可选房源、景观楼层及0%免息分期还款明细。`,
    btnRequestPlans: '通过 WhatsApp 获取户型图册',
    purchaseTitle: (name: string) => `${name} 置业方案`,
    fullPaymentTitle: '100% 一次性全款',
    fullPaymentDesc: '尊享每平米顶格专属特惠直减，享有核心景观高楼层优先选房权。',
    fullPaymentAction: '优惠详情',
    installmentTitle: '0% 免息分期',
    installmentDesc: '开发商自营最长40个月免息分期付款，无需收入证明与银行审核。',
    installmentAction: '测算还款表',
    tradeInTitle: '以旧换新 (置换)',
    tradeInDesc: '现有汽车或二手房产公允评估折价，直接抵扣新房首期购房款。',
    tradeInAction: '申请资产评估',
    legalTitle: '法律合规保障与政府质检',
    reviewsBadge: '卓越声誉与信任',
    reviewsTitle: '业主真实评价',
    officeBadge: '品牌营销中心',
    officeTitle: (name: string) => `${name} 专属置业咨询`,
    officeAddressLabel: '项目现场精准定位:',
    route2Gis: '在 2GIS 中导航定位',
    btnWhatsApp: 'WhatsApp 在线咨询',
    btnInstagram: '访问 Instagram 官方页面',
    callBtn: '拨打电话',
    waHeroText: (name: string, addr: string) => `您好！我对 ${name} (${addr}) 项目很感兴趣，想获取最新在售房源销控表及0%免息分期方案。`,
  },
};

export default function ComplexView({ slug }: { slug: string }) {
  const langContext = useLanguage() as any;
  const currentLang: Locale = (langContext.locale || langContext.currentLang || langContext.language || 'ru') as Locale;
  const t = langContext.t;

  const lookupKey = slug === 'kele-chek' ? 'kelechek' : slug;
  const rawProject = COMPLEXES[lookupKey];

  const project = useMemo(() => {
    if (!rawProject) return null;
    const l = currentLang;
    return {
      name: rawProject.name,
      classType: rawProject.classType[l] || rawProject.classType.ru,
      theme: rawProject.theme,
      hero: {
        tag: rawProject.hero.tag[l] || rawProject.hero.tag.ru,
        title: rawProject.hero.title,
        subtitle: rawProject.hero.subtitle[l] || rawProject.hero.subtitle.ru,
        image: rawProject.hero.image,
        deadline: rawProject.hero.deadline[l] || rawProject.hero.deadline.ru,
        price: rawProject.hero.price[l] || rawProject.hero.price.ru,
        address: rawProject.hero.address[l] || rawProject.hero.address.ru,
      },
      specs: {
        floors: rawProject.specs.floors[l] || rawProject.specs.floors.ru,
        ceiling: rawProject.specs.ceiling,
        construction: rawProject.specs.construction[l] || rawProject.specs.construction.ru,
        seismic: rawProject.specs.seismic[l] || rawProject.specs.seismic.ru,
        heating: rawProject.specs.heating[l] || rawProject.specs.heating.ru,
      },
      advantages: rawProject.advantages.map((adv) => ({
        title: adv.title[l] || adv.title.ru,
        desc: adv.desc[l] || adv.desc.ru,
        icon: adv.icon,
      })),
      infrastructure: {
        title: rawProject.infrastructure.title[l] || rawProject.infrastructure.title.ru,
        subtitle: rawProject.infrastructure.subtitle[l] || rawProject.infrastructure.subtitle.ru,
        items: rawProject.infrastructure.items.map((it) => ({
          name: it.name[l] || it.name.ru,
          desc: it.desc[l] || it.desc.ru,
          image: it.image,
        })),
      },
      legalText: rawProject.legalText[l] || rawProject.legalText.ru,
      plans: rawProject.plans,
      typicalFloors: rawProject.typicalFloors,
      videoUrl: rawProject.videoUrl,
    };
  }, [rawProject, currentLang]);

  if (!rawProject || !project) {
    notFound();
  }

  const ui = UI_STRINGS[currentLang] || UI_STRINGS.ru;
  const localizedReviews = TRANSLATIONS[currentLang]?.reviewsSection?.items || COMPANY_INFO.reviews;

  const isSold =
    project.hero.price.includes('проданы') ||
    project.hero.price.includes('сатылды') ||
    project.hero.price.includes('продано') ||
    project.hero.price.includes('Sold') ||
    project.hero.price.includes('售罄');

  const formattedPrice = isSold
    ? project.hero.price
    : `${project.hero.price} ${ui.perSqm}`;

  const whatsappHeroText = encodeURIComponent(
    ui.waHeroText(project.name, project.hero.address)
  );

  return (
    <main className="min-h-screen pb-28 md:pb-0 bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white dark:bg-[#0b1b15] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#d4b26f] transition-colors">
            {t.common.home}
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-[#d4b26f] transition-colors">
            {ui.catalog}
          </Link>
          <span>/</span>
          <span className="text-[#064734] dark:text-[#d4b26f] font-bold">
            {project.name}
          </span>
        </div>
      </div>

      {/* 2. Hero-секция */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center bg-[#064734] text-white py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={project.hero.image}
            alt={project.name}
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-[#d4b26f]/40 text-[#d4b26f] text-xs font-black uppercase tracking-widest mb-4 shadow">
            <span>{project.hero.tag}</span>
            <span>•</span>
            <span className="text-white">{project.classType}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-tight mb-5 drop-shadow-xl">
            {project.hero.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            {project.hero.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-8 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
            <div className="p-3 rounded-xl bg-black/30">
              <span className="text-[11px] text-gray-300 block mb-0.5">{ui.priceLabel}</span>
              <strong className="text-base sm:text-lg font-black text-[#d4b26f]">
                {formattedPrice}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-black/30">
              <span className="text-[11px] text-gray-300 block mb-0.5">{ui.deadlineLabel}</span>
              <strong className="text-sm sm:text-base font-bold text-white block truncate">
                {project.hero.deadline}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-black/30">
              <span className="text-[11px] text-gray-300 block mb-0.5">{ui.locationLabel}</span>
              <strong className="text-xs sm:text-sm font-bold text-white block truncate">
                {project.hero.address}
              </strong>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappHeroText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-8 py-4 rounded-2xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <IconWhatsApp className="w-4 h-4 text-[#064734]" />
              <span>{isSold ? ui.btnSecondary : ui.btnWhatsappCalc}</span>
            </a>
            <Link
              href="/projects"
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl text-xs sm:text-sm border border-white/25 transition-all backdrop-blur-md cursor-pointer"
            >
              {ui.btnAllProjects}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Технические спецификации объекта (СНиП) */}
      <section className="bg-white dark:bg-[#0b1b15] border-b border-gray-200 dark:border-white/10 py-8 px-4 sm:px-6 transition-colors">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-neutral-400 block">{ui.specsFloors}</span>
            <strong className="text-xs sm:text-sm font-black text-gray-900 dark:text-white">{project.specs.floors}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-neutral-400 block">{ui.specsCeiling}</span>
            <strong className="text-xs sm:text-sm font-black text-[#d4b26f]">{project.specs.ceiling}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-neutral-400 block">{ui.specsSeismic}</span>
            <strong className="text-xs sm:text-sm font-black text-gray-900 dark:text-white">{project.specs.seismic}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-neutral-400 block">{ui.specsConstruction}</span>
            <strong className="text-xs sm:text-sm font-black truncate block text-gray-900 dark:text-white">{project.specs.construction}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-neutral-400 block">{ui.specsHeating}</span>
            <strong className="text-xs sm:text-sm font-black truncate block text-gray-900 dark:text-white">{project.specs.heating}</strong>
          </div>
        </div>
      </section>

      {/* 4. Преимущества комплекса */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-2xl sm:text-4xl font-black text-center uppercase tracking-tight mb-14 text-[#064734] dark:text-[#d4b26f]">
          {ui.advantagesTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {project.advantages.map((adv, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-[#064734]/30 dark:hover:border-[#d4b26f]/40 transition-all flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#064734]/15 dark:bg-[#d4b26f]/15 flex items-center justify-center text-[#d4b26f] mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              <h3 className="text-lg font-black mb-3 text-gray-900 dark:text-white">
                {adv.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Инфраструктура */}
      <section className="py-20 px-4 sm:px-6 bg-[#f0f4f2] dark:bg-[#040c09] transition-colors border-y border-transparent dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4 text-[#064734] dark:text-[#d4b26f]">
              {project.infrastructure.title}
            </h2>
            <p className="text-xs sm:text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
              {project.infrastructure.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {project.infrastructure.items.map((item, idx) => (
              <div key={idx} className="group">
                <div className="relative h-64 rounded-3xl overflow-hidden mb-4 bg-neutral-900 shadow-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-base font-black mb-1 text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Планировочные решения / Типовые этажи */}
      {project.typicalFloors && project.typicalFloors.length > 0 ? (
        <TypicalFloorsSection
          projectName={project.name}
          floors={project.typicalFloors}
        />
      ) : project.plans && project.plans.length > 0 ? (
        <FloorPlansSection
          projectName={project.name}
          plans={project.plans}
          theme={project.theme}
        />
      ) : isSold ? (
        <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <IconCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black mb-2 text-gray-900 dark:text-white">{ui.plansSoldTitle}</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
              {ui.plansSoldDesc(project.name)}
            </p>
          </div>
        </section>
      ) : (
        <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <div className="p-8 rounded-3xl border shadow-sm bg-[#eef2ef] dark:bg-[#0b1b15] border-gray-200 dark:border-white/10 transition-colors">
            <span className="text-xs uppercase font-black tracking-widest text-[#d4b26f] block mb-2">
              {t.header.catalog}
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase mb-3 tracking-tight text-gray-900 dark:text-white">
              {ui.plansRequestTitle}
            </h3>
            <p className="text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed text-gray-600 dark:text-gray-400">
              {ui.plansRequestDesc(project.name)}
            </p>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Здравствуйте! Интересуют актуальные свободные планировки и цены в ${project.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white font-black px-7 py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-md cursor-pointer"
            >
              <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
              <span>{ui.btnRequestPlans}</span>
            </a>
          </div>
        </section>
      )}

      {/* 7. Способы приобретения */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-xl sm:text-3xl font-black text-center uppercase tracking-tight mb-8 text-[#064734] dark:text-[#d4b26f]">
          {ui.purchaseTitle(project.name)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/polniy-raschet"
            className="p-7 rounded-3xl bg-[#0b3b2c] text-white border border-white/10 hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between group shadow-lg cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-[#d4b26f]">
                <IconDiamond className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black mb-1.5 group-hover:text-[#d4b26f] transition-colors">{ui.fullPaymentTitle}</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {ui.fullPaymentDesc}
              </p>
            </div>
            <span className="mt-5 text-xs font-black text-[#d4b26f] uppercase tracking-wider flex items-center gap-1">
              <span>{ui.fullPaymentAction}</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/rassrochka"
            className="p-7 rounded-3xl bg-[#0b3b2c] text-white border border-white/10 hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between group shadow-lg cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-[#d4b26f]">
                <IconCalendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black mb-1.5 group-hover:text-[#d4b26f] transition-colors">{ui.installmentTitle}</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {ui.installmentDesc}
              </p>
            </div>
            <span className="mt-5 text-xs font-black text-[#d4b26f] uppercase tracking-wider flex items-center gap-1">
              <span>{ui.installmentAction}</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/trade-in"
            className="p-7 rounded-3xl bg-[#0b3b2c] text-white border border-white/10 hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between group shadow-lg cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-[#d4b26f]">
                <IconCar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black mb-1.5 group-hover:text-[#d4b26f] transition-colors">{ui.tradeInTitle}</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {ui.tradeInDesc}
              </p>
            </div>
            <span className="mt-5 text-xs font-black text-[#d4b26f] uppercase tracking-wider flex items-center gap-1">
              <span>{ui.tradeInAction}</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* 8. Юридические гарантии */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <div className="p-6 sm:p-8 rounded-3xl border bg-white dark:bg-[#0b1b15] border-gray-200 dark:border-white/10 transition-colors">
          <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-3 text-[#064734] dark:text-[#d4b26f]">
            {ui.legalTitle}
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            {project.legalText}
          </p>
        </div>
      </section>

      {/* 9. Отзывы резидентов (Мультиязычные) с динамическим фоном */}
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={project.hero.image}
            alt={project.name}
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-[#032b20]/90" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
              {ui.reviewsBadge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              {ui.reviewsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {localizedReviews.map((rev, idx) => (
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
                  <h3 className="text-xs font-black text-[#d4b26f]">
                    {rev.author}
                  </h3>
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

      {/* 10. Офис продаж и адрес на 2GIS */}
      <section className="py-16 border-t bg-white dark:bg-[#07130e] border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
              {ui.officeBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-[#064734] dark:text-[#d4b26f]">
              {ui.officeTitle(project.name)}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">
            <div>
              <p className="text-xs text-gray-400 dark:text-neutral-400 mb-1">{ui.officeAddressLabel}</p>
              <p className="text-base font-black mb-3 text-gray-900 dark:text-white">{project.hero.address}</p>
              
              <div className="space-y-1 text-sm font-semibold mb-4 text-gray-800 dark:text-gray-200">
                <p>{COMPANY_INFO.phones[0] || '+996 709 115 115'}</p>
                <p>{COMPANY_INFO.phones[1] || '+996 990 115 115'}</p>
              </div>

              <a
                href={`https://2gis.kg/bishkek/search/${encodeURIComponent(project.hero.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4b26f] hover:underline"
              >
                <IconMapPin className="w-3.5 h-3.5 text-[#d4b26f]" />
                <span>{ui.route2Gis}</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappHeroText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow text-center cursor-pointer"
              >
                <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                <span>{ui.btnWhatsApp}</span>
              </a>
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-white/20 hover:border-[#064734] dark:hover:border-[#d4b26f] text-gray-800 dark:text-gray-200 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center cursor-pointer"
              >
                <IconInstagram className="w-4 h-4 text-pink-600" />
                <span>{ui.btnInstagram}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Мобильный Sticky Action Bar с поддержкой iPhone Safe Area */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 flex items-center gap-2 shadow-2xl transition-colors">
        <a
          href={`tel:${COMPANY_INFO.phones[0]?.replace(/\s+/g, '') || '+996709115115'}`}
          className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider text-center border border-gray-200 dark:border-white/15 transition-all flex items-center justify-center gap-1.5"
        >
          <IconPhone className="w-3.5 h-3.5 text-gray-900 dark:text-white" />
          <span>{ui.callBtn}</span>
        </a>
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappHeroText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] py-3 rounded-xl bg-[#064734] hover:bg-[#032b20] text-[#d4b26f] font-black text-xs uppercase tracking-wider text-center shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
          <span>WhatsApp</span>
        </a>
      </div>

    </main>
  );
}