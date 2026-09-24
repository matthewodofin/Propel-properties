import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  logoOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
  showTagline = false,
  logoOnly = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const isDark = variant === 'dark';

  const sizeMap = {
    sm: {
      imgHeight: 'h-9 w-auto',
      textScale: 'text-lg sm:text-xl',
      subScale: 'text-[9px] sm:text-[10px]',
      gap: 'gap-2',
    },
    md: {
      imgHeight: 'h-8 xs:h-9 sm:h-11 md:h-12 w-auto',
      textScale: 'text-base xs:text-lg sm:text-xl md:text-2xl',
      subScale: 'text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px]',
      gap: 'gap-1.5 sm:gap-2.5',
    },
    lg: {
      imgHeight: 'h-14 sm:h-16 w-auto',
      textScale: 'text-2xl sm:text-3xl',
      subScale: 'text-xs sm:text-sm',
      gap: 'gap-3',
    },
    xl: {
      imgHeight: 'h-16 sm:h-20 w-auto',
      textScale: 'text-3xl sm:text-4xl',
      subScale: 'text-sm sm:text-base',
      gap: 'gap-3.5',
    },
  };

  const currentSize = sizeMap[size];
  const primaryImgSrc = '/propel-logo.png';
  const fallbackImgSrc = 'https://i.imgur.com/pbwyr8M.png';

  return (
    <div
      className={`inline-flex items-center ${currentSize.gap} select-none ${className}`}
      id="brand-logo-container"
    >
      {/* Brand Logo Image from imgur */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <img
          src={imageError ? fallbackImgSrc : primaryImgSrc}
          alt="Propel Properties Logo"
          className={`${currentSize.imgHeight} object-contain rounded-lg sm:rounded-xl shadow-xs border ${
            isDark ? 'border-white/15 bg-white/5' : 'border-gray-200/80 bg-white'
          } p-0.5 transition-transform duration-200 hover:scale-105`}
          onError={() => {
            if (!imageError) {
              setImageError(true);
            }
          }}
          loading="eager"
        />
      </div>

      {/* Brand Name Typography */}
      {!logoOnly && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1.5 leading-none tracking-tight">
            <span className={`font-black ${currentSize.textScale} tracking-tight`}>
              <span className={isDark ? 'text-[#38bdf8]' : 'text-[#016DAA]'}>Propel</span>
            </span>

            <span
              className={`font-extrabold tracking-[0.22em] uppercase ${currentSize.subScale} ${
                isDark ? 'text-gray-100' : 'text-[#1F2937]'
              }`}
            >
              PROPERTIES
            </span>

            <span className="w-1.5 h-1.5 rounded-full bg-[#E5322E] inline-block mb-0.5"></span>
          </div>

          {showTagline && (
            <span className="text-[10px] text-gray-500 font-medium tracking-normal mt-1 hidden sm:inline-block">
              Your Trusted Partner in Property & Investment
            </span>
          )}
        </div>
      )}
    </div>
  );
};
