export type Locale = 'ru' | 'kg' | 'kz' | 'uk' | 'en' | 'zh';

export interface TranslationDictionary {
  header: {
    companySubtitle: string;
    catalog: string;
    terms: string;
    about: string;
    contacts: string;
    salesOnline: string;
    consultation: string;
    workTime: string;
    flagshipProjects: string;
    hotline: string;
    menu: string;
  };
  hero: {
    badge: string;
    titleMain: string;
    titleAccent: string;
    desc: string;
    btnProjects: string;
    btnTerms: string;
    consultationTag: string;
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