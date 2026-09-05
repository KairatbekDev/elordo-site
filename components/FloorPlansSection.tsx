'use client';

import { useState } from 'react';

export interface ApartmentPlan {
  rooms: 1 | 2 | 3;
  title: string;
  area: string;
  block?: string;
  image?: string;
}

interface FloorPlansSectionProps {
  projectName: string;
  plans: ApartmentPlan[];
  whatsappNumber?: string;
  theme?: 'dark' | 'light';
}

export default function FloorPlansSection({
  projectName,
  plans,
  whatsappNumber = '996709115115',
  theme = 'dark',
}: FloorPlansSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 1 | 2 | 3>('all');

  const filteredPlans =
    activeTab === 'all' ? plans : plans.filter((p) => p.rooms === activeTab);

  const isDark = theme === 'dark';

  return (
    <section className={`py-16 px-6 ${isDark ? 'bg-[#181818] text-white' : 'bg-[#f4f7f5] text-gray-900'}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Заголовок */}
        <h2 className={`text-2xl sm:text-3xl font-black text-center uppercase tracking-wider mb-8 ${isDark ? 'text-[#d4b26f]' : 'text-[#064734]'}`}>
          Планировки
        </h2>

        {/* Табы переключения комнатности */}
        <div className="flex justify-center items-center gap-6 sm:gap-10 mb-12 border-b border-white/10 pb-4">
          {[
            { id: 'all', label: 'Все' },
            { id: 1, label: '1 ком' },
            { id: 2, label: '2 ком' },
            { id: 3, label: '3 ком' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`text-sm sm:text-base font-bold transition-all relative pb-2 ${
                  isActive
                    ? isDark
                      ? 'text-[#d4b26f]'
                      : 'text-[#064734]'
                    : isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span
                    className={`absolute bottom-[-17px] left-0 w-full h-[3px] rounded-full ${
                      isDark ? 'bg-[#d4b26f]' : 'bg-[#064734]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Сетка карточек планировок */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlans.map((plan, idx) => {
            const waMessage = `Здравствуйте, интересует планировка: ${plan.title} (${plan.area}) в ${projectName}. Отправьте, пожалуйста, шахматку цен.`;
            return (
              <div
                key={idx}
                className="bg-[#ebebeb] text-gray-900 rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Изображение планировки 3D */}
                  <div className="relative h-44 w-full bg-white rounded-xl overflow-hidden mb-4 flex items-center justify-center p-3 border border-gray-200">
                    <img
                      src={plan.image || '/projects/Abu-Dhabi.png'}
                      alt={plan.title}
                      className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Название и площадь */}
                  <p className="text-xs text-gray-600 font-medium leading-snug line-clamp-2 mb-2">
                    {plan.title}
                  </p>
                  <p className="text-2xl font-black text-gray-950 tracking-tight">
                    {plan.area}
                  </p>
                </div>

                {/* Кнопка запроса в WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full text-center bg-[#064734] hover:bg-[#032b20] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Узнать цену
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}