'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { reachGoal } from '@/components/YandexMetrika';
import { getStoredUtm } from '@/lib/utm';
import { trackLeadSubmit, trackWhatsAppClick } from '@/lib/analytics';
import {
  IconCheck,
  IconWhatsApp,
  IconPhone,
  IconArrowRight,
  IconBuilding,
  IconShieldCheck,
} from '@/components/Icons';

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

interface Apartment {
  id: string;
  number: number;
  floor: number;
  block: string;
  rooms: 1 | 2 | 3;
  area: number;
  status: 'free' | 'reserved' | 'sold';
  pricePerMeter: number;
  planImage: string;
  windowsView: Record<Locale, string>;
}

interface ProjectData {
  slug: string;
  name: string;
  blocks: string[];
  floorsCount: number;
  pricePerMeter: number;
  apartments: Apartment[];
}

// =========================================================================
// 🏢 1. БАЗА РЕАЛЬНЫХ ПЛАНИРОВОК: ЖК ABU DHABI
// =========================================================================
const ABU_DHABI_LAYOUTS: {
  block: string;
  rooms: 1 | 2 | 3;
  area: number;
  planImage: string;
  windowsView: Record<Locale, string>;
}[] = [
  // 1-комнатные
  {
    block: 'Б',
    rooms: 1,
    area: 49.48,
    planImage: '/plans/abu-dhabi/1k-49-48.png',
    windowsView: {
      ru: 'Во внутренний двор и парк',
      kg: 'Ички короого жана паркка',
      kz: 'Ішкі аулаға және саябаққа',
      uk: 'У внутрішній двір та парк',
      en: 'Inner courtyard & landscaped park',
      zh: '朝向中庭园林与城市绿意',
    },
  },
  {
    block: 'Б',
    rooms: 1,
    area: 49.73,
    planImage: '/plans/abu-dhabi/1k-49-73.png',
    windowsView: {
      ru: 'Восточная сторона, утреннее солнце',
      kg: 'Чыгыш тарап, таңкы күн',
      kz: 'Шығыс бағыт, таңғы күн',
      uk: 'Східна сторона, ранкове сонце',
      en: 'Eastern orientation, morning sunlight',
      zh: '正东朝向，清晨阳光充足',
    },
  },
  {
    block: 'А',
    rooms: 1,
    area: 50.88,
    planImage: '/plans/abu-dhabi/1k-50-88.png',
    windowsView: {
      ru: 'Вид на Южную магистраль и горы',
      kg: 'Түштүк магистраль жана тоолор',
      kz: 'Оңтүстік магистраль және таулар',
      uk: 'Вид на Південну магістраль та гори',
      en: 'Southern Highway and mountain skyline',
      zh: '开阔南部景观大道与连绵山峦',
    },
  },
  {
    block: 'Б',
    rooms: 1,
    area: 54.68,
    planImage: '/plans/abu-dhabi/1k-54-68.png',
    windowsView: {
      ru: 'Панорамный вид во двор',
      kg: 'Короого панорамалык көрүнүш',
      kz: 'Аулаға панорамалық көрініс',
      uk: 'Панорамний вид у двір',
      en: 'Panoramic garden court view',
      zh: '高区全景内园视野',
    },
  },
  {
    block: 'Б',
    rooms: 1,
    area: 55.62,
    planImage: '/plans/abu-dhabi/1k-55-62.png',
    windowsView: {
      ru: 'Юго-восток, солнечная сторона',
      kg: 'Түштүк-чыгыш, күн тарап',
      kz: 'Оңтүстік-шығыс, күн түсетін жақ',
      uk: 'Південний схід, сонячна сторона',
      en: 'South-East sunny exposure',
      zh: '东南朝向，采光通透优渥',
    },
  },
  {
    block: 'Б',
    rooms: 1,
    area: 58.05,
    planImage: '/plans/abu-dhabi/1k-58-05.png',
    windowsView: {
      ru: 'Просторная евро-двушка с видом на парк',
      kg: 'Сейил бакка караган кенен евро-2 батир',
      kz: 'Саябаққа қараған кең евро-2 пәтер',
      uk: 'Простора євродвушка з видом на парк',
      en: 'Spacious Euro 2-room with park view',
      zh: '宽景轻奢格局，畅享生态公园美景',
    },
  },
  // 2-комнатные
  {
    block: 'Б',
    rooms: 2,
    area: 78.30,
    planImage: '/plans/abu-dhabi/2k-78-30.png',
    windowsView: {
      ru: 'Панорама гор Ала-Тоо',
      kg: 'Ала-Тоо тоолорунун панорамасы',
      kz: 'Ала-Тау панорамасы',
      uk: 'Панорама гір Ала-Тоо',
      en: 'Ala-Too Mountain Skyline',
      zh: '一线正对阿拉套山脉雪峰全景',
    },
  },
  {
    block: 'А',
    rooms: 2,
    area: 79.77,
    planImage: '/plans/abu-dhabi/2k-79-77.png',
    windowsView: {
      ru: 'Двусторонняя, горы и внутренний двор',
      kg: 'Эки тараптуу: тоо жана короо',
      kz: 'Екі жақты: таулар мен аула',
      uk: 'Двостороння, гори та подвір’я',
      en: 'Dual-aspect: Mountains & Courtyard',
      zh: '南北通透：远眺雪山与近享园林',
    },
  },
  {
    block: 'А',
    rooms: 2,
    area: 80.26,
    planImage: '/plans/abu-dhabi/2k-80-26.png',
    windowsView: {
      ru: 'Вид на город и горы',
      kg: 'Шаар жана тоолор көрүнүшү',
      kz: 'Қала мен таулар көрінісі',
      uk: 'Вид на місто та гори',
      en: 'Cityscape & Mountain panorama',
      zh: '繁华都市天际线与壮丽山景交相辉映',
    },
  },
  {
    block: 'Б',
    rooms: 2,
    area: 81.59,
    planImage: '/plans/abu-dhabi/2k-81-59.png',
    windowsView: {
      ru: 'Панорамные витражи на юг',
      kg: 'Түштүккө караган витраж терезелер',
      kz: 'Оңтүстікке қараған витраждар',
      uk: 'Панорамні вітражі на південь',
      en: 'South-facing floor-to-ceiling glazing',
      zh: '南向超大采光全景落地窗',
    },
  },
  {
    block: 'А',
    rooms: 2,
    area: 83.58,
    planImage: '/plans/abu-dhabi/2k-83-58.png',
    windowsView: {
      ru: 'Юго-запад, закат и горы',
      kg: 'Түштүк-батыш, күн батышы жана тоолор',
      kz: 'Оңтүстік-батыс, күн батуы мен таулар',
      uk: 'Південний захід, захід сонця і гори',
      en: 'South-West sunset & mountain views',
      zh: '西南朝向，落日余晖与雪山画卷',
    },
  },
  {
    block: 'А',
    rooms: 2,
    area: 83.99,
    planImage: '/plans/abu-dhabi/2k-83-99.png',
    windowsView: {
      ru: 'Угловая с панорамным обзором 270°',
      kg: '270° панорамалык көрүнүшү бар бурчтук',
      kz: '270° панорамалық шолуы бар бұрыштық',
      uk: 'Кутова з панорамою 270°',
      en: 'Corner unit with 270° panoramic view',
      zh: '转角270度环幕天际全视野',
    },
  },
  // 3-комнатная
  {
    block: 'Б',
    rooms: 3,
    area: 119.32,
    planImage: '/plans/abu-dhabi/3k-119-32.png',
    windowsView: {
      ru: 'Пентхаус-формат: панорама на горы и город',
      kg: 'Пентхаус форматы: тоо жана шаар көрүнүшү',
      kz: 'Пентхаус форматы: таулар мен қала көрінісі',
      uk: 'Формат пентхауса: панорама на гори та місто',
      en: 'Penthouse-tier: 360° mountain & city view',
      zh: '顶奢大平层格局：360度城市与雪峰双重盛景',
    },
  },
];

