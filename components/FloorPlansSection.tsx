'use client';

import { useState, useEffect, useCallback } from 'react';

export interface ApartmentPlan {
  rooms: 1 | 2 | 3 | number;
  title: string;
  area: string;
  block?: string;
  image?: string;
  ceiling?: string;
  finish?: string;
}

interface FloorPlansSectionProps {
  projectName: string;
  plans: ApartmentPlan[];
  whatsappNumber?: string;
  theme?: 'dark' | 'light';
}

export default function FloorPlansSection({
  projectName,
  plans,
  whatsappNumber = '996709115115',
  theme = 'dark',
}: FloorPlansSectionProps) {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'all' | 1 | 2 | 3>('all');

  // Активная планировка для детального просмотра
  const [selectedPlan, setSelectedPlan] = useState<ApartmentPlan | null>(null);

  // Управление масштабом (Zoom)
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const filteredPlans =
    activeTab === 'all' ? plans : plans.filter((p) => p.rooms === activeTab);

  const openPlanModal = (plan: ApartmentPlan) => {
    setSelectedPlan(plan);
    setZoomLevel(1);
    setIsFullscreen(false);
  };

  const closeModal = useCallback(() => {
    setSelectedPlan(null);
    setZoomLevel(1);
    setIsFullscreen(false);
  }, []);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  // Навигация клавишами
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // Блокировка прокрутки фона при открытом окне
  useEffect(() => {
    if (selectedPlan) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPlan]);

  const otherPlans = selectedPlan
    ? plans.filter((p) => p.title !== selectedPlan.title || p.area !== selectedPlan.area)
    : [];

  const getWhatsAppLink = (plan: ApartmentPlan) => {
    const message = `Здравствуйте! Меня интересует планировка: ${plan.title} (${plan.area}) в ${projectName}. Отправьте, пожалуйста, свободные этажи и расчет рассрочки.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className={`py-20 px-4 sm:px-6 relative ${isDark ? 'bg-[#141816] text-white' : 'bg-[#f4f7f5] text-gray-900'}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Шапка каталога */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b pb-8 border-gray-200 dark:border-white/10">
          <div>
            <span className="text-xs sm:text-sm uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
              Каталог квартир
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#064734]'}`}>
              Планировочные решения
            </h2>
          </div>

          {/* Фильтр по комнатам */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-black/10 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10">
            {[
              { id: 'all', label: 'Все планировки' },
              { id: 1, label: '1-комнатные' },
              { id: 2, label: '2-комнатные' },
              { id: 3, label: '3-комнатные' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 ${
                    isActive
                      ? 'bg-[#064734] text-white shadow-md scale-105'
                      : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-gray-950 hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Сетка карточек планировок */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlans.map((plan, idx) => (
            <div
              key={idx}
              onClick={() => openPlanModal(plan)}
              className={`group cursor-pointer rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between border ${
                isDark
                  ? 'bg-[#1e2421] hover:bg-[#252d29] border-white/10 hover:border-[#d4b26f] shadow-lg hover:shadow-2xl hover:shadow-black/50'
                  : 'bg-white hover:bg-[#fbfcfb] border-gray-200 hover:border-[#064734] shadow-md hover:shadow-xl'
              }`}
            >
              <div>
                {/* Белая подложка под чертеж */}
                <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-white p-4 mb-5 flex items-center justify-center border border-gray-150 shadow-inner">
                  
                  {/* Бедж комнатности */}
                  <span className="absolute top-3 left-3 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-[#064734] text-white shadow-sm">
                    {plan.rooms}-КОМНАТНАЯ
                  </span>

                  {/* Иконка лупы */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#064734]/90 text-white flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Чертеж */}
                  <img
                    src={plan.image || '/projects/Abu-Dhabi.png'}
                    alt={plan.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Название квартиры */}
                <h3 className={`text-sm sm:text-base font-bold leading-snug line-clamp-2 mb-3 transition-colors ${
                  isDark
                    ? 'text-white group-hover:text-[#d4b26f]'
                    : 'text-gray-900 group-hover:text-[#064734]'
                }`}>
                  {plan.title}
                </h3>

                {/* Площадь квартиры */}
                <div className="text-2xl sm:text-3xl font-black text-[#d4b26f] tracking-tight mb-4">
                  {plan.area}
                </div>
              </div>

              {/* Кнопка открытия */}
              <button
                type="button"
                className={`mt-2 w-full py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-white/10 group-hover:bg-[#064734] text-white'
                    : 'bg-[#eef3f0] group-hover:bg-[#064734] text-[#064734] group-hover:text-white'
                }`}
              >
                <span>Подробнее о квартире</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 🔍 МОДАЛЬНОЕ ОКНО ДЕТАЛЬНОГО ПРОСМОТРА С КРУПНЫМ ШРИФТОМ И ЗУМОМ         */}
      {/* ========================================================================= */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className={`relative w-full ${
              isFullscreen ? 'max-w-none h-screen rounded-none' : 'max-w-6xl max-h-[94vh] rounded-3xl'
            } bg-[#161a18] text-white border border-white/15 shadow-2xl flex flex-col overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Верхняя статус-строка */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs sm:text-sm uppercase font-black tracking-wider text-[#d4b26f]">
                  {projectName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hidden sm:flex px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 transition-colors items-center gap-1.5"
                >
                  <span>{isFullscreen ? 'Свернуть' : 'На весь экран'}</span>
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Закрыть окно"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Тело модалки */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
              
              {/* Левая часть: чертеж с инструментами зума (7 колонок) */}
              <div className="lg:col-span-7 relative bg-neutral-900 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[480px] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
                
                {/* Панель инструментов масштаба */}
                <div className="absolute top-4 left-4 z-30 flex items-center gap-2 p-1.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 shadow-lg">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.8}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center text-lg font-bold transition-colors"
                    title="Уменьшить"
                  >
                    −
                  </button>
                  <span className="text-xs sm:text-sm font-mono font-black px-2 text-[#d4b26f]">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 2.5}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center text-lg font-bold transition-colors"
                    title="Приблизить"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="px-3 py-1.5 text-xs font-extrabold uppercase rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 transition-colors ml-1"
                  >
                    Сброс
                  </button>
                </div>

                {/* Белый подиум чертежа для максимальной видимости */}
                <div
                  className="relative z-10 w-full h-full flex items-center justify-center bg-white rounded-2xl p-6 sm:p-8 shadow-2xl transition-transform duration-300 ease-out cursor-zoom-in"
                  style={{ transform: `scale(${zoomLevel})` }}
                  onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.6 : 1))}
                >
                  <img
                    src={selectedPlan.image || '/projects/Abu-Dhabi.png'}
                    alt={selectedPlan.title}
                    className="max-h-[320px] sm:max-h-[420px] max-w-full object-contain"
                  />
                </div>

                <span className="relative z-20 mt-4 text-xs font-semibold text-gray-300 bg-black/60 px-4 py-1.5 rounded-full border border-white/10">
                  💡 Нажмите на изображение для быстрого увеличения
                </span>
              </div>

              {/* Правая часть: параметры и кнопка заявки (5 колонок) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#1b211e]">
                <div>
                  <span className="inline-block text-xs uppercase font-black tracking-widest text-[#d4b26f] mb-2">
                    {selectedPlan.rooms}-КОМНАТНАЯ КВАРТИРА
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                    {selectedPlan.title}
                  </h3>

                  <div className="text-4xl sm:text-5xl font-black text-[#d4b26f] tracking-tight mb-8">
                    {selectedPlan.area}
                  </div>

                  {/* Крупная сетка характеристик */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-xs text-gray-400 font-semibold block mb-1">Потолки</span>
                      <strong className="text-base sm:text-lg font-black text-white">
                        {selectedPlan.ceiling || '3.45 метра'}
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-xs text-gray-400 font-semibold block mb-1">Отделка</span>
                      <strong className="text-base sm:text-lg font-black text-white">
                        {selectedPlan.finish || 'ПСО'}
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-xs text-gray-400 font-semibold block mb-1">Сейсмостойкость</span>
                      <strong className="text-base sm:text-lg font-black text-white">
                        9 баллов
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-xs text-gray-400 font-semibold block mb-1">Рассрочка</span>
                      <strong className="text-base sm:text-lg font-black text-[#d4b26f]">
                        до 40 мес. 0%
                      </strong>
                    </div>
                  </div>

                  {/* Гарантии */}
                  <div className="p-4 rounded-2xl bg-[#064734]/30 border border-[#064734] flex items-start gap-3 mb-6">
                    <span className="text-2xl">📋</span>
                    <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                      Прямой договор с застройщиком. Возможность оформления по программе Trade-in (бартер на авто или вторичную недвижимость).
                    </p>
                  </div>
                </div>

                {/* Большая кнопка связи в WhatsApp */}
                <div>
                  <a
                    href={getWhatsAppLink(selectedPlan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-[#064734] hover:bg-[#032b20] active:scale-[0.98] text-white font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-200 shadow-xl flex items-center justify-center gap-3 border border-emerald-500/30"
                  >
                    <span className="text-xl">💬</span>
                    <span>Узнать цену и свободные этажи</span>
                  </a>
                  <span className="text-xs text-gray-400 text-center block mt-3 font-medium">
                    Менеджер отдела продаж ответит в течение 2 минут
                  </span>
                </div>
              </div>

            </div>

            {/* Нижняя лента: «Другие планировки» */}
            {otherPlans.length > 0 && (
              <div className="px-6 py-4 bg-black/50 border-t border-white/10">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 block mb-3">
                  Другие планировки в этом объекте:
                </span>

                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {otherPlans.slice(0, 8).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => openPlanModal(item)}
                      className="flex-shrink-0 w-52 p-3 rounded-2xl bg-white/5 hover:bg-[#064734]/40 border border-white/10 hover:border-[#d4b26f] cursor-pointer transition-all flex items-center gap-3 group"
                    >
                      <div className="w-14 h-14 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 border border-gray-200">
                        <img
                          src={item.image || '/projects/Abu-Dhabi.png'}
                          alt={item.title}
                          className="max-h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs text-gray-200 font-bold block truncate group-hover:text-white">
                          {item.title}
                        </span>
                        <strong className="text-sm text-[#d4b26f] font-black">
                          {item.area}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}