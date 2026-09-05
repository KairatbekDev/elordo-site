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
}

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
}: PaymentLayoutProps) {
  // По умолчанию первый вопрос открыт (индекс 0)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#fafbfa] text-gray-900">
      
      {/* Хлебные крошки */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center gap-2 text-xs font-medium text-gray-500">
          <Link href="/" className="hover:text-[#064734] transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/#payments" className="hover:text-[#064734] transition-colors">
            Способы оплаты
          </Link>
          <span>/</span>
          <span className="text-[#064734] font-semibold">{pageTitle}</span>
        </div>
      </div>

      {/* 1. Hero-секция */}
      <section className="relative min-h-[460px] flex items-center justify-center bg-[#064734] text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={pageTitle}
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#032b20] via-[#064734]/75 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide leading-tight mb-5 drop-shadow-md">
            {heroTitle}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            {heroSubtitle}
          </p>

          <a
            href="#details"
            className="inline-block bg-white hover:bg-gray-100 text-[#064734] font-bold px-8 py-3.5 rounded-full uppercase tracking-wider text-xs sm:text-sm transition-all shadow-md"
          >
            Узнать подробнее
          </a>
        </div>
      </section>

      {/* 2. Информационная плашка (зеленый баннер с иконкой "i") */}
      <section id="details" className="max-w-5xl mx-auto px-6 pt-16">
        <div className="bg-[#0b3b2c] text-white rounded-2xl p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-md border border-white/10">
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 text-white font-serif font-bold text-lg">
            i
          </div>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
            {noticeText}
          </p>
        </div>
      </section>

      {/* 3. Условия и Аккордеон FAQ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-[#064734] mb-12">
          {blockTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Левая колонка: описание и документы */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {descriptionText}
            </p>

            <div className="pt-2">
              <h3 className="text-sm font-bold text-[#064734] uppercase tracking-wider mb-2">
                Необходимые документы:
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {documentsText}
              </p>
            </div>
          </div>

          {/* Правая колонка: Раскрывающийся аккордеон */}
          <div className="lg:col-span-6 space-y-4">
            {faqList.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-gray-200 pb-4 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left flex items-start justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 hover:text-[#064734] transition-colors"
                  >
                    <span>{item.q}</span>
                    <span className="text-xl font-mono text-[#064734] shrink-0 leading-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-3 text-sm text-gray-600 leading-relaxed pl-2 border-l-2 border-[#064734]">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Блок контактов и карта */}
      <section className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-center uppercase text-[#064734] mb-10">
            СВЯЖИТЕСЬ С НАМИ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto mb-12">
            <div>
              <p className="text-sm text-gray-500 mb-1">Адрес головного офиса:</p>
              <p className="text-lg font-bold text-gray-900 mb-3">
                г. Бишкек, ул. И. Ахунбаева, 137/1
              </p>
              <div className="space-y-1 text-sm font-semibold text-gray-800">
                <p>
                  <a href="tel:+996709115115" className="hover:text-[#064734]">
                    +996 709 115 115
                  </a>
                </p>
                <p>
                  <a href="tel:+996990115115" className="hover:text-[#064734]">
                    +996 990 115 115
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <a
                href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%B2%D0%B0%D0%BC%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#032b20] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow"
              >
                <span>💬</span> Написать в WhatsApp
              </a>
              <a
                href="https://instagram.com/elordo.group"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#064734] text-gray-800 px-6 py-3 rounded-xl font-bold text-sm transition-all"
              >
                <span>📸</span> Перейти в Instagram
              </a>
            </div>
          </div>

          <div className="w-full h-80 rounded-3xl overflow-hidden border border-gray-200 shadow-sm bg-neutral-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.130541764673!2d74.60670867664366!3d42.84901590408544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb64ff1e13599%3A0x6d36e2f183cfa63a!2zMTM3LzEg0YPQuy4g0JjRgdCwINCQ0YXRg9C90LHQsNC10LLQsCwg0JHQuNGI0LrQtdC6!5e0!3m2!1sru!2skg!4v1710000000000!5m2!1sru!2skg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </main>
  );
}