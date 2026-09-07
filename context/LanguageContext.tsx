'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, TranslationDictionary } from '@/lib/i18n/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: TranslationDictionary;
}

const VALID_LOCALES: Locale[] = ['ru', 'kg', 'kz', 'uk', 'en', 'zh'];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru');

  useEffect(() => {
    const saved = localStorage.getItem('elordo_lang') as Locale;
    if (saved && VALID_LOCALES.includes(saved)) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = (loc: Locale) => {
    setLocaleState(loc);
    localStorage.setItem('elordo_lang', loc);
    document.documentElement.lang = loc;
  };

  const t = TRANSLATIONS[locale] || TRANSLATIONS.ru;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}