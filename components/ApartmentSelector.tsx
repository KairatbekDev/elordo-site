'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { IconWhatsApp, IconArrowRight, IconBuilding } from '@/components/Icons';

interface ApartmentUnit {
  id: string;
  complex: string;
  complexSlug: string;
  rooms: number;
  area: number;
  floor: string;
  priceM2: number;
  badge?: string;
}

const APARTMENTS_DATA: ApartmentUnit[] = [
  {
    id: 'ad-1k-49',
    complex: 'ЖК Abu Dhabi',
    complexSlug: 'abu-dhabi',
    rooms: 1,
    area: 49.48,
    floor: '4–22 этажи',
    priceM2: 1650,
    badge: 'Панорама гор',
  },
  {
    id: 'ad-2k-78',
    complex: 'ЖК Abu Dhabi',
    complexSlug: 'abu-dhabi',
    rooms: 2,
    area: 78.3,
    floor: '5–24 этажи',
    priceM2: 1650,
    badge: 'Премиум',
  },
  {
    id: 'mr-1k-43',
    complex: 'ЖК Madina Residence',
    complexSlug: 'madina-residence',
    rooms: 1,
    area: 43.59,
    floor: '3–12 этажи',
    priceM2: 1400,
    badge: 'Хит продаж',
  },
  {
    id: 'mr-2k-68',
    complex: 'ЖК Madina Residence',
    complexSlug: 'madina-residence',
    rooms: 2,
    area: 68.2,
    floor: '2–14 этажи',
    priceM2: 1400,
    badge: 'Бизнес в центре',
  },
  {
    id: 'mr-3k-92',
    complex: 'ЖК Madina Residence',
    complexSlug: 'madina-residence',
    rooms: 3,
    area: 92.4,
    floor: '6–15 этажи',
    priceM2: 1400,
    badge: 'Для семьи',
  },
  {
    id: 'aik-1k-42',
    complex: 'ЖД Айкол +',
    complexSlug: 'ajkol-plus',
    rooms: 1,
    area: 42.0,
    floor: '2–9 этажи',
    priceM2: 1100,
    badge: 'Эко-предгорье',
  },
  {
    id: 'aik-2k-74',
    complex: 'ЖД Айкол +',
    complexSlug: 'ajkol-plus',
    rooms: 2,
    area: 74.3,
    floor: '3–8 этажи',
    priceM2: 1100,
    badge: 'Чистый воздух',
  },
];

const USD_TO_KGS = 87.5;

