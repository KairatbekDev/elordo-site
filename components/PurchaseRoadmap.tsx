'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { COMPANY_INFO } from '@/lib/data';
import {
  IconCheck,
  IconShieldCheck,
  IconBuilding,
  IconCalendar,
  IconWhatsApp,
  IconArrowRight,
} from '@/components/Icons';

interface StepDetail {
  number: string;
  title: string;
  duration: string;
  summary: string;
  clientRole: string;
  companyRole: string;
  guaranteeBadge: string;
}

const ROADMAP_DATA: Record<Locale, {
  badge: string;
  title: string;
  subtitle: string;
  clientTitle: string;
  companyTitle: string;
  ctaText: string;
  btnConsult: string;
  steps: StepDetail[];
}> = {
  ru: {
    badge: 'Прозрачность и безопасность',
    title: '5 шагов от выбора квартиры до получения ключей',
    subtitle: 'Пошаговый регламент покупки строящейся недвижимости в EL ORDO GROUP с обязательной государственной регистрацией в Госрегистре КР.',
    clientTitle: 'Что требуется от вас:',
    companyTitle: 'Что делает застройщик EL ORDO:',
    ctaText: 'Остались вопросы по процедуре оформления сделки?',
    btnConsult: 'Задать вопрос юристу в WhatsApp',
    steps: [
      {
        number: '01',
        title: 'Подбор планировки и бронь на 3 дня',
        duration: 'Срок: 1–3 дня',
        summary: 'Вместе с менеджером отдела продаж вы выбираете жилой комплекс, этаж, вид из окон и планировку. Выбранная квартира бронируется бесплатно с фиксацией цены за м².',
        clientRole: 'Определиться с планировкой и предоставить паспорт гражданина КР.',
        companyRole: 'Бронирует квартиру в базе, фиксирует цену за м² и закрывает лот от других покупателей.',
        guaranteeBadge: 'Цена за м² фиксируется и не подлежит повышению',
      },
      {
        number: '02',
        title: 'Согласование графика и подписание ДДУ',
        duration: 'Срок: 1 день',
        summary: 'Составляется индивидуальный график выплат беспроцентной рассрочки (ежемесячно или поквартально до 36 месяцев). Вы знакомитесь с проектом Договора долевого участия (ДДУ).',
        clientRole: 'Выбрать комфортную периодичность платежей и подписать ДДУ.',
        companyRole: 'Юристы готовят полный пакет правоустанавливающих документов и персональный график выплат.',
        guaranteeBadge: 'Индивидуальный график платежей без банковских процентов',
      },
      {
        number: '03',
        title: 'Государственная регистрация в Госрегистре КР',
        duration: 'Срок: 3–5 рабочих дней',
        summary: 'Обязательный государственный этап в Бишкекском филиале ГУ «Кадастр». Договор регистрируется в Едином государственном реестре прав на недвижимое имущество.',
        clientRole: 'Личное присутствие с паспортом или нотариальная доверенность.',
        companyRole: 'Юрист компании сопровождает регистрацию сделки и подает документы в Госкадастр.',
        guaranteeBadge: '100% юридическая защита от двойных продаж по законам КР',
      },
      {
        number: '04',
        title: 'Внесение взноса и онлайн-контроль стройки',
        duration: 'Срок: от 12 до 36 месяцев',
        summary: 'Вы вносите первоначальный взнос (от 20%) и оплачиваете рассрочку по согласованному графику в сомах по курсу НБКР. За ходом строительства вы наблюдаете онлайн через веб-камеры и ежемесячные фотоотчеты.',
        clientRole: 'Внесение платежей по графику через кассу или расчетный счет.',
        companyRole: 'Соблюдение СНиП, ежемесячные видеоотчеты со стройплощадки и персональный менеджер на связи.',
        guaranteeBadge: 'Фиксация курса сома к доллару в договоре',
      },
      {
        number: '05',
        title: 'Госкомиссия, передача ключей и техпаспорт',
        duration: 'Срок: по завершении строительства',
        summary: 'Дом вводится в эксплуатацию с прохождением Государственной комиссии Госстроя КР. Вы принимаете квартиру по акту приема-передачи, получаете ключи и оформляете государственный технический паспорт.',
        clientRole: 'Осмотр квартиры, подписание акта приема-передачи и получение ключей.',
        companyRole: 'Ввод дома в эксплуатацию, передача ключей и содействие в оформлении техпаспорта на ваше имя.',
        guaranteeBadge: 'Сейсмостойкость 9 баллов и гарантия на конструктив',
      },
    ],
  },
  kg: {
    badge: 'Ачыктык жана коопсуздук',
    title: 'Батир тандоодон баштап ачкыч алганга чейинки 5 кадам',
    subtitle: 'EL ORDO GROUP компаниясынан курулуп жаткан турак жайды сатып алуунун жана КР Мамкаттоосунда милдеттүү каттоодон өткөрүүнүн эрежелери.',
    clientTitle: 'Сизден эмне талап кылынат:',
    companyTitle: 'EL ORDO куруучу компаниясы эмне кылат:',
    ctaText: 'Келишимди тариздөө боюнча суроолоруңуз калдыбы?',
    btnConsult: 'WhatsApp аркылуу юристтен кеңеш алуу',
    steps: [
      {
        number: '01',
        title: 'Планировканы тандоо жана 3 күнгө акысыз брондоо',
        duration: 'Мөөнөтү: 1–3 күн',
        summary: 'Сатуу бөлүмүнүн менеджери менен биргеликте турак жай комплексин, кабатты, терезеден каралган көрүнүштү жана планировканы тандайсыз. Баасы бекитилип, акысыз брондолот.',
        clientRole: 'Планировканы тактоо жана КР жаранынын паспортун көрсөтүү.',
        companyRole: 'Батирди базада брондойт, чарчы метринин баасын бекитет жана башка сатып алуучуларга жабат.',
        guaranteeBadge: 'Чарчы метр баасы бекитилет жана кымбаттабайт',
      },
      {
        number: '02',
        title: 'Төлөм графигин бекитүү жана ДДУ келишимине кол коюу',
        duration: 'Мөөнөтү: 1 күн',
        summary: '0% үстөксүз бөлүп төлөөнүн жеке графиги түзүлөт (ай сайын же квартал сайын 36 айга чейин). Үлүштүк курулушка катышуу келишими (ДДУ) менен таанышып, кол коёсуз.',
        clientRole: 'Төлөмдөрдүн ыңгайлуу мезгилин тандап, келишимге кол коюу.',
        companyRole: 'Юристтер бардык укуктук документтер топтомун жана төлөм графигин даярдайт.',
        guaranteeBadge: 'Банктык пайыздарсыз жеке төлөм графиги',
      },
      {
        number: '03',
        title: 'КР Мамкаттоосунда (Госрегистр) мамлекеттик каттоо',
        duration: 'Мөөнөтү: 3–5 жумушчу күн',
        summary: '«Кадастр» мамлекеттик мекемесинин Бишкек филиалында милдеттүү мамлекеттик каттоо. Келишим Кыймылсыз мүлккө болгон укуктардын бирдиктүү мамлекеттик реестрине киргизилет.',
        clientRole: 'Паспорт менен өзү катышуу же нотариалдык ишеним кат.',
        companyRole: 'Компаниянын юристи келишимди каттоону коштоп, Госкадастрга өткөрүп берет.',
        guaranteeBadge: 'Мыйзам боюнча кайталап сатуудан 100% мамлекеттик коргоо',
      },
      {
        number: '04',
        title: 'Баштапкы төлөмдү киргизүү жана онлайн көзөмөл',
        duration: 'Мөөнөтү: 12 айдан 36 айга чейин',
        summary: 'Сиз баштапкы төлөмдү (20%дан баштап) киргизип, график боюнча төлөмдөрдү Улуттук банктын курсу менен жүргүзөсүз. Курулуштун жүрүшүн 24/7 камералар жана ай сайын чыккан отчёттор аркылуу онлайн көрөсүз.',
        clientRole: 'Графикке ылайык касса же эсептик эсеп аркылуу төлөө.',
        companyRole: 'Курулуш ченемдерин сактоо, ай сайын фото/видео отчёттор жана жеке менеджер байланышта.',
        guaranteeBadge: 'Келишимде сомдун долларга карата курсун бекитүү',
      },
      {
        number: '05',
        title: 'Мамкомиссия, ачкыч тапшыруу жана техпаспорт',
        duration: 'Мөөнөтү: курулуш аяктаганда',
        summary: 'Имарат КР Мамкурулуштун Мамлекеттик комиссиясынан өтүп, пайдаланууга берилет. Сиз батирди өткөрүп алуу актысы менен кабыл алып, ачкычтарды жана жеке техпаспортту аласыз.',
        clientRole: 'Батирди текшерүү, өткөрүп алуу актысына кол коюу жана ачкычтарды алуу.',
        companyRole: 'Үйдү ишке берүү, ачкыч тапшыруу жана сиздин атыңызга техпаспорт алууга көмөктөшүү.',
        guaranteeBadge: '9 баллдык сейсмотуруктуулук жана имаратка кепилдик',
      },
    ],
  },
  kz: {
    badge: 'Ашықтық пен қауіпсіздік',
    title: 'Пәтер таңдаудан кілт алуға дейінгі 5 қадам',
    subtitle: 'EL ORDO GROUP-тан салынып жатқан тұрғын үйді сатып алудың және ҚР Мемлекеттік тіркеуінде міндетті тіркеудің ережелері.',
    clientTitle: 'Сізден не талап етіледі:',
    companyTitle: 'EL ORDO құрылыс компаниясы не істейді:',
    ctaText: 'Рәсімдеу тәртібі бойынша сұрақтарыңыз бар ма?',
    btnConsult: 'WhatsApp-та заңгерден кеңес алу',
    steps: [
      {
        number: '01',
        title: 'Жоспарды таңдау және 3 күнге тегін брондау',
        duration: 'Мерзімі: 1–3 күн',
        summary: 'Сату бөлімінің менеджерімен бірге кешенді, қабатты және жоспарды таңдайсыз. Баға бекітіліп, пәтер тегін брондалады.',
        clientRole: 'Жоспарды таңдау және төлқұжатты ұсыну.',
        companyRole: 'Пәтерді брондайды, бағаны бекітеді және басқа сатып алушыларға жабады.',
        guaranteeBadge: 'Шаршы метр бағасы бекітіледі және өспейді',
      },
      {
        number: '02',
        title: 'Кестені келісу және ДДУ шартына қол қою',
        duration: 'Мерзімі: 1 күн',
        summary: '0% бөліп төлеудің жеке кестесі жасалады (ай сайын немесе тоқсан сайын 36 айға дейін). ДДУ шартымен танысып, қол қоясыз.',
        clientRole: 'Төлемдердің ыңғайлы мерзімін таңдап, шартқа қол қою.',
        companyRole: 'Заңгерлер құжаттар топтамасын және төлем кестесін дайындайды.',
        guaranteeBadge: 'Банк пайызынсыз жеке төлем кестесі',
      },
      {
        number: '03',
        title: 'Мемтіркеуде (Госрегистр) мемлекеттік тіркеу',
        duration: 'Мерзімі: 3–5 жұмыс күні',
        summary: 'Бірыңғай мемлекеттік жылжымайтын мүлік тізілімінде міндетті мемлекеттік тіркеу.',
        clientRole: 'Төлқұжатпен жеке қатысу немесе сенімхат.',
        companyRole: 'Заңгер тіркеуді сүйемелдейді және құжаттарды өткізеді.',
        guaranteeBadge: 'Заң бойынша қайталап сатудан 100% мемлекеттік қорғау',
      },
      {
        number: '04',
        title: 'Жарнаны төлеу және құрылысты онлайн бақылау',
        duration: 'Мерзімі: 12-ден 36 айға дейін',
        summary: 'Бастапқы жарнаны төлеп, кесте бойынша төлемдерді жүргізесіз. Құрылыс барысын 24/7 камералардан онлайн көресіз.',
        clientRole: 'Кесте бойынша төлемдерді енгізу.',
        companyRole: 'Құрылыс нормаларын сақтау және ай сайынғы есептер беру.',
        guaranteeBadge: 'Шартта бағамды бекіту мүмкіндігі',
      },
      {
        number: '05',
        title: 'Мемкомиссия, кілт табыстау және техпаспорт',
        duration: 'Мерзімі: құрылыс аяқталғанда',
        summary: 'Үй Мемлекеттік комиссиядан өтіп, пайдалануға беріледі. Сіз пәтерді қабылдап, кілт пен жеке техпаспорт аласыз.',
        clientRole: 'Пәтерді тексеру, актіге қол қою және кілттерді алу.',
        companyRole: 'Үйді іске қосу, кілт беру және техпаспорт алуға көмектесу.',
        guaranteeBadge: '9 балдық сейсмотұрақтылық және кепілдік',
      },
    ],
  },
  uk: {
    badge: 'Прозорість та безпека',
    title: '5 кроків від вибору квартири до отримання ключів',
    subtitle: 'Покроковий регламент купівлі нерухомості в EL ORDO GROUP з обов’язковою державною реєстрацією в Держреєстрі КР.',
    clientTitle: 'Що потрібно від вас:',
    companyTitle: 'Що робить забудовник EL ORDO:',
    ctaText: 'Залишилися питання щодо процедури оформлення угоди?',
    btnConsult: 'Поставити запитання юристу у WhatsApp',
    steps: [
      {
        number: '01',
        title: 'Підбір планування та бронь на 3 дні',
        duration: 'Термін: 1–3 дні',
        summary: 'Вибір комплексу, поверху та планування. Обрана квартира безкоштовно бронюється з фіксацією вартості за м².',
        clientRole: 'Обрати планування та надати паспорт.',
        companyRole: 'Бронює квартиру, фіксує вартість м² та закриває лот від інших клієнтів.',
        guaranteeBadge: 'Ціна за м² фіксується та не зростає',
      },
      {
        number: '02',
        title: 'Узгодження графіка та підписання ДДУ',
        duration: 'Термін: 1 день',
        summary: 'Складається індивідуальний графік розстрочки 0% (щомісячно або щоквартально до 36 місяців). Підписання ДДУ.',
        clientRole: 'Обрати періодичність виплат і підписати договір.',
        companyRole: 'Підготовка повного юридичного пакета документів.',
        guaranteeBadge: 'Індивідуальний графік без банківських відсотків',
      },
      {
        number: '03',
        title: 'Державна реєстрація в Держреєстрі КР',
        duration: 'Термін: 3–5 робочих днів',
        summary: 'Обов’язкова державна реєстрація договору в Єдиному державному реєстрі прав на нерухоме майно.',
        clientRole: 'Особиста присутність із паспортом або довіреність.',
        companyRole: 'Юрист компанії супроводжує реєстрацію угоди в Держкадастрі.',
        guaranteeBadge: '100% захист від подвійних продажів за законом',
      },
      {
        number: '04',
        title: 'Внесення внеску та онлайн-контроль',
        duration: 'Термін: 12–36 місяців',
        summary: 'Оплата першого внеску та платежі за графіком. Спостереження за будівництвом 24/7 через онлайн-камери.',
        clientRole: 'Внесення платежів за графіком.',
        companyRole: 'Будівництво згідно з нормами та щомісячні фотозвіти.',
        guaranteeBadge: 'Можливість фіксації курсу в договорі',
      },
      {
        number: '05',
        title: 'Держкомісія, видача ключів та техпаспорт',
        duration: 'Термін: після завершення будівництва',
        summary: 'Будинок вводиться в експлуатацію. Ви приймаєте квартиру, отримуєте ключі та оформлюєте техпаспорт.',
        clientRole: 'Огляд квартири, підписання акта та отримання ключів.',
        companyRole: 'Введення в експлуатацію та оформлення техпаспорта.',
        guaranteeBadge: 'Сейсмостійкість 9 балів та гарантія',
      },
    ],
  },
  en: {
    badge: 'Transparency & Legal Security',
    title: '5 Steps from Apartment Selection to Keys Handover',
    subtitle: 'Step-by-step acquisition guidelines for EL ORDO GROUP properties with mandatory official state title registration.',
    clientTitle: 'What is required from you:',
    companyTitle: 'What EL ORDO developer takes care of:',
    ctaText: 'Have questions regarding contract registration?',
    btnConsult: 'Consult with Legal Counsel via WhatsApp',
    steps: [
      {
        number: '01',
        title: 'Floor Plan Selection & 3-Day Free Reservation',
        duration: 'Timeline: 1–3 days',
        summary: 'Choose your desired residential complex, floor, view, and layout. The unit is reserved for free with the price per sq.m locked in.',
        clientRole: 'Select preferred unit and provide passport / national ID.',
        companyRole: 'Locks the price in the inventory database and restricts the unit from other buyers.',
        guaranteeBadge: 'Price per sq.m is fixed and immune to increases',
      },
      {
        number: '02',
        title: 'Payment Schedule Tuning & Agreement Signing',
        duration: 'Timeline: 1 day',
        summary: 'Customize your 0% installment plan (monthly or quarterly up to 36 months). Review and sign the Equity Construction Contract (DDU).',
        clientRole: 'Select payment cadence and sign the purchase agreement.',
        companyRole: 'Legal team prepares all title deeds, permits, and payment milestones.',
        guaranteeBadge: 'Zero compound bank interest or hidden loan charges',
      },
      {
        number: '03',
        title: 'Mandatory State Title Registration (Gosregister)',
        duration: 'Timeline: 3–5 business days',
        summary: 'Official registration in the Unified State Register of Immovable Property at Cadastre Agency.',
        clientRole: 'Personal appearance with ID or power of attorney.',
        companyRole: 'Senior corporate attorney oversees registration filings at the State Cadastre.',
        guaranteeBadge: '100% statutory guarantee preventing double sales',
      },
      {
        number: '04',
        title: 'Down Payment & 24/7 Live Construction Tracking',
        duration: 'Timeline: 12 to 36 months',
        summary: 'Submit your down payment (from 20%) and pay installments according to the schedule. Track construction progress via 24/7 webcams.',
        clientRole: 'Settle installment payments per agreed schedule.',
        companyRole: 'Building code adherence, monthly drone video updates, dedicated personal manager.',
        guaranteeBadge: 'Contractual exchange rate pegging protection',
      },
      {
        number: '05',
        title: 'State Commission, Keys Handover & Title Deed',
        duration: 'Timeline: upon project completion',
        summary: 'Project commissioning by State Inspection. Inspect your apartment, sign handover certificate, receive keys, and obtain your technical passport.',
        clientRole: 'Inspect apartment, sign acceptance certificate, and collect keys.',
        companyRole: 'Building commissioning and assistance in issuing the state technical passport in your name.',
        guaranteeBadge: '9-magnitude earthquake resistance engineering',
      },
    ],
  },
  zh: {
    badge: '透明置业 • 法律严密保障',
    title: '从选房至交付钥匙的全流程五步指南',
    subtitle: 'EL ORDO GROUP 旗下项目合规置业流程，并在吉尔吉斯国家不动产登记局完成官方备案。',
    clientTitle: '客户仅需配合：',
    companyTitle: '开发商全程承办：',
    ctaText: '对购房合同与政府备案流程仍有疑问？',
    btnConsult: '通过 WhatsApp 咨询公司法务顾问',
    steps: [
      {
        number: '01',
        title: '主力户型锁定与3天免费锁房保护',
        duration: '周期：1–3天',
        summary: '在销售经理协助下挑选心仪楼盘、楼层、朝向与户型，签订意向协议并免费锁定房源单价。',
        clientRole: '确认房号户型并出示有效身份证件。',
        companyRole: '在销售管理系统中锁定房源单价，并对其他买家下架该房源。',
        guaranteeBadge: '签约单价全程锁定，决不上浮',
      },
      {
        number: '02',
        title: '定制个性化还款计划并直签购房合同',
        duration: '周期：1天',
        summary: '双方商定 0% 免息分期具体周期（最长36个月按月或按季度还款），正式签署法律认可的购房合同。',
        clientRole: '选定还款周期及频率，完成合同签署。',
        companyRole: '法务部审核各项土地批文与产权证照，出具法定还款排期明细。',
        guaranteeBadge: '无银行高息按揭，纯开发商0%直营免息',
      },
      {
        number: '03',
        title: '吉尔吉斯国家土地不动产管理局官方备案',
        duration: '周期：3–5个工作日',
        summary: '在比什凯克不动产登记局（Госрегистр）办理国家级法定登记备案，取得独立登记编码。',
        clientRole: '本人携证件到场或提供涉外公证委托。',
        companyRole: '公司资深法务专员全流程陪同递交并跟进政府审批出证。',
        guaranteeBadge: '国家统一登记库备案，100%杜绝一房两卖',
      },
      {
        number: '04',
        title: '缴纳首期房款与 24/7 在线直播监工',
        duration: '周期：12 至 36 个月',
        summary: '支付约定首付（20%起），按期支付分期款项。业主可随时通过项目全高清摄像头与每月航拍报告实时关注工程进度。',
        clientRole: '按照约定时间表划转对应分期款项。',
        companyRole: '严格执行高标准施工规范，每月更新工程航拍记录并提供一对一管家服务。',
        guaranteeBadge: '支持在合同中约定专属汇率锁定保护条款',
      },
      {
        number: '05',
        title: '国家建筑工程验收、交付钥匙与办理产证',
        duration: '周期：项目竣工交付时',
        summary: '建筑通过吉尔吉斯建设部国家验收委员会竣工综合验收。业主入户查验、签署交割单、领取金钥匙并协助办理房屋技术档案（产权证）。',
        clientRole: '现场验收房屋质量，签署验收确认单并领取新居钥匙。',
        companyRole: '完成楼栋综合验收交付，协助办理业主专属不动产技术档案。',
        guaranteeBadge: '9级超强抗震烈度工程标准终身承重质保',
      },
    ],
  },
};

