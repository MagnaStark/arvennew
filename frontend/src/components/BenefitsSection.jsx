import React from 'react';
import { MapPin, Shield, BarChart3, Users } from 'lucide-react';

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: MapPin,
      title: 'Ubicación Privilegiada',
      description: 'Co-propiedad en una villa de lujo en Tulum, uno de los destinos más codiciados de México y el Caribe.',
      color: 'from-[#41472D] to-[#6B7055]',
    },
    {
      icon: Shield,
      title: 'Gestión Profesional',
      description: 'Administración completa de la propiedad. Tú recibes los beneficios sin preocupaciones de mantenimiento.',
      color: 'from-[#6B7055] to-[#41472D]',
    },
    {
      icon: BarChart3,
      title: 'Flujo de Efectivo Trimestral',
      description: 'Retornos periódicos cada trimestre más apreciación del capital a largo plazo en el mercado inmobiliario.',
      color: 'from-[#41472D] to-[#6B7055]',
    },
    {
      icon: Users,
      title: 'Proyecciones Transparentes',
      description: 'Calculadora basada en datos reales que te permite simular diferentes escenarios de inversión.',
      color: 'from-[#6B7055] to-[#41472D]',
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#41472D] mb-4" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            Beneficios Clave
          </h2>
          <p className="text-lg text-[#6B7055] max-w-2xl mx-auto">
            Inversión inteligente con múltiples ventajas para tu patrimonio
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
