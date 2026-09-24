import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const alt = 'EL ORDO GROUP — Строительная компания в Бишкеке';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Универсальное чтение локального изображения из папки public в Base64
function getLocalBase64Image(relativePath: string) {
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const fullPath = path.join(process.cwd(), 'public', cleanPath);
    if (!fs.existsSync(fullPath)) return null;
    const file = fs.readFileSync(fullPath);
    const ext = path.extname(cleanPath).replace('.', '').toLowerCase();
    const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
    return `data:${mime};base64,${file.toString('base64')}`;
  } catch (e) {
    return null;
  }
}

export default async function OpenGraphImage() {
  // Загружаем реальный логотип и рендер жилого комплекса
  const logoBase64 = getLocalBase64Image('logo-2.png') || getLocalBase64Image('logo.png');
  const bgImageBase64 = getLocalBase64Image('projects/Abu-Dhabi.png');

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
        {/* 1. Фоновое изображение жилого комплекса Abu Dhabi */}
        {bgImageBase64 && (
          <img
            src={bgImageBase64}
            alt="EL ORDO GROUP Building"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '1200px',
              height: '630px',
              objectFit: 'cover',
              objectPosition: 'right center',
            }}
          />
        )}

        {/* 2. Кинематографичный горизонтальный градиент: 
               Слева темный изумруд для 100% читаемости логотипа и текста, 
               Справа полупрозрачный, чтобы показать архитектуру */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '1200px',
            height: '630px',
            background:
              'linear-gradient(90deg, rgba(2, 31, 21, 0.97) 0%, rgba(3, 41, 28, 0.92) 50%, rgba(2, 31, 21, 0.65) 100%)',
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

        {/* 4. Верхний ряд: Официальный логотип и золотой бейдж */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Логотип компании */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {logoBase64 ? (
              <img
                src={logoBase64}
                alt="EL ORDO GROUP"
                style={{
                  height: '64px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            ) : (
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
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  Строительная компания
                </span>
              </div>
            )}
          </div>

          {/* Золотой бейдж */}
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
              Рассрочка 0% • Trade-in
            </span>
          </div>
        </div>

        {/* 5. Центральная часть: Главный заголовок и флагманские комплексы */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 10,
            maxWidth: '850px',
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
              Надежный застройщик в Бишкеке
            </span>
          </div>

          <span
            style={{
              fontSize: 54,
              fontWeight: 900,
              lineHeight: 1.08,
              textTransform: 'uppercase',
              letterSpacing: '-1px',
              color: '#ffffff',
            }}
          >
            Квартиры премиум и бизнес-класса
          </span>

          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#d4b26f',
              marginTop: '10px',
              letterSpacing: '0.5px',
            }}
          >
            ЖК Abu Dhabi • ЖК Madina Residence • ЖД Айкол +
          </span>
        </div>

        {/* 6. Нижний ряд: 4 карточки преимуществ */}
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
              flex: 1,
              backgroundColor: 'rgba(2, 25, 17, 0.92)',
              border: '1.5px solid rgba(212, 178, 111, 0.5)',
              borderRadius: '16px',
              padding: '16px 18px',
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
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 900, textTransform: 'uppercase' }}>
              Стоимость метра
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              от $1 200 / м²
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(2, 25, 17, 0.92)',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 900, textTransform: 'uppercase' }}>
              Trade-in программа
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              Зачет авто за 24 ч
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(2, 25, 17, 0.92)',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 900, textTransform: 'uppercase' }}>
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