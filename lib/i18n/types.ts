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
    trust0Title: string;
    trust0Desc: string;
    trust9Title: string;
    trust9Desc: string;
    trustTradeTitle: string;
    trustTradeDesc: string;
    trust100Title: string;
    trust100Desc: string;
  };
  advantages: {
    badge: string;
    title: string;
    adv1Title: string;
    adv1Desc: string;
    adv2Title: string;
    adv2Desc: string;
    adv3Title: string;
    adv3Desc: string;
  };
  projectsSection: {
    badge: string;
    title: string;
    tabAll: string;
    tabActive: string;
    tabFinished: string;
    statusFinished: string;
    detailsBtn: string;
    viewAllBtn: string;
  };
  paymentsSection: {
    badge: string;
    title: string;
    card1Title: string;
    card1Badge: string;
    card1Desc: string;
    card1Action: string;
    card2Title: string;
    card2Badge: string;
    card2Desc: string;
    card2Action: string;
    card3Title: string;
    card3Badge: string;
    card3Desc: string;
    card3Action: string;
  };
  reviewsSection: {
    badge: string;
    title: string;
  };
  officeSection: {
    badge: string;
    title: string;
    addressLabel: string;
    route2Gis: string;
    btnWhatsApp: string;
    btnInstagram: string;
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