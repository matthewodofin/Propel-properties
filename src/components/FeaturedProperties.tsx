import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    <section id="featured-properties-section" className="pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 bg-gray-50/60 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll-in-view */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6"
        >
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

          {/* Filter Tabs with Animated Sliding Pill */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto no-scrollbar w-full sm:w-auto -mx-1 px-2 sm:mx-0 sm:px-1.5 flex-nowrap">
            {(['All', 'Sale', 'Rent', 'Land'] as const).map((tab) => {
              const isActive = activeTab === tab;
              const label =
                tab === 'All' ? 'All Featured' : tab === 'Sale' ? 'For Sale' : tab === 'Rent' ? 'For Rent' : 'Land Parcels';

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap min-h-[38px] cursor-pointer ${
                    isActive ? 'text-white' : 'text-gray-600 hover:text-[#016DAA]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFeaturedTab"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-[#016DAA] rounded-xl shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Properties Grid with Animated Fluid Transitions */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={onViewDetails}
                onEnquire={onEnquire}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA to view all properties */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onViewAll}
            id="view-all-properties-button"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white border-2 border-[#016DAA] text-[#016DAA] hover:bg-[#016DAA] hover:text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-colors cursor-pointer"
          >
            <span>Explore All Properties ({properties.length} Listings)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
