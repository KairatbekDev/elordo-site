import { NextResponse } from 'next/server';

// Кэшировать результат на 1 час (3600 сек), чтобы сайт работал молниеносно
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

  // 1. Запрос к официальному ежедневному XML-шлюзу НБКР
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5 секунды таймаут

    const res = await fetch('https://www.nbkr.kg/XML/daily.xml', {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ElOrdoSite/1.0)',
      },
      next: { revalidate: 3600 },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const xml = await res.text();
      // Ищем блок USD в официальном ответе НБКР
      const match = xml.match(/<Currency\s+ISOCode="USD"[^>]*>[\s\S]*?<Value>([\d,.]+)<\/Value>/i);
      if (match && match[1]) {
        const parsed = parseFloat(match[1].replace(',', '.'));
        if (!isNaN(parsed) && parsed > 50 && parsed < 200) {
          rate = Number(parsed.toFixed(2));
          source = 'nbkr';
        }
      }
    }
  } catch {
    // В случае таймаута переходим к запасному источнику
  }

  // 2. Резервный источник: международный шлюз котировок
  if (source === 'fallback') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('https://open.er-api.com/v6/latest/USD', {
        signal: controller.signal,
        next: { revalidate: 3600 },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const kgs = data?.rates?.KGS;
        if (kgs && typeof kgs === 'number') {
          rate = Number(kgs.toFixed(2));
          source = 'global_forex';
        }
      }
    } catch {
      // Сохраняется базовый курс по умолчанию
    }
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