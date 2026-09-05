import type { Metadata } from 'next';
import Link from 'next/link';
import PaymentLayout from '@/components/PaymentLayout';

export const metadata: Metadata = {
  title: '100% оплата квартир в Бишкеке со скидкой от застройщика | EL ORDO GROUP',
  description:
    'Максимальная выгода и персональная скидка при единовременной оплате квартиры в новостройках Бишкека от EL ORDO GROUP. Приоритетная бронь видовых этажей, быстрое оформление ДДУ за 24 часа. ЖК Abu Dhabi, Madina Residence, Айкол+.',
  openGraph: {
    title: 'Максимальная скидка при 100% оплате квартиры в Бишкеке | EL ORDO GROUP',
    description:
      'Инвестируйте в недвижимость Бишкека с максимальным дисконтом от девелопера. Прирост капитала до 35% к моменту сдачи объекта.',
    images: [
      {
        url: '/projects/Abu-Dhabi.png',
        width: 1200,
        height: 630,
        alt: '100% оплата квартир в Бишкеке от EL ORDO GROUP',
      },
    ],
  },
};

// Примеры прямой финансовой выгоды при 100% оплате
const DISCOUNT_CASES = [
  {
    complex: 'ЖК Abu Dhabi',
    classType: 'Премиум-класс',
    area: '49.48 м²',
    standardPrice: '$81 642',
    cashPrice: 'от $76 690',
    saving: 'Экономия до $4 950',
    savingKgs: '≈ 433 000 сом выгоды',
    benefit: 'Хватит на премиальную сантехнику и технику',
    badge: 'Флагман столицы',
    slug: 'abu-dhabi',
    waText: 'Здравствуйте! Интересует размер персональной скидки при 100% оплате 1-комнатной квартиры в ЖК Abu Dhabi. Какие видовые этажи свободны?',
  },
  {
    complex: 'ЖК Madina Residence',
    classType: 'Бизнес-класс',
    area: '43.59 м²',
    standardPrice: '$61 026',
    cashPrice: 'от $57 500',
    saving: 'Экономия до $3 500',
    savingKgs: '≈ 306 000 сом выгоды',
    benefit: 'Покрывает стоимость полного дизайн-проекта',
    badge: 'Центр Бишкека',
    slug: 'madina-residence',
    waText: 'Здравствуйте! Хочу узнать размер скидки при единовременной 100% оплате в ЖК Madina Residence. Отправьте планировки.',
  },
  {
    complex: 'ЖД Айкол +',
    classType: 'Комфорт+ (Кок-Жар)',
    area: '42.00 м²',
    standardPrice: '$46 200',
    cashPrice: 'от $43 200',
    saving: 'Экономия до $3 000',
    savingKgs: '≈ 262 000 сом выгоды',
    benefit: 'Чистая экономия бюджета молодой семьи',
    badge: 'Эко-предгорье',
    slug: 'ajkol-plus',
    waText: 'Здравствуйте! Интересует спеццена при 100% расчете в ЖД Айкол+ (Кок-Жар). Подскажите свободные квартиры.',
  },
];

const PRIVILEGES = [
  {
    icon: '🏷️',
    title: 'Максимальный дисконт от руководства',
    desc: 'Вы получаете минимально возможную цену за квадратный метр. Сэкономленные средства можно направить на дизайнерский ремонт или меблировку.',
  },
  {
    icon: '🏔️',
    title: 'Приоритетный выбор видовых этажей',
    desc: 'Покупателям со 100% оплатой открывается ранний доступ к лучшим планировкам, верхним этажам и панорамным видам на горный хребет Ала-Тоо.',
  },
  {
    icon: '⚡',
    title: 'Моментальная регистрация ДДУ за 24 часа',
    desc: 'Полное юридическое сопровождение сделки штатными юристами застройщика. Быстрая регистрация в госорганах без очередей.',
  },
  {
    icon: '📈',
    title: 'Высокая инвестиционная доходность (ROI)',
    desc: 'Покупка на стадии строительства за полную стоимость обеспечивает прирост капитала до 25–35% к моменту ввода дома в эксплуатацию.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Выбор видовой квартиры',
    desc: 'Изучаете планировки на сайте или приезжаете в офис продаж для выбора этажа на 3D-макете.',
  },
  {
    num: '02',
    title: 'Фиксация спеццены',
    desc: 'Согласовываем индивидуальный размер скидки с руководством компании и бронируем выбранную квартиру.',
  },
  {
    num: '03',
    title: 'Подписание ДДУ',
    desc: 'Заключаем официальный Договор долевого участия за 40 минут с полным юридическим разъяснением всех пунктов.',
  },
  {
    num: '04',
    title: 'Оплата и полный пакет документов',
    desc: 'Вносите оплату через кассу компании или безналичным банковским переводом с выдачей всех финансовых чеков.',
  },
];

