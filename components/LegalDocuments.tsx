'use client';

import { useState, useEffect } from 'react';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { trackWhatsAppClick } from '@/lib/analytics';
import {
  IconCheck,
  IconShieldCheck,
  IconWhatsApp,
  IconArrowRight,
} from '@/components/Icons';

interface LegalDocItem {
  id: string;
  category: 'license' | 'land' | 'apu' | 'expertise' | 'ddu';
  complexSlug: 'all' | 'abu-dhabi' | 'madina-residence' | 'ajkol-plus';
  tag: string;
  regNumber: string;
  title: string;
  authority: string;
  desc: string;
  fullDetails: {
    status: string;
    issueDate: string;
    snipCode?: string;
    guaranteeText: string;
    whatItMeans: string[];
  };
}

const LEGAL_DOCS: LegalDocItem[] = [
  {
    id: 'license-gosstroy',
    category: 'license',
    complexSlug: 'all',
    tag: 'ЛИЦЕНЗИЯ ГОССТРОЯ КР',
    regNumber: 'Серия КРЦ-2 №08603',
    title: 'Государственная строительная лицензия',
    authority: 'Госстрой при Кабинете Министров КР',
    desc: 'Подтверждает право на возведение капитальных монолитных высотных жилых комплексов и выполнение строительно-монтажных работ.',
    fullDetails: {
      status: 'Действующая бессрочная строительная лицензия высшей категории',
      issueDate: 'Выдана Государственным агентством архитектуры и строительства КР',
      guaranteeText:
        'Лицензия высшей категории подтверждает соответствие компании строгим нормам капитального многоэтажного строительства, наличие постоянного штата сертифицированных инженеров и современной строительной техники.',
      whatItMeans: [
        'Официальное право строительства зданий выше 16 этажей',
        'Собственная служба сертифицированного технического надзора',
        'Регулярный государственный контроль качества железобетонных конструкций',
      ],
    },
  },
  {
    id: 'land-acts',
    category: 'land',
    complexSlug: 'all',
    tag: 'КРАСНЫЕ КНИГИ УЧАСТКОВ',
    regNumber: 'Госрегистр КР',
    title: 'Государственные акты на право частной собственности',
    authority: 'ГУ «Кадастр» / Департамент кадастра КР',
    desc: 'Все жилые комплексы возводятся на собственных земельных участках с Красными книгами без арендных рисков.',
    fullDetails: {
      status: '100% частная собственность девелопера (Красная книга)',
      issueDate: 'Зарегистрировано в Государственном реестре прав на недвижимое имущество',
      guaranteeText:
        'Строительство на собственной земле исключает споры со сроками муниципальной аренды. После сдачи дома земельный участок и придомовая территория безвозмездно передаются в общую долевую собственность жильцов.',
      whatItMeans: [
        'Полное отсутствие залогов, банковских кредитов и судебных арестов',
        'Юридическая гарантия передачи земли в собственность ТСЖ жильцов',
        'Беспрепятственное оформление Техпаспортов на каждую квартиру',
      ],
    },
  },
  {
    id: 'apu-tech',
    category: 'apu',
    complexSlug: 'all',
    tag: 'АПУ И ТЕХУСЛОВИЯ ИТУ',
    regNumber: '№ АПУ-2023 / ИТУ',
    title: 'Архитектурно-планировочные условия и техусловия',
    authority: 'МП «Бишкекглавархитектура»',
    desc: 'Утвержденные градостроительные параметры этажности и гарантированное подключение к центральным коммуникациям столицы.',
    fullDetails: {
      status: 'Утверждено Главным управлением архитектуры и градостроительства',
      issueDate: 'Согласовано с профильными муниципальными службами г. Бишкек',
      guaranteeText:
        'АПУ закрепляет законность архитектурного проекта, соблюдение красных линий и норм инсоляции квартир. Инженерно-технические условия (ИТУ) юридически гарантируют мощности городских сетей.',
      whatItMeans: [
        'Центральное отопление и горячая вода (Бишкектеплосеть)',
        'Высоковольтное энергоснабжение со своей подстанцией (Северэлектро)',
        'Центральная городская канализация и водопровод (Бишкекводоканал)',
      ],
    },
  },
  {
    id: 'expertise-seismic',
    category: 'expertise',
    complexSlug: 'all',
    tag: 'ГОСУДАРСТВЕННАЯ ЭКСПЕРТИЗА',
    regNumber: 'СНиП КР 20-02:2018',
    title: 'Положительное заключение Государственной экспертизы',
    authority: 'Департамент государственной экспертизы Госстроя КР',
    desc: 'Официальное экспертное подтверждение сейсмостойкости 9 баллов и соответствия прочности монолитного железобетонного каркаса.',
    fullDetails: {
      status: 'Положительное комплексное государственное заключение',
      issueDate: 'Проект прошел испытания Сейсмологического института НАН КР',
      snipCode: 'СНиП КР 20-02:2018 (Сейсмостойкое строительство)',
      guaranteeText:
        'Расчет конструкций дома выполнен с полуторакратным запасом прочности на землетрясения до 9 баллов по шкале MSK-64. Каркас заливается тяжелым заводским бетоном марки М350 с российской арматурой А500С.',
      whatItMeans: [
        'Монолитный железобетонный каркас с сейсмостойкостью 9 баллов',
        'Лабораторные испытания каждого куба заливаемого бетона',
        'Акустическая и тепловая изоляция межквартирных стен по госстандартам',
      ],
    },
  },
  {
    id: 'ddu-guarantee',
    category: 'ddu',
    complexSlug: 'all',
    tag: 'ГОСРЕГИСТРАЦИЯ ДДУ',
    regNumber: 'Закон КР №144',
    title: 'Договор долевого участия с регистрацией в Госрегистре',
    authority: 'Бишкекский филиал ГУ «Кадастр»',
    desc: 'Каждая сделка регистрируется государством, что на 100% защищает покупателя от двойных продаж и смены условий.',
    fullDetails: {
      status: 'Государственная регистрация права требования дольщика',
      issueDate: 'Внесение в Единый электронный реестр прав на недвижимость КР',
      guaranteeText:
        'В соответствии с законодательством Кыргызской Республики договор долевого участия подлежит обязательной регистрации в Госрегистре. Это полностью исключает риск двойной продажи одной и той же квартиры.',
      whatItMeans: [
        'Защита средств дольщика государственным законом',
        'Фиксация точной квадратуры, планировки и цены в долларах и сомах',
        'Юридическая чистота для последующей перепродажи или дарения',
      ],
    },
  },
];

