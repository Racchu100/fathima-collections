'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { STORE_INFO, CartItem } from '@/lib/types';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, MapPin, Store, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useStore();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">Your Pickup Cart is Empty</h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            You haven&apos;t reserved any items yet. Explore our luxury wedding and formal collections.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-heading font-bold text-sm shadow-lg shadow-brand-green-500/20 transition-all hover:scale-105"
        >
          <span>Explore Showroom Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900">Pickup Reservation Cart</h1>
          <p className="text-xs text-slate-500">
            Review reserved dresses before submitting your showroom pickup slot.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:underline w-fit"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
            {cart.map((item: CartItem) => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <h3 className="font-heading font-semibold text-base text-slate-900">
                    {item.name}
                  </h3>
                  <div className="text-xs text-slate-500 space-x-3">
                    <span>Size: <strong className="text-slate-800">{item.size}</strong></span>
                    <span>•</span>
                    <span>Color: <strong className="text-slate-800">{item.color}</strong></span>
                  </div>
                  <div className="text-sm font-extrabold text-brand-green-700 pt-1">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex sm:flex-col items-center justify-between gap-4 w-full sm:w-auto">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-xs font-bold text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-slate-900 text-sm">
                      Total: ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary & Pickup Info */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
            <h2 className="font-heading text-lg font-bold border-b border-slate-800 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-bold text-white">
                  {cart.reduce((sum: number, i: CartItem) => sum + i.quantity, 0)} Pcs
                </span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-brand-green-400 font-semibold">
                <span>Showroom Pickup Fee</span>
                <span>FREE</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Total Amount</span>
                <span className="font-heading text-2xl font-black text-brand-green-400">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Showroom Location Banner */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-bold text-brand-green-400">
                <Store className="w-4 h-4" />
                <span>Pickup Showroom:</span>
              </div>
              <p>{STORE_INFO.address}, {STORE_INFO.subAddress}</p>
              <p className="text-[11px] text-slate-400">Pay cash/card when you collect dress.</p>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 px-6 rounded-2xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-heading font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-brand-green-500/20 transition-all hover:scale-[1.02]"
            >
              <span>Proceed to Enter Pickup Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
