'use client';

import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ApartmentItem } from '@/lib/apartmentsData';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { COMPANY_INFO } from '@/lib/data';
import { reachGoal } from '@/components/YandexMetrika';
import { trackWhatsAppClick } from '@/lib/analytics';
import {
  IconWhatsApp,
  IconArrowRight,
  IconBuilding,
  IconCheck,
} from '@/components/Icons';

interface ApartmentQuickViewModalProps {
  apartment: ApartmentItem | null;
  isOpen: boolean;
  onClose: () => void;
  usdRate?: number;
}

const MODAL_TEXTS: Record<Locale, {
  title: string;
  block: string;
  floor: string;
  area: string;
  priceM2: string;
  totalPrice: string;
  views: string;
  downPayment30: string;
  btnCalculate: string;
  btnBookWa: string;
  closeAria: string;
  somUnit: string;
}> = {
  ru: {
    title: '3D-планировка квартиры',
    block: 'Корпус / Секция:',
    floor: 'Доступные этажи:',
    area: 'Общая площадь:',
    priceM2: 'Стоимость за м²:',
    totalPrice: 'Итоговая стоимость:',
    views: 'Ориентация и вид из окон:',
    downPayment30: 'Первый взнос 30%:',
    btnCalculate: 'Рассчитать график 0%',
    btnBookWa: 'Зафиксировать бронь в WhatsApp',
    closeAria: 'Закрыть окно',
    somUnit: 'сом',
  },
  kg: {
    title: 'Батирдин 3D-планы',
    block: 'Блок / Секция:',
    floor: 'Бош кабаттар:',
    area: 'Жалпы аянты:',
    priceM2: 'м² үчүн баасы:',
    totalPrice: 'Жалпы наркы:',
    views: 'Терезеден көрүнүшү:',
    downPayment30: 'Баштапкы 30% төлөм:',
    btnCalculate: '0% графикти эсептөө',
    btnBookWa: 'WhatsApp аркылуу брондоо',
    closeAria: 'Терезени жабуу',
    somUnit: 'сом',
  },
  kz: {
    title: 'Пәтердің 3D-жоспары',
    block: 'Блок / Секция:',
    floor: 'Бос қабаттар:',
    area: 'Жалпы ауданы:',
    priceM2: 'м² бағасы:',
    totalPrice: 'Жалпы құны:',
    views: 'Терезеден көрініс:',
    downPayment30: 'Бастапқы 30% жарна:',
    btnCalculate: '0% кестені есептеу',
    btnBookWa: 'WhatsApp арқылы брондау',
    closeAria: 'Терезені жабу',
    somUnit: 'сом',
  },
  uk: {
    title: '3D-планування квартири',
    block: 'Секція / Корпус:',
    floor: 'Доступні поверхи:',
    area: 'Загальна площа:',
    priceM2: 'Ціна за м²:',
    totalPrice: 'Загальна вартість:',
    views: 'Краєвид з вікон:',
    downPayment30: 'Перший внесок 30%:',
    btnCalculate: 'Розрахувати графік 0%',
    btnBookWa: 'Зафіксувати бронь у WhatsApp',
    closeAria: 'Закрити вікно',
    somUnit: 'сом',
  },
  en: {
    title: '3D Floor Plan Preview',
    block: 'Building / Section:',
    floor: 'Available Floors:',
    area: 'Total Area:',
    priceM2: 'Price per m²:',
    totalPrice: 'Total Price:',
    views: 'Window Views & Exposure:',
    downPayment30: '30% Down Payment:',
    btnCalculate: 'Calculate 0% Schedule',
    btnBookWa: 'Reserve Unit via WhatsApp',
    closeAria: 'Close modal',
    somUnit: 'KGS',
  },
  zh: {
    title: '3D 户型立体鉴赏',
    block: '建筑单元 / 楼栋：',
    floor: '可选在售楼层：',
    area: '建筑面积：',
    priceM2: '平米单价：',
    totalPrice: '官方总价：',
    views: '窗景朝向与采光：',
    downPayment30: '30% 首期基准款：',
    btnCalculate: '一键测算0%免息分期',
    btnBookWa: '通过 WhatsApp 锁定房源',
    closeAria: '关闭弹窗',
    somUnit: '索姆',
  },
};

