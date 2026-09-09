'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import {
  IconCheck,
  IconDocument,
  IconWhatsApp,
  IconMapPin,
  IconArrowRight,
} from '@/components/Icons';

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
  children?: React.ReactNode;
}

const UI_STRINGS = {
  ru: {
    home: 'Главная',
    terms: 'Условия покупки',
    heroBadge: 'Финансовые программы застройщика',
    btnGetCalcWa: 'Получить расчет в WhatsApp',
    btnLearnTerms: 'Изучить условия',
    officialNotice: 'Официальные условия девелопера',
    detailedDesc: 'Подробное описание',
    proposalCore: 'Суть предложения:',
    documentsPackage: 'Пакет документов:',
    noIncomeProof: 'Без справок о доходах и поручителей',
    customSchedulePrompt: 'Хотите индивидуальный график?',
    customScheduleSub: 'Сформируем расчет за 2 минуты в мессенджере',
    btnWriteWa: 'Написать в WhatsApp',
    faqTitle: 'Частые вопросы по программе:',
    consultantBadge: 'Консультация финансиста',
    officeTitle: 'Офис продаж и оформление',
    officeHead: 'Центральный офис в Бишкеке:',
    workHours: '(Пн — Сб 09:00 – 19:00)',
    btnRoute2Gis: 'Маршрут в 2GIS',
  },
  kg: {
    home: 'Башкы бет',
    terms: 'Сатып алуу шарттары',
    heroBadge: 'Куруучунун каржылык программалары',
    btnGetCalcWa: 'WhatsApp аркылуу эсеп алуу',
    btnLearnTerms: 'Шарттар менен таанышуу',
    officialNotice: 'Куруучунун расмий шарттары',
    detailedDesc: 'Толук сыпаттамасы',
    proposalCore: 'Сунуштун маңызы:',
    documentsPackage: 'Керектүү документтер:',
    noIncomeProof: 'Киреше маалымкатысыз жана кепилдерсиз',
    customSchedulePrompt: 'Жеке график алгыңыз келеби?',
    customScheduleSub: 'Мессенджерден 2 мүнөттө эсептеп беребиз',
    btnWriteWa: 'WhatsApp аркылуу жазуу',
    faqTitle: 'Программа боюнча көп берилүүчү суроолор:',
    consultantBadge: 'Финансисттин кеңеши',
    officeTitle: 'Сатуу кеңсеси жана тариздөө',
    officeHead: 'Бишкектеги башкы сатуу кеңсеси:',
    workHours: '(Дүй — Иш 09:00 – 19:00)',
    btnRoute2Gis: '2GIS аркылуу жол',
  },
  kz: {
    home: 'Басты бет',
    terms: 'Сатып алу шарттары',
    heroBadge: 'Құрылыс салушының қаржылық бағдарламалары',
    btnGetCalcWa: 'WhatsApp-та есепті алу',
    btnLearnTerms: 'Шарттармен танысу',
    officialNotice: 'Құрылыс салушының ресми шарттары',
    detailedDesc: 'Толық сипаттамасы',
    proposalCore: 'Ұсыныстың мәні:',
    documentsPackage: 'Құжаттар топтамасы:',
    noIncomeProof: 'Кіріс анықтамасынсыз және кепілсіз',
    customSchedulePrompt: 'Жеке кесте алғыңыз келе ме?',
    customScheduleSub: 'Мессенджерде 2 минутта есептеп береміз',
    btnWriteWa: 'WhatsApp-қа жазу',
    faqTitle: 'Бағдарлама бойынша жиі қойылатын сұрақтар:',
    consultantBadge: 'Қаржыгердің кеңесі',
    officeTitle: 'Сату кеңсесі және ресімдеу',
    officeHead: 'Бішкектегі бас сату кеңсесі:',
    workHours: '(Дс — Сб 09:00 – 19:00)',
    btnRoute2Gis: '2GIS арқылы бағыт',
  },
  uk: {
    home: 'Головна',
    terms: 'Умови купівлі',
    heroBadge: 'Фінансові програми забудовника',
    btnGetCalcWa: 'Отримати розрахунок у WhatsApp',
    btnLearnTerms: 'Вивчити умови',
    officialNotice: 'Офіційні умови девелопера',
    detailedDesc: 'Докладний опис',
    proposalCore: 'Суть пропозиції:',
    documentsPackage: 'Пакет документів:',
    noIncomeProof: 'Без довідок про доходи та поручителів',
    customSchedulePrompt: 'Бажаєте індивідуальний графік?',
    customScheduleSub: 'Розрахуємо за 2 хвилини у месенджері',
    btnWriteWa: 'Написати у WhatsApp',
    faqTitle: 'Часті запитання щодо програми:',
    consultantBadge: 'Консультація фінансиста',
    officeTitle: 'Офіс продажів та оформлення',
    officeHead: 'Центральний офіс у Бішкеку:',
    workHours: '(Пн — Сб 09:00 – 19:00)',
    btnRoute2Gis: 'Маршрут у 2GIS',
  },
  en: {
    home: 'Home',
    terms: 'Purchase Terms',
    heroBadge: 'Developer Financial Programs',
    btnGetCalcWa: 'Get Calculation via WhatsApp',
    btnLearnTerms: 'Review Terms',
    officialNotice: 'Official Developer Terms',
    detailedDesc: 'Detailed Description',
    proposalCore: 'Program Overview:',
    documentsPackage: 'Required Documents:',
    noIncomeProof: 'No proof of income or guarantors required',
    customSchedulePrompt: 'Need a customized schedule?',
    customScheduleSub: 'We will calculate it in 2 minutes via messenger',
    btnWriteWa: 'Chat on WhatsApp',
    faqTitle: 'Frequently Asked Questions:',
    consultantBadge: 'Financial Advisory',
    officeTitle: 'Sales & Registration Office',
    officeHead: 'Central Sales Office in Bishkek:',
    workHours: '(Mon — Sat 09:00 – 19:00)',
    btnRoute2Gis: 'Directions in 2GIS',
  },
  zh: {
    home: '首页',
    terms: '置业方案',
    heroBadge: '开发商自营置业金融方案',
    btnGetCalcWa: '在 WhatsApp 中测算方案',
    btnLearnTerms: '查看方案详情',
    officialNotice: '开发商官方置业条款',
    detailedDesc: '方案详细说明',
    proposalCore: '方案核心要义：',
    documentsPackage: '签约所需材料：',
    noIncomeProof: '无需收入证明与第三方担保',
    customSchedulePrompt: '需要量身定制还款周期？',
    customScheduleSub: '置业顾问将在2分钟内出具测算明细',
    btnWriteWa: '在 WhatsApp 中咨询',
    faqTitle: '常见疑问解答：',
    consultantBadge: '置业财务专属咨询',
    officeTitle: '品牌营销与签约中心',
    officeHead: '比什凯克营销中心地址：',
    workHours: '(周一至周六 09:00 – 19:00)',
    btnRoute2Gis: '2GIS 导航路线',
  },
};

