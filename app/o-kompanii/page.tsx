import Link from 'next/link';
import type { Metadata } from 'next';
import BishkekMap from '@/components/BishkekMap';

export const metadata: Metadata = {
  title: 'О компании EL ORDO GROUP — Надежный застройщик Бишкека',
  description:
    'Строительная компания EL ORDO GROUP с 2021 года возводит жилые комплексы премиум, бизнес и комфорт-класса в Бишкеке. 100% сдача объектов, сейсмостойкость 9 баллов, рассрочка 0%.',
  openGraph: {
    title: 'О компании EL ORDO GROUP | Архитектура вашего будущего',
    description: 'Официальная информация, руководство, стандарты монолитно-кирпичного строительства и сданные объекты в Бишкеке.',
    images: [
      {
        url: '/projects/Abu-Dhabi.png',
        width: 1200,
        height: 630,
        alt: 'EL ORDO GROUP',
      },
    ],
  },
};

interface TeamMember {
  name: string;
  role: string;
  image: string;
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
  { value: '2021', label: 'Год основания', sub: 'Стабильный рост и надежность' },
  { value: '6', label: 'Жилых комплексов', sub: 'В ключевых районах Бишкека' },
  { value: '100%', label: 'Соблюдение сроков', sub: 'Сдача объектов госкомиссии' },
  { value: '40 мес.', label: 'Рассрочка 0%', sub: 'Прямой договор без банка' },
];

const STANDARDS = [
  {
    title: 'Монолитный железобетон',
    desc: 'Высокомарочный бетон марки М350 и сертифицированная российская арматура класса А500С.',
    badge: 'СНиП КР',
  },
  {
    title: 'Экологичный жженый кирпич',
    desc: 'Внутренние и межквартирные перегородки возводятся из кирпича, обеспечивая отличную тишину и микроклимат.',
    badge: 'Шумоизоляция',
  },
  {
    title: 'Базальтовое утепление 100 мм',
    desc: 'Негорючая теплоизоляция высокой плотности сохраняет прохладу летом и держит тепло в зимние морозы.',
    badge: 'Энергоэффект',
  },
  {
    title: 'Сейсмостойкость 9 баллов',
    desc: 'Каждый проект проходит строгие расчеты сейсмических нагрузок и экспертизу Госстроя Кыргызской Республики.',
    badge: 'Безопасность',
  },
];

const MILESTONES = [
  {
    year: '2021',
    title: 'Основание девелоперской компании',
    desc: 'Формирование команды ведущих инженеров, архитекторов и старт проектирования первых жилых объектов столицы.',
  },
  {
    year: '2023 – 2024',
    title: 'Успешный ввод в эксплуатацию',
    desc: 'Полное завершение, сдача госкомиссии и заселение знакового клубного дома «Ордо» и жилого комплекса «Келечек».',
  },
  {
    year: '2025 – 2026',
    title: 'Масштабирование и эко-сегмент',
    desc: 'Строительство ЖК «Madina Residence» в центре города, а также проектов «Айкол» и клубного формата «Айкол +» в чистом предгорье Кок-Жара.',
  },
  {
    year: '2027 – 2029',
    title: 'Флагманский проект «Abu Dhabi»',
    desc: 'Возведение двух 25-этажных высотных башен премиум-класса с концепцией «Город в городе» на улице Сухомлинова.',
  },
];

