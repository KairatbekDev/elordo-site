'use client';

import { useState } from 'react';

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
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+996 ');
  const [selectedProject, setSelectedProject] = useState(PROJECTS_LIST[0]);
  const [selectedGoal, setSelectedGoal] = useState(GOAL_TAGS[0]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Умное форматирование кыргызского номера: +996 (XXX) XX-XX-XX
  const formatKGPhone = (input: string) => {
    let raw = input.replace(/\D/g, '');

    // Если начали ввод с 0 (например 0709...), убираем 0 и подставляем 996
    if (raw.startsWith('0')) {
      raw = '996' + raw.slice(1);
    }

    // Если случайно стёрли код 996, возвращаем его
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 12) {
      setError('Пожалуйста, введите полный номер телефона: +996 (XXX) XX-XX-XX');
      return;
    }

    setIsSubmitting(true);

    const clientName = name.trim() ? name.trim() : 'Посетитель сайта';
    const message =
      `Здравствуйте! Меня зовут ${clientName}.\n` +
      `Заявка на консультацию с сайта EL ORDO GROUP:\n\n` +
      `🏢 Объект: ${selectedProject}\n` +
      `🎯 Цель обращения: ${selectedGoal}\n` +
      `📞 Телефон для связи: ${phone}\n\n` +
      `Отправьте, пожалуйста, актуальную шахматку, планировки и график платежей.`;

    const waUrl = `https://wa.me/996709115115?text=${encodeURIComponent(message)}`;

    // Открытие чата в WhatsApp
    window.location.href = waUrl;

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2500);
  };

  return (
    <section id="contacts" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden bg-[#064734] text-white">
      
      {/* Мягкий геометрический паттерн на фоне */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4b26f_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl border border-white/15 p-6 sm:p-12 shadow-2xl">
        
        {/* Заголовок формы */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase font-black tracking-widest text-[#d4b26f] block mb-2">
            Персональный подбор квартиры
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-3">
            Получить шахматку и расчет рассрочки
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
            Оставьте заявку — менеджер отдела продаж свяжется с вами в течение 5 минут в WhatsApp, пришлет доступные планировки и рассчитает индивидуальный график выплат 0%.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
          
          {/* Быстрый выбор цели обращения (Чипы) */}
          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-gray-300 mb-2">
              Что вас больше всего интересует?
            </label>
            <div className="flex flex-wrap gap-2">
              {GOAL_TAGS.map((tag) => {
                const isSelected = selectedGoal === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedGoal(tag)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                Ваше имя:
              </label>
              <input
                type="text"
                autoComplete="name"
                placeholder="Например: Азамат"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 focus:border-[#d4b26f] focus:outline-none rounded-xl px-4 py-3.5 text-base sm:text-sm text-white placeholder-white/40 transition-colors shadow-inner"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Номер телефона: <span className="text-[#d4b26f]">*</span>
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
              Жилой комплекс:
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
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-center animate-shake">
              <p className="text-xs text-rose-200 font-bold">
                {error}
              </p>
            </div>
          )}

          {/* Кнопка отправки */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#d4b26f] hover:bg-[#c49f57] active:scale-[0.99] disabled:opacity-75 text-[#064734] font-black py-4 rounded-xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>💬</span>
              <span>{isSubmitting ? 'Открываем WhatsApp...' : 'Получить расчет и шахматку в WhatsApp'}</span>
            </button>
          </div>

          {/* Гарантии и защита данных */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-white/70">
            <span className="flex items-center gap-1.5">
              <span className="text-[#d4b26f] font-bold">✓</span> Прямой расчет без скрытых переплат
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#d4b26f] font-bold">✓</span> Консультация бесплатна
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#d4b26f] font-bold">✓</span> Ответ за 5 минут
            </span>
          </div>

          <div className="text-center pt-1">
            <span className="text-[10px] text-white/50">
              🔒 Ваши данные надежно защищены и используются исключительно для связи менеджера с вами
            </span>
          </div>

        </form>
      </div>
    </section>
  );
}