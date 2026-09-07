import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FloorPlansSection, { ApartmentPlan } from '@/components/FloorPlansSection';
import TypicalFloorsSection, { TypicalFloorItem } from '@/components/TypicalFloorsSection';
import { COMPANY_INFO } from '@/lib/data';
import {
  IconCheck,
  IconMapPin,
  IconPhone,
  IconWhatsApp,
  IconInstagram,
  IconDiamond,
  IconCalendar,
  IconCar,
  IconArrowRight,
  IconStar,
} from '@/components/Icons';

interface ComplexSpecs {
  floors: string;
  ceiling: string;
  construction: string;
  seismic: string;
  heating: string;
}

interface ComplexData {
  name: string;
  classType: string;
  theme: 'dark' | 'light';
  hero: {
    tag: string;
    title: string;
    subtitle: string;
    image: string;
    deadline: string;
    price: string;
    address: string;
  };
  specs: ComplexSpecs;
  advantages: {
    title: string;
    desc: string;
    icon: 'city' | 'security' | 'space' | 'mountain' | 'view';
  }[];
  infrastructure: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      desc: string;
      image: string;
    }[];
  };
  legalText: string;
  plans?: ApartmentPlan[];
  typicalFloors?: TypicalFloorItem[];
  videoUrl?: string;
}