export default function ApartmentSelector() {
  const { locale } = useLanguage();
  const isKg = locale === 'kg';

  // Фильтры
  const [selectedComplex, setSelectedComplex] = useState<string>('all');
  const [selectedRooms, setSelectedRooms] = useState<number | 'all'>('all');

  // Параметры калькулятора рассрочки
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [installmentTerm, setInstallmentTerm] = useState<number>(36);

  const cleanWaNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';

  const filteredApartments = useMemo(() => {
    return APARTMENTS_DATA.filter((apt) => {
      const matchComplex = selectedComplex === 'all' || apt.complexSlug === selectedComplex;
      const matchRooms = selectedRooms === 'all' || apt.rooms === selectedRooms;
      return matchComplex && matchRooms;
    });
  }, [selectedComplex, selectedRooms]);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Заголовок блока */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
          {isKg ? 'Интерактивдүү тандоо' : 'Интерактивный подборщик'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f] tracking-tight">
          {isKg ? 'Батир тандаңыз жана 0% эсебин алыңыз' : 'Выберите квартиру с онлайн-расчетом 0%'}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-2">
          {isKg
            ? 'Баштапкы төлөмдү жана мөөнөттү жылдырып, ай сайын төлөмдү дароо билиңиз'
            : 'Двигайте ползунки взноса и срока, чтобы мгновенно увидеть точный ежемесячный платеж без переплат'}
        </p>
      </div>

      {/* Панель фильтров и параметров рассрочки */}
      <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/10 shadow-xl mb-10 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Фильтр ЖК */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2.5">
              {isKg ? 'Турак жай комплекси:' : 'Жилой комплекс:'}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', name: isKg ? 'Баары' : 'Все' },
                { id: 'abu-dhabi', name: 'Abu Dhabi' },
                { id: 'madina-residence', name: 'Madina' },
                { id: 'ajkol-plus', name: 'Айкол +' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedComplex(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedComplex === c.id
                      ? 'bg-[#064734] dark:bg-[#d4b26f] text-[#d4b26f] dark:text-[#064734] shadow'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Фильтр комнат */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2.5">
              {isKg ? 'Бөлмөлөр:' : 'Комнатность:'}
            </label>
            <div className="flex gap-1.5">
              {[
                { id: 'all', label: isKg ? 'Баары' : 'Все' },
                { id: 1, label: '1-к' },
                { id: 2, label: '2-к' },
                { id: 3, label: '3-к' },
              ].map((r) => (
                <button
                  key={String(r.id)}
                  type="button"
                  onClick={() => setSelectedRooms(r.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedRooms === r.id
                      ? 'bg-[#064734] dark:bg-[#d4b26f] text-[#d4b26f] dark:text-[#064734] shadow'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ползунок взноса */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                {isKg ? 'Баштапкы төлөм:' : 'Первый взнос:'}
              </label>
              <span className="text-xs font-black text-[#064734] dark:text-[#d4b26f] bg-emerald-50 dark:bg-white/10 px-2 py-0.5 rounded-md">
                {downPaymentPercent}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#064734] dark:accent-[#d4b26f] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 dark:text-neutral-400 mt-1 font-semibold">
              <span>20% (мин.)</span>
              <span>30%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Ползунок срока */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                {isKg ? 'Бөлүп төлөө мөөнөтү:' : 'Срок рассрочки:'}
              </label>
              <span className="text-xs font-black text-[#064734] dark:text-[#d4b26f] bg-emerald-50 dark:bg-white/10 px-2 py-0.5 rounded-md">
                {installmentTerm} {isKg ? 'ай' : 'мес.'}
              </span>
            </div>
            <input
              type="range"
              min="12"
              max="40"
              step="6"
              value={installmentTerm}
              onChange={(e) => setInstallmentTerm(Number(e.target.value))}
              className="w-full accent-[#064734] dark:accent-[#d4b26f] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 dark:text-neutral-400 mt-1 font-semibold">
              <span>12 мес.</span>
              <span>24 мес.</span>
              <span>40 мес. (макс.)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Список отфильтрованных квартир с расчетами */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApartments.map((apt) => {
          const totalPrice = Math.round(apt.area * apt.priceM2);
          const downPayment = Math.round(totalPrice * (downPaymentPercent / 100));
          const remainder = totalPrice - downPayment;
          const monthly = Math.round(remainder / installmentTerm);

          const downPaymentKgs = Math.round(downPayment * USD_TO_KGS).toLocaleString('ru-RU');
          const monthlyKgs = Math.round(monthly * USD_TO_KGS).toLocaleString('ru-RU');

          const waMessage =
            `Здравствуйте! Меня интересует квартира в ${apt.complex}:\n` +
            `• Планировка: ${apt.rooms}-комнатная (${apt.area} м²)\n` +
            `• Стоимость: $${totalPrice.toLocaleString('ru-RU')}\n` +
            `• Первый взнос: $${downPayment.toLocaleString('ru-RU')} (${downPaymentPercent}%)\n` +
            `• Платеж по рассрочке 0%: $${monthly.toLocaleString('ru-RU')}/мес. на ${installmentTerm} месяцев.\n\n` +
            `Подскажите, пожалуйста, наличие свободных этажей.`;

          return (
            <div
              key={apt.id}
              className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none hover:shadow-2xl hover:border-[#064734]/30 dark:hover:border-[#d4b26f]/30 transition-all flex flex-col justify-between relative group"
            >
              {apt.badge && (
                <div className="absolute -top-3 right-6 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                  {apt.badge}
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-gray-400 dark:text-neutral-400 block mb-1">
                  {apt.rooms}-комнатная квартира • {apt.floor}
                </span>
                <h4 className="text-xl font-black text-gray-950 dark:text-white mb-1">
                  {apt.complex}
                </h4>
                <div className="text-xs font-semibold text-[#064734] dark:text-[#d4b26f] mb-4">
                  {apt.area} м² • от ${apt.priceM2} / м²
                </div>

                {/* Финансовый блок */}
                <div className="space-y-3 border-t border-gray-100 dark:border-white/10 pt-4 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-500 dark:text-neutral-400">
                      {isKg ? 'Жалпы наркы:' : 'Полная стоимость:'}
                    </span>
                    <strong className="text-base font-black text-gray-900 dark:text-white">
                      ${totalPrice.toLocaleString('ru-RU')}
                    </strong>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-500 dark:text-neutral-400">
                      {isKg ? 'Баштапкы төлөм:' : 'Первый взнос:'}
                    </span>
                    <div className="text-right">
                      <strong className="font-bold text-gray-900 dark:text-white block">
                        ${downPayment.toLocaleString('ru-RU')} ({downPaymentPercent}%)
                      </strong>
                      <span className="text-[10px] text-gray-400 dark:text-neutral-400">
                        ≈ {downPaymentKgs} сом
                      </span>
                    </div>
                  </div>

                  {/* Платеж в месяц (0% переплат) */}
                  <div className="p-3.5 rounded-2xl bg-[#f2f6f4] dark:bg-[#040c09] border border-[#064734]/15 dark:border-white/10 mt-3 transition-colors">
                    <span className="text-[11px] font-bold text-gray-500 dark:text-neutral-400 block">
                      {isKg ? 'Ай сайын төлөм (0% пайызы жок):' : 'Платеж в месяц (0% переплат):'}
                    </span>
                    <div className="text-2xl font-black text-[#064734] dark:text-[#d4b26f] my-0.5">
                      ${monthly.toLocaleString('ru-RU')}{' '}
                      <span className="text-xs font-semibold text-gray-500 dark:text-neutral-400">
                        {isKg ? '/ айына' : '/ мес.'}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#064734]/80 dark:text-neutral-300 block">
                      ≈ {monthlyKgs} сом
                    </span>
                  </div>
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="mt-6 pt-3 space-y-2">
                <a
                  href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] active:scale-95 text-[#d4b26f] hover:text-white dark:text-[#064734] dark:hover:text-[#064734] font-black text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <IconWhatsApp className="w-4 h-4 text-[#25D366] dark:text-[#064734]" />
                  <span>{isKg ? 'WhatsApp аркылуу брондоо' : 'Зафиксировать условия'}</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </a>

                <Link
                  href={`/${apt.complexSlug}`}
                  className="block w-full text-center py-1.5 text-[11px] font-bold text-gray-500 dark:text-neutral-400 hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors"
                >
                  {isKg ? 'Комплекс тууралуу' : 'О комплексе'} {apt.complex}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}