import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface BrandPreloaderProps {
  onLoaded?: () => void;
}

export const BrandPreloader: React.FC<BrandPreloaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Initializing Propel Properties...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStatusText('Connecting verified Nigerian portfolio...');
    }, 300);

    const timer2 = setTimeout(() => {
      setProgress(85);
      setStatusText('Preparing prime properties & market insights...');
    }, 750);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Welcome to Propel Properties');
    }, 1150);

    const timer4 = setTimeout(() => {
      if (onLoaded) {
        onLoaded();
      }
    }, 1450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onLoaded]);

  return (
    <motion.div
      id="propel-brand-preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white overflow-hidden select-none px-6"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#016DAA]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-[#E5322E]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        {/* Animated Brand Emblem Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          {/* Subtle Radar Ring pulse */}
          <span className="absolute -inset-3 rounded-3xl bg-[#016DAA]/15 animate-ping opacity-30 pointer-events-none" />
          <span className="absolute -inset-1.5 rounded-2xl bg-[#016DAA]/10 animate-pulse pointer-events-none" />

          {/* Logo Card */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-[#016DAA]/10 p-2.5 flex items-center justify-center">
            <img
              src="/propel-logo.png"
              onError={(e) => {
                // fallback to imgur URL
                e.currentTarget.src = 'https://i.imgur.com/pbwyr8M.png';
              }}
              alt="Propel Properties"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Brand Name Typography */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-1.5"
        >
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#016DAA] tracking-tight">
              Propel
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-[#1F2937] tracking-[0.22em] uppercase">
              PROPERTIES
            </span>
            <span className="w-2 h-2 rounded-full bg-[#E5322E] inline-block mb-1 animate-pulse" />
          </div>

          <p className="text-xs sm:text-sm font-semibold text-gray-500 tracking-wide">
            Your Trusted Partner in Property &amp; Investment
          </p>
        </motion.div>

        {/* Sleek Progress Line */}
        <motion.div
          initial={{ opacity: 0, width: '40%' }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 w-full max-w-[260px] space-y-2.5"
        >
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden relative shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#016DAA] via-[#0188d4] to-[#E5322E] rounded-full relative"
              initial={{ width: '10%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.4 }}
            >
              <span className="absolute top-0 right-0 bottom-0 w-8 bg-white/40 blur-xs animate-pulse" />
            </motion.div>
          </div>

          {/* Dynamic Status Text */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-gray-500 transition-all min-h-[18px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#016DAA] flex-shrink-0" />
            <span className="truncate">{statusText}</span>
          </div>
        </motion.div>

        {/* Bottom Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest"
        >
          <span>Lagos</span>
          <span className="text-gray-300">•</span>
          <span>Abuja</span>
          <span className="text-gray-300">•</span>
          <span>Port Harcourt</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
