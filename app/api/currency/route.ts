import { NextResponse } from 'next/server';

// Кешировать результат на 1 час (3600 сек) на уровне Next.js ISR
export const revalidate = 3600;

export async function GET() {
  let rate = 87.45;
  let source = 'fallback';

  const todayStr = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Bishkek',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  try {
    // 1. Запрос к официальному ежедневному XML-шлюзу НБКР
    try {
      const res = await fetch('https://www.nbkr.kg/XML/daily.xml', {
        signal: AbortSignal.timeout(3500),
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ElOrdoPlatform/1.0)',
        },
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const xml = await res.text();
        // Надежный поиск тега USD независимо от порядка атрибутов и кавычек
        const match = xml.match(/<Currency[^>]*\bISOCode=["']USD["'][^>]*>[\s\S]*?<Value>([\d,.]+)<\/Value>/i);
        if (match && match[1]) {
          const parsed = parseFloat(match[1].replace(',', '.'));
          if (!isNaN(parsed) && parsed > 50 && parsed < 200) {
            rate = Number(parsed.toFixed(2));
            source = 'nbkr';
          }
        }
      }
    } catch {
      // При таймауте или недоступности НБКР переходим к запасному источнику
    }

    // 2. Резервный источник: международный шлюз котировок
    if (source === 'fallback') {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD', {
          signal: AbortSignal.timeout(3500),
          next: { revalidate: 3600 },
        });

        if (res.ok) {
          const data = await res.json();
          const kgs = data?.rates?.KGS;
          if (typeof kgs === 'number' && kgs > 50 && kgs < 200) {
            rate = Number(kgs.toFixed(2));
            source = 'global_forex';
          }
        }
      } catch {
        // Сохраняется проверенный базовый курс по умолчанию
      }
    }
  } catch (globalError) {
    console.error('[CURRENCY API ERROR]:', globalError);
  }

  return NextResponse.json(
    {
      rate,
      currency: 'USD/KGS',
      date: todayStr,
      source,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}