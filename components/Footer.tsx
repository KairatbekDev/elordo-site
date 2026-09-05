'use client';

import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const waFooterText = encodeURIComponent(
    'Здравствуйте! Пишу с сайта EL ORDO GROUP. Хочу получить актуальную информацию по свободным квартирам и рассрочке.'
  );

  return (
    <footer className="bg-[#022118] text-white border-t border-white/10 relative overflow-hidden selection:bg-[#d4b26f] selection:text-[#064734]">
      
      {/* Мягкое фоновое свечение */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#064734]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 relative z-10">
        
        {/* Основная сетка колонок */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Колонка 1: Бренд и статус (4 колонки) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#064734] border border-[#d4b26f]/30 flex items-center justify-center text-[#d4b26f] font-black text-base shadow-sm group-hover:bg-[#042e22] transition-colors">
                EO
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-white uppercase leading-none">
                    El Ordo
                  </span>
                  <span className="text-[10px] bg-[#d4b26f] text-[#064734] font-black px-1.5 py-0.5 rounded">
                    Group
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                  Строительная компания в Бишкеке
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light max-w-sm">
              Надежный девелопер полного цикла. Возводим современные жилые комплексы с сейсмостойкостью 9 баллов, монолитно-кирпичным конструктивом и честной рассрочкой 0%.
            </p>

            {/* Статус работы офиса */}
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#d4b26f]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Отдел продаж: Пн — Сб 09:00 – 19:00</span>
            </div>
          </div>

          {/* Колонка 2: Жилые комплексы (3 колонки) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black tracking-widest uppercase text-[#d4b26f] mb-4">
              Жилые комплексы
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/abu-dhabi" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>ЖК Abu Dhabi</span>
                  <span className="text-[10px] text-[#d4b26f] font-bold opacity-80 group-hover:opacity-100">Премиум</span>
                </Link>
              </li>
              <li>
                <Link href="/madina-residence" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>ЖК Madina Residence</span>
                  <span className="text-[10px] text-[#d4b26f] font-bold opacity-80 group-hover:opacity-100">Бизнес</span>
                </Link>
              </li>
              <li>
                <Link href="/ajkol-plus" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>ЖД Айкол +</span>
                  <span className="text-[10px] text-emerald-400 font-bold opacity-80 group-hover:opacity-100">Эко-зона</span>
                </Link>
              </li>
              <li>
                <Link href="/ajkol" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>ЖД Айкол</span>
                  <span className="text-[10px] text-gray-400 font-bold opacity-80 group-hover:opacity-100">Комфорт</span>
                </Link>
              </li>
              <li>
                <Link href="/kelechek" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>ЖК Келечек</span>
                  <span className="text-[10px] text-gray-400 font-bold">Сдан ✓</span>
                </Link>
              </li>
              <li>
                <Link href="/ordo" className="text-gray-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>Клубный дом Ордо</span>
                  <span className="text-[10px] text-gray-400 font-bold">Сдан ✓</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Покупателям и условия (2 колонки) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black tracking-widest uppercase text-[#d4b26f] mb-4">
              Покупателям
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Каталог всех квартир
                </Link>
              </li>
              <li>
                <Link href="/usloviya#calculator" className="hover:text-white transition-colors">
                  Калькулятор 0%
                </Link>
              </li>
              <li>
                <Link href="/usloviya#trade-in" className="hover:text-white transition-colors">
                  Бартер / Trade-in
                </Link>
              </li>
              <li>
                <Link href="/usloviya" className="hover:text-white transition-colors">
                  Условия 100% оплаты
                </Link>
              </li>
              <li>
                <Link href="/o-kompanii" className="hover:text-white transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-white transition-colors">
                  Контакты и реквизиты
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Головной офис и быстрые каналы связи (3 колонки) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black tracking-widest uppercase text-[#d4b26f] mb-4">
              Связь и офис
            </h4>
            
            <div>
              <span className="text-[11px] text-gray-400 block mb-0.5">Горячая линия:</span>
              <a
                href="tel:+996709115115"
                className="text-sm font-black text-white hover:text-[#d4b26f] transition-colors block"
              >
                +996 709 115 115
              </a>
              <a
                href="tel:+996990115115"
                className="text-xs text-gray-300 hover:text-[#d4b26f] transition-colors block mt-0.5"
              >
                +996 990 115 115
              </a>
            </div>

            <div>
              <span className="text-[11px] text-gray-400 block mb-0.5">Центральный офис продаж:</span>
              <p className="text-xs text-white/90 leading-snug">
                г. Бишкек, ул. Исы Ахунбаева, 137/1
              </p>
              <a
                href="https://2gis.kg/bishkek/search/%D0%98.%20%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#d4b26f] hover:underline inline-block mt-1"
              >
                Маршрут в 2GIS →
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`https://wa.me/996709115115?text=${waFooterText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white text-xs font-black uppercase tracking-wider transition-all shadow border border-emerald-500/30"
              >
                <span>💬</span>
                <span>Написать в WhatsApp</span>
              </a>

              <a
                href="https://instagram.com/elordo.group"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-white/90 hover:text-white text-xs font-bold transition-all border border-white/10"
              >
                <span>📸</span>
                <span>Instagram @elordo.group</span>
              </a>
            </div>
          </div>

        </div>

        {/* Нижняя полоса с копирайтом, лицензиями и кнопкой Наверх */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Строительная компания EL ORDO GROUP. Все права защищены.</p>
            <p className="text-[11px] text-gray-400">
              Строительство в соответствии с нормами СНиП КР • Государственная регистрация ДДУ
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 active:scale-95 text-xs font-bold text-[#d4b26f] border border-white/10 transition-all cursor-pointer"
          >
            <span>Наверх страницы</span>
            <span>↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
}