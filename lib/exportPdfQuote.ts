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

// 1. Новая функция для скачивания полной презентации / каталога компании со всей важной информацией
export function downloadCompanyBrochurePdf(usdRate: number = 87.45) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const todayStr = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Bishkek',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  const phone = COMPANY_INFO?.phones?.[0] || '+996 709 115 115';
  const whatsapp = COMPANY_INFO?.whatsapp || '996709115115';

  const html = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>Официальный каталог и презентация — EL ORDO GROUP</title>
      <style>
        @page { size: A4 portrait; margin: 12mm 15mm; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a1a; background: #fff; font-size: 10pt; line-height: 1.4; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .download-action-bar { background: #064734; color: #d4b26f; padding: 12px 18px; border-radius: 8px; font-size: 9.5pt; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; font-weight: 700; box-shadow: 0 4px 12px rgba(6,71,52,0.2); }
        .download-action-bar button { background: #d4b26f; color: #064734; border: none; font-weight: 900; padding: 8px 16px; border-radius: 6px; cursor: pointer; text-transform: uppercase; font-size: 8.5pt; }
        @media print { .download-action-bar { display: none; } }
        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #064734; padding-bottom: 10px; margin-bottom: 16px; }
        .brand-title { font-size: 19pt; font-weight: 900; color: #064734; text-transform: uppercase; }
        .brand-sub { font-size: 8pt; font-weight: 700; color: #d4b26f; letter-spacing: 1.5px; text-transform: uppercase; }
        .doc-meta { text-align: right; font-size: 8.5pt; color: #555; }
        .doc-meta strong { color: #064734; }
        .hero-box { background: #f8faf9; border: 1.5px solid #064734; padding: 14px 16px; border-radius: 8px; margin-bottom: 16px; }
        .section-title { font-size: 10pt; font-weight: 800; color: #064734; text-transform: uppercase; margin: 14px 0 8px 0; border-left: 3px solid #d4b26f; padding-left: 8px; }
        .table-projects { width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-bottom: 16px; }
        .table-projects th { background: #064734; color: #fff; padding: 6px 10px; text-align: left; font-weight: 700; }
        .table-projects td { padding: 6px 10px; border-bottom: 1px solid #edf2f7; }
        .table-projects tr:nth-child(even) { background: #f8faf9; }
        .grid-terms { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
        .term-card { border: 1px solid #e2e8f0; background: #f8faf9; padding: 10px 12px; border-radius: 8px; }
        .term-card h6 { font-size: 8.5pt; font-weight: 800; color: #064734; text-transform: uppercase; margin-bottom: 4px; }
        .term-card p { font-size: 8pt; color: #4a5568; line-height: 1.3; }
        .footer { border-top: 1px solid #e2e8f0; padding-top: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 8pt; color: #718096; }
      </style>
    </head>
    <body>
      <div class="download-action-bar">
        <div>📥 <strong>Скачать каталог в PDF:</strong> Нажмите кнопку справа или <strong>Ctrl+P</strong>, в поле «Принтер» выберите <strong>«Сохранить как PDF»</strong>.</div>
        <button onclick="window.print()">Сохранить PDF</button>
      </div>

      <div class="header">
        <div class="brand">
          <span class="brand-title">EL ORDO GROUP</span>
          <span class="brand-sub">Строительная компания • Официальная презентация</span>
        </div>
        <div class="doc-meta">
          <div>Дата: <strong>${todayStr}</strong></div>
          <div>Курс НБКР: <strong>${usdRate} сом/$</strong></div>
        </div>
      </div>

      <div class="hero-box">
        <div style="font-size: 13pt; font-weight: 900; color: #064734; text-transform: uppercase; margin-bottom: 6px;">Архитектура вашего статуса и семейного уюта</div>
        <div style="font-size: 8.5pt; color: #333; line-height: 1.4;">
          ${COMPANY_INFO.history.text}
        </div>
      </div>

      <div class="section-title">1. Основные программы покупки недвижимости:</div>
      <div class="grid-terms">
        <div class="term-card">
          <h6>Рассрочка 0%</h6>
          <p>Прямо от застройщика до 36-40 месяцев без участия банков, справок о доходах и переплат.</p>
        </div>
        <div class="term-card">
          <h6>Trade-in (Бартер)</h6>
          <p>Быстрый обмен автомобиля или вторичной недвижимости на новостройку с оценкой за 24 часа.</p>
        </div>
        <div class="term-card">
          <h6>100% Расчет</h6>
          <p>Максимальный индивидуальный дисконт, приоритетный выбор видовых этажей и ДДУ за 24 часа.</p>
        </div>
      </div>

      <div class="section-title">2. Каталог строящихся и завершенных объектов:</div>
      <table class="table-projects">
        <thead>
          <tr>
            <th>Жилой комплекс</th>
            <th>Класс</th>
            <th>Адрес / Локация</th>
            <th>Срок сдачи</th>
            <th>Стоимость за м²</th>
          </tr>
        </thead>
        <tbody>
          ${PROJECTS.map((proj: any) => `
            <tr>
              <td><strong>${proj.name}</strong></td>
              <td>${proj.classType}</td>
              <td>${proj.address}</td>
              <td>${proj.deadline}</td>
              <td><strong style="color: #064734;">${proj.price}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="font-size: 7.5pt; color: #718096; font-style: italic; margin-bottom: 14px;">
        * Вся информация носит ознакомительный характер. Официальные расчеты производятся в сомах по учетному курсу НБКР. Все сделки подлежат обязательной госрегистрации в КР.
      </div>

      <div class="footer">
        <div>Центральный офис: ${COMPANY_INFO.address} • Тел: <strong>${phone}</strong> • WhatsApp: <strong>${whatsapp}</strong></div>
        <div>Сайт: <strong>elordogroup.com</strong></div>
      </div>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

// 2. Ваша оригинальная функция персонального расчета КП (сохранена на 100%)
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

export function exportPdfQuote(data: PdfQuoteData) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const todayStr = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Bishkek',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  const quoteNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const totalKgs = Math.round(data.apartmentPrice * data.usdRate);
  const downKgs = Math.round(data.downPaymentAmount * data.usdRate);
  const paymentKgs = Math.round(data.paymentPerPeriodUsd * data.usdRate);

  const phone = COMPANY_INFO?.phones?.[0] || '+996 709 115 115';
  const whatsapp = COMPANY_INFO?.whatsapp || '996709115115';

  const html = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>Коммерческое предложение ${quoteNumber} — EL ORDO GROUP</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 12mm 15mm;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #1a1a1a;
          background: #ffffff;
          font-size: 10.5pt;
          line-height: 1.4;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .download-action-bar {
          background: #064734;
          color: #d4b26f;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 9pt;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
        }
        .download-action-bar button {
          background: #d4b26f;
          color: #064734;
          border: none;
          font-weight: 900;
          padding: 6px 14px;
          border-radius: 4px;
          cursor: pointer;
          text-transform: uppercase;
          font-size: 8pt;
        }
        @media print { .download-action-bar { display: none; } }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #064734;
          padding-bottom: 10px;
          margin-bottom: 16px;
        }
        .brand {
          display: flex;
          flex-direction: column;
        }
        .brand-title {
          font-size: 19pt;
          font-weight: 900;
          color: #064734;
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }
        .brand-sub {
          font-size: 8pt;
          font-weight: 700;
          color: #d4b26f;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .doc-meta {
          text-align: right;
          font-size: 8.5pt;
          color: #555555;
        }
        .doc-meta strong {
          color: #064734;
        }
        .banner-quote {
          background: #064734;
          color: #ffffff;
          padding: 10px 16px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .banner-title {
          font-size: 11pt;
          font-weight: 800;
          text-transform: uppercase;
        }
        .banner-badge {
          background: #d4b26f;
          color: #064734;
          font-size: 8.5pt;
          font-weight: 900;
          padding: 3px 10px;
          border-radius: 20px;
          text-transform: uppercase;
        }
        .section-title {
          font-size: 9.5pt;
          font-weight: 800;
          color: #064734;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .grid-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }
        .card {
          border: 1px solid #e2e8f0;
          background: #f8faf9;
          padding: 9px 12px;
          border-radius: 8px;
        }
        .card-label {
          font-size: 7.5pt;
          font-weight: 700;
          text-transform: uppercase;
          color: #718096;
          margin-bottom: 2px;
        }
        .card-val {
          font-size: 12pt;
          font-weight: 900;
          color: #064734;
        }
        .card-sub {
          font-size: 7.5pt;
          color: #718096;
          margin-top: 1px;
        }
        .apt-box {
          border: 1.5px solid #d4b26f;
          background: #fdfbf7;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .table-schedule {
          width: 100%;
          border-collapse: collapse;
          font-size: 8pt;
          margin-bottom: 14px;
        }
        .table-schedule th {
          background: #064734;
          color: #ffffff;
          padding: 5px 8px;
          text-align: left;
          font-weight: 700;
        }
        .table-schedule td {
          padding: 4px 8px;
          border-bottom: 1px solid #edf2f7;
        }
        .table-schedule tr:nth-child(even) {
          background: #f8faf9;
        }
        .footer {
          border-top: 1px solid #e2e8f0;
          padding-top: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 8pt;
          color: #718096;
        }
        .footer-contacts strong {
          color: #064734;
        }
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="download-action-bar">
        <div>📥 <strong>Сохранить расчет в PDF:</strong> Нажмите кнопку справа или <strong>Ctrl+P</strong>, в поле «Принтер» выберите <strong>«Сохранить как PDF»</strong>.</div>
        <button onclick="window.print()">Сохранить PDF</button>
      </div>

      <div class="header">
        <div class="brand">
          <span class="brand-title">EL ORDO GROUP</span>
          <span class="brand-sub">Строительная компания • Кыргызстан</span>
        </div>
        <div class="doc-meta">
          <div>Коммерческое предложение: <strong>${quoteNumber}</strong></div>
          <div>Дата: ${todayStr}</div>
          <div>Официальный учетный курс НБКР: <strong>${data.usdRate} сом/$</strong></div>
        </div>
      </div>

      <div class="banner-quote">
        <div>
          <div class="banner-title">Индивидуальный расчет рассрочки 0%</div>
          <div style="font-size: 8pt; opacity: 0.85; margin-top: 2px;">
            Без посредников • Без участия коммерческих банков • Переплата $0
          </div>
        </div>
        <div class="banner-badge">0% переплат</div>
      </div>

      ${data.selectedApartment ? `
        <div class="apt-box">
          <div>
            <div style="font-size: 7.5pt; font-weight: 700; color: #d4b26f; text-transform: uppercase;">Выбранный объект</div>
            <div style="font-size: 12pt; font-weight: 900; color: #064734;">${data.selectedApartment.complex}</div>
            <div style="font-size: 8.5pt; color: #4a5568; margin-top: 2px;">
              ${data.selectedApartment.rooms}-комнатная квартира • Площадь: ${data.selectedApartment.area} м² • ${data.selectedApartment.floor}             </div>           </div>           <div style="text-align: right;">             <div style="font-size: 7.5pt; color: #718096;">Стоимость за м²:</div>             <div style="font-size: 11pt; font-weight: 900; color: #064734;">$${data.selectedApartment.priceM2} / м²</div>
          </div>
        </div>
      ` : ''}

      <div class="section-title">Финансовые условия покупки:</div>
      <div class="grid-cards">
        <div class="card">
          <div class="card-label">Стоимость квартиры</div>
          <div class="card-val">$${data.apartmentPrice.toLocaleString('ru-RU')}</div>
          <div class="card-sub">≈ ${totalKgs.toLocaleString('ru-RU')} сом</div>
        </div>
        <div class="card">
          <div class="card-label">Первый взнос (${data.downPaymentPercent}%)</div>
          <div class="card-val">$${data.downPaymentAmount.toLocaleString('ru-RU')}</div>
          <div class="card-sub">≈ ${downKgs.toLocaleString('ru-RU')} сом</div>
        </div>
        <div class="card">
          <div class="card-label">Срок рассрочки</div>
          <div class="card-val">${data.months} мес.</div>
          <div class="card-sub">${data.frequency === 'monthly' ? 'Ежемесячно' : 'Поквартально'}</div>
        </div>
        <div class="card" style="border-color: #064734; background: #eef5f2;">
          <div class="card-label" style="color: #064734;">Платеж в ${data.frequency === 'monthly' ? 'месяц' : 'квартал'}</div>
          <div class="card-val" style="color: #064734;">$${data.paymentPerPeriodUsd.toLocaleString('ru-RU')}</div>
          <div class="card-sub" style="color: #064734; font-weight: 700;">≈ ${paymentKgs.toLocaleString('ru-RU')} сом</div>
        </div>
      </div>

      <div class="section-title">График выплат беспроцентной рассрочки:</div>
      <table class="table-schedule">
        <thead>
          <tr>
            <th style="width: 40px;">№</th>
            <th>Период</th>
            <th>Сумма платежа ($)</th>
            <th>Сумма в сомах (НБКР: ${data.usdRate})</th>
            <th style="text-align: right;">Остаток задолженности</th>
          </tr>
        </thead>
        <tbody>
          ${data.paymentSchedule.map(row => `
            <tr>
              <td><strong>${row.num}</strong></td>
              <td>${row.period}</td>               <td><strong>$${row.paymentUsd.toLocaleString('ru-RU')}</strong></td>
              <td>≈ ${row.paymentKgs.toLocaleString('ru-RU')} сом</td>               <td style="text-align: right; color: #718096;">$${row.balanceUsd.toLocaleString('ru-RU')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="font-size: 7.5pt; color: #718096; line-height: 1.3; margin-bottom: 12px; font-style: italic;">
        * Расчет носит предварительный характер. Оплата производится в национальной валюте (сом) по официальному учетному курсу НБКР на день фактической оплаты в соответствии с законодательством Кыргызской Республики. Все сделки регистрируются в Едином государственном реестре прав на недвижимое имущество (Госрегистр КР).
      </div>

      <div class="footer">
        <div class="footer-contacts">
          Отдел продаж EL ORDO GROUP: <strong>${phone}</strong> • WhatsApp: <strong>${whatsapp}</strong>
        </div>
        <div>Официальный сайт: <strong>elordogroup.com</strong></div>
      </div>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}