'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';

interface LanguageItem {
  code: Locale;
  label: string;
  flag: string;
}

const LANGUAGES: LanguageItem[] = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'kg', label: 'Кыргызча', flag: '🇰🇬' },
  { code: 'kz', label: 'Қазақша', flag: '🇰🇿' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

function normalizeLocale(loc: any): Locale {
  if (!loc) return 'ru';
  const l = String(loc).toLowerCase().trim();
  if (l.startsWith('kg') || l.startsWith('ky')) return 'kg';
  if (l.startsWith('kz') || l.startsWith('kk')) return 'kz';
  if (l.startsWith('uk') || l.startsWith('ua')) return 'uk';
  if (l.startsWith('en')) return 'en';
  if (l.startsWith('zh') || l.startsWith('cn')) return 'zh';
  return 'ru';
}

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLangCode = normalizeLocale(locale);
  const currentLang = LANGUAGES.find((l) => l.code === activeLangCode) || LANGUAGES[0];

  // Закрытие при клике или тапе за пределами компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Закрытие по нажатию Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Текущий язык: ${currentLang.label}. Нажмите для выбора`}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-800 border border-gray-200/80 dark:bg-white/10 dark:hover:bg-white/15 dark:text-neutral-100 dark:border-white/15 text-xs font-bold transition-all cursor-pointer shadow-sm"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="uppercase tracking-wider text-[11px] font-black">{currentLang.code}</span>
        <svg
          className={`w-3 h-3 text-[#d4b26f] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Выбор языка сайта"
          className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-[#0b1b15] shadow-2xl border border-gray-200 dark:border-white/10 py-1.5 z-[1050] animate-fadeIn backdrop-blur-md"
        >
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === activeLangCode;
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f]'
                    : 'text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm leading-none">{lang.flag}</span>
                  <span>{lang.label}</span>
                </div>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#064734] dark:bg-[#d4b26f]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}