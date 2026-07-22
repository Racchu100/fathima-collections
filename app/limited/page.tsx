'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { INITIAL_PRODUCTS } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { Product } from '@/lib/types';
import { Sparkles, Clock, Flame, Crown, AlertTriangle, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LimitedDressesPage() {
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 45, seconds: 12 });

  const limitedProducts = INITIAL_PRODUCTS.filter((p) => p.isLimited || p.stock <= 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-brand-dark-950 text-white min-h-screen pb-20 space-y-16">
      {/* SECTION 1: LUXURY GOLDEN HERO */}
      <section className="relative pt-12 pb-20 px-4 sm:px-8 border-b border-brand-gold-500/20 overflow-hidden">
        {/* Ambient Gold Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold-500/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/40 text-brand-gold-400 text-xs font-black uppercase tracking-widest"
          >
            <Crown className="w-4 h-4 text-brand-gold-400" />
            <span>EXCLUSIVE SHOWROOM COLLECTION</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-6xl font-black tracking-tight leading-tight"
          >
            LIMITED EDITION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-400 via-amber-200 to-brand-gold-500">
              ROYAL DRESSES
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Handcrafted with zardozi embroidery, velvet linings, and rare weave fabrics. Only a single batch is produced per season. Lock your size online and visit our Falnir Road showroom to try and collect.
          </motion.p>

          {/* Countdown timer card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pt-4 max-w-md mx-auto"
          >
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-brand-gold-500/40 shadow-2xl backdrop-blur-md space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase text-brand-gold-400 tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Collection Drop Closes In</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-center">
                <div className="bg-slate-950 p-3 rounded-xl border border-brand-gold-500/20 min-w-[70px]">
                  <span className="font-heading text-3xl font-black text-brand-gold-400">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="block text-[10px] uppercase text-slate-400">Hours</span>
                </div>
                <span className="text-2xl font-bold text-brand-gold-400">:</span>
                <div className="bg-slate-950 p-3 rounded-xl border border-brand-gold-500/20 min-w-[70px]">
                  <span className="font-heading text-3xl font-black text-brand-gold-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="block text-[10px] uppercase text-slate-400">Minutes</span>
                </div>
                <span className="text-2xl font-bold text-brand-gold-400">:</span>
                <div className="bg-slate-950 p-3 rounded-xl border border-brand-gold-500/20 min-w-[70px]">
                  <span className="font-heading text-3xl font-black text-brand-gold-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="block text-[10px] uppercase text-slate-400">Seconds</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: LIMITED EDITION DRESSES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-brand-gold-400 font-heading font-bold text-lg">
            <Sparkles className="w-5 h-5" />
            <span>Available Limited Inventory ({limitedProducts.length} items)</span>
          </div>
          <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            <span>High Demand • First Come First Serve</span>
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {limitedProducts.map((product) => (
            <div key={product.id} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-gold-500 to-amber-600 rounded-3xl opacity-30 group-hover:opacity-75 transition duration-500 blur-sm" />
              <div className="relative">
                <ProductCard
                  product={product}
                  onQuickView={(p) => setSelectedQuickView(p)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: LIMITED RESERVATION POLICY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-brand-gold-500/30 text-center max-w-3xl mx-auto space-y-6">
          <ShieldCheck className="w-12 h-12 text-brand-gold-400 mx-auto" />
          <h3 className="font-heading text-2xl font-bold text-white">How Limited Reservations Work</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-brand-gold-400">1. Reserve Online</span>
              <p>Select item &amp; preferred pickup slot. No online payment required.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-brand-gold-400">2. Hold Guarantee</span>
              <p>We hold your piece in-store for up to 48 hours for trial.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-brand-gold-400">3. Fit &amp; Collect</span>
              <p>Try the dress at our Falnir Road showroom and make payment in person.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
      />
    </div>
  );
}
