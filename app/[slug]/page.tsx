import Link from 'next/link';
import { notFound } from 'next/navigation';
import FloorPlansSection, { ApartmentPlan } from '@/components/FloorPlansSection';
import TypicalFloorsSection, { TypicalFloorItem } from '@/components/TypicalFloorsSection';

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
    classType: 'Премиум',
    theme: 'dark',
    hero: {
      tag: 'ЖИЛОЙ КОМПЛЕКС',
      title: 'ABU DHABI',
      subtitle:
        'Две 25-этажные башни премиум-класса в центре столицы. Архитектура, вдохновленная восточной эстетикой и современными формами.',
      image: '/projects/Abu-Dhabi.png',
      deadline: '2029 г. 3 квартал',
      price: 'от 1650 $',
      address: 'ул. Сухомлинова, 29',
    },
    advantages: [
      {
        title: 'Концепция «Город в городе»',
        desc: 'Фитнес-зал премиум-класса и авторский ресторан прямо внутри комплекса. Все необходимое — в вашем доме.',
        icon: 'city',
      },
      {
        title: 'Безопасность будущего',
        desc: 'Бесключевой доступ через системы Face ID и Touch ID. Абсолютная приватность и защита 24/7.',
        icon: 'security',
      },
      {
        title: 'Пространство для идей',
        desc: 'Высота потолков 3.45 метра. Максимум света, объема и свободы для ваших дизайнерских решений.',
        icon: 'space',
      },
    ],
    infrastructure: {
      title: 'ЖИЗНЬ В ФОРМАТЕ ALL-IN-ONE',
      subtitle:
        'Инфраструктура, которая предугадывает желания: от личного тренера до гастрономических ужинов. Лучшие школы и детские сады города — в 2 минутах ходьбы.',
      items: [
        {
          name: 'Fitness Center',
          desc: 'Ваш личный зал для здоровья и энергии.',
          image: '/layouts/abu-dhabi/fitness.jpg',
        },
        {
          name: 'Premium Restaurant',
          desc: 'Гастрономические вечера прямо в вашем доме.',
          image: '/layouts/abu-dhabi/restaurant.jpg',
        },
        {
          name: 'Private Park',
          desc: 'Пространство без машин для спокойных прогулок и тишины.',
          image: '/layouts/abu-dhabi/park.jpg',
        },
      ],
    },
    legalText:
      'Abu Dhabi — это недвижимость, подтвержденная документально. Ознакомьтесь с разрешительными документами, посетив наш офис продаж.',
    plans: [
      // 1-комнатные
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '49.48 м²', image: '/layouts/abu-dhabi/1 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '49.73 м²', image: '/layouts/abu-dhabi/2 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок А', area: '50.88 м²', image: '/layouts/abu-dhabi/3 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '54.68 м²', image: '/layouts/abu-dhabi/4 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '55.62 м²', image: '/layouts/abu-dhabi/5 1room-abu.png' },
      { rooms: 1, title: '1-ком квартира в ЖК Abu Dhabi блок Б', area: '58.05 м²', image: '/layouts/abu-dhabi/6 1room-abu.png' },

      // 2-комнатные
      { rooms: 2, title: '2х ком квартира в ЖК Abu Dhabi блок Б', area: '78.30 м²', image: '/layouts/abu-dhabi/1 2room-abu.png' },
      { rooms: 2, title: '2-ком квартира в ЖК Abu Dhabi блок А', area: '79.77 м²', image: '/layouts/abu-dhabi/2 2room-abu.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Abu Dhabi блок А', area: '80.26 м²', image: '/layouts/abu-dhabi/3 2room-abu.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Abu Dhabi блок Б', area: '81.59 м²', image: '/layouts/abu-dhabi/4 2room-abu.png' },
      { rooms: 2, title: '2-ком квартира в ЖК Abu Dhabi блок А', area: '83.58 м²', image: '/layouts/abu-dhabi/5 2room-abu.png' },
      { rooms: 2, title: '2х ком квартира в ЖК Abu Dhabi блок А', area: '83.99 м²', image: '/layouts/abu-dhabi/6 2room-abu.png' },

      // 3-комнатная
      { rooms: 3, title: '3х ком квартира в ЖК Abu Dhabi блок Б', area: '119.32 м²', image: '/layouts/abu-dhabi/1 3room-abu.png' },
    ],
  },
  'madina-residence': {
    name: 'ЖК Madina Residence',
    classType: 'Бизнес',
    theme: 'light',
    hero: {
      tag: 'ЖИЛОЙ КОМПЛЕКС',
      title: 'MADINA RESIDENCE',
      subtitle:
        'Символ вашего успеха в центре столицы. Дом для тех, кто ценит время, статус и эстетику городской жизни.',
      image: '/projects/Madina-Residense.png',
      deadline: '2027 г. 3 квартал',
      price: 'от 1400 $',
      address: 'ул. Огонбаева, 12',
    },
    advantages: [
      {
        title: 'Панорама достижений',
        desc: 'Уникальный вид на главный флаг страны и центр столицы прямо из вашей гостиной.',
        icon: 'view',
      },
      {
        title: 'Сердце города',
        desc: 'Ул. Огонбаева, 12. Максимальная близость к административному и культурному центру Бишкека.',
        icon: 'city',
      },
      {
        title: 'Статус Бизнес-класса',
        desc: 'Продуманная безопасность, просторные планировки и премиальные материалы отделки.',
        icon: 'security',
      },
    ],
    infrastructure: {
      title: 'ВНУТРЕННЯЯ ИНФРАСТРУКТУРА',
      subtitle:
        'Пространство, продуманное для динамичного ритма жизни: закрытая территория, современные зоны ожидания и доступ к лучшим школам города.',
      items: [
        {
          name: 'View Point',
          desc: 'Ваша личная панорама символов страны.',
          image: '/layouts/madina-residence/madina1.jpg',
        },
        {
          name: 'Kids Zone',
          desc: 'Безопасное пространство для развития детей.',
          image: '/layouts/madina-residence/park.jpg',
        },
        {
          name: 'Lobby',
          desc: 'Комфорт и статус с первой секунды.',
          image: '/layouts/madina-residence/lobby.jpg',
        },
      ],
    },
    legalText:
      'Мы работаем открыто. Ознакомьтесь с разрешительными документами на строительство объекта, посетив наш офис обслуживания.',
    plans: [
      // 1-комнатные
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

      // 2-комнатные (все 11 вариантов)
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

      // 3-комнатная
      { rooms: 3, title: '3х ком квартира в ЖК Madina Residence блок Б', area: '108.48 м²', image: '/layouts/madina-residence/1 3room-madina.png' },
    ],
  },
  'ajkol-plus': {
    name: 'ЖД Айкол +',
    classType: 'Комфорт+',
    theme: 'light',
    hero: {
      tag: 'ЖИЛОЙ ДОМ',
      title: 'АЙКОЛ+',
      subtitle:
        'Экология и семейный уют в предгорье Бишкека (с. Кок-Жар). Ваш личный побег от городского смога в экологически чистую зону.',
      image: '/projects/Aikolplus.png',
      deadline: '2028 г. 3 квартал',
      price: 'от 1100 $',
      address: 'с. Кок-Жар, ул. Баялинова, 6',
    },
    advantages: [
      {
        title: 'Чистый воздух 365 дней в году',
        desc: 'Расположение в предгорье обеспечивает постоянную циркуляцию свежего воздуха и защиту от смога.',
        icon: 'mountain',
      },
      {
        title: 'Тепло и надежность',
        desc: 'Энергосберегающие окна и усиленная базальтовая теплоизоляция сохранят уют даже при горных ветрах.',
        icon: 'security',
      },
      {
        title: 'Приватность клубного формата',
        desc: 'Малоэтажная застройка и закрытое сообщество создают атмосферу тишины и загородного комфорта.',
        icon: 'space',
      },
    ],
    infrastructure: {
      title: 'ПРИРОДА В СОЧЕТАНИИ С КОМФОРТОМ',
      subtitle:
        'Пространство для здорового роста детей и отдыха родителей. Закрытый безопасный двор и близость к лучшим частным школам района.',
      items: [
        {
          name: 'Eco Play',
          desc: 'Современные детские площадки из натуральных материалов.',
          image: '/layouts/ajkol-plus/ecoplay.jpg',
        },
        {
          name: 'Green Zone',
          desc: 'Зоны для прогулок и отдыха на свежем воздухе.',
          image: '/layouts/ajkol-plus/greenzone.jpg',
        },
        {
          name: 'Parking',
          desc: 'Удобная парковочная зона для жителей и гостей.',
          image: '/layouts/ajkol-plus/parking.jpg',
        },
      ],
    },
    legalText:
      'Мы ценим ваше доверие и работаем строго по закону. Ознакомьтесь с документацией дома, посетив наш офис продаж.',
    typicalFloors: [
      { id: '2', label: '2 этаж', image: '/layouts/ajkol-plus/2floor.jpg' },
      { id: '3-8', label: '3-8 этаж', image: '/layouts/ajkol-plus/3-8floor.jpg' },
      { id: '9', label: '9 этаж', image: '/layouts/ajkol-plus/9floor.jpg' },
      { id: '10', label: '10 этаж', image: '/layouts/ajkol-plus/10floor.jpg' },
    ],
  },
  'ajkol': {
    name: 'ЖД Айкол',
    classType: 'Комфорт',
    theme: 'light',
    hero: {
      tag: 'ЖИЛОЙ ДОМ',
      title: 'АЙКОЛ',
      subtitle:
        'Уютный малоквартирный жилой дом комфорт-класса в тихом районе столицы. Монолитно-кирпичная конструкция и сейсмостойкость 9 баллов.',
      image: '/projects/ajkol.jpg',
      deadline: '2026 г. 2 квартал',
      price: 'от 950 $',
      address: 'ул. Арашан 10',
    },
    advantages: [
      {
        title: 'Близкая сдача объекта',
        desc: 'Строительство находится на финальной стадии сдачи. Сдача запланирована на 2 квартал 2026 года.',
        icon: 'city',
      },
      {
        title: 'Сейсмостойкость 9 баллов',
        desc: 'Прочный монолитный железобетонный каркас с заполнением из жженого кирпича.',
        icon: 'security',
      },
      {
        title: 'Спокойный район',
        desc: 'Тихая жилая зона с развитой социальной инфраструктурой и удобной транспортной развязкой.',
        icon: 'space',
      },
    ],
    infrastructure: {
      title: 'ИНФРАСТРУКТУРА КОМПЛЕКСА',
      subtitle: 'Все необходимое для безопасной и комфортной семейной жизни.',
      items: [
        {
          name: 'Детская зона',
          desc: 'Безопасное пространство для игр детей во дворе.',
          image: '/projects/ajkol.jpg',
        },
        {
          name: 'Парковочные места',
          desc: 'Наземный паркинг для жителей дома и гостей.',
          image: '/projects/ajkol.jpg',
        },
        {
          name: 'Инженерные узлы',
          desc: 'Центральные коммуникации и современные лифты.',
          image: '/projects/ajkol.jpg',
        },
      ],
    },
    legalText:
      'Строительство ведется в строгом соответствии с нормами СНиП КР. Все разрешительные документы доступны в офисе.',
    plans: [
      { rooms: 1, title: '1-ком квартира в ЖД Айкол', area: 'от 42 м²' },
      { rooms: 2, title: '2-ком квартира в ЖД Айкол', area: 'от 65 м²' },
    ],
  },
  'kelechek': {
    name: 'ЖК Келечек',
    classType: 'Комфорт',
    theme: 'light',
    hero: {
      tag: 'СДАН В ЭКСПЛУАТАЦИЮ',
      title: 'КЕЛЕЧЕК',
      subtitle:
        'Успешно завершенный и заселенный жилой комплекс от EL ORDO GROUP. Практичный пример надежности нашей компании.',
      image: '/projects/Kelechek.jpg',
      deadline: 'Сдан в эксплуатацию',
      price: 'Все квартиры проданы',
      address: 'ул. Космическая, 153',
    },
    advantages: [
      {
        title: 'Объект сдан Госкомиссии',
        desc: 'Все строительные работы завершены, дом подключен ко всем городским сетям, жильцы получили техпаспорта.',
        icon: 'security',
      },
      {
        title: 'Благоустроенный двор',
        desc: 'Оборудованная детская площадка, зоны отдыха для жильцов и парковочные места.',
        icon: 'city',
      },
      {
        title: 'Энергоэффективность',
        desc: 'Качественное утепление наружных стен базальтом и современные стеклопакеты.',
        icon: 'space',
      },
    ],
    infrastructure: {
      title: 'ГОТОВАЯ СРЕДА',
      subtitle: 'Комплекс полностью функционирует для жителей.',
      items: [
        {
          name: 'Закрытый двор',
          desc: 'Безопасная территория без посторонних машин.',
          image: '/projects/Kelechek.jpg',
        },
        {
          name: 'Игровой городок',
          desc: 'Детская площадка для активного отдыха.',
          image: '/projects/Kelechek.jpg',
        },
        {
          name: 'Отделка холлов',
          desc: 'Чистые и светлые входные группы.',
          image: '/projects/Kelechek.jpg',
        },
      ],
    },
    legalText:
      'Объект полностью сдан в эксплуатацию. Обязательства перед всеми дольщиками закрыты на 100%.',
  },
  'ordo': {
    name: 'Клубный дом Ордо',
    classType: 'Премиум',
    theme: 'dark',
    hero: {
      tag: 'СДАН В ЭКСПЛУАТАЦИЮ',
      title: 'КД ОРДО',
      subtitle:
        'Первый клубный дом компании EL ORDO. Камерный премиум-формат с панорамным видом на горы и авторской архитектурой.',
      image: '/projects/Ordo.jpg',
      deadline: 'Сдан в эксплуатацию',
      price: 'Все квартиры проданы',
      address: 'ул. Тверская, 20',
    },
    advantages: [
      {
        title: 'Клубный формат',
        desc: 'Малоэтажное здание с ограниченным числом квартир для максимальной приватности резидентов.',
        icon: 'space',
      },
      {
        title: 'Вид на горы',
        desc: 'Панорамное остекление открывает живописный вид на горный хребет Ала-Тоо.',
        icon: 'view',
      },
      {
        title: 'Премиальная отделка',
        desc: 'Натуральный гранит и травертин в облицовке фасада, бесшумный лифт европейского качества.',
        icon: 'security',
      },
    ],
    infrastructure: {
      title: 'КЛУБНАЯ АТМОСФЕРА',
      subtitle: 'Приватная территория для ценителей персонального комфорта.',
      items: [
        {
          name: 'Закрытый контур',
          desc: 'Круглосуточный контроль доступа и видеонаблюдение.',
          image: '/projects/Ordo.jpg',
        },
        {
          name: 'Паркинг',
          desc: 'Удобные машиноместа для каждого резидента.',
          image: '/projects/Ordo.jpg',
        },
        {
          name: 'Озеленение',
          desc: 'Ухоженная территория с хвойными насаждениями.',
          image: '/projects/Ordo.jpg',
        },
      ],
    },
    legalText:
      'Клубный дом полностью сдан и заселен. Визитная карточка качества строительства EL ORDO GROUP.',
    videoUrl: 'https://www.youtube.com',
  },
};

