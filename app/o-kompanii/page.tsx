'use client';

import Link from 'next/link';
import BishkekMap from '@/components/BishkekMap';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import {
  IconBuilding,
  IconShieldCheck,
  IconDocument,
  IconTree,
  IconMapPin,
  IconPhone,
  IconWhatsApp,
  IconInstagram,
  IconArrowRight,
} from '@/components/Icons';

export default function AboutPage() {
  const { t } = useLanguage();

  const waAboutText = encodeURIComponent(
    'Здравствуйте! Пишу с сайта EL ORDO GROUP из раздела «О компании». Хочу получить подробную презентацию ваших объектов и разрешительных документов.'
  );

  const team = [
    {
      name: 'Керезбек Нуралиев',
      role: t.aboutPage.roleCommercial,
      image: '/team/kerezbek-nuraliev-1.jpg',
    },
    {
      name: 'Адилет Медетбек уулу',
      role: t.aboutPage.roleTechnical,
      image: '/team/adilet-medetbek-uulu-857x1536.jpg',
    },
    {
      name: 'Самаганы Мамасыдык уулу',
      role: t.aboutPage.roleForeman,
      image: '/team/mamasydyk-uulu-samagany.jpg',
    },
    {
      name: 'Бектур Мусаев',
      role: t.aboutPage.roleSalesHead,
      image: '/team/musaev-bektur-768x1376.jpg',
    },
    {
      name: 'Бекжан Нуржанов',
      role: t.aboutPage.roleMarketingHead,
      image: '/team/nurzhanov-bekzhan-857x1536.jpg',
    },
    {
      name: 'Атанас Жороев',
      role: t.aboutPage.roleDevelopment,
      image: '/team/zhoroev-atanas.jpg',
    },
  ];

  const stats = [
    { value: '2021', label: t.aboutPage.stat1Label, sub: t.aboutPage.stat1Sub },
    { value: '6', label: t.aboutPage.stat2Label, sub: t.aboutPage.stat2Sub },
    { value: '100%', label: t.aboutPage.stat3Label, sub: t.aboutPage.stat3Sub },
    { value: t.aboutPage.stat4Value, label: t.aboutPage.stat4Label, sub: t.aboutPage.stat4Sub },
  ];

  const standards = [
    {
      icon: <IconBuilding className="w-6 h-6 text-[#064734] dark:text-[#d4b26f]" />,
      title: t.aboutPage.std1Title,
      desc: t.aboutPage.std1Desc,
      badge: t.aboutPage.std1Badge,
    },
    {
      icon: <IconDocument className="w-6 h-6 text-[#064734] dark:text-[#d4b26f]" />,
      title: t.aboutPage.std2Title,
      desc: t.aboutPage.std2Desc,
      badge: t.aboutPage.std2Badge,
    },
    {
      icon: <IconTree className="w-6 h-6 text-[#064734] dark:text-[#d4b26f]" />,
      title: t.aboutPage.std3Title,
      desc: t.aboutPage.std3Desc,
      badge: t.aboutPage.std3Badge,
    },
    {
      icon: <IconShieldCheck className="w-6 h-6 text-[#064734] dark:text-[#d4b26f]" />,
      title: t.aboutPage.std4Title,
      desc: t.aboutPage.std4Desc,
      badge: t.aboutPage.std4Badge,
    },
  ];

  const milestones = [
    {
      year: '2021',
      title: t.aboutPage.m1Title,
      desc: t.aboutPage.m1Desc,
    },
    {
      year: '2023 – 2024',
      title: t.aboutPage.m2Title,
      desc: t.aboutPage.m2Desc,
    },
    {
      year: '2025 – 2026',
      title: t.aboutPage.m3Title,
      desc: t.aboutPage.m3Desc,
    },
    {
      year: '2027 – 2029',
      title: t.aboutPage.m4Title,
      desc: t.aboutPage.m4Desc,
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white dark:bg-[#0b1b15] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
            {t.common.home}
          </Link>
          <span>/</span>
          <span className="text-[#064734] dark:text-[#d4b26f] font-bold">{t.header.about}</span>
        </div>
      </div>

      {/* 2. Hero-блок */}
      <section className="relative min-h-[500px] sm:min-h-[560px] flex items-center justify-center bg-[#064734] text-white py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="EL ORDO GROUP"
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021c15] via-[#064734]/80 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d4b26f]/40 text-[#d4b26f] text-xs font-black uppercase tracking-widest mb-6 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.aboutPage.heroBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-6 drop-shadow-xl">
            {t.aboutPage.heroTitle} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4b26f] via-[#eddab2] to-[#d4b26f]">
              {t.aboutPage.heroTitleAccent}
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed mb-8">
            {t.aboutPage.heroDesc}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/projects"
              className="bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-7 py-3.5 rounded-xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>{t.aboutPage.btnProjects}</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${waAboutText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-sm flex items-center gap-2 cursor-pointer"
            >
              <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
              <span>{t.aboutPage.btnAskLeadership}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Ключевые показатели компании */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-none border border-gray-100 dark:border-white/10 transition-colors">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-2 border-r last:border-r-0 border-gray-100 dark:border-white/10">
              <div className="text-2xl sm:text-4xl font-black text-[#064734] dark:text-[#d4b26f] mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-900 dark:text-white font-extrabold mb-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-gray-400 dark:text-neutral-400 hidden sm:block">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. История и принципы застройщика */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
                {t.aboutPage.missionBadge}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f] leading-snug">
                {t.aboutPage.missionTitle}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.aboutPage.missionP1}
            </p>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.aboutPage.missionP2}
            </p>

            {/* Цитата руководства */}
            <div className="p-6 rounded-2xl bg-[#064734]/5 dark:bg-[#064734]/20 border-l-4 border-[#064734] dark:border-[#d4b26f] shadow-sm">
              <p className="text-sm font-semibold italic text-gray-800 dark:text-gray-200 leading-relaxed mb-3">
                {t.aboutPage.quoteText}
              </p>
              <div className="text-xs font-black uppercase tracking-wider text-[#064734] dark:text-[#d4b26f]">
                {t.aboutPage.quoteAuthor}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 bg-neutral-900 aspect-[4/3] group">
              <img
                src="/projects/Abu-Dhabi.png"
                alt="Проекты EL ORDO GROUP"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="text-xs font-black uppercase text-[#d4b26f] block mb-1">
                    {t.aboutPage.cardBadge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">
                    {t.aboutPage.cardTitle}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    {t.aboutPage.cardDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Инженерные стандарты строительства */}
      <section className="bg-white dark:bg-[#07130e] border-y border-gray-100 dark:border-white/10 py-20 px-4 sm:px-6 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
              {t.aboutPage.standardsBadge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
              {t.aboutPage.standardsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-2">
              {t.aboutPage.standardsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {standards.map((std, idx) => (
              <div
                key={idx}
                className="bg-[#fafbfa] dark:bg-[#0b1b15] p-7 rounded-3xl border border-gray-200/80 dark:border-white/10 hover:border-[#064734]/40 dark:hover:border-[#d4b26f]/40 hover:shadow-xl dark:hover:shadow-none transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 flex items-center justify-center mb-4">
                    {std.icon}
                  </div>
                  <span className="inline-block text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] mb-3">
                    {std.badge}
                  </span>
                  <h3 className="text-base font-black text-gray-900 dark:text-white mb-2">
                    {std.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Таймлайн развития компании */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
            {t.aboutPage.milestonesBadge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
            {t.aboutPage.milestonesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0b1b15] p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-md dark:hover:border-[#d4b26f]/30 transition-all relative flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-black text-[#d4b26f] mb-3">
                  {item.year}
                </div>
                <h3 className="text-sm font-black text-gray-950 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Руководство и команда компании */}
      <section className="bg-[#f0f4f1] dark:bg-[#040c09] border-t border-gray-200 dark:border-white/10 py-20 px-4 sm:px-6 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
              {t.aboutPage.teamBadge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
              {t.aboutPage.teamTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
              {t.aboutPage.teamSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0b1b15] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between bg-white dark:bg-[#0b1b15] transition-colors">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white mb-1 group-hover:text-[#064734] dark:group-hover:text-[#d4b26f] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[#8c6b23] dark:text-[#d4b26f] uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Контакты офиса продаж и карта */}
      <section className="bg-white dark:bg-[#07130e] border-t border-gray-100 dark:border-white/10 py-16 sm:py-20 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
              {t.aboutPage.officeBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
              {t.aboutPage.officeTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto mb-12">
            <div>
              <p className="text-xs text-gray-400 dark:text-neutral-400 mb-1">{t.aboutPage.officeAddressLabel}</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {COMPANY_INFO.address}
              </p>
              <div className="space-y-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {COMPANY_INFO.phones.map((phone, idx) => (
                  <p key={idx}>
                    <a
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors inline-flex items-center gap-2"
                    >
                      <IconPhone className="w-3.5 h-3.5 text-[#064734] dark:text-[#d4b26f]" />
                      <span>{phone}</span>
                    </a>
                  </p>
                ))}
              </div>
              <a
                href={COMPANY_INFO.gisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064734] dark:text-[#d4b26f] hover:text-[#d4b26f] dark:hover:text-[#eddab2] hover:underline"
              >
                <IconMapPin className="w-3.5 h-3.5 text-[#d4b26f]" />
                <span>{t.aboutPage.btnRoute2Gis}</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${waAboutText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#032b20] dark:bg-[#064734] dark:hover:bg-[#095740] active:scale-95 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow text-center border border-transparent dark:border-white/10 cursor-pointer"
              >
                <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                <span>{t.aboutPage.btnWhatsApp}</span>
              </a>
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-white/15 hover:border-[#064734] dark:hover:border-[#d4b26f] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center cursor-pointer"
              >
                <IconInstagram className="w-4 h-4 text-pink-600" />
                <span>{t.aboutPage.btnInstagram}</span>
              </a>
            </div>
          </div>

          <BishkekMap />
        </div>
      </section>

    </main>
  );
}