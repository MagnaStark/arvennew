import React, { useState } from 'react';
import { BRAND } from '../config/theme';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Cómo Funciona', id: 'how-it-works' },
    { label: 'Calculadora', id: 'calculator' },
    { label: 'Beneficios', id: 'benefits' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contacto', id: 'contact' },
  ];

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
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#41472D] text-white px-6 py-2 rounded-md hover:bg-[#6B7055] transition-all duration-200"
            >
              Hablar con asesor
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
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full bg-[#41472D] text-white px-4 py-3 rounded-md hover:bg-[#6B7055] transition-all duration-200 mt-2"
            >
              Hablar con asesor
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
