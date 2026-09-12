'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

const COUNTER_ID = process.env.NEXT_PUBLIC_YM_ID || '112524603';

// Функция фиксации целевых действий (WhatsApp, звонки, заявки)
export const reachGoal = (target: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).ym) {
    (window as any).ym(Number(COUNTER_ID), 'reachGoal', target, params);
  }
};

function MetrikaTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Отслеживаем переходы между страницами внутри Next.js (SPA)
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      (window as any).ym(Number(COUNTER_ID), 'hit', url);
    }
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
              ssr: true,
              webvisor: true,
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
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