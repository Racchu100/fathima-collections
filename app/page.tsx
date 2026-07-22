'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_REVIEWS } from '@/lib/mock-data';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { STORE_INFO } from '@/lib/types';
import {
  Sparkles,
  ShoppingBag,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ShieldCheck,
  Scissors,
  Award,
  Star,
  CheckCircle2,
  ChevronRight,
  Flame,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);

  // Limited Edition Countdown & Slider State
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });
  const [limitedIndex, setLimitedIndex] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);

  const featuredProducts = INITIAL_PRODUCTS.filter((p) => p.isFeatured || p.isTrending);
  const limitedProducts = INITIAL_PRODUCTS.filter((p) => p.isLimited);

  // Auto slide limited edition products every 6 seconds, paused when touched or hovered
  useEffect(() => {
    if (limitedProducts.length <= 1 || isSliderPaused) return;
    const interval = setInterval(() => {
      setLimitedIndex((prev) => (prev + 1) % limitedProducts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [limitedProducts.length, isSliderPaused]);

  // Touch swipe drag handler for Limited Edition slider
  const handleLimitedDragEnd = (_: any, info: { offset: { x: number } }) => {
    const swipeThreshold = 30;
    if (info.offset.x < -swipeThreshold) {
      // Swipe left -> Next product
      setLimitedIndex((prev) => (prev + 1) % limitedProducts.length);
    } else if (info.offset.x > swipeThreshold) {
      // Swipe right -> Previous product
      setLimitedIndex((prev) => (prev - 1 + limitedProducts.length) % limitedProducts.length);
    }
  };

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
    <div className="space-y-10 pb-10">
      {/* SECTION 1: LUXURY HERO BANNER */}
      <section className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden bg-brand-dark-950 text-white">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=80"
            alt="Fathima Collection Luxury Fashion Showroom"
            fill
            priority
            className="object-cover object-center opacity-35 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950 via-brand-dark-900/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark-950 via-brand-dark-950/70 to-transparent" />
        </div>

        {/* Ambient Emerald Glow Effect */}
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-brand-green-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 w-full">
          <div className="max-w-2xl space-y-4">
            {/* Top Showroom Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-brand-green-500/30 backdrop-blur-md shadow-lg"
            >
              <Crown className="w-3.5 h-3.5 text-brand-gold-400" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                Mangaluru Premier Men&apos;s Showroom
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green-400 animate-ping" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white"
            >
              PREMIUM MEN&apos;S <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green-400 via-emerald-300 to-brand-gold-400">
                FASHION IN MANGALORE
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-xl"
            >
              Exquisite wedding sherwanis, Italian tuxedos, Giza cotton shirts, and limited ethnic wear. Reserve online &amp; collect at Falnir Road.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="/shop"
                className="px-6 py-3 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-heading font-bold text-xs shadow-lg shadow-brand-green-500/25 transition-all hover:scale-105 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Collection</span>
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-xs border border-white/20 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-brand-green-400" />
                <span>Visit Showroom</span>
              </Link>
            </motion.div>

            {/* Quick Location Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center gap-4 text-[11px] text-slate-400 border-t border-white/10"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-green-400" />
                <span>Below Malabar Gold, Falnir Road</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-gold-400" />
                <span>Open Mon-Sat 10:00 AM - 9:30 PM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-green-600">
              Curated Collections
            </span>
            <h2 className="font-heading text-xl sm:text-3xl font-bold text-slate-900 mt-0.5">
              Explore By Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1 font-heading text-xs font-semibold text-brand-green-700 hover:text-brand-green-800 transition-colors"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {INITIAL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group relative block aspect-[3/4] rounded-xl overflow-hidden bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {cat.image && (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950 via-brand-dark-900/40 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-3.5 flex flex-col justify-end text-white space-y-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-green-400">
                    {cat.productCount} Designs
                  </span>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-brand-green-300 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: LIMITED EDITION BANNER WITH TOUCH-PAUSABLE SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-brand-dark-950 via-slate-900 to-brand-dark-950 text-white p-6 sm:p-8 border border-brand-gold-500/30 shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/40 text-brand-gold-400 text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold-400 animate-pulse" />
                <span>LIMITED EDITION DROPS</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-white leading-snug">
                EXCLUSIVE ROYAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-400 via-amber-200 to-brand-gold-500">
                  DESIGNS (FEW LEFT)
                </span>
              </h2>

              <p className="text-xs text-slate-300 font-light max-w-md leading-relaxed">
                Zardozi sherwanis, velvet bandhgalas, and limited tweed blazers. Swipe card or view drops below.
              </p>

              {/* Countdown Timer */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Drop Reservation Window Closes In:
                </span>
                <div className="flex items-center gap-2 text-center">
                  <div className="bg-slate-900 border border-brand-gold-500/30 rounded-lg p-2 min-w-[50px]">
                    <span className="font-heading font-black text-lg text-brand-gold-400">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="block text-[9px] uppercase text-slate-400">Hrs</span>
                  </div>
                  <span className="text-sm font-bold text-brand-gold-400">:</span>
                  <div className="bg-slate-900 border border-brand-gold-500/30 rounded-lg p-2 min-w-[50px]">
                    <span className="font-heading font-black text-lg text-brand-gold-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="block text-[9px] uppercase text-slate-400">Mins</span>
                  </div>
                  <span className="text-sm font-bold text-brand-gold-400">:</span>
                  <div className="bg-slate-900 border border-brand-gold-500/30 rounded-lg p-2 min-w-[50px]">
                    <span className="font-heading font-black text-lg text-brand-gold-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="block text-[9px] uppercase text-slate-400">Secs</span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/limited"
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold-500 to-amber-600 hover:from-brand-gold-400 hover:to-amber-500 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  <span>Browse Limited Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Side Showcase Product Card - Pauses Auto Scroll on Touch/Hover */}
            {limitedProducts.length > 0 && (
              <div
                onMouseEnter={() => setIsSliderPaused(true)}
                onMouseLeave={() => setIsSliderPaused(false)}
                onTouchStart={() => setIsSliderPaused(true)}
                onPointerDown={() => setIsSliderPaused(true)}
                className="relative max-w-xs mx-auto w-full flex flex-col items-center gap-3"
              >
                <div className="relative w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={limitedProducts[limitedIndex]?.id || limitedIndex}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragStart={() => setIsSliderPaused(true)}
                      onDragEnd={handleLimitedDragEnd}
                      className="w-full cursor-grab active:cursor-grabbing touch-pan-y"
                    >
                      <ProductCard
                        product={limitedProducts[limitedIndex]}
                        onQuickView={(p) => setSelectedQuickView(p)}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dots indicator for slider */}
                {limitedProducts.length > 1 && (
                  <div className="flex items-center gap-1.5 pt-1">
                    {limitedProducts.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setIsSliderPaused(true);
                          setLimitedIndex(idx);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          limitedIndex === idx
                            ? 'w-6 bg-brand-gold-400'
                            : 'w-2 bg-slate-700 hover:bg-slate-500'
                        }`}
                        aria-label={`Slide to limited product ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: TRENDING PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-brand-green-600">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Trending in Showroom</span>
            </div>
            <h2 className="font-heading text-xl sm:text-3xl font-bold text-slate-900 mt-0.5">
              Featured Men&apos;s Arrivals
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 font-heading text-xs font-semibold text-brand-green-700 hover:text-brand-green-800 transition-colors"
          >
            <span>Explore Full Catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedQuickView(p)}
            />
          ))}
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE US */}
      <section className="bg-slate-900 text-white py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center max-w-lg mx-auto space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-green-400">
              Our Showroom Distinction
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Why Choose Fathima Collection?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-center">
              <div className="w-10 h-10 rounded-xl bg-brand-green-500/20 text-brand-green-400 flex items-center justify-center mx-auto">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">100% Authentic Quality</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Hand-picked long staple Giza cotton, pure raw silk, and imported Italian wool.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-center">
              <div className="w-10 h-10 rounded-xl bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center mx-auto">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">Custom Alterations</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Master tailors in-store to adjust sleeves, waist, and hems to your exact measurements.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-center">
              <div className="w-10 h-10 rounded-xl bg-brand-green-500/20 text-brand-green-400 flex items-center justify-center mx-auto">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">Prime Location</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Located at Basement Floor, Falnir Road, right below Malabar Gold, Attavar.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-center">
              <div className="w-10 h-10 rounded-xl bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">Reserve &amp; Pay at Pickup</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                No online payment needed. Lock your dress online, try in store, and pay at pickup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center max-w-md mx-auto space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-green-600">
            Valued Feedback
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Patron Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="font-heading font-bold text-slate-900">{rev.customerName}</span>
                <span className="flex items-center gap-1 text-brand-green-700 font-medium text-[11px]">
                  <CheckCircle2 className="w-3 h-3 text-brand-green-500" />
                  <span>Verified Patron</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: STORE LOCATION & MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 sm:p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-green-600">
                Showroom Address
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                Visit Us in Mangalore
              </h2>
              <div className="space-y-2 text-xs text-slate-600">
                <p className="font-bold text-slate-900 text-sm">{STORE_INFO.name}</p>
                <p>{STORE_INFO.address}</p>
                <p className="font-semibold text-brand-green-700">{STORE_INFO.subAddress}</p>
                <p>{STORE_INFO.city}, Karnataka - {STORE_INFO.pinCode}</p>
                <p className="pt-1 text-slate-500">
                  <strong>Hours:</strong> {STORE_INFO.openingHours}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-brand-green-500/20"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-brand-green-600" />
                <span>Call Store</span>
              </a>
            </div>
          </div>

          {/* Map Preview Frame */}
          <div className="relative min-h-[220px] bg-slate-900 flex items-center justify-center p-6 text-center text-white">
            <Image
              src="https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1200&q=80"
              alt="Mangaluru Falnir Road Showroom"
              fill
              className="object-cover opacity-40"
            />
            <div className="relative z-10 space-y-2 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-brand-green-500/20 text-brand-green-400 border border-brand-green-500/40 flex items-center justify-center mx-auto backdrop-blur-md">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Below Malabar Gold</h3>
              <p className="text-[11px] text-slate-300">
                Falnir Road, Attavar, Mangaluru. Convenient customer parking.
              </p>
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
