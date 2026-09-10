'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BishkekMap from '@/components/BishkekMap';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
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
  IconCheck,
} from '@/components/Icons';

const DOCS_DATA: Record<Locale, {
  sectionBadge: string;
  sectionTitle: string;
  sectionDesc: string;
  counselTitle: string;
  counselDesc: string;
  counselBtn: string;
  inspectBtn: string;
  modalSerialLabel: string;
  modalIssuerLabel: string;
  modalBtnWa: string;
  items: Array<{
    badge: string;
    title: string;
    serial: string;
    issuer: string;
    desc: string;
  }>;
}> = {
  ru: {
    sectionBadge: '100% Юридическая чистота',
    sectionTitle: 'Разрешительная документация и лицензии',
    sectionDesc: 'Каждый наш объект строится в строгом соответствии с законами КР. Мы открыто предоставляем оригиналы документов для вашего юриста.',
    counselTitle: 'Юридическая проверка перед покупкой',
    counselDesc: 'Готовы предоставить оригиналы Красных книг, лицензии и ДДУ для проверки вашим независимым юристом в центральном офисе.',
    counselBtn: 'Запросить PDF документов',
    inspectBtn: 'Ознакомиться подробнее',
    modalSerialLabel: 'Регистрационный номер:',
    modalIssuerLabel: 'Орган выдачи:',
    modalBtnWa: 'Получить скан в WhatsApp',
    items: [
      {
        badge: 'Лицензия Госстроя КР',
        title: 'Государственная строительная лицензия',
        serial: 'Серия КРЦ-2 №08603',
        issuer: 'Госстрой при Кабинете Министров КР',
        desc: 'Подтверждает право на возведение капитальных монолитных высотных жилых комплексов и выполнение строительно-монтажных работ.',
      },
      {
        badge: 'Красные книги участков',
        title: 'Государственные акты на право частной собственности',
        serial: 'Госрегистр КР',
        issuer: 'ГУ «Кадастр» / Департамент кадастра КР',
        desc: 'Все жилые комплексы возводятся на собственных земельных участках с Красными книгами без арендных рисков.',
      },
      {
        badge: 'АПУ и техусловия ИТУ',
        title: 'Архитектурно-планировочные условия и техусловия',
        serial: '№ АПУ-2023 / ИТУ',
        issuer: 'МП «Бишкекглавархитектура»',
        desc: 'Утвержденные градостроительные параметры этажности и гарантированное подключение к центральным коммуникациям столицы.',
      },
      {
        badge: 'Государственная экспертиза',
        title: 'Положительное заключение Государственной экспертизы',
        serial: 'СНиП КР 20-02:2018',
        issuer: 'Департамент государственной экспертизы Госстроя КР',
        desc: 'Официальное экспертное подтверждение сейсмостойкости 9 баллов и соответствия прочности монолитного железобетонного каркаса.',
      },
    ],
  },
  kg: {
    sectionBadge: '100% Юридикалык тазалык',
    sectionTitle: 'Мамлекеттик документтер жана уруксаттар',
    sectionDesc: 'Биздин бардык объектилер Кызыл китептери бар жеке жерлерде курулат жана мамлекеттик каттоодон өтөт.',
    counselTitle: 'Юристиңиз менен келип таанышыңыз',
    counselDesc: 'Биз башкы сатуу кеңсесинде бардык түп нуска документтерди көрсөтүүгө даярбыз же PDF форматында юристиңизге жөнөтөбүз.',
    counselBtn: 'Документтерди WhatsAppтан алуу',
    inspectBtn: 'Чоо-жайын көрүү',
    modalSerialLabel: 'Каттоо номери:',
    modalIssuerLabel: 'Берген орган:',
    modalBtnWa: 'WhatsApp аркылуу сканерди алуу',
    items: [
      {
        badge: 'Мамкурулуш лицензиясы',
        title: 'Курулуш-монтаждоо иштерине мамлекеттик лицензия',
        serial: 'Серия КРЦ-2 №08603',
        issuer: 'КР Министрлер Кабинетине караштуу Мамкурулуш',
        desc: 'III деңгээлдеги жоопкерчиликтеги монолиттүү көп кабаттуу турак жайларды долбоорлоо жана куруу укугун тастыктайт.',
      },
      {
        badge: 'Кызыл китептер',
        title: 'Жеке менчик укугу жөнүндө мамлекеттик актылар',
        serial: 'Мамкаттоо КР',
        issuer: 'КР Кадастр мамлекеттик мекемеси',
        desc: 'Бардык объектилер жеке менчик жеринде курулат. Аренда же жер тилкеси боюнча талаш-тартыштар жок.',
      },
      {
        badge: 'АПУ жана ИТУ',
        title: 'Архитектуралык-пландоо шарттары жана инженердик тармактар',
        serial: '№ АПУ-2023 / ИТУ',
        issuer: '«Бишкекбашкыархитектура» МИ',
        desc: 'Шаар куруу талаптарына толук шайкештик жана бардык борбордук коммуникацияларга (жылуулук, суу, жарык) кошулуу кепилдиги.',
      },
      {
        badge: 'Мамэкспертиза',
        title: 'Мамлекеттик экспертизанын оң корутундусу',
        serial: 'КР СНиП 20-02:2018',
        issuer: 'Мамкурулуш алдындагы Мамэкспертиза департаменти',
        desc: '9 баллдык сейсмотуруктуулуктун эсептөөлөрү так текшерилген жана конструкциялык коопсуздугу 100% тастыкталган.',
      },
    ],
  },
  kz: {
    sectionBadge: '100% Заңдық тазалық',
    sectionTitle: 'Рұқсат құжаттары мен лицензиялар',
    sectionDesc: 'Әрбір нысанымыз ҚР заңдарына толық сәйкес салынуда. Құжаттардың түпнұсқасын заңгеріңіз үшін ашық ұсынамыз.',
    counselTitle: 'Сатып алу алдындағы заңгерлік тексеру',
    counselDesc: 'Бас кеңседе тәуелсіз заңгеріңіздің тексеруі үшін Қызыл кітаптар мен лицензия түпнұсқаларын ұсынуға дайынбыз.',
    counselBtn: 'Құжаттардың PDF файлын алу',
    inspectBtn: 'Толығырақ танысу',
    modalSerialLabel: 'Тіркеу нөмірі:',
    modalIssuerLabel: 'Берген орган:',
    modalBtnWa: 'WhatsApp-та сканды алу',
    items: [
      {
        badge: 'ҚР Мемқұрылыс лицензиясы',
        title: 'Мемлекеттік құрылыс лицензиясы',
        serial: 'Серия КРЦ-2 №08603',
        issuer: 'ҚР Министрлер Кабинеті жанындағы Мемқұрылыс',
        desc: 'Күрделі монолитті көпқабатты тұрғын үй кешендерін жобалау мен құрылыс-монтаждау жұмыстарын жүргізу құқығын растайды.',
      },
      {
        badge: 'Жер телімдерінің Қызыл кітаптары',
        title: 'Жеке меншік құқығы туралы мемлекеттік актілер',
        serial: 'ҚР Мемтіркеуі',
        issuer: '«Кадастр» ММ / Жер кадастры департаменті',
        desc: 'Барлық тұрғын үй кешендері жалдау тәуекелдерінсіз Қызыл кітабы бар жеке жер телімдерінде салынады.',
      },
      {
        badge: 'СЖТ және ТШ (АПУ / ИТУ)',
        title: 'Сәулеттік-жоспарлау тапсырмасы мен инженерлік желілер',
        serial: '№ АПУ-2023 / ИТУ',
        issuer: '«Бішкекбассәулет» КМ',
        desc: 'Қала құрылысы параметрлеріне сәйкестік және қаланың орталық коммуникацияларына кепілді қосылу.',
      },
      {
        badge: 'Мемлекеттік сараптама',
        title: 'Мемлекеттік сараптаманың оң қорытындысы',
        serial: 'ҚР ҚНжЕ 20-02:2018',
        issuer: 'Мемлекеттік сараптама департаменті',
        desc: '9 балдық сейсмотөзімділік есептеулері мен монолитті темірбетон қаңқасының беріктігін ресми растау.',
      },
    ],
  },
  uk: {
    sectionBadge: '100% Юридична чистота',
    sectionTitle: 'Дозвільна документація та ліцензії',
    sectionDesc: 'Кожен наш об’єкт будується у суворій відповідності до законів КР. Ми відкрито надаємо оригінали документів вашому юристу.',
    counselTitle: 'Юридична перевірка перед купівлею',
    counselDesc: 'Готові надати оригінали Червоних книг, ліцензії та ДДУ для перевірки вашим незалежним юристом.',
    counselBtn: 'Запитати PDF документів',
    inspectBtn: 'Ознайомитися докладніше',
    modalSerialLabel: 'Реєстраційний номер:',
    modalIssuerLabel: 'Орган видачі:',
    modalBtnWa: 'Отримати скан у WhatsApp',
    items: [
      {
        badge: 'Ліцензія Держбуду КР',
        title: 'Державна будівельна ліцензія',
        serial: 'Серія КРЦ-2 №08603',
        issuer: 'Держбуд при Кабінеті Міністрів КР',
        desc: 'Підтверджує право на зведення капітальних монолітних висотних житлових комплексів та будівельні роботи.',
      },
      {
        badge: 'Червоні книги ділянок',
        title: 'Державні акти на право приватної власності',
        serial: 'Держреєстр КР',
        issuer: 'ДУ «Кадастр» / Департамент кадастру КР',
        desc: 'Усі житлові комплекси зводяться на власних ділянках із Червоними книгами без орендних ризиків.',
      },
      {
        badge: 'АПУ та техумови ІТУ',
        title: 'Архітектурно-планувальні умови та техумови',
        serial: '№ АПУ-2023 / ІТУ',
        issuer: 'МП «Бішкекголовбудархітектура»',
        desc: 'Затверджені містобудівні параметри та гарантоване підключення до центральних комунікацій столиці.',
      },
      {
        badge: 'Державна експертиза',
        title: 'Позитивний висновок Державної експертизи',
        serial: 'СНіП КР 20-02:2018',
        issuer: 'Департамент державної експертизи Держбуду КР',
        desc: 'Офіційне експертне підтвердження сейсмостійкості 9 балів та міцності монолітного залізобетонного каркаса.',
      },
    ],
  },
  en: {
    sectionBadge: '100% Legal Guarantee',
    sectionTitle: 'Official Permits & Construction Titles',
    sectionDesc: 'Every development is built on privately-owned land with official Red Books and state-registered contracts.',
    counselTitle: 'Independent Legal Due Diligence',
    counselDesc: 'We welcome independent legal audits. We will provide all original title deeds and permits in person or send a PDF bundle.',
    counselBtn: 'Request Legal PDF Bundle',
    inspectBtn: 'Inspect Document',
    modalSerialLabel: 'Registration Number:',
    modalIssuerLabel: 'Issuing Authority:',
    modalBtnWa: 'Receive Scan via WhatsApp',
    items: [
      {
        badge: 'State License',
        title: 'State Construction & Engineering License',
        serial: 'Series KRC-2 No. 08603',
        issuer: 'State Agency for Architecture & Construction of the KR',
        desc: 'Authorizes capital multi-story reinforced concrete construction and high-rise structural engineering.',
      },
      {
        badge: 'Private Land Title',
        title: 'Private Land Ownership State Deeds (Red Books)',
        serial: 'State Cadastre KR',
        issuer: 'State Land Cadastre Department of the KR',
        desc: 'All complexes are built exclusively on developer-owned land plots with clean titles, free of municipal lease risks.',
      },
      {
        badge: 'Town Planning Approval',
        title: 'Architectural Master Plan & Utility Approvals',
        serial: 'No. APU-2023 / ITU',
        issuer: 'Bishkek Master Architecture Municipal Enterprise',
        desc: 'Full compliance with city master zoning codes and guaranteed direct connection to municipal central heating and utilities.',
      },
      {
        badge: 'State Seismic Audit',
        title: 'State Interdepartmental Expert Seismic Conclusion',
        serial: 'KR Code 20-02:2018',
        issuer: 'Department of State Expertise of the KR',
        desc: 'Certified structural resilience rated for 9-magnitude seismic safety according to state codes.',
      },
    ],
  },
  zh: {
    sectionBadge: '100% 法律合规保障',
    sectionTitle: '官方工程许可资质与红本产权',
    sectionDesc: '所有项目均严格恪守国家标准，在拥有正式红本产权的自有土地上开发建设。全套原件向置业法务公开查阅。',
    counselTitle: '签约前置业法务独立查验',
    counselDesc: '热忱欢迎您的独立法务顾问来访查验。总部营销中心提供土地红本、施工许可证及备案合同全套原件，亦可提供PDF电子版。',
    counselBtn: '在 WhatsApp 中获取资质文件 PDF',
    inspectBtn: '查看详情',
    modalSerialLabel: '官方备案编号：',
    modalIssuerLabel: '审批主管机关：',
    modalBtnWa: '在 WhatsApp 中索取扫描件',
    items: [
      {
        badge: '国家建设部施工资质',
        title: '国家一级建筑工程施工许可证',
        serial: 'Серия КРЦ-2 №08603',
        issuer: '吉尔吉斯共和国内阁国家建设与建筑署',
        desc: '依法核准承担高层现浇钢筋混凝土民用住宅工程的施工与总承包资质。',
      },
      {
        badge: '国家土地红本',
        title: '土地私有产权国家正式红本书证',
        serial: '官方红本 (Gosregister)',
        issuer: '吉尔吉斯国家不动产地籍局 (Cadastre)',
        desc: '所有楼盘均建于拥有国家正式红本产权的永久自有土地上，产权明晰无租赁风险。',
      },
      {
        badge: '规划条件与管网批文',
        title: '建筑规划技术条件 (APU) 及管网配套批件',
        serial: '№ АПУ-2023 / ИТУ',
        issuer: '比什凯克市规划建筑总局',
        desc: '严格符合首都总体规划，保障无缝接驳城市集中供暖、供水供电等市政主管网。',
      },
      {
        badge: '国家工程质量与抗震审查',
        title: '国家部际综合工程质检与抗震合格意见书',
        serial: 'СНиП КР 20-02:2018',
        issuer: '国家建设署工程质量审查局',
        desc: '经严苛动力学计算，主体钢筋混凝土框架结构抗震烈度达9度，工程安全性获权威认证。',
      },
    ],
  },
};

