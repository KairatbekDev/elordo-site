'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { reachGoal } from '@/components/YandexMetrika';
import { trackWhatsAppClick } from '@/lib/analytics';
import { IconWhatsApp, IconDiamond } from '@/components/Icons';

interface PageContextData {
  headline: Record<Locale, string>;
  subline: Record<Locale, string>;
  waMessage: Record<Locale, string>;
}

const CONTEXT_MAP: Record<string, PageContextData> = {
  '/abu-dhabi': {
    headline: {
      ru: 'ЖК Abu Dhabi • Премиум',
      kg: 'ЖК Abu Dhabi • Премиум',
      kz: 'ЖК Abu Dhabi • Премиум',
      uk: 'ЖК Abu Dhabi • Преміум',
      en: 'Abu Dhabi RC • Premium',
      zh: '阿布扎比住宅区 • 尊享旗舰',
    },
    subline: {
      ru: 'от $1 650/м² • Южная магистраль',
      kg: '1 650 $/м² баштап • Түштүк маг.',
      kz: '1 650 $/м² бастап • Оңтүстік маг.',
      uk: 'від $1 650/м² • Південна магістраль',
      en: 'From $1,650/m² • South Highway',
      zh: '每平米 1 650 $/m² 起 • 南部景观大道',
    },
    waMessage: {
      ru: 'Здравствуйте! Интересует покупка квартиры в ЖК Abu Dhabi. Какие планировки и видовые этажи сейчас свободны?',
      kg: 'Саламатсызбы! ЖК Abu Dhabi боюнча батирлерди карап жатам. Кайсы кабаттар жана пландар бош?',
      kz: 'Сәлеметсіз бе! ЖК Abu Dhabi кешенінен пәтер қарастырып жатырмын. Қай қабаттар бос?',
      uk: 'Доброго дня! Цікавить купівля квартири в ЖК Abu Dhabi. Які видові поверхи вільні?',
      en: 'Hello! I am interested in purchasing an apartment at Abu Dhabi RC. What panoramic floors are available?',
      zh: '您好！我想了解阿布扎比住宅区在售房源，目前有哪些高层景观房号可选？',
    },
  },
  '/madina-residence': {
    headline: {
      ru: 'ЖК Madina Residence',
      kg: 'ЖК Madina Residence',
      kz: 'ЖК Madina Residence',
      uk: 'ЖК Madina Residence',
      en: 'Madina Residence',
      zh: '玛迪娜公馆 • 城央商务',
    },
    subline: {
      ru: 'от $1 500/м² • Центр Бишкека',
      kg: '1 500 $/м² баштап • Бишкек борбору',
      kz: '1 500 $/м² бастап • Бішкек орталығы',
      uk: 'від $1 500/м² • Центр Бішкека',
      en: 'From $1,500/m² • Bishkek Center',
      zh: '每平米 1 500 $/m² 起 • 市政商务核心区',
    },
    waMessage: {
      ru: 'Здравствуйте! Хочу узнать актуальные планировки и спецпредложения по ЖК Madina Residence.',
      kg: 'Саламатсызбы! ЖК Madina Residence боюнча батирлердин пландарын жана бааларын жөнөтөсүзбү?',
      kz: 'Сәлеметсіз бе! ЖК Madina Residence кешені бойынша бағалар мен жоспарларды білгім келеді.',
      uk: 'Доброго дня! Хочу дізнатися актуальні планування та ціни в ЖК Madina Residence.',
      en: 'Hello! Please share current layouts and pricing for Madina Residence.',
      zh: '您好！请发送玛迪娜公馆当前的在售户型图纸及最新优惠政策。',
    },
  },
  '/ajkol-plus': {
    headline: {
      ru: 'ЖД Айкол + • Эко-клуб',
      kg: 'ЖД Айкол + • Эко-үй',
      kz: 'ЖД Айкол + • Эко-үй',
      uk: 'ЖД Айкол + • Еко-будинок',
      en: 'Aykol + Club House',
      zh: '艾科尔+ • 低密洋房',
    },
    subline: {
      ru: 'от $1 200/м² • с. Кок-Жар',
      kg: '1 200 $/м² баштап • Көк-Жар',
      kz: '1 200 $/м² бастап • Көк-Жар',
      uk: 'від $1 200/м² • с. Кок-Жар',
      en: 'From $1,200/m² • Kok-Jar area',
      zh: '每平米 1 200 $/m² 起 • 麓区低密生态住区',
    },
    waMessage: {
      ru: 'Здравствуйте! Интересует клубный дом ЖД Айкол+ в Кок-Жаре. Расскажите подробнее о наличии.',
      kg: 'Саламатсызбы! Көк-Жардагы ЖД Айкол+ боюнча маалымат алгым келет. Бош батирлер барбы?',
      kz: 'Сәлеметсіз бе! Көк-Жардағы ЖД Айкол+ үйі бойынша мәлімет бересіз бе?',
      uk: 'Доброго дня! Цікавить клубний будинок ЖД Айкол+ у Кок-Жарі. Розкажіть детальніше.',
      en: 'Hello! Inquiring about available units at Aykol+ Club House in Kok-Jar.',
      zh: '您好！我对位于 Kok-Jar 区域的艾科尔+洋房房源感兴趣，请详细介绍在售情况。',
    },
  },
  '/rassrochka': {
    headline: {
      ru: 'Рассрочка 0% без банка',
      kg: '0% бөлүп төлөө (банксыз)',
      kz: '0% бөліп төлеу (банксіз)',
      uk: 'Розстрочка 0% без банку',
      en: '0% Installment (No banks)',
      zh: '0% 免息分期 • 无需银行',
    },
    subline: {
      ru: 'до 36 мес. • Первый взнос от 20%',
      kg: '36 айга чейин • Баштапкы 20%',
      kz: '36 айға дейін • Бастапқы 20%',
      uk: 'до 36 міс. • Перший внесок від 20%',
      en: 'Up to 36 mo. • From 20% down',
      zh: '最长36个月 • 首付仅需20%起',
    },
    waMessage: {
      ru: 'Здравствуйте! Рассчитываю рассрочку 0% на сайте. Хочу получить индивидуальный график выплат.',
      kg: 'Саламатсызбы! Сайтта 0% бөлүп төлөөнү карап жатам. Төлөм графигин бекитип бересизби?',
      kz: 'Сәлеметсіз бе! 0% бөліп төлеу бойынша жеке кесте алғым келеді.',
      uk: 'Доброго дня! Цікавить розрахунок розстрочки 0% без банку на обрану квартиру.',
      en: 'Hello! I am reviewing 0% installment plans on your site and would like a custom schedule.',
      zh: '您好！我在官网上测算了0%免息分期，希望能定制一份专属还款计划。',
    },
  },
  '/trade-in': {
    headline: {
      ru: 'Trade-in авто / вторички',
      kg: 'Trade-in унаа / кыймылсыз мүлк',
      kz: 'Trade-in авто / жылжымайтын мүлік',
      uk: 'Trade-in авто або житла',
      en: 'Trade-in Exchange',
      zh: '车辆 / 旧房以旧换新置换',
    },
    subline: {
      ru: 'Оценка за 24 ч • 100% в 1-й взнос',
      kg: '24 саатта баалоо • Баштапкы төлөмгө',
      kz: '24 сағатта бағалау • Бастапқы жарнаға',
      uk: 'Оцінка за 24 год • 100% у перший внесок',
      en: 'Appraisal in 24h • 100% into deposit',
      zh: '24小时极速公允估值 • 全额冲抵首期款',
    },
    waMessage: {
      ru: 'Здравствуйте! Хочу получить экспресс-оценку автомобиля по программе Trade-in в счет квартиры.',
      kg: 'Саламатсызбы! Trade-in программасы боюнча унаамды баалатып, батир алгым келет.',
      kz: 'Сәлеметсіз бе! Көлігімді Trade-in арқылы бағалап, пәтер алу шарттарын білгім келеді.',
      uk: 'Доброго дня! Хочу оцінити авто за програмою Trade-in у рахунок першого внеску.',
      en: 'Hello! I would like to get an express vehicle valuation under your Trade-in program.',
      zh: '您好！我想通过 Trade-in 资产置换方案评估现有车辆并冲抵新房首付款。',
    },
  },
  '/polniy-raschet': {
    headline: {
      ru: '100% расчет со скидкой',
      kg: '100% төлөм арзандатуу менен',
      kz: '100% төлем жеңілдікпен',
      uk: '100% оплата зі знижкою',
      en: '100% Cash Discount',
      zh: '一次性全款专享顶格特惠',
    },
    subline: {
      ru: 'Экономия до $10 000+ от застройщика',
      kg: '10 000 $+ чейин таза үнөмдөө',
      kz: '10 000 $+ дейін таза үнемдеу',
      uk: 'Економія до $10 000+ від забудовника',
      en: 'Save up to $10,000+ direct discount',
      zh: '直享开发商高管特批底价直降 $10,000+',
    },
    waMessage: {
      ru: 'Здравствуйте! Интересует максимальный дисконт при 100% единовременной оплате квартиры.',
      kg: 'Саламатсызбы! 100% толук төлөгөндөгү максималдуу жеке арзандатууну билгим келет.',
      kz: 'Сәлеметсіз бе! 100% толық төлем кезіндегі жеңілдік көлемін білгім келеді.',
      uk: 'Доброго дня! Цікавить максимальна знижка при 100% одноразовій оплаті квартири.',
      en: 'Hello! I am inquiring about the maximum executive discount for 100% upfront payment.',
      zh: '您好！我想了解一次性全额付款购房的最高折扣与专属特权。',
    },
  },
};

