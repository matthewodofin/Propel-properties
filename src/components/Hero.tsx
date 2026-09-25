import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PhoneCall, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PropertySearchBox } from './PropertySearchBox';
import { PropertyFilterState } from '../types';

interface HeroProps {
  onExploreProperties: () => void;
  onContactUs?: () => void;
  onContactAgent?: () => void;
  onSearch: (filters: Partial<PropertyFilterState>) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProperties,
  onContactUs,
  onContactAgent,
  onSearch,
}) => {
  const handleContact = () => {
    if (onContactAgent) onContactAgent();
    else if (onContactUs) onContactUs();
  };

  return (
    <section id="hero-section" className="relative min-h-[580px] sm:min-h-[640px] pt-8 sm:pt-12 pb-16 sm:pb-20 overflow-hidden bg-gray-900 text-white flex flex-col justify-between">
      {/* High Quality Luxury Nigerian Architectural Background with Subtle Zoom */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 0.32 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
          alt="Modern luxury contemporary Nigerian estate home in Lekki"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradients to ensure text readability and sophisticated look */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-gray-900/90" />
        <div className="absolute inset-0 bg-[#016DAA]/20 mix-blend-multiply" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 sm:pt-10 md:pt-14 pb-8 sm:pb-12 flex-1 flex flex-col justify-center">
        {/* Trust Pill with subtle float entrance */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white mb-5 sm:mb-6 mx-auto shadow-sm"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 animate-pulse" />
          <span className="truncate">Verified Nigerian Property &amp; Prime Investment</span>
        </motion.div>

        {/* Hero Headline with crisp staggered rise */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-snug pb-1"
        >
          Find a Property You Can Call{' '}
          <motion.span
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="text-[#016DAA] bg-white px-2.5 py-0.5 rounded-md inline-block cursor-default"
          >
            Home
          </motion.span>
        </motion.h1>

        {/* Hero Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal px-2"
        >
          Discover quality properties, land and investment opportunities with{' '}
          <strong className="text-white font-semibold">Propel Properties</strong>.
        </motion.p>

        {/* CTA Buttons with Spring Tactility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none mx-auto"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={onExploreProperties}
            id="hero-primary-cta"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-xl bg-[#E5322E] hover:bg-[#CC2622] text-white font-bold text-sm sm:text-base shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E5322E] min-h-[48px] cursor-pointer"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={handleContact}
            id="hero-secondary-cta"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm sm:text-base backdrop-blur-md border border-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white min-h-[48px] cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-white" />
            <span>Contact Us</span>
          </motion.button>
        </motion.div>

        {/* Quick Highlights Under CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs sm:text-sm text-gray-300"
        >
          <span className="flex items-center gap-1.5 transition-transform hover:scale-105 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            Verified Titles (C of O / Gov. Consent)
          </span>
          <span className="flex items-center gap-1.5 transition-transform hover:scale-105 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            Zero Agency Hidden Charges
          </span>
          <span className="flex items-center gap-1.5 transition-transform hover:scale-105 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            Direct Developer Access
          </span>
        </motion.div>
      </div>

      {/* Property Search Box with smooth lift */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4 sm:mt-6 -mb-8 sm:-mb-12"
      >
        <PropertySearchBox onSearch={onSearch} />
      </motion.div>
    </section>
  );
};
