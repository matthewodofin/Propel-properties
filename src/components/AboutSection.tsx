import React from 'react';
import { COMPANY_STATS, BUSINESS_INFO } from '../data/content';
import { ShieldCheck, CheckCircle2, ArrowRight, PhoneCall, Award } from 'lucide-react';

interface AboutSectionProps {
  onLearnMore?: () => void;
  onContactUs?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onLearnMore,
  onContactUs,
}) => {
  return (
    <section id="about-us" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Gallery & Trust Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image: Professional Brand Visual with 10+ Years Experience Badge */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center">
                <img
                  src="https://imgur.com/LyD8z7C.png"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== 'https://i.imgur.com/LyD8z7C.png' && target.src !== window.location.origin + '/images/about-experience.png') {
                      target.src = 'https://i.imgur.com/LyD8z7C.png';
                    } else if (target.src !== window.location.origin + '/images/about-experience.png') {
                      target.src = '/images/about-experience.png';
                    }
                  }}
                  alt="Propel Properties - 10+ Years Experience in Real Estate"
                  className="w-full h-full object-contain p-4 sm:p-6"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Trusted Nigerian Advisors
                  </p>
                  <p className="text-sm font-bold">
                    Integrity • Legal Title Due Diligence • Client First
                  </p>
                </div>
              </div>

              {/* Secondary Floating Card: Experience Stamp */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 max-w-xs">
                <div className="w-12 h-12 rounded-xl bg-[#F0F7FB] flex items-center justify-center flex-shrink-0 text-[#016DAA]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-2xl font-black text-[#016DAA] leading-tight">10+ Years</span>
                  <span className="text-xs font-semibold text-gray-600">
                    Excellence in Nigerian Property Market
                  </span>
                </div>
              </div>

              {/* Accent decorative block in Brand Blue */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#016DAA]/10 rounded-3xl -z-10 blur-sm"></div>
            </div>
          </div>

          {/* Right Column: Copy & Core Statistics */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F7FB] text-[#016DAA] text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-[#016DAA]" />
              <span>About Propel Properties</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight leading-tight">
              Building Trust Through <span className="text-[#016DAA]">Real Estate</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              At Propel Properties, we are committed to helping individuals, families and businesses discover the right property opportunities. From residential homes and land to commercial properties and investment opportunities, we provide professional guidance designed to make property transactions simpler, clearer and more rewarding.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#016DAA] flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  <strong>Strict Legal Verification:</strong> Direct registry searches for Governor's Consent, C of O, and Gazette before property onboarding.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#016DAA] flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  <strong>Full Diaspora Representation:</strong> Seamless remote acquisitions for Nigerians living in the UK, US, Canada, and Europe.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#016DAA] flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  <strong>Strategic Capital Growth:</strong> Real estate opportunities selected for guaranteed appreciation and high rental yields.
                </span>
              </div>
            </div>

            {/* Statistics Row from Section 8 */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
              {COMPANY_STATS.map((stat, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-black text-[#016DAA]">{stat.value}</div>
                  <div className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">{stat.label}</div>
                  <div className="text-[11px] text-gray-500 hidden sm:block mt-0.5">{stat.subtext}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onContactUs}
                id="about-cta-button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#016DAA] hover:bg-[#015383] text-white font-bold text-sm shadow-sm transition-all duration-200 active:scale-95"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold text-sm transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#016DAA]" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