// =========================================================================
// 🏢 2. БАЗА РЕАЛЬНЫХ ПЛАНИРОВОК: ЖК MADINA RESIDENCE (БЛОКИ А, Б, В)
// =========================================================================
const MADINA_LAYOUTS: {
  block: string;
  rooms: 1 | 2 | 3;
  area: number;
  planImage: string;
  windowsView: Record<Locale, string>;
}[] = [
  // 1-комнатные (Блок А)
  {
    block: 'А',
    rooms: 1,
    area: 43.59,
    planImage: '/plans/madina/1k-43-59.png',
    windowsView: {
      ru: 'Вид на благоустроенный зеленый двор',
      kg: 'Жашылдандырылган короого көрүнүш',
      kz: 'Көгалдандырылған аулаға көрініс',
      uk: 'Вид на зелений затишний двір',
      en: 'Courtyard landscaped greens view',
      zh: '朝向品质中庭园林绿意',
    },
  },
  {
    block: 'А',
    rooms: 1,
    area: 45.21,
    planImage: '/plans/madina/1k-45-21.png',
    windowsView: {
      ru: 'Восточная сторона, мягкий утренний свет',
      kg: 'Чыгыш тарап, таңкы жумшак жарык',
      kz: 'Шығыс бағыт, таңғы жарық',
      uk: 'Східна сторона, ранкове світло',
      en: 'Eastern light, quiet residential view',
      zh: '正东朝向，清晨柔和采光',
    },
  },
  {
    block: 'А',
    rooms: 1,
    area: 49.90,
    planImage: '/plans/madina/1k-49-90.png',
    windowsView: {
      ru: 'Удобная планировка с гардеробной и лоджией',
      kg: 'Гардероб жана балкон менен ыңгайлуу план',
      kz: 'Киім бөлмесі мен балконы бар ыңғайлы пәтер',
      uk: 'Планування з гардеробом та лоджією',
      en: 'Functional layout with walk-in closet',
      zh: '独立衣帽间与景观阳台格局',
    },
  },
  {
    block: 'А',
    rooms: 1,
    area: 50.18,
    planImage: '/plans/madina/1k-50-18.png',
    windowsView: {
      ru: 'Вид на проспект Чуй и город',
      kg: 'Чүй кең көчөсүнө жана шаарга көрүнүш',
      kz: 'Шүй даңғылы мен қалаға көрініс',
      uk: 'Вид на проспект Чуй та місто',
      en: 'Chuy Avenue and city urban vistas',
      zh: '楚河大道繁盛市景与开阔视野',
    },
  },
  {
    block: 'А',
    rooms: 1,
    area: 53.88,
    planImage: '/plans/madina/1k-53-88.png',
    windowsView: {
      ru: 'Просторная евро-двушка с большой кухней-гостиной',
      kg: 'Кенен ашкана-мейманканасы бар евро-2 батир',
      kz: 'Үлкен асүй-қонақ бөлмесі бар кең евро-2',
      uk: 'Велика кухня-вітальня, світлі вікна',
      en: 'Large living-kitchen area, panoramic windows',
      zh: '超大客餐厅一体化宽幕设计',
    },
  },
  // 1-комнатные (Блок Б)
  {
    block: 'Б',
    rooms: 1,
    area: 48.60,
    planImage: '/plans/madina/1k-48-60.png',
    windowsView: {
      ru: 'Тихий закрытый внутренний двор',
      kg: 'Тынч жабык ички короо',
      kz: 'Тыныш жабық ішкі аула',
      uk: 'Тихий закритий внутрішній двір',
      en: 'Peaceful private enclosed courtyard',
      zh: '完全人车分流静谧私密内院',
    },
  },
  {
    block: 'Б',
    rooms: 1,
    area: 50.01,
    planImage: '/plans/madina/1k-50-01.png',
    windowsView: {
      ru: 'Южная сторона, солнце в течение всего дня',
      kg: 'Түштүк тарап, күн бою жарык',
      kz: 'Оңтүстік бағыт, күні бойы жарық',
      uk: 'Південна сторона, сонце весь день',
      en: 'South-facing, all-day natural sunlight',
      zh: '正南朝向，全天候充足日照',
    },
  },
  {
    block: 'Б',
    rooms: 1,
    area: 57.87,
    planImage: '/plans/madina/1k-57-87.png',
    windowsView: {
      ru: 'Угловая евро-двушка с панорамным остеклением',
      kg: 'Панорамалуу айнектелген бурчтук евро-2',
      kz: 'Панорамалық шынысы бар бұрыштық евро-2',
      uk: 'Кутова євродвушка з панорамним заскленням',
      en: 'Corner Euro 2-room with corner glazing',
      zh: '转角双面通透采光尊享居室',
    },
  },
  // 1-комнатные (Блок В)
  {
    block: 'В',
    rooms: 1,
    area: 46.47,
    planImage: '/plans/madina/1k-46-47.png',
    windowsView: {
      ru: 'Вид на детскую и спортивную площадки',
      kg: 'Балдар жана спорт аянтчасына көрүнүш',
      kz: 'Балалар және спорт алаңына көрініс',
      uk: 'Вид на дитячий та спортивний майданчики',
      en: 'Overlooking kids playground & fitness zone',
      zh: '俯瞰社区全龄儿童及运动休闲区',
    },
  },
  {
    block: 'В',
    rooms: 1,
    area: 49.03,
    planImage: '/plans/madina/1k-49-03.png',
    windowsView: {
      ru: 'Правильная прямоугольная геометрия комнат',
      kg: 'Бөлмөлөрдүн туура жана ыңгайлуу формасы',
      kz: 'Бөлмелердің дұрыс тікбұрышты пішіні',
      uk: 'Правильне прямокутне планування',
      en: 'Classic rectangular living layout',
      zh: '方正通透户型无任何异形面积浪费',
    },
  },
  {
    block: 'В',
    rooms: 1,
    area: 49.14,
    planImage: '/plans/madina/1k-49-14.png',
    windowsView: {
      ru: 'Уютная спальня и просторная лоджия',
      kg: 'Жайлуу уктоочу бөлмө жана кенен лоджия',
      kz: 'Жайлы жатын бөлме және кең лоджия',
      uk: 'Затишна спальня та простора лоджія',
      en: 'Cozy master bedroom with deep balcony',
      zh: '静音主卧配备开敞生活景观阳台',
    },
  },
  {
    block: 'В',
    rooms: 1,
    area: 53.15,
    planImage: '/plans/madina/1k-53-15.png',
    windowsView: {
      ru: 'Светлая евро-двушка с окнами на две стороны',
      kg: 'Эки тарапка караган жарык евро-2 батир',
      kz: 'Екі жаққа қараған жарық евро-2 пәтер',
      uk: 'Світла євродвушка з вікнами на дві сторони',
      en: 'Dual-side aspect bright layout',
      zh: '双向采光通风明亮宜居格局',
    },
  },

  // 2-комнатные (Блок А)
  {
    block: 'А',
    rooms: 2,
    area: 71.00,
    planImage: '/plans/madina/2k-71-00.png',
    windowsView: {
      ru: 'Раздельные санузлы, вид на город',
      kg: 'Өзүнчө жуунучу бөлмөлөр, шаарга көрүнүш',
      kz: 'Бөлек жуынатын бөлмелер, қалаға көрініс',
      uk: 'Роздільні санвузли, вид на місто',
      en: 'Double bathrooms, cityscape panorama',
      zh: '干湿分离双卫设计，畅览城央天际线',
    },
  },
  {
    block: 'А',
    rooms: 2,
    area: 74.53,
    planImage: '/plans/madina/2k-74-53.png',
    windowsView: {
      ru: 'Изолированные спальни и вид во двор',
      kg: 'Өзүнчө бөлмөлөр жана короого көрүнүш',
      kz: 'Оқшауланған бөлмелер және аулаға көрініс',
      uk: 'Ізольовані кімнати та вид у двір',
      en: 'Secluded master bedrooms with garden views',
      zh: '动静分区双卧设计，尊享安宁私密',
    },
  },
  {
    block: 'А',
    rooms: 2,
    area: 75.90,
    planImage: '/plans/madina/2k-75-90.png',
    windowsView: {
      ru: 'Двусторонняя распашонка восток-запад',
      kg: 'Чыгыш-батыш эки тараптуу батир',
      kz: 'Шығыс-батыс қос бағытты пәтер',
      uk: 'Двостороннє планування схід-захід',
      en: 'East-to-West cross ventilation layout',
      zh: '南北/东西大通透自然对流格局',
    },
  },
  {
    block: 'А',
    rooms: 2,
    area: 81.30,
    planImage: '/plans/madina/2k-81-30.png',
    windowsView: {
      ru: 'Большая кухня 18 м² и панорамная лоджия',
      kg: 'Чоң 18 м² ашкана жана кең балкон',
      kz: 'Үлкен 18 м² асүй және панорамалық лоджия',
      uk: 'Кухня 18 м² та панорамна лоджія',
      en: 'Spacious 18m² dining kitchen & wide balcony',
      zh: '18平米超阔餐厨厅配大面积景观落地窗',
    },
  },
  {
    block: 'А',
    rooms: 2,
    area: 83.78,
    planImage: '/plans/madina/2k-83-78.png',
    windowsView: {
      ru: 'Премиальная угловая планировка с видом на горы',
      kg: 'Тоолорго караган премиалдуу бурчтук батир',
      kz: 'Тауларға қараған премиум бұрыштық пәтер',
      uk: 'Преміальне кутове планування з видом на гори',
      en: 'Premium corner unit with mountain panorama',
      zh: '转角头等舱级雪山与都市双重视野',
    },
  },

  // 2-комнатные (Блок Б)
  {
    block: 'Б',
    rooms: 2,
    area: 74.30,
    planImage: '/plans/madina/2k-74-30.png',
    windowsView: {
      ru: 'Южная сторона, солнечная гостиная с витражами',
      kg: 'Түштүк тарап, витраждуу жарык конок бөлмө',
      kz: 'Оңтүстік бағыт, витражды күн шуақты қонақ бөлме',
      uk: 'Південна сторона, вітражна світла вітальня',
      en: 'South-facing bright living room with glazing',
      zh: '朝南全明通透会客厅与落地飘窗',
    },
  },

  // 2-комнатные (Блок В)
  {
    block: 'В',
    rooms: 2,
    area: 71.07,
    planImage: '/plans/madina/2k-71-07.png',
    windowsView: {
      ru: 'Идеальное зонирование: гостевая и спальная зоны',
      kg: 'Конок жана уктоочу аймактар туура бөлүнгөн',
      kz: 'Қонақ және ұйықтайтын аймақтары ыңғайлы бөлінген',
      uk: 'Ідеальне зонування: гостьова та спальна зони',
      en: 'Optimal zoning: private & entertaining areas',
      zh: '黄金功能动线设计：静享休憩与从容待客',
    },
  },
  {
    block: 'В',
    rooms: 2,
    area: 74.59,
    planImage: '/plans/madina/2k-74-59.png',
    windowsView: {
      ru: 'Два санузла, ниша под гардеробную',
      kg: 'Эки жуунучу бөлмө, гардероб үчүн атайын орун',
      kz: 'Екі жуынатын бөлме, киім бөлмесіне арналған орын',
      uk: 'Два санвузли, ніша під вбудовану шафу',
      en: 'Two bathrooms, walk-in closet alcove',
      zh: '主客双卫配置，预留独立大衣帽储物间',
    },
  },
  {
    block: 'В',
    rooms: 2,
    area: 74.74,
    planImage: '/plans/madina/2k-74-74.png',
    windowsView: {
      ru: 'Вид во внутренний ландшафтный двор',
      kg: 'Ички ландшафттуу короого көрүнүш',
      kz: 'Ішкі ландшафтты аулаға көрініс',
      uk: 'Вид у затишне внутрішнє подвір’я',
      en: 'Overlooking manicured landscape gardens',
      zh: '一线正对中央下沉式水景立体园林',
    },
  },
  {
    block: 'В',
    rooms: 2,
    area: 81.31,
    planImage: '/plans/madina/2k-81-31.png',
    windowsView: {
      ru: 'Просторные квадратные спальни и лоджия',
      kg: 'Кенен чарчы уктоочу бөлмөлөр жана лоджия',
      kz: 'Кең шаршы пішінді жатын бөлмелер',
      uk: 'Просторі спальні правильної форми',
      en: 'Spacious square master suites with balcony',
      zh: '正气双主卧套间格局，起居从容大气',
    },
  },
  {
    block: 'В',
    rooms: 2,
    area: 84.09,
    planImage: '/plans/madina/2k-84-09.png',
    windowsView: {
      ru: 'Максимальная площадь 2-комнатных в комплексе',
      kg: 'Комплекстеги 2 бөлмөлүүлөрдүн эң чоң аянты',
      kz: 'Кешендегі ең үлкен 2 бөлмелі пәтер',
      uk: 'Найбільша площа 2-кімнатної квартири в комплексі',
      en: 'Largest 2-bedroom residence in the complex',
      zh: '全项目建筑面积最大奢雅二居室王牌户型',
    },
  },

  // 3-комнатная (Блок Б)
  {
    block: 'Б',
    rooms: 3,
    area: 108.48,
    planImage: '/plans/madina/3k-108-48.png',
    windowsView: {
      ru: 'Флагманская 3-комнатная квартира для большой семьи',
      kg: 'Чоң үй-бүлө үчүн флагмандык 3 бөлмөлүү батир',
      kz: 'Үлкен отбасы үшін флагмандық 3 бөлмелі пәтер',
      uk: 'Флагманська 3-кімнатна квартира для родини',
      en: 'Flagship family suite with 3 bedrooms & master bath',
      zh: '家族典藏大三居：三卧朝阳双卫全维阔景天幕',
    },
  },
];

