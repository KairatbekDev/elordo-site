'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import {
  IconCheck,
  IconCalendar,
  IconArrowRight,
} from '@/components/Icons';

// =========================================================================
// 📹 YOUTUBE-ССЫЛКИ ДЛЯ ВСЕХ 6 ОБЪЕКТОВ
// Вставляйте сюда ссылки в любом формате (обычные, youtu.be, shorts или embed)
// =========================================================================
export const PROJECT_VIDEOS = {
  // 1. ЖК Abu Dhabi (Строящийся)
  abuDhabi: {
    latest: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Август 2026 (Главное видео)
    jul2026: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Июль 2026
    jun2026: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Июнь 2026
    may2026: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Май 2026
    apr2026: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Апрель 2026
    nov2025: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Ноябрь 2025 (Фундамент)
  },

  // 2. ЖК Madina Residence (Строящийся)
  madina: {
    latest: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Август 2026 (Главное видео)
    jun2026: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Июнь 2026
    may2026: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Май 2026
    mar2026: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Март 2026
  },

  // 3. ЖД Айкол + (Строящийся)
  ajkolPlus: {
    latest: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Июль 2026 (Главное видео)
    may2026: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Май 2026
    mar2026: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Март 2026
  },

  // 4. ЖД Айкол (СДАН)
  ajkol: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Финальный видеообзор сданного дома

  // 5. ЖК Келечек (СДАН)
  kelechek: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Видеообзор заселенного комплекса

  // 6. КД Ордо (СДАН)
  ordo: 'https://youtu.be/BfY6nA076Zo', // Румтур и видеообзор клубного дома
};

export interface VideoReport {
  id: string;
  date: Record<Locale, string>;
  stage: Record<Locale, string>;
  progress: number;
  thumbnail: string;
  videoUrl: string;
  videoDuration: string;
  description?: Record<Locale, string>;
}

interface ProgressBreakdown {
  label: Record<Locale, string>;
  percent: number;
}

interface ReportItem {
  id: string;
  projectSlug: string;
  projectName: string;
  isFinished?: boolean;
  image: string;
  workersOnSite: number;
  cranesOnSite: number;
  pacePerMonth: Record<Locale, string>;
  breakdown: ProgressBreakdown[];
  desc: Record<Locale, string>;
  points: Record<Locale, string[]>;
  videoArchive: VideoReport[];
}

