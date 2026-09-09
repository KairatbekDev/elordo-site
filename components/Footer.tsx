'use client';

import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { TRANSLATIONS } from '@/lib/i18n/translations';
import {
  IconWhatsApp,
  IconInstagram,
  IconCheck,
  IconArrowRight,
} from '@/components/Icons';

export default function Footer() {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const waFooterText = encodeURIComponent(t.footer.waText);

  return (
    <footer className="bg-[#022118] text-white border-t border-white/10 relative overflow-hidden selection:bg-[#d4b26f] selection:text-[#064734]">
      
      {/* Фоновое свечение */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#064734]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 relative z-10">
        
        {/* Основная сетка колонок */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Колонка 1: Бренд и статус */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#064734] border border-[#d4b26f]/30 flex items-center justify-center p-1.5 shadow-sm group-hover:bg-[#042e22] group-hover:scale-105 transition-all shrink-0">
                <img
                  src="/logo-icon.png"
                  alt="EL ORDO GROUP"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-white uppercase leading-none">
                    El Ordo
                  </span>
                  <span className="text-[10px] bg-[#d4b26f] text-[#064734] font-black px-1.5 py-0.5 rounded">
                    Group
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                  {t.footer.companySubtitle}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light max-w-sm">
              {t.footer.desc}
            </p>

            {/* Статус работы офиса */}
            <div className="pt-2 flex flex-col gap-1 text-xs font-semibold text-[#d4b26f]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>{t.footer.salesWeekdays}</span>
              </div>
              <div className="flex items-center gap-2 pl-4 text-xs font-semibold text-[#d4b26f]/90">
                <span>{t.footer.salesSaturday}</span>
              </div>
            </div>
          </div>

          {/* Колонка 2: Жилые комплексы */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black tracking-widest uppercase text-[#d4b26f] mb-4">
              {t.footer.complexesTitle}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/abu-dhabi" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>ЖК Abu Dhabi</span>
                  <span className="text-[10px] text-[#d4b26f] font-bold opacity-80 group-hover:opacity-100">{t.footer.badgePremium}</span>
                </Link>
              </li>
              <li>
                <Link href="/madina-residence" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>ЖК Madina Residence</span>
                  <span className="text-[10px] text-[#d4b26f] font-bold opacity-80 group-hover:opacity-100">{t.footer.badgeBusiness}</span>
                </Link>
              </li>
              <li>
                <Link href="/ajkol-plus" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>ЖД Айкол +</span>
                  <span className="text-[10px] text-emerald-400 font-bold opacity-80 group-hover:opacity-100">{t.footer.badgeEco}</span>
                </Link>
              </li>
              <li>
                <Link href="/ajkol" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>ЖД Айкол</span>
                  <span className="text-[10px] text-gray-400 font-bold opacity-80 group-hover:opacity-100">{t.footer.badgeComfort}</span>
                </Link>
              </li>
              <li>
                <Link href="/kelechek" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>ЖК Келечек</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                    <span>{t.footer.badgeFinished}</span>
                    <IconCheck className="w-3 h-3 text-emerald-400" />
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/ordo" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>Клубный дом Ордо</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                    <span>{t.footer.badgeFinished}</span>
                    <IconCheck className="w-3 h-3 text-emerald-400" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Покупателям */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black tracking-widest uppercase text-[#d4b26f] mb-4">
              {t.footer.buyersTitle}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  {t.footer.linkCatalog}
                </Link>
              </li>
              <li>
                <Link href="/rassrochka" className="hover:text-white transition-colors">
                  {t.footer.linkInstallment}
                </Link>
              </li>
              <li>
                <Link href="/trade-in" className="hover:text-white transition-colors">
                  {t.footer.linkTradeIn}
                </Link>
              </li>
              <li>
                <Link href="/polniy-raschet" className="hover:text-white transition-colors">
                  {t.footer.linkFullPayment}
                </Link>
              </li>
              <li>
                <Link href="/o-kompanii" className="hover:text-white transition-colors">
                  {t.footer.linkAbout}
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-white transition-colors">
                  {t.footer.linkContacts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Головной офис и связь */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black tracking-widest uppercase text-[#d4b26f] mb-4">
              {t.footer.contactTitle}
            </h4>
            
            <div>
              <span className="text-[11px] text-gray-400 block mb-0.5">{t.footer.hotline}</span>
              <a
                href={`tel:${COMPANY_INFO.phones[0]?.replace(/\s+/g, '') || '+996709115115'}`}
                className="text-sm font-black text-white hover:text-[#d4b26f] transition-colors block"
              >
                {COMPANY_INFO.phones[0] || '+996 709 115 115'}
              </a>
              <a
                href={`tel:${COMPANY_INFO.phones[1]?.replace(/\s+/g, '') || '+996990115115'}`}
                className="text-xs text-gray-300 hover:text-[#d4b26f] transition-colors block mt-0.5"
              >
                {COMPANY_INFO.phones[1] || '+996 990 115 115'}
              </a>
            </div>

            <div>
              <span className="text-[11px] text-gray-400 block mb-0.5">{t.footer.officeTitle}</span>
              <p className="text-xs text-white/90 leading-snug">
                {COMPANY_INFO.address}
              </p>
              <a
                href={COMPANY_INFO.gisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#d4b26f] hover:underline inline-flex items-center gap-1 mt-1"
              >
                <span>{t.footer.route2Gis}</span>
                <IconArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${waFooterText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white text-xs font-black uppercase tracking-wider transition-all shadow border border-emerald-500/30 cursor-pointer"
              >
                <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                <span>{t.footer.btnWhatsApp}</span>
              </a>

              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-white/90 hover:text-white text-xs font-bold transition-all border border-white/10 cursor-pointer"
              >
                <IconInstagram className="w-4 h-4 text-pink-500" />
                <span>{t.footer.btnInstagram}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Нижняя полоса с копирайтом и кнопкой Наверх */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
            <p className="text-[11px] text-gray-400">
              {t.footer.legalNotice}
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 active:scale-95 text-xs font-bold text-[#d4b26f] border border-white/10 transition-all cursor-pointer"
          >
            <span>{t.footer.toTop}</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
}