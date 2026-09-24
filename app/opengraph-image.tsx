import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const alt = 'EL ORDO GROUP — Строительная компания в Бишкеке';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

function getLocalBase64Image(relativePath: string) {
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const fullPath = path.join(process.cwd(), 'public', cleanPath);
    const file = fs.readFileSync(fullPath);
    return `data:image/png;base64,${file.toString('base64')}`;
  } catch (e) {
    return null;
  }
}

export default async function OpenGraphImage() {
  const bgImageBase64 = getLocalBase64Image('projects/Abu-Dhabi.png');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 56px',
          position: 'relative',
          fontFamily: 'sans-serif',
          backgroundColor: '#064734',
        }}
      >
        {/* 1. Фоновое изображение жилого комплекса */}
        {bgImageBase64 && (
          <img
            src={bgImageBase64}
            alt="Abu Dhabi Background"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '1200px',
              height: '630px',
              objectFit: 'cover',
            }}
          />
        )}

        {/* 2. Изумрудный градиент-оверлей (для 100% контрастности и читаемости текста) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(6, 71, 52, 0.88) 0%, rgba(4, 45, 33, 0.82) 45%, rgba(2, 20, 15, 0.95) 100%)',
            display: 'flex',
          }}
        />

        {/* 3. Золотая декоративная окантовка */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1.5px solid rgba(212, 178, 111, 0.45)',
            borderRadius: '24px',
            display: 'flex',
            pointerEvents: 'none',
          }}
        />

        {/* 4. Верхний ряд: Логотип и бейдж условий */}
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
                opacity: 0.85,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}
            >
              Строительная компания • Кыргызстан
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(6, 71, 52, 0.85)',
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
              Рассрочка 0% • Trade-in
            </span>
          </div>
        </div>

        {/* 5. Центральная часть: Заголовок и флагманские комплексы */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '10px',
            marginBottom: '10px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 900,
              lineHeight: 1.15,
              textTransform: 'uppercase',
              letterSpacing: '-0.5px',
              color: '#ffffff',
              maxWidth: '980px',
            }}
          >
            Квартиры премиум и бизнес-класса в Бишкеке
          </span>

          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#d4b26f',
              marginTop: '12px',
              letterSpacing: '0.5px',
            }}
          >
            ЖК Abu Dhabi • ЖК Madina Residence • ЖД Айкол +
          </span>
        </div>

        {/* 6. Нижний ряд: 4 плашки преимуществ */}
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
              flex: 1,
              backgroundColor: 'rgba(6, 71, 52, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 800, textTransform: 'uppercase' }}>
              Рассрочка 0%
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              до 36 мес. без банка
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(6, 71, 52, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 800, textTransform: 'uppercase' }}>
              Стоимость метра
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              от $1 200 / м²
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(6, 71, 52, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 800, textTransform: 'uppercase' }}>
              Trade-in программа
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              Зачет авто за 24 ч
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(6, 71, 52, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 800, textTransform: 'uppercase' }}>
              Надежность
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              Красные книги • ДДУ
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