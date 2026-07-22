'use client';

import React, { useState } from 'react';
import { INITIAL_REVIEWS } from '@/lib/mock-data';
import { Review } from '@/lib/types';
import { Star, Check, Trash2 } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const toggleApproval = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isApproved: !r.isApproved } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Customer Reviews Moderation</h1>
        <p className="text-xs text-slate-400">Approve or delete testimonials displayed on homepage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <div key={r.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-heading font-bold text-white text-sm">{r.customerName}</span>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-300 italic">&ldquo;{r.comment}&rdquo;</p>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-500">{r.createdAt}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleApproval(r.id)}
                  className={`px-3 py-1 rounded-lg font-bold ${
                    r.isApproved ? 'bg-brand-green-500/20 text-brand-green-400' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {r.isApproved ? 'Approved' : 'Pending'}
                </button>
                <button
                  onClick={() => deleteReview(r.id)}
                  className="p-1 rounded-lg text-rose-400 hover:bg-rose-950/40"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
