'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';
import {
  IconBuilding,
  IconCrane,
  IconCheck,
  IconMapPin,
  IconCalendar,
  IconArrowRight,
  IconWhatsApp,
} from '@/components/Icons';

interface ProjectRaw {
  slug: string;
  name: string;
  category: 'active' | 'finished';
  classCategory: 'premium' | 'business' | 'comfort';
  image: string;
  priceNum: number;
}

const RAW_PROJECTS: ProjectRaw[] = [
  {
    slug: 'abu-dhabi',
    name: 'ЖК Abu Dhabi',
    category: 'active',
    classCategory: 'premium',
    image: '/projects/Abu-Dhabi.png',
    priceNum: 1650,
  },
  {
    slug: 'madina-residence',
    name: 'ЖК Madina Residence',
    category: 'active',
    classCategory: 'business',
    image: '/projects/Madina-Residense.png',
    priceNum: 1400,
  },
  {
    slug: 'ajkol-plus',
    name: 'ЖД Айкол +',
    category: 'active',
    classCategory: 'comfort',
    image: '/projects/Aikolplus.png',
    priceNum: 1100,
  },
  {
    slug: 'ajkol',
    name: 'ЖД Айкол',
    category: 'active',
    classCategory: 'comfort',
    image: '/projects/ajkol.jpg',
    priceNum: 950,
  },
  {
    slug: 'kelechek',
    name: 'ЖК Келечек',
    category: 'finished',
    classCategory: 'comfort',
    image: '/projects/Kelechek.jpg',
    priceNum: 0,
  },
  {
    slug: 'ordo',
    name: 'КД Ордо',
    category: 'finished',
    classCategory: 'premium',
    image: '/projects/Ordo.jpg',
    priceNum: 0,
  },
];

const ADDRESSES: Record<string, Record<Locale, string>> = {
  'abu-dhabi': {
    ru: 'ул. Сухомлинова, 29',
    kg: 'Сухомлинов көч., 29',
    kz: 'Сухомлинов к-сі, 29',
    uk: 'вул. Сухомлинова, 29',
    en: '29 Sukhomlinov Street',
    zh: '比什凯克市苏霍姆利诺夫街29号',
  },
  'madina-residence': {
    ru: 'ул. Огонбаева, 12',
    kg: 'Огонбаев көч., 12',
    kz: 'Огонбаев к-сі, 12',
    uk: 'вул. Огонбаєва, 12',
    en: '12 Ogonbaev Street',
    zh: '比什凯克市奥贡巴耶夫街12号',
  },
  'ajkol-plus': {
    ru: 'с. Кок-Жар, ул. Баялинова, 6',
    kg: 'Көк-Жар а., Баялинов көч., 6',
    kz: 'Көк-Жар а., Баялинов к-сі, 6',
    uk: 'с. Кок-Жар, вул. Баялінова, 6',
    en: '6 Bayalinov Street, Kok-Jar',
    zh: '比什凯克市Kok-Jar区巴亚利诺夫街6号',
  },
  'ajkol': {
    ru: 'ул. Арашан, 10',
    kg: 'Арашан көч., 10',
    kz: 'Арашан к-сі, 10',
    uk: 'вул. Арашан, 10',
    en: '10 Arashan Street',
    zh: '阿拉尚街10号',
  },
  'kelechek': {
    ru: 'ул. Космическая, 153',
    kg: 'Космическая көч., 153',
    kz: 'Космическая к-сі, 153',
    uk: 'вул. Космічна, 153',
    en: '153 Kosmicheskaya Street',
    zh: '比什凯克市太空街153号',
  },
  'ordo': {
    ru: 'ул. Тверская, 20',
    kg: 'Тверская көч., 20',
    kz: 'Тверская к-сі, 20',
    uk: 'вул. Тверська, 20',
    en: '20 Tverskaya Street',
    zh: '特维尔斯卡亚街20号',
  },
};

