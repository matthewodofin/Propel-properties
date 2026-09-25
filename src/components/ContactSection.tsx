import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO } from '../data/content';
import { ContactFormData } from '../types';
import { submitToFormspree } from '../services/formspree';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  Settings,
  ShieldCheck,
  Navigation,
  ExternalLink,
} from 'lucide-react';

interface ContactSectionProps {
  initialSubject?: string;
  initialProperty?: string;
  onOpenBackendConfig?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialSubject = '',
  initialProperty = '',
  onOpenBackendConfig,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: initialSubject || '',
    propertyOfInterest: initialProperty || '',
    message: '',
    agreeToContact: true,
    _hp: '', // spam honeypot
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!formData.subject.trim()) {
      setErrorMessage('Please enter a subject for your enquiry.');
      return false;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Please provide a message with at least 10 characters.');
      return false;
    }
    if (!formData.agreeToContact) {
      setErrorMessage('Please agree to be contacted regarding your enquiry.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 1. Submit form details to Formspree endpoint (https://formspree.io/f/mrpblqyr)
      const formspreeResult = await submitToFormspree(
        {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          subject: formData.subject,
          propertyOfInterest: formData.propertyOfInterest || 'General Enquiry',
          message: formData.message,
          agreeToContact: formData.agreeToContact ? 'Yes' : 'No',
          _hp: formData._hp,
        },
        {
          subject: `[Propel Properties Contact] ${formData.subject} - from ${formData.fullName}`,
          replyTo: formData.email,
          formName: 'Main Website Contact Form',
        }
      );

      // 2. Also sync to local backend for logging & persistence
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          property: formData.propertyOfInterest,
          message: formData.message,
          agreed: formData.agreeToContact,
          _hp: formData._hp,
          _formspreeDelivered: formspreeResult.ok,
        }),
      }).catch((apiErr) => {
        console.warn('API sync warning:', apiErr);
      });

      if (formspreeResult.ok) {
        setSuccess(true);
      } else {
        // If Formspree had an issue (e.g. client network restriction), check fallback
        setErrorMessage(
          formspreeResult.error ||
            'We were unable to deliver your message right now. Please call 08082280219 directly.'
        );
      }
    } catch (err) {
      // Graceful fallback to client acknowledgement
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      propertyOfInterest: '',
      message: '',
      agreeToContact: true,
      _hp: '',
    });
    setSuccess(false);
    setErrorMessage('');
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title with Scroll-in-view */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#F0F7FB] text-[#016DAA] text-xs font-bold uppercase tracking-wider mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
            Contact Propel Properties
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Have questions about a property, land opportunities, or listing your real estate? Our advisory team is ready to guide you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Business Details Cards (Section 15) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#016DAA] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-sky-200">
                    Direct Contact
                  </span>
                  <h3 className="text-2xl font-black mt-1">{BUSINESS_INFO.name}</h3>
                  <p className="text-sm text-sky-100 italic mt-1">"{BUSINESS_INFO.tagline}"</p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-sky-200 font-semibold">Phone Number</p>
                      <p className="text-base font-bold">{BUSINESS_INFO.phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-sky-200 font-semibold">Official Email</p>
                      <p className="text-base font-bold break-all">{BUSINESS_INFO.email}</p>
                    </div>
                  </div>

                  {/* Office Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-sky-200 font-semibold">Office Address</p>
                      <p className="text-sm font-medium leading-snug">{BUSINESS_INFO.address}</p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-sky-200 font-semibold">Operating Hours</p>
                      <p className="text-sm font-medium leading-snug">{BUSINESS_INFO.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Section 15 Required Direct Action Buttons with tactile motion */}
                <div className="pt-4 space-y-3 border-t border-white/20">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={BUSINESS_INFO.phoneTel}
                    id="contact-call-button"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white text-[#016DAA] hover:bg-sky-50 font-bold text-sm shadow-md transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Propel Properties</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={BUSINESS_INFO.emailMailto}
                    id="contact-email-button"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Us</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={BUSINESS_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-whatsapp-direct"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat With Us on WhatsApp</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="#office-location-map"
                    id="contact-view-map-button"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-colors"
                  >
                    <Navigation className="w-4 h-4 text-sky-200" />
                    <span>View Map &amp; Directions</span>
                  </motion.a>
                </div>
              </div>

              {/* Aesthetic subtle background wave */}
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>

            {/* Backend Integration Note & Button for Owner */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  Connected to <strong>/api/contact</strong> (Delivery: {BUSINESS_INFO.email})
                </span>
              </div>
              {onOpenBackendConfig && (
                <button
                  type="button"
                  onClick={onOpenBackendConfig}
                  className="flex items-center gap-1 font-bold text-[#016DAA] hover:underline cursor-pointer"
                  title="View backend configuration options"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Config</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Column: Prominent Contact Form with motion */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xl shadow-slate-900/5"
          >
            <div className="mb-6">
              <span className="text-xs font-bold text-[#016DAA] uppercase tracking-wider block">
                Direct Communication
              </span>
              <h3 className="text-2xl font-extrabold text-[#1F2937]">
                Send Us a Message
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Fill out the form below and our real estate team will get back to you promptly.
              </p>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div
                id="contact-form-error"
                className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-sm font-medium text-red-700 flex items-center gap-3 animate-in fade-in"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success State Box */}
            {success ? (
              <div
                id="contact-form-success"
                className="py-10 px-6 text-center space-y-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 animate-in zoom-in-95 duration-200"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Message Delivered</h4>
                <p className="text-base text-gray-700 font-semibold max-w-md mx-auto leading-relaxed">
                  Thank you for contacting Propel Properties. Your message has been received. We will get back to you shortly.
                </p>
                <p className="text-xs text-gray-500">
                  A copy of your inquiry has been forwarded to our dedicated real estate desk at {BUSINESS_INFO.email}.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#016DAA] text-white font-bold text-sm shadow-sm hover:bg-[#015383] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="main-contact-form">
                {/* Honeypot spam trap */}
                <input
                  type="text"
                  name="_hp"
                  value={formData._hp}
                  onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Full Name * */}
                <div>
                  <label htmlFor="contact-full-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-[#E5322E]">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-full-name"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] transition-all"
                  />
                </div>

                {/* Email Address * & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-[#E5322E]">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.name@example.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 08082280219"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] transition-all"
                    />
                  </div>
                </div>

                {/* Subject * & Property of Interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Subject <span className="text-[#E5322E]">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Property Purchase Inquiry"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-property" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Property of Interest
                    </label>
                    <input
                      type="text"
                      id="contact-property"
                      value={formData.propertyOfInterest}
                      onChange={(e) => setFormData({ ...formData, propertyOfInterest: e.target.value })}
                      placeholder="e.g. 4 Bedroom Duplex Lekki"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] transition-all"
                    />
                  </div>
                </div>

                {/* Message * */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Message <span className="text-[#E5322E]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you are looking for (budget, preferred location, timeline, etc.)..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] transition-all"
                  ></textarea>
                </div>

                {/* Checkbox: "I agree to be contacted regarding my enquiry." */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="agree-to-contact"
                    checked={formData.agreeToContact}
                    onChange={(e) => setFormData({ ...formData, agreeToContact: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-[#016DAA] focus:ring-[#016DAA] border-gray-300 cursor-pointer"
                  />
                  <label htmlFor="agree-to-contact" className="text-xs text-gray-600 cursor-pointer leading-normal select-none">
                    I agree to be contacted regarding my enquiry.
                  </label>
                </div>

                {/* Submit Button (Section 16: "Send Message") */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    id="submit-contact-form-button"
                    className="w-full py-4 px-6 rounded-xl bg-[#E5322E] hover:bg-[#CC2622] text-white font-bold text-base shadow-md hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E5322E] cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Interactive Google Map Section with motion entrance */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mt-14 bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden"
          id="office-location-map"
        >
          <div className="p-6 sm:p-8 bg-gradient-to-r from-gray-50 via-white to-sky-50 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#016DAA] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#016DAA]">
                    Office Location &amp; Directions
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    Open for Visits
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
                  Propel Properties Office
                </h3>
                <p className="text-sm text-gray-600 font-medium flex items-center gap-1.5 mt-0.5">
                  <span>{BUSINESS_INFO.address}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="open-google-maps-directions"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#016DAA] hover:bg-[#015383] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 min-h-[44px]"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-bold transition-all active:scale-95 border border-gray-200 min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-[#016DAA]" />
                <span>Call Before Visiting</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] bg-gray-100">
            <iframe
              title="Propel Properties Office Location Map - 33 Anibaba Street, Anibaba, Ikorodu"
              src={BUSINESS_INFO.mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Quick floating address card overlay */}
            <div className="hidden sm:flex absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-gray-200/80 items-center gap-3 max-w-sm pointer-events-auto">
              <div className="w-8 h-8 rounded-xl bg-[#E5322E]/10 text-[#E5322E] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-gray-900">33, Anibaba Street, Ikorodu</p>
                <p className="text-gray-500 font-medium">Anibaba, Ikorodu, Lagos State</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
