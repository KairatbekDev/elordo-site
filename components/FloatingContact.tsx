'use client';

import { useState } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Всплывающее меню каналов связи */}
      {isOpen && (
        <div className="flex flex-col gap-2.5 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">
            Связь с отделом продаж
          </span>

          <a
            href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8c%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%B0%D0%BC"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs transition-colors"
          >
            <span className="text-base">💬</span>
            <span>Написать в WhatsApp</span>
          </a>

          <a
            href="tel:+996709115115"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#064734]/10 hover:bg-[#064734]/20 text-[#064734] font-bold text-xs transition-colors"
          >
            <span className="text-base">📞</span>
            <span>Позвонить: +996 709 115 115</span>
          </a>

          <a
            href="https://instagram.com/elordo.group"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs transition-colors"
          >
            <span className="text-base">📸</span>
            <span>Instagram @elordo.group</span>
          </a>
        </div>
      )}

      {/* Главная кнопка-триггер с пульсацией */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Связаться с отделом продаж"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#064734] text-white shadow-xl hover:bg-[#043325] hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-50 animate-ping duration-1000" />
        
        {isOpen ? (
          <span className="text-xl font-bold">✕</span>
        ) : (
          <svg className="w-6 h-6 text-[#d4b26f]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
          </svg>
        )}
      </button>
    </div>
  );
}