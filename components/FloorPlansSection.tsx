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

  // Активная планировка
  const [selectedPlan, setSelectedPlan] = useState<ApartmentPlan | null>(null);
  
  // Управление масштабом и полноэкранным режимом
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // 3D Tilt переменные наклона
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement>(null);

  const filteredPlans =
    activeTab === 'all' ? plans : plans.filter((p) => p.rooms === activeTab);

  // Открытие модалки
  const openPlanModal = (plan: ApartmentPlan) => {
    setSelectedPlan(plan);
    setZoomLevel(1);
    setRotateX(0);
    setRotateY(0);
    setIsFullscreen(false);
    setIsAutoRotate(false);
  };

  const closeModal = useCallback(() => {
    setSelectedPlan(null);
    setZoomLevel(1);
    setRotateX(0);
    setRotateY(0);
    setIsFullscreen(false);
    setIsAutoRotate(false);
  }, []);

  // Управление зумом
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.75));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setRotateX(0);
    setRotateY(0);
  };

  // Расчет 3D-наклона от центра подиума
  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!stageRef.current || isAutoRotate) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    
    // Плавный угол наклона: до ±28° по горизонтали и ±20° по вертикали
    setRotateY(Number((x * 32).toFixed(2)));
    setRotateX(Number((-y * 24).toFixed(2)));
    setIsInteracting(true);
  };

  const handlePointerLeave = () => {
    setIsInteracting(false);
    if (!isAutoRotate) {
      setRotateX(0);
      setRotateY(0);
    }
  };

  // Авто-парение (Wobble анимация через requestAnimationFrame)
  useEffect(() => {
    if (!isAutoRotate || !selectedPlan) return;

    let frameId: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      setRotateY(Math.sin(elapsed * 1.5) * 18);
      setRotateX(Math.cos(elapsed * 1.2) * 10);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isAutoRotate, selectedPlan]);

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // Блокировка прокрутки фона страницы
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
    const message = `Здравствуйте! Меня интересует 3D-планировка: ${plan.title} (${plan.area}) в ${projectName}. Отправьте, пожалуйста, свободные этажи и расчет рассрочки.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className={`py-24 px-4 sm:px-6 relative overflow-hidden ${isDark ? 'bg-[#0e1110] text-white' : 'bg-[#f4f7f5] text-gray-900'}`}>
      
      {/* Декоративное изумрудное свечение */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#064734]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Шапка каталога */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064734]/30 border border-[#d4b26f]/30 text-[#d4b26f] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b26f] animate-pulse" />
              Интерактивный 3D Каталог
            </div>
            <h2 className={`text-3xl sm:text-5xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#064734]'}`}>
              Планировки квартир
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

        {/* Сетка планировок */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {filteredPlans.map((plan, idx) => (
            <div
              key={idx}
              onClick={() => openPlanModal(plan)}
              className="group cursor-pointer rounded-3xl p-5 bg-gradient-to-b from-white/[0.07] to-white/[0.02] hover:from-[#064734]/30 hover:to-black/40 border border-white/10 hover:border-[#d4b26f]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              <div>
                {/* Карточка-подиум */}
                <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900/90 to-black p-4 mb-5 flex items-center justify-center border border-white/5 group-hover:border-[#d4b26f]/20 transition-colors">
                  
                  {/* Фоновая архитектурная сетка */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />

                  <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#064734] text-white shadow border border-white/10">
                    {plan.rooms}-КОМНАТНАЯ
                  </span>

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-[#d4b26f] flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                    <span className="text-xs">3D</span>
                  </div>

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
      {/* 🏛️ 3D-ШОУРУМ С ИНТЕРАКТИВНЫМ TILT НАКЛОНОМ                               */}
      {/* ========================================================================= */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn"
          onClick={closeModal}
        >
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
                  {projectName} • Интерактивный 3D Осмотр
                </span>
              </div>

              {/* Управление окном */}
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

            {/* Основное тело */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
              
              {/* Левая 3D-сцена с реакцией на движение (7 колонок) */}
              <div
                ref={stageRef}
                onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
                onMouseLeave={handlePointerLeave}
                onTouchMove={(e) => {
                  if (e.touches[0]) {
                    handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
                  }
                }}
                onTouchEnd={handlePointerLeave}
                style={{ touchAction: 'none' }}
                className="lg:col-span-7 relative bg-gradient-to-b from-black/85 to-neutral-950 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[520px] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden select-none cursor-crosshair"
              >
                
                {/* Архитектурная координатная сетка */}
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(212,178,111,0.45) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Панель инструментов: масштаб и режим Авто-вращения */}
                <div className="absolute top-4 left-4 z-30 flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl">
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

                  <div className="h-4 w-px bg-white/20 mx-1" />

                  {/* Кнопка Авто-парения 3D */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoRotate(!isAutoRotate);
                      if (isAutoRotate) {
                        setRotateX(0);
                        setRotateY(0);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold uppercase transition-all flex items-center gap-1.5 ${
                      isAutoRotate
                        ? 'bg-[#d4b26f] text-[#064734] shadow-md shadow-[#d4b26f]/30'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    <span>{isAutoRotate ? '⏹ Стоп 3D' : '🔄 Авто 3D'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
                  >
                    Сброс
                  </button>
                </div>

                {/* 3D Контейнер с перспективой */}
                <div
                  className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
                  style={{ perspective: '1200px' }}
                >
                  <div
                    className="relative transition-transform ease-out"
                    style={{
                      transform: `scale(${zoomLevel}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                      transformStyle: 'preserve-3d',
                      transitionDuration: isInteracting ? '70ms' : '500ms',
                    }}
                  >
                    {/* Динамическая падающая тень */}
                    <img
                      src={selectedPlan.image || '/projects/Abu-Dhabi.png'}
                      alt={selectedPlan.title}
                      className="max-h-[340px] sm:max-h-[440px] max-w-full object-contain select-none"
                      style={{
                        filter: `drop-shadow(${-rotateY * 1.3}px ${rotateX * 1.3 + 28}px 32px rgba(0,0,0,0.85))`,
                      }}
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Интерактивная подсказка внизу сцены */}
                <div className="relative z-20 mt-3 text-center pointer-events-none">
                  <span className="text-[11px] font-medium text-gray-400 bg-black/60 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                    🕹️ Водите курсором или пальцем для наклона в 3D пространстве
                  </span>
                </div>
              </div>

              {/* Правая колонка характеристик (5 колонок) */}
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

                  {/* Сетка параметров */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                      <span className="text-[11px] text-gray-400 block mb-1">Высота потолков</span>
                      <strong className="text-sm font-bold text-white">
                        {selectedPlan.ceiling || '3.45 метра'}
                      </strong>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                      <span className="text-[11px] text-gray-400 block mb-1">Тип отделки</span>
                      <strong className="text-sm font-bold text-white">
                        {selectedPlan.finish || 'ПСО (самоотделка)'}
                      </strong>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                      <span className="text-[11px] text-gray-400 block mb-1">Сейсмостойкость</span>
                      <strong className="text-sm font-bold text-white">9 баллов</strong>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                      <span className="text-[11px] text-gray-400 block mb-1">Рассрочка</span>
                      <strong className="text-sm font-bold text-[#d4b26f]">до 40 мес. 0%</strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#064734]/25 border border-[#064734]/60 flex items-start gap-3 mb-6">
                    <span className="text-xl">🛡️</span>
                    <p className="text-xs text-emerald-100/90 leading-relaxed">
                      Прямое оформление от застройщика EL ORDO GROUP. Доступна программа Trade-in (обмен на авто или вторичную недвижимость).
                    </p>
                  </div>
                </div>

                {/* WhatsApp конверсия */}
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
                    Менеджер вышлет этажи и актуальный прайс в течение 2 минут
                  </span>
                </div>
              </div>

            </div>

            {/* Нижняя лента: выбор других 3D-планировок */}
            {otherPlans.length > 0 && (
              <div className="px-6 py-4 bg-black/60 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Другие доступные варианты:
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