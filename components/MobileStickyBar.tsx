'use client';

import { useState, useEffect } from 'react';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { reachGoal } from '@/components/YandexMetrika';
import { IconWhatsApp, IconDiamond } from '@/components/Icons';

interface StickyBarContent {
  headline: string;
  subline: string;
  btnQuiz: string;
  btnWa: string;
  waMessage: string;
}

const BAR_TEXTS: Record<Locale, StickyBarContent> = {
  ru: {
    headline: 'Рассрочка 0% до 36 мес.',
    subline: 'от $1 200/м² • Без банков',
    btnQuiz: 'Подобрать',
    btnWa: 'WhatsApp',
    waMessage: 'Здравствуйте! Хочу получить консультацию по квартирам и рассрочке в EL ORDO GROUP.',
  },
  kg: {
    headline: '0% бөлүп төлөө (36 айга)',
    subline: '1200 $/м² баштап • Банксыз',
    btnQuiz: 'Тандоо',
    btnWa: 'WhatsApp',
    waMessage: 'Саламатсызбы! EL ORDO GROUP объектилери жана бөлүп төлөө боюнча кеңеш алгым келет.',
  },
  kz: {
    headline: '0% бөліп төлеу (36 айға)',
    subline: '1200 $/м² бастап • Банксіз',
    btnQuiz: 'Таңдау',
    btnWa: 'WhatsApp',
    waMessage: 'Сәлеметсіз бе! EL ORDO GROUP нысандары мен бөліп төлеу бойынша кеңес алғым келеді.',
  },
  uk: {
    headline: 'Розстрочка 0% до 36 міс.',
    subline: 'від $1 200/м² • Без банку',
    btnQuiz: 'Підібрати',
    btnWa: 'WhatsApp',
    waMessage: 'Доброго дня! Хочу отримати консультацію щодо квартир та розстрочки в EL ORDO GROUP.',
  },
  en: {
    headline: '0% Installment up to 36 mo.',
    subline: 'From $1,200/m² • No banks',
    btnQuiz: 'Match Unit',
    btnWa: 'WhatsApp',
    waMessage: 'Hello! I would like to get a consultation on apartments and installment options at EL ORDO GROUP.',
  },
  zh: {
    headline: '0% 免息分期长达36个月',
    subline: '每平米 1200 $/m² 起 • 无商业银行高息',
    btnQuiz: '智能选房',
    btnWa: 'WhatsApp',
    waMessage: '您好！我想咨询了解 EL ORDO GROUP 旗下免息分期房源详情。',
  },
};

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const t = BAR_TEXTS[currentLang] || BAR_TEXTS.ru;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 250);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuizClick = () => {
    reachGoal('mobile_bar_quiz_click');
    const quizEl = document.getElementById('quiz');
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#quiz';
    }
  };

  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(t.waMessage)}`;

  return (
    <aside
      aria-label="Быстрые действия"
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden transition-all duration-300 ease-out select-none ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-[#064734]/95 dark:bg-[#07130e]/95 backdrop-blur-xl border-t border-[#d4b26f]/30 px-4 pt-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))] shadow-[0_-10px_30px_rgba(0,0,0,0.45)] flex items-center justify-between gap-3 text-white">
        
        {/* Информационный триггер слева */}
        <div className="flex flex-col min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-wider text-[#d4b26f] truncate">
              {t.headline}
            </span>
          </div>
          <span className="text-[10px] text-gray-300 dark:text-neutral-400 font-medium truncate mt-0.5">
            {t.subline}
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
            <span>{t.btnQuiz}</span>
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => reachGoal('wa_click')}
            className="px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <IconWhatsApp className="w-4 h-4 text-white" />
            <span>{t.btnWa}</span>
          </a>
        </div>

      </div>
    </aside>
  );
}