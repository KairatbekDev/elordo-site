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
  IconMapPin,
} from '@/components/Icons';

interface ReportItem {
  id: string;
  projectSlug: string;
  projectName: string;
  date: Record<Locale, string>;
  stage: Record<Locale, string>;
  progress: number;
  image: string;
  isDrone?: boolean;
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
    progress: 42,
    image: '/projects/Abu-Dhabi.png',
    isDrone: true,
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
    progress: 68,
    image: '/projects/Madina-Residense.png',
    isDrone: true,
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
    progress: 54,
    image: '/projects/Aikolplus.png',
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
    date: {
      ru: 'Июль 2026',
      kg: 'Июль 2026',
      kz: 'Шілде 2026',
      uk: 'Липень 2026',
      en: 'July 2026',
      zh: '2026年7月',
    },
    stage: {
      ru: 'Фасадные работы и благоустройство',
      kg: 'Фасад иштери жана аймакты көрктөндүрүү',
      kz: 'Қасбет жұмыстары және аумақты абаттандыру',
      uk: 'Фасадні роботи та благоустрій',
      en: 'Façade finishes & courtyard landscaping',
      zh: '艺术外立面收尾与全景观庭院园林造景',
    },
    progress: 88,
    image: '/projects/ajkol.jpg',
    desc: {
      ru: 'Дом на финишной прямой перед сдачей в эксплуатацию. Полностью утеплен фасад базальтовой ватой толщиной 10 см. Установлены бесшумные скоростные лифты, начато мощение брусчатки во дворе.',
      kg: 'Үй пайдаланууга берүү алдында. Фасад 10 см базальт буласы менен жылууланды. Тез жүрүүчү тынч лифттер орнотулду, короого брусчатка төшөө башталды.',
      kz: 'Үй пайдалануға берудің алдында. Қасбет 10 см базальт жүнімен толық жылытылды. Шусыз жылдам лифттер орнатылды, аулаға тас төсеу басталды.',
      uk: 'Будинок на фінішній прямій перед здачею в експлуатацію. Фасад утеплено базальтовою ватою 10 см. Встановлено безшумні швидкісні ліфти, розпочато благоустрій двору.',
      en: 'Building in final completion stage before handover. 10cm basalt rockwool thermal insulation completed. Whisper-quiet high-speed elevators installed, paving active.',
      zh: '楼盘已全面迈入综合竣工交付收尾冲刺阶段。外墙全覆盖铺设100mm高密度防火玄武岩保温岩棉板。原装高速静音电梯完成安装与调试。',
    },
    points: {
      ru: [
        'Утепление фасада: 95%',
        'Установка скоростных лифтов: 100%',
        'Закрытый двор без машин: благоустройство',
      ],
      kg: [
        'Фасадды жылуулоо: 95%',
        'Тез жүрүүчү лифттерди орнотуу: 100%',
        'Унаасыз жабык короо: көрктөндүрүү',
      ],
      kz: [
        'Қасбетті жылыту: 95%',
        'Жылдам лифттерді орнату: 100%',
        'Көліксіз жабық аула: абаттандыру',
      ],
      uk: [
        'Утеплення фасаду: 95%',
        'Монтаж швидкісних ліфтів: 100%',
        'Закритий двір без машин: благоустрій',
      ],
      en: [
        'Façade insulation: 95%',
        'High-speed elevator installation: 100%',
        'Private car-free courtyard landscaping',
      ],
      zh: [
        '外立面一体化保温施工：95%',
        '智能静音高速客用电梯系统：100% 验收',
        '封闭式人车分流景观庭院石材铺装中',
      ],
    },
  },
];

