import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 bg-gradient-to-b from-[#FFFBF2] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="text-[#EFE6AB] text-sm font-medium tracking-wide uppercase mb-4 animate-fade-in">
            {t.hero.tagline}
          </p>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-[#41472D] mb-6 animate-fade-in-up" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            {t.hero.title}
          </h1>

          <h2 className="text-2xl md:text-3xl text-[#6B7055] font-light mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t.hero.subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg text-[#6B7055] mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={scrollToCalculator}
              className="group bg-[#41472D] text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-[#6B7055] transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
            >
              {t.hero.ctaCalculate}
              <TrendingUp className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
            <button
              onClick={scrollToContact}
              className="group border-2 border-[#41472D] text-[#41472D] px-8 py-4 rounded-md text-lg font-medium hover:bg-[#41472D] hover:text-white transition-all duration-300 flex items-center"
            >
              {t.hero.ctaSpeak}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#41472D] mb-2">5-12%</div>
              <div className="text-sm text-[#6B7055]">{t.hero.stats.yield}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#41472D] mb-2">{t.hero.stats.frequency}</div>
              <div className="text-sm text-[#6B7055]">{t.hero.stats.frequencyDesc}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#41472D] mb-2">{t.hero.stats.appreciation}</div>
              <div className="text-sm text-[#6B7055]">{t.hero.stats.appreciationDesc}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
