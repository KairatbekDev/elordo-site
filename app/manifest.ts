import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EL ORDO GROUP — Строительная компания',
    short_name: 'EL ORDO',
    description: 'Квартиры в Бишкеке от застройщика в рассрочку 0% и Trade-in',
    start_url: '/',
    display: 'standalone',
    background_color: '#064734',
    theme_color: '#064734',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}