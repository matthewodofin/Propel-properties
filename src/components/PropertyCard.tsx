import React from 'react';
import { MapPin, Bed, Bath, Maximize2, ShieldCheck, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import { Property } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  onEnquire: (property: Property) => void;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
  onEnquire,
  layout = 'grid',
}) => {
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'FOR SALE':
        return 'bg-[#016DAA] text-white';
      case 'FOR RENT':
        return 'bg-emerald-600 text-white';
      case 'FEATURED':
        return 'bg-[#E5322E] text-white';
      case 'NEW':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-gray-800 text-white';
    }
  };

  const isList = layout === 'list';

  return (
    <article
      id={`property-card-${property.id}`}
      className={`group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${
        isList ? 'md:flex-row' : ''
      }`}
    >
      {/* Property Image Container */}
      <div className={`relative overflow-hidden bg-gray-100 ${isList ? 'md:w-2/5 md:min-h-[260px]' : 'h-64'}`}>
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          <span
            className={`px-3 py-1 rounded-md text-[11px] font-extrabold tracking-wider uppercase shadow-md ${getBadgeStyle(
              property.status
            )}`}
          >
            {property.status}
          </span>
          {property.featured && property.status !== 'FEATURED' && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#E5322E] text-white shadow-md">
              FEATURED
            </span>
          )}
        </div>

        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/90 backdrop-blur-md text-gray-800 shadow-sm">
            {property.type}
          </span>
        </div>

        {/* Total Images Count indicator */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-black/60 text-white backdrop-blur-sm">
            {property.images.length} Photos
          </span>
        </div>
      </div>

      {/* Property Content */}
      <div className={`p-5 sm:p-6 flex-1 flex flex-col justify-between ${isList ? 'md:w-3/5' : ''}`}>
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#016DAA] flex-shrink-0" />
            <span className="truncate">{property.area}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetails(property)}
            className="text-lg font-bold text-[#1F2937] hover:text-[#016DAA] transition-colors line-clamp-2 cursor-pointer mb-3 leading-snug"
          >
            {property.title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-3.5 sm:mb-4">
            <span className="text-xl sm:text-2xl font-black text-[#016DAA] tracking-tight">
              {property.priceFormatted}
            </span>
            {property.pricePerPeriod && (
              <span className="text-xs font-semibold text-gray-500">{property.pricePerPeriod}</span>
            )}
          </div>

          {/* Property Key Specs: Beds, Baths, Size */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-2.5 sm:py-3 border-y border-gray-100 text-[11px] sm:text-xs text-gray-700 mb-4 bg-gray-50/70 rounded-xl px-2 sm:px-3">
            {property.bedrooms !== undefined ? (
              <div className="flex items-center gap-1 sm:gap-1.5 font-medium min-w-0">
                <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#016DAA] flex-shrink-0" />
                <span className="truncate">{property.bedrooms} Beds</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-1.5 font-medium min-w-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#016DAA] flex-shrink-0" />
                <span className="truncate text-[10px] sm:text-[11px]">Verified Plot</span>
              </div>
            )}

            {property.bathrooms !== undefined ? (
              <div className="flex items-center gap-1 sm:gap-1.5 font-medium min-w-0">
                <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#016DAA] flex-shrink-0" />
                <span className="truncate">{property.bathrooms} Baths</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-1.5 font-medium min-w-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#016DAA] flex-shrink-0" />
                <span className="truncate text-[10px] sm:text-[11px]">Dry Ground</span>
              </div>
            )}

            <div className="flex items-center gap-1 sm:gap-1.5 font-medium min-w-0">
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#016DAA] flex-shrink-0" />
              <span className="truncate">{property.size}</span>
            </div>
          </div>
        </div>

        {/* Card Footer: Action Buttons with Accessible Tap Targets */}
        <div className="pt-2 flex items-center justify-between gap-2.5 sm:gap-3">
          <button
            onClick={() => onViewDetails(property)}
            id={`view-prop-btn-${property.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#016DAA] hover:bg-[#015383] text-white text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 active:scale-95 min-h-[44px]"
          >
            <span>View Property</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Quick WhatsApp Inquiry */}
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
              `Hello Propel Properties, I am interested in: ${property.title} (${property.priceFormatted}) in ${property.area}. Please share more details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Inquire via WhatsApp"
            aria-label={`Inquire about ${property.title} on WhatsApp`}
            className="p-2.5 sm:p-3 rounded-xl border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
};
