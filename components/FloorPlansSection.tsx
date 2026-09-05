'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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

  // Активная планировка для 3D-шоурума
  const [selectedPlan, setSelectedPlan] = useState<ApartmentPlan | null>(null);
  
  // Управление масштабом (Zoom)
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const filteredPlans =
    activeTab === 'all' ? plans : plans.filter((p) => p.rooms === activeTab);

  // Сброс зума при смене квартиры
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

  // Управление зумом
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  // Навигация клавишами
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // Блокировка прокрутки фона
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

  // Другие планировки для нижней ленты
  const otherPlans = selectedPlan
    ? plans.filter((p) => p.title !== selectedPlan.title || p.area !== selectedPlan.area)
    : [];

  const getWhatsAppLink = (plan: ApartmentPlan) => {
    const message = `Здравствуйте! Меня интересует 3D-планировка: ${plan.title} (${plan.area}) в ${projectName}. Отправьте, пожалуйста, свободные этажи и расчет рассрочки.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className={`py-24 px-4 sm:px-6 relative overflow-hidden ${isDark ? 'bg-[#0e1110] text-white' : 'bg-[#f4f7f5] text-gray-900'}`}>
      
      {/* Декоративное фоновое свечение */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#064734]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Шапка секции */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064734]/30 border border-[#d4b26f]/30 text-[#d4b26f] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b26f] animate-pulse" />
              Интерактивный каталог
            </div>
            <h2 className={`text-3xl sm:text-5xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#064734]'}`}>
              3D Планировки
            </h2>
          </div>

          {/* Фильтр по комнатам */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
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
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#064734] to-[#0a5740] text-white shadow-lg shadow-[#064734]/40 scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Сетка карточек с 3D-эффектом */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {filteredPlans.map((plan, idx) => (
            <div
              key={idx}
              onClick={() => openPlanModal(plan)}
              className="group cursor-pointer rounded-3xl p-5 bg-gradient-to-b from-white/[0.07] to-white/[0.02] hover:from-[#064734]/30 hover:to-black/40 border border-white/10 hover:border-[#d4b26f]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              <div>
                {/* 3D-подиум карточки */}
                <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900/90 to-black p-4 mb-5 flex items-center justify-center border border-white/5 group-hover:border-[#d4b26f]/20 transition-colors">
                  
                  {/* Фоновая координатная сетка */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* Бедж комнатности */}
                  <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#064734] text-white shadow border border-white/10">
                    {plan.rooms}-КОМНАТНАЯ
                  </span>

                  {/* Иконка 3D / Лупы */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-[#d4b26f] flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>

                  {/* Само 3D-изображение с мягким левитирующим зумом */}
                  <img
                    src={plan.image || '/projects/Abu-Dhabi.png'}
                    alt={plan.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>

                <p className="text-xs text-gray-400 font-medium line-clamp-2 mb-2">
                  {plan.title}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-[#d4b26f] tracking-tight">
                    {plan.area}
                  </span>
                </div>
              </div>

              {/* Кнопка интерактивного входа */}
              <button
                type="button"
                className="mt-5 w-full py-3 rounded-xl bg-white/5 group-hover:bg-[#064734] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 group-hover:border-transparent shadow-sm"
              >
                <span>3D Осмотр</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 🏛️ ПРЕМИАЛЬНЫЙ 3D-ШОУРУМ (MODAL SHOWCASE)                                 */}
      {/* ========================================================================= */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn"
          onClick={closeModal}
        >
          {/* Контейнер шоурума */}
          <div
            className={`relative w-full ${
              isFullscreen ? 'max-w-none h-screen rounded-none' : 'max-w-6xl max-h-[94vh] rounded-[32px]'
            } bg-gradient-to-b from-[#161a18] to-[#0c0f0d] text-white border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden transition-all duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Верхняя статус-панель */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#d4b26f]">
                  {projectName} • 3D Модель
                </span>
              </div>

              {/* Кнопки управления */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hidden sm:flex px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-300 hover:text-white transition-colors items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>{isFullscreen ? 'Обычный вид' : 'Во весь экран'}</span>
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Закрыть"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Основное тело шоурума */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
              
              {/* Левая интерактивная 3D-сцена (7 колонок) */}
              <div className="lg:col-span-7 relative bg-gradient-to-b from-black/80 to-neutral-950 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[500px] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
                
                {/* Архитектурная подложка-сетка */}
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(212,178,111,0.4) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Плавающая панель инструментов масштабирования (Floating 3D Bar) */}
                <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/15 shadow-2xl">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.75}
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white flex items-center justify-center text-sm font-bold transition-all"
                    title="Уменьшить"
                  >
                    −
                  </button>
                  <span className="text-[11px] font-mono px-2 font-bold text-[#d4b26f]">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 2.5}
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white flex items-center justify-center text-sm font-bold transition-all"
                    title="Приблизить"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 transition-colors ml-1"
                  >
                    Сброс
                  </button>
                </div>

                {/* 3D-планировка с трансформацией масштаба */}
                <div
                  className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
                  style={{ transform: `scale(${zoomLevel})` }}
                  onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.75 : 1))}
                >
                  <img
                    src={selectedPlan.image || '/projects/Abu-Dhabi.png'}
                    alt={selectedPlan.title}
                    className="max-h-[340px] sm:max-h-[440px] max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] select-none"
                    draggable={false}
                  />
                </div>

                <div className="relative z-20 mt-4 text-center">
                  <span className="text-[11px] text-gray-400 bg-black/60 px-3 py-1 rounded-full border border-white/5">
                    💡 Кликните по планировке для быстрого увеличения деталей
                  </span>
                </div>
              </div>

              {/* Правая колонка с характеристиками и бронированием (5 колонок) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#141816] to-[#0c0f0e]">
                <div>
                  <div className="inline-block text-[11px] uppercase font-black tracking-widest text-[#d4b26f] mb-1">
                    {selectedPlan.rooms}-КОМНАТНАЯ КВАРТИРА
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                    {selectedPlan.title}
                  </h3>

                  <div className="text-3xl sm:text-4xl font-black text-[#d4b26f] tracking-tight mb-6">
                    {selectedPlan.area}
                  </div>

                  {/* Сетка параметров 2x2 */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                      <span className="text-[11px] text-gray-400 block mb-1">Потолки</span>
                      <strong className="text-sm font-bold text-white">
                        {selectedPlan.ceiling || '3.45 метра'}
                      </strong>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                      <span className="text-[11px] text-gray-400 block mb-1">Отделка</span>
                      <strong className="text-sm font-bold text-white">
                        {selectedPlan.finish || 'ПСО (самоотделка)'}
                      </strong>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                      <span className="text-[11px] text-gray-400 block mb-1">Сейсмостойкость</span>
                      <strong className="text-sm font-bold text-white">9 баллов (СНиП)</strong>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                      <span className="text-[11px] text-gray-400 block mb-1">Рассрочка</span>
                      <strong className="text-sm font-bold text-[#d4b26f]">до 40 месяцев 0%</strong>
                    </div>
                  </div>

                  {/* Выгода и статус */}
                  <div className="p-4 rounded-2xl bg-[#064734]/25 border border-[#064734]/60 flex items-start gap-3 mb-6">
                    <span className="text-xl">🛡️</span>
                    <p className="text-xs text-emerald-100/90 leading-relaxed">
                      Прямой договор с застройщиком. Возможность оформления по программе Trade-in (обмен авто или недвижимости).
                    </p>
                  </div>
                </div>

                {/* Кнопка мгновенной связи */}
                <div>
                  <a
                    href={getWhatsAppLink(selectedPlan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#064734] to-[#0a5c44] hover:from-[#032b20] hover:to-[#064734] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#064734]/30 flex items-center justify-center gap-2.5 active:scale-[0.98] border border-emerald-500/30"
                  >
                    <span className="text-base">💬</span>
                    <span>Получить расчет и цены в WhatsApp</span>
                  </a>
                  <span className="text-[11px] text-gray-500 text-center block mt-2">
                    Ответим в течение 2 минут со всеми деталями
                  </span>
                </div>
              </div>

            </div>

            {/* Нижняя лента: «Другие 3D-планировки» */}
            {otherPlans.length > 0 && (
              <div className="px-6 py-4 bg-black/60 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Другие доступные планировки:
                  </span>
                  <span className="text-[11px] text-[#d4b26f]">
                    Всего вариантов: {plans.length}
                  </span>
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {otherPlans.slice(0, 6).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => openPlanModal(item)}
                      className="flex-shrink-0 w-44 p-2.5 rounded-xl bg-white/5 hover:bg-[#064734]/30 border border-white/10 hover:border-[#d4b26f]/50 cursor-pointer transition-all flex items-center gap-2.5 group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-black/50 p-1 flex items-center justify-center flex-shrink-0">
                        <img
                          src={item.image || '/projects/Abu-Dhabi.png'}
                          alt={item.title}
                          className="max-h-full object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] text-gray-400 block truncate">
                          {item.title}
                        </span>
                        <strong className="text-xs text-[#d4b26f] font-bold">
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