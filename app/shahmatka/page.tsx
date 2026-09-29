'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { COMPANY_INFO } from '@/lib/data';
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
  rooms: 1 | 2 | 3;
  area: number;
  status: 'free' | 'reserved' | 'sold';
  pricePerMeter: number;
  windowsView: Record<Locale, string>;
}

interface ProjectData {
  slug: string;
  name: string;
  floorsCount: number;
  pricePerMeter: number;
  deliveryDate: Record<Locale, string>;
  apartments: Apartment[];
}

// Генерация реалистичной сетки квартир для строящихся объектов
function generateApartments(projectSlug: string, floors: number, price: number): Apartment[] {
  const apts: Apartment[] = [];
  let aptNum = 1;

  for (let f = 2; f <= floors; f++) {
    // 4 квартиры на этаже: две 1-к, одна 2-к, одна 3-к
    const configs: { rooms: 1 | 2 | 3; area: number; view: Record<Locale, string> }[] = [
      {
        rooms: 1,
        area: projectSlug === 'abu-dhabi' ? 48.5 : 44.2,
        view: { ru: 'Во двор и на парк', kg: 'Короого жана сейил бакка', kz: 'Аулаға және саябаққа', uk: 'У двір та на парк', en: 'Courtyard & Park view', zh: '内院景观与城市绿意' },
      },
      {
        rooms: 2,
        area: projectSlug === 'abu-dhabi' ? 74.8 : 68.4,
        view: { ru: 'Панорама гор Ала-Тоо', kg: 'Ала-Тоо тоолору', kz: 'Ала-Тау панорамасы', uk: 'Панорама гір Ала-Тоо', en: 'Ala-Too Mountains Panorama', zh: '阿拉套山脉全景天幕' },
      },
      {
        rooms: 1,
        area: projectSlug === 'abu-dhabi' ? 52.0 : 46.8,
        view: { ru: 'Юго-восток, утреннее солнце', kg: 'Түштүк-чыгыш, таңкы күн', kz: 'Оңтүстік-шығыс, таңғы күн', uk: 'Південний схід', en: 'South-East morning sun', zh: '东南朝向晨光充沛' },
      },
      {
        rooms: 3,
        area: projectSlug === 'abu-dhabi' ? 104.2 : 94.6,
        view: { ru: 'Двухсторонняя (горы и город)', kg: 'Эки тараптуу (тоо жана шаар)', kz: 'Екі жақты (тау мен қала)', uk: 'Двостороння (гори та місто)', en: 'Dual aspect (Mountains & City)', zh: '南北双向通透（山景与城央）' },
      },
    ];

    configs.forEach((cfg) => {
      // Имитация естественной распроданности: нижние и часть верхних проданы/забронированы
      const rand = (aptNum * 17 + f * 7) % 100;
      let status: 'free' | 'reserved' | 'sold' = 'free';
      if (rand < 40) status = 'sold';
      else if (rand < 58) status = 'reserved';

      apts.push({
        id: `${projectSlug}-${aptNum}`,
        number: aptNum,
        floor: f,
        rooms: cfg.rooms,
        area: cfg.area,
        status,
        pricePerMeter: price,
        windowsView: cfg.view,
      });
      aptNum++;
    });
  }

  return apts;
}

const PROJECTS_DATA: ProjectData[] = [
  {
    slug: 'abu-dhabi',
    name: 'ЖК Abu Dhabi',
    floorsCount: 14,
    pricePerMeter: 1650,
    deliveryDate: {
      ru: '4 квартал 2027 г.',
      kg: '2027-жылдын 4-кварталы',
      kz: '2027 жылдың 4-тоқсаны',
      uk: '4 квартал 2027 р.',
      en: 'Q4 2027',
      zh: '2027年第4季度',
    },
    apartments: generateApartments('abu-dhabi', 14, 1650),
  },
  {
    slug: 'madina-residence',
    name: 'ЖК Madina Residence',
    floorsCount: 14,
    pricePerMeter: 1500,
    deliveryDate: {
      ru: '2 квартал 2027 г.',
      kg: '2027-жылдын 2-кварталы',
      kz: '2027 жылдың 2-тоқсаны',
      uk: '2 квартал 2027 р.',
      en: 'Q2 2027',
      zh: '2027年第2季度',
    },
    apartments: generateApartments('madina-residence', 14, 1500),
  },
  {
    slug: 'ajkol-plus',
    name: 'ЖД Айкол +',
    floorsCount: 9,
    pricePerMeter: 1200,
    deliveryDate: {
      ru: '1 квартал 2027 г.',
      kg: '2027-жылдын 1-кварталы',
      kz: '2027 жылдың 1-тоқсаны',
      uk: '1 квартал 2027 р.',
      en: 'Q1 2027',
      zh: '2027年第1季度',
    },
    apartments: generateApartments('ajkol-plus', 9, 1200),
  },
];

