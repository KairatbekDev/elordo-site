import Link from 'next/link';
import BishkekMap from '@/components/BishkekMap';
import ConsultationForm from '@/components/ConsultationForm';

// 1. Способы оплаты
const PAYMENT_METHODS = [
  {
    slug: 'polniy-raschet',
    title: '100% оплата',
    desc: 'Максимальная выгода и лучшие условия при полной оплате.',
    iconType: 'cash',
  },
  {
    slug: 'rassrochka',
    title: 'Рассрочка',
    desc: 'Беспроцентная рассрочка от застройщика до 40 месяцев.',
    iconType: 'calendar',
  },
  {
    slug: 'trade-in',
    title: 'Trade-in',
    desc: 'Обмен вашей вторичной недвижимости или авто на новостройку.',
    iconType: 'car',
  },
];

// 2. Каталог из 6 объектов
const PROJECTS = [
  {
    slug: 'abu-dhabi',
    name: 'ЖК Abu Dhabi',
    image: '/projects/Abu-Dhabi.png',
    address: 'ул. Сухомлинова, 29',
    deadline: '2029 г. 3 квартал',
    price: 'от 1650 $',
    isFinished: false,
    hasPage: true,
  },
  {
    slug: 'madina-residence',
    name: 'ЖК Madina Residense',
    image: '/projects/Madina-Residense.png',
    address: 'ул. Огонбаева, 12',
    deadline: '2027 г. 3 квартал',
    price: 'от 1400 $',
    isFinished: false,
    hasPage: true,
  },
  {
    slug: 'ajkol-plus',
    name: 'ЖД Айкол +',
    image: '/projects/Aikolplus.png',
    address: 'с. Кок-Жар, ул. Баялинова, 6',
    deadline: '2028 г. 3 квартал',
    price: 'от 1100 $',
    isFinished: false,
    hasPage: true,
  },
  {
    slug: 'ajkol',
    name: 'ЖД Айкол',
    image: '/projects/ajkol.jpg',
    address: 'ул. Арашан 10',
    deadline: '2026 г. 2 квартал',
    price: null,
    isFinished: false,
    hasPage: true,
    whatsappText: 'Здравствуйте, пишу вам с сайта по поводу ЖД Айкол',
  },
  {
    slug: 'kelechek',
    name: 'ЖК Келечек',
    image: '/projects/Kelechek.jpg',
    address: 'ул. Космическая, 153',
    deadline: 'Сдан в эксплуатацию',
    price: null,
    isFinished: true,
    hasPage: true,
  },
  {
    slug: 'ordo',
    name: 'КД Ордо',
    image: '/projects/Ordo.jpg',
    address: 'ул. Тверская, 20',
    deadline: 'Сдан в эксплуатацию',
    price: null,
    isFinished: true,
    hasPage: true,
    videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafbfa] text-gray-900">
      
      {/* 1. Главный экран (Hero) — оптимизирован под мобильные экраны */}
      <section className="relative min-h-[86dvh] sm:min-h-[580px] md:min-h-[640px] flex items-center justify-center bg-[#064734] text-white pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="El Ordo"
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#032b20] via-[#064734]/75 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Адаптивный аккуратный заголовок */}
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight leading-snug sm:leading-tight mb-4 drop-shadow-md">
            EL ORDO — ПРАВИЛЬНЫЙ ВЫБОР <br className="hidden sm:inline" /> ДЛЯ ВАШЕГО БУДУЩЕГО.
          </h1>

          {/* Легкое описание без тяжелой громоздкой плашки */}
          <p className="text-xs sm:text-base md:text-lg text-white/90 font-light leading-relaxed max-w-xl mb-7 px-2">
            С 2021 года строим современное жилье в Бишкеке, внедряя инновации в каждый проект. Квартиры, достойные вашего статуса.
          </p>

          {/* Кнопки: на мобилке в колонку во всю ширину, на планшете/ПК в ряд */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto max-w-xs sm:max-w-none">
            <a
              href="#projects"
              className="w-full sm:w-auto bg-[#d4b26f] hover:bg-[#c29f5a] text-[#064734] font-bold px-7 py-3.5 rounded-xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-md text-center"
            >
              Наши объекты
            </a>
            <a
              href="#payments"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-sm text-center"
            >
              Способы оплаты
            </a>
          </div>
        </div>
      </section>

      {/* 2. Способы оплаты — компактные карточки без пустот */}
      <section id="payments" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <h2 className="text-xl sm:text-3xl font-black tracking-tight text-center uppercase text-[#064734] mb-8 sm:mb-12">
          СПОСОБЫ ОПЛАТЫ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {PAYMENT_METHODS.map((method) => (
            <div
              key={method.slug}
              className="bg-[#dbe3df] hover:bg-[#d2ddd8] border border-[#064734]/15 rounded-2xl p-5 sm:p-7 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#064734] underline decoration-2 underline-offset-4 mb-2">
                  {method.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#064734]/90 font-medium leading-relaxed">
                  {method.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-2 border-t border-[#064734]/10">
                <Link
                  href={`/${method.slug}`}
                  className="text-xs sm:text-sm font-bold text-[#064734] underline decoration-2 underline-offset-4 hover:text-[#032b20] transition-colors"
                >
                  Подробнее
                </Link>

                <div className="text-[#064734]">
                  {method.iconType === 'cash' && (
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z" />
                    </svg>
                  )}
                  {method.iconType === 'calendar' && (
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 4h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                    </svg>
                  )}
                  {method.iconType === 'car' && (
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
                      <circle cx="7.5" cy="14.5" r="1.5" />
                      <circle cx="16.5" cy="14.5" r="1.5" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Каталог объектов: НАШИ ОБЪЕКТЫ */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <h2 className="text-xl sm:text-3xl font-black tracking-tight text-center uppercase text-[#064734] mb-8 sm:mb-14">
          НАШИ ОБЪЕКТЫ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.slug}
              className="bg-[#064734] text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group border border-white/5 relative"
            >
              <div>
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.isFinished && (
                    <div className="absolute top-3 right-3 bg-[#d4b26f] text-[#064734] text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                      Сдан
                    </div>
                  )}
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    {project.name}
                  </h3>

                  <div className="space-y-2 text-xs text-white/85 mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#d4b26f] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{project.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#d4b26f] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{project.deadline}</span>
                    </div>

                    {project.price && (
                      <div className="pt-1 text-[#d4b26f] font-bold text-sm">
                        Цена за м²: {project.price}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                <Link
                  href={`/${project.slug}`}
                  className="block w-full text-center bg-[#d4b26f] hover:bg-[#c29f5a] text-[#064734] font-bold py-3 rounded-xl uppercase tracking-wider text-xs transition-colors shadow"
                >
                  ПОДРОБНЕЕ
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3.1 Форма заявки на консультацию */}
      <ConsultationForm />

      {/* 4. Блок контактов и интерактивная карта */}
      <section className="bg-white border-t border-gray-100 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-3xl font-black tracking-tight text-center uppercase text-[#064734] mb-8 sm:mb-10">
            СВЯЖИТЕСЬ С НАМИ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Адрес головного офиса:</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                г. Бишкек, ул. И. Ахунбаева, 137/1
              </p>
              <div className="space-y-1 text-sm font-semibold text-gray-800">
                <p>
                  <a href="tel:+996709115115" className="hover:text-[#064734]">
                    +996 709 115 115
                  </a>
                </p>
                <p>
                  <a href="tel:+996990115115" className="hover:text-[#064734]">
                    +996 990 115 115
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <a
                href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%B2%D0%B0%D0%BC%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#032b20] text-white px-5 py-3 rounded-xl font-bold text-sm transition-all shadow text-center"
              >
                <span>💬</span> Написать в WhatsApp
              </a>
              <a
                href="https://instagram.com/elordo.group"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#064734] text-gray-800 px-5 py-3 rounded-xl font-bold text-sm transition-all text-center"
              >
                <span>📸</span> Перейти в Instagram
              </a>
            </div>
          </div>

          <BishkekMap />
        </div>
      </section>

    </main>
  );
}