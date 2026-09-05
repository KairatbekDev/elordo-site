'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/projects', label: 'Объекты' },
    { href: '/usloviya', label: 'Условия покупки' },
    { href: '/o-kompanii', label: 'О компании' },
    { href: '/contacts', label: 'Контакты' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#064734] uppercase">
            El Ordo
          </span>
          <span className="text-[10px] sm:text-xs bg-[#064734]/10 text-[#064734] font-semibold px-2 py-0.5 rounded-full">
            Group
          </span>
        </Link>

        {/* Навигация для десктопа (md+) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#064734] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Правая часть: кнопка заявки + кнопка бургер-меню */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="#contacts"
            className="bg-[#064734] hover:bg-[#032b20] text-white text-xs sm:text-sm font-medium px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg shadow-sm transition-all duration-200"
          >
            Консультация
          </a>

          {/* Кнопка бургер-меню (видна только на экранах < 768px) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#064734] transition-colors focus:outline-none"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Выпадающее меню для смартфонов */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-gray-800 hover:text-[#064734] py-1 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col gap-2 text-sm text-gray-600">
            <span className="text-xs text-gray-400">Отдел продаж:</span>
            <a
              href="tel:+996709115115"
              className="text-[#064734] font-bold hover:underline"
            >
              +996 709 115 115
            </a>
          </div>
        </div>
      )}
    </header>
  );
}