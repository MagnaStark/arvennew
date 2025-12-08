import React from 'react';
import { TrendingUp, DollarSign, Calendar, Percent, Home } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/projectionEngine';

export const CalculatorSummary = ({ projectionData, paymentType, annualRate, years, currency }) => {
  const summary = projectionData.summary;

  const stats = [
    {
      icon: DollarSign,
      label: 'Inversión Total',
      value: formatCurrency(summary.totalInvestment, currency),
      color: 'text-[#41472D]',
    },
    {
      icon: TrendingUp,
      label: 'Rendimientos',
      value: formatCurrency(summary.totalReturns, currency),
      color: 'text-[#41472D]',
    },
    {
      icon: Home,
      label: 'Plusvalía',
      value: currency === 'MXN' ? formatCurrency(summary.finalAppreciation - summary.totalInvestment, 'MXN') : 'N/A',
      color: 'text-[#41472D]',
    },
    {
      icon: Percent,
      label: 'Valor Total Final',
      value: formatCurrency(summary.finalValueWithAppreciation, currency),
      color: 'text-[#41472D]',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#41472D] to-[#6B7055] text-white p-6 rounded-lg shadow-xl">
      <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Pinyon Script', cursive" }}>
        Resumen de tu Inversión
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={20} className="text-[#EFE6AB]" />
                <span className="text-sm text-gray-200">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-4">
        <div className="text-center">
          <div className="text-sm text-gray-200 mb-1">Ganancia Total</div>
          <div className="text-3xl font-bold text-[#EFE6AB]">
            {formatCurrency(summary.totalGain, currency)}
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-200">Tipo de Pago:</span>
          <span className="font-medium">{paymentType === 'financed' ? 'Financiado' : 'Contado'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-200">Tasa Anual:</span>
          <span className="font-medium">{formatPercent(annualRate * 100)} (semestral)</span>
        </div>
        {paymentType === 'financed' && summary.yieldsStartYear > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-200">Rendimientos inician:</span>
            <span className="font-medium">Año {summary.yieldsStartYear + 1}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-200">Periodo:</span>
          <span className="font-medium">{years} años</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-200">Moneda:</span>
          <span className="font-medium">{currency}</span>
        </div>
      </div>
    </div>
  );
};
