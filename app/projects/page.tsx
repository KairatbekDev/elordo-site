'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Project {
  slug: string;
  name: string;
  category: 'active' | 'finished';
  classType: string;
  classCategory: 'premium' | 'business' | 'comfort';
  image: string;
  address: string;
  deadline: string;
  price: string | null;
  priceNum: number; // Для точной числовой сортировки
  floors: string;
  desc: string;
}

const PROJECTS: Project[] = [
  {
    slug: 'abu-dhabi',
    name: 'ЖК Abu Dhabi',
    category: 'active',
    classType: 'Премиум-класс',
    classCategory: 'premium',
    image: '/projects/Abu-Dhabi.png',
    address: 'ул. Сухомлинова, 29',
    deadline: '2029 г. 3 квартал',
    price: 'от 1 650 $/м²',
    priceNum: 1650,
    floors: '25 этажей (2 башни)',
    desc: 'Флагманский архитектурный проект столицы с панорамным остеклением и видами на горы Ала-Тоо.',
  },
  {
    slug: 'madina-residence',
    name: 'ЖК Madina Residence',
    category: 'active',
    classType: 'Бизнес-класс',
    classCategory: 'business',
    image: '/projects/Madina-Residense.png',
    address: 'ул. Огонбаева, 12',
    deadline: '2027 г. 3 квартал',
    price: 'от 1 400 $/м²',
    priceNum: 1400,
    floors: '14 этажей',
    desc: 'Статусный жилой комплекс в развитом деловом центре столицы с закрытой охраняемой территорией.',
  },
  {
    slug: 'ajkol-plus',
    name: 'ЖД Айкол +',
    category: 'active',
    classType: 'Комфорт+',
    classCategory: 'comfort',
    image: '/projects/Aikolplus.png',
    address: 'с. Кок-Жар, ул. Баялинова, 6',
    deadline: '2028 г. 3 квартал',
    price: 'от 1 100 $/м²',
    priceNum: 1100,
    floors: '10 этажей',
    desc: 'Клубный формат жизни в экологически благоприятном южном предгорье с кристально чистым воздухом.',
  },
  {
    slug: 'ajkol',
    name: 'ЖД Айкол',
    category: 'active',
    classType: 'Комфорт-класс',
    classCategory: 'comfort',
    image: '/projects/ajkol.jpg',
    address: 'ул. Арашан, 10',
    deadline: '2026 г. 2 квартал',
    price: 'от 950 $/м²',
    priceNum: 950,
    floors: '9 этажей',
    desc: 'Надежный монолитно-кирпичный дом в высокой степени готовности. Скорый ввод в эксплуатацию.',
  },
  {
    slug: 'kelechek',
    name: 'ЖК Келечек',
    category: 'finished',
    classType: 'Комфорт-класс',
    classCategory: 'comfort',
    image: '/projects/Kelechek.jpg',
    address: 'ул. Космическая, 153',
    deadline: 'Сдан в эксплуатацию',
    price: 'Все квартиры проданы',
    priceNum: 0,
    floors: '9 этажей',
    desc: 'Полностью завершенный, введенный в эксплуатацию и заселенный жилой комплекс в тихом районе.',
  },
  {
    slug: 'ordo',
    name: 'КД Ордо',
    category: 'finished',
    classType: 'Клубный дом',
    classCategory: 'premium',
    image: '/projects/Ordo.jpg',
    address: 'ул. Тверская, 20',
    deadline: 'Сдан в эксплуатацию',
    price: 'Все квартиры проданы',
    priceNum: 0,
    floors: '7 этажей',
    desc: 'Первый знаковый клубный дом компании с авторской архитектурой, подземным паркингом и террасой.',
  },
];

