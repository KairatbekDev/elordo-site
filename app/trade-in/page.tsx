import type { Metadata } from 'next';
import Link from 'next/link';
import PaymentLayout from '@/components/PaymentLayout';

export const metadata: Metadata = {
  title: 'Trade-in (Бартер) квартир в Бишкеке — Обмен авто и жилья на новостройку | EL ORDO GROUP',
  description:
    'Выгодная программа Trade-in от строительной компании EL ORDO GROUP в Бишкеке. Обменяйте ваш автомобиль или вторичную недвижимость в счет первоначального взноса за новую квартиру. Экспресс-оценка за 24 часа по рыночной стоимости.',
  openGraph: {
    title: 'Trade-in и Бартер на квартиры в Бишкеке | EL ORDO GROUP',
    description:
      'Быстрый обмен ликвидного автомобиля или старой квартиры на квартиру в ЖК Abu Dhabi, Madina Residence и Айкол+. Без посредников и авторынков.',
    images: [
      {
        url: '/projects/Abu-Dhabi.png',
        width: 1200,
        height: 630,
        alt: 'Trade-in недвижимости и авто в Бишкеке от EL ORDO GROUP',
      },
    ],
  },
};

// Реальные примеры зачета активов
const TRADE_IN_CASES = [
  {
    asset: 'Toyota Camry 70 (2020 г.)',
    assetCategory: 'Легковой автомобиль',
    valuation: '$24 000',
    valuationKgs: '≈ 2 100 000 сом',
    targetComplex: 'ЖК Madina Residence',
    targetApartment: '1-комнатная квартира (43.59 м²)',
    result: 'Первый взнос 30% закрыт полностью ($18 300)',
    surplus: 'Остаток $5 700 пошел в счет ежемесячных платежей',
    badge: 'Популярный обмен',
    slug: 'madina-residence',
    waText: 'Здравствуйте! Хочу обменять легковой автомобиль (Toyota Camry / аналогичный) по программе Trade-in на квартиру в ЖК Madina Residence. Как пройти осмотр?',
  },
  {
    asset: 'Lexus GX 460 (2016 г.)',
    assetCategory: 'Премиум-внедорожник',
    valuation: '$38 000',
    valuationKgs: '≈ 3 325 000 сом',
    targetComplex: 'ЖК Abu Dhabi',
    targetApartment: '2-комнатная квартира (78.30 м²)',
    result: 'Первоначальный взнос 30% оплачен полностью',
    surplus: 'Ежемесячный платеж снижен до $1 250/мес. на 36 месяцев',
    badge: 'Премиум Trade-in',
    slug: 'abu-dhabi',
    waText: 'Здравствуйте! Интересует обмен внедорожника (Lexus / Toyota Prado) на 2-комнатную квартиру в ЖК Abu Dhabi по Trade-in. Подскажите условия оценки.',
  },
  {
    asset: '1-комн. квартира 105 серии',
    assetCategory: 'Вторичная недвижимость (Бишкек)',
    valuation: '$46 000',
    valuationKgs: '≈ 4 025 000 сом',
    targetComplex: 'ЖД Айкол + (Кок-Жар)',
    targetApartment: 'Просторная 2-комн. (74.3 м² в предгорье)',
    result: 'Покрыто более 55% от стоимости новой квартиры',
    surplus: 'Минимальный остаток в рассрочку 0% на комфортный срок',
    badge: 'Обмен жилья',
    slug: 'ajkol-plus',
    waText: 'Здравствуйте! Хочу обменять вторичную 1-комнатную квартиру на новую в ЖД Айкол+ (Кок-Жар) по Trade-in. Подскажите процедуру выезда оценщика.',
  },
];

