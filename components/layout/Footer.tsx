'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { STORE_INFO } from '@/lib/types';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-brand-dark-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <BrandLogo variant="dark" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-2">
              Mangaluru&apos;s luxury men&apos;s fashion showroom. From royal wedding sherwanis and Italian tuxedos to Egyptian Giza cotton shirts, experience tailor-made elegance.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Fathima%20Collection,%20I%20want%20to%20inquire%20about%20your%20clothing%20catalog.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-green-600 hover:bg-brand-green-500 text-white font-semibold text-xs transition-colors shadow-md shadow-brand-green-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Store Manager</span>
              </a>
            </div>
          </div>

          {/* Column 2: Showroom Location & Hours */}
          <div className="space-y-4">
            <h3 className="font-heading text-base font-bold text-white tracking-wide border-l-2 border-brand-green-500 pl-3">
              Showroom Location
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-green-400 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">{STORE_INFO.address}</p>
                  <p className="text-slate-400">{STORE_INFO.subAddress}</p>
                  <p className="text-slate-400">{STORE_INFO.city}, Karnataka {STORE_INFO.pinCode}</p>
                  <a
                    href={STORE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-brand-green-400 hover:underline mt-1 font-medium"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-gold-400 shrink-0" />
                <span className="text-xs">{STORE_INFO.openingHours}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-green-400 shrink-0" />
                <span>{STORE_INFO.phone}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div className="space-y-4">
            <h3 className="font-heading text-base font-bold text-white tracking-wide border-l-2 border-brand-green-500 pl-3">
              Categories
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/shop?category=wedding" className="hover:text-brand-green-400 transition-colors">
                  Wedding Wear
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sherwani" className="hover:text-brand-green-400 transition-colors">
                  Sherwani
                </Link>
              </li>
              <li>
                <Link href="/shop?category=blazers" className="hover:text-brand-green-400 transition-colors">
                  Blazers & Suits
                </Link>
              </li>
              <li>
                <Link href="/shop?category=kurta" className="hover:text-brand-green-400 transition-colors">
                  Kurta Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=shirts" className="hover:text-brand-green-400 transition-colors">
                  Premium Shirts
                </Link>
              </li>
              <li>
                <Link href="/shop?category=t-shirts" className="hover:text-brand-green-400 transition-colors">
                  Polos & Tees
                </Link>
              </li>
              <li>
                <Link href="/shop?category=jeans" className="hover:text-brand-green-400 transition-colors">
                  Jeans & Denim
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pants" className="hover:text-brand-green-400 transition-colors">
                  Formal Pants
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Services & Policy */}
          <div className="space-y-4">
            <h3 className="font-heading text-base font-bold text-white tracking-wide border-l-2 border-brand-green-500 pl-3">
              Store Services
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/limited" className="hover:text-brand-gold-400 transition-colors flex items-center gap-1">
                  <span>Limited Edition Dresses</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-gold-500/20 text-brand-gold-400 font-bold">
                    Exclusive
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-green-400 transition-colors">
                  About Our Showroom
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-green-400 transition-colors">
                  Contact & Directions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-green-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-green-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white text-slate-500 transition-colors flex items-center gap-1 pt-2">
                  <Shield className="w-3.5 h-3.5 text-brand-green-500" />
                  <span>Admin Staff Login</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Fathima Collection, Mangaluru. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Store Pickup Only • No Online Payment Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
