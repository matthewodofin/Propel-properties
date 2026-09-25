import React from 'react';
import { motion } from 'motion/react';
import { HOW_IT_WORKS_STEPS } from '../data/content';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onStartJourney?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartJourney }) => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50/70 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#F0F7FB] text-[#016DAA] text-xs font-bold uppercase tracking-wider mb-3">
            Streamlined Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            A seamless four-step process designed to move you from initial property discovery to secure key and title handover.
          </p>
        </motion.div>

        {/* 4 Steps with connecting line visual element */}
        <div className="relative">
          {/* Animated Connecting Line on Desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-[#016DAA] via-[#E5322E] to-[#016DAA] -translate-y-6 opacity-30 z-0 origin-left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#016DAA]/30 transition-shadow duration-300 flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      className="w-12 h-12 rounded-xl bg-[#016DAA] text-white font-black text-lg flex items-center justify-center shadow-md cursor-pointer"
                    >
                      {item.step}
                    </motion.span>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                      Step {index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1F2937] group-hover:text-[#016DAA] transition-colors mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed Support</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {onStartJourney && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onStartJourney}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#016DAA] hover:bg-[#015383] text-white font-bold text-sm shadow-sm transition-colors cursor-pointer"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