const UI = {
  ru: {
    heroBadge: 'ДНЕВНИК СТРОЙКИ • EL ORDO GROUP',
    heroTitle: 'ХОД СТРОИТЕЛЬСТВА ОБЪЕКТОВ',
    heroDesc: 'Ежемесячные фото- и видеоотчеты с наших стройплощадок. Мы открыто демонстрируем каждый этап: от заливки фундамента до финишной отделки фасадов.',
    filterAll: 'Все комплексы',
    droneBadge: '4K Аэросъемка',
    readiness: 'Готовность объекта:',
    pointsTitle: 'Выполненные работы за период:',
    detailsBtn: 'О комплексе',
    tourBadge: 'Персональный аудит',
    tourTitle: 'Хотите лично посетить стройплощадку?',
    tourDesc: 'Инженер отдела продаж проведет для вас индивидуальную экскурсию в каске по строящемуся объекту, покажет качество кладки и вид из будущей квартиры.',
    tourBtn: 'Записаться на экскурсию',
    tourWaText: 'Здравствуйте! Хочу записаться на персональную экскурсию на стройплощадку объекта ',
  },
  kg: {
    heroBadge: 'КУРУЛУШ КҮНДӨЛҮГҮ • EL ORDO GROUP',
    heroTitle: 'ОБЪЕКТТЕРДИН КУРУЛУШ ЖҮРҮШҮ',
    heroDesc: 'Курулуш аянтчаларыбыздан ай сайын фото жана видео отчеттор. Биз ар бир этапты ачык көрсөтөбүз: пайдубал куюудан баштап фасад иштерине чейин.',
    filterAll: 'Бардык комплекстер',
    droneBadge: '4K Дрондон тартуу',
    readiness: 'Объекттин даярдыгы:',
    pointsTitle: 'Мезгил ичинде аткарылган иштер:',
    detailsBtn: 'Комплекс тууралуу',
    tourBadge: 'Жеке текшерүү',
    tourTitle: 'Курулуш аянтчасына жеке өзүңүз баргыңыз келеби?',
    tourDesc: 'Сатуу бөлүмүнүн инженери курулуп жаткан объект боюнча жеке экскурсия өткөрүп, кыштын сапатын жана болочоктогу батирдин көрүнүшүн көрсөтөт.',
    tourBtn: 'Экскурсияга жазылуу',
    tourWaText: 'Саламатсызбы! Мен курулуш аянтчасына жеке экскурсияга жазылгым келет: ',
  },
  kz: {
    heroBadge: 'ҚҰРЫЛЫС КҮНДЕЛІГІ • EL ORDO GROUP',
    heroTitle: 'НЫСАНДАРДЫҢ САЛЫНУ БАРЫСЫ',
    heroDesc: 'Құрылыс алаңдарымыздан ай сайынғы фото және бейне есептер. Біз іргетас құюдан бастап қасбетті әрлеуге дейінгі барлық кезеңді ашық көрсетеміз.',
    filterAll: 'Барлық кешендер',
    droneBadge: '4K Дрон түсірілімі',
    readiness: 'Нысанның дайындығы:',
    pointsTitle: 'Кезең ішінде орындалған жұмыстар:',
    detailsBtn: 'Кешен туралы',
    tourBadge: 'Жеке тексеру',
    tourTitle: 'Құрылыс алаңына жеке өзіңіз барғыңыз келе ме?',
    tourDesc: 'Сату бөлімінің инженері салынып жатқан нысан бойынша жеке экскурсия өткізіп, қалау сапасы мен болашақ пәтер көрінісін көрсетеді.',
    tourBtn: 'Экскурсияға жазылу',
    tourWaText: 'Сәлеметсіз бе! Мен құрылыс алаңына жеке экскурсияға жазылғым келеді: ',
  },
  uk: {
    heroBadge: 'ЩОДЕННИК БУДІВНИЦТВА • EL ORDO GROUP',
    heroTitle: 'ХІД БУДІВНИЦТВА ОБ’ЄКТІВ',
    heroDesc: 'Щомісячні фото- та відеозвіти з наших будівельних майданчиків. Ми відкрито демонструємо кожен етап: від заливки фундаменту до оздоблення фасаду.',
    filterAll: 'Всі комплекси',
    droneBadge: '4K Аерозйомка',
    readiness: 'Готовність об’єкта:',
    pointsTitle: 'Виконані роботи за період:',
    detailsBtn: 'Про комплекс',
    tourBadge: 'Персональний візит',
    tourTitle: 'Бажаєте особисто відвідати будівельний майданчик?',
    tourDesc: 'Інженер відділу продажів проведе для вас індивідуальну екскурсію будівельним майданчиком та покаже якість робіт.',
    tourBtn: 'Записатися на екскурсію',
    tourWaText: 'Доброго дня! Хочу записатися на персональну екскурсію на будівельний майданчик об’єкта ',
  },
  en: {
    heroBadge: 'CONSTRUCTION DIARY • EL ORDO GROUP',
    heroTitle: 'CONSTRUCTION PROGRESS REPORTS',
    heroDesc: 'Monthly verified photographic and drone progress logs from our sites. We maintain transparent reporting from foundation engineering to façade installation.',
    filterAll: 'All Developments',
    droneBadge: '4K Drone Aerial',
    readiness: 'Development Completion:',
    pointsTitle: 'Works accomplished during the period:',
    detailsBtn: 'Project Details',
    tourBadge: 'Site Inspection',
    tourTitle: 'Would you like to inspect the site in person?',
    tourDesc: 'Our project engineer will accompany you on an exclusive hard-hat site tour, showcasing brickwork craftsmanship and panoramic window vistas.',
    tourBtn: 'Book Personal Site Tour',
    tourWaText: 'Hello! I would like to book a private on-site inspection for development ',
  },
  zh: {
    heroBadge: '工程进度家书 • EL ORDO GROUP',
    heroTitle: '各楼盘最新工程建设进度',
    heroDesc: '直击施工现场一手高清影像与无人机航拍全景。我们坚持严谨透明的精工履约原则，向全球业主如实呈现从深基坑浇筑到外立面落成的每一道工序。',
    filterAll: '全部开发楼盘',
    droneBadge: '4K超清航拍巡检',
    readiness: '综合施工进度：',
    pointsTitle: '本施工周期重点节点总结：',
    detailsBtn: '查看楼盘详情',
    tourBadge: '实地工地品鉴',
    tourTitle: '想亲自踏入工地实地感受精工品质？',
    tourDesc: '项目总工与置业顾问将为您安排专业安全护航的工地一对一实景探访，零距离见证钢筋红砖用料与未来居所窗外视野。',
    tourBtn: '预约工地实地考察',
    tourWaText: '您好！我想预约前往施工现场进行一对一实地工程探访，目标楼盘：',
  },
};

