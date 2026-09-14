export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
}

const STORAGE_KEY = 'elordo_utm_data';

export function saveUtmParams(searchParams: URLSearchParams): void {
  if (typeof window === 'undefined') return;

  const utm_source = searchParams.get('utm_source');
  const utm_medium = searchParams.get('utm_medium');
  const utm_campaign = searchParams.get('utm_campaign');
  const utm_content = searchParams.get('utm_content');
  const utm_term = searchParams.get('utm_term');

  // Сохраняем, только если хотя бы одна метка присутствует
  if (utm_source || utm_medium || utm_campaign) {
    const data: UtmData = {
      utm_source: utm_source || undefined,
      utm_medium: utm_medium || undefined,
      utm_campaign: utm_campaign || undefined,
      utm_content: utm_content || undefined,
      utm_term: utm_term || undefined,
      referrer: document.referrer || undefined,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Игнорируем ошибки квот браузера
    }
  }
}

export function getStoredUtm(): UtmData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}