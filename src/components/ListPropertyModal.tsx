import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Building, Upload } from 'lucide-react';
import { PROPERTY_TYPES } from '../data/properties';
import { ListPropertyData } from '../types';
import { submitToFormspree } from '../services/formspree';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ListPropertyModal: React.FC<ListPropertyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<ListPropertyData>({
    ownerName: '',
    phone: '',
    email: '',
    propertyType: 'Duplex',
    location: '',
    expectedPrice: '',
    transactionType: 'Sale',
    description: '',
    _hp: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.ownerName.trim() || !formData.phone.trim() || !formData.location.trim()) {
      setErrorMessage('Please fill in your name, contact phone number, and property location.');
      return;
    }

    setLoading(true);

    try {
      // 1. Submit property listing to Formspree endpoint (https://formspree.io/f/mrpblqyr)
      const formspreeResult = await submitToFormspree(
        {
          name: formData.ownerName,
          phone: formData.phone,
          email: formData.email || 'Not provided',
          propertyType: formData.propertyType,
          location: formData.location,
          expectedPrice: formData.expectedPrice || 'Negotiable',
          transactionType: formData.transactionType,
          description: formData.description || 'No additional details provided',
          _hp: formData._hp,
        },
        {
          subject: `[Propel Properties Listing Request] ${formData.propertyType} in ${formData.location} (${formData.transactionType}) - from ${formData.ownerName}`,
          replyTo: formData.email || undefined,
          formName: 'List Your Property Modal',
        }
      );

      // 2. Also notify local backend
      fetch('/api/list-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _formspreeDelivered: formspreeResult.ok,
        }),
      }).catch((apiErr) => {
        console.warn('API list-property sync warning:', apiErr);
      });

      if (formspreeResult.ok) {
        setSuccess(true);
      } else {
        setErrorMessage(formspreeResult.error || 'Unable to submit property. Please call 08082280219 directly.');
      }
    } catch (err) {
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
      id="list-property-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[92dvh] overflow-y-auto overscroll-contain">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Property Submitted</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              Thank you! Your property details have been received by Propel Properties. A dedicated onboarding manager will call you shortly to verify ownership documentation and schedule a professional photoshoot/inspection.
            </p>
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-[#016DAA] text-white text-sm font-bold shadow-sm hover:bg-[#015383] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#E5322E] uppercase tracking-wider block">
                For Owners &amp; Landlords
              </span>
              <h3 className="text-2xl font-extrabold text-[#1F2937]">
                List Your Property With Us
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Reach thousands of verified Nigerian and diaspora buyers. We handle legal vetting, marketing, client tours, and swift closing.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="_hp"
                value={formData._hp}
                onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                className="hidden"
                tabIndex={-1}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Name / Representative *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    placeholder="e.g. Chief Adeleke"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#016DAA] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="08082280219"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#016DAA] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#016DAA] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Property Type *
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#016DAA] outline-none"
                  >
                    {PROPERTY_TYPES.filter((t) => t !== 'All Types').map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Listing Purpose *
                  </label>
                  <select
                    value={formData.transactionType}
                    onChange={(e) => setFormData({ ...formData, transactionType: e.target.value as 'Sale' | 'Rent' })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#016DAA] outline-none"
                  >
                    <option value="Sale">For Sale</option>
                    <option value="Rent">For Rent / Lease</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Exact Location / Neighborhood *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Lekki Phase 1, Lagos"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#016DAA] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Expected Asking Price (₦)
                  </label>
                  <input
                    type="text"
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    placeholder="e.g. ₦120,000,000"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#016DAA] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Property Highlights &amp; Title Deeds
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mention number of bedrooms, title status (e.g. C of O, Gov Consent), and current state..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#016DAA] outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                id="submit-list-property-button"
                className="w-full py-3.5 px-4 rounded-xl bg-[#E5322E] hover:bg-[#CC2622] text-white text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Property Listing...</span>
                  </>
                ) : (
                  <span>Submit Property for Onboarding</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
