import React from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO, FOOTER_LINKS } from '../data/content';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUp,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Heart,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'properties' | 'about' | 'services' | 'contact') => void;
  onSelectPropertyType?: (type: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectPropertyType,
}) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#111827] text-gray-300 border-t border-gray-800">
      {/* Top Footer Banner / Quick Infoline */}
      <div className="bg-[#0B1220] border-b border-gray-800/80 py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
            <p className="text-xs sm:text-sm font-medium text-gray-300">
              Ready to invest or acquire verified property in Nigeria? Call our direct desk now.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-4 w-full md:w-auto">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#016DAA] hover:bg-[#015383] text-white text-xs font-bold transition-colors min-h-[40px] flex-1 sm:flex-initial"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <a
              href={BUSINESS_INFO.emailMailto}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-colors min-h-[40px] flex-1 sm:flex-initial"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{BUSINESS_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Column 1: Brand & Bio (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-block">
              <Logo size="md" variant="dark" />
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              Propel Properties is your dedicated Nigerian real estate partner. We deliver vetted luxury residences, verified land titles, high-yield commercial spaces, and turnkey property management with total transparency.
            </p>

            <p className="text-xs italic text-gray-500 font-medium">
              "{BUSINESS_INFO.tagline}"
            </p>

            {/* Social Icons (Section 18) */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={BUSINESS_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-[#016DAA] text-gray-300 hover:text-white flex items-center justify-center transition-all"
                  aria-label="Propel Properties on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={BUSINESS_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-[#E5322E] text-gray-300 hover:text-white flex items-center justify-center transition-all"
                  aria-label="Propel Properties on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={BUSINESS_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-[#016DAA] text-gray-300 hover:text-white flex items-center justify-center transition-all"
                  aria-label="Propel Properties on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={BUSINESS_INFO.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-black text-gray-300 hover:text-white flex items-center justify-center transition-all"
                  aria-label="Propel Properties on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('properties')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Client Testimonies
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Property Types (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Property Types
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.propertyTypes.map((type) => (
                <li key={type.name}>
                  <button
                    onClick={() => {
                      if (onSelectPropertyType) {
                        onSelectPropertyType(type.name);
                      }
                      onNavigate('properties');
                    }}
                    className="text-gray-400 hover:text-[#016DAA] transition-colors text-left"
                  >
                    {type.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Information
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p className="font-bold text-white">Propel Properties</p>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#016DAA] flex-shrink-0 mt-0.5" />
                <a href={BUSINESS_INFO.phoneTel} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#E5322E] flex-shrink-0 mt-0.5" />
                <a href={BUSINESS_INFO.emailMailto} className="hover:text-white transition-colors break-all">
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#016DAA] flex-shrink-0 mt-0.5" />
                <div>
                  <span>{BUSINESS_INFO.address}</span>
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-[#38bdf8] hover:underline mt-0.5"
                  >
                    View on Google Maps &rarr;
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer: Copyright and Powered By */}
      <div className="border-t border-gray-800 bg-[#090E17] py-6 text-xs text-gray-500 safe-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left">
            &copy; {currentYear} {BUSINESS_INFO.name}. All Rights Reserved.
          </p>

          <p className="text-center sm:text-right font-medium text-gray-400">
            Powered by{' '}
            <strong className="text-white">Propel Properties</strong>
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800 min-h-[36px]"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
