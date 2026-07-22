import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="space-y-2">
        <span className="font-heading text-8xl font-black text-brand-green-500">404</span>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          The clothing collection or page you are searching for does not exist or has been moved.
        </p>
      </div>

      <Link
        href="/shop"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-heading font-bold text-xs shadow-lg shadow-brand-green-500/20 transition-all"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Return to Showroom Catalog</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
