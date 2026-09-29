'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { IconCheck, IconCalendar, IconArrowRight, IconStar } from '@/components/Icons';

// =========================================================================
// 📹 1. БАЗА ВИДЕОССЫЛОК ОТЗЫВОВ НА ВСЕ 6 ОБЪЕКТОВ
// =========================================================================
export const REVIEW_VIDEOS = {
  // 1. ЖК Abu Dhabi
  abuDhabiBuyer: 'https://youtube.com/shorts/xWB55Ogjxkk?feature=share', // 28.09.2026 — Отзыв дольщиков (8-й этаж)
  // 2. ЖК Madina Residence
  madinaInvestor: 'https://youtube.com/shorts/bElPGpP-5oI?feature=share', // 17.08.2026 — Покупатели квартиры в Блоке «А»
  // 3. ЖД Айкол +
  ajkolPlusFamily: 'https://youtube.com/shorts/t-DxuulNuCw?feature=share', // 26.09.2026 — Новосёлы района Кок-Жар
  // 4. ЖД Айкол (СДАН)
  ajkolHandover: 'https://youtube.com/shorts/K2z55r4Ma-s?feature=share', // 11.09.2026 — Вручение ключей (сертификат 200 000 сом)
  // 5. ЖК Келечек (СДАН)
  kelechekLife: '', // Счастливая жизнь в заселенном комплексе
  // 6. КД Ордо (СДАН)
  ordoTour: 'https://youtu.be/BfY6nA076Zo', // Видеообзор и румтур резидента клубного дома
};

// =========================================================================
// 🗓 АВТОМАТИЧЕСКИЙ ДВИЖОК ДАТ (6 ЯЗЫКОВ)
// =========================================================================
function formatLocalizedDate(dateInput: string | undefined, locale: Locale): string {
  if (!dateInput) return '';
  let year = 0, month = -1, day = 0;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const [y, m, d] = dateInput.split('-').map(Number);
    year = y; month = m - 1; day = d;
  } else if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateInput)) {
    const [d, m, y] = dateInput.split('.').map(Number);
    year = y; month = m - 1; day = d;
  } else {
    return dateInput;
  }

  const monthsGenitive: Record<Locale, string[]> = {
    ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    kg: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    kz: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
    uk: ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  };

  const m = monthsGenitive[locale]?.[month] || monthsGenitive.ru[month];
  switch (locale) {
    case 'kg': return `${day}-${m}, ${year}-ж.`;
    case 'kz': return `${day} ${m}, ${year} ж.`;
    case 'uk': return `${day} ${m} ${year} р.`;
    case 'en': return `${m} ${day}, ${year}`;
    case 'zh': return `${year}年${month + 1}月${day}日`;
    case 'ru':
    default:   return `${day} ${m} ${year} г.`;
  }
}

