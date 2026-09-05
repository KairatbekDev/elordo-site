'use client';

import { useState } from 'react';

export interface TypicalFloorItem {
  id: string;
  label: string;
  image: string;
  description?: string;
}

interface TypicalFloorsSectionProps {
  projectName: string;
  floors: TypicalFloorItem[];
  whatsappNumber?: string;
}

export default function TypicalFloorsSection({
  projectName,
  floors,
  whatsappNumber = '996709115115',
}: TypicalFloorsSectionProps) {
  const [activeFloorId, setActiveFloorId] = useState<string>(floors[0]?.id || '2');

  const currentFloor = floors.find((f) => f.id === activeFloorId) || floors[0];

  const waMessage = `Здравствуйте, интересует планировка (${currentFloor.label}) в объекте ${projectName}. Отправьте, пожалуйста, информацию о свободных квартирах.`;

  return (
    <section className="py-20 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Заголовок секции */}
        <h2 className="text-2xl sm:text-3xl font-black text-center uppercase tracking-wider text-[#064734] mb-8">
          ТИПОВЫЕ ЭТАЖИ
        </h2>

        {/* Табы переключения этажей */}
        <div className="flex justify-center items-center gap-6 sm:gap-12 mb-10 border-b border-gray-100 pb-4">
          {floors.map((floor) => {
            const isActive = activeFloorId === floor.id;
            return (
              <button
                key={floor.id}
                type="button"
                onClick={() => setActiveFloorId(floor.id)}
                className={`text-sm sm:text-base font-bold transition-all relative pb-2 ${
                  isActive
                    ? 'text-[#064734]'
                    : 'text-gray-400 hover:text-gray-800'
                }`}
              >
                {floor.label}
                {isActive && (
                  <span className="absolute bottom-[-17px] left-0 w-full h-[3px] bg-[#064734] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Чертеж / План этажа */}
        <div className="bg-[#fafbfa] border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          <div className="relative w-full h-[420px] sm:h-[550px] flex items-center justify-center overflow-hidden">
            <img
              src={currentFloor.image}
              alt={`${projectName} - ${currentFloor.label}`}
              className="max-h-full max-w-full object-contain transition-all duration-300 drop-shadow-sm hover:scale-[1.02]"
            />
          </div>

          {/* Экспликация и кнопка запроса */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#99d5b8] border border-[#78bfa0]" />
                <span>1-комнатные</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#f5b8b8] border border-[#e49b9b]" />
                <span>2-комнатные</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#064734] hover:bg-[#032b20] text-white font-bold px-6 py-3 rounded-xl uppercase tracking-wider text-xs transition-colors shadow-sm"
            >
              Запросить шахматку {currentFloor.label}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}