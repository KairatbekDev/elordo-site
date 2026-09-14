'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { IconMapPin, IconArrowRight } from '@/components/Icons';

type CategoryType = 'all' | 'parks' | 'education' | 'shopping' | 'health';

interface PlaceItem {
  id: string;
  name: string;
  category: CategoryType;
  walkTime?: string;
  driveTime?: string;
  badge?: string;
}

interface ComplexLocationData {
  id: string;
  name: string;
  address: string;
  district: string;
  gisUrl: string;
  googleMapsUrl: string;
  coords: { lat: number; lng: number };
  places: PlaceItem[];
}

const LOCATIONS_DATA: ComplexLocationData[] = [
  {
    id: 'abu-dhabi',
    name: 'ЖК Abu Dhabi',
    address: 'ул. Сухомлинова, 29 (пер. ул. Тыныстанова)',
    district: 'Южная магистраль / Политех',
    gisUrl: 'https://2gis.kg/bishkek/search/%D1%83%D0%BB.%20%D0%A1%D1%83%D1%85%D0%BE%D0%BC%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%2C%2029',
    googleMapsUrl: 'https://maps.google.com/?q=42.8433,74.5945',
    coords: { lat: 42.8433, lng: 74.5945 },
    places: [
      { id: 'ad-1', name: 'Ботанический сад им. Э. Гареева', category: 'parks', walkTime: '5 мин', badge: 'Свежий воздух' },
      { id: 'ad-2', name: 'Парк «Ынтымак» и «Адинай»', category: 'parks', driveTime: '6 мин', badge: 'Прогулки у гор' },
      { id: 'ad-3', name: 'ТРЦ Asia Mall (пр. Ч. Айтматова)', category: 'shopping', driveTime: '5 мин', walkTime: '15 мин' },
      { id: 'ad-4', name: 'Школа «Газпром Кыргызстан»', category: 'education', driveTime: '8 мин', badge: 'Премиум лицей' },
      { id: 'ad-5', name: 'КГМА им. И.К. Ахунбаева', category: 'education', walkTime: '4 мин' },
      { id: 'ad-6', name: 'Медицинский центр «Кортекс» & Nova Clinic', category: 'health', walkTime: '3 мин' },
      { id: 'ad-7', name: 'Супермаркет Globus / Народный', category: 'shopping', walkTime: '3 мин' },
    ],
  },
  {
    id: 'madina-residence',
    name: 'ЖК Madina Residence',
    address: 'ул. Огонбаева, 12 (пер. ул. Гоголя)',
    district: 'Золотой квадрат / Центр Бишкека',
    gisUrl: 'https://2gis.kg/bishkek/search/%D1%83%D0%BB.%20%D0%9E%D0%B3%D0%BE%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%2C%2012',
    googleMapsUrl: 'https://maps.google.com/?q=42.8765,74.6190',
    coords: { lat: 42.8765, lng: 74.6190 },
    places: [
      { id: 'mr-1', name: 'ТРЦ Dordoi Plaza & кинотеатр', category: 'shopping', walkTime: '3 мин', badge: '300 метров' },
      { id: 'mr-2', name: 'ЦУМ «Айчүрөк» и ГУМ «Чынар»', category: 'shopping', walkTime: '6 мин' },
      { id: 'mr-3', name: 'Гимназия №12 и Авторская школа №67', category: 'education', walkTime: '5 мин', badge: 'Топ-школы' },
      { id: 'mr-4', name: 'Центральная площадь «Ала-Тоо»', category: 'parks', walkTime: '10 мин', driveTime: '3 мин' },
      { id: 'mr-5', name: 'Дубовый парк и Театральный сквер', category: 'parks', walkTime: '8 мин' },
      { id: 'mr-6', name: 'Клиника «Юрфа» и Клиническая больница №1', category: 'health', driveTime: '4 мин' },
    ],
  },
  {
    id: 'ajkol-plus',
    name: 'ЖД Айкол +',
    address: 'с. Кок-Жар, ул. Баялинова, 6',
    district: 'Юго-Восток / Экологическое предгорье',
    gisUrl: 'https://2gis.kg/bishkek/search/%D1%81.%20%D0%9A%D0%BE%D0%BA-%D0%96%D0%B0%D1%80%2C%20%D1%83%D0%BB.%20%D0%91%D0%B0%D1%8F%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%2C%206',
    googleMapsUrl: 'https://maps.google.com/?q=42.8210,74.6450',
    coords: { lat: 42.8210, lng: 74.6450 },
    places: [
      { id: 'aik-1', name: 'Международная школа Bilimkana', category: 'education', driveTime: '4 мин', badge: 'Инновации' },
      { id: 'aik-2', name: 'Ботанический сад (верхняя часть)', category: 'parks', driveTime: '5 мин' },
      { id: 'aik-3', name: 'Гипермаркет Globus (ул. 7 Апреля)', category: 'shopping', driveTime: '6 мин' },
      { id: 'aik-4', name: 'Детский сад «Апельсин» & «Семья»', category: 'education', walkTime: '4 мин' },
      { id: 'aik-5', name: 'Чистый горный бриз (Роза ветров)', category: 'parks', walkTime: '1 мин', badge: 'Без смога' },
    ],
  },
];

