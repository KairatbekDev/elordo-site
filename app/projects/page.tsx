'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Project {
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

const PROJECTS: Project[] = [
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
    desc: 'Флагманский архитектурный проект столицы с панорамным остеклением и видами на горы Ала-Тоо.',
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
    desc: 'Статусный жилой комплекс в развитом деловом центре столицы с закрытой охраняемой территорией.',
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
    desc: 'Клубный формат жизни в экологически благоприятном южном предгорье с кристально чистым воздухом.',
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
    desc: 'Надежный монолитно-кирпичный дом в высокой степени готовности. Скорый ввод в эксплуатацию.',
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
    desc: 'Полностью завершенный, введенный в эксплуатацию и заселенный жилой комплекс в тихом районе.',
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
    desc: 'Первый знаковый клубный дом компании с авторской архитектурой, подземным паркингом и террасой.',
  },
];

export default function ProjectsCatalogPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'finished'>('all');

  const filteredProjects =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((item) => item.category === filter);

  const activeCount = PROJECTS.filter((p) => p.category === 'active').length;
  const finishedCount = PROJECTS.filter((p) => p.category === 'finished').length;

  return (
    <main className="min-h-screen bg-[#fafbfa] text-gray-900 pb-20">
      
      {/* 1. Хлебные крошки */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link href="/" className="hover:text-[#064734] transition-colors">
            Главная
          </Link>
          <span>/</span>
          <span className="text-[#064734] font-semibold">Каталог объектов</span>
        </div>
      </div>

      {/* 2. Заголовок раздела */}
      <section className="bg-[#064734] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4b26f] block mb-2">
            ПОРТФОЛИО EL ORDO GROUP
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide mb-4">
            ЖИЛЫЕ КОМПЛЕКСЫ В БИШКЕКЕ
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            От масштабных высотных башен премиум-класса до уютных клубных домов в предгорье. Выберите подходящий объект для комфортной жизни или надежных инвестиций.
          </p>
        </div>
      </section>

      {/* 3. Фильтры и статистика */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-gray-200">
          
          {/* Кнопки переключения */}
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-bold">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-[#064734] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Все объекты ({PROJECTS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('active')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                filter === 'active'
                  ? 'bg-[#064734] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              🏗️ Строящиеся ({activeCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('finished')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                filter === 'finished'
                  ? 'bg-[#064734] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              ✓ Сданные в эксплуатацию ({finishedCount})
            </button>
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Показано объектов: <strong className="text-gray-900">{filteredProjects.length}</strong>
          </div>
        </div>

        {/* 4. Сетка карточек проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredProjects.map((project) => {
            const isFinished = project.category === 'finished';

            return (
              <div
                key={project.slug}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Изображение проекта */}
                  <div className="relative h-64 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Бейдж статуса */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`text-[11px] font-extrabold uppercase px-3 py-1.5 rounded-xl shadow-md ${
                          isFinished
                            ? 'bg-[#2b2b2b] text-white'
                            : 'bg-[#d4b26f] text-[#064734]'
                        }`}
                      >
                        {isFinished ? 'Сдан' : project.classType}
                      </span>
                    </div>

                    {/* Бейдж цены */}
                    {project.price && (
                      <div className="absolute bottom-4 right-4 bg-[#064734]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 shadow">
                        {project.price}
                      </div>
                    )}
                  </div>

                  {/* Контентная часть */}
                  <div className="p-6">
                    <h2 className="text-xl font-black text-gray-950 mb-2 group-hover:text-[#064734] transition-colors">
                      {project.name}
                    </h2>
                    
                    <p className="text-xs text-gray-600 mb-5 leading-relaxed line-clamp-2">
                      {project.desc}
                    </p>

                    <div className="space-y-2.5 text-xs text-gray-600 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[#d4b26f] text-sm">📍</span>
                        <span className="font-medium">{project.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#d4b26f] text-sm">🗓️</span>
                        <span className="font-medium">{project.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#d4b26f] text-sm">🏢</span>
                        <span className="font-medium">{project.floors}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Кнопка перехода */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/${project.slug}`}
                    className="block w-full text-center bg-[#064734] hover:bg-[#042e22] text-[#d4b26f] hover:text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-md"
                  >
                    Подробнее о проекте →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. Баннер консультации внизу каталога */}
        <div className="mt-16 bg-[#dbe3df] rounded-3xl p-8 sm:p-12 border border-[#064734]/15 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-wider text-[#064734] block mb-1">
              Не знаете, какой объект выбрать?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#064734] uppercase mb-2">
              ПОЛУЧИТЕ ПОЛНУЮ ШАХМАТКУ И ПЛАНИРОВКИ
            </h3>
            <p className="text-xs sm:text-sm text-[#064734]/85 leading-relaxed">
              Отдел продаж отправит презентацию по всем комплексам, свободным этажам и рассчитает график платежей по рассрочке прямо в WhatsApp.
            </p>
          </div>

          <a
            href="https://wa.me/996709115115?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8c%20%D0%BF%D0%BE%D0%BB%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%20%D0%B8%20%D1%88%D0%B0%D1%85%D0%BC%D0%B0%D1%82%D0%BA%D1%83%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#064734] hover:bg-[#032b20] text-white font-bold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
          >
            <span>💬</span> Написать в WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}