import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import DynamicSeo from "@/components/DynamicSeo";
import { COMPANY_INFO } from "@/lib/data";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://elordogroup.kg';

export const viewport: Viewport = {
  themeColor: '#064734',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'EL ORDO GROUP — Строительная компания в Бишкеке | Жилые комплексы',
    template: '%s | EL ORDO GROUP',
  },
  description:
    'Строительная компания EL ORDO GROUP в Бишкеке. Продажа квартир премиум, бизнес и комфорт-класса напрямую от надежного застройщика. Беспроцентная рассрочка 0% до 40 месяцев без банка, программа Trade-in. ЖК Abu Dhabi, Madina Residence, Айкол+.',
  keywords: [
    // RU
    'EL ORDO',
    'EL ORDO GROUP',
    'Эл Ордо',
    'купить квартиру Бишкек',
    'новостройки Бишкек',
    'квартиры от застройщика Бишкек',
    'рассрочка без процентов Бишкек',
    'ЖК Abu Dhabi',
    'Madina Residence',
    'ЖД Айкол',
    'недвижимость Кыргызстан',
    // KG
    'Бишкекте батир сатып алуу',
    'жаңы курулуштар Бишкек',
    'пайызсыз бөлүп төлөө',
    'Эл Ордо курулуш компаниясы',
    // KZ
    'Бішкектен пәтер сатып алу',
    'жаңа құрылыстар Бішкек',
    'пайызсыз бөліп төлеу',
    // EN
    'buy apartment in Bishkek',
    'property in Kyrgyzstan',
    'real estate Bishkek developer',
    'apartments installment 0%',
    'EL ORDO development',
    // ZH
    '比什凯克买房',
    '比什凯克公寓',
    '吉尔吉斯斯坦房地产',
    '比什凯克免息分期楼盘',
    'EL ORDO 建筑开发公司',
  ],
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'EL ORDO',
  },
  alternates: {
    canonical: './',
    languages: {
      'ru': './',
      'ky-KG': './?lang=kg',
      'kk-KZ': './?lang=kz',
      'uk-UA': './?lang=uk',
      'en': './?lang=en',
      'zh-CN': './?lang=zh',
      'x-default': './',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo-icon.png', type: 'image/png' },
    ],
    shortcut: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_KG',
    alternateLocale: ['ky_KG', 'kk_KZ', 'uk_UA', 'en_US', 'zh_CN'],
    url: SITE_URL,
    siteName: 'EL ORDO GROUP',
    title: 'EL ORDO GROUP — Квартиры от застройщика в Бишкеке | Рассрочка 0%',
    description:
      'Надежные жилые комплексы премиум, бизнес и комфорт-класса в Бишкеке. Беспроцентная рассрочка 0% до 40 месяцев без банка, программа Trade-in.',
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
      'Квартиры премиум и бизнес-класса в Бишкеке. Беспроцентная рассрочка до 40 месяцев от застройщика.',
    images: ['/projects/Abu-Dhabi.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'EL ORDO GROUP',
    legalName: 'ОсОО Строительная компания EL ORDO GROUP',
    image: `${SITE_URL}/projects/Abu-Dhabi.png`,
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: COMPANY_INFO.phones.map((phone) => phone.replace(/\s+/g, '')),
    priceRange: '$$$',
    currenciesAccepted: 'USD, KGS',
    paymentAccepted: 'Беспроцентная рассрочка 0%, безналичный расчет, наличные, Trade-in (бартер авто/недвижимости)',
    founder: {
      '@type': 'Person',
      name: 'Керезбек Нуралиев',
      jobTitle: 'Генеральный директор / Учредитель',
    },
    areaServed: {
      '@type': 'City',
      name: 'Бишкек',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address,
      addressLocality: 'Бишкек',
      addressCountry: 'KG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.84356,
      longitude: 74.59448,
    },
    sameAs: [
      COMPANY_INFO.instagram,
      COMPANY_INFO.gisUrl,
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '19:00',
      },
    ],
  };

  return (
    <html lang="ru" suppressHydrationWarning className={`scroll-smooth ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.className} antialiased min-h-screen flex flex-col bg-[#fafbfa] dark:bg-[#07130e] text-neutral-900 dark:text-neutral-100 overflow-x-hidden selection:bg-[#d4b26f] selection:text-[#064734]`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <DynamicSeo />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:bg-[#064734] focus:text-[#d4b26f] focus:rounded-xl focus:shadow-2xl focus:font-bold focus:text-xs uppercase tracking-wider"
            >
              Перейти к основному контенту
            </a>

            <Header />
            
            <div id="main-content" className="flex-1 w-full overflow-x-hidden">
              {children}
            </div>

            <Footer />
            <FloatingContact />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}