function formatVideoSource(url: string) {
  if (!url) return { isDirectVideo: false, src: '' };
  const isDirectVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.startsWith('/videos/');
  if (isDirectVideo) return { isDirectVideo: true, src: url };

  let embedUrl = url;
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split(/[?#&]/)[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('watch?v=')) {
    const videoId = url.split('watch?v=')[1]?.split(/[?#&]/)[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtube.com/shorts/')) {
    const videoId = url.split('youtube.com/shorts/')[1]?.split(/[?#&]/)[0];
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  const separator = embedUrl.includes('?') ? '&' : '?';
  return { isDirectVideo: false, src: `${embedUrl}${separator}autoplay=1&rel=0` };
}

export interface ReviewItem {
  id: string;
  projectSlug: string;
  projectName: string;
  authorName: Record<Locale, string>;
  roleBadge: Record<Locale, string>;
  rawDate: string;
  videoUrl: string;
  videoDuration: string;
  thumbnail: string;
  rating: number;
  quote: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
}

// =========================================================================
// 💬 2. БАЗА ОТЗЫВОВ НА ВСЕ 6 ОБЪЕКТОВ
// =========================================================================
const REVIEWS: ReviewItem[] = [
  // 1. ЖК Abu Dhabi
  {
    id: 'rev-abu-dhabi',
    projectSlug: 'abu-dhabi',
    projectName: 'ЖК Abu Dhabi',
    authorName: {
      ru: 'Нурлан и Зарина',
      kg: 'Нурлан жана Зарина',
      kz: 'Нұрлан мен Зарина',
      uk: 'Нурлан та Заріна',
      en: 'Nurlan & Zarina',
      zh: '努尔兰与扎丽娜夫妇',
    },
    roleBadge: {
      ru: 'Покупатели 3-к квартиры (Блок «Б»)',
      kg: '3 бөлмөлүү батирдин ээлери («Б» блогу)',
      kz: '3 бөлмелі пәтер иелері («Б» блогы)',
      uk: 'Власники 3-к квартири (Блок «Б»)',
      en: '3-Room Apartment Buyers (Block B)',
      zh: 'B座大平层业主',
    },
    rawDate: '2026-09-28',
    videoUrl: REVIEW_VIDEOS.abuDhabiBuyer,
    videoDuration: '00:46 • Shorts',
    thumbnail: '/projects/Abu-Dhabi.png',
    rating: 5,
    quote: {
      ru: '«Выбрали Abu Dhabi из-за сейсмостойкости и премиального расположения на Южной магистрали. Каждый месяц смотрим видеоотчёты с заливкой этажей — темп строительства невероятный!»',
      kg: '«Түштүк магистралдагы эң сонун локация жана сейсмотуруктуулугу үчүн тандадык. Ай сайын дрондон тартылган курулуш жүрүшүн көрүп турабыз — абдан тез куруп жатышат!»',
      kz: '«Оңтүстік магистральдағы ыңғайлы орны мен 9 балдық сейсмотөзімділігі үшін таңдадық. Құрылыс қарқыны керемет!»',
      uk: '«Обрали Abu Dhabi за найвищий рівень сейсмостійкості та панорамні види на гори. Будівництво йде з випередженням графіка!»',
      en: '“We chose Abu Dhabi for its certified 9-point seismic resistance and prime location. Watching drone video updates of our 8th floor being poured gives complete confidence!”',
      zh: '“看重其严苛的9度抗震设防与南干道绝版生态区位。每月看着航拍镜头下主体结构一层层拔地而起，非常安心！”',
    },
    highlights: {
      ru: ['Бетон М450 и 9 баллов сейсмики', 'Рассрочка 0% без переплат', 'Вид на горы Ала-Тоо'],
      kg: ['М450 бетон жана 9 балл туруктуулук', 'Пайызсыз бөлүп төлөө', 'Ала-Тоо тоолоруна караган көрүнүш'],
      kz: ['М450 бетоны және сейсмотөзімділік', '0% бөліп төлеу', 'Тауларға қараған панорама'],
      uk: ['Бетон М450 та сейсмостійкість', 'Розстрочка 0% без банку', 'Панорама гір'],
      en: ['Grade M450 concrete core', '0% interest installment', 'Ala-Too mountain vistas'],
      zh: ['M450高标号抗震混凝土', '开发商0%免息分期', '阿拉套山绝美天幕视野'],
    },
  },

  // 2. ЖК Madina Residence
  {
    id: 'rev-madina',
    projectSlug: 'madina-residence',
    projectName: 'ЖК Madina Residence',
    authorName: {
      ru: 'Бакыт Токтогулов',
      kg: 'Бакыт Токтогулов',
      kz: 'Бақыт Тоқтағұлов',
      uk: 'Бакит Токтогулов',
      en: 'Bakyt Toktogulov',
      zh: '巴克特·托克托古洛夫',
    },
    roleBadge: {
      ru: 'Дольщик бизнес-класса (Блок «А»)',
      kg: 'Бизнес-класстагы батир ээси («А» блогу)',
      kz: 'Бизнес-санаттағы пәтер үлескері',
      uk: 'Пайовик бізнес-класу (Блок «А»)',
      en: 'Business-Class Resident (Block A)',
      zh: 'A座商务级公寓业主',
    },
    rawDate: '2026-08-17',
    videoUrl: REVIEW_VIDEOS.madinaInvestor,
    videoDuration: '00:37 • Shorts',
    thumbnail: '/projects/Madina-Residense.png',
    rating: 5,
    quote: {
      ru: '«Приобрел квартиру на 10 этаже. Фасадные работы уже завершены на 70%, в моем блоке провели электропроводку. Очень ценю прозрачность компании — всё видно прямо в видеодневнике!»',
      kg: '«10-кабаттан батир алгам. Фасад иштери 70% аяктап, биздин блокто электр түйүндөрү толук тартылыптыр. EL ORDO компаниясынын ачыктыгы абдан кубандырат!»',
      kz: '«10-қабаттан пәтер алдым. Қасбет 70% дайын, электр желілері тартылған. Құрылыс барысы бейнеде ашық көрсетіледі!»',
      uk: '«Фасадні роботи вже на 70%, мережі повністю підводяться. Максимально надійний забудовник у Бішкеку».',
      en: '“Purchased on the 10th floor. The ventilated facade reached 70% and electrical cabling is 100% complete in my block. Transparent weekly reports!”',
      zh: '“认购了10层大户型。目前外立面完成70%，A栋内部供电线路全部穿插就绪，视频播报透明公开！”',
    },
    highlights: {
      ru: ['Вентилируемый фасад 70%', 'Удобный транспортный узел', 'Юридическая чистота ДДУ'],
      kg: ['Желдетилүүчү фасад 70%', 'Ыңгайлуу жол түйүнү', 'Мыйзамдуу ДДУ келишими'],
      kz: ['Желдетілетін қасбет 70%', 'Ыңғайлы көлік торабы', 'Таза ДДУ шарты'],
      uk: ['Вентильований фасад 70%', 'Зручна локація', 'Офіційний договір ДДУ'],
      en: ['70% ventilated facade done', 'Chuy Ave central nexus', 'Registered DDU contracts'],
      zh: ['通风节能幕墙完成70%', '楚河大道立体交通', '正规备案认购合同'],
    },
  },

  // 3. ЖД Айкол +
  {
    id: 'rev-ajkol-plus',
    projectSlug: 'ajkol-plus',
    projectName: 'ЖД Айкол +',
    authorName: {
      ru: 'Семья Осмоновых',
      kg: 'Осмоновдордун үй-бүлөсү',
      kz: 'Осмоновтар отбасы',
      uk: 'Родина Осмонових',
      en: 'Osmonov Family',
      zh: '奥斯莫诺夫一家',
    },
    roleBadge: {
      ru: 'Покупатели клубного формата',
      kg: 'Клубдук үйдүн сатып алуучулары',
      kz: 'Клубтық үй сатып алушылары',
      uk: 'Покупці житла в Кок-Жар',
      en: 'Boutique Residence Buyers',
      zh: '低密纯洋房认购业主',
    },
    rawDate: '2026-09-26',
    videoUrl: REVIEW_VIDEOS.ajkolPlusFamily,
    videoDuration: '00:27 • Shorts',
    thumbnail: '/projects/Aikolplus.png',
    rating: 5,
    quote: {
      ru: '«Искали уютный малоэтажный дом в спокойном районе Кок-Жар. Уже залит 7-й этаж, работы идут без задержек. Отдельное спасибо отделу продаж за удобный график платежей без процентов».',
      kg: '«Көк-Жардан тынч жана жайлуу үй издеп жүргөнбүз. Мына 7-кабаты куюлду, иш үзгүлтүксүз жүрүүдө. Пайызсыз бөлүп төлөө графиги бизге абдан жакты».',
      kz: '«Көк-Жар ауданынан жайлы үй таңдадық. 7-қабат құйылды, кестеден кешігу жоқ. Бөліп төлеу шарттары өте ыңғайлы».',
      uk: '«Затишний будинок у районі Кок-Жар. Вже завершено перекриття 7 поверху. Все надійно та за регламентом».',
      en: '“Found our sanctuary in Kok-Zhar district. 7th floor is already poured, no construction delays. Flexible 0% monthly payment schedule.”',
      zh: '“选定了科克-扎尔高品质纯洋房。目前第7层顶板已顺利浇筑完成，开发商自营免息分期十分体贴。”',
    },
    highlights: {
      ru: ['Монолит 7-го этажа готов', 'Тихий зеленый район Кок-Жар', 'Рассрочка без банка'],
      kg: ['7-кабат куюлуп бүттү', 'Көк-Жар тынч аймагы', 'Банксыз жеңил төлөмдөр'],
      kz: ['7-қабат толық құйылды', 'Көк-Жар тыныш ауданы', 'Банксіз бөліп төлеу'],
      uk: ['Моноліт 7 поверху', 'Зелений район Кок-Жар', 'Безвідсоткова розстрочка'],
      en: ['7th floor slab completed', 'Serene green neighborhood', 'Direct flexible plan'],
      zh: ['第7层现浇楼面竣工', '静谧宜居绿色生态区', '全周期免息置业通道'],
    },
  },

  // 4. ЖД Айкол (СДАН)
  {
    id: 'rev-ajkol-handover',
    projectSlug: 'ajkol',
    projectName: 'ЖД Айкол',
    authorName: {
      ru: 'Семья Догдурбековых',
      kg: 'Догдурбековдордун үй-бүлөсү',
      kz: 'Доғдурбековтер отбасы',
      uk: 'Родина Догдурбекових',
      en: 'Dogdurbekov Family',
      zh: '多格杜尔别科夫一家',
    },
    roleBadge: {
      ru: 'Новосёлы • Сертификат 200 000 сом',
      kg: 'Жаңы конуштар • 200 000 сом сертификаты',
      kz: 'Жаңа қоныстанушылар • 200 000 сом сертификаты',
      uk: 'Новосели • Сертифікат 200 000 сом',
      en: 'New Residents • 200,000 KGS Winner',
      zh: '首批交房业主 • 荣获20万索姆大奖',
    },
    rawDate: '2026-09-11',
    videoUrl: REVIEW_VIDEOS.ajkolHandover,
    videoDuration: '02:20 • Церемония сдачи',
    thumbnail: '/projects/ajkol.png',
    rating: 5,
    quote: {
      ru: '«Получили ключи в атмосфере грандиозного праздника! Дом сдан вовремя, все коммуникации подключены, а выигранный сертификат на 200 000 сомов стал лучшим подарком к ремонту. Спасибо EL ORDO GROUP!»',
      kg: '«Ачкычтарыбызды чоң майрамда алдык! Үй өз убагында бүттү, бардык түйүндөр иштеп турат. 200 000 сомдук белек ремонтубузга чоң колдоо болду!»',
      kz: '«Кілттерді салтанатты мерекеде алдық! Үй уақытында тапсырылды, сапасы керемет. EL ORDO GROUP компаниясына мың алғыс!»',
      uk: '«Отримали ключі на святковій церемонії! Будинок зданий вчасно, якість найвища. Дуже вдячні забудовнику!»',
      en: '“We received our keys during an incredible grand ceremony! The house was delivered on time with all utilities ready.”',
      zh: '“在盛大热烈的交房典礼上如愿拿到新房钥匙！工程准时履约交付，全套管网齐备，非常感谢开发商！”',
    },
    highlights: {
      ru: ['Своевременная сдача дома', '100% готовность сетей', 'Розыгрыш 200 000 сомов'],
      kg: ['Өз убагында тапшырылышы', 'Бардык түйүндөр даяр', '200 000 сом байгеси'],
      kz: ['Дер кезінде тапсырылуы', 'Желілер 100% дайын', '200 000 сом жүлдесі'],
      uk: ['Вчасне здавання об’єкта', '100% готовність мереж', 'Розіграш цінних призів'],
      en: ['On-time completion', '100% utility readiness', '200,000 KGS prize draw'],
      zh: ['如期守约交付', '市政管网全线贯通', '现场抽取20万索姆大礼'],
    },
  },

  // 5. ЖК Келечек (СДАН)
  {
    id: 'rev-kelechek-family',
    projectSlug: 'kelechek',
    projectName: 'ЖК Келечек',
    authorName: {
      ru: 'Айбек и Чолпон',
      kg: 'Айбек жана Чолпон',
      kz: 'Айбек пен Шолпан',
      uk: 'Айбек та Чолпон',
      en: 'Aybek & Cholpon',
      zh: '艾别克与乔尔蓬夫妇',
    },
    roleBadge: {
      ru: 'Жильцы заселенного комплекса',
      kg: 'Жашап жаткан тургундар',
      kz: 'Тұрып жатқан тұрғындар',
      uk: 'Мешканці заселеного будинку',
      en: 'Verified Residents',
      zh: '入住业主代表',
    },
    rawDate: '2025-02-14',
    videoUrl: REVIEW_VIDEOS.kelechekLife,
    videoDuration: '01:45 • Интервью',
    thumbnail: '/projects/Kelechek.png',
    rating: 5,
    quote: {
      ru: '«Живем в комплексе второй год. Закрытый безопасный двор без машин, дети спокойно гуляют на площадке. Госрегистрация и техпаспорт оформлены без задержек».',
      kg: '«Комплексте экинчи жыл жашап жатабыз. Унаасыз коопсуз короо, балдар үчүн мыкты аянтча. Техпаспортту дароо алдык».',
      kz: '«Екінші жыл тұрып жатырмыз. Көліксіз қауіпсіз аула, балалар алаңы керемет. Құжаттары түгел».',
      uk: '«Живемо тут вже другий рік. Закрите подвір’я без машин, діти в безпеці. Документи оформлені швидко».',
      en: '“Living here for over a year now. Safe car-free courtyard, prompt title deeds issuance, outstanding community!”',
      zh: '“全家在这里生活了两年。人车分流景观庭院让孩子游玩非常安全，正式不动产权证书办理高效利落。”',
    },
    highlights: {
      ru: ['Двор без машин', 'Государственный техпаспорт', 'Детская инфраструктура'],
      kg: ['Унаасыз жабык короо', 'Мамлекеттик техпаспорт', 'Балдар аянтчасы'],
      kz: ['Көліксіз жабық аула', 'Мемлекеттік техпаспорт', 'Балалар алаңы'],
      uk: ['Двір без машин', 'Державний техпаспорт', 'Дитяча зона'],
      en: ['Car-free secured yard', 'State title registration', 'Playground amenities'],
      zh: ['全封闭人车分流内院', '官方不动产权证书齐备', '高品质儿童游乐设施'],
    },
  },

  // 6. КД Ордо (СДАН)
  {
    id: 'rev-ordo-resident',
    projectSlug: 'ordo',
    projectName: 'КД Ордо',
    authorName: {
      ru: 'Улан Асанов',
      kg: 'Улан Асанов',
      kz: 'Ұлан Асанов',
      uk: 'Улан Асанов',
      en: 'Ulan Asanov',
      zh: '乌兰·阿萨诺夫',
    },
    roleBadge: {
      ru: 'Резидент клубного дома',
      kg: 'Клубдук үйдүн тургуну',
      kz: 'Клубтық үй тұрғыны',
      uk: 'Резидент клубного будинку',
      en: 'Club House Resident',
      zh: '高端洋房常住业主',
    },
    rawDate: '2023-11-20',
    videoUrl: REVIEW_VIDEOS.ordoTour,
    videoDuration: '00:30 • Румтур',
    thumbnail: '/projects/Ordo.png',
    rating: 5,
    quote: {
      ru: '«Фасад из натурального гранита и травертина выглядит потрясающе даже спустя годы. Собственная газовая котельная — это тепло и независимость от городских отключений».',
      kg: '«Табигый гранит жана травертин фасады көп жыл өтсө да жаңыдай көрүнөт. Жеке отказаны үйдү ар дайым жылуу кармайт».',
      kz: '«Табиғи гранит пен травертин қасбеті өте керемет. Жеке қазандығы үйді қашанда жылы ұстайды».',
      uk: '«Фасад із натурального каменю та власна котельня забезпечують повний комфорт і тепло».',
      en: '“Natural granite & travertine facade, high ceilings and autonomous boiler guarantee absolute peace of mind.”',
      zh: '“全干挂天然石材外立面历久弥新，自建燃气供热站彻底告别市政供暖不稳定，居住格外安心。”',
    },
    highlights: {
      ru: ['Фасад из гранита и травертина', 'Собственная котельная', 'Приватность и тишина'],
      kg: ['Табигый таштан фасад', 'Жеке отказан', 'Тынчтык жана коопсуздук'],
      kz: ['Табиғи тастан қасбет', 'Жеке қазандық', 'Тыныштық пен қауіпсіздік'],
      uk: ['Фасад з натурального каменю', 'Автономна котельня', 'Безпека 24/7'],
      en: ['Natural stone cladding', 'Autonomous boiler', '24/7 private security'],
      zh: ['天然花岗岩与洞石幕墙', '独立智能燃气供热站', '全天候私密安防'],
    },
  },
];

const UI: Record<Locale, {
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  filterAll: string;
  statFamilies: string;
  statRating: string;
  statLegality: string;
  statTimely: string;
  watchVideoBtn: string;
  closeModal: string;
  verifiedBadge: string;
  placeholderTitle: string;
  placeholderDesc: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
}> = {
  ru: {
    heroBadge: 'ИСТОРИИ НАШИХ СОБСТВЕННИКОВ • EL ORDO GROUP',
    heroTitle: 'ВИДЕООТЗЫВЫ РЕЗИДЕНТОВ И НОВОСЁЛОВ',
    heroDesc: 'Живые эмоции новосёлов со всех 6 объектов EL ORDO GROUP: вручение ключей, истории покупки и жизнь в сданных домах.',
    filterAll: 'Все отзывы',
    statFamilies: 'Счастливых семей',
    statRating: 'Средний балл доверия',
    statLegality: 'Красная книга (100%)',
    statTimely: 'Сдача строго в срок',
    watchVideoBtn: 'Смотреть отзыв',
    closeModal: 'Закрыть',
    verifiedBadge: 'Проверенный собственник',
    placeholderTitle: 'Видеоматериал оцифровывается',
    placeholderDesc: 'Скоро здесь появится полная видеозапись отзыва',
    ctaTitle: 'Хотите стать частью семьи новосёлов EL ORDO?',
    ctaDesc: 'Оставьте заявку на персональный подбор квартиры с беспроцентной рассрочкой 0% до 36 месяцев без участия банка.',
    ctaBtn: 'Подобрать квартиру в WhatsApp',
  },
  kg: {
    heroBadge: 'БИЗДИН ТУРГУНДАРДЫН ОЙ-ПИКИРЛЕРИ • EL ORDO GROUP',
    heroTitle: 'ТУРГУНДАРДЫН ВИДЕООТЗЫВТАРЫ',
    heroDesc: 'EL ORDO GROUPтун бардык 6 объектисинен жаңы конуштардын жандуу пикирлери жана курулуш жүрүшү.',
    filterAll: 'Бардык пикирлер',
    statFamilies: 'Бактылуу үй-бүлөлөр',
    statRating: 'Ишеним рейтинги',
    statLegality: '100% Кызыл китеп',
    statTimely: 'Өз убагында тапшыруу',
    watchVideoBtn: 'Видеону көрүү',
    closeModal: 'Жабуу',
    verifiedBadge: 'Тастыкталган батир ээси',
    placeholderTitle: 'Видео даярдалууда',
    placeholderDesc: 'Жакында бул жерде толук видеоотзыв жайгаштырылат',
    ctaTitle: 'Сиз да EL ORDO жаңы конушу болгуңуз келеби?',
    ctaDesc: 'Банксыз 36 айга чейин 0% үстөксүз бөлүп төлөө менен батир тандоо үчүн кайрылыңыз.',
    ctaBtn: 'WhatsApp аркылуу батир тандоо',
  },
  kz: {
    heroBadge: 'ТҰРҒЫНДАРЫМЫЗДЫҢ ПІКІРЛЕРІ • EL ORDO GROUP',
    heroTitle: 'ТҰРҒЫНДАРДЫҢ БЕЙНЕПІКІРЛЕРІ',
    heroDesc: 'Барлық 6 кешен бойынша кілт тапсыру рәсімінен бейнебаяндар және тұрғындардың шынайы лебіздері.',
    filterAll: 'Барлық пікірлер',
    statFamilies: 'Қоныстанған отбасылар',
    statRating: 'Сенім рейтингі',
    statLegality: '100% Қызыл кітап',
    statTimely: 'Уақытында тапсыру',
    watchVideoBtn: 'Бейнені көру',
    closeModal: 'Жабу',
    verifiedBadge: 'Расталған пәтер иесі',
    placeholderTitle: 'Бейне дайындалуда',
    placeholderDesc: 'Жақын арада бейнепікір жүктеледі',
    ctaTitle: 'EL ORDO тұрғындарының қатарына қосылыңыз',
    ctaDesc: 'Банксіз 36 айға дейін 0% бөліп төлеу мүмкіндігімен пәтер таңдаңыз.',
    ctaBtn: 'WhatsApp-та пәтер таңдау',
  },
  uk: {
    heroBadge: 'ІСТОРІЇ НАШИХ ВЛАСНИКІВ • EL ORDO GROUP',
    heroTitle: 'ВІДЕОВІДГУКИ РЕЗИДЕНТІВ ТА НОВОСЕЛІВ',
    heroDesc: 'Живі емоції новоселів з усіх 6 об’єктів компанії EL ORDO GROUP: вручення ключів та затишне життя.',
    filterAll: 'Всі відгуки',
    statFamilies: 'Щасливих родин',
    statRating: 'Рейтинг довіри',
    statLegality: 'Юридична чистота',
    statTimely: 'Здача вчасно 100%',
    watchVideoBtn: 'Дивитися відгук',
    closeModal: 'Закрити',
    verifiedBadge: 'Перевірений власник',
    placeholderTitle: 'Відео монтується',
    placeholderDesc: 'Незабаром тут з’явиться повне відео',
    ctaTitle: 'Бажаєте стати новоселом EL ORDO?',
    ctaDesc: 'Отримайте розрахунок безвідсоткової розстрочки 0% до 36 місяців без банку.',
    ctaBtn: 'Обрати житло у WhatsApp',
  },
  en: {
    heroBadge: 'HOMEOWNER TESTIMONIALS • EL ORDO GROUP',
    heroTitle: 'RESIDENT & NEWCOMER VIDEO REVIEWS',
    heroDesc: 'Genuine emotional moments from key handover celebrations and verified resident reviews across all 6 developments.',
    filterAll: 'All Reviews',
    statFamilies: 'Happy Families',
    statRating: 'Trust Index',
    statLegality: 'Red Book Deeds (100%)',
    statTimely: '100% On-Time Delivery',
    watchVideoBtn: 'Watch Testimonial',
    closeModal: 'Close',
    verifiedBadge: 'Verified Homeowner',
    placeholderTitle: 'Video in post-production',
    placeholderDesc: 'Full video interview will be published shortly',
    ctaTitle: 'Ready to become an EL ORDO homeowner?',
    ctaDesc: 'Get a customized 0% interest-free developer installment plan up to 36 months without bank approval.',
    ctaBtn: 'Select Apartment via WhatsApp',
  },
  zh: {
    heroBadge: '业主温情见证 • EL ORDO GROUP',
    heroTitle: '交房业主与常住居民视频实录',
    heroDesc: '全面汇聚旗下全部6大标杆楼盘交房盛典实况与常住业主真挚心声。',
    filterAll: '全部视频实录',
    statFamilies: '安居圆梦家庭',
    statRating: '综合信赖评分',
    statLegality: '国家土地红本',
    statTimely: '100% 按期竣工交付',
    watchVideoBtn: '观摩视频专访',
    closeModal: '关闭',
    verifiedBadge: '认证业主',
    placeholderTitle: '视频录像后期制作中',
    placeholderDesc: '高清原片即将在此上线呈现',
    ctaTitle: '加入 EL ORDO 尊尚业主大家庭',
    ctaDesc: '即刻测算0%免息最长36个月自营分期方案，无需银行信贷审核。',
    ctaBtn: '在 WhatsApp 中尊享选房',
  },
};

export default function ReviewsPage() {
  const { locale, t: globalT } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const t = UI[currentLang] || UI.ru;

  const [selectedSlug, setSelectedSlug] = useState<string>('all');
  const [cinemaModal, setCinemaModal] = useState<ReviewItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCinemaModal(null);
    };
    if (cinemaModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cinemaModal]);

  const filteredReviews = useMemo(() => {
    if (selectedSlug === 'all') return REVIEWS;
    return REVIEWS.filter((r) => r.projectSlug === selectedSlug);
  }, [selectedSlug]);

  const projectsFilterList = [
    { slug: 'all', label: t.filterAll },
    { slug: 'abu-dhabi', label: 'ЖК Abu Dhabi' },
    { slug: 'madina-residence', label: 'ЖК Madina Residence' },
    { slug: 'ajkol-plus', label: 'ЖД Айкол +' },
    { slug: 'ajkol', label: 'ЖД Айкол' },
    { slug: 'kelechek', label: 'ЖК Келечек' },
    { slug: 'ordo', label: 'КД Ордо' },
  ];

  return (
    <main className="min-h-screen bg-[#fafbfa] dark:bg-[#07130e] text-gray-900 dark:text-gray-100 selection:bg-[#d4b26f] selection:text-[#064734] transition-colors duration-200 pb-20">
      
      {/* Хлебные крошки */}
      <div className="bg-white dark:bg-[#0b1b15] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#064734] dark:hover:text-[#d4b26f] transition-colors">
            {globalT.common?.home || 'Главная'}
          </Link>
          <span>/</span>
          <span className="text-[#064734] dark:text-[#d4b26f] font-semibold">
            {t.heroTitle}
          </span>
        </div>
      </div>

      {/* Hero-баннер */}
      <section className="bg-[#064734] text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {t.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            {t.heroDesc}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
            <div className="p-2.5">
              <strong className="text-2xl font-black text-[#d4b26f] block">600+</strong>
              <span className="text-[11px] text-white/80">{t.statFamilies}</span>
            </div>
            <div className="p-2.5">
              <strong className="text-2xl font-black text-white block">4.9 / 5.0</strong>
              <span className="text-[11px] text-white/80">{t.statRating}</span>
            </div>
            <div className="p-2.5">
              <strong className="text-2xl font-black text-emerald-400 block">100%</strong>
              <span className="text-[11px] text-white/80">{t.statLegality}</span>
            </div>
            <div className="p-2.5">
              <strong className="text-2xl font-black text-[#d4b26f] block">100%</strong>
              <span className="text-[11px] text-white/80">{t.statTimely}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Фильтр по всем 6 комплексам */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {projectsFilterList.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setSelectedSlug(item.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSlug === item.slug
                  ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] shadow-md'
                  : 'bg-white dark:bg-[#0b1b15] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Сетка отзывов */}
      <section className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <article
              key={rev.id}
              className="bg-white dark:bg-[#0b1b15] rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div
                className="relative aspect-video bg-neutral-900 overflow-hidden cursor-pointer"
                onClick={() => setCinemaModal(rev)}
              >
                <Image
                  src={rev.thumbnail}
                  alt={rev.authorName[currentLang] || rev.authorName.ru}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/95 dark:bg-[#07130e]/95 group-hover:bg-[#064734] text-gray-900 group-hover:text-white dark:text-[#d4b26f] flex items-center justify-center shadow-2xl transition-all scale-100 group-hover:scale-110">
                    <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg bg-[#064734]/90 backdrop-blur-md text-[#d4b26f] text-[10px] font-black uppercase shadow">
                    {rev.projectName}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-bold">
                    {rev.videoDuration}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-700/90 text-white text-[10px] font-extrabold flex items-center gap-1 shadow">
                    <span>★ {t.verifiedBadge}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-black text-gray-950 dark:text-white">
                        {rev.authorName[currentLang] || rev.authorName.ru}
                      </h3>
                      <span className="text-[11px] font-bold text-[#8c6b23] dark:text-[#d4b26f] block">
                        {rev.roleBadge[currentLang] || rev.roleBadge.ru}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-semibold shrink-0">
                      {formatLocalizedDate(rev.rawDate, currentLang)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[#d4b26f] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <IconStar key={i} className="w-3.5 h-3.5 text-[#d4b26f]" />
                    ))}
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 italic font-light leading-relaxed mb-4">
                    {rev.quote[currentLang] || rev.quote.ru}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(rev.highlights[currentLang] || rev.highlights.ru).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-[10px] font-semibold text-gray-700 dark:text-gray-300"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCinemaModal(rev)}
                  className="w-full py-3 px-4 rounded-xl bg-gray-100 hover:bg-[#064734] dark:bg-white/5 dark:hover:bg-[#d4b26f] text-gray-800 hover:text-white dark:text-gray-200 dark:hover:text-[#064734] font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-gray-200 dark:border-white/10"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>{t.watchVideoBtn}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA баннер */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="bg-[#064734] text-white rounded-3xl p-8 sm:p-12 border border-[#d4b26f]/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">
              {t.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              {t.ctaDesc}
            </p>
          </div>

          <a
            href="https://wa.me/996709115115"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#d4b26f] hover:bg-[#c49f57] active:scale-95 text-[#064734] font-black px-8 py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center gap-2 cursor-pointer"
          >
            <span>{t.ctaBtn}</span>
            <IconArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* МОДАЛЬНЫЙ КИНОТЕАТР */}
      {cinemaModal && (() => {
        const { isDirectVideo, src } = formatVideoSource(cinemaModal.videoUrl);

        return (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
            onClick={() => setCinemaModal(null)}
          >
            <div
              className="bg-neutral-950 w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:px-6 flex items-center justify-between border-b border-white/10 text-white bg-neutral-900">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-black uppercase text-[#d4b26f]">
                    {cinemaModal.projectName} • {cinemaModal.authorName[currentLang] || cinemaModal.authorName.ru}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCinemaModal(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label={t.closeModal}
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto bg-black flex flex-col">
                <div className="relative aspect-video w-full flex items-center justify-center bg-black">
                  {src ? (
                    isDirectVideo ? (
                      <video
                        src={src}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <iframe
                        src={src}
                        title={cinemaModal.authorName[currentLang] || cinemaModal.authorName.ru}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    )
                  ) : (
                    <div className="p-8 text-center text-neutral-400">
                      <span className="text-base font-bold text-white block mb-1">{t.placeholderTitle}</span>
                      <span className="text-xs text-neutral-400">{t.placeholderDesc}</span>
                    </div>
                  )}
                </div>

                <div className="p-6 text-white bg-neutral-900/80 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#d4b26f]">
                      {cinemaModal.roleBadge[currentLang] || cinemaModal.roleBadge.ru}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {formatLocalizedDate(cinemaModal.rawDate, currentLang)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-200 italic font-light leading-relaxed">
                    {cinemaModal.quote[currentLang] || cinemaModal.quote.ru}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </main>
  );
}