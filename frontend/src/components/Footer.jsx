import React from 'react';
import { BRAND } from '../config/theme';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#41472D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <img src={BRAND.logo} alt="Arven House" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-[#EFE6AB] text-sm italic mb-2">{t.footer.tagline}</p>
            <p className="text-gray-300 text-sm">
              {t.footer.description}
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.footer.contact}</h3>
            <div className="space-y-3">
              <a href="mailto:contacto@arvenhouse.com" className="flex items-center text-gray-300 hover:text-[#EFE6AB] transition-colors duration-200">
                <Mail size={18} className="mr-2" />
                contacto@arvenhouse.com
              </a>
              <a href="tel:+529981234567" className="flex items-center text-gray-300 hover:text-[#EFE6AB] transition-colors duration-200">
                <Phone size={18} className="mr-2" />
                +52 998 123 4567
              </a>
              <div className="flex items-start text-gray-300">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Tulum, Quintana Roo, México</span>
              </div>
            </div>
          </div>

          {/* Social & Legal Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t.footer.followUs}</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-300 hover:text-[#EFE6AB] transition-colors duration-200">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#EFE6AB] transition-colors duration-200">
                <Instagram size={24} />
              </a>
            </div>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 text-sm hover:text-[#EFE6AB] transition-colors duration-200">
                {t.footer.terms}
              </a>
              <a href="#" className="block text-gray-300 text-sm hover:text-[#EFE6AB] transition-colors duration-200">
                {t.footer.privacy}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Arven House. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};
