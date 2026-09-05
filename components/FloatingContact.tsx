'use client';

import { useState, useEffect } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  // Закрытие меню по нажатию клавиши Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* 1. Невидимый оверлей на весь экран: тап в любое место закрывает меню */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* 2. Плавающий контейнер */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 font-sans select-none">
        
        {/* Всплывающее меню каналов связи */}
        {isOpen && (
          <div className="flex flex-col gap-2 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-gray-100 min-w-[240px] animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between px-1 pb-1 border-b border-gray-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Отдел продаж
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> На связи
              </span>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8c%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%B0%D0%BC"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 active:scale-[0.98] text-[#128C7E] font-bold text-xs sm:text-sm transition-all"
            >
              <span className="text-lg">💬</span>
              <span>Написать в WhatsApp</span>
            </a>

            {/* Позвонить */}
            <a
              href="tel:+996709115115"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-[#064734]/10 hover:bg-[#064734]/20 active:scale-[0.98] text-[#064734] font-bold text-xs sm:text-sm transition-all"
            >
              <span className="text-lg">📞</span>
              <span>+996 709 115 115</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/elordo.group"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-pink-50 hover:bg-pink-100 active:scale-[0.98] text-pink-700 font-bold text-xs sm:text-sm transition-all"
            >
              <span className="text-lg">📸</span>
              <span>@elordo.group</span>
            </a>
          </div>
        )}

        {/* Главная кнопка-триггер */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Связаться с отделом продаж"
          className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#064734] text-white shadow-2xl hover:bg-[#043325] active:scale-95 transition-transform"
        >
          {/* Пульсирующий ореол, когда меню свернуто */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />
          )}

          {isOpen ? (
            <span className="text-xl font-bold leading-none">✕</span>
          ) : (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#d4b26f]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}