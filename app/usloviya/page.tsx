'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PurchaseTermsPage() {
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

  const handleSendCalculation = () => {
    const text =
      `Здравствуйте! Рассчитал условия рассрочки на сайте EL ORDO:\n\n` +
      `💵 Стоимость квартиры: $${apartmentPrice.toLocaleString()}\n` +
      `💰 Первоначальный взнос (${downPaymentPercent}%): $${downPaymentAmount.toLocaleString()} (~${Math.round(downPaymentAmount * usdToKgs).toLocaleString()} сом)\n` +
      `🗓️ Срок рассрочки: ${months} мес.\n` +
      `📌 Ежемесячный платеж: $${monthlyPayment.toLocaleString()}/мес. (~${monthlyPaymentKgs.toLocaleString()} сом)\n\n` +
      `Подскажите, какие объекты и этажи доступны под этот расчет?`;

    window.open(`https://wa.me/996709115115?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendTradeIn = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel = tradeInType === 'auto' ? 'Автомобиль' : 'Вторичная недвижимость';
    const text =
      `Здравствуйте! Хочу оценить объект по программе Trade-in в EL ORDO GROUP:\n\n` +
      `📌 Тип: ${typeLabel}\n` +
      `🏷️ Модель / Описание: ${assetName || 'Не указано'}\n` +
      (tradeInType === 'auto' && assetYear ? `📅 Год выпуска: ${assetYear}\n` : '') +
      `💵 Желаемая оценка: $${estimatedValue || 'Требуется оценка'}\n\n` +
      `Подскажите, как пройти процедуру оценки для зачета в первый взнос?`;

    window.open(`https://wa.me/996709115115?text=${encodeURIComponent(text)}`, '_blank');
  };

  const faqs = [
    {
      q: 'Нужна ли справка о доходах с места работы?',
      a: 'Нет. Внутренняя рассрочка от застройщика оформляется без участия коммерческих банков. Для заключения договора требуется только паспорт гражданина КР (ID-карта или загранпаспорт).',
    },
    {
      q: 'Можно ли погасить рассрочку досрочно?',
      a: 'Да, вы можете закрыть остаток суммы досрочно в любой момент. Никаких скрытых комиссий, штрафов или дополнительных переплат за досрочное погашение не предусмотрено.',
    },
    {
      q: 'Как оценивается автомобиль или недвижимость по Trade-in?',
      a: 'Наш специалист по оценке выезжает на осмотр или запрашивает данные по автомобилю/объекту. Оценка формируется по честной рыночной стоимости за 24 часа и засчитывается в качестве первоначального взноса.',
    },
    {
      q: 'Как юридически закрепляется сделка?',
      a: 'С каждым дольщиком заключается официальный Договор долевого участия (ДДУ), проходящий регистрацию в строгом соответствии с действующим законодательством Кыргызской Республики.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafbfa] text-gray-900 pb-24">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link href="/" className="hover:text-[#064734] transition-colors">
            Главная
          </Link>
          <span>/</span>
          <span className="text-[#064734] font-semibold">Условия покупки</span>
        </div>
      </div>

      {/* 2. Заголовок */}
      <section className="bg-[#064734] text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            ПРОЗРАЧНЫЕ И ВЫГОДНЫЕ УСЛОВИЯ
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide mb-4">
            КАК КУПИТЬ КВАРТИРУ В EL ORDO
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Прямая покупка от застройщика без банковских процентов. Беспроцентная рассрочка до 40 месяцев, зачет авто и недвижимости по Trade-in и персональные графики платежей.
          </p>
        </div>
      </section>

      {/* 3. Карточки программ покупки */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Рассрочка 0% */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-xl mb-4 font-black">
                0%
              </div>
              <h3 className="text-xl font-black text-gray-950 mb-2">
                Рассрочка до 40 мес.
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Беспроцентная программа напрямую от застройщика без скрытых банковских страховок и переплат.
              </p>
              <ul className="space-y-2.5 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Взнос от 20% до 50%
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Гибкий график (ежемесячно / ежеквартально)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Оформление по паспорту
                </li>
              </ul>
            </div>
            <a
              href="#calculator"
              className="mt-6 block text-center bg-[#064734] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-[#032b20] transition-colors shadow-sm"
            >
              Рассчитать график платежей ↓
            </a>
          </div>

          {/* Trade-in / Бартер */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#d4b26f] flex flex-col justify-between relative hover:shadow-2xl transition-shadow">
            <div className="absolute -top-3 right-6 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
              Хит продаж
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4b26f]/20 text-2xl flex items-center justify-center mb-4">
                🚗
              </div>
              <h3 className="text-xl font-black text-gray-950 mb-2">
                Бартер / Trade-in
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Обменяйте автомобиль или вторичное жилье в счет первого взноса за квартиру в новостройке.
              </p>
              <ul className="space-y-2.5 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Оценка объекта за 24 часа
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Справедливая рыночная цена
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Полное юридическое сопровождение
                </li>
              </ul>
            </div>
            <a
              href="#trade-in"
              className="mt-6 block text-center bg-[#d4b26f] text-[#064734] font-black py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-[#c49f57] transition-colors shadow-md"
            >
              Оценить объект онлайн ↓
            </a>
          </div>

          {/* 100% расчет */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-xl mb-4 font-black">
                100%
              </div>
              <h3 className="text-xl font-black text-gray-950 mb-2">
                Полный расчет
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Максимальная финансовая выгода и специальные ценовые преференции при единовременной оплате.
              </p>
              <ul className="space-y-2.5 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Индивидуальная скидка на м²
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Приоритетный выбор видовых этажей
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Быстрая регистрация ДДУ
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8c%20%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%20%D1%81%D0%BA%D0%B8%D0%B4%D0%BA%D0%B8%20%D0%BF%D1%80%D0%B8%20100%25%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B5"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-center bg-[#064734] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-[#032b20] transition-colors shadow-sm"
            >
              Узнать размер скидки →
            </a>
          </div>

        </div>
      </div>

      {/* 4. Интерактивный калькулятор рассрочки с кнопками-пресетами */}
      <section id="calculator" className="max-w-5xl mx-auto px-6 mt-20 scroll-mt-24">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-1">
              Финансовый калькулятор 0%
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
              Расчет ежемесячного платежа
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Используйте ползунки или готовые кнопки для расчета комфортного взноса под ваш бюджет.
            </p>
          </div>

          <div className="space-y-8">
            {/* Параметр 1: Стоимость квартиры */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-gray-600">
                  Стоимость квартиры:
                </span>
                <div className="text-right">
                  <span className="text-xl font-black text-[#064734]">
                    ${apartmentPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400 block">
                    ≈ {Math.round(apartmentPrice * usdToKgs).toLocaleString()} сом
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
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#064734]"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {[45000, 65000, 95000, 140000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setApartmentPrice(preset)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      apartmentPrice === preset
                        ? 'bg-[#064734] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
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
                <span className="text-xs font-bold uppercase text-gray-600">
                  Первоначальный взнос ({downPaymentPercent}%):
                </span>
                <div className="text-right">
                  <span className="text-xl font-black text-[#064734]">
                    ${downPaymentAmount.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400 block">
                    ≈ {Math.round(downPaymentAmount * usdToKgs).toLocaleString()} сом
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
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#064734]"
              />
              <div className="flex gap-2 mt-3">
                {[20, 30, 40, 50].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPercent(pct)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      downPaymentPercent === pct
                        ? 'bg-[#064734] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {pct}% {pct === 20 ? '(мин.)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Параметр 3: Срок рассрочки */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-gray-600">
                  Срок выплат:
                </span>
                <span className="text-xl font-black text-[#064734]">
                  {months} месяцев ({Number((months / 12).toFixed(1))} года)
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="40"
                step="1"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#064734]"
              />
              <div className="flex gap-2 mt-3">
                {[12, 24, 36, 40].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      months === m
                        ? 'bg-[#064734] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {m} мес. {m === 40 ? '(макс.)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Итоговая панель расчета */}
            <div className="bg-[#f2f6f4] rounded-3xl p-6 sm:p-8 border border-[#064734]/15 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Ежемесячный платёж (0% переплат):
                </span>
                <div className="text-3xl sm:text-5xl font-black text-[#064734]">
                  ${monthlyPayment.toLocaleString()}
                  <span className="text-sm font-bold text-gray-600 ml-2">/ месяц</span>
                </div>
                <div className="text-sm font-semibold text-[#064734]/80 mt-1">
                  ≈ {monthlyPaymentKgs.toLocaleString()} сом в месяц
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Остаток к распределению: ${remainingAmount.toLocaleString()} • Без комиссии банка
                </p>
              </div>

              <button
                type="button"
                onClick={handleSendCalculation}
                className="w-full md:w-auto shrink-0 bg-[#064734] hover:bg-[#032b20] active:scale-95 text-[#d4b26f] hover:text-white font-black px-8 py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>💬</span>
                <span>Зафиксировать расчет в WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trade-in / Онлайн-заявка на оценку объекта */}
      <section id="trade-in" className="max-w-5xl mx-auto px-6 mt-20 scroll-mt-24">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
              Программа Trade-in
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] mb-4">
              Обменяйте авто или вторичку на новостройку
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              Вам не нужно тратить месяцы на продажу машины или старой квартиры. Мы оцениваем ваш актив по справедливой рыночной стоимости и засчитываем его в качестве оплаты квартиры в любом нашем ЖК.
            </p>

            <div className="space-y-3 text-xs font-semibold text-gray-700">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#064734] text-white flex items-center justify-center text-[10px]">1</span>
                <span>Оценка экспертом в течение 24 часов</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#064734] text-white flex items-center justify-center text-[10px]">2</span>
                <span>Сумма зачитывается как первый взнос или полная оплата</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#064734] text-white flex items-center justify-center text-[10px]">3</span>
                <span>Юридически чистый договор без скрытых удержаний</span>
              </div>
            </div>
          </div>

          {/* Форма быстрой оценки */}
          <div className="lg:col-span-6 bg-[#f7faf8] p-6 sm:p-8 rounded-2xl border border-gray-200">
            <h3 className="text-sm font-black uppercase text-gray-900 mb-4">
              Заявка на экспресс-оценку:
            </h3>

            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setTradeInType('auto')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  tradeInType === 'auto'
                    ? 'bg-[#064734] text-white shadow'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                🚗 Автомобиль
              </button>
              <button
                type="button"
                onClick={() => setTradeInType('realty')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  tradeInType === 'realty'
                    ? 'bg-[#064734] text-white shadow'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                🏢 Недвижимость
              </button>
            </div>

            <form onSubmit={handleSendTradeIn} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  {tradeInType === 'auto' ? 'Марка и модель авто:' : 'Адрес и площадь недвижимости:'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={tradeInType === 'auto' ? 'Например: Toyota Camry 70' : 'Например: 2-комн., 54 м², мкр. Асанбай'}
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 focus:outline-none focus:border-[#064734]"
                />
              </div>

              {tradeInType === 'auto' && (
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Год выпуска:</label>
                  <input
                    type="text"
                    placeholder="Например: 2021"
                    value={assetYear}
                    onChange={(e) => setAssetYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 focus:outline-none focus:border-[#064734]"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-600 font-medium mb-1">Желаемая сумма оценки ($):</label>
                <input
                  type="text"
                  placeholder="Например: $25 000"
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 focus:outline-none focus:border-[#064734]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#d4b26f] hover:bg-[#c49f57] text-[#064734] font-black py-3 rounded-xl uppercase tracking-wider transition-all shadow text-xs"
              >
                Отправить на оценку в WhatsApp →
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 6. Сравнительная таблица способов оплаты */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-center text-[#064734] mb-8">
          Сравнение условий покупки
        </h2>

        <div className="overflow-x-auto bg-white rounded-3xl border border-gray-200 shadow-md">
          <table className="w-full text-left text-xs border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#064734] text-white">
                <th className="p-4 sm:p-5 font-bold">Параметр</th>
                <th className="p-4 sm:p-5 font-bold">Рассрочка 0%</th>
                <th className="p-4 sm:p-5 font-bold">Trade-in (Бартер)</th>
                <th className="p-4 sm:p-5 font-bold">100% Оплата</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="p-4 font-bold text-gray-900">Первый взнос</td>
                <td className="p-4">От 20% до 30%</td>
                <td className="p-4">Авто или недвижимость</td>
                <td className="p-4">100% единовременно</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="p-4 font-bold text-gray-900">Переплата / Проценты</td>
                <td className="p-4 text-emerald-700 font-bold">0% (Без переплат)</td>
                <td className="p-4 text-emerald-700 font-bold">0% (Без переплат)</td>
                <td className="p-4 text-emerald-700 font-bold">Макс. скидка</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900">Срок выплаты</td>
                <td className="p-4">До 40 месяцев</td>
                <td className="p-4">До 40 месяцев (на остаток)</td>
                <td className="p-4">Сразу</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="p-4 font-bold text-gray-900">Необходимые документы</td>
                <td className="p-4">Только паспорт</td>
                <td className="p-4">Паспорт + техпаспорт авто/жилья</td>
                <td className="p-4">Только паспорт</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900">Справка о доходах</td>
                <td className="p-4 text-emerald-700 font-bold">Не требуется</td>
                <td className="p-4 text-emerald-700 font-bold">Не требуется</td>
                <td className="p-4 text-emerald-700 font-bold">Не требуется</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Вопросы и ответы (FAQ Accordion) */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-1">
            Часто задаваемые вопросы
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            Вопросы об оплате и гарантиях
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 hover:text-[#064734] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg text-gray-400 font-normal">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Консультация юриста и менеджера */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <div className="bg-[#032b20] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4b26f] block mb-2">
              Юридическая чистота
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase mb-3">
              Получите бесплатную консультацию
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Специалисты отдела продаж и штатные юристы EL ORDO ответят на любые вопросы по оформлению, графику рассрочки и предоставят разрешительные документы.
            </p>
          </div>

          <a
            href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8c%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%20%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F%D0%BC%20%D0%BF%D0%BE%D0%BA%D1%83%D0%BF%D0%BA%D0%B8"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#d4b26f] hover:bg-[#c49f57] text-[#064734] font-black px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
          >
            <span>💬</span> Написать в WhatsApp
          </a>
        </div>
      </section>

    </main>
  );
}