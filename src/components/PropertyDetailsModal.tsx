import React, { useState } from 'react';
import { Property } from '../types';
import { BUSINESS_INFO } from '../data/content';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Car,
} from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  onScheduleViewing: (property: Property) => void;
  onSendEnquiry: (property: Property) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
  onScheduleViewing,
  onSendEnquiry,
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div
      id="property-details-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[94dvh] overflow-y-auto shadow-2xl border border-gray-100 relative flex flex-col overscroll-contain">
        {/* Sticky Header with Title & Close Button */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate pr-4">
            <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase bg-[#016DAA] text-white">
              {property.status}
            </span>
            <span className="text-xs font-semibold text-gray-500 truncate">
              Ref: {property.id.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          {/* Main Gallery with Thumbnails */}
          <div className="space-y-3">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-900 aspect-[16/9] sm:aspect-[16/10] shadow-md">
              <img
                src={property.images[activeImageIndex]}
                alt={`${property.title} - View ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center"
              />

              {/* Prev / Next Arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 text-white text-[11px] sm:text-xs font-medium backdrop-blur-sm">
                    {activeImageIndex + 1} / {property.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#016DAA] scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Heading, Location & Price */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4 text-[#016DAA]" />
                <span className="font-semibold text-gray-700">{property.area}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] leading-snug">
                {property.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                  Property Type: {property.type}
                </span>
                <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                  Purpose: {property.purpose === 'Buy' ? 'For Sale' : 'For Rent'}
                </span>
                <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1">
                  <FileCheck className="w-3.5 h-3.5" />
                  Title: {property.titleDocument}
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-100 flex-shrink-0 text-left md:text-right">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                Guide Price
              </span>
              <div className="text-3xl font-black text-[#016DAA] tracking-tight">
                {property.priceFormatted}
                {property.pricePerPeriod && (
                  <span className="text-sm font-semibold text-gray-500 block md:inline md:ml-1">
                    {property.pricePerPeriod}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-gray-500 block mt-1 font-medium">
                Verified Direct Pricing • Legal Fee Inclusive Advice
              </span>
            </div>
          </div>

          {/* Core Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {property.bedrooms !== undefined && (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                  <Bed className="w-4 h-4 text-[#016DAA]" />
                  <span>Bedrooms</span>
                </div>
                <div className="text-lg font-bold text-[#1F2937]">{property.bedrooms} En-suite</div>
              </div>
            )}

            {property.bathrooms !== undefined && (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                  <Bath className="w-4 h-4 text-[#016DAA]" />
                  <span>Bathrooms</span>
                </div>
                <div className="text-lg font-bold text-[#1F2937]">{property.bathrooms} Baths</div>
              </div>
            )}

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                <Maximize2 className="w-4 h-4 text-[#016DAA]" />
                <span>Total Size</span>
              </div>
              <div className="text-lg font-bold text-[#1F2937]">{property.size}</div>
            </div>

            {property.parkingSpaces && (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                  <Car className="w-4 h-4 text-[#016DAA]" />
                  <span>Parking</span>
                </div>
                <div className="text-lg font-bold text-[#1F2937]">{property.parkingSpaces} Vehicles</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-[#1F2937] mb-3">Property Overview</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              {property.description}
            </p>
          </div>

          {/* Features & Amenities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#016DAA]" />
                Interior &amp; Structural Features
              </h4>
              <ul className="space-y-2.5">
                {property.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#016DAA] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#016DAA]" />
                Estate Amenities &amp; Infrastructure
              </h4>
              <ul className="space-y-2.5">
                {property.amenities.map((amenity, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Direct CTA Action Buttons Section (Section 13) */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onScheduleViewing(property)}
              id="modal-schedule-viewing-button"
              className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-[#E5322E] hover:bg-[#CC2622] text-white text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a Viewing</span>
            </button>

            <button
              onClick={() => onSendEnquiry(property)}
              id="modal-send-enquiry-button"
              className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-[#016DAA] hover:bg-[#015383] text-white text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Send Enquiry</span>
            </button>

            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                `Hello Propel Properties, I would like to make an enquiry about ${property.title} (${property.priceFormatted}) in ${property.area}. Please share inspection availability.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl border border-emerald-500/40 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Agent</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
