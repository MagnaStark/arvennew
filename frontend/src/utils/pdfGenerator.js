import jsPDF from 'jspdf';
import { formatCurrency, formatPercent } from './projectionEngine';
import { BRAND, PRICING } from '../config/theme';

/**
 * Generate a PDF report of the investment projection - MULTILINGUAL SUPPORT
 * 
 * @param {Object} projectionData - The projection data from projectionEngine
 * @param {Object} inputs - User inputs (price, fractions, payment type, currency, etc.)
 * @param {Object} t - Translation object from LanguageContext
 */
export async function generatePDF(projectionData, inputs, t) {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  
  // Colors
  const primaryColor = [65, 71, 45]; // #41472D
  const accentColor = [239, 230, 171]; // #EFE6AB
  
  // Header with brand
  pdf.setFillColor(...accentColor);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Arven House', pageWidth / 2, 20, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'italic');
  pdf.text(t.footer.tagline, pageWidth / 2, 28, { align: 'center' });
  
  // Title
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text(t.calculator.title, margin, 55);
  
  // Date
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const today = new Date().toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  pdf.text(`${today}`, margin, 62);
  
  // User Inputs Section
  let yPosition = 75;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(t.calculator.inputs.title, margin, yPosition);
  
  yPosition += 8;
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  const priceTypeLabel = inputs.priceType === 'presale' ? t.calculator.inputs.presale : t.calculator.inputs.discounted;
  const paymentTypeLabel = inputs.paymentType === 'financed' ? t.calculator.inputs.financed : t.calculator.inputs.cash;
  
  const inputLines = [
    `${t.calculator.inputs.currency}: ${inputs.currency}`,
    `${t.calculator.inputs.priceType}: ${priceTypeLabel}`,
    `${formatCurrency(inputs.pricePerFraction, inputs.currency)}`,
    `${t.calculator.inputs.fractions}: ${inputs.numberOfFractions}`,
    `${t.calculator.summary.totalInvestment}: ${formatCurrency(projectionData.summary.totalInvestment, inputs.currency)}`,
    `${t.calculator.inputs.paymentType}: ${paymentTypeLabel}`,
    `${t.calculator.inputs.annualRate}: ${formatPercent(inputs.annualRate * 100)} (${t.calculator.summary.semiannual})`,
    `${t.calculator.inputs.projectionYears}: ${inputs.years} ${inputs.years === 1 ? t.calculator.inputs.year : t.calculator.inputs.years}`,
  ];
  
  if (inputs.paymentType === 'financed') {
    inputLines.push(`${t.calculator.inputs.financingYears}: ${inputs.financingYears}`);
    inputLines.push(`${t.calculator.summary.yieldsStart}: ${t.calculator.tables.year} ${inputs.financingYears + 1}`);
  }
  
  inputLines.forEach(line => {
    pdf.text(line, margin, yPosition);
    yPosition += 6;
  });
  
  // Summary Section
  yPosition += 5;
  pdf.setFillColor(...primaryColor);
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 35, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text(t.calculator.summary.title, margin + 5, yPosition + 8);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`${t.calculator.summary.returns}: ${formatCurrency(projectionData.summary.totalReturns, inputs.currency)}`, margin + 5, yPosition + 15);
  
  if (inputs.currency === 'MXN') {
    pdf.text(`${t.calculator.summary.appreciation}: ${formatCurrency(projectionData.summary.finalAppreciation - projectionData.summary.totalInvestment, 'MXN')}`, margin + 5, yPosition + 21);
    pdf.text(`${t.calculator.summary.finalValue}: ${formatCurrency(projectionData.summary.finalValueWithAppreciation, inputs.currency)}`, margin + 5, yPosition + 27);
  } else {
    pdf.text(`${t.calculator.tables.endingCapital}: ${formatCurrency(projectionData.summary.finalBalance, inputs.currency)}`, margin + 5, yPosition + 21);
  }
  
  // Table Header
  yPosition += 45;
  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text(t.calculator.tables.yearly, margin, yPosition);
  
  yPosition += 8;
  pdf.setFillColor(...accentColor);
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
  
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  
  const colX1 = margin + 3;
  const colX2 = margin + 18;
  const colX3 = margin + 58;
  const colX4 = margin + 98;
  const colX5 = margin + 138;
  
  pdf.text(t.calculator.tables.year, colX1, yPosition + 5);
  pdf.text(t.calculator.tables.startingCapital, colX2, yPosition + 5);
  pdf.text(t.calculator.tables.returns, colX3, yPosition + 5);
  pdf.text(t.calculator.tables.endingCapital, colX4, yPosition + 5);
  if (inputs.currency === 'MXN') {
    pdf.text(t.calculator.tables.appreciation, colX5, yPosition + 5);
  }
  
  // Table Rows
  yPosition += 8;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  
  projectionData.yearlyResults.forEach((yearData, index) => {
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }
    
    if (index % 2 === 0) {
      pdf.setFillColor(250, 250, 250);
      pdf.rect(margin, yPosition, pageWidth - 2 * margin, 7, 'F');
    }
    
    pdf.text(yearData.year.toString(), colX1, yPosition + 5);
    pdf.text(formatCurrency(yearData.startingBalance, inputs.currency), colX2, yPosition + 5);
    pdf.text(formatCurrency(yearData.totalInterest, inputs.currency), colX3, yPosition + 5);
    pdf.text(formatCurrency(yearData.endingBalance, inputs.currency), colX4, yPosition + 5);
    if (inputs.currency === 'MXN') {
      pdf.text(formatCurrency(yearData.appreciationValue, 'MXN'), colX5, yPosition + 5);
    }
    
    yPosition += 7;
  });
  
  // Footer with disclaimer
  const footerY = pageHeight - 30;
  pdf.setFontSize(7);
  pdf.setTextColor(100, 100, 100);
  pdf.setFont('helvetica', 'italic');
  
  // Remove HTML tags from disclaimer for PDF
  const disclaimerText = t.calculator.disclaimer.replace(/<[^>]*>/g, '');
  const disclaimerLines = pdf.splitTextToSize(disclaimerText, pageWidth - 2 * margin);
  pdf.text(disclaimerLines, margin, footerY);
  
  pdf.setFont('helvetica', 'normal');
  pdf.text('www.arvenhouse.com | contacto@arvenhouse.com', pageWidth / 2, footerY + 18, { align: 'center' });
  
  // Save the PDF
  pdf.save(`ARVEN-House-Projection-${inputs.currency}-${new Date().getTime()}.pdf`);
}
