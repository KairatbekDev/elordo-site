export type Locale = 'ru' | 'kg' | 'kz' | 'uk' | 'en' | 'zh';

export interface TranslationDictionary {
  header: {
    catalog: string;
    terms: string;
    about: string;
    contacts: string;
    salesOnline: string;
    consultation: string;
    workTime: string;
  };
  common: {
    moreDetails: string;
    learnMore: string;
    writeWhatsapp: string;
    callUs: string;
    currency: string;
    sqm: string;
    fromPrice: string;
  };
}