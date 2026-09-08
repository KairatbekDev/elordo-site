'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
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
  date: Record<Locale, string>;
  stage: Record<Locale, string>;
  progress: number;
  image: string;
  videoUrl?: string; // Ссылка на YouTube Embed (например, https://www.youtube.com/embed/dQw4w9WgXcQ)
  videoDuration?: string;
  workersOnSite: number;
  cranesOnSite: number;
  breakdown: ProgressBreakdown[];
  desc: Record<Locale, string>;
  points: Record<Locale, string[]>;
}

const REPORTS: ReportItem[] = [
  {
    id: 'rep-abu-dhabi-1',
    projectSlug: 'abu-dhabi',
    projectName: 'ЖК Abu Dhabi',
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
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Замените на реальный YouTube ID видео с дрона
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
];

const UI = {
  ru: {
    heroBadge: 'ДНЕВНИК СТРОЙКИ • EL ORDO GROUP',
    heroTitle: 'ХОД СТРОИТЕЛЬСТВА ОБЪЕКТОВ',
    heroDesc: 'Ежемесячные 4K видеоотчеты с дрона и фотофиксация каждого этапа. Следите за возведением вашего дома в реальном времени с полной прозрачностью.',
    filterAll: 'Все комплексы',
    watchDroneBtn: 'Смотреть видео с дрона',
    workersLabel: 'Строителей на смене:',
    cranesLabel: 'Башенных кранов:',
    readiness: 'Общая готовность:',
    breakdownTitle: 'Прогресс по ключевым этапам:',
    pointsTitle: 'Выполненные работы за отчетный период:',
    detailsBtn: 'О комплексе',
    tourBadge: 'Персональный аудит',
    tourTitle: 'Хотите лично посетить стройплощадку?',
    tourDesc: 'Инженер отдела продаж проведет для вас индивидуальную экскурсию в каске по строящемуся объекту, покажет качество кладки и вид из будущей квартиры.',
    tourBtn: 'Записаться на экскурсию',
    tourWaText: 'Здравствуйте! Хочу записаться на персональную экскурсию на стройплощадку объекта ',
    videoModalTitle: 'Аэросъемка с дрона 4K',
    closeModal: 'Закрыть',
  },
  kg: {
    heroBadge: 'КУРУЛУШ КҮНДӨЛҮГҮ • EL ORDO GROUP',
    heroTitle: 'ОБЪЕКТТЕРДИН КУРУЛУШ ЖҮРҮШҮ',
    heroDesc: 'Дрондон тартылган ай сайынкы 4K видеолор жана ар бир этаптын фотолору. Үйүңүздүн курулушуна толук ачыктык менен көз салыңыз.',
    filterAll: 'Бардык комплекстер',
    watchDroneBtn: 'Дрон видеосун көрүү',
    workersLabel: 'Сменадагы куруучулар:',
    cranesLabel: 'Башендик крандар:',
    readiness: 'Жалпы даярдыгы:',
    breakdownTitle: 'Негизги этаптар боюнча прогресс:',
    pointsTitle: 'Мезгил ичинде аткарылган иштер:',
    detailsBtn: 'Комплекс тууралуу',
    tourBadge: 'Жеке текшерүү',
    tourTitle: 'Курулуш аянтчасына жеке өзүңүз баргыңыз келеби?',
    tourDesc: 'Сатуу бөлүмүнүн инженери курулуп жаткан объект боюнча жеке экскурсия өткөрүп, кыштын сапатын жана болочоктогу батирдин көрүнүшүн көрсөтөт.',
    tourBtn: 'Экскурсияга жазылуу',
    tourWaText: 'Саламатсызбы! Мен курулуш аянтчасына жеке экскурсияга жазылгым келет: ',
    videoModalTitle: 'Дрондон 4K аэросъемка',
    closeModal: 'Жабуу',
  },
  kz: {
    heroBadge: 'ҚҰРЫЛЫС КҮНДЕЛІГІ • EL ORDO GROUP',
    heroTitle: 'НЫСАНДАРДЫҢ САЛЫНУ БАРЫСЫ',
    heroDesc: 'Дроннан түсірілген ай сайынғы 4K бейне есептер және фотофиксация. Үйіңіздің салынуына толық ашықтықпен қадағалаңыз.',
    filterAll: 'Барлық кешендер',
    watchDroneBtn: 'Дрон бейнесін көру',
    workersLabel: 'Ауысымдағы құрылысшылар:',
    cranesLabel: 'Мұнаралы крандар:',
    readiness: 'Жалпы дайындығы:',
    breakdownTitle: 'Негізгі кезеңдер бойынша прогресс:',
    pointsTitle: 'Кезең ішінде орындалған жұмыстар:',
    detailsBtn: 'Кешен туралы',
    tourBadge: 'Жеке тексеру',
    tourTitle: 'Құрылыс алаңына жеке өзіңіз барғыңыз келе ме?',
    tourDesc: 'Сату бөлімінің инженері салынып жатқан нысан бойынша жеке экскурсия өткізіп, қалау сапасы мен болашақ пәтер көрінісін көрсетеді.',
    tourBtn: 'Экскурсияға жазылу',
    tourWaText: 'Сәлеметсіз бе! Мен құрылыс алаңына жеке экскурсияға жазылғым келеді: ',
    videoModalTitle: 'Дроннан 4K аэротүсірілім',
    closeModal: 'Жабу',
  },
  uk: {
    heroBadge: 'ЩОДЕННИК БУДІВНИЦТВА • EL ORDO GROUP',
    heroTitle: 'ХІД БУДІВНИЦТВА ОБ’ЄКТІВ',
    heroDesc: 'Щомісячні 4K відеозвіти з дрона та фотофіксація кожного етапу. Слідкуйте за зведенням вашого будинку в реальному часі.',
    filterAll: 'Всі комплекси',
    watchDroneBtn: 'Дивитися відео з дрона',
    workersLabel: 'Будівельників на зміні:',
    cranesLabel: 'Баштових кранів:',
    readiness: 'Загальна готовність:',
    breakdownTitle: 'Прогрес за ключовими етапами:',
    pointsTitle: 'Виконані роботи за звітний період:',
    detailsBtn: 'Про комплекс',
    tourBadge: 'Персональний візит',
    tourTitle: 'Бажаєте особисто відвідати будівельний майданчик?',
    tourDesc: 'Інженер відділу продажів проведе для вас індивідуальну екскурсію будівельним майданчиком та покаже якість робіт.',
    tourBtn: 'Записатися на екскурсію',
    tourWaText: 'Доброго дня! Хочу записатися на персональну екскурсію на будівельний майданчик об’єкта ',
    videoModalTitle: 'Аерозйомка з дрона 4K',
    closeModal: 'Закрити',
  },
  en: {
    heroBadge: 'CONSTRUCTION DIARY • EL ORDO GROUP',
    heroTitle: 'CONSTRUCTION PROGRESS REPORTS',
    heroDesc: 'Monthly 4K aerial drone walkthroughs and engineering stage updates. Watch your future home rise with complete accountability.',
    filterAll: 'All Developments',
    watchDroneBtn: 'Watch 4K Drone Video',
    workersLabel: 'Craftsmen on Shift:',
    cranesLabel: 'Tower Cranes Active:',
    readiness: 'Overall Completion:',
    breakdownTitle: 'Milestone Progress Breakdown:',
    pointsTitle: 'Accomplished during the current cycle:',
    detailsBtn: 'Project Details',
    tourBadge: 'Site Inspection',
    tourTitle: 'Would you like to inspect the site in person?',
    tourDesc: 'Our project engineer will accompany you on an exclusive hard-hat site tour, showcasing brickwork craftsmanship and panoramic window vistas.',
    tourBtn: 'Book Personal Site Tour',
    tourWaText: 'Hello! I would like to book a private on-site inspection for development ',
    videoModalTitle: '4K Drone Aerial Survey',
    closeModal: 'Close',
  },
  zh: {
    heroBadge: '工程进度家书 • EL ORDO GROUP',
    heroTitle: '各楼盘最新工程建设进度',
    heroDesc: '每月全景呈现4K超高清无人机航拍与实景工序复盘。恪守精工准则，让您从地基到封顶全程了然于心。',
    filterAll: '全部开发楼盘',
    watchDroneBtn: '观看4K航拍视频',
    workersLabel: '当班精工匠人：',
    cranesLabel: '运行塔吊台数：',
    readiness: '综合完成度：',
    breakdownTitle: '关键施工工序节点细分：',
    pointsTitle: '本周期重要施工节点完成情况：',
    detailsBtn: '查看楼盘详情',
    tourBadge: '实地工地品鉴',
    tourTitle: '想亲自踏入工地实地感受精工品质？',
    tourDesc: '项目总工与置业顾问将为您安排专业安全护航的工地一对一实景探访，零距离见证用料与窗外视野。',
    tourBtn: '预约工地实地考察',
    tourWaText: '您好！我想预约前往施工现场进行一对一实地工程探访，目标楼盘：',
    videoModalTitle: '4K全景航拍漫游',
    closeModal: '关闭',
  },
};

export default function ConstructionProgressPage() {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const t = UI[currentLang] || UI.ru;

  const [selectedSlug, setSelectedSlug] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  const filteredReports = useMemo(() => {
    if (selectedSlug === 'all') return REPORTS;
    return REPORTS.filter((r) => r.projectSlug === selectedSlug);
  }, [selectedSlug]);

  const projectsFilterList = [
    { slug: 'all', label: t.filterAll },
    { slug: 'abu-dhabi', label: 'ЖК Abu Dhabi' },
    { slug: 'madina-residence', label: 'ЖК Madina Residence' },
    { slug: 'ajkol-plus', label: 'ЖД Айкол +' },
  ];

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200 pb-20">
      
      {/* Хлебные крошки */}
      <div className="bg-white dark:bg-[#0b1b15] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
            Главная
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

      {/* Фильтр по объектам */}
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
              {/* Медиа-блок (Превью + Кнопка запуска 4K видео) */}
              <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-[500px] bg-neutral-900 overflow-hidden group">
                <img
                  src={report.image}
                  alt={report.projectName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Бейджи вверху */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className="bg-[#064734]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5 shadow">
                    <IconCalendar className="w-3.5 h-3.5 text-[#d4b26f]" />
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
                      <strong className="font-extrabold text-[#d4b26f]">{report.workersOnSite} чел.</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] block">{t.cranesLabel}</span>
                      <strong className="font-extrabold text-white">{report.cranesOnSite} ед.</strong>
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
                      <IconArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <p className="text-xs font-bold text-[#8c6b23] dark:text-[#d4b26f] uppercase tracking-wider mb-5">
                    {report.stage[currentLang] || report.stage.ru}
                  </p>

                  {/* Общая шкала готовности */}
                  <div className="mb-5 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <div className="flex items-center justify-between text-xs font-black mb-1.5">
                      <span className="text-gray-600 dark:text-gray-300">{t.readiness}</span>
                      <span className="text-[#064734] dark:text-[#d4b26f] text-base">{report.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#064734] to-[#d4b26f] rounded-full transition-all duration-1000"
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
                              className="h-full bg-[#064734] dark:bg-[#d4b26f] rounded-full"
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

                {/* Кнопка записи на инспекцию */}
                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#064734] hover:bg-[#042e22] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] hover:text-white dark:text-[#064734] font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <IconWhatsApp className="w-4 h-4" />
                    <span>{t.tourBtn}</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Модальное окно просмотра видео с дрона */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="bg-neutral-900 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:px-6 flex items-center justify-between border-b border-white/10 text-white">
              <span className="text-xs sm:text-sm font-black uppercase text-[#d4b26f]">
                {activeVideo.title}
              </span>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`${activeVideo.url}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

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
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу записаться на индивидуальную экскурсию по объектам EL ORDO GROUP.')}`}
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