const getPaymentTabs = (lang: Locale) => [
  {
    href: '/rassrochka',
    slug: 'rassrochka',
    label:
      lang === 'kg'
        ? '0% Бөлүп төлөө'
        : lang === 'kz'
        ? '0% Бөліп төлеу'
        : lang === 'uk'
        ? 'Розстрочка 0%'
        : lang === 'en'
        ? '0% Installment'
        : lang === 'zh'
        ? '0% 免息分期'
        : 'Рассрочка 0%',
  },
  {
    href: '/trade-in',
    slug: 'trade-in',
    label:
      lang === 'kg'
        ? 'Trade-in (Бартер)'
        : lang === 'kz'
        ? 'Trade-in (Бартер)'
        : lang === 'uk'
        ? 'Trade-in (Бартер)'
        : lang === 'en'
        ? 'Trade-in (Barter)'
        : lang === 'zh'
        ? '以旧换新 (Trade-in)'
        : 'Trade-in (Бартер)',
  },
  {
    href: '/polniy-raschet',
    slug: 'polniy-raschet',
    label:
      lang === 'kg'
        ? '100% төлөм'
        : lang === 'kz'
        ? '100% төлем'
        : lang === 'uk'
        ? '100% розрахунок'
        : lang === 'en'
        ? '100% Payment'
        : lang === 'zh'
        ? '100% 全款'
        : '100% расчет',
  },
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
  children,
}: PaymentLayoutProps) {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const ui = UI_STRINGS[currentLang] || UI_STRINGS.ru;
  const tabs = getPaymentTabs(currentLang);

  // По умолчанию первый вопрос открыт
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const getWaMessage = () => {
    switch (currentLang) {
      case 'kg':
        return `Саламатсызбы! EL ORDO GROUP компаниясындагы «${pageTitle}» төлөм программасы кызыктырып жатат. Сураныч, толук шарттарын жана эсебин айтып бериңизчи.`;
      case 'kz':
        return `Сәлеметсіз бе! EL ORDO GROUP компаниясының «${pageTitle}» төлеу бағдарламасы қызықтырады. Толық шарттары мен есебін айтып беріңізші.`;
      case 'uk':
        return `Доброго дня! Мене цікавить програма оплати «${pageTitle}» у компанії EL ORDO GROUP. Підкажіть, будь ласка, детальні умови та розрахунок.`;
      case 'en':
        return `Hello! I am interested in the "${pageTitle}" payment option at EL ORDO GROUP. Please provide detailed terms and calculations.`;
      case 'zh':
        return `您好！我对 EL ORDO GROUP 的“${pageTitle}”置业方案很感兴趣，请发送详细条款与付款测算。`;
      default:
        return `Здравствуйте! Меня интересует программа оплаты «${pageTitle}» в компании EL ORDO GROUP. Подскажите, пожалуйста, подробные условия и расчет.`;
    }
  };

  const waMessage = encodeURIComponent(getWaMessage());

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white dark:bg-[#0b1b15] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
            {ui.home}
          </Link>
          <span>/</span>
          <Link href="/usloviya" className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
            {ui.terms}
          </Link>
          <span>/</span>
          <span className="text-[#064734] dark:text-[#d4b26f] font-bold">{pageTitle}</span>
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
            {ui.heroBadge}
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-5 drop-shadow-xl">
            {heroTitle}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            {heroSubtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-7 py-3.5 rounded-xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <IconWhatsApp className="w-4 h-4 text-[#064734]" />
              <span>{ui.btnGetCalcWa}</span>
            </a>
            <a
              href="#details"
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-sm flex items-center gap-1.5"
            >
              <span>{ui.btnLearnTerms}</span>
              <svg className="w-3.5 h-3.5 text-[#d4b26f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Быстрое переключение способов оплаты */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-7 relative z-20">
        <div className="bg-white dark:bg-[#0b1b15] p-2 rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-white/10 flex items-center justify-center gap-2 overflow-x-auto scrollbar-none transition-colors">
          {tabs.map((tab) => {
            const isActive = currentSlug === tab.slug || pageTitle.toLowerCase().includes(tab.slug);
            return (
              <Link
                key={tab.slug}
                href={tab.href}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
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
          <div className="w-12 h-12 rounded-2xl bg-[#d4b26f]/20 border border-[#d4b26f]/30 flex items-center justify-center shrink-0 text-[#d4b26f]">
            <IconCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#d4b26f] block mb-1">
              {ui.officialNotice}
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
            {ui.detailedDesc}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase text-[#064734] dark:text-[#d4b26f]">
            {blockTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Левая колонка: описание и документы */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-[#0b1b15] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors">
              <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                {ui.proposalCore}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {descriptionText}
              </p>
            </div>

            {/* Карточка необходимых документов */}
            <div className="bg-[#f2f6f4] dark:bg-[#040c09] p-6 sm:p-8 rounded-3xl border border-[#064734]/15 dark:border-white/10 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <IconDocument className="w-5 h-5 text-[#064734] dark:text-[#d4b26f]" />
                <h3 className="text-sm font-black text-[#064734] dark:text-[#d4b26f] uppercase tracking-wider">
                  {ui.documentsPackage}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                {documentsText}
              </p>
              <div className="mt-4 pt-3 border-t border-[#064734]/10 dark:border-white/10 flex items-center gap-2 text-xs font-bold text-[#064734] dark:text-[#d4b26f]">
                <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f]" />
                <span>{ui.noIncomeProof}</span>
              </div>
            </div>

            {/* Быстрый переход в WhatsApp */}
            <div className="p-6 rounded-3xl bg-[#032b20] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
              <div>
                <h4 className="text-sm font-bold mb-1">{ui.customSchedulePrompt}</h4>
                <p className="text-xs text-gray-300">{ui.customScheduleSub}</p>
              </div>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-[#d4b26f] hover:bg-[#c49f57] text-[#064734] font-black px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{ui.btnWriteWa}</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Правая колонка: Раскрывающийся аккордеон */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4 px-1">
              {ui.faqTitle}
            </h3>

            {faqList.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0b1b15] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-none transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 dark:text-white hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <span className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[#064734] dark:text-[#d4b26f] shrink-0">
                      {isOpen ? (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/10 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Дополнительные интерактивные блоки страницы */}
      {children && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          {children}
        </section>
      )}

      {/* 6. Контакты и связь с офисом продаж */}
      <section className="bg-white dark:bg-[#07130e] border-t border-gray-100 dark:border-white/10 py-16 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
              {ui.consultantBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
              {ui.officeTitle}
            </h2>
          </div>

          <div className="bg-[#fafbfa] dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 transition-colors">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs text-gray-400 dark:text-neutral-400 font-bold uppercase tracking-wider block">
                {ui.officeHead}
              </span>
              <p className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
                {COMPANY_INFO.address}
              </p>
              <div className="space-y-1 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                {COMPANY_INFO.phones.map((phone, idx) => (
                  <p key={idx}>{phone} {idx === 0 ? ui.workHours : ''}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl bg-[#064734] hover:bg-[#032b20] dark:bg-[#064734] dark:hover:bg-[#095740] active:scale-95 text-white font-black text-xs uppercase tracking-wider text-center transition-all shadow flex items-center justify-center gap-2 border border-transparent dark:border-white/10 cursor-pointer"
              >
                <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                <span>{ui.btnWriteWa}</span>
              </a>
              <a
                href={COMPANY_INFO.gisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl border border-gray-300 dark:border-white/15 hover:border-[#064734] dark:hover:border-[#d4b26f] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 font-bold text-xs uppercase tracking-wider text-center transition-all bg-white dark:bg-[#040c09] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <IconMapPin className="w-4 h-4 text-[#064734] dark:text-[#d4b26f]" />
                <span>{ui.btnRoute2Gis}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}