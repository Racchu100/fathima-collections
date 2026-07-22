'use client';

import React, { useState } from 'react';
import { STORE_INFO } from '@/lib/types';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-50 text-brand-green-700 text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>Showroom Contact</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900">
          Get in Touch With Us
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have questions regarding wedding fitting, limited edition availability, or store directions? We are at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Showroom Details Card */}
        <div className="space-y-6 bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl">
          <h2 className="font-heading text-2xl font-bold border-b border-slate-800 pb-4">
            Showroom Location &amp; Hours
          </h2>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-green-400 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-white text-base">{STORE_INFO.name}</p>
                <p>{STORE_INFO.address}</p>
                <p className="text-brand-green-400 font-semibold">{STORE_INFO.subAddress}</p>
                <p>{STORE_INFO.city}, Karnataka - {STORE_INFO.pinCode}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-brand-gold-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Opening Hours</p>
                <p className="text-slate-400 text-xs">{STORE_INFO.openingHours}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-green-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Phone Support</p>
                <p className="text-slate-400 text-xs">{STORE_INFO.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-green-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Email Address</p>
                <p className="text-slate-400 text-xs">{STORE_INFO.email}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-md shadow-brand-green-500/20"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Fathima%20Collection,%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-brand-green-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="font-heading text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Send an Inquiry
          </h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-brand-green-50 text-brand-green-900 space-y-2 text-center">
              <CheckCircle2 className="w-10 h-10 text-brand-green-600 mx-auto" />
              <h3 className="font-heading font-bold text-lg">Inquiry Sent Successfully!</h3>
              <p className="text-xs text-slate-600">
                Our showroom team will get back to you shortly over phone or WhatsApp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mohammed Ashfaq"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-green-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9845012345"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-green-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Inquiry Topic
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-green-500 bg-white">
                  <option value="wedding">Wedding Sherwani Fitting</option>
                  <option value="limited">Limited Edition Availability</option>
                  <option value="bulk">Custom Corporate / Bulk Shirts</option>
                  <option value="general">General Showroom Query</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Specify sizes, date of wedding, or product details..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-heading font-bold text-xs shadow-lg shadow-brand-green-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Showroom Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
