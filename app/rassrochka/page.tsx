import type { Metadata } from 'next';
import Link from 'next/link';
import PaymentLayout from '@/components/PaymentLayout';

export const metadata: Metadata = {
  title: 'Квартиры в рассрочку 0% до 40 месяцев в Бишкеке без банка | EL ORDO GROUP',
  description:
    'Беспроцентная внутренняя рассрочка от застройщика EL ORDO GROUP на квартиры в Бишкеке. Первоначальный взнос от 20–30%, срок выплат до 40 месяцев, оформление только по паспорту без справок о доходах.',
  openGraph: {
    title: 'Рассрочка 0% на квартиры в Бишкеке до 40 месяцев | EL ORDO GROUP',
    description:
      'Покупка квартир напрямую от застройщика без участия банков, скрытых комиссий и процентов. ЖК Abu Dhabi, Madina Residence, Айкол+.',
    images: [
      {
        url: '/projects/Abu-Dhabi.png',
        width: 1200,
        height: 630,
        alt: 'Квартиры в рассрочку в Бишкеке от EL ORDO GROUP',
      },
    ],
  },
};

// Примеры расчетов по реальным объектам
const CALCULATION_EXAMPLES = [
  {
    complex: 'ЖК Abu Dhabi',
    type: '1-комнатная квартира',
    area: '49.48 м²',
    priceM2: 'от 1 650 $',
    totalPrice: '$81 642',
    downPayment: '$24 492 (30%)',
    downPaymentKgs: '≈ 2 143 000 сом',
    monthly: '$1 587',
    monthlyKgs: '≈ 138 800 сом',
    term: '36 месяцев',
    slug: 'abu-dhabi',
    waText: 'Здравствуйте! Интересует расчет рассрочки на 1-комн. (49.48 м²) в ЖК Abu Dhabi с платежом $1587/мес. Есть ли свободные этажи?',
  },
  {
    complex: 'ЖК Madina Residence',
    type: '1-комнатная квартира',
    area: '43.59 м²',
    priceM2: 'от 1 400 $',
    totalPrice: '$61 026',
    downPayment: '$18 307 (30%)',
    downPaymentKgs: '≈ 1 601 000 сом',
    monthly: '$1 186',
    monthlyKgs: '≈ 103 700 сом',
    term: '36 месяцев',
    slug: 'madina-residence',
    badge: 'Хит продаж',
    waText: 'Здравствуйте! Интересует расчет рассрочки на 1-комн. (43.59 м²) в ЖК Madina Residence с платежом $1186/мес. Отправьте планировку.',
  },
  {
    complex: 'ЖД Айкол +',
    type: '1-комнатная квартира',
    area: '42.00 м²',
    priceM2: 'от 1 100 $',
    totalPrice: '$46 200',
    downPayment: '$13 860 (30%)',
    downPaymentKgs: '≈ 1 212 000 сом',
    monthly: '$898',
    monthlyKgs: '≈ 78 500 сом',
    term: '36 месяцев',
    slug: 'ajkol-plus',
    badge: 'Эко-предгорье',
    waText: 'Здравствуйте! Интересует расчет рассрочки на 1-комн. в ЖД Айкол+ (Кок-Жар) с платежом $898/мес. Подскажите наличие.',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Выбор планировки и этажа',
    desc: 'Выбираете квартиру в каталоге или приезжаете в офис продаж для просмотра детальных архитектурных 3D-макетов.',
  },
  {
    step: '02',
    title: 'Согласование графика 0%',
    desc: 'Определяем комфортный размер первоначального взноса (от 20–30%) и график выплат: ежемесячно или поквартально.',
  },
  {
    step: '03',
    title: 'Подписание ДДУ по паспорту',
    desc: 'Заключаем официальный Договор долевого участия за 40 минут. Без подтверждения доходов, поручителей и банков.',
  },
  {
    step: '04',
    title: 'Госрегистрация и получение ключей',
    desc: 'Договор регистрируется в госорганах КР. После сдачи дома вы получаете ключи и техпаспорт на ваше имя.',
  },
];

