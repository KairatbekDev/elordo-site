'use client';

import { useState, useEffect, useCallback } from 'react';
import { COMPANY_INFO } from '@/lib/data';
import { IconWhatsApp } from '@/components/Icons';
import { reachGoal } from '@/components/YandexMetrika';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';

interface DownloadBrochureModalProps {
  projectSlug: string;
  projectName: string;
  botUsername?: string;
}

const MODAL_TEXTS: Record<Locale, {
  triggerBtn: string;
  title: string;
  desc: (name: string) => string;
  btnTelegram: string;
  btnWhatsApp: string;
  footnote: string;
  closeAria: string;
  waMessage: (name: string) => string;
}> = {
  ru: {
    triggerBtn: 'Скачать презентацию и шахматку (PDF)',
    title: 'Куда отправить PDF?',
    desc: (name) => `Официальный буклет, свободные этажи и актуальные цены по объекту «${name}»`,
    btnTelegram: 'Получить мгновенно в Telegram',
    btnWhatsApp: 'Получить в WhatsApp',
    footnote: 'Без спама • Бот выдает документ в течение 2 секунд',
    closeAria: 'Закрыть модальное окно',
    waMessage: (name) => `Здравствуйте! Отправьте, пожалуйста, официальную презентацию, шахматку и планировки по объекту «${name}» в формате PDF.`,
  },
  kg: {
    triggerBtn: 'Презентация жана шахматканы алуу (PDF)',
    title: 'PDF кайсы жерге жөнөтүлсүн?',
    desc: (name) => `«${name}» объектиси боюнча расмий буклет, бош кабаттар жана баалар`,
    btnTelegram: 'Telegram аркылуу тез алуу',
    btnWhatsApp: 'WhatsApp аркылуу алуу',
    footnote: 'Спам жок • Бот 2 секунддун ичинде документти берет',
    closeAria: 'Терезени жабуу',
    waMessage: (name) => `Саламатсызбы! «${name}» объектиси боюнча расмий презентацияны, шахматканы жана пландарды PDF форматында жөнөтүңүзчү.`,
  },
  kz: {
    triggerBtn: 'Презентация мен шахматканы жүктеу (PDF)',
    title: 'PDF қайда жіберілсін?',
    desc: (name) => `«${name}» нысаны бойынша ресми буклет, бос қабаттар мен бағалар`,
    btnTelegram: 'Telegram арқылы лезде алу',
    btnWhatsApp: 'WhatsApp-та алу',
    footnote: 'Спамсыз • Бот құжатты 2 секунд ішінде береді',
    closeAria: 'Терезені жабу',
    waMessage: (name) => `Сәлеметсіз бе! «${name}» нысаны бойынша ресми презентация, шахматка мен жоспарларды PDF форматында жіберіңізші.`,
  },
  uk: {
    triggerBtn: 'Завантажити буклет та шахматку (PDF)',
    title: 'Куди надіслати PDF?',
    desc: (name) => `Офіційний буклет, вільні поверхи та актуальні ціни щодо об’єкта «${name}»`,
    btnTelegram: 'Отримати миттєво в Telegram',
    btnWhatsApp: 'Отримати у WhatsApp',
    footnote: 'Без спаму • Бот видає документ протягом 2 секунд',
    closeAria: 'Закрити вікно',
    waMessage: (name) => `Доброго дня! Надішліть, будь ласка, офіційну презентацію, шахматку та планування щодо об’єкта «${name}» у форматі PDF.`,
  },
  en: {
    triggerBtn: 'Download Brochure & Pricing (PDF)',
    title: 'Where should we send the PDF?',
    desc: (name) => `Official brochure, floor availability, and up-to-date pricing for "${name}"`,
    btnTelegram: 'Get instantly via Telegram',
    btnWhatsApp: 'Receive in WhatsApp',
    footnote: 'No spam • Bot delivers the file within 2 seconds',
    closeAria: 'Close dialog',
    waMessage: (name) => `Hello! Please send the official presentation, floor availability, and layouts for "${name}" in PDF.`,
  },
  zh: {
    triggerBtn: '获取楼盘图册与在售房源表 (PDF)',
    title: '请选择接收 PDF 的方式：',
    desc: (name) => `「${name}」官方楼盘简介、可选楼层与最新在售销控底价`,
    btnTelegram: '在 Telegram 中极速下载',
    btnWhatsApp: '在 WhatsApp 中直接接收',
    footnote: '绿色无广告 • 智能机器人2秒内自动推送文档',
    closeAria: '关闭窗口',
    waMessage: (name) => `您好！请向我发送「${name}」项目的官方楼盘宣传图册、可选楼层销控表及户型规划 (PDF)。`,
  },
};

export default function DownloadBrochureModal({
  projectSlug,
  projectName,
  botUsername = COMPANY_INFO.telegramBot || 'elordo_crm_bot',
}: DownloadBrochureModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const ui = MODAL_TEXTS[currentLang] || MODAL_TEXTS.ru;

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Блокировка скролла страницы при открытом окне
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Закрытие клавишей Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Сопоставление с вебхуком бота
  const slugMapping: Record<string, string> = {
    'abu-dhabi': 'abudhabi_pdf',
    'madina-residence': 'madina_pdf',
    'ajkol-plus': 'ajkol_plus_pdf',
    'ajkol': 'ajkol_plus_pdf',
    'kelechek': 'kelechek_pdf',
    'ordo': 'ordo_pdf',
  };

  const tgPayload = slugMapping[projectSlug] || `${projectSlug.replace(/-/g, '_')}_pdf`;
  const tgUrl = `https://t.me/${botUsername}?start=${tgPayload}`;

  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    ui.waMessage(projectName)
  )}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 text-xs sm:text-sm font-black uppercase tracking-wider transition-all backdrop-blur-sm cursor-pointer shadow-md"
      >
        <svg className="w-4 h-4 text-[#d4b26f] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span>{ui.triggerBtn}</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
          onClick={handleClose}
        >
          <div
            className="bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 max-w-md w-full rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl relative text-center max-h-[92vh] overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Крестик с увеличенной областью клика */}
            <button
              type="button"
              onClick={handleClose}
              aria-label={ui.closeAria}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Иконка документа */}
            <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center mx-auto mb-4 mt-2 sm:mt-0">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            <h3 className="text-xl font-black text-gray-950 dark:text-white uppercase mb-2">
              {ui.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {ui.desc(projectName)}
            </p>

            <div className="space-y-3">
              {/* Telegram */}
              <a
                href={tgUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="w-full py-4 px-5 rounded-2xl bg-[#229ED9] hover:bg-[#1e8ec3] active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
                <span>{ui.btnTelegram}</span>
              </a>

              {/* WhatsApp */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  reachGoal('wa_click');
                  handleClose();
                }}
                className="w-full py-4 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
              >
                <IconWhatsApp className="w-5 h-5 text-white shrink-0" />
                <span>{ui.btnWhatsApp}</span>
              </a>
            </div>

            <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-4">
              {ui.footnote}
            </p>
          </div>
        </div>
      )}
    </>
  );
}