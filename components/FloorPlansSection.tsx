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
  const [activeTab, setActiveTab] = useState<'all' | 1 | 2 | 3>('all');
  
  // Выбранная планировка для детального просмотра
  const [selectedPlan, setSelectedPlan] = useState<ApartmentPlan | null>(null);
  // Полноэкранный зум (Lightbox как на 3-м скриншоте)
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const filteredPlans =
    activeTab === 'all' ? plans : plans.filter((p) => p.rooms === activeTab);

  const isDark = theme === 'dark';

  // Закрытие по клавише Esc
  const handleCloseModal = useCallback(() => {
    if (isLightboxOpen) {
      setIsLightboxOpen(false);
    } else {
      setSelectedPlan(null);
    }
  }, [isLightboxOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCloseModal]);

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

  // Список «Другие планировки» (исключаем текущую открытую)
  const otherPlans = selectedPlan
    ? plans.filter((p) => p.title !== selectedPlan.title || p.area !== selectedPlan.area).slice(0, 4)
    : [];

  const getWhatsAppLink = (plan: ApartmentPlan) => {
    const message = `Здравствуйте! Интересует подробная информация о планировке: ${plan.title} (${plan.area}) в ${projectName}. Сообщите, пожалуйста, актуальную цену, этажи и условия рассрочки.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className={`py-16 px-4 sm:px-6 relative ${isDark ? 'bg-[#181818] text-white' : 'bg-[#f4f7f5] text-gray-900'}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Заголовок */}
        <h2 className={`text-2xl sm:text-3xl font-black text-center uppercase tracking-wider mb-8 ${isDark ? 'text-[#d4b26f]' : 'text-[#064734]'}`}>
          Планировки
        </h2>

        {/* Табы комнатности */}
        <div className="flex justify-center items-center gap-6 sm:gap-10 mb-12 border-b border-white/10 pb-4">
          {[
            { id: 'all', label: 'Все' },
            { id: 1, label: '1 ком' },
            { id: 2, label: '2 ком' },
            { id: 3, label: '3 ком' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`text-sm sm:text-base font-bold transition-all relative pb-2 ${
                  isActive
                    ? isDark
                      ? 'text-[#d4b26f]'
                      : 'text-[#064734]'
                    : isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span
                    className={`absolute bottom-[-17px] left-0 w-full h-[3px] rounded-full ${
                      isDark ? 'bg-[#d4b26f]' : 'bg-[#064734]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlans.map((plan, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPlan(plan)}
              className="bg-[#ebebeb] text-gray-900 rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-[#064734]/30"
            >
              <div>
                {/* Изображение с индикатором лупы */}
                <div className="relative h-44 w-full bg-white rounded-xl overflow-hidden mb-4 flex items-center justify-center p-3 border border-gray-200">
                  <img
                    src={plan.image || '/projects/Abu-Dhabi.png'}
                    alt={plan.title}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Иконка лупы в углу */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Название и площадь */}
                <p className="text-xs text-gray-600 font-medium leading-snug line-clamp-2 mb-2">
                  {plan.title}
                </p>
                <p className="text-2xl font-black text-gray-950 tracking-tight">
                  {plan.area}
                </p>
              </div>

              {/* Кнопка подробнее */}
              <button
                type="button"
                className="mt-5 w-full text-center bg-[#064734] hover:bg-[#032b20] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Узнать подробнее
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* ======================================================== */}
      {/* 🔍 МОДАЛЬНОЕ ОКНО ДЕТАЛЬНОГО ПРОСМОТРА С ПЛАНИРОВКОЙ    */}
      {/* ======================================================== */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPlan(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white text-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Крестик закрытия */}
            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Верхний блок: Чертеж слева, Характеристики справа */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
              
              {/* Большой чертеж с кнопкой лупы */}
              <div
                className="relative bg-[#f8f9f8] border border-gray-200 rounded-2xl p-4 sm:p-6 flex items-center justify-center h-72 sm:h-80 cursor-zoom-in group"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={selectedPlan.image || '/projects/Abu-Dhabi.png'}
                  alt={selectedPlan.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />

                {/* Лупа в кружке (как на скриншоте) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 text-gray-700 flex items-center justify-center hover:scale-110 transition-transform"
                  title="Увеличить планировку"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Параметры квартиры */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight mb-4">
                    {selectedPlan.title}
                  </h3>

                  <div className="space-y-2.5 text-sm text-gray-700 mb-8">
                    <p className="flex items-center gap-2">
                      <span className="text-gray-400">Площадь:</span>
                      <strong className="text-gray-950 font-extrabold">{selectedPlan.area}</strong>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-gray-400">Высота потолков:</span>
                      <strong className="text-gray-950">{selectedPlan.ceiling || '3.45 метра'}</strong>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-gray-400">Тип отделки:</span>
                      <strong className="text-gray-950">{selectedPlan.finish || 'ПСО'}</strong>
                    </p>
                  </div>
                </div>

                {/* Кнопка WhatsApp */}
                <a
                  href={getWhatsAppLink(selectedPlan)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-[#064734] hover:bg-[#032b20] text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-md"
                >
                  Узнать подробнее
                </a>
              </div>

            </div>

            {/* Нижний блок: «Другие планировки:» (как на скриншоте) */}
            {otherPlans.length > 0 && (
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-bold text-gray-800 mb-4">
                  Другие планировки:
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {otherPlans.map((item, oIdx) => (
                    <div
                      key={oIdx}
                      onClick={() => setSelectedPlan(item)}
                      className="p-3 bg-[#f8f9f8] hover:bg-[#eef2ef] rounded-xl border border-gray-200 cursor-pointer transition-all group flex flex-col justify-between"
                    >
                      <div className="h-24 w-full flex items-center justify-center bg-white rounded-lg mb-2 p-1 border border-gray-100">
                        <img
                          src={item.image || '/projects/Abu-Dhabi.png'}
                          alt={item.title}
                          className="max-h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-600 line-clamp-2 leading-tight mb-1">
                          {item.title}
                        </p>
                        <p className="text-xs font-black text-gray-900">
                          {item.area}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 🖼️ ПОЛНОЭКРАННЫЙ ЗУМ (LIGHTBOX КАК НА 3-М СКРИНШОТЕ)   */}
      {/* ======================================================== */}
      {isLightboxOpen && selectedPlan && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Кнопка закрытия зума */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all border border-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <img
            src={selectedPlan.image || '/projects/Abu-Dhabi.png'}
            alt={selectedPlan.title}
            className="max-h-[90vh] max-w-[90vw] object-contain drop-shadow-2xl scale-105 sm:scale-125 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </section>
  );
}