export default function AboutPage() {
  const { t, locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const docs = DOCS_DATA[currentLang] || DOCS_DATA.ru;

  const [selectedDoc, setSelectedDoc] = useState<null | {
    title: string;
    serial: string;
    issuer: string;
    desc: string;
    badge: string;
  }>(null);

  const waAboutText = encodeURIComponent(
    'Здравствуйте! Пишу с сайта EL ORDO GROUP из раздела «О компании». Хочу получить презентацию объектов и юридический пакет разрешительных документов.'
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

      {/* 2. Hero-блок с оптимизированным фоном */}
      <section className="relative min-h-[500px] sm:min-h-[560px] flex items-center justify-center bg-[#064734] text-white py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/projects/Abu-Dhabi.png"
            alt="EL ORDO GROUP"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 scale-105"
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
              <Image
                src="/projects/Abu-Dhabi.png"
                alt="Проекты EL ORDO GROUP"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-8">
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

      {/* 6. ОФИЦИАЛЬНЫЕ ДОКУМЕНТЫ И РАЗРЕШЕНИЯ (Все 6 языков) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
            {docs.sectionBadge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
            {docs.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
            {docs.sectionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {docs.items.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0b1b15] p-7 rounded-3xl border border-gray-200 dark:border-white/10 hover:border-[#d4b26f]/50 hover:shadow-xl dark:hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase px-3 py-1 rounded-full bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f]">
                    <IconCheck className="w-3.5 h-3.5" />
                    <span>{doc.badge}</span>
                  </span>
                  <span className="text-[11px] font-bold text-gray-500 dark:text-neutral-400 bg-gray-100 dark:bg-white/5 px-2.5 py-0.5 rounded-lg">
                    {doc.serial}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white mb-2 group-hover:text-[#064734] dark:group-hover:text-[#d4b26f] transition-colors">
                  {doc.title}
                </h3>

                <p className="text-xs text-[#8c6b23] dark:text-[#eddab2] font-semibold mb-3">
                  {doc.issuer}
                </p>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {doc.desc}
                </p>
              </div>

              <button
                onClick={() => setSelectedDoc(doc)}
                className="inline-flex items-center justify-between w-full pt-4 border-t border-gray-100 dark:border-white/10 text-xs font-black uppercase tracking-wider text-[#064734] dark:text-[#d4b26f] hover:underline cursor-pointer"
              >
                <span>{docs.inspectBtn}</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Инфо-плашка для юристов покупателя */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#064734] text-white border border-[#d4b26f]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl text-center md:text-left">
            <h4 className="text-lg font-black uppercase tracking-tight text-[#d4b26f] mb-1">
              {docs.counselTitle}
            </h4>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              {docs.counselDesc}
            </p>
          </div>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
              'Здравствуйте! Хочу получить полный пакет документов (сканы лицензии Госстроя, Красной книги и типовой ДДУ) для проверки юристом.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <IconWhatsApp className="w-4 h-4 text-[#064734]" />
            <span>{docs.counselBtn}</span>
          </a>
        </div>
      </section>

      {/* 7. Таймлайн развития компании */}
      <section className="bg-white dark:bg-[#07130e] border-y border-gray-100 dark:border-white/10 py-20 px-4 sm:px-6 transition-colors">
        <div className="max-w-6xl mx-auto">
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
                className="bg-[#fafbfa] dark:bg-[#0b1b15] p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-md dark:hover:border-[#d4b26f]/30 transition-all relative flex flex-col justify-between"
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
        </div>
      </section>

      {/* 8. Руководство и команда компании с оптимизированными фото */}
      <section className="bg-[#f0f4f1] dark:bg-[#040c09] py-20 px-4 sm:px-6 transition-colors">
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
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between bg-white dark:bg-[#0b1b15] transition-colors">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-gray-950 dark:text-white mb-1 group-hover:text-[#064734] dark:group-hover:text-[#d4b26f] transition-colors">
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

      {/* 9. Контакты офиса продаж и карта */}
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

      {/* Модальное окно просмотра документа */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white text-xl font-black w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer"
            >
              ✕
            </button>

            <span className="inline-block text-[11px] font-black uppercase px-3 py-1 rounded-full bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] mb-3">
              {selectedDoc.badge}
            </span>

            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
              {selectedDoc.title}
            </h3>

            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-xs space-y-1 mb-4">
              <p className="text-gray-500 dark:text-neutral-400">
                {docs.modalSerialLabel} <strong className="text-gray-900 dark:text-white">{selectedDoc.serial}</strong>
              </p>
              <p className="text-gray-500 dark:text-neutral-400">
                {docs.modalIssuerLabel} <strong className="text-gray-900 dark:text-white">{selectedDoc.issuer}</strong>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {selectedDoc.desc}
            </p>

            <div className="flex gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                  `Здравствуйте! Прошу выслать официальный скан документа «${selectedDoc.title} (${selectedDoc.serial})» в PDF формате.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] text-[#d4b26f] hover:text-white dark:text-[#064734] font-black py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <IconWhatsApp className="w-4 h-4" />
                <span>{docs.modalBtnWa}</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}