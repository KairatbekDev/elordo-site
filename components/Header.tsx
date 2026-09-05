'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/projects', label: 'Каталог объектов' },
    { href: '/usloviya', label: 'Условия и рассрочка' },
    { href: '/o-kompanii', label: 'О компании' },
    { href: '/contacts', label: 'Контакты' },
  ];

  // Отслеживание скролла для легкой тени
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокировка прокрутки экрана при открытом мобильном меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const waConsultationText = encodeURIComponent(
    'Здравствуйте! Хочу получить подробную консультацию по объектам компании EL ORDO GROUP и условиям рассрочки.'
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-200 border-b ${
          isScrolled ? 'border-gray-200 shadow-md' : 'border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          
          {/* 1. Логотип компании */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#064734] flex items-center justify-center text-[#d4b26f] font-black text-base shadow-sm group-hover:bg-[#032b20] transition-colors">
              EO
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#064734] uppercase leading-none">
                  El Ordo
                </span>
                <span className="text-[10px] bg-[#064734]/10 text-[#064734] font-bold px-1.5 py-0.5 rounded-md">
                  Group
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold">
                Строительная компания
              </span>
            </div>
          </Link>

          {/* 2. Навигация для десктопа с подсветкой активного пункта */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[#064734] text-white shadow-sm'
                      : 'text-gray-700 hover:text-[#064734] hover:bg-gray-100/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. Правый блок: телефон + кнопка заявки */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* Прямой телефон и статус (для планшетов и десктопов) */}
            <div className="hidden sm:flex flex-col items-end text-right">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Отдел продаж онлайн
                </span>
              </div>
              <a
                href="tel:+996709115115"
                className="text-xs sm:text-sm font-black text-gray-900 hover:text-[#064734] transition-colors"
              >
                +996 709 115 115
              </a>
            </div>

            {/* Кнопка мгновенной консультации */}
            <a
              href={`https://wa.me/996709115115?text=${waConsultationText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#064734] hover:bg-[#032b20] active:scale-95 text-[#d4b26f] hover:text-white text-xs sm:text-sm font-extrabold px-3.5 py-2.5 sm:px-5 sm:py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>💬</span>
              <span>Консультация</span>
            </a>

            {/* Бургер-кнопка для мобильных */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
              className="lg:hidden p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-[#064734] transition-colors focus:outline-none"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>

        </div>
      </header>

      {/* 4. Полноэкранное мобильное меню (Drawer) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-sm ml-auto h-full bg-white text-gray-900 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Шапка меню */}
              <div className="flex items-center justify-between pb-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-[#064734] uppercase">EL ORDO</span>
                  <span className="text-[10px] bg-[#064734]/10 text-[#064734] font-bold px-1.5 py-0.5 rounded">
                    МЕНЮ
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>

              {/* Основные ссылки навигации */}
              <nav className="flex flex-col gap-1.5 mt-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-sm font-extrabold flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-[#064734] text-white'
                          : 'text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span>→</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Быстрый переход к флагманским ЖК */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 block mb-3">
                  Флагманские объекты:
                </span>
                <div className="space-y-2">
                  <Link
                    href="/abu-dhabi"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 rounded-xl bg-gray-50 hover:bg-[#064734]/10 transition-colors"
                  >
                    <div className="text-xs font-bold text-gray-900">ЖК Abu Dhabi</div>
                    <div className="text-[11px] text-[#d4b26f] font-semibold">от 1 650 $/м² • Премиум</div>
                  </Link>

                  <Link
                    href="/madina-residence"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 rounded-xl bg-gray-50 hover:bg-[#064734]/10 transition-colors"
                  >
                    <div className="text-xs font-bold text-gray-900">ЖК Madina Residence</div>
                    <div className="text-[11px] text-[#d4b26f] font-semibold">от 1 400 $/м² • Бизнес</div>
                  </Link>

                  <Link
                    href="/ajkol-plus"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 rounded-xl bg-gray-50 hover:bg-[#064734]/10 transition-colors"
                  >
                    <div className="text-xs font-bold text-gray-900">ЖД Айкол +</div>
                    <div className="text-[11px] text-[#d4b26f] font-semibold">от 1 100 $/м² • Эко-зона</div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Нижняя часть меню: контакты и соцсети */}
            <div className="pt-6 border-t border-gray-100 mt-6">
              <div className="mb-4">
                <span className="text-[11px] text-gray-400 block mb-1">Горячая линия:</span>
                <a href="tel:+996709115115" className="text-base font-black text-[#064734] block">
                  +996 709 115 115
                </a>
                <a href="tel:+996990115115" className="text-xs text-gray-600 block mt-0.5">
                  +996 990 115 115
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/996709115115?text=${waConsultationText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-2 rounded-xl bg-[#064734] text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow"
                >
                  <span>💬</span> WhatsApp
                </a>
                <a
                  href="https://instagram.com/elordo.group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-2 rounded-xl border border-gray-200 text-gray-800 font-bold text-xs text-center flex items-center justify-center gap-1.5 hover:bg-gray-50"
                >
                  <span>📸</span> Instagram
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}