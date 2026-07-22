'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { Heart, ShoppingBag, Eye, Sparkles, Check, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const primaryImage = typeof product.images[0] === 'string'
    ? product.images[0]
    : product.images[0]?.url || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80';

  const secondaryImage = typeof product.images[1] === 'string'
    ? product.images[1]
    : product.images[1]?.url || primaryImage;

  const firstColor = typeof product.colors[0] === 'object' ? product.colors[0]?.name : (product.colors[0] || 'Default');

  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 15;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, firstColor, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} view`}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isLimited && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-900/90 text-brand-gold-400 text-[8px] sm:text-[9px] font-black uppercase tracking-wider border border-brand-gold-500/40 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-brand-gold-400 animate-pulse" />
              Limited
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full z-10 backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-slate-700 shadow-sm'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-900 font-heading text-[10px] font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-900 hover:text-white flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Details Container */}
      <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between space-y-1.5">
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-500 font-medium">
            <span className="uppercase text-brand-green-600 font-bold tracking-wider truncate">
              {product.material || 'Premium Fabric'}
            </span>
            <span className="flex items-center gap-0.5 text-slate-600 shrink-0">
              <MapPin className="w-2.5 h-2.5 text-brand-green-500" />
              <span>Pickup</span>
            </span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-heading font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-brand-green-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Size Selection Pills - Wrapped & Shortened */}
        {product.sizes.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap py-0.5">
            <span className="text-[9px] text-slate-400 font-medium mr-0.5">Sizes:</span>
            {product.sizes.map((sz) => {
              const shortSize = sz.split(' ')[0] || sz;
              return (
                <button
                  key={sz}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(sz);
                  }}
                  title={`Size ${sz}`}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold border transition-all ${
                    selectedSize === sz
                      ? 'border-brand-green-500 bg-brand-green-50 text-brand-green-800'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {shortSize}
                </button>
              );
            })}
          </div>
        )}

        {/* Price & Add to Cart Footer */}
        <div className="pt-1.5 border-t border-slate-100 flex items-end justify-between gap-1">
          <div className="flex flex-col min-w-0">
            {/* Green Color Offer Badge */}
            <span className="inline-block w-fit px-1.5 py-0.5 rounded bg-brand-green-500 text-white font-black text-[9px] uppercase tracking-wider mb-0.5 shadow-sm">
              {discountPercent}% OFF
            </span>

            <div className="flex flex-wrap items-baseline gap-1">
              <span className="font-heading text-xs sm:text-base font-bold text-slate-900 leading-none">
                ₹{(product.discountPrice || product.price).toLocaleString('en-IN')}
              </span>
              {product.discountPrice && (
                <span className="text-[9px] sm:text-[10px] text-slate-400 line-through leading-none">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="shrink-0 px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold flex items-center gap-1 transition-all shadow-sm bg-slate-900 hover:bg-brand-green-600 text-white"
          >
            {isAdded ? (
              <>
                <Check className="w-3 h-3 text-white" />
                <span className="text-[10px]">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 text-brand-green-400 shrink-0" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
