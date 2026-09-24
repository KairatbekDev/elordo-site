import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

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
    imageFile: string;
  }
> = {
  'abu-dhabi': {
    name: 'ЖК Abu Dhabi',
    classType: 'Премиум-класс',
    address: 'г. Бишкек, ул. Сухомлинова, 29',
    price: 'от $1 650 / м²',
    deadline: 'Срок сдачи: IV кв. 2026 г.',
    badge: 'Флагманский проект',
    imageFile: 'projects/Abu-Dhabi.png',
  },
  'madina-residence': {
    name: 'ЖК Madina Residence',
    classType: 'Бизнес-класс в центре',
    address: 'г. Бишкек, ул. Огонбаева, 12',
    price: 'от $1 500 / м²',
    deadline: 'Срок сдачи: IV кв. 2026 г.',
    badge: '14 этажей • 3 блока',
    imageFile: 'projects/Madina-Residense.png',
  },
  'ajkol-plus': {
    name: 'ЖД Айкол +',
    classType: 'Комфорт+ в эко-зоне',
    address: 'с. Кок-Жар, ул. Баялинова, 6',
    price: 'от $1 200 / м²',
    deadline: 'Срок сдачи: IV кв. 2026 г.',
    badge: 'Чистый горный воздух',
    imageFile: 'projects/Aikolplus.png',
  },
  ajkol: {
    name: 'ЖД Айкол',
    classType: 'Клубный дом',
    address: 'г. Бишкек, ул. Арашан, 10',
    price: 'Все квартиры проданы',
    deadline: 'Сдан Госкомиссии',
    badge: 'Введен в эксплуатацию',
    imageFile: 'projects/ajkol.jpg',
  },
  kelechek: {
    name: 'ЖК Келечек',
    classType: 'Жилой комплекс',
    address: 'г. Бишкек, ул. Космическая, 153',
    price: 'Все квартиры проданы',
    deadline: 'Сдан Госкомиссии',
    badge: 'Введен в эксплуатацию',
    imageFile: 'projects/Kelechek.jpg',
  },
  ordo: {
    name: 'КД Ордо',
    classType: 'Элитный клубный дом',
    address: 'г. Бишкек, ул. Тверская, 20',
    price: 'Все квартиры проданы',
    deadline: 'Сдан Госкомиссии',
    badge: 'Введен в эксплуатацию',
    imageFile: 'projects/Ordo.jpg',
  },
};

function getLocalBase64Image(relativePath: string) {
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const fullPath = path.join(process.cwd(), 'public', cleanPath);
    const file = fs.readFileSync(fullPath);
    const ext = path.extname(cleanPath).replace('.', '').toLowerCase();
    const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
    return `data:${mime};base64,${file.toString('base64')}`;
  } catch (e) {
    return null;
  }
}

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
    imageFile: 'projects/Abu-Dhabi.png',
  };

  const bgImageBase64 = getLocalBase64Image(project.imageFile);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '44px 52px',
          position: 'relative',
          fontFamily: 'sans-serif',
          backgroundColor: '#021f15',
        }}
      >
        {/* 1. Фоновое изображение объекта с кинематографичной прозрачностью */}
        {bgImageBase64 && (
          <img
            src={bgImageBase64}
            alt={project.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '1200px',
              height: '630px',
              objectFit: 'cover',
              opacity: 0.38,
            }}
          />
        )}

        {/* 2. Глубокий темный изумрудный оверлей для 100% контрастности */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '1200px',
            height: '630px',
            backgroundColor: 'rgba(2, 31, 21, 0.72)',
            display: 'flex',
          }}
        />

        {/* 3. Золотая декоративная рамка */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '1160px',
            height: '590px',
            border: '2px solid rgba(212, 178, 111, 0.45)',
            borderRadius: '24px',
            display: 'flex',
            pointerEvents: 'none',
          }}
        />

        {/* 4. Верхний ряд: Бренд и статусный бейдж */}
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
                fontSize: 34,
                fontWeight: 900,
                color: '#d4b26f',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
              }}
            >
              EL ORDO GROUP
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: '#ffffff',
                opacity: 0.9,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                marginTop: '3px',
              }}
            >
              Строительная компания • Официальное предложение
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#d4b26f',
              padding: '10px 22px',
              borderRadius: '999px',
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: '#021f15',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {project.badge}
            </span>
          </div>
        </div>

        {/* 5. Центральная часть: Класс, Название ЖК и Адрес */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: '#d4b26f',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                backgroundColor: 'rgba(2, 25, 17, 0.85)',
                border: '1px solid rgba(212, 178, 111, 0.4)',
                padding: '6px 14px',
                borderRadius: '8px',
              }}
            >
              {project.classType}
            </span>
          </div>

          <span
            style={{
              fontSize: 60,
              fontWeight: 900,
              lineHeight: 1.05,
              textTransform: 'uppercase',
              letterSpacing: '-1px',
              color: '#ffffff',
            }}
          >
            {project.name}
          </span>

          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#f1f5f9',
              marginTop: '12px',
            }}
          >
            📍 {project.address}
          </span>
        </div>

        {/* 6. Нижний ряд: 4 контрастные карточки параметров */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              flex: 1.2,
              backgroundColor: 'rgba(2, 25, 17, 0.92)',
              border: '2px solid #d4b26f',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 900, textTransform: 'uppercase' }}>
              Стоимость за м²
            </span>
            <span style={{ fontSize: 20, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              {project.price}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(2, 25, 17, 0.92)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 900, textTransform: 'uppercase' }}>
              Рассрочка 0%
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              до 36 мес. без банка
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(2, 25, 17, 0.92)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 900, textTransform: 'uppercase' }}>
              Срок сдачи
            </span>
            <span style={{ fontSize: 15, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              {project.deadline}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(2, 25, 17, 0.92)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 900, textTransform: 'uppercase' }}>
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