const ACCEPTED_CATEGORIES = [
  {
    icon: '🚗',
    title: 'Автомобили и внедорожники',
    desc: 'Ликвидные иномарки (Toyota, Lexus, Hyundai, Kia, BMW, Mercedes и др.) в исправном техническом состоянии с чистой юридической историей.',
    reqs: 'Техпаспорт ТС, паспорт владельца, отсутствие арестов и штрафов.',
  },
  {
    icon: '🏢',
    title: 'Вторичные квартиры в Бишкеке',
    desc: '1-, 2-, 3-комнатные квартиры 104, 105, 106 серий, индивидуальных планировок, а также сданные новостройки в черте города.',
    reqs: 'Правоустанавливающие документы, техпаспорт БТИ, справка об отсутствии обременений.',
  },
  {
    icon: '📐',
    title: 'Земельные участки и коммерция',
    desc: 'Ликвидные земельные участки под ИЖС в черте Бишкека и южном предгорье, а также помещения свободного назначения.',
    reqs: 'Красная книга (госакт), правоустанавливающие документы, согласованный АПУ.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Подача онлайн-заявки',
    desc: 'Отправляете базовые данные (марку, год, пробег или адрес и фото жилья) нам в WhatsApp для предварительного согласования диапазона цены.',
  },
  {
    num: '02',
    title: 'Осмотр и фиксация цены',
    desc: 'Эксперт-оценщик компании осматривает объект и в течение 24 часов озвучивает справедливую рыночную стоимость без скрытых дисконтов.',
  },
  {
    num: '03',
    title: 'Выбор новой квартиры',
    desc: 'Бронируете понравившуюся планировку и видовой этаж в любом жилом комплексе EL ORDO GROUP с фиксацией цены квадратного метра.',
  },
  {
    num: '04',
    title: 'Подписание ДДУ и взаимозачет',
    desc: 'Стоимость вашего авто или жилья официально засчитывается в качестве первого взноса. Юристы компании берут все переоформление на себя.',
  },
];

