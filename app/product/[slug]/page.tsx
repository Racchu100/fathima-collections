'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { INITIAL_PRODUCTS } from '@/lib/mock-data';
import { useStore } from '@/lib/store';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { STORE_INFO } from '@/lib/types';
import {
  ShoppingBag,
  Heart,
  MapPin,
  Check,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Truck,
  RotateCcw,
  Ruler,
  Share2,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(Promise.resolve(params));
  const slug = unwrappedParams?.slug || '';
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug) || INITIAL_PRODUCTS[0];

  const images = (product.images || []).map((img) => (typeof img === 'string' ? img : img.url));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(
    typeof product.colors[0] === 'object' ? product.colors[0]?.name : (product.colors[0] || 'Default')
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'material' | 'pickup'>('description');
  const [isAdded, setIsAdded] = useState(false);
  const [selectedQuickView, setSelectedQuickView] = useState<any>(null);

  const isWishlisted = isInWishlist(product.id);
  const currentImage = images[selectedImageIndex] || images[0] || '';

  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  const relatedProducts = INITIAL_PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto">
        <Link href="/" className="hover:text-brand-green-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/shop" className="hover:text-brand-green-600 transition-colors">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Multi-Image Gallery with Hover Zoom */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-lg group">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              priority
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.isLimited && (
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md text-brand-gold-400 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-brand-gold-500/40 shadow-lg">
                <Sparkles className="w-4 h-4 text-brand-gold-400 animate-pulse" />
                <span>Limited Edition Drop</span>
              </div>
            )}
            {discountPercent > 0 && (
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-brand-green-500 text-white text-xs font-black uppercase tracking-wider shadow-lg">
                Save {discountPercent}%
              </div>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto py-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-brand-green-500 ring-2 ring-brand-green-500/20 shadow-md'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="Product view" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Order Controls */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-green-600">
              <span>{product.material || 'Luxury Fashion'}</span>
              <span>•</span>
              <span className="text-slate-500">In Stock at Mangaluru Showroom</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="font-heading text-3xl font-black text-slate-900">
              ₹{(product.discountPrice || product.price).toLocaleString('en-IN')}
            </span>
            {product.discountPrice && (
              <span className="text-lg text-slate-400 line-through">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs text-slate-500 font-medium">Includes all taxes</span>
          </div>

          {/* Size Selector */}
          {product.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-900 uppercase tracking-wider">
                  Select Size: <span className="text-brand-green-700 font-extrabold">{selectedSize}</span>
                </label>
                <button className="text-brand-green-700 hover:underline flex items-center gap-1 font-semibold">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2.5 rounded-xl font-heading text-xs font-bold border transition-all ${
                      selectedSize === sz
                        ? 'border-brand-green-500 bg-brand-green-50 text-brand-green-800 shadow-sm ring-2 ring-brand-green-500/20'
                        : 'border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                Select Color Variant
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((col, idx) => {
                  const colorName = typeof col === 'object' ? col.name : col;
                  const hex = typeof col === 'object' ? col.hexCode : '#22C55E';
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(colorName)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-2 ${
                        selectedColor === colorName
                          ? 'border-brand-green-500 bg-brand-green-50 text-brand-green-800 font-bold'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: hex || '#111827' }} />
                      <span>{colorName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
              Quantity
            </label>
            <div className="flex items-center border border-slate-200 rounded-xl w-fit bg-slate-50">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-slate-600 hover:bg-slate-200 rounded-l-xl font-bold"
              >
                -
              </button>
              <span className="px-4 text-sm font-bold text-slate-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-slate-600 hover:bg-slate-200 rounded-r-xl font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Store Pickup Notice Box */}
          <div className="p-4 rounded-2xl bg-brand-green-50 border border-brand-green-100 space-y-1 text-xs text-brand-green-950">
            <div className="flex items-center gap-2 font-bold text-sm text-brand-green-800">
              <MapPin className="w-4 h-4 text-brand-green-600" />
              <span>Store Pickup Only (Mangaluru Showroom)</span>
            </div>
            <p className="text-slate-700">
              Reserve online for free. Visit <strong>Basement Floor, Falnir Road, Below Malabar Gold</strong> to try &amp; collect your order. No advance online payment required!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 px-6 rounded-2xl font-heading text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-green-500 hover:bg-brand-green-600 text-white shadow-brand-green-500/25 hover:scale-[1.02]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Pickup Cart</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-heading text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.02]"
            >
              <span>Instant Reserve &amp; Checkout</span>
              <ArrowRight className="w-4 h-4 text-brand-green-400" />
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-4 rounded-2xl border transition-all ${
                isWishlisted
                  ? 'border-rose-500 bg-rose-50 text-rose-600'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Description Tabs */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-2 px-4 text-xs font-bold font-heading border-b-2 transition-colors ${
                  activeTab === 'description'
                    ? 'border-brand-green-500 text-brand-green-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('material')}
                className={`py-2 px-4 text-xs font-bold font-heading border-b-2 transition-colors ${
                  activeTab === 'material'
                    ? 'border-brand-green-500 text-brand-green-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Fabric &amp; Specs
              </button>
              <button
                onClick={() => setActiveTab('pickup')}
                className={`py-2 px-4 text-xs font-bold font-heading border-b-2 transition-colors ${
                  activeTab === 'pickup'
                    ? 'border-brand-green-500 text-brand-green-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Pickup Info
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'material' && (
                <div className="space-y-2">
                  <p><strong>Primary Material:</strong> {product.material || '100% Premium Cotton'}</p>
                  <p><strong>Care Instructions:</strong> Dry clean recommended for suitings &amp; sherwanis; gentle machine wash for cotton shirts.</p>
                  <p><strong>Craftsmanship:</strong> Tailored in accordance with European and traditional Indian silhouette standards.</p>
                </div>
              )}
              {activeTab === 'pickup' && (
                <div className="space-y-2">
                  <p><strong>Pickup Location:</strong> {STORE_INFO.address}, {STORE_INFO.subAddress}, {STORE_INFO.city}.</p>
                  <p><strong>Fitting Service:</strong> Free fitting trial available in-store before payment.</p>
                  <p><strong>Hold Time:</strong> Reserved orders are kept active for 48 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-10 border-t border-slate-200">
          <h2 className="font-heading text-2xl font-bold text-slate-900">You Might Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setSelectedQuickView(prod)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
      />
    </div>
  );
}