const COMPLEXES_DATA: Record<string, ComplexData> = {
  'abu-dhabi': {
    name: 'ЖК Abu Dhabi',
    classType: 'Премиум-класс',
    theme: 'dark',
    hero: {
      tag: 'ЖИЛОЙ КОМПЛЕКС',
      title: 'ABU DHABI',
      subtitle:
        'Две 25-этажные высотные башни премиум-класса на улице Сухомлинова. Архитектура, вдохновленная восточной эстетикой, панорамное остекление и собственная клубная инфраструктура.',
      image: '/projects/Abu-Dhabi.png',
      deadline: '2029 г. 3 квартал',
      price: 'от 1 650 $',
      address: 'ул. Сухомлинова, 29',
    },
    specs: {
      floors: '25 этажей (2 башни)',
      ceiling: '3.45 м',
      construction: 'Монолитный железобетон, жженый кирпич',
      seismic: '9 баллов по шкале MSK-64',
      heating: 'Автономное газовое отопление',
    },
    advantages: [
      {
        title: 'Концепция «Город в городе»',
        desc: 'Фитнес-клуб премиум-класса, ресторан авторской кухни и лобби прямо внутри комплекса.',
        icon: 'city',
      },
      {
        title: 'Безопасность будущего',
        desc: 'Система Face ID, Touch ID, круглосуточная охрана, закрытый приватный двор и консьерж-сервис 24/7.',
        icon: 'security',
      },
      {
        title: 'Свобода пространства',
        desc: 'Высота потолков 3.45 м, панорамные окна от пола до потолка с видами на горный хребет Ала-Тоо.',
        icon: 'space',
      },
    ],
    infrastructure: {
      title: 'ЖИЗНЬ В ФОРМАТЕ ALL-IN-ONE',
      subtitle:
        'Все для комфортной жизни внутри одной территории: приватный парк без машин, подземный двухуровневый паркинг и топовые гимназии в шаговой доступности.',
      items: [
        {
          name: 'Fitness & Spa Center',
          desc: 'Ваш приватный зал для спорта и релаксации без выезда в город.',
          image: '/layouts/abu-dhabi/fitness.jpg',
        },
        {
          name: 'Premium Restaurant',
          desc: 'Гастрономические ужины и деловые встречи на первом этаже комплекса.',
          image: '/layouts/abu-dhabi/restaurant.jpg',
        },
        {
          name: 'Private Park & Lounge',
          desc: 'Двор-сад без автомобилей с детскими площадками и прогулочными аллеями.',
          image: '/layouts/abu-dhabi/park.jpg',
        },
      ],
    },
    legalText:
      'ЖК Abu Dhabi возводится в строгом соответствии со СНиП КР. Полный пакет разрешительной документации, Красная книга и положительное заключение Госэкспертизы доступны в офисе продаж.',
    plans: [
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '49.48 м²', image: '/layouts/abu-dhabi/1 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '49.73 м²', image: '/layouts/abu-dhabi/2 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок А', area: '50.88 м²', image: '/layouts/abu-dhabi/3 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '54.68 м²', image: '/layouts/abu-dhabi/4 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '55.62 м²', image: '/layouts/abu-dhabi/5 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '58.05 м²', image: '/layouts/abu-dhabi/6 1room-abu.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Abu Dhabi блок Б', area: '78.30 м²', image: '/layouts/abu-dhabi/1 2room-abu.png' },
      { rooms: 2, title: '2-ком квартира в ЖК Abu Dhabi блок А', area: '79.77 м²', image: '/layouts/abu-dhabi/2 2room-abu.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Abu Dhabi блок А', area: '80.26 м²', image: '/layouts/abu-dhabi/3 2room-abu.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Abu Dhabi блок Б', area: '81.59 м²', image: '/layouts/abu-dhabi/4 2room-abu.png' },
      { rooms: 2, title: '2-ком квартира в ЖК Abu Dhabi блок А', area: '83.58 м²', image: '/layouts/abu-dhabi/5 2room-abu.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Abu Dhabi блок А', area: '83.99 м²', image: '/layouts/abu-dhabi/6 2room-abu.png' },
      { rooms: 3, title: '3х ком квартира в ЖК Abu Dhabi блок Б', area: '119.32 м²', image: '/layouts/abu-dhabi/1 3room-abu.png' },
    ],
  },
  'madina-residence': {
    name: 'ЖК Madina Residence',
    classType: 'Бизнес-класс',
    theme: 'light',
    hero: {
      tag: 'ЖИЛОЙ КОМПЛЕКС',
      title: 'MADINA RESIDENCE',
      subtitle:
        'Символ статуса в административном и культурном центре Бишкека. Респектабельный дом для тех, кто ценит время, приватность и комфорт городской среды.',
      image: '/projects/Madina-Residense.png',
      deadline: '2027 г. 3 квартал',
      price: 'от 1 400 $',
      address: 'ул. Огонбаева, 12',
    },
    specs: {
      floors: '14 этажей',
      ceiling: '3.15 м',
      construction: 'Монолитный каркас, кирпич, базальт 100 мм',
      seismic: '9 баллов',
      heating: 'Центральные городские коммуникации',
    },
    advantages: [
      {
        title: 'Панорама на центр столицы',
        desc: 'Вид на площадь и главный флаг страны прямо из гостиной вашей квартиры.',
        icon: 'view',
      },
      {
        title: 'Локация в центре',
        desc: 'Ул. Огонбаева, 12. Шаговая доступность до правительственных учреждений, театров и парков.',
        icon: 'city',
      },
      {
        title: 'Европейские стандарты',
        desc: 'Дизайнерская отделка лобби, скоростные бесшумные лифты и охраняемая закрытая территория.',
        icon: 'security',
      },
    ],
    infrastructure: {
      title: 'ВНУТРЕННЯЯ ИНФРАСТРУКТУРА',
      subtitle:
        'Пространство, продуманное для динамичной жизни: закрытая охраняемая территория, подземный паркинг и безопасная игровая среда для детей.',
      items: [
        {
          name: 'Панорамный обзор',
          desc: 'Видовые террасы и остекление с видами на центр Бишкека.',
          image: '/layouts/madina-residence/madina1.jpg',
        },
        {
          name: 'Kids Play Zone',
          desc: 'Экологичные детские игровые комплексы на безопасном резиновом покрытии.',
          image: '/layouts/madina-residence/park.jpg',
        },
        {
          name: 'Дизайнерское Лобби',
          desc: 'Стойка консьержа, зона ожидания гостей и отделка керамогранитом.',
          image: '/layouts/madina-residence/lobby.jpg',
        },
      ],
    },
    legalText:
      'Объект возводится на земельном участке с Красной книгой. Оформление по ДДУ с государственной регистрацией в Госрегистре КР.',
    plans: [
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок А', area: '43.59 м²', image: '/layouts/madina-residence/1 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок А', area: '45.21 м²', image: '/layouts/madina-residence/2 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок В', area: '46.47 м²', image: '/layouts/madina-residence/3 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок Б', area: '48.60 м²', image: '/layouts/madina-residence/1 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок В', area: '49.03 м²', image: '/layouts/madina-residence/2 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок В', area: '49.14 м²', image: '/layouts/madina-residence/3 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок А', area: '49.90 м²', image: '/layouts/madina-residence/1 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок Б', area: '50.01 м²', image: '/layouts/madina-residence/2 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок А', area: '50.18 м²', image: '/layouts/madina-residence/3 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок В', area: '53.15 м²', image: '/layouts/madina-residence/1 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок А', area: '53.88 м²', image: '/layouts/madina-residence/2 1room-madina.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Madina Residence блок Б', area: '57.87 м²', image: '/layouts/madina-residence/3 1room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок А', area: '71.00 м²', image: '/layouts/madina-residence/1 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок В', area: '71.07 м²', image: '/layouts/madina-residence/2 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок Б', area: '74.30 м²', image: '/layouts/madina-residence/3 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок А', area: '74.53 м²', image: '/layouts/madina-residence/4 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок В', area: '74.59 м²', image: '/layouts/madina-residence/5 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок В', area: '74.74 м²', image: '/layouts/madina-residence/6 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок А', area: '75.90 м²', image: '/layouts/madina-residence/7 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок А', area: '81.30 м²', image: '/layouts/madina-residence/8 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок В', area: '81.31 м²', image: '/layouts/madina-residence/9 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок А', area: '83.78 м²', image: '/layouts/madina-residence/10 2room-madina.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Madina Residence блок В', area: '84.09 м²', image: '/layouts/madina-residence/11 2room-madina.png' },
      { rooms: 3, title: '3х ком квартира в ЖК Madina Residence блок Б', area: '108.48 м²', image: '/layouts/madina-residence/1 3room-madina.png' },
    ],
  },
  'ajkol-plus': {
    name: 'ЖД Айкол +',
    classType: 'Комфорт+',
    theme: 'light',
    hero: {
      tag: 'КЛУБНЫЙ ДОМ',
      title: 'АЙКОЛ+',
      subtitle:
        'Экология и семейный уют в экологически чистом южном предгорье Бишкека (с. Кок-Жар). Жизнь в гармонии с природой без смога с кристально чистым воздухом круглый год.',
      image: '/projects/Aikolplus.png',
      deadline: '2028 г. 3 квартал',
      price: 'от 1 100 $',
      address: 'с. Кок-Жар, ул. Баялинова, 6',
    },
    specs: {
      floors: '10 этажей',
      ceiling: '3.00 м',
      construction: 'Монолитный каркас, жженый кирпич',
      seismic: '9 баллов',
      heating: 'Автономная газифицированная котельная',
    },
    advantages: [
      {
        title: 'Чистый воздух 365 дней в году',
        desc: 'Расположение в южном предгорье обеспечивает постоянный приток свежего горного воздуха и отсутствие смога.',
        icon: 'mountain',
      },
      {
        title: 'Усиленная теплоизоляция',
        desc: 'Энергосберегающее остекление и базальтовое утепление 100 мм защищают от любых перепадов температур.',
        icon: 'security',
      },
      {
        title: 'Камерный клубный формат',
        desc: 'Малое количество квартир на площадке, дружелюбное комьюнити и закрытая безопасная территория.',
        icon: 'space',
      },
    ],
    infrastructure: {
      title: 'ПРИРОДА В СОЧЕТАНИИ С КОМФОРТОМ',
      subtitle:
        'Пространство для безопасного взросления детей и спокойного отдыха родителей. Закрытый двор без машин и близость к частным школам района.',
      items: [
        {
          name: 'Eco Play Zone',
          desc: 'Детские площадки из натурального дерева и безопасных материалов.',
          image: '/layouts/ajkol-plus/ecoplay.jpg',
        },
        {
          name: 'Green Walk Zone',
          desc: 'Прогулочные дорожки и хвойное озеленение территории дома.',
          image: '/layouts/ajkol-plus/greenzone.jpg',
        },
        {
          name: 'Удобный паркинг',
          desc: 'Оборудованные парковочные места для резидентов и гостей комплекса.',
          image: '/layouts/ajkol-plus/parking.jpg',
        },
      ],
    },
    legalText:
      'Строительство ведется на собственном земельном участке. Проект имеет положительное заключение государственной экспертизы.',
    typicalFloors: [
      { id: '2', label: '2 этаж', image: '/layouts/ajkol-plus/2floor.jpg' },
      { id: '3-8', label: '3-8 этаж', image: '/layouts/ajkol-plus/3-8floor.jpg' },
      { id: '9', label: '9 этаж', image: '/layouts/ajkol-plus/9floor.jpg' },
      { id: '10', label: '10 этаж', image: '/layouts/ajkol-plus/10floor.jpg' },
    ],
  },
  'ajkol': {
    name: 'ЖД Айкол',
    classType: 'Комфорт-класс',
    theme: 'light',
    hero: {
      tag: 'ЖИЛОЙ ДОМ',
      title: 'АЙКОЛ',
      subtitle:
        'Уютный малоквартирный жилой дом комфорт-класса в высокой стадии строительной готовности. Монолитно-кирпичный конструктив и надежные инженерные сети.',
      image: '/projects/ajkol.jpg',
      deadline: '2026 г. 2 квартал',
      price: 'от 950 $',
      address: 'ул. Арашан, 10',
    },
    specs: {
      floors: '9 этажей',
      ceiling: '3.00 м',
      construction: 'Монолитный железобетон, кирпичные стены',
      seismic: '9 баллов',
      heating: 'Газовое отопление',
    },
    advantages: [
      {
        title: 'Скорый ввод в эксплуатацию',
        desc: 'Строительные работы находятся на завершающей стадии. Сдача дома запланирована на 2026 год.',
        icon: 'city',
      },
      {
        title: 'Сейсмостойкость 9 баллов',
        desc: 'Каркас из прочного армированного бетона с заполнением из экологичного жженого кирпича.',
        icon: 'security',
      },
      {
        title: 'Тихий обжитой район',
        desc: 'Развитая социальная инфраструктура: рядом магазины, школы, удобные транспортные развязки.',
        icon: 'space',
      },
    ],
    infrastructure: {
      title: 'ИНФРАСТРУКТУРА ДОМА',
      subtitle: 'Все необходимое для спокойной и безопасной семейной жизни.',
      items: [
        {
          name: 'Детская площадка',
          desc: 'Безопасное огороженное игровое пространство во дворе.',
          image: '/projects/ajkol.jpg',
        },
        {
          name: 'Наземный паркинг',
          desc: 'Парковочные места для автомобилей жильцов дома.',
          image: '/projects/ajkol.jpg',
        },
        {
          name: 'Инженерные узлы',
          desc: 'Современные бесшумные лифты и качественные коммуникации.',
          image: '/projects/ajkol.jpg',
        },
      ],
    },
    legalText:
      'Строительство ведется в строгом соответствии с нормами СНиП КР. Полная документация доступна в офисе продаж.',
  },
  'kelechek': {
    name: 'ЖК Келечек',
    classType: 'Комфорт-класс',
    theme: 'light',
    hero: {
      tag: 'СДАН В ЭКСПЛУАТАЦИЮ',
      title: 'КЕЛЕЧЕК',
      subtitle:
        'Успешно завершенный, введенный в эксплуатацию и заселенный жилой комплекс от EL ORDO GROUP. Реальное подтверждение надежности девелопера.',
      image: '/projects/Kelechek.jpg',
      deadline: 'Сдан в эксплуатацию',
      price: 'Все квартиры проданы',
      address: 'ул. Космическая, 153',
    },
    specs: {
      floors: '9 этажей',
      ceiling: '3.00 м',
      construction: 'Монолитный железобетон, жженый кирпич',
      seismic: '9 баллов',
      heating: 'Центральные городские коммуникации',
    },
    advantages: [
      {
        title: '100% сдан Госкомиссии',
        desc: 'Дом подключен ко всем городским коммуникациям, жильцы получили техпаспорта на квартиры.',
        icon: 'security',
      },
      {
        title: 'Благоустроенная территория',
        desc: 'Детский городок, асфальтированные подъездные пути и озелененный двор.',
        icon: 'city',
      },
      {
        title: 'Тепло и экономия',
        desc: 'Наружное утепление негорючим базальтом и качественные пластиковые стеклопакеты.',
        icon: 'space',
      },
    ],
    infrastructure: {
      title: 'ГОТОВАЯ ЖИЛАЯ СРЕДА',
      subtitle: 'Дом полностью заселен и функционирует.',
      items: [
        {
          name: 'Закрытый двор',
          desc: 'Тихая и безопасная дворовая территория для жителей.',
          image: '/projects/Kelechek.jpg',
        },
        {
          name: 'Игровой городок',
          desc: 'Спортивные и детские зоны активного отдыха.',
          image: '/projects/Kelechek.jpg',
        },
        {
          name: 'Светлые холлы',
          desc: 'Аккуратная отделка входных групп и лестничных маршей.',
          image: '/projects/Kelechek.jpg',
        },
      ],
    },
    legalText:
      'Жилой комплекс введен в эксплуатацию. Обязательства перед всеми дольщиками закрыты в полном объеме.',
  },
  'ordo': {
    name: 'Клубный дом Ордо',
    classType: 'Клубный дом',
    theme: 'dark',
    hero: {
      tag: 'СДАН В ЭКСПЛУАТАЦИЮ',
      title: 'КД ОРДО',
      subtitle:
        'Первый реализованный клубный дом компании EL ORDO GROUP. Камерный формат, авторский фасад из натурального камня и панорама на горы.',
      image: '/projects/Ordo.jpg',
      deadline: 'Сдан в эксплуатацию',
      price: 'Все квартиры проданы',
      address: 'ул. Тверская, 20',
    },
    specs: {
      floors: '7 этажей',
      ceiling: '3.30 м',
      construction: 'Монолитный каркас, кирпич, гранит',
      seismic: '9 баллов',
      heating: 'Автономная газовая котельная',
    },
    advantages: [
      {
        title: 'Приватный клубный статус',
        desc: 'Малоэтажное здание с ограниченным числом резидентов для максимального спокойствия.',
        icon: 'space',
      },
      {
        title: 'Панорамный вид на горы',
        desc: 'Широкое остекление открывает живописный вид на горные вершины Ала-Тоо.',
        icon: 'view',
      },
      {
        title: 'Премиальные материалы',
        desc: 'Фасад облицован натуральным гранитом и травертином, установлен бесшумный лифт.',
        icon: 'security',
      },
    ],
    infrastructure: {
      title: 'КЛУБНАЯ АТМОСФЕРА',
      subtitle: 'Приватная среда для ценителей персонального комфорта.',
      items: [
        {
          name: 'Охраняемый контур',
          desc: 'Круглосуточный контроль доступа и система видеонаблюдения.',
          image: '/projects/Ordo.jpg',
        },
        {
          name: 'Паркинг',
          desc: 'Подземный и гостевой паркинг для автомобилей резидентов.',
          image: '/projects/Ordo.jpg',
        },
        {
          name: 'Хвойный ландшафт',
          desc: 'Ухоженная придомовая территория с элементами ландшафтного дизайна.',
          image: '/projects/Ordo.jpg',
        },
      ],
    },
    legalText:
      'Клубный дом полностью сдан и заселен. Является визитной карточкой качества и надежности девелопера EL ORDO GROUP.',
    videoUrl: 'https://www.youtube.com',
  },
};

