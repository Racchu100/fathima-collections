'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { STORE_INFO } from '@/lib/types';
import {
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Printer,
  ExternalLink,
  Store,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(Promise.resolve(params));
  const id = unwrappedParams?.id || '';

  const displayOrderNumber = id.startsWith('FC-') ? id : `FC-2026-${id.slice(-4).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Fathima Collection, I have reserved pickup order ID: ${displayOrderNumber}. Please confirm availability.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      {/* Animated Success Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <div className="w-20 h-20 rounded-full bg-brand-green-100 text-brand-green-600 flex items-center justify-center mx-auto shadow-lg shadow-brand-green-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-brand-green-700">
            Showroom Reservation Confirmed
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
            Thank You For Ordering!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Your dress reservation is logged. Please visit our Mangaluru showroom to try and collect your order.
          </p>
        </div>
      </motion.div>

      {/* Printable Receipt Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8 print:border-none print:shadow-none">
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pickup Order Reference</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-green-700">
              {displayOrderNumber}
            </h2>
          </div>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors w-fit print:hidden"
          >
            <Printer className="w-4 h-4 text-brand-green-600" />
            <span>Print Pickup Receipt</span>
          </button>
        </div>

        {/* Next Steps Guide */}
        <div className="space-y-3">
          <h3 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider">
            How to Collect Your Order:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-brand-green-700">1. Visit Showroom</span>
              <p className="text-slate-600">Head to Basement Floor, Falnir Road (Below Malabar Gold).</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-brand-green-700">2. Quote Order ID</span>
              <p className="text-slate-600">Show Order #{displayOrderNumber} to our desk manager.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-brand-green-700">3. Trial &amp; Pay</span>
              <p className="text-slate-600">Try garments in fitting room and pay cash/card upon satisfaction.</p>
            </div>
          </div>
        </div>

        {/* Showroom Address Card */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
          <div className="flex items-center gap-2 text-brand-green-400 font-bold text-sm">
            <Store className="w-4 h-4" />
            <span>Fathima Collection Showroom Details</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="space-y-1">
              <p className="font-bold text-white text-sm">{STORE_INFO.name}</p>
              <p>{STORE_INFO.address}</p>
              <p className="text-brand-green-400 font-medium">{STORE_INFO.subAddress}</p>
              <p>{STORE_INFO.city}, Karnataka - {STORE_INFO.pinCode}</p>
            </div>
            <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
              <p className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-brand-gold-400" />
                <span>{STORE_INFO.openingHours}</span>
              </p>
              <p className="flex items-center gap-1 text-slate-400 pt-1">
                <Phone className="w-3.5 h-3.5 text-brand-green-400" />
                <span>{STORE_INFO.phone}</span>
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3 print:hidden">
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-brand-green-500/20"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-brand-green-400" />
              <span>Notify Store via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center pt-4 print:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 font-heading text-xs font-bold text-brand-green-700 hover:underline"
          >
            <span>Continue Browsing Showroom Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
