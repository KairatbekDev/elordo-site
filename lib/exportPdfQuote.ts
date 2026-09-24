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

// Загрузчик современного html2canvas-pro (с поддержкой lab/oklch) и jsPDF
async function getPdfTools(): Promise<{ html2canvas: any; jsPDF: any }> {
  if (typeof window === 'undefined') throw new Error('Client-only');

  try {
    const [h2cMod, jspdfMod] = await Promise.all([
      import('html2canvas-pro'),
      import('jspdf'),
    ]);
    const html2canvas = h2cMod.default || h2cMod;
    const jsPDF = jspdfMod.jsPDF || jspdfMod.default;
    if (html2canvas && jsPDF) return { html2canvas, jsPDF };
  } catch {
    // Fallback на случай сборки без предварительной установки пакетов
  }

  const loadScript = (src: string, globalName: string) => {
    return new Promise((resolve, reject) => {
      if ((window as any)[globalName]) return resolve((window as any)[globalName]);
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve((window as any)[globalName]);
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(s);
    });
  };

  const [html2canvas, jspdfNamespace] = await Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/html2canvas-pro@1.5.13/dist/html2canvas-pro.min.js', 'html2canvas'),
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', 'jspdf'),
  ]);

  const jsPDF = (jspdfNamespace as any)?.jsPDF || (window as any).jspdf?.jsPDF;
  return { html2canvas, jsPDF };
}

// Генерация PDF через html2canvas-pro + jsPDF
async function renderHtmlToPdf(htmlContent: string, filename: string) {
  const { html2canvas, jsPDF } = await getPdfTools();

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px';
  container.style.padding = '24px 28px';
  container.style.background = '#ffffff';
  container.style.color = '#1a1a1a';
  container.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  container.innerHTML = htmlContent;
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  } finally {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
}

