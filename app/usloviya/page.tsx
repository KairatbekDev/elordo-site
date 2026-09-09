'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import {
  IconCheck,
  IconCar,
  IconBuilding,
  IconDiamond,
  IconCalendar,
  IconWhatsApp,
  IconArrowRight,
} from '@/components/Icons';

export default function PurchaseTermsPage() {
  const { t, locale } = useLanguage();

  const isKg = locale === 'kg';
  const isEn = locale === 'en';

  // Состояние калькулятора рассрочки
  const [apartmentPrice, setApartmentPrice] = useState<number>(65000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [months, setMonths] = useState<number>(36);

  // Состояние Trade-in калькулятора
  const [tradeInType, setTradeInType] = useState<'auto' | 'realty'>('auto');
  const [assetName, setAssetName] = useState<string>('');
  const [assetYear, setAssetYear] = useState<string>('');
  const [estimatedValue, setEstimatedValue] = useState<string>('');

  // Состояние FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Расчеты рассрочки
  const usdToKgs = 87.5;
  const downPaymentAmount = Math.round((apartmentPrice * downPaymentPercent) / 100);
  const remainingAmount = apartmentPrice - downPaymentAmount;
  const monthlyPayment = months > 0 ? Math.round(remainingAmount / months) : 0;
  const monthlyPaymentKgs = Math.round(monthlyPayment * usdToKgs);

  const rateDisclaimer = isKg
    ? '* Эсептөө болжолдуу мүнөзгө ээ. Сом түрүндөгү суммалар келишим түзүлгөн жана төлөм жүргүзүлгөн күнү Улуттук банктын (УБ) расмий курсу боюнча такталат.'
    : isEn
    ? '* Calculations are indicative. Exact amounts in Kyrgyz Som (KGS) are determined based on the official NBKR exchange rate on the date of contract signing and payment.'
    : '* Расчет носит предварительный характер. Точная сумма в национальной валюте (сом) фиксируется по учетному курсу НБКР на день заключения договора и внесения платежа.';

  const handleSendCalculation = () => {
    const text =
      `${t.termsPage.waCalcGreeting}\n\n` +
      `• ${t.termsPage.waCalcPrice} $${apartmentPrice.toLocaleString()}\n` +
      `• ${t.termsPage.waCalcDown} (${downPaymentPercent}%): $${downPaymentAmount.toLocaleString()} (~${Math.round(downPaymentAmount * usdToKgs).toLocaleString()} ${t.termsPage.somUnit})\n` +
      `• ${t.termsPage.waCalcTerm} ${months} ${t.termsPage.calcMonths}\n` +
      `• ${t.termsPage.waCalcMonthly} $${monthlyPayment.toLocaleString()}${t.termsPage.calcPerMonth} (~${monthlyPaymentKgs.toLocaleString()} ${t.termsPage.calcSomPerMonth})\n\n` +
      `${t.termsPage.waCalcQuestion}`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendTradeIn = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel = tradeInType === 'auto' ? t.termsPage.waTradeAutoLabel : t.termsPage.waTradeRealtyLabel;
    const text =
      `${t.termsPage.waTradeGreeting}\n\n` +
      `• ${t.termsPage.waTradeType} ${typeLabel}\n` +
      `• ${t.termsPage.waTradeDesc} ${assetName || '—'}\n` +
      (tradeInType === 'auto' && assetYear ? `• ${t.termsPage.waTradeYear} ${assetYear}\n` : '') +
      `• ${t.termsPage.waTradeValue} $${estimatedValue || '—'}\n\n` +
      `${t.termsPage.waTradeQuestion}`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const faqs = [
    {
      q: t.termsPage.faq1Q,
      a: t.termsPage.faq1A,
    },
    {
      q: t.termsPage.faq2Q,
      a: t.termsPage.faq2A,
    },
    {
      q: t.termsPage.faq3Q,
      a: t.termsPage.faq3A,
    },
    {
      q: t.termsPage.faq4Q,
      a: t.termsPage.faq4A,
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 pb-24 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white dark:bg-[#0b1b15] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
            {t.common.home}
          </Link>
          <span>/</span>
          <span className="text-[#064734] dark:text-[#d4b26f] font-bold">{t.header.terms}</span>
        </div>
      </div>

      {/* 2. Hero-секция */}
      <section className="bg-[#064734] text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {t.termsPage.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            {t.termsPage.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            {t.termsPage.heroDesc}
          </p>
        </div>
      </section>

      {/* 3. Карточки программ покупки */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Рассрочка 0% */}
          <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-8 shadow-lg dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col justify-between hover:shadow-xl dark:hover:border-[#064734]/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center text-lg mb-5 font-black">
                <IconCalendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2">
                {t.termsPage.card1Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {t.termsPage.card1Desc}
              </p>
              <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card1Bullet1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card1Bullet2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card1Bullet3}</span>
                </li>
              </ul>
            </div>
            <a
              href="#calculator"
              className="mt-6 text-center bg-[#064734] hover:bg-[#032b20] dark:bg-[#064734] dark:hover:bg-[#095740] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5 border border-transparent dark:border-white/10"
            >
              <span>{t.termsPage.card1Btn}</span>
              <svg className="w-3.5 h-3.5 text-[#d4b26f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Trade-in / Бартер */}
          <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-8 shadow-xl dark:shadow-none border-2 border-[#d4b26f] flex flex-col justify-between relative hover:shadow-2xl transition-shadow">
            <div className="absolute -top-3 right-6 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
              {t.termsPage.card2Badge}
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4b26f]/20 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center mb-5">
                <IconCar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2">
                {t.termsPage.card2Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {t.termsPage.card2Desc}
              </p>
              <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card2Bullet1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card2Bullet2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card2Bullet3}</span>
                </li>
              </ul>
            </div>
            <a
              href="#trade-in"
              className="mt-6 text-center bg-[#d4b26f] hover:bg-[#c49f57] text-[#064734] font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <span>{t.termsPage.card2Btn}</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* 100% расчет */}
          <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-8 shadow-lg dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col justify-between hover:shadow-xl dark:hover:border-[#064734]/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center mb-5">
                <IconDiamond className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2">
                {t.termsPage.card3Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {t.termsPage.card3Desc}
              </p>
              <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card3Bullet1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card3Bullet2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0" />
                  <span>{t.termsPage.card3Bullet3}</span>
                </li>
              </ul>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(t.termsPage.waFullPaymentText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-center bg-[#064734] hover:bg-[#032b20] dark:bg-[#064734] dark:hover:bg-[#095740] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5 border border-transparent dark:border-white/10"
            >
              <span>{t.termsPage.card3Btn}</span>
              <IconArrowRight className="w-3.5 h-3.5 text-[#d4b26f]" />
            </a>
          </div>

        </div>
      </div>

      {/* 4. Интерактивный калькулятор рассрочки */}
      <section id="calculator" className="max-w-5xl mx-auto px-4 sm:px-6 mt-20 scroll-mt-24">
        <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-12 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none transition-colors">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-1">
              {t.termsPage.calcBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
              {t.termsPage.calcTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-2">
              {t.termsPage.calcDesc}
            </p>
          </div>

          <div className="space-y-8">
            {/* Параметр 1: Стоимость квартиры */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-gray-600 dark:text-gray-300">
                  {t.termsPage.calcPriceLabel}
                </span>
                <div className="text-right">
                  <span className="text-xl font-black text-[#064734] dark:text-[#d4b26f]">
                    ${apartmentPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-neutral-500 block">
                    ≈ {Math.round(apartmentPrice * usdToKgs).toLocaleString()} {t.termsPage.somUnit}
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="35000"
                max="250000"
                step="1000"
                value={apartmentPrice}
                onChange={(e) => setApartmentPrice(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#064734] dark:accent-[#d4b26f]"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {[45000, 65000, 95000, 140000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setApartmentPrice(preset)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      apartmentPrice === preset
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734]'
                        : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    ${preset / 1000}k
                  </button>
                ))}
              </div>
            </div>

            {/* Параметр 2: Первоначальный взнос */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-gray-600 dark:text-gray-300">
                  {t.termsPage.calcDownLabel} ({downPaymentPercent}%):
                </span>
                <div className="text-right">
                  <span className="text-xl font-black text-[#064734] dark:text-[#d4b26f]">
                    ${downPaymentAmount.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-neutral-500 block">
                    ≈ {Math.round(downPaymentAmount * usdToKgs).toLocaleString()} {t.termsPage.somUnit}
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="20"
                max="60"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#064734] dark:accent-[#d4b26f]"
              />
              <div className="flex gap-2 mt-3">
                {[20, 30, 40, 50].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPercent(pct)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      downPaymentPercent === pct
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734]'
                        : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {pct}% {pct === 20 ? t.termsPage.calcMinBadge : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Параметр 3: Срок рассрочки */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-gray-600 dark:text-gray-300">
                  {t.termsPage.calcTermLabel}
                </span>
                <span className="text-xl font-black text-[#064734] dark:text-[#d4b26f]">
                  {months} {t.termsPage.calcMonths} ({Number((months / 12).toFixed(1))} {t.termsPage.calcYears})
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="40"
                step="1"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#064734] dark:accent-[#d4b26f]"
              />
              <div className="flex gap-2 mt-3">
                {[12, 24, 36, 40].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      months === m
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734]'
                        : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {m} {t.termsPage.calcMonths} {m === 40 ? t.termsPage.calcMaxBadge : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Итоговая панель расчета с дисклеймером курса НБКР */}
            <div className="bg-[#f2f6f4] dark:bg-[#040c09] rounded-3xl p-6 sm:p-8 border border-[#064734]/15 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
              <div className="max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 block mb-1">
                  {t.termsPage.calcMonthlyLabel}
                </span>
                <div className="text-3xl sm:text-5xl font-black text-[#064734] dark:text-[#d4b26f]">
                  ${monthlyPayment.toLocaleString()}
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-2">{t.termsPage.calcPerMonth}</span>
                </div>
                <div className="text-sm font-semibold text-[#064734]/80 dark:text-neutral-300 mt-1">
                  ≈ {monthlyPaymentKgs.toLocaleString()} {t.termsPage.calcSomPerMonth}
                </div>
                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-2 font-medium">
                  {t.termsPage.calcRemaining} ${remainingAmount.toLocaleString()} • {t.termsPage.calcNoBankFee}
                </p>

                {/* Официальный дисклеймер НБКР */}
                <p className="text-[11px] text-gray-500 dark:text-neutral-400/90 mt-3 pt-3 border-t border-gray-200 dark:border-white/10 leading-relaxed italic">
                  {rateDisclaimer}
                </p>
              </div>

              <button
                type="button"
                onClick={handleSendCalculation}
                className="w-full md:w-auto shrink-0 bg-[#064734] hover:bg-[#032b20] active:scale-95 text-[#d4b26f] hover:text-white font-black px-8 py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                <span>{t.termsPage.calcWaBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trade-in / Экспресс-оценка */}
      <section id="trade-in" className="max-w-5xl mx-auto px-4 sm:px-6 mt-20 scroll-mt-24">
        <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-12 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-colors">
          
          <div className="lg:col-span-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
              {t.termsPage.tradeInBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f] mb-4">
              {t.termsPage.tradeInTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {t.termsPage.tradeInDesc}
            </p>

            <div className="space-y-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] flex items-center justify-center text-[10px] font-bold">1</span>
                <span>{t.termsPage.step1}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] flex items-center justify-center text-[10px] font-bold">2</span>
                <span>{t.termsPage.step2}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] flex items-center justify-center text-[10px] font-bold">3</span>
                <span>{t.termsPage.step3}</span>
              </div>
            </div>
          </div>

          {/* Форма быстрой оценки */}
          <div className="lg:col-span-6 bg-[#f7faf8] dark:bg-[#040c09] p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-white/10 transition-colors">
            <h3 className="text-sm font-black uppercase text-gray-900 dark:text-white mb-4">
              {t.termsPage.formTitle}
            </h3>

            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setTradeInType('auto')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  tradeInType === 'auto'
                    ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow'
                    : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                }`}
              >
                <IconCar className="w-4 h-4" />
                <span>{t.termsPage.tabAuto}</span>
              </button>
              <button
                type="button"
                onClick={() => setTradeInType('realty')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  tradeInType === 'realty'
                    ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow'
                    : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10'
                }`}
              >
                <IconBuilding className="w-4 h-4" />
                <span>{t.termsPage.tabRealty}</span>
              </button>
            </div>

            <form onSubmit={handleSendTradeIn} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                  {tradeInType === 'auto' ? t.termsPage.labelAutoModel : t.termsPage.labelRealtyAddress}
                </label>
                <input
                  type="text"
                  required
                  placeholder={tradeInType === 'auto' ? t.termsPage.phAutoModel : t.termsPage.phRealtyAddress}
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f]"
                />
              </div>

              {tradeInType === 'auto' && (
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                    {t.termsPage.labelYear}
                  </label>
                  <input
                    type="text"
                    placeholder={t.termsPage.phYear}
                    value={assetYear}
                    onChange={(e) => setAssetYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f]"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                  {t.termsPage.labelEstimated}
                </label>
                <input
                  type="text"
                  placeholder={t.termsPage.phEstimated}
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0b1b15] border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#064734] dark:focus:border-[#d4b26f]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#d4b26f] hover:bg-[#c49f57] text-[#064734] font-black py-3 rounded-xl uppercase tracking-wider transition-all shadow text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{t.termsPage.btnTradeInSubmit}</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 6. Сравнительная таблица способов оплаты */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-20">
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-center text-[#064734] dark:text-[#d4b26f] mb-8">
          {t.termsPage.tableTitle}
        </h2>

        <div className="overflow-x-auto bg-white dark:bg-[#0b1b15] rounded-3xl border border-gray-200 dark:border-white/10 shadow-md dark:shadow-none transition-colors">
          <table className="w-full text-left text-xs border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#064734] dark:bg-[#021c15] text-white">
                <th className="p-4 sm:p-5 font-bold">{t.termsPage.colParam}</th>
                <th className="p-4 sm:p-5 font-bold">{t.termsPage.colInstallment}</th>
                <th className="p-4 sm:p-5 font-bold">{t.termsPage.colTradeIn}</th>
                <th className="p-4 sm:p-5 font-bold">{t.termsPage.colFull}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10 text-gray-700 dark:text-gray-300">
              <tr>
                <td className="p-4 font-bold text-gray-900 dark:text-white">{t.termsPage.row1Param}</td>
                <td className="p-4">{t.termsPage.row1Inst}</td>
                <td className="p-4">{t.termsPage.row1Trade}</td>
                <td className="p-4">{t.termsPage.row1Full}</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-white/[0.02]">
                <td className="p-4 font-bold text-gray-900 dark:text-white">{t.termsPage.row2Param}</td>
                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">{t.termsPage.row2Inst}</td>
                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">{t.termsPage.row2Trade}</td>
                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">{t.termsPage.row2Full}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900 dark:text-white">{t.termsPage.row3Param}</td>
                <td className="p-4">{t.termsPage.row3Inst}</td>
                <td className="p-4">{t.termsPage.row3Trade}</td>
                <td className="p-4">{t.termsPage.row3Full}</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-white/[0.02]">
                <td className="p-4 font-bold text-gray-900 dark:text-white">{t.termsPage.row4Param}</td>
                <td className="p-4">{t.termsPage.row4Inst}</td>
                <td className="p-4">{t.termsPage.row4Trade}</td>
                <td className="p-4">{t.termsPage.row4Full}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900 dark:text-white">{t.termsPage.row5Param}</td>
                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">{t.termsPage.row5Inst}</td>
                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">{t.termsPage.row5Trade}</td>
                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">{t.termsPage.row5Full}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Вопросы и ответы (FAQ Accordion) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-1">
            {t.termsPage.faqBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] dark:text-[#d4b26f]">
            {t.termsPage.faqTitle}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#0b1b15] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 dark:text-white hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
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
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Консультация юриста и менеджера */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-20">
        <div className="bg-[#032b20] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4b26f] block mb-2">
              {t.termsPage.bannerBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase mb-3">
              {t.termsPage.bannerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              {t.termsPage.bannerDesc}
            </p>
          </div>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
              'Здравствуйте! Хочу получить консультацию по условиям покупки и рассрочки в EL ORDO GROUP.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#d4b26f] hover:bg-[#c49f57] text-[#064734] font-black px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <IconWhatsApp className="w-4 h-4 text-[#064734]" />
            <span>{t.termsPage.bannerBtn}</span>
          </a>
        </div>
      </section>

    </main>
  );
}