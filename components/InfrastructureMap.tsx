'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { IconMapPin, IconArrowRight } from '@/components/Icons';

type CategoryType = 'all' | 'parks' | 'education' | 'shopping' | 'health';

interface PlaceItem {
  id: string;
  name: Record<Locale, string>;
  category: CategoryType;
  walkMinutes?: number;
  driveMinutes?: number;
  badge?: Record<Locale, string>;
}

interface ComplexLocationData {
  id: string;
  name: Record<Locale, string>;
  address: Record<Locale, string>;
  district: Record<Locale, string>;
  gisUrl: string;
  googleMapsUrl: string;
  coords: { lat: number; lng: number };
  places: PlaceItem[];
}

function normalizeLocale(loc: any): Locale {
  if (!loc) return 'ru';
  const l = String(loc).toLowerCase().trim();
  if (l.startsWith('kg') || l.startsWith('ky')) return 'kg';
  if (l.startsWith('kz') || l.startsWith('kk')) return 'kz';
  if (l.startsWith('uk') || l.startsWith('ua')) return 'uk';
  if (l.startsWith('en')) return 'en';
  if (l.startsWith('zh') || l.startsWith('cn')) return 'zh';
  return 'ru';
}

const UI_TEXTS: Record<Locale, {
  badge: string;
  title: string;
  subtitle: string;
  walkLabel: string;
  driveLabel: string;
  minUnit: string;
  btn2Gis: string;
  btnGoogleMaps: string;
  categories: Record<CategoryType, string>;
  features: string[];
}> = {
  ru: {
    badge: 'Локация и точки притяжения',
    title: 'Все необходимое в шаговой доступности',
    subtitle: 'Выберите объект, чтобы изучить близость к престижным школам, паркам и торговым центрам Бишкека',
    walkLabel: 'пешком',
    driveLabel: 'на авто',
    minUnit: 'мин',
    btn2Gis: 'Открыть локацию в 2GIS',
    btnGoogleMaps: 'Google Maps',
    categories: {
      all: 'Все точки',
      parks: 'Парки и отдых',
      education: 'Образование',
      shopping: 'ТРЦ и покупки',
      health: 'Медицина',
    },
    features: [
      'Удобные асфальтированные подъездные пути',
      'Остановки общественного транспорта в 2 минутах',
      'Безопасный район с развитым освещением и охраной',
    ],
  },
  kg: {
    badge: 'Локация жана инфраструктура',
    title: 'Шаардын эң мыкты райондорунда',
    subtitle: 'Комплексти тандап, айланасындагы мектептерди, парктарды жана соода борборлорун көрүңүз',
    walkLabel: 'жөө',
    driveLabel: 'унаада',
    minUnit: 'мүн',
    btn2Gis: '2GIS аркылуу ачуу',
    btnGoogleMaps: 'Google Maps картасы',
    categories: {
      all: 'Бардык жерлер',
      parks: 'Парктар жана сейилдөө',
      education: 'Мектептер жана билим',
      shopping: 'ТРЦ жана соода',
      health: 'Медицина',
    },
    features: [
      'Ыңгайлуу асфальтталган кирүү жолдору',
      'Коомдук транспорт аялдамалары 2 мүнөттүк аралыкта',
      'Жарыктандырылган жана коопсуз тынч район',
    ],
  },
  kz: {
    badge: 'Орналасу және инфрақұрылым',
    title: 'Барлық қажеттілік қадамдық қолжетімділікте',
    subtitle: 'Нысанды таңдап, беделді мектептер, саябақтар мен сауда орталықтарының жақындығын қараңыз',
    walkLabel: 'жаяу',
    driveLabel: 'көлікпен',
    minUnit: 'мин',
    btn2Gis: '2GIS арқылы ашу',
    btnGoogleMaps: 'Google Maps картасы',
    categories: {
      all: 'Барлығы',
      parks: 'Саябақтар мен демалыс',
      education: 'Білім беру',
      shopping: 'СОО және сауда',
      health: 'Медицина',
    },
    features: [
      'Ыңғайлы асфальтталған кіреберіс жолдар',
      'Қоғамдық көлік аялдамалары 2 минуттық жерде',
      'Жарықтандырылған және қауіпсіз тұрғын аудан',
    ],
  },
  uk: {
    badge: 'Локація та інфраструктура',
    title: 'Все необхідне в пішій доступності',
    subtitle: 'Оберіть об’єкт, щоб вивчити близькість до престижних шкіл, парків та ТРЦ Бішкека',
    walkLabel: 'пішки',
    driveLabel: 'на авто',
    minUnit: 'хв',
    btn2Gis: 'Відкрити локацію в 2GIS',
    btnGoogleMaps: 'Google Maps',
    categories: {
      all: 'Всі об’єкти',
      parks: 'Парки та відпочинок',
      education: 'Освіта',
      shopping: 'ТРЦ та покупки',
      health: 'Медицина',
    },
    features: [
      'Зручні асфальтовані під’їзні шляхи',
      'Зупинки громадського транспорту за 2 хвилини',
      'Безпечний район із якісним освітленням та охороною',
    ],
  },
  en: {
    badge: 'Prime Location & Infrastructure',
    title: 'Every Convenience Within Walking Reach',
    subtitle: 'Select a development to explore proximity to premier schools, scenic parks, and shopping hubs',
    walkLabel: 'walk',
    driveLabel: 'drive',
    minUnit: 'min',
    btn2Gis: 'Open in 2GIS',
    btnGoogleMaps: 'Google Maps',
    categories: {
      all: 'All Points',
      parks: 'Parks & Recreation',
      education: 'Education',
      shopping: 'Retail & Malls',
      health: 'Healthcare',
    },
    features: [
      'Direct paved access and multi-lane connecting roads',
      'Public transit hubs reachable within 2 minutes',
      'Secure neighborhood with comprehensive street illumination',
    ],
  },
  zh: {
    badge: '黄金地段与城市配套',
    title: '尽享繁华圈层 触手可及',
    subtitle: '选择意向楼盘，即刻查阅周边优质名校、生态公园及高端商业配套',
    walkLabel: '步行',
    driveLabel: '车程',
    minUnit: '分钟',
    btn2Gis: '在 2GIS 中导航',
    btnGoogleMaps: 'Google Maps 导航',
    categories: {
      all: '全部配套',
      parks: '公园与生态',
      education: '名校与教育',
      shopping: '商圈与购物',
      health: '医疗健康',
    },
    features: [
      '双向开阔柏油主干道，畅通进出',
      '周边公共交通枢纽步行仅需2分钟',
      '安保巡逻密集，全路段照明安全社区',
    ],
  },
};

