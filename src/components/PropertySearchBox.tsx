import React, { useState } from 'react';
import { Search, MapPin, Home, Tag, DollarSign } from 'lucide-react';
import { PROPERTY_LOCATIONS, PROPERTY_TYPES, PRICE_RANGES } from '../data/properties';
import { PropertyFilterState } from '../types';

interface PropertySearchBoxProps {
  onSearch: (filters: Partial<PropertyFilterState>) => void;
  className?: string;
}

export const PropertySearchBox: React.FC<PropertySearchBoxProps> = ({
  onSearch,
  className = '',
}) => {
  const [purpose, setPurpose] = useState<'Buy' | 'Rent'>('Buy');
  const [propertyType, setPropertyType] = useState<string>('All Types');
  const [location, setLocation] = useState<string>('All Locations');
  const [priceRangeIndex, setPriceRangeIndex] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPrice = PRICE_RANGES[priceRangeIndex];
    onSearch({
      purpose,
      type: propertyType,
      location,
      minPrice: selectedPrice.min,
      maxPrice: selectedPrice.max,
    });
  };

  return (
    <div
      id="hero-property-search-container"
      className={`w-full max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 ${className}`}
    >
      {/* Purpose Tabs: Buy vs Rent */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6 border-b border-gray-100 pb-3" id="search-purpose-tabs">
        <button
          type="button"
          onClick={() => setPurpose('Buy')}
          id="purpose-tab-buy"
          className={`flex-1 sm:flex-initial text-center px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 min-h-[42px] ${
            purpose === 'Buy'
              ? 'bg-[#016DAA] text-white shadow-sm'
              : 'text-gray-600 hover:text-[#016DAA] hover:bg-gray-50'
          }`}
        >
          Buy Property
        </button>
        <button
          type="button"
          onClick={() => setPurpose('Rent')}
          id="purpose-tab-rent"
          className={`flex-1 sm:flex-initial text-center px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 min-h-[42px] ${
            purpose === 'Rent'
              ? 'bg-[#016DAA] text-white shadow-sm'
              : 'text-gray-600 hover:text-[#016DAA] hover:bg-gray-50'
          }`}
        >
          Rent Property
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-end">
        {/* Field 1: Property Type */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="search-property-type" className="flex items-center gap-1.5 text-xs font-bold text-gray-700 uppercase tracking-wider">
            <Home className="w-3.5 h-3.5 text-[#016DAA] flex-shrink-0" />
            <span>Property Type</span>
          </label>
          <div className="relative">
            <select
              id="search-property-type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-[#1F2937] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] transition-all cursor-pointer min-h-[46px]"
            >
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Field 2: Location */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="search-property-location" className="flex items-center gap-1.5 text-xs font-bold text-gray-700 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#016DAA] flex-shrink-0" />
            <span>Location</span>
          </label>
          <div className="relative">
            <select
              id="search-property-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-[#1F2937] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] transition-all cursor-pointer min-h-[46px]"
            >
              {PROPERTY_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Field 3: Price Range */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="search-property-price" className="flex items-center gap-1.5 text-xs font-bold text-gray-700 uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5 text-[#016DAA] flex-shrink-0" />
            <span>Price Range</span>
          </label>
          <div className="relative">
            <select
              id="search-property-price"
              value={priceRangeIndex}
              onChange={(e) => setPriceRangeIndex(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-[#1F2937] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016DAA] transition-all cursor-pointer min-h-[46px]"
            >
              {PRICE_RANGES.map((range, idx) => (
                <option key={range.label} value={idx}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Submit Button */}
        <div className="pt-1 sm:pt-0">
          <button
            type="submit"
            id="hero-search-submit-button"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#E5322E] hover:bg-[#CC2622] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E5322E] text-sm min-h-[46px]"
          >
            <Search className="w-4 h-4" />
            <span>Search Property</span>
          </button>
        </div>
      </form>
    </div>
  );
};
