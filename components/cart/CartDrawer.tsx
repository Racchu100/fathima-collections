'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, MapPin, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useStore();

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-green-400" />
                <h2 className="font-heading font-semibold text-lg">Your Pickup Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Banner: Store Pickup Only Notice */}
            <div className="bg-brand-green-50 border-b border-brand-green-100 px-4 py-2.5 flex items-center gap-2 text-xs font-medium text-brand-green-800">
              <Store className="w-4 h-4 text-brand-green-600 shrink-0" />
              <span>Reserve Online • Pickup & Pay at Showroom (Mangaluru)</span>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-slate-800 text-base">Your cart is empty</h3>
                    <p className="text-xs text-slate-500 mt-1">Browse our luxury men's collection and add your favorite pieces.</p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-medium text-sm transition-colors shadow-md shadow-brand-green-500/20"
                  >
                    Browse Collection
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-heading text-sm font-semibold text-slate-800 line-clamp-1">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 space-x-2">
                          <span>Size: <strong className="text-slate-700">{item.size}</strong></span>
                          <span>•</span>
                          <span>Color: <strong className="text-slate-700">{item.color}</strong></span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-slate-600 hover:bg-slate-200 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-slate-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-600 hover:bg-slate-200 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-heading font-bold text-sm text-brand-green-700">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between text-sm font-semibold text-slate-900 pt-1">
                    <span>Total Amount</span>
                    <span className="text-brand-green-700 font-bold text-base">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-brand-green-500" />
                    <span>Pickup Location: Basement Floor, Falnir Rd, Below Malabar Gold</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="py-3 px-4 rounded-xl border border-slate-300 text-slate-800 hover:bg-white font-medium text-xs text-center transition-colors"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="py-3 px-4 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-brand-green-500/20 transition-all hover:gap-2"
                  >
                    <span>Proceed to Pickup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CartDrawer;
