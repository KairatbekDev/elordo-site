import Link from 'next/link';

export default function NotFound() {
  const quickLinks = [
    { href: '/projects', label: 'Каталог объектов', icon: '🏢' },
    { href: '/usloviya', label: 'Рассрочка 0%', icon: '🗓️' },
    { href: '/trade-in', label: 'Trade-in (Бартер)', icon: '🚗' },
    { href: '/contacts', label: 'Офис продаж', icon: '📍' },
  ];

  const waHelpText = encodeURIComponent(
    'Здравствуйте! Я не нашел нужную страницу или объект на сайте EL ORDO GROUP. Подскажите, пожалуйста, актуальную информацию.'
  );

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[#fafbfa] text-gray-900 px-4 sm:px-6 py-20 relative overflow-hidden selection:bg-[#d4b26f] selection:text-[#064734]">
      
      {/* Мягкое фоновое свечение */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#064734]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 space-y-6">
        
        {/* Бейдж статуса */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#064734]/10 border border-[#064734]/20 text-[#064734] text-xs font-black uppercase tracking-widest">
          <span>Страница не найдена</span>
        </div>

        {/* Заголовок с золотым акцентом */}
        <div className="space-y-1">
          <div className="text-7xl sm:text-9xl font-black text-[#064734] tracking-tight leading-none">
            404
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-950">
            Запрашиваемый адрес недоступен
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light max-w-md mx-auto">
          Возможно, объект уже сдан, страница перемещена или в ссылке допущена опечатка. Выберите нужный раздел ниже:
        </p>

        {/* Быстрая навигация по ключевым разделам */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="p-3 rounded-2xl bg-white border border-gray-200 hover:border-[#064734] hover:shadow-md transition-all text-left flex flex-col justify-between group"
            >
              <span className="text-lg mb-2 block">{item.icon}</span>
              <span className="text-xs font-bold text-gray-900 group-hover:text-[#064734] transition-colors leading-tight">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Кнопки основных действий */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white font-black px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md text-center"
          >
            На главную страницу
          </Link>
          <a
            href={`https://wa.me/996709115115?text=${waHelpText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 hover:border-[#064734] active:scale-95 text-gray-800 font-bold px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all bg-white text-center flex items-center justify-center gap-1.5"
          >
            <span>💬</span>
            <span>Спросить в WhatsApp</span>
          </a>
        </div>

      </div>
    </main>
  );
}