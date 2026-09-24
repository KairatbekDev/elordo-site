// Единый диспетчер аналитики для Яндекс.Метрики, Meta Pixel (Instagram) и Google

// Приводим ID счетчика строго к числу (number)
const YM_ID: number = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) || 99482834;

/**
 * Базовый трекер целей
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  const win = window as any;

  // 1. Яндекс.Метрика
  try {
    if (typeof win.ym === 'function') {
      win.ym(YM_ID, 'reachGoal', eventName, params);
    }
  } catch (e) {
    console.warn('[Analytics] Yandex.Metrika error:', e);
  }

  // 2. Meta Pixel (Facebook / Instagram)
  try {
    if (typeof win.fbq === 'function') {
      win.fbq('trackCustom', eventName, params);
    }
  } catch (e) {
    console.warn('[Analytics] Meta Pixel error:', e);
  }

  // 3. Google Analytics / Tag Manager
  try {
    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, params);
    }
  } catch (e) {
    console.warn('[Analytics] Google Analytics error:', e);
  }
}

/**
 * Отслеживание клика по кнопке перехода в WhatsApp
 */
export function trackWhatsAppClick(source: string, project?: string) {
  trackEvent('click_whatsapp', {
    source, // 'floating_button' | 'apartment_selector' | 'mobile_sticky' | 'header'
    project: project || 'general',
  });

  if (typeof window !== 'undefined') {
    const win = window as any;
    if (typeof win.fbq === 'function') {
      win.fbq('track', 'Contact', { content_name: source, content_category: project });
    }
  }
}

/**
 * Отслеживание скачивания PDF коммерческого предложения
 */
export function trackPdfDownload(project: string, area?: number | string) {
  trackEvent('download_pdf_quote', {
    project,
    area,
  });

  if (typeof window !== 'undefined') {
    const win = window as any;
    if (typeof win.fbq === 'function') {
      win.fbq('trackCustom', 'DownloadPDF', { project, area });
    }
  }
}

/**
 * Отслеживание успешной отправки заявки (Lead)
 */
export function trackLeadSubmit(goal: string, project?: string) {
  trackEvent('lead_form_submitted', {
    goal,
    project: project || 'not_specified',
  });

  if (typeof window !== 'undefined') {
    const win = window as any;
    if (typeof win.fbq === 'function') {
      win.fbq('track', 'Lead', {
        content_name: goal,
        content_category: project,
      });
    }
  }
}