export default function ProjectsCatalogPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'finished'>('all');
  const [classFilter, setClassFilter] = useState<'all' | 'premium' | 'business' | 'comfort'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Фильтрация и сортировка
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((item) => {
      // Фильтр готовности
      if (statusFilter !== 'all' && item.category !== statusFilter) return false;
      // Фильтр класса
      if (classFilter !== 'all' && item.classCategory !== classFilter) return false;
      // Поиск по названию или адресу
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchAddress = item.address.toLowerCase().includes(query);
        if (!matchName && !matchAddress) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return (a.priceNum || 999999) - (b.priceNum || 999999);
      }
      if (sortBy === 'price-desc') {
        return (b.priceNum || 0) - (a.priceNum || 0);
      }
      return 0;
    });
  }, [statusFilter, classFilter, searchQuery, sortBy]);

  const activeCount = PROJECTS.filter((p) => p.category === 'active').length;
  const finishedCount = PROJECTS.filter((p) => p.category === 'finished').length;

  const resetFilters = () => {
    setStatusFilter('all');
    setClassFilter('all');
    setSearchQuery('');
    setSortBy('default');
  };

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

      {/* 2. Заголовок раздела со сводными метриками */}
      <section className="bg-[#064734] text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            ПОРТФОЛИО EL ORDO GROUP
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide mb-4">
            ЖИЛЫЕ КОМПЛЕКСЫ В БИШКЕКЕ
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            От масштабных высотных башен премиум-класса до уютных клубных домов в предгорье. Выберите подходящий объект для жизни или инвестиций.
          </p>

          {/* Быстрые цифры */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">Всего объектов:</span>
              <strong className="text-lg font-black text-white">{PROJECTS.length} комплекса</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">Стоимость:</span>
              <strong className="text-lg font-black text-[#d4b26f]">от 950 $/м²</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">Рассрочка:</span>
              <strong className="text-lg font-black text-white">до 40 месяцев 0%</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-gray-300 block">Бартер:</span>
              <strong className="text-lg font-black text-white">Trade-in (Авто)</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Интерактивная панель поиска и фильтров */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        
        {/* Верхняя панель: Поиск и Сортировка */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию или адресу (например: Сухомлинова, Огонбаева)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#064734] shadow-sm transition-all"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 whitespace-nowrap hidden sm:inline">
              Сортировка:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="py-3 px-4 rounded-2xl bg-white border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#064734] shadow-sm cursor-pointer"
            >
              <option value="default">По умолчанию</option>
              <option value="price-asc">Сначала доступные ($)</option>
              <option value="price-desc">Сначала премиальные ($$$)</option>
            </select>
          </div>
        </div>

        {/* Табы фильтров: Статус и Класс */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          
          {/* Статус объекта */}
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                statusFilter === 'all'
                  ? 'bg-[#064734] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Все объекты ({PROJECTS.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                statusFilter === 'active'
                  ? 'bg-[#064734] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              🏗️ Строящиеся ({activeCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('finished')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                statusFilter === 'finished'
                  ? 'bg-[#064734] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              ✓ Сданные ({finishedCount})
            </button>
          </div>

          {/* Класс жилья */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-gray-600">
            <span className="text-[11px] uppercase font-bold text-gray-400 mr-1">Класс:</span>
            {[
              { id: 'all', label: 'Все' },
              { id: 'premium', label: 'Премиум' },
              { id: 'business', label: 'Бизнес' },
              { id: 'comfort', label: 'Комфорт' },
            ].map((cls) => (
              <button
                key={cls.id}
                type="button"
                onClick={() => setClassFilter(cls.id as typeof classFilter)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  classFilter === cls.id
                    ? 'bg-gray-900 text-white font-bold'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cls.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 font-medium mt-4">
          <span>
            Найдено комплексов: <strong className="text-gray-900">{filteredProjects.length}</strong>
          </span>
          {(statusFilter !== 'all' || classFilter !== 'all' || searchQuery !== '' || sortBy !== 'default') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#064734] hover:underline font-bold"
            >
              Сбросить все фильтры
            </button>
          )}
        </div>

        {/* 4. Сетка карточек проектов */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {filteredProjects.map((project) => {
              const isFinished = project.category === 'finished';
              const waProjectText = encodeURIComponent(
                `Здравствуйте! Интересует ${project.name}. Подскажите актуальные цены и свободные варианты.`
              );

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

                  {/* Кнопки действий */}
                  <div className="p-6 pt-0 space-y-2">
                    <Link
                      href={`/${project.slug}`}
                      className="block w-full text-center bg-[#064734] hover:bg-[#042e22] text-[#d4b26f] hover:text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-md"
                    >
                      Подробнее о проекте →
                    </Link>

                    {!isFinished && (
                      <a
                        href={`https://wa.me/996709115115?text=${waProjectText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-gray-100 hover:bg-[#064734]/10 text-[#064734] font-bold py-2.5 rounded-xl uppercase tracking-wider text-[11px] transition-colors"
                      >
                        Спросить о наличии в WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Состояние пустого поиска */
          <div className="py-20 text-center bg-white rounded-3xl border border-gray-200 mt-6 p-8">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Объекты не найдены</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
              Попробуйте изменить параметры поиска или сбросить активные фильтры.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-6 py-3 rounded-xl bg-[#064734] text-white font-bold text-xs uppercase tracking-wider"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

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