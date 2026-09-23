import { COMPANY_INFO } from '@/lib/data';

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

      <div style="font-size: 7pt; color: #718096; line-height: 1.3; margin-bottom: 12px; font-style: italic;">
        * Расчет носит предварительный характер. Оплата производится в национальной валюте (сом) по официальному учетному курсу НБКР на день фактической оплаты в соответствии с законодательством Кыргызской Республики. Все сделки регистрируются в Едином государственном реестре прав на недвижимое имущество (Госрегистр КР).
      </div>

      <div class="footer">
        <div class="footer-contacts">
          Отдел продаж EL ORDO GROUP: <strong>${phone}</strong> • WhatsApp: <strong>${whatsapp}</strong>
        </div>
        <div>Официальный сайт: <strong>elordogroup.com</strong></div>
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}