const REVIEWS = [
  {
    name: 'Омурбек Нуржанов',
    text: 'Приобрели квартиру на объекте Мадина. Хочу отметить сервис и условия рассрочки. Все выполнено качественно и точно в срок.',
  },
  {
    name: 'Жаныбек Убайдуллаев',
    text: 'Искренне благодарен компании EL ORDO за быстрое и качественное воплощение проекта. Слаженная работа бригад и профессионализм.',
  },
  {
    name: 'Nusratullo Sangakov',
    text: 'Отличная компания! EL ORDO GROUP показали высокий профессионализм и ответственность на всех этапах строительства.',
  },
];

export async function generateStaticParams() {
  return Object.keys(COMPLEXES_DATA).map((slug) => ({ slug }));
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
  const whatsappHeroText = encodeURIComponent(
    `Здравствуйте! Интересует ${project.name}. Хочу узнать о наличии свободных планировок, этажей и расчете рассрочки.`
  );

  return (
    <main className={`min-h-screen ${isDark ? 'bg-[#181818] text-white' : 'bg-[#fafbfa] text-gray-900'}`}>
      
      {/* 1. Хлебные крошки */}
      <div className={`border-b ${isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link href="/" className="hover:text-[#d4b26f] transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-[#d4b26f] transition-colors">
            Каталог объектов
          </Link>
          <span>/</span>
          <span className={isDark ? 'text-[#d4b26f]' : 'text-[#064734]'}>
            {project.name}
          </span>
        </div>
      </div>

      {/* 2. Hero-секция */}
      <section className="relative min-h-[520px] flex items-center justify-center bg-[#064734] text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={project.hero.image}
            alt={project.name}
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4b26f] block mb-2">
            {project.hero.tag}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wide leading-tight mb-5 drop-shadow-lg">
            {project.hero.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            {project.hero.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/996709115115?text=${whatsappHeroText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d4b26f] hover:bg-[#c29f5a] text-[#064734] font-black px-8 py-3.5 rounded-full uppercase tracking-wider text-xs sm:text-sm transition-all shadow-md"
            >
              Получить консультацию в WhatsApp
            </a>
            <Link
              href="/projects"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-sm"
            >
              Смотреть все объекты
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Преимущества */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className={`text-2xl sm:text-3xl font-black text-center uppercase tracking-wider mb-14 ${isDark ? 'text-white' : 'text-[#064734]'}`}>
          ПРЕИМУЩЕСТВА
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {project.advantages.map((adv, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 transition-all flex flex-col items-center text-center ${
                isDark
                  ? 'bg-[#222222] border border-white/5 hover:border-[#d4b26f]/30'
                  : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#064734]/15 flex items-center justify-center text-[#d4b26f] mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {adv.title}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Инфраструктура */}
      <section className={`py-20 px-6 ${isDark ? 'bg-[#141414]' : 'bg-[#f0f4f2]'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-wider mb-4 ${isDark ? 'text-[#d4b26f]' : 'text-[#064734]'}`}>
              {project.infrastructure.title}
            </h2>
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {project.infrastructure.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.infrastructure.items.map((item, idx) => (
              <div key={idx} className="group">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4 bg-neutral-900 shadow-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.name}
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Юридические гарантии */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className={`text-xl sm:text-2xl font-black uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-[#064734]'}`}>
          ЮРИДИЧЕСКИЕ ГАРАНТИИ
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {project.legalText}
        </p>
      </section>

      {/* 6. Способы оплаты (ссылки на раздел условий) */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className={`text-xl sm:text-2xl font-black text-center uppercase tracking-wider mb-8 ${isDark ? 'text-[#d4b26f]' : 'text-[#064734]'}`}>
          СПОСОБЫ ОПЛАТЫ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/usloviya"
            className="p-6 rounded-2xl bg-[#0b3b2c] text-white border border-white/10 hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold mb-1">100% ОПЛАТА</h3>
              <p className="text-xs text-white/80">Максимальная выгода и персональная скидка при полной оплате.</p>
            </div>
            <span className="mt-4 text-xs font-bold text-[#d4b26f] uppercase">Подробнее →</span>
          </Link>

          <Link
            href="/usloviya"
            className="p-6 rounded-2xl bg-[#0b3b2c] text-white border border-white/10 hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold mb-1">РАССРОЧКА</h3>
              <p className="text-xs text-white/80">Беспроцентная внутренняя рассрочка до 40 месяцев без банка.</p>
            </div>
            <span className="mt-4 text-xs font-bold text-[#d4b26f] uppercase">Рассчитать платеж →</span>
          </Link>

          <Link
            href="/usloviya"
            className="p-6 rounded-2xl bg-[#0b3b2c] text-white border border-white/10 hover:border-[#d4b26f]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold mb-1">TRADE-IN (БАРТЕР)</h3>
              <p className="text-xs text-white/80">Обмен авто или вторичной недвижимости в счет первого взноса.</p>
            </div>
            <span className="mt-4 text-xs font-bold text-[#d4b26f] uppercase">Подробнее →</span>
          </Link>
        </div>
      </section>

      {/* 7. Планировки ИЛИ Типовые этажи ИЛИ Блок сданного объекта */}
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
      ) : (
        <section className="py-16 px-6 max-w-4xl mx-auto text-center">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Объект сдан в эксплуатацию</h3>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Все квартиры от застройщика в данном жилом комплексе распроданы. Чтобы узнать о наличии предложений от собственников на вторичном рынке, свяжитесь с нашим отделом продаж.
            </p>
          </div>
        </section>
      )}

      {/* 8. Отзывы */}
      <section className="relative py-20 px-6 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/projects/Abu-Dhabi.png"
            alt="Отзывы"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-[#032b20]/90" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-center uppercase tracking-wider text-[#d4b26f] mb-12">
            ОТЗЫВЫ РЕЗИДЕНТОВ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-7 flex flex-col justify-between text-center"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                    👤
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed italic mb-6">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <h3 className="text-sm font-bold text-[#d4b26f]">
                  {rev.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Свяжитесь с нами */}
      <section className={`py-16 border-t ${isDark ? 'bg-[#181818] border-white/10' : 'bg-white border-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight text-center uppercase mb-10 ${isDark ? 'text-white' : 'text-[#064734]'}`}>
            ОФИС ПРОДАЖ И КОНСУЛЬТАЦИИ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto mb-12">
            <div>
              <p className="text-xs text-gray-400 mb-1">Адрес объекта:</p>
              <p className="text-base font-bold mb-3">{project.hero.address}</p>
              <div className="space-y-1 text-sm font-semibold">
                <p>+996 709 115 115</p>
                <p>+996 990 115 115</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/996709115115?text=${whatsappHeroText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#032b20] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow"
              >
                <span>💬</span> Написать в WhatsApp
              </a>
              <a
                href="https://instagram.com/elordo.group"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#d4b26f] px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>📸</span> Перейти в Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}