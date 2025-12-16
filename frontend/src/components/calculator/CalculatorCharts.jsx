import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/projectionEngine';
import { calculateProjection, getYieldRange } from '../../utils/projectionEngine';
import { PRICING } from '../../config/theme';
import { useLanguage } from '../../contexts/LanguageContext';

export const CalculatorCharts = ({ 
  projectionData, 
  pricePerFraction, 
  numberOfFractions, 
  paymentType, 
  years, 
  currency,
  financingYears 
}) => {
  const { t } = useLanguage();

  // Prepare data for growth chart (yields only)
  const yieldsOnlyData = projectionData.yearlyResults.map((yearData) => ({
    año: `${t.calculator.tables.year} ${yearData.year}`,
    capital: yearData.endingBalance,
    inversión: projectionData.summary.totalInvestment,
  }));

  // Prepare data for yields + appreciation chart
  const yieldsAndAppreciationData = projectionData.yearlyResults.map((yearData) => ({
    año: `${t.calculator.tables.year} ${yearData.year}`,
    yieldsOnly: yearData.endingBalance,
    yieldsAndAppreciation: yearData.totalValueWithAppreciation,
    inversión: projectionData.summary.totalInvestment,
  }));

  // Prepare comparison data (min vs max scenario)
  const yieldRange = getYieldRange(paymentType);
  const priceType = pricePerFraction === PRICING.preSale[currency] ? 'presale' : 'discounted';
  const minScenario = calculateProjection(
    pricePerFraction, 
    numberOfFractions, 
    paymentType, 
    yieldRange.min, 
    years,
    currency,
    financingYears
  );
  const maxScenario = calculateProjection(
    pricePerFraction, 
    numberOfFractions, 
    paymentType, 
    yieldRange.max, 
    years,
    currency,
    financingYears
  );

  const comparisonData = [
    {
      escenario: t.calculator.charts.scenarios.minimum,
      rendimiento: minScenario.summary.totalReturns,
      total: minScenario.summary.totalGain,
      rate: `${(yieldRange.min * 100).toFixed(0)}%`,
    },
    {
      escenario: t.calculator.charts.scenarios.current,
      rendimiento: projectionData.summary.totalReturns,
      total: projectionData.summary.totalGain,
      rate: `${(projectionData.summary.annualRate * 100).toFixed(1)}%`,
    },
    {
      escenario: t.calculator.charts.scenarios.maximum,
      rendimiento: maxScenario.summary.totalReturns,
      total: maxScenario.summary.totalGain,
      rate: `${(yieldRange.max * 100).toFixed(0)}%`,
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-[#D4D1C5]">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value, currency)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Yields Only Chart */}
      <div className="bg-white p-6 rounded-lg border-2 border-[#D4D1C5]">
        <h3 className="text-xl font-semibold text-[#41472D] mb-4">{t.calculator.charts.yieldsOnly}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yieldsOnlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D4D1C5" />
            <XAxis dataKey="año" stroke="#6B7055" />
            <YAxis stroke="#6B7055" tickFormatter={(value) => {
              if (currency === 'USD') {
                return `$${(value / 1000).toFixed(0)}K`;
              }
              return `$${(value / 1000000).toFixed(1)}M`;
            }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="capital"
              stroke="#41472D"
              strokeWidth={3}
              name={t.calculator.charts.legends.capitalWithYields}
              dot={{ fill: '#41472D', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="inversión"
              stroke="#EFE6AB"
              strokeWidth={2}
              strokeDasharray="5 5"
              name={t.calculator.charts.legends.initialInvestment}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Yields + Appreciation Chart */}
      <div className="bg-white p-6 rounded-lg border-2 border-[#D4D1C5]">
        <h3 className="text-xl font-semibold text-[#41472D] mb-4">
          {t.calculator.charts.yieldsAndAppreciation}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yieldsAndAppreciationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D4D1C5" />
            <XAxis dataKey="año" stroke="#6B7055" />
            <YAxis stroke="#6B7055" tickFormatter={(value) => {
              if (currency === 'USD') {
                return `$${(value / 1000).toFixed(0)}K`;
              }
              return `$${(value / 1000000).toFixed(1)}M`;
            }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="yieldsOnly"
              stroke="#6B7055"
              strokeWidth={2}
              name={t.calculator.charts.legends.onlyYields}
              dot={{ fill: '#6B7055', r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="yieldsAndAppreciation"
              stroke="#41472D"
              strokeWidth={3}
              name={t.calculator.charts.legends.yieldsAndAppreciation}
              dot={{ fill: '#41472D', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        {currency === 'MXN' && (
          <p className="text-sm text-[#6B7055] mt-2 text-center">
            {t.calculator.charts.appreciationNote}
          </p>
        )}
      </div>

      {/* Comparison Chart */}
      <div className="bg-white p-6 rounded-lg border-2 border-[#D4D1C5]">
        <h3 className="text-xl font-semibold text-[#41472D] mb-4">
          {t.calculator.charts.comparison} ({years} {years === 1 ? t.calculator.inputs.year : t.calculator.inputs.years})
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D4D1C5" />
            <XAxis dataKey="escenario" stroke="#6B7055" />
            <YAxis stroke="#6B7055" tickFormatter={(value) => {
              if (currency === 'USD') {
                return `$${(value / 1000).toFixed(0)}K`;
              }
              return `$${(value / 1000000).toFixed(1)}M`;
            }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="rendimiento" fill="#6B7055" name={t.calculator.charts.legends.yieldsOnly} radius={[8, 8, 0, 0]} />
            <Bar dataKey="total" fill="#41472D" name={t.calculator.charts.legends.totalGain} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-around text-sm text-[#6B7055]">
          {comparisonData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="font-medium text-[#41472D]">{item.escenario}</div>
              <div>{t.calculator.charts.scenarios.rate}: {item.rate}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
