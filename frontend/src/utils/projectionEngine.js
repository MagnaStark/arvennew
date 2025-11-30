/**
 * ARVEN House Investment Projection Engine
 * 
 * This module calculates investment returns for fractional villa ownership.
 * It uses quarterly compounding based on payment type (Financed or Cash).
 * 
 * FUTURE ENHANCEMENT:
 * This engine is designed to be modular. In the future, you can replace
 * this logic with data from Excel/CSV files by:
 * 1. Loading the Excel/CSV data
 * 2. Mapping the columns to the same data structure this function returns
 * 3. Replacing the call to this function with your Excel-based data
 */

/**
 * Calculate investment projection with quarterly compounding
 * 
 * @param {number} pricePerFraction - Price of one fraction (MXN)
 * @param {number} numberOfFractions - Number of fractions purchased
 * @param {string} paymentType - 'financed' or 'cash'
 * @param {number} annualRate - Annual interest rate (as decimal, e.g., 0.07 for 7%)
 * @param {number} years - Projection period in years
 * @returns {Object} Projection data with quarterly and yearly results
 */
export function calculateProjection(pricePerFraction, numberOfFractions, paymentType, annualRate, years) {
  const totalInvestment = pricePerFraction * numberOfFractions;
  const quarterlyRate = annualRate / 4; // Convert annual rate to quarterly
  const totalQuarters = years * 4;
  
  const quarterlyResults = [];
  let currentBalance = totalInvestment;
  
  // Calculate for each quarter
  for (let quarter = 1; quarter <= totalQuarters; quarter++) {
    const startingBalance = currentBalance;
    const interestEarned = startingBalance * quarterlyRate;
    const endingBalance = startingBalance + interestEarned;
    
    const yearNumber = Math.ceil(quarter / 4);
    const quarterInYear = ((quarter - 1) % 4) + 1;
    
    quarterlyResults.push({
      quarter,
      year: yearNumber,
      quarterInYear,
      startingBalance,
      interestEarned,
      endingBalance,
    });
    
    currentBalance = endingBalance;
  }
  
  // Aggregate results by year
  const yearlyResults = [];
  for (let year = 1; year <= years; year++) {
    const yearQuarters = quarterlyResults.filter(q => q.year === year);
    const startingBalance = yearQuarters[0].startingBalance;
    const endingBalance = yearQuarters[yearQuarters.length - 1].endingBalance;
    const totalInterest = yearQuarters.reduce((sum, q) => sum + q.interestEarned, 0);
    const totalROI = ((endingBalance - totalInvestment) / totalInvestment) * 100;
    
    yearlyResults.push({
      year,
      startingBalance,
      endingBalance,
      totalInterest,
      totalROI,
    });
  }
  
  return {
    summary: {
      totalInvestment,
      paymentType,
      annualRate,
      years,
      finalBalance: currentBalance,
      totalReturns: currentBalance - totalInvestment,
      totalROI: ((currentBalance - totalInvestment) / totalInvestment) * 100,
    },
    quarterlyResults,
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
    return { min: 0.05, max: 0.07 }; // 5-7%
  } else {
    return { min: 0.08, max: 0.12 }; // 8-12%
  }
}

/**
 * Format currency in Mexican Pesos
 * @param {number} amount
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format percentage
 * @param {number} percent
 * @returns {string} Formatted percentage string
 */
export function formatPercent(percent) {
  return `${percent.toFixed(2)}%`;
}