export default function PurchaseRoadmap() {
  const { locale } = useLanguage();
  const currentLang: Locale = (locale as Locale) || 'ru';
  const data = ROADMAP_DATA[currentLang] || ROADMAP_DATA.ru;

  const [activeStep, setActiveStep] = useState<number>(0);
  const cleanWaNumber = (COMPANY_INFO.whatsapp || '').replace(/\D/g, '') || '996709115115';

  const waQuestion =
    `Здравствуйте! Ознакомился с 5 шагами покупки квартиры на сайте EL ORDO GROUP.\n` +
    `Интересует шаг №${data.steps[activeStep].number}: «${data.steps[activeStep].title}».\n\n` +
    `Подскажите, пожалуйста, подробнее о необходимых документах и сроках.`;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 my-20">
      <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-12 border border-gray-200 dark:border-white/10 shadow-xl transition-colors">
        
        {/* Заголовок блока */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4b26f] block mb-2">
            {data.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#064734] dark:text-[#d4b26f] tracking-tight">
            {data.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-2 leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* Навигационная полоса 5 шагов (кнопки с номерами) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
          {data.steps.map((st, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={st.number}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer relative group ${
                  isActive
                    ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] border-transparent shadow-lg scale-[1.02]'
                    : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-[#064734]/30 text-gray-800 dark:text-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-base font-black ${isActive ? 'text-[#d4b26f] dark:text-[#064734]' : 'text-gray-400 dark:text-neutral-500'}`}>
                    {st.number}
                  </span>
                  <span className="text-[10px] font-semibold opacity-75 hidden sm:inline">
                    {st.duration}
                  </span>
                </div>
                <strong className="text-xs font-bold block line-clamp-2 leading-snug">
                  {st.title}
                </strong>
              </button>
            );
          })}
        </div>

        {/* Интерактивная карточка выбранного шага */}
        {data.steps[activeStep] && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#f7faf8] dark:bg-[#040c09] border border-[#064734]/20 dark:border-white/10 space-y-6 animate-fadeIn transition-colors">
            
            {/* Верхний заголовок и бейдж гарантии */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-[#064734] dark:bg-[#d4b26f] text-[#d4b26f] dark:text-[#064734] font-black text-base flex items-center justify-center shrink-0 shadow">
                  {data.steps[activeStep].number}
                </span>
                <div>
                  <h3 className="text-base sm:text-xl font-black text-gray-900 dark:text-white">
                    {data.steps[activeStep].title}
                  </h3>
                  <span className="text-xs text-gray-400 dark:text-neutral-500 font-semibold">
                    {data.steps[activeStep].duration}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-800 self-start sm:self-auto">
                <IconShieldCheck className="w-4 h-4 shrink-0" />
                <span>{data.steps[activeStep].guaranteeBadge}</span>
              </div>
            </div>

            {/* Подробное описание шага */}
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-light">
              {data.steps[activeStep].summary}
            </p>

            {/* Зоны ответственности (Клиент vs Застройщик) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Что делает дольщик */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-neutral-400 block mb-1.5">
                  {data.clientTitle}
                </span>
                <p className="text-xs font-semibold text-gray-900 dark:text-white flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0 mt-0.5" />
                  <span>{data.steps[activeStep].clientRole}</span>
                </p>
              </div>

              {/* Что делает EL ORDO */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#d4b26f] block mb-1.5">
                  {data.companyTitle}
                </span>
                <p className="text-xs font-semibold text-gray-900 dark:text-white flex items-start gap-2">
                  <IconBuilding className="w-4 h-4 text-[#064734] dark:text-[#d4b26f] shrink-0 mt-0.5" />
                  <span>{data.steps[activeStep].companyRole}</span>
                </p>
              </div>
            </div>

            {/* Переключение шагов вперед/назад */}
            <div className="flex justify-between items-center pt-2 text-xs">
              <button
                type="button"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 font-bold text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                ← Назад
              </button>

              <span className="text-[11px] font-bold text-gray-400">
                Шаг {activeStep + 1} из 5
              </span>

              <button
                type="button"
                disabled={activeStep === data.steps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(data.steps.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#032b20] dark:hover:bg-[#c49f57] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Далее</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* Нижний призыв к действию (консультация юриста) */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 text-center sm:text-left">
            {data.ctaText}
          </p>

          <a
            href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waQuestion)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#064734] hover:bg-[#032b20] active:scale-95 text-[#d4b26f] hover:text-white font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all shadow flex items-center gap-2 cursor-pointer"
          >
            <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
            <span>{data.btnConsult}</span>
          </a>
        </div>

      </div>
    </section>
  );
}