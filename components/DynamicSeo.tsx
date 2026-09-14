'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

type Locale = 'ru' | 'kg' | 'kz' | 'uk' | 'en' | 'zh';

interface SeoItem {
  title: string;
  description: string;
  langCode: string;
}

const SEO_LOCALES: Record<Locale, SeoItem> = {
  ru: {
    title: 'EL ORDO GROUP — Строительная компания в Бишкеке | Жилые комплексы',
    description:
      'Строительная компания EL ORDO GROUP в Бишкеке. Продажа квартир премиум, бизнес и комфорт-класса от застройщика. Беспроцентная рассрочка 0% до 40 месяцев, программа Trade-in. ЖК Abu Dhabi, Madina Residence, Айкол+.',
    langCode: 'ru',
  },
  kg: {
    title: 'EL ORDO GROUP — Бишкектеги курулуш компаниясы | Турак жай комплекстери',
    description:
      'EL ORDO GROUP курулуш компаниясы Бишкекте. Куруучудан премиум, бизнес жана комфорт-класстагы батирлер. Банксыз 40 айга чейин 0% бөлүп төлөө, Trade-in программасы. Abu Dhabi, Madina Residence, Айкол+ турак жайлары.',
    langCode: 'ky',
  },
  kz: {
    title: 'EL ORDO GROUP — Бішкектегі құрылыс компаниясы | Тұрғын үй кешендері',
    description:
      'EL ORDO GROUP құрылыс компаниясы Бішкекте. Құрылыс салушыдан премиум, бизнес және жайлы санаттағы пәтерлер. 40 айға дейін 0% пайызсыз бөліп төлеу, Trade-in бағдарламасы. Abu Dhabi, Madina Residence, Айкол+ ТҮК.',
    langCode: 'kk',
  },
  uk: {
    title: 'EL ORDO GROUP — Будівельна компанія в Бішкеку | Житлові комплекси',
    description:
      'Будівельна компанія EL ORDO GROUP у Бішкеку. Продаж квартир преміум, бізнес та комфорт-класу від забудовника. Безвідсоткова розстрочка 0% до 40 місяців, Trade-in. ЖК Abu Dhabi, Madina Residence, Айкол+.',
    langCode: 'uk',
  },
  en: {
    title: 'EL ORDO GROUP — Real Estate Developer in Bishkek | Residential Properties',
    description:
      'EL ORDO GROUP construction company in Bishkek. Premium, business, and comfort-class apartments directly from the developer. 0% interest-free installments up to 40 months, Trade-in program. Abu Dhabi, Madina Residence, Aikol+.',
    langCode: 'en',
  },
  zh: {
    title: 'EL ORDO GROUP — 比什凯克品牌实力开发商 | 高品质住宅楼盘',
    description:
      'EL ORDO GROUP 建筑开发公司深耕比什凯克。直营在售尊享级、商务级及舒适级品质公寓，最长40个月0%免息分期，汽车与二手房以旧换新置换通道。阿布扎比大厦、麦地那公馆等品质楼盘。',
    langCode: 'zh',
  },
};

// Названия проектов для динамических заголовков вкладок
const PROJECT_NAMES: Record<string, Record<Locale, string>> = {
  'abu-dhabi': {
    ru: 'ЖК Abu Dhabi • Премиум-класс',
    kg: 'Abu Dhabi ТЖК • Премиум-класс',
    kz: 'Abu Dhabi ТҮК • Премиум-класс',
    uk: 'ЖК Abu Dhabi • Преміум-клас',
    en: 'Abu Dhabi RC • Premium Class',
    zh: '阿布扎比住宅区 • 尊享级',
  },
  'madina-residence': {
    ru: 'ЖК Madina Residence • Бизнес-класс',
    kg: 'Madina Residence ТЖК • Бизнес-класс',
    kz: 'Madina Residence ТҮК • Бизнес-класс',
    uk: 'ЖК Madina Residence • Бізнес-клас',
    en: 'Madina Residence • Business Class',
    zh: '麦地那公馆 • 商务级',
  },
  'ajkol-plus': {
    ru: 'ЖД Айкол+ • Клубный дом в предгорье',
    kg: 'Айкол+ Клубдук үйү • Тоо этегинде',
    kz: 'Айкол+ Клубтық үйі • Тау бөктерінде',
    uk: 'ЖБ Айкол+ • Клубний будинок',
    en: 'Aikol+ Club House • Foothills',
    zh: '艾科尔+ 精品洋房 • 山麓宜居',
  },
  'ajkol': {
    ru: 'ЖД Айкол • Сдача 2026',
    kg: 'Айкол турак үйү • 2026 тапшыруу',
    kz: 'Айкол тұрғын үйі • 2026 тапсыру',
    uk: 'ЖБ Айкол • Здача 2026',
    en: 'Aikol Residential Building • 2026',
    zh: '艾科尔住宅 • 2026交付',
  },
  'kelechek': {
    ru: 'ЖК Келечек • Сдан в эксплуатацию',
    kg: 'Келечек ТЖК • Пайдаланууга берилген',
    kz: 'Келечек ТҮК • Пайдалануға берілген',
    uk: 'ЖК Келечек • Зданий в експлуатацію',
    en: 'Kelechek RC • Fully Commissioned',
    zh: '凯莱切克住宅区 • 已交付入住',
  },
  'ordo': {
    ru: 'КД Ордо • Сдан в эксплуатацию',
    kg: 'Ордо Клубдук үйү • Пайдаланууга берилген',
    kz: 'Ордо Клубтық үйі • Пайдалануға берілген',
    uk: 'КБ Ордо • Зданий в експлуатацію',
    en: 'Ordo Club House • Fully Commissioned',
    zh: '奥尔多精品洋房 • 已交付入住',
  },
};

function updateMetaTag(selector: string, attr: string, key: string, value: string) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

export default function DynamicSeo() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const currentLocale = (locale as Locale) || 'ru';

  useEffect(() => {
    const seo = SEO_LOCALES[currentLocale] || SEO_LOCALES.ru;

    // 1. Атрибут языка в теге <html>
    document.documentElement.lang = seo.langCode;

    if (typeof window === 'undefined') return;

    // Очищаем slug от слешей
    const slug = pathname.replace(/^\/|\/$/g, '');
    const isHome = pathname === '/';
    const projectInfo = PROJECT_NAMES[slug];

    // 2. Логика для страниц отдельных ЖК
    if (projectInfo) {
      const complexTitle = `${projectInfo[currentLocale] || projectInfo.ru} | EL ORDO GROUP`;
      document.title = complexTitle;
      updateMetaTag('meta[property="og:title"]', 'property', 'og:title', complexTitle);
      updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', complexTitle);
      return; // Не перезаписываем описание ЖК общим текстом главной страницы!
    }

    // 3. Логика для главной страницы
    if (isHome) {
      document.title = seo.title;
      updateMetaTag('meta[name="description"]', 'name', 'description', seo.description);
      updateMetaTag('meta[property="og:title"]', 'property', 'og:title', seo.title);
      updateMetaTag('meta[property="og:description"]', 'property', 'og:description', seo.description);
      updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
      updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    }
  }, [currentLocale, pathname]);

  return null;
}