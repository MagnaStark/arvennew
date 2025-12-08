import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { CalculatorInputs } from './calculator/CalculatorInputs';
import { CalculatorSummary } from './calculator/CalculatorSummary';
import { CalculatorTables } from './calculator/CalculatorTables';
import { CalculatorCharts } from './calculator/CalculatorCharts';
import { calculateProjection, getYieldRange } from '../utils/projectionEngine';
import { generatePDF } from '../utils/pdfGenerator';
import { toast } from 'sonner';
import { PRICING } from '../config/theme';

export const CalculatorSection = () => {
  // Input states
  const [currency, setCurrency] = useState('MXN');
  const [priceType, setPriceType] = useState('discounted'); // 'presale' or 'discounted'
  const [numberOfFractions, setNumberOfFractions] = useState(1);
  const [paymentType, setPaymentType] = useState('cash');
  const [annualRate, setAnnualRate] = useState(0.10); // 10% default
  const [years, setYears] = useState(10);
  const [financingYears, setFinancingYears] = useState(2);

  // Projection data
  const [projectionData, setProjectionData] = useState(null);
  const [yieldRange, setYieldRange] = useState(getYieldRange('cash'));

  // Get current price based on currency and price type
  const pricePerFraction = priceType === 'presale' 
    ? PRICING.preSale[currency]
    : PRICING.discounted[currency];

  // Update yield range when payment type changes
  useEffect(() => {
    const range = getYieldRange(paymentType);
    setYieldRange(range);
    // Auto-adjust rate if it's outside the new range
    if (annualRate < range.min || annualRate > range.max) {
      setAnnualRate((range.min + range.max) / 2);
    }
  }, [paymentType]);

  // Calculate projection whenever inputs change
  useEffect(() => {
    const data = calculateProjection(
      pricePerFraction,
      numberOfFractions,
      paymentType,
      annualRate,
      years,
      currency,
      financingYears
    );
    setProjectionData(data);
  }, [pricePerFraction, numberOfFractions, paymentType, annualRate, years, currency, financingYears]);

  // Handle PDF export
  const handleExportPDF = async () => {
    try {
      toast.info('Generando PDF...');
      await generatePDF(projectionData, {
        pricePerFraction,
        numberOfFractions,
        paymentType,
        annualRate,
        years,
        currency,
        priceType,
        financingYears,
      });
      toast.success('PDF descargado exitosamente');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error al generar el PDF');
    }
  };

  if (!projectionData) {
    return <div className="text-center py-20">Cargando calculadora...</div>;
  }

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-white to-[#FFFBF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-[#41472D] mb-4" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            Calculadora de Inversión
          </h2>
          <p className="text-lg text-[#6B7055] max-w-2xl mx-auto">
            Simula tus rendimientos semestrales, plusvalía y descarga tu proyección en PDF
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left: Inputs */}
          <div className="lg:col-span-1">
            <CalculatorInputs
              currency={currency}
              setCurrency={setCurrency}
              priceType={priceType}
              setPriceType={setPriceType}
              numberOfFractions={numberOfFractions}
              setNumberOfFractions={setNumberOfFractions}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              annualRate={annualRate}
              setAnnualRate={setAnnualRate}
              years={years}
              setYears={setYears}
              yieldRange={yieldRange}
              financingYears={financingYears}
              setFinancingYears={setFinancingYears}
            />
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-2">
            <CalculatorSummary
              projectionData={projectionData}
              paymentType={paymentType}
              annualRate={annualRate}
              years={years}
              currency={currency}
            />
          </div>
        </div>

        {/* Charts */}
        <div className="mb-8">
          <CalculatorCharts
            projectionData={projectionData}
            pricePerFraction={pricePerFraction}
            numberOfFractions={numberOfFractions}
            paymentType={paymentType}
            years={years}
            currency={currency}
            financingYears={financingYears}
          />
        </div>

        {/* Tables */}
        <div className="mb-8">
          <CalculatorTables 
            projectionData={projectionData}
            currency={currency}
          />
        </div>

        {/* Export Button */}
        <div className="text-center">
          <button
            onClick={handleExportPDF}
            className="group bg-[#41472D] text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-[#6B7055] transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
          >
            <Download className="mr-2 group-hover:translate-y-1 transition-transform duration-300" size={20} />
            Descargar Proyección en PDF
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#6B7055] italic max-w-3xl mx-auto bg-[#FFFBF2] p-4 rounded-lg border border-[#D4D1C5]">
            <strong>Aviso:</strong> Estas proyecciones son ilustrativas y no constituyen asesoría financiera. 
            Los rendimientos mostrados están basados en estimaciones y los resultados reales pueden variar. 
            Los rendimientos en inversiones financiadas comienzan después de liquidar el pago total.
            La plusvalía estimada de $850,000 MXN en 20 meses es una proyección y no una garantía.
            Te recomendamos consultar con un asesor financiero antes de tomar decisiones de inversión.
          </p>
        </div>
      </div>
    </section>
  );
};
