'use client';

import { useState, useEffect } from 'react';
import { COMPANY_INFO } from '@/lib/data';
import {
  IconWhatsApp,
  IconInstagram,
  IconMapPin,
} from '@/components/Icons';

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

  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    'Здравствуйте! Хочу получить консультацию по объектам EL ORDO GROUP.'
  )}`;

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

      {/* 2. Плавающий контейнер (bottom-20 на мобилках для исключения наложения на нижний бар) */}
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
                <IconWhatsApp className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="leading-tight">Чат в WhatsApp</span>
                <span className="text-[10px] text-gray-500 font-normal">Ответим за 2 минуты</span>
              </div>
            </a>

            {/* Прямые звонки (два номера из COMPANY_INFO) */}
            <div className="p-2.5 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 block mb-1">Позвонить менеджеру:</span>
              <a
                href={`tel:${COMPANY_INFO.phones[0]?.replace(/\s+/g, '') || '+996709115115'}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-1 text-xs font-black text-gray-900 hover:text-[#064734] transition-colors"
              >
                <span>{COMPANY_INFO.phones[0] || '+996 709 115 115'}</span>
                <span className="text-[10px] font-bold text-[#d4b26f]">Основной</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.phones[1]?.replace(/\s+/g, '') || '+996990115115'}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-1 text-xs font-black text-gray-900 hover:text-[#064734] transition-colors border-t border-gray-200/50 mt-1 pt-1"
              >
                <span>{COMPANY_INFO.phones[1] || '+996 990 115 115'}</span>
                <span className="text-[10px] font-bold text-gray-400">Доп. линия</span>
              </a>
            </div>

            {/* Instagram и 2GIS (с чистыми SVG) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-[11px] transition-colors border border-pink-100"
              >
                <IconInstagram className="w-3.5 h-3.5 text-pink-600" />
                <span>Instagram</span>
              </a>
              <a
                href={COMPANY_INFO.gisUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#064734] font-bold text-[11px] transition-colors border border-emerald-100"
              >
                <IconMapPin className="w-3.5 h-3.5 text-[#064734]" />
                <span>Офис в 2GIS</span>
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
            {!isOpen && (
              <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
            )}

            {isOpen ? (
              <svg className="w-6 h-6 text-[#d4b26f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <IconWhatsApp className="w-7 h-7 text-[#d4b26f]" />
            )}
          </button>

        </div>

      </div>
    </>
  );
}