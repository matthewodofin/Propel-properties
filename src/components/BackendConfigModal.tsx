import React, { useState } from 'react';
import { X, Server, Mail, CheckCircle2, Copy, ExternalLink, Code } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface BackendConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendConfigModal: React.FC<BackendConfigModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      id="backend-config-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92dvh] overflow-y-auto shadow-2xl border border-gray-100 relative p-5 sm:p-8 overscroll-contain">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close configuration"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#F0F7FB] text-[#016DAA] flex items-center justify-center flex-shrink-0">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#016DAA] uppercase tracking-wider">
              Integration &amp; Delivery Settings
            </span>
            <h3 className="text-lg sm:text-2xl font-extrabold text-[#1F2937]">
              Contact Form Backend Configuration
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
          The contact form is connected to a production-ready Express backend endpoint (<code>/api/contact</code>). Below is the active configuration and instructions for connecting third-party services like Formspree or EmailJS.
        </p>

        {/* Active Default Settings */}
        <div className="space-y-4 mb-6">
          <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Active Formspree Integration Connected</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-2.5 bg-white rounded-xl border border-emerald-100">
                <span className="font-semibold text-gray-600">Formspree Endpoint:</span>
                <div className="flex items-center gap-2 overflow-hidden">
                  <code className="text-[#016DAA] font-bold text-xs truncate">https://formspree.io/f/mrpblqyr</code>
                  <button
                    onClick={() => copyToClipboard('https://formspree.io/f/mrpblqyr', 'endpoint')}
                    className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0"
                    aria-label="Copy endpoint"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-2.5 bg-white rounded-xl border border-emerald-100">
                <span className="font-semibold text-gray-600">Recipient Email:</span>
                <div className="flex items-center gap-2 overflow-hidden">
                  <code className="text-[#016DAA] font-bold text-xs truncate">{BUSINESS_INFO.email}</code>
                  <button
                    onClick={() => copyToClipboard(BUSINESS_INFO.email, 'email')}
                    className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0"
                    aria-label="Copy email"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-2.5 bg-white rounded-xl border border-emerald-100">
                <span className="font-semibold text-gray-600">Connected Forms:</span>
                <span className="text-emerald-700 font-bold text-xs">Contact, Viewing Enquiry, List Property, Testimonies</span>
              </div>
            </div>
          </div>
        </div>

        {copied && (
          <div className="p-2.5 mb-4 text-center text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-lg animate-in fade-in">
            Copied {copied} to clipboard!
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-[#016DAA] text-white text-sm font-bold shadow-sm hover:bg-[#015383] transition-colors min-h-[44px]"
        >
          Close Settings
        </button>
      </div>
    </div>
  );
};
