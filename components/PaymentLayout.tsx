'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  q: string;
  a: string;
}

interface PaymentLayoutProps {
  pageTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  noticeText: string;
  blockTitle: string;
  descriptionText: string;
  documentsText: string;
  faqList: FaqItem[];
  currentSlug?: 'rassrochka' | 'trade-in' | 'polniy-raschet';
}

const PAYMENT_TABS = [
  { href: '/rassrochka', label: 'Рассрочка 0%', slug: 'rassrochka' },
  { href: '/trade-in', label: 'Trade-in (Бартер)', slug: 'trade-in' },
  { href: '/polniy-raschet', label: '100% расчет', slug: 'polniy-raschet' },
];

export default function PaymentLayout({
  pageTitle,
  heroTitle,
  heroSubtitle,
  heroImage = '/projects/Abu-Dhabi.png',
  noticeText,
  blockTitle,
  descriptionText,
  documentsText,
  faqList,
  currentSlug,
}: PaymentLayoutProps) {
  // По умолчанию первый вопрос открыт
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const waMessage = encodeURIComponent(
    `Здравствуйте! Меня интересует программа оплаты «${pageTitle}» в компании EL ORDO GROUP. Подскажите, пожалуйста, подробные условия и расчет.`
  );

  return (
    <main className="min-h-screen bg-[#fafbfa] text-gray-900 selection:bg-[#d4b26f] selection:text-[#064734]">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link href="/" className="hover:text-[#064734] transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/usloviya" className="hover:text-[#064734] transition-colors">
            Условия покупки
          </Link>
          <span>/</span>
          <span className="text-[#064734] font-bold">{pageTitle}</span>
        </div>
      </div>

      {/* 2. Hero-секция программы */}
      <section className="relative min-h-[480px] sm:min-h-[540px] flex items-center justify-center bg-[#064734] text-white py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={pageTitle}
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021c15] via-[#064734]/85 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="inline-block text-xs uppercase font-black tracking-widest text-[#d4b26f] mb-4 px-3.5 py-1.5 rounded-full bg-black/40 border border-[#d4b26f]/30 shadow-md">
            Финансовые программы застройщика
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-5 drop-shadow-xl">
            {heroTitle}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            {heroSubtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/996709115115?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-7 py-3.5 rounded-xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <span>💬</span>
              <span>Получить расчет в WhatsApp</span>
            </a>
            <a
              href="#details"
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-sm"
            >
              Изучить условия ↓
            </a>
          </div>
        </div>
      </section>

      {/* 3. Быстрое переключение способов оплаты */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-7 relative z-20">
        <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center gap-2 overflow-x-auto scrollbar-none">
          {PAYMENT_TABS.map((tab) => {
            const isActive = currentSlug === tab.slug || pageTitle.toLowerCase().includes(tab.slug);
            return (
              <Link
                key={tab.slug}
                href={tab.href}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#064734] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Информационная плашка ключевой выгоды */}
      <section id="details" className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 scroll-mt-24">
        <div className="bg-gradient-to-r from-[#064734] to-[#0b3b2c] text-white rounded-3xl p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-xl border border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-[#d4b26f]/20 border border-[#d4b26f]/30 flex items-center justify-center shrink-0 text-[#d4b26f] font-black text-xl">
            ✓
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#d4b26f] block mb-1">
              Официальные условия девелопера
            </span>
            <p className="text-sm sm:text-base text-white/95 leading-relaxed font-light">
              {noticeText}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Условия программы и Аккордеон FAQ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            Подробное описание
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase text-[#064734]">
            {blockTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Левая колонка: описание и документы */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-3">
                Суть предложения:
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {descriptionText}
              </p>
            </div>

            {/* Карточка необходимых документов */}
            <div className="bg-[#f2f6f4] p-6 sm:p-8 rounded-3xl border border-[#064734]/15">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📄</span>
                <h3 className="text-sm font-black text-[#064734] uppercase tracking-wider">
                  Пакет документов:
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                {documentsText}
              </p>
              <div className="mt-4 pt-3 border-t border-[#064734]/10 flex items-center gap-2 text-xs font-bold text-[#064734]">
                <span>✓ Без справок о доходах и поручителей</span>
              </div>
            </div>

            {/* Быстрый переход в WhatsApp */}
            <div className="p-6 rounded-3xl bg-[#032b20] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold mb-1">Хотите индивидуальный график?</h4>
                <p className="text-xs text-gray-300">Сформируем расчет за 2 минуты в мессенджере</p>
              </div>
              <a
                href={`https://wa.me/996709115115?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-[#d4b26f] hover:bg-[#c49f57] text-[#064734] font-black px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Написать в WhatsApp →
              </a>
            </div>
          </div>

          {/* Правая колонка: Раскрывающийся аккордеон */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4 px-1">
              Частые вопросы по программе:
            </h3>

            {faqList.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 hover:text-[#064734] transition-colors"
                  >
                    <span>{item.q}</span>
                    <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm font-mono text-[#064734] shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Контакты и связь с офисом продаж */}
      <section className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
              Консультация финансиста
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
              Офис продаж и оформление
            </h2>
          </div>

          <div className="bg-[#fafbfa] rounded-3xl p-6 sm:p-10 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
                Центральный офис в Бишкеке:
              </span>
              <p className="text-base sm:text-lg font-black text-gray-900">
                ул. Исы Ахунбаева, 137/1
              </p>
              <div className="space-y-1 text-xs sm:text-sm font-semibold text-gray-700">
                <p>+996 709 115 115 (Пн — Сб 09:00 – 19:00)</p>
                <p>+996 990 115 115</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href={`https://wa.me/996709115115?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white font-black text-xs uppercase tracking-wider text-center transition-all shadow"
              >
                💬 Чат в WhatsApp
              </a>
              <a
                href="https://2gis.kg/bishkek/search/%D0%98.%20%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl border border-gray-300 hover:border-[#064734] text-gray-800 font-bold text-xs uppercase tracking-wider text-center transition-all bg-white"
              >
                📍 Маршрут в 2GIS
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}