export default function FullPaymentPage() {
  return (
    <PaymentLayout
      pageTitle="100% расчет"
      currentSlug="polniy-raschet"
      heroTitle="МАКСИМАЛЬНАЯ ВЫГОДА И СКИДКИ ПРИ 100% ОПЛАТЕ"
      heroSubtitle="Самый выгодный способ приобретения недвижимости от застройщика EL ORDO GROUP. Зафиксируйте минимальную цену за квадратный метр, получите приоритет в выборе лучших планировок и оформите ДДУ за 24 часа."
      noticeText="При единовременной полной оплате квартиры компания EL ORDO GROUP предоставляет максимальный индивидуальный дисконт. Вы экономите существенную сумму, становитесь полноправным владельцем недвижимости без долговых обязательств и защищаете капитал от инфляции."
      blockTitle="УСЛОВИЯ И ПРЕИМУЩЕСТВА ПОЛНОГО РАСЧЕТА"
      descriptionText="Единоразовый расчет всей стоимости квартиры сразу после подписания Договора долевого участия (ДДУ). Оплата возможна в наличной форме через официальную кассу компании с выдачей всех кассовых ордеров, либо безналичным банковским переводом. Покупателю открывается приоритетное бронирование видовых этажей и гарантируется фиксированная стоимость метра без последующих перерасчетов."
      documentsText="Паспорт гражданина Кыргызской Республики (ID-карта или загранпаспорт). Для иностранных граждан — паспорт с нотариально заверенным переводом на русский язык. Справки о доходах не требуются."
      faqList={[
        {
          q: 'Какой размер скидки можно получить при 100% оплате?',
          a: 'Размер индивидуального дисконта зависит от выбранного жилого комплекса, площади квартиры и текущей стадии строительства. В среднем экономия составляет от $2 500 до $10 000+ по сравнению с базовой стоимостью.',
        },
        {
          q: 'В какой валюте производятся взаиморасчеты?',
          a: 'В соответствии с законодательством Кыргызской Республики все официальные расчеты осуществляются в национальной валюте (сом) по согласованному курсу, зафиксированному в договоре, либо через банковский перевод.',
        },
        {
          q: 'Как могут оплатить соотечественники, находящиеся за границей?',
          a: 'Мы предоставляем официальные банковские реквизиты для прямого SWIFT-перевода со счетов в зарубежных банках, либо сделку может провести доверенное лицо по нотариальной доверенности в Бишкеке.',
        },
        {
          q: 'Выдаются ли официальные финансовые документы об оплате?',
          a: 'Обязательно. При безналичной оплате у вас остается банковское платежное поручение, при оплате через кассу компании выдается приходный кассовый ордер и официальная справка о 100% закрытии финансовых обязательств.',
        },
        {
          q: 'Можно ли перепродать квартиру до сдачи дома (по переуступке)?',
          a: 'Да. Полностью оплаченная квартира обладает максимальной юридической ликвидностью. Вы можете выгодно перепродать ее на этапе высокой готовности по договору переуступки прав требования (цессии) через отдел продаж компании.',
        },
        {
          q: 'Фиксируется ли окончательная цена в договоре?',
          a: 'Да. Цена фиксируется окончательно и бесповоротно в момент подписания ДДУ. Никакие последующие удорожания стройматериалов или инфляционные риски не влияют на стоимость вашей квартиры.',
        },
      ]}
    >
      {/* 🌟 1. КАРТОЧКИ РЕАЛЬНОЙ ЭКОНОМИИ */}
      <div className="mt-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            Прямая выгода покупателя
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            Реальная экономия при 100% оплате
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Примеры специальной цены на 1-комнатные квартиры при единовременном расчете
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DISCOUNT_CASES.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl hover:border-[#064734]/30 transition-all flex flex-col justify-between relative group"
            >
              <div className="absolute -top-3 right-6 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                {item.badge}
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 block mb-1">
                  {item.classType}
                </span>
                <h4 className="text-xl font-black text-gray-950 mb-1">
                  {item.complex}
                </h4>
                <div className="text-xs font-semibold text-[#064734] mb-4">
                  Площадь квартиры: {item.area}
                </div>

                <div className="space-y-2.5 border-t border-gray-100 pt-3 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Базовая стоимость:</span>
                    <span className="line-through">{item.standardPrice}</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#f2f6f4] border border-[#064734]/15 my-2">
                    <span className="text-[11px] font-bold text-gray-500 block">
                      Спеццена при 100% расчете:
                    </span>
                    <div className="text-2xl font-black text-[#064734] my-0.5">
                      {item.cashPrice}
                    </div>
                    <span className="text-xs font-black text-emerald-700 block">
                      ✓ {item.saving} ({item.savingKgs})
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-600 leading-relaxed italic pt-1">
                    💡 {item.benefit}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 space-y-2">
                <a
                  href={`https://wa.me/996709115115?text=${encodeURIComponent(item.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-xl bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white font-black text-xs uppercase tracking-wider transition-all shadow"
                >
                  Зафиксировать скидку в WhatsApp →
                </a>
                <Link
                  href={`/${item.slug}`}
                  className="block w-full text-center py-1.5 text-[11px] font-bold text-gray-500 hover:text-[#064734] transition-colors"
                >
                  Смотреть комплекс {item.complex}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 2. ПРИВИЛЕГИИ 100% ПОКУПАТЕЛЯ */}
      <div className="my-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            Премиальный сервис
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            Привилегии покупателей при 100% оплате
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PRIVILEGES.map((priv, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-2xl shrink-0">
                {priv.icon}
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 mb-1.5">
                  {priv.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {priv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 3. ИНВЕСТИЦИОННЫЙ ПОТЕНЦИАЛ (ИНВЕСТОРАМ) */}
      <div className="my-16 bg-[#032b20] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-2">
            Инвестиции в недвижимость Бишкека
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4 leading-tight">
            Прирост капитала от 25% до 35% к моменту сдачи объекта
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6 font-light">
            Покупка квартиры на начальных стадиях строительства за 100% оплату — самый высокодоходный и безопасный инвестиционный инструмент в Кыргызстане. Рост стоимости квадратного метра гарантирован этапами строительной готовности монолита.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
              <span className="text-xl font-black text-[#d4b26f] block mb-0.5">+25–35%</span>
              <span className="text-gray-300 text-[11px]">Капитализация за период стройки</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
              <span className="text-xl font-black text-white block mb-0.5">8–11%</span>
              <span className="text-gray-300 text-[11px]">Годовая доходность при аренде</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
              <span className="text-xl font-black text-[#d4b26f] block mb-0.5">Цессия</span>
              <span className="text-gray-300 text-[11px]">Легкая перепродажа до сдачи дома</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 4. ПОШАГОВЫЙ ПРОЦЕСС ОФОРМЛЕНИЯ */}
      <div className="my-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            Быстро и юридически чисто
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            4 шага к получению квартиры
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black text-[#d4b26f] block mb-3">
                  {s.num}
                </span>
                <h4 className="text-sm font-black text-gray-950 mb-2">
                  {s.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PaymentLayout>
  );
}