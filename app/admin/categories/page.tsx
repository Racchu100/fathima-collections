'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { INITIAL_CATEGORIES } from '@/lib/mock-data';
import { Category } from '@/lib/types';
import { Plus, Edit, Trash2, FolderTree, X } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form state for category creation / editing
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? {
                ...c,
                name: formData.name,
                slug: generatedSlug,
                description: formData.description,
                image: formData.image,
              }
            : c
        )
      );
    } else {
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        name: formData.name,
        slug: generatedSlug,
        description: formData.description,
        image: formData.image,
        productCount: 0,
      };
      setCategories((prev) => [newCategory, ...prev]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-green-400 uppercase tracking-wider">
            <FolderTree className="w-3.5 h-3.5" />
            <span>Showroom Catalog Management</span>
          </div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-white">Categories Management</h1>
          <p className="text-xs text-slate-400">Add, edit, or remove clothing categories.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-heading font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-brand-green-500/20 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Grid of Categories (2 in a row on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-3 sm:p-4 flex flex-col justify-between space-y-3 group hover:border-brand-green-500/40 transition-all"
          >
            <div className="space-y-2">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-800">
                {cat.image && <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-brand-green-400 font-bold text-[9px]">
                  {cat.productCount} Items
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-heading font-bold text-sm sm:text-base text-white line-clamp-1">{cat.name}</h3>
                <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2">{cat.description || 'No description provided.'}</p>
              </div>
            </div>

            {/* Action Bar (Edit & Delete only) */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-1.5">
              <button
                onClick={() => handleOpenEdit(cat)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Edit Category"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="px-2.5 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Delete Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Update Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h2 className="font-heading text-lg sm:text-xl font-bold">
                {editingCategory ? 'Update Category' : 'Add New Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wedding Wear, Formal Suits"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-brand-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Category Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of dresses in this category..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-brand-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-brand-green-500 outline-none"
                />
                {formData.image && (
                  <div className="mt-2 relative h-24 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                    <Image src={formData.image} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white text-xs font-bold shadow-lg shadow-brand-green-500/20"
                >
                  {editingCategory ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