export default function ProjectsCatalogPage() {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;
  const p = t.projectsPage;

  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'finished'>('all');
  const [classFilter, setClassFilter] = useState<'all' | 'premium' | 'business' | 'comfort'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Локализация карточек объектов
  const localizedProjects = useMemo(() => {
    return RAW_PROJECTS.map((item) => {
      const isFinished = item.category === 'finished';
      const address = ADDRESSES[item.slug]?.[currentLang] || ADDRESSES[item.slug]?.ru || '';

      let classType = '';
      let deadline = '';
      let floors = '';
      let desc = '';

      switch (item.slug) {
        case 'abu-dhabi':
          classType = p.abuDhabiClass;
          deadline = p.abuDhabiDeadline;
          floors = p.abuDhabiFloors;
          desc = p.abuDhabiDesc;
          break;
        case 'madina-residence':
          classType = p.madinaClass;
          deadline = p.madinaDeadline;
          floors = p.madinaFloors;
          desc = p.madinaDesc;
          break;
        case 'ajkol-plus':
          classType = p.ajkolPlusClass;
          deadline = p.ajkolPlusDeadline;
          floors = p.ajkolPlusFloors;
          desc = p.ajkolPlusDesc;
          break;
        case 'ajkol':
          classType = p.ajkolClass;
          deadline = p.ajkolDeadline;
          floors = p.ajkolFloors;
          desc = p.ajkolDesc;
          break;
        case 'kelechek':
          classType = p.kelechekClass;
          deadline = p.statusFinishedFull;
          floors = p.kelechekFloors;
          desc = p.kelechekDesc;
          break;
        case 'ordo':
          classType = p.ordoClass;
          deadline = p.statusFinishedFull;
          floors = p.ordoFloors;
          desc = p.ordoDesc;
          break;
      }

      let priceStr = '';
      if (isFinished) {
        priceStr = p.soldOut;
      } else {
        // Надежное форматирование без зависимости от локали браузера
        const num = item.priceNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        if (currentLang === 'en') priceStr = `from $${num}/m²`;
        else if (currentLang === 'zh') priceStr = `${num} $/m² 起`;
        else if (currentLang === 'kg' || currentLang === 'kz') priceStr = `${num} $/м² ${t.common.fromPrice}`;
        else if (currentLang === 'uk') priceStr = `від ${num} $/м²`;
        else priceStr = `от ${num} $/м²`;
      }

      return {
        ...item,
        classType,
        address,
        deadline,
        floors,
        desc,
        price: priceStr,
      };
    });
  }, [currentLang, p, t.common]);

  // Фильтрация и сортировка
  const filteredProjects = useMemo(() => {
    return localizedProjects
      .filter((item) => {
        if (statusFilter !== 'all' && item.category !== statusFilter) return false;
        if (classFilter !== 'all' && item.classCategory !== classFilter) return false;
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(query);
          const matchAddress = item.address.toLowerCase().includes(query);
          const matchRuAddress = (ADDRESSES[item.slug]?.ru || '').toLowerCase().includes(query);
          if (!matchName && !matchAddress && !matchRuAddress) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return (a.priceNum || 999999) - (b.priceNum || 999999);
        }
        if (sortBy === 'price-desc') {
          return (b.priceNum || 0) - (a.priceNum || 0);
        }
        return 0;
      });
  }, [localizedProjects, statusFilter, classFilter, searchQuery, sortBy]);

  const activeCount = RAW_PROJECTS.filter((item) => item.category === 'active').length;
  const finishedCount = RAW_PROJECTS.filter((item) => item.category === 'finished').length;

  const resetFilters = () => {
    setStatusFilter('all');
    setClassFilter('all');
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 pb-20 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white dark:bg-[#0b1b15] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
            {t.common.home}
          </Link>
          <span>/</span>
          <span className="text-[#064734] dark:text-[#d4b26f] font-semibold">{t.header.catalog}</span>
        </div>
      </div>

      {/* 2. Заголовок раздела со сводными метриками */}
      <section className="bg-[#064734] text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {p.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide mb-4">
            {p.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            {p.heroDesc}
          </p>

          {/* Быстрые цифры */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">{p.statTotalLabel}</span>
              <strong className="text-lg font-black text-white">{p.statTotalVal}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">{p.statPriceLabel}</span>
              <strong className="text-lg font-black text-[#d4b26f]">{p.statPriceVal}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">{p.statInstallmentLabel}</span>
              <strong className="text-lg font-black text-white">{p.statInstallmentVal}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">{p.statBarterLabel}</span>
              <strong className="text-lg font-black text-white">{p.statBarterVal}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Панель поиска и фильтров */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        
        {/* Верхняя панель: Поиск и Сортировка */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={p.searchPlaceholder}
              className="w-full pl-10 pr-9 py-3 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f] shadow-sm transition-all"
            />
            <svg
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-400 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Очистить поиск"
                className="w-5 h-5 flex items-center justify-center absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-neutral-400 whitespace-nowrap hidden sm:inline">
              {p.sortLabel}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="py-3 px-4 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f] shadow-sm cursor-pointer"
            >
              <option value="default" className="dark:bg-[#0b1b15]">{p.sortDefault}</option>
              <option value="price-asc" className="dark:bg-[#0b1b15]">{p.sortPriceAsc}</option>
              <option value="price-desc" className="dark:bg-[#0b1b15]">{p.sortPriceDesc}</option>
            </select>
          </div>
        </div>

        {/* Табы фильтров: Статус и Класс */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-white/10">
          
          {/* Статус объекта */}
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                  : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
              }`}
            >
              {p.tabAll} ({RAW_PROJECTS.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2.5 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                statusFilter === 'active'
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                  : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
              }`}
            >
              <IconCrane className="w-3.5 h-3.5 shrink-0" />
              <span>{p.tabActive} ({activeCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('finished')}
              className={`px-4 py-2.5 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                statusFilter === 'finished'
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-sm'
                  : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
              }`}
            >
              <IconCheck className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
              <span>{p.tabFinished} ({finishedCount})</span>
            </button>
          </div>

          {/* Класс жилья */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300">
            <span className="text-[11px] uppercase font-bold text-gray-400 dark:text-neutral-400 mr-1">{p.classLabel}</span>
            {[
              { id: 'all', label: p.classAll },
              { id: 'premium', label: p.classPremium },
              { id: 'business', label: p.classBusiness },
              { id: 'comfort', label: p.classComfort },
            ].map((cls) => (
              <button
                key={cls.id}
                type="button"
                onClick={() => setClassFilter(cls.id as typeof classFilter)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  classFilter === cls.id
                    ? 'bg-gray-900 dark:bg-[#d4b26f] text-white dark:text-[#064734] font-bold'
                    : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-gray-300'
                }`}
              >
                {cls.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-neutral-400 font-medium mt-4">
          <span>
            {p.foundCount} <strong className="text-gray-900 dark:text-white">{filteredProjects.length}</strong>
          </span>
          {(statusFilter !== 'all' || classFilter !== 'all' || searchQuery !== '' || sortBy !== 'default') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#064734] dark:text-[#d4b26f] hover:underline font-bold cursor-pointer"
            >
              {p.resetFilters}
            </button>
          )}
        </div>

        {/* 4. Сетка карточек проектов */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {filteredProjects.map((project) => {
              const isFinished = project.category === 'finished';
              const waProjectText = encodeURIComponent(
                p.waProjectText.replace('{name}', project.name)
              );

              return (
                <div
                  key={project.slug}
                  className="bg-white dark:bg-[#0b1b15] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:border-[#d4b26f]/30 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Изображение проекта через next/image */}
                    <div className="relative h-64 w-full overflow-hidden bg-neutral-900">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Бейдж статуса */}
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase px-3 py-1.5 rounded-xl shadow-md ${
                            isFinished
                              ? 'bg-[#2b2b2b] text-white'
                              : 'bg-[#d4b26f] text-[#064734]'
                          }`}
                        >
                          {isFinished && <IconCheck className="w-3.5 h-3.5 text-emerald-400" />}
                          <span>{isFinished ? p.statusFinished : project.classType}</span>
                        </span>
                      </div>

                      {/* Бейдж цены */}
                      {project.price && (
                        <div 
                          suppressHydrationWarning
                          className="absolute bottom-4 right-4 z-10 bg-[#064734]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 shadow"
                        >
                          {project.price}
                        </div>
                      )}
                    </div>

                    {/* Контентная часть */}
                    <div className="p-6">
                      <h2 className="text-xl font-black text-gray-950 dark:text-white mb-2 group-hover:text-[#064734] dark:group-hover:text-[#d4b26f] transition-colors">
                        {project.name}
                      </h2>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-5 leading-relaxed line-clamp-2">
                        {project.desc}
                      </p>

                      <div className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-white/10 pt-4 font-medium">
                        <div className="flex items-center gap-2">
                          <IconMapPin className="w-4 h-4 text-[#d4b26f] shrink-0" />
                          <span className="truncate">{project.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconCalendar className="w-4 h-4 text-[#d4b26f] shrink-0" />
                          <span>{project.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconBuilding className="w-4 h-4 text-[#d4b26f] shrink-0" />
                          <span>{project.floors}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Кнопки действий */}
                  <div className="p-6 pt-0 space-y-2">
                    <Link
                      href={`/${project.slug}`}
                      className="w-full text-center bg-[#064734] hover:bg-[#042e22] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] hover:text-white dark:text-[#064734] dark:hover:text-[#064734] font-black py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>{p.detailsBtn}</span>
                      <IconArrowRight className="w-4 h-4" />
                    </Link>

                    {!isFinished && (
                      <a
                        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${waProjectText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center bg-gray-100 hover:bg-[#064734]/10 dark:bg-white/10 dark:hover:bg-white/15 text-[#064734] dark:text-[#d4b26f] font-bold py-2.5 rounded-xl uppercase tracking-wider text-[11px] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <IconWhatsApp className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>{p.askAvailabilityBtn}</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Состояние пустого поиска */
          <div className="py-20 text-center bg-white dark:bg-[#0b1b15] rounded-3xl border border-gray-200 dark:border-white/10 mt-6 p-8 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/10 flex items-center justify-center mx-auto mb-3 text-gray-400 dark:text-neutral-400">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{p.emptyTitle}</h3>
            <p className="text-xs text-gray-500 dark:text-neutral-400 max-w-sm mx-auto mb-6">
              {p.emptyDesc}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-6 py-3 rounded-xl bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] font-bold text-xs uppercase tracking-wider hover:bg-[#032b20] dark:hover:bg-[#c49f57] transition-colors cursor-pointer"
            >
              {p.emptyResetBtn}
            </button>
          </div>
        )}

        {/* 5. Баннер консультации внизу каталога */}
        <div className="mt-16 bg-[#dbe3df] dark:bg-[#0b1b15] rounded-3xl p-8 sm:p-12 border border-[#064734]/15 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 transition-colors">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-wider text-[#064734] dark:text-[#d4b26f] block mb-1">
              {p.ctaBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#064734] dark:text-white uppercase mb-2">
              {p.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#064734]/85 dark:text-gray-300 leading-relaxed">
              {p.ctaDesc}
            </p>
          </div>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(p.waCatalogText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#064734] hover:bg-[#032b20] dark:bg-[#064734] dark:hover:bg-[#0a4d38] text-white font-bold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 border border-transparent dark:border-white/10"
          >
            <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
            <span>{p.ctaBtn}</span>
          </a>
        </div>
      </div>
    </main>
  );
}