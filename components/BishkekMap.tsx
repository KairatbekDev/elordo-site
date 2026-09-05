'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface MapPoint {
  id: string;
  name: string;
  category: 'office' | 'active' | 'finished';
  categoryLabel: string;
  address: string;
  coords: [number, number];
  deadline?: string;
  price?: string;
  desc: string;
  gisUrl: string;
}

const POINTS: MapPoint[] = [
  {
    id: 'office',
    name: 'Главный офис EL ORDO',
    category: 'office',
    categoryLabel: 'Офис продаж',
    address: 'ул. Исы Ахунбаева, 137/1',
    coords: [42.84356, 74.59448],
    desc: 'Консультации, показ макетов, оформление договоров и рассрочки.',
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1',
  },
  {
    id: 'abu-dhabi',
    name: 'ЖК Abu Dhabi',
    category: 'active',
    categoryLabel: 'Премиум-класс',
    address: 'ул. Сухомлинова, 29',
    coords: [42.84694, 74.58175],
    deadline: '2029 г. 3 кв.',
    price: 'от 1650 $/м²',
    desc: 'Две 25-этажные башни премиум-класса с панорамными видами.',
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%A1%D1%83%D1%85%D0%BE%D0%BC%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%2029',
  },
  {
    id: 'madina-residence',
    name: 'ЖК Madina Residence',
    category: 'active',
    categoryLabel: 'Бизнес-класс',
    address: 'ул. Огонбаева, 12',
    coords: [42.87785, 74.63916],
    deadline: '2027 г. 3 кв.',
    price: 'от 1400 $/м²',
    desc: 'Символ статуса в центральной части Бишкека.',
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%9E%D0%B3%D0%BE%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%2012',
  },
  {
    id: 'ajkol-plus',
    name: 'ЖД Айкол +',
    category: 'active',
    categoryLabel: 'Комфорт+',
    address: 'с. Кок-Жар, ул. Баялинова, 6',
    coords: [42.81725, 74.64607],
    deadline: '2028 г. 3 кв.',
    price: 'от 1100 $/м²',
    desc: 'Экологический клубный дом в предгорье с чистым воздухом.',
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%9A%D0%BE%D0%BA-%D0%96%D0%B0%D1%80%20%D0%91%D0%B0%D1%8F%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%206',
  },
  {
    id: 'ajkol',
    name: 'ЖД Айкол',
    category: 'active',
    categoryLabel: 'Комфорт',
    address: 'ул. Арашан, 10',
    coords: [42.8171, 74.64892],
    deadline: '2026 г. 2 кв.',
    price: 'от 950 $/м²',
    desc: 'Завершение монолитно-кирпичной коробки, скорая сдача.',
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%90%D1%80%D0%B0%D1%88%D0%B0%D0%BD%2010',
  },
  {
    id: 'kelechek',
    name: 'ЖК Келечек',
    category: 'finished',
    categoryLabel: 'Сдан',
    address: 'ул. Космическая, 153',
    coords: [42.84588, 74.55136],
    desc: 'Полностью построенный, введенный в эксплуатацию дом.',
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%9A%D0%BE%D1%81%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20153',
  },
  {
    id: 'ordo',
    name: 'КД Ордо',
    category: 'finished',
    categoryLabel: 'Сдан',
    address: 'ул. Тверская, 20',
    coords: [42.87974, 74.54623],
    desc: 'Первый клубный дом компании с панорамой на горы.',
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%A2%D0%B2%D0%B5%D1%80%D1%81%D0%BA%D0%B0%D1%8F%2020',
  },
];

