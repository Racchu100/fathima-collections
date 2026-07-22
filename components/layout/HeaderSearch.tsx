'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/mock-data';
import { Product } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = INITIAL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.material?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
            <Search className="w-5 h-5 text-brand-green-600 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search wedding collection, shirts, sherwani, blazers..."
              className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 text-xs"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Categories Bar */}
          {!query && (
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-400 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-brand-green-500" />
                <span>Popular Categories</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {INITIAL_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-brand-green-50 hover:text-brand-green-700 text-xs font-medium text-slate-700 border border-slate-200/80 transition-all"
                  >
                    <Tag className="w-3 h-3 text-brand-green-500" />
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Results Area */}
          {query && (
            <div className="max-h-96 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
              {results.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  No matching dresses or products found for &ldquo;<strong className="text-slate-800">{query}</strong>&rdquo;.
                </div>
              ) : (
                results.map((product) => {
                  const img = typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.url || '';
                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="pt-3 first:pt-0 flex items-center gap-4 group hover:bg-slate-50 p-2 rounded-xl transition-colors"
                    >
                      <div className="relative w-14 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        {img && <Image src={img} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-brand-green-600 transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span className="font-bold text-brand-green-700">₹{(product.discountPrice || product.price).toLocaleString('en-IN')}</span>
                          {product.isLimited && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold">
                              LIMITED
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-green-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })
              )}
            </div>
          )}

          {/* Footer Bar */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <Link
              href="/shop"
              onClick={onClose}
              className="text-xs font-semibold text-brand-green-700 hover:underline"
            >
              View Full Product Catalog →
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HeaderSearch;
