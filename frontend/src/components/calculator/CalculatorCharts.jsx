import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/projectionEngine';
import { calculateProjection, getYieldRange } from '../../utils/projectionEngine';

export const CalculatorCharts = ({ projectionData, pricePerFraction, numberOfFractions, paymentType, years }) => {
  // Prepare data for growth chart
  const growthData = projectionData.yearlyResults.map((yearData) => ({
    año: `Año ${yearData.year}`,
    capital: yearData.endingBalance,
    inversión: projectionData.summary.totalInvestment,
  }));

  // Prepare comparison data (min vs max scenario)
  const yieldRange = getYieldRange(paymentType);
  const minScenario = calculateProjection(pricePerFraction, numberOfFractions, paymentType, yieldRange.min, years);
  const maxScenario = calculateProjection(pricePerFraction, numberOfFractions, paymentType, yieldRange.max, years);

  const comparisonData = [
    {
      escenario: 'Mínimo',
      rendimiento: minScenario.summary.totalReturns,
      rate: `${(yieldRange.min * 100).toFixed(0)}%`,
    },
    {
      escenario: 'Actual',
      rendimiento: projectionData.summary.totalReturns,
      rate: `${(projectionData.summary.annualRate * 100).toFixed(1)}%`,
    },
    {
      escenario: 'Máximo',
      rendimiento: maxScenario.summary.totalReturns,
      rate: `${(yieldRange.max * 100).toFixed(0)}%`,
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-[#D4D1C5]">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Growth Chart */}
      <div className="bg-white p-6 rounded-lg border-2 border-[#D4D1C5]">
        <h3 className="text-xl font-semibold text-[#41472D] mb-4">Crecimiento de Capital en el Tiempo</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D4D1C5" />
            <XAxis dataKey="año" stroke="#6B7055" />
            <YAxis stroke="#6B7055" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="capital"
              stroke="#41472D"
              strokeWidth={3}
              name="Capital Final"
              dot={{ fill: '#41472D', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="inversión"
              stroke="#EFE6AB"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Inversión Inicial"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Comparison Chart */}
      <div className="bg-white p-6 rounded-lg border-2 border-[#D4D1C5]">
        <h3 className="text-xl font-semibold text-[#41472D] mb-4">
          Comparación de Escenarios ({years} años)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D4D1C5" />
            <XAxis dataKey="escenario" stroke="#6B7055" />
            <YAxis stroke="#6B7055" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="rendimiento" fill="#41472D" name="Rendimiento Total" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-around text-sm text-[#6B7055]">
          {comparisonData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="font-medium text-[#41472D]">{item.escenario}</div>
              <div>Tasa: {item.rate}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
