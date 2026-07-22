'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { STORE_INFO, CartItem } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Store, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, MapPin, ArrowRight, AlertCircle } from 'lucide-react';

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().min(10, 'Valid 10-digit mobile number required'),
  customerEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  pickupDate: z.string().min(1, 'Please select a pickup date'),
  pickupTime: z.string().min(1, 'Please select a preferred pickup time slot'),
  addressNotes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      pickupDate: new Date().toISOString().split('T')[0],
      pickupTime: '11:00 AM - 2:00 PM',
    },
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-heading text-2xl font-bold">Your Cart is Empty</h1>
        <p className="text-xs text-slate-500">Add products to your cart before proceeding to checkout.</p>
        <Link href="/shop" className="inline-block px-6 py-3 rounded-xl bg-brand-green-500 text-white font-semibold text-xs">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: cart,
          totalAmount: cartTotal,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to place pickup order');
      }

      clearCart();
      router.push(`/order-success/${result.orderId || result.id}`);
    } catch (err: any) {
      setServerError(err.message || 'An error occurred while placing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-50 text-brand-green-700 text-xs font-bold uppercase tracking-wider">
          <Store className="w-3.5 h-3.5 text-brand-green-600" />
          <span>Showroom Reserve &amp; Pickup</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-slate-900">
          Store Pickup Checkout
        </h1>
        <p className="text-xs text-slate-500">
          Enter your contact details and preferred pickup date. Pay at our Mangaluru showroom upon trial.
        </p>
      </div>

      {serverError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Pickup Form */}
        <div className="lg:col-span-2 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Section 1: Customer Contact Details */}
            <div className="space-y-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <User className="w-4 h-4 text-brand-green-600" />
                <span>1. Customer Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('customerName')}
                    placeholder="e.g. Mohammed Ashfaq"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-green-500"
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.customerName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    {...register('customerPhone')}
                    placeholder="e.g. 9845012345"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-green-500"
                  />
                  {errors.customerPhone && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.customerPhone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  {...register('customerEmail')}
                  placeholder="e.g. ashfaq@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-green-500"
                />
                {errors.customerEmail && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.customerEmail.message}</p>
                )}
              </div>
            </div>

            {/* Section 2: Preferred Pickup Schedule */}
            <div className="space-y-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Calendar className="w-4 h-4 text-brand-green-600" />
                <span>2. Pickup Schedule Slot</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Pickup Date *
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('pickupDate')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-green-500 bg-white"
                  />
                  {errors.pickupDate && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.pickupDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Time Slot *
                  </label>
                  <select
                    {...register('pickupTime')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-green-500 bg-white"
                  >
                    <option value="10:00 AM - 1:00 PM">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="1:00 PM - 4:00 PM">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="4:00 PM - 7:00 PM">Evening (4:00 PM - 7:00 PM)</option>
                    <option value="7:00 PM - 9:30 PM">Night (7:00 PM - 9:30 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Notes & Special Requests */}
            <div className="space-y-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText className="w-4 h-4 text-brand-green-600" />
                <span>3. Notes / Sizing Alteration Requests</span>
              </h2>

              <div>
                <textarea
                  {...register('addressNotes')}
                  rows={3}
                  placeholder="Mention if you require trial fitting assistance or custom alteration upon arrival..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-brand-green-500"
                />
              </div>
            </div>

            {/* No Online Payment Guarantee Pill */}
            <div className="p-4 rounded-2xl bg-brand-green-50 border border-brand-green-100 flex items-start gap-3 text-xs text-brand-green-950">
              <ShieldCheck className="w-5 h-5 text-brand-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">No Online Payment Needed!</p>
                <p className="text-slate-700 text-[11px]">
                  Your reservation order will be kept ready at <strong>Basement Floor, Falnir Road (Below Malabar Gold)</strong>. You can try the dress and pay via Cash, UPI, or Card at the showroom desk.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-heading font-bold text-base shadow-xl shadow-brand-green-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Placing Reservation...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm &amp; Reserve Showroom Pickup Order</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Reserved Items Summary */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="font-heading text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Reserved Items ({cart.length})
            </h2>

            <div className="space-y-3 max-h-80 overflow-y-auto divide-y divide-slate-100 pr-1">
              {cart.map((item: CartItem) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 text-xs space-y-0.5">
                    <h4 className="font-semibold text-slate-900 line-clamp-1">{item.name}</h4>
                    <p className="text-slate-500">Size: {item.size} • Qty: {item.quantity}</p>
                    <p className="font-bold text-brand-green-700">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-900 text-sm">
                <span>Total Amount Due at Store</span>
                <span className="text-brand-green-700">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
