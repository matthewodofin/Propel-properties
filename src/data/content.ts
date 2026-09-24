import { ServiceItem, TestimonialItem, InsightArticle } from '../types';

export const BUSINESS_INFO = {
  name: 'Propel Properties',
  tagline: 'Your Trusted Partner in Property & Investment',
  phone: '08082280219',
  phoneFormatted: '+234 808 228 0219',
  phoneTel: 'tel:08082280219',
  email: 'seyiodofin@gmail.com',
  emailMailto: 'mailto:seyiodofin@gmail.com',
  address: '33, Anibaba Street, Anibaba, Ikorodu, Lagos, Nigeria',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=33+Anibaba+Street+Anibaba+Ikorodu+Lagos',
  mapEmbedUrl: 'https://maps.google.com/maps?q=33+Anibaba+Street,+Ikorodu,+Lagos,+Nigeria&t=&z=16&ie=UTF8&iwloc=&output=embed',
  hours: 'Monday – Saturday: 8:00 AM – 6:00 PM',
  whatsappNumber: '2348082280219',
  whatsappUrl: 'https://wa.me/2348082280219?text=Hello%20Propel%20Properties,%20I%20would%20like%20to%20make%20an%20enquiry%20about%20a%20property.',
  primaryColor: '#016DAA',
  accentColor: '#E5322E',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  formspreeEndpoint: 'https://formspree.io/f/mrpblqyr',
};

