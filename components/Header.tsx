import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-[#064734] uppercase">
            El Ordo
          </span>
          <span className="text-xs bg-[#064734]/10 text-[#064734] font-semibold px-2 py-0.5 rounded-full">
            Group
          </span>
        </Link>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/projects" className="hover:text-[#064734] transition-colors">
  Объекты
</Link>
          <Link href="/usloviya" className="hover:text-[#064734] transition-colors">
  Условия покупки
</Link>
          <Link href="/o-kompanii" className="hover:text-[#064734] transition-colors">
            О компании
          </Link>
          <Link href="/contacts" className="hover:text-[#064734] transition-colors">
  Контакты
</Link>
        </nav>

        {/* Кнопка заявки */}
        <div className="flex items-center gap-4">
          <a
            href="#contacts"
            className="bg-[#064734] hover:bg-[#032b20] text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all duration-200"
          >
            Консультация
          </a>
        </div>

      </div>
    </header>
  );
}