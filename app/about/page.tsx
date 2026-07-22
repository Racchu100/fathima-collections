import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { STORE_INFO } from '@/lib/types';
import { Award, ShieldCheck, MapPin, Scissors, Crown, Sparkles, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | Fathima Collection Mangalore',
  description: 'Learn about Fathima Collection, Mangalore\'s premier men\'s clothing showroom below Malabar Gold, Falnir Road. Exceptional wedding sherwanis, blazers, suits & premium cotton shirts.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-8 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-green-500/20 text-brand-green-400 text-xs font-extrabold uppercase tracking-widest">
            <Crown className="w-4 h-4 text-brand-gold-400" />
            <span>Mangaluru Heritage</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-black tracking-tight">
            Crafting Gentleman Elegance
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Located at Basement Floor, Falnir Road below Malabar Gold, Fathima Collection stands as Mangaluru&apos;s trademark destination for luxury wedding sherwanis, tuxedos, and fine menswear.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80"
            alt="Fathima Collection Store Craftsmanship"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-600">
            Our Showroom Story
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Distinguished Quality &amp; Precision Fit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            At Fathima Collection, we believe every occasion warrants a royal demeanor. Whether preparing for a grand wedding reception, formal executive boardroom, or festive family gathering, our curated garments reflect supreme elegance.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We handpick raw silk embroideries, Egyptian long-staple Giza cottons, and structured Italian wool blends to ensure breathability, drape, and enduring luster.
          </p>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-heading font-bold text-xs shadow-md shadow-brand-green-500/20 transition-all"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Showroom Values */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-heading text-3xl font-bold text-slate-900">What Defines Us</h2>
            <p className="text-xs text-slate-500">Uncompromising standards in menswear craftsmanship.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <Award className="w-8 h-8 text-brand-green-600" />
              <h3 className="font-heading font-bold text-lg text-slate-900">Exquisite Fabrics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Only genuine Giza cottons, raw silk, and high-thread-count suiting materials make it to our display racks.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <Scissors className="w-8 h-8 text-brand-gold-500" />
              <h3 className="font-heading font-bold text-lg text-slate-900">Tailored Fitting Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Master tailors in-store to adjust sleeves, waist, and hems so your suit feels custom bespoke.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <MapPin className="w-8 h-8 text-brand-green-600" />
              <h3 className="font-heading font-bold text-lg text-slate-900">Hassle-Free Store Pickup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse and reserve dresses online without online payment risk. Visit, try, pay, and collect at Falnir Road.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
