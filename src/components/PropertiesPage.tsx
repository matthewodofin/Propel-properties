import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Property, PropertyFilterState } from '../types';
import { PropertyCard } from './PropertyCard';
import {
  PROPERTY_LOCATIONS,
  PROPERTY_TYPES,
  PRICE_RANGES,
} from '../data/properties';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Building,
  CheckCircle2,
} from 'lucide-react';

interface PropertiesPageProps {
  properties: Property[];
  onViewDetails: (property: Property) => void;
  onEnquire: (property: Property) => void;
  initialFilters?: Partial<PropertyFilterState>;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  properties,
  onViewDetails,
  onEnquire,
  initialFilters,
}) => {
  const [filters, setFilters] = useState<PropertyFilterState>({
    searchQuery: initialFilters?.searchQuery || '',
    location: initialFilters?.location || 'All Locations',
    type: initialFilters?.type || 'All Types',
    purpose: initialFilters?.purpose || 'All',
    minPrice: initialFilters?.minPrice !== undefined ? initialFilters.minPrice : 0,
    maxPrice: initialFilters?.maxPrice !== undefined ? initialFilters.maxPrice : 2000000000,
    bedrooms: initialFilters?.bedrooms || 'All',
    sortBy: initialFilters?.sortBy || 'featured',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProperties = useMemo(() => {
    return properties
      .filter((prop) => {
        // Search query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = prop.title.toLowerCase().includes(q);
          const matchArea = prop.area.toLowerCase().includes(q);
          const matchDesc = prop.description.toLowerCase().includes(q);
          if (!matchTitle && !matchArea && !matchDesc) return false;
        }

        // Location
        if (filters.location !== 'All Locations') {
          if (
            prop.location.toLowerCase() !== filters.location.toLowerCase() &&
            prop.city.toLowerCase() !== filters.location.toLowerCase() &&
            !prop.area.toLowerCase().includes(filters.location.toLowerCase())
          ) {
            return false;
          }
        }

        // Type
        if (filters.type !== 'All Types' && prop.type !== filters.type) {
          return false;
        }

        // Purpose (Buy vs Rent)
        if (filters.purpose !== 'All' && prop.purpose !== filters.purpose) {
          return false;
        }

        // Price range
        if (prop.price < filters.minPrice || prop.price > filters.maxPrice) {
          return false;
        }

        // Bedrooms
        if (filters.bedrooms !== 'All') {
          const numBeds = parseInt(filters.bedrooms, 10);
          if (filters.bedrooms === '5+') {
            if (!prop.bedrooms || prop.bedrooms < 5) return false;
          } else {
            if (prop.bedrooms !== numBeds) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'newest') return (b.yearBuilt || 0) - (a.yearBuilt || 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [properties, filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      location: 'All Locations',
      type: 'All Types',
      purpose: 'All',
      minPrice: 0,
      maxPrice: 2000000000,
      bedrooms: 'All',
      sortBy: 'featured',
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.location !== 'All Locations' ||
    filters.type !== 'All Types' ||
    filters.purpose !== 'All' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 2000000000 ||
    filters.bedrooms !== 'All';

  return (
    <div id="properties-page" className="py-12 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-xs font-bold text-[#016DAA] uppercase tracking-wider block mb-1">
            Premium Nigerian Portfolio
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
            Explore Our Properties
          </h1>
          <p className="mt-2 text-base text-gray-600 max-w-2xl">
            Browse our comprehensive inventory of luxury duplexes, modern apartments, verified dry estate lands, and prime commercial investments across Lagos, Abuja, and Port Harcourt.
          </p>
        </motion.div>

        {/* Filter Bar Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm border border-gray-200 mb-8 space-y-4"
        >
          {/* Top Row: Search input + View switchers */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Search by title, neighborhood (e.g. Lekki, Ikoyi), or keywords..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] min-h-[44px]"
              />
            </div>

            {/* Grid vs List View switcher & Sort */}
            <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="font-semibold whitespace-nowrap">Sort:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#016DAA] min-h-[38px]"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Build</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center ${
                    viewMode === 'grid' ? 'bg-white text-[#016DAA] shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center ${
                    viewMode === 'list' ? 'bg-white text-[#016DAA] shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-3 border-t border-gray-100 text-xs">
            {/* Location */}
            <div>
              <label className="font-bold text-gray-700 block mb-1">Location</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] min-h-[40px]"
              >
                {PROPERTY_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="font-bold text-gray-700 block mb-1">Property Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] min-h-[40px]"
              >
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label className="font-bold text-gray-700 block mb-1">Transaction Type</label>
              <select
                value={filters.purpose}
                onChange={(e) => setFilters({ ...filters, purpose: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] min-h-[40px]"
              >
                <option value="All">All Transactions</option>
                <option value="Buy">For Sale (Buy)</option>
                <option value="Rent">For Rent</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="font-bold text-gray-700 block mb-1">Bedrooms</label>
              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] min-h-[40px]"
              >
                <option value="All">Any Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5+">5+ Bedrooms</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="font-bold text-gray-700 block mb-1">Price Range</label>
              <select
                onChange={(e) => {
                  const idx = Number(e.target.value);
                  const selected = PRICE_RANGES[idx];
                  setFilters({
                    ...filters,
                    minPrice: selected.min,
                    maxPrice: selected.max,
                  });
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] min-h-[40px]"
              >
                {PRICE_RANGES.map((range, idx) => (
                  <option key={range.label} value={idx}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters & Reset button */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
              <span className="text-gray-500 font-medium">
                Filtering by active criteria ({filteredProperties.length} matches found)
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 font-bold text-[#E5322E] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
          <p>
            Showing <strong>{filteredProperties.length}</strong> verified properties
          </p>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            All titles checked &amp; verified
          </span>
        </div>

        {/* Properties View */}
        <AnimatePresence mode="wait">
          {filteredProperties.length > 0 ? (
            <motion.div
              key={`props-${viewMode}-${filteredProperties.length}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }
            >
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={onViewDetails}
                  onEnquire={onEnquire}
                  layout={viewMode}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="props-empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-white rounded-3xl border border-gray-200 p-8 shadow-sm"
            >
              <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800">No properties match your current filters</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                Try adjusting your location, price range, or property type, or click below to view all available listings.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-6 py-2.5 rounded-xl bg-[#016DAA] text-white font-bold text-sm shadow-sm hover:bg-[#015383] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
