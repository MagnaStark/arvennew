import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export const FAQSection = () => {
  const faqs = [
    {
      question: '¿Qué es una "fracción" en Arven House?',
      answer: 'Una fracción representa una participación en la propiedad de una villa en Tulum. Al comprar fracciones, te conviertes en copropietario del inmueble y tienes derecho a recibir rendimientos proporcionales a tu inversión, así como a disfrutar de la propiedad según el acuerdo establecido.',
    },
    {
      question: '¿Con qué frecuencia recibo los rendimientos?',
      answer: 'Los rendimientos se distribuyen de forma trimestral. Esto significa que recibirás pagos cada 3 meses, calculados en base al rendimiento de tu inversión y al número de fracciones que poseas.',
    },
    {
      question: '¿Los rendimientos están garantizados?',
      answer: 'No. Las proyecciones mostradas en nuestra calculadora son ilustrativas y se basan en estimaciones conservadoras del mercado inmobiliario de Tulum. Los rendimientos reales pueden variar según múltiples factores como la ocupación de la propiedad, condiciones del mercado, y costos operativos. No constituyen una garantía ni asesoría financiera.',
    },
    {
      question: '¿Qué diferencia hay entre pago financiado y de contado?',
      answer: 'El pago de contado te permite acceder a mayores rendimientos (8-12% anual) ya que no hay costos de financiamiento. El pago financiado ofrece menor barrera de entrada con pagos programados, pero con rendimientos menores (5-7% anual) debido a los costos asociados al financiamiento.',
    },
    {
      question: '¿Cuáles son los riesgos principales?',
      answer: 'Como toda inversión inmobiliaria, existen riesgos: variación en la ocupación, cambios en el mercado turístico, costos de mantenimiento imprevistos, fluctuaciones en el valor de la propiedad, y cambios regulatorios. Te recomendamos consultar con un asesor financiero independiente antes de invertir.',
    },
    {
      question: '¿Puedo vender mis fracciones?',
      answer: 'Sí, las fracciones pueden venderse, pero esto está sujeto a las condiciones establecidas en el contrato de copropiedad. Normalmente existe un proceso de aprobación y los demás copropietarios pueden tener derecho de primera opción de compra.',
    },
    {
      question: '¿Cómo funciona la gestión de la propiedad?',
      answer: 'Arven House se encarga de toda la gestión profesional de la villa: mantenimiento, limpieza, marketing para rentas vacacionales, atención a huéspedes, y administración financiera. Tú solo recibes tus rendimientos trimestrales sin preocuparte de las operaciones diarias.',
    },
    {
      question: '¿Necesito ser ciudadano mexicano para invertir?',
      answer: 'No, inversores internacionales son bienvenidos. Sin embargo, existen consideraciones legales y fiscales específicas para extranjeros invirtiendo en bienes raíces en México, especialmente en zonas costeras. Te recomendamos consultar con un abogado especializado en bienes raíces.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-[#FFFBF2] to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-[#41472D] mb-4" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-[#6B7055]">
            Respuestas a las dudas más comunes sobre inversión fraccionada
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg border-2 border-[#D4D1C5] hover:border-[#41472D] transition-colors duration-200 px-6"
            >
              <AccordionTrigger className="text-left text-[#41472D] font-semibold hover:text-[#6B7055] py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#6B7055] pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Help */}
        <div className="mt-12 text-center">
          <p className="text-[#6B7055] mb-4">¿No encuentras respuesta a tu pregunta?</p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[#41472D] font-semibold hover:text-[#6B7055] underline transition-colors duration-200"
          >
            Contáctanos directamente
          </button>
        </div>
      </div>
    </section>
  );
};