export default function ApartmentQuickViewModal({
  apartment,
  isOpen,
  onClose,
  usdRate = 87.45,
}: ApartmentQuickViewModalProps) {
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

  const t = MODAL_TEXTS[currentLang] || MODAL_TEXTS.ru;

  // Закрытие по клавише Esc и блокировка прокрутки фона
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !apartment) return null;

  const down30Usd = Math.round(apartment.price * 0.3);
  const down30Kgs = Math.round(down30Usd * usdRate);
  const totalPriceKgs = Math.round(apartment.price * usdRate);
  const cleanWaNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';

  const viewText = apartment.windowsView?.[currentLang] || apartment.windowsView?.ru || 'Панорамный вид';

  const waBookingText =
    `Здравствуйте! Рассматриваю планировку в ${apartment.complex}:\n\n` +
    `• ${apartment.roomsLabel} • ${apartment.area} м² (${apartment.block})\n` +
    `• Общая стоимость: $${apartment.price.toLocaleString('ru-RU')} (~${totalPriceKgs.toLocaleString('ru-RU')} ${t.somUnit})\n` +
    `• Первый взнос 30%: $${down30Usd.toLocaleString('ru-RU')} (~${down30Kgs.toLocaleString('ru-RU')} ${t.somUnit})\n` +
    `• Вид: ${viewText}\n\n` +
    `Хочу зафиксировать эту квартиру и узнать актуальное наличие свободных этажей.`;

  const handleWaClick = () => {
    try {
      reachGoal('apartment_modal_wa_click');
    } catch {}
    trackWhatsAppClick('quick_view_modal', apartment.complex);
  };

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#071912] border border-gray-200 dark:border-[#d4b26f]/30 rounded-3xl shadow-2xl p-5 sm:p-8 text-gray-900 dark:text-gray-100 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t.closeAria}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Заголовок модального окна */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pr-12">
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#064734]/10 dark:bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f]">
            {apartment.complex}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-neutral-300">
            {apartment.block}
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-gray-950 dark:text-white w-full mt-1">
            {apartment.roomsLabel} • {apartment.area} м²
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Левая колонка: 3D-планировка */}
          <div className="lg:col-span-7 bg-[#f2f6f4] dark:bg-[#03150e] rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-white/10 flex flex-col items-center justify-center relative min-h-[300px] sm:min-h-[380px]">
            <div className="relative w-full h-[260px] sm:h-[320px]">
              <Image
                src={apartment.planImage}
                alt={`${apartment.complex} - ${apartment.roomsLabel} ${apartment.area} м²`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-contain drop-shadow-xl"
              />
            </div>
            <span className="text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest mt-2">
              {t.title}
            </span>
          </div>

          {/* Правая колонка: Характеристики и расчёты */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-baseline pb-2 border-b border-gray-100 dark:border-white/10">
                <span className="text-gray-500 dark:text-neutral-400">{t.area}</span>
                <strong className="text-sm font-black text-gray-950 dark:text-white">
                  {apartment.area} м²
                </strong>
              </div>

              <div className="flex justify-between items-baseline pb-2 border-b border-gray-100 dark:border-white/10">
                <span className="text-gray-500 dark:text-neutral-400">{t.floor}</span>
                <strong className="font-bold text-gray-800 dark:text-neutral-200">
                  {apartment.floor}
                </strong>
              </div>

              <div className="flex justify-between items-baseline pb-2 border-b border-gray-100 dark:border-white/10">
                <span className="text-gray-500 dark:text-neutral-400">{t.priceM2}</span>
                <strong className="font-bold text-gray-800 dark:text-neutral-200">
                  ${apartment.priceM2} / м²
                </strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f2f6f4] dark:bg-[#03150e] border border-[#064734]/15 dark:border-white/10">
                <span className="text-[11px] font-bold text-gray-500 dark:text-neutral-400 block mb-0.5">
                  {t.totalPrice}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#064734] dark:text-[#d4b26f]">
                  ${apartment.price.toLocaleString('ru-RU')}
                </div>
                <span className="text-[11px] font-semibold text-gray-500 dark:text-neutral-400 block mt-0.5">
                  ≈ {totalPriceKgs.toLocaleString('ru-RU')} {t.somUnit}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30">
                <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-400 block mb-0.5">
                  {t.downPayment30}
                </span>
                <div className="text-lg font-black text-emerald-800 dark:text-emerald-300">
                  ${down30Usd.toLocaleString('ru-RU')}
                </div>
                <span className="text-[11px] text-emerald-700/80 dark:text-emerald-500 block">
                  ≈ {down30Kgs.toLocaleString('ru-RU')} {t.somUnit}
                </span>
              </div>

              <div className="pt-1">
                <span className="text-[11px] font-bold text-gray-500 dark:text-neutral-400 block mb-1">
                  {t.views}
                </span>
                <p className="text-xs font-semibold text-gray-800 dark:text-neutral-200 leading-relaxed flex items-start gap-1.5">
                  <IconCheck className="w-3.5 h-3.5 text-[#064734] dark:text-[#d4b26f] shrink-0 mt-0.5" />
                  <span>{viewText}</span>
                </p>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="space-y-2.5 pt-3">
              <a
                href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waBookingText)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWaClick}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <IconWhatsApp className="w-4 h-4 text-white" />
                <span>{t.btnBookWa}</span>
              </a>

              <Link
                href="/rassrochka"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-[#064734] hover:bg-[#032b20] dark:bg-[#d4b26f] dark:hover:bg-[#c49f57] active:scale-95 text-[#d4b26f] hover:text-white dark:text-[#064734] font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <IconBuilding className="w-4 h-4" />
                <span>{t.btnCalculate}</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}