import { MetadataRoute } from 'next';
import { PROJECTS_LIST } from '@/lib/data';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://elordo.group';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Хелпер генерации языковых альтернатив (hreflang) для поисковых ботов
  const getAlternates = (path: string) => ({
    languages: {
      'ru': `${BASE_URL}${path}`,
      'ky-KG': `${BASE_URL}${path}?lang=kg`,
      'kk-KZ': `${BASE_URL}${path}?lang=kz`,
      'uk-UA': `${BASE_URL}${path}?lang=uk`,
      'en': `${BASE_URL}${path}?lang=en`,
      'zh-CN': `${BASE_URL}${path}?lang=zh`,
      'x-default': `${BASE_URL}${path}`,
    },
  });

  // 1. Ключевые статические страницы сайта
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: getAlternates(''),
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: getAlternates('/projects'),
    },
    {
      url: `${BASE_URL}/hod-stroitelstva`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: getAlternates('/hod-stroitelstva'),
    },
    {
      url: `${BASE_URL}/rassrochka`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: getAlternates('/rassrochka'),
    },
    {
      url: `${BASE_URL}/trade-in`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: getAlternates('/trade-in'),
    },
    {
      url: `${BASE_URL}/polniy-raschet`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: getAlternates('/polniy-raschet'),
    },
    {
      url: `${BASE_URL}/usloviya`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: getAlternates('/usloviya'),
    },
    {
      url: `${BASE_URL}/o-kompanii`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: getAlternates('/o-kompanii'),
    },
    {
      url: `${BASE_URL}/contacts`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: getAlternates('/contacts'),
    },
  ];

  // 2. Страницы объектов из центральной базы lib/data.ts
  const projectRoutes: MetadataRoute.Sitemap = PROJECTS_LIST.map((project) => ({
    url: `${BASE_URL}/${project.slug}`,
    lastModified: now,
    changeFrequency: project.isFinished ? 'monthly' : 'weekly',
    priority: project.isFinished ? 0.7 : 0.9,
    alternates: getAlternates(`/${project.slug}`),
  }));

  return [...staticRoutes, ...projectRoutes];
}