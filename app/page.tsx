'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import {
  IconBuilding,
  IconCrane,
  IconCheck,
  IconMapPin,
  IconCalendar,
  IconArrowRight,
  IconWhatsApp,
} from '@/components/Icons';

interface Project {
  slug: string;
  name: string;
  category: 'active' | 'finished';
  classType: string;
  classCategory: 'premium' | 'business' | 'comfort';
  image: string;
  address: string;
  deadline: string;
  price: string | null;
  priceNum: number;
  floors: string;
  desc: string;
}

export default function ProjectsCatalogPage() {
  const { t } = useLanguage();

  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'finished'>('all');
  const [classFilter, setClassFilter] = useState<'all' | 'premium' | 'business' | 'comfort'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const projects: Project[] = useMemo(() => [
    {
      slug: 'abu-dhabi',
      name: 'ЖК Abu Dhabi',
      category: 'active',
      classType: t.projectsPage.abuDhabiClass,
      classCategory: 'premium',
      image: '/projects/Abu-Dhabi.png',
      address: 'ул. Сухомлинова, 29',
      deadline: t.projectsPage.abuDhabiDeadline,
      price: `${t.common.fromPrice} 1 650 ${t.common.sqm}`,
      priceNum: 1650,
      floors: t.projectsPage.abuDhabiFloors,
      desc: t.projectsPage.abuDhabiDesc,
    },
    {
      slug: 'madina-residence',
      name: 'ЖК Madina Residence',
      category: 'active',
      classType: t.projectsPage.madinaClass,
      classCategory: 'business',
      image: '/projects/Madina-Residense.png',
      address: 'ул. Огонбаева, 12',
      deadline: t.projectsPage.madinaDeadline,
      price: `${t.common.fromPrice} 1 400 ${t.common.sqm}`,
      priceNum: 1400,
      floors: t.projectsPage.madinaFloors,
      desc: t.projectsPage.madinaDesc,
    },
    {
      slug: 'ajkol-plus',
      name: 'ЖД Айкол +',
      category: 'active',
      classType: t.projectsPage.ajkolPlusClass,
      classCategory: 'comfort',
      image: '/projects/Aikolplus.png',
      address: 'с. Кок-Жар, ул. Баялинова, 6',
      deadline: t.projectsPage.ajkolPlusDeadline,
      price: `${t.common.fromPrice} 1 100 ${t.common.sqm}`,
      priceNum: 1100,
      floors: t.projectsPage.ajkolPlusFloors,
      desc: t.projectsPage.ajkolPlusDesc,
    },
    {
      slug: 'ajkol',
      name: 'ЖД Айкол',
      category: 'active',
      classType: t.projectsPage.ajkolClass,
      classCategory: 'comfort',
      image: '/projects/ajkol.jpg',
      address: 'ул. Арашан, 10',
      deadline: t.projectsPage.ajkolDeadline,
      price: `${t.common.fromPrice} 950 ${t.common.sqm}`,
      priceNum: 950,
      floors: t.projectsPage.ajkolFloors,
      desc: t.projectsPage.ajkolDesc,
    },
    {
      slug: 'kelechek',
      name: 'ЖК Келечек',
      category: 'finished',
      classType: t.projectsPage.kelechekClass,
      classCategory: 'comfort',
      image: '/projects/Kelechek.jpg',
      address: 'ул. Космическая, 153',
      deadline: t.projectsPage.statusFinishedFull,
      price: t.projectsPage.soldOut,
      priceNum: 0,
      floors: t.projectsPage.kelechekFloors,
      desc: t.projectsPage.kelechekDesc,
    },
    {
      slug: 'ordo',
      name: 'КД Ордо',
      category: 'finished',
      classType: t.projectsPage.ordoClass,
      classCategory: 'premium',
      image: '/projects/Ordo.jpg',
      address: 'ул. Тверская, 20',
      deadline: t.projectsPage.statusFinishedFull,
      price: t.projectsPage.soldOut,
      priceNum: 0,
      floors: t.projectsPage.ordoFloors,
      desc: t.projectsPage.ordoDesc,
    },
  ], [t]);

  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      if (statusFilter !== 'all' && item.category !== statusFilter) return false;
      if (classFilter !== 'all' && item.classCategory !== classFilter) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchAddress = item.address.toLowerCase().includes(query);
        if (!matchName && !matchAddress) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return (a.priceNum || 999999) - (b.priceNum || 999999);
      }
      if (sortBy === 'price-desc') {
        return (b.priceNum || 0) - (a.priceNum || 0);
      }
      return 0;
    });
  }, [projects, statusFilter, classFilter, searchQuery, sortBy]);

  const activeCount = projects.filter((p) => p.category === 'active').length;
  const finishedCount = projects.filter((p) => p.category === 'finished').length;

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
            {t.projectsPage.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide mb-4">
            {t.projectsPage.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            {t.projectsPage.heroDesc}
          </p>

          {/* Быстрые цифры */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">{t.projectsPage.statTotalLabel}</span>
              <strong className="text-lg font-black text-white">{t.projectsPage.statTotalVal}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">{t.projectsPage.statPriceLabel}</span>
              <strong className="text-lg font-black text-[#d4b26f]">{t.projectsPage.statPriceVal}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">{t.projectsPage.statInstallmentLabel}</span>
              <strong className="text-lg font-black text-white">{t.projectsPage.statInstallmentVal}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">{t.projectsPage.statBarterLabel}</span>
              <strong className="text-lg font-black text-white">{t.projectsPage.statBarterVal}</strong>
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
              placeholder={t.projectsPage.searchPlaceholder}
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
              {t.projectsPage.sortLabel}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="py-3 px-4 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f] shadow-sm cursor-pointer"
            >
              <option value="default" className="dark:bg-[#0b1b15]">{t.projectsPage.sortDefault}</option>
              <option value="price-asc" className="dark:bg-[#0b1b15]">{t.projectsPage.sortPriceAsc}</option>
              <option value="price-desc" className="dark:bg-[#0b1b15]">{t.projectsPage.sortPriceDesc}</option>
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
              {t.projectsPage.tabAll} ({projects.length})
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
              <span>{t.projectsPage.tabActive} ({activeCount})</span>
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
              <span>{t.projectsPage.tabFinished} ({finishedCount})</span>
            </button>
          </div>

          {/* Класс жилья */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300">
            <span className="text-[11px] uppercase font-bold text-gray-400 dark:text-neutral-400 mr-1">{t.projectsPage.classLabel}</span>
            {[
              { id: 'all', label: t.projectsPage.classAll },
              { id: 'premium', label: t.projectsPage.classPremium },
              { id: 'business', label: t.projectsPage.classBusiness },
              { id: 'comfort', label: t.projectsPage.classComfort },
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
            {t.projectsPage.foundCount} <strong className="text-gray-900 dark:text-white">{filteredProjects.length}</strong>
          </span>
          {(statusFilter !== 'all' || classFilter !== 'all' || searchQuery !== '' || sortBy !== 'default') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#064734] dark:text-[#d4b26f] hover:underline font-bold cursor-pointer"
            >
              {t.projectsPage.resetFilters}
            </button>
          )}
        </div>

        {/* 4. Сетка карточек проектов */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {filteredProjects.map((project) => {
              const isFinished = project.category === 'finished';
              const waProjectText = encodeURIComponent(
                t.projectsPage.waProjectText.replace('{name}', project.name)
              );

              return (
                <div
                  key={project.slug}
                  className="bg-white dark:bg-[#0b1b15] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:border-[#d4b26f]/30 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Изображение проекта */}
                    <div className="relative h-64 w-full overflow-hidden bg-neutral-900">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Бейдж статуса */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase px-3 py-1.5 rounded-xl shadow-md ${
                            isFinished
                              ? 'bg-[#2b2b2b] text-white'
                              : 'bg-[#d4b26f] text-[#064734]'
                          }`}
                        >
                          {isFinished && <IconCheck className="w-3.5 h-3.5 text-emerald-400" />}
                          <span>{isFinished ? t.projectsPage.statusFinished : project.classType}</span>
                        </span>
                      </div>

                      {/* Бейдж цены */}
                      {project.price && (
                        <div className="absolute bottom-4 right-4 bg-[#064734]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 shadow">
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
                      className="w-full text-center bg-[#064734] hover:bg-[#042e22] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] hover:text-white dark:text-[#064734] dark:hover:text-[#064734] font-black py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{t.projectsPage.detailsBtn}</span>
                      <IconArrowRight className="w-4 h-4" />
                    </Link>

                    {!isFinished && (
                      <a
                        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${waProjectText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center bg-gray-100 hover:bg-[#064734]/10 dark:bg-white/10 dark:hover:bg-white/15 text-[#064734] dark:text-[#d4b26f] font-bold py-2.5 rounded-xl uppercase tracking-wider text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <IconWhatsApp className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>{t.projectsPage.askAvailabilityBtn}</span>
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
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t.projectsPage.emptyTitle}</h3>
            <p className="text-xs text-gray-500 dark:text-neutral-400 max-w-sm mx-auto mb-6">
              {t.projectsPage.emptyDesc}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-6 py-3 rounded-xl bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] font-bold text-xs uppercase tracking-wider hover:bg-[#032b20] dark:hover:bg-[#c49f57] transition-colors cursor-pointer"
            >
              {t.projectsPage.emptyResetBtn}
            </button>
          </div>
        )}

        {/* 5. Баннер консультации внизу каталога */}
        <div className="mt-16 bg-[#dbe3df] dark:bg-[#0b1b15] rounded-3xl p-8 sm:p-12 border border-[#064734]/15 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 transition-colors">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-wider text-[#064734] dark:text-[#d4b26f] block mb-1">
              {t.projectsPage.ctaBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#064734] dark:text-white uppercase mb-2">
              {t.projectsPage.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#064734]/85 dark:text-gray-300 leading-relaxed">
              {t.projectsPage.ctaDesc}
            </p>
          </div>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(t.projectsPage.waCatalogText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#064734] hover:bg-[#032b20] dark:bg-[#064734] dark:hover:bg-[#0a4d38] text-white font-bold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 border border-transparent dark:border-white/10 cursor-pointer"
          >
            <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
            <span>{t.projectsPage.ctaBtn}</span>
          </a>
        </div>
      </div>
    </main>
  );
}