'use client';

import { useState } from 'react';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import {
  IconCheck,
  IconWhatsApp,
  IconShieldCheck,
  IconPhone,
} from '@/components/Icons';

const PROJECTS_LIST = [
  'Все объекты / Нужна консультация',
  'ЖК Abu Dhabi (ул. Сухомлинова, 29)',
  'ЖК Madina Residence (ул. Огонбаева, 12)',
  'ЖД Айкол + (с. Кок-Жар, ул. Баялинова, 6)',
  'ЖД Айкол (ул. Арашан, 10)',
  'ЖК Келечек (ул. Космическая, 153)',
  'КД Ордо (ул. Тверская, 20)',
];

const GOAL_TAGS = [
  'Рассрочка 0%',
  'Trade-in (Обмен авто)',
  'Подбор 1-комн.',
  'Подбор 2-комн.',
  'Шахматка цен',
  'Визит в офис',
];

export default function ConsultationForm() {
  const { locale } = useLanguage();
  const isKg = locale === 'kg';
  const isEn = locale === 'en';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+996 ');
  const [selectedProject, setSelectedProject] = useState(PROJECTS_LIST[0]);
  const [selectedGoal, setSelectedGoal] = useState(GOAL_TAGS[0]);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Умное форматирование кыргызского номера: +996 (XXX) XX-XX-XX
  const formatKGPhone = (input: string) => {
    let raw = input.replace(/\D/g, '');

    // Если начали ввод с 0 (например 0709...), убираем 0 и подставляем 996
    if (raw.startsWith('0')) {
      raw = '996' + raw.slice(1);
    }

    // Если стёрли код 996, возвращаем его
    if (!raw.startsWith('996')) {
      raw = '996' + raw;
    }

    // Ограничиваем длину (996 + 9 цифр = 12 цифр)
    raw = raw.slice(0, 12);

    const country = '+996';
    const operator = raw.slice(3, 6);
    const part1 = raw.slice(6, 8);
    const part2 = raw.slice(8, 10);
    const part3 = raw.slice(10, 12);

    let formatted = country;
    if (operator.length > 0) formatted += ` (${operator}`;
    if (operator.length === 3) formatted += ')';
    if (part1.length > 0) formatted += ` ${part1}`;
    if (part2.length > 0) formatted += `-${part2}`;
    if (part3.length > 0) formatted += `-${part3}`;

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatKGPhone(e.target.value);
    setPhone(formatted);
    if (error) setError('');
  };

  const validatePhone = () => {
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 12) {
      setError(
        isKg
          ? 'Сураныч, толук телефон номериңизди жазыңыз: +996 (XXX) XX-XX-XX'
          : isEn
          ? 'Please enter your complete phone number: +996 (XXX) XX-XX-XX'
          : 'Пожалуйста, введите полный номер телефона: +996 (XXX) XX-XX-XX'
      );
      return false;
    }
    setError('');
    return true;
  };

  // Вариант 1: Прямая заявка на сайте (для тех, кто с ноутбука/компьютера без WhatsApp Web)
  const handleDirectCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone()) return;

    setIsSubmitting(true);

    // Имитация быстрой отправки в CRM / базу (или отправка через fetch на API)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  // Вариант 2: Переход в WhatsApp (для мобильных пользователей)
  const handleWhatsAppSubmit = () => {
    if (!validatePhone()) return;

    const clientName = name.trim() ? name.trim() : 'Посетитель сайта';
    const message =
      `Здравствуйте! Меня зовут ${clientName}.\n` +
      `Заявка на консультацию с сайта EL ORDO GROUP:\n\n` +
      `• Объект: ${selectedProject}\n` +
      `• Цель обращения: ${selectedGoal}\n` +
      `• Телефон для связи: ${phone}\n\n` +
      `Отправьте, пожалуйста, актуальную шахматку, планировки и график платежей.`;

    const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contacts" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden bg-[#064734] text-white">
      {/* Мягкий геометрический паттерн на фоне */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4b26f_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl border border-white/15 p-6 sm:p-12 shadow-2xl">
        {isSuccess ? (
          /* Экран успешной отправки заявки */
          <div className="text-center py-10 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#d4b26f]/20 text-[#d4b26f] flex items-center justify-center mx-auto mb-6 border border-[#d4b26f]/30 shadow-lg animate-bounce">
              <IconCheck className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-3">
              {isKg ? 'Табыштамаңыз кабыл алынды!' : isEn ? 'Request Received!' : 'Заявка успешно принята!'}
            </h3>

            <p className="text-sm text-white/90 leading-relaxed mb-6">
              {isKg
                ? `Ыракмат, ${name.trim() || 'урматтуу кардар'}! Сатуу бөлүмүнүн менеджери ${phone} номери боюнча 5–10 мүнөттүн ичинде байланышат.`
                : isEn
                ? `Thank you, ${name.trim() || 'dear guest'}! A sales specialist will contact you at ${phone} within 5–10 minutes.`
                : `Спасибо, ${name.trim() || 'уважаемый клиент'}! Менеджер отдела продаж свяжется с вами по номеру ${phone} в течение 5–10 минут.`}
            </p>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-xs text-gray-300 mb-8 text-left space-y-1">
              <p>• {isKg ? 'Кызыктырган объект:' : isEn ? 'Selected project:' : 'Выбранный объект:'} <strong className="text-white">{selectedProject}</strong></p>
              <p>• {isKg ? 'Суроо-талап:' : isEn ? 'Inquiry topic:' : 'Тема запроса:'} <strong className="text-[#d4b26f]">{selectedGoal}</strong></p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setName('');
                setPhone('+996 ');
              }}
              className="text-xs uppercase font-bold text-[#d4b26f] hover:underline cursor-pointer"
            >
              {isKg ? 'Башка табыштама жөнөтүү' : isEn ? 'Send another request' : 'Отправить ещё одну заявку'}
            </button>
          </div>
        ) : (
          /* Стандартная форма */
          <>
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs uppercase font-black tracking-widest text-[#d4b26f] block mb-2">
                {isKg ? 'Батирлерди жекече тандоо' : isEn ? 'Personal Property Selection' : 'Персональный подбор квартиры'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-3">
                {isKg ? 'Шахматка жана 0% эсебин алуу' : isEn ? 'Get Floor Plans & 0% Installment' : 'Получить шахматку и расчет рассрочки'}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                {isKg
                  ? 'Табыштама калтырыңыз — сатуу бөлүмү 5 мүнөттө байланышып, бош кабаттарды жана жеке төлөм графигин сунуштайт.'
                  : isEn
                  ? 'Submit an inquiry — our sales team will connect with you within 5 minutes with floor availability and payment terms.'
                  : 'Оставьте номер телефона — менеджер отдела продаж свяжется с вами за 5 минут, пришлет доступные планировки и рассчитает график выплат 0%.'}
              </p>
            </div>

            <form onSubmit={handleDirectCallback} className="space-y-5 max-w-2xl mx-auto">
              {/* Быстрый выбор цели обращения (Чипы) */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-gray-300 mb-2">
                  {isKg ? 'Сизди эмне көбүрөөк кызыктырат?' : isEn ? 'What are you most interested in?' : 'Что вас больше всего интересует?'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {GOAL_TAGS.map((tag) => {
                    const isSelected = selectedGoal === tag;
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedGoal(tag)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#d4b26f] text-[#064734] shadow-md scale-105'
                            : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Имя и Телефон */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    {isKg ? 'Атыңыз:' : isEn ? 'Your Name:' : 'Ваше имя:'}
                  </label>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder={isKg ? 'Мисалы: Азамат' : isEn ? 'e.g. Alex' : 'Например: Азамат'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 focus:border-[#d4b26f] focus:outline-none rounded-xl px-4 py-3.5 text-base sm:text-sm text-white placeholder-white/40 transition-colors shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    {isKg ? 'Телефон номериңиз:' : isEn ? 'Phone Number:' : 'Номер телефона:'} <span className="text-[#d4b26f]">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+996 (700) 00-00-00"
                    className="w-full bg-white/10 border border-white/20 focus:border-[#d4b26f] focus:outline-none rounded-xl px-4 py-3.5 text-base sm:text-sm text-white placeholder-white/40 transition-colors font-medium tracking-wide shadow-inner"
                  />
                </div>
              </div>

              {/* Выбор жилого комплекса */}
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  {isKg ? 'Турак жай комплекси:' : isEn ? 'Residential Complex:' : 'Жилой комплекс:'}
                </label>
                <div className="relative">
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full bg-[#0b3b2c] border border-white/20 focus:border-[#d4b26f] focus:outline-none rounded-xl px-4 py-3.5 text-base sm:text-sm text-white appearance-none cursor-pointer pr-10 shadow-inner"
                  >
                    {PROJECTS_LIST.map((proj, idx) => (
                      <option key={idx} value={proj} className="bg-[#064734] text-white py-2">
                        {proj}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#d4b26f]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Сообщение об ошибке */}
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-center">
                  <p className="text-xs text-rose-200 font-bold">
                    {error}
                  </p>
                </div>
              )}

              {/* Двойные кнопки отправки (Звонок + WhatsApp) */}
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Кнопка 1: Прямой звонок без WhatsApp */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#d4b26f] hover:bg-[#c49f57] active:scale-[0.99] disabled:opacity-75 text-[#064734] font-black py-4 rounded-xl uppercase tracking-wider text-xs transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <IconPhone className="w-4 h-4" />
                  <span>{isSubmitting ? 'Жөнөтүлүүдө...' : 'Заказать звонок (за 5 мин)'}</span>
                </button>

                {/* Кнопка 2: Переход в WhatsApp */}
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="w-full bg-white/10 hover:bg-white/20 active:scale-[0.99] text-white font-bold py-4 rounded-xl uppercase tracking-wider text-xs border border-white/25 transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                  <span>Написать в WhatsApp</span>
                </button>
              </div>

              {/* Гарантии и защита данных */}
              <div className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-white/70">
                <span className="flex items-center gap-1.5">
                  <IconCheck className="w-3.5 h-3.5 text-[#d4b26f] shrink-0" />
                  <span>Прямой расчет без скрытых переплат</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <IconCheck className="w-3.5 h-3.5 text-[#d4b26f] shrink-0" />
                  <span>Консультация бесплатна</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <IconCheck className="w-3.5 h-3.5 text-[#d4b26f] shrink-0" />
                  <span>Ответ за 5 минут</span>
                </span>
              </div>

              <div className="text-center pt-1">
                <span className="text-[10px] text-white/50 inline-flex items-center gap-1.5 justify-center">
                  <IconShieldCheck className="w-3.5 h-3.5 text-[#d4b26f] shrink-0" />
                  <span>Ваши данные надежно защищены и используются исключительно для связи менеджера с вами</span>
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}