import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { INITIAL_CATEGORIES } from '@/lib/mock-data';
import { ArrowRight, Tag, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Categories | Fathima Collection Mangalore',
  description: 'Browse all clothing categories at Fathima Collection Mangalore. Wedding collection, shirts, sherwanis, tuxedos, jeans, kurtas and ethnic wear.',
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-50 text-brand-green-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Clothing Categories</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900">
          Explore Our Fashion Realms
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          From royal wedding groom wear to everyday Giza cotton luxury shirts. Select a category to browse designs in stock.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.slug}`}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
              {cat.bannerImage || cat.image ? (
                <Image
                  src={cat.bannerImage || cat.image || ''}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white flex justify-between items-end">
                <span className="px-3 py-1 rounded-full bg-brand-green-500 text-white text-[11px] font-bold">
                  {cat.productCount} Items
                </span>
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h2 className="font-heading text-xl font-bold text-slate-900 group-hover:text-brand-green-600 transition-colors">
                {cat.name}
              </h2>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
              <div className="pt-2 flex items-center gap-1 text-xs font-bold text-brand-green-700 group-hover:gap-2 transition-all">
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
