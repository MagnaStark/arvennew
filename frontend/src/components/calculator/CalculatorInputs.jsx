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
                <p className="max-w-xs">{t.calculator.inputs.priceTypeTooltip}</p>
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
            <div className="font-medium">{t.calculator.inputs.presale}</div>
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
            <div className="font-medium">{t.calculator.inputs.discounted}</div>
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
            <Label className="text-[#41472D]">{t.calculator.inputs.fractions}: {numberOfFractions}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} className="text-[#6B7055]" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{t.calculator.inputs.fractionsTooltip}</p>
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
          <Label className="text-[#41472D]">{t.calculator.inputs.paymentType}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-[#6B7055]" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs whitespace-pre-line">{t.calculator.inputs.paymentTypeTooltip}</p>
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
            <div className="font-medium">{t.calculator.inputs.financed}</div>
            <div className="text-xs mt-1 opacity-80">5-8%</div>
          </button>
          <button
            onClick={() => setPaymentType('cash')}
            className={`py-3 px-4 rounded-md border-2 transition-all duration-200 ${
              paymentType === 'cash'
                ? 'bg-[#41472D] text-white border-[#41472D]'
                : 'bg-white text-[#41472D] border-[#D4D1C5] hover:border-[#41472D]'
            }`}
          >
            <div className="font-medium">{t.calculator.inputs.cash}</div>
            <div className="text-xs mt-1 opacity-80">8-12%</div>
          </button>
        </div>
      </div>

      {/* Financing Years (only show if financed) */}
      {paymentType === 'financed' && (
        <div className="bg-[#FFFBF2] p-4 rounded-md border border-[#EFE6AB]">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-[#41472D]">{t.calculator.inputs.financingYears}: {financingYears}</Label>
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
            <span>1 {t.calculator.inputs.year}</span>
            <span>5 {t.calculator.inputs.years}</span>
          </div>
          <p className="text-xs text-[#6B7055] mt-2 italic">
            {t.calculator.inputs.financingNote}
          </p>
        </div>
      )}

      {/* Annual Rate */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-[#41472D]">{t.calculator.inputs.annualRate}: {(annualRate * 100).toFixed(1)}%</Label>
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
            {t.calculator.inputs.minScenario} ({(yieldRange.min * 100).toFixed(0)}%)
          </button>
          <button
            onClick={() => setAnnualRate(yieldRange.max)}
            className="text-xs py-1 px-3 border border-[#D4D1C5] rounded hover:bg-[#FFFBF2] transition-colors duration-200"
          >
            {t.calculator.inputs.maxScenario} ({(yieldRange.max * 100).toFixed(0)}%)
          </button>
        </div>
      </div>

      {/* Projection Years */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-[#41472D]">{t.calculator.inputs.projectionYears}: {years} {years === 1 ? t.calculator.inputs.year : t.calculator.inputs.years}</Label>
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
          <span>1 {t.calculator.inputs.year}</span>
          <span>15 {t.calculator.inputs.years}</span>
        </div>
      </div>
    </div>
  );
};
