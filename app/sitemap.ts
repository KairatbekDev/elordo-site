import { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  'https://elordo-site.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    // Главная и каталог
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/projects', priority: 0.9, changeFrequency: 'daily' as const },

    // Флагманские и строящиеся объекты
    { path: '/abu-dhabi', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/madina-residence', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/ajkol-plus', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/ajkol', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/kelechek', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/ordo', priority: 0.7, changeFrequency: 'monthly' as const },

    // Информационные разделы и ход строительства
    { path: '/hod-stroitelstva', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/usloviya', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/rassrochka', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/trade-in', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/polniy-raschet', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/o-kompanii', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contacts', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}