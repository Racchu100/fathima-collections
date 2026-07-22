import React from 'react';

export const metadata = {
  title: 'Terms of Service | Fathima Collection',
  description: 'Terms of Service and Showroom Pickup Policy for Fathima Collection Mangalore.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
      <h1 className="font-heading text-3xl font-bold text-slate-900 border-b border-slate-200 pb-3">
        Terms &amp; Store Pickup Conditions
      </h1>
      <p>
        Welcome to <strong>Fathima Collection</strong>. By placing an online dress reservation through our website, you agree to the terms outlined below.
      </p>
      <h2 className="font-heading text-lg font-bold text-slate-900 pt-2">1. Showroom Pickup Reservation Policy</h2>
      <p>
        Online checkout reserves clothing items for in-person pickup at our Mangaluru showroom (Basement Floor, Falnir Road, below Malabar Gold, Attavar). Reserved items are held for up to 48 hours from the chosen pickup date.
      </p>
      <h2 className="font-heading text-lg font-bold text-slate-900 pt-2">2. In-Store Trial &amp; Payment</h2>
      <p>
        Customers are encouraged to try garments in our fitting rooms prior to finalizing payment. Payment is settled at the showroom counter via Cash, UPI, Debit Card, or Credit Card.
      </p>
      <h2 className="font-heading text-lg font-bold text-slate-900 pt-2">3. Limited Edition Items</h2>
      <p>
        Items marked as &ldquo;Limited Edition&rdquo; are subject to high demand. In rare instances where stock is exhausted before pickup, our team will notify you immediately with alternative fitting recommendations.
      </p>
      <h2 className="font-heading text-lg font-bold text-slate-900 pt-2">4. Alteration Services</h2>
      <p>
        Standard hem, sleeve, and waist adjustments can be performed by our in-store master tailors upon trial.
      </p>
    </div>
  );
}
