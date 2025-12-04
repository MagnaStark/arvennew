/**
 * ARVEN House Investment Projection Engine - UPDATED
 * 
 * This module calculates investment returns for fractional villa ownership.
 * Uses SEMI-ANNUAL compounding based on payment type (Financed or Cash).
 * Includes appreciation (plusvalía) calculations.
 * 
 * KEY CHANGES:
 * - Semi-annual (6-month) compounding instead of quarterly
 * - Financed: yields begin AFTER full payoff
 * - Appreciation: reaches 850,000 MXN in 20 months
 * - Supports MXN and USD currencies
 */

/**
 * Calculate appreciation value at a given month
 * Appreciation grows from initial investment to 850,000 MXN over 20 months
 * 
 * @param {number} initialValue - Starting value
 * @param {number} month - Month number (1-based)
 * @returns {number} Appreciation value at that month
 */
function calculateAppreciation(initialValue, month) {
  const maxAppreciation = 850000; // MXN
  const appreciationMonths = 20;
  
  if (month <= 0) return initialValue;
  if (month >= appreciationMonths) return maxAppreciation;
  
  // Linear growth for simplicity (can be changed to exponential if needed)
  const appreciationGain = maxAppreciation - initialValue;
  const monthlyGrowth = appreciationGain / appreciationMonths;
  
  return initialValue + (monthlyGrowth * month);
}

/**
 * Calculate investment projection with semi-annual compounding
 * 
 * @param {number} pricePerFraction - Price of one fraction
 * @param {number} numberOfFractions - Number of fractions purchased
 * @param {string} paymentType - 'financed' or 'cash'
 * @param {number} annualRate - Annual interest rate (as decimal, e.g., 0.07 for 7%)
 * @param {number} years - Projection period in years
 * @param {string} currency - 'MXN' or 'USD'
 * @param {number} financingYears - Years to pay off (only for financed)
 * @returns {Object} Projection data with semi-annual and yearly results
 */
export function calculateProjection(pricePerFraction, numberOfFractions, paymentType, annualRate, years, currency = 'MXN', financingYears = 2) {
  const totalInvestment = pricePerFraction * numberOfFractions;
  const semiAnnualRate = annualRate / 2; // Convert annual rate to semi-annual
  const totalPeriods = years * 2; // 2 periods per year
  
  // For financed, calculate when yields start (after financing is paid off)
  const yieldsStartPeriod = paymentType === 'financed' ? (financingYears * 2) : 0;
  
  const semiAnnualResults = [];
  let currentBalance = totalInvestment;
  let accumulatedYield = 0;
  
  // Calculate for each semi-annual period
  for (let period = 1; period <= totalPeriods; period++) {
    const yearNumber = Math.ceil(period / 2);
    const periodInYear = ((period - 1) % 2) + 1; // 1 or 2
    const monthNumber = period * 6; // Convert period to months
    
    const startingBalance = currentBalance;
    
    // Calculate yield (only after financing is paid off for financed type)
    let interestEarned = 0;
    if (period > yieldsStartPeriod) {
      interestEarned = startingBalance * semiAnnualRate;
      accumulatedYield += interestEarned;
    }
    
    const endingBalance = startingBalance + interestEarned;
    
    // Calculate appreciation (only in MXN)
    const appreciationValue = currency === 'MXN' 
      ? calculateAppreciation(totalInvestment, monthNumber)
      : totalInvestment; // No appreciation in USD for this version
    
    const totalValueWithAppreciation = endingBalance - totalInvestment + appreciationValue;
    
    semiAnnualResults.push({
      period,
      year: yearNumber,
      periodInYear,
      month: monthNumber,
      startingBalance,
      interestEarned,
      endingBalance,
      appreciationValue,
      totalValueWithAppreciation,
      yieldsActive: period > yieldsStartPeriod,
    });
    
    currentBalance = endingBalance;
  }
  
  // Aggregate results by year
  const yearlyResults = [];
  for (let year = 1; year <= years; year++) {
    const yearPeriods = semiAnnualResults.filter(p => p.year === year);
    const startingBalance = yearPeriods[0].startingBalance;
    const endingBalance = yearPeriods[yearPeriods.length - 1].endingBalance;
    const totalInterest = yearPeriods.reduce((sum, p) => sum + p.interestEarned, 0);
    const totalROI = ((endingBalance - totalInvestment) / totalInvestment) * 100;
    const yearEndAppreciation = yearPeriods[yearPeriods.length - 1].appreciationValue;
    const totalValueWithAppreciation = yearPeriods[yearPeriods.length - 1].totalValueWithAppreciation;
    
    yearlyResults.push({
      year,
      startingBalance,
      endingBalance,
      totalInterest,
      totalROI,
      appreciationValue: yearEndAppreciation,
      totalValueWithAppreciation,
    });
  }
  
  const finalPeriod = semiAnnualResults[semiAnnualResults.length - 1];
  
  return {
    summary: {
      totalInvestment,
      paymentType,
      annualRate,
      years,
      currency,
      finalBalance: currentBalance,
      totalReturns: currentBalance - totalInvestment,
      totalROI: ((currentBalance - totalInvestment) / totalInvestment) * 100,
      finalAppreciation: finalPeriod.appreciationValue,
      finalValueWithAppreciation: finalPeriod.totalValueWithAppreciation,
      totalGain: finalPeriod.totalValueWithAppreciation - totalInvestment,
      yieldsStartYear: paymentType === 'financed' ? financingYears : 0,
    },
    semiAnnualResults,
    yearlyResults,
  };
}

/**
 * Get the yield range based on payment type
 * @param {string} paymentType - 'financed' or 'cash'
 * @returns {Object} Min and max rates for the payment type
 */
export function getYieldRange(paymentType) {
  if (paymentType === 'financed') {
    return { min: 0.05, max: 0.08 }; // 5-8%
  } else {
    return { min: 0.08, max: 0.12 }; // 8-12%
  }
}

/**
 * Format currency based on selected currency
 * @param {number} amount
 * @param {string} currency - 'MXN' or 'USD'
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'MXN') {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } else {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
}

/**
 * Format percentage
 * @param {number} percent
 * @returns {string} Formatted percentage string
 */
export function formatPercent(percent) {
  return `${percent.toFixed(2)}%`;
}
