'use client';

import React, { useState } from 'react';
import { STORE_INFO } from '@/lib/types';
import { Save, Store, MapPin, Phone, Mail, Clock, Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const [storeData, setStoreData] = useState({
    name: STORE_INFO.name,
    address: STORE_INFO.address,
    subAddress: STORE_INFO.subAddress,
    city: STORE_INFO.city,
    pinCode: STORE_INFO.pinCode,
    phone: STORE_INFO.phone,
    whatsapp: STORE_INFO.whatsapp,
    email: STORE_INFO.email,
    openingHours: STORE_INFO.openingHours,
    googleMapsUrl: STORE_INFO.googleMapsUrl,
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Showroom Settings &amp; Info</h1>
        <p className="text-xs text-slate-400">Update showroom details, contact numbers, and opening hours.</p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-brand-green-500/20 border border-brand-green-500/40 text-brand-green-400 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Showroom settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Store className="w-4 h-4 text-brand-green-400" />
            <span>Store Profile &amp; Location</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Store Name</label>
              <input
                type="text"
                value={storeData.name}
                onChange={(e) => setStoreData({ ...storeData, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Primary Address</label>
              <input
                type="text"
                value={storeData.address}
                onChange={(e) => setStoreData({ ...storeData, address: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Landmark / Sub-Address</label>
              <input
                type="text"
                value={storeData.subAddress}
                onChange={(e) => setStoreData({ ...storeData, subAddress: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">City &amp; Pincode</label>
              <input
                type="text"
                value={`${storeData.city} - ${storeData.pinCode}`}
                onChange={(e) => setStoreData({ ...storeData, city: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="font-heading text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-green-400" />
            <span>Contact &amp; Timings</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Phone Number</label>
              <input
                type="text"
                value={storeData.phone}
                onChange={(e) => setStoreData({ ...storeData, phone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={storeData.whatsapp}
                onChange={(e) => setStoreData({ ...storeData, whatsapp: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Opening Hours</label>
            <input
              type="text"
              value={storeData.openingHours}
              onChange={(e) => setStoreData({ ...storeData, openingHours: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs shadow-lg shadow-brand-green-500/20 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Store Settings</span>
        </button>
      </form>
    </div>
  );
}
