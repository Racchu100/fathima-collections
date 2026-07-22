'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { INITIAL_PRODUCTS } from '@/lib/mock-data';
import { Product } from '@/lib/types';
import { Sparkles, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AdminLimitedPage() {
  const [limitedItems, setLimitedItems] = useState<Product[]>(
    INITIAL_PRODUCTS.filter((p) => p.isLimited || p.stock <= 5)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-gold-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limited Edition Inventory</span>
          </div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-white">Exclusive Drop Management</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {limitedItems.map((item) => {
          const img = typeof item.images[0] === 'string' ? item.images[0] : item.images[0]?.url || '';
          return (
            <div key={item.id} className="p-3 sm:p-5 rounded-2xl bg-slate-900 border border-brand-gold-500/30 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-800">
                  {img && <Image src={img} alt={item.name} fill className="object-cover" />}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/90 text-brand-gold-400 font-bold text-[9px] uppercase border border-brand-gold-500/40">
                    Only {item.stock} Left
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="font-heading font-bold text-xs sm:text-base text-white line-clamp-2">{item.name}</h3>
                  <p className="text-xs sm:text-sm font-bold text-brand-green-400">₹{(item.discountPrice || item.price).toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex flex-wrap justify-between items-center text-[10px] sm:text-xs text-slate-400 gap-1">
                <span>Hold: 48h</span>
                <span className="text-brand-gold-400 font-bold">Limited Drop</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
