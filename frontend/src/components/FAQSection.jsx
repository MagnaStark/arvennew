import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export const FAQSection = () => {
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-[#FFFBF2] to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-[#41472D] mb-4" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            {t.faq.title}
          </h2>
          <p className="text-lg text-[#6B7055]">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {t.faq.items.map((faq, index) => (
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
          <p className="text-[#6B7055] mb-4">{t.faq.notFound}</p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[#41472D] font-semibold hover:text-[#6B7055] underline transition-colors duration-200"
          >
            {t.faq.contactUs}
          </button>
        </div>
      </div>
    </section>
  );
};
