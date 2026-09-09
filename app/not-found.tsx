'use client';

import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import {
  IconBuilding,
  IconCalendar,
  IconCar,
  IconMapPin,
  IconWhatsApp,
  IconArrowRight,
} from '@/components/Icons';

const UI_404: Record<Locale, {
  badge: string;
  title: string;
  desc: string;
  catalog: string;
  installment: string;
  tradeIn: string;
  contacts: string;
  btnHome: string;
  btnWa: string;
  waHelpMsg: string;
}> = {
  ru: {
    badge: 'Ошибка 404 • Страница не найдена',
    title: 'Запрашиваемый адрес недоступен',
    desc: 'Возможно, объект уже введен в эксплуатацию, страница перемещена или в ссылке допущена опечатка. Выберите нужный раздел:',
    catalog: 'Каталог объектов',
    installment: 'Рассрочка 0%',
    tradeIn: 'Trade-in (Бартер)',
    contacts: 'Офис продаж',
    btnHome: 'На главную страницу',
    btnWa: 'Спросить в WhatsApp',
    waHelpMsg: 'Здравствуйте! Я не нашел нужную страницу или объект на сайте EL ORDO GROUP. Подскажите, пожалуйста, актуальную информацию.',
  },
  kg: {
    badge: '404 Катасы • Баракча табылган жок',
    title: 'Суралган дарек жеткиликсиз',
    desc: 'Мүмкүн объект пайдаланууга берилген, баракча жылдырылган же шилтемеде ката кеткен. Төмөнкү бөлүмдөрдөн тандаңыз:',
    catalog: 'Объекттер каталогу',
    installment: '0% Бөлүп төлөө',
    tradeIn: 'Trade-in (Бартер)',
    contacts: 'Сатуу кеңсеси',
    btnHome: 'Башкы бетке өтүү',
    btnWa: 'WhatsAppтан суроо',
    waHelpMsg: 'Саламатсызбы! EL ORDO GROUP сайтынан керектүү баракчаны же объектти таппай калдым. Сураныч, актуалдуу маалымат бериңизчи.',
  },
  kz: {
    badge: '404 Қатесі • Бет табылмады',
    title: 'Сұралған мекенжай қолжетімсіз',
    desc: 'Мүмкін нысан пайдалануға берілген, беттің орны ауыстырылған немесе сілтемеде қате кеткен. Төмендегі бөлімдерді таңдаңыз:',
    catalog: 'Нысандар каталогы',
    installment: '0% Бөліп төлеу',
    tradeIn: 'Trade-in (Бартер)',
    contacts: 'Сату кеңсесі',
    btnHome: 'Басты бетке өту',
    btnWa: 'WhatsApp-та сұрау',
    waHelpMsg: 'Сәлеметсіз бе! EL ORDO GROUP сайтынан керекті бетті немесе нысанды таба алмадым. Маған өзекті ақпарат бере аласыз ба?',
  },
  uk: {
    badge: 'Помилка 404 • Сторінку не знайдено',
    title: 'Запитувана адреса недоступна',
    desc: 'Можливо, об’єкт уже введений в експлуатацію, сторінку переміщено або в посиланні допущено помилку. Оберіть потрібний розділ:',
    catalog: 'Каталог об’єктів',
    installment: 'Розстрочка 0%',
    tradeIn: 'Trade-in (Бартер)',
    contacts: 'Відділ продажів',
    btnHome: 'На головну сторінку',
    btnWa: 'Запитати у WhatsApp',
    waHelpMsg: 'Доброго дня! Я не знайшов потрібну сторінку чи об’єкт на сайті EL ORDO GROUP. Підкажіть, будь ласка, актуальну інформацію.',
  },
  en: {
    badge: 'Error 404 • Page Not Found',
    title: 'The Requested URL is Unavailable',
    desc: 'The page might have been moved, the complex commissioned, or the address mistyped. Please choose a destination below:',
    catalog: 'Project Catalog',
    installment: '0% Installment',
    tradeIn: 'Trade-in (Barter)',
    contacts: 'Sales Office',
    btnHome: 'Return to Homepage',
    btnWa: 'Inquire on WhatsApp',
    waHelpMsg: 'Hello! I could not find the desired page or property on the EL ORDO GROUP website. Please assist me with current information.',
  },
  zh: {
    badge: '404 错误 • 页面未找到',
    title: '您访问的页面不存在或已下线',
    desc: '该楼盘可能已全盘售罄综合验收交付、页面已迁移或网址拼写有误。您可以浏览以下快捷入口：',
    catalog: '精选楼盘目录',
    installment: '0% 免息分期',
    tradeIn: '以旧换新置换',
    contacts: '品牌营销中心',
    btnHome: '返回官方首页',
    btnWa: '在 WhatsApp 中咨询',
    waHelpMsg: '您好！我在 EL ORDO GROUP 官网上未找到目标房源或页面，请协助提供当前最新楼盘资讯。',
  },
};

export default function NotFound() {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const ui = UI_404[currentLang] || UI_404.ru;

  const quickLinks = [
    {
      href: '/projects',
      label: ui.catalog,
      icon: <IconBuilding className="w-5 h-5 text-[#064734] dark:text-[#d4b26f]" />,
    },
    {
      href: '/rassrochka',
      label: ui.installment,
      icon: <IconCalendar className="w-5 h-5 text-[#064734] dark:text-[#d4b26f]" />,
    },
    {
      href: '/trade-in',
      label: ui.tradeIn,
      icon: <IconCar className="w-5 h-5 text-[#064734] dark:text-[#d4b26f]" />,
    },
    {
      href: '/contacts',
      label: ui.contacts,
      icon: <IconMapPin className="w-5 h-5 text-[#064734] dark:text-[#d4b26f]" />,
    },
  ];

  const waHelpLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(ui.waHelpMsg)}`;

  return (
    <main className="min-h-[82vh] flex items-center justify-center bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 px-4 sm:px-6 py-20 relative overflow-hidden selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200">
      
      {/* Мягкое фоновое свечение */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#064734]/15 dark:bg-[#d4b26f]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 space-y-6">
        
        {/* Бейдж статуса */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064734]/10 dark:bg-[#d4b26f]/15 border border-[#064734]/20 dark:border-[#d4b26f]/30 text-[#064734] dark:text-[#d4b26f] text-xs font-black uppercase tracking-widest shadow-sm">
          <span>{ui.badge}</span>
        </div>

        {/* Заголовок с золотым акцентом */}
        <div className="space-y-2">
          <div className="text-7xl sm:text-9xl font-black text-[#064734] dark:text-[#d4b26f] tracking-tight leading-none drop-shadow-sm">
            404
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-950 dark:text-white">
            {ui.title}
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light max-w-md mx-auto">
          {ui.desc}
        </p>

        {/* Быстрая навигация по ключевым разделам */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 hover:border-[#064734] dark:hover:border-[#d4b26f] hover:shadow-md transition-all text-left flex flex-col justify-between group shadow-sm cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#064734] dark:group-hover:text-[#d4b26f] transition-colors leading-tight">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Кнопки основных действий */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] active:scale-95 text-white dark:text-[#064734] font-black px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{ui.btnHome}</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={waHelpLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 dark:border-white/15 hover:border-[#064734] dark:hover:border-[#d4b26f] active:scale-95 text-gray-800 dark:text-gray-200 font-bold px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all bg-white dark:bg-[#0b1b15] text-center flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
            <span>{ui.btnWa}</span>
          </a>
        </div>

      </div>
    </main>
  );
}