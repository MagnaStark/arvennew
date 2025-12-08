import jsPDF from 'jspdf';
import { formatCurrency, formatPercent } from './projectionEngine';
import { BRAND, PRICING } from '../config/theme';

/**
 * Generate a PDF report of the investment projection - UPDATED
 * 
 * @param {Object} projectionData - The projection data from projectionEngine
 * @param {Object} inputs - User inputs (price, fractions, payment type, currency, etc.)
 */
export async function generatePDF(projectionData, inputs) {
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
  pdf.text('UN LEGADO NATURAL', pageWidth / 2, 28, { align: 'center' });
  
  // Title
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Proyección de Inversión', margin, 55);
  
  // Date
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const today = new Date().toLocaleDateString('es-MX', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  pdf.text(`Fecha: ${today}`, margin, 62);
  
  // User Inputs Section
  let yPosition = 75;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Parámetros de Inversión', margin, yPosition);
  
  yPosition += 8;
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  const priceTypeLabel = inputs.priceType === 'presale' ? 'Pre-venta' : 'Apartando Ahora (10% descuento)';
  const paymentTypeLabel = inputs.paymentType === 'financed' ? 'Financiado' : 'Contado';
  
  const inputLines = [
    `Moneda: ${inputs.currency}`,
    `Tipo de precio: ${priceTypeLabel}`,
    `Precio por fracción: ${formatCurrency(inputs.pricePerFraction, inputs.currency)}`,
    `Número de fracciones: ${inputs.numberOfFractions}`,
    `Inversión total: ${formatCurrency(projectionData.summary.totalInvestment, inputs.currency)}`,
    `Tipo de pago: ${paymentTypeLabel}`,
    `Tasa anual: ${formatPercent(inputs.annualRate * 100)} (semestral)`,
    `Periodo de proyección: ${inputs.years} años`,
  ];
  
  if (inputs.paymentType === 'financed') {
    inputLines.push(`Años para liquidar: ${inputs.financingYears}`);
    inputLines.push(`Rendimientos inician: Año ${inputs.financingYears + 1}`);
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
  pdf.text('Resumen de Resultados', margin + 5, yPosition + 8);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Rendimientos totales: ${formatCurrency(projectionData.summary.totalReturns, inputs.currency)}`, margin + 5, yPosition + 15);
  
  if (inputs.currency === 'MXN') {
    pdf.text(`Plusvalía estimada: ${formatCurrency(projectionData.summary.finalAppreciation - projectionData.summary.totalInvestment, 'MXN')}`, margin + 5, yPosition + 21);
    pdf.text(`Valor total final: ${formatCurrency(projectionData.summary.finalValueWithAppreciation, inputs.currency)}`, margin + 5, yPosition + 27);
  } else {
    pdf.text(`Capital final: ${formatCurrency(projectionData.summary.finalBalance, inputs.currency)}`, margin + 5, yPosition + 21);
  }
  
  // Table Header
  yPosition += 45;
  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Proyección Anual', margin, yPosition);
  
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
  
  pdf.text('Año', colX1, yPosition + 5);
  pdf.text('Capital Inicial', colX2, yPosition + 5);
  pdf.text('Rendimientos', colX3, yPosition + 5);
  pdf.text('Capital Final', colX4, yPosition + 5);
  if (inputs.currency === 'MXN') {
    pdf.text('Plusvalía', colX5, yPosition + 5);
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
  
  const disclaimer = 'AVISO IMPORTANTE: Estas proyecciones son ilustrativas y no constituyen asesoría financiera ni garantía de rendimientos. Los resultados reales pueden variar según condiciones del mercado. Los rendimientos en inversiones financiadas comienzan después de liquidar el pago total. La plusvalía estimada de $850,000 MXN en 20 meses es una proyección basada en el mercado de Tulum y no constituye una garantía. Consulte con un asesor financiero antes de invertir.';
  const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 2 * margin);
  pdf.text(disclaimerLines, margin, footerY);
  
  pdf.setFont('helvetica', 'normal');
  pdf.text('www.arvenhouse.com | contacto@arvenhouse.com', pageWidth / 2, footerY + 18, { align: 'center' });
  
  // Save the PDF
  pdf.save(`ARVEN-House-Proyeccion-${inputs.currency}-${new Date().getTime()}.pdf`);
}
