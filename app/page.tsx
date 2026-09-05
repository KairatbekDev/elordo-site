'use client';

import { useState } from 'react';
import Link from 'next/link';
import BishkekMap from '@/components/BishkekMap';
import ConsultationForm from '@/components/ConsultationForm';

interface ProjectItem {
  slug: string;
  name: string;
  category: 'active' | 'finished';
  classType: string;
  image: string;
  address: string;
  deadline: string;
  price: string | null;
  floors: string;
  desc: string;
}

const PROJECTS: ProjectItem[] = [
  {
    slug: 'abu-dhabi',
    name: 'ЖК Abu Dhabi',
    category: 'active',
    classType: 'Премиум-класс',
    image: '/projects/Abu-Dhabi.png',
    address: 'ул. Сухомлинова, 29',
    deadline: '2029 г. 3 квартал',
    price: 'от 1 650 $/м²',
    floors: '25 этажей (2 башни)',
    desc: 'Флагманский проект столицы с панорамным остеклением, рестораном и фитнес-центром внутри.',
  },
  {
    slug: 'madina-residence',
    name: 'ЖК Madina Residence',
    category: 'active',
    classType: 'Бизнес-класс',
    image: '/projects/Madina-Residense.png',
    address: 'ул. Огонбаева, 12',
    deadline: '2027 г. 3 квартал',
    price: 'от 1 400 $/м²',
    floors: '14 этажей',
    desc: 'Статусный дом в административном центре Бишкека с закрытой охраняемой территорией.',
  },
  {
    slug: 'ajkol-plus',
    name: 'ЖД Айкол +',
    category: 'active',
    classType: 'Комфорт+',
    image: '/projects/Aikolplus.png',
    address: 'с. Кок-Жар, ул. Баялинова, 6',
    deadline: '2028 г. 3 квартал',
    price: 'от 1 100 $/м²',
    floors: '10 этажей',
    desc: 'Клубный формат жизни в экологически чистом южном предгорье с кристальным горным воздухом.',
  },
  {
    slug: 'ajkol',
    name: 'ЖД Айкол',
    category: 'active',
    classType: 'Комфорт-класс',
    image: '/projects/ajkol.jpg',
    address: 'ул. Арашан, 10',
    deadline: '2026 г. 2 квартал',
    price: 'от 950 $/м²',
    floors: '9 этажей',
    desc: 'Надежный монолитно-кирпичный дом высокой готовности. Скорый ввод в эксплуатацию.',
  },
  {
    slug: 'kelechek',
    name: 'ЖК Келечек',
    category: 'finished',
    classType: 'Комфорт-класс',
    image: '/projects/Kelechek.jpg',
    address: 'ул. Космическая, 153',
    deadline: 'Сдан в эксплуатацию',
    price: 'Все квартиры проданы',
    floors: '9 этажей',
    desc: 'Успешно завершенный, введенный в эксплуатацию и заселенный жилой комплекс.',
  },
  {
    slug: 'ordo',
    name: 'КД Ордо',
    category: 'finished',
    classType: 'Клубный дом',
    image: '/projects/Ordo.jpg',
    address: 'ул. Тверская, 20',
    deadline: 'Сдан в эксплуатацию',
    price: 'Все квартиры проданы',
    floors: '7 этажей',
    desc: 'Первый сданный клубный дом компании с авторской отделкой фасада и террасой.',
  },
];

