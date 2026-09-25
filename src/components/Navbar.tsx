import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Phone, MessageSquare, Menu, X, PlusCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface NavbarProps {
  currentView: 'home' | 'properties' | 'about' | 'services' | 'contact';
  onNavigate: (view: 'home' | 'properties' | 'about' | 'services' | 'contact', sectionId?: string) => void;
  onOpenListProperty?: () => void;
  onOpenListPropertyModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenListProperty,
  onOpenListPropertyModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenList = () => {
    if (onOpenListProperty) onOpenListProperty();
    else if (onOpenListPropertyModal) onOpenListPropertyModal();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'properties' | 'about' | 'services' | 'contact', sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <header
      id="main-navbar-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
          : 'bg-white border-b border-gray-100 py-4'
      }`}
    >
      {/* Top Utility Announcement Bar */}
      <div className="hidden lg:block border-b border-gray-100 pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-gray-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Verified Nigerian Real Estate &amp; Prime Investment
            </span>
            <span className="text-gray-300">|</span>
            <span>Lagos • Abuja • Port Harcourt</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={BUSINESS_INFO.phoneTel}
              id="top-bar-phone-link"
              className="flex items-center gap-1.5 hover:text-[#016DAA] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#016DAA]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="top-bar-whatsapp-link"
              className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 transition-colors font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with dedicated breathing room */}
          <div className="flex-shrink-0 mr-6 md:mr-10 lg:mr-14">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#016DAA] rounded-lg p-1"
              id="navbar-brand-button"
              aria-label="Propel Properties Home"
            >
              <Logo size="md" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-[15px] font-semibold text-[#1F2937]" id="desktop-nav-menu">
            <button
              onClick={() => handleNavClick('home')}
              id="nav-link-home"
              className={`transition-colors py-1 relative ${
                currentView === 'home'
                  ? 'text-[#016DAA] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#016DAA]'
                  : 'hover:text-[#016DAA]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('home', 'about-us')}
              id="nav-link-about"
              className="hover:text-[#016DAA] transition-colors py-1"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('properties')}
              id="nav-link-properties"
              className={`transition-colors py-1 relative ${
                currentView === 'properties'
                  ? 'text-[#016DAA] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#016DAA]'
                  : 'hover:text-[#016DAA]'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => handleNavClick('home', 'services')}
              id="nav-link-services"
              className="hover:text-[#016DAA] transition-colors py-1"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('home', 'why-choose-us')}
              id="nav-link-why-us"
              className="hover:text-[#016DAA] transition-colors py-1"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleNavClick('home', 'testimonials')}
              id="nav-link-testimonials"
              className="hover:text-[#016DAA] transition-colors py-1 flex items-center gap-1.5"
            >
              <span>Testimonies</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              id="nav-link-contact"
              className={`transition-colors py-1 relative ${
                currentView === 'contact'
                  ? 'text-[#016DAA] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#016DAA]'
                  : 'hover:text-[#016DAA]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action: List Your Property CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleOpenList}
              id="nav-list-property-button"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E5322E] hover:bg-[#CC2622] text-white text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E5322E]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Property</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleOpenList}
              id="mobile-nav-list-button"
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#E5322E] active:bg-[#CC2622] text-white text-xs font-semibold shadow-xs flex-shrink-0"
            >
              List Property
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-button"
              className="p-2 rounded-lg text-[#1F2937] hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#016DAA] min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Responsive Scroll & Active States */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-8 space-y-3 shadow-2xl max-h-[calc(100dvh-4.5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200"
        >
          {/* Mobile Drawer Brand Header with ample breathing room */}
          <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-gray-100">
            <Logo size="sm" />
            <span className="text-[11px] font-bold text-[#016DAA] bg-[#F0F7FB] px-2.5 py-1 rounded-full uppercase tracking-wider">
              Navigation
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                currentView === 'home'
                  ? 'bg-[#F0F7FB] text-[#016DAA] font-bold'
                  : 'text-[#1F2937] hover:bg-gray-50'
              }`}
            >
              <span>Home</span>
              {currentView === 'home' && <span className="w-2 h-2 rounded-full bg-[#016DAA]"></span>}
            </button>
            <button
              onClick={() => handleNavClick('home', 'about-us')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#1F2937] hover:bg-[#F0F7FB] hover:text-[#016DAA] transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('properties')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                currentView === 'properties'
                  ? 'bg-[#F0F7FB] text-[#016DAA] font-bold'
                  : 'text-[#1F2937] hover:bg-gray-50'
              }`}
            >
              <span>Explore Properties</span>
              {currentView === 'properties' && <span className="w-2 h-2 rounded-full bg-[#016DAA]"></span>}
            </button>
            <button
              onClick={() => handleNavClick('home', 'services')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#1F2937] hover:bg-[#F0F7FB] hover:text-[#016DAA] transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('home', 'why-choose-us')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#1F2937] hover:bg-[#F0F7FB] hover:text-[#016DAA] transition-colors"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleNavClick('home', 'testimonials')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#1F2937] hover:bg-[#F0F7FB] hover:text-[#016DAA] flex items-center justify-between transition-colors"
            >
              <span>Testimonies &amp; Reviews</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">4.9 ★</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                currentView === 'contact'
                  ? 'bg-[#F0F7FB] text-[#016DAA] font-bold'
                  : 'text-[#1F2937] hover:bg-gray-50'
              }`}
            >
              <span>Contact Us</span>
              {currentView === 'contact' && <span className="w-2 h-2 rounded-full bg-[#016DAA]"></span>}
            </button>
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-2">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#016DAA] text-white text-sm font-bold active:scale-[0.98] transition-transform"
            >
              <Phone className="w-4 h-4" />
              <span>Call {BUSINESS_INFO.phone}</span>
            </a>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white text-sm font-bold active:scale-[0.98] transition-transform"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
