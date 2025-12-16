import React from 'react';
import { formatCurrency, formatPercent } from '../../utils/projectionEngine';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useLanguage } from '../../contexts/LanguageContext';

export const CalculatorTables = ({ projectionData, currency }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-[#D4D1C5]">
      <Tabs defaultValue="yearly" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="yearly">{t.calculator.tables.yearly}</TabsTrigger>
          <TabsTrigger value="semiannual">{t.calculator.tables.semiannual}</TabsTrigger>
        </TabsList>

        {/* Yearly Table */}
        <TabsContent value="yearly">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FFFBF2]">
                  <TableHead className="text-[#41472D] font-semibold">{t.calculator.tables.year}</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">{t.calculator.tables.startingCapital}</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">{t.calculator.tables.returns}</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">{t.calculator.tables.endingCapital}</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">{t.calculator.tables.appreciation}</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">{t.calculator.tables.totalValue}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectionData.yearlyResults.map((yearData) => (
                  <TableRow key={yearData.year} className="hover:bg-[#FFFBF2] transition-colors duration-150">
                    <TableCell className="font-medium text-[#41472D]">{yearData.year}</TableCell>
                    <TableCell>{formatCurrency(yearData.startingBalance, currency)}</TableCell>
                    <TableCell className="text-green-700 font-medium">{formatCurrency(yearData.totalInterest, currency)}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(yearData.endingBalance, currency)}</TableCell>
                    <TableCell className="text-blue-700 font-medium">
                      {currency === 'MXN' ? formatCurrency(yearData.appreciationValue, 'MXN') : 'N/A'}
                    </TableCell>
                    <TableCell className="font-bold text-[#41472D]">
                      {formatCurrency(yearData.totalValueWithAppreciation, currency)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Semi-annual Table */}
        <TabsContent value="semiannual">
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white">
                <TableRow className="bg-[#FFFBF2]">
                  <TableHead className="text-[#41472D] font-semibold">{t.calculator.tables.year}</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">{t.calculator.tables.semester}</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">{t.calculator.tables.startingCapital}</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">{t.calculator.tables.return}</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">{t.calculator.tables.endingCapital}</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">{t.calculator.tables.status}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectionData.semiAnnualResults.map((periodData) => (
                  <TableRow key={periodData.period} className="hover:bg-[#FFFBF2] transition-colors duration-150">
                    <TableCell className="font-medium text-[#41472D]">{periodData.year}</TableCell>
                    <TableCell>S{periodData.periodInYear}</TableCell>
                    <TableCell>{formatCurrency(periodData.startingBalance, currency)}</TableCell>
                    <TableCell className={periodData.yieldsActive ? "text-green-700" : "text-gray-400"}>
                      {formatCurrency(periodData.interestEarned, currency)}
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(periodData.endingBalance, currency)}</TableCell>
                    <TableCell>
                      {periodData.yieldsActive ? (
                        <span className="text-green-600 text-xs">✓ {t.calculator.tables.active}</span>
                      ) : (
                        <span className="text-gray-400 text-xs">○ {t.calculator.tables.financing}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