export const COMPANY_STATS = [
  { value: '500+', label: 'Properties', subtext: 'Sold, rented & managed' },
  { value: '1,000+', label: 'Clients', subtext: 'Satisfied investors & families' },
  { value: '10+', label: 'Years Experience', subtext: 'Proven Nigerian market mastery' },
  { value: '50+', label: 'Investment Deals', subtext: 'High capital-yield opportunities' },
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'property-sales',
    number: '01',
    title: 'PROPERTY SALES',
    tagline: 'Find and acquire residential, commercial and investment properties.',
    description:
      'We connect discerning buyers with handpicked, legally vetted luxury homes, duplexes, contemporary apartments, and commercial facilities across prime Nigerian locations.',
    features: [
      'Thorough title verification (C of O, Governor’s Consent, Gazette)',
      'Direct developer negotiations for the best market prices',
      'End-to-end legal documentation and deed perfection',
    ],
  },
  {
    id: 'property-rentals',
    number: '02',
    title: 'PROPERTY RENTALS',
    tagline: 'Discover suitable rental properties for homes and businesses.',
    description:
      'Browse verified residential and commercial rental listings. Whether you are an expatriate, a growing family, or an expanding company, we ensure prompt placement into comfortable, well-managed spaces.',
    features: [
      'Flexible annual and serviced tenancy agreements',
      'Pre-vetted landlords and fully functional utilities',
      'Corporate staff relocation and executive accommodations',
    ],
  },
  {
    id: 'land-sales',
    number: '03',
    title: 'LAND SALES',
    tagline: 'Explore verified land opportunities in strategic locations.',
    description:
      'Acquire 100% dry, verified land in rapid-growth development corridors like Ibeju-Lekki, Epe, and Abuja. Benefit from exponential capital appreciation with completely secure land titles.',
    features: [
      'Zero community or "omo-onile" harassment guarantee',
      'Free surveyor beacon verification & layout inspections',
      'Flexible payment installments on designated estate plots',
    ],
  },
  {
    id: 'property-management',
    number: '04',
    title: 'PROPERTY MANAGEMENT',
    tagline: 'Professional management solutions for property owners and investors.',
    description:
      'Protect and maximize your real estate yield. We oversee tenant vetting, rent collection, preventative maintenance, security infrastructure, and legal compliance so you enjoy passive rental returns.',
    features: [
      'Rigorous tenant credit and background profiling',
      'Prompt rent remittance and detailed financial accounting',
      '24/7 emergency maintenance & facilities supervision',
    ],
  },
  {
    id: 'real-estate-investment',
    number: '05',
    title: 'REAL ESTATE INVESTMENT',
    tagline: 'Identify property opportunities designed to support long-term investment goals.',
    description:
      'Tailored portfolio advisory for local and diaspora investors seeking high ROI, off-plan capital growth, or high-yield rental developments in Nigeria’s most resilient economic zones.',
    features: [
      'Data-backed market intelligence and cash flow modeling',
      'Exclusive access to high-demand off-plan developer projects',
      'Hedge against inflation with tangible dollar-pegged assets',
    ],
  },
  {
    id: 'property-consultancy',
    number: '06',
    title: 'PROPERTY CONSULTANCY',
    tagline: 'Get professional guidance for property acquisition, development and investment decisions.',
    description:
      'Make informed property decisions backed by experienced real estate consultants. We provide valuation, feasibility studies, regulatory advice, and joint-venture structuring.',
    features: [
      'Independent property valuation and market appraisal',
      'Lagos & Abuja urban planning and zoning approvals assistance',
      'Joint-venture (JV) land development advisory',
    ],
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Verified Property Opportunities',
    description:
      'Every property, duplex, apartment, and plot in our portfolio undergoes thorough legal title checks, survey searches, and physical due diligence before listing.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Professional Service',
    description:
      'Our seasoned team of licensed realtors and legal advisors deliver prompt, courteous, and structured service from your initial inquiry to final handover.',
    icon: 'Briefcase',
  },
  {
    title: 'Transparent Transactions',
    description:
      'No hidden charges, ambiguous documentation, or sudden fee spikes. We provide complete clarity on purchase prices, statutory fees, and development levies.',
    icon: 'FileText',
  },
  {
    title: 'Customer-Focused Approach',
    description:
      'We tailor our recommendations around your exact budget, timeline, and lifestyle preferences rather than simply pushing inventory.',
    icon: 'HeartHandshake',
  },
  {
    title: 'Strategic Investment Opportunities',
    description:
      'Our team identifies high-growth investment nodes with historic appreciation rates of 25% to 45% per annum, shielding your capital from inflation.',
    icon: 'TrendingUp',
  },
  {
    title: 'Experienced Property Guidance',
    description:
      'With over a decade of hands-on experience navigating the complexities of Nigerian real estate, we safeguard your wealth every step of the way.',
    icon: 'Award',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Tell Us What You Need',
    description:
      'Share your property specifications, preferred location, target budget, and investment or living goals with our advisory team.',
  },
  {
    step: '02',
    title: 'Explore Suitable Properties',
    description:
      'We present a curated shortlist of verified listings matching your criteria, complete with video tours, floor plans, and verified title documents.',
  },
  {
    step: '03',
    title: 'Schedule a Viewing',
    description:
      'Enjoy seamless physical or high-definition virtual guided inspections at your convenience with an experienced Propel Properties representative.',
  },
  {
    step: '04',
    title: 'Complete Your Property Transaction',
    description:
      'Finalize documentation with complete legal support, transparent escrow or bank payments, and receive your keys and title documents smoothly.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Engr. Babatunde Adeyemi',
    role: 'Homeowner & Civil Engineer',
    location: 'Lekki Phase 1, Lagos',
    comment:
      'Propel Properties made the process of finding our new home straightforward and stress-free. As an engineer, I am extremely particular about structural integrity and verified title deeds. Their team answered every question with full documentation and made the transaction seamless.',
    rating: 5,
    propertyType: '4 Bedroom Duplex in Lekki',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    category: 'Home Buyer',
    date: 'February 2026',
    verifiedBuyer: true,
    highlight: 'Flawless Title Due Diligence',
  },
  {
    id: 'test-2',
    name: 'Dr. (Mrs.) Folake Alabi',
    role: 'Diaspora Real Estate Investor',
    location: 'London, UK / Lagos',
    comment:
      'Buying property from the UK used to be full of anxiety until I partnered with Propel Properties. They conducted video inspections, verified the C of O at Alausa, and handled my land acquisition in Ibeju-Lekki without a single hitch. I have already bought two plots through them.',
    rating: 5,
    propertyType: 'Estate Land in Ibeju-Lekki',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    category: 'Diaspora',
    date: 'January 2026',
    verifiedBuyer: true,
    highlight: 'Zero-Anxiety Remote Purchase',
  },
  {
    id: 'test-3',
    name: 'Chief Emeka Okonkwo',
    role: 'Managing Director, Apex Logistics',
    location: 'Victoria Island, Lagos',
    comment:
      'We needed a prime Grade-A commercial office in Victoria Island for our expanding corporate headquarters. Propel Properties understood our technical requirements for power redundancy, parking, and open floor plans, securing a fantastic lease on very favorable terms.',
    rating: 5,
    propertyType: 'Commercial Space in Victoria Island',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    category: 'Commercial',
    date: 'December 2025',
    verifiedBuyer: true,
    highlight: 'Prime Corporate Placement',
  },
  {
    id: 'test-4',
    name: 'Amina Danjuma',
    role: 'Tech Consultant & First-time Buyer',
    location: 'Ajah, Lagos',
    comment:
      'As a first-time buyer in Lagos, the real estate market felt overwhelming. The Propel Properties consultants were patient, transparent about all ancillary costs, and guided me through mortgage pre-qualification until I got the keys to my serviced 3-bedroom apartment.',
    rating: 5,
    propertyType: 'Serviced 3 Bed Apartment in Ajah',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    category: 'Home Buyer',
    date: 'November 2025',
    verifiedBuyer: true,
    highlight: 'Supportive First-Time Ownership',
  },
  {
    id: 'test-5',
    name: 'Pastor & Mrs. Emmanuel Davies',
    role: 'Retired Public Servants',
    location: 'Anibaba / Ikorodu, Lagos',
    comment:
      'We wanted a serene, accessible retirement home around Ikorodu with verified family title without omonile troubles. The Propel Properties team in Ikorodu handled everything from boundary beacon verification to survey registration. We moved into our newly completed bungalow peacefully.',
    rating: 5,
    propertyType: '3 Bedroom Bungalow in Ikorodu',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    category: 'Home Buyer',
    date: 'January 2026',
    verifiedBuyer: true,
    highlight: '100% Omonile-Free Guarantee',
  },
  {
    id: 'test-6',
    name: 'Olumide & Kehinde Bankole',
    role: 'Diaspora Investors & Healthcare Professionals',
    location: 'Toronto, Canada',
    comment:
      'Investing in Nigeria while living in Canada requires dependable partners who prioritize integrity. Propel Properties sent drone footage, monthly progress milestones, and handled our Governor’s Consent transfer for our luxury Ikoyi terrace. Excellent communication throughout.',
    rating: 5,
    propertyType: '4 Bedroom Terrace in Ikoyi',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    category: 'Diaspora',
    date: 'December 2025',
    verifiedBuyer: true,
    highlight: 'Transparent Milestone Video Updates',
  },
  {
    id: 'test-7',
    name: 'Hajiya Fatima Sanusi',
    role: 'Agribusiness Entrepreneur',
    location: 'Epe Express Corridor, Lagos',
    comment:
      'I acquired 4 acres of commercial agricultural land along the Epe expressway for our farm hub. Propel Properties verified the gazette documentation and community excision approvals at the surveyor general’s office. Their precision saved us time and capital.',
    rating: 5,
    propertyType: 'Commercial Acreage in Epe',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    category: 'Land',
    date: 'November 2025',
    verifiedBuyer: true,
    highlight: 'Ironclad Gazette Verification',
  },
  {
    id: 'test-8',
    name: 'Michael Vance',
    role: 'Expatriate Operations Lead',
    location: 'Oniru / Victoria Island, Lagos',
    comment:
      'Finding a fully serviced, secure residential apartment in Victoria Island with genuine 24-hour power and clean water within 48 hours was critical for my relocation. Propel Properties delivered exceptional service with zero friction.',
    rating: 5,
    propertyType: 'Serviced 3 Bed Apartment in Oniru',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    category: 'Rental',
    date: 'February 2026',
    verifiedBuyer: true,
    highlight: 'Rapid Turnkey Relocation',
  },
];

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: 'insight-1',
    title: '5 Things to Check Before Buying Land in Nigeria',
    category: 'Land Due Diligence',
    date: 'February 2026',
    readTime: '5 min read',
    summary:
      'Avoid costly pitfalls and litigation by understanding survey plans, Governor’s Consent, government gazettes, and community settlement verification.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    content: [
      '1. Coordinate Charting at the Surveyor General’s Office: Before committing funds, have a registered surveyor chart the property coordinates against government acquisitions. Never rely solely on an agent’s word.',
      '2. Understand the Difference in Land Titles: A "Gazette" or "Governor\'s Consent" represents legally verified ownership, whereas "Excision in Progress" or unregistered deeds carry material legal risk.',
      '3. Physical Ground Inspection: Confirm soil topography (dry vs swampy), drainage channels, and access roads during both wet and dry conditions.',
      '4. Community Due Diligence: Ensure no family disputes or conflicting traditional ownership claims exist on the parcel.',
      '5. Professional Legal Representation: Always engage a certified real estate attorney to draft and scrutinize the Contract of Sale and Deed of Assignment.',
    ],
  },
  {
    id: 'insight-2',
    title: 'How to Choose the Right Property Investment in 2026',
    category: 'Investment Strategy',
    date: 'January 2026',
    readTime: '6 min read',
    summary:
      'A practical framework for comparing capital growth versus rental yields across Lagos, Abuja, and Port Harcourt property corridors.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    content: [
      '1. Infrastructure Precedes Appreciation: Look for upcoming government or private infrastructure megaprojects (e.g., deep sea ports, ring roads, airport expansions) which catalyze nearby land value multipliers.',
      '2. Short-Let vs Long-Term Tenancy Yields: While short-let serviced apartments in Lekki Phase 1 and Victoria Island can yield 15-22% annually, they require rigorous ongoing facility management compared to traditional 8-11% annual leases.',
      '3. Off-Plan Developer Vetting: When purchasing off-plan for discount pricing, inspect the developer’s completed track record, escrow safeguards, and delivery timeliness.',
      '4. Liquidity Considerations: Choose high-demand 2-bedroom and 3-bedroom configurations that enjoy consistently high tenant turnover and rapid resale liquidity.',
    ],
  },
  {
    id: 'insight-3',
    title: 'What to Consider Before Renting a Property in Lagos',
    category: 'Tenant Guide',
    date: 'January 2026',
    readTime: '4 min read',
    summary:
      'Crucial factors to inspect—from flood resilience and alternative power infrastructure to service charge transparency and landlord agreements.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    content: [
      '1. Electricity & Power Backups: Clarify whether the estate operates 24/7 central generators, what the hourly power schedule looks like, and whether power charges are metered individually.',
      '2. Service Charge Breakdown: Request an itemized audit of monthly or annual service charges (waste disposal, security, water treatment, gardening) to prevent unexpected post-move expenses.',
      '3. Rainy Season Road Access: Verify road drainage and neighborhood flooding history, especially in low-lying island corridors.',
      '4. Tenancy Agreement Clauses: Scrutinize refund policies on cautionary deposits, renewal notification windows, and landlord maintenance responsibilities.',
    ],
  },
];

export const FOOTER_LINKS = {
  quickLinks: [
    { name: 'Home', href: '#home' },
    { name: 'Properties', href: '#properties' },
    { name: 'About Us', href: '#about-us' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ],
  propertyTypes: [
    { name: 'Houses & Duplexes', value: 'Duplex' },
    { name: 'Luxury Apartments', value: 'Apartment' },
    { name: 'Land & Plots', value: 'Land' },
    { name: 'Commercial Spaces', value: 'Commercial' },
  ],
};
