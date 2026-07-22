import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Fathima Collection',
  description: 'Privacy Policy of Fathima Collection clothing showroom in Mangalore.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
      <h1 className="font-heading text-3xl font-bold text-slate-900 border-b border-slate-200 pb-3">
        Privacy Policy
      </h1>
      <p>
        At <strong>Fathima Collection</strong> (located at Basement Floor, Falnir Road, below Malabar Gold, Attavar, Mangaluru, Karnataka 575001), we prioritize the privacy and security of our patrons&apos; personal information.
      </p>
      <h2 className="font-heading text-lg font-bold text-slate-900 pt-2">1. Information We Collect</h2>
      <p>
        When you submit a pickup reservation on our website, we collect your name, mobile number, email address (optional), preferred pickup schedule, and sizing notes to ensure your garments are reserved and prepared prior to your arrival.
      </p>
      <h2 className="font-heading text-lg font-bold text-slate-900 pt-2">2. No Financial Data Storage</h2>
      <p>
        Our website operates strictly on a <strong>Store Pickup &amp; Pay at Showroom</strong> workflow. We do not prompt, process, or store credit card details, UPI credentials, or online banking information on our servers.
      </p>
      <h2 className="font-heading text-lg font-bold text-slate-900 pt-2">3. How We Use Your Data</h2>
      <p>
        Your phone number is strictly used to notify you via SMS or WhatsApp regarding order confirmation and ready-for-pickup alerts. We never sell or share customer contact details with third-party telemarketers.
      </p>
      <h2 className="font-heading text-lg font-bold text-slate-900 pt-2">4. Contact Us</h2>
      <p>
        For privacy queries or request for data removal, please contact our showroom desk at contact@fathimacollection.com or call +91 98450 12345.
      </p>
    </div>
  );
}
