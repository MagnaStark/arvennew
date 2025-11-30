import React from 'react';
import { Info } from 'lucide-react';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export const CalculatorInputs = ({
  pricePerFraction,
  setPricePerFraction,
  numberOfFractions,
  setNumberOfFractions,
  paymentType,
  setPaymentType,
  annualRate,
  setAnnualRate,
  years,
  setYears,
  yieldRange,
}) => {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border-2 border-[#D4D1C5]">
      <h3 className="text-xl font-semibold text-[#41472D] mb-4">Parámetros de Inversión</h3>

      {/* Price per Fraction */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="price" className="text-[#41472D]">Precio por Fracción (MXN)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-[#6B7055]" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Precio base de cada fracción de la villa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="price"
          type="number"
          value={pricePerFraction}
          onChange={(e) => setPricePerFraction(Number(e.target.value))}
          className="border-[#D4D1C5] focus:border-[#41472D]"
          min={100000}
          step={10000}
        />
      </div>

      {/* Number of Fractions */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Label className="text-[#41472D]">Número de Fracciones: {numberOfFractions}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} className="text-[#6B7055]" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">¿Qué es una fracción? Cada fracción representa una participación en la propiedad de la villa</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Slider
          value={[numberOfFractions]}
          onValueChange={(value) => setNumberOfFractions(value[0])}
          min={1}
          max={10}
          step={1}
          className="my-4"
        />
        <div className="flex justify-between text-xs text-[#6B7055]">
          <span>1</span>
          <span>10</span>
        </div>
      </div>

      {/* Payment Type */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Label className="text-[#41472D]">Tipo de Pago</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-[#6B7055]" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Financiado: 5-7% anual | Contado: 8-12% anual
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPaymentType('financed')}
            className={`py-3 px-4 rounded-md border-2 transition-all duration-200 ${
              paymentType === 'financed'
                ? 'bg-[#41472D] text-white border-[#41472D]'
                : 'bg-white text-[#41472D] border-[#D4D1C5] hover:border-[#41472D]'
            }`}
          >
            <div className="font-medium">Financiado</div>
            <div className="text-xs mt-1 opacity-80">5-7% anual</div>
          </button>
          <button
            onClick={() => setPaymentType('cash')}
            className={`py-3 px-4 rounded-md border-2 transition-all duration-200 ${
              paymentType === 'cash'
                ? 'bg-[#41472D] text-white border-[#41472D]'
                : 'bg-white text-[#41472D] border-[#D4D1C5] hover:border-[#41472D]'
            }`}
          >
            <div className="font-medium">Contado</div>
            <div className="text-xs mt-1 opacity-80">8-12% anual</div>
          </button>
        </div>
      </div>

      {/* Annual Rate */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-[#41472D]">Tasa Anual: {(annualRate * 100).toFixed(1)}%</Label>
        </div>
        <Slider
          value={[annualRate]}
          onValueChange={(value) => setAnnualRate(value[0])}
          min={yieldRange.min}
          max={yieldRange.max}
          step={0.001}
          className="my-4"
        />
        <div className="flex justify-between items-center gap-2 mt-3">
          <button
            onClick={() => setAnnualRate(yieldRange.min)}
            className="text-xs py-1 px-3 border border-[#D4D1C5] rounded hover:bg-[#FFFBF2] transition-colors duration-200"
          >
            Escenario Mínimo ({(yieldRange.min * 100).toFixed(0)}%)
          </button>
          <button
            onClick={() => setAnnualRate(yieldRange.max)}
            className="text-xs py-1 px-3 border border-[#D4D1C5] rounded hover:bg-[#FFFBF2] transition-colors duration-200"
          >
            Escenario Máximo ({(yieldRange.max * 100).toFixed(0)}%)
          </button>
        </div>
      </div>

      {/* Projection Years */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-[#41472D]">Periodo de Proyección: {years} años</Label>
        </div>
        <Slider
          value={[years]}
          onValueChange={(value) => setYears(value[0])}
          min={1}
          max={15}
          step={1}
          className="my-4"
        />
        <div className="flex justify-between text-xs text-[#6B7055]">
          <span>1 año</span>
          <span>15 años</span>
        </div>
      </div>
    </div>
  );
};