const PAYMENT_METHODS = [
  {
    slug: 'usloviya#calculator',
    title: 'Рассрочка 0%',
    badge: 'Без банка',
    desc: 'Беспроцентная внутренняя рассрочка от застройщика до 40 месяцев без справок о доходах.',
    icon: '🗓️',
    actionText: 'Рассчитать платеж',
  },
  {
    slug: 'usloviya#trade-in',
    title: 'Trade-in (Бартер)',
    badge: 'Популярно',
    desc: 'Быстрый обмен вашего автомобиля или вторичного жилья в счет первого взноса за новую квартиру.',
    icon: '🚗',
    actionText: 'Оценить авто / жилье',
  },
  {
    slug: 'usloviya',
    title: '100% Расчет',
    badge: 'Выгода',
    desc: 'Индивидуальная специальная скидка при единовременной оплате и приоритетный выбор видовых этажей.',
    icon: '💎',
    actionText: 'Узнать скидку',
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'finished'>('all');

  const filteredProjects =
    activeTab === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <main className="min-h-screen bg-[#fafbfa] text-gray-900 selection:bg-[#d4b26f] selection:text-[#064734]">
      
      {/* ========================================================================= */}
      {/* 1. ГЛАВНЫЙ ЭКРАН (HERO) — ПРЕМИАЛЬНЫЙ СТИЛЬ С ПЛАВНЫМ ФОНОМ               */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92dvh] sm:min-h-[640px] md:min-h-[720px] flex items-center justify-center bg-[#064734] text-white pt-24 pb-20 px-4 sm:px-6 overflow-hidden">
        
        {/* Фоновое архитектурное изображение */}
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="Архитектура EL ORDO GROUP"
            className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Глубокий градиент для кристальной читаемости текста */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#021c15] via-[#064734]/85 to-black/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* Статусный бейдж */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d4b26f]/40 text-[#d4b26f] text-xs font-black uppercase tracking-widest mb-6 shadow-lg animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Строительная компания EL ORDO GROUP • Бишкек</span>
          </div>

          {/* Главный заголовок */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-tight sm:leading-none mb-6 drop-shadow-xl">
            АРХИТЕКТУРА ВАШЕГО СТАТУСА <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4b26f] via-[#eddab2] to-[#d4b26f]">
              И СЕМЕЙНОГО УЮТА
            </span>
          </h1>

          {/* Описание */}
          <p className="text-sm sm:text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-2xl mb-10 px-2 drop-shadow">
            Создаем современные жилые комплексы премиум и бизнес-класса в Бишкеке. Монолитно-кирпичная надежность, сейсмостойкость 9 баллов и честная рассрочка 0% до 40 месяцев.
          </p>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full sm:w-auto bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-8 py-4 rounded-2xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-xl shadow-[#d4b26f]/20 text-center"
            >
              Выбрать жилой комплекс
            </a>
            <Link
              href="/usloviya"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl text-xs sm:text-sm border border-white/25 transition-all backdrop-blur-md text-center"
            >
              Калькулятор рассрочки 0%
            </Link>
          </div>

          {/* 🌟 Полоса доверия (Trust Bar) прямо в Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mt-14 pt-8 border-t border-white/15 text-left">
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-[#d4b26f] block">0%</span>
              <span className="text-[11px] sm:text-xs text-gray-300 font-medium leading-tight block mt-0.5">
                Рассрочка до 40 мес. без банка
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-white block">9 баллов</span>
              <span className="text-[11px] sm:text-xs text-gray-300 font-medium leading-tight block mt-0.5">
                Сейсмостойкость по нормам СНиП
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-[#d4b26f] block">Trade-in</span>
              <span className="text-[11px] sm:text-xs text-gray-300 font-medium leading-tight block mt-0.5">
                Обмен вашего авто или жилья
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-white block">100%</span>
              <span className="text-[11px] sm:text-xs text-gray-300 font-medium leading-tight block mt-0.5">
                Юридическая чистота и ДДУ
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ПОЧЕМУ ВЫБИРАЮТ EL ORDO — СТАНДАРТЫ КАЧЕСТВА                          */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            Безупречные стандарты
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] tracking-tight">
            Почему нам доверяют семьи Бишкека
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md hover:shadow-xl hover:border-[#064734]/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-2xl mb-6">
              🏛️
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3">
              Монолит + жженый кирпич
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Каркас из прочного железобетона с заполнением экологичным жженым кирпичом. Отличная шумоизоляция и сейсмостойкость конструкции 9 баллов.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md hover:shadow-xl hover:border-[#064734]/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-2xl mb-6">
              📋
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3">
              Прямой ДДУ и Красная книга
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Все строительные площадки имеют полный пакет разрешительных документов. Оформление по закону КР с регистрацией в государственных органах.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md hover:shadow-xl hover:border-[#064734]/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-2xl mb-6">
              🌲
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3">
              Экология и премиальные виды
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Продуманные локации: от респектабельного центра столицы до южного предгорья с постоянным притоком чистого горного воздуха без смога.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. КАТАЛОГ ОБЪЕКТОВ С БЫСТРЫМИ ТАБАМИ                                    */}
      {/* ========================================================================= */}
      <section id="projects" className="bg-[#f0f4f1] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
                Флагманские проекты
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] tracking-tight">
                Наши жилые комплексы
              </h2>
            </div>

            {/* Быстрые фильтры */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-gray-200 shadow-sm">
              {[
                { id: 'all', label: 'Все' },
                { id: 'active', label: '🏗️ В продаже' },
                { id: 'finished', label: '✓ Сданные' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#064734] text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Сетка карточек проектов */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => {
              const isFinished = project.category === 'finished';
              return (
                <div
                  key={project.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Фото проекта */}
                    <div className="relative h-60 w-full overflow-hidden bg-neutral-900">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Бейдж статуса */}
                      <div className="absolute top-3.5 left-3.5">
                        <span
                          className={`text-[11px] font-black uppercase px-3 py-1.5 rounded-xl shadow-md ${
                            isFinished
                              ? 'bg-[#2b2b2b] text-white'
                              : 'bg-[#064734] text-white'
                          }`}
                        >
                          {isFinished ? 'Сдан' : project.classType}
                        </span>
                      </div>

                      {/* Цена */}
                      {project.price && (
                        <div className="absolute bottom-3.5 right-3.5 bg-black/75 backdrop-blur-md text-[#d4b26f] text-xs font-black px-3 py-1.5 rounded-xl border border-white/10 shadow">
                          {project.price}
                        </div>
                      )}
                    </div>

                    {/* Описание */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-gray-950 mb-2 group-hover:text-[#064734] transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-5 leading-relaxed line-clamp-2">
                        {project.desc}
                      </p>

                      <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-4 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-[#d4b26f]">📍</span>
                          <span>{project.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#d4b26f]">🗓️</span>
                          <span>{project.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#d4b26f]">🏢</span>
                          <span>{project.floors}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Кнопка перехода */}
                  <div className="p-6 pt-0">
                    <Link
                      href={`/${project.slug}`}
                      className="block w-full text-center bg-[#064734] hover:bg-[#032b20] text-[#d4b26f] hover:text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-md"
                    >
                      Подробнее о проекте →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white hover:bg-gray-50 border border-gray-300 text-xs font-black uppercase tracking-wider text-[#064734] shadow-sm hover:shadow transition-all"
            >
              <span>Посмотреть полный каталог всех объектов</span>
              <span>→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. СПОСОБЫ ОПЛАТЫ — ПРЕМИАЛЬНЫЙ ИНФОРМАТИВНЫЙ БЛОК                        */}
      {/* ========================================================================= */}
      <section id="payments" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            Прозрачные расчеты
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] tracking-tight">
            Условия приобретения жилья
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PAYMENT_METHODS.map((method, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl hover:border-[#064734]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl">{method.icon}</span>
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#064734]/10 text-[#064734]">
                    {method.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-gray-950 mb-3">
                  {method.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {method.desc}
                </p>
              </div>

              <Link
                href={`/${method.slug}`}
                className="w-full text-center bg-[#064734] hover:bg-[#032b20] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow"
              >
                {method.actionText} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ФОРМА ЗАЯВКИ НА КОНСУЛЬТАЦИЮ                                           */}
      {/* ========================================================================= */}
      <ConsultationForm />

      {/* ========================================================================= */}
      {/* 6. ОФИС ПРОДАЖ И ИНТЕРАКТИВНАЯ КАРТА БИШКЕКА                             */}
      {/* ========================================================================= */}
      <section className="bg-white border-t border-gray-100 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
              Ждем вас в гости
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] tracking-tight">
              Головной офис продаж
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto mb-14">
            <div>
              <p className="text-xs text-gray-400 mb-1">Адрес офиса:</p>
              <p className="text-lg font-bold text-gray-900 mb-4">
                г. Бишкек, ул. И. Ахунбаева, 137/1
              </p>
              <div className="space-y-1.5 text-sm font-semibold text-gray-800 mb-4">
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
                href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D1%80%D0%B8%D0%B5%D1%85%D0%B0%D1%82%D1%8c%20%D0%BA%20%D0%B2%D0%B0%D0%BC%20%D0%B2%20%D0%BE%D1%84%D0%B8%D1%81%20%D0%BD%D0%B0%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#032b20] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow text-center"
              >
                <span>💬</span> Записаться на визит в WhatsApp
              </a>
              <a
                href="https://instagram.com/elordo.group"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#064734] text-gray-800 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center"
              >
                <span>📸</span> Перейти в Instagram
              </a>
            </div>
          </div>

          {/* Карта */}
          <BishkekMap />
        </div>
      </section>

    </main>
  );
}