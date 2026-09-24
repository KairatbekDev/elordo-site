'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { Locale } from '@/lib/i18n/types';
import { exportPdfQuote } from '@/lib/exportPdfQuote';
import AnimatedCounter from '@/components/AnimatedCounter';
import {
  IconCheck,
  IconArrowRight,
  IconWhatsApp,
  IconShieldCheck,
  IconDiamond,
} from '@/components/Icons';

interface QuizOption {
  id: string;
  title: string;
  desc: string;
  badge?: string;
  iconType: string;
}

interface QuizStep {
  stepNum: number;
  question: string;
  subtitle: string;
  options: QuizOption[];
}

interface QuizContent {
  badge: string;
  heading: string;
  subheading: string;
  stepOf: string;
  btnBack: string;
  btnNext: string;
  btnRestart: string;
  resultBadge: string;
  resultTitle: string;
  resultDesc: string;
  matchedBadge: string;
  estPriceLabel: string;
  estMonthlyLabel: string;
  estDownLabel: string;
  btnWa: string;
  btnPdf: string;
  btnExplore: string;
  liveRatePrefix: string;
  somSuffix: string;
  steps: QuizStep[];
}

const QUIZ_TRANSLATIONS: Record<Locale, QuizContent> = {
  ru: {
    badge: 'Интеллектуальный подборщик',
    heading: 'Подберите идеальную квартиру за 60 секунд',
    subheading: 'Ответьте на 4 простых вопроса — алгоритм рассчитает персональные финансовые условия и покажет лучшие планировки.',
    stepOf: 'Шаг {current} из {total}',
    btnBack: 'Назад',
    btnNext: 'Далее',
    btnRestart: 'Пройти тест заново',
    resultBadge: 'Ваш персональный результат',
    resultTitle: 'Мы подобрали оптимальный жилой комплекс',
    resultDesc: 'На основе ваших параметров сформированы предварительные финансовые условия и подходящие видовые этажи:',
    matchedBadge: 'Идеальное совпадение 98%',
    estPriceLabel: 'Ориентировочная стоимость:',
    estMonthlyLabel: 'Платеж в месяц (0% без банка):',
    estDownLabel: 'Первоначальный взнос (30%):',
    btnWa: 'Получить планировки и шахматку в WhatsApp',
    btnPdf: 'Скачать полный расчет в PDF',
    btnExplore: 'Смотреть страницу комплекса',
    liveRatePrefix: 'Курс НБКР онлайн:',
    somSuffix: 'сом',
    steps: [
      {
        stepNum: 1,
        question: 'С какой целью вы выбираете недвижимость?',
        subtitle: 'Это поможет определить класс дома, планировку и приоритетные характеристики объекта.',
        options: [
          { id: 'family', title: 'Для жизни семьи', desc: 'Просторные комнаты, закрытый безопасный двор без машин, детские сады и школы рядом.', badge: 'Комфорт и уют', iconType: 'family' },
          { id: 'roi', title: 'Инвестиции и перепродажа', desc: 'Покупка на стадии монолита с приростом капитала до 25–35% к сдаче дома.', badge: 'Высокий ROI', iconType: 'roi' },
          { id: 'rent', title: 'Пассивный доход от аренды', desc: 'Высокий арендный спрос в центре Бишкека с доходностью 8–11% годовых в валюте.', badge: 'Арендный бизнес', iconType: 'rent' },
          { id: 'safe', title: 'Сохранение капитала', desc: 'Защита сбережений от девальвации и инфляции в монолитно-кирпичных домах.', badge: 'Надежность', iconType: 'safe' },
        ],
      },
      {
        stepNum: 2,
        question: 'Какой способ оплаты наиболее комфортен?',
        subtitle: 'Все программы действуют напрямую от застройщика EL ORDO GROUP без участия банков.',
        options: [
          { id: 'installment', title: 'Рассрочка 0% до 36 месяцев', desc: 'Первый взнос от 20–30%, остаток равными долями без банковских переплат и справок.', badge: 'Без переплат', iconType: 'installment' },
          { id: 'cash', title: '100% расчет с максимальной скидкой', desc: 'Индивидуальный дисконт от руководства за квадратный метр и ДДУ за 24 часа.', badge: 'Макс. выгода', iconType: 'cash' },
          { id: 'tradein', title: 'Trade-in (обмен авто или квартиры)', desc: 'Честная рыночная оценка вашего автомобиля за 24 часа в счет первого взноса.', badge: 'Бартер', iconType: 'tradein' },
        ],
      },
      {
        stepNum: 3,
        question: 'Какое количество комнат и площадь рассматриваете?',
        subtitle: 'Выберите оптимальное пространство для комфортного проживания.',
        options: [
          { id: 'r1', title: '1-комнатная квартира', desc: 'Эргономичная площадь 42 – 55 м². Уютная спальня и просторная кухня-гостиная.', badge: 'Хит продаж', iconType: 'r1' },
          { id: 'r2', title: '2-комнатная квартира', desc: 'Оптимальная площадь 68 – 84 м². Раздельные комнаты, панорамные лоджии, два санузла.', badge: 'Для семьи', iconType: 'r2' },
          { id: 'r3', title: '3-комнатная квартира', desc: 'Премиальная площадь 88 – 120 м². Мастер-спальня, гардеробные и видовые окна на горы.', badge: 'Макс. простор', iconType: 'r3' },
        ],
      },
      {
        stepNum: 4,
        question: 'Какой приоритет по локации для вас важнее?',
        subtitle: 'Мы подберем комплекс в наиболее подходящем районе столицы.',
        options: [
          { id: 'center', title: 'Центр и престижный район', desc: 'Рядом с главными деловыми центрами, парками и ресторанами столицы.', badge: 'Статус', iconType: 'center' },
          { id: 'eco', title: 'Эко-предгорье и чистый воздух', desc: 'Южная экологическая зона (с. Кок-Жар), свежий бриз с гор и тишина.', badge: 'Экология', iconType: 'eco' },
          { id: 'mountains', title: 'Панорамный вид на горы Ала-Тоо', desc: 'Высокие видовые этажи с захватывающим обзором на снежные вершины.', badge: 'Панорама', iconType: 'mountains' },
        ],
      },
    ],
  },
  kg: {
    badge: 'Акылдуу тандоо системасы',
    heading: '60 секундда идеалдуу батириңизди тандаңыз',
    subheading: '4 жөнөкөй суроого жооп бериңиз — алгоритм жеке каржылык шарттарды эсептеп, мыкты пландарды сунуштайт.',
    stepOf: '{current}-кадам, бардыгы {total}',
    btnBack: 'Артка',
    btnNext: 'Алга',
    btnRestart: 'Кайра баштоо',
    resultBadge: 'Сиздин жеке тандооңуз',
    resultTitle: 'Биз ылайыктуу турак жай комплексин таптык',
    resultDesc: 'Сиз тандаган параметрлердин негизинде алдын ала төлөм эсептөөсү түзүлдү:',
    matchedBadge: 'Дал келүү 98%',
    estPriceLabel: 'Болжолдуу наркы:',
    estMonthlyLabel: 'Ай сайын төлөм (банксыз 0%):',
    estDownLabel: 'Баштапкы төлөм (30%):',
    btnWa: 'Пландарды жана шахматканы WhatsApp-тан алуу',
    btnPdf: 'Толук PDF эсебин көчүрүп алуу',
    btnExplore: 'Комплекстин барагына өтүү',
    liveRatePrefix: 'УБ онлайн курсу:',
    somSuffix: 'сом',
    steps: [
      {
        stepNum: 1,
        question: 'Кыймылсыз мүлктү кандай максатта тандап жатасыз?',
        subtitle: 'Бул үйдүн классын, планын жана артыкчылыктарын аныктоого жардам берет.',
        options: [
          { id: 'family', title: 'Үй-бүлө менен жашоо үчүн', desc: 'Кенен бөлмөлөр, унаасыз коопсуз короо, бала бакча жана мектептер жанында.', badge: 'Ыңгайлуулук', iconType: 'family' },
          { id: 'roi', title: 'Инвестиция жана кайра сатуу', desc: 'Баштапкы этапта сатып алып, үй тапшырылганга чейин 25–35% пайда табуу.', badge: 'Жогорку ROI', iconType: 'roi' },
          { id: 'rent', title: 'Ижарадан пассивдүү киреше', desc: 'Борбордо ижарага туруктуу суроо-талап, жылына 8–11% валюталык киреше.', badge: 'Ижара бизнеси', iconType: 'rent' },
          { id: 'safe', title: 'Каражатты сактоо', desc: 'Капиталды инфляциядан бышкан кыштан курулган бекем үйлөрдө коргоо.', badge: 'Ишенимдүүлүк', iconType: 'safe' },
        ],
      },
      {
        stepNum: 2,
        question: 'Кайсы төлөм ыкмасы сизге ыңгайлуу?',
        subtitle: 'Бардык программалар EL ORDO GROUP куруучусунан түздөн-түз банксыз иштейт.',
        options: [
          { id: 'installment', title: '36 айга чейин 0% бөлүп төлөө', desc: 'Баштапкы взнос 20–30%, калганы ашыкча үстөксүз жана маалымкатсыз.', badge: 'Ашыкча төлөмсүз', iconType: 'installment' },
          { id: 'cash', title: '100% төлөм максималдуу арзандатуу менен', desc: 'Жетекчиликтен чарчы метрге жеке дисконт жана 24 саатта ДДУ түзүү.', badge: 'Макс. пайда', iconType: 'cash' },
          { id: 'tradein', title: 'Trade-in (унаа же батир алмашуу)', desc: 'Унааңызды 24 саатта базар баасында биринчи взнос катары эсепке алуу.', badge: 'Бартер', iconType: 'tradein' },
        ],
      },
      {
        stepNum: 3,
        question: 'Канча бөлмөлүү жана кайсы аянтты каалайсыз?',
        subtitle: 'Ыңгайлуу жашоо үчүн керектүү мейкиндикти тандаңыз.',
        options: [
          { id: 'r1', title: '1 бөлмөлүү батир', desc: 'Ыңгайлуу аянт 42 – 55 м². Ыңгайлуу уктоочу бөлмө жана кенен ашкана.', badge: 'Хит сатуу', iconType: 'r1' },
          { id: 'r2', title: '2 бөлмөлүү батир', desc: 'Оптималдуу аянт 68 – 84 м². Бөлүнгөн бөлмөлөр, лоджия жана эки санузел.', badge: 'Үй-бүлөгө', iconType: 'r2' },
          { id: 'r3', title: '3 бөлмөлүү батир', desc: 'Премиум аянт 88 – 120 м². Мастер-уктоочу бөлмө жана тоолорго караган терезелер.', badge: 'Кенен мейкиндик', iconType: 'r3' },
        ],
      },
      {
        stepNum: 4,
        question: 'Жайгашуусу боюнча кайсы артыкчылык маанилүү?',
        subtitle: 'Сиз каалаган аймактан ылайыктуу комплексти сунуштайбыз.',
        options: [
          { id: 'center', title: 'Борбор жана престиждүү аймак', desc: 'Ишкердик борборлорго, сейил бактарга жана ресторандарга жакын.', badge: 'Статус', iconType: 'center' },
          { id: 'eco', title: 'Эко-тоо этеги жана таза аба', desc: 'Түштүк экологиялык аймак (Көк-Жар а.), тоо шамалы жана тынчтык.', badge: 'Экология', iconType: 'eco' },
          { id: 'mountains', title: 'Ала-Тоо тоолоруна панорамалык көрүнүш', desc: 'Ак карлуу тоолорго караган кооз көрүнүшү бар жогорку кабаттар.', badge: 'Панорама', iconType: 'mountains' },
        ],
      },
    ],
  },
  kz: {
    badge: 'Ақылды таңдау жүйесі',
    heading: '60 секундта мінсіз пәтеріңізді таңдаңыз',
    subheading: '4 қарапайым сұраққа жауап беріңіз — жеке қаржылық шарттар мен тиімді жоспарларды есептеп береміз.',
    stepOf: '{current} / {total} қадам',
    btnBack: 'Артқа',
    btnNext: 'Алға',
    btnRestart: 'Қайта бастау',
    resultBadge: 'Сізге ұсынылған нәтиже',
    resultTitle: 'Біз оңтайлы тұрғын үй кешенін анықтадық',
    resultDesc: 'Сіздің таңдауыңыз бойынша дайын есептеу мен видовой қабаттар:',
    matchedBadge: 'Сәйкестік 98%',
    estPriceLabel: 'Болжамды бағасы:',
    estMonthlyLabel: 'Ай сайынғы төлем (банксіз 0%):',
    estDownLabel: 'Бастапқы жарна (30%):',
    btnWa: 'WhatsApp арқылы жоспарлар мен шахматканы алу',
    btnPdf: 'Толық PDF есебін жүктеп алу',
    btnExplore: 'Кешен парақшасына өту',
    liveRatePrefix: 'ҰБ онлайн бағамы:',
    somSuffix: 'сом',
    steps: [
      {
        stepNum: 1,
        question: 'Жылжымайтын мүлікті қандай мақсатпен таңдайсыз?',
        subtitle: 'Бұл кешеннің деңгейі мен тиімді параметрлерін анықтауға көмектеседі.',
        options: [
          { id: 'family', title: 'Отбасымен тұру үшін', desc: 'Кең бөлмелер, көліксіз қауіпсіз жабық аула, мектеп пен балабақшалар.', badge: 'Жайлылық', iconType: 'family' },
          { id: 'roi', title: 'Инвестиция және қайта сату', desc: 'Құрылыс барысында сатып алып, нысан өткенде 25–35% капиталды көбейту.', badge: 'Жоғары ROI', iconType: 'roi' },
          { id: 'rent', title: 'Жалға беруден тұрақты табыс', desc: 'Бішкек орталығында жоғары сұраныс, валютада жылдық 8–11% табыстылық.', badge: 'Жалға беру', iconType: 'rent' },
          { id: 'safe', title: 'Капиталды сақтау', desc: 'Қаражатты инфляциядан сапалы күйдірілген кірпіш үйлерде қорғау.', badge: 'Сенімділік', iconType: 'safe' },
        ],
      },
      {
        stepNum: 2,
        question: 'Қай төлем тәсілі сізге ыңғайлы?',
        subtitle: 'Барлық бағдарламалар EL ORDO GROUP құрылыс салушысынан банксіз ұсынылады.',
        options: [
          { id: 'installment', title: '36 айға дейін 0% бөліп төлеу', desc: 'Бастапқы жарна 20–30%, қалғаны пайызсыз және артық төлемсіз.', badge: 'Үстемесіз', iconType: 'installment' },
          { id: 'cash', title: '100% төлем максималды жеңілдікпен', desc: 'Басшылықтан чаршы метрге жеке дисконт және 24 сағатта ДДУ рәсімдеу.', badge: 'Макс. пайда', iconType: 'cash' },
          { id: 'tradein', title: 'Trade-in (көлік немесе пәтер алмасу)', desc: 'Көлігіңізді 24 сағатта нарықтық бағамен бастапқы жарнаға есептеу.', badge: 'Бартер', iconType: 'tradein' },
        ],
      },
      {
        stepNum: 3,
        question: 'Қанша бөлме мен ауданды қарастырасыз?',
        subtitle: 'Ыңғайлы тұрмыс үшін керекті көлемді таңдаңыз.',
        options: [
          { id: 'r1', title: '1 бөлмелі пәтер', desc: 'Қолайлы аудан 42 – 55 м². Ыңғайлы жатын бөлме мен кең қонақжай.', badge: 'Хит сатылым', iconType: 'r1' },
          { id: 'r2', title: '2 бөлмелі пәтер', desc: 'Оңтайлы аудан 68 – 84 м². Бөлек бөлмелер, лоджия және екі санитарлық торап.', badge: 'Отбасыға', iconType: 'r2' },
          { id: 'r3', title: '3 бөлмелі пәтер', desc: 'Премиум аудан 88 – 120 м². Мастер-жатын бөлме және тауға қарайтын панорама.', badge: 'Кең көлем', iconType: 'r3' },
        ],
      },
      {
        stepNum: 4,
        question: 'Орналасу бойынша қандай басымдық маңызды?',
        subtitle: 'Қалаған ауданыңыздан ең қолайлы нысанды таңдаймыз.',
        options: [
          { id: 'center', title: 'Орталық және беделді аудан', desc: 'Іскерлік орталықтарға, саябақтарға жақын инфрақұрылым.', badge: 'Мәртебе', iconType: 'center' },
          { id: 'eco', title: 'Эко-бөктер және таза ауа', desc: 'Оңтүстік экологиялық аймақ (Көк-Жар а.), тау самалы мен тыныштық.', badge: 'Экология', iconType: 'eco' },
          { id: 'mountains', title: 'Ала-Тоо тауларына панорама', desc: 'Қар басқан биік шыңдарға қарайтын әдемі жоғарғы қабаттар.', badge: 'Панорама', iconType: 'mountains' },
        ],
      },
    ],
  },
  uk: {
    badge: 'Розумний підбір квартири',
    heading: 'Підберіть ідеальну квартиру за 60 секунд',
    subheading: 'Дайте відповідь на 4 прості запитання — алгоритм розрахує умови розстрочки та покаже кращі варіанти.',
    stepOf: 'Крок {current} з {total}',
    btnBack: 'Назад',
    btnNext: 'Далі',
    btnRestart: 'Пройти заново',
    resultBadge: 'Ваш персональний розрахунок',
    resultTitle: 'Ми підібрали ідеальний житловий комплекс',
    resultDesc: 'На основі ваших відповідей сформовано точний фінансовий розрахунок:',
    matchedBadge: 'Збіг 98%',
    estPriceLabel: 'Орієнтовна вартість:',
    estMonthlyLabel: 'Платіж на місяць (0% без банку):',
    estDownLabel: 'Перший внесок (30%):',
    btnWa: 'Отримати планування та шахматку у WhatsApp',
    btnPdf: 'Завантажити повний розрахунок у PDF',
    btnExplore: 'Сторінка комплексу',
    liveRatePrefix: 'Курс НБКР онлайн:',
    somSuffix: 'сом',
    steps: [
      {
        stepNum: 1,
        question: 'З якою метою ви обираєте нерухомість?',
        subtitle: 'Це дозволить визначити клас житла та ключові переваги.',
        options: [
          { id: 'family', title: 'Для життя родини', desc: 'Просторі кімнати, безпечний закритий двір без авто, садочки поруч.', badge: 'Затишок', iconType: 'family' },
          { id: 'roi', title: 'Інвестиції та перепродаж', desc: 'Купівля на початковому етапі з приростом вартості 25–35% до здачі.', badge: 'Високий ROI', iconType: 'roi' },
          { id: 'rent', title: 'Дохід від оренди', desc: 'Високий попит у центрі Бішкека з валютною прибутковістю 8–11% річних.', badge: 'Оренда', iconType: 'rent' },
          { id: 'safe', title: 'Збереження капіталу', desc: 'Надійний захист заощаджень від інфляції в монолітно-цегляних будинках.', badge: 'Надійність', iconType: 'safe' },
        ],
      },
      {
        stepNum: 2,
        question: 'Який спосіб оплати для вас найзручніший?',
        subtitle: 'Усі програми діють безпосередньо від забудовника EL ORDO GROUP без банку.',
        options: [
          { id: 'installment', title: 'Розстрочка 0% до 36 місяців', desc: 'Перший внесок 20–30%, залишок без відсотків і переплат.', badge: 'Без відсотків', iconType: 'installment' },
          { id: 'cash', title: '100% оплата з максимальною знижкою', desc: 'Індивідуальний дисконт від керівництва та ДДУ за 24 години.', badge: 'Макс. вигода', iconType: 'cash' },
          { id: 'tradein', title: 'Trade-in (обмін авто або квартири)', desc: 'Чесна ринкова оцінка авто за 24 години у рахунок першого внеску.', badge: 'Бартер', iconType: 'tradein' },
        ],
      },
      {
        stepNum: 3,
        question: 'Скільки кімнат та яку площу розглядаєте?',
        subtitle: 'Оберіть потрібний простір для життя.',
        options: [
          { id: 'r1', title: '1-кімнатна квартира', desc: 'Функціональна площа 42 – 55 м². Спальня та простора кухня-вітальня.', badge: 'Хіт продажів', iconType: 'r1' },
          { id: 'r2', title: '2-кімнатна квартира', desc: 'Оптимальна площа 68 – 84 м². Окремі кімнати, лоджія, два санвузли.', badge: 'Для сім’ї', iconType: 'r2' },
          { id: 'r3', title: '3-кімнатна квартира', desc: 'Преміальна площа 88 – 120 м². Майстер-спальня та панорама на гори.', badge: 'Макс. простір', iconType: 'r3' },
        ],
      },
      {
        stepNum: 4,
        question: 'Який пріоритет за локацією важливіший?',
        subtitle: 'Підберемо житловий комплекс у бажаному районі Бішкека.',
        options: [
          { id: 'center', title: 'Центр та престижний район', desc: 'Поруч із бізнес-центрами, скверами та ресторанами столиці.', badge: 'Статус', iconType: 'center' },
          { id: 'eco', title: 'Еко-передгір’я та чисте повітря', desc: 'Південна зона (с. Кок-Жар), свіжий вітер з гір та спокій.', badge: 'Екологія', iconType: 'eco' },
          { id: 'mountains', title: 'Панорамний краєвид на Ала-Тоо', desc: 'Видові верхні поверхи із захоплюючим краєвидом на засніжені гори.', badge: 'Панорама', iconType: 'mountains' },
        ],
      },
    ],
  },
  en: {
    badge: 'AI Property Matcher',
    heading: 'Find Your Ideal Home in 60 Seconds',
    subheading: 'Answer 4 quick questions — our algorithm will generate tailored financial terms and match the best available floor plans.',
    stepOf: 'Step {current} of {total}',
    btnBack: 'Back',
    btnNext: 'Continue',
    btnRestart: 'Restart Quiz',
    resultBadge: 'Your Personalized Match',
    resultTitle: 'We Found Your Optimal Development',
    resultDesc: 'Based on your criteria, here are your preliminary financing figures and available panoramic units:',
    matchedBadge: '98% Best Match',
    estPriceLabel: 'Estimated Total Price:',
    estMonthlyLabel: 'Monthly Payment (0% Developer Plan):',
    estDownLabel: 'Down Payment (30%):',
    btnWa: 'Get Floor Plans & Availability on WhatsApp',
    btnPdf: 'Download Full PDF Quote',
    btnExplore: 'View Development Page',
    liveRatePrefix: 'Live NBKR Rate:',
    somSuffix: 'KGS',
    steps: [
      {
        stepNum: 1,
        question: 'What is your primary goal for acquiring property?',
        subtitle: 'This defines the optimal building class, architectural layout, and lifestyle features.',
        options: [
          { id: 'family', title: 'Family Residence', desc: 'Generous layouts, private car-free gated courtyards, schools nearby.', badge: 'Family Living', iconType: 'family' },
          { id: 'roi', title: 'Capital Growth (ROI)', desc: 'Early-stage entry yielding 25% to 35% capital appreciation by commissioning.', badge: 'High ROI', iconType: 'roi' },
          { id: 'rent', title: 'Rental Yield', desc: 'High tenant demand in central Bishkek with 8–11% annual yields in hard currency.', badge: 'Rental Business', iconType: 'rent' },
          { id: 'safe', title: 'Capital Preservation', desc: 'Hedge against currency fluctuations in solid monolithic baked-brick developments.', badge: 'Security', iconType: 'safe' },
        ],
      },
      {
        stepNum: 2,
        question: 'Which payment option best suits your budget?',
        subtitle: 'All financing plans are provided directly by developer EL ORDO GROUP with no banking fees.',
        options: [
          { id: 'installment', title: '0% Installment up to 36 Months', desc: '20–30% initial deposit, zero interest markup, no income certificates.', badge: 'Zero Interest', iconType: 'installment' },
          { id: 'cash', title: '100% Upfront with Executive Discount', desc: 'Maximum personalized rate reduction per square meter and deeds in 24 hours.', badge: 'Best Price', iconType: 'cash' },
          { id: 'tradein', title: 'Trade-In (Vehicle or Property Swap)', desc: 'Fair market evaluation of your vehicle within 24 hours credited to deposit.', badge: 'Trade-in', iconType: 'tradein' },
        ],
      },
      {
        stepNum: 3,
        question: 'Which apartment format and size do you require?',
        subtitle: 'Select the optimal space tailored to your lifestyle.',
        options: [
          { id: 'r1', title: '1-Room Apartment', desc: 'Smart layouts 42 – 55 m². Private bedroom and expansive kitchen-living area.', badge: 'Bestseller', iconType: 'r1' },
          { id: 'r2', title: '2-Room Apartment', desc: 'Optimal size 68 – 84 m². Separate rooms, dual bathrooms, panoramic balconies.', badge: 'Family Choice', iconType: 'r2' },
          { id: 'r3', title: '3-Room Apartment', desc: 'Executive space 88 – 120 m². Master suite, dressing rooms, mountain views.', badge: 'Spacious', iconType: 'r3' },
        ],
      },
      {
        stepNum: 4,
        question: 'Which location priority matters most to you?',
        subtitle: 'We will match you with the most suitable residential address in Bishkek.',
        options: [
          { id: 'center', title: 'Downtown & Prestigious Hub', desc: 'Adjacent to capital business centers, embassies, parks, and gourmet dining.', badge: 'Prime Status', iconType: 'center' },
          { id: 'eco', title: 'Eco Foothills & Pure Air', desc: 'Southern green enclave (Kok-Jar village), refreshing alpine breeze, tranquility.', badge: 'Eco Living', iconType: 'eco' },
          { id: 'mountains', title: 'Panoramic Ala-Too Mountain View', desc: 'Upper panoramic floors featuring unobstructed vistas of snowcapped peaks.', badge: 'Panoramas', iconType: 'mountains' },
        ],
      },
    ],
  },
  zh: {
    badge: '智能置业助手',
    heading: '60秒测算最适合您的理想居所',
    subheading: '回答4个简单问题 — 系统将智能测算专属付款方案，并推荐当期可售的高品质房源。',
    stepOf: '第 {current} 步 / 共 {total} 步',
    btnBack: '上一步',
    btnNext: '下一步',
    btnRestart: '重新测试',
    resultBadge: '您的专属匹配方案',
    resultTitle: '已为您甄选契合度最高的楼盘',
    resultDesc: '依据您的置业偏好，系统已为您生成初步的免息测算与推荐房源：',
    matchedBadge: '契合度 98%',
    estPriceLabel: '参考总价：',
    estMonthlyLabel: '每月还款金额（开发商0%免息）：',
    estDownLabel: '首付款（30%）：',
    btnWa: '在 WhatsApp 中获取详细户型图册与销控表',
    btnPdf: '一键下载完整 PDF 预算单',
    btnExplore: '查看该楼盘详情主页',
    liveRatePrefix: '央行实时汇率：',
    somSuffix: '索姆',
    steps: [
      {
        stepNum: 1,
        question: '您的主要置业目的是什么？',
        subtitle: '这将协助我们精确定位适合的楼盘层级与户型设计。',
        options: [
          { id: 'family', title: '品质自住 / 改善居所', desc: '开阔方正格局，人车分流安全庭院，周边配套知名中小学及幼儿园。', badge: '尊享宜居', iconType: 'family' },
          { id: 'roi', title: '资产增值 / 早期投资', desc: '工程初期全款建仓锁定底价，至综合交付预计可实现 25% 至 35% 净值增长。', badge: '高回报 ROI', iconType: 'roi' },
          { id: 'rent', title: '长期稳定租金收益', desc: '首都核心区商旅租客需求旺盛，年化硬通货租金回报率达 8%–11%。', badge: '租金回报', iconType: 'rent' },
          { id: 'safe', title: '抗通胀与资产避险', desc: '现浇实心烧结砖实体高品质建筑，有效抵御通胀，传承家族恒产。', badge: '稳健安全', iconType: 'safe' },
        ],
      },
      {
        stepNum: 2,
        question: '您更倾向于哪种付款结算模式？',
        subtitle: '所有付款政策均由开发商 EL ORDO GROUP 直签直销，无中介费及银行高息。',
        options: [
          { id: 'installment', title: '0% 最长36个月免息分期', desc: '首付仅需20%–30%，余款按月等额均摊，无需收入流水及担保。', badge: '完全免息', iconType: 'installment' },
          { id: 'cash', title: '一次性全款享顶格特惠', desc: '直享开发商高管特批平米单价折扣，24小时极速完成官方合同备案。', badge: '底价优惠', iconType: 'cash' },
          { id: 'tradein', title: '以旧换新置换 (Trade-in)', desc: '现有汽车24小时内按公允市价评估，直接全额冲抵新房首期款项。', badge: '置换抵扣', iconType: 'tradein' },
        ],
      },
      {
        stepNum: 3,
        question: '您青睐的居室数量与建筑面积？',
        subtitle: '挑选契合家庭生活习惯的理想空间尺度。',
        options: [
          { id: 'r1', title: '经典精致一居室', desc: '功能面积 42 – 55 м²。独立温馨主卧，配有通透开阔餐客厅一体空间。', badge: '热销户型', iconType: 'r1' },
          { id: 'r2', title: '舒适两居室', desc: '黄金面积 68 – 84 м²。动静分区，南北通透，配全景观景阳台与双卫浴。', badge: '家庭首选', iconType: 'r2' },
          { id: 'r3', title: '尊享三居室', desc: '宽境平层 88 – 120 м²。豪华套房主卧，双独立衣帽间，雪山天幕视野。', badge: '奢阔大宅', iconType: 'r3' },
        ],
      },
      {
        stepNum: 4,
        question: '您对楼盘地理区位有哪些特别偏好？',
        subtitle: '我们将为您智能匹配首都最适宜的宜居地块。',
        options: [
          { id: 'center', title: '市政核心与繁华商务区', desc: '坐落于比什凯克核心地段，毗邻高级使馆区、城市公园与顶级餐饮。', badge: '核心地标', iconType: 'center' },
          { id: 'eco', title: '生态麓区与富氧清新空气', desc: '城南生态纯氧居住板块 (Kok-Jar麓区)，畅享清爽山风与静谧生活。', badge: '鲜氧宜居', iconType: 'eco' },
          { id: 'mountains', title: '阿拉套雪山无遮挡开阔视野', desc: '臻选高区全景观景楼层，天幕窗前尽揽终年积雪巍峨雪山画卷。', badge: '全景视野', iconType: 'mountains' },
        ],
      },
    ],
  },
};

