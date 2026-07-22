'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/mock-data';
import { Product } from '@/lib/types';
import { Plus, Edit, Trash2, Search, Filter, Sparkles, Check, X, Eye } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    discountPrice: '',
    stock: '10',
    material: '100% Giza Cotton',
    categoryId: INITIAL_CATEGORIES[0]?.id || '',
    sizes: 'M (38), L (40), XL (42)',
    colors: 'Emerald Green, Black Charcoal',
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    isTrending: false,
    isLimited: false,
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: '',
      discountPrice: '',
      stock: '10',
      material: '100% Giza Cotton',
      categoryId: INITIAL_CATEGORIES[0]?.id || '',
      sizes: 'M (38), L (40), XL (42)',
      colors: 'Emerald Green, Black Charcoal',
      imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      isFeatured: false,
      isTrending: false,
      isLimited: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    const imgUrl = typeof p.images[0] === 'string' ? p.images[0] : p.images[0]?.url || '';
    setFormData({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: String(p.price),
      discountPrice: p.discountPrice ? String(p.discountPrice) : '',
      stock: String(p.stock),
      material: p.material || '',
      categoryId: p.categoryId,
      sizes: p.sizes.join(', '),
      colors: (p.colors as any[]).map((c) => (typeof c === 'object' ? c.name : c)).join(', '),
      imageUrl: imgUrl,
      isFeatured: p.isFeatured,
      isTrending: p.isTrending,
      isLimited: p.isLimited,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sizesArray = formData.sizes.split(',').map((s) => s.trim()).filter(Boolean);
    const colorsArray = formData.colors.split(',').map((c) => c.trim()).filter(Boolean);

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
                description: formData.description,
                price: Number(formData.price),
                discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
                stock: Number(formData.stock),
                material: formData.material,
                categoryId: formData.categoryId,
                sizes: sizesArray,
                colors: colorsArray.map((name) => ({ name })),
                images: [formData.imageUrl],
                isFeatured: formData.isFeatured,
                isTrending: formData.isTrending,
                isLimited: formData.isLimited,
              }
            : p
        )
      );
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
        price: Number(formData.price),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
        stock: Number(formData.stock),
        material: formData.material,
        status: 'PUBLISHED',
        categoryId: formData.categoryId,
        images: [formData.imageUrl],
        sizes: sizesArray,
        colors: colorsArray.map((name) => ({ name })),
        isFeatured: formData.isFeatured,
        isTrending: formData.isTrending,
        isLimited: formData.isLimited,
      };
      setProducts([newProd, ...products]);
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">Product Management</h1>
          <p className="text-xs text-slate-400">Manage showroom dresses, prices, stock levels, and badges.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-heading font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-brand-green-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dress / Suit</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product title..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-brand-green-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300 focus:outline-none focus:border-brand-green-500"
          >
            <option value="all">All Categories</option>
            {INITIAL_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Badges</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredProducts.map((p) => {
                const img = typeof p.images[0] === 'string' ? p.images[0] : p.images[0]?.url || '';
                const catObj = INITIAL_CATEGORIES.find((c) => c.id === p.categoryId);
                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
                        {img && <Image src={img} alt={p.name} fill className="object-cover" />}
                      </div>
                      <div className="min-w-[150px]">
                        <div className="font-bold text-white text-xs sm:text-sm line-clamp-2">{p.name}</div>
                        <div className="text-[11px] text-slate-400">{p.material || 'Standard Fabric'}</div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-300">{catObj?.name || 'Category'}</td>
                    <td className="p-4">
                      <div className="font-bold text-white">₹{(p.discountPrice || p.price).toLocaleString('en-IN')}</div>
                      {p.discountPrice && (
                        <div className="text-[10px] text-slate-400 line-through">₹{p.price.toLocaleString('en-IN')}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`font-bold ${p.stock <= 5 ? 'text-amber-400' : 'text-slate-300'}`}>
                        {p.stock} Pcs
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {p.isLimited && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-black bg-brand-gold-500/20 text-brand-gold-400">
                            LIMITED
                          </span>
                        )}
                        {p.isFeatured && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-brand-green-500/20 text-brand-green-400">
                            FEATURED
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h2 className="font-heading text-xl font-bold">
                {editingProduct ? 'Edit Showroom Product' : 'Add New Showroom Dress'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    {INITIAL_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Stock Qty *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Colors (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Primary Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2 border-t border-slate-800 text-xs font-bold">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-brand-green-500"
                  />
                  <span>Featured Product</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isLimited}
                    onChange={(e) => setFormData({ ...formData, isLimited: e.target.checked })}
                    className="accent-brand-gold-500"
                  />
                  <span className="text-brand-gold-400">Limited Edition Drop</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs shadow-lg shadow-brand-green-500/20"
              >
                Save Product Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
