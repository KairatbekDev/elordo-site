'use client';

import { useState } from 'react';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import {
  IconCheck,
  IconWhatsApp,
  IconShieldCheck,
  IconPhone,
} from '@/components/Icons';

interface FormTexts {
  badge: string;
  title: string;
  desc: string;
  goalLabel: string;
  nameLabel: string;
  namePh: string;
  phoneLabel: string;
  projectLabel: string;
  btnCall: string;
  btnSubmitting: string;
  btnWhatsApp: string;
  guarantee1: string;
  guarantee2: string;
  guarantee3: string;
  privacy: string;
  phoneError: string;
  serverError: string;
  successTitle: string;
  successDesc: (name: string, phone: string) => string;
  successProjectLabel: string;
  successGoalLabel: string;
  successAgain: string;
  defaultClient: string;
  goals: string[];
  projects: string[];
  waTemplate: (name: string, proj: string, goal: string, phone: string) => string;
}

const UI_DATA: Record<Locale, FormTexts> = {
  ru: {
    badge: 'Персональный подбор квартиры',
    title: 'Получить шахматку и расчет рассрочки',
    desc: 'Оставьте номер телефона — менеджер отдела продаж свяжется с вами за 5 минут, пришлет доступные планировки и рассчитает график выплат 0%.',
    goalLabel: 'Что вас больше всего интересует?',
    nameLabel: 'Ваше имя:',
    namePh: 'Например: Азамат',
    phoneLabel: 'Номер телефона:',
    projectLabel: 'Жилой комплекс:',
    btnCall: 'Заказать звонок (за 5 мин)',
    btnSubmitting: 'Отправка заявки...',
    btnWhatsApp: 'Написать в WhatsApp',
    guarantee1: 'Прямой расчет без скрытых переплат',
    guarantee2: 'Консультация бесплатна',
    guarantee3: 'Ответ за 5 минут',
    privacy: 'Ваши данные надежно защищены и используются исключительно для связи менеджера с вами',
    phoneError: 'Пожалуйста, введите корректный номер телефона (от 9 до 15 цифр)',
    serverError: 'Не удалось отправить заявку. Пожалуйста, напишите нам в WhatsApp.',
    successTitle: 'Заявка успешно принята!',
    successDesc: (name, phone) => `Спасибо, ${name}! Менеджер отдела продаж свяжется с вами по номеру ${phone} в течение 5–10 минут.`,
    successProjectLabel: 'Выбранный объект:',
    successGoalLabel: 'Тема запроса:',
    successAgain: 'Отправить ещё одну заявку',
    defaultClient: 'Уважаемый клиент',
    goals: [
      'Рассрочка 0%',
      'Trade-in (Обмен авто)',
      'Подбор 1-комн.',
      'Подбор 2-комн.',
      'Шахматка цен',
      'Визит в офис',
    ],
    projects: [
      'Все объекты / Нужна консультация',
      'ЖК Abu Dhabi (ул. Сухомлинова, 29)',
      'ЖК Madina Residence (ул. Огонбаева, 12)',
      'ЖД Айкол + (с. Кок-Жар, ул. Баялинова, 6)',
      'ЖД Айкол (ул. Арашан, 10)',
      'ЖК Келечек (ул. Космическая, 153)',
      'КД Ордо (ул. Тверская, 20)',
    ],
    waTemplate: (name, proj, goal, phone) =>
      `Здравствуйте! Меня зовут ${name}.\nЗаявка на консультацию с сайта EL ORDO GROUP:\n\n• Объект: ${proj}\n• Цель обращения: ${goal}\n• Телефон для связи: ${phone}\n\nОтправьте, пожалуйста, актуальную шахматку, планировки и график платежей.`,
  },
  kg: {
    badge: 'Батирлерди жекече тандоо',
    title: 'Шахматка жана 0% эсебин алуу',
    desc: 'Табыштама калтырыңыз — сатуу бөлүмү 5 мүнөттө байланышып, бош кабаттарды жана жеке төлөм графигин сунуштайт.',
    goalLabel: 'Сизди эмне көбүрөөк кызыктырат?',
    nameLabel: 'Атыңыз:',
    namePh: 'Мисалы: Азамат',
    phoneLabel: 'Телефон номериңиз:',
    projectLabel: 'Турак жай комплекси:',
    btnCall: 'Чалууга буйрутма берүү (5 мүн.)',
    btnSubmitting: 'Жөнөтүлүүдө...',
    btnWhatsApp: 'WhatsApp аркылуу жазуу',
    guarantee1: 'Үстөк пайызы жок түз эсептөө',
    guarantee2: 'Кеңеш берүү акысыз',
    guarantee3: '5 мүнөттө жооп беребиз',
    privacy: 'Сиздин маалыматтарыңыз корголгон жана байланыш үчүн гана колдонулат',
    phoneError: 'Сураныч, туура телефон номериңизди жазыңыз (9дан 15 цифрага чейин)',
    serverError: 'Табыштама жөнөтүлбөй калды. WhatsApp аркылуу жазыңыз.',
    successTitle: 'Табыштамаңыз кабыл алынды!',
    successDesc: (name, phone) => `Ыракмат, ${name}! Сатуу бөлүмүнүн менеджери ${phone} номери боюнча 5–10 мүнөттүн ичинде байланышат.`,
    successProjectLabel: 'Кызыктырган объект:',
    successGoalLabel: 'Суроо-талап:',
    successAgain: 'Башка табыштама жөнөтүү',
    defaultClient: 'Урматтуу кардар',
    goals: [
      '0% бөлүп төлөө',
      'Trade-in (Унаа алмашуу)',
      '1 бөлмөлүү тандоо',
      '2 бөлмөлүү тандоо',
      'Баалар шахматкасы',
      'Офиске келүү',
    ],
    projects: [
      'Бардык объекттер / Кеңеш керек',
      'ЖК Abu Dhabi (Сухомлинов көч., 29)',
      'ЖК Madina Residence (Огонбаев көч., 12)',
      'ЖД Айкол + (Көк-Жар а., Баялинов көч., 6)',
      'ЖД Айкол (Арашан көч., 10)',
      'ЖК Келечек (Космическая көч., 153)',
      'КД Ордо (Тверская көч., 20)',
    ],
    waTemplate: (name, proj, goal, phone) =>
      `Саламатсызбы! Менин атым ${name}.\nEL ORDO GROUP сайтынан табыштама:\n\n• Объект: ${proj}\n• Максаты: ${goal}\n• Байланыш номери: ${phone}\n\nСураныч, актуалдуу шахматканы жана бөлүп төлөө графигин жөнөтүңүзчү.`,
  },
  kz: {
    badge: 'Пәтерлерді дербес таңдау',
    title: 'Шахматка мен 0% есебін алу',
    desc: 'Өтінім қалдырыңыз — сату бөлімі 5 минутта хабарласып, қолжетімді қабаттар мен төлем кестесін ұсынады.',
    goalLabel: 'Сізді не көбірек қызықтырады?',
    nameLabel: 'Атыңыз:',
    namePh: 'Мысалы: Азамат',
    phoneLabel: 'Телефон нөміріңіз:',
    projectLabel: 'Тұрғын үй кешені:',
    btnCall: 'Қоңырауға тапсырыс беру (5 мин)',
    btnSubmitting: 'Жөнелтілуде...',
    btnWhatsApp: 'WhatsApp-та жазу',
    guarantee1: 'Артық төлемсіз тікелей есептеу',
    guarantee2: 'Кеңес алу тегін',
    guarantee3: '5 минут ішінде жауап',
    privacy: 'Деректеріңіз қауіпсіз қорғалған және тек байланыс орнату үшін пайдаланылады',
    phoneError: 'Толық әрі дұрыс телефон нөміріңізді енгізіңіз (9–15 сан)',
    serverError: 'Өтінімді жөнелту мүмкін болмады. WhatsApp арқылы жазыңыз.',
    successTitle: 'Өтініміңіз сәтті қабылданды!',
    successDesc: (name, phone) => `Рақмет, ${name}! Сату бөлімінің менеджері ${phone} нөмірі бойынша 5–10 минутта хабарласады.`,
    successProjectLabel: 'Таңдалған нысан:',
    successGoalLabel: 'Сұраныс мақсаты:',
    successAgain: 'Тағы бір өтінім жіберу',
    defaultClient: 'Құрметті клиент',
    goals: [
      '0% бөліп төлеу',
      'Trade-in (Көлік айырбасы)',
      '1 бөлмелі таңдау',
      '2 бөлмелі таңдау',
      'Бағалар шахматкасы',
      'Кеңсеге келу',
    ],
    projects: [
      'Барлық нысандар / Кеңес қажет',
      'ЖК Abu Dhabi (Сухомлинов к-сі, 29)',
      'ЖК Madina Residence (Огонбаев к-сі, 12)',
      'ЖД Айкол + (Көк-Жар а., Баялинов к-сі, 6)',
      'ЖД Айкол (Арашан к-сі, 10)',
      'ЖК Келечек (Космическая к-сі, 153)',
      'КД Ордо (Тверская к-сі, 20)',
    ],
    waTemplate: (name, proj, goal, phone) =>
      `Сәлеметсіз бе! Менің атым ${name}.\nEL ORDO GROUP сайтынан өтінім:\n\n• Нысан: ${proj}\n• Мақсаты: ${goal}\n• Байланыс телефоны: ${phone}\n\nҚолжетімді шахматка мен бөліп төлеу кестесін жіберуіңізді сұраймын.`,
  },
  uk: {
    badge: 'Персональний підбір квартири',
    title: 'Отримати шахматку та розрахунок розстрочки',
    desc: 'Залиште номер телефону — менеджер зв’яжеться з вами за 5 хвилин, надішле планування та розрахує виплати 0%.',
    goalLabel: 'Що вас найбільше цікавить?',
    nameLabel: 'Ваше ім’я:',
    namePh: 'Наприклад: Олександр',
    phoneLabel: 'Номер телефону:',
    projectLabel: 'Житловий комплекс:',
    btnCall: 'Замовити дзвінок (за 5 хв)',
    btnSubmitting: 'Відправлення...',
    btnWhatsApp: 'Написати у WhatsApp',
    guarantee1: 'Прямий розрахунок без переплат',
    guarantee2: 'Консультація безкоштовна',
    guarantee3: 'Відповідь за 5 хвилин',
    privacy: 'Ваші дані надійно захищені та використовуються виключно для зв’язку менеджера з вами',
    phoneError: 'Будь ласка, введіть коректний номер телефону (від 9 до 15 цифр)',
    serverError: 'Не вдалося надіслати заявку. Напишіть нам у WhatsApp.',
    successTitle: 'Заявку успішно прийнято!',
    successDesc: (name, phone) => `Дякуємо, ${name}! Менеджер зв’яжеться з вами за номером ${phone} протягом 5–10 хвилин.`,
    successProjectLabel: 'Обраний об’єкт:',
    successGoalLabel: 'Тема запиту:',
    successAgain: 'Надіслати ще одну заявку',
    defaultClient: 'Шановний клієнте',
    goals: [
      'Розстрочка 0%',
      'Trade-in (Обмін авто)',
      'Підбір 1-кімн.',
      'Підбір 2-кімн.',
      'Шахматка цін',
      'Візит до офісу',
    ],
    projects: [
      'Всі об’єкти / Потрібна консультація',
      'ЖК Abu Dhabi (вул. Сухомлинова, 29)',
      'ЖК Madina Residence (вул. Огонбаєва, 12)',
      'ЖД Айкол + (с. Кок-Жар, вул. Баялінова, 6)',
      'ЖД Айкол (вул. Арашан, 10)',
      'ЖК Келечек (вул. Космічна, 153)',
      'КД Ордо (вул. Тверська, 20)',
    ],
    waTemplate: (name, proj, goal, phone) =>
      `Доброго дня! Мене звати ${name}.\nЗаявка з сайту EL ORDO GROUP:\n\n• Об’єкт: ${proj}\n• Мета: ${goal}\n• Телефон для зв’язку: ${phone}\n\nНадішліть, будь ласка, актуальну шахматку та графік платежів.`,
  },
  en: {
    badge: 'Bespoke Property Selection',
    title: 'Request Floor Plans & 0% Installment',
    desc: 'Leave your phone number — our sales specialist will call you within 5 minutes with floor availability and payment schedules.',
    goalLabel: 'What are you most interested in?',
    nameLabel: 'Your Name:',
    namePh: 'e.g. Alex',
    phoneLabel: 'Phone Number:',
    projectLabel: 'Residential Development:',
    btnCall: 'Request Callback (5 mins)',
    btnSubmitting: 'Sending...',
    btnWhatsApp: 'Inquire on WhatsApp',
    guarantee1: 'Direct developer terms without markups',
    guarantee2: 'Free advisory consultation',
    guarantee3: 'Response within 5 minutes',
    privacy: 'Your personal data is strictly protected and used exclusively to service your inquiry',
    phoneError: 'Please enter a valid phone number (9 to 15 digits)',
    serverError: 'Failed to send inquiry. Please reach out to us on WhatsApp.',
    successTitle: 'Inquiry Successfully Received!',
    successDesc: (name, phone) => `Thank you, ${name}! Our sales manager will contact you at ${phone} within 5–10 minutes.`,
    successProjectLabel: 'Selected Project:',
    successGoalLabel: 'Inquiry Topic:',
    successAgain: 'Submit Another Inquiry',
    defaultClient: 'Dear Guest',
    goals: [
      '0% Installment',
      'Trade-in (Auto Barter)',
      '1-Bedroom selection',
      '2-Bedroom selection',
      'Price & availability grid',
      'Office tour',
    ],
    projects: [
      'All Developments / Advisory',
      'Abu Dhabi Residence (29 Sukhomlinov St.)',
      'Madina Residence (12 Ogonbaev St.)',
      'Aikol+ Club House (6 Bayalinov St., Kok-Jar)',
      'Aikol House (10 Arashan St.)',
      'Kelechek Complex (153 Kosmicheskaya St.)',
      'Ordo Club House (20 Tverskaya St.)',
    ],
    waTemplate: (name, proj, goal, phone) =>
      `Hello! My name is ${name}.\nConsultation request from EL ORDO GROUP website:\n\n• Development: ${proj}\n• Topic: ${goal}\n• Phone: ${phone}\n\nPlease share floor availability, layouts, and installment options.`,
  },
  zh: {
    badge: '一对一专属置业管家',
    title: '索取最新在售销控与0%免息方案',
    desc: '留下您的联系电话 — 专属置业顾问将在5分钟内致电，发送在售房源表与分期测算方案。',
    goalLabel: '您当前最关注的置业需求：',
    nameLabel: '您的姓名：',
    namePh: '例如：李先生 / 王女士',
    phoneLabel: '联系电话：',
    projectLabel: '意向咨询楼盘：',
    btnCall: '预约5分钟快速回电',
    btnSubmitting: '正在提交中...',
    btnWhatsApp: '在 WhatsApp 中咨询',
    guarantee1: '开发商直签底价，无中介溢价',
    guarantee2: '置业咨询全程免费',
    guarantee3: '5分钟内快速响应',
    privacy: '您的隐私信息受到严格加密保护，仅用于置业顾问向您提供专属服务',
    phoneError: '请填写正确的联系电话（9至15位数字）',
    serverError: '提交失败，请直接通过 WhatsApp 与我们取得联系。',
    successTitle: '置业申请已成功受理！',
    successDesc: (name, phone) => `感谢您的垂询，${name}！专属置业经理将在5–10分钟内致电 ${phone} 为您服务。`,
    successProjectLabel: '目标楼盘：',
    successGoalLabel: '咨询主题：',
    successAgain: '提交新的置业需求',
    defaultClient: '尊贵客户',
    goals: [
      '0% 免息分期',
      '以旧换新置换（汽车置换）',
      '一居室户型推荐',
      '二居室户型推荐',
      '实时房源与销控底价',
      '预约到店实地品鉴',
    ],
    projects: [
      '全盘房源 / 综合置业咨询',
      'Abu Dhabi 尊享天幕大宅 (苏霍姆利诺夫街29号)',
      'Madina Residence 商务府邸 (奥贡巴耶夫街12号)',
      'Айкол + 低密洋房 (Kok-Jar区巴亚利诺夫街6号)',
      'Айкол 纯砖准现房 (阿拉尚街10号)',
      'Келечек 成熟社区 (太空街153号)',
      'Ордо 石材精工洋房 (特维尔斯卡亚街20号)',
    ],
    waTemplate: (name, proj, goal, phone) =>
      `您好！我是 ${name}。\n在 EL ORDO GROUP 官网上提交了置业咨询：\n\n• 目标楼盘：${proj}\n• 意向需求：${goal}\n• 联系电话：${phone}\n\n请向我发送最新的在售房源销控表及免息分期明细。`,
  },
};