const UI_STRINGS: Record<
  Locale,
  {
    badge: string;
    title: string;
    subtitle: string;
    tabAll: string;
    tabAbuDhabi: string;
    tabMadina: string;
    tabAikol: string;
    btnMore: string;
    modalTitle: string;
    modalClose: string;
    statusLabel: string;
    authorityLabel: string;
    guaranteesHeading: string;
    btnAskWa: string;
    bannerTitle: string;
    bannerDesc: string;
    bannerBtn: string;
  }
> = {
  ru: {
    badge: '100% Юридическая чистота',
    title: 'Разрешительная документация и лицензии',
    subtitle:
      'Каждый наш объект строится в строгом соответствии с законами КР. Мы открыто предоставляем оригиналы документов для вашего юриста.',
    tabAll: 'Все документы',
    tabAbuDhabi: 'ЖК Abu Dhabi',
    tabMadina: 'ЖК Madina Residence',
    tabAikol: 'ЖД Айкол +',
    btnMore: 'Ознакомиться подробнее',
    modalTitle: 'Официальные параметры разрешительного документа',
    modalClose: 'Закрыть',
    statusLabel: 'Юридический статус:',
    authorityLabel: 'Выдавший орган:',
    guaranteesHeading: 'Что это гарантирует покупателю:',
    btnAskWa: 'Запросить скан-копию для юриста в WhatsApp',
    bannerTitle: 'Юридическая проверка перед покупкой',
    bannerDesc:
      'Готовы предоставить оригиналы Красных книг, лицензии и ДДУ для проверки вашим независимым юристом в центральном офисе.',
    bannerBtn: 'Запросить PDF документов',
  },
  kg: {
    badge: '100% Юридикалык тазалык',
    title: 'Уруксат кагаздары жана лицензиялар',
    subtitle:
      'Биздин ар бир объектибиз КР мыйзамдарына так ылайык курулат. Биз юристиңиздин текшерүүсү үчүн документтердин түп нускасын ачык беребиз.',
    tabAll: 'Бардык документтер',
    tabAbuDhabi: 'ЖК Abu Dhabi',
    tabMadina: 'ЖК Madina Residence',
    tabAikol: 'ЖД Айкол +',
    btnMore: 'Кененирээк таанышуу',
    modalTitle: 'Уруксат документинин расмий маалыматы',
    modalClose: 'Жабуу',
    statusLabel: 'Юридикалык статусу:',
    authorityLabel: 'Берген орган:',
    guaranteesHeading: 'Бул кардарга эмне кепилдик берет:',
    btnAskWa: 'Юрист үчүн скан-көчүрмөсүн WhatsAppтан суроо',
    bannerTitle: 'Сатып алуудан мурунку юридикалык текшерүү',
    bannerDesc:
      'Кызыл китептердин, лицензиялардын жана ДДУнун түп нускасын көз карандысыз юристиңиздин текшерүүсү үчүн берүүгө даярбыз.',
    bannerBtn: 'Документтердин PDF пакетин суроо',
  },
  kz: {
    badge: '100% Заңдылық пен сенімділік',
    title: 'Рұқсат құжаттары мен лицензиялар',
    subtitle:
      'Әрбір нысанымыз ҚР заңнамасына сай салынады. Заңгеріңіздің тексеруі үшін құжаттардың түпнұсқасын ашық ұсынамыз.',
    tabAll: 'Барлық құжаттар',
    tabAbuDhabi: 'ЖК Abu Dhabi',
    tabMadina: 'ЖК Madina Residence',
    tabAikol: 'ЖД Айкол +',
    btnMore: 'Толығырақ танысу',
    modalTitle: 'Рұқсат құжатының ресми параметрлері',
    modalClose: 'Жабу',
    statusLabel: 'Заңды мәртебесі:',
    authorityLabel: 'Берген мекеме:',
    guaranteesHeading: 'Бұл сатып алушыға не кепілдік береді:',
    btnAskWa: 'Заңгерге арналған көшірмені WhatsApp-тан сұрау',
    bannerTitle: 'Сатып алу алдындағы заңдық тексеру',
    bannerDesc:
      'Тәуелсіз заңгеріңіздің тексеруі үшін Қызыл кітаптардың, лицензиялардың түпнұсқасын ұсынуға дайынбыз.',
    bannerBtn: 'Құжаттардың PDF топтамасын сұрау',
  },
  uk: {
    badge: '100% Юридична чистота',
    title: 'Дозвільна документація та ліцензії',
    subtitle:
      'Кожен наш об’єкт будується у суворій відповідності до законів. Ми відкрито надаємо оригінали документів для вашого юриста.',
    tabAll: 'Усі документи',
    tabAbuDhabi: 'ЖК Abu Dhabi',
    tabMadina: 'ЖК Madina Residence',
    tabAikol: 'ЖД Айкол +',
    btnMore: 'Ознайомитися детальніше',
    modalTitle: 'Офіційні параметри дозвільного документа',
    modalClose: 'Закрити',
    statusLabel: 'Юридичний статус:',
    authorityLabel: 'Орган видачі:',
    guaranteesHeading: 'Що це гарантує покупцю:',
    btnAskWa: 'Запитати копію для юриста у WhatsApp',
    bannerTitle: 'Юридична перевірка перед покупкою',
    bannerDesc:
      'Готові надати оригінали Державних актів, ліцензій та ДДУ для перевірки вашим незалежним юристом.',
    bannerBtn: 'Запитати PDF документів',
  },
  en: {
    badge: '100% Legal Transparency',
    title: 'Statutory Permits & Building Licenses',
    subtitle:
      'Every project is developed in strict accordance with the law. We openly provide certified original documentation for your legal counsel.',
    tabAll: 'All Documents',
    tabAbuDhabi: 'Abu Dhabi Residence',
    tabMadina: 'Madina Residence',
    tabAikol: 'Aikol + House',
    btnMore: 'Inspect Full Specifications',
    modalTitle: 'Official Statutory Permit Parameters',
    modalClose: 'Close',
    statusLabel: 'Legal Status:',
    authorityLabel: 'Issuing Body:',
    guaranteesHeading: 'What this guarantees to the property buyer:',
    btnAskWa: 'Request Certified Copies for Legal Review via WhatsApp',
    bannerTitle: 'Advance Legal Due Diligence',
    bannerDesc:
      'We are ready to provide original title deeds (Red Books), licenses, and DDU contracts for verification by your independent attorney.',
    bannerBtn: 'Request PDF Document Pack',
  },
  zh: {
    badge: '100% 法定合规透明',
    title: '法定施工许可与开发资质',
    subtitle:
      '我们旗下的每一座楼盘均严格遵循国家法律规范建造，全程公开官方证照原件供您的法务顾问审核。',
    tabAll: '全部资质证照',
    tabAbuDhabi: 'Abu Dhabi 府邸',
    tabMadina: 'Madina 商务府邸',
    tabAikol: 'Айкол + 洋房',
    btnMore: '查看合规证照详情',
    modalTitle: '官方行政许可备案参数',
    modalClose: '关闭',
    statusLabel: '法律状态：',
    authorityLabel: '审批机关：',
    guaranteesHeading: '为购房业主提供的法定保障：',
    btnAskWa: '在 WhatsApp 中索取法务审核专用高清扫描件',
    bannerTitle: '购房前专属法务尽职调查',
    bannerDesc:
      '我们随时在营销中心提供私有产权红本、施工许可证及标准预售合同原件，配合您的独立法务顾问审查。',
    bannerBtn: '一键获取 PDF 资质文件包',
  },
};

