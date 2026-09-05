'use client';

import { useState } from 'react';
import Link from 'next/link';
import BishkekMap from '@/components/BishkekMap';

export default function ContactsPage() {
  const [selectedProject, setSelectedProject] = useState<string>('ЖК Abu Dhabi');
  const [visitTime, setVisitTime] = useState<string>('Сегодня');

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Здравствуйте! Хочу записаться на визит в офис продаж EL ORDO GROUP:\n\n` +
      `🏢 Интересует объект: ${selectedProject}\n` +
      `🗓️ Удобное время визита: ${visitTime}\n\n` +
      `Подтвердите, пожалуйста, свободное время менеджера для консультации и просмотра макетов.`;

    window.open(`https://wa.me/996709115115?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#fafbfa] text-gray-900 pb-20 selection:bg-[#d4b26f] selection:text-[#064734]">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link href="/" className="hover:text-[#064734] transition-colors">
            Главная
          </Link>
          <span>/</span>
          <span className="text-[#064734] font-bold">Контакты</span>
        </div>
      </div>

      {/* 2. Заголовок */}
      <section className="relative min-h-[380px] sm:min-h-[420px] flex items-center justify-center bg-[#064734] text-white py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="EL ORDO GROUP Контакты"
            className="w-full h-full object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021c15] via-[#064734]/85 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="inline-block text-xs uppercase font-black tracking-widest text-[#d4b26f] mb-3 px-3.5 py-1 rounded-full bg-black/40 border border-[#d4b26f]/30">
            Офис продаж и консультации
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide mb-4 drop-shadow-md">
            СВЯЖИТЕСЬ С НАМИ
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto font-light leading-relaxed">
            Ждем вас в центральном офисе на просмотр архитектурных макетов жилых комплексов, подбор планировок и расчет рассрочки 0%.
          </p>
        </div>
      </section>

      {/* 3. Основные контактные карточки */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Адрес офиса */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-2xl mb-4">
                📍
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                Главный офис продаж
              </span>
              <p className="text-base sm:text-lg font-black text-gray-900 leading-snug mb-2">
                г. Бишкек, ул. Исы Ахунбаева, 137/1
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Ориентир: перекресток с ул. Тыныстанова / район КГТУ (Политех). Для гостей предусмотрен бесплатный паркинг.
              </p>
            </div>
            <a
              href="https://2gis.kg/bishkek/search/%D0%98.%20%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-[#064734] hover:text-[#d4b26f] hover:underline"
            >
              <span>Построить маршрут в 2GIS</span>
              <span>→</span>
            </a>
          </div>

          {/* Телефоны и мессенджеры */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4b26f]/20 text-[#8c6b23] flex items-center justify-center text-2xl mb-4">
                📞
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                Отдел продаж (Звонки и WhatsApp)
              </span>
              <div className="space-y-1.5 text-base sm:text-lg font-black text-gray-900">
                <a href="tel:+996709115115" className="block hover:text-[#064734] transition-colors">
                  +996 709 115 115
                </a>
                <a href="tel:+996990115115" className="block hover:text-[#064734] transition-colors">
                  +996 990 115 115
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Прямая линия со старшими менеджерами по наличию квартир.
              </p>
            </div>
            <a
              href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8c%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%BF%D0%BE%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%B0%D0%BC"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 hover:underline"
            >
              <span>Написать в WhatsApp</span>
              <span>💬</span>
            </a>
          </div>

          {/* График и соцсети */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-2xl mb-4">
                🕒
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                Режим работы
              </span>
              <p className="text-sm font-black text-gray-900">
                Понедельник — Суббота: <span className="text-[#064734]">09:00 – 19:00</span>
              </p>
              <p className="text-xs text-gray-600 mt-1 font-medium">
                Воскресенье: <span className="text-gray-900 font-bold">по предварительной записи</span>
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400 block">Официальный аккаунт:</span>
                <a
                  href="https://instagram.com/elordo.group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-gray-900 hover:text-[#064734] transition-colors"
                >
                  Instagram: @elordo.group
                </a>
              </div>
            </div>
            <a
              href="https://instagram.com/elordo.group"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-pink-700 hover:underline"
            >
              <span>Смотреть прямые эфиры и видео со строек</span>
              <span>📸</span>
            </a>
          </div>

        </div>
      </div>

      {/* 4. Запись на визит в офис + Преимущества посещения */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Левая колонка: Что вас ждет в офисе */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block">
              Личный визит
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734] leading-tight">
              Запланируйте визит в офис продаж
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Посетив наш офис, вы сможете в спокойной обстановке изучить генеральные планы, архитектурные макеты и получить консультацию юриста по оформлению сделки.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-gray-700">
              <div className="p-3.5 rounded-2xl bg-[#fafbfa] border border-gray-100 flex items-center gap-3">
                <span className="text-lg">🚗</span>
                <span>Бесплатный паркинг для клиентов</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#fafbfa] border border-gray-100 flex items-center gap-3">
                <span className="text-lg">🏛️</span>
                <span>Архитектурные 3D-макеты комплексов</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#fafbfa] border border-gray-100 flex items-center gap-3">
                <span className="text-lg">☕</span>
                <span>Кофе-зона и приватные переговорные</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#fafbfa] border border-gray-100 flex items-center gap-3">
                <span className="text-lg">📑</span>
                <span>Ознакомление с оригиналами документов</span>
              </div>
            </div>
          </div>

          {/* Правая колонка: Быстрая бронь встречи */}
          <div className="lg:col-span-6 bg-[#f5f8f6] p-6 sm:p-8 rounded-2xl border border-gray-200">
            <h3 className="text-sm font-black uppercase text-gray-900 mb-4">
              Быстрая запись на встречу с менеджером:
            </h3>

            <form onSubmit={handleBookVisit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  Какой жилой комплекс вас интересует?
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:border-[#064734] font-medium"
                >
                  <option value="ЖК Abu Dhabi (Премиум)">ЖК Abu Dhabi (Премиум-класс)</option>
                  <option value="ЖК Madina Residence (Бизнес)">ЖК Madina Residence (Бизнес-класс)</option>
                  <option value="ЖД Айкол + (Комфорт+ / Кок-Жар)">ЖД Айкол + (Эко-зона Кок-Жар)</option>
                  <option value="ЖД Айкол (Комфорт-класс)">ЖД Айкол (Сдача 2026)</option>
                  <option value="Консультация по всем объектам">Консультация по всем объектам</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  Когда вам удобно приехать?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Сегодня', 'Завтра', 'В субботу'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setVisitTime(t)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                        visitTime === t
                          ? 'bg-[#064734] text-white shadow'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#064734] hover:bg-[#032b20] active:scale-95 text-[#d4b26f] hover:text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>Подтвердить запись в WhatsApp</span>
              </button>
              <p className="text-[11px] text-gray-500 text-center font-medium">
                Менеджер встретит вас у входа и подготовит презентационные материалы
              </p>
            </form>
          </div>

        </div>
      </section>

      {/* 5. Интерактивная карта Бишкека */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <div className="mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            Локация на карте
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            Интерактивная карта объектов и офиса
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Нажмите на маркер офиса или интересующего ЖК для детального адреса и прокладки маршрута.
          </p>
        </div>

        <BishkekMap />
      </section>

    </main>
  );
}