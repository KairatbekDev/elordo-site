export interface ProjectSpecs {
  floors: string;
  apartments: string;
  ceiling: string;
  construction: string;
  seismic: string;
  heating: string;
}

export interface Project {
  slug: string;
  name: string;
  type: 'ЖК' | 'ЖД' | 'КД';
  classType: 'Премиум' | 'Бизнес' | 'Комфорт+' | 'Комфорт' | 'Клубный дом';
  status: 'Строится' | 'Сдан в эксплуатацию';
  isFinished: boolean;
  deadline: string;
  location: string;
  address: string;
  price: string;
  image: string;
  badge: string;
  description: string;
  specs: ProjectSpecs;
  gisUrl: string;
}

export interface PurchaseCondition {
  slug: 'rassrochka' | 'trade-in' | 'polniy-raschet';
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: string;
}

// =============================================================================
// 1. ПОЛНЫЙ КАТАЛОГ ОБЪЕКТОВ EL ORDO GROUP
// =============================================================================
export const PROJECTS: Project[] = [
  {
    slug: 'abu-dhabi',
    name: 'ЖК Abu Dhabi',
    type: 'ЖК',
    classType: 'Премиум',
    status: 'Строится',
    isFinished: false,
    deadline: '2029 г. 3 квартал',
    location: 'г. Бишкек',
    address: 'ул. Сухомлинова, 29',
    price: 'от 1 650 $/м²',
    image: '/projects/Abu-Dhabi.png',
    badge: 'Флагманский проект',
    description:
      'Две 25-этажные высотные башни премиум-класса с панорамными видами на горы Ала-Тоо, подземным двухуровневым паркингом и собственной закрытой инфраструктурой.',
    specs: {
      floors: '25 этажей (2 башни)',
      apartments: '1, 2, 3, 4-комнатные',
      ceiling: '3.3 м',
      construction: 'Монолитный каркас, жженый кирпич',
      seismic: '9 баллов по шкале MSK-64',
      heating: 'Автономное газовое отопление',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%A1%D1%83%D1%85%D0%BE%D0%BC%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%2029',
  },
  {
    slug: 'madina-residence',
    name: 'ЖК Madina Residence',
    type: 'ЖК',
    classType: 'Бизнес',
    status: 'Строится',
    isFinished: false,
    deadline: '2027 г. 3 квартал',
    location: 'г. Бишкек',
    address: 'ул. Огонбаева, 12',
    price: 'от 1 400 $/м²',
    image: '/projects/Madina-Residense.png',
    badge: 'Бизнес-класс в центре',
    description:
      'Статусный жилой комплекс в историческом и деловом центре столицы. Закрытая охраняемая территория без машин, благоустроенный двор и лаунж-зоны.',
    specs: {
      floors: '14 этажей',
      apartments: '1, 2, 3-комнатные',
      ceiling: '3.1 м',
      construction: 'Монолит-кирпич, базальт 100 мм',
      seismic: '9 баллов',
      heating: 'Центральные городские коммуникации',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%9E%D0%B3%D0%BE%D0%BD%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%2012',
  },
  {
    slug: 'ajkol-plus',
    name: 'ЖД Айкол +',
    type: 'ЖД',
    classType: 'Комфорт+',
    status: 'Строится',
    isFinished: false,
    deadline: '2028 г. 3 квартал',
    location: 'с. Кок-Жар',
    address: 'ул. Баялинова, 6',
    price: 'от 1 100 $/м²',
    image: '/projects/Aikolplus.png',
    badge: 'Эко-предгорье',
    description:
      'Клубный дом повышенной комфортности в предгорье Кок-Жара. Кристально чистый воздух, современные планировки, детские площадки и зоны отдыха.',
    specs: {
      floors: '10 этажей',
      apartments: '1, 2, 3-комнатные',
      ceiling: '3.0 м',
      construction: 'Монолитный каркас, жженый кирпич',
      seismic: '9 баллов',
      heating: 'Автономная система отопления',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%9A%D0%BE%D0%BA-%D0%96%D0%B0%D1%80%20%D0%91%D0%B0%D1%8F%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%206',
  },
  {
    slug: 'ajkol',
    name: 'ЖД Айкол',
    type: 'ЖД',
    classType: 'Комфорт',
    status: 'Строится',
    isFinished: false,
    deadline: '2026 г. 2 квартал',
    location: 'г. Бишкек',
    address: 'ул. Арашан, 10',
    price: 'от 950 $/м²',
    image: '/projects/ajkol.jpg',
    badge: 'Высокая готовность',
    description:
      'Современный монолитно-кирпичный жилой дом в завершающей стадии строительства. Оптимальный выбор для комфортной семейной жизни.',
    specs: {
      floors: '9 этажей',
      apartments: '1, 2-комнатные',
      ceiling: '3.0 м',
      construction: 'Армированный монолит, кирпич',
      seismic: '9 баллов',
      heating: 'Газовое отопление',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%90%D1%80%D0%B0%D1%88%D0%B0%D0%BD%2010',
  },
  {
    slug: 'kelechek',
    name: 'ЖК Келечек',
    type: 'ЖК',
    classType: 'Комфорт',
    status: 'Сдан в эксплуатацию',
    isFinished: true,
    deadline: 'Сдан и заселен',
    location: 'г. Бишкек',
    address: 'ул. Космическая, 153',
    price: 'Все квартиры проданы',
    image: '/projects/Kelechek.jpg',
    badge: '100% готовность',
    description:
      'Полностью завершенный, успешно сданный государственной комиссии и заселенный жилой комплекс с уютным двором и детской площадкой.',
    specs: {
      floors: '9 этажей',
      apartments: '1, 2, 3-комнатные',
      ceiling: '3.0 м',
      construction: 'Монолитный железобетон, кирпич',
      seismic: '9 баллов',
      heating: 'Центральные коммуникации',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%9A%D0%BE%D1%81%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20153',
  },
  {
    slug: 'ordo',
    name: 'КД Ордо',
    type: 'КД',
    classType: 'Клубный дом',
    status: 'Сдан в эксплуатацию',
    isFinished: true,
    deadline: 'Сдан и заселен',
    location: 'г. Бишкек',
    address: 'ул. Тверская, 20',
    price: 'Все квартиры проданы',
    image: '/projects/Ordo.jpg',
    badge: 'Первый сданный проект',
    description:
      'Первый знаковый клубный дом компании с авторской архитектурой, закрытой территорией, подземным паркингом и панорамой на горы.',
    specs: {
      floors: '7 этажей',
      apartments: '1, 2, 3-комнатные',
      ceiling: '3.3 м',
      construction: 'Монолит-кирпич',
      seismic: '9 баллов',
      heating: 'Автономная котельная',
    },
    gisUrl: 'https://2gis.kg/bishkek/search/%D0%A2%D0%B2%D0%B5%D1%80%D1%81%D0%BA%D0%B0%D1%8F%2020',
  },
];

// =============================================================================
// 2. УСЛОВИЯ ПОКУПКИ (С ИСПРАВЛЕННЫМИ РОУТАМИ)
// =============================================================================
export const PURCHASE_CONDITIONS: PurchaseCondition[] = [
  {
    slug: 'rassrochka',
    title: 'Рассрочка 0%',
    subtitle: 'Прямо от застройщика без участия банков и процентов',
    description:
      'Первоначальный взнос от 20–30%, срок выплат до 40 месяцев. Индивидуальный график с переплатой 0% и оформлением только по паспорту.',
    badge: '0% переплат',
    icon: '🗓️',
  },
  {
    slug: 'trade-in', // Исправлен роут (было barter -> теперь trade-in)
    title: 'Программа Trade-in (Бартер)',
    subtitle: 'Обмен вашего автомобиля или недвижимости на квартиру',
    description:
      'Справедливая рыночная оценка вашего авто или вторичной квартиры за 24 часа. Согласованная сумма полностью засчитывается в качестве первого взноса.',
    badge: 'Оценка за 24 часа',
    icon: '🚗',
  },
  {
    slug: 'polniy-raschet',
    title: '100% расчет',
    subtitle: 'Максимальная выгода и персональные условия',
    description:
      'При единовременной оплате вы фиксируете лучшую стоимость квадратного метра, получаете максимальный дисконт и приоритет в выборе видовых этажей.',
    badge: 'Максимальная скидка',
    icon: '🏷️',
  },
];

// =============================================================================
// 3. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// =============================================================================
export function getSiteProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getSiteConditionBySlug(slug: string): PurchaseCondition | undefined {
  return PURCHASE_CONDITIONS.find((c) => c.slug === slug);
}