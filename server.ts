import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { SAMPLE_PROPERTIES } from './src/data/properties.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for messages and enquiries (supports retrieval/admin review if needed)
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  property?: string;
  message: string;
  agreed: boolean;
  createdAt: string;
  status: 'received' | 'processed';
}

interface ViewingEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  propertyTitle: string;
  preferredDate: string;
  message?: string;
  createdAt: string;
}

interface PropertyListingRequest {
  id: string;
  ownerName: string;
  phone: string;
  email: string;
  propertyType: string;
  location: string;
  expectedPrice: string;
  transactionType: 'Sale' | 'Rent';
  description?: string;
  createdAt: string;
}

const contactSubmissions: ContactSubmission[] = [];
const viewingEnquiries: ViewingEnquiry[] = [];
const propertyListings: PropertyListingRequest[] = [];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrpblqyr';

async function forwardToFormspree(payload: Record<string, any>) {
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        _timestamp: new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('[Server Formspree Forward Error]:', err);
    return false;
  }
}

// API: Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'Propel Properties API',
    businessEmail: 'seyiodofin@gmail.com',
    businessPhone: '08082280219',
    timestamp: new Date().toISOString(),
  });
});

// API: Get Properties
app.get('/api/properties', (req: Request, res: Response) => {
  res.json({
    success: true,
    total: SAMPLE_PROPERTIES.length,
    properties: SAMPLE_PROPERTIES,
  });
});

