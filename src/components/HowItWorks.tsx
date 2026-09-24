import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/content';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onStartJourney?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartJourney }) => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50/70 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F0F7FB] text-[#016DAA] text-xs font-bold uppercase tracking-wider mb-3">
            Streamlined Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            A seamless four-step process designed to move you from initial property discovery to secure key and title handover.
          </p>
        </div>

        {/* 4 Steps with connecting line visual element */}
        <div className="relative">
          {/* Subtle Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-[#016DAA] via-[#E5322E] to-[#016DAA] -translate-y-6 opacity-25 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((item, index) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-12 h-12 rounded-xl bg-[#016DAA] text-white font-black text-lg flex items-center justify-center shadow-md">
                      {item.step}
                    </span>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                      Step {index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1F2937] mb-2 leading-snug">
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
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {onStartJourney && (
          <div className="mt-14 text-center">
            <button
              onClick={onStartJourney}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#016DAA] hover:bg-[#015383] text-white font-bold text-sm shadow-sm transition-all active:scale-95"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