const UI_TEXTS: Record<Locale, {
  badge: string;
  title: string;
  desc: string;
  selectProject: string;
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
  closeBtn: string;
  formNamePh: string;
  formPhonePh: string;
  quickNote: string;
}> = {
  ru: {
    badge: 'ИНТЕРАКТИВНАЯ ШАХМАТКА • EL ORDO GROUP',
    title: 'ОНЛАЙН-ПОДБОР КВАРТИР ПО ЭТАЖАМ',
    desc: 'Выберите жилой комплекс, этаж и комнатность. Нажмите на свободную квартиру для мгновенного расчета графика рассрочки 0% или бронирования.',
    selectProject: 'Выберите жилой комплекс:',
    roomsFilter: 'Комнатность:',
    allRooms: 'Все квартиры',
    room1: '1-комнатные',
    room2: '2-комнатные',
    room3: '3-комнатные',
    statusFree: 'Свободна',
    statusReserved: 'Бронь',
    statusSold: 'Продана',
    floorLabel: 'этаж',
    onlyFreeToggle: 'Показать только свободные',
    modalTitle: 'Карточка квартиры №',
    areaLabel: 'Площадь:',
    totalPriceLabel: 'Полная стоимость:',
    firstPayLabel: 'Первоначальный взнос (30%):',
    monthlyPayLabel: 'Ежемесячный платеж (0% на 36 мес.):',
    installmentPeriod: 'Беспроцентная рассрочка напрямую от девелопера без банка',
    windowsLabel: 'Вид из окон:',
    bookWaBtn: 'Забронировать в WhatsApp',
    requestCallBtn: 'Заказать звонок по этой квартире',
    callSuccessTitle: 'Запрос на бронь принят!',
    callSuccessDesc: 'Менеджер отдела продаж свяжется с вами в течение 5 минут с брошюрой данной квартиры.',
    closeBtn: 'Закрыть',
    formNamePh: 'Ваше имя',
    formPhonePh: '+996 (700) 00-00-00',
    quickNote: 'Бронирование бесплатное и фиксирует стоимость метра на 3 дня.',
  },
  kg: {
    badge: 'ИНТЕРАКТИВДҮҮ ШАХМАТКА • EL ORDO GROUP',
    title: 'КАБАТТАР БОЮНЧА БАТИР ТАНДОО',
    desc: 'Комплексти, кабатты жана бөлмө санын тандаңыз. 0% бөлүп төлөө графигин көрүү жана ээлөө үчүн батирди басыңыз.',
    selectProject: 'Турак жай комплексин тандаңыз:',
    roomsFilter: 'Бөлмөлөр:',
    allRooms: 'Бардык батирлер',
    room1: '1 бөлмөлүү',
    room2: '2 бөлмөлүү',
    room3: '3 бөлмөлүү',
    statusFree: 'Бош',
    statusReserved: 'Бронь',
    statusSold: 'Сатылган',
    floorLabel: 'кабат',
    onlyFreeToggle: 'Бошторду гана көрсөтүү',
    modalTitle: 'Батирдин маалыматы №',
    areaLabel: 'Аянты:',
    totalPriceLabel: 'Жалпы баасы:',
    firstPayLabel: 'Баштапкы төлөм (30%):',
    monthlyPayLabel: 'Ай сайын (36 айга 0%):',
    installmentPeriod: 'Банксыз куруучудан 0% үстөксүз бөлүп төлөө',
    windowsLabel: 'Терезеден көрүнүш:',
    bookWaBtn: 'WhatsApp аркылуу ээлөө',
    requestCallBtn: 'Бул батир боюнча чалууга заказ берүү',
    callSuccessTitle: 'Табыштама кабыл алынды!',
    callSuccessDesc: 'Сатуу бөлүмү 5 мүнөттө байланышып, бул батирдин толук планын жөнөтөт.',
    closeBtn: 'Жабуу',
    formNamePh: 'Атыңыз',
    formPhonePh: '+996 (700) 00-00-00',
    quickNote: 'Ээлеп коюу акысыз жана бааны 3 күнгө бекитет.',
  },
  kz: {
    badge: 'ИНТЕРАКТИВТІ ШАХМАТКА • EL ORDO GROUP',
    title: 'ҚАБАТТАР БОЙЫНША ПӘТЕР ТАҢДАУ',
    desc: 'Тұрғын үй кешенін, қабат пен бөлме санын таңдаңыз. 0% бөліп төлеу есебін көру үшін пәтерді басыңыз.',
    selectProject: 'Кешенді таңдаңыз:',
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
    modalTitle: 'Пәтер карточкасы №',
    areaLabel: 'Ауданы:',
    totalPriceLabel: 'Жалпы құны:',
    firstPayLabel: 'Бастапқы жарна (30%):',
    monthlyPayLabel: 'Ай сайын (36 айға 0%):',
    installmentPeriod: 'Құрылыс салушыдан банксіз 0% бөліп төлеу',
    windowsLabel: 'Терезе көрінісі:',
    bookWaBtn: 'WhatsApp-та брондау',
    requestCallBtn: 'Қоңырауға тапсырыс беру',
    callSuccessTitle: 'Өтінім қабылданды!',
    callSuccessDesc: 'Менеджер 5 минут ішінде хабарласып, пәтер жоспарын ұсынады.',
    closeBtn: 'Жабу',
    formNamePh: 'Атыңыз',
    formPhonePh: '+996 (700) 00-00-00',
    quickNote: 'Брондау тегін және бағаны 3 күнге бекітеді.',
  },
  uk: {
    badge: 'ІНТЕРАКТИВНА ШАХМАТКА • EL ORDO GROUP',
    title: 'ОНЛАЙН-ПІДБІР КВАРТИР ЗА ПОВЕРХАМИ',
    desc: 'Оберіть комплекс, поверх та кімнатність. Натисніть на вільну квартиру для швидкого розрахунку розстрочки 0%.',
    selectProject: 'Оберіть житловий комплекс:',
    roomsFilter: 'Кімнатність:',
    allRooms: 'Всі квартири',
    room1: '1-кімнатні',
    room2: '2-кімнатні',
    room3: '3-кімнатні',
    statusFree: 'Вільна',
    statusReserved: 'Бронь',
    statusSold: 'Продана',
    floorLabel: 'поверх',
    onlyFreeToggle: 'Тільки вільні квартири',
    modalTitle: 'Картка квартири №',
    areaLabel: 'Площа:',
    totalPriceLabel: 'Загальна вартість:',
    firstPayLabel: 'Перший внесок (30%):',
    monthlyPayLabel: 'Щомісячний платіж (0% на 36 міс.):',
    installmentPeriod: 'Розстрочка від девелопера 0% без банку',
    windowsLabel: 'Вид із вікон:',
    bookWaBtn: 'Забронювати у WhatsApp',
    requestCallBtn: 'Замовити дзвінок',
    callSuccessTitle: 'Запит прийнято!',
    callSuccessDesc: 'Менеджер зв’яжеться з вами за 5 хвилин із плануванням.',
    closeBtn: 'Закрити',
    formNamePh: 'Ваше ім’я',
    formPhonePh: '+996 (700) 00-00-00',
    quickNote: 'Бронювання безкоштовне та фіксує ціну на 3 дні.',
  },
  en: {
    badge: 'INTERACTIVE FLOOR GRID • EL ORDO GROUP',
    title: 'ONLINE APARTMENT SELECTION GRID',
    desc: 'Select development, floor and room count. Click on any available apartment to calculate customized 0% installment or reserve immediately.',
    selectProject: 'Select Development:',
    roomsFilter: 'Bedrooms:',
    allRooms: 'All Units',
    room1: '1-Bedroom',
    room2: '2-Bedroom',
    room3: '3-Bedroom',
    statusFree: 'Available',
    statusReserved: 'Reserved',
    statusSold: 'Sold',
    floorLabel: 'Floor',
    onlyFreeToggle: 'Show Available Units Only',
    modalTitle: 'Apartment Unit #',
    areaLabel: 'Total Area:',
    totalPriceLabel: 'Total Price:',
    firstPayLabel: 'Down Payment (30%):',
    monthlyPayLabel: 'Monthly Payment (0% / 36 mo):',
    installmentPeriod: 'Direct zero-interest developer installment without banks',
    windowsLabel: 'Window View:',
    bookWaBtn: 'Reserve Unit via WhatsApp',
    requestCallBtn: 'Request Callback for this Unit',
    callSuccessTitle: 'Reservation Request Received!',
    callSuccessDesc: 'Our sales specialist will reach out within 5 minutes with the architectural floor plan.',
    closeBtn: 'Close',
    formNamePh: 'Your Name',
    formPhonePh: '+996 (700) 00-00-00',
    quickNote: 'Reservation is complimentary and locks the price for 3 business days.',
  },
  zh: {
    badge: '全景交互式在线销控表 • EL ORDO GROUP',
    title: '各楼盘逐层可视化房源选房系统',
    desc: '轻点楼盘、楼层与居室格局，即刻测算0%免息分期首付与月供，一键锁定心仪房源。',
    selectProject: '选择意向开发楼盘：',
    roomsFilter: '居室户型：',
    allRooms: '全部在售单元',
    room1: '一居室优选',
    room2: '二居室轻奢',
    room3: '三居室天幕大宅',
    statusFree: '可售',
    statusReserved: '已预订',
    statusSold: '已售罄',
    floorLabel: '层',
    onlyFreeToggle: '仅显示可售优质房源',
    modalTitle: '房源详情编号 #',
    areaLabel: '建筑面积：',
    totalPriceLabel: '房源参考总价：',
    firstPayLabel: '首期款比例（30%）：',
    monthlyPayLabel: '预估月供（0%免息 36期）：',
    installmentPeriod: '开发商直签零利息自营分期，无需银行审核',
    windowsLabel: '景观朝向：',
    bookWaBtn: '在 WhatsApp 中一键锁定房源',
    requestCallBtn: '预约该房源专属回电',
    callSuccessTitle: '房源预约申请已受理！',
    callSuccessDesc: '专属置业经理将在5分钟内致电并发送该房源高清CAD建筑图纸。',
    closeBtn: '关闭',
    formNamePh: '您的姓名',
    formPhonePh: '+996 (700) 00-00-00',
    quickNote: '线上锁房享3天优先选房权与签约底价锁定。',
  },
};

