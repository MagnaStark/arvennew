import jsPDF from 'jspdf';
import { formatCurrency, formatPercent } from './projectionEngine';
import { BRAND } from '../config/theme';

/**
 * Generate a PDF report of the investment projection
 * 
 * @param {Object} projectionData - The projection data from projectionEngine
 * @param {Object} inputs - User inputs (price, fractions, payment type, etc.)
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
  
  const inputLines = [
    `Precio por fracción: ${formatCurrency(inputs.pricePerFraction)}`,
    `Número de fracciones: ${inputs.numberOfFractions}`,
    `Inversión total: ${formatCurrency(projectionData.summary.totalInvestment)}`,
    `Tipo de pago: ${inputs.paymentType === 'financed' ? 'Financiado' : 'Contado'}`,
    `Tasa anual: ${formatPercent(inputs.annualRate * 100)}`,
    `Periodo de proyección: ${inputs.years} años`,
  ];
  
  inputLines.forEach(line => {
    pdf.text(line, margin, yPosition);
    yPosition += 6;
  });
  
  // Summary Section
  yPosition += 5;
  pdf.setFillColor(...primaryColor);
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 25, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Resumen de Resultados', margin + 5, yPosition + 8);
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Capital final: ${formatCurrency(projectionData.summary.finalBalance)}`, margin + 5, yPosition + 15);
  pdf.text(`Rendimiento total: ${formatCurrency(projectionData.summary.totalReturns)}`, margin + 5, yPosition + 21);
  
  // Table Header
  yPosition += 35;
  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Proyección Anual', margin, yPosition);
  
  yPosition += 8;
  pdf.setFillColor(...accentColor);
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
  
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  
  const colX1 = margin + 5;
  const colX2 = margin + 30;
  const colX3 = margin + 75;
  const colX4 = margin + 120;
  
  pdf.text('Año', colX1, yPosition + 5);
  pdf.text('Capital Inicial', colX2, yPosition + 5);
  pdf.text('Capital Final', colX3, yPosition + 5);
  pdf.text('ROI Total', colX4, yPosition + 5);
  
  // Table Rows
  yPosition += 8;
  pdf.setFont('helvetica', 'normal');
  
  projectionData.yearlyResults.forEach((yearData, index) => {
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      yPosition = 20;
    }
    
    if (index % 2 === 0) {
      pdf.setFillColor(250, 250, 250);
      pdf.rect(margin, yPosition, pageWidth - 2 * margin, 7, 'F');
    }
    
    pdf.text(yearData.year.toString(), colX1, yPosition + 5);
    pdf.text(formatCurrency(yearData.startingBalance), colX2, yPosition + 5);
    pdf.text(formatCurrency(yearData.endingBalance), colX3, yPosition + 5);
    pdf.text(formatPercent(yearData.totalROI), colX4, yPosition + 5);
    
    yPosition += 7;
  });
  
  // Footer with disclaimer
  const footerY = pageHeight - 25;
  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 100);
  pdf.setFont('helvetica', 'italic');
  
  const disclaimer = 'Estas proyecciones son ilustrativas y no constituyen asesoría financiera. Los resultados reales pueden variar.';
  const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 2 * margin);
  pdf.text(disclaimerLines, margin, footerY);
  
  pdf.setFont('helvetica', 'normal');
  pdf.text('www.arvenhouse.com | contacto@arvenhouse.com', pageWidth / 2, footerY + 8, { align: 'center' });
  
  // Save the PDF
  pdf.save(`ARVEN-House-Proyeccion-${new Date().getTime()}.pdf`);
}
