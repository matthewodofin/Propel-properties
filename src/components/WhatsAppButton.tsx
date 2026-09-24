import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/content';
import { MessageSquare, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div
      id="whatsapp-floating-container"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 safe-bottom"
    >
      {/* Tooltip / Badge */}
      {showTooltip && (
        <div className="relative bg-white text-gray-800 text-xs font-bold py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-2xl shadow-xl border border-gray-200 flex items-center gap-2 max-w-[220px] sm:max-w-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse"></span>
          <span className="truncate">Chat with us on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 p-0.5 ml-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Tooltip beak */}
          <div className="absolute -bottom-1.5 right-5 sm:right-6 w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45"></div>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={BUSINESS_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-floating-button"
        aria-label="Chat with Propel Properties on WhatsApp"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
      </a>
    </div>
  );
};
