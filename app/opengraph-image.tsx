import { ImageResponse } from 'next/og';

export const alt = 'EL ORDO GROUP — Строительная компания в Бишкеке';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
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
            'radial-gradient(circle at 85% 15%, #0c573f 0%, #064734 55%, #03241a 100%)',
          padding: '48px 56px',
          color: '#ffffff',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Декоративная золотая окантовка */}
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

        {/* 1. Верхний ряд: Логотип бренда и бейдж условий */}
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
              Рассрочка 0% • Trade-in
            </span>
          </div>
        </div>

        {/* 2. Центральная часть: Заголовок и флагманские комплексы */}
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
          <span
            style={{
              fontSize: 50,
              fontWeight: 900,
              lineHeight: 1.15,
              textTransform: 'uppercase',
              letterSpacing: '-0.5px',
              color: '#ffffff',
              maxWidth: '960px',
            }}
          >
            Квартиры премиум и бизнес-класса в Бишкеке
          </span>

          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#d4b26f',
              marginTop: '14px',
              letterSpacing: '0.5px',
            }}
          >
            ЖК Abu Dhabi • ЖК Madina Residence • ЖД Айкол +
          </span>
        </div>

        {/* 3. Нижний ряд: 4 карточки преимуществ */}
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
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 800, textTransform: 'uppercase' }}>
              Рассрочка 0%
            </span>
            <span style={{ fontSize: 15, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              до 36 мес. без банка
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 800, textTransform: 'uppercase' }}>
              Стоимость метра
            </span>
            <span style={{ fontSize: 15, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              от $1 200 / м²
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 800, textTransform: 'uppercase' }}>
              Trade-in программа
            </span>
            <span style={{ fontSize: 15, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              Зачет авто за 24 часа
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 11, color: '#d4b26f', fontWeight: 800, textTransform: 'uppercase' }}>
              Надежность
            </span>
            <span style={{ fontSize: 15, fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              Красные книги • Госрегистр
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