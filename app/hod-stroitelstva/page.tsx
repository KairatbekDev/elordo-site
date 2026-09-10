'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import {
  IconBuilding,
  IconCrane,
  IconCheck,
  IconCalendar,
  IconArrowRight,
  IconWhatsApp,
} from '@/components/Icons';

interface ProgressBreakdown {
  label: Record<Locale, string>;
  percent: number;
}

interface ReportItem {
  id: string;
  projectSlug: string;
  projectName: string;
  isFinished?: boolean;
  date: Record<Locale, string>;
  stage: Record<Locale, string>;
  progress: number;
  image: string;
  videoUrl?: string;
  videoDuration?: string;
  workersOnSite: number;
  cranesOnSite: number;
  breakdown: ProgressBreakdown[];
  desc: Record<Locale, string>;
  points: Record<Locale, string[]>;
}

function formatVideoSource(url: string) {
  const isDirectVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.startsWith('/videos/');

  if (isDirectVideo) {
    return { isDirectVideo: true, src: url };
  }

  let embedUrl = url;

  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split(/[?#]/)[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('watch?v=')) {
    const videoId = url.split('watch?v=')[1]?.split(/[&#]/)[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  const separator = embedUrl.includes('?') ? '&' : '?';
  embedUrl = `${embedUrl}${separator}autoplay=1&rel=0`;

  return { isDirectVideo: false, src: embedUrl };
}

const REPORTS: ReportItem[] = [
  {
    id: 'rep-abu-dhabi-1',
    projectSlug: 'abu-dhabi',
    projectName: 'ЖК Abu Dhabi',
    isFinished: false,
    date: {
      ru: 'Август 2026',
      kg: 'Август 2026',
      kz: 'Тамыз 2026',
      uk: 'Серпень 2026',
      en: 'August 2026',
      zh: '2026年8月',
    },
    stage: {
      ru: 'Монолитный каркас 16-го этажа',
      kg: '16-кабаттын монолиттик каркасы',
      kz: '16-қабаттың монолитті қаңқасы',
      uk: 'Монолітний каркас 16-го поверху',
      en: 'Monolithic frame on 16th floor',
      zh: '第16层现浇混凝土主体施工',
    },
    progress: 45,
    image: '/projects/Abu-Dhabi.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoDuration: '02:45 • 4K Drone',
    workersOnSite: 54,
    cranesOnSite: 2,
    breakdown: [
      {
        label: {
          ru: 'Монолитный каркас',
          kg: 'Монолиттик каркас',
          kz: 'Монолитті қаңқа',
          uk: 'Монолітний каркас',
          en: 'Concrete Core',
          zh: '主体结构',
        },
        percent: 65,
      },
      {
        label: {
          ru: 'Кирпичная кладка',
          kg: 'Кыш кыноо',
          kz: 'Кірпіш қалау',
          uk: 'Цегляна кладка',
          en: 'Brick Masonry',
          zh: '红砖砌体',
        },
        percent: 38,
      },
      {
        label: {
          ru: 'Фасадные работы',
          kg: 'Фасад иштери',
          kz: 'Қасбет жұмыстары',
          uk: 'Фасадні роботи',
          en: 'Façade Insulation',
          zh: '外墙保温',
        },
        percent: 15,
      },
      {
        label: {
          ru: 'Инженерные сети',
          kg: 'Инженердик түйүндөр',
          kz: 'Инженерлік желілер',
          uk: 'Інженерні мережі',
          en: 'MEP Engineering',
          zh: '机电管网',
        },
        percent: 20,
      },
    ],
    desc: {
      ru: 'Завершена заливка перекрытия 15 этажа в Блоке А. Ведется армирование колонн и пилонов 16 этажа. Параллельно начата кирпичная кладка автоклавным жженым кирпичом на уровнях 7-9 этажей.',
      kg: 'А блогунда 15-кабаттын жабуусун куюу аяктады. 16-кабаттын колонналарын бекемдөө жүрүп жатат. Ошол эле учурда 7-9-кабаттарда бышкан кыш менен дубалдарды тургузуу башталды.',
      kz: 'А блогында 15-қабаттың жабындысын құю аяқталды. 16-қабаттың бағандарын арматуралау жүргізілуде. Қатарлас 7-9 қабаттарда күйдірілген кірпіш қалау басталды.',
      uk: 'Завершено бетонування перекриття 15 поверху в Блоці А. Триває армування колон 16 поверху. Паралельно розпочато цегляну кладку на рівнях 7-9 поверхів.',
      en: 'Pouring of the 15th-floor slab in Block A completed. Rebar reinforcement underway for 16th-floor columns. Solid baked brick walling commenced on floors 7-9.',
      zh: 'A座15层顶板现浇浇筑顺利封顶，全面推进16层立柱钢筋绑扎作业。7至9层环保烧结实心红砖二次结构砌筑同步高效施工中。',
    },
    points: {
      ru: [
        'Залито 480 м³ бетона марки М350',
        'Кирпичная кладка выполнена на 35%',
        'Проложены стояки вентиляции до 10 этажа',
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
  },
  {
    id: 'rep-madina-1',
    projectSlug: 'madina-residence',
    projectName: 'ЖК Madina Residence',
    isFinished: false,
    date: {
      ru: 'Август 2026',
      kg: 'Август 2026',
      kz: 'Тамыз 2026',
      uk: 'Серпень 2026',
      en: 'August 2026',
      zh: '2026年8月',
    },
    stage: {
      ru: 'Кладка наружных стен и остекление',
      kg: 'Тышкы дубалдарды тургузуу жана терезе салуу',
      kz: 'Сыртқы қабырғаларды қалау және терезе орнату',
      uk: 'Кладка зовнішніх стін та скління',
      en: 'Exterior brickwork & window glazing',
      zh: '外立面红砖砌筑与全景系统门窗安装',
    },
    progress: 72,
    image: '/projects/Madina-Residense.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoDuration: '03:10 • 4K Drone',
    workersOnSite: 38,
    cranesOnSite: 1,
    breakdown: [
      {
        label: {
          ru: 'Монолитный каркас',
          kg: 'Монолиттик каркас',
          kz: 'Монолитті қаңқа',
          uk: 'Монолітний каркас',
          en: 'Concrete Core',
          zh: '主体结构',
        },
        percent: 100,
      },
      {
        label: {
          ru: 'Кирпичная кладка',
          kg: 'Кыш кыноо',
          kz: 'Кірпіш қалау',
          uk: 'Цегляна кладка',
          en: 'Brick Masonry',
          zh: '红砖砌体',
        },
        percent: 85,
      },
      {
        label: {
          ru: 'Остекление окон',
          kg: 'Терезе салуу',
          kz: 'Терезе орнату',
          uk: 'Скління вікон',
          en: 'Window Glazing',
          zh: '节能系统窗',
        },
        percent: 60,
      },
      {
        label: {
          ru: 'Инженерные сети',
          kg: 'Инженердик түйүндөр',
          kz: 'Инженерлік желілер',
          uk: 'Інженерні мережі',
          en: 'MEP Engineering',
          zh: '机电管网',
        },
        percent: 45,
      },
    ],
    desc: {
      ru: 'Монолитный каркас здания полностью завершен. Ведутся работы по монтажу энергоэффективных панорамных стеклопакетов на 5-9 этажах, а также разводка внутренних инженерных сетей водоснабжения.',
      kg: 'Имараттын монолиттик каркасы толугу менен аяктады. 5-9-кабаттарда энергияны үнөмдөөчү панорамалык терезелерди орнотуу жана суу түтүктөрүн тартуу иштери жүрүүдө.',
      kz: 'Ғимараттың монолитті қаңқасы толық аяқталды. 5-9 қабаттарда энергия үнемдегіш панорамалық терезелерді орнату және ішкі су құбырлары желісін жүргізу атқарылуда.',
      uk: 'Монолітний каркас будинку повністю завершено. Тривають роботи зі скління енергоефективними склопакетами на 5-9 поверхах та монтаж водопровідних мереж.',
      en: 'Structural concrete framework fully finalized. Energy-efficient panoramic window installation underway on floors 5-9, along with plumbing distribution.',
      zh: '现浇钢筋混凝土主体架构全线封顶。正火热开展5至9层多腔节能隔音防辐射系统窗装配，同步穿插给排水及消防立管主管路铺设。',
    },
    points: {
      ru: [
        'Монолитный каркас: 100% готовности',
        'Установка алюминиевого профиля окон: 60%',
        'Монтаж электропроводки в паркинге: 75%',
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
        'Електропроводка в підземному паркінгу: 75%',
      ],
      en: [
        'Concrete structure: 100% completed',
        'Aluminum window profile mounting: 60%',
        'Underground parking electrical wiring: 75%',
      ],
      zh: [
        '主体钢筋混凝土框架结构：100% 完成',
        '高端断桥铝合金系统窗框体安装：60%',
        '双层地下车库电气母线与强弱电布线：75%',
      ],
    },
  },
  {
    id: 'rep-ajkol-plus-1',
    projectSlug: 'ajkol-plus',
    projectName: 'ЖД Айкол +',
    isFinished: false,
    date: {
      ru: 'Июль 2026',
      kg: 'Июль 2026',
      kz: 'Шілде 2026',
      uk: 'Липень 2026',
      en: 'July 2026',
      zh: '2026年7月',
    },
    stage: {
      ru: 'Возведение 7-го этажа клубного дома',
      kg: 'Клубдук үйдүн 7-кабатын тургузуу',
      kz: 'Клубтық үйдің 7-қабатын тұрғызу',
      uk: 'Зведення 7-го поверху клубного будинку',
      en: 'Construction of 7th floor',
      zh: '低密纯洋房第7层主体砌筑封顶',
    },
    progress: 58,
    image: '/projects/Aikolplus.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoDuration: '02:15 • 4K Drone',
    workersOnSite: 29,
    cranesOnSite: 1,
    breakdown: [
      {
        label: {
          ru: 'Монолитный каркас',
          kg: 'Монолиттик каркас',
          kz: 'Монолитті қаңқа',
          uk: 'Монолітний каркас',
          en: 'Concrete Core',
          zh: '主体结构',
        },
        percent: 75,
      },
      {
        label: {
          ru: 'Кирпичная кладка',
          kg: 'Кыш кыноо',
          kz: 'Кірпіш қалау',
          uk: 'Цегляна кладка',
          en: 'Brick Masonry',
          zh: '红砖砌体',
        },
        percent: 55,
      },
      {
        label: {
          ru: 'Кровельные работы',
          kg: 'Чатыр иштери',
          kz: 'Шатыр жұмыстары',
          uk: 'Покрівельні роботи',
          en: 'Roofing',
          zh: '屋面防水',
        },
        percent: 20,
      },
      {
        label: {
          ru: 'Инженерные сети',
          kg: 'Инженердик түйүндөр',
          kz: 'Инженерлік желілер',
          uk: 'Інженерні мережі',
          en: 'MEP Engineering',
          zh: '机电管网',
        },
        percent: 25,
      },
    ],
    desc: {
      ru: 'В экологическом районе Кок-Жар ведутся активные монолитные работы. Завершена гидроизоляция подземного паркинга. Качество бетона прошло лабораторный контроль на прочность.',
      kg: 'Көк-Жар экологиялык аймагында монолиттик курулуш жүрүп жатат. Жер астындагы паркингдин гидроизоляциясы аяктады. Бетон лабораториялык текшерүүдөн өттү.',
      kz: 'Көк-Жар экологиялық ауданында монолитті жұмыстар қызу жүруде. Жерасты автотұрағының гидрооқшаулауы аяқталды. Бетон беріктігі тексерілді.',
      uk: 'У передгірному районі Кок-Жар тривають активні монолітні роботи. Завершено гідроізоляцію підземного паркінгу з лабораторним контролем міцності бетону.',
      en: 'Active construction in the scenic Kok-Zhar foothills. Basement waterproofing complete. Concrete compressive strength verified by independent lab testing.',
      zh: '南部生态麓区阔景洋房施工作业快速平稳推进。双层地下停车场抗渗刚柔多道防水施工完毕，主体混凝土经第三方实验室抗压检测符合高优标准。',
    },
    points: {
      ru: [
        'Сейсмоустойчивый фундамент: 100%',
        'Монтаж вентилируемого фасада: подготовка',
        'Шумоизоляционные плиты между этажами',
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
  },
  {
    id: 'rep-ajkol-1',
    projectSlug: 'ajkol',
    projectName: 'ЖД Айкол',
    isFinished: false,
    date: {
      ru: 'Август 2026',
      kg: 'Август 2026',
      kz: 'Тамыз 2026',
      uk: 'Серпень 2026',
      en: 'August 2026',
      zh: '2026年8月',
    },
    stage: {
      ru: 'Фасадные работы и благоустройство двора',
      kg: 'Фасад иштери жана короону көрктөндүрүү',
      kz: 'Қасбет жұмыстары және ауланы абаттандыру',
      uk: 'Фасадні роботи та благоустрій двору',
      en: 'Façade finishes & courtyard landscaping',
      zh: '外立面精镶收尾与社区园林景观铺设',
    },
    progress: 92,
    image: '/projects/ajkol.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoDuration: '02:00 • 4K Drone',
    workersOnSite: 24,
    cranesOnSite: 1,
    breakdown: [
      {
        label: {
          ru: 'Монолитный каркас',
          kg: 'Монолиттик каркас',
          kz: 'Монолитті қаңқа',
          uk: 'Монолітний каркас',
          en: 'Concrete Core',
          zh: '主体结构',
        },
        percent: 100,
      },
      {
        label: {
          ru: 'Кирпичные стены',
          kg: 'Кыш дубалдар',
          kz: 'Кірпіш қабырғалар',
          uk: 'Цегляні стіни',
          en: 'Brick Walls',
          zh: '红砖砌体',
        },
        percent: 100,
      },
      {
        label: {
          ru: 'Остекление и фасад',
          kg: 'Терезе жана фасад',
          kz: 'Шынылау және қасбет',
          uk: 'Скління та фасад',
          en: 'Façade & Windows',
          zh: '系统窗与幕墙',
        },
        percent: 90,
      },
      {
        label: {
          ru: 'Внутренние сети',
          kg: 'Ички түйүндөр',
          kz: 'Ішкі желілер',
          uk: 'Внутрішні мережі',
          en: 'Utilities & MEP',
          zh: '室内工程管网',
        },
        percent: 88,
      },
    ],
    desc: {
      ru: 'Объект находится на финишной прямой перед сдачей. Завершены все кладочные и кровельные работы. Заканчивается наружная отделка, идет укладка тротуарной плитки во дворе и монтаж бесшумного лифта.',
      kg: 'Объект тапшыруунун алдындагы фиништик стадияда. Бардык кыш жана чатыр иштери аяктады. Сырткы кооздоо бүтүп, короого плитка төшөө жана үндү чыгарбаган лифтти орнотуу жүрүүдө.',
      kz: 'Нысан пайдалануға беру алдындағы соңғы кезеңде. Барлық кірпіш қалау және шатыр жұмыстары аяқталды. Сыртқы әрлеу аяқталып, аулада плитка төсеу және дыбыссыз лифт орнату жүруде.',
      uk: 'Об’єкт на фінішній прямій перед здачею в експлуатацію. Завершено всі мурувальні та покрівельні роботи. Триває фінішне оздоблення фасаду та благоустрій двору.',
      en: 'The project is nearing final commissioning. All masonry and roofing works are 100% complete. Final exterior finishing and courtyard paving are in progress.',
      zh: '项目全盘进入竣工交付冲刺阶段。主体结构与砌体工程已全部验收合格，正进行入户精装大堂、户外生态铺装及静音电梯试运行调试。',
    },
    points: {
      ru: [
        'Монолитно-кирпичный конструктив: 100%',
        'Монтаж пассажирского лифта: 85%',
        'Подключение газа и отопления: пусконаладка',
      ],
      kg: [
        'Монолит-бышкан кыш конструкциясы: 100%',
        'Жүргүнчү лифтин орнотуу: 85%',
        'Газ жана жылуулукту туташтыруу: жөнгө салуу',
      ],
      kz: [
        'Монолитті-кірпіш конструкциясы: 100%',
        'Жолаушылар лифтін орнату: 85%',
        'Газ бен жылытуды қосу: іске қосу-реттеу',
      ],
      uk: [
        'Монолітно-цегляний конструктив: 100%',
        'Монтаж пасажирського ліфта: 85%',
        'Підключення газу та опалення: пусконалагодження',
      ],
      en: [
        'Monolithic brick structure: 100% finished',
        'Passenger elevator installation: 85%',
        'Gas & heating connectivity: commissioning stage',
      ],
      zh: [
        '现浇钢筋混凝土与实心砖工程：100% 达成',
        '品牌高端乘客电梯机械安装：85%',
        '独立燃气采暖设备已就位，进入联动试调',
      ],
    },
  },
  {
    id: 'rep-kelechek-1',
    projectSlug: 'kelechek',
    projectName: 'ЖК Келечек',
    isFinished: true,
    date: {
      ru: 'Сдан Госкомиссии',
      kg: 'Мамкомиссияга тапшырылган',
      kz: 'Мемкомиссияға тапсырылды',
      uk: 'Зданий Держкомісії',
      en: 'Commissioned & Occupied',
      zh: '全盘竣工验收交付',
    },
    stage: {
      ru: 'Дом введен в эксплуатацию и заселен',
      kg: 'Үй пайдаланууга берилген жана эл жашайт',
      kz: 'Үй пайдалануға берілген және қоныстанған',
      uk: 'Будинок введений в експлуатацію та заселений',
      en: 'Fully commissioned and resident-occupied',
      zh: '项目已高品质综合验收交付，业主均已入住',
    },
    progress: 100,
    image: '/projects/Kelechek.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoDuration: '02:30 • Обзор объекта',
    workersOnSite: 0,
    cranesOnSite: 0,
    breakdown: [
      {
        label: {
          ru: 'Монолитный каркас',
          kg: 'Монолиттик каркас',
          kz: 'Монолитті қаңқа',
          uk: 'Монолітний каркас',
          en: 'Concrete Core',
          zh: '主体结构',
        },
        percent: 100,
      },
      {
        label: {
          ru: 'Кирпичная кладка',
          kg: 'Кыш кыноо',
          kz: 'Кірпіш қалау',
          uk: 'Цегляна кладка',
          en: 'Brick Masonry',
          zh: '红砖砌体',
        },
        percent: 100,
      },
      {
        label: {
          ru: 'Инженерные сети',
          kg: 'Инженердик түйүндөр',
          kz: 'Инженерлік желілер',
          uk: 'Інженерні мережі',
          en: 'MEP Engineering',
          zh: '机电管网',
        },
        percent: 100,
      },
      {
        label: {
          ru: 'Благоустройство двора',
          kg: 'Короону көрктөндүрүү',
          kz: 'Ауланы абаттандыру',
          uk: 'Благоустрій двору',
          en: 'Courtyard & Playgrounds',
          zh: '园林与配套设施',
        },
        percent: 100,
      },
    ],
    desc: {
      ru: 'Успешно завершенный и заселенный жилой комплекс от EL ORDO GROUP. Все инженерные сети подключены к городским магистралям, жильцы получили государственные техпаспорта на квартиры.',
      kg: 'EL ORDO GROUP тарабынан ийгиликтүү аяктаган жана эл жашаган турак жай комплекси. Бардык коммуникациялар шаардык тармактарга кошулган, тургундар техпаспорт алышкан.',
      kz: 'EL ORDO GROUP компаниясының сәтті аяқталған және қоныстанған тұрғын үй кешені. Барлық қалалық желілер қосылған, тұрғындар мемлекеттік техпаспорт алған.',
      uk: 'Успішно завершений та заселений житловий комплекс від EL ORDO GROUP. Будинок підключений до міських мереж, мешканці отримали техпаспорти.',
      en: 'Successfully completed, commissioned, and resident-occupied complex by EL ORDO GROUP. Connected to all city utilities; property titles issued to residents.',
      zh: 'EL ORDO GROUP 成功打造并全盘交付入驻的成熟社区。市政自来水、供暖及电网全通，所有业主均已顺利取得不动产登记红本证书。',
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
        'Private gated courtyard and play park in full operation',
      ],
      zh: [
        '100% 通过国家工程综合质检验收',
        '全盘住户均已取得国家不动产权属凭据',
        '封闭式门禁、监控安防及儿童乐园全面运营',
      ],
    },
  },
  {
    id: 'rep-ordo-1',
    projectSlug: 'ordo',
    projectName: 'КД Ордо',
    isFinished: true,
    date: {
      ru: 'Сдан Госкомиссии',
      kg: 'Мамкомиссияга тапшырылган',
      kz: 'Мемкомиссияға тапсырылды',
      uk: 'Зданий Держкомісії',
      en: 'Commissioned & Occupied',
      zh: '全盘竣工验收交付',
    },
    stage: {
      ru: 'Клубный дом введен в эксплуатацию',
      kg: 'Клубдук үй пайдаланууга берилген',
      kz: 'Клубтық үй пайдалануға берілген',
      uk: 'Клубний будинок введений в експлуатацію',
      en: 'Boutique club house fully delivered',
      zh: '专属精品洋房已全盘高质量交付',
    },
    progress: 100,
    image: '/projects/Ordo.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoDuration: '02:15 • Обзор объекта',
    workersOnSite: 0,
    cranesOnSite: 0,
    breakdown: [
      {
        label: {
          ru: 'Монолитный каркас',
          kg: 'Монолиттик каркас',
          kz: 'Монолитті қаңқа',
          uk: 'Монолітний каркас',
          en: 'Concrete Core',
          zh: '主体结构',
        },
        percent: 100,
      },
      {
        label: {
          ru: 'Фасад из натурального камня',
          kg: 'Табигый таштан фасад',
          kz: 'Табиғи тастан қасбет',
          uk: 'Фасад із натурального каменю',
          en: 'Natural Stone Façade',
          zh: '进口天然石材幕墙',
        },
        percent: 100,
      },
      {
        label: {
          ru: 'Газовая котельная',
          kg: 'Газ отказаны',
          kz: 'Газ қазандығы',
          uk: 'Газова котельня',
          en: 'Gas Heating Plant',
          zh: '独立燃气供热站',
        },
        percent: 100,
      },
      {
        label: {
          ru: 'Подземный паркинг',
          kg: 'Жер астындагы паркинг',
          kz: 'Жерасты автотұрағы',
          uk: 'Підземний паркінг',
          en: 'Basement Parking',
          zh: '智能地下车库',
        },
        percent: 100,
      },
    ],
    desc: {
      ru: 'Первый знаковый клубный дом компании EL ORDO GROUP. Авторский фасад из гранита и травертина, собственная газовая котельная, панорамные виды на горы Ала-Тоо и полная приватность жильцов.',
      kg: 'EL ORDO GROUP компаниясынын алгачкы бүткөрүлгөн клубдук үйү. Гранит жана травертинден фасад, жеке газ отказаны, тоолорго панорама жана толук тынчтык.',
      kz: 'EL ORDO GROUP компаниясының алғашқы жүзеге асырылған клубтық үйі. Гранит пен травертиннен қасбет, жеке газ қазандығы, тау көрінісі және толық құпиялық.',
      uk: 'Перший реалізований клубний будинок компанії EL ORDO GROUP. Авторський фасад із граніту та травертину, власна котельня, панорама на гори та приватність.',
      en: 'The hallmark boutique club house completed by EL ORDO GROUP. Authentic natural granite facade, autonomous heating, mountain views, and quiet luxury.',
      zh: 'EL ORDO GROUP 打造的首部标志性低密纯洋房。甄选天然花岗岩与洞石立面，自建独立燃气供热站，坐拥壮丽雪山天幕全景。',
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
  },
];

const UI = {
  ru: {
    heroBadge: 'ДНЕВНИК СТРОЙКИ • EL ORDO GROUP',
    heroTitle: 'ХОД СТРОИТЕЛЬСТВА ОБЪЕКТОВ',
    heroDesc: 'Ежемесячные 4K видеоотчеты с дрона и фотофиксация каждого этапа. Следите за возведением вашего дома в реальном времени с полной прозрачностью.',
    filterAll: 'Все комплексы',
    watchDroneBtn: 'Смотреть видео с дрона',
    workersLabel: 'Строителей на смене:',
    workersUnit: 'чел.',
    cranesLabel: 'Башенных кранов:',
    cranesUnit: 'ед.',
    readiness: 'Общая готовность:',
    breakdownTitle: 'Прогресс по ключевым этапам:',
    pointsTitle: 'Выполненные работы за отчетный период:',
    detailsBtn: 'О комплексе',
    tourBadge: 'Персональный аудит',
    tourTitle: 'Хотите лично посетить стройплощадку?',
    tourDesc: 'Инженер отдела продаж проведет для вас индивидуальную экскурсию в каске по строящемуся объекту, покажет качество кладки и вид из будущей квартиры.',
    tourBtn: 'Записаться на экскурсию',
    tourWaText: 'Здравствуйте! Хочу записаться на персональную экскурсию на стройплощадку объекта ',
    tourBannerWaText: 'Здравствуйте! Хочу записаться на индивидуальную экскурсию по объектам EL ORDO GROUP.',
    videoModalTitle: 'Аэросъемка с дрона 4K',
    closeModal: 'Закрыть',
    statusFinishedBadge: 'Сдан Госкомиссии',
    statusActiveBadge: 'В процессе строительства',
  },
  kg: {
    heroBadge: 'КУРУЛУШ КҮНДӨЛҮГҮ • EL ORDO GROUP',
    heroTitle: 'ОБЪЕКТТЕРДИН КУРУЛУШ ЖҮРҮШҮ',
    heroDesc: 'Дрондон тартылган ай сайынкы 4K видеолор жана ар бир этаптын фотолору. Үйүңүздүн курулушуна толук ачыктык менен көз салыңыз.',
    filterAll: 'Бардык комплекстер',
    watchDroneBtn: 'Дрон видеосун көрүү',
    workersLabel: 'Сменадагы куруучулар:',
    workersUnit: 'адам',
    cranesLabel: 'Башендик крандар:',
    cranesUnit: 'даана',
    readiness: 'Жалпы даярдыгы:',
    breakdownTitle: 'Негизги этаптар боюнча прогресс:',
    pointsTitle: 'Мезгил ичинде аткарылган иштер:',
    detailsBtn: 'Комплекс тууралуу',
    tourBadge: 'Жеке текшерүү',
    tourTitle: 'Курулуш аянтчасына жеке өзүңүз баргыңыз келеби?',
    tourDesc: 'Сатуу бөлүмүнүн инженери курулуп жаткан объект боюнча жеке экскурсия өткөрүп, кыштын сапатын жана болочоктогу батирдин көрүнүшүн көрсөтөт.',
    tourBtn: 'Экскурсияга жазылуу',
    tourWaText: 'Саламатсызбы! Мен курулуш аянтчасына жеке экскурсияга жазылгым келет: ',
    tourBannerWaText: 'Саламатсызбы! Мен EL ORDO GROUP объектилерине жеке экскурсияга жазылгым келет.',
    videoModalTitle: 'Дрондон 4K аэросъемка',
    closeModal: 'Жабуу',
    statusFinishedBadge: 'Мамкомиссияга тапшырылган',
    statusActiveBadge: 'Курулуп жатат',
  },
  kz: {
    heroBadge: 'ҚҰРЫЛЫС КҮНДЕЛІГІ • EL ORDO GROUP',
    heroTitle: 'НЫСАНДАРДЫҢ САЛЫНУ БАРЫСЫ',
    heroDesc: 'Дроннан түсірілген ай сайынғы 4K бейне есептер және фотофиксация. Үйіңіздің салынуына толық ашықтықпен қадағалаңыз.',
    filterAll: 'Барлық кешендер',
    watchDroneBtn: 'Дрон бейнесін көру',
    workersLabel: 'Ауысымдағы құрылысшылар:',
    workersUnit: 'адам',
    cranesLabel: 'Мұнаралы крандар:',
    cranesUnit: 'дана',
    readiness: 'Жалпы дайындығы:',
    breakdownTitle: 'Негізгі кезеңдер бойынша прогресс:',
    pointsTitle: 'Кезең ішінде орындалған жұмыстар:',
    detailsBtn: 'Кешен туралы',
    tourBadge: 'Жеке тексеру',
    tourTitle: 'Құрылыс алаңына жеке өзіңіз барғыңыз келе ме?',
    tourDesc: 'Сату бөлімінің инженері салынып жатқан нысан бойынша жеке экскурсия өткізіп, қалау сапасы мен болашақ пәтер көрінісін көрсетеді.',
    tourBtn: 'Экскурсияға жазылу',
    tourWaText: 'Сәлеметсіз бе! Мен құрылыс алаңына жеке экскурсияға жазылғым келеді: ',
    tourBannerWaText: 'Сәлеметсіз бе! Мен EL ORDO GROUP нысандарына жеке экскурсияға жазылғым келеді.',
    videoModalTitle: 'Дроннан 4K аэротүсірілім',
    closeModal: 'Жабу',
    statusFinishedBadge: 'Мемкомиссияға тапсырылды',
    statusActiveBadge: 'Құрылыс барысында',
  },
  uk: {
    heroBadge: 'ЩОДЕННИК БУДІВНИЦТВА • EL ORDO GROUP',
    heroTitle: 'ХІД БУДІВНИЦТВА ОБ’ЄКТІВ',
    heroDesc: 'Щомісячні 4K відеозвіти з дрона та фотофіксація кожного етапу. Слідкуйте за зведенням вашого будинку в реальному часі.',
    filterAll: 'Всі комплекси',
    watchDroneBtn: 'Дивитися відео з дрона',
    workersLabel: 'Будівельників на зміні:',
    workersUnit: 'осіб',
    cranesLabel: 'Баштових кранів:',
    cranesUnit: 'од.',
    readiness: 'Загальна готовність:',
    breakdownTitle: 'Прогрес за ключовими етапами:',
    pointsTitle: 'Виконані роботи за звітний період:',
    detailsBtn: 'Про комплекс',
    tourBadge: 'Персональний візит',
    tourTitle: 'Бажаєте особисто відвідати будівельний майданчик?',
    tourDesc: 'Інженер відділу продажів проведе для вас індивідуальну екскурсію будівельним майданчиком та покаже якість робіт.',
    tourBtn: 'Записатися на екскурсію',
    tourWaText: 'Доброго дня! Хочу записатися на персональну екскурсію на будівельний майданчик об’єкта ',
    tourBannerWaText: 'Доброго дня! Хочу записатися на індивідуальну екскурсію об’єктами EL ORDO GROUP.',
    videoModalTitle: 'Аерозйомка з дрона 4K',
    closeModal: 'Закрити',
    statusFinishedBadge: 'Зданий Держкомісії',
    statusActiveBadge: 'У процесі будівництва',
  },
  en: {
    heroBadge: 'CONSTRUCTION DIARY • EL ORDO GROUP',
    heroTitle: 'CONSTRUCTION PROGRESS REPORTS',
    heroDesc: 'Monthly 4K aerial drone walkthroughs and engineering stage updates. Watch your future home rise with complete accountability.',
    filterAll: 'All Developments',
    watchDroneBtn: 'Watch 4K Drone Video',
    workersLabel: 'Craftsmen on Shift:',
    workersUnit: 'pers.',
    cranesLabel: 'Tower Cranes Active:',
    cranesUnit: 'units',
    readiness: 'Overall Completion:',
    breakdownTitle: 'Milestone Progress Breakdown:',
    pointsTitle: 'Accomplished during the current cycle:',
    detailsBtn: 'Project Details',
    tourBadge: 'Site Inspection',
    tourTitle: 'Would you like to inspect the site in person?',
    tourDesc: 'Our project engineer will accompany you on an exclusive hard-hat site tour, showcasing brickwork craftsmanship and panoramic window vistas.',
    tourBtn: 'Book Personal Site Tour',
    tourWaText: 'Hello! I would like to book a private on-site inspection for development ',
    tourBannerWaText: 'Hello! I would like to book an individual on-site tour across EL ORDO GROUP developments.',
    videoModalTitle: '4K Drone Aerial Survey',
    closeModal: 'Close',
    statusFinishedBadge: 'Commissioned & Occupied',
    statusActiveBadge: 'Under Construction',
  },
  zh: {
    heroBadge: '工程进度家书 • EL ORDO GROUP',
    heroTitle: '各楼盘最新工程建设进度',
    heroDesc: '每月全景呈现4K超高清无人机航拍与实景工序复盘。恪守精工准则，让您从地基到封顶全程了然于心。',
    filterAll: '全部开发楼盘',
    watchDroneBtn: '观看4K航拍视频',
    workersLabel: '当班精工匠人：',
    workersUnit: '人',
    cranesLabel: '运行塔吊台数：',
    cranesUnit: '台',
    readiness: '综合完成度：',
    breakdownTitle: '关键施工工序节点细分：',
    pointsTitle: '本周期重要施工节点完成情况：',
    detailsBtn: '查看楼盘详情',
    tourBadge: '实地工地品鉴',
    tourTitle: '想亲自踏入工地实地感受精工品质？',
    tourDesc: '项目总工与置业顾问将为您安排专业安全护航的工地一对一实景探访，零距离见证用料与窗外视野。',
    tourBtn: '预约工地实地考察',
    tourWaText: '您好！我想预约前往施工现场进行一对一实地工程探访，目标楼盘：',
    tourBannerWaText: '您好！我想预约前往 EL ORDO GROUP 旗下开发楼盘施工现场进行一对一实景探访。',
    videoModalTitle: '4K全景航拍漫游',
    closeModal: '关闭',
    statusFinishedBadge: '已综合质检验收交付',
    statusActiveBadge: '正火热建设施工中',
  },
};

export default function ConstructionProgressPage() {
  const { locale, t: globalT } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const t = UI[currentLang] || UI.ru;

  const [selectedSlug, setSelectedSlug] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };

    if (activeVideo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideo]);

  const filteredReports = useMemo(() => {
    if (selectedSlug === 'all') return REPORTS;
    return REPORTS.filter((r) => r.projectSlug === selectedSlug);
  }, [selectedSlug]);

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
        </div>
      </section>

      {/* Фильтр по объектам (все 6 комплексов) */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {projectsFilterList.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setSelectedSlug(item.slug)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
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

      {/* Список отчетов с видео и подробными шкалами */}
      <section className="max-w-6xl mx-auto px-6 mt-10 space-y-12">
        {filteredReports.map((report) => {
          const waText = encodeURIComponent(`${t.tourWaText}"${report.projectName}"`);
          const waLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${waText}`;

          return (
            <article
              key={report.id}
              className="bg-white dark:bg-[#0b1b15] rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Медиа-блок */}
              <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-[500px] bg-neutral-900 overflow-hidden group">
                <Image
                  src={report.image}
                  alt={report.projectName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Бейджи вверху */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className={`text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5 shadow backdrop-blur-md ${
                    report.isFinished ? 'bg-emerald-800/90' : 'bg-[#064734]/90'
                  }`}>
                    {report.isFinished ? (
                      <IconCheck className="w-3.5 h-3.5 text-emerald-300" />
                    ) : (
                      <IconCalendar className="w-3.5 h-3.5 text-[#d4b26f]" />
                    )}
                    <span>{report.date[currentLang] || report.date.ru}</span>
                  </span>

                  {report.videoDuration && (
                    <span className="bg-[#d4b26f] text-[#064734] text-[11px] font-black uppercase px-3 py-1.5 rounded-xl shadow">
                      {report.videoDuration}
                    </span>
                  )}
                </div>

                {/* Центр: Кнопка воспроизведения видео с дрона */}
                {report.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 group-hover:bg-black/40 transition-colors">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveVideo({
                          url: report.videoUrl!,
                          title: `${report.projectName} • ${report.date[currentLang] || report.date.ru}`,
                        })
                      }
                      className="group/btn flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 dark:bg-[#07130e]/90 hover:bg-[#064734] dark:hover:bg-[#d4b26f] text-gray-900 dark:text-white hover:text-white dark:hover:text-[#064734] backdrop-blur-md border border-white/40 shadow-2xl transition-all duration-300 scale-100 hover:scale-105 cursor-pointer"
                    >
                      <span className="w-10 h-10 rounded-full bg-[#064734] group-hover/btn:bg-white text-white group-hover/btn:text-[#064734] flex items-center justify-center shadow transition-colors">
                        <svg className="w-4 h-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      <div className="text-left">
                        <span className="block text-xs font-black uppercase tracking-wider">
                          {t.watchDroneBtn}
                        </span>
                        <span className="block text-[10px] text-gray-500 dark:text-gray-400 group-hover/btn:text-white/80 dark:group-hover/btn:text-[#064734]/80">
                          {report.videoDuration}
                        </span>
                      </div>
                    </button>
                  </div>
                )}

                {/* Живой статус со стройплощадки внизу фото */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md text-white p-3.5 rounded-2xl border border-white/10 z-10">
                  <div className="grid grid-cols-2 gap-2 text-xs">
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
                  </div>
                </div>
              </div>

              {/* Текстовый блок со шкалами и выполненными работами */}
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
                      <IconArrowRight className="w-3 primary-icon" />
                    </Link>
                  </div>

                  <p className="text-xs font-bold text-[#8c6b23] dark:text-[#d4b26f] uppercase tracking-wider mb-5">
                    {report.stage[currentLang] || report.stage.ru}
                  </p>

                  {/* Общая шкала готовности */}
                  <div className="mb-5 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <div className="flex items-center justify-between text-xs font-black mb-1.5">
                      <span className="text-gray-600 dark:text-gray-300">{t.readiness}</span>
                      <span className="text-[#064734] dark:text-[#d4b26f] text-base font-black">
                        {report.progress}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          report.isFinished
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-r from-[#064734] to-[#d4b26f]'
                        }`}
                        style={{ width: `${report.progress}%` }}
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
                </div>

                {/* Кнопка записи на инспекцию или консультацию */}
                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#064734] hover:bg-[#042e22] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] hover:text-white dark:text-[#064734] font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <IconWhatsApp className="w-4 h-4" />
                    <span>{report.isFinished ? t.detailsBtn : t.tourBtn}</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Универсальное модальное окно */}
      {activeVideo && (() => {
        const { isDirectVideo, src } = formatVideoSource(activeVideo.url);

        return (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="bg-neutral-950 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:px-6 flex items-center justify-between border-b border-white/10 text-white bg-neutral-900">
                <span className="text-xs sm:text-sm font-black uppercase text-[#d4b26f]">
                  {activeVideo.title}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label={t.closeModal}
                >
                  ✕
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                {isDirectVideo ? (
                  <video
                    src={src}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={src}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Баннер экскурсии */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="bg-[#dbe3df] dark:bg-[#0b1b15] rounded-3xl p-8 sm:p-12 border border-[#064734]/15 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 transition-colors">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-wider text-[#064734] dark:text-[#d4b26f] block mb-1">
              {t.tourBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#064734] dark:text-white uppercase mb-2">
              {t.tourTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#064734]/85 dark:text-gray-300 leading-relaxed">
              {t.tourDesc}
            </p>
          </div>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(t.tourBannerWaText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#064734] hover:bg-[#032b20] dark:bg-[#064734] dark:hover:bg-[#0a4d38] text-white font-bold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 border border-transparent dark:border-white/10 cursor-pointer"
          >
            <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
            <span>{t.tourBtn}</span>
          </a>
        </div>
      </section>

    </main>
  );
}