import { COMPANY_INFO, PROJECTS } from '@/lib/data';

export interface PdfQuoteData {
  apartmentPrice: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  months: number;
  frequency: 'monthly' | 'quarterly';
  paymentPerPeriodUsd: number;
  usdRate: number;
  rateDate: string;
  selectedApartment?: {
    complex: string;
    rooms: number;
    area: number;
    floor: string;
    priceM2: number;
  } | null;
  paymentSchedule: Array<{
    num: number;
    period: string;
    paymentUsd: number;
    paymentKgs: number;
    balanceUsd: number;
  }>;
}

// Динамическая загрузка библиотек html2canvas и jsPDF
async function loadPdfDependencies(): Promise<{ html2canvas: any; jsPDF: any }> {
  if (typeof window === 'undefined') throw new Error('Client only execution');

  const loadScript = (src: string, globalCheck: () => any) => {
    return new Promise((resolve, reject) => {
      const existing = globalCheck();
      if (existing) return resolve(existing);

      const script = document.createElement('script');
      script.src = src;
      script.crossOrigin = 'anonymous';
      script.async = true;

      const timeoutId = setTimeout(() => {
        reject(new Error(`Timeout loading PDF dependency: ${src}`));
      }, 10000);

      script.onload = () => {
        clearTimeout(timeoutId);
        resolve(globalCheck());
      };
      script.onerror = () => {
        clearTimeout(timeoutId);
        reject(new Error(`Failed to load ${src}`));
      };

      document.head.appendChild(script);
    });
  };

  await Promise.all([
    loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
      () => (window as any).html2canvas
    ),
    loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
      () => (window as any).jspdf?.jsPDF
    ),
  ]);

  const html2canvas = (window as any).html2canvas;
  const jsPDF = (window as any).jspdf?.jsPDF;

  if (!html2canvas || !jsPDF) {
    throw new Error('PDF generation libraries failed to initialize');
  }

  return { html2canvas, jsPDF };
}