interface LegalDocumentsProps {
  initialComplex?: 'all' | 'abu-dhabi' | 'madina-residence' | 'ajkol-plus';
}

export default function LegalDocuments({ initialComplex = 'all' }: LegalDocumentsProps) {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const t = UI_STRINGS[currentLang] || UI_STRINGS.ru;

  const [activeTab, setActiveTab] = useState<'all' | 'abu-dhabi' | 'madina-residence' | 'ajkol-plus'>(initialComplex);
  const [selectedDoc, setSelectedDoc] = useState<LegalDocItem | null>(null);
  // Блокировка скролла при открытой модалке
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedDoc(null);
    };

    if (selectedDoc) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDoc]);

  const filteredDocs = LEGAL_DOCS.filter((doc) => {
    if (activeTab === 'all') return true;
    return doc.complexSlug === 'all' || doc.complexSlug === activeTab;
  });

  const handleOpenDoc = (doc: LegalDocItem) => {
    setSelectedDoc(doc);
  };

  const handleRequestDocWa = (docTitle: string) => {
    trackWhatsAppClick('legal_doc_request', docTitle);
    const waNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';
    const message = `Здравствуйте! Меня интересуют документы EL ORDO GROUP («${docTitle}»). Отправьте, пожалуйста, скан-копии для проверки моим юристом.`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleGeneralPackWa = () => {
    trackWhatsAppClick('legal_pack_request', 'full_package');
    const waNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';
    const message = `Здравствуйте! Я планирую покупку квартиры в EL ORDO GROUP. Отправьте, пожалуйста, полный пакет разрешительных документов (Красные книги, Лицензия Госстроя, заключение Госэкспертизы и образец ДДУ) в формате PDF для проверки моим юристом.`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section
      id="legal-documents"
      className="py-16 sm:py-24 px-4 sm:px-6 bg-[#fafbfa] dark:bg-[#03150e] text-gray-900 dark:text-gray-100 relative overflow-hidden transition-colors duration-300"
    >
      {/* Мягкое фоновое свечение в темном режиме */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#064734]/5 dark:bg-[#d4b26f]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 1. Заголовок раздела */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064734]/10 dark:bg-[#d4b26f]/15 border border-[#064734]/20 dark:border-[#d4b26f]/30 text-[#064734] dark:text-[#d4b26f] text-xs font-black uppercase tracking-widest shadow-sm mb-3">
            <IconShieldCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f]" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-[#064734] dark:text-[#d4b26f]">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed font-light">
            {t.subtitle}
          </p>
        </div>

        {/* 2. Табы фильтрации по ЖК */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: t.tabAll },
            { id: 'abu-dhabi', label: t.tabAbuDhabi },
            { id: 'madina-residence', label: t.tabMadina },
            { id: 'ajkol-plus', label: t.tabAikol },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#064734] text-white dark:bg-[#d4b26f] dark:text-[#064734] shadow-md scale-105'
                  : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3. Сетка карточек документов (Dual Theme: Светлая и Тёмная) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => handleOpenDoc(doc)}
              className="bg-white dark:bg-[#06241b] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/10 hover:border-[#064734]/50 dark:hover:border-[#d4b26f]/70 shadow-md dark:shadow-none hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              <div className="relative z-10">
                {/* Верхняя строка тегов */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-[11px] font-bold">
                    <IconCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{doc.tag}</span>
                  </span>

                  <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 text-[11px] font-mono font-bold">
                    {doc.regNumber}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white group-hover:text-[#064734] dark:group-hover:text-[#d4b26f] transition-colors mb-2 leading-tight">
                  {doc.title}
                </h3>

                <p className="text-xs text-[#9c782b] dark:text-[#d4b26f] font-bold mb-3">
                  {doc.authority}
                </p>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-6">
                  {doc.desc}
                </p>
              </div>

              {/* Кнопка Ознакомиться */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#064734] dark:text-[#d4b26f] group-hover:text-[#032b20] dark:group-hover:text-white transition-colors">
                <span>{t.btnMore}</span>
                <IconArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* 4. Баннер «Юридическая проверка перед покупкой» (как на скриншоте) */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#064734] text-white border border-[#064734] dark:border-[#d4b26f]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white">
              {t.bannerTitle}
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl font-light">
              {t.bannerDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={handleGeneralPackWa}
            className="w-full md:w-auto px-7 py-3.5 rounded-2xl bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
          >
            <IconWhatsApp className="w-4 h-4 text-[#064734]" />
            <span>{t.bannerBtn}</span>
          </button>
        </div>
      </div>

      {/* 5. Модальное окно (Полная поддержка Светлой и Тёмной темы) */}
      {selectedDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#06241b] text-gray-900 dark:text-white border border-gray-200 dark:border-[#d4b26f]/40 shadow-2xl overflow-hidden p-6 sm:p-8 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              type="button"
              onClick={() => setSelectedDoc(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 active:scale-95 text-gray-700 dark:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[11px] font-black uppercase tracking-widest text-[#064734] dark:text-[#d4b26f] block mb-1">
              {selectedDoc.tag} • {selectedDoc.regNumber}
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white mb-2 leading-tight pr-8">
              {selectedDoc.title}
            </h3>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-white/10 text-xs text-[#064734] dark:text-emerald-300 font-bold mb-4">
              🏛 {t.authorityLabel} {selectedDoc.authority}
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-200 leading-relaxed mb-6 font-light">
              {selectedDoc.fullDetails.guaranteeText}
            </p>

            <div className="mb-6 space-y-2">
              <h5 className="text-xs font-black uppercase tracking-wider text-[#064734] dark:text-[#d4b26f]">
                {t.guaranteesHeading}
              </h5>
              <div className="space-y-2">
                {selectedDoc.fullDetails.whatItMeans.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-700 dark:text-gray-300"
                  >
                    <IconCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Кнопка запроса скан-копии */}
            <button
              type="button"
              onClick={() => handleRequestDocWa(selectedDoc.title)}
              className="w-full py-4 rounded-xl bg-[#064734] dark:bg-[#d4b26f] hover:bg-[#032b20] dark:hover:bg-[#c49f57] active:scale-95 text-white dark:text-[#064734] font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <IconWhatsApp className="w-4 h-4 text-[#25D366] dark:text-[#064734]" />
              <span>{t.btnAskWa}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}