'use client';

import { useState } from 'react';
import { COMPANY_INFO } from '@/lib/data';
import { IconWhatsApp } from '@/components/Icons';

interface DownloadBrochureModalProps {
  projectSlug: string;
  projectName: string;
  botUsername?: string;
}

export default function DownloadBrochureModal({
  projectSlug,
  projectName,
  botUsername = COMPANY_INFO.telegramBot || 'elordo_crm_bot',
}: DownloadBrochureModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Точное сопоставление со slug в Telegram-вебхуке
  const slugMapping: Record<string, string> = {
    'abu-dhabi': 'abudhabi_pdf',
    'madina-residence': 'madina_pdf',
    'ajkol-plus': 'ajkol_plus_pdf',
    'ajkol': 'ajkol_plus_pdf',
  };

  const tgPayload = slugMapping[projectSlug] || `${projectSlug.replace(/-/g, '_')}_pdf`;
  const tgUrl = `https://t.me/${botUsername}?start=${tgPayload}`;

  // Ссылка для WhatsApp
  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    `Здравствуйте! Отправьте, пожалуйста, официальную презентацию, шахматку и планировки по объекту «${projectName}» в формате PDF.`
  )}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 text-xs font-black uppercase tracking-wider transition-all backdrop-blur-sm cursor-pointer shadow-md"
      >
        <svg className="w-4 h-4 text-[#d4b26f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span>Скачать презентацию и шахматку (PDF)</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f] flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            <h3 className="text-xl font-black text-gray-950 dark:text-white uppercase mb-2">
              Куда отправить PDF?
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Официальный буклет, свободные этажи и актуальные цены по объекту <b>{projectName}</b>
            </p>

            <div className="space-y-3">
              {/* Telegram с диплинком */}
              <a
                href={tgUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 px-5 rounded-2xl bg-[#229ED9] hover:bg-[#1e8ec3] active:scale-95 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
                <span>Получить мгновенно в Telegram</span>
              </a>

              {/* WhatsApp */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
              >
                <IconWhatsApp className="w-5 h-5 text-white" />
                <span>Получить в WhatsApp</span>
              </a>
            </div>

            <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-4">
              Без спама • Бот выдает документ в течение 2 секунд
            </p>
          </div>
        </div>
      )}
    </>
  );
}