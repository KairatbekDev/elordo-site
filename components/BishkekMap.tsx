'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import {
  IconBuilding,
  IconCrane,
  IconCheck,
  IconMapPin,
  IconArrowRight,
} from '@/components/Icons';

interface MapPointRaw {
  id: string;
  name: string;
  category: 'office' | 'active' | 'finished';
  categoryLabel: Record<Locale, string>;
  address: string;
  coords: [number, number];
  deadline?: Record<Locale, string>;
  price?: Record<Locale, string>;
  desc: Record<Locale, string>;
  gisUrl: string;
}

const RAW_POINTS: MapPointRaw[] = [
  {
    id: 'office',
    name: 'Главный офис EL ORDO',
    category: 'office',
    categoryLabel: {
      ru: 'Офис продаж',
      kg: 'Сатуу кеңсеси',
      kz: 'Сату кеңсесі',
      uk: 'Офіс продажів',
      en: 'Sales Office',
      zh: '品牌营销中心',
    },
    address: 'ул. Исы Ахунбаева, 137/1',
    coords: [42.84356, 74.59448],
    desc: {
      ru: 'Консультации, показ макетов, оформление договоров и рассрочки.',
      kg: 'Кеңеш берүү, макеттерди көрсөтүү, келишимдерди жана бөлүп төлөөнү тариздөө.',
      kz: 'Кеңес беру, макеттерді көрсету, шарттарды және бөліп төлеуді рәсімдеу.',
      uk: 'Консультації, демонстрація макетів, оформлення договорів та розстрочки.',
      en: 'Consultations, architectural scale models, contract and installment processing.',
      zh: '一对一置业咨询、实体规划沙盘品鉴、合同签约与免息分期办理。',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1',
  },
  {
    id: 'abu-dhabi',
    name: 'ЖК Abu Dhabi',
    category: 'active',
    categoryLabel: {
      ru: 'Премиум-класс',
      kg: 'Премиум-класс',
      kz: 'Премиум-класс',
      uk: 'Преміум-клас',
      en: 'Premium Class',
      zh: '尊享级 (Premium)',
    },
    address: 'ул. Сухомлинова, 29',
    coords: [42.84694, 74.58175],
    deadline: {
      ru: '2029 г. 3 кв.',
      kg: '2029-ж. 3-кв.',
      kz: '2029 ж. 3 т.',
      uk: '3 кв. 2029 р.',
      en: 'Q3 2029',
      zh: '2029年第3季度',
    },
    price: {
      ru: 'от 1 650 $/м²',
      kg: '1 650 $/м² баштап',
      kz: '1 650 $/м² бастап',
      uk: 'від 1 650 $/м²',
      en: 'from $1,650/m²',
      zh: '1 650 $/m² 起',
    },
    desc: {
      ru: 'Две 25-этажные башни премиум-класса с панорамными видами.',
      kg: 'Панорамалык көрүнүшү бар эки 25 кабаттуу премиум-класстагы мунара.',
      kz: 'Панорамалық көрінісі бар екі 25 қабатты премиум-санаттағы мұнара.',
      uk: 'Дві 25-поверхові вежі преміум-класу з панорамними видами.',
      en: 'Twin 25-story premium towers with panoramic mountain vistas.',
      zh: '双子25层超高层建筑，全景落地窗幕墙设计。',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%A1%D1%83%D1%85%D0%BE%D0%BC%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%2029',
  },
  {
    id: 'madina-residence',
    name: 'ЖК Madina Residence',
    category: 'active',
    categoryLabel: {
      ru: 'Бизнес-класс',
      kg: 'Бизнес-класс',
      kz: 'Бизнес-класс',
      uk: 'Бізнес-клас',
      en: 'Business Class',
      zh: '商务级 (Business)',
    },
    address: 'ул. Огонбаева, 12',
    coords: [42.87785, 74.63916],
    deadline: {
      ru: '2027 г. 3 кв.',
      kg: '2027-ж. 3-кв.',
      kz: '2027 ж. 3 т.',
      uk: '3 кв. 2027 р.',
      en: 'Q3 2027',
      zh: '2027年第3季度',
    },
    price: {
      ru: 'от 1 400 $/м²',
      kg: '1 400 $/м² баштап',
      kz: '1 400 $/м² бастап',
      uk: 'від 1 400 $/м²',
      en: 'from $1,400/m²',
      zh: '1 400 $/m² 起',
    },
    desc: {
      ru: 'Символ статуса в центральной части Бишкека.',
      kg: 'Бишкектин борбордук бөлүгүндөгү кадыр-барктын символу.',
      kz: 'Бішкектің орталық бөлігіндегі мәртебе символы.',
      uk: 'Символ статусу в центральній частині Бішкека.',
      en: 'A symbol of prestige in the central district of Bishkek.',
      zh: '坐落于比什凯克核心政商街区的高端社区。',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%9E%D0%B3%D0%BE%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%2012',
  },
  {
    id: 'ajkol-plus',
    name: 'ЖД Айкол +',
    category: 'active',
    categoryLabel: {
      ru: 'Комфорт+',
      kg: 'Комфорт+',
      kz: 'Комфорт+',
      uk: 'Комфорт+',
      en: 'Comfort+',
      zh: '舒适+ (Comfort+)',
    },
    address: 'с. Кок-Жар, ул. Баялинова, 6',
    coords: [42.81725, 74.64607],
    deadline: {
      ru: '2028 г. 3 кв.',
      kg: '2028-ж. 3-кв.',
      kz: '2028 ж. 3 т.',
      uk: '3 кв. 2028 р.',
      en: 'Q3 2028',
      zh: '2028年第3季度',
    },
    price: {
      ru: 'от 1 100 $/м²',
      kg: '1 100 $/м² баштап',
      kz: '1 100 $/м² бастап',
      uk: 'від 1 100 $/м²',
      en: 'from $1,100/m²',
      zh: '1 100 $/m² 起',
    },
    desc: {
      ru: 'Экологический клубный дом в предгорье с чистым воздухом.',
      kg: 'Таза абасы бар тоо этегиндеги экологиялык клубдук үй.',
      kz: 'Таза ауасы бар тау бөктеріндегі экологиялық клубтық үй.',
      uk: 'Екологічний клубний будинок у передгір’ї з чистим повітрям.',
      en: 'Boutique eco-residence in the pristine mountain foothills.',
      zh: '南部生态麓区纯正低密洋房，四季清新山风。',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%9A%D0%BE%D0%BA-%D0%96%D0%B0%D1%80%20%D0%91%D0%B0%D1%8F%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%206',
  },
  {
    id: 'ajkol',
    name: 'ЖД Айкол',
    category: 'active',
    categoryLabel: {
      ru: 'Комфорт',
      kg: 'Комфорт',
      kz: 'Комфорт',
      uk: 'Комфорт',
      en: 'Comfort',
      zh: '舒适级 (Comfort)',
    },
    address: 'ул. Арашан, 10',
    coords: [42.8171, 74.64892],
    deadline: {
      ru: '2026 г. 2 кв.',
      kg: '2026-ж. 2-кв.',
      kz: '2026 ж. 2 т.',
      uk: '2 кв. 2026 р.',
      en: 'Q2 2026',
      zh: '2026年第2季度',
    },
    price: {
      ru: 'от 950 $/м²',
      kg: '950 $/м² баштап',
      kz: '950 $/м² бастап',
      uk: 'від 950 $/м²',
      en: 'from $950/m²',
      zh: '950 $/m² 起',
    },
    desc: {
      ru: 'Завершение монолитно-кирпичной коробки, скорая сдача.',
      kg: 'Монолит-кыш курулушунун аякташы, жакында тапшырылат.',
      kz: 'Монолитті-кірпіш қаңқасының аяқталуы, жуырда тапсырылады.',
      uk: 'Завершення монолітно-цегляного каркаса, швидка здача.',
      en: 'Monolithic brick frame completed, nearing handover.',
      zh: '现浇主体与红砖砌体高进度封顶，即将竣工验收。',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%90%D1%80%D0%B0%D1%88%D0%B0%D0%BD%2010',
  },
  {
    id: 'kelechek',
    name: 'ЖК Келечек',
    category: 'finished',
    categoryLabel: {
      ru: 'Сдан',
      kg: 'Бүткөн',
      kz: 'Берілген',
      uk: 'Зданий',
      en: 'Completed',
      zh: '已交付',
    },
    address: 'ул. Космическая, 153',
    coords: [42.84588, 74.55136],
    desc: {
      ru: 'Полностью построенный, введенный в эксплуатацию дом.',
      kg: 'Толук курулуп, пайдаланууга берилген үй.',
      kz: 'Толық салынып, пайдалануға берілген тұрғын үй.',
      uk: 'Повністю збудований, введений в експлуатацію будинок.',
      en: 'Fully built, commissioned, and resident-occupied development.',
      zh: '全盘竣工交付并顺利入住的宜居社区。',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%9A%D0%BE%D1%81%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20153',
  },
  {
    id: 'ordo',
    name: 'КД Ордо',
    category: 'finished',
    categoryLabel: {
      ru: 'Сдан',
      kg: 'Бүткөн',
      kz: 'Берілген',
      uk: 'Зданий',
      en: 'Completed',
      zh: '已交付',
    },
    address: 'ул. Тверская, 20',
    coords: [42.87974, 74.54623],
    desc: {
      ru: 'Первый клубный дом компании с панорамой на горы.',
      kg: 'Компаниянын тоолорго панорамасы бар алгачкы клубдук үйү.',
      kz: 'Компанияның тауға панорамасы бар алғашқы клубтық үйі.',
      uk: 'Перший клубний будинок компанії з панорамою на гори.',
      en: 'The company’s inaugural boutique club house with mountain panorama.',
      zh: '品牌首座精品低密洋房，远眺壮丽雪山。',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%A2%D0%B2%D0%B5%D1%80%D1%81%D0%BA%D0%B0%D1%8F%2020',
  },
];

const UI_TEXT = {
  ru: {
    all: 'Все',
    office: 'Офис',
    active: 'Строящиеся',
    finished: 'Сданные',
    office2gis: 'Офис в 2GIS',
    clickPrompt: 'Нажмите на объект для перехода:',
    aboutProject: 'О проекте',
    mainOffice: 'Главный офис',
    to2gis: 'В 2GIS',
  },
  kg: {
    all: 'Баары',
    office: 'Офис',
    active: 'Курулуп жаткандар',
    finished: 'Бүткөндөр',
    office2gis: '2GIS аркылуу офис',
    clickPrompt: 'Өтүү үчүн объектти басыңыз:',
    aboutProject: 'Долбоор тууралуу',
    mainOffice: 'Башкы офис',
    to2gis: '2GIS аркылуу',
  },
  kz: {
    all: 'Барлығы',
    office: 'Кеңсе',
    active: 'Салынып жатқандар',
    finished: 'Берілгендер',
    office2gis: '2GIS кеңсесі',
    clickPrompt: 'Өту үшін нысанды басыңыз:',
    aboutProject: 'Жоба туралы',
    mainOffice: 'Бас кеңсе',
    to2gis: '2GIS арқылы',
  },
  uk: {
    all: 'Всі',
    office: 'Офіс',
    active: 'Споруджувані',
    finished: 'Здані',
    office2gis: 'Офіс у 2GIS',
    clickPrompt: 'Натисніть на об\'єкт для переходу:',
    aboutProject: 'Про проєкт',
    mainOffice: 'Головний офіс',
    to2gis: 'У 2GIS',
  },
  en: {
    all: 'All',
    office: 'Office',
    active: 'Under Construction',
    finished: 'Completed',
    office2gis: 'Office in 2GIS',
    clickPrompt: 'Click an item to view details:',
    aboutProject: 'About Project',
    mainOffice: 'Head Office',
    to2gis: 'In 2GIS',
  },
  zh: {
    all: '全部',
    office: '营销中心',
    active: '在建在售',
    finished: '已交付',
    office2gis: '2GIS 导航到店',
    clickPrompt: '点击楼盘查看详情：',
    aboutProject: '查看详情',
    mainOffice: '总部营销中心',
    to2gis: '在 2GIS 中打开',
  },
};

export default function BishkekMap() {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const ui = UI_TEXT[currentLang] || UI_TEXT.ru;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const itemsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [selectedId, setSelectedId] = useState<string>('office');
  const [filter, setFilter] = useState<'all' | 'office' | 'active' | 'finished'>('all');

  const points = useMemo(() => {
    return RAW_POINTS.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      categoryLabel: p.categoryLabel[currentLang] || p.categoryLabel.ru,
      address: p.address,
      coords: p.coords,
      deadline: p.deadline ? (p.deadline[currentLang] || p.deadline.ru) : undefined,
      price: p.price ? (p.price[currentLang] || p.price.ru) : undefined,
      desc: p.desc[currentLang] || p.desc.ru,
      gisUrl: p.gisUrl,
    }));
  }, [currentLang]);

  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const initMap = () => {
      const L = (window as any).L;
      if (!L || !mapContainerRef.current || mapRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [42.848, 74.598],
        zoom: 12,
        scrollWheelZoom: false,
      });

      mapRef.current = map;

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18,
      }).addTo(map);

      setTimeout(() => {
        map.invalidateSize();
      }, 200);

      points.forEach((point) => {
        const isOffice = point.category === 'office';
        const isFinished = point.category === 'finished';
        const pinColor = isOffice ? '#d4b26f' : isFinished ? '#2b2b2b' : '#064734';
        const iconColor = isOffice ? '#064734' : '#ffffff';

        let svgInside = '';
        if (isOffice) {
          svgInside = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9h1"/><path d="M9 13h1"/><path d="M9 17h1"/></svg>`;
        } else if (isFinished) {
          svgInside = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else {
          svgInside = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M5 20V4l13 6"/><path d="M12 7.5V20"/></svg>`;
        }

        const iconHtml = `
          <div style="
            position: relative;
            width: 34px;
            height: 34px;
            background: ${pinColor};
            border: 2px solid #ffffff;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 10px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <div style="
              transform: rotate(45deg);
              display: flex;
              align-items: center;
              justify-content: center;
            ">${svgInside}</div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-pin',
          html: iconHtml,
          iconSize: [34, 34],
          iconAnchor: [17, 34],
          popupAnchor: [0, -34],
        });

        const marker = L.marker(point.coords, { icon: customIcon }).addTo(map);

        const projectBtn = !isOffice
          ? `<a href="/${point.id}" style="flex: 1; text-align: center; background: #064734; color: #fff; font-size: 11px; font-weight: 800; padding: 7px 10px; border-radius: 8px; text-decoration: none;">${ui.aboutProject}</a>`
          : '';

        const popupContent = `
          <div style="font-family: inherit; padding: 3px; min-width: 190px;">
            <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: ${isOffice ? '#b8860b' : '#064734'}; margin-bottom: 2px;">
              ${point.categoryLabel}
            </div>
            <div style="font-size: 13px; font-weight: 900; color: #111; margin-bottom: 3px; line-height: 1.2;">
              ${point.name}
            </div>
            <div style="font-size: 11px; color: #666; margin-bottom: 8px;">
              ${point.address}
            </div>
            <div style="display: flex; gap: 6px;">
              ${projectBtn}
              <a href="${point.gisUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #f0f3f1; color: #064734; font-size: 11px; font-weight: 700; padding: 7px 10px; border-radius: 8px; text-decoration: none; border: 1px solid #dbe3df;">
                ${ui.to2gis}
              </a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on('click', () => {
          setSelectedId(point.id);
          const el = itemsRef.current[point.id];
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });

        markersRef.current[point.id] = marker;
      });
    };

    if (!(window as any).L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }

    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    points.forEach((point) => {
      const marker = markersRef.current[point.id];
      if (!marker) return;
      const isOffice = point.category === 'office';
      const projectBtn = !isOffice
        ? `<a href="/${point.id}" style="flex: 1; text-align: center; background: #064734; color: #fff; font-size: 11px; font-weight: 800; padding: 7px 10px; border-radius: 8px; text-decoration: none;">${ui.aboutProject}</a>`
        : '';

      const popupContent = `
        <div style="font-family: inherit; padding: 3px; min-width: 190px;">
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: ${isOffice ? '#b8860b' : '#064734'}; margin-bottom: 2px;">
            ${point.categoryLabel}
          </div>
          <div style="font-size: 13px; font-weight: 900; color: #111; margin-bottom: 3px; line-height: 1.2;">
            ${point.name}
          </div>
          <div style="font-size: 11px; color: #666; margin-bottom: 8px;">
            ${point.address}
          </div>
          <div style="display: flex; gap: 6px;">
            ${projectBtn}
            <a href="${point.gisUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #f0f3f1; color: #064734; font-size: 11px; font-weight: 700; padding: 7px 10px; border-radius: 8px; text-decoration: none; border: 1px solid #dbe3df;">
              ${ui.to2gis}
            </a>
          </div>
        </div>
      `;
      marker.setPopupContent(popupContent);
    });
  }, [points, ui]);

  useEffect(() => {
    if (!mapRef.current) return;
    points.forEach((point) => {
      const marker = markersRef.current[point.id];
      if (!marker) return;
      if (filter === 'all' || point.category === filter) {
        if (!mapRef.current.hasLayer(marker)) mapRef.current.addLayer(marker);
      } else {
        if (mapRef.current.hasLayer(marker)) mapRef.current.removeLayer(marker);
      }
    });
  }, [filter, points]);

  const handleSelectPoint = (point: typeof points[0]) => {
    setSelectedId(point.id);
    if (mapRef.current) {
      mapRef.current.flyTo(point.coords, 15, { duration: 0.8 });
      const marker = markersRef.current[point.id];
      if (marker) marker.openPopup();
    }
  };

  const filteredPoints =
    filter === 'all' ? points : points.filter((p) => p.category === filter);

  return (
    <div className="w-full bg-white dark:bg-[#0b1b15] rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm transition-colors duration-200">
      
      {/* Шапка с фильтрами */}
      <div className="p-3 sm:p-5 border-b border-gray-100 dark:border-white/10 bg-[#f9faf9] dark:bg-[#07130e] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-colors">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs font-bold whitespace-nowrap">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
            }`}
          >
            {ui.all} ({points.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('office')}
            className={`px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer ${
              filter === 'office'
                ? 'bg-[#d4b26f] text-[#064734] shadow-sm'
                : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
            }`}
          >
            <IconBuilding className="w-3.5 h-3.5 shrink-0" />
            <span>{ui.office}</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer ${
              filter === 'active'
                ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
            }`}
          >
            <IconCrane className="w-3.5 h-3.5 shrink-0" />
            <span>{ui.active}</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('finished')}
            className={`px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer ${
              filter === 'finished'
                ? 'bg-[#2b2b2b] dark:bg-white/20 text-white shadow-sm'
                : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
            }`}
          >
            <IconCheck className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
            <span>{ui.finished}</span>
          </button>
        </div>

        <a
          href="https://2gis.kg/bishkek/search/%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-[#064734] dark:text-[#d4b26f] hover:text-[#032b20] dark:hover:text-[#c49f57] flex items-center gap-1.5 shrink-0 self-end sm:self-auto transition-colors"
        >
          <IconMapPin className="w-3.5 h-3.5 text-[#d4b26f]" />
          <span>{ui.office2gis}</span>
          <IconArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Сетка: Карта + Список */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Карта */}
        <div className="lg:col-span-8 h-[290px] sm:h-[400px] lg:h-[490px] relative bg-[#eef2ef] dark:bg-[#040c09]">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        {/* Список объектов */}
        <div className="lg:col-span-4 h-[250px] sm:h-[370px] lg:h-[490px] overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-white/10 p-3 sm:p-4 space-y-2 bg-gray-50/50 dark:bg-[#07130e]/60 transition-colors">
          <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider px-1">
            {ui.clickPrompt}
          </p>
          {filteredPoints.map((point) => {
            const isSelected = selectedId === point.id;
            return (
              <div
                key={point.id}
                ref={(el) => {
                  itemsRef.current[point.id] = el;
                }}
                onClick={() => handleSelectPoint(point)}
                className={`p-3 rounded-xl cursor-pointer transition-all border text-left ${
                  isSelected
                    ? 'bg-white dark:bg-[#0f241c] border-[#064734] dark:border-[#d4b26f] shadow-sm ring-1 ring-[#064734]/20 dark:ring-[#d4b26f]/30'
                    : 'bg-white dark:bg-[#0b1b15] border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                      point.category === 'office'
                        ? 'bg-[#d4b26f]/20 text-[#8c6b23] dark:text-[#d4b26f]'
                        : point.category === 'finished'
                        ? 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-neutral-300'
                        : 'bg-[#064734]/10 dark:bg-[#064734]/40 text-[#064734] dark:text-emerald-400'
                    }`}
                  >
                    {point.categoryLabel}
                  </span>
                  {point.price && (
                    <span className="text-[11px] font-bold text-[#064734] dark:text-[#d4b26f]">
                      {point.price}
                    </span>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug">
                  {point.name}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-neutral-400 mt-1">
                  <IconMapPin className="w-3 h-3 text-[#d4b26f] shrink-0" />
                  <span className="truncate">{point.address}</span>
                </div>

                {isSelected && (
                  <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-white/10 flex items-center justify-between gap-2">
                    {point.category !== 'office' ? (
                      <Link
                        href={`/${point.id}`}
                        className="text-[11px] font-extrabold text-[#064734] dark:text-[#d4b26f] hover:underline inline-flex items-center gap-1"
                      >
                        <span>{ui.aboutProject}</span>
                        <IconArrowRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="text-[10px] text-gray-500 dark:text-neutral-400 font-medium">{ui.mainOffice}</span>
                    )}

                    <a
                      href={point.gisUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-gray-600 dark:text-neutral-400 hover:text-[#064734] dark:hover:text-[#d4b26f] underline"
                    >
                      {ui.to2gis}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}