// Генератор квартир для проектов с разбивкой по корпусам
function generateProjectApartments(projectSlug: string, floorsCount: number, pricePerMeter: number): Apartment[] {
  const list: Apartment[] = [];
  let aptNum = 1;

  for (let floor = 2; floor <= floorsCount; floor++) {
    if (projectSlug === 'abu-dhabi') {
      const blockALayouts = ABU_DHABI_LAYOUTS.filter((l) => l.block === 'А');
      const blockBLayouts = ABU_DHABI_LAYOUTS.filter((l) => l.block === 'Б');

      // Блок А (4 квартиры на этаже)
      for (let i = 0; i < 4; i++) {
        const layout = blockALayouts[i % blockALayouts.length];
        const statusSeed = (floor * 13 + i * 29 + aptNum * 7) % 100;
        let status: 'free' | 'reserved' | 'sold' = 'free';
        if (floor <= 3 && statusSeed < 70) status = 'sold';
        else if (statusSeed < 35) status = 'sold';
        else if (statusSeed < 55) status = 'reserved';

        list.push({
          id: `abu-a-${aptNum}`,
          number: aptNum,
          floor,
          block: 'А',
          rooms: layout.rooms,
          area: layout.area,
          status,
          pricePerMeter,
          planImage: layout.planImage,
          windowsView: layout.windowsView,
        });
        aptNum++;
      }

      // Блок Б (4 квартиры на этаже)
      for (let i = 0; i < 4; i++) {
        const layout = blockBLayouts[i % blockBLayouts.length];
        const statusSeed = (floor * 19 + i * 17 + aptNum * 11) % 100;
        let status: 'free' | 'reserved' | 'sold' = 'free';
        if (floor <= 4 && statusSeed < 65) status = 'sold';
        else if (statusSeed < 40) status = 'sold';
        else if (statusSeed < 58) status = 'reserved';

        list.push({
          id: `abu-b-${aptNum}`,
          number: aptNum,
          floor,
          block: 'Б',
          rooms: layout.rooms,
          area: layout.area,
          status,
          pricePerMeter,
          planImage: layout.planImage,
          windowsView: layout.windowsView,
        });
        aptNum++;
      }
    } else if (projectSlug === 'madina-residence') {
      const blockALayouts = MADINA_LAYOUTS.filter((l) => l.block === 'А');
      const blockBLayouts = MADINA_LAYOUTS.filter((l) => l.block === 'Б');
      const blockVLayouts = MADINA_LAYOUTS.filter((l) => l.block === 'В');

      // Блок А (4 квартиры на этаже)
      for (let i = 0; i < 4; i++) {
        const layout = blockALayouts[i % blockALayouts.length];
        const statusSeed = (floor * 11 + i * 23 + aptNum) % 100;
        let status: 'free' | 'reserved' | 'sold' = 'free';
        if (statusSeed < 38) status = 'sold';
        else if (statusSeed < 56) status = 'reserved';

        list.push({
          id: `madina-a-${aptNum}`,
          number: aptNum,
          floor,
          block: 'А',
          rooms: layout.rooms,
          area: layout.area,
          status,
          pricePerMeter,
          planImage: layout.planImage,
          windowsView: layout.windowsView,
        });
        aptNum++;
      }

      // Блок Б (4 квартиры на этаже)
      for (let i = 0; i < 4; i++) {
        const layout = blockBLayouts[i % blockBLayouts.length];
        const statusSeed = (floor * 17 + i * 19 + aptNum) % 100;
        let status: 'free' | 'reserved' | 'sold' = 'free';
        if (statusSeed < 35) status = 'sold';
        else if (statusSeed < 54) status = 'reserved';

        list.push({
          id: `madina-b-${aptNum}`,
          number: aptNum,
          floor,
          block: 'Б',
          rooms: layout.rooms,
          area: layout.area,
          status,
          pricePerMeter,
          planImage: layout.planImage,
          windowsView: layout.windowsView,
        });
        aptNum++;
      }

      // Блок В (4 квартиры на этаже)
      for (let i = 0; i < 4; i++) {
        const layout = blockVLayouts[i % blockVLayouts.length];
        const statusSeed = (floor * 29 + i * 7 + aptNum) % 100;
        let status: 'free' | 'reserved' | 'sold' = 'free';
        if (statusSeed < 42) status = 'sold';
        else if (statusSeed < 60) status = 'reserved';

        list.push({
          id: `madina-v-${aptNum}`,
          number: aptNum,
          floor,
          block: 'В',
          rooms: layout.rooms,
          area: layout.area,
          status,
          pricePerMeter,
          planImage: layout.planImage,
          windowsView: layout.windowsView,
        });
        aptNum++;
      }
    } else {
      // Айкол+ (клубный дом)
      const roomConfigs: { rooms: 1 | 2 | 3; area: number }[] = [
        { rooms: 1, area: 44.5 },
        { rooms: 2, area: 68.2 },
        { rooms: 1, area: 48.0 },
        { rooms: 3, area: 92.4 },
      ];

      for (let i = 0; i < 4; i++) {
        const cfg = roomConfigs[i];
        const statusSeed = (floor * 23 + i * 31) % 100;
        let status: 'free' | 'reserved' | 'sold' = 'free';
        if (statusSeed < 45) status = 'sold';
        else if (statusSeed < 62) status = 'reserved';

        list.push({
          id: `ajkolplus-${aptNum}`,
          number: aptNum,
          floor,
          block: '',
          rooms: cfg.rooms,
          area: cfg.area,
          status,
          pricePerMeter,
          planImage: '/projects/Aikolplus.png',
          windowsView: {
            ru: 'Тихий зеленый район Кок-Жар, вид на горы',
            kg: 'Көк-Жар тынч аймагы, тоолор көрүнүшү',
            kz: 'Көк-Жар тыныш ауданы, таулар көрінісі',
            uk: 'Зелений район Кок-Жар, панорама гір',
            en: 'Quiet green Kok-Zhar district, mountain view',
            zh: '科克-扎尔宜居绿色生态区，远眺连绵雪山',
          },
        });
        aptNum++;
      }
    }
  }

  return list;
}