export default function ShahmatkaPage() {
  const { locale, t: globalT } = useLanguage();
  const currentLang: Locale = normalizeLocale(locale);
  const ui = UI_TEXTS[currentLang] || UI_TEXTS.ru;

  const [activeProjectSlug, setActiveProjectSlug] = useState<string>('abu-dhabi');
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

  // Группировка квартир по этажам (от верхнего к нижнему)
  const floorsList = useMemo(() => {
    const list: { floor: number; apts: Apartment[] }[] = [];
    for (let f = currentProject.floorsCount; f >= 2; f--) {
      let fApts = currentProject.apartments.filter((a) => a.floor === f);
      if (selectedRooms !== 'all') {
        fApts = fApts.filter((a) => a.rooms === selectedRooms);
      }
      if (onlyFree) {
        fApts = fApts.filter((a) => a.status === 'free');
      }
      list.push({ floor: f, apts: fApts });
    }
    return list;
  }, [currentProject, selectedRooms, onlyFree]);

  // Статистика проекта
  const stats = useMemo(() => {
    const total = currentProject.apartments.length;
    const free = currentProject.apartments.filter((a) => a.status === 'free').length;
    const reserved = currentProject.apartments.filter((a) => a.status === 'reserved').length;
    const sold = currentProject.apartments.filter((a) => a.status === 'sold').length;
    return { total, free, reserved, sold };
  }, [currentProject]);

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

  // Отправка заявки на конкретную квартиру
  const handleAptLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApartment || formSubmitting) return;

    setFormSubmitting(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName.trim() || 'Потенциальный покупатель',
          phone: formPhone,
          project: `${currentProject.name} — Квартира №${activeApartment.number} (${activeApartment.area} м², ${activeApartment.floor} эт.)`,
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

    const text = encodeURIComponent(
      `Здравствуйте! Меня интересует бронирование по шахматке:\n\n• Объект: ${currentProject.name}\n• Квартира №${activeApartment.number}\n• Этаж: ${activeApartment.floor} из ${currentProject.floorsCount}\n• Комнат: ${activeApartment.rooms}-комнатная\n• Площадь: ${activeApartment.area} м²\n\nОтправьте, пожалуйста, точную планировку и график рассрочки 0%.`
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

          {/* Легенда статусов */}
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

      {/* Блок фильтрации */}
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

        {/* Фильтры комнатности и переключатель "Только свободные" */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
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

      {/* СЕТКА ШАХМАТКИ ПО ЭТАЖАМ */}
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

      {/* МОДАЛЬНОЕ ОКНО КВАРТИРЫ И РАСЧЕТ РАССРОЧКИ */}
      {activeApartment && (() => {
        const totalPrice = Math.round(activeApartment.area * activeApartment.pricePerMeter);
        const downPayment = Math.round(totalPrice * 0.3); // 30% взнос
        const monthlyPayment = Math.round((totalPrice - downPayment) / 36); // на 36 месяцев

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
                    {currentProject.name}
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
              <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
                
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