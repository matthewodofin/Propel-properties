export type PropertyPurpose = 'Buy' | 'Rent';

export type PropertyType =
  | 'Apartment'
  | 'Duplex'
  | 'House'
  | 'Land'
  | 'Commercial'
  | 'Office'
  | 'Warehouse';

export type PropertyBadge = 'FOR SALE' | 'FOR RENT' | 'FEATURED' | 'NEW';

export interface Property {
  id: string;
  title: string;
  location: string;
  area: string; // e.g., "Lekki Phase 1, Lagos"
  city: 'Lagos' | 'Abuja' | 'Port Harcourt';
  type: PropertyType;
  purpose: PropertyPurpose;
  price: number; // in Naira (₦)
  priceFormatted: string;
  pricePerPeriod?: string; // e.g., "/year"
  bedrooms?: number;
  bathrooms?: number;
  size: string; // e.g., "450 sqm"
  images: string[];
  status: PropertyBadge;
  featured?: boolean;
  description: string;
  features: string[];
  amenities: string[];
  titleDocument: string; // e.g., "Governor's Consent", "Certificate of Occupancy (C of O)", "Gazette"
  parkingSpaces?: number;
  yearBuilt?: number;
}

export interface PropertyFilterState {
  searchQuery: string;
  location: string;
  type: string;
  purpose: string; // 'All' | 'Buy' | 'Rent'
  minPrice: number;
  maxPrice: number;
  bedrooms: string; // 'All' | '1' | '2' | '3' | '4' | '5+'
  sortBy: 'price-asc' | 'price-desc' | 'featured' | 'newest';
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  propertyType: string;
  image: string;
  category?: 'Home Buyer' | 'Diaspora' | 'Land' | 'Commercial' | 'Rental';
  date?: string;
  verifiedBuyer?: boolean;
  highlight?: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  image: string;
  content: string[];
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  propertyOfInterest?: string;
  message: string;
  agreeToContact: boolean;
  _hp?: string; // honeypot
}

export interface PropertyEnquiryData {
  fullName: string;
  email: string;
  phone: string;
  propertyTitle: string;
  preferredViewingDate: string;
  message: string;
  _hp?: string;
}

export interface ListPropertyData {
  ownerName: string;
  phone: string;
  email: string;
  propertyType: string;
  location: string;
  expectedPrice: string;
  transactionType: 'Sale' | 'Rent';
  description?: string;
  _hp?: string;
}
