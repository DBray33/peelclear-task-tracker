import { jsPDF } from 'jspdf';
import { billingPeriods, getPeriodStats, providerInfo, billingInfo } from '../data/tasks';

export function generateInvoice(periodId) {
  const period = billingPeriods.find(p => p.id === periodId);
  if (!period) return;

  const stats = getPeriodStats(periodId);
  const { totalHours, amountDue, resolvedTasks } = stats;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 25;
  const contentWidth = pageWidth - marginLeft * 2;
  let y = 30;
  const lineHeight = 8;

  // INVOICE header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('INVOICE', marginLeft, y);
  y += lineHeight * 2;

  // Helper for bold label + normal value lines
  function addField(label, value) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    const labelWidth = doc.getTextWidth(label + ' ');
    doc.text(label, marginLeft, y);
    doc.setFont('helvetica', 'normal');
    const valueLines = doc.splitTextToSize(value, contentWidth - labelWidth);
    doc.text(valueLines, marginLeft + labelWidth, y);
    y += lineHeight * Math.max(valueLines.length, 1);
  }

  // Helper for bold label + link
  function addFieldWithLink(label, text, url) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    const labelWidth = doc.getTextWidth(label + ' ');
    doc.text(label, marginLeft, y);

    doc.setFont('helvetica', 'normal');
    const fullText = text;
    const lines = doc.splitTextToSize(fullText, contentWidth - labelWidth);

    // Render first line with link on the URL portion
    const firstLine = lines[0];
    doc.setTextColor(0, 0, 0);
    doc.text(firstLine, marginLeft + labelWidth, y);

    // Add clickable link over the URL text
    const urlStart = firstLine.indexOf('https://');
    if (urlStart >= 0) {
      const urlText = firstLine.substring(urlStart);
      const preUrlWidth = doc.getTextWidth(firstLine.substring(0, urlStart));
      const urlWidth = doc.getTextWidth(urlText);
      doc.link(marginLeft + labelWidth + preUrlWidth, y - 4, urlWidth, 5, { url });
    }

    y += lineHeight;

    // Render remaining lines
    for (let i = 1; i < lines.length; i++) {
      doc.text(lines[i], marginLeft + labelWidth, y);
      y += lineHeight;
    }
  }

  // Invoice details
  addField('Invoice #:', period.invoiceNumber);
  addField('Invoice Date:', period.invoiceDate);
  addField('Provider:', `${providerInfo.name} - ${providerInfo.contact}`);
  addField('Client:', 'Peelclear');
  addField('Invoices sent to:', 'shona@peelclear.com');
  addField('Service:', 'Website Maintenance & Technical Support');
  addField('Billing Period:', period.billingPeriodLabel);

  if (period.billingNote) {
    addField('Billing Note:', period.billingNote);
  }

  addFieldWithLink(
    'Detailed task history and activity log:',
    'https://pc-website-maintenance-log.netlify.app/ (sort by period at the top)',
    'https://pc-website-maintenance-log.netlify.app/'
  );

  // SUMMARY section
  y += lineHeight * 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('SUMMARY', marginLeft, y);
  y += lineHeight * 1.5;

  doc.setFontSize(11);
  addField('Total Hours Billed:', totalHours.toFixed(2));
  addField('Hourly Rate:', `$${billingInfo.rate.toFixed(2)}`);
  addField('Total Amount Due:', `$${amountDue.toFixed(2)}`);
  addField('Resolved Tasks This Period:', String(resolvedTasks));
  addField('Payment Terms:', 'ACH payment preferred, billed in 15-minute increments');


  // Save the PDF
  const filename = `Invoice - ${period.invoiceNumber}.pdf`;
  doc.save(filename);
}