export async function generateStaticParams() {
  return Object.keys(COMPLEXES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = COMPLEXES_DATA[slug];

  if (!project) {
    return { title: 'Объект не найден | EL ORDO GROUP' };
  }

  const isSold = project.hero.price.includes('проданы');
  const priceSnippet = isSold ? 'Сдан' : `Цена: ${project.hero.price}/м²`;

  return {
    title: `${project.name} (${priceSnippet}) — Строительная компания EL ORDO GROUP`,
    description: `${project.hero.subtitle} Адрес: ${project.hero.address}. Срок сдачи: ${project.hero.deadline}.`,
    openGraph: {
      title: `${project.name} | Официальные цены и планировки в Бишкеке`,
      description: `${project.hero.subtitle} Беспроцентная рассрочка 0% до 40 месяцев без банка.`,
      images: [
        {
          url: project.hero.image,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
  };
}

export default async function ComplexPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = COMPLEXES_DATA[slug];

  if (!project) {
    notFound();
  }

  const isDark = project.theme === 'dark';
  const isSold = project.hero.price.includes('проданы');

  const formattedPrice = isSold
    ? project.hero.price
    : `${project.hero.price} / м²`;

  const whatsappHeroText = encodeURIComponent(
    `Здравствуйте! Интересует ${project.name} (${project.hero.address}). Хочу получить актуальную шахматку свободных квартир и расчет рассрочки 0%.`
  );

  return (
    <main className={`min-h-screen pb-28 md:pb-0 ${isDark ? 'bg-[#181818] text-white' : 'bg-[#fafbfa] text-gray-900'} selection:bg-[#d4b26f] selection:text-[#064734]`}>
      
      {/* 1. Хлебные крошки */}
      <div className={`border-b ${isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link href="/" className="hover:text-[#d4b26f] transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-[#d4b26f] transition-colors">
            Каталог объектов
          </Link>
          <span>/</span>
          <span className={isDark ? 'text-[#d4b26f] font-bold' : 'text-[#064734] font-bold'}>
            {project.name}
          </span>
        </div>
      </div>

      {/* 2. Hero-секция */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center bg-[#064734] text-white py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={project.hero.image}
            alt={project.name}
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-[#d4b26f]/40 text-[#d4b26f] text-xs font-black uppercase tracking-widest mb-4 shadow">
            <span>{project.hero.tag}</span>
            <span>•</span>
            <span className="text-white">{project.classType}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-tight mb-5 drop-shadow-xl">
            {project.hero.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            {project.hero.subtitle}
          </p>

          {/* Статус-панель ключевых характеристик */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-8 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
            <div className="p-3 rounded-xl bg-black/30">
              <span className="text-[11px] text-gray-300 block mb-0.5">Стоимость:</span>
              <strong className="text-base sm:text-lg font-black text-[#d4b26f]">
                {formattedPrice}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-black/30">
              <span className="text-[11px] text-gray-300 block mb-0.5">Срок сдачи:</span>
              <strong className="text-sm sm:text-base font-bold text-white block truncate">
                {project.hero.deadline}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-black/30">
              <span className="text-[11px] text-gray-300 block mb-0.5">Локация:</span>
              <strong className="text-xs sm:text-sm font-bold text-white block truncate">
                {project.hero.address}
              </strong>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappHeroText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-8 py-4 rounded-2xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-xl flex items-center gap-2"
            >
              <IconWhatsApp className="w-4 h-4 text-[#064734]" />
              <span>{isSold ? 'Запросить вторичные варианты' : 'Получить расчет в WhatsApp'}</span>
            </a>
            <Link
              href="/projects"
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl text-xs sm:text-sm border border-white/25 transition-all backdrop-blur-md"
            >
              Все объекты компании
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Технические спецификации объекта (СНиП) */}
      <section className={`border-b py-8 px-4 sm:px-6 ${isDark ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-gray-200'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Этажность</span>
            <strong className="text-xs sm:text-sm font-black">{project.specs.floors}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Высота потолков</span>
            <strong className="text-xs sm:text-sm font-black text-[#d4b26f]">{project.specs.ceiling}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Сейсмостойкость</span>
            <strong className="text-xs sm:text-sm font-black">{project.specs.seismic}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Конструктив</span>
            <strong className="text-xs sm:text-sm font-black truncate block">{project.specs.construction}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Отопление</span>
            <strong className="text-xs sm:text-sm font-black truncate block">{project.specs.heating}</strong>
          </div>
        </div>
      </section>

      {/* 4. Преимущества комплекса */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className={`text-2xl sm:text-4xl font-black text-center uppercase tracking-tight mb-14 ${isDark ? 'text-white' : 'text-[#064734]'}`}>
          Преимущества проекта
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {project.advantages.map((adv, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 transition-all flex flex-col items-center text-center ${
                isDark
                  ? 'bg-[#222222] border border-white/5 hover:border-[#d4b26f]/40 shadow-lg'
                  : 'bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#064734]/30'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#064734]/15 flex items-center justify-center text-[#d4b26f] mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              <h3 className={`text-lg font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {adv.title}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Инфраструктура */}
      <section className={`py-20 px-4 sm:px-6 ${isDark ? 'bg-[#141414]' : 'bg-[#f0f4f2]'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className={`text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4 ${isDark ? 'text-[#d4b26f]' : 'text-[#064734]'}`}>
              {project.infrastructure.title}
            </h2>
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {project.infrastructure.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {project.infrastructure.items.map((item, idx) => (
              <div key={idx} className="group">
                <div className="relative h-64 rounded-3xl overflow-hidden mb-4 bg-neutral-900 shadow-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className={`text-base font-black mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.name}
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Планировочные решения / Типовые этажи */}
      {project.typicalFloors && project.typicalFloors.length > 0 ? (
        <TypicalFloorsSection
          projectName={project.name}
          floors={project.typicalFloors}
        />
      ) : project.plans && project.plans.length > 0 ? (
        <FloorPlansSection
          projectName={project.name}
          plans={project.plans}
          theme={project.theme}
        />
      ) : isSold ? (
        <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <IconCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black mb-2">Объект сдан в эксплуатацию</h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
              Все квартиры от застройщика в {project.name} распроданы. Чтобы узнать о наличии предложений от собственников на вторичном рынке или записаться в лист ожидания, свяжитесь с нашим отделом продаж.
            </p>
          </div>
        </section>
      ) : (
        <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <div className={`p-8 rounded-3xl border shadow-sm ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#eef2ef] border-gray-200'}`}>
            <span className="text-xs uppercase font-black tracking-widest text-[#d4b26f] block mb-2">
              Планировочные решения
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase mb-3 tracking-tight">
              Шахматка и планировки по запросу
            </h3>
            <p className={`text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Актуальный список свободных квартир, видовых этажей и расчет беспроцентной рассрочки в {project.name} менеджер отправит вам напрямую в мессенджер.
            </p>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Здравствуйте! Интересуют актуальные свободные планировки и цены в ${project.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white font-black px-7 py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-md"
            >
              <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
              <span>Запросить планировки в WhatsApp</span>
            </a>
          </div>
        </section>
      )}

      {/* 7. Способы приобретения */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className={`text-xl sm:text-3xl font-black text-center uppercase tracking-tight mb-8 ${isDark ? 'text-[#d4b26f]' : 'text-[#064734]'}`}>
          Программы приобретения в {project.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/polniy-raschet"
            className="p-7 rounded-3xl bg-[#0b3b2c] text-white border border-white/10 hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-[#d4b26f]">
                <IconDiamond className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black mb-1.5 group-hover:text-[#d4b26f] transition-colors">100% ОПЛАТА</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Максимальная персональная скидка за квадратный метр и приоритетный выбор этажа.
              </p>
            </div>
            <span className="mt-5 text-xs font-black text-[#d4b26f] uppercase tracking-wider flex items-center gap-1">
              <span>Условия скидки</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/rassrochka"
            className="p-7 rounded-3xl bg-[#0b3b2c] text-white border border-white/10 hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-[#d4b26f]">
                <IconCalendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black mb-1.5 group-hover:text-[#d4b26f] transition-colors">РАССРОЧКА 0%</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Беспроцентная внутренняя рассрочка до 40 месяцев напрямую от застройщика без банка.
              </p>
            </div>
            <span className="mt-5 text-xs font-black text-[#d4b26f] uppercase tracking-wider flex items-center gap-1">
              <span>Калькулятор выплат</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/trade-in"
            className="p-7 rounded-3xl bg-[#0b3b2c] text-white border border-white/10 hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-[#d4b26f]">
                <IconCar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black mb-1.5 group-hover:text-[#d4b26f] transition-colors">TRADE-IN (БАРТЕР)</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Рыночный зачет вашего автомобиля или вторичного жилья в счет первого взноса.
              </p>
            </div>
            <span className="mt-5 text-xs font-black text-[#d4b26f] uppercase tracking-wider flex items-center gap-1">
              <span>Оценить имущество</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* 8. Юридические гарантии */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <div className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-lg sm:text-xl font-black uppercase tracking-tight mb-3 ${isDark ? 'text-white' : 'text-[#064734]'}`}>
            Юридическая чистота и гарантии
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {project.legalText}
          </p>
        </div>
      </section>

      {/* 9. Отзывы резидентов */}
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="Отзывы"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-[#032b20]/90" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
              Репутация и доверие
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Отзывы резидентов
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPANY_INFO.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-7 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#d4b26f] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <IconStar key={i} className="w-3.5 h-3.5 text-[#d4b26f]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed italic mb-6">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <h3 className="text-xs font-black text-[#d4b26f]">
                    {rev.author}
                  </h3>
                  {rev.role && (
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      {rev.role}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Офис продаж и адрес на 2GIS */}
      <section className={`py-16 border-t ${isDark ? 'bg-[#181818] border-white/10' : 'bg-white border-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
              Отдел продаж
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-[#064734]'}`}>
              Консультация по объекту {project.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">
            <div>
              <p className="text-xs text-gray-400 mb-1">Фактический адрес объекта:</p>
              <p className="text-base font-black mb-3">{project.hero.address}</p>
              
              <div className="space-y-1 text-sm font-semibold mb-4">
                <p>{COMPANY_INFO.phones[0] || '+996 709 115 115'}</p>
                <p>{COMPANY_INFO.phones[1] || '+996 990 115 115'}</p>
              </div>

              <a
                href={`https://2gis.kg/bishkek/search/${encodeURIComponent(project.hero.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4b26f] hover:underline"
              >
                <IconMapPin className="w-3.5 h-3.5 text-[#d4b26f]" />
                <span>Открыть локацию в 2GIS</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappHeroText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow text-center"
              >
                <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                <span>Написать в WhatsApp</span>
              </a>
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#d4b26f] px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center"
              >
                <IconInstagram className="w-4 h-4 text-pink-600" />
                <span>Перейти в Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Мобильный Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-neutral-950/95 backdrop-blur-xl border-t border-white/10 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${COMPANY_INFO.phones[0]?.replace(/\s+/g, '') || '+996709115115'}`}
          className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider text-center border border-white/15 transition-all flex items-center justify-center gap-1.5"
        >
          <IconPhone className="w-3.5 h-3.5 text-white" />
          <span>Позвонить</span>
        </a>
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappHeroText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] py-3 rounded-xl bg-[#064734] hover:bg-[#032b20] text-[#d4b26f] font-black text-xs uppercase tracking-wider text-center shadow-lg flex items-center justify-center gap-1.5 transition-all"
        >
          <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
          <span>WhatsApp</span>
        </a>
      </div>

    </main>
  );
}