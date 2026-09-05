'use client';

import { useState } from 'react';
import Link from 'next/link';
import BishkekMap from '@/components/BishkekMap';
import ConsultationForm from '@/components/ConsultationForm';
import { PROJECTS_LIST, COMPANY_INFO } from '@/lib/data';

const PAYMENT_CARDS = [
  {
    slug: 'rassrochka',
    title: 'Рассрочка 0%',
    badge: 'Без банка',
    desc: 'Беспроцентная внутренняя рассрочка от застройщика до 40 месяцев без справок о доходах и кредитных проверок.',
    icon: '🗓️',
    actionText: 'Условия и расчет платежа',
  },
  {
    slug: 'trade-in',
    title: 'Trade-in (Бартер)',
    badge: 'Оценка за 24 ч',
    desc: 'Быстрый обмен вашего автомобиля или вторичной недвижимости в счет первого взноса за новую квартиру.',
    icon: '🚗',
    actionText: 'Оценить авто или жилье',
  },
  {
    slug: 'polniy-raschet',
    title: '100% Расчет',
    badge: 'Макс. выгода',
    desc: 'Индивидуальная специальная скидка при единовременной оплате и приоритетный выбор лучших видовых этажей.',
    icon: '💎',
    actionText: 'Узнать размер скидки',
  },
];

