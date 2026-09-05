'use client';

import { useState, useEffect } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  // Закрытие по нажатию клавиши Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Скрытие подсказки при первом открытии
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    if (showBadge) setShowBadge(false);
  };

  const waUrl =
    'https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8c%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%B0%D0%BC';

  return (
    <>
      {/* 1. Фоновый полупрозрачный оверлей */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[3px] transition-opacity animate-fadeIn"
          aria-hidden="true"
        />
      )}

      {/* 2. Плавающий контейнер (bottom-20 на мобилках для избежания перекрытия sticky action bar) */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 font-sans select-none">
        
        {/* Интерактивное меню каналов связи */}
        {isOpen && (
          <div className="flex flex-col gap-2.5 bg-white/95 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100 min-w-[270px] animate-slideInRight">
            
            {/* Статус-панель отдела продаж */}
            <div className="flex items-center justify-between px-1 pb-2 border-b border-gray-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                Отдел продаж EL ORDO
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Онлайн
              </span>
            </div>

            {/* WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 active:scale-[0.98] text-[#128C7E] font-extrabold text-xs sm:text-sm transition-all border border-[#25D366]/20 shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="leading-tight">Чат в WhatsApp</span>
                <span className="text-[10px] text-gray-500 font-normal">Ответим за 2 минуты</span>
              </div>
            </a>

            {/* Прямые звонки (два номера) */}
            <div className="p-2.5 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 block mb-1">Позвонить менеджеру:</span>
              <a
                href="tel:+996709115115"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-1 text-xs font-black text-gray-900 hover:text-[#064734] transition-colors"
              >
                <span>+996 709 115 115</span>
                <span className="text-[10px] font-bold text-[#d4b26f]">Основной</span>
              </a>
              <a
                href="tel:+996990115115"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-1 text-xs font-black text-gray-900 hover:text-[#064734] transition-colors border-t border-gray-200/50 mt-1 pt-1"
              >
                <span>+996 990 115 115</span>
                <span className="text-[10px] font-bold text-gray-400">Доп. линия</span>
              </a>
            </div>

            {/* Instagram и 2GIS */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="https://instagram.com/elordo.group"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-[11px] transition-colors border border-pink-100"
              >
                <span>📸 Instagram</span>
              </a>
              <a
                href="https://2gis.kg/bishkek/search/%D0%98.%20%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#064734] font-bold text-[11px] transition-colors border border-emerald-100"
              >
                <span>📍 Офис в 2GIS</span>
              </a>
            </div>

          </div>
        )}

        {/* Кнопка-триггер и плавающий бейдж-подсказка */}
        <div className="flex items-center gap-2">
          
          {showBadge && !isOpen && (
            <div
              onClick={toggleMenu}
              className="cursor-pointer hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#064734] text-white border border-[#d4b26f]/40 shadow-xl animate-bounce"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-extrabold text-[#d4b26f]">Консультация 0%</span>
            </div>
          )}

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Связаться с отделом продаж"
            className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white shadow-2xl transition-all border-2 border-[#d4b26f]/40 cursor-pointer"
          >
            {/* Пульсирующий ореол в закрытом состоянии */}
            {!isOpen && (
              <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
            )}

            {isOpen ? (
              <span className="text-2xl font-bold leading-none text-[#d4b26f]">✕</span>
            ) : (
              <svg className="w-7 h-7 text-[#d4b26f]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
            )}
          </button>

        </div>

      </div>
    </>
  );
}