const PROJECTS_DATA: ProjectData[] = [
  {
    slug: 'abu-dhabi',
    name: 'ЖК Abu Dhabi',
    blocks: ['А', 'Б'],
    floorsCount: 14,
    pricePerMeter: 1650,
    apartments: generateProjectApartments('abu-dhabi', 14, 1650),
  },
  {
    slug: 'madina-residence',
    name: 'ЖК Madina Residence',
    blocks: ['А', 'Б', 'В'],
    floorsCount: 14,
    pricePerMeter: 1500,
    apartments: generateProjectApartments('madina-residence', 14, 1500),
  },
  {
    slug: 'ajkol-plus',
    name: 'ЖД Айкол +',
    blocks: [],
    floorsCount: 9,
    pricePerMeter: 1200,
    apartments: generateProjectApartments('ajkol-plus', 9, 1200),
  },
];

const UI_TEXTS: Record<Locale, {
  badge: string;
  title: string;
  desc: string;
  blockPrefix: string;
  roomsFilter: string;
  allRooms: string;
  room1: string;
  room2: string;
  room3: string;
  statusFree: string;
  statusReserved: string;
  statusSold: string;
  floorLabel: string;
  onlyFreeToggle: string;
  modalTitle: string;
  areaLabel: string;
  totalPriceLabel: string;
  firstPayLabel: string;
  monthlyPayLabel: string;
  installmentPeriod: string;
  windowsLabel: string;
  bookWaBtn: string;
  requestCallBtn: string;
  callSuccessTitle: string;
  callSuccessDesc: string;
  formNamePh: string;
  formPhonePh: string;
  quickNote: string;
  layoutPlanLabel: string;
}> = {
  ru: {
    badge: 'ИНТЕРАКТИВНАЯ ШАХМАТКА • EL ORDO GROUP',
    title: 'ОНЛАЙН-ПОДБОР КВАРТИР ПО ЭТАЖАМ',
    desc: 'Реальная интерактивная шахматка свободных квартир с точными квадратурами и 3D-планировками. Нажмите на квартиру для мгновенного расчета 0% рассрочки.',
    blockPrefix: 'Блок',
    roomsFilter: 'Комнатность:',
    allRooms: 'Все квартиры',
    room1: '1-комнатные',
    room2: '2-комнатные',
    room3: '3-комнатные',
    statusFree: 'Свободна',
    statusReserved: 'Бронь',
    statusSold: 'Продана',
    floorLabel: 'этаж',
    onlyFreeToggle: 'Только свободные',
    modalTitle: 'Квартира №',
    areaLabel: 'Площадь:',
    totalPriceLabel: 'Полная стоимость:',
    firstPayLabel: 'Первоначальный взнос (30%):',
    monthlyPayLabel: 'Ежемесячный платеж (0% на 36 мес.):',
    installmentPeriod: 'Прямая рассрочка от застройщика 0% до 36 месяцев без банка',
    windowsLabel: 'Вид из окон:',
    bookWaBtn: 'Забронировать в WhatsApp',
    requestCallBtn: 'Заказать звонок по этой квартире',
    callSuccessTitle: 'Запрос на бронь принят!',
    callSuccessDesc: 'Менеджер отдела продаж свяжется с вами в течение 5 минут с планировкой квартиры.',
    formNamePh: 'Ваше имя',
    formPhonePh: '+996 (700) 00-00-00',
    quickNote: 'Бронирование бесплатное и фиксирует стоимость квадратного метра на 3 дня.',
    layoutPlanLabel: 'Архитектурный 3D-план с расстановкой мебели:',
  },
  kg: {
    badge: 'ИНТЕРАКТИВДҮҮ ШАХМАТКА • EL ORDO GROUP',
    title: 'КАБАТТАР БОЮНЧА БАТИР ТАНДОО',
    desc: 'Чыныгы так квадратуралары жана 3D-пландары менен бош батирлердин шахматкасы. 0% бөлүп төлөө графигин көрүү үчүн батирди басыңыз.',
    blockPrefix: 'Блок',
    roomsFilter: 'Бөлмөлөр:',
    allRooms: 'Бардык батирлер',
    room1: '1 бөлмөлүү',
    room2: '2 бөлмөлүү',
    room3: '3 бөлмөлүү',
    statusFree: 'Бош',
    statusReserved: 'Бронь',
    statusSold: 'Сатылган',
    floorLabel: 'кабат',
    onlyFreeToggle: 'Бошторду гана',
    modalTitle: 'Батир №',
    areaLabel: 'Аянты:',
    totalPriceLabel: 'Жалпы баасы:',
    firstPayLabel: 'Баштапкы төлөм (30%):',
    monthlyPayLabel: 'Ай сайын (36 айга 0%):',
    installmentPeriod: 'Банксыз куруучудан 0% үстөксүз бөлүп төлөө',
    windowsLabel: 'Терезеден көрүнүш:',
    bookWaBtn: 'WhatsApp аркылуу ээлөө',
    requestCallBtn: 'Чалууга заказ берүү',
    callSuccessTitle: 'Табыштама кабыл алынды!',
    callSuccessDesc: 'Сатуу бөлүмү 5 мүнөттө байланышып, планын жөнөтөт.',
    formNamePh: 'Атыңыз',
    formPhonePh: '+996 (700) 00-00-00',
    quickNote: 'Ээлеп коюу акысыз жана бааны 3 күнгө бекитет.',
    layoutPlanLabel: 'Эмеректер менен 3D архитектордук план:',
  },
  kz: {
    badge: 'ИНТЕРАКТИВТІ ШАХМАТКА • EL ORDO GROUP',
    title: 'ҚАБАТТАР БОЙЫНША ПӘТЕР ТАҢДАУ',
    desc: 'Нақты шаршы метрлері мен 3D жоспарлары бар бос пәтерлердің шахматкасы. 0% бөліп төлеу есебін көру үшін пәтерді басыңыз.',
    blockPrefix: 'Блок',
    roomsFilter: 'Бөлмелер:',
    allRooms: 'Барлық пәтерлер',
    room1: '1 бөлмелі',
    room2: '2 бөлмелі',
    room3: '3 бөлмелі',
    statusFree: 'Бос',
    statusReserved: 'Бронь',
    statusSold: 'Сатылды',
    floorLabel: 'қабат',
    onlyFreeToggle: 'Тек бос пәтерлер',
    modalTitle: 'Пәтер №',
    areaLabel: 'Ауданы:',
    totalPriceLabel: 'Жалпы құны:',
    firstPayLabel: 'Бастапқы жарна (30%):',
    monthlyPayLabel: 'Ай сайын (36 айға 0%):',
    installmentPeriod: 'Құрылыс салушыдан банксіз 0% бөліп төлеу',
    windowsLabel: 'Терезе көрінісі:',
    bookWaBtn: 'WhatsApp-та брондау',
    requestCallBtn: 'Қоңырауға тапсырыс беру',
    callSuccessTitle: 'Өтінім қабылданды!',
    callSuccessDesc: 'Менеджер 5 минут ішінде хабарласады.',
    formNamePh: 'Атыңыз',
    formPhonePh: '+996 (700) 00-00-00',
    quickNote: 'Брондау тегін және бағаны 3 күнге бекітеді.',
    layoutPlanLabel: 'Жиһаздары бар 3D сәулет жоспары:',
  },
  uk: {
    badge: 'ІНТЕРАКТИВНА ШАХМАТКА • EL ORDO GROUP',
    title: 'ОНЛАЙН-ПІДБІР КВАРТИР ЗА ПОВЕРХАМИ',
    desc: 'Шахматка з точними плануваннями та площами. Натисніть на квартиру для розрахунку розстрочки 0%.',
    blockPrefix: 'Блок',
    roomsFilter: 'Кімнатність:',
    allRooms: 'Всі квартири',
    room1: '1-кімнатні',
    room2: '2-кімнатні',
    room3: '3-кімнатні',
    statusFree: 'Вільна',
    statusReserved: 'Бронь',
    statusSold: 'Продана',
    floorLabel: 'поверх',
    onlyFreeToggle: 'Тільки вільні',
    modalTitle: 'Квартира №',
    areaLabel: 'Площа:',
    totalPriceLabel: 'Загальна вартість:',
    firstPayLabel: 'Перший внесок (30%):',
    monthlyPayLabel: 'Щомісячний платіж (0% / 36 міс.):',
    installmentPeriod: 'Розстрочка від девелопера 0% без банку',
    windowsLabel: 'Вид із вікон:',
    bookWaBtn: 'Забронювати у WhatsApp',
    requestCallBtn: 'Замовити дзвінок',
    callSuccessTitle: 'Запит прийнято!',
    callSuccessDesc: 'Менеджер зв’яжеться з вами за 5 хвилин.',
    formNamePh: 'Ваше ім’я',
    formPhonePh: '+996 (700) 00-00-00',
    quickNote: 'Бронювання безкоштовне на 3 дні.',
    layoutPlanLabel: 'Архітектурний 3D-план з меблями:',
  },
  en: {
    badge: 'INTERACTIVE FLOOR GRID • EL ORDO GROUP',
    title: 'ONLINE APARTMENT SELECTION GRID',
    desc: 'Real architectural floor grid with exact square meters and 3D floor plans. Click any available apartment to calculate customized 0% installment.',
    blockPrefix: 'Block',
    roomsFilter: 'Bedrooms:',
    allRooms: 'All Units',
    room1: '1-Bedroom',
    room2: '2-Bedroom',
    room3: '3-Bedroom',
    statusFree: 'Available',
    statusReserved: 'Reserved',
    statusSold: 'Sold',
    floorLabel: 'Floor',
    onlyFreeToggle: 'Available Only',
    modalTitle: 'Apartment Unit #',
    areaLabel: 'Total Area:',
    totalPriceLabel: 'Total Price:',
    firstPayLabel: 'Down Payment (30%):',
    monthlyPayLabel: 'Monthly Payment (0% / 36 mo):',
    installmentPeriod: 'Direct zero-interest developer installment without banks',
    windowsLabel: 'Window View:',
    bookWaBtn: 'Reserve via WhatsApp',
    requestCallBtn: 'Request Callback for this Unit',
    callSuccessTitle: 'Reservation Request Received!',
    callSuccessDesc: 'Our sales specialist will reach out within 5 minutes.',
    formNamePh: 'Your Name',
    formPhonePh: '+996 (700) 00-00-00',
    quickNote: 'Reservation is complimentary and locks the price for 3 business days.',
    layoutPlanLabel: 'Architectural 3D floor plan with furniture:',
  },
  zh: {
    badge: '全景交互式在线销控表 • EL ORDO GROUP',
    title: '各楼盘逐层可视化房源选房系统',
    desc: '集成真实户型面积与3D样板规划图，轻点即可测算0%免息分期首付与月供。',
    blockPrefix: '栋',
    roomsFilter: '居室户型：',
    allRooms: '全部户型',
    room1: '一居室',
    room2: '二居室',
    room3: '三居室',
    statusFree: '可售',
    statusReserved: '已预订',
    statusSold: '已售罄',
    floorLabel: '层',
    onlyFreeToggle: '仅显示可售',
    modalTitle: '房源编号 #',
    areaLabel: '建筑面积：',
    totalPriceLabel: '房源参考总价：',
    firstPayLabel: '首期款（30%）：',
    monthlyPayLabel: '预估月供（0%免息 36期）：',
    installmentPeriod: '开发商直签零利息自营分期，无需银行审核',
    windowsLabel: '景观朝向：',
    bookWaBtn: '在 WhatsApp 中一键锁定房源',
    requestCallBtn: '预约该房源专属回电',
    callSuccessTitle: '房源预约申请已受理！',
    callSuccessDesc: '专属置业经理将在5分钟内致电并发送该房源CAD建筑图纸。',
    formNamePh: '您的姓名',
    formPhonePh: '+996 (700) 00-00-00',
    quickNote: '线上锁房享3天优先选房权与签约底价锁定。',
    layoutPlanLabel: '3D室内家具陈设空间规划图：',
  },
};

