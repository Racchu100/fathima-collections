'use client';

import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, Printer, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface MockOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupDate: string;
  pickupTime: string;
  notes?: string;
  totalAmount: number;
  status: 'PENDING' | 'READY_FOR_PICKUP' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const [orders, setOrders] = useState<MockOrder[]>([
    {
      id: 'ord-1001',
      orderNumber: 'FC-2026-8942',
      customerName: 'Mohammed Ashfaq',
      customerPhone: '9845012345',
      customerEmail: 'ashfaq@example.com',
      pickupDate: '2026-07-23',
      pickupTime: '11:00 AM - 2:00 PM',
      notes: 'Requires fitting trial assistance for Royal Sherwani.',
      totalAmount: 31798,
      status: 'PENDING',
      createdAt: 'Today, 10:15 AM',
    },
    {
      id: 'ord-1002',
      orderNumber: 'FC-2026-7821',
      customerName: 'Dr. Rahul Shetty',
      customerPhone: '9845198765',
      pickupDate: '2026-07-23',
      pickupTime: '4:00 PM - 7:00 PM',
      totalAmount: 15499,
      status: 'READY_FOR_PICKUP',
      createdAt: 'Today, 08:30 AM',
    },
    {
      id: 'ord-1003',
      orderNumber: 'FC-2026-5510',
      customerName: 'Karthik Rao',
      customerPhone: '9900112233',
      pickupDate: '2026-07-22',
      pickupTime: '2:00 PM - 5:00 PM',
      totalAmount: 8997,
      status: 'COMPLETED',
      createdAt: 'Yesterday, 04:20 PM',
    },
  ]);

  const updateStatus = (id: string, status: MockOrder['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const filtered = orders.filter((o) => {
    if (filterStatus !== 'ALL' && o.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Pickup Orders Management</h1>
          <p className="text-xs text-slate-400">View customer reservations, print pickup slips, and update status.</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, phone, or Order ID..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-brand-green-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'PENDING', 'READY_FOR_PICKUP', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterStatus === st
                  ? 'bg-brand-green-500 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Pickup Schedule</th>
                <th className="p-4">Notes</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-white">{o.orderNumber}</td>
                  <td className="p-4 space-y-0.5">
                    <div className="font-bold text-white">{o.customerName}</div>
                    <div className="flex items-center gap-1 text-[11px] text-brand-green-400">
                      <Phone className="w-3 h-3" />
                      <span>{o.customerPhone}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>{o.pickupDate}</div>
                    <div className="text-[10px] text-slate-400">{o.pickupTime}</div>
                  </td>
                  <td className="p-4 text-slate-400 max-w-xs">{o.notes || '—'}</td>
                  <td className="p-4 font-bold text-white">₹{o.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-brand-green-400">
                      {o.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {o.status === 'PENDING' && (
                      <button
                        onClick={() => updateStatus(o.id, 'READY_FOR_PICKUP')}
                        className="px-3 py-1.5 rounded-xl bg-brand-green-500 text-white font-bold text-[11px]"
                      >
                        Mark Ready
                      </button>
                    )}
                    {o.status === 'READY_FOR_PICKUP' && (
                      <button
                        onClick={() => updateStatus(o.id, 'COMPLETED')}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-[11px]"
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
