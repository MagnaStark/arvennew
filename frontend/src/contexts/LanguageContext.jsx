import React, { createContext, useContext, useState, useEffect } from 'react';
import es from '../i18n/es.json';
import en from '../i18n/en.json';

// Import other languages (will be created)
// import fr from '../i18n/fr.json';
// import it from '../i18n/it.json';
// import zh from '../i18n/zh.json';

const translations = {
  es,
  en,
  // fr,
  // it,
  // zh,
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('es');

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('arven-language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (languageCode) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('arven-language', languageCode);
    }
  };

  const t = translations[currentLanguage] || translations.es;

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
