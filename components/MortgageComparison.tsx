'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { COMPANY_INFO } from '@/lib/data';
import {
  IconCheck,
  IconShieldCheck,
  IconWhatsApp,
  IconArrowRight,
} from '@/components/Icons';

const STRINGS: Record<Locale, {
  badge: string;
  title: string;
  subtitle: string;
  sliderLabel: string;
  developerTitle: string;
  developerTag: string;
  bankTitle: string;
  bankTag: string;
  overpaymentLabel: string;
  docsLabel: string;
  docsDev: string;
  docsBank: string;
  incomeLabel: string;
  incomeDev: string;
  incomeBank: string;
  insuranceLabel: string;
  insuranceDev: string;
  insuranceBank: string;
  speedLabel: string;
  speedDev: string;
  speedBank: string;
  savingsTitle: string;
  savingsSub: string;
  btnWa: string;
}> = {
  ru: {
    badge: 'Честная экономия',
    title: 'Рассрочка 0% EL ORDO vs Ипотека в банке',
    subtitle: 'Посмотрите реальный расчет переплаты на цифрах — без банковских комиссий и скрытых процентов.',
    sliderLabel: 'Стоимость выбранной квартиры:',
    developerTitle: 'Рассрочка EL ORDO',
    developerTag: 'Прямой договор • Без банка',
    bankTitle: 'Ипотека в банках КР',
    bankTag: 'Коммерческая ставка 20%',
    overpaymentLabel: 'Переплата по процентам:',
    docsLabel: 'Необходимые документы:',
    docsDev: 'Только паспорт гражданина КР',
    docsBank: 'Справки о доходах, поручители, залог',
    incomeLabel: 'Подтверждение доходов:',
    incomeDev: 'Не требуется',
    incomeBank: 'Официальная справка + Соцфонд',
    insuranceLabel: 'Комиссии и страховки:',
    insuranceDev: '$0 (Без скрытых удержаний)',
    insuranceBank: '1–2% за выдачу + ежегодная страховка',
    speedLabel: 'Срок оформления:',
    speedDev: '1 день (оформление сразу в офисе)',
    speedBank: '2–4 недели (долгая проверка)',
    savingsTitle: 'Ваша чистая экономия:',
    savingsSub: 'остается в семейном бюджете на ремонт и мебель',
    btnWa: 'Зафиксировать рассрочку 0% без переплат',
  },
  kg: {
    badge: 'Чынчыл үнөмдөө',
    title: 'EL ORDO 0% бөлүп төлөөсү vs Банк ипотекасы',
    subtitle: 'Сандар аркылуу ашыкча төлөмдү салыштырыңыз — банктык комиссияларсыз жана жашыруун пайыздарсыз.',
    sliderLabel: 'Тандалган батирдин баасы:',
    developerTitle: 'EL ORDO бөлүп төлөөсү',
    developerTag: 'Түз келишим • Банксыз',
    bankTitle: 'КР банктарындагы ипотека',
    bankTag: 'Коммерциялык 20% үстөк',
    overpaymentLabel: 'Пайыздык ашыкча төлөм:',
    docsLabel: 'Керектүү документтер:',
    docsDev: 'КР жаранынын паспорту гана',
    docsBank: 'Киреше маалымкаты, кепилдер, күрөө',
    incomeLabel: 'Кирешени тастыктоо:',
    incomeDev: 'Талап кылынбайт',
    incomeBank: 'Расмий маалымкат + Соцфонд',
    insuranceLabel: 'Комиссиялар жана камсыздандыруу:',
    insuranceDev: '$0 (Жашыруун кармоолор жок)',
    insuranceBank: '1–2% насыя берүүгө + жылдык камсыздандыруу',
    speedLabel: 'Тариздөө мөөнөтү:',
    speedDev: '1 күн (түз кеңседен тариздөө)',
    speedBank: '2–4 жума (узак текшерүү)',
    savingsTitle: 'Сиздин таза үнөмдөөңүз:',
    savingsSub: 'оңдоп-түзөөгө жана эмеректерге үй-бүлөлүк бюджетте калат',
    btnWa: '0% үстөксүз бөлүп төлөөнү бекитүү',
  },
  kz: {
    badge: 'Адал үнемдеу',
    title: 'EL ORDO 0% бөліп төлеуі vs Банк ипотекасы',
    subtitle: 'Нақты сандармен артық төлемді салыстырыңыз — банк комиссиясынсыз және жасырын пайызсыз.',
    sliderLabel: 'Таңдалған пәтер құны:',
    developerTitle: 'EL ORDO бөліп төлеуі',
    developerTag: 'Тікелей шарт • Банксіз',
    bankTitle: 'ҚР банктеріндегі ипотека',
    bankTag: 'Коммерциялық 20% мөлшерлеме',
    overpaymentLabel: 'Пайыз бойынша артық төлем:',
    docsLabel: 'Қажетті құжаттар:',
    docsDev: 'Тек жеке куәлік / төлқұжат',
    docsBank: 'Кіріс туралы анықтама, кепілгерлер, кепілзат',
    incomeLabel: 'Кірісті растау:',
    incomeDev: 'Талап етілмейді',
    incomeBank: 'Ресми анықтама + Зейнетақы қоры',
    insuranceLabel: 'Комиссиялар мен сақтандыру:',
    insuranceDev: '$0 (Жасырын ұсталымдар жоқ)',
    insuranceBank: '1–2% беру үшін + жыл сайынғы сақтандыру',
    speedLabel: 'Ресімдеу мерзімі:',
    speedDev: '1 күн (тікелей кеңседе рәсімдеу)',
    speedBank: '2–4 апта (ұзақ тексеру)',
    savingsTitle: 'Сіздің таза үнемдеуіңіз:',
    savingsSub: 'жөндеу мен жиһазға отбасылық бюджетте қалады',
    btnWa: '0% үстемесіз бөліп төлеуді бекіту',
  },
  uk: {
    badge: 'Чесна економія',
    title: 'Розстрочка 0% EL ORDO vs Іпотека в банку',
    subtitle: 'Подивіться реальний розрахунок переплати у цифрах — без прихованих банківських відсотків.',
    sliderLabel: 'Вартість обраної квартири:',
    developerTitle: 'Розстрочка EL ORDO',
    developerTag: 'Прямий договір • Без банку',
    bankTitle: 'Іпотека в банках',
    bankTag: 'Комерційна ставка 20%',
    overpaymentLabel: 'Переплата за відсотками:',
    docsLabel: 'Необхідні документи:',
    docsDev: 'Тільки паспорт громадянина',
    docsBank: 'Довідки про доходи, поручителі, застава',
    incomeLabel: 'Підтвердження доходів:',
    incomeDev: 'Не вимагається',
    incomeBank: 'Офіційна довідка + Пенсійний фонд',
    insuranceLabel: 'Комісії та страхування:',
    insuranceDev: '$0 (Без прихованих платежів)',
    insuranceBank: '1–2% за видачу + щорічна страховка',
    speedLabel: 'Термін оформлення:',
    speedDev: '1 день (оформлення безпосередньо в офісі)',
    speedBank: '2–4 тижні (довга перевірка)',
    savingsTitle: 'Ваша чиста економія:',
    savingsSub: 'залишається у сімейному бюджеті на ремонт та меблі',
    btnWa: 'Зафіксувати розстрочку 0% без переплат',
  },
  en: {
    badge: 'Honest Savings',
    title: '0% Developer Installment vs Commercial Bank Mortgage',
    subtitle: 'See the true comparison in numbers — zero bank interest versus heavy compound loan fees.',
    sliderLabel: 'Selected apartment price:',
    developerTitle: 'EL ORDO Installment',
    developerTag: 'Direct Contract • No Bank',
    bankTitle: 'Commercial Bank Mortgage',
    bankTag: 'Average 20% APR',
    overpaymentLabel: 'Interest Overpayment:',
    docsLabel: 'Required Documents:',
    docsDev: 'National ID / Passport only',
    docsBank: 'Income proofs, guarantors, asset pledge',
    incomeLabel: 'Proof of Income:',
    incomeDev: 'Not required',
    incomeBank: 'Official payroll records & tax filings',
    insuranceLabel: 'Hidden Fees & Insurance:',
    insuranceDev: '$0 (Zero hidden charges)',
    insuranceBank: '1–2% origination fee + mandatory annual insurance',
    speedLabel: 'Approval Timeline:',
    speedDev: '1 day (direct office registration)',
    speedBank: '2–4 weeks (complex underwriting)',
    savingsTitle: 'Your Net Savings:',
    savingsSub: 'kept in your family savings for interior design & furnishings',
    btnWa: 'Lock In 0% Terms Without Bank Interest',
  },
  zh: {
    badge: '透明置业省钱之道',
    title: 'EL ORDO 0% 免息分期 vs 商业银行按揭贷款',
    subtitle: '用真实数据说话：开发商自营零利息与商业银行高额利息及手续费的全维度对比。',
    sliderLabel: '所选意向房源总价：',
    developerTitle: 'EL ORDO 免息分期',
    developerTag: '开发商直签 • 无银行中介',
    bankTitle: '商业银行购房按揭',
    bankTag: '平均商业年利率 20%',
    overpaymentLabel: '全程多缴利息总额：',
    docsLabel: '签约审核必备材料：',
    docsDev: '仅需出示有效个人身份证件',
    docsBank: '工作流水、收入证明、第三方担保人',
    incomeLabel: '收入流水与信用审核：',
    incomeDev: '完全免除',
    incomeBank: '严苛审核社保公积金及纳税记录',
    insuranceLabel: '附加手续费与保险：',
    insuranceDev: '$0（绝无任何隐藏附加费用）',
    insuranceBank: '1–2% 批贷手续费 + 强制性年度人身财产险',
    speedLabel: '合同办理审批时效：',
    speedDev: '最快当天即可在营销中心完成直签',
    speedBank: '通常需要 2–4 周漫长审核且存在拒贷风险',
    savingsTitle: '您将直接省下净资金：',
    savingsSub: '这笔巨款将完整保留在您的家庭账户，轻松涵盖全屋高阶装修与家电采购',
    btnWa: '立即通过 WhatsApp 锁定 0% 免息置业名额',
  },
};

