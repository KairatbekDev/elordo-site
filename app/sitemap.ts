import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://elordo.group';

const SLUGS = [
  'abu-dhabi',
  'madina-residence',
  'ajkol-plus',
  'ajkol',
  'kelechek',
  'ordo',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Статические страницы сайта
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/usloviya`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/o-kompanii`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contacts`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Динамические страницы каждого ЖК
  const projectRoutes: MetadataRoute.Sitemap = SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...projectRoutes];
}