export default function ConstructionProgressPage() {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const t = UI[currentLang] || UI.ru;

  const [selectedSlug, setSelectedSlug] = useState<string>('all');

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

      {/* Список отчетов */}
      <section className="max-w-6xl mx-auto px-6 mt-10 space-y-10">
        {filteredReports.map((report) => {
          const waText = encodeURIComponent(`${t.tourWaText}"${report.projectName}"`);
          const waLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${waText}`;

          return (
            <article
              key={report.id}
              className="bg-white dark:bg-[#0b1b15] rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Фото/Видео медиа блок */}
              <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[440px] bg-neutral-900 overflow-hidden group">
                <img
                  src={report.image}
                  alt={report.projectName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Бейдж с датой */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-[#064734]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5 shadow">
                    <IconCalendar className="w-3.5 h-3.5 text-[#d4b26f]" />
                    <span>{report.date[currentLang] || report.date.ru}</span>
                  </span>

                  {report.isDrone && (
                    <span className="bg-[#d4b26f] text-[#064734] text-[11px] font-extrabold uppercase px-3 py-1.5 rounded-xl shadow">
                      {t.droneBadge}
                    </span>
                  )}
                </div>

                {/* Плашка ЖК внизу фото */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md text-white p-3 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold uppercase text-[#d4b26f]">{report.projectName}</span>
                    <span className="text-gray-300">{report.stage[currentLang] || report.stage.ru}</span>
                  </div>
                </div>
              </div>

              {/* Текстовый блок с прогрессом */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
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

                  <p className="text-xs font-bold text-[#8c6b23] dark:text-[#d4b26f] uppercase tracking-wider mb-4">
                    {report.stage[currentLang] || report.stage.ru}
                  </p>

                  {/* Шкала готовности объекта */}
                  <div className="mb-6 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <div className="flex items-center justify-between text-xs font-black mb-2">
                      <span className="text-gray-600 dark:text-gray-300">{t.readiness}</span>
                      <span className="text-[#064734] dark:text-[#d4b26f] text-sm">{report.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#064734] to-[#d4b26f] rounded-full transition-all duration-1000"
                        style={{ width: `${report.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Описание работ */}
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {report.desc[currentLang] || report.desc.ru}
                  </p>

                  {/* Выполненные пункты */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-neutral-400 block">
                      {t.pointsTitle}
                    </span>
                    {(report.points[currentLang] || report.points.ru).map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-200 font-medium">
                        <IconCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
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

      {/* Баннер персональной экскурсии */}
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