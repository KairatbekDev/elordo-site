'use client';

import { useState } from 'react';
import Link from 'next/link';
import BishkekMap from '@/components/BishkekMap';
import ConsultationForm from '@/components/ConsultationForm';
import { PROJECTS_LIST, COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import {
  IconBuilding,
  IconCrane,
  IconCheck,
  IconMapPin,
  IconCalendar,
  IconCar,
  IconDiamond,
  IconDocument,
  IconTree,
  IconPhone,
  IconWhatsApp,
  IconInstagram,
  IconArrowRight,
  IconStar,
} from '@/components/Icons';

export default function Home() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'finished'>('all');

  const filteredProjects =
    activeTab === 'all'
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((p) => p.category === activeTab);

  const activeCount = PROJECTS_LIST.filter((p) => p.category === 'active').length;
  const finishedCount = PROJECTS_LIST.filter((p) => p.category === 'finished').length;

  const paymentCards = [
    {
      slug: 'rassrochka',
      title: t.paymentsSection.card1Title,
      badge: t.paymentsSection.card1Badge,
      desc: t.paymentsSection.card1Desc,
      icon: <IconCalendar className="w-7 h-7 text-[#064734] dark:text-[#d4b26f]" />,
      actionText: t.paymentsSection.card1Action,
    },
    {
      slug: 'trade-in',
      title: t.paymentsSection.card2Title,
      badge: t.paymentsSection.card2Badge,
      desc: t.paymentsSection.card2Desc,
      icon: <IconCar className="w-7 h-7 text-[#064734] dark:text-[#d4b26f]" />,
      actionText: t.paymentsSection.card2Action,
    },
    {
      slug: 'polniy-raschet',
      title: t.paymentsSection.card3Title,
      badge: t.paymentsSection.card3Badge,
      desc: t.paymentsSection.card3Desc,
      icon: <IconDiamond className="w-7 h-7 text-[#064734] dark:text-[#d4b26f]" />,
      actionText: t.paymentsSection.card3Action,
    },
  ];

  const advantages = [
    {
      icon: <IconBuilding className="w-7 h-7 text-[#d4b26f]" />,
      title: t.advantages.adv1Title,
      desc: t.advantages.adv1Desc,
    },
    {
      icon: <IconDocument className="w-7 h-7 text-[#d4b26f]" />,
      title: t.advantages.adv2Title,
      desc: t.advantages.adv2Desc,
    },
    {
      icon: <IconTree className="w-7 h-7 text-[#d4b26f]" />,
      title: t.advantages.adv3Title,
      desc: t.advantages.adv3Desc,
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200">
      
      {/* 1. ГЛАВНЫЙ ЭКРАН (HERO) */}
      <section className="relative min-h-[92dvh] sm:min-h-[640px] md:min-h-[720px] flex items-center justify-center bg-[#064734] text-white pt-24 pb-20 px-4 sm:px-6 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="Архитектура EL ORDO GROUP"
            className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021c15] via-[#064734]/85 to-black/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d4b26f]/40 text-[#d4b26f] text-xs font-black uppercase tracking-widest mb-6 shadow-lg animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-tight sm:leading-none mb-6 drop-shadow-xl">
            {t.hero.titleMain} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4b26f] via-[#eddab2] to-[#d4b26f]">
              {t.hero.titleAccent}
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-2xl mb-10 px-2 drop-shadow">
            {t.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full sm:w-auto bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-8 py-4 rounded-2xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-xl shadow-[#d4b26f]/20 text-center cursor-pointer"
            >
              {t.hero.btnProjects}
            </a>
            <Link
              href="/rassrochka"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl text-xs sm:text-sm border border-white/25 transition-all backdrop-blur-md text-center"
            >
              {t.hero.btnTerms}
            </Link>
          </div>

          {/* Полоса доверия (Trust Bar) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mt-14 pt-8 border-t border-white/15 text-left">
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-[#d4b26f] block">{t.hero.trust0Title}</span>
              <span className="text-[11px] sm:text-xs text-gray-300 font-medium leading-tight block mt-0.5">
                {t.hero.trust0Desc}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-white block">{t.hero.trust9Title}</span>
              <span className="text-[11px] sm:text-xs text-gray-300 font-medium leading-tight block mt-0.5">
                {t.hero.trust9Desc}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-[#d4b26f] block">{t.hero.trustTradeTitle}</span>
              <span className="text-[11px] sm:text-xs text-gray-300 font-medium leading-tight block mt-0.5">
                {t.hero.trustTradeDesc}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-white block">{t.hero.trust100Title}</span>
              <span className="text-[11px] sm:text-xs text-gray-300 font-medium leading-tight block mt-0.5">
                {t.hero.trust100Desc}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ПОЧЕМУ ВЫБИРАЮТ EL ORDO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {t.advantages.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f] tracking-tight">
            {t.advantages.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((adv, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0b1b15] rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-md hover:shadow-xl hover:border-[#064734]/30 dark:hover:border-[#d4b26f]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 flex items-center justify-center mb-6">
                  {adv.icon}
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3">
                  {adv.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. КАТАЛОГ ОБЪЕКТОВ С БЫСТРЫМИ ТАБАМИ */}
      <section id="projects" className="bg-[#f0f4f1] dark:bg-[#040c09] py-16 sm:py-24 px-4 sm:px-6 scroll-mt-20 border-y border-transparent dark:border-white/5 transition-colors">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
                {t.projectsSection.badge}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f] tracking-tight">
                {t.projectsSection.title}
              </h2>
            </div>

            {/* Фильтры объектов с иконками */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 shadow-sm overflow-x-auto scrollbar-none">
              {[
                { id: 'all', label: `${t.projectsSection.tabAll} (${PROJECTS_LIST.length})`, icon: null },
                { id: 'active', label: `${t.projectsSection.tabActive} (${activeCount})`, icon: <IconCrane className="w-3.5 h-3.5 shrink-0" /> },
                { id: 'finished', label: `${t.projectsSection.tabFinished} (${finishedCount})`, icon: <IconCheck className="w-3.5 h-3.5 shrink-0" /> },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                    }`}
                  >
                    {tab.icon && (
                      <span className={isActive ? 'text-white dark:text-[#064734]' : 'text-[#064734] dark:text-[#d4b26f]'}>
                        {tab.icon}
                      </span>
                    )}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Сетка карточек проектов */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => {
              const isFinished = project.isFinished;
              return (
                <div
                  key={project.slug}
                  className="bg-white dark:bg-[#0b1b15] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden bg-neutral-900">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute top-3.5 left-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase px-3 py-1.5 rounded-xl shadow-md ${
                            isFinished
                              ? 'bg-[#2b2b2b] text-white'
                              : 'bg-[#064734] text-white'
                          }`}
                        >
                          {isFinished && <IconCheck className="w-3.5 h-3.5 text-emerald-400" />}
                          <span>{isFinished ? t.projectsSection.statusFinished : project.classType}</span>
                        </span>
                      </div>

                      {project.price && (
                        <div className="absolute bottom-3.5 right-3.5 bg-black/75 backdrop-blur-md text-[#d4b26f] text-xs font-black px-3 py-1.5 rounded-xl border border-white/10 shadow">
                          {project.price}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2 group-hover:text-[#064734] dark:group-hover:text-[#d4b26f] transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-5 leading-relaxed line-clamp-2">
                        {project.desc}
                      </p>

                      <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-white/10 pt-4 font-medium">
                        <div className="flex items-center gap-2">
                          <IconMapPin className="w-4 h-4 text-[#d4b26f] shrink-0" />
                          <span className="truncate">{project.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconCalendar className="w-4 h-4 text-[#d4b26f] shrink-0" />
                          <span>{project.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconBuilding className="w-4 h-4 text-[#d4b26f] shrink-0" />
                          <span>{project.floors}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/${project.slug}`}
                      className="w-full bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] dark:text-[#064734] hover:text-white dark:hover:text-[#064734] font-black py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg"
                    >
                      <span>{t.projectsSection.detailsBtn}</span>
                      <IconArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-[#0b1b15] hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-300 dark:border-white/15 text-xs font-black uppercase tracking-wider text-[#064734] dark:text-[#d4b26f] shadow-sm hover:shadow transition-all"
            >
              <span>{t.projectsSection.viewAllBtn} ({PROJECTS_LIST.length})</span>
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. СПОСОБЫ ОПЛАТЫ */}
      <section id="payments" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {t.paymentsSection.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f] tracking-tight">
            {t.paymentsSection.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {paymentCards.map((method, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0b1b15] rounded-3xl p-8 border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-[#064734]/30 dark:hover:border-[#d4b26f]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 flex items-center justify-center">
                    {method.icon}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f]">
                    {method.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-gray-950 dark:text-white mb-3">
                  {method.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {method.desc}
                </p>
              </div>

              <Link
                href={`/${method.slug}`}
                className="w-full bg-[#064734] hover:bg-[#032b20] dark:bg-[#064734] dark:hover:bg-[#095740] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow flex items-center justify-center gap-2 border border-transparent dark:border-white/10"
              >
                <span>{method.actionText}</span>
                <IconArrowRight className="w-3.5 h-3.5 text-[#d4b26f]" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ОТЗЫВЫ РЕЗИДЕНТОВ И ИНВЕСТОРОВ */}
      <section className="bg-[#f2f6f4] dark:bg-[#040c09] py-16 sm:py-20 px-4 sm:px-6 border-y border-gray-200 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
              {t.reviewsSection.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f] tracking-tight">
              {t.reviewsSection.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPANY_INFO.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0b1b15] rounded-3xl p-7 border border-gray-100 dark:border-white/10 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <IconStar key={i} className="w-4 h-4 text-[#d4b26f]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic mb-6">
                    «{rev.text}»
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#064734] text-[#d4b26f] font-black text-sm flex items-center justify-center shrink-0">
                    {rev.author[0]}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-gray-900 dark:text-white leading-tight">
                      {rev.author}
                    </h4>
                    {rev.role && (
                      <span className="text-[11px] text-gray-400 dark:text-gray-400 block mt-0.5">
                        {rev.role}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ФОРМА ЗАЯВКИ НА КОНСУЛЬТАЦИЮ */}
      <ConsultationForm />

      {/* 7. ОФИС ПРОДАЖ И ИНТЕРАКТИВНАЯ КАРТА БИШКЕКА */}
      <section className="bg-white dark:bg-[#07130e] border-t border-gray-100 dark:border-white/10 py-16 sm:py-24 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
              {t.officeSection.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f] tracking-tight">
              {t.officeSection.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto mb-14">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-400 mb-1">{t.officeSection.addressLabel}</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {COMPANY_INFO.address}
              </p>
              <div className="space-y-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-5">
                {COMPANY_INFO.phones.map((phone, idx) => (
                  <div key={idx}>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-2 hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
                      <IconPhone className="w-4 h-4 text-[#064734] dark:text-[#d4b26f]" />
                      <span>{phone}</span>
                    </a>
                  </div>
                ))}
              </div>
              <a
                href={COMPANY_INFO.gisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064734] dark:text-[#d4b26f] hover:text-[#d4b26f] dark:hover:text-[#eddab2] hover:underline transition-all"
              >
                <IconMapPin className="w-4 h-4 text-[#d4b26f]" />
                <span>{t.officeSection.route2Gis}</span>
                <IconArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                  'Здравствуйте! Хочу записаться на консультацию в офис продаж EL ORDO GROUP.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#032b20] text-white px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow text-center cursor-pointer"
              >
                <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                <span>{t.officeSection.btnWhatsApp}</span>
              </a>
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-white/15 hover:border-[#064734] dark:hover:border-[#d4b26f] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center cursor-pointer"
              >
                <IconInstagram className="w-4 h-4 text-pink-600" />
                <span>{t.officeSection.btnInstagram}</span>
              </a>
            </div>
          </div>

          <BishkekMap />
        </div>
      </section>

    </main>
  );
}