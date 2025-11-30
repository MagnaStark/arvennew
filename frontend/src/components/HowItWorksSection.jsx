import React from 'react';
import { Search, CreditCard, TrendingUp, Home } from 'lucide-react';

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: 'Elige tus Fracciones',
      description: 'Decide cuántas fracciones de la villa deseas adquirir según tu presupuesto de inversión.',
    },
    {
      icon: CreditCard,
      title: 'Selecciona tu Forma de Pago',
      description: 'Elige entre pago de contado (mayores rendimientos) o financiamiento (accesibilidad).',
    },
    {
      icon: TrendingUp,
      title: 'Recibe Rendimientos',
      description: 'Obtén retornos trimestrales y benefíciate de la apreciación a largo plazo de tu inversión.',
    },
    {
      icon: Home,
      title: 'Disfruta tu Patrimonio',
      description: 'Acceso a la villa en Tulum y gestión profesional de tu propiedad fraccionada.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#41472D] mb-4" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            ¿Cómo Funciona?
          </h2>
          <p className="text-lg text-[#6B7055] max-w-2xl mx-auto">
            El modelo de propiedad fraccionada te permite invertir en bienes raíces premium 
            con menor capital inicial y rendimientos atractivos.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                <div className="text-center p-6 rounded-lg border-2 border-[#D4D1C5] hover:border-[#EFE6AB] transition-all duration-300 hover:shadow-lg bg-white">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#41472D] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4 mt-2">
                    <div className="w-16 h-16 bg-[#FFFBF2] rounded-full flex items-center justify-center group-hover:bg-[#EFE6AB] transition-colors duration-300">
                      <Icon size={32} className="text-[#41472D]" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-[#41472D] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#6B7055] text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#6B7055] italic">
            * Los números presentados son ilustrativos. Los resultados reales pueden variar.
          </p>
        </div>
      </div>
    </section>
  );
};
