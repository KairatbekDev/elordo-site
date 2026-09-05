import Link from 'next/link';
import BishkekMap from '@/components/BishkekMap';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  experience?: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'Керезбек Нуралиев',
    role: 'Генеральный директор / Учредитель',
    image: '/team/kerezbek-nuraliev-1.jpg',
  },
  {
    name: 'Адилет Медетбек уулу',
    role: 'Исполнительный директор',
    image: '/team/adilet-medetbek-uulu-857x1536.jpg',
  },
  {
    name: 'Самаган Мамасыдык уулу',
    role: 'Технический директор',
    image: '/team/mamasydyk-uulu-samagany.jpg',
  },
  {
    name: 'Бектур Мусаев',
    role: 'Главный инженер проектов',
    image: '/team/musaev-bektur-768x1376.jpg',
  },
  {
    name: 'Бекжан Нуржанов',
    role: 'Руководитель отдела продаж',
    image: '/team/nurzhanov-bekzhan-857x1536.jpg',
  },
  {
    name: 'Атанас Жороев',
    role: 'Главный юрист компании',
    image: '/team/zhoroev-atanas.jpg',
  },
];

const STATS = [
  { value: '2021', label: 'Год основания компании' },
  { value: '6', label: 'Жилых комплексов в портфолио' },
  { value: '100%', label: 'Соблюдение сроков строительства' },
  { value: '40 мес.', label: 'Беспроцентная рассрочка' },
];

const PRINCIPLES = [
  {
    title: 'Бескомпромиссное качество',
    desc: 'Используем только сертифицированный армированный монолит, жженый кирпич и базальтовое утепление в соответствии со всеми СНиП КР.',
    icon: '🏗️',
  },
  {
    title: 'Юридическая чистота',
    desc: 'Все объекты имеют полный пакет разрешительной документации: красные книги, утвержденные АПУ и положительные заключения Госэкспертизы.',
    icon: '⚖️',
  },
  {
    title: 'Честные условия покупки',
    desc: 'Прямая внутренняя рассрочка от застройщика без участия банков и процентов, а также гибкая программа Trade-in для обмена вашего авто или жилья.',
    icon: '🤝',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafbfa] text-gray-900">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link href="/" className="hover:text-[#064734] transition-colors">
            Главная
          </Link>
          <span>/</span>
          <span className="text-[#064734] font-semibold">О компании</span>
        </div>
      </div>

      {/* 2. Hero-блок страницы */}
      <section className="relative min-h-[440px] flex items-center justify-center bg-[#064734] text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="El Ordo Group"
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#032b20] via-[#064734]/80 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4b26f] block mb-2">
            СТРОИТЕЛЬНАЯ КОМПАНИЯ
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide leading-tight mb-6 drop-shadow-md">
            EL ORDO GROUP
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            Мы проектируем и возводим жилые комплексы премиум, бизнес и комфорт-класса в Бишкеке, создавая надежное пространство для жизни будущих поколений.
          </p>
        </div>
      </section>

      {/* 3. Ключевые показатели */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
          {STATS.map((stat, idx) => (
            <div key={idx} className="text-center py-2">
              <div className="text-2xl sm:text-4xl font-black text-[#064734] mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. История и философия */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4b26f] block">
              ИСТОРИЯ И МИССИЯ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] leading-snug">
              НАДЕЖНЫЙ ЗАСТРОЙЩИК СТОЛИЦЫ
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Основанная в 2021 году, строительная компания <strong>EL ORDO GROUP</strong> зарекомендовала себя как ответственный девелопер, нацеленный на высокое качество строительства и безупречное исполнение обязательств перед клиентами.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Наш флагманский проект КД «Ордо» и жилой комплекс «Келечек» уже введены в эксплуатацию и заселены. Сегодня мы реализуем знаковые для города объекты — две 25-этажные башни «Abu Dhabi», статусный комплекс «Madina Residence», а также экологические проекты «Айкол» и «Айкол +».
            </p>

            {/* Цитата */}
            <div className="p-6 rounded-2xl bg-[#064734]/5 border-l-4 border-[#064734] mt-6">
              <p className="text-sm font-medium italic text-gray-800 mb-2">
                «Для нас дом — это не просто квадратные метры, а семейная крепость, где каждый житель чувствует безопасность, уют и гордость за свой выбор».
              </p>
              <span className="text-xs font-bold uppercase text-[#064734] tracking-wider">
                — Руководство EL ORDO GROUP
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-neutral-900 aspect-[4/3]">
              <img
                src="/projects/Abu-Dhabi.png"
                alt="Проекты El Ordo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="text-xs font-bold uppercase text-[#d4b26f] block mb-1">
                    Инновации и масштаб
                  </span>
                  <h3 className="text-xl font-bold">
                    Современные архитектурные решения Бишкека
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Принципы работы */}
      <section className="bg-white border-y border-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4b26f] block mb-2">
              НАШИ ЦЕННОСТИ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
              ПОЧЕМУ ВЫБИРАЮТ EL ORDO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRINCIPLES.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#fafbfa] p-8 rounded-2xl border border-gray-100 hover:border-[#064734]/30 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Руководство и команда компании */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4b26f] block mb-2">
            ПРОФЕССИОНАЛЫ СВОЕГО ДЕЛА
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            РУКОВОДСТВО КОМПАНИИ
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Команда экспертов с многолетним опытом в проектировании, строительстве и управлении девелоперскими проектами.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Фото с фиксацией фокуса на лице (object-top) */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Информация о сотруднике */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#064734] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#8c6b23] uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Контакты и интерактивная карта */}
      <section className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-center uppercase text-[#064734] mb-10">
            ОФИС ПРОДАЖ И КОНТАКТЫ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto mb-12">
            <div>
              <p className="text-sm text-gray-500 mb-1">Головной офис в Бишкеке:</p>
              <p className="text-lg font-bold text-gray-900 mb-3">
                г. Бишкек, ул. И. Ахунбаева, 137/1
              </p>
              <div className="space-y-1 text-sm font-semibold text-gray-800">
                <p>
                  <a href="tel:+996709115115" className="hover:text-[#064734] transition-colors">
                    +996 709 115 115
                  </a>
                </p>
                <p>
                  <a href="tel:+996990115115" className="hover:text-[#064734] transition-colors">
                    +996 990 115 115
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <a
                href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%B2%D0%B0%D0%BC%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%20%D0%B8%D0%B7%20%D1%80%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB%D0%B0%20%D0%9E%20%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D0%B8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#032b20] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow"
              >
                <span>💬</span> Написать в WhatsApp
              </a>
              <a
                href="https://instagram.com/elordo.group"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#064734] text-gray-800 px-6 py-3 rounded-xl font-bold text-sm transition-all"
              >
                <span>📸</span> Перейти в Instagram
              </a>
            </div>
          </div>

          {/* Интерактивная карта со всеми объектами и офисом */}
          <BishkekMap />
        </div>
      </section>

    </main>
  );
}