const ADVANTAGES = [
  {
    icon: '🏛️',
    title: 'Монолит + жженый кирпич',
    desc: 'Каркас из прочного железобетона марки М350 с заполнением экологичным жженым кирпичом. Высокая звукоизоляция и сейсмостойкость 9 баллов.',
  },
  {
    icon: '📋',
    title: 'Прямой ДДУ и Красная книга',
    desc: 'Все объекты возводятся на собственных участках с Красными книгами. Оформление официального Договора долевого участия с госрегистрацией в КР.',
  },
  {
    icon: '🌲',
    title: 'Экология и панорамные виды',
    desc: 'Локации в престижном центре столицы и экологически чистом южном предгорье с постоянным притоком горного воздуха и видом на хребет Ала-Тоо.',
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'finished'>('all');

  const filteredProjects =
    activeTab === 'all'
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((p) => p.category === activeTab);

  const activeCount = PROJECTS_LIST.filter((p) => p.category === 'active').length;
  const finishedCount = PROJECTS_LIST.filter((p) => p.category === 'finished').length;

  return (
    <main className="min-h-screen bg-[#fafbfa] text-gray-900 selection:bg-[#d4b26f] selection:text-[#064734]">
      
      {/* 1. ГЛАВНЫЙ ЭКРАН (HERO) */}
      <section className="relative min-h-[92dvh] sm:min-h-[640px] md:min-h-[720px] flex items-center justify-center bg-[#064734] text-white pt-24 pb-20 px-4 sm:px-6 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="Архитектура EL ORDO GROUP"
            className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021c15] via-[#064734]/85 to-black/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d4b26f]/40 text-[#d4b26f] text-xs font-black uppercase tracking-widest mb-6 shadow-lg animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Строительная компания EL ORDO GROUP • Бишкек</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-tight sm:leading-none mb-6 drop-shadow-xl">
            АРХИТЕКТУРА ВАШЕГО СТАТУСА <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4b26f] via-[#eddab2] to-[#d4b26f]">
              И СЕМЕЙНОГО УЮТА
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-2xl mb-10 px-2 drop-shadow">
            С 2021 года возводим современные жилые комплексы в Бишкеке. Монолитно-кирпичная надежность, сейсмостойкость 9 баллов и честная рассрочка 0% до 40 месяцев без участия банков.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full sm:w-auto bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-8 py-4 rounded-2xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-xl shadow-[#d4b26f]/20 text-center"
            >
              Выбрать жилой комплекс
            </a>
            <Link
              href="/rassrochka"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl text-xs sm:text-sm border border-white/25 transition-all backdrop-blur-md text-center"
            >
              Условия рассрочки 0%
            </Link>
          </div>

          {/* Полоса доверия (Trust Bar) */}
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
                Обмен авто или жилья за 24 ч
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-white block">100%</span>
              <span className="text-[11px] sm:text-xs text-gray-300 font-medium leading-tight block mt-0.5">
                Госрегистрация ДДУ и чистота
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ПОЧЕМУ ВЫБИРАЮТ EL ORDO */}
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
          {ADVANTAGES.map((adv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md hover:shadow-xl hover:border-[#064734]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-2xl mb-6">
                  {adv.icon}
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3">
                  {adv.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. КАТАЛОГ ОБЪЕКТОВ С БЫСТРЫМИ ТАБАМИ */}
      <section id="projects" className="bg-[#f0f4f1] py-16 sm:py-24 px-4 sm:px-6 scroll-mt-20">
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

            {/* Фильтры объектов */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-gray-200 shadow-sm">
              {[
                { id: 'all', label: `Все (${PROJECTS_LIST.length})` },
                { id: 'active', label: `🏗️ В продаже (${activeCount})` },
                { id: 'finished', label: `✓ Сданные (${finishedCount})` },
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
              const isFinished = project.isFinished;
              return (
                <div
                  key={project.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden bg-neutral-900">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute top-3.5 left-3.5">
                        <span
                          className={`text-[11px] font-black uppercase px-3 py-1.5 rounded-xl shadow-md ${
                            isFinished
                              ? 'bg-[#2b2b2b] text-white'
                              : 'bg-[#064734] text-white'
                          }`}
                        >
                          {isFinished ? 'Сдан ✓' : project.classType}
                        </span>
                      </div>

                      {project.price && (
                        <div className="absolute bottom-3.5 right-3.5 bg-black/75 backdrop-blur-md text-[#d4b26f] text-xs font-black px-3 py-1.5 rounded-xl border border-white/10 shadow">
                          {project.price}
                        </div>
                      )}
                    </div>

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
              <span>Посмотреть полный каталог всех 6 объектов</span>
              <span>→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 4. СПОСОБЫ ОПЛАТЫ */}
      <section id="payments" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            Прозрачные расчеты
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] tracking-tight">
            Условия приобретения жилья
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PAYMENT_CARDS.map((method, idx) => (
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

      {/* 5. ОТЗЫВЫ РЕЗИДЕНТОВ И ИНВЕСТОРОВ */}
      <section className="bg-[#f2f6f4] py-16 sm:py-20 px-4 sm:px-6 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
              Реальные истории
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] tracking-tight">
              Отзывы наших покупателей
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPANY_INFO.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#d4b26f] text-sm mb-4">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic mb-6">
                    «{rev.text}»
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#064734] text-[#d4b26f] font-black text-sm flex items-center justify-center shrink-0">
                    {rev.author[0]}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-gray-900 leading-tight">
                      {rev.author}
                    </h4>
                    {rev.role && (
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        {rev.role}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ФОРМА ЗАЯВКИ НА КОНСУЛЬТАЦИЮ */}
      <ConsultationForm />

      {/* 7. ОФИС ПРОДАЖ И ИНТЕРАКТИВНАЯ КАРТА БИШКЕКА */}
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
                {COMPANY_INFO.address}
              </p>
              <div className="space-y-1.5 text-sm font-semibold text-gray-800 mb-4">
                {COMPANY_INFO.phones.map((phone, idx) => (
                  <p key={idx}>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#064734]">
                      {phone}
                    </a>
                  </p>
                ))}
              </div>
              <a
                href={COMPANY_INFO.gisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064734] hover:underline"
              >
                <span>📍</span> Открыть маршрут в 2GIS →
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                  'Здравствуйте! Хочу записаться на консультацию в офис продаж EL ORDO GROUP.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#032b20] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow text-center"
              >
                <span>💬</span> Записаться на визит в WhatsApp
              </a>
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#064734] text-gray-800 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center"
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