import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingContact from "../components/FloatingContact";

// Базовый домен для корректного формирования абсолютных ссылок в превью
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://elordo.group';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'EL ORDO GROUP — Строительная компания в Бишкеке | Жилые комплексы',
    template: '%s | EL ORDO GROUP',
  },
  description:
    'Строительная компания EL ORDO GROUP в Бишкеке. Продажа квартир премиум, бизнес и комфорт-класса от застройщика. Беспроцентная рассрочка до 40 месяцев, программа Trade-in. ЖК Abu Dhabi, Madina Residence, Айкол+.',
  keywords: [
    'EL ORDO',
    'Эл Ордо',
    'купить квартиру Бишкек',
    'новостройки Бишкек',
    'квартиры от застройщика',
    'рассрочка без процентов Бишкек',
    'ЖК Abu Dhabi',
    'Madina Residence',
    'ЖД Айкол',
    'недвижимость Кыргызстан',
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_KG',
    url: SITE_URL,
    siteName: 'EL ORDO GROUP',
    title: 'EL ORDO GROUP — Квартиры от застройщика в Бишкеке',
    description:
      'Надежные жилые комплексы премиум, бизнес и комфорт-класса. Беспроцентная рассрочка до 40 месяцев, выгодный Trade-in.',
    images: [
      {
        url: '/projects/Abu-Dhabi.png',
        width: 1200,
        height: 630,
        alt: 'Жилые комплексы EL ORDO GROUP в Бишкеке',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EL ORDO GROUP — Строительная компания в Бишкеке',
    description:
      'Квартиры премиум и бизнес-класса в Бишкеке. Рассрочка до 40 месяцев от застройщика.',
    images: ['/projects/Abu-Dhabi.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#064734" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-[#d4b26f] selection:text-[#064734]">
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}