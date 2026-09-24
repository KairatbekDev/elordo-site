import { ImageResponse } from 'next/og';

export const alt = 'Жилой комплекс — EL ORDO GROUP';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const PROJECTS_METADATA: Record<
  string,
  {
    name: string;
    classType: string;
    address: string;
    price: string;
    deadline: string;
    badge: string;
  }
> = {
  'abu-dhabi': {
    name: 'ЖК Abu Dhabi',
    classType: 'Премиум-класс',
    address: 'г. Бишкек, ул. Сухомлинова, 29',
    price: 'от $1 650 / м²',
    deadline: 'Срок сдачи: IV кв. 2026 г.',
    badge: 'Флагманский проект',
  },
  'madina-residence': {
    name: 'ЖК Madina Residence',
    classType: 'Бизнес-класс в центре',
    address: 'г. Бишкек, ул. Огонбаева, 12',
    price: 'от $1 500 / м²',
    deadline: 'Срок сдачи: IV кв. 2026 г.',
    badge: '14 этажей • 3 блока',
  },
  'ajkol-plus': {
    name: 'ЖД Айкол +',
    classType: 'Комфорт+ в эко-зоне',
    address: 'с. Кок-Жар, ул. Баялинова, 6',
    price: 'от $1 200 / м²',
    deadline: 'Срок сдачи: IV кв. 2026 г.',
    badge: 'Чистый горный воздух',
  },
  ajkol: {
    name: 'ЖД Айкол',
    classType: 'Клубный дом',
    address: 'г. Бишкек, ул. Арашан, 10',
    price: 'Все квартиры проданы',
    deadline: 'Сдан Госкомиссии',
    badge: 'Введен в эксплуатацию',
  },
  kelechek: {
    name: 'ЖК Келечек',
    classType: 'Жилой комплекс',
    address: 'г. Бишкек, ул. Космическая, 153',
    price: 'Все квартиры проданы',
    deadline: 'Сдан Госкомиссии',
    badge: 'Введен в эксплуатацию',
  },
  ordo: {
    name: 'КД Ордо',
    classType: 'Элитный клубный дом',
    address: 'г. Бишкек, ул. Тверская, 20',
    price: 'Все квартиры проданы',
    deadline: 'Сдан Госкомиссии',
    badge: 'Введен в эксплуатацию',
  },
};

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  const project = PROJECTS_METADATA[slug] || {
    name: 'Жилой комплекс EL ORDO',
    classType: 'Премиум и бизнес-класс',
    address: 'г. Бишкек, Кыргызстан',
    price: 'от $1 200 / м²',
    deadline: 'Рассрочка 0% до 36 мес.',
    badge: 'EL ORDO GROUP',
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#064734',
          backgroundImage:
            'radial-gradient(circle at 80% 20%, #0d5c43 0%, #064734 50%, #032017 100%)',
          padding: '48px 56px',
          color: '#ffffff',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Золотая декоративная рамка */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1.5px solid rgba(212, 178, 111, 0.4)',
            borderRadius: '24px',
            display: 'flex',
            pointerEvents: 'none',
          }}
        />

        {/* 1. Верхний ряд: Бренд и бейдж объекта */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: '#d4b26f',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              EL ORDO GROUP
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#ffffff',
                opacity: 0.8,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}
            >
              Официальное предложение застройщика
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(212, 178, 111, 0.15)',
              border: '1.5px solid #d4b26f',
              padding: '10px 22px',
              borderRadius: '999px',
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: '#d4b26f',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              {project.badge}
            </span>
          </div>
        </div>

        {/* 2. Центральная часть: Название ЖК, класс и локация */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '20px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: '#d4b26f',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
              }}
            >
              {project.classType}
            </span>
          </div>

          <span
            style={{
              fontSize: 58,
              fontWeight: 900,
              lineHeight: 1.1,
              textTransform: 'uppercase',
              letterSpacing: '-1px',
              color: '#ffffff',
            }}
          >
            {project.name}
          </span>

          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.85)',
              marginTop: '12px',
            }}
          >
            📍 {project.address}
          </span>
        </div>

        {/* 3. Нижний ряд: Финансовые условия и параметры покупки */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '14px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              flex: 1.2,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1.5px solid #d4b26f',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 800, textTransform: 'uppercase' }}>
              Стоимость за м²
            </span>
            <span style={{ fontSize: 20, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              {project.price}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 800, textTransform: 'uppercase' }}>
              Рассрочка
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              0% до 36 мес. без банка
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 800, textTransform: 'uppercase' }}>
              График строительства
            </span>
            <span style={{ fontSize: 15, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              {project.deadline}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 800, textTransform: 'uppercase' }}>
              Оплата и Trade-in
            </span>
            <span style={{ fontSize: 15, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              Зачет авто за 24 ч
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}