const BUTTON_LABELS: Record<Locale, { quiz: string; wa: string }> = {
  ru: { quiz: 'Подобрать', wa: 'WhatsApp' },
  kg: { quiz: 'Тандоо', wa: 'WhatsApp' },
  kz: { quiz: 'Таңдау', wa: 'WhatsApp' },
  uk: { quiz: 'Підібрати', wa: 'WhatsApp' },
  en: { quiz: 'Match Unit', wa: 'WhatsApp' },
  zh: { quiz: '智能选房', wa: 'WhatsApp' },
};

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const { locale } = useLanguage();

  const currentLang = useMemo<Locale>(() => {
    if (!locale) return 'ru';
    const l = String(locale).toLowerCase().trim();
    if (l.startsWith('kg') || l.startsWith('ky')) return 'kg';
    if (l.startsWith('kz') || l.startsWith('kk')) return 'kz';
    if (l.startsWith('uk') || l.startsWith('ua')) return 'uk';
    if (l.startsWith('en')) return 'en';
    if (l.startsWith('zh') || l.startsWith('cn')) return 'zh';
    return 'ru';
  }, [locale]);

  // Плавное появление после скролла (250px) и скрытие при достижении футера
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight;
          const winHeight = window.innerHeight;
          const isNearBottom = docHeight - (scrollY + winHeight) < 180;

          setIsVisible(scrollY > 250 && !isNearBottom);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Определение контекста страницы
  const context = CONTEXT_MAP[pathname] || {
    headline: {
      ru: 'Рассрочка 0% до 36 мес.',
      kg: '0% бөлүп төлөө (36 айга)',
      kz: '0% бөліп төлеу (36 айға)',
      uk: 'Розстрочка 0% до 36 міс.',
      en: '0% Installment up to 36 mo.',
      zh: '0% 免息分期长达36个月',
    },
    subline: {
      ru: 'от $1 200/м² • Без банков',
      kg: '1 200 $/м² баштап • Банксыз',
      kz: '1 200 $/м² бастап • Банксіз',
      uk: 'від $1 200/м² • Без банку',
      en: 'From $1,200/m² • No banks',
      zh: '每平米 1 200 $/m² 起 • 零利息',
    },
    waMessage: {
      ru: 'Здравствуйте! Хочу получить консультацию по квартирам и рассрочке в EL ORDO GROUP.',
      kg: 'Саламатсызбы! EL ORDO GROUP объектилери жана бөлүп төлөө боюнча кеңеш алгым келет.',
      kz: 'Сәлеметсіз бе! EL ORDO GROUP нысандары мен бөліп төлеу бойынша кеңес алғым келеді.',
      uk: 'Доброго дня! Хочу отримати консультацію щодо квартир та розстрочки в EL ORDO GROUP.',
      en: 'Hello! I would like to get a consultation on apartments and installment options at EL ORDO GROUP.',
      zh: '您好！我想咨询了解 EL ORDO GROUP 旗下免息分期房源详情。',
    },
  };

  const currentHeadline = context.headline[currentLang] || context.headline.ru;
  const currentSubline = context.subline[currentLang] || context.subline.ru;
  const currentWaMessage = context.waMessage[currentLang] || context.waMessage.ru;
  const btnLabels = BUTTON_LABELS[currentLang] || BUTTON_LABELS.ru;

  const cleanWaNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(currentWaMessage)}`;

  const handleQuizClick = () => {
    try {
      reachGoal('mobile_bar_quiz_click');
    } catch {}
    const quizEl = document.getElementById('quiz') || document.getElementById('calculator');
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#quiz';
    }
  };

  const handleWaClick = () => {
    try {
      reachGoal('wa_click');
    } catch {}
    trackWhatsAppClick('mobile_sticky_bar', pathname);
  };

  return (
    <aside
      aria-label="Быстрые действия"
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden transition-all duration-300 ease-out select-none ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-[#064734]/95 dark:bg-[#07130e]/95 backdrop-blur-xl border-t border-[#d4b26f]/30 px-4 pt-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))] shadow-[0_-10px_30px_rgba(0,0,0,0.45)] flex items-center justify-between gap-3 text-white">
        
        {/* Информационный триггер слева с динамическим заголовком */}
        <div className="flex flex-col min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-wider text-[#d4b26f] truncate">
              {currentHeadline}
            </span>
          </div>
          <span className="text-[10px] text-gray-300 dark:text-neutral-400 font-medium truncate mt-0.5">
            {currentSubline}
          </span>
        </div>

        {/* Кнопки действий справа */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleQuizClick}
            className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-black text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <IconDiamond className="w-3.5 h-3.5 text-[#d4b26f]" />
            <span>{btnLabels.quiz}</span>
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWaClick}
            className="px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <IconWhatsApp className="w-4 h-4 text-white" />
            <span>{btnLabels.wa}</span>
          </a>
        </div>

      </div>
    </aside>
  );
}