export default function InstallmentPage() {
  return (
    <PaymentLayout
      pageTitle="Рассрочка 0%"
      currentSlug="rassrochka"
      heroTitle="КВАРТИРЫ В РАССРОЧКУ 0% БЕЗ УЧАСТИЯ БАНКА"
      heroSubtitle="Комфортный вход в сделку напрямую от застройщика EL ORDO GROUP. Индивидуальный график платежей на срок до 40 месяцев без процентов, скрытых комиссий и справок о доходах."
      noticeText="Внутренняя рассрочка от застройщика позволяет приобрести квартиру без банковских переплат и кредитных проверок. Вы выплачиваете только фактическую стоимость недвижимости равными долями в процессе строительства."
      blockTitle="ДЕТАЛИ И ПРЕИМУЩЕСТВА РАССРОЧКИ"
      descriptionText="Первоначальный взнос составляет от 20% до 30% от общей стоимости квартиры. Остаток распределяется равными долями на срок до 40 месяцев. График выплат согласовывается индивидуально: ежемесячно, поквартально (раз в 3 месяца) или с учетом сезонных поступлений вашего бизнеса. Переплата составляет 0%."
      documentsText="Для заключения Договора долевого участия (ДДУ) требуется исключительно паспорт гражданина (ID-карта или загранпаспорт). Справки с места работы о подтверждении доходов и поручители не требуются."
      faqList={[
        {
          q: 'Фиксируется ли стоимость квадратного метра в договоре?',
          a: 'Да. Стоимость квадратного метра фиксируется в официальном Договоре долевого участия (ДДУ) в момент подписания и остается неизменной на протяжении всего срока выплат, независимо от рыночных колебаний цен.',
        },
        {
          q: 'Нужен ли залог или поручители?',
          a: 'Нет, поручители и сторонние залоги не требуются. Обеспечением выполнения обязательств выступает сама строящаяся квартира до момента завершения всех взаиморасчетов.',
        },
        {
          q: 'Можно ли погасить рассрочку досрочно?',
          a: 'Да. Вы можете закрыть остаток задолженности в любой момент без каких-либо скрытых комиссий, штрафов или дополнительных переплат.',
        },
        {
          q: 'Можно ли использовать автомобиль как первоначальный взнос?',
          a: 'Да, в компании действует программа Trade-in. Мы проводим независимую экспертную оценку вашего автомобиля по рыночной стоимости за 24 часа и засчитываем эту сумму в счет первого взноса.',
        },
        {
          q: 'Как юридически защищен покупатель?',
          a: 'С каждым дольщиком заключается официальный ДДУ, подлежащий обязательной государственной регистрации в соответствии с законодательством Кыргызской Республики. Все объекты имеют утвержденные Красные книги и лицензии Госстроя КР.',
        },
        {
          q: 'Какой минимальный первоначальный взнос?',
          a: 'Минимальный первоначальный взнос начинается от 20% в зависимости от выбранного жилого комплекса и этапа строительства.',
        },
      ]}
    >
      {/* 🌟 1. БЛОК ГОТОВЫХ РАСЧЕТОВ ПО ОБЪЕКТАМ */}
      <div className="mt-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            Наглядные расчеты
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            Примеры платежей по квартирам
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Реальные расчеты для 1-комнатных квартир при первоначальном взносе 30% на 36 месяцев
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CALCULATION_EXAMPLES.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl hover:border-[#064734]/30 transition-all flex flex-col justify-between relative group"
            >
              {item.badge && (
                <div className="absolute -top-3 right-6 bg-[#d4b26f] text-[#064734] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                  {item.badge}
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-gray-400 block mb-1">
                  {item.type}
                </span>
                <h4 className="text-xl font-black text-gray-950 mb-1">
                  {item.complex}
                </h4>
                <div className="text-xs font-semibold text-[#064734] mb-5">
                  Площадь: {item.area} • {item.priceM2}
                </div>

                <div className="space-y-3 border-t border-gray-100 pt-4 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-500">Общая стоимость:</span>
                    <strong className="text-sm font-black text-gray-900">{item.totalPrice}</strong>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-500">Первый взнос:</span>
                    <div className="text-right">
                      <strong className="font-bold text-gray-900 block">{item.downPayment}</strong>
                      <span className="text-[10px] text-gray-400">{item.downPaymentKgs}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#f2f6f4] border border-[#064734]/15 mt-3">
                    <span className="text-[11px] font-bold text-gray-500 block">
                      Платеж в месяц (0% переплат):
                    </span>
                    <div className="text-2xl font-black text-[#064734] my-0.5">
                      {item.monthly} <span className="text-xs font-semibold text-gray-500">/ мес.</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#064734]/80 block">
                      {item.monthlyKgs}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 space-y-2">
                <a
                  href={`https://wa.me/996709115115?text=${encodeURIComponent(item.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-xl bg-[#064734] hover:bg-[#032b20] active:scale-95 text-white font-black text-xs uppercase tracking-wider transition-all shadow"
                >
                  Забронировать расчет в WhatsApp →
                </a>
                <Link
                  href={`/${item.slug}`}
                  className="block w-full text-center py-2 text-[11px] font-bold text-gray-500 hover:text-[#064734] transition-colors"
                >
                  О комплексе {item.complex}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 2. СРАВНИТЕЛЬНАЯ ТАБЛИЦА: EL ORDO vs БАНКОВСКАЯ ИПОТЕКА */}
      <div className="my-16 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            Финансовая выгода
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            Рассрочка EL ORDO или Ипотека в банке?
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Сравнение условий приобретения жилья напрямую от застройщика и через коммерческий банк
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 px-3 text-gray-400 font-bold uppercase text-[11px]">Критерий</th>
                <th className="py-4 px-3 text-[#064734] font-black uppercase text-xs sm:text-sm bg-emerald-50/70 rounded-t-xl">
                  Рассрочка EL ORDO
                </th>
                <th className="py-4 px-3 text-gray-600 font-bold uppercase text-xs">
                  Ипотека в банке
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900">Процентная переплата</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 bg-emerald-50/40">
                  0% (Переплаты нет)
                </td>
                <td className="py-3.5 px-3 text-rose-600 font-bold">
                  от 14% до 18% годовых
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900">Сумма переплаты за 3 года</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 bg-emerald-50/40">
                  $0 сом
                </td>
                <td className="py-3.5 px-3 text-rose-600 font-bold">
                  от $18 000 до $35 000+
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900">Справка о доходах / Налоги</td>
                <td className="py-3.5 px-3 font-semibold text-gray-900 bg-emerald-50/40">
                  Не требуется
                </td>
                <td className="py-3.5 px-3 text-gray-500">
                  Обязательно с официального места
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900">Дополнительные страховки</td>
                <td className="py-3.5 px-3 font-semibold text-gray-900 bg-emerald-50/40">
                  Отсутствуют
                </td>
                <td className="py-3.5 px-3 text-gray-500">
                  Страхование жизни и объекта каждый год
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900">Пакет документов</td>
                <td className="py-3.5 px-3 font-semibold text-gray-900 bg-emerald-50/40">
                  Только паспорт
                </td>
                <td className="py-3.5 px-3 text-gray-500">
                  Пакет из 8+ справок, поручители
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-gray-900">Срок оформления</td>
                <td className="py-3.5 px-3 font-black text-emerald-700 bg-emerald-50/40 rounded-b-xl">
                  В день обращения (40 минут)
                </td>
                <td className="py-3.5 px-3 text-gray-500">
                  от 2 до 4 недель рассмотрения
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 🌟 3. ПОШАГОВЫЙ ПРОЦЕСС ПОКУПКИ */}
      <div className="my-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d4b26f] block mb-1">
            Прозрачная сделка
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#064734]">
            4 простых шага к вашей квартире
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
                  {s.step}
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