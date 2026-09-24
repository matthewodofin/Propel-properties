import React, { useState } from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedPropertiesProps {
  properties: Property[];
  onViewDetails: (property: Property) => void;
  onEnquire: (property: Property) => void;
  onViewAll: () => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  onViewDetails,
  onEnquire,
  onViewAll,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Sale' | 'Rent' | 'Land'>('All');

  const filteredProperties = properties.filter((prop) => {
    if (activeTab === 'All') return prop.featured || prop.status === 'FEATURED' || prop.status === 'NEW';
    if (activeTab === 'Sale') return prop.purpose === 'Buy' && prop.type !== 'Land';
    if (activeTab === 'Rent') return prop.purpose === 'Rent';
    if (activeTab === 'Land') return prop.type === 'Land';
    return true;
  }).slice(0, 6);

  return (
    <section id="featured-properties-section" className="pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 bg-gray-50/60 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7FB] text-[#016DAA] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Portfolios</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F2937] tracking-tight">
              Featured Properties
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600">
              Explore our hand-selected luxury residences, verified land parcels, and high-yield commercial assets across prime Nigerian destinations.
            </p>
          </div>

          {/* Filter Tabs with Touch-friendly Horizontal Scroll */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto no-scrollbar w-full sm:w-auto -mx-1 px-2 sm:mx-0 sm:px-1.5 flex-nowrap">
            {(['All', 'Sale', 'Rent', 'Land'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap min-h-[38px] ${
                  activeTab === tab
                    ? 'bg-[#016DAA] text-white shadow-sm'
                    : 'text-gray-600 hover:text-[#016DAA] hover:bg-gray-50'
                }`}
              >
                {tab === 'All' ? 'All Featured' : tab === 'Sale' ? 'For Sale' : tab === 'Rent' ? 'For Rent' : 'Land Parcels'}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={onViewDetails}
              onEnquire={onEnquire}
            />
          ))}
        </div>

        {/* Bottom CTA to view all properties */}
        <div className="mt-14 text-center">
          <button
            onClick={onViewAll}
            id="view-all-properties-button"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white border-2 border-[#016DAA] text-[#016DAA] hover:bg-[#016DAA] hover:text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
          >
            <span>Explore All Properties ({properties.length} Listings)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
