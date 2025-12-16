import React, { useState } from 'react';
import { BRAND } from '../config/theme';
import { Menu, X, Globe } from 'lucide-react';

// Configurable URL from theme config
const ARVEN_URL = BRAND.websiteUrl;
import { useLanguage } from '../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, currentLanguage, changeLanguage } = useLanguage();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { label: t.header.home, id: 'hero' },
    { label: t.header.howItWorks, id: 'how-it-works' },
    { label: t.header.calculator, id: 'calculator' },
    { label: t.header.benefits, id: 'benefits' },
    { label: t.header.faq, id: 'faq' },
    { label: t.header.contact, id: 'contact' },
  ];

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const currentLangData = languages.find(l => l.code === currentLanguage) || languages[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#D4D1C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img src={BRAND.logo} alt="Arven House" className="h-12 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[#41472D] hover:text-[#6B7055] font-medium transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-[#41472D] hover:text-[#6B7055] font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-[#FFFBF2]">
                <Globe size={18} />
                <span>{currentLangData.flag}</span>
                <span className="hidden lg:inline">{currentLangData.name}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center gap-2 cursor-pointer ${
                      currentLanguage === lang.code ? 'bg-[#FFFBF2]' : ''
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#41472D] text-white px-6 py-2 rounded-md hover:bg-[#6B7055] transition-all duration-200"
            >
              {t.header.speakWithAdvisor}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#41472D]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-[#41472D] hover:bg-[#FFFBF2] transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="px-4 py-2">
              <div className="text-sm font-medium text-[#6B7055] mb-2">Language / Idioma</div>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                      currentLanguage === lang.code
                        ? 'bg-[#41472D] text-white'
                        : 'bg-[#FFFBF2] text-[#41472D] hover:bg-[#EFE6AB]'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className="w-full bg-[#41472D] text-white px-4 py-3 rounded-md hover:bg-[#6B7055] transition-all duration-200 mt-2"
            >
              {t.header.speakWithAdvisor}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
