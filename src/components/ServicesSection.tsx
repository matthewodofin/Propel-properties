import React, { useState } from 'react';
import { CORE_SERVICES } from '../data/content';
import { ServiceItem } from '../types';
import {
  Home,
  Key,
  Map,
  Building2,
  TrendingUp,
  Compass,
  ArrowRight,
  CheckCircle2,
  X,
  Phone,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface ServicesSectionProps {
  onSelectServiceForEnquiry: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForEnquiry,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'property-sales':
        return <Home className="w-6 h-6 text-[#016DAA]" />;
      case 'property-rentals':
        return <Key className="w-6 h-6 text-[#016DAA]" />;
      case 'land-sales':
        return <Map className="w-6 h-6 text-[#016DAA]" />;
      case 'property-management':
        return <Building2 className="w-6 h-6 text-[#016DAA]" />;
      case 'real-estate-investment':
        return <TrendingUp className="w-6 h-6 text-[#016DAA]" />;
      case 'property-consultancy':
        return <Compass className="w-6 h-6 text-[#016DAA]" />;
      default:
        return <Home className="w-6 h-6 text-[#016DAA]" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F0F7FB] text-[#016DAA] text-xs font-bold uppercase tracking-wider mb-3">
            Comprehensive Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
            Our Real Estate Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            From residential sales and rental placements to strategic land acquisition, turnkey property management, and investment advisory.
          </p>
        </div>

        {/* 6 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_SERVICES.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#016DAA]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header with Icon and Sequence Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-xl bg-[#F0F7FB] group-hover:bg-[#016DAA] flex items-center justify-center p-3 transition-colors duration-300">
                    <span className="group-hover:text-white transition-colors duration-300">
                      {getServiceIcon(service.id)}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-gray-200 group-hover:text-[#016DAA]/20 transition-colors">
                    {service.number}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-[#1F2937] group-hover:text-[#016DAA] transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-sm font-semibold text-[#016DAA] mb-3">
                  "{service.tagline}"
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-6 text-xs text-gray-600">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  id={`learn-more-service-${service.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#016DAA] hover:text-[#015383] group-hover:translate-x-1 transition-all"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectServiceForEnquiry(service.title)}
                  className="text-xs font-bold text-[#E5322E] hover:underline"
                >
                  Consult Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#F0F7FB] flex items-center justify-center p-2.5">
                {getServiceIcon(selectedService.id)}
              </div>
              <div>
                <span className="text-xs font-bold text-[#016DAA] uppercase tracking-wider">Propel Service Guide</span>
                <h3 className="text-xl font-extrabold text-[#1F2937]">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-sm font-semibold text-[#016DAA] mb-4">"{selectedService.tagline}"</p>
            <p className="text-sm text-gray-700 leading-relaxed mb-6">{selectedService.description}</p>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">Key Highlights &amp; Guarantees:</h4>
              <ul className="space-y-2 text-xs text-gray-700">
                {selectedService.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForEnquiry(title);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#E5322E] hover:bg-[#CC2622] text-white text-sm font-bold shadow-sm transition-all"
              >
                Inquire About This Service
              </button>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-[#016DAA]" />
                <span>Call Advisor</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