export default function InfrastructureMap() {
  const { locale } = useLanguage();
  const isKg = locale === 'kg';

  const [activeComplexId, setActiveComplexId] = useState<string>('abu-dhabi');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const currentComplex = useMemo(() => {
    return LOCATIONS_DATA.find((c) => c.id === activeComplexId) || LOCATIONS_DATA[0];
  }, [activeComplexId]);

  const filteredPlaces = useMemo(() => {
    if (activeCategory === 'all') return currentComplex.places;
    return currentComplex.places.filter((p) => p.category === activeCategory);
  }, [currentComplex, activeCategory]);

  const categories = [
    { id: 'all' as CategoryType, label: isKg ? 'Баары' : 'Все точки' },
    { id: 'parks' as CategoryType, label: isKg ? 'Парктар жана сейилдөө' : 'Парки и отдых' },
    { id: 'education' as CategoryType, label: isKg ? 'Мектептер жана Билим' : 'Образование' },
    { id: 'shopping' as CategoryType, label: isKg ? 'ТРЦ жана Дүкөндөр' : 'ТРЦ и покупки' },
    { id: 'health' as CategoryType, label: isKg ? 'Медицина' : 'Медицина' },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Заголовок */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
          {isKg ? 'Локация жана инфраструктура' : 'Локация и точки притяжения'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f] tracking-tight">
          {isKg ? 'Шаардын эң мыкты райондорунда' : 'Все необходимое в шаговой доступности'}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-2">
          {isKg
            ? 'Комплексти тандап, айланасындагы мектептерди, парктарды жана соода борборлорун көрүңүз'
            : 'Выберите объект, чтобы изучить близость к престижным школам, паркам и торговым центрам Бишкека'}
        </p>
      </div>

      {/* Табы выбора жилого комплекса */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-gray-100 dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 gap-1 overflow-x-auto max-w-full">
          {LOCATIONS_DATA.map((comp) => (
            <button
              key={comp.id}
              type="button"
              onClick={() => {
                setActiveComplexId(comp.id);
                setActiveCategory('all');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeComplexId === comp.id
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-[#d4b26f] dark:text-[#064734] shadow-md scale-100'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white'
              }`}
            >
              {comp.name}
            </button>
          ))}
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
            {filteredPlaces.map((place) => (
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
                        {place.name}
                      </h4>
                      {place.badge && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-[#d4b26f]/20 text-[#96742e] dark:text-[#d4b26f] px-2 py-0.5 rounded-md">
                          {place.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Время в пути */}
                <div className="flex items-center gap-2 shrink-0 text-right">
                  {place.walkTime && (
                    <div className="text-center bg-gray-100 dark:bg-white/5 px-2.5 py-1.5 rounded-xl border border-gray-200/60 dark:border-white/5">
                      <span className="text-[10px] text-gray-400 dark:text-neutral-400 block font-semibold">
                        🚶 {isKg ? 'жөө' : 'пешком'}
                      </span>
                      <strong className="text-xs font-black text-gray-800 dark:text-gray-200">
                        {place.walkTime}
                      </strong>
                    </div>
                  )}

                  {place.driveTime && (
                    <div className="text-center bg-gray-100 dark:bg-white/5 px-2.5 py-1.5 rounded-xl border border-gray-200/60 dark:border-white/5">
                      <span className="text-[10px] text-gray-400 dark:text-neutral-400 block font-semibold">
                        🚗 {isKg ? 'унаада' : 'на авто'}
                      </span>
                      <strong className="text-xs font-black text-[#064734] dark:text-[#d4b26f]">
                        {place.driveTime}
                      </strong>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Правая колонка: Карточка локации комплекса и ссылки на карты */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#064734] to-[#042e22] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[380px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4b26f]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="text-xs font-bold text-[#d4b26f] uppercase tracking-wider block mb-2">
              {currentComplex.district}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase mb-3 text-white">
              {currentComplex.name}
            </h3>

            <div className="flex items-start gap-2.5 text-xs text-white/80 mb-6 bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <IconMapPin className="w-4 h-4 text-[#d4b26f] shrink-0 mt-0.5" />
              <span>{currentComplex.address}</span>
            </div>

            <div className="space-y-3 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4b26f]" />
                <span>Удобные асфальтированные подъездные пути</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4b26f]" />
                <span>Остановки общественного транспорта в 2 минутах</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4b26f]" />
                <span>Безопасный район с развитым освещением и охраной</span>
              </div>
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
              <span>{isKg ? '2GIS аркылуу ачуу' : 'Открыть локацию в 2GIS'}</span>
              <IconArrowRight className="w-4 h-4" />
            </a>

            <a
              href={currentComplex.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-2.5 rounded-xl uppercase tracking-wider text-[11px] transition-colors border border-white/15 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{isKg ? 'Google Maps картасы' : 'Google Maps'}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}