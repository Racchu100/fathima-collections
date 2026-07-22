'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/mock-data';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  Heart,
  X,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const isWishlistMode = searchParams.get('wishlist') === 'true';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(40000);
  const [sortBy, setSortBy] = useState<'latest' | 'price-asc' | 'price-desc' | 'popularity'>('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const sizesList = ['S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)', '30', '32', '34', '36', '38'];

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      // Category check
      if (selectedCategory !== 'all') {
        const catObj = INITIAL_CATEGORIES.find((c) => c.slug === selectedCategory);
        if (catObj && product.categoryId !== catObj.id) return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchMaterial = product.material?.toLowerCase().includes(q);
        const matchTags = product.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchMaterial && !matchTags) return false;
      }

      // Size check
      if (selectedSize !== 'all') {
        const hasSize = product.sizes.some((s) => s.toLowerCase().includes(selectedSize.toLowerCase().split(' ')[0]));
        if (!hasSize) return false;
      }

      // Price check
      const actualPrice = product.discountPrice || product.price;
      if (actualPrice > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'popularity') return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      return 0; // Default latest
    });
  }, [selectedCategory, searchQuery, selectedSize, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedSize('all');
    setMaxPrice(40000);
    setSortBy('latest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-500/20 text-brand-green-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive Men&apos;s Showroom Catalog</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            {isWishlistMode ? 'Saved Wishlist' : 'Shop Clothing Collection'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Browse our hand-crafted wedding sherwanis, Giza cotton shirts, blazers, and ethnic wear. Lock your items online &amp; visit our Mangaluru store to collect.
          </p>
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block space-y-6 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-heading font-bold text-slate-900 text-base">
              <SlidersHorizontal className="w-4 h-4 text-brand-green-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-brand-green-700 hover:underline flex items-center gap-1 font-semibold"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Search Products
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Shirt, Sherwani, Blazer..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-green-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Categories
            </label>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-brand-green-50 text-brand-green-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                All Categories ({INITIAL_PRODUCTS.length})
              </button>
              {INITIAL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex justify-between ${
                    selectedCategory === cat.slug
                      ? 'bg-brand-green-50 text-brand-green-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[11px] text-slate-400">({cat.productCount})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Select Size
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSize('all')}
                className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                  selectedSize === 'all'
                    ? 'border-brand-green-500 bg-brand-green-50 text-brand-green-800'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                All
              </button>
              {sizesList.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                    selectedSize === sz
                      ? 'border-brand-green-500 bg-brand-green-50 text-brand-green-800'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 uppercase tracking-wider">Max Price</label>
              <span className="font-bold text-brand-green-700">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={40000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-green-500 cursor-pointer"
            />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Controls Bar: Sort, Total Count, Mobile Filter Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5 text-brand-green-600" />
                <span>Filter</span>
              </button>
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items
              </span>
            </div>

            {/* Sort & Grid Controls */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:border-brand-green-500 bg-white"
              >
                <option value="latest">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popularity">Popularity / Trending</option>
              </select>

              <div className="hidden sm:flex items-center border border-slate-200 rounded-xl overflow-hidden p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products List Display */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800">No dresses found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn&apos;t find any items matching your selected filters. Try clearing your filters or searching a different term.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-brand-green-500 text-white text-xs font-semibold hover:bg-brand-green-600 transition-colors shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedQuickView(p)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