function formatVideoSource(url: string) {
  if (!url) return { isDirectVideo: false, src: '' };

  const isDirectVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.startsWith('/videos/');

  if (isDirectVideo) {
    return { isDirectVideo: true, src: url };
  }

  let embedUrl = url;

  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split(/[?#&]/)[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('watch?v=')) {
    const videoId = url.split('watch?v=')[1]?.split(/[?#&]/)[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtube.com/shorts/')) {
    const videoId = url.split('youtube.com/shorts/')[1]?.split(/[?#&]/)[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  const separator = embedUrl.includes('?') ? '&' : '?';
  embedUrl = `${embedUrl}${separator}autoplay=1&rel=0`;

  return { isDirectVideo: false, src: embedUrl };
}

const REPORTS: ReportItem[] = [
  // 1. ЖК Abu Dhabi (Строящийся — 6 архивных выпусков)
  {
    id: 'rep-abu-dhabi',
    projectSlug: 'abu-dhabi',
    projectName: 'ЖК Abu Dhabi',
    isFinished: false,
    image: '/projects/Abu-Dhabi.png',
    pacePerMonth: {
      ru: '+2.5 этажа / мес.',
      kg: '+2.5 кабат / ай',
      kz: '+2.5 қабат / ай',
      uk: '+2.5 поверхи / міс.',
      en: '+2.5 floors / mo.',
      zh: '+2.5 层 / 每月',
    },
    workersOnSite: 54,
    cranesOnSite: 2,
    breakdown: [
      { label: { ru: 'Монолитный каркас', kg: 'Монолиттик каркас', kz: 'Монолитті қаңқа', uk: 'Монолітний каркас', en: 'Concrete Core', zh: '主体结构' }, percent: 65 },
      { label: { ru: 'Кирпичная кладка', kg: 'Кыш кыноо', kz: 'Кірпіш қалау', uk: 'Цегляна кладка', en: 'Brick Masonry', zh: '红砖砌体' }, percent: 38 },
      { label: { ru: 'Фасадные работы', kg: 'Фасад иштери', kz: 'Қасбет жұмыстары', uk: 'Фасадні роботи', en: 'Façade Insulation', zh: '外墙保温' }, percent: 15 },
      { label: { ru: 'Инженерные сети', kg: 'Инженердик түйүндөр', kz: 'Инженерлік желілер', uk: 'Інженерні мережі', en: 'MEP Engineering', zh: '机电管网' }, percent: 20 },
    ],
    desc: {
      ru: 'Завершена заливка перекрытия 15 этажа в Блоке А. Ведется армирование колонн и пилонов 16 этажа. Параллельно начата кирпичная кладка автоклавным жженым кирпичом на уровнях 7-9 этажей.',
      kg: 'А блогунда 15-кабаттын жабуусун куюу аяктады. 16-кабаттын колонналарын бекемдөө жүрүп жатат. 7-9-кабаттарда кыш коюлууда.',
      kz: 'А блогында 15-қабаттың жабындысын құю аяқталды. 16-қабаттың бағандары арматуралануда.',
      uk: 'Завершено бетонування перекриття 15 поверху в Блоці А. Триває армування колон 16 поверху.',
      en: 'Pouring of the 15th-floor slab in Block A completed. Rebar reinforcement underway for 16th-floor columns.',
      zh: 'A座15层顶板现浇浇筑顺利封顶，全面推进16层立柱钢筋绑扎作业。',
    },
    points: {
      ru: [
        'Залито 480 м³ бетона марки М350 повышенной прочности',
        'Кирпичная кладка внешних стен выполнена на 35%',
        'Проложены стояки вентиляции и канализации до 10 этажа',
      ],
      kg: [
        'М350 үлгүсүндөгү 480 м³ бетон куюлду',
        'Кыш кыноо иштери 35% аткарылды',
        'Вентиляциялык каналдар 10-кабатка чейин тартылды',
      ],
      kz: [
        'М350 маркалы 480 м³ бетон құйылды',
        'Кірпіш қалау 35%-ға орындалды',
        'Желдету құбырлары 10-қабатқа дейін тартылды',
      ],
      uk: [
        'Залито 480 м³ бетону марки М350',
        'Цегляну кладку виконано на 35%',
        'Змонтовано стояки вентиляції до 10 поверху',
      ],
      en: [
        'Poured 480 m³ of grade M350 concrete',
        'Brick masonry completed at 35%',
        'Ventilation shafts installed up to 10th floor',
      ],
      zh: [
        '本月高标号现浇混凝土浇筑累计 480 m³',
        '外立面与室内实心红砖砌体进度达 35%',
        '通风排烟竖向管井管道敷设贯通至第10层',
      ],
    },
    videoArchive: [
      {
        id: 'ad-v-2026-08',
        date: { ru: 'Август 2026', kg: 'Август 2026', kz: 'Тамыз 2026', uk: 'Серпень 2026', en: 'August 2026', zh: '2026年8月' },
        stage: { ru: 'Монолитный каркас 16-го этажа', kg: '16-кабаттын монолити', kz: '16-қабаттың монолиті', uk: 'Моноліт 16 поверху', en: '16th floor concrete core', zh: '第16层现浇混凝土主体施工' },
        progress: 45,
        thumbnail: '/projects/Abu-Dhabi.png',
        videoUrl: PROJECT_VIDEOS.abuDhabi.latest,
        videoDuration: '02:45 • 4K Drone',
        description: {
          ru: 'Свежий облёт с дрона: бетонирование перекрытия 15 этажа и старт 16 этажа, кладка автоклавного кирпича.',
          kg: 'Жаңы дрон видеосу: 15-кабаттын бүтүшү жана 16-кабаттын башталышы.',
          kz: 'Дроннан жаңа бейнебаян: 15-қабаттың аяқталуы және 16-қабаттың басталуы.',
          uk: 'Свіжий обліт з дрона: бетонування 15 поверху та старт 16 поверху.',
          en: 'Fresh 4K drone survey: floor 15 slab poured and 16th floor initiated.',
          zh: '最新无人机全景航拍：15层封顶与16层现浇立柱实景。',
        },
      },
      {
        id: 'ad-v-2026-07',
        date: { ru: 'Июль 2026', kg: 'Июль 2026', kz: 'Шілде 2026', uk: 'Липень 2026', en: 'July 2026', zh: '2026年7月' },
        stage: { ru: 'Монолитный каркас 14-го этажа', kg: '14-кабаттын монолити', kz: '14-қабаттың монолиті', uk: 'Моноліт 14 поверху', en: '14th floor concrete core', zh: '第14层主体结构' },
        progress: 41,
        thumbnail: '/projects/Abu-Dhabi.png',
        videoUrl: PROJECT_VIDEOS.abuDhabi.jul2026,
        videoDuration: '02:30 • 4K Drone',
        description: {
          ru: 'Заливка колонн 14 этажа, армирование перекрытия, подъем поддонов с кирпичом на этажи.',
          kg: '14-кабаттын колонналарын куюу, арматуралоо иштери.',
          kz: '14-қабаттың бағандары құйылды, кірпіштер көтерілді.',
          uk: 'Бетонування колон 14 поверху, армування перекриття.',
          en: '14th floor columns pour, brick pallete hoisting.',
          zh: '14层立柱浇筑与楼面结构施工作业。',
        },
      },
      {
        id: 'ad-v-2026-06',
        date: { ru: 'Июнь 2026', kg: 'Июнь 2026', kz: 'Маусым 2026', uk: 'Червень 2026', en: 'June 2026', zh: '2026年6月' },
        stage: { ru: 'Монолитный каркас 13-го этажа', kg: '13-кабаттын монолити', kz: '13-қабаттың монолиті', uk: 'Моноліт 13 поверху', en: '13th floor framing', zh: '第13层主体框架' },
        progress: 38,
        thumbnail: '/projects/Abu-Dhabi.png',
        videoUrl: PROJECT_VIDEOS.abuDhabi.jun2026,
        videoDuration: '02:15 • 4K Drone',
        description: {
          ru: 'Возведение перекрытий 13 этажа, доставка второй партии арматуры, завоз автоклавного кирпича.',
          kg: '13-кабаттын жабууларын тургузуу, жаңы арматура алып келинди.',
          kz: '13-қабаттың жабындылары, арматура мен кірпіштер жеткізілді.',
          uk: 'Перекриття 13 поверху, завезення арматури та цегли.',
          en: '13th floor construction, rebar delivery and brick distribution.',
          zh: '13层现浇楼板施工，现场物料储备充足。',
        },
      },
      {
        id: 'ad-v-2026-05',
        date: { ru: 'Май 2026', kg: 'Май 2026', kz: 'Мамыр 2026', uk: 'Травень 2026', en: 'May 2026', zh: '2026年5月' },
        stage: { ru: 'Монолитный каркас 11-го этажа', kg: '11-кабаттын монолити', kz: '11-қабаттың монолиті', uk: 'Моноліт 11 поверху', en: '11th floor concrete core', zh: '第11层主体结构' },
        progress: 34,
        thumbnail: '/projects/Abu-Dhabi.png',
        videoUrl: PROJECT_VIDEOS.abuDhabi.may2026,
        videoDuration: '02:40 • 4K Drone',
        description: {
          ru: 'Перекрытие 11 этажа, старт кладочных работ на нижних жилых этажах.',
          kg: '11-кабаттын жабуусу куюлду.',
          kz: '11-қабаттың жабындысы құйылды.',
          uk: 'Перекриття 11 поверху, початок кладки.',
          en: '11th floor slab poured, lower floor masonry starts.',
          zh: '11层顶板浇筑，低楼层砌体启动。',
        },
      },
      {
        id: 'ad-v-2026-04',
        date: { ru: 'Апрель 2026', kg: 'Апрель 2026', kz: 'Сәуір 2026', uk: 'Квітень 2026', en: 'April 2026', zh: '2026年4月' },
        stage: { ru: 'Монолит 9-го этажа и второй кран', kg: '9-кабат жана экинчи кран', kz: '9-қабат және екінші кран', uk: 'Моноліт 9 поверху', en: '9th floor & second crane', zh: '第9层主体结构及第二台塔吊' },
        progress: 30,
        thumbnail: '/projects/Abu-Dhabi.png',
        videoUrl: PROJECT_VIDEOS.abuDhabi.apr2026,
        videoDuration: '03:10 • 4K Drone',
        description: {
          ru: 'Монтаж второго башенного крана для ускорения работ, монолит на уровне 9 этажа.',
          kg: 'Экинчи башендик кран орнотулду, 9-кабаттын курулушу.',
          kz: 'Екінші мұнаралы кран орнатылды, 9-қабаттың құрылысы.',
          uk: 'Монтаж другого баштового крана, моноліт 9 поверху.',
          en: 'Second tower crane operational, core reaches 9th floor.',
          zh: '加装第二台大型工程塔吊，主体高度升至第9层。',
        },
      },
      {
        id: 'ad-v-2025-11',
        date: { ru: 'Ноябрь 2025', kg: 'Ноябрь 2025', kz: 'Қараша 2025', uk: 'Листопад 2025', en: 'November 2025', zh: '2025年11月' },
        stage: { ru: 'Нулевой цикл: фундаментная плита', kg: 'Нөлдүк цикл: фундамент плитасы', kz: 'Нөлдік деңгей: іргетас', uk: 'Фундаментна плита', en: 'Raft foundation & basement', zh: '地下车库与大体积基础筏板' },
        progress: 12,
        thumbnail: '/projects/Abu-Dhabi.png',
        videoUrl: PROJECT_VIDEOS.abuDhabi.nov2025,
        videoDuration: '02:30 • 4K Drone',
        description: {
          ru: 'Непрерывная заливка монолитной фундаментной плиты 1.8 м с тяжелым армированием. Старт проекта.',
          kg: 'Калыңдыгы 1.8 м фундамент куюлду. Курулуштун башталышы.',
          kz: '1.8 м іргетас плитасы құйылды. Жобаның басталуы.',
          uk: 'Заливка масивної фундаментної плити 1.8 м. Початок проєкту.',
          en: 'Continuous 1.8 m raft foundation pour. Project kick-off.',
          zh: '1.8米重型抗震基础筏板连续浇筑，工程破土启幕。',
        },
      },
    ],
  },

  // 2. ЖК Madina Residence (Строящийся — 4 архивных выпуска)
  {
    id: 'rep-madina',
    projectSlug: 'madina-residence',
    projectName: 'ЖК Madina Residence',
    isFinished: false,
    image: '/projects/Madina-Residense.png',
    pacePerMonth: {
      ru: 'Каркас готов на 100%',
      kg: 'Каркас 100% даяр',
      kz: 'Қаңқа 100% дайын',
      uk: 'Каркас готовий на 100%',
      en: 'Core 100% complete',
      zh: '主体结构 100% 封顶',
    },
    workersOnSite: 38,
    cranesOnSite: 1,
    breakdown: [
      { label: { ru: 'Монолитный каркас', kg: 'Монолиттик каркас', kz: 'Монолитті қаңқа', uk: 'Монолітний каркас', en: 'Concrete Core', zh: '主体结构' }, percent: 100 },
      { label: { ru: 'Кирпичная кладка', kg: 'Кыш кыноо', kz: 'Кірпіш қалау', uk: 'Цегляна кладка', en: 'Brick Masonry', zh: '红砖砌体' }, percent: 85 },
      { label: { ru: 'Остекление окон', kg: 'Терезе салуу', kz: 'Терезе орнату', uk: 'Скління вікон', en: 'Window Glazing', zh: '节能系统窗' }, percent: 60 },
      { label: { ru: 'Инженерные сети', kg: 'Инженердик түйүндөр', kz: 'Инженерлік желілер', uk: 'Інженерні мережі', en: 'MEP Engineering', zh: '机电管网' }, percent: 45 },
    ],
    desc: {
      ru: 'Монолитный каркас здания полностью завершен на 100%. Ведутся работы по монтажу энергоэффективных панорамных стеклопакетов на 5-9 этажах, а также разводка внутренних инженерных сетей водоснабжения.',
      kg: 'Имараттын монолиттик каркасы толугу менен аяктады. 5-9-кабаттарда энергияны үнөмдөөчү панорамалык терезелерди орнотуу жүрүүдө.',
      kz: 'Ғимараттың монолитті қаңқасы толық аяқталды. 5-9 қабаттарда панорамалық терезелер орнатылуда.',
      uk: 'Монолітний каркас будинку повністю завершено. Тривають роботи зі скління на 5-9 поверхах.',
      en: 'Structural concrete framework fully finalized. Energy-efficient window installation underway on floors 5-9.',
      zh: '现浇钢筋混凝土主体架构全线封顶。正火热开展5至9层系统窗装配。',
    },
    points: {
      ru: [
        'Монолитный каркас: 100% готовности (все 14 этажей)',
        'Установка алюминиевого профиля окон: 60%',
        'Монтаж электропроводки и освещения в паркинге: 75%',
      ],
      kg: [
        'Монолиттик каркас: 100% даяр',
        'Алюминий терезе профилдерин орнотуу: 60%',
        'Паркингде электр зымдарын тартуу: 75%',
      ],
      kz: [
        'Монолитті қаңқа: 100% дайын',
        'Алюминий терезе профильдерін орнату: 60%',
        'Тұрақта электр желілерін монтаждау: 75%',
      ],
      uk: [
        'Монолітний каркас: 100% готовності',
        'Монтаж алюмінієвого профілю вікон: 60%',
        'Електропроводка в паркінгу: 75%',
      ],
      en: [
        'Concrete structure: 100% completed',
        'Aluminum window profile mounting: 60%',
        'Underground parking electrical wiring: 75%',
      ],
      zh: [
        '主体钢筋混凝土框架结构：100% 完成',
        '高端断桥铝合金系统窗框体安装：60%',
        '地下车库电气强弱电布线：75%',
      ],
    },
    videoArchive: [
      {
        id: 'mr-v-2026-08',
        date: { ru: 'Август 2026', kg: 'Август 2026', kz: 'Тамыз 2026', uk: 'Серпень 2026', en: 'August 2026', zh: '2026年8月' },
        stage: { ru: 'Кладка наружных стен и остекление', kg: 'Тышкы дубалдар жана терезелер', kz: 'Сыртқы қабырғалар және терезелер', uk: 'Стіни та скління', en: 'Exterior walls & glazing', zh: '外立面红砖砌筑与全景系统窗' },
        progress: 72,
        thumbnail: '/projects/Madina-Residense.png',
        videoUrl: PROJECT_VIDEOS.madina.latest,
        videoDuration: '03:10 • 4K Drone',
        description: {
          ru: 'Монтаж оконного профиля на 5-9 этажах, гидроизоляция кровли и разводка внутренних коммуникаций.',
          kg: '5-9-кабаттарда терезелер орнотулууда, чатырдын изоляциясы.',
          kz: '5-9 қабаттарда терезелер орнатылуда, шатыр оқшаулау.',
          uk: 'Монтаж вікон на 5-9 поверхах, гідроізоляція даху.',
          en: 'Glazing on floors 5-9, roof waterproofing in progress.',
          zh: '5-9层系统窗施工中，屋面防水分级推进。',
        },
      },
      {
        id: 'mr-v-2026-06',
        date: { ru: 'Июнь 2026', kg: 'Июнь 2026', kz: 'Маусым 2026', uk: 'Червень 2026', en: 'June 2026', zh: '2026年6月' },
        stage: { ru: 'Завершение кладки и старт окон', kg: 'Кыш кыноонун аякташы', kz: 'Кірпіш қалаудың аяқталуы', uk: 'Завершення кладки', en: 'Masonry wrap-up & windows', zh: '外墙砌体收尾与窗框安装' },
        progress: 66,
        thumbnail: '/projects/Madina-Residense.png',
        videoUrl: PROJECT_VIDEOS.madina.jun2026,
        videoDuration: '02:50 • 4K Drone',
        description: {
          ru: 'Кладка кирпича на 12-14 этажах, поставка алюминиевых оконных конструкций.',
          kg: '12-14-кабаттарда кыш коюу.',
          kz: '12-14 қабаттарда кірпіш қалау.',
          uk: 'Кладка цегли 12-14 поверхи.',
          en: 'Bricklaying on floors 12-14, window supply delivery.',
          zh: '12-14层红砖二次结构砌体收尾。',
        },
      },
      {
        id: 'mr-v-2026-05',
        date: { ru: 'Май 2026', kg: 'Май 2026', kz: 'Мамыр 2026', uk: 'Травень 2026', en: 'May 2026', zh: '2026年5月' },
        stage: { ru: 'Топпинг каркаса (14 этаж)', kg: '14-кабаттын бүтүшү', kz: '14-қабаттың аяқталуы', uk: 'Топпінг каркаса (14 поверх)', en: 'Topping out (14th floor)', zh: '14层主体结构结构封顶' },
        progress: 60,
        thumbnail: '/projects/Madina-Residense.png',
        videoUrl: PROJECT_VIDEOS.madina.may2026,
        videoDuration: '02:40 • 4K Drone',
        description: {
          ru: 'Финальная заливка верхнего технического этажа. Завершение монолитного конструктива дома.',
          kg: 'Жогорку техникалык кабат куюлду. Каркас толук бүттү.',
          kz: 'Үстіңгі техникалық қабат құйылды. Монолит толық аяқталды.',
          uk: 'Фінальне бетонування технічного поверху. Завершення моноліту.',
          en: 'Final pour of top mechanical floor. Structural frame complete.',
          zh: '顶层机房顶板最后一方混凝土浇筑完毕，大楼主体宣告结构封顶。',
        },
      },
      {
        id: 'mr-v-2026-03',
        date: { ru: 'Март 2026', kg: 'Март 2026', kz: 'Наурыз 2026', uk: 'Березень 2026', en: 'March 2026', zh: '2026年3月' },
        stage: { ru: 'Монолитный каркас 11-го этажа', kg: '11-кабаттын монолити', kz: '11-қабаттың монолиті', uk: 'Моноліт 11 поверху', en: '11th floor framing', zh: '第11层结构现浇' },
        progress: 52,
        thumbnail: '/projects/Madina-Residense.png',
        videoUrl: PROJECT_VIDEOS.madina.mar2026,
        videoDuration: '02:20 • 4K Drone',
        description: {
          ru: 'Бетонирование 11 этажа, параллельная кладка кирпича на 4-6 этажах.',
          kg: '11-кабат куюлду.',
          kz: '11-қабат құйылды.',
          uk: 'Бетонування 11 поверху.',
          en: '11th floor framing, bricklaying floors 4-6.',
          zh: '11层主体立柱混凝土浇筑，4-6层红砖砌筑穿插推进。',
        },
      },
    ],
  },

  // 3. ЖД Айкол + (Строящийся — 3 архивных выпуска)
  {
    id: 'rep-ajkol-plus',
    projectSlug: 'ajkol-plus',
    projectName: 'ЖД Айкол +',
    isFinished: false,
    image: '/projects/Aikolplus.png',
    pacePerMonth: {
      ru: '+2 этажа / мес.',
      kg: '+2 кабат / ай',
      kz: '+2 қабат / ай',
      uk: '+2 поверхи / міс.',
      en: '+2 floors / mo.',
      zh: '+2 层 / 每月',
    },
    workersOnSite: 29,
    cranesOnSite: 1,
    breakdown: [
      { label: { ru: 'Монолитный каркас', kg: 'Монолиттик каркас', kz: 'Монолитті қаңқа', uk: 'Монолітний каркас', en: 'Concrete Core', zh: '主体结构' }, percent: 75 },
      { label: { ru: 'Кирпичная кладка', kg: 'Кыш кыноо', kz: 'Кірпіш қалау', uk: 'Цегляна кладка', en: 'Brick Masonry', zh: '红砖砌体' }, percent: 55 },
      { label: { ru: 'Кровельные работы', kg: 'Чатыр иштери', kz: 'Шатыр жұмыстары', uk: 'Покрівельні роботи', en: 'Roofing', zh: '屋面防水' }, percent: 20 },
      { label: { ru: 'Инженерные сети', kg: 'Инженердик түйүндөр', kz: 'Инженерлік желілер', uk: 'Інженерні мережі', en: 'MEP Engineering', zh: '机电管网' }, percent: 25 },
    ],
    desc: {
      ru: 'В экологическом районе Кок-Жар ведутся активные монолитные работы. Завершена гидроизоляция подземного паркинга. Качество бетона прошло лабораторный контроль на прочность.',
      kg: 'Көк-Жар экологиялык аймагында монолиттик курулуш жүрүп жатат. Жер астындагы паркингдин гидроизоляциясы аяктады.',
      kz: 'Көк-Жар экологиялық ауданында монолитті жұмыстар қызу жүруде.',
      uk: 'У передгірному районі Кок-Жар тривають активні монолітні роботи.',
      en: 'Active construction in the scenic Kok-Zhar foothills. Basement waterproofing complete.',
      zh: '南部生态麓区阔景洋房施工作业快速平稳推进。双层地下停车场防水施工完毕。',
    },
    points: {
      ru: [
        'Сейсмоустойчивый фундамент: 100% готовности',
        'Монтаж вентилируемого фасада: этап подготовки',
        'Укладка шумоизоляционных плит между этажами',
      ],
      kg: [
        'Сейсмотуруктуу фундамент: 100%',
        'Желдетилүүчү фасадды монтаждоо: даярдык',
        'Кабаттар аралык үн өткөрбөөчү плиталар',
      ],
      kz: [
        'Сейсмотөзімді іргетас: 100%',
        'Желдетілетін қасбетті монтаждау: дайындық',
        'Қабаттар арасындағы шу оқшаулағыш плиталар',
      ],
      uk: [
        'Сейсмостійкий фундамент: 100%',
        'Монтаж вентильованого фасаду: підготовка',
        'Шумоізоляційні мембрани між поверхами',
      ],
      en: [
        'Seismic-resistant foundation: 100%',
        'Ventilated facade mounting: preparatory phase',
        'Acoustic insulation between floors',
      ],
      zh: [
        '9度抗震箱型坚固整体基础：100% 达成',
        '干挂石材与金属复合幕墙骨架施工准备中',
        '全楼层铺设环保级高分子隔音降噪垫层',
      ],
    },
    videoArchive: [
      {
        id: 'ap-v-2026-07',
        date: { ru: 'Июль 2026', kg: 'Июль 2026', kz: 'Шілде 2026', uk: 'Липень 2026', en: 'July 2026', zh: '2026年7月' },
        stage: { ru: 'Возведение 7-го этажа клубного дома', kg: '7-кабатты тургузуу', kz: '7-қабатты тұрғызу', uk: 'Зведення 7-го поверху', en: 'Construction of 7th floor', zh: '低密纯洋房第7层主体施工' },
        progress: 58,
        thumbnail: '/projects/Aikolplus.png',
        videoUrl: PROJECT_VIDEOS.ajkolPlus.latest,
        videoDuration: '02:15 • 4K Drone',
        description: {
          ru: 'Армирование колонн 7 этажа, гидроизоляция стен паркинга, доставка кирпича.',
          kg: '7-кабаттын колонналарын арматуралоо.',
          kz: '7-қабаттың бағандарын арматуралау.',
          uk: 'Армування колон 7 поверху.',
          en: '7th floor columns reinforcement, basement waterproofing.',
          zh: '7层柱筋绑扎，地下车库防水防潮工程全验合格。',
        },
      },
      {
        id: 'ap-v-2026-05',
        date: { ru: 'Май 2026', kg: 'Май 2026', kz: 'Мамыр 2026', uk: 'Травень 2026', en: 'May 2026', zh: '2026年5月' },
        stage: { ru: 'Монолитный каркас 5-го этажа', kg: '5-кабаттын монолити', kz: '5-қабаттың монолиті', uk: 'Моноліт 5 поверху', en: '5th floor framing', zh: '第5层主体框架' },
        progress: 49,
        thumbnail: '/projects/Aikolplus.png',
        videoUrl: PROJECT_VIDEOS.ajkolPlus.may2026,
        videoDuration: '02:05 • 4K Drone',
        description: {
          ru: 'Бетонирование перекрытия 5 этажа, укладка шумоизоляционных мембран.',
          kg: '5-кабат куюлду.',
          kz: '5-қабат құйылды.',
          uk: 'Бетонування перекриття 5 поверху.',
          en: '5th floor slab concrete pour, sound insulation sheets layout.',
          zh: '5层楼板浇筑，铺设高分子隔音垫层。',
        },
      },
      {
        id: 'ap-v-2026-03',
        date: { ru: 'Март 2026', kg: 'Март 2026', kz: 'Наурыз 2026', uk: 'Березень 2026', en: 'March 2026', zh: '2026年3月' },
        stage: { ru: 'Цоколь и 2-й этаж', kg: 'Цоколь жана 2-кабат', kz: 'Цоколь және 2-қабат', uk: 'Цоколь та 2 поверх', en: 'Podium & 2nd floor', zh: '架空层及第2层' },
        progress: 35,
        thumbnail: '/projects/Aikolplus.png',
        videoUrl: PROJECT_VIDEOS.ajkolPlus.mar2026,
        videoDuration: '02:30 • 4K Drone',
        description: {
          ru: 'Выход здания из нулевого цикла, возведение стен подземного паркинга.',
          kg: 'Имарат нөлдүк циклден чыкты.',
          kz: 'Нөлдік деңгейден шығу.',
          uk: 'Вихід з нульового циклу.',
          en: 'Substructure finished, 2nd floor core erection starts.',
          zh: '地下室及地上一层顺利出地面。',
        },
      },
    ],
  },

  // 4. ЖД Айкол (СДАН)
  {
    id: 'rep-ajkol',
    projectSlug: 'ajkol',
    projectName: 'ЖД Айкол',
    isFinished: true,
    image: '/projects/ajkol.png',
    pacePerMonth: { ru: 'Объект заселен', kg: 'Эл жашайт', kz: 'Қоныстанған', uk: 'Заселений', en: '100% Delivered', zh: '100% 入住' },
    workersOnSite: 0,
    cranesOnSite: 0,
    breakdown: [
      { label: { ru: 'Монолитный каркас', kg: 'Монолиттик каркас', kz: 'Монолитті қаңқа', uk: 'Монолітний каркас', en: 'Concrete Core', zh: '主体结构' }, percent: 100 },
      { label: { ru: 'Кирпичные стены', kg: 'Кыш дубалдар', kz: 'Кірпіш қабырғалар', uk: 'Цегляні стіни', en: 'Brick Walls', zh: '红砖砌体' }, percent: 100 },
      { label: { ru: 'Остекление и фасад', kg: 'Терезе жана фасад', kz: 'Шынылау және қасбет', uk: 'Скління та фасад', en: 'Façade & Windows', zh: '系统窗与幕墙' }, percent: 100 },
      { label: { ru: 'Внутренние сети', kg: 'Ички түйүндөр', kz: 'Ішкі желілер', uk: 'Внутрішні мережі', en: 'Utilities & MEP', zh: '室内工程管网' }, percent: 100 },
    ],
    desc: {
      ru: 'Объект полностью сдан в эксплуатацию и заселен жильцами. Завершены все строительные и отделочные работы, благоустроен внутренний двор.',
      kg: 'Объект толугу менен пайдаланууга берилген жана жашоочулар жайгашкан. Короо көрктөндүрүлдү.',
      kz: 'Нысан толық пайдалануға берілген және тұрғындар қоныстанған. Аула абаттандырылды.',
      uk: 'Об’єкт повністю зданий в експлуатацію та заселений мешканцями. Впорядковано подвір’я.',
      en: 'The project is fully commissioned and occupied by residents. All construction is complete.',
      zh: '项目已全面竣工验收并顺利交付业主入住。全套施工圆满收官。',
    },
    points: {
      ru: [
        '100% готовность и успешная сдача Госкомиссии',
        'Выданы государственные техпаспорта собственникам',
        'Дом полностью подключен ко всем городским коммуникациям',
      ],
      kg: [
        '100% даярдык жана Мамкомиссияга ийгиликтүү тапшыруу',
        'Ээлерине мамлекеттик техпаспорттор берилген',
        'Үй бардык коммуникацияларга толук кошулган',
      ],
      kz: [
        '100% дайындық және Мемкомиссияға сәтті тапсырылу',
        'Тұрғындарға мемлекеттік техпаспорттар табысталды',
        'Үй барлық желілерге толықтай қосылған',
      ],
      uk: [
        '100% готовність та успішне здавання Держкомісії',
        'Видано державні техпаспорти власникам',
        'Будинок повністю підключений до всіх інженерних мереж',
      ],
      en: [
        '100% completion & positive State Commission acceptance',
        'Official state property titles issued to owners',
        'Building fully connected to all municipal utility networks',
      ],
      zh: [
        '100% 通过国家工程综合质检验收',
        '全盘住户均已取得国家不动产权属凭据',
        '全套市政管网通畅运行',
      ],
    },
    videoArchive: [
      {
        id: 'ajkol-v-final',
        date: { ru: 'Сдан в эксплуатацию', kg: 'Пайдаланууга берилген', kz: 'Тапсырылған', uk: 'Введений в експлуатацію', en: 'Delivered', zh: '已交付入住' },
        stage: { ru: 'Финальный видеообзор сданного дома', kg: 'Бүткөн үйдүн видеосу', kz: 'Аяқталған үйдің бейнебаяны', uk: 'Фінальний відеоогляд зданого будинку', en: 'Delivered Project Tour', zh: '竣工实景视频巡礼' },
        progress: 100,
        thumbnail: '/projects/ajkol.png',
        videoUrl: PROJECT_VIDEOS.ajkol,
        videoDuration: '02:45 • 4K Обзор',
        description: {
          ru: 'Итоговый видеообзор заселенного жилого дома «Айкол»: готовые квартиры, подключенные коммуникации и благоустроенный двор.',
          kg: '«Айкол» үйүнүн видео баяны: жашоого даяр батирлер жана көрктөндүрүлгөн короо.',
          kz: '«Айкол» кешенінің қорытынды бейнебаяны: дайын пәтерлер мен абаттандырылған аула.',
          uk: 'Підсумковий відеоогляд будинку «Айкол»: готові квартири та облаштоване подвір’я.',
          en: 'Final tour of delivered Aykol house: turnkey spaces, working utilities, landscaped courtyard.',
          zh: '艾科尔已交付实景全貌：成熟社区氛围、通畅运行管网与宜居绿化庭院。',
        },
      },
    ],
  },

  // 5. ЖК Келечек (СДАН)
  {
    id: 'rep-kelechek',
    projectSlug: 'kelechek',
    projectName: 'ЖК Келечек',
    isFinished: true,
    image: '/projects/Kelechek.png',
    pacePerMonth: { ru: 'Объект заселен', kg: 'Эл жашайт', kz: 'Қоныстанған', uk: 'Заселений', en: '100% Delivered', zh: '100% 入住' },
    workersOnSite: 0,
    cranesOnSite: 0,
    breakdown: [
      { label: { ru: 'Монолитный каркас', kg: 'Монолиттик каркас', kz: 'Монолитті қаңқа', uk: 'Монолітний каркас', en: 'Concrete Core', zh: '主体结构' }, percent: 100 },
      { label: { ru: 'Кирпичная кладка', kg: 'Кыш кыноо', kz: 'Кірпіш қалау', uk: 'Цегляна кладка', en: 'Brick Masonry', zh: '红砖砌体' }, percent: 100 },
      { label: { ru: 'Инженерные сети', kg: 'Инженердик түйүндөр', kz: 'Инженерлік желілер', uk: 'Інженерні мережі', en: 'MEP Engineering', zh: '机电管网' }, percent: 100 },
      { label: { ru: 'Благоустройство двора', kg: 'Короону көрктөндүрүү', kz: 'Ауланы абаттандыру', uk: 'Благоустрій двору', en: 'Courtyard & Playgrounds', zh: '园林与配套设施' }, percent: 100 },
    ],
    desc: {
      ru: 'Успешно завершенный и заселенный жилой комплекс от EL ORDO GROUP. Все инженерные сети подключены к городским магистралям, жильцы получили государственные техпаспорта на квартиры.',
      kg: 'EL ORDO GROUP тарабынан ийгиликтүү аяктаган жана эл жашаган турак жай комплекси.',
      kz: 'EL ORDO GROUP компаниясының сәтті аяқталған және қоныстанған тұрғын үй кешені.',
      uk: 'Успішно завершений та заселений житловий комплекс від EL ORDO GROUP.',
      en: 'Successfully completed, commissioned, and resident-occupied complex by EL ORDO GROUP.',
      zh: 'EL ORDO GROUP 成功打造并全盘交付入驻的成熟社区。',
    },
    points: {
      ru: [
        '100% готовность и успешная сдача Госкомиссии',
        'Выданы государственные техпаспорта собственникам',
        'Функционирует закрытый двор и детская площадка',
      ],
      kg: [
        '100% даярдык жана Мамкомиссияга ийгиликтүү тапшыруу',
        'Ээлерине мамлекеттик техпаспорттор берилген',
        'Жабык короо жана балдар аянтчасы иштеп жатат',
      ],
      kz: [
        '100% дайындық және Мемкомиссияға сәтті тапсырылу',
        'Тұрғындарға мемлекеттік техпаспорттар табысталды',
        'Жабық аула және балалар алаңы толықтай жұмыс істейді',
      ],
      uk: [
        '100% готовність та успішне здавання Держкомісії',
        'Видано державні техпаспорти власникам',
        'Функціонує закритий двір та дитячий майданчик',
      ],
      en: [
        '100% completion & positive State Commission acceptance',
        'Official state property titles issued to owners',
        'Private gated courtyard in full operation',
      ],
      zh: [
        '100% 通过国家工程综合质检验收',
        '全盘住户均已取得国家不动产权属凭据',
        '封闭式门禁与儿童乐园全面运营',
      ],
    },
    videoArchive: [
      {
        id: 'kelechek-v-final',
        date: { ru: 'Сдан в эксплуатацию', kg: 'Пайдаланууга берилген', kz: 'Тапсырылған', uk: 'Введений в експлуатацію', en: 'Delivered', zh: '已交付入住' },
        stage: { ru: 'Финальный видеообзор готового ЖК', kg: 'Даяр ЖК видеосу', kz: 'Дайын ТК бейнебаяны', uk: 'Фінальний відеоогляд готового ЖК', en: 'Delivered Complex Tour', zh: '交付实景视频巡礼' },
        progress: 100,
        thumbnail: '/projects/Kelechek.png',
        videoUrl: PROJECT_VIDEOS.kelechek,
        videoDuration: '03:10 • 4K Обзор',
        description: {
          ru: 'Видеообзор заселенного жилого комплекса «Келечек»: готовые секции, закрытый благоустроенный двор и детская площадка.',
          kg: '«Келечек» турак жай комплексинин видеосу: архитектурасы жана жабык короосу.',
          kz: '«Келешек» тұрғын үй кешенінің бейнебаяны: сәулеті мен жабық ауласы.',
          uk: 'Відеоогляд житлового комплексу «Келечек»: архітектура, закрите подвір’я та дитячий майданчик.',
          en: 'Video tour of occupied Kelechek residential complex: modern architecture, private courtyard and amenities.',
          zh: '克勒切克成熟交付社区实录：立面风貌、人车分流内院与儿童游乐配套。',
        },
      },
    ],
  },

  // 6. КД Ордо (СДАН)
  {
    id: 'rep-ordo',
    projectSlug: 'ordo',
    projectName: 'КД Ордо',
    isFinished: true,
    image: '/projects/Ordo.png',
    pacePerMonth: { ru: 'Объект заселен', kg: 'Эл жашайт', kz: 'Қоныстанған', uk: 'Заселений', en: '100% Delivered', zh: '100% 入住' },
    workersOnSite: 0,
    cranesOnSite: 0,
    breakdown: [
      { label: { ru: 'Монолитный каркас', kg: 'Монолиттик каркас', kz: 'Монолитті қаңқа', uk: 'Монолітний каркас', en: 'Concrete Core', zh: '主体结构' }, percent: 100 },
      { label: { ru: 'Фасад из натурального камня', kg: 'Табигый таштан фасад', kz: 'Табиғи тастан қасбет', uk: 'Фасад із натурального каменю', en: 'Natural Stone Façade', zh: '进口天然石材幕墙' }, percent: 100 },
      { label: { ru: 'Газовая котельная', kg: 'Газ отказаны', kz: 'Газ қазандығы', uk: 'Газова котельня', en: 'Gas Heating Plant', zh: '独立燃气供热站' }, percent: 100 },
      { label: { ru: 'Подземный паркинг', kg: 'Жер астындагы паркинг', kz: 'Жерасты автотұрағы', uk: 'Підземний паркінг', en: 'Basement Parking', zh: '智能地下车库' }, percent: 100 },
    ],
    desc: {
      ru: 'Первый знаковый клубный дом компании EL ORDO GROUP. Авторский фасад из гранита и травертина, собственная газовая котельная, панорамные виды на горы Ала-Тоо и полная приватность жильцов.',
      kg: 'EL ORDO GROUP компаниясынын алгачкы бүткөрүлгөн клубдук үйү.',
      kz: 'EL ORDO GROUP компаниясының алғашқы жүзеге асырылған клубтық үйі.',
      uk: 'Перший реалізований клубний будинок компанії EL ORDO GROUP.',
      en: 'The hallmark boutique club house completed by EL ORDO GROUP.',
      zh: 'EL ORDO GROUP 打造的首部标志性低密纯洋房。',
    },
    points: {
      ru: [
        '100% объект сдан и заселен резидентами',
        'Фасад облицован натуральным гранитом и травертином',
        'Автономное отопление и круглосуточная охрана работают 24/7',
      ],
      kg: [
        '100% объект тапшырылган жана тургундар жашайт',
        'Фасад табигый гранит жана травертин менен капталган',
        'Автономдук жылытуу жана 24/7 кайтаруу иштеп жатат',
      ],
      kz: [
        '100% нысан тапсырылып, тұрғындар қоныстанды',
        'Қасбет табиғи гранит пен травертинмен қапталған',
        'Автономды жылыту және тәулік бойғы күзет 24/7 жұмыс істейді',
      ],
      uk: [
        '100% об’єкт зданий та заселений резидентами',
        'Фасад облицьований натуральним гранітом та травертином',
        'Автономне опалення та цілодобова охорона 24/7',
      ],
      en: [
        '100% delivered, commissioned, and fully occupied',
        'Exterior cladded with premium granite and travertine',
        'Autonomous boiler station and 24/7 security patrol active',
      ],
      zh: [
        '100% 顺利交付入住，成为区域高尚住区标杆',
        '外立面全干挂进口纯天然花岗岩石材与经典洞石',
        '社区自营独立智能燃气供暖与全维安防全天候运转',
      ],
    },
    videoArchive: [
      {
        id: 'ordo-v-final',
        date: { ru: 'Сдан в эксплуатацию', kg: 'Пайдаланууга берилген', kz: 'Тапсырылған', uk: 'Введений в експлуатацію', en: 'Delivered', zh: '已交付入住' },
        stage: { ru: 'Румтур и видеообзор клубного дома', kg: 'Клубдук үйдүн румтуру жана видеосу', kz: 'Клубтық үйдің қорытынды бейнебаяны', uk: 'Фінальний румтур та відеоогляд клубного будинку', en: 'Club House Final Tour', zh: '精品洋房实景现房巡礼' },
        progress: 100,
        thumbnail: '/projects/Ordo.png',
        videoUrl: PROJECT_VIDEOS.ordo,
        videoDuration: '03:30 • 4K Обзор',
        description: {
          ru: 'Видеообзор клубного дома «Ордо»: натуральный фасад из гранита и травертина, входная группа и панорамы гор Ала-Тоо.',
          kg: 'Табигый граниттен фасад, кооз холлдор жана «Ордо» клубдук үйүнүн жайлуу атмосферасы.',
          kz: 'Табиғи граниттен қасбет және «Ордо» клубтық үйінің салтанатты кеңістігі.',
          uk: 'Авторський фасад із граніту та травертину, просторі холи та приватна атмосфера КД «Ордо».',
          en: 'Natural granite & travertine facade, signature boutique lobbies, and mountain panoramas at Ordo Club House.',
          zh: '天然花岗岩与洞石奢雅立面、精装入户大堂与低密纯洋房全景沉浸式实景呈现。',
        },
      },
    ],
  },
];

const UI: Record<Locale, {
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  filterAll: string;
  filterUnderConstruction: string;
  filterCommissioned: string;
  statProjects: string;
  statWorkers: string;
  statStandards: string;
  statControl: string;
  watchLatestVideoBtn: string;
  watchTourBtn: string;
  archiveBadge: string;
  archiveCount: (count: number) => string;
  historyBtn: string;
  workersLabel: string;
  workersUnit: string;
  cranesLabel: string;
  cranesUnit: string;
  readiness: string;
  breakdownTitle: string;
  pointsTitle: string;
  detailsBtn: string;
  paceLabel: string;
  modalTitle: string;
  closeModal: string;
  statusFinishedBadge: string;
  statusActiveBadge: string;
  goToProjectBtn: string;
}> = {
  ru: {
    heroBadge: 'ВИДЕОДНЕВНИК СТРОЙКИ • EL ORDO GROUP',
    heroTitle: 'ХОД СТРОИТЕЛЬСТВА ОБЪЕКТОВ',
    heroDesc: 'Ежемесячные 4K видеооблёты с дрона от котлована до верхних этажей. Смотрите хронику возведения вашего дома в динамике.',
    filterAll: 'Все объекты',
    filterUnderConstruction: 'Строящиеся ЖК',
    filterCommissioned: 'Сданные дома',
    statProjects: 'Объектов в портфолио',
    statWorkers: 'Строителей на смене',
    statStandards: 'СНиП КР (9 баллов)',
    statControl: 'Лабораторный контроль',
    watchLatestVideoBtn: 'Смотреть видеооблёт',
    watchTourBtn: 'Смотреть видеообзор',
    archiveBadge: 'Видеоархив стройки с начала работ',
    archiveCount: (count: number) => `${count} видеоотчёта`,
    historyBtn: 'Смотреть все видео с начала стройки',
    workersLabel: 'Строителей на смене:',
    workersUnit: 'чел.',
    cranesLabel: 'Башенных кранов:',
    cranesUnit: 'ед.',
    readiness: 'Общая готовность:',
    breakdownTitle: 'Прогресс по ключевым этапам:',
    pointsTitle: 'Выполненные работы за отчетный период:',
    detailsBtn: 'О комплексе',
    paceLabel: 'Темп строительства:',
    modalTitle: 'Видеоархив стройки:',
    closeModal: 'Закрыть',
    statusFinishedBadge: 'Сдан Госкомиссии',
    statusActiveBadge: 'В процессе строительства',
    goToProjectBtn: 'Перейти на страницу комплекса',
  },
  kg: {
    heroBadge: 'КУРУЛУШ ВИДЕОКҮНДӨЛҮГҮ • EL ORDO GROUP',
    heroTitle: 'ОБЪЕКТТЕРДИН КУРУЛУШ ЖҮРҮШҮ',
    heroDesc: 'Дрондон тартылган ай сайынкы 4K видеолор. Котловандан баштап акыркы кабатка чейинки өсүш тарыхын көрүңүз.',
    filterAll: 'Бардык объекттер',
    filterUnderConstruction: 'Курулуп жаткан ЖК',
    filterCommissioned: 'Пайдаланууга берилгендер',
    statProjects: 'Портфолиодогу объекттер',
    statWorkers: 'Сменадагы куруучулар',
    statStandards: 'КР СНиП (9 балл)',
    statControl: 'Лабораториялык көзөмөл',
    watchLatestVideoBtn: 'Видеону көрүү',
    watchTourBtn: 'Видеону көрүү',
    archiveBadge: 'Башынан берки видеоархив',
    archiveCount: (count: number) => `${count} видеоотчет`,
    historyBtn: 'Башынан берки бардык видеолорду көрүү',
    workersLabel: 'Сменадагы куруучулар:',
    workersUnit: 'адам',
    cranesLabel: 'Башендик крандар:',
    cranesUnit: 'даана',
    readiness: 'Жалпы даярдыгы:',
    breakdownTitle: 'Негизги этаптар боюнча прогресс:',
    pointsTitle: 'Мезгил ичинде аткарылган иштер:',
    detailsBtn: 'Комплекс тууралуу',
    paceLabel: 'Курулуш темпи:',
    modalTitle: 'Курулуштун видеоархиви:',
    closeModal: 'Жабуу',
    statusFinishedBadge: 'Мамкомиссияга тапшырылган',
    statusActiveBadge: 'Курулуп жатат',
    goToProjectBtn: 'Комплекстин барагына өтүү',
  },
  kz: {
    heroBadge: 'ҚҰРЫЛЫС БЕЙНЕКҮНДЕЛІГІ • EL ORDO GROUP',
    heroTitle: 'НЫСАНДАРДЫҢ САЛЫНУ БАРЫСЫ',
    heroDesc: 'Дроннан түсірілген 4K бейне есептер. Құрылыстың басынан қазіргі күнге дейінгі толық бейне шежіресі.',
    filterAll: 'Барлық нысандар',
    filterUnderConstruction: 'Салынып жатқандар',
    filterCommissioned: 'Тапсырылған үйлер',
    statProjects: 'Портфолиодағы нысандар',
    statWorkers: 'Ауысымдағы құрылысшылар',
    statStandards: 'ҚР ҚНжЕ (9 балл)',
    statControl: 'Зертханалық бақылау',
    watchLatestVideoBtn: 'Бейнені көру',
    watchTourBtn: 'Бейнешолуды көру',
    archiveBadge: 'Басынан бастап бейнеархив',
    archiveCount: (count: number) => `${count} бейнеесеп`,
    historyBtn: 'Құрылыс басынан барлық бейнелерді көру',
    workersLabel: 'Ауысымдағы құрылысшылар:',
    workersUnit: 'адам',
    cranesLabel: 'Мұнаралы крандар:',
    cranesUnit: 'дана',
    readiness: 'Жалпы дайындығы:',
    breakdownTitle: 'Негізгі кезеңдер бойынша прогресс:',
    pointsTitle: 'Кезең ішінде орындалған жұмыстар:',
    detailsBtn: 'Кешен туралы',
    paceLabel: 'Құрылыс қарқыны:',
    modalTitle: 'Құрылыс бейнеархиві:',
    closeModal: 'Жабу',
    statusFinishedBadge: 'Мемкомиссияға тапсырылды',
    statusActiveBadge: 'Құрылыс барысында',
    goToProjectBtn: 'Кешен парақшасына өту',
  },
  uk: {
    heroBadge: 'ВІДЕОЩОДЕННИК БУДІВНИЦТВА • EL ORDO GROUP',
    heroTitle: 'ХІД БУДІВНИЦТВА ОБ’ЄКТІВ',
    heroDesc: 'Щомісячні 4K відеозвіти з дрона від котловану до верхніх поверхів. Дивіться динаміку зведення будинку.',
    filterAll: 'Всі об’єкти',
    filterUnderConstruction: 'Споруджувані ЖК',
    filterCommissioned: 'Здані будинки',
    statProjects: 'Об’єктів у портфоліо',
    statWorkers: 'Будівельників на зміні',
    statStandards: 'СНіП (9 балів)',
    statControl: 'Лабораторний контроль',
    watchLatestVideoBtn: 'Дивитися відеообліт',
    watchTourBtn: 'Дивитися відеоогляд',
    archiveBadge: 'Відеоархів будівництва від початку',
    archiveCount: (count: number) => `${count} відеозвіти`,
    historyBtn: 'Дивитися всі відео від початку робіт',
    workersLabel: 'Будівельників на зміні:',
    workersUnit: 'осіб',
    cranesLabel: 'Баштових кранів:',
    cranesUnit: 'од.',
    readiness: 'Загальна готовність:',
    breakdownTitle: 'Прогрес за ключовими етапами:',
    pointsTitle: 'Виконані роботи за звітний період:',
    detailsBtn: 'Про комплекс',
    paceLabel: 'Темп будівництва:',
    modalTitle: 'Відеоархів будівництва:',
    closeModal: 'Закрити',
    statusFinishedBadge: 'Зданий Держкомісії',
    statusActiveBadge: 'У процесі будівництва',
    goToProjectBtn: 'Перейти на сторінку комплексу',
  },
  en: {
    heroBadge: 'CONSTRUCTION VIDEO DIARY • EL ORDO GROUP',
    heroTitle: 'CONSTRUCTION PROGRESS REPORTS',
    heroDesc: 'Monthly 4K aerial drone updates from foundation to rooftop. Watch the chronological evolution of your home.',
    filterAll: 'All Projects',
    filterUnderConstruction: 'Under Construction',
    filterCommissioned: 'Delivered Projects',
    statProjects: 'Projects in Portfolio',
    statWorkers: 'Builders on Shift',
    statStandards: 'Seismic Safety (9 Points)',
    statControl: 'Lab Strength Certified',
    watchLatestVideoBtn: 'Watch Drone Survey',
    watchTourBtn: 'Watch Video Tour',
    archiveBadge: 'Video Archive Since Groundbreak',
    archiveCount: (count: number) => `${count} video reports`,
    historyBtn: 'Watch All Videos Since Groundbreaking',
    workersLabel: 'Craftsmen on Shift:',
    workersUnit: 'pers.',
    cranesLabel: 'Tower Cranes Active:',
    cranesUnit: 'units',
    readiness: 'Overall Completion:',
    breakdownTitle: 'Milestone Progress Breakdown:',
    pointsTitle: 'Accomplished during the current cycle:',
    detailsBtn: 'Project Details',
    paceLabel: 'Construction Pace:',
    modalTitle: 'Construction Video Archive:',
    closeModal: 'Close',
    statusFinishedBadge: 'Commissioned & Occupied',
    statusActiveBadge: 'Under Construction',
    goToProjectBtn: 'Visit Complex Page',
  },
  zh: {
    heroBadge: '工程航拍视频家书 • EL ORDO GROUP',
    heroTitle: '各楼盘最新工程建设进度',
    heroDesc: '每月4K超高清航拍视频全程收录。从第一方开挖土方到顶层结构封顶，全周期视频档案真实呈现。',
    filterAll: '全部开发楼盘',
    filterUnderConstruction: '在建施工楼盘',
    filterCommissioned: '已交付入住楼盘',
    statProjects: '匠筑精品楼盘',
    statWorkers: '当班精工匠人',
    statStandards: '9度抗震设防标准',
    statControl: '国家实验室强度质检',
    watchLatestVideoBtn: '观看航拍特辑',
    watchTourBtn: '观看交付实景',
    archiveBadge: '开工至今全周期视频档案',
    archiveCount: (count: number) => `共 ${count} 期视频`,
    historyBtn: '查看从开工至今全部航拍记录',
    workersLabel: '当班精工匠人：',
    workersUnit: '人',
    cranesLabel: '运行塔吊台数：',
    cranesUnit: '台',
    readiness: '综合完成度：',
    breakdownTitle: '关键施工工序节点细分：',
    pointsTitle: '本周期重要施工节点完成情况：',
    detailsBtn: '查看楼盘详情',
    paceLabel: '平均筑造速率：',
    modalTitle: '项目全周期工程视频档案：',
    closeModal: '关闭',
    statusFinishedBadge: '已综合质检验收交付',
    statusActiveBadge: '正火热建设施工中',
    goToProjectBtn: '进入已交付楼盘专属主页',
  },
};

export default function ConstructionProgressPage() {
  const { locale, t: globalT } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const t = UI[currentLang] || UI.ru;

  const [activeCategory, setActiveCategory] = useState<'all' | 'active' | 'finished'>('all');
  const [selectedSlug, setSelectedSlug] = useState<string>('all');

  const [cinemaModal, setCinemaModal] = useState<{
    project: ReportItem;
    activeVideo: VideoReport;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCinemaModal(null);
    };

    if (cinemaModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cinemaModal]);

  const filteredReports = useMemo(() => {
    return REPORTS.filter((r) => {
      if (activeCategory === 'active' && r.isFinished) return false;
      if (activeCategory === 'finished' && !r.isFinished) return false;
      if (selectedSlug !== 'all' && r.projectSlug !== selectedSlug) return false;
      return true;
    });
  }, [activeCategory, selectedSlug]);

  const projectsFilterList = [
    { slug: 'all', label: t.filterAll },
    { slug: 'abu-dhabi', label: 'ЖК Abu Dhabi' },
    { slug: 'madina-residence', label: 'ЖК Madina Residence' },
    { slug: 'ajkol-plus', label: 'ЖД Айкол +' },
    { slug: 'ajkol', label: 'ЖД Айкол' },
    { slug: 'kelechek', label: 'ЖК Келечек' },
    { slug: 'ordo', label: 'КД Ордо' },
  ];

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200 pb-20">
      
      {/* Хлебные крошки */}
      <div className="bg-white dark:bg-[#0b1b15] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
            {globalT.common?.home || 'Главная'}
          </Link>
          <span>/</span>
          <span className="text-[#064734] dark:text-[#d4b26f] font-semibold">
            {t.heroTitle}
          </span>
        </div>
      </div>

      {/* Hero-баннер */}
      <section className="bg-[#064734] text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {t.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            {t.heroDesc}
          </p>

          {/* Плашка метрик девелопера */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
            <div className="p-2.5">
              <strong className="text-2xl font-black text-[#d4b26f] block">6</strong>
              <span className="text-[11px] text-white/80">{t.statProjects}</span>
            </div>
            <div className="p-2.5">
              <strong className="text-2xl font-black text-white block">120+</strong>
              <span className="text-[11px] text-white/80">{t.statWorkers}</span>
            </div>
            <div className="p-2.5">
              <strong className="text-2xl font-black text-[#d4b26f] block">M350</strong>
              <span className="text-[11px] text-white/80">{t.statStandards}</span>
            </div>
            <div className="p-2.5">
              <strong className="text-2xl font-black text-emerald-400 block">100%</strong>
              <span className="text-[11px] text-white/80">{t.statControl}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Панель фильтров: Статус и ЖК */}
      <div className="max-w-6xl mx-auto px-6 mt-8 space-y-4">
        {/* Таб статуса */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 max-w-md mx-auto">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'active', label: t.filterUnderConstruction },
            { id: 'finished', label: t.filterCommissioned },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id as any);
                setSelectedSlug('all');
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Горизонтальный скролл-фильтр */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {projectsFilterList.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setSelectedSlug(item.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSlug === item.slug
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-md'
                  : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Список отчетов */}
      <section className="max-w-6xl mx-auto px-6 mt-10 space-y-12">
        {filteredReports.map((report) => {
          const latestVideo = report.videoArchive.length > 0 ? report.videoArchive[0] : null;
          const hasArchive = report.videoArchive.length > 1;

          return (
            <article
              key={report.id}
              className="bg-white dark:bg-[#0b1b15] rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Медиа-блок */}
              <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-[520px] bg-neutral-900 overflow-hidden group">
                <Image
                  src={report.image}
                  alt={report.projectName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Бейджи вверху */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  {report.isFinished ? (
                    <span className="text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5 shadow bg-emerald-800/90 backdrop-blur-md">
                      <IconCheck className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{t.statusFinishedBadge}</span>
                    </span>
                  ) : latestVideo ? (
                    <span className="text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5 shadow bg-[#064734]/90 backdrop-blur-md">
                      <IconCalendar className="w-3.5 h-3.5 text-[#d4b26f]" />
                      <span>{latestVideo.date[currentLang] || latestVideo.date.ru}</span>
                    </span>
                  ) : null}

                  <span className="bg-[#d4b26f] text-[#064734] text-[11px] font-black uppercase px-3 py-1.5 rounded-xl shadow">
                    {report.isFinished ? t.statusFinishedBadge : t.statusActiveBadge}
                  </span>
                </div>

                {/* Кнопка воспроизведения видео поверх обложки */}
                {latestVideo && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/35 group-hover:bg-black/45 transition-colors">
                    <button
                      type="button"
                      onClick={() =>
                        setCinemaModal({
                          project: report,
                          activeVideo: latestVideo,
                        })
                      }
                      className="group/btn flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white/95 dark:bg-[#07130e]/95 hover:bg-[#064734] dark:hover:bg-[#d4b26f] text-gray-900 dark:text-white hover:text-white dark:hover:text-[#064734] backdrop-blur-md border border-white/40 shadow-2xl transition-all duration-300 scale-100 hover:scale-105 cursor-pointer"
                    >
                      <span className="w-11 h-11 rounded-full bg-[#064734] group-hover/btn:bg-white text-white group-hover/btn:text-[#064734] flex items-center justify-center shadow transition-colors">
                        <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      <div className="text-left">
                        <span className="block text-xs font-black uppercase tracking-wider">
                          {report.isFinished ? t.watchTourBtn : t.watchLatestVideoBtn}
                        </span>
                        <span className="block text-[10px] text-gray-500 dark:text-gray-400 group-hover/btn:text-white/80 dark:group-hover/btn:text-[#064734]/80">
                          {latestVideo.videoDuration}
                        </span>
                      </div>
                    </button>
                  </div>
                )}

                {/* Живые параметры площадки внизу фото */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md text-white p-3.5 rounded-2xl border border-white/10 z-10">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-400 text-[10px] block">{t.workersLabel}</span>
                      <strong className="font-extrabold text-[#d4b26f]">
                        {report.isFinished ? '—' : `${report.workersOnSite} ${t.workersUnit}`}
                      </strong>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] block">{t.cranesLabel}</span>
                      <strong className="font-extrabold text-white">
                        {report.isFinished ? '—' : `${report.cranesOnSite} ${t.cranesUnit}`}
                      </strong>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] block">{t.paceLabel}</span>
                      <strong className="font-extrabold text-emerald-400 truncate block">
                        {report.pacePerMonth[currentLang] || report.pacePerMonth.ru}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Текстовая колонка */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h2 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white">
                      {report.projectName}
                    </h2>
                    <Link
                      href={`/${report.projectSlug}`}
                      className="text-xs font-bold text-[#064734] dark:text-[#d4b26f] hover:underline flex items-center gap-1 shrink-0"
                    >
                      <span>{t.detailsBtn}</span>
                      <IconArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <p className="text-xs font-bold text-[#8c6b23] dark:text-[#d4b26f] uppercase tracking-wider mb-5">
                    {report.isFinished
                      ? 'ОБЪЕКТ СДАН В ЭКСПЛУАТАЦИЮ'
                      : latestVideo
                      ? (latestVideo.stage[currentLang] || latestVideo.stage.ru)
                      : 'В ПРОЦЕССЕ СТРОИТЕЛЬСТВА'}
                  </p>

                  {/* Общая шкала готовности */}
                  <div className="mb-5 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <div className="flex items-center justify-between text-xs font-black mb-1.5">
                      <span className="text-gray-600 dark:text-gray-300">{t.readiness}</span>
                      <span className="text-[#064734] dark:text-[#d4b26f] text-base font-black">
                        {report.isFinished ? 100 : (latestVideo ? latestVideo.progress : 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          report.isFinished
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-r from-[#064734] to-[#d4b26f]'
                        }`}
                        style={{ width: `${report.isFinished ? 100 : (latestVideo ? latestVideo.progress : 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Детальная разбивка по ключевым этапам */}
                  <div className="mb-5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-neutral-400 block mb-2.5">
                      {t.breakdownTitle}
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {report.breakdown.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-gray-50/70 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                          <div className="flex justify-between text-[11px] font-bold mb-1">
                            <span className="text-gray-600 dark:text-gray-300 truncate">
                              {item.label[currentLang] || item.label.ru}
                            </span>
                            <span className="text-[#064734] dark:text-[#d4b26f]">{item.percent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                report.isFinished ? 'bg-emerald-500' : 'bg-[#064734] dark:bg-[#d4b26f]'
                              }`}
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Описание работ */}
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                    {report.desc[currentLang] || report.desc.ru}
                  </p>

                  {/* Выполненные пункты */}
                  <div className="space-y-1.5 mb-6">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-neutral-400 block">
                      {t.pointsTitle}
                    </span>
                    {(report.points[currentLang] || report.points.ru).map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-200 font-medium">
                        <IconCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* МИНИ-ЛЕНТА АРХИВА (для объектов с несколькими выпусками) */}
                  {hasArchive && (
                    <div className="mb-6 p-4 rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#d4b26f]">
                          {t.archiveBadge}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">
                          {t.archiveCount(report.videoArchive.length)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {report.videoArchive.slice(1).map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() =>
                              setCinemaModal({
                                project: report,
                                activeVideo: v,
                              })
                            }
                            className="p-2 rounded-xl bg-white dark:bg-black/30 border border-gray-200/80 dark:border-white/10 hover:border-[#064734] dark:hover:border-[#d4b26f] text-left transition-all group/v cursor-pointer"
                          >
                            <span className="text-[10px] font-black text-gray-900 dark:text-white block group-hover/v:text-[#064734] dark:group-hover/v:text-[#d4b26f]">
                              ▶ {v.date[currentLang] || v.date.ru}
                            </span>
                            <span className="text-[9px] text-gray-500 dark:text-neutral-400 block truncate">
                              {v.stage[currentLang] || v.stage.ru}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* НИЖНИЙ БЛОК ДЕЙСТВИЙ */}
                <div className="pt-4 border-t border-gray-100 dark:border-white/10">
                  {report.isFinished ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      {latestVideo && (
                        <button
                          type="button"
                          onClick={() =>
                            setCinemaModal({
                              project: report,
                              activeVideo: latestVideo,
                            })
                          }
                          className="flex-1 bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] hover:text-white dark:text-[#064734] font-black py-4 px-4 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{t.watchTourBtn}</span>
                        </button>
                      )}
                      <Link
                        href={`/${report.projectSlug}`}
                        className="flex-1 py-4 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 font-bold text-xs uppercase tracking-wider transition-all border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2 text-center"
                      >
                        <span>{t.goToProjectBtn}</span>
                        <IconArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </Link>
                    </div>
                  ) : report.videoArchive.length > 0 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setCinemaModal({
                          project: report,
                          activeVideo: report.videoArchive[0],
                        })
                      }
                      className="w-full bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] hover:text-white dark:text-[#064734] font-black py-4 px-6 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{t.historyBtn}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-white dark:bg-black/10 dark:text-[#064734]">
                        {report.videoArchive.length}
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={`/${report.projectSlug}`}
                      className="w-full py-4 px-6 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 font-bold text-xs uppercase tracking-wider transition-all border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2"
                    >
                      <span>{t.goToProjectBtn}</span>
                      <IconArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* МОДАЛЬНЫЙ КИНОТЕАТР */}
      {cinemaModal && (() => {
        const { isDirectVideo, src } = formatVideoSource(cinemaModal.activeVideo.videoUrl);
        const hasPlaylist = cinemaModal.project.videoArchive.length > 1;

        return (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
            onClick={() => setCinemaModal(null)}
          >
            <div
              className={`bg-neutral-950 w-full ${hasPlaylist ? 'max-w-5xl' : 'max-w-4xl'} max-h-[94vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Шапка плеера */}
              <div className="p-4 sm:px-6 flex items-center justify-between border-b border-white/10 text-white bg-neutral-900">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-black uppercase text-[#d4b26f]">
                    {cinemaModal.project.projectName} • {cinemaModal.activeVideo.date[currentLang] || cinemaModal.activeVideo.date.ru}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setCinemaModal(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label={t.closeModal}
                >
                  ✕
                </button>
              </div>

              {/* Тело кинотеатра: Экран видео + Плейлист */}
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 bg-black">
                
                {/* Левая часть: Экран видео */}
                <div className={`${hasPlaylist ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col bg-black`}>
                  <div className="relative aspect-video w-full flex items-center justify-center bg-black">
                    {isDirectVideo ? (
                      <video
                        key={cinemaModal.activeVideo.id}
                        src={src}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <iframe
                        key={cinemaModal.activeVideo.id}
                        src={src}
                        title={cinemaModal.activeVideo.stage[currentLang] || cinemaModal.activeVideo.stage.ru}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    )}
                  </div>

                  {/* Описание текущего выпуска */}
                  <div className="p-5 text-white bg-neutral-900/60 border-t border-white/10">
                    <span className="text-xs font-bold text-[#d4b26f] block mb-1">
                      {cinemaModal.activeVideo.stage[currentLang] || cinemaModal.activeVideo.stage.ru}
                    </span>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {cinemaModal.activeVideo.description
                        ? (cinemaModal.activeVideo.description[currentLang] || cinemaModal.activeVideo.description.ru)
                        : (cinemaModal.project.desc[currentLang] || cinemaModal.project.desc.ru)}
                    </p>
                  </div>
                </div>

                {/* Правая часть: Хронологический плейлист (только если видео больше одного) */}
                {hasPlaylist && (
                  <div className="lg:col-span-4 bg-neutral-900 border-t lg:border-t-0 lg:border-l border-white/10 p-5 flex flex-col">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-300 mb-3 block">
                      {t.modalTitle} ({cinemaModal.project.videoArchive.length})
                    </span>

                    <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[380px] lg:max-h-[500px] pr-1">
                      {cinemaModal.project.videoArchive.map((video, idx) => {
                        const isCurrent = cinemaModal.activeVideo.id === video.id;

                        return (
                          <div
                            key={video.id}
                            onClick={() =>
                              setCinemaModal((prev) =>
                                prev ? { ...prev, activeVideo: video } : null
                              )
                            }
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                              isCurrent
                                ? 'bg-[#064734] border-[#d4b26f] text-white shadow-lg'
                                : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black ${
                              isCurrent ? 'bg-[#d4b26f] text-[#064734]' : 'bg-white/10 text-gray-300'
                            }`}>
                              {idx === 0 ? '★' : `${cinemaModal.project.videoArchive.length - idx}`}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between text-xs font-bold mb-0.5">
                                <span className="truncate">{video.date[currentLang] || video.date.ru}</span>
                                <span className="text-[10px] text-[#d4b26f]">{video.progress}%</span>
                              </div>
                              <span className="text-[9px] text-gray-400 block truncate">
                                {video.stage[currentLang] || video.stage.ru}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        );
      })()}

    </main>
  );
}