// Генерация PDF в изолированном iframe (без конфликта со стилями Tailwind и lab/oklch)
async function generatePdfFromHtml(htmlContent: string, filename: string) {
  const { html2canvas, jsPDF } = await loadPdfDependencies();

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.left = '-9999px';
  iframe.style.top = '-9999px';
  iframe.style.width = '794px';
  iframe.style.minHeight = '1123px';
  iframe.style.border = 'none';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  document.body.appendChild(iframe);

  try {
    const iframeWin = iframe.contentWindow;
    const iframeDoc = iframe.contentDocument || iframeWin?.document;
    if (!iframeDoc || !iframeWin) {
      throw new Error('Failed to access isolated iframe document');
    }

    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #ffffff;
            color: #1a1a1a;
            font-size: 8.5pt;
            line-height: 1.35;
            padding: 24px 28px;
            width: 794px;
            -webkit-print-color-adjust: exact;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `);
    iframeDoc.close();

    // Пауза для полной отрисовки шрифтов и изображений
    await new Promise((resolve) => setTimeout(resolve, 200));

    const canvas = await html2canvas(iframeDoc.body, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Автоматическая многостраничная нарезка холста при необходимости
    if (pdfHeight <= pageHeight) {
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    } else {
      let heightLeft = pdfHeight;
      let position = 0;

      while (heightLeft > 0) {
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }
    }

    pdf.save(filename);
  } finally {
    if (iframe.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }
  }
}

// 1. Генерация персонального коммерческого предложения рассрочки
export async function exportPdfQuote(data: PdfQuoteData) {
  const quoteNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const totalKgs = Math.round(data.apartmentPrice * data.usdRate);
  const downKgs = Math.round(data.downPaymentAmount * data.usdRate);
  const paymentKgs = Math.round(data.paymentPerPeriodUsd * data.usdRate);

  const todayStr = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Bishkek',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  const phone = COMPANY_INFO?.phones?.[0] || '+996 709 115 115';
  const whatsapp = COMPANY_INFO?.whatsapp || '996709115115';
  const cleanWa = whatsapp.replace(/\D/g, '');
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`https://wa.me/${cleanWa}?text=Здравствуйте! Интересует коммерческое предложение ${quoteNumber}`)}`;

  // Разделение графика на 2 колонки при большом количестве платежей (> 12)
  const isMultiColumn = data.paymentSchedule.length > 12;
  const halfIndex = Math.ceil(data.paymentSchedule.length / 2);
  const col1 = isMultiColumn ? data.paymentSchedule.slice(0, halfIndex) : data.paymentSchedule;
  const col2 = isMultiColumn ? data.paymentSchedule.slice(halfIndex) : [];

  const html = `
    <!-- ШАПКА -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #064734; padding-bottom: 8px; margin-bottom: 10px;">
      <div>
        <div style="font-size: 18pt; font-weight: 900; color: #064734; text-transform: uppercase; letter-spacing: -0.5px;">EL ORDO GROUP</div>
        <div style="font-size: 7.5pt; font-weight: 700; color: #d4b26f; letter-spacing: 1.5px; text-transform: uppercase;">Строительная компания • Официальное предложение</div>
      </div>
      <div style="text-align: right; font-size: 7.5pt; color: #555555; line-height: 1.3;">
        <div>Коммерческое предложение: <strong style="color: #064734;">${quoteNumber}</strong></div>
        <div>Дата формирования: <strong>${todayStr}</strong></div>
        <div>Официальный курс НБКР: <strong style="color: #064734;">${data.usdRate} сом/$</strong></div>
      </div>
    </div>

    <!-- ЗЕЛЕНЫЙ БАННЕР -->
    <div style="background: #064734; color: #ffffff; padding: 8px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <div>
        <div style="font-size: 10.5pt; font-weight: 800; text-transform: uppercase;">Индивидуальный расчет рассрочки 0% от застройщика</div>
        <div style="font-size: 7.5pt; opacity: 0.9; margin-top: 1px;">Прямой договор • Без участия банков • Фиксация стоимости метра в ДДУ</div>
      </div>
      <div style="background: #d4b26f; color: #064734; font-size: 8pt; font-weight: 900; padding: 3px 8px; border-radius: 12px; text-transform: uppercase; white-space: nowrap;">
        0% переплат
      </div>
    </div>

    <!-- ВЫБРАННЫЙ ОБЪЕКТ -->
    ${data.selectedApartment ? `
      <div style="border: 1.5px solid #d4b26f; background: #fdfbf7; border-radius: 6px; padding: 7px 12px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 7pt; font-weight: 700; color: #d4b26f; text-transform: uppercase;">Выбранный объект:</div>
          <div style="font-size: 11.5pt; font-weight: 900; color: #064734;">${data.selectedApartment.complex}</div>
          <div style="font-size: 7.5pt; color: #4a5568; margin-top: 1px;">
            ${data.selectedApartment.rooms}-комнатная квартира • Площадь: <strong>${data.selectedApartment.area} м²</strong> • ${data.selectedApartment.floor}           </div>         </div>         <div style="text-align: right;">           <div style="font-size: 7pt; color: #718096;">Стоимость за м²:</div>           <div style="font-size: 11pt; font-weight: 900; color: #064734;">$${data.selectedApartment.priceM2} / м²</div>
        </div>
      </div>
    ` : ''}

    <!-- КАРТОЧКИ УСЛОВИЙ -->
    <div style="font-size: 8.5pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 6px;">Финансовые параметры покупки:</div>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 10px;">
      <div style="border: 1px solid #e2e8f0; background: #f8faf9; padding: 6px 8px; border-radius: 6px;">
        <div style="font-size: 6.5pt; font-weight: 700; text-transform: uppercase; color: #718096;">Стоимость квартиры</div>
        <div style="font-size: 10.5pt; font-weight: 900; color: #064734;">$${data.apartmentPrice.toLocaleString('ru-RU')}</div>
        <div style="font-size: 6.5pt; color: #718096;">≈ ${totalKgs.toLocaleString('ru-RU')} сом</div>
      </div>
      <div style="border: 1px solid #e2e8f0; background: #f8faf9; padding: 6px 8px; border-radius: 6px;">
        <div style="font-size: 6.5pt; font-weight: 700; text-transform: uppercase; color: #718096;">Первый взнос (${data.downPaymentPercent}%)</div>
        <div style="font-size: 10.5pt; font-weight: 900; color: #064734;">$${data.downPaymentAmount.toLocaleString('ru-RU')}</div>
        <div style="font-size: 6.5pt; color: #718096;">≈ ${downKgs.toLocaleString('ru-RU')} сом</div>
      </div>
      <div style="border: 1px solid #e2e8f0; background: #f8faf9; padding: 6px 8px; border-radius: 6px;">
        <div style="font-size: 6.5pt; font-weight: 700; text-transform: uppercase; color: #718096;">Срок рассрочки</div>
        <div style="font-size: 10.5pt; font-weight: 900; color: #064734;">${data.months > 0 ? `${data.months} мес.` : '100% расчет'}</div>
        <div style="font-size: 6.5pt; color: #718096;">${data.frequency === 'monthly' ? 'Ежемесячно' : 'Поквартально'}</div>
      </div>
      <div style="border: 1.5px solid #064734; background: #eef5f2; padding: 6px 8px; border-radius: 6px;">
        <div style="font-size: 6.5pt; font-weight: 700; text-transform: uppercase; color: #064734;">Платеж в ${data.frequency === 'monthly' ? 'месяц' : 'период'}</div>
        <div style="font-size: 10.5pt; font-weight: 900; color: #064734;">$${data.paymentPerPeriodUsd.toLocaleString('ru-RU')}</div>
        <div style="font-size: 6.5pt; color: #064734; font-weight: 700;">≈ ${paymentKgs.toLocaleString('ru-RU')} сом</div>
      </div>
    </div>

    <!-- ЗАГОЛОВОК ГРАФИКА -->
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
      <div style="font-size: 8.5pt; font-weight: 800; color: #064734; text-transform: uppercase;">
        График выплат беспроцентной рассрочки (${data.paymentSchedule.length} платежей):
      </div>
      <div style="font-size: 7pt; color: #718096; font-style: italic;">
        Переплата: <strong>$0</strong> • Без скрытых комиссий
      </div>
    </div>

    <!-- ТАБЛИЦА ГРАФИКА -->
    ${isMultiColumn ? `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 6.5pt;">
          <thead>
            <tr style="background: #064734; color: #ffffff;">
              <th style="padding: 3px 4px; text-align: left; width: 16px;">№</th>
              <th style="padding: 3px 4px; text-align: left;">Период</th>
              <th style="padding: 3px 4px; text-align: left;">Платеж ($)</th>
              <th style="padding: 3px 4px; text-align: left;">В сомах</th>
              <th style="padding: 3px 4px; text-align: right;">Остаток ($)</th>
            </tr>
          </thead>
          <tbody>
            ${col1.map(r => `
              <tr style="border-bottom: 1px solid #edf2f7; ${r.num % 2 === 0 ? 'background: #f8faf9;' : ''}">
                <td style="padding: 2px 4px;"><strong>${r.num}</strong></td>
                <td style="padding: 2px 4px;">${r.period}</td>
                <td style="padding: 2px 4px;"><strong>$${r.paymentUsd.toLocaleString('ru-RU')}</strong></td>
                <td style="padding: 2px 4px;">≈ ${r.paymentKgs.toLocaleString('ru-RU')} с</td>
                <td style="padding: 2px 4px; text-align: right; color: #718096;">$${r.balanceUsd.toLocaleString('ru-RU')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <table style="width: 100%; border-collapse: collapse; font-size: 6.5pt;">
          <thead>
            <tr style="background: #064734; color: #ffffff;">
              <th style="padding: 3px 4px; text-align: left; width: 16px;">№</th>
              <th style="padding: 3px 4px; text-align: left;">Период</th>
              <th style="padding: 3px 4px; text-align: left;">Платеж ($)</th>
              <th style="padding: 3px 4px; text-align: left;">В сомах</th>
              <th style="padding: 3px 4px; text-align: right;">Остаток ($)</th>
            </tr>
          </thead>
          <tbody>
            ${col2.map(r => `
              <tr style="border-bottom: 1px solid #edf2f7; ${r.num % 2 === 0 ? 'background: #f8faf9;' : ''}">
                <td style="padding: 2px 4px;"><strong>${r.num}</strong></td>
                <td style="padding: 2px 4px;">${r.period}</td>
                <td style="padding: 2px 4px;"><strong>$${r.paymentUsd.toLocaleString('ru-RU')}</strong></td>
                <td style="padding: 2px 4px;">≈ ${r.paymentKgs.toLocaleString('ru-RU')} с</td>
                <td style="padding: 2px 4px; text-align: right; color: #718096;">$${r.balanceUsd.toLocaleString('ru-RU')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : `
      <table style="width: 100%; border-collapse: collapse; font-size: 7.5pt; margin-bottom: 10px;">
        <thead>
          <tr style="background: #064734; color: #ffffff;">
            <th style="padding: 4px 6px; text-align: left; width: 25px;">№</th>
            <th style="padding: 4px 6px; text-align: left;">Период</th>
            <th style="padding: 4px 6px; text-align: left;">Сумма платежа ($)</th>
            <th style="padding: 4px 6px; text-align: left;">Сумма в сомах (НБКР: ${data.usdRate})</th>
            <th style="padding: 4px 6px; text-align: right;">Остаток задолженности</th>
          </tr>
        </thead>
        <tbody>
          ${col1.map(r => `
            <tr style="border-bottom: 1px solid #edf2f7; ${r.num % 2 === 0 ? 'background: #f8faf9;' : ''}">
              <td style="padding: 3px 6px;"><strong>${r.num}</strong></td>
              <td style="padding: 3px 6px;">${r.period}</td>
              <td style="padding: 3px 6px;"><strong>$${r.paymentUsd.toLocaleString('ru-RU')}</strong></td>
              <td style="padding: 3px 6px;">≈ ${r.paymentKgs.toLocaleString('ru-RU')} сом</td>
              <td style="padding: 3px 6px; text-align: right; color: #718096;">$${r.balanceUsd.toLocaleString('ru-RU')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `}

    <!-- ПРЕМИУМ-ФУТЕР С QR-КОДОМ И СТАТУСОМ -->
    <div style="border-top: 1.5px solid #064734; padding-top: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 7pt; color: #555555;">
      <div style="max-width: 620px;">
        <div style="font-size: 7.5pt; font-weight: 800; color: #064734; margin-bottom: 2px;">
          Отдел продаж EL ORDO GROUP: ${phone} • WhatsApp: +${cleanWa}
        </div>
        <div style="line-height: 1.3; color: #718096; font-style: italic;">
          * Расчет носит предварительный характер. Оплата производится в сомах по официальному учетному курсу НБКР на день фактической оплаты. Все договоры подлежат государственной регистрации в Госрегистре КР. Предложение действительно в течение 14 дней.
        </div>
        <div style="margin-top: 2px; color: #064734; font-weight: 700;">Официальный сайт: elordogroup.com • Центральный офис: ${COMPANY_INFO.address}</div>
      </div>

      <div style="text-align: center; margin-left: 14px; flex-shrink: 0;">
        <img src="${qrUrl}" alt="WhatsApp QR" crossorigin="anonymous" style="width: 52px; height: 52px; display: block; margin: 0 auto 2px; border: 1px solid #d4b26f; padding: 2px; border-radius: 4px;" />
        <span style="font-size: 5.5pt; color: #064734; font-weight: 800; text-transform: uppercase;">Связь в WhatsApp</span>
      </div>
    </div>
  `;

  await generatePdfFromHtml(html, `Raschet_EL_ORDO_${quoteNumber}.pdf`);
}

// 2. Генерация официального каталога и презентации компании
export async function downloadCompanyBrochurePdf(usdRate: number = 87.45) {
  const todayStr = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Bishkek',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  const phone = COMPANY_INFO?.phones?.[0] || '+996 709 115 115';
  const whatsapp = COMPANY_INFO?.whatsapp || '996709115115';
  const cleanWa = whatsapp.replace(/\D/g, '');
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`https://wa.me/${cleanWa}?text=Здравствуйте! Хочу получить официальный каталог объектов EL ORDO GROUP`)}`;

  const companyHistory =
    typeof COMPANY_INFO.history === 'string'
      ? COMPANY_INFO.history
      : (COMPANY_INFO as any).history?.text ||
        (Array.isArray((COMPANY_INFO as any).history)
          ? (COMPANY_INFO as any).history.map((h: any) => h.text || '').join(' ')
          : '') ||
        'EL ORDO GROUP — строительная компания нового поколения в Кыргызстане. Мы проектируем и возводим современные жилые комплексы повышенной комфортности с прямыми договорами долевого участия.';

  const html = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #064734; padding-bottom: 10px; margin-bottom: 12px;">
      <div>
        <div style="font-size: 19pt; font-weight: 900; color: #064734; text-transform: uppercase;">EL ORDO GROUP</div>
        <div style="font-size: 8pt; font-weight: 700; color: #d4b26f; letter-spacing: 1.5px; text-transform: uppercase;">Строительная компания • Официальная презентация</div>
      </div>
      <div style="text-align: right; font-size: 8pt; color: #555555;">
        <div>Дата: <strong style="color: #064734;">${todayStr}</strong></div>
        <div>Курс НБКР: <strong style="color: #064734;">${usdRate} сом/$</strong></div>
      </div>
    </div>

    <div style="background: #f8faf9; border: 1.5px solid #064734; padding: 12px 14px; border-radius: 8px; margin-bottom: 12px;">
      <div style="font-size: 11pt; font-weight: 900; color: #064734; text-transform: uppercase; margin-bottom: 4px;">Архитектура вашего статуса и семейного уюта</div>
      <div style="font-size: 7.5pt; color: #333333; line-height: 1.4;">${companyHistory}</div>
    </div>

    <div style="font-size: 9pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 6px; border-left: 3px solid #d4b26f; padding-left: 6px;">1. Программы покупки:</div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px;">
      <div style="border: 1px solid #e2e8f0; background: #f8faf9; padding: 8px 10px; border-radius: 6px;">
        <div style="font-size: 8pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 2px;">Рассрочка 0%</div>
        <div style="font-size: 7pt; color: #4a5568; line-height: 1.3;">Прямо от застройщика до 36-40 месяцев без участия банков и справок.</div>
      </div>
      <div style="border: 1px solid #e2e8f0; background: #f8faf9; padding: 8px 10px; border-radius: 6px;">
        <div style="font-size: 8pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 2px;">Trade-in (Бартер)</div>
        <div style="font-size: 7pt; color: #4a5568; line-height: 1.3;">Обмен авто или вторичной недвижимости на новостройку с оценкой за 24 часа.</div>
      </div>
      <div style="border: 1px solid #e2e8f0; background: #f8faf9; padding: 8px 10px; border-radius: 6px;">
        <div style="font-size: 8pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 2px;">100% Расчет</div>
        <div style="font-size: 7pt; color: #4a5568; line-height: 1.3;">Максимальный персональный дисконт и приоритетный выбор видовых этажей.</div>
      </div>
    </div>

    <div style="font-size: 9pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 6px; border-left: 3px solid #d4b26f; padding-left: 6px;">2. Каталог строящихся и завершенных комплексов:</div>
    <table style="width: 100%; border-collapse: collapse; font-size: 7.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background: #064734; color: #ffffff;">
          <th style="padding: 4px 6px; text-align: left;">Жилой комплекс</th>
          <th style="padding: 4px 6px; text-align: left;">Класс</th>
          <th style="padding: 4px 6px; text-align: left;">Адрес</th>
          <th style="padding: 4px 6px; text-align: left;">Срок сдачи</th>
          <th style="padding: 4px 6px; text-align: right;">Стоимость за м²</th>
        </tr>
      </thead>
      <tbody>
        ${PROJECTS.map((proj: any) => {
          const priceDisplay = typeof proj.price === 'string' ? proj.price : proj.price?.ru || 'По запросу';
          const deadlineDisplay = typeof proj.deadline === 'string' ? proj.deadline : proj.deadline?.ru || 'Уточняйте';
          const classDisplay = typeof proj.classType === 'string' ? proj.classType : proj.classType?.ru || proj.class || 'Комфорт';
          const addressDisplay = typeof proj.address === 'string' ? proj.address : proj.address?.ru || '';

          return `
            <tr style="border-bottom: 1px solid #edf2f7;">
              <td style="padding: 4px 6px;"><strong>${proj.name}</strong></td>
              <td style="padding: 4px 6px;">${classDisplay}</td>
              <td style="padding: 4px 6px;">${addressDisplay}</td>
              <td style="padding: 4px 6px;">${deadlineDisplay}</td>
              <td style="padding: 4px 6px; text-align: right; color: #064734; font-weight: 800;">${priceDisplay}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>

    <div style="border-top: 1.5px solid #064734; padding-top: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 7pt; color: #718096;">
      <div>
        <div style="font-weight: 800; color: #064734;">Центральный офис: ${COMPANY_INFO.address} • Тел: ${phone} • WhatsApp: +${cleanWa}</div>
        <div>Официальный сайт: <strong>elordogroup.com</strong></div>
      </div>
      <div style="text-align: center; flex-shrink: 0; margin-left: 12px;">
        <img src="${qrUrl}" alt="QR" crossorigin="anonymous" style="width: 50px; height: 50px; border: 1px solid #d4b26f; padding: 2px; border-radius: 4px; display: block; margin: 0 auto 2px;" />
        <span style="font-size: 5.5pt; color: #064734; font-weight: 800; text-transform: uppercase;">WhatsApp отдел продаж</span>
      </div>
    </div>
  `;

  await generatePdfFromHtml(html, `Katalog_EL_ORDO_GROUP.pdf`);
}