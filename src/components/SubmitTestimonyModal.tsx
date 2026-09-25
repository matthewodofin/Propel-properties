import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, CheckCircle2, ShieldCheck, HeartHandshake, Loader2 } from 'lucide-react';
import { TestimonialItem } from '../types';
import { submitToFormspree } from '../services/formspree';

interface SubmitTestimonyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTestimonySubmitted: (testimony: TestimonialItem) => void;
}

export const SubmitTestimonyModal: React.FC<SubmitTestimonyModalProps> = ({
  isOpen,
  onClose,
  onTestimonySubmitted,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [category, setCategory] = useState<'Home Buyer' | 'Diaspora' | 'Land' | 'Commercial' | 'Rental'>('Home Buyer');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    if (!propertyType.trim()) {
      setErrorMessage('Please mention the property type or location (e.g. 4 Bed Duplex Lekki, Land in Epe).');
      return;
    }

    if (!comment.trim() || comment.trim().length < 15) {
      setErrorMessage('Please share a few sentences about your experience (minimum 15 characters).');
      return;
    }

    setIsSubmitting(true);

    const newTestimony: TestimonialItem = {
      id: `test-user-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Verified Client',
      location: location.trim() || 'Lagos, Nigeria',
      propertyType: propertyType.trim(),
      category,
      rating,
      comment: comment.trim(),
      date: 'Recent',
      verifiedBuyer: true,
      highlight: 'Client Review',
      image: `https://images.unsplash.com/photo-${1534528741775 + (Date.now() % 500)}?auto=format&fit=crop&w=200&q=80`,
    };

    try {
      // 1. Submit testimony details to Formspree endpoint (https://formspree.io/f/mrpblqyr)
      const formspreeResult = await submitToFormspree(
        {
          name: newTestimony.name,
          role: newTestimony.role,
          location: newTestimony.location,
          propertyType: newTestimony.propertyType || 'Not specified',
          category: newTestimony.category,
          rating: `${newTestimony.rating} / 5 Stars`,
          testimony: newTestimony.comment,
          _hp: honeypot,
        },
        {
          subject: `[Propel Properties Client Review] ${newTestimony.rating} Stars from ${newTestimony.name} (${newTestimony.category})`,
          formName: 'Client Review & Testimony Modal',
        }
      );

      // 2. Also notify local backend
      fetch('/api/testimony', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTestimony.name,
          role: newTestimony.role,
          location: newTestimony.location,
          propertyType: newTestimony.propertyType,
          category: newTestimony.category,
          rating: newTestimony.rating,
          comment: newTestimony.comment,
          _hp: honeypot,
          _formspreeDelivered: formspreeResult.ok,
        }),
      }).catch((apiErr) => {
        console.warn('API testimony sync warning:', apiErr);
      });

      onTestimonySubmitted(newTestimony);
      setIsSuccess(true);
    } catch {
      onTestimonySubmitted(newTestimony);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setRole('');
    setLocation('');
    setPropertyType('');
    setCategory('Home Buyer');
    setRating(5);
    setComment('');
    setIsSuccess(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          id="submit-testimony-modal-backdrop"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Container with Spring Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl relative max-h-[92dvh] overflow-y-auto overscroll-contain border border-gray-100 z-10"
          >
            {/* Close Button */}
            <button
              onClick={handleReset}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Thank You For Your Testimony!</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-medium max-w-sm mx-auto">
              Your review has been successfully added to our Client Testimonies session. We truly appreciate your trust in Propel Properties!
            </p>
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-left text-xs text-sky-900 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#016DAA] flex-shrink-0 mt-0.5" />
              <span>
                Your testimony helps fellow home buyers, diaspora investors, and families make confident real estate decisions.
              </span>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-xl bg-[#016DAA] hover:bg-[#015383] text-white text-sm font-bold shadow-md transition-all"
            >
              Back to Testimonies
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7FB] text-[#016DAA] text-xs font-bold uppercase tracking-wider mb-2">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Share Your Experience</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#1F2937]">
                Submit Your Client Testimony
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Tell us about your property journey, acquisition, or rental experience with Propel Properties.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam Honeypot */}
              <input
                type="text"
                name="_hp_testimony"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            (hoverRating || rating) >= star
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-700 ml-2">
                    {rating === 5
                      ? '5.0 - Outstanding Experience'
                      : rating === 4
                      ? '4.0 - Very Good'
                      : rating === 3
                      ? '3.0 - Good'
                      : `${rating}.0 Stars`}
                  </span>
                </div>
              </div>

              {/* Full Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Kelechi Nwosu"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#016DAA] focus:border-[#016DAA]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Profession / Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Business Owner, Diaspora Investor"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#016DAA] focus:border-[#016DAA]"
                  />
                </div>
              </div>

              {/* Location & Property Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Your Location / City
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Lekki, Lagos / London, UK"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#016DAA] focus:border-[#016DAA]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#016DAA] focus:border-[#016DAA] bg-white"
                  >
                    <option value="Home Buyer">Home Buyer</option>
                    <option value="Diaspora">Diaspora Investor</option>
                    <option value="Land">Land Buyer</option>
                    <option value="Commercial">Commercial / Office</option>
                    <option value="Rental">Tenant / Rental</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Property Acquired / Handled <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  placeholder="e.g. 4 Bedroom Semi-Detached Duplex in Lekki"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#016DAA] focus:border-[#016DAA]"
                />
              </div>

              {/* Testimony Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Your Testimony / Experience <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details on how Propel Properties helped you verify documents, coordinate inspections, negotiate, or conclude your transaction..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#016DAA] focus:border-[#016DAA]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#016DAA] hover:bg-[#015383] text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Testimony...</span>
                    </>
                  ) : (
                    <span>Publish Testimony</span>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
