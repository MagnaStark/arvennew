import React from 'react';
import { MapPin, Shield, BarChart3, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const BenefitsSection = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: MapPin,
      title: t.benefits.items.location.title,
      description: t.benefits.items.location.description,
      color: 'from-[#41472D] to-[#6B7055]',
    },
    {
      icon: Shield,
      title: t.benefits.items.management.title,
      description: t.benefits.items.management.description,
      color: 'from-[#6B7055] to-[#41472D]',
    },
    {
      icon: BarChart3,
      title: t.benefits.items.cashflow.title,
      description: t.benefits.items.cashflow.description,
      color: 'from-[#41472D] to-[#6B7055]',
    },
    {
      icon: Users,
      title: t.benefits.items.transparency.title,
      description: t.benefits.items.transparency.description,
      color: 'from-[#6B7055] to-[#41472D]',
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#41472D] mb-4" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            {t.benefits.title}
          </h2>
          <p className="text-lg text-[#6B7055] max-w-2xl mx-auto">
            {t.benefits.subtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#FFFBF2] to-white border-2 border-[#D4D1C5] hover:border-[#41472D] transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-8">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={32} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold text-[#41472D] mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-[#6B7055] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#EFE6AB] opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
