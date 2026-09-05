import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-[#fafbfa] text-gray-900 px-6 py-20">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="text-xs uppercase font-bold tracking-widest text-[#d4b26f] block">
          ОШИБКА 404
        </span>
        <h1 className="text-6xl sm:text-7xl font-black text-[#064734]">404</h1>
        <h2 className="text-xl sm:text-2xl font-black uppercase">
          СТРАНИЦА НЕ НАЙДЕНА
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed font-light">
          Возможно, объект был перемещен или в адресе допущена неточность. Перейдите в каталог или на главную страницу.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/projects"
            className="bg-[#064734] hover:bg-[#032b20] text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow"
          >
            Смотреть объекты
          </Link>
          <Link
            href="/"
            className="border border-gray-300 hover:border-[#064734] text-gray-800 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
          >
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
}