// API: Contact Form Submission
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, property, message, agreed, _hp } = req.body;

    // Spam honeypot trap: if hidden field _hp is filled, silently discard spam
    if (_hp) {
      console.warn('[Spam Detection] Honeypot field triggered. Discarding submission.');
      return res.status(200).json({
        success: true,
        message: 'Thank you for contacting Propel Properties. Your message has been received. We will get back to you shortly.',
      });
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please provide a valid full name (minimum 2 characters).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please specify a subject for your enquiry.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Message must be at least 10 characters long.' });
    }

    const newSubmission: ContactSubmission = {
      id: `cnt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      subject: subject.trim(),
      property: property ? String(property).trim() : undefined,
      message: message.trim(),
      agreed: Boolean(agreed),
      createdAt: new Date().toISOString(),
      status: 'received',
    };

    contactSubmissions.push(newSubmission);

    console.log(`[Propel Properties] New Contact Message Received:
    ID: ${newSubmission.id}
    From: ${newSubmission.name} <${newSubmission.email}> (${newSubmission.phone || 'No phone'})
    Subject: ${newSubmission.subject}
    Property: ${newSubmission.property || 'General Enquiry'}
    Destination Email: seyiodofin@gmail.com
    Time: ${newSubmission.createdAt}`);

    // Forward to Formspree endpoint if not already delivered by client
    if (!req.body._formspreeDelivered) {
      forwardToFormspree({
        _subject: `[Propel Properties Contact] ${newSubmission.subject} - from ${newSubmission.name}`,
        _replyto: newSubmission.email,
        formName: 'Website Contact Form',
        name: newSubmission.name,
        email: newSubmission.email,
        phone: newSubmission.phone || 'Not provided',
        subject: newSubmission.subject,
        property: newSubmission.property || 'General Enquiry',
        message: newSubmission.message,
        agreed: newSubmission.agreed ? 'Yes' : 'No',
      }).catch((err) => console.error('Contact Formspree forward error:', err));
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting Propel Properties. Your message has been received. We will get back to you shortly.',
      submissionId: newSubmission.id,
    });
  } catch (err) {
    console.error('Error processing contact form:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred while processing your request. Please call 08082280219 directly.',
    });
  }
});

// API: Property Viewing Enquiry
app.post('/api/enquiry', (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, propertyTitle, preferredDate, message, _hp } = req.body;

    if (_hp) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for your enquiry. Propel Properties will contact you shortly.',
      });
    }

    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please provide your full name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    if (!phone || phone.trim().length < 7) {
      return res.status(400).json({ success: false, error: 'Please provide a reachable phone number.' });
    }

    const newEnquiry: ViewingEnquiry = {
      id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      propertyTitle: propertyTitle || 'Selected Property',
      preferredDate: preferredDate || 'Flexible / As soon as possible',
      message: message?.trim(),
      createdAt: new Date().toISOString(),
    };

    viewingEnquiries.push(newEnquiry);

    console.log(`[Propel Properties] New Viewing Enquiry Received:
    ID: ${newEnquiry.id}
    Client: ${newEnquiry.fullName} (${newEnquiry.phone}, ${newEnquiry.email})
    Property: ${newEnquiry.propertyTitle}
    Preferred Date: ${newEnquiry.preferredDate}`);

    // Forward to Formspree endpoint if not already delivered by client
    if (!req.body._formspreeDelivered) {
      forwardToFormspree({
        _subject: `[Propel Properties Viewing Enquiry] ${newEnquiry.propertyTitle} - from ${newEnquiry.fullName}`,
        _replyto: newEnquiry.email,
        formName: 'Property Viewing Enquiry Modal',
        name: newEnquiry.fullName,
        email: newEnquiry.email,
        phone: newEnquiry.phone,
        propertyTitle: newEnquiry.propertyTitle,
        preferredDate: newEnquiry.preferredDate,
        message: newEnquiry.message || 'No additional notes provided',
      }).catch((err) => console.error('Enquiry Formspree forward error:', err));
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for your enquiry. Propel Properties will contact you shortly.',
      enquiryId: newEnquiry.id,
    });
  } catch (err) {
    console.error('Error processing viewing enquiry:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to record viewing request. Please contact us via phone at 08082280219.',
    });
  }
});

// API: List Your Property With Us
app.post('/api/list-property', (req: Request, res: Response) => {
  try {
    const { ownerName, phone, email, propertyType, location, expectedPrice, transactionType, description, _hp } = req.body;

    if (_hp) {
      return res.status(200).json({
        success: true,
        message: 'Your property listing request has been submitted to Propel Properties.',
      });
    }

    if (!ownerName || !phone || !propertyType || !location) {
      return res.status(400).json({ success: false, error: 'Please fill in the required property owner details.' });
    }

    const listingItem: PropertyListingRequest = {
      id: `prop_req_${Date.now()}`,
      ownerName: ownerName.trim(),
      phone: phone.trim(),
      email: email?.trim() || '',
      propertyType: propertyType.trim(),
      location: location.trim(),
      expectedPrice: expectedPrice?.trim() || 'Negotiable',
      transactionType: transactionType === 'Rent' ? 'Rent' : 'Sale',
      description: description?.trim(),
      createdAt: new Date().toISOString(),
    };

    propertyListings.push(listingItem);

    console.log(`[Propel Properties] New Property Listing Submitted:
    Owner: ${listingItem.ownerName} (${listingItem.phone})
    Type: ${listingItem.propertyType} in ${listingItem.location} (${listingItem.transactionType})
    Price: ${listingItem.expectedPrice}`);

    // Forward to Formspree endpoint if not already delivered by client
    if (!req.body._formspreeDelivered) {
      forwardToFormspree({
        _subject: `[Propel Properties Listing Request] ${listingItem.propertyType} in ${listingItem.location} (${listingItem.transactionType}) - from ${listingItem.ownerName}`,
        _replyto: listingItem.email || undefined,
        formName: 'List Your Property Modal',
        name: listingItem.ownerName,
        phone: listingItem.phone,
        email: listingItem.email || 'Not provided',
        propertyType: listingItem.propertyType,
        location: listingItem.location,
        expectedPrice: listingItem.expectedPrice,
        transactionType: listingItem.transactionType,
        description: listingItem.description || 'None provided',
      }).catch((err) => console.error('Listing Formspree forward error:', err));
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your property listing request has been received. A Propel Properties agent will reach out to verify and onboard your property.',
      listingId: listingItem.id,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to submit listing request.' });
  }
});

// API: Client Testimony Submission
app.post('/api/testimony', (req: Request, res: Response) => {
  try {
    const { name, role, location, propertyType, category, rating, comment, _hp } = req.body;

    if (_hp) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for your testimony.',
      });
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please provide your full name.' });
    }

    if (!comment || typeof comment !== 'string' || comment.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Please share your experience (min 10 characters).' });
    }

    console.log(`[Propel Properties] New Client Testimony Submitted:
    Name: ${name.trim()} (${role || 'Client'})
    Location: ${location || 'Lagos'}
    Property: ${propertyType}
    Category: ${category || 'General'}
    Rating: ${rating || 5} Stars
    Comment: "${comment.trim()}"`);

    // Forward to Formspree endpoint if not already delivered by client
    if (!req.body._formspreeDelivered) {
      forwardToFormspree({
        _subject: `[Propel Properties Client Review] ${rating || 5} Stars from ${name.trim()} (${category || 'General'})`,
        formName: 'Client Review & Testimony Modal',
        name: name.trim(),
        role: role || 'Client',
        location: location || 'Lagos',
        propertyType: propertyType || 'Residential',
        category: category || 'General',
        rating: `${rating || 5} / 5 Stars`,
        testimony: comment.trim(),
      }).catch((err) => console.error('Testimony Formspree forward error:', err));
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for sharing your experience! Your testimony has been added.',
    });
  } catch (err) {
    console.error('Error recording testimony:', err);
    return res.status(500).json({ success: false, error: 'Failed to record testimony.' });
  }
});

async function startServer() {
  // Serve public static assets
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Propel Properties Server running on http://localhost:${PORT}`);
  });
}

startServer();
