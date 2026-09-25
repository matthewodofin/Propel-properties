import React from 'react';
import { motion } from 'motion/react';
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
    <section id="why-choose-us" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#F0F7FB] text-[#016DAA] text-xs font-bold uppercase tracking-wider mb-3">
            The Propel Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
            Why Choose Propel Properties?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Real estate acquisition should be transparent, secure, and rewarding. Here is how we guarantee peace of mind for every client.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#016DAA]/30 transition-shadow duration-300 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F0F7FB] group-hover:bg-[#016DAA] flex items-center justify-center mb-5 transition-colors duration-300">
                <span className="group-hover:text-white transition-colors duration-300 group-hover:[&_svg]:text-white">
                  {getIcon(item.icon)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] group-hover:text-[#016DAA] transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
