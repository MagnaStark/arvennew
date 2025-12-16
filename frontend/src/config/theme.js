// ARVEN House Brand Configuration
// Centralizes all brand assets, colors, fonts, and styling

export const BRAND = {
  name: 'Arven House',
  tagline: 'UN LEGADO NATURAL',
  logo: '/logo.png',
  websiteUrl: 'https://www.arvenhouse.com.mx/',
  
  colors: {
    // Primary Colors
    bosque: '#41472D',        // Deep forest green - primary brand color
    coconutMilk: '#FFFBF2',   // Off-white cream - backgrounds
    buttermilk: '#EFE6AB',    // Pale warm yellow - accents
    
    // Semantic Colors
    primary: '#41472D',
    background: '#FFFBF2',
    accent: '#EFE6AB',
    text: '#41472D',
    textLight: '#6B7055',
    border: '#D4D1C5',
  },
  
  typography: {
    // Script font for headings and brand name
    heading: "'Pinyon Script', cursive",
    // Clean sans-serif for body text
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  
  spacing: {
    section: '6rem',
    container: '1200px',
  },
};

// Pricing Configuration
export const PRICING = {
  // Pre-sale prices
  preSale: {
    MXN: 555000,
    USD: 30000,
  },
  // Discounted prices (10% off)
  discounted: {
    MXN: 499500,
    USD: 27000,
  },
  // Appreciation (Plusvalía)
  appreciation: {
    maxValue: 850000, // MXN only
    months: 20, // 1 year 8 months
  },
  // Exchange rate for reference
  exchangeRate: 18.5, // 1 USD = 18.5 MXN (approximate)
};

// Google Fonts Import URL
export const FONT_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Pinyon+Script&display=swap';
