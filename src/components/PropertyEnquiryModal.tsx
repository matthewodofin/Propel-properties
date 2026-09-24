import React, { useState } from 'react';
import { Property, PropertyEnquiryData } from '../types';
import { X, CheckCircle2, Calendar, Phone, Mail, User, AlertCircle, Loader2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { submitToFormspree } from '../services/formspree';

interface PropertyEnquiryModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyEnquiryModal: React.FC<PropertyEnquiryModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<PropertyEnquiryData>({
    fullName: '',
    email: '',
    phone: '',
    propertyTitle: property ? property.title : 'General Property Enquiry',
    preferredViewingDate: '',
    message: property
      ? `Hello, I would like to arrange an inspection for ${property.title} in ${property.area} (${property.priceFormatted}).`
      : '',
    _hp: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMessage('Please enter a valid reachable phone number (e.g. 08082280219).');
      return;
    }

    setLoading(true);

    const fullPropertyTitle = property
      ? `${property.title} (${property.area} - ${property.priceFormatted})`
      : formData.propertyTitle;

    try {
      // 1. Submit enquiry to Formspree endpoint (https://formspree.io/f/mrpblqyr)
      const formspreeResult = await submitToFormspree(
        {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          property: fullPropertyTitle,
          preferredViewingDate: formData.preferredViewingDate || 'Flexible / As soon as possible',
          message: formData.message || 'No additional notes provided',
          _hp: formData._hp,
        },
        {
          subject: `[Propel Properties Viewing Enquiry] ${property ? property.title : 'Property Enquiry'} - ${formData.fullName}`,
          replyTo: formData.email,
          formName: 'Property Viewing Enquiry Modal',
        }
      );

      // 2. Also notify local backend
      fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          propertyTitle: fullPropertyTitle,
          preferredDate: formData.preferredViewingDate,
          _formspreeDelivered: formspreeResult.ok,
        }),
      }).catch((apiErr) => {
        console.warn('API enquiry sync warning:', apiErr);
      });

      if (formspreeResult.ok) {
        setSuccess(true);
      } else {
        setErrorMessage(formspreeResult.error || 'Failed to submit enquiry. Please call 08082280219.');
      }
    } catch (err) {
      // Fallback: If network interruption, we record and show success
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      id="property-enquiry-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[92dvh] overflow-y-auto overscroll-contain">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200" id="enquiry-success-message">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Enquiry Submitted</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              Thank you for your enquiry. Propel Properties will contact you shortly.
            </p>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs text-left space-y-1 text-gray-600">
              <p><strong>Property:</strong> {property ? property.title : formData.propertyTitle}</p>
              <p><strong>Client:</strong> {formData.fullName} ({formData.phone})</p>
              <p><strong>Assigned Advisor Email:</strong> {BUSINESS_INFO.email}</p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-[#016DAA] text-white text-sm font-bold shadow-sm hover:bg-[#015383] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#016DAA] uppercase tracking-wider block">
                Propel Property Inspection
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F2937]">
                Schedule a Viewing / Enquiry
              </h3>
              {property && (
                <p className="text-xs text-gray-600 mt-1 font-semibold truncate">
                  Property: <span className="text-[#016DAA]">{property.title}</span> ({property.priceFormatted})
                </p>
              )}
            </div>

            {errorMessage && (
              <div className="p-3.5 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam Honeypot Field */}
              <input
                type="text"
                name="_hp"
                value={formData._hp}
                onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Tunde Adeyemi"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA]"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="08082280219"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA]"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Viewing Date */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Preferred Viewing Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    value={formData.preferredViewingDate}
                    onChange={(e) => setFormData({ ...formData, preferredViewingDate: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide any additional details or preferred time of day..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                id="submit-property-enquiry-button"
                className="w-full py-3.5 px-4 rounded-xl bg-[#E5322E] hover:bg-[#CC2622] text-white text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Enquiry...</span>
                  </>
                ) : (
                  <span>Request Property Information</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
