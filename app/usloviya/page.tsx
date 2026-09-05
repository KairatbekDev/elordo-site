'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PurchaseTermsPage() {
  // Состояние для интерактивного калькулятора рассрочки
  const [apartmentPrice, setApartmentPrice] = useState<number>(65000); // в USD
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30%
  const [months, setMonths] = useState<number>(36); // 36 месяцев

  // Расчеты
  const downPaymentAmount = Math.round((apartmentPrice * downPaymentPercent) / 100);
  const remainingAmount = apartmentPrice - downPaymentAmount;
  const monthlyPayment = Math.round(remainingAmount / months);

  const handleSendCalculation = () => {
    const text = `Здравствуйте! Рассчитал условия рассрочки на сайте:\n\n` +
      `💵 Стоимость квартиры: $${apartmentPrice.toLocaleString()}\n` +
      `💰 Первоначальный взнос (${downPaymentPercent}%): $${downPaymentAmount.toLocaleString()}\n` +
      `🗓️ Срок рассрочки: ${months} мес.\n` +
      `📌 Ежемесячный платеж: ~$${monthlyPayment.toLocaleString()}/мес.\n\n` +
      `Подскажите, какие объекты подходят под этот бюджет?`;
    
    window.open(`https://wa.me/996709115115?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#fafbfa] text-gray-900 pb-20">
      
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
      <section className="bg-[#064734] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4b26f] block mb-2">
            ПРОЗРАЧНЫЕ И ВЫГОДНЫЕ УСЛОВИЯ
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide mb-4">
            КАК КУПИТЬ КВАРТИРУ В EL ORDO
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Прямая покупка от застройщика без посредников. Беспроцентная внутренняя рассрочка до 40 месяцев, обмен авто или жилья по программе Trade-in и индивидуальный график выплат.
          </p>
        </div>
      </section>

      {/* 3. Три основных формата покупки */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Рассрочка 0% */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-2xl mb-4 font-black">
                0%
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">
                Рассрочка до 40 месяцев
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Прямая рассрочка от застройщика без банков, скрытых комиссий, страховок и процентов.
              </p>
              <ul className="space-y-2 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Первоначальный взнос от 20–30%
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Срок выплат — до 40 месяцев
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Нужен только паспорт гражданина
                </li>
              </ul>
            </div>
            <a
              href="#calculator"
              className="mt-6 block text-center bg-[#064734] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-[#042e22] transition-colors"
            >
              Рассчитать платеж ↓
            </a>
          </div>

          {/* Trade-in / Бартер */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#d4b26f] flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
              Популярно в КР
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4b26f]/20 text-[#8c6b23] flex items-center justify-center text-2xl mb-4">
                🚗
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">
                Бартер / Trade-in
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Обменяйте ваш автомобиль или вторичную недвижимость в счет первоначального взноса за новую квартиру.
              </p>
              <ul className="space-y-2 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Оценка авто или жилья за 24 часа
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Справедливая рыночная стоимость
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Юридическое сопровождение сделки
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8c%20%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F%20Trade-in%20(%D0%BE%D0%B1%D0%BC%D0%B5%D0%BD%20%D0%B0%D0%B2%D1%82%D0%BE%2F%D0%B6%D0%B8%D0%BB%D1%8C%D1%8F)"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-center bg-[#d4b26f] text-[#064734] font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-[#c29f5a] transition-colors"
            >
              Предложить обмен →
            </a>
          </div>

          {/* 100% оплата */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-2xl mb-4 font-black">
                100%
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">
                Полный расчет
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Максимально выгодные условия для покупателей, готовых внести всю сумму единовременно.
              </p>
              <ul className="space-y-2 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Специальная индивидуальная скидка
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Бронь лучших планировок и видовых этажей
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#064734] font-bold">✓</span> Моментальное оформление договора
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8c%20%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%20%D1%81%D0%BA%D0%B8%D0%B4%D0%BA%D0%B8%20%D0%BF%D1%80%D0%B8%20100%25%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B5"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-center bg-[#064734] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-[#042e22] transition-colors"
            >
              Узнать размер скидки →
            </a>
          </div>

        </div>
      </div>

      {/* 4. Интерактивный калькулятор рассрочки */}
      <section id="calculator" className="max-w-4xl mx-auto px-6 mt-20 scroll-mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4b26f] block mb-1">
              ОНЛАЙН-РАСЧЕТ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
              КАЛЬКУЛЯТОР РАССРОЧКИ
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Передвигайте ползунки, чтобы рассчитать примерный ежемесячный платёж под ваш бюджет.
            </p>
          </div>

          <div className="space-y-8">
            {/* Ползунок 1: Стоимость квартиры */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-gray-600">
                  Стоимость квартиры:
                </span>
                <span className="text-lg font-black text-[#064734]">
                  ${apartmentPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="35000"
                max="250000"
                step="1000"
                value={apartmentPrice}
                onChange={(e) => setApartmentPrice(Number(e.target.value))}
                className="w-full accent-[#064734] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>$35 000</span>
                <span>$250 000</span>
              </div>
            </div>

            {/* Ползунок 2: Первоначальный взнос */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-gray-600">
                  Первоначальный взнос ({downPaymentPercent}%):
                </span>
                <span className="text-lg font-black text-[#064734]">
                  ${downPaymentAmount.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="60"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#064734] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>20% (мин.)</span>
                <span>60%</span>
              </div>
            </div>

            {/* Ползунок 3: Срок рассрочки */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-gray-600">
                  Срок рассрочки:
                </span>
                <span className="text-lg font-black text-[#064734]">
                  {months} месяцев
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="40"
                step="6"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-[#064734] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>12 мес.</span>
                <span>40 мес. (макс.)</span>
              </div>
            </div>

            {/* Итоговая панель расчета */}
            <div className="bg-[#f3f6f4] rounded-2xl p-6 border border-[#064734]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase text-gray-500 block mb-1">
                  Ориентировочный ежемесячный платёж:
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#064734]">
                  ${monthlyPayment.toLocaleString()} <span className="text-sm font-bold text-gray-500">/ мес.</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Остаток к выплате: ${remainingAmount.toLocaleString()} • Без переплат и процентов
                </p>
              </div>

              <button
                type="button"
                onClick={handleSendCalculation}
                className="w-full sm:w-auto shrink-0 bg-[#064734] hover:bg-[#032b20] text-[#d4b26f] hover:text-white font-bold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>💬</span>
                <span>Зафиксировать расчет в WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Документы для оформления */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <div className="bg-[#032b20] rounded-3xl p-8 sm:p-12 text-white">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4b26f] block mb-2">
              ПРОСТОТА ОФОРМЛЕНИЯ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4">
              ЧТО НУЖНО ДЛЯ ЗАКЛЮЧЕНИЯ ДОГОВОРА?
            </h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6 font-light">
              Мы максимально упростили процедуру покупки. Вам не требуется подтверждать официальный доход или собирать справки с работы.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <span className="text-[#d4b26f] text-base block font-bold mb-1">01</span>
                Паспорт гражданина (ID-карта или загранпаспорт)
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <span className="text-[#d4b26f] text-base block font-bold mb-1">02</span>
                Первоначальный взнос (наличные, банк или авто)
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <span className="text-[#d4b26f] text-base block font-bold mb-1">03</span>
                Оформление договора в отделе продаж за 40 минут
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}