export default function ConsultationForm() {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const ui = UI_DATA[currentLang] || UI_DATA.ru;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+996 ');
  // Индексный выбор для реактивной мультиязычности
  const [goalIndex, setGoalIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedGoal = ui.goals[goalIndex] || ui.goals[0];
  const selectedProject = ui.projects[projectIndex] || ui.projects[0];

  // Универсальное форматирование номера: маска для КР + поддержка международных номеров
  const formatPhoneInput = (input: string) => {
    const trimmed = input.trim();

    // Если пользователь вводит международный номер не с +996 (например, +7, +86, +1)
    if (trimmed.startsWith('+') && !trimmed.startsWith('+996')) {
      return '+' + input.slice(1).replace(/[^\d\s()-]/g, '').slice(0, 20);
    }

    let raw = input.replace(/\D/g, '');

    if (raw.startsWith('0')) {
      raw = '996' + raw.slice(1);
    } else if (!raw.startsWith('996') && raw.length > 0) {
      raw = '996' + raw;
    }
    raw = raw.slice(0, 12);

    if (raw.length === 0) return '+996 ';

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
    const formatted = formatPhoneInput(e.target.value);
    setPhone(formatted);
    if (error) setError('');
  };

  const validatePhone = () => {
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 9 || digitsOnly.length > 15) {
      setError(ui.phoneError);
      return false;
    }
    setError('');
    return true;
  };

  const handleDirectCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validatePhone()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || ui.defaultClient,
          phone,
          project: selectedProject,
          goal: selectedGoal,
          lang: currentLang,
          website: honeypot,
          source: 'ConsultationForm',
          createdAt: new Date().toISOString(),
        }),
      });

      const resData = await res.json().catch(() => null);

      if (!res.ok) {
        setError(resData?.error || ui.serverError);
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('Lead submission network error:', err);
      setError(ui.serverError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    if (!validatePhone()) return;

    const clientName = name.trim() ? name.trim() : ui.defaultClient;
    const message = ui.waTemplate(clientName, selectedProject, selectedGoal, phone);
    const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contacts" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden bg-[#064734] text-white">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4b26f_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl border border-white/15 p-6 sm:p-12 shadow-2xl">
        {isSuccess ? (
          <div className="text-center py-10 max-w-lg mx-auto animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#d4b26f]/20 text-[#d4b26f] flex items-center justify-center mx-auto mb-6 border border-[#d4b26f]/30 shadow-lg">
              <IconCheck className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-3">
              {ui.successTitle}
            </h3>

            <p className="text-sm text-white/90 leading-relaxed mb-6">
              {ui.successDesc(name.trim() || ui.defaultClient, phone)}
            </p>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-xs text-gray-300 mb-8 text-left space-y-1">
              <p>• {ui.successProjectLabel} <strong className="text-white">{selectedProject}</strong></p>
              <p>• {ui.successGoalLabel} <strong className="text-[#d4b26f]">{selectedGoal}</strong></p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setName('');
                setHoneypot('');
                setPhone('+996 ');
              }}
              className="text-xs uppercase font-bold text-[#d4b26f] hover:underline cursor-pointer"
            >
              {ui.successAgain}
            </button>
          </div>
        ) : (
          <>
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs uppercase font-black tracking-widest text-[#d4b26f] block mb-2">
                {ui.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-3">
                {ui.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                {ui.desc}
              </p>
            </div>

            <form onSubmit={handleDirectCallback} className="space-y-5 max-w-2xl mx-auto relative">
              
              {/* Скрытая ловушка для ботов (надежно скрыта от людей, но доступна для краулеров) */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                  pointerEvents: 'none',
                  overflow: 'hidden',
                }}
              >
                <label htmlFor="company_website_input">Leave blank</label>
                <input
                  id="company_website_input"
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Чипы выбора темы */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-gray-300 mb-2">
                  {ui.goalLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {ui.goals.map((tag, idx) => {
                    const isSelected = goalIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setGoalIndex(idx)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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

              {/* Поля Имя и Телефон */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    {ui.nameLabel}
                  </label>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder={ui.namePh}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 focus:border-[#d4b26f] focus:outline-none rounded-xl px-4 py-3.5 text-base sm:text-sm text-white placeholder-white/40 transition-colors shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    {ui.phoneLabel} <span className="text-[#d4b26f]">*</span>
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

              {/* Выбор объекта */}
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  {ui.projectLabel}
                </label>
                <div className="relative">
                  <select
                    value={projectIndex}
                    onChange={(e) => setProjectIndex(Number(e.target.value))}
                    className="w-full bg-[#0b3b2c] border border-white/20 focus:border-[#d4b26f] focus:outline-none rounded-xl px-4 py-3.5 text-base sm:text-sm text-white appearance-none cursor-pointer pr-10 shadow-inner"
                  >
                    {ui.projects.map((proj, idx) => (
                      <option key={idx} value={idx} className="bg-[#064734] text-white py-2">
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

              {/* Блок ошибок */}
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-center animate-fadeIn">
                  <p className="text-xs text-rose-200 font-bold">{error}</p>
                </div>
              )}

              {/* Кнопки действий */}
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#d4b26f] hover:bg-[#c49f57] active:scale-[0.99] disabled:opacity-75 text-[#064734] font-black py-4 rounded-xl uppercase tracking-wider text-xs transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-[#064734] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <IconPhone className="w-4 h-4" />
                  )}
                  <span>{isSubmitting ? ui.btnSubmitting : ui.btnCall}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-white/10 hover:bg-white/20 active:scale-[0.99] disabled:opacity-60 text-white font-bold py-4 rounded-xl uppercase tracking-wider text-xs border border-white/25 transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                  <span>{ui.btnWhatsApp}</span>
                </button>
              </div>

              {/* Гарантии */}
              <div className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-white/70">
                <span className="flex items-center gap-1.5">
                  <IconCheck className="w-3.5 h-3.5 text-[#d4b26f] shrink-0" />
                  <span>{ui.guarantee1}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <IconCheck className="w-3.5 h-3.5 text-[#d4b26f] shrink-0" />
                  <span>{ui.guarantee2}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <IconCheck className="w-3.5 h-3.5 text-[#d4b26f] shrink-0" />
                  <span>{ui.guarantee3}</span>
                </span>
              </div>

              <div className="text-center pt-1">
                <span className="text-[10px] text-white/50 inline-flex items-center gap-1.5 justify-center">
                  <IconShieldCheck className="w-3.5 h-3.5 text-[#d4b26f] shrink-0" />
                  <span>{ui.privacy}</span>
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}