export default function ShahmatkaPage() {
  const { locale, t: globalT } = useLanguage();
  const currentLang: Locale = normalizeLocale(locale);
  const ui = UI_TEXTS[currentLang] || UI_TEXTS.ru;

  const [activeProjectSlug, setActiveProjectSlug] = useState<string>('abu-dhabi');
  const [activeBlock, setActiveBlock] = useState<string>('Б');
  const [selectedRooms, setSelectedRooms] = useState<'all' | 1 | 2 | 3>('all');
  const [onlyFree, setOnlyFree] = useState<boolean>(false);

  // Модалка выбранной квартиры
  const [activeApartment, setActiveApartment] = useState<Apartment | null>(null);

  // Форма внутри модалки
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('+996 ');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const currentProject = useMemo(() => {
    return PROJECTS_DATA.find((p) => p.slug === activeProjectSlug) || PROJECTS_DATA[0];
  }, [activeProjectSlug]);

  // При смене проекта переключаем блок на первый доступный
  useEffect(() => {
    if (currentProject.blocks.length > 0) {
      if (!currentProject.blocks.includes(activeBlock)) {
        setActiveBlock(currentProject.blocks[0]);
      }
    } else {
      setActiveBlock('');
    }
  }, [currentProject, activeBlock]);

  // Группировка квартир по этажам с учетом Блоков
  const floorsList = useMemo(() => {
    const list: { floor: number; apts: Apartment[] }[] = [];
    for (let f = currentProject.floorsCount; f >= 2; f--) {
      let fApts = currentProject.apartments.filter((a) => a.floor === f);

      if (currentProject.blocks.length > 0 && activeBlock) {
        fApts = fApts.filter((a) => a.block === activeBlock);
      }
      if (selectedRooms !== 'all') {
        fApts = fApts.filter((a) => a.rooms === selectedRooms);
      }
      if (onlyFree) {
        fApts = fApts.filter((a) => a.status === 'free');
      }

      list.push({ floor: f, apts: fApts });
    }
    return list;
  }, [currentProject, activeBlock, selectedRooms, onlyFree]);

  // Статистика проекта
  const stats = useMemo(() => {
    let pool = currentProject.apartments;
    if (currentProject.blocks.length > 0 && activeBlock) {
      pool = pool.filter((a) => a.block === activeBlock);
    }
    const total = pool.length;
    const free = pool.filter((a) => a.status === 'free').length;
    const reserved = pool.filter((a) => a.status === 'reserved').length;
    const sold = pool.filter((a) => a.status === 'sold').length;
    return { total, free, reserved, sold };
  }, [currentProject, activeBlock]);

  // Закрытие по ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveApartment(null);
    };
    if (activeApartment) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeApartment]);

  // Отправка заявки на бронирование
  const handleAptLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApartment || formSubmitting) return;

    setFormSubmitting(true);
    try {
      const blockStr = activeApartment.block ? ` (${ui.blockPrefix} ${activeApartment.block})` : '';
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName.trim() || 'Потенциальный покупатель',
          phone: formPhone,
          project: `${currentProject.name}${blockStr} — Квартира №${activeApartment.number} (${activeApartment.area} м², ${activeApartment.floor} эт.)`,
          goal: `Бронь квартиры №${activeApartment.number} по шахматке`,
          lang: currentLang,
          source: 'ShahmatkaPage',
          utm: getStoredUtm(),
          createdAt: new Date().toISOString(),
        }),
      });

      try {
        reachGoal('lead_submit');
      } catch {}

      trackLeadSubmit(`Бронь кв. №${activeApartment.number}`, currentProject.name);
      setFormSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleWhatsAppBooking = () => {
    if (!activeApartment) return;
    try {
      reachGoal('wa_click');
    } catch {}
    trackWhatsAppClick('shahmatka_booking', currentProject.name);

    const blockStr = activeApartment.block ? ` (${ui.blockPrefix} «${activeApartment.block}»)` : '';
    const text = encodeURIComponent(
      `Здравствуйте! Меня интересует бронирование по шахматке:\n\n• Объект: ${currentProject.name}${blockStr}\n• Квартира №${activeApartment.number}\n• Этаж: ${activeApartment.floor} из ${currentProject.floorsCount}\n• Комнат: ${activeApartment.rooms}-комнатная\n• Площадь: ${activeApartment.area} м²\n\nОтправьте, пожалуйста, точную планировку и график рассрочки 0%.`
    );
    window.open(`https://wa.me/996709115115?text=${text}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200 pb-20">
      
      {/* Хлебные крошки */}
      <div className="bg-white dark:bg-[#0b1b15] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
            {globalT.common?.home || 'Главная'}
          </Link>
          <span>/</span>
          <span className="text-[#064734] dark:text-[#d4b26f] font-semibold">
            {ui.title}
          </span>
        </div>
      </div>

      {/* Hero-баннер */}
      <section className="bg-[#064734] text-white py-14 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {ui.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-3">
            {ui.title}
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            {ui.desc}
          </p>

          {/* Легенда статусов квартир */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-emerald-500 shadow-sm" />
              <span>{ui.statusFree} ({stats.free})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-amber-400 shadow-sm" />
              <span>{ui.statusReserved} ({stats.reserved})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-neutral-600/70 shadow-sm" />
              <span>{ui.statusSold} ({stats.sold})</span>
            </div>
          </div>
        </div>
      </section>

      {/* Панель фильтров: Выбор ЖК, Блока, Комнатности */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-4">
        
        {/* Выбор ЖК */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {PROJECTS_DATA.map((proj) => (
            <button
              key={proj.slug}
              type="button"
              onClick={() => {
                setActiveProjectSlug(proj.slug);
              }}
              className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeProjectSlug === proj.slug
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-md scale-105'
                  : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
              }`}
            >
              <span>{proj.name}</span>
              <span className="ml-2 text-[10px] opacity-75 font-semibold">({proj.pricePerMeter} $/м²)</span>
            </button>
          ))}
        </div>

        {/* Дополнительные фильтры: Переключатель Корпусов/Блоков + Комнатность + Только свободные */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 shadow-sm">
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            
            {/* Переключатель Блоков (А / Б / В) */}
            {currentProject.blocks.length > 0 && (
              <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                {currentProject.blocks.map((blockName) => (
                  <button
                    key={blockName}
                    type="button"
                    onClick={() => setActiveBlock(blockName)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      activeBlock === blockName
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow'
                        : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {ui.blockPrefix} «{blockName}»
                  </button>
                ))}
              </div>
            )}

            {/* Фильтр комнатности */}
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: ui.allRooms },
                { id: 1, label: ui.room1 },
                { id: 2, label: ui.room2 },
                { id: 3, label: ui.room3 },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRooms(r.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedRooms === r.id
                      ? 'bg-[#064734] text-white dark:bg-[#d4b26f] dark:text-[#064734]'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyFree}
              onChange={(e) => setOnlyFree(e.target.checked)}
              className="w-4 h-4 rounded text-[#064734] focus:ring-[#d4b26f] accent-[#064734]"
            />
            <span>{ui.onlyFreeToggle}</span>
          </label>
        </div>

      </div>

      {/* ИНТЕРАКТИВНАЯ СЕТКА КВАРТИР */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white dark:bg-[#0b1b15] rounded-3xl border border-gray-200 dark:border-white/10 p-4 sm:p-6 shadow-sm overflow-x-auto">
          <div className="space-y-3 min-w-[620px]">
            {floorsList.map(({ floor, apts }) => (
              <div key={floor} className="flex items-center gap-3">
                
                {/* Номер этажа */}
                <div className="w-16 sm:w-20 shrink-0 text-right pr-2">
                  <span className="text-xs sm:text-sm font-black text-gray-900 dark:text-white block leading-none">
                    {floor} {ui.floorLabel}
                  </span>
                </div>

                {/* Квартиры на этаже */}
                <div className="flex-1 grid grid-cols-4 gap-2 sm:gap-3">
                  {apts.length > 0 ? (
                    apts.map((apt) => {
                      const isFree = apt.status === 'free';
                      const isReserved = apt.status === 'reserved';
                      const isSold = apt.status === 'sold';

                      return (
                        <button
                          key={apt.id}
                          type="button"
                          disabled={isSold}
                          onClick={() => {
                            setActiveApartment(apt);
                            setFormSuccess(false);
                          }}
                          className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-200 relative group flex flex-col justify-between ${
                            isFree
                              ? 'bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 hover:border-emerald-600 hover:shadow-md cursor-pointer hover:scale-[1.02]'
                              : isReserved
                              ? 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 hover:border-amber-500 cursor-pointer'
                              : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/5 opacity-40 cursor-not-allowed text-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-black text-gray-950 dark:text-white">
                              №{apt.number}
                            </span>
                            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                              isFree
                                ? 'bg-emerald-600 text-white'
                                : isReserved
                                ? 'bg-amber-500 text-white'
                                : 'bg-gray-400 text-white'
                            }`}>
                              {apt.rooms}-к
                            </span>
                          </div>

                          <div className="flex items-baseline justify-between text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                            <span>{apt.area} м²</span>
                            {isFree && (
                              <span className="text-[#064734] dark:text-[#d4b26f] font-black text-[10px]">
                                ${(apt.area * apt.pricePerMeter).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="col-span-4 py-2 text-center text-xs text-gray-400 dark:text-neutral-500 italic">
                      Нет подходящих квартир на этом этаже по текущему фильтру
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* МОДАЛЬНАЯ КАРТОЧКА С 3D-ПЛАНИРОВКОЙ И РАСЧЕТОМ */}
      {activeApartment && (() => {
        const totalPrice = Math.round(activeApartment.area * activeApartment.pricePerMeter);
        const downPayment = Math.round(totalPrice * 0.3); // 30% взнос
        const monthlyPayment = Math.round((totalPrice - downPayment) / 36); // на 36 месяцев
        const blockText = activeApartment.block ? ` • ${ui.blockPrefix} «${activeApartment.block}»` : '';

        return (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
            onClick={() => setActiveApartment(null)}
          >
            <div
              className="bg-white dark:bg-[#0b1b15] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/20 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Шапка модалки */}
              <div className="p-5 sm:px-6 bg-[#064734] text-white flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block">
                    {currentProject.name}{blockText}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black">
                    {ui.modalTitle}{activeApartment.number} • {activeApartment.rooms}-комнатная ({activeApartment.floor} {ui.floorLabel})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveApartment(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Тело модалки */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[82vh]">
                
                {/* 3D-планировка квартиры */}
                <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/5 text-center">
                  <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-3 uppercase tracking-wider">
                    {ui.layoutPlanLabel}
                  </span>
                  <div className="relative w-full h-56 sm:h-64 flex items-center justify-center">
                    <Image
                      src={activeApartment.planImage}
                      alt={`Планировка квартиры ${activeApartment.number}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                </div>

                {/* Расчет стоимости и рассрочки */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <span className="text-[10px] text-gray-400 block mb-0.5">{ui.areaLabel}</span>
                    <strong className="text-base font-black text-gray-900 dark:text-white">
                      {activeApartment.area} м²
                    </strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <span className="text-[10px] text-gray-400 block mb-0.5">{ui.totalPriceLabel}</span>
                    <strong className="text-base font-black text-[#064734] dark:text-[#d4b26f]">
                      ${totalPrice.toLocaleString()}
                    </strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <span className="text-[10px] text-gray-400 block mb-0.5">{ui.firstPayLabel}</span>
                    <strong className="text-base font-black text-emerald-600 dark:text-emerald-400">
                      ${downPayment.toLocaleString()}
                    </strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <span className="text-[10px] text-gray-400 block mb-0.5">{ui.monthlyPayLabel}</span>
                    <strong className="text-base font-black text-[#064734] dark:text-[#d4b26f]">
                      ${monthlyPayment.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-2">
                  <IconShieldCheck className="w-5 h-5 shrink-0" />
                  <span>{ui.installmentPeriod}</span>
                </div>

                <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong>{ui.windowsLabel}</strong> {activeApartment.windowsView[currentLang] || activeApartment.windowsView.ru}</p>
                  <p className="text-[11px] text-gray-400">{ui.quickNote}</p>
                </div>

                {/* Действия: WhatsApp или заявка на звонок */}
                {formSuccess ? (
                  <div className="p-4 rounded-2xl bg-emerald-600 text-white text-center animate-fadeIn">
                    <h4 className="font-black text-sm uppercase mb-1">{ui.callSuccessTitle}</h4>
                    <p className="text-xs text-emerald-100">{ui.callSuccessDesc}</p>
                  </div>
                ) : (
                  <form onSubmit={handleAptLead} className="space-y-3 pt-2 border-t border-gray-100 dark:border-white/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder={ui.formNamePh}
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#064734]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder={ui.formPhonePh}
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#064734]"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={handleWhatsAppBooking}
                        className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow transition-all"
                      >
                        <IconWhatsApp className="w-4 h-4" />
                        <span>{ui.bookWaBtn}</span>
                      </button>

                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] hover:text-white dark:text-[#064734] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow transition-all"
                      >
                        <IconPhone className="w-3.5 h-3.5" />
                        <span>{formSubmitting ? '...' : ui.requestCallBtn}</span>
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>
          </div>
        );
      })()}

    </main>
  );
}