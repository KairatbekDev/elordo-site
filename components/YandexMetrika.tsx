'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { trackEvent } from '@/lib/analytics';

const COUNTER_ID_RAW =
  process.env.NEXT_PUBLIC_YM_ID ||
  process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ||
  '112524603';

const COUNTER_ID = Number(COUNTER_ID_RAW.replace(/\D/g, '')) || 112524603;

declare global {
  interface Window {
    ym?: {
      (id: number, method: string, ...args: any[]): void;
      a?: any[];
      l?: number;
    };
  }
}

// Функция-заглушка для очереди вызовов до полной инициализации библиотеки
function safeYmCall(method: string, ...args: any[]) {
  if (typeof window === 'undefined') return;

  if (typeof window.ym === 'function') {
    window.ym(COUNTER_ID, method, ...args);
  } else {
    // Формируем очередь вызовов по официальному протоколу Яндекс.Метрики
    window.ym = window.ym || Object.assign(
      function (...callArgs: any[]) {
        (window.ym!.a = window.ym!.a || []).push(callArgs);
      },
      { a: [], l: 1 * Number(new Date()) }
    );
    window.ym(COUNTER_ID, method, ...args);
  }
}

// Экспорт reachGoal для компонентов
export const reachGoal = (target: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  // 1. Отправка в Яндекс.Метрику
  safeYmCall('reachGoal', target, params);

  // 2. Дублирование во все рекламные каналы через единый диспетчер
  try {
    trackEvent(target, params);
  } catch {}

  if (process.env.NODE_ENV !== 'production') {
    console.log(`🎯 [YM reachGoal]: "${target}"`, params || '');
  }
};

function MetrikaTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Отслеживание SPA-переходов между страницами Next.js
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const search = searchParams?.toString();
    const url = pathname + (search ? `?${search}` : '');

    safeYmCall('hit', url);
  }, [pathname, searchParams]);

  return null;
}

export default function YandexMetrika() {
  if (!COUNTER_ID) return null;

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${COUNTER_ID}, "init", {
              defer: true,
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
              ecommerce: "dataLayer"
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <MetrikaTracking />
      </Suspense>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${COUNTER_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}