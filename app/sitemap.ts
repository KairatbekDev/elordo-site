import { MetadataRoute } from 'next';
import { PROJECTS_LIST } from '@/lib/data';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://elordo.group';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Ключевые статические страницы сайта
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/rassrochka`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/trade-in`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/polniy-raschet`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/usloviya`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/o-kompanii`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contacts`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // 2. Страницы объектов из центральной базы lib/data.ts
  const projectRoutes: MetadataRoute.Sitemap = PROJECTS_LIST.map((project) => ({
    url: `${BASE_URL}/${project.slug}`,
    lastModified: now,
    // Для строящихся комплексов частота выше, так как обновляются цены и планировки
    changeFrequency: project.isFinished ? 'monthly' : 'weekly',
    priority: project.isFinished ? 0.7 : 0.9,
  }));

  return [...staticRoutes, ...projectRoutes];
}