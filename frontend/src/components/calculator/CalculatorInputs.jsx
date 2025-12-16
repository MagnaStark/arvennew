import React from 'react';
import { Info } from 'lucide-react';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { PRICING } from '../../config/theme';
import { useLanguage } from '../../contexts/LanguageContext';

export const CalculatorInputs = ({
  currency,
  setCurrency,
  priceType,
  setPriceType,
  numberOfFractions,
  setNumberOfFractions,
  paymentType,
  setPaymentType,
  annualRate,
  setAnnualRate,
  years,
  setYears,
  yieldRange,
  financingYears,
  setFinancingYears,
}) => {
  const { t } = useLanguage();
  
  // Get current price based on currency and price type
  const currentPrice = priceType === 'presale' 
    ? PRICING.preSale[currency]
    : PRICING.discounted[currency];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border-2 border-[#D4D1C5]">
      <h3 className="text-xl font-semibold text-[#41472D] mb-4">{t.calculator.inputs.title}</h3>

      {/* Currency Selector */}
      <div>
        <Label className="text-[#41472D] mb-3 block">{t.calculator.inputs.currency}</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setCurrency('MXN')}
            className={`py-2 px-4 rounded-md border-2 transition-all duration-200 ${
              currency === 'MXN'
                ? 'bg-[#41472D] text-white border-[#41472D]'
                : 'bg-white text-[#41472D] border-[#D4D1C5] hover:border-[#41472D]'
            }`}
          >
            {t.currency.mxn}
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`py-2 px-4 rounded-md border-2 transition-all duration-200 ${
              currency === 'USD'
                ? 'bg-[#41472D] text-white border-[#41472D]'
                : 'bg-white text-[#41472D] border-[#D4D1C5] hover:border-[#41472D]'
            }`}
          >
            {t.currency.usd}
          </button>
        </div>
      </div>

      {/* Price Type Selector */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Label className="text-[#41472D]">{t.calculator.inputs.priceType}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-[#6B7055]" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Elige entre precio de pre-venta o precio con 10% de descuento</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => setPriceType('presale')}
            className={`py-3 px-4 rounded-md border-2 transition-all duration-200 text-left ${
              priceType === 'presale'
                ? 'bg-[#41472D] text-white border-[#41472D]'
                : 'bg-white text-[#41472D] border-[#D4D1C5] hover:border-[#41472D]'
            }`}
          >
            <div className="font-medium">Precio Pre-venta</div>
            <div className="text-sm mt-1 opacity-80">
              {currency === 'MXN' ? '$555,000 MXN' : '$30,000 USD'}
            </div>
          </button>
          <button
            onClick={() => setPriceType('discounted')}
            className={`py-3 px-4 rounded-md border-2 transition-all duration-200 text-left relative ${
              priceType === 'discounted'
                ? 'bg-[#41472D] text-white border-[#41472D]'
                : 'bg-white text-[#41472D] border-[#D4D1C5] hover:border-[#41472D]'
            }`}
          >
            <div className="absolute -top-2 -right-2 bg-[#EFE6AB] text-[#41472D] text-xs font-bold py-1 px-2 rounded">
              10% OFF
            </div>
            <div className="font-medium">Apartando Ahora</div>
            <div className="text-sm mt-1 opacity-80">
              {currency === 'MXN' ? '$499,500 MXN' : '$27,000 USD'}
            </div>
          </button>
        </div>
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
                  <p className="max-w-xs">Cada fracción representa una participación en la propiedad de la villa</p>
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
                  Financiado: 5-8% anual (rendimientos después de liquidar)<br/>
                  Contado: 8-12% anual (rendimientos desde año 1)
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
            <div className="text-xs mt-1 opacity-80">5-8% anual</div>
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

      {/* Financing Years (only show if financed) */}
      {paymentType === 'financed' && (
        <div className="bg-[#FFFBF2] p-4 rounded-md border border-[#EFE6AB]">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-[#41472D]">Años para liquidar: {financingYears}</Label>
          </div>
          <Slider
            value={[financingYears]}
            onValueChange={(value) => setFinancingYears(value[0])}
            min={1}
            max={5}
            step={1}
            className="my-4"
          />
          <div className="flex justify-between text-xs text-[#6B7055]">
            <span>1 año</span>
            <span>5 años</span>
          </div>
          <p className="text-xs text-[#6B7055] mt-2 italic">
            * Los rendimientos comienzan después de liquidar la inversión
          </p>
        </div>
      )}

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
            Mínimo ({(yieldRange.min * 100).toFixed(0)}%)
          </button>
          <button
            onClick={() => setAnnualRate(yieldRange.max)}
            className="text-xs py-1 px-3 border border-[#D4D1C5] rounded hover:bg-[#FFFBF2] transition-colors duration-200"
          >
            Máximo ({(yieldRange.max * 100).toFixed(0)}%)
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