const LOCATIONS_DATA: ComplexLocationData[] = [
  {
    id: 'abu-dhabi',
    name: {
      ru: 'ЖК Abu Dhabi',
      kg: '«Abu Dhabi» ТЖК',
      kz: '«Abu Dhabi» ТҮК',
      uk: 'ЖК Abu Dhabi',
      en: 'Abu Dhabi RC',
      zh: '阿布扎比住宅区 (Abu Dhabi)',
    },
    address: {
      ru: 'ул. Сухомлинова, 29 (пер. ул. Тыныстанова)',
      kg: 'Сухомлинов көч., 29 (Тыныстанов көч. кесилиши)',
      kz: 'Сухомлинов к-сі, 29 (Тыныстанов к-сі қиылысы)',
      uk: 'вул. Сухомлинова, 29 (ріг вул. Тинистанова)',
      en: '29 Sukhomlinov St. (cross. Tynystanov St.)',
      zh: '比什凯克市苏霍姆利诺夫街29号（近特尼斯塔诺夫街）',
    },
    district: {
      ru: 'Южная магистраль / Политех',
      kg: 'Түштүк магистраль / Политех',
      kz: 'Оңтүстік магистраль / Политех',
      uk: 'Південна магістраль / Політех',
      en: 'South Highway / Polytechnic Enclave',
      zh: '南部主干道/理工学院高尚街区',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D1%83%D0%BB.%20%D0%A1%D1%83%D1%85%D0%BE%D0%BC%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%2C%2029',
    googleMapsUrl: 'https://maps.google.com/?q=42.8433,74.5945',
    coords: { lat: 42.8433, lng: 74.5945 },
    places: [
      {
        id: 'ad-1',
        name: {
          ru: 'Ботанический сад им. Э. Гареева',
          kg: 'Э. Гареев атындагы Ботаникалык бак',
          kz: 'Э. Гареев атындағы Ботаникалық бақ',
          uk: 'Ботанічний сад ім. Е. Гарєєва',
          en: 'Gareev Botanical Garden',
          zh: '加列耶夫植物园',
        },
        category: 'parks',
        walkMinutes: 5,
        badge: {
          ru: 'Свежий воздух',
          kg: 'Таза аба',
          kz: 'Таза ауа',
          uk: 'Свіже повітря',
          en: 'Alpine Air',
          zh: '鲜氧秘境',
        },
      },
      {
        id: 'ad-2',
        name: {
          ru: 'Парк «Ынтымак» и «Адинай»',
          kg: '«Ынтымак» жана «Адинай» сейил бактары',
          kz: '«Ынтымақ» және «Адинай» саябақтары',
          uk: 'Парк «Интимак» та «Адінай»',
          en: 'Yntymak & Adinai City Parks',
          zh: 'Yntymak & Adinai 城市中央公园',
        },
        category: 'parks',
        driveMinutes: 6,
        badge: {
          ru: 'Прогулки у гор',
          kg: 'Тоо этегинде сейилдөө',
          kz: 'Тау бөктерінде серуен',
          uk: 'Прогулянки біля гір',
          en: 'Scenic Promenades',
          zh: '雪山景观步道',
        },
      },
      {
        id: 'ad-3',
        name: {
          ru: 'ТРЦ Asia Mall (пр. Ч. Айтматова)',
          kg: '«Asia Mall» соода борбору (Ч. Айтматов пр.)',
          kz: '«Asia Mall» сауда орталығы (Ш. Айтматов даңғ.)',
          uk: 'ТРЦ Asia Mall (просп. Ч. Айтматова)',
          en: 'Asia Mall Lifestyle Center',
          zh: 'Asia Mall 大型购物中心',
        },
        category: 'shopping',
        driveMinutes: 5,
        walkMinutes: 15,
      },
      {
        id: 'ad-4',
        name: {
          ru: 'Школа «Газпром Кыргызстан»',
          kg: '«Газпром Кыргызстан» мектеби',
          kz: '«Газпром Қырғызстан» мектебі',
          uk: 'Школа «Газпром Киргизстан»',
          en: 'Gazprom Kyrgyzstan Elite School',
          zh: '俄罗斯天然气工业国际菁英学校',
        },
        category: 'education',
        driveMinutes: 8,
        badge: {
          ru: 'Премиум лицей',
          kg: 'Премиум лицей',
          kz: 'Премиум лицей',
          uk: 'Преміум ліцей',
          en: 'Top Academy',
          zh: '重点名校',
        },
      },
      {
        id: 'ad-5',
        name: {
          ru: 'КГМА им. И.К. Ахунбаева',
          kg: 'И.К. Ахунбаев атындагы КММА',
          kz: 'И.К. Ахунбаев атындағы ҚММА',
          uk: 'КДМА ім. І.К. Ахунбаєва',
          en: 'Akhunbaev Kyrgyz State Medical Academy',
          zh: '阿洪巴耶夫国立医学院',
        },
        category: 'education',
        walkMinutes: 4,
      },
      {
        id: 'ad-6',
        name: {
          ru: 'Медицинский центр «Кортекс» & Nova Clinic',
          kg: '«Кортекс» & «Nova Clinic» медициналык борборлору',
          kz: '«Кортекс» & «Nova Clinic» медициналық орталықтары',
          uk: 'Медичний центр «Кортекс» & Nova Clinic',
          en: 'Cortex Medical Center & Nova Clinic',
          zh: 'Cortex 综合诊疗中心与 Nova 专科门诊',
        },
        category: 'health',
        walkMinutes: 3,
      },
      {
        id: 'ad-7',
        name: {
          ru: 'Супермаркет Globus / Народный',
          kg: '«Globus» / «Народный» гипермаркеттери',
          kz: '«Globus» / «Народный» дүкендері',
          uk: 'Супермаркет Globus / Народный',
          en: 'Globus / Narodnyi Supermarkets',
          zh: 'Globus / Narodnyi 精品连锁超市',
        },
        category: 'shopping',
        walkMinutes: 3,
      },
    ],
  },
  {
    id: 'madina-residence',
    name: {
      ru: 'ЖК Madina Residence',
      kg: '«Madina Residence» ТЖК',
      kz: '«Madina Residence» ТҮК',
      uk: 'ЖК Madina Residence',
      en: 'Madina Residence',
      zh: '麦地那公馆 (Madina Residence)',
    },
    address: {
      ru: 'ул. Огонбаева, 12 (пер. ул. Гоголя)',
      kg: 'Огонбаев көч., 12 (Гоголь көч. кесилиши)',
      kz: 'Огонбаев к-сі, 12 (Гоголь к-сі қиылысы)',
      uk: 'вул. Огонбаєва, 12 (ріг вул. Гоголя)',
      en: '12 Ogonbaev St. (cross. Gogol St.)',
      zh: '比什凯克市奥贡巴耶夫街12号（近果戈里街）',
    },
    district: {
      ru: 'Золотой квадрат / Центр Бишкека',
      kg: 'Алтын квадрат / Бишкек борбору',
      kz: 'Алтын квадрат / Бішкек орталығы',
      uk: 'Золотий квадрат / Центр Бішкека',
      en: 'Golden Square / Downtown Bishkek',
      zh: '城市黄金原点/核心行政商圈',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D1%83%D0%BB.%20%D0%9E%D0%B3%D0%BE%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%2C%2012',
    googleMapsUrl: 'https://maps.google.com/?q=42.8765,74.6190',
    coords: { lat: 42.8765, lng: 74.6190 },
    places: [
      {
        id: 'mr-1',
        name: {
          ru: 'ТРЦ Dordoi Plaza & кинотеатр',
          kg: '«Dordoi Plaza» соода борбору жана кинотеатр',
          kz: '«Dordoi Plaza» сауда орталығы және кинотеатр',
          uk: 'ТРЦ Dordoi Plaza та кінотеатр',
          en: 'Dordoi Plaza Mall & Cinema',
          zh: 'Dordoi Plaza 购物中心及 IMAX 影院',
        },
        category: 'shopping',
        walkMinutes: 3,
        badge: {
          ru: '300 метров',
          kg: '300 метр',
          kz: '300 метр',
          uk: '300 метрів',
          en: '300 meters',
          zh: '仅300米',
        },
      },
      {
        id: 'mr-2',
        name: {
          ru: 'ЦУМ «Айчүрөк» и ГУМ «Чынар»',
          kg: '«Айчүрөк» ЦУМ жана «Чынар» ГУМ',
          kz: '«Айчүрөк» ЦУМ және «Чынар» ГУМ',
          uk: 'ЦУМ «Айчурек» та ГУМ «Чинар»',
          en: 'TSUM & GUM Department Stores',
          zh: '中央百货商场 (TSUM & GUM)',
        },
        category: 'shopping',
        walkMinutes: 6,
      },
      {
        id: 'mr-3',
        name: {
          ru: 'Гимназия №12 и Авторская школа №67',
          kg: '№12 гимназия жана №67 автордук мектеп',
          kz: '№12 гимназия және №67 авторлық мектеп',
          uk: 'Гімназія №12 та Авторська школа №67',
          en: 'Gymnasium No. 12 & School No. 67',
          zh: '第12文理重点中学与第67实验名校',
        },
        category: 'education',
        walkMinutes: 5,
        badge: {
          ru: 'Топ-школы',
          kg: 'Мыкты мектептер',
          kz: 'Үздік мектептер',
          uk: 'Топ-школи',
          en: 'Top Ranking',
          zh: '名优学府',
        },
      },
      {
        id: 'mr-4',
        name: {
          ru: 'Центральная площадь «Ала-Тоо»',
          kg: '«Ала-Тоо» борбордук аянты',
          kz: '«Ала-Тоо» орталық алаңы',
          uk: 'Центральна площа «Ала-Тоо»',
          en: 'Ala-Too Central Square',
          zh: '阿拉套中央广场',
        },
        category: 'parks',
        walkMinutes: 10,
        driveMinutes: 3,
      },
      {
        id: 'mr-5',
        name: {
          ru: 'Дубовый парк и Театральный сквер',
          kg: 'Эмен сейил багы жана Театр сквери',
          kz: 'Емен саябағы және Театр алаңы',
          uk: 'Дубовий парк та Театральний сквер',
          en: 'Oak Park & Theater Garden',
          zh: '百年橡树公园与剧院林荫广场景区',
        },
        category: 'parks',
        walkMinutes: 8,
      },
      {
        id: 'mr-6',
        name: {
          ru: 'Клиника «Юрфа» и Клиническая больница №1',
          kg: '«Юрфа» клиникасы жана №1 шаардык оорукана',
          kz: '«Юрфа» клиникасы және №1 клиникалық аурухана',
          uk: 'Клініка «Юрфа» та Клінічна лікарня №1',
          en: 'Yurfa Diagnostic Hospital & Clinic No. 1',
          zh: 'Yurfa 国际综合专科医院与第一临床医院',
        },
        category: 'health',
        driveMinutes: 4,
      },
    ],
  },
  {
    id: 'ajkol-plus',
    name: {
      ru: 'ЖД Айкол +',
      kg: '«Айкөл +» КҮ',
      kz: '«Айкөл +» КҮ',
      uk: 'ЖБ Айкол +',
      en: 'Aikol+ Club House',
      zh: '艾科尔+ 精品洋房 (Aikol+)',
    },
    address: {
      ru: 'с. Кок-Жар, ул. Баялинова, 6',
      kg: 'Көк-Жар а., Баялинов көч., 6',
      kz: 'Көк-Жар а., Баялинов к-сі, 6',
      uk: 'с. Кок-Жар, вул. Баялінова, 6',
      en: '6 Bayalinov St., Kok-Jar',
      zh: '比什凯克市Kok-Jar区巴亚利诺夫街6号',
    },
    district: {
      ru: 'Юго-Восток / Экологическое предгорье',
      kg: 'Түштүк-Чыгыш / Экологиялык тоо этеги',
      kz: 'Оңтүстік-Шығыс / Экологиялық тау бөктері',
      uk: 'Південний схід / Екологічне передгір’я',
      en: 'South-East / Pure Mountain Foothills',
      zh: '城南生态纯氧居住麓区',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D1%81.%20%D0%9A%D0%BE%D0%BA-%D0%96%D0%B0%D1%80%2C%20%D1%83%D0%BB.%20%D0%91%D0%B0%D1%8F%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%2C%206',
    googleMapsUrl: 'https://maps.google.com/?q=42.8210,74.6450',
    coords: { lat: 42.8210, lng: 74.6450 },
    places: [
      {
        id: 'aik-1',
        name: {
          ru: 'Международная школа Bilimkana',
          kg: '«Билимкана» эл аралык мектеби',
          kz: '«Билимкана» халықаралық мектебі',
          uk: 'Міжнародна школа Bilimkana',
          en: 'Bilimkana International School',
          zh: 'Bilimkana 国际创新实验双语名校',
        },
        category: 'education',
        driveMinutes: 4,
        badge: {
          ru: 'Инновации',
          kg: 'Инновация',
          kz: 'Инновация',
          uk: 'Інновації',
          en: 'Global Tech',
          zh: '全球认证',
        },
      },
      {
        id: 'aik-2',
        name: {
          ru: 'Ботанический сад (верхняя парковая зона)',
          kg: 'Ботаникалык бак (жогорку бөлүгү)',
          kz: 'Ботаникалық бақ (жоғарғы саябақ)',
          uk: 'Ботанічний сад (верхня паркова зона)',
          en: 'Botanical Garden (Upper Greenery Zone)',
          zh: '植物园上游森林氧吧保护区',
        },
        category: 'parks',
        driveMinutes: 5,
      },
      {
        id: 'aik-3',
        name: {
          ru: 'Гипермаркет Globus (ул. 7 Апреля)',
          kg: '«Globus» гипермаркети (7 Апрель көч.)',
          kz: '«Globus» гипермаркеті (7 Сәуір к-сі)',
          uk: 'Гіпермаркет Globus (вул. 7 Квітня)',
          en: 'Globus Hypermarket (7 April St.)',
          zh: 'Globus 大型全业态生活超市 (4月7日大街店)',
        },
        category: 'shopping',
        driveMinutes: 6,
      },
      {
        id: 'aik-4',
        name: {
          ru: 'Детский сад «Апельсин» & «Семья»',
          kg: '«Апельсин» жана «Үй-бүлө» балдар бакчалары',
          kz: '«Апельсин» және «Отбасы» балабақшалары',
          uk: 'Дитячий садок «Апельсин» & «Сім’я»',
          en: 'Apelsin & Family Early Learning Centers',
          zh: 'Apelsin 国际蒙氏双语幼儿园',
        },
        category: 'education',
        walkMinutes: 4,
      },
      {
        id: 'aik-5',
        name: {
          ru: 'Чистый горный бриз (Роза ветров)',
          kg: 'Тоонун таза шамалы (Жел багыты)',
          kz: 'Таудың таза самалы (Жел бағыты)',
          uk: 'Чистий гірський бриз (Роза вітрів)',
          en: 'Pristine Alpine Wind Circulation',
          zh: '终年清凉山风与鲜氧空气 (无雾霾带)',
        },
        category: 'parks',
        walkMinutes: 1,
        badge: {
          ru: 'Без смога',
          kg: 'Түтүнсүз',
          kz: 'Түтінсіз',
          uk: 'Без смогу',
          en: 'Smog-Free',
          zh: '无雾霾带',
        },
      },
    ],
  },
];

export default function InfrastructureMap() {
  const { locale } = useLanguage();
  const currentLang: Locale = normalizeLocale(locale);
  const ui = UI_TEXTS[currentLang] || UI_TEXTS.ru;

  const [activeComplexId, setActiveComplexId] = useState<string>('abu-dhabi');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const currentComplex = useMemo(() => {
    return LOCATIONS_DATA.find((c) => c.id === activeComplexId) || LOCATIONS_DATA[0];
  }, [activeComplexId]);

  const filteredPlaces = useMemo(() => {
    if (activeCategory === 'all') return currentComplex.places;
    return currentComplex.places.filter((p) => p.category === activeCategory);
  }, [currentComplex, activeCategory]);

  const categories = useMemo(() => [
    { id: 'all' as CategoryType, label: ui.categories.all },
    { id: 'parks' as CategoryType, label: ui.categories.parks },
    { id: 'education' as CategoryType, label: ui.categories.education },
    { id: 'shopping' as CategoryType, label: ui.categories.shopping },
    { id: 'health' as CategoryType, label: ui.categories.health },
  ], [ui]);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Заголовок */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
          {ui.badge}
        </span>
        <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f] tracking-tight">
          {ui.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-2 font-light leading-relaxed">
          {ui.subtitle}
        </p>
      </div>

      {/* Табы выбора жилого комплекса */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-gray-100 dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 gap-1 overflow-x-auto max-w-full">
          {LOCATIONS_DATA.map((comp) => {
            const isSelected = activeComplexId === comp.id;
            return (
              <button
                key={comp.id}
                type="button"
                onClick={() => {
                  setActiveComplexId(comp.id);
                  setActiveCategory('all');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#064734] dark:bg-[#d4b26f] text-[#d4b26f] dark:text-[#064734] shadow-md scale-100'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white'
                }`}
              >
                {comp.name[currentLang] || comp.name.ru}
              </button>
            );
          })}
        </div>
      </div>

      {/* Основная сетка: Интерактивный список точек + Карточка карты */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Левая колонка: Категории и список точек */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Фильтры категорий */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                    : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Список объектов инфраструктуры */}
          <div className="space-y-3">
            {filteredPlaces.map((place) => {
              const placeName = place.name[currentLang] || place.name.ru;
              const placeBadge = place.badge ? (place.badge[currentLang] || place.badge.ru) : null;

              return (
                <div
                  key={place.id}
                  className="bg-white dark:bg-[#0b1b15] rounded-2xl p-4 sm:p-5 border border-gray-200 dark:border-white/10 hover:border-[#064734]/30 dark:hover:border-[#d4b26f]/30 transition-all flex items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-white/5 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center shrink-0">
                      <IconMapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                          {placeName}
                        </h4>
                        {placeBadge && (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-[#d4b26f]/20 text-[#96742e] dark:text-[#d4b26f] px-2 py-0.5 rounded-md">
                            {placeBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Время в пути */}
                  <div className="flex items-center gap-2 shrink-0 text-right">
                    {place.walkMinutes && (
                      <div className="text-center bg-gray-100 dark:bg-white/5 px-2.5 py-1.5 rounded-xl border border-gray-200/60 dark:border-white/5">
                        <span className="text-[10px] text-gray-400 dark:text-neutral-400 block font-semibold">
                          🚶 {ui.walkLabel}
                        </span>
                        <strong className="text-xs font-black text-gray-800 dark:text-gray-200">
                          {place.walkMinutes} {ui.minUnit}
                        </strong>
                      </div>
                    )}

                    {place.driveMinutes && (
                      <div className="text-center bg-gray-100 dark:bg-white/5 px-2.5 py-1.5 rounded-xl border border-gray-200/60 dark:border-white/5">
                        <span className="text-[10px] text-gray-400 dark:text-neutral-400 block font-semibold">
                          🚗 {ui.driveLabel}
                        </span>
                        <strong className="text-xs font-black text-[#064734] dark:text-[#d4b26f]">
                          {place.driveMinutes} {ui.minUnit}
                        </strong>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Правая колонка: Карточка локации комплекса и ссылки на карты */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#064734] to-[#042e22] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[380px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4b26f]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="text-xs font-bold text-[#d4b26f] uppercase tracking-wider block mb-2">
              {currentComplex.district[currentLang] || currentComplex.district.ru}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase mb-3 text-white">
              {currentComplex.name[currentLang] || currentComplex.name.ru}
            </h3>

            <div className="flex items-start gap-2.5 text-xs text-white/80 mb-6 bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <IconMapPin className="w-4 h-4 text-[#d4b26f] shrink-0 mt-0.5" />
              <span>{currentComplex.address[currentLang] || currentComplex.address.ru}</span>
            </div>

            <div className="space-y-3 text-xs text-white/90 font-light">
              {ui.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d4b26f] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Кнопки открытия навигации */}
          <div className="relative z-10 pt-8 space-y-2.5">
            <a
              href={currentComplex.gisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#d4b26f] hover:bg-[#c49f57] text-[#064734] font-black py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{ui.btn2Gis}</span>
              <IconArrowRight className="w-4 h-4" />
            </a>

            <a
              href={currentComplex.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-2.5 rounded-xl uppercase tracking-wider text-[11px] transition-colors border border-white/15 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{ui.btnGoogleMaps}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}