export default function MortgageComparison({ usdRate = 87.45 }: { usdRate?: number }) {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const s = STRINGS[currentLang] || STRINGS.ru;

  // Интерактивная сумма для расчета
  const [price, setPrice] = useState<number>(65000);

  // Расчет переплаты в банке:
  // При ставке 20% годовых на остаток 70% от стоимости квартиры на 3 года:
  // Средняя переплата за 3 года составляет приблизительно 33% от суммы кредита
  const bankLoanPrincipal = price * 0.7;
  const bankOverpaymentUsd = Math.round(bankLoanPrincipal * 0.33);
  const bankOverpaymentKgs = Math.round(bankOverpaymentUsd * usdRate);

  const cleanWaNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';

  const waMessage =
    `Здравствуйте! Ознакомился со сравнением на сайте EL ORDO GROUP:\n\n` +
    `• Стоимость квартиры: $${price.toLocaleString('ru-RU')}\n` +
    `• Экономия на рассрочке 0%: $${bankOverpaymentUsd.toLocaleString('ru-RU')} (без процентов банка)\n` +
    `• Срок: 36 месяцев без справок о доходах\n\n` +
    `Подскажите, какие объекты сейчас доступны в эту стоимость под 0% рассрочку?`;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 my-20">
      <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-12 border border-gray-200 dark:border-white/10 shadow-xl transition-colors">
        
        {/* Заголовок блока */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {s.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f] tracking-tight">
            {s.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-2 leading-relaxed">
            {s.subtitle}
          </p>
        </div>

        {/* Интерактивный регулятор стоимости квартиры */}
        <div className="max-w-xl mx-auto mb-12 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {s.sliderLabel}
            </span>
            <strong className="text-lg font-black text-[#064734] dark:text-[#d4b26f]">
              ${price.toLocaleString('ru-RU')}
            </strong>
          </div>
          <input
            type="range"
            min="35000"
            max="180000"
            step="5000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full h-2.5 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#064734] dark:accent-[#d4b26f]"
          />
          <div className="flex justify-between text-[10px] text-gray-400 dark:text-neutral-500 font-semibold mt-1.5">
            <span>$35 000</span>
            <span>$65 000</span>
            <span>$100 000</span>
            <span>$180 000</span>
          </div>
        </div>

        {/* Сравнение карточек бок о бок */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-10">
          
          {/* 1. Карточка EL ORDO (ПОБЕДИТЕЛЬ) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#064734] text-white border-2 border-[#d4b26f] shadow-2xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 right-6 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3.5 py-1 rounded-full shadow">
              {s.developerTag}
            </div>

            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#d4b26f]/20 text-[#d4b26f] flex items-center justify-center mb-4">
                <IconShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-black tracking-tight mb-4">
                {s.developerTitle}
              </h3>

              {/* Главная цифра переплаты */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 mb-6">
                <span className="text-[11px] text-gray-300 block mb-0.5">
                  {s.overpaymentLabel}
                </span>
                <strong className="text-3xl font-black text-[#d4b26f]">
                  $0
                </strong>
                <span className="text-[11px] text-emerald-400 font-bold block mt-1">
                  ✓ Честная ставка 0% без скрытых условий
                </span>
              </div>

              {/* Список условий */}
              <ul className="space-y-3.5 text-xs">
                <li className="flex items-start gap-2.5">
                  <IconCheck className="w-4 h-4 text-[#d4b26f] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-300 block text-[10px] uppercase font-bold">{s.docsLabel}</span>
                    <strong className="text-white">{s.docsDev}</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <IconCheck className="w-4 h-4 text-[#d4b26f] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-300 block text-[10px] uppercase font-bold">{s.incomeLabel}</span>
                    <strong className="text-white">{s.incomeDev}</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <IconCheck className="w-4 h-4 text-[#d4b26f] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-300 block text-[10px] uppercase font-bold">{s.insuranceLabel}</span>
                    <strong className="text-white">{s.insuranceDev}</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <IconCheck className="w-4 h-4 text-[#d4b26f] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-300 block text-[10px] uppercase font-bold">{s.speedLabel}</span>
                    <strong className="text-white">{s.speedDev}</strong>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Карточка Банка */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-100 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider block mb-1">
                {s.bankTag}
              </span>
              <h3 className="text-xl font-black tracking-tight mb-4 text-gray-800 dark:text-gray-200">
                {s.bankTitle}
              </h3>

              {/* Переплата в банке */}
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 mb-6">
                <span className="text-[11px] text-gray-500 dark:text-neutral-400 block mb-0.5">
                  {s.overpaymentLabel}
                </span>
                <strong className="text-3xl font-black text-rose-600 dark:text-rose-400">
                  +${bankOverpaymentUsd.toLocaleString('ru-RU')}
                </strong>
                <span className="text-[11px] text-rose-700 dark:text-rose-400/90 font-medium block mt-1">
                  ≈ +{bankOverpaymentKgs.toLocaleString('ru-RU')} сом просто за проценты
                </span>
              </div>

              {/* Список условий банка */}
              <ul className="space-y-3.5 text-xs text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                  <div>
                    <span className="text-gray-400 dark:text-neutral-500 block text-[10px] uppercase font-bold">{s.docsLabel}</span>
                    <span>{s.docsBank}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                  <div>
                    <span className="text-gray-400 dark:text-neutral-500 block text-[10px] uppercase font-bold">{s.incomeLabel}</span>
                    <span>{s.incomeBank}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                  <div>
                    <span className="text-gray-400 dark:text-neutral-500 block text-[10px] uppercase font-bold">{s.insuranceLabel}</span>
                    <span>{s.insuranceBank}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                  <div>
                    <span className="text-gray-400 dark:text-neutral-500 block text-[10px] uppercase font-bold">{s.speedLabel}</span>
                    <span>{s.speedBank}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Финальная плашка чистой экономии */}
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 dark:bg-[#071912] border-2 border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 dark:text-emerald-400 block mb-1">
              {s.savingsTitle}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#064734] dark:text-[#d4b26f]">
              ${bankOverpaymentUsd.toLocaleString('ru-RU')}{' '}
              <span className="text-lg font-bold text-gray-500 dark:text-neutral-400">
                (≈ {bankOverpaymentKgs.toLocaleString('ru-RU')} сом)
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-neutral-300 mt-1">
              {s.savingsSub}
            </p>
          </div>

          <a
            href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto shrink-0 bg-[#064734] hover:bg-[#032b20] active:scale-95 text-[#d4b26f] hover:text-white dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] dark:text-[#064734] font-black px-8 py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <IconWhatsApp className="w-4 h-4 text-[#25D366] dark:text-[#064734]" />
            <span>{s.btnWa}</span>
            <IconArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}