export default function BishkekMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const itemsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [selectedId, setSelectedId] = useState<string>('office');
  const [filter, setFilter] = useState<'all' | 'office' | 'active' | 'finished'>('all');

  useEffect(() => {
    // Подключение CSS Leaflet
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

      // Принудительный пересчет размера для устранения серых тайлов
      setTimeout(() => {
        map.invalidateSize();
      }, 200);

      POINTS.forEach((point) => {
        const isOffice = point.category === 'office';
        const isFinished = point.category === 'finished';
        const pinColor = isOffice ? '#d4b26f' : isFinished ? '#2b2b2b' : '#064734';
        const innerIcon = isOffice ? '🏢' : isFinished ? '✓' : '🏗️';

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
            <span style="
              transform: rotate(45deg);
              font-size: 14px;
              line-height: 1;
              display: block;
              color: ${isOffice ? '#064734' : '#ffffff'};
              font-weight: 900;
            ">${innerIcon}</span>
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
          ? `<a href="/${point.id}" style="flex: 1; text-align: center; background: #064734; color: #fff; font-size: 10px; font-weight: 800; padding: 6px 8px; border-radius: 6px; text-decoration: none;">О проекте →</a>`
          : '';

        const popupContent = `
          <div style="font-family: inherit; padding: 2px; min-width: 190px;">
            <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: ${isOffice ? '#b8860b' : '#064734'}; margin-bottom: 2px;">
              ${point.categoryLabel}
            </div>
            <div style="font-size: 13px; font-weight: 900; color: #111; margin-bottom: 3px; line-height: 1.2;">
              ${point.name}
            </div>
            <div style="font-size: 11px; color: #666; margin-bottom: 8px;">
              📍 ${point.address}
            </div>
            <div style="display: flex; gap: 4px;">
              ${projectBtn}
              <a href="${point.gisUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #f0f3f1; color: #064734; font-size: 10px; font-weight: 700; padding: 6px 8px; border-radius: 6px; text-decoration: none; border: 1px solid #dbe3df;">
                В 2ГИС 📍
              </a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);

        // Клик по маркеру: синхронизация и плавный скролл в списке
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

  // Синхронизация маркеров при переключении фильтров
  useEffect(() => {
    if (!mapRef.current) return;
    POINTS.forEach((point) => {
      const marker = markersRef.current[point.id];
      if (!marker) return;
      if (filter === 'all' || point.category === filter) {
        if (!mapRef.current.hasLayer(marker)) mapRef.current.addLayer(marker);
      } else {
        if (mapRef.current.hasLayer(marker)) mapRef.current.removeLayer(marker);
      }
    });
  }, [filter]);

  const handleSelectPoint = (point: MapPoint) => {
    setSelectedId(point.id);
    if (mapRef.current) {
      mapRef.current.flyTo(point.coords, 15, { duration: 0.8 });
      const marker = markersRef.current[point.id];
      if (marker) marker.openPopup();
    }
  };

  const filteredPoints =
    filter === 'all' ? POINTS : POINTS.filter((p) => p.category === filter);

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
      
      {/* Шапка с фильтрами */}
      <div className="p-3 sm:p-5 border-b border-gray-100 bg-[#f9faf9] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs font-bold whitespace-nowrap">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all ${
              filter === 'all'
                ? 'bg-[#064734] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Все ({POINTS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('office')}
            className={`px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all ${
              filter === 'office'
                ? 'bg-[#d4b26f] text-[#064734] shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            🏢 Офис
          </button>
          <button
            type="button"
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all ${
              filter === 'active'
                ? 'bg-[#064734] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            🏗️ Строящиеся
          </button>
          <button
            type="button"
            onClick={() => setFilter('finished')}
            className={`px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all ${
              filter === 'finished'
                ? 'bg-[#2b2b2b] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            ✓ Сданные
          </button>
        </div>

        <a
          href="https://2gis.kg/bishkek/search/%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-[#064734] hover:text-[#032b20] flex items-center gap-1 shrink-0 self-end sm:self-auto"
        >
          <span>📍</span> Офис в 2ГИС →
        </a>
      </div>

      {/* Сетка: Карта + Список */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Карта */}
        <div className="lg:col-span-8 h-[290px] sm:h-[400px] lg:h-[490px] relative bg-[#eef2ef]">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        {/* Список объектов */}
        <div className="lg:col-span-4 h-[250px] sm:h-[370px] lg:h-[490px] overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-100 p-3 sm:p-4 space-y-2 bg-gray-50/50">
          <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider px-1">
            Нажмите на объект для перехода:
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
                    ? 'bg-white border-[#064734] shadow-sm ring-1 ring-[#064734]/20'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                      point.category === 'office'
                        ? 'bg-[#d4b26f]/20 text-[#8c6b23]'
                        : point.category === 'finished'
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-[#064734]/10 text-[#064734]'
                    }`}
                  >
                    {point.categoryLabel}
                  </span>
                  {point.price && (
                    <span className="text-[11px] font-bold text-[#064734]">
                      {point.price}
                    </span>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                  {point.name}
                </h4>
                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                  📍 {point.address}
                </p>

                {isSelected && (
                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                    {point.category !== 'office' ? (
                      <Link
                        href={`/${point.id}`}
                        className="text-[11px] font-extrabold text-[#064734] hover:underline"
                      >
                        О проекте →
                      </Link>
                    ) : (
                      <span className="text-[10px] text-gray-500">Главный офис</span>
                    )}

                    <a
                      href={point.gisUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-gray-600 hover:text-[#064734] underline"
                    >
                      В 2ГИС 📍
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