interface MatchedProject {
  slug: string;
  name: string;
  classType: string;
  address: string;
  image: string;
  unitTitle: string;
  unitArea: number;
  totalPriceUsd: number;
}

export default function SmartApartmentQuiz() {
  const { locale } = useLanguage();
  const lang: Locale = (locale as Locale) || 'ru';
  const c = QUIZ_TRANSLATIONS[lang] || QUIZ_TRANSLATIONS.ru;

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({
    0: 'family',
    1: 'installment',
    2: 'r2',
    3: 'center',
  });
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [paymentMode, setPaymentMode] = useState<'monthly' | 'quarterly' | 'cash'>('monthly');
  const [usdRate, setUsdRate] = useState<number>(87.45);
  const [rateDate, setRateDate] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    fetch('/api/currency')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.rate && typeof data.rate === 'number') {
          setUsdRate(data.rate);
          if (data.date) setRateDate(data.date);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const totalSteps = c.steps.length;
  const currentStep = c.steps[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentStepIndex]: optionId }));
    if (currentStepIndex === 1) {
      if (optionId === 'cash') setPaymentMode('cash');
      else setPaymentMode('monthly');
    }
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  // Определение подобранного ЖК
  const matchedProject: MatchedProject = useMemo(() => {
    const locPref = answers[3] || 'center';
    const roomPref = answers[2] || 'r2';

    // 1. ЖК Abu Dhabi
    if (locPref === 'center' || locPref === 'mountains' || answers[0] === 'roi') {
      let area = 49.48;
      let price = 81642;
      let title = '1-комнатная квартира';
      if (roomPref === 'r2') {
        area = 78.3;
        price = 129195;
        title = '2-комнатная видовая квартира';
      } else if (roomPref === 'r3') {
        area = 119.32;
        price = 196878;
        title = '3-комнатный премиум-пентхаус';
      }

      return {
        slug: 'abu-dhabi',
        name: 'ЖК Abu Dhabi',
        classType: 'Премиум-класс • Сухомлинова, 29',
        address: 'г. Бишкек, ул. Сухомлинова, 29 (рядом с парком)',
        image: '/projects/Abu-Dhabi.png',
        unitTitle: title,
        unitArea: area,
        totalPriceUsd: price,
      };
    }

    // 2. ЖД Айкол +
    if (locPref === 'eco') {
      let area = 42.0;
      let price = 50400;
      let title = '1-комнатная эко-квартира';
      if (roomPref === 'r2') {
        area = 74.3;
        price = 89160;
        title = '2-комнатная квартира с террасой';
      } else if (roomPref === 'r3') {
        area = 88.5;
        price = 106200;
        title = '3-комнатная просторная квартира';
      }

      return {
        slug: 'ajkol-plus',
        name: 'ЖД Айкол +',
        classType: 'Комфорт+ • с. Кок-Жар',
        address: 'с. Кок-Жар, ул. Баялинова, 6',
        image: '/projects/Aikolplus.png',
        unitTitle: title,
        unitArea: area,
        totalPriceUsd: price,
      };
    }

    // 3. ЖК Madina Residence
    let area = 43.59;
    let price = 65385;
    let title = '1-комнатная бизнес-квартира';
    if (roomPref === 'r2') {
      area = 68.2;
      price = 102300;
      title = '2-комнатная квартира в центре';
    } else if (roomPref === 'r3') {
      area = 92.4;
      price = 138600;
      title = '3-комнатная семейная квартира';
    }

    return {
      slug: 'madina-residence',
      name: 'ЖК Madina Residence',
      classType: 'Бизнес-класс • ул. Огонбаева, 12',
      address: 'г. Бишкек, ул. Огонбаева, 12',
      image: '/projects/Madina-Residense.png',
      unitTitle: title,
      unitArea: area,
      totalPriceUsd: price,
    };
  }, [answers]);

  // Финансовый расчет на основе выбранного режима (monthly, quarterly, cash)
  const financialCalc = useMemo(() => {
    let finalPrice = matchedProject.totalPriceUsd;
    if (paymentMode === 'cash') {
      finalPrice = Math.round(finalPrice * 0.94); // 6% скидка
      return {
        totalPrice: finalPrice,
        downPayment: finalPrice,
        paymentPerPeriod: 0,
        numberOfPayments: 1,
        frequency: 'monthly' as const,
        months: 0,
        isCash: true,
      };
    }

    const downPayment = Math.round(finalPrice * 0.3);
    const balance = finalPrice - downPayment;

    if (paymentMode === 'quarterly') {
      const numberOfPayments = 12; // 36 месяцев / 3
      const perQuarter = Math.round(balance / numberOfPayments);
      return {
        totalPrice: finalPrice,
        downPayment,
        paymentPerPeriod: perQuarter,
        numberOfPayments,
        frequency: 'quarterly' as const,
        months: 36,
        isCash: false,
      };
    }

    // По умолчанию 36 месяцев ежемесячно
    const numberOfPayments = 36;
    const perMonth = Math.round(balance / numberOfPayments);
    return {
      totalPrice: finalPrice,
      downPayment,
      paymentPerPeriod: perMonth,
      numberOfPayments,
      frequency: 'monthly' as const,
      months: 36,
      isCash: false,
    };
  }, [matchedProject, paymentMode]);

  // Генерация ПОЛНОГО графика выплат на все 36 месяцев
  const fullPaymentSchedule = useMemo(() => {
    if (financialCalc.isCash) {
      return [
        {
          num: 1,
          period: 'Единоразово (100% расчет со скидкой 6%)',
          paymentUsd: financialCalc.totalPrice,
          paymentKgs: Math.round(financialCalc.totalPrice * usdRate),
          balanceUsd: 0,
        },
      ];
    }

    const schedule = [];
    const remaining = financialCalc.totalPrice - financialCalc.downPayment;
    let currentBalance = remaining;

    for (let i = 1; i <= financialCalc.numberOfPayments; i++) {
      const isLast = i === financialCalc.numberOfPayments;
      const currentPay = isLast ? currentBalance : financialCalc.paymentPerPeriod;
      currentBalance = Math.max(0, currentBalance - currentPay);

      schedule.push({
        num: i,
        period: financialCalc.frequency === 'monthly' ? `${i} мес.` : `${i * 3} мес. (${i} кв.)`,
        paymentUsd: currentPay,
        paymentKgs: Math.round(currentPay * usdRate),
        balanceUsd: currentBalance,
      });
    }

    return schedule;
  }, [financialCalc, usdRate]);

  // Скачивание ПОЛНОГО расчета в PDF
  const handleDownloadPdf = () => {
    exportPdfQuote({
      apartmentPrice: financialCalc.totalPrice,
      downPaymentAmount: financialCalc.downPayment,
      downPaymentPercent: financialCalc.isCash ? 100 : 30,
      months: financialCalc.months,
      frequency: financialCalc.frequency,
      paymentPerPeriodUsd: financialCalc.paymentPerPeriod,
      usdRate,
      rateDate,
      selectedApartment: {
        complex: matchedProject.name,
        rooms: answers[2] === 'r1' ? 1 : answers[2] === 'r3' ? 3 : 2,
        area: matchedProject.unitArea,
        floor: 'Видовые этажи',
        priceM2: Math.round(financialCalc.totalPrice / matchedProject.unitArea),
      },
      paymentSchedule: fullPaymentSchedule,
    });
  };

  // WhatsApp-сообщение с параметрами
  const waUrl = useMemo(() => {
    const modeText =
      paymentMode === 'cash'
        ? '100% расчет со скидкой'
        : paymentMode === 'quarterly'
        ? 'Поквартальная рассрочка 0% (12 выплат)'
        : 'Ежемесячная рассрочка 0% (36 месяцев)';

    const text =
      `Здравствуйте! Я прошёл смарт-подбор квартиры на сайте EL ORDO GROUP:\n\n` +
      `• Рекомендованный объект: ${matchedProject.name} (${matchedProject.unitTitle}, ${matchedProject.unitArea} м²)\n` +
      `• Стоимость: $${financialCalc.totalPrice.toLocaleString('ru-RU')} (~${Math.round(financialCalc.totalPrice * usdRate).toLocaleString('ru-RU')} сом)\n` +
      `• Форма оплаты: ${modeText}\n` +
      (!financialCalc.isCash
        ? `• Первый взнос: $${financialCalc.downPayment.toLocaleString('ru-RU')} • Платеж: $${financialCalc.paymentPerPeriod.toLocaleString('ru-RU')}/${paymentMode === 'quarterly' ? 'квартал' : 'мес'}\n\n`
        : '\n') +
      `Отправьте, пожалуйста, официальную презентацию и свободные планировки в WhatsApp.`;

    return `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [matchedProject, financialCalc, paymentMode, usdRate]);

  return (
    <section id="quiz" className="max-w-5xl mx-auto px-4 sm:px-6 my-16 scroll-mt-24">
      <div className="bg-white dark:bg-[#0b1b15] rounded-3xl p-6 sm:p-12 border border-gray-200 dark:border-white/10 shadow-2xl transition-colors relative overflow-hidden">
        
        {/* Фоновые градиенты */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#d4b26f]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#064734]/10 rounded-full blur-3xl pointer-events-none" />

        {/* ШАПКА КВИЗА */}
        <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4b26f]/15 border border-[#d4b26f]/30 text-[#064734] dark:text-[#d4b26f] text-[11px] font-black uppercase tracking-wider mb-3">
            <IconDiamond className="w-3.5 h-3.5" />
            <span>{c.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#064734] dark:text-[#d4b26f]">
            {isCompleted ? c.resultTitle : c.heading}
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-400 mt-2 leading-relaxed">
            {isCompleted ? c.resultDesc : c.subheading}
          </p>
        </div>

        {/* ПРОГРЕСС-БАР */}
        {!isCompleted && (
          <div className="max-w-xl mx-auto mb-8 relative z-10">
            <div className="flex justify-between items-center text-xs font-bold uppercase text-gray-500 dark:text-neutral-400 mb-2">
              <span>{c.stepOf.replace('{current}', String(currentStepIndex + 1)).replace('{total}', String(totalSteps))}</span>
              <span className="text-[#064734] dark:text-[#d4b26f] font-black">{progressPercent}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-gray-200 dark:border-white/10 shadow-inner">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-[#064734] to-[#d4b26f] rounded-full transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* ШАГИ КВИЗА */}
        {!isCompleted ? (
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white">
                {currentStep.question}
              </h3>
              <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                {currentStep.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {currentStep.options.map((option) => {
                const isSelected = answers[currentStepIndex] === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    className={`p-5 rounded-2xl text-left transition-all border cursor-pointer relative group flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] border-transparent shadow-xl scale-[1.01]'
                        : 'bg-white dark:bg-[#071912] border-gray-200 dark:border-white/10 hover:border-[#064734]/40 dark:hover:border-[#d4b26f]/40 text-gray-900 dark:text-white hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-white/20 text-white dark:bg-black/20 dark:text-[#064734]'
                              : 'bg-[#d4b26f]/15 text-[#064734] dark:text-[#d4b26f]'
                          }`}
                        >
                          {option.badge}
                        </span>

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-white dark:border-[#064734] bg-white dark:bg-[#064734]'
                              : 'border-gray-300 dark:border-white/20'
                          }`}
                        >
                          {isSelected && (
                            <IconCheck className="w-3.5 h-3.5 text-[#064734] dark:text-[#d4b26f]" />
                          )}
                        </div>
                      </div>

                      <h4 className="text-base font-black mb-1.5 leading-snug">
                        {option.title}
                      </h4>
                      <p
                        className={`text-xs leading-relaxed ${
                          isSelected ? 'text-white/80 dark:text-[#064734]/85' : 'text-gray-500 dark:text-neutral-400'
                        }`}
                      >
                        {option.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between max-w-3xl mx-auto mt-8 pt-6 border-t border-gray-100 dark:border-white/10">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/15 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                ← {c.btnBack}
              </button>

              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{c.liveRatePrefix} <strong>{usdRate}</strong> {c.somSuffix}/$</span>
              </div>
            </div>
          </div>
        ) : (
          /* РЕЗУЛЬТАТ ПОДБОРА */
          <div className="relative z-10 max-w-3xl mx-auto animate-fadeIn">
            <div className="bg-[#f7faf8] dark:bg-[#040c09] p-6 sm:p-8 rounded-3xl border border-[#064734]/20 dark:border-white/15 shadow-xl">
              
              {/* Верхняя плашка результата с анимированным счетчиком цены */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-white/10">
                <div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 text-[11px] font-black uppercase tracking-wider mb-1">
                    <IconShieldCheck className="w-3.5 h-3.5" />
                    <span>{c.matchedBadge}</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#064734] dark:text-[#d4b26f]">
                    {matchedProject.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">
                    {matchedProject.classType} • {matchedProject.unitTitle} ({matchedProject.unitArea} м²)
                  </p>
                </div>

                <div className="text-right self-stretch sm:self-auto bg-white dark:bg-white/5 p-3 rounded-2xl border border-gray-200 dark:border-white/10">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block">{c.estPriceLabel}</span>
                  <strong className="text-2xl font-black text-[#064734] dark:text-[#d4b26f]">
                    $<AnimatedCounter value={financialCalc.totalPrice} />
                  </strong>
                  <span className="text-[11px] text-gray-500 block">
                    ≈ <AnimatedCounter value={Math.round(financialCalc.totalPrice * usdRate)} /> {c.somSuffix}
                  </span>
                </div>
              </div>

              {/* Интерактивный переключатель условий */}
              <div className="my-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 block mb-2">
                  Формат расчета:
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('monthly')}
                    className={`py-2 px-3 rounded-xl transition-all cursor-pointer border ${
                      paymentMode === 'monthly'
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] border-transparent shadow'
                        : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10'
                    }`}
                  >
                    36 мес. (ежемесячно)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('quarterly')}
                    className={`py-2 px-3 rounded-xl transition-all cursor-pointer border ${
                      paymentMode === 'quarterly'
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] border-transparent shadow'
                        : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10'
                    }`}
                  >
                    Поквартально (12 выплат)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('cash')}
                    className={`py-2 px-3 rounded-xl transition-all cursor-pointer border ${
                      paymentMode === 'cash'
                        ? 'bg-[#064734] dark:bg-[#d4b26f] text-white dark:text-[#064734] border-transparent shadow'
                        : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10'
                    }`}
                  >
                    100% расчет (-6%)
                  </button>
                </div>
              </div>

              {/* Финансовая сетка условий с анимированными счетчиками */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-xs">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10">
                  <span className="text-[11px] text-gray-500 block mb-1">
                    {financialCalc.isCash ? 'Полная сумма:' : c.estDownLabel}
                  </span>
                  <strong className="text-base font-black text-gray-900 dark:text-white">
                    $<AnimatedCounter value={financialCalc.downPayment} />
                  </strong>
                  <span className="text-[10px] text-gray-400 block mt-0.5">
                    ≈ <AnimatedCounter value={Math.round(financialCalc.downPayment * usdRate)} /> {c.somSuffix}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0b1b15] border border-gray-200 dark:border-white/10">
                  <span className="text-[11px] text-gray-500 block mb-1">Срок и график:</span>
                  <strong className="text-base font-black text-gray-900 dark:text-white">
                    {financialCalc.isCash ? 'Единоразово' : `${financialCalc.months} мес. (${financialCalc.numberOfPayments} выплат)`}
                  </strong>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-0.5">
                    0% переплат без банка
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#064734]/10 dark:bg-[#d4b26f]/15 border border-[#064734]/20 dark:border-[#d4b26f]/30">
                  <span className="text-[11px] text-[#064734] dark:text-[#d4b26f] font-bold block mb-1">
                    {financialCalc.isCash ? 'Чистая выгода:' : `Платеж в ${paymentMode === 'quarterly' ? 'квартал' : 'месяц'}:`}
                  </span>
                  <strong className="text-lg font-black text-[#064734] dark:text-[#d4b26f]">
                    $<AnimatedCounter value={financialCalc.isCash ? Math.round(matchedProject.totalPriceUsd * 0.06) : financialCalc.paymentPerPeriod} />
                  </strong>
                  <span className="text-[10px] text-gray-600 dark:text-neutral-300 block mt-0.5 font-semibold">
                    ≈ <AnimatedCounter value={Math.round((financialCalc.isCash ? matchedProject.totalPriceUsd * 0.06 : financialCalc.paymentPerPeriod) * usdRate)} /> {c.somSuffix}
                  </span>
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="space-y-3 pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-[#064734] hover:bg-[#032b20] active:scale-[0.98] text-[#d4b26f] hover:text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer"
                >
                  <IconWhatsApp className="w-5 h-5 text-[#25D366]" />
                  <span>{c.btnWa}</span>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#d4b26f] hover:bg-[#c49f57] active:scale-[0.98] text-[#064734] font-black text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#064734]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{c.btnPdf}</span>
                  </button>

                  <Link
                    href={`/${matchedProject.slug}`}
                    className="w-full py-3.5 px-4 rounded-xl bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/15 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider transition-all border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2"
                  >
                    <span>{c.btnExplore}</span>
                    <IconArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="text-center pt-3">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="text-xs font-bold text-gray-400 hover:text-[#064734] dark:hover:text-[#d4b26f] underline transition-colors cursor-pointer"
                  >
                    ↺ {c.btnRestart}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}