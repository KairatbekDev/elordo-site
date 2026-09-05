import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#032b20] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Колонка 1: Бренд и позиционирование (2 колонки) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white uppercase">
                El Ordo
              </span>
              <span className="text-xs bg-[#d4b26f] text-[#064734] font-bold px-2 py-0.5 rounded-full">
                Group
              </span>
            </Link>
            <p className="text-sm text-gray-300 max-w-sm leading-relaxed font-light">
              Строительная компания полного цикла в Бишкеке. Проектируем и возводим надежные жилые комплексы премиум, бизнес и комфорт-класса.
            </p>
            <div className="pt-2 flex items-center gap-2.5 text-xs text-[#d4b26f]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#d4b26f] animate-pulse" />
              Отдел продаж открыт: Пн — Сб 09:00 – 19:00
            </div>
          </div>

          {/* Колонка 2: Жилые комплексы */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#d4b26f] mb-4">
              Жилые комплексы
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/abu-dhabi" className="hover:text-white transition-colors">
                  ЖК Abu Dhabi
                </Link>
              </li>
              <li>
                <Link href="/madina-residence" className="hover:text-white transition-colors">
                  ЖК Madina Residence
                </Link>
              </li>
              <li>
                <Link href="/ajkol-plus" className="hover:text-white transition-colors">
                  ЖД Айкол +
                </Link>
              </li>
              <li>
                <Link href="/ajkol" className="hover:text-white transition-colors">
                  ЖД Айкол
                </Link>
              </li>
              <li>
                <Link href="/kelechek" className="hover:text-white transition-colors">
                  ЖК Келечек
                </Link>
              </li>
              <li>
                <Link href="/ordo" className="hover:text-white transition-colors">
                  Клубный дом Ordo
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/projects" className="text-xs font-bold text-[#d4b26f] hover:underline flex items-center gap-1">
                  Все объекты в каталоге →
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Покупателям и о компании */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#d4b26f] mb-4">
              Навигация
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Каталог проектов
                </Link>
              </li>
              <li>
                <Link href="/o-kompanii" className="hover:text-white transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/rassrochka" className="hover:text-white transition-colors">
                  Беспроцентная рассрочка
                </Link>
              </li>
              <li>
                <Link href="/polniy-raschet" className="hover:text-white transition-colors">
                  100% расчет
                </Link>
              </li>
              <li>
                <Link href="/barter" className="hover:text-white transition-colors">
                  Бартер / Trade-in
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-white transition-colors">
                  Контакты и офис
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Контакты и связь */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#d4b26f] mb-4">
              Контакты
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <span className="text-xs text-white/50 block mb-0.5">Телефоны отдела продаж:</span>
                <a href="tel:+996709115115" className="text-white hover:text-[#d4b26f] font-semibold transition-colors block">
                  +996 709 115 115
                </a>
                <a href="tel:+996990115115" className="text-white hover:text-[#d4b26f] font-semibold transition-colors block">
                  +996 990 115 115
                </a>
              </div>
              <div>
                <span className="text-xs text-white/50 block mb-0.5">Центральный офис:</span>
                <p className="text-white/90 text-xs sm:text-sm">г. Бишкек, ул. Исы Ахунбаева, 137/1</p>
                <a
                  href="https://2gis.kg/bishkek/search/%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#d4b26f] hover:underline block mt-0.5"
                >
                  Открыть в 2ГИС →
                </a>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%BF%D0%B8%D1%88%D1%83%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-[#064734] border border-[#d4b26f]/30 text-[#d4b26f] hover:bg-[#064734]/80 transition-colors"
                >
                  <span>💬</span> Написать в WhatsApp
                </a>
                <a
                  href="https://instagram.com/elordo.group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span>📸</span> Instagram @elordo.group
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Нижняя полоса с копирайтом */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} EL ORDO GROUP. Все права защищены.</p>
          <p>Строительная компания в Кыргызстане • Лицензия Госстроя КР</p>
        </div>
      </div>
    </footer>
  );
}