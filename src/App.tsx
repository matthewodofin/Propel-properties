import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProperties } from './components/FeaturedProperties';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InsightsSection } from './components/InsightsSection';
import { ContactSection } from './components/ContactSection';
import { PropertiesPage } from './components/PropertiesPage';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { PropertyEnquiryModal } from './components/PropertyEnquiryModal';
import { ListPropertyModal } from './components/ListPropertyModal';
import { BackendConfigModal } from './components/BackendConfigModal';
import { SAMPLE_PROPERTIES } from './data/properties';
import { Property, PropertyFilterState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'properties' | 'about' | 'services' | 'contact'>('home');
  const [properties] = useState<Property[]>(SAMPLE_PROPERTIES);

  // Modals state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [enquiryProperty, setEnquiryProperty] = useState<Property | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isListPropertyModalOpen, setIsListPropertyModalOpen] = useState(false);
  const [isBackendConfigModalOpen, setIsBackendConfigModalOpen] = useState(false);

  // Filtering state
  const [propertiesFilter, setPropertiesFilter] = useState<Partial<PropertyFilterState>>({
    searchQuery: '',
    location: 'All Locations',
    type: 'All Types',
    purpose: 'All',
  });

  // Contact prefill state
  const [contactSubject, setContactSubject] = useState('');
  const [contactProperty, setContactProperty] = useState('');

  // Scroll to top or specific section on navigation
  const handleNavigate = (view: 'home' | 'properties' | 'about' | 'services' | 'contact', sectionId?: string) => {
    if (sectionId && view === 'home') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            const navHeader = document.getElementById('main-navbar-header');
            const navHeight = navHeader ? navHeader.offsetHeight : 70;
            const targetPosition = el.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
          }
        }, 120);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          const navHeader = document.getElementById('main-navbar-header');
          const navHeight = navHeader ? navHeader.offsetHeight : 70;
          const targetPosition = el.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
        }
      }
    } else {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Search handler from Hero / Search Box
  const handleSearch = (filters: Partial<PropertyFilterState>) => {
    setPropertiesFilter({
      searchQuery: filters.searchQuery || '',
      location: filters.location && filters.location !== 'All Locations' ? filters.location : 'All Locations',
      type: filters.type && filters.type !== 'All Types' ? filters.type : 'All Types',
      purpose: filters.purpose || 'All',
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    });
    setCurrentView('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // View property details modal
  const handleViewPropertyDetails = (property: Property) => {
    setSelectedProperty(property);
  };

  // Schedule viewing / enquiry for a property
  const handleOpenEnquiry = (property: Property) => {
    setEnquiryProperty(property);
    setIsEnquiryModalOpen(true);
  };

  // Service enquiry handler
  const handleServiceEnquiry = (serviceTitle: string) => {
    setContactSubject(`Service Enquiry: ${serviceTitle}`);
    setContactProperty('');
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select property type from Footer or shortcuts
  const handleSelectPropertyType = (type: string) => {
    setPropertiesFilter({
      type: type === 'All' ? 'All Types' : type,
    });
    setCurrentView('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-[#016DAA] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenListProperty={() => setIsListPropertyModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            {/* Hero Section with Search Box */}
            <Hero
              onExploreProperties={() => handleNavigate('properties')}
              onContactAgent={() => handleNavigate('contact')}
              onSearch={handleSearch}
            />

            {/* Featured Properties Section */}
            <FeaturedProperties
              properties={properties}
              onViewDetails={handleViewPropertyDetails}
              onEnquire={handleOpenEnquiry}
              onViewAll={() => handleNavigate('properties')}
            />

            {/* About Section */}
            <AboutSection
              onLearnMore={() => handleNavigate('about')}
              onContactUs={() => handleNavigate('contact')}
            />

            {/* Services Section */}
            <ServicesSection
              onSelectServiceForEnquiry={handleServiceEnquiry}
            />

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* How It Works */}
            <HowItWorks
              onStartJourney={() => handleNavigate('properties')}
            />

            {/* Client Testimonials */}
            <TestimonialsSection
              onExploreProperties={() => handleNavigate('properties')}
              onContactAdvisor={() => handleNavigate('contact')}
            />

            {/* News & Real Estate Insights */}
            <InsightsSection />

            {/* Contact Section */}
            <ContactSection
              initialSubject={contactSubject}
              initialProperty={contactProperty}
              onOpenBackendConfig={() => setIsBackendConfigModalOpen(true)}
            />
          </>
        )}

        {currentView === 'properties' && (
          <PropertiesPage
            properties={properties}
            onViewDetails={handleViewPropertyDetails}
            onEnquire={handleOpenEnquiry}
            initialFilters={propertiesFilter}
          />
        )}

        {currentView === 'about' && (
          <div className="py-8">
            <AboutSection
              onLearnMore={() => {}}
              onContactUs={() => handleNavigate('contact')}
            />
            <WhyChooseUs />
            <TestimonialsSection
              onExploreProperties={() => handleNavigate('properties')}
              onContactAdvisor={() => handleNavigate('contact')}
            />
          </div>
        )}

        {currentView === 'services' && (
          <div className="py-8">
            <ServicesSection
              onSelectServiceForEnquiry={handleServiceEnquiry}
            />
            <HowItWorks
              onStartJourney={() => handleNavigate('contact')}
            />
          </div>
        )}

        {currentView === 'contact' && (
          <div className="py-8">
            <ContactSection
              initialSubject={contactSubject}
              initialProperty={contactProperty}
              onOpenBackendConfig={() => setIsBackendConfigModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Comprehensive Site Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectPropertyType={handleSelectPropertyType}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onScheduleViewing={(prop) => {
          setSelectedProperty(null);
          handleOpenEnquiry(prop);
        }}
        onSendEnquiry={(prop) => {
          setSelectedProperty(null);
          handleOpenEnquiry(prop);
        }}
      />

      {/* Property Enquiry Form Modal */}
      <PropertyEnquiryModal
        property={enquiryProperty}
        isOpen={isEnquiryModalOpen}
        onClose={() => {
          setIsEnquiryModalOpen(false);
          setEnquiryProperty(null);
        }}
      />

      {/* List Your Property Modal */}
      <ListPropertyModal
        isOpen={isListPropertyModalOpen}
        onClose={() => setIsListPropertyModalOpen(false)}
      />

      {/* Backend / Email Service Configuration Modal */}
      <BackendConfigModal
        isOpen={isBackendConfigModalOpen}
        onClose={() => setIsBackendConfigModalOpen(false)}
      />
    </div>
  );
}
