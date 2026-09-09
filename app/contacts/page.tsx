'use client';

import { useState } from 'react';
import Link from 'next/link';
import BishkekMap from '@/components/BishkekMap';
import { COMPANY_INFO, PROJECTS_LIST } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import {
  IconMapPin,
  IconPhone,
  IconWhatsApp,
  IconInstagram,
  IconClock,
  IconCar,
  IconBuilding,
  IconDocument,
  IconArrowRight,
} from '@/components/Icons';

export default function ContactsPage() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<string>('ЖК Abu Dhabi');
  const [visitTime, setVisitTime] = useState<string>('today');

  const visitTimeLabels: Record<string, string> = {
    today: t.contactsPage.timeToday,
    tomorrow: t.contactsPage.timeTomorrow,
    saturday: t.contactsPage.timeSaturday,
  };

  const getProjectClassLabel = (slug: string) => {
    switch (slug) {
      case 'abu-dhabi':
        return t.projectsPage.abuDhabiClass;
      case 'madina-residence':
        return t.projectsPage.madinaClass;
      case 'ajkol-plus':
        return t.projectsPage.ajkolPlusClass;
      case 'ajkol':
        return t.projectsPage.ajkolClass;
      case 'kelechek':
        return t.projectsPage.kelechekClass;
      case 'ordo':
        return t.projectsPage.ordoClass;
      default:
        return '';
    }
  };

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `${t.contactsPage.waGreeting}\n\n` +
      `• ${t.contactsPage.waProject} ${selectedProject}\n` +
      `• ${t.contactsPage.waTime} ${visitTimeLabels[visitTime] || visitTime}\n\n` +
      `${t.contactsPage.waConfirm}`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const waQuickConsultText = encodeURIComponent(
    t.footer.waText || 'Здравствуйте! Хочу получить консультацию по объектам EL ORDO GROUP.'
  );

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 pb-20 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white dark:bg-[#0b1b15] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
            {t.common.home}
          </Link>
          <span>/</span>
          <span className="text-[#064734] dark:text-[#d4b26f] font-bold">{t.header.contacts}</span>
        </div>
      </div>

      {/* 2. Заголовок */}
      <section className="relative min-h-[380px] sm:min-h-[420px] flex items-center justify-center bg-[#064734] text-white py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="EL ORDO GROUP"
            className="w-full h-full object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021c15] via-[#064734]/85 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="inline-block text-xs uppercase font-black tracking-widest text-[#d4b26f] mb-3 px-3.5 py-1.5 rounded-full bg-black/40 border border-[#d4b26f]/30">
            {t.contactsPage.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-4 drop-shadow-md">
            {t.contactsPage.heroTitle}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto font-light leading-relaxed">
            {t.contactsPage.heroDesc}
          </p>
        </div>
      </section>

      {/* 3. Основные контактные карточки */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Адрес офиса */}
          <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col justify-between hover:shadow-2xl dark:hover:border-[#d4b26f]/30 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center mb-5">
                <IconMapPin className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 dark:text-neutral-400 block mb-1">
                {t.contactsPage.officeCardBadge}
              </span>
              <p className="text-base sm:text-lg font-black text-gray-900 dark:text-white leading-snug mb-2">
                {COMPANY_INFO.address}
              </p>
              <p className="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
                {t.contactsPage.officeCardDesc}
              </p>
            </div>
            <a
              href={COMPANY_INFO.gisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-[#064734] dark:text-[#d4b26f] hover:text-[#d4b26f] dark:hover:text-[#eddab2] hover:underline"
            >
              <span>{t.contactsPage.officeCardRoute}</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Телефоны и мессенджеры */}
          <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col justify-between hover:shadow-2xl dark:hover:border-[#d4b26f]/30 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4b26f]/20 text-[#8c6b23] dark:text-[#d4b26f] flex items-center justify-center mb-5">
                <IconPhone className="w-6 h-6 text-[#064734] dark:text-[#d4b26f]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 dark:text-neutral-400 block mb-1">
                {t.contactsPage.phoneCardBadge}
              </span>
              <div className="space-y-1.5 text-base sm:text-lg font-black text-gray-900 dark:text-white">
                {COMPANY_INFO.phones.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="block hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors"
                  >
                    {phone}
                  </a>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-neutral-400 mt-2">
                {t.contactsPage.phoneCardDesc}
              </p>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${waQuickConsultText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs font-black text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
              <span>{t.contactsPage.phoneCardAction}</span>
            </a>
          </div>

          {/* График и соцсети */}
          <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col justify-between hover:shadow-2xl dark:hover:border-[#d4b26f]/30 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center mb-5">
                <IconClock className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 dark:text-neutral-400 block mb-1">
                {t.contactsPage.hoursCardBadge}
              </span>
              <p className="text-sm font-black text-gray-900 dark:text-white">
                {t.contactsPage.hoursMonFri} <span className="text-[#064734] dark:text-[#d4b26f]">09:00 – 18:00</span>
              </p>
              <p className="text-sm font-black text-gray-900 dark:text-white">
                {t.contactsPage.hoursSat} <span className="text-[#064734] dark:text-[#d4b26f]">10:00 – 16:00</span>
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 font-medium">
                {t.contactsPage.hoursSun} <span className="text-gray-900 dark:text-white font-bold">{t.contactsPage.hoursSunValue}</span>
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/10">
                <span className="text-[11px] text-gray-400 dark:text-neutral-400 block mb-0.5">{t.contactsPage.hoursAccountLabel}</span>
                <a
                  href={COMPANY_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-gray-900 dark:text-white hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors inline-flex items-center gap-1.5"
                >
                  <IconInstagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>Instagram: @elordo.group</span>
                </a>
              </div>
            </div>
            <a
              href={COMPANY_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-pink-700 dark:text-pink-400 hover:underline"
            >
              <span>{t.contactsPage.hoursVideoAction}</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* 4. Запись на визит в офис + Преимущества посещения */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-12 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-colors">
          
          {/* Левая колонка */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block">
              {t.contactsPage.bookingBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f] leading-tight">
              {t.contactsPage.bookingTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.contactsPage.bookingDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <div className="p-3.5 rounded-2xl bg-[#fafbfa] dark:bg-[#040c09] border border-gray-100 dark:border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center shrink-0">
                  <IconCar className="w-4 h-4" />
                </div>
                <span>{t.contactsPage.perkParking}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#fafbfa] dark:bg-[#040c09] border border-gray-100 dark:border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center shrink-0">
                  <IconBuilding className="w-4 h-4" />
                </div>
                <span>{t.contactsPage.perkModels}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#fafbfa] dark:bg-[#040c09] border border-gray-100 dark:border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                    <line x1="6" y1="2" x2="6" y2="4" />
                    <line x1="10" y1="2" x2="10" y2="4" />
                    <line x1="14" y1="2" x2="14" y2="4" />
                  </svg>
                </div>
                <span>{t.contactsPage.perkMeeting}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#fafbfa] dark:bg-[#040c09] border border-gray-100 dark:border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center shrink-0">
                  <IconDocument className="w-4 h-4" />
                </div>
                <span>{t.contactsPage.perkDocuments}</span>
              </div>
            </div>
          </div>

          {/* Правая колонка: Форма брони */}
          <div className="lg:col-span-6 bg-[#f5f8f6] dark:bg-[#040c09] p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-white/10 transition-colors">
            <h3 className="text-sm font-black uppercase text-gray-900 dark:text-white mb-4">
              {t.contactsPage.formTitle}
            </h3>

            <form onSubmit={handleBookVisit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  {t.contactsPage.formProjectLabel}
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f] font-medium cursor-pointer"
                >
                  {PROJECTS_LIST.map((proj) => {
                    const classLabel = getProjectClassLabel(proj.slug);
                    const displayLabel = classLabel ? `${proj.name} (${classLabel})` : proj.name;
                    return (
                      <option key={proj.slug} value={displayLabel} className="dark:bg-[#0b1b15]">
                        {displayLabel}
                      </option>
                    );
                  })}
                  <option value={t.contactsPage.formAllProjects} className="dark:bg-[#0b1b15]">
                    {t.contactsPage.formAllProjects}
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  {t.contactsPage.formTimeLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'today', label: t.contactsPage.timeToday },
                    { id: 'tomorrow', label: t.contactsPage.timeTomorrow },
                    { id: 'saturday', label: t.contactsPage.timeSaturday },
                  ].map((timeOption) => (
                    <button
                      key={timeOption.id}
                      type="button"
                      onClick={() => setVisitTime(timeOption.id)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        visitTime === timeOption.id
                          ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow'
                          : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {timeOption.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#064734] hover:bg-[#032b20] dark:bg-[#064734] dark:hover:bg-[#095740] active:scale-95 text-[#d4b26f] hover:text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-2 border border-transparent dark:border-white/10 cursor-pointer"
              >
                <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                <span>{t.contactsPage.btnSubmit}</span>
              </button>
              <p className="text-[11px] text-gray-500 dark:text-neutral-400 text-center font-medium">
                {t.contactsPage.formNote}
              </p>
            </form>
          </div>

        </div>
      </section>

      {/* 5. Интерактивная карта Бишкека */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <div className="mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            {t.contactsPage.mapBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
            {t.contactsPage.mapTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-1">
            {t.contactsPage.mapDesc}
          </p>
        </div>

        <BishkekMap />
      </section>

    </main>
  );
}