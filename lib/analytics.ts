// Единый диспетчер аналитики для Яндекс.Метрики, Meta Pixel (Instagram), Google Analytics (GA4) и Google Tag Manager

const YM_ID: number = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) || 99482834;

/**
 * Базовый диспетчер отправки событий во все аналитические системы
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  const win = window as any;

  // Логирование событий в режиме разработки
  if (process.env.NODE_ENV !== 'production') {
    console.log(`📊 [Analytics Event] "${eventName}":`, params);
  }

  // 1. Google Tag Manager DataLayer
  try {
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({
      event: eventName,
      ...params,
    });
  } catch (e) {
    console.warn('[Analytics] GTM DataLayer error:', e);
  }

  // 2. Яндекс.Метрика
  try {
    if (typeof win.ym === 'function') {
      win.ym(YM_ID, 'reachGoal', eventName, params);
    }
  } catch (e) {
    console.warn('[Analytics] Yandex.Metrika error:', e);
  }

  // 3. Meta Pixel (Facebook / Instagram)
  try {
    if (typeof win.fbq === 'function') {
      win.fbq('trackCustom', eventName, params);
    }
  } catch (e) {
    console.warn('[Analytics] Meta Pixel error:', e);
  }

  // 4. Google Analytics (gtag.js)
  try {
    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, params);
    }
  } catch (e) {
    console.warn('[Analytics] Google Analytics error:', e);
  }
}

/**
 * Прямой алиас reachGoal для обратной совместимости с вызовами в компонентах
 */
export function reachGoal(target: string, params: Record<string, any> = {}) {
  trackEvent(target, params);
}

/**
 * Отслеживание клика по кнопкам перехода в WhatsApp
 */
export function trackWhatsAppClick(source: string, project?: string) {
  trackEvent('click_whatsapp', {
    source, // 'header' | 'footer' | 'floating_button' | 'calculator' | 'apartment_selector'
    project: project || 'EL ORDO GROUP',
  });

  if (typeof window !== 'undefined') {
    const win = window as any;
    if (typeof win.fbq === 'function') {
      win.fbq('track', 'Contact', {
        content_name: 'WhatsApp',
        source,
        content_category: project || 'General',
      });
    }
    if (typeof win.gtag === 'function') {
      win.gtag('event', 'generate_lead', {
        method: 'WhatsApp',
        source,
        project,
      });
    }
  }
}

/**
 * Отслеживание клика по номеру телефона (Звонок)
 */
export function trackPhoneClick(phone: string, source: string = 'general') {
  trackEvent('call_click', {
    phone,
    source,
  });

  if (typeof window !== 'undefined') {
    const win = window as any;
    if (typeof win.fbq === 'function') {
      win.fbq('track', 'Contact', {
        content_name: 'Phone Call',
        content_category: source,
        value: phone,
      });
    }
  }
}

/**
 * Отслеживание скачивания PDF коммерческого предложения или брошюры
 */
export function trackPdfDownload(project: string, area?: number | string) {
  trackEvent('pdf_download_direct', {
    project,
    area: area || 'catalog',
  });

  if (typeof window !== 'undefined') {
    const win = window as any;
    if (typeof win.fbq === 'function') {
      win.fbq('trackCustom', 'DownloadPDF', {
        project,
        area,
      });
    }
  }
}

/**
 * Отслеживание успешной отправки заявки (Lead Form / Quiz)
 */
export function trackLeadSubmit(goal: string, project?: string, additionalData: Record<string, any> = {}) {
  trackEvent('lead_form_submitted', {
    goal,
    project: project || 'not_specified',
    ...additionalData,
  });

  if (typeof window !== 'undefined') {
    const win = window as any;
    if (typeof win.fbq === 'function') {
      win.fbq('track', 'Lead', {
        content_name: goal,
        content_category: project,
        currency: 'USD',
      });
    }
    if (typeof win.gtag === 'function') {
      win.gtag('event', 'generate_lead', {
        event_category: 'Forms',
        event_label: goal,
        project,
      });
    }
  }
}

/**
 * Отслеживание использования калькулятора рассрочки или Trade-in
 */
export function trackCalculatorUsage(calculatorType: 'installment' | 'trade_in' | 'full_payment', params: Record<string, any>) {
  trackEvent('calculator_interaction', {
    calculator_type: calculatorType,
    ...params,
  });
}