// 1. Прямое скачивание персонального расчета КП в файл .pdf
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

  const html = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #064734; padding-bottom: 10px; margin-bottom: 14px;">
      <div>
        <div style="font-size: 19pt; font-weight: 900; color: #064734; text-transform: uppercase;">EL ORDO GROUP</div>
        <div style="font-size: 8pt; font-weight: 700; color: #d4b26f; letter-spacing: 1.5px; text-transform: uppercase;">Строительная компания • Кыргызстан</div>
      </div>
      <div style="text-align: right; font-size: 8pt; color: #555555;">
        <div>Коммерческое предложение: <strong style="color: #064734;">${quoteNumber}</strong></div>
        <div>Дата: ${todayStr}</div>
        <div>Официальный курс НБКР: <strong style="color: #064734;">${data.usdRate} сом/$</strong></div>
      </div>
    </div>

    <div style="background: #064734; color: #ffffff; padding: 10px 14px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
      <div>
        <div style="font-size: 11pt; font-weight: 800; text-transform: uppercase;">Индивидуальный расчет рассрочки 0%</div>
        <div style="font-size: 8pt; opacity: 0.85; margin-top: 2px;">Без участия коммерческих банков • Без переплат • Переплата $0</div>
      </div>
      <div style="background: #d4b26f; color: #064734; font-size: 8pt; font-weight: 900; padding: 3px 8px; border-radius: 12px; text-transform: uppercase;">0% переплат</div>
    </div>

    ${data.selectedApartment ? `
      <div style="border: 1.5px solid #d4b26f; background: #fdfbf7; border-radius: 8px; padding: 8px 12px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 7.5pt; font-weight: 700; color: #d4b26f; text-transform: uppercase;">Выбранный объект</div>
          <div style="font-size: 12pt; font-weight: 900; color: #064734;">${data.selectedApartment.complex}</div>
          <div style="font-size: 8pt; color: #4a5568; margin-top: 1px;">
            ${data.selectedApartment.rooms}-комнатная квартира • Площадь: ${data.selectedApartment.area} м² • ${data.selectedApartment.floor}           </div>         </div>         <div style="text-align: right;">           <div style="font-size: 7.5pt; color: #718096;">Стоимость за м²:</div>           <div style="font-size: 11pt; font-weight: 900; color: #064734;">$${data.selectedApartment.priceM2} / м²</div>
        </div>
      </div>
    ` : ''}

    <div style="font-size: 9.5pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 8px;">Финансовые условия покупки:</div>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 14px;">
      <div style="border: 1px solid #e2e8f0; background: #f8faf9; padding: 8px 10px; border-radius: 6px;">
        <div style="font-size: 7pt; font-weight: 700; text-transform: uppercase; color: #718096;">Стоимость квартиры</div>
        <div style="font-size: 11pt; font-weight: 900; color: #064734;">$${data.apartmentPrice.toLocaleString('ru-RU')}</div>
        <div style="font-size: 7pt; color: #718096;">≈ ${totalKgs.toLocaleString('ru-RU')} сом</div>
      </div>
      <div style="border: 1px solid #e2e8f0; background: #f8faf9; padding: 8px 10px; border-radius: 6px;">
        <div style="font-size: 7pt; font-weight: 700; text-transform: uppercase; color: #718096;">Первый взнос (${data.downPaymentPercent}%)</div>
        <div style="font-size: 11pt; font-weight: 900; color: #064734;">$${data.downPaymentAmount.toLocaleString('ru-RU')}</div>
        <div style="font-size: 7pt; color: #718096;">≈ ${downKgs.toLocaleString('ru-RU')} сом</div>
      </div>
      <div style="border: 1px solid #e2e8f0; background: #f8faf9; padding: 8px 10px; border-radius: 6px;">
        <div style="font-size: 7pt; font-weight: 700; text-transform: uppercase; color: #718096;">Срок рассрочки</div>
        <div style="font-size: 11pt; font-weight: 900; color: #064734;">${data.months} мес.</div>
        <div style="font-size: 7pt; color: #718096;">${data.frequency === 'monthly' ? 'Ежемесячно' : 'Поквартально'}</div>
      </div>
      <div style="border: 1.5px solid #064734; background: #eef5f2; padding: 8px 10px; border-radius: 6px;">
        <div style="font-size: 7pt; font-weight: 700; text-transform: uppercase; color: #064734;">Платеж в ${data.frequency === 'monthly' ? 'месяц' : 'квартал'}</div>
        <div style="font-size: 11pt; font-weight: 900; color: #064734;">$${data.paymentPerPeriodUsd.toLocaleString('ru-RU')}</div>
        <div style="font-size: 7pt; color: #064734; font-weight: 700;">≈ ${paymentKgs.toLocaleString('ru-RU')} сом</div>
      </div>
    </div>

    <div style="font-size: 9.5pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 6px;">График выплат беспроцентной рассрочки:</div>
    <table style="width: 100%; border-collapse: collapse; font-size: 7.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background: #064734; color: #ffffff;">
          <th style="padding: 5px 6px; text-align: left; width: 30px;">№</th>
          <th style="padding: 5px 6px; text-align: left;">Период</th>
          <th style="padding: 5px 6px; text-align: left;">Сумма платежа ($)</th>
          <th style="padding: 5px 6px; text-align: left;">Сумма в сомах (НБКР: ${data.usdRate})</th>
          <th style="padding: 5px 6px; text-align: right;">Остаток задолженности</th>
        </tr>
      </thead>
      <tbody>
        ${data.paymentSchedule.map(row => `
          <tr style="border-bottom: 1px solid #edf2f7; ${row.num % 2 === 0 ? 'background: #f8faf9;' : ''}">
            <td style="padding: 3.5px 6px;"><strong>${row.num}</strong></td>
            <td style="padding: 3.5px 6px;">${row.period}</td>             <td style="padding: 3.5px 6px;"><strong>$${row.paymentUsd.toLocaleString('ru-RU')}</strong></td>
            <td style="padding: 3.5px 6px;">≈ ${row.paymentKgs.toLocaleString('ru-RU')} сом</td>             <td style="padding: 3.5px 6px; text-align: right; color: #718096;">$${row.balanceUsd.toLocaleString('ru-RU')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div style="font-size: 6.5pt; color: #718096; line-height: 1.3; margin-bottom: 10px; font-style: italic;">
      * Расчет носит предварительный характер. Оплата производится в национальной валюте (сом) по официальному учетному курсу НБКР на день фактической оплаты. Все сделки регистрируются в Едином государственном реестре прав на недвижимое имущество (Госрегистр КР).
    </div>

    <div style="border-top: 1px solid #e2e8f0; padding-top: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 7.5pt; color: #718096;">
      <div>Отдел продаж EL ORDO GROUP: <strong style="color: #064734;">${phone}</strong> • WhatsApp: <strong style="color: #064734;">${whatsapp}</strong></div>
      <div>Официальный сайт: <strong style="color: #064734;">elordogroup.com</strong></div>
    </div>
  `;

  await renderHtmlToPdf(html, `Raschet_EL_ORDO_${quoteNumber}.pdf`);
}

// 2. Прямое скачивание каталога и презентации компании в файл .pdf
export async function downloadCompanyBrochurePdf(usdRate: number = 87.45) {
  const todayStr = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Bishkek',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  const phone = COMPANY_INFO?.phones?.[0] || '+996 709 115 115';
  const whatsapp = COMPANY_INFO?.whatsapp || '996709115115';

  const html = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #064734; padding-bottom: 10px; margin-bottom: 14px;">
      <div>
        <div style="font-size: 19pt; font-weight: 900; color: #064734; text-transform: uppercase;">EL ORDO GROUP</div>
        <div style="font-size: 8pt; font-weight: 700; color: #d4b26f; letter-spacing: 1.5px; text-transform: uppercase;">Строительная компания • Официальная презентация</div>
      </div>
      <div style="text-align: right; font-size: 8pt; color: #555555;">
        <div>Дата: <strong style="color: #064734;">${todayStr}</strong></div>
        <div>Курс НБКР: <strong style="color: #064734;">${usdRate} сом/$</strong></div>
      </div>
    </div>

    <div style="background: #f8faf9; border: 1.5px solid #064734; padding: 12px 14px; border-radius: 8px; margin-bottom: 14px;">
      <div style="font-size: 12pt; font-weight: 900; color: #064734; text-transform: uppercase; margin-bottom: 4px;">Архитектура вашего статуса и семейного уюта</div>
      <div style="font-size: 8pt; color: #333333; line-height: 1.4;">${COMPANY_INFO.history.text}</div>
    </div>

    <div style="font-size: 9.5pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 8px; border-left: 3px solid #d4b26f; padding-left: 6px;">1. Программы покупки:</div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px;">
      <div style="border: 1px solid #e2e8f0; background: #f8faf9; padding: 8px 10px; border-radius: 6px;">
        <div style="font-size: 8pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 2px;">Рассрочка 0%</div>
        <div style="font-size: 7.5pt; color: #4a5568; line-height: 1.3;">Прямо от застройщика до 36-40 месяцев без участия банков и справок.</div>
      </div>
      <div style="border: 1px solid #e2e8f0; background: #f8faf9; padding: 8px 10px; border-radius: 6px;">
        <div style="font-size: 8pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 2px;">Trade-in (Бартер)</div>
        <div style="font-size: 7.5pt; color: #4a5568; line-height: 1.3;">Обмен авто или вторичной недвижимости на новостройку с оценкой за 24 часа.</div>
      </div>
      <div style="border: 1px solid #e2e8f0; background: #f8faf9; padding: 8px 10px; border-radius: 6px;">
        <div style="font-size: 8pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 2px;">100% Расчет</div>
        <div style="font-size: 7.5pt; color: #4a5568; line-height: 1.3;">Максимальный персональный дисконт и приоритетный выбор видовых этажей.</div>
      </div>
    </div>

    <div style="font-size: 9.5pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 8px; border-left: 3px solid #d4b26f; padding-left: 6px;">2. Каталог жилых комплексов:</div>
    <table style="width: 100%; border-collapse: collapse; font-size: 8pt; margin-bottom: 14px;">
      <thead>
        <tr style="background: #064734; color: #ffffff;">
          <th style="padding: 5px 8px; text-align: left;">Жилой комплекс</th>
          <th style="padding: 5px 8px; text-align: left;">Класс</th>
          <th style="padding: 5px 8px; text-align: left;">Адрес</th>
          <th style="padding: 5px 8px; text-align: left;">Срок сдачи</th>
          <th style="padding: 5px 8px; text-align: right;">Стоимость за м²</th>
        </tr>
      </thead>
      <tbody>
        ${PROJECTS.map((proj: any) => `
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 5px 8px;"><strong>${proj.name}</strong></td>
            <td style="padding: 5px 8px;">${proj.classType}</td>
            <td style="padding: 5px 8px;">${proj.address}</td>
            <td style="padding: 5px 8px;">${proj.deadline}</td>
            <td style="padding: 5px 8px; text-align: right; color: #064734; font-weight: 800;">${proj.price}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div style="border-top: 1px solid #e2e8f0; padding-top: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 7.5pt; color: #718096;">
      <div>Центральный офис: ${COMPANY_INFO.address} • Тел: <strong style="color: #064734;">${phone}</strong> • WhatsApp: <strong style="color: #064734;">${whatsapp}</strong></div>
      <div>Официальный сайт: <strong style="color: #064734;">elordogroup.com</strong></div>
    </div>
  `;

  await renderHtmlToPdf(html, `Katalog_EL_ORDO_GROUP.pdf`);
}