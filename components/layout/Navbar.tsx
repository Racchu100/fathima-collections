'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useStore } from '@/lib/store';
import { HeaderSearch } from './HeaderSearch';
import { CartDrawer } from '@/components/cart/CartDrawer';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  MapPin,
  Phone,
  Sparkles,
  ChevronDown,
  User,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (pathname?.startsWith('/admin')) return null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigate
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    {
      name: 'Limited Dresses',
      href: '/limited',
      isSpecial: true,
    },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        {/* Top Info Bar */}
        <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 sm:px-8 flex items-center justify-between border-b border-slate-800 overflow-hidden">
          <div className="overflow-hidden whitespace-nowrap flex-1 mr-4">
            <div className="animate-marquee gap-8">
              <span className="flex items-center gap-1.5 text-brand-green-400 font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Basement Floor, Falnir Rd, Below Malabar Gold, Attavar, Mangaluru • Exclusive Store Pickup • Open Mon-Sat 10:00 AM - 9:30 PM</span>
              </span>
              <span className="flex items-center gap-1.5 text-brand-green-400 font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Basement Floor, Falnir Rd, Below Malabar Gold, Attavar, Mangaluru • Exclusive Store Pickup • Open Mon-Sat 10:00 AM - 9:30 PM</span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-slate-400 shrink-0">
            <a
              href="tel:+919845012345"
              className="flex items-center gap-1 hover:text-brand-green-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-brand-green-500" />
              <span>+91 98450 12345</span>
            </a>
            <span className="text-slate-700">|</span>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 hover:text-white transition-colors text-[11px]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>

        {/* Main Sticky Glass Header */}
        <nav
          className={`px-4 sm:px-8 py-1.5 transition-all duration-300 ${
            isScrolled
              ? 'glass-navbar shadow-lg py-1'
              : 'bg-white/95 backdrop-blur-md border-b border-slate-100'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Brand Logo */}
            <BrandLogo />

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative font-heading text-sm font-semibold tracking-wide transition-colors py-1 ${
                      isActive
                        ? 'text-brand-green-600 font-bold'
                        : 'text-slate-700 hover:text-brand-green-600'
                    } ${
                      link.isSpecial
                        ? 'flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-brand-gold-400 hover:bg-slate-800 border border-brand-gold-500/30 shadow-sm'
                        : ''
                    }`}
                  >
                    {link.isSpecial && <Sparkles className="w-3.5 h-3.5 text-brand-gold-400 animate-pulse" />}
                    <span>{link.name}</span>
                    {link.isSpecial && (
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-gold-500 text-slate-950 ml-0.5">
                        HOT
                      </span>
                    )}

                    {isActive && !link.isSpecial && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green-500 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-slate-100 text-slate-700 hover:text-brand-green-600 transition-colors"
                title="Search products"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/shop?wishlist=true"
                className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-700 hover:text-brand-green-600 transition-colors hidden sm:flex"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white shadow-md shadow-brand-green-500/20 transition-all hover:scale-105"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="font-heading text-xs font-bold hidden sm:inline">Pickup Cart</span>
                <span className="w-5 h-5 rounded-full bg-white text-brand-green-700 text-xs font-extrabold flex items-center justify-center shadow-inner">
                  {cartCount}
                </span>
              </button>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-12" />

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[72px] z-30 bg-white border-b border-slate-200 shadow-2xl overflow-hidden lg:hidden"
          >
            <div className="p-5 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-heading text-base font-semibold transition-colors ${
                      pathname === link.href
                        ? 'bg-brand-green-50 text-brand-green-700 font-bold'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.isSpecial && <Sparkles className="w-4 h-4 text-brand-gold-500" />}
                      {link.name}
                    </span>
                    {link.isSpecial && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-gold-400 text-slate-950">
                        LIMITED
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <Link
                  href="/admin/login"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs text-center justify-center"
                >
                  <ShieldCheck className="w-4 h-4 text-brand-gold-400" />
                  <span>Admin Showroom Portal</span>
                </Link>
                <div className="text-center text-xs text-slate-500 pt-2">
                  Basement Floor, Falnir Road, Below Malabar Gold, Mangaluru
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Search Modal */}
      <HeaderSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />
    </>
  );
};

export default Navbar;
