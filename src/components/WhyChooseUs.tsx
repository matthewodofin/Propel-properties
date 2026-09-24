import React from 'react';
import { WHY_CHOOSE_US } from '../data/content';
import {
  ShieldCheck,
  Briefcase,
  FileText,
  HeartHandshake,
  TrendingUp,
  Award,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#016DAA]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#016DAA]" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-[#016DAA]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#016DAA]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#016DAA]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#016DAA]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#016DAA]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F0F7FB] text-[#016DAA] text-xs font-bold uppercase tracking-wider mb-3">
            The Propel Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
            Why Choose Propel Properties?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Real estate acquisition should be transparent, secure, and rewarding. Here is how we guarantee peace of mind for every client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#016DAA]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F0F7FB] flex items-center justify-center mb-5">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
