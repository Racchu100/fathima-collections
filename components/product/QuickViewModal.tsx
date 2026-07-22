'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { STORE_INFO } from '@/lib/types';
import { X, ShoppingBag, Heart, Check, MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(
    typeof product?.colors[0] === 'object' ? product?.colors[0]?.name : (product?.colors[0] || 'Default')
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const images = (product.images || []).map((img) => (typeof img === 'string' ? img : img.url));
  const currentImage = images[selectedImageIndex] || images[0] || '';

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md backdrop-blur-sm transition-transform hover:scale-110"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Product Image Gallery */}
          <div className="p-6 bg-slate-50 flex flex-col justify-between space-y-4 border-b md:border-b-0 md:border-r border-slate-100">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isLimited && (
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-brand-gold-400 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-brand-gold-500/40 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold-400 animate-pulse" />
                  <span>Limited Edition</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-14 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-brand-green-500 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Specs & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-brand-green-600 uppercase tracking-wider">
                  <span>{product.material || 'Luxury Fabric'}</span>
                  <span>•</span>
                  <span className="text-slate-500">In Stock at Mangaluru Showroom</span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {product.name}
                </h2>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-2xl font-black text-slate-900">
                  ₹{(product.discountPrice || product.price).toLocaleString('en-IN')}
                </span>
                {product.discountPrice && (
                  <span className="text-base text-slate-400 line-through">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPrice && (
                  <span className="px-2 py-0.5 rounded bg-brand-green-100 text-brand-green-800 font-bold text-xs">
                    SAVE ₹{(product.price - product.discountPrice).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Size: <span className="text-brand-green-700 font-extrabold">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === sz
                            ? 'border-brand-green-500 bg-brand-green-50 text-brand-green-800 shadow-sm'
                            : 'border-slate-200 text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Store Pickup Banner */}
              <div className="p-3 rounded-2xl bg-brand-green-50 border border-brand-green-100 flex items-start gap-2.5 text-xs text-brand-green-900">
                <MapPin className="w-4 h-4 text-brand-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Store Pickup Only (No Online Payment Required)</p>
                  <p className="text-[11px] text-brand-green-800">
                    Reserve online &amp; collect your dress at {STORE_INFO.address}, {STORE_INFO.subAddress}.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-heading text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-green-500 hover:bg-brand-green-600 text-white shadow-brand-green-500/25'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Pickup Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Cart &amp; Book Pickup</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isWishlisted
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="text-center">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-brand-green-600 transition-colors"
                >
                  <span>View Complete Details &amp; Material Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