export default function AboutPage() {
  const waAboutText = encodeURIComponent(
    'Здравствуйте! Пишу с сайта EL ORDO GROUP из раздела «О компании». Хочу получить подробную презентацию ваших объектов и разрешительных документов.'
  );

  return (
    <main className="min-h-screen bg-[#fafbfa] text-gray-900 selection:bg-[#d4b26f] selection:text-[#064734]">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link href="/" className="hover:text-[#064734] transition-colors">
            Главная
          </Link>
          <span>/</span>
          <span className="text-[#064734] font-bold">О компании</span>
        </div>
      </div>

      {/* 2. Hero-блок с глубоким визуальным стилем */}
      <section className="relative min-h-[500px] sm:min-h-[560px] flex items-center justify-center bg-[#064734] text-white py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="EL ORDO GROUP"
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021c15] via-[#064734]/80 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d4b26f]/40 text-[#d4b26f] text-xs font-black uppercase tracking-widest mb-6 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Девелопмент полного цикла в Бишкеке</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-6 drop-shadow-xl">
            СТРОИМ НА ВЕКА. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4b26f] via-[#eddab2] to-[#d4b26f]">
              СОЗДАЕМ ДЛЯ ПОКОЛЕНИЙ.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed mb-8">
            EL ORDO GROUP объединяет передовую архитектуру, бескомпромиссное качество монолита и персональное уважение к каждому дольщику.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/projects"
              className="bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-7 py-3.5 rounded-xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-lg"
            >
              Смотреть наши объекты
            </Link>
            <a
              href={`https://wa.me/996709115115?text=${waAboutText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-sm"
            >
              Задать вопрос руководству
            </a>
          </div>
        </div>
      </section>

      {/* 3. Ключевые показатели компании */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
          {STATS.map((stat, idx) => (
            <div key={idx} className="text-center p-2 border-r last:border-r-0 border-gray-100">
              <div className="text-2xl sm:text-4xl font-black text-[#064734] mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-900 font-extrabold mb-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-gray-400 hidden sm:block">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. История и принципы застройщика */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
                История и миссия
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] leading-snug">
                Надежность, подтвержденная реальными домами
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Строительная компания <strong>EL ORDO GROUP</strong> основана в 2021 году профессионалами с более чем 10-летним стажем в капитальном строительстве Кыргызской Республики. Наша цель — возводить безопасные, эстетичные и энергоэффективные дома, которые растут в цене из года в год.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Мы не экономим на материалах: применяем сейсмостойкий монолитный каркас, стены из жженого кирпича и трехкамерное остекление с шумоизоляцией. Все объекты имеют <strong>Красные книги</strong>, утвержденные АПУ и положительные заключения Государственной экспертизы.
            </p>

            {/* Цитата руководства */}
            <div className="p-6 rounded-2xl bg-[#064734]/5 border-l-4 border-[#064734] shadow-sm">
              <p className="text-sm font-semibold italic text-gray-800 leading-relaxed mb-3">
                «Для нас дом — это не просто квадратные метры, а семейная крепость, где каждый житель чувствует абсолютную безопасность, комфорт и уверенность в завтрашнем дне».
              </p>
              <div className="text-xs font-black uppercase tracking-wider text-[#064734]">
                — Руководство строительной компании EL ORDO GROUP
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-neutral-900 aspect-[4/3] group">
              <img
                src="/projects/Abu-Dhabi.png"
                alt="Проекты EL ORDO GROUP"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="text-xs font-black uppercase text-[#d4b26f] block mb-1">
                    Флагман архитектуры
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">
                    ЖК Abu Dhabi • Две 25-этажные башни
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Бишкек, ул. Сухомлинова, 29
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Инженерные стандарты строительства */}
      <section className="bg-white border-y border-gray-100 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
              Технологии и контроль
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734]">
              Стандарты строительства EL ORDO
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Каждый этап контролируется сертифицированными инженерами технадзора.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STANDARDS.map((std, idx) => (
              <div
                key={idx}
                className="bg-[#fafbfa] p-7 rounded-3xl border border-gray-200/80 hover:border-[#064734]/40 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-[#064734]/10 text-[#064734] mb-4">
                    {std.badge}
                  </span>
                  <h3 className="text-base font-black text-gray-900 mb-2">
                    {std.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Таймлайн развития компании */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
            Хронология успеха
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734]">
            Этапы развития девелопера
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MILESTONES.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-black text-[#d4b26f] mb-3">
                  {item.year}
                </div>
                <h3 className="text-sm font-black text-gray-950 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Руководство и команда компании */}
      <section className="bg-[#f0f4f1] border-t border-gray-200 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
              Профессиональная команда
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734]">
              Руководство EL ORDO GROUP
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Эксперты в сфере девелопмента, архитектурного проектирования, юриспруденции и капитального строительства.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Фото с фиксацией фокуса на лице (object-top) */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Информация */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-gray-900 mb-1 group-hover:text-[#064734] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[#8c6b23] uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Контакты офиса продаж и карта */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
              Прямая связь
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
              Офис продаж и консультации
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto mb-12">
            <div>
              <p className="text-xs text-gray-400 mb-1">Головной офис компании:</p>
              <p className="text-lg font-bold text-gray-900 mb-3">
                г. Бишкек, ул. И. Ахунбаева, 137/1
              </p>
              <div className="space-y-1.5 text-sm font-semibold text-gray-800 mb-4">
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
              <a
                href="https://2gis.kg/bishkek/search/%D0%98.%20%D0%90%D1%85%D1%83%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20137%2F1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064734] hover:underline"
              >
                <span>📍</span> Открыть маршрут в 2GIS →
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/996709115115?text=${waAboutText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow"
              >
                <span>💬</span> Написать в WhatsApp
              </a>
              <a
                href="https://instagram.com/elordo.group"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#064734] text-gray-800 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
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