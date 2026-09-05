'use client';

import { useState } from 'react';

const PROJECTS_LIST = [
  'Все объекты / Нужна консультация',
  'ЖК Abu Dhabi (ул. Сухомлинова, 29)',
  'ЖК Madina Residence (ул. Огонбаева, 12)',
  'ЖД Айкол + (с. Кок-Жар)',
  'ЖД Айкол (ул. Арашан, 10)',
  'ЖК Келечек (ул. Космическая, 153)',
  'КД Ордо (ул. Тверская, 20)',
];

export default function ConsultationForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+996 ');
  const [selectedProject, setSelectedProject] = useState(PROJECTS_LIST[0]);
  const [error, setError] = useState('');

  // Форматирование ввода номера телефона Кыргызстана
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // Гарантируем наличие префикса +996
    if (!val.startsWith('+996')) {
      val = '+996 ';
    }

    setPhone(val);
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Простая валидация: должно быть минимум 9 цифр после кода
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 12) {
      setError('Пожалуйста, введите корректный номер телефона (+996 XXX XXX XXX)');
      return;
    }

    // Собираем текст сообщения для менеджера продаж
    const clientName = name.trim() ? name.trim() : 'Посетитель сайта';
    const message = `Здравствуйте! Меня зовут ${clientName}.\nХочу получить консультацию по объектам EL ORDO GROUP.\n\n📍 Интересующий объект: ${selectedProject}\n📞 Контактный номер: ${phone}`;

    const waUrl = `https://wa.me/996709115115?text=${encodeURIComponent(message)}`;

    // Открываем WhatsApp в новой вкладке
    window.open(waUrl, '_blank');
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-[#064734] text-white">
      {/* Фоновый легкий паттерн */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4b26f_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4b26f] block mb-2">
            ПЕРСОНАЛЬНЫЙ ПОДБОР КВАРТИРЫ
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-wide leading-tight mb-4">
            ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ И РАСЧЕТ РАССРОЧКИ
          </h2>
          <p className="text-sm text-white/80 font-light leading-relaxed">
            Оставьте свой номер — менеджер отдела продаж свяжется с вами в WhatsApp, отправит актуальные шахматки, цены и рассчитает график беспроцентной рассрочки до 40 месяцев.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Поле имени */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Ваше имя:
              </label>
              <input
                type="text"
                placeholder="Например: Азамат"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 focus:border-[#d4b26f] focus:outline-none rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 transition-colors"
              />
            </div>

            {/* Поле телефона */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Номер телефона: <span className="text-[#d4b26f]">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+996 700 000 000"
                className="w-full bg-white/10 border border-white/20 focus:border-[#d4b26f] focus:outline-none rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 transition-colors font-medium"
              />
            </div>
          </div>

          {/* Выбор объекта */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              Какой объект вас интересует?
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full bg-[#0b3b2c] border border-white/20 focus:border-[#d4b26f] focus:outline-none rounded-xl px-4 py-3.5 text-sm text-white transition-colors"
            >
              {PROJECTS_LIST.map((proj, idx) => (
                <option key={idx} value={proj} className="bg-[#0b3b2c] text-white">
                  {proj}
                </option>
              ))}
            </select>
          </div>

          {/* Сообщение об ошибке валидации */}
          {error && (
            <p className="text-xs text-rose-300 font-semibold text-center mt-1">
              {error}
            </p>
          )}

          {/* Кнопка отправки */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#d4b26f] hover:bg-[#c29f5a] text-[#064734] font-black py-4 rounded-xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>💬</span>
              <span>Получить расчет в WhatsApp</span>
            </button>
          </div>

          {/* Преимущества и безопасность */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[11px] text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="text-[#d4b26f]">✓</span> Прямой расчет без скрытых переплат
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#d4b26f]">✓</span> Консультация бесплатна
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#d4b26f]">✓</span> Ответ в течение 5–10 минут
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}