import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';

export const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investment: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error(t.contact.form.errorRequired);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(t.contact.form.errorEmail);
      return;
    }

    // Simulate form submission (frontend only)
    console.log('Form submitted:', formData);
    toast.success(t.toast.formSuccess);
    
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        investment: '',
        message: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-[#41472D] mb-4" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            {t.contact.title}
          </h2>
          <p className="text-lg text-[#6B7055] max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-[#FFFBF2] to-white p-8 rounded-xl border-2 border-[#D4D1C5]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-[#41472D] font-medium">
                    {t.contact.form.name} *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 border-[#D4D1C5] focus:border-[#41472D]"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-[#41472D] font-medium">
                    {t.contact.form.email} *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 border-[#D4D1C5] focus:border-[#41472D]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-[#41472D] font-medium">
                    {t.contact.form.phone} *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-2 border-[#D4D1C5] focus:border-[#41472D]"
                    placeholder="+52 999 123 4567"
                  />
                </div>

                {/* Investment Amount */}
                <div>
                  <Label htmlFor="investment" className="text-[#41472D] font-medium">
                    {t.contact.form.investment}
                  </Label>
                  <Input
                    id="investment"
                    name="investment"
                    type="text"
                    value={formData.investment}
                    onChange={handleChange}
                    className="mt-2 border-[#D4D1C5] focus:border-[#41472D]"
                    placeholder={t.contact.form.investmentPlaceholder}
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-[#41472D] font-medium">
                    {t.contact.form.message}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 border-[#D4D1C5] focus:border-[#41472D] min-h-[100px]"
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#41472D] text-white py-3 rounded-md font-medium hover:bg-[#6B7055] transition-all duration-300 flex items-center justify-center group shadow-md hover:shadow-lg"
                >
                  <span>{t.contact.form.submit}</span>
                  <Send className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <CheckCircle2 size={64} className="text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-[#41472D] mb-2">{t.contact.form.successTitle}</h3>
                <p className="text-[#6B7055]">
                  {t.contact.form.successMessage}
                </p>
              </div>
            )}
          </div>

          {/* Contact Info & CTA */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-[#41472D] mb-4">
                {t.contact.why.title}
              </h3>
              <ul className="space-y-4 text-[#6B7055]">
                {t.contact.why.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#41472D] mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#41472D] text-white p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-3">{t.contact.direct.title}</h4>
              <div className="space-y-2 text-sm">
                <p>{t.contact.direct.email}</p>
                <p>{t.contact.direct.phone}</p>
                <p>{t.contact.direct.whatsapp}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
