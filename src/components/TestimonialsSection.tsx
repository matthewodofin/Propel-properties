import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/content';
import { TestimonialItem } from '../types';
import {
  Star,
  Quote,
  CheckCircle,
  ShieldCheck,
  Building2,
  Globe2,
  MapPin,
  ThumbsUp,
  PlusCircle,
  Play,
  X,
  Award,
  Sparkles,
  Home,
} from 'lucide-react';
import { SubmitTestimonyModal } from './SubmitTestimonyModal';

interface TestimonialsSectionProps {
  onExploreProperties?: () => void;
  onContactAdvisor?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onExploreProperties,
  onContactAdvisor,
}) => {
  const [testimonies, setTestimonies] = useState<TestimonialItem[]>(TESTIMONIALS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const categories = [
    { id: 'All', label: 'All Testimonies' },
    { id: 'Home Buyer', label: 'Home Buyers' },
    { id: 'Diaspora', label: 'Diaspora Investors' },
    { id: 'Land', label: 'Land Acquisition' },
    { id: 'Commercial', label: 'Commercial & Office' },
    { id: 'Rental', label: 'Serviced Rentals' },
  ];

  const filteredTestimonies = testimonies.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handleTestimonySubmitted = (newTestimony: TestimonialItem) => {
    setTestimonies([newTestimony, ...testimonies]);
  };

  const handleHelpfulClick = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-gradient-to-b from-white via-sky-50/30 to-white relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#016DAA]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#016DAA]/10 text-[#016DAA] text-xs font-bold uppercase tracking-wider mb-4 border border-[#016DAA]/15">
            <Sparkles className="w-4 h-4 text-[#016DAA]" />
            <span>Client Testimonies &amp; Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] tracking-tight leading-tight">
            Trusted by Hundreds of <span className="text-[#016DAA]">Happy Clients</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
            Read firsthand experiences from homeowners, diaspora investors, commercial executives, and land buyers who acquired properties securely through Propel Properties.
          </p>
        </div>

        {/* Trust & Reputation Summary Bar */}
        <div className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg shadow-sky-900/5 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          <div className="pt-2 lg:pt-0">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#1F2937]">4.9 / 5.0</div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
              Client Satisfaction Rating
            </p>
          </div>

          <div className="pt-2 lg:pt-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#1F2937]">100%</div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
              Verified Title Deeds
            </p>
          </div>

          <div className="pt-4 lg:pt-0">
            <div className="w-9 h-9 rounded-xl bg-[#016DAA]/10 text-[#016DAA] flex items-center justify-center mx-auto mb-2">
              <Globe2 className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#1F2937]">15+ Countries</div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
              Diaspora Investors Served
            </p>
          </div>

          <div className="pt-4 lg:pt-0">
            <div className="w-9 h-9 rounded-xl bg-[#E5322E]/10 text-[#E5322E] flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#1F2937]">500+</div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
              Completed Transactions
            </p>
          </div>
        </div>

        {/* Featured Video Spotlight Card */}
        <div className="mb-14 bg-gradient-to-r from-[#016DAA] via-[#015383] to-[#0b2545] rounded-3xl text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Video preview thumbnail */}
            <div className="lg:col-span-5 relative group cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] border-2 border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Dr. Folake Alabi Diaspora Story"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white text-[#016DAA] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Video Testimony (3:45)</span>
                </div>
              </div>
            </div>

            {/* Right: Client Story Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-sky-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Featured Diaspora Success Story</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
                "Buying 2 Verified Plots in Ibeju-Lekki from the UK Without Flying to Nigeria."
              </h3>
              <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
                "When living in London, remote property acquisition usually comes with constant fear of omonile extortion or fake title documents. Propel Properties verified the Governor’s Consent at Alausa, took HD drone footage of the beacon perimeter, and handled every legal detail."
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/15">
                <div>
                  <h4 className="font-bold text-white text-base">Dr. (Mrs.) Folake Alabi</h4>
                  <p className="text-xs text-sky-200">Diaspora Investor &bull; London, UK &amp; Lagos</p>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#016DAA] hover:bg-sky-50 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch Client Story</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Share Testimony Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs with clean touch horizontal scroll */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap min-h-[38px] ${
                  selectedCategory === cat.id
                    ? 'bg-[#016DAA] text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Submit Your Testimony Button */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            id="open-submit-testimony-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 min-h-[44px] flex-shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Share Your Testimony</span>
          </button>
        </div>

        {/* Testimonies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="testimonies-cards-grid">
          {filteredTestimonies.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-[#016DAA]/40 transition-all duration-300 group"
            >
              <div>
                {/* Header: Rating & Highlight Pill */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#016DAA]/25 group-hover:text-[#016DAA]/50 transition-colors" />
                </div>

                {/* Highlight / Benefit Badge */}
                {item.highlight && (
                  <div className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-3">
                    {item.highlight}
                  </div>
                )}

                {/* Property Type Badge */}
                <div className="text-[11px] font-semibold text-[#016DAA] bg-[#016DAA]/10 px-2.5 py-1 rounded-md inline-block mb-3">
                  {item.propertyType}
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Bottom Client Info & Helpful counter */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#016DAA]/20 flex-shrink-0"
                  />
                  <div className="overflow-hidden flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#1F2937] truncate flex items-center gap-1">
                      <span className="truncate">{item.name}</span>
                      {item.verifiedBuyer && (
                        <span title="Verified Propel Properties Buyer" className="inline-flex items-center">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 inline-block flex-shrink-0" />
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-gray-500 truncate">{item.role}</p>
                    <p className="text-[10px] text-[#016DAA] font-semibold truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{item.location}</span>
                    </p>
                  </div>
                </div>

                {/* Date & Helpful reaction */}
                <div className="mt-3 pt-2.5 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
                  <span>{item.date || 'Verified Review'}</span>
                  <button
                    type="button"
                    onClick={() => handleHelpfulClick(item.id)}
                    className="inline-flex items-center gap-1 text-gray-500 hover:text-[#016DAA] transition-colors font-medium active:scale-95"
                    title="Mark testimony as helpful"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({helpfulCounts[item.id] || 4})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if category has no items */}
        {filteredTestimonies.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
            <Quote className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-600">No testimonies found in this category.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-3 px-4 py-2 rounded-xl bg-[#016DAA] text-white text-xs font-bold"
            >
              View All Testimonies
            </button>
          </div>
        )}

        {/* Bottom Call To Action Banner */}
        <div className="mt-16 bg-[#F0F7FB] rounded-3xl p-8 sm:p-10 border border-[#016DAA]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-[#1F2937]">
              Ready to Write Your Own Real Estate Success Story?
            </h3>
            <p className="text-sm text-gray-600 max-w-xl font-normal">
              Whether you are acquiring luxury residential property in Lekki, vetted land in Ibeju-Lekki or Ikorodu, or commercial spaces in Victoria Island, our team ensures total security.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {onExploreProperties && (
              <button
                onClick={onExploreProperties}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#016DAA] hover:bg-[#015383] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Browse Verified Properties</span>
              </button>
            )}

            {onContactAdvisor && (
              <button
                onClick={onContactAdvisor}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-[#016DAA] border border-gray-200 font-bold text-xs sm:text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Speak With An Advisor</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submit Testimony Modal */}
      <SubmitTestimonyModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onTestimonySubmitted={handleTestimonySubmitted}
      />

      {/* Video Testimony Preview Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-gray-900 rounded-3xl max-w-2xl w-full p-6 text-white relative shadow-2xl border border-white/10">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close video dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Client Video Story
              </span>
              <h3 className="text-xl font-bold mt-1">
                Dr. (Mrs.) Folake Alabi &bull; Remote Land Acquisition in Ibeju-Lekki
              </h3>
            </div>

            {/* Video Player Mockup with rich inspection breakdown */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black flex items-center justify-center border border-white/10 mb-4">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
                alt="Land site inspection video preview"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    Site Drone Inspection
                  </span>
                  <span className="text-xs text-gray-300 font-mono">03:45</span>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-[#016DAA] text-white flex items-center justify-center mx-auto shadow-2xl ring-4 ring-white/20">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <p className="text-sm font-bold text-white drop-shadow-md">
                    "From London to Alausa: Certified Title Due Diligence"
                  </p>
                </div>
                <div className="text-xs text-gray-300 flex items-center justify-between">
                  <span>Client: Dr. (Mrs.) Folake Alabi</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> 100% Verified C of O
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Dr. Folake Alabi purchased 2 commercial acreage plots in Ibeju-Lekki, Lagos while resident in London, UK. Propel Properties verified the survey beacons at the Surveyor General's office, handled Governor's consent confirmation, and delivered title deeds safely via secure DHL express courier.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