export default function TradeInPage() {
  return (
    <PaymentLayout
      pageTitle="Trade-in (Бартер)"
      currentSlug="trade-in"
      heroTitle="ОБМЕН АВТОМОБИЛЯ ИЛИ ВТОРИЧНОГО ЖИЛЬЯ НА НОВОСТРОЙКУ"
      heroSubtitle="Используйте ваше текущее авто или вторичную недвижимость как первоначальный взнос за квартиру в современных жилых комплексах EL ORDO GROUP. Честная рыночная оценка за 24 часа без очередей и авторынков."
      noticeText="Программа Trade-in избавляет вас от необходимости неделями стоять на авторынке или искать покупателя на старое жилье через риелторов с комиссиями. Мы оцениваем ваш актив по объективной рыночной стоимости и сразу засчитываем эту сумму в счет покупки новой квартиры."
      blockTitle="КАК РАБОТАЕТ ПРОГРАММА TRADE-IN"
      descriptionText="Вы выбираете квартиру в любом из наших проектов (ЖК Abu Dhabi, Madina Residence, ЖД Айкол+ или Айкол). Наш эксперт проводит оценку вашего автомобиля или вторичной недвижимости по честной рыночной цене за 24 часа. Согласованная сумма в полном объеме засчитывается в качестве первоначального взноса или частичной оплаты, а на остаток оформляется беспроцентная рассрочка 0% до 40 месяцев."
      documentsText="Для автомобиля: Свидетельство о регистрации ТС (техпаспорт) и паспорт владельца. Для недвижимости: Правоустанавливающие документы (договор купли-продажи/дарения), техпаспорт БТИ и справка об отсутствии арестов."
      faqList={[
        {
          q: 'Как определяется стоимость автомобиля при оценке?',
          a: 'Оценка строится на реальном анализе рынка (Mashina.kg, актуальные сделки авторынка Бишкека) с учетом года выпуска, комплектации, пробега и технического состояния. Мы не занижаем цену искусственно, обеспечивая честный паритет.',
        },
        {
          q: 'Что если оценка авто превышает требуемый первоначальный взнос?',
          a: 'Вся сумма сверх первого взноса направляется на погашение стоимости квартиры, пропорционально уменьшая ежемесячные платежи по рассрочке либо сокращая общий срок выплат.',
        },
        {
          q: 'Что делать, если стоимости авто недостаточно для 30% взноса?',
          a: 'Недостающую разницу вы можете доплатить наличными, безналичным переводом либо согласовать индивидуальный график внесения недостающей части первого взноса.',
        },
        {
          q: 'Кто берет на себя переоформление автомобиля в ГУ «Унаа»?',
          a: 'Юридический отдел EL ORDO GROUP полностью берет на себя подготовку документов и сопровождение перерегистрации. Процедура проходит быстро и прозрачно в строгом соответствии с законами КР.',
        },
        {
          q: 'Принимаются ли квартиры советской постройки (104, 105, 106 серии)?',
          a: 'Да. Мы принимаем ликвидные квартиры вторичного фонда в Бишкеке при наличии полного комплекта правоустанавливающих документов и отсутствии судебных арестов или залогов.',
        },
        {
          q: 'Можно ли сдать сразу два автомобиля в зачет одной квартиры?',
          a: 'Да, программа Trade-in позволяет комбинировать активы: например, сдать два автомобиля либо автомобиль плюс доплату наличными.',
        },
        {
          q: 'Фиксируется ли цена строящейся квартиры на момент оценки?',
          a: 'Да. В момент согласования оценки выбранная вами квартира бронируется, а цена квадратного метра фиксируется в официальном Договоре долевого участия (ДДУ).',
        },
      ]}
    >
      {/* 🌟 1. КЕЙСЫ РЕАЛЬНОГО ОБМЕНА */}
      <div className="mt-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            Практические примеры
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            Реальные сценарии зачета Trade-in
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Как наши резиденты улучшают жилищные условия без свободных наличных средств
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRADE_IN_CASES.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl hover:border-[#064734]/30 transition-all flex flex-col justify-between relative group"
            >
              <div className="absolute -top-3 right-6 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                {item.badge}
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 block mb-1">
                  {item.assetCategory}
                </span>
                <h4 className="text-lg font-black text-gray-950 mb-1 leading-snug">
                  {item.asset}
                </h4>

                <div className="p-3 rounded-2xl bg-[#f2f6f4] border border-[#064734]/15 my-4">
                  <span className="text-[11px] text-gray-500 font-semibold block">
                    Оценка эксперта EL ORDO:
                  </span>
                  <div className="text-2xl font-black text-[#064734] my-0.5">
                    {item.valuation}
                  </div>
                  <span className="text-[11px] font-bold text-[#064734]/80 block">
                    {item.valuationKgs}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs border-t border-gray-100 pt-3">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Выбранный объект:</span>
                    <strong className="text-gray-900 font-extrabold text-sm block">
                      {item.targetComplex}
                    </strong>
                    <span className="text-gray-600 text-[11px]">{item.targetApartment}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-semibold text-[11px] leading-relaxed">
                    ✓ {item.result}
                  </div>

                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    💡 {item.surplus}
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
                  Оценить похожее авто в WhatsApp →
                </a>
                <Link
                  href={`/${item.slug}`}
                  className="block w-full text-center py-1.5 text-[11px] font-bold text-gray-500 hover:text-[#064734] transition-colors"
                >
                  О комплексе {item.targetComplex}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 2. СРАВНЕНИЕ: TRADE-IN EL ORDO vs САМОСТОЯТЕЛЬНАЯ ПРОДАЖА */}
      <div className="my-16 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            Экономия времени и денег
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            Trade-in EL ORDO или продажа на авторынке?
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Почему обмен напрямую девелоперу выгоднее самостоятельной реализации
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 px-3 text-gray-400 font-bold uppercase text-[11px]">Критерий сделки</th>
                <th className="py-4 px-3 text-[#064734] font-black uppercase text-xs sm:text-sm bg-emerald-50/70 rounded-t-xl">
                  Trade-in в EL ORDO
                </th>
                <th className="py-4 px-3 text-gray-600 font-bold uppercase text-xs">
                  Самостоятельная продажа
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900">Срок закрытия сделки</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 bg-emerald-50/40">
                  Всего 24 часа
                </td>
                <td className="py-3.5 px-3 text-gray-600">
                  от 1 до 4 месяцев
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900">Бронь квартиры и фиксация цены</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 bg-emerald-50/40">
                  Квартира бронируется сразу
                </td>
                <td className="py-3.5 px-3 text-rose-600 font-medium">
                  Квартира может подорожать или продаться
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900">Торг и сбивание стоимости</td>
                <td className="py-3.5 px-3 font-semibold text-gray-900 bg-emerald-50/40">
                  Честная объективная рыночная цена
                </td>
                <td className="py-3.5 px-3 text-gray-500">
                  Постоянный прессинг перекупщиков
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900">Комиссии и расходы на рекламу</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 bg-emerald-50/40">
                  0 сом (Все расходы берет застройщик)
                </td>
                <td className="py-3.5 px-3 text-gray-500">
                  Оплата объявлений, мойки, авторынка, риелторов
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900">Юридическое оформление</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 bg-emerald-50/40 rounded-b-xl">
                  Штатные юристы компании
                </td>
                <td className="py-3.5 px-3 text-gray-500">
                  Очереди в ГУ «Унаа», риски с расчетами
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 🌟 3. ЧТО МЫ ПРИНИМАЕМ В ЗАЧЕТ */}
      <div className="my-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            Критерии активов
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            Какое имущество участвует в программе
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACCEPTED_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#064734]/10 text-[#064734] flex items-center justify-center text-3xl mb-5">
                  {cat.icon}
                </div>
                <h4 className="text-lg font-black text-gray-900 mb-2">
                  {cat.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  {cat.desc}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-500">
                <strong className="text-gray-900 block mb-0.5">Требования:</strong>
                {cat.reqs}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 4. ПОШАГОВЫЙ РЕГЛАМЕНТ СДЕЛКИ */}
      <div className="my-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            Процедура за 24 часа
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            Этапы оформления по Trade-in
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