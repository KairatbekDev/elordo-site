'use client';

import Link from 'next/link';
import BishkekMap from '@/components/BishkekMap';

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-[#fafbfa] text-gray-900 pb-20">
      {/* 1. Хлебные крошки */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link href="/" className="hover:text-[#064734] transition-colors">
            Главная
          </Link>
          <span>/</span>
          <span className="text-[#064734] font-semibold">Контакты</span>
        </div>
      </div>

      {/* 2. Заголовок */}
      <section className="bg-[#064734] text-white py-14 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4b26f] block mb-2">
            СВЯЖИТЕСЬ С НАМИ
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide mb-3">
            ОФИС ПРОДАЖ И КОНТАКТЫ
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light">
            Приглашаем вас в наш центральный офис на просмотр архитектурных макетов и бесплатную консультацию по рассрочке.
          </p>
        </div>
      </section>

      {/* 3. Контактные карточки */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Адрес */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-2xl mb-4">
                📍
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Адрес офиса
              </h3>
              <p className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-2">
                г. Бишкек, ул. Исы Ахунбаева, 137/1
              </p>
              <p className="text-xs text-gray-500">
                Ориентир: перекресток с ул. Тыныстанова / р-н Политеха
              </p>
            </div>
            <a
              href="https://2gis.kg/bishkek/search/%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#064734] hover:underline"
            >
              <span>Построить маршрут в 2ГИС</span>
              <span>→</span>
            </a>
          </div>

          {/* Телефоны и мессенджеры */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4b26f]/20 text-[#8c6b23] flex items-center justify-center text-2xl mb-4">
                📞
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Отдел продаж
              </h3>
              <div className="space-y-1 text-base sm:text-lg font-bold text-gray-900">
                <a href="tel:+996709115115" className="block hover:text-[#064734] transition-colors">
                  +996 709 115 115
                </a>
                <a href="tel:+996990115115" className="block hover:text-[#064734] transition-colors">
                  +996 990 115 115
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Звонки и WhatsApp без выходных
              </p>
            </div>
            <a
              href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8c%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
            >
              <span>Написать в WhatsApp</span>
              <span>💬</span>
            </a>
          </div>

          {/* График и соцсети */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-2xl mb-4">
                🕒
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Время работы
              </h3>
              <p className="text-sm font-bold text-gray-900">
                Пн — Сб: <span className="text-[#064734]">09:00 – 19:00</span>
              </p>
              <p className="text-sm font-bold text-gray-900 mt-1">
                Воскресенье: <span className="text-gray-500 font-medium">По предварительной записи</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Instagram: <a href="https://instagram.com/elordo.group" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 hover:text-[#064734]">@elordo.group</a>
              </p>
            </div>
            <a
              href="https://instagram.com/elordo.group"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-pink-700 hover:underline"
            >
              <span>Смотреть Instagram</span>
              <span>📸</span>
            </a>
          </div>

        </div>

        {/* 4. Интерактивная карта Бишкека */}
        <div className="mt-12">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-[#064734]">
              МЫ НА КАРТЕ БИШКЕКА
            </h2>
            <p className="text-xs text-gray-500">
              Нажмите на офис продаж или любой жилой комплекс для прокладки маршрута.
            </p>
          </div>
          <BishkekMap />
        </div>
      </div>
    </main>
  );
}