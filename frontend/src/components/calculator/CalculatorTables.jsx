import React, { useState } from 'react';
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

export const CalculatorTables = ({ projectionData }) => {
  return (
    <div className="bg-white p-6 rounded-lg border-2 border-[#D4D1C5]">
      <Tabs defaultValue="yearly" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="yearly">Proyección Anual</TabsTrigger>
          <TabsTrigger value="quarterly">Proyección Trimestral</TabsTrigger>
        </TabsList>

        {/* Yearly Table */}
        <TabsContent value="yearly">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FFFBF2]">
                  <TableHead className="text-[#41472D] font-semibold">Año</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">Capital Inicial</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">Interés Generado</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">Capital Final</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">ROI Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectionData.yearlyResults.map((yearData) => (
                  <TableRow key={yearData.year} className="hover:bg-[#FFFBF2] transition-colors duration-150">
                    <TableCell className="font-medium text-[#41472D]">{yearData.year}</TableCell>
                    <TableCell>{formatCurrency(yearData.startingBalance)}</TableCell>
                    <TableCell className="text-green-700 font-medium">{formatCurrency(yearData.totalInterest)}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(yearData.endingBalance)}</TableCell>
                    <TableCell className="font-semibold text-[#41472D]">{formatPercent(yearData.totalROI)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Quarterly Table */}
        <TabsContent value="quarterly">
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white">
                <TableRow className="bg-[#FFFBF2]">
                  <TableHead className="text-[#41472D] font-semibold">Año</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">Trimestre</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">Capital Inicial</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">Interés</TableHead>
                  <TableHead className="text-[#41472D] font-semibold">Capital Final</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectionData.quarterlyResults.map((quarterData) => (
                  <TableRow key={quarterData.quarter} className="hover:bg-[#FFFBF2] transition-colors duration-150">
                    <TableCell className="font-medium text-[#41472D]">{quarterData.year}</TableCell>
                    <TableCell>Q{quarterData.quarterInYear}</TableCell>
                    <TableCell>{formatCurrency(quarterData.startingBalance)}</TableCell>
                    <TableCell className="text-green-700">{formatCurrency(quarterData.interestEarned)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(quarterData.endingBalance)}</TableCell>
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
