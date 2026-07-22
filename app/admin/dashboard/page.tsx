'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/mock-data';
import {
  ShoppingBag,
  Package,
  Sparkles,
  Users,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Printer,
  Phone
} from 'lucide-react';

interface MockOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  pickupDate: string;
  pickupTime: string;
  itemsCount: number;
  totalAmount: number;
  status: 'PENDING' | 'READY_FOR_PICKUP' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<MockOrder[]>([
    {
      id: 'ord-1001',
      orderNumber: 'FC-2026-8942',
      customerName: 'Mohammed Ashfaq',
      customerPhone: '9845012345',
      pickupDate: '2026-07-23',
      pickupTime: '11:00 AM - 2:00 PM',
      itemsCount: 2,
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
      itemsCount: 1,
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
      itemsCount: 3,
      totalAmount: 8997,
      status: 'COMPLETED',
      createdAt: 'Yesterday, 04:20 PM',
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: MockOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const pendingCount = orders.filter((o) => o.status === 'PENDING').length;
  const readyCount = orders.filter((o) => o.status === 'READY_FOR_PICKUP').length;
  const completedCount = orders.filter((o) => o.status === 'COMPLETED').length;

  return (
    <div className="space-y-8">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-400">
            Real-time showroom pickup reservations and catalog performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products?action=add"
            className="px-4 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-heading font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-brand-green-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today&apos;s Pickups</span>
            <div className="w-10 h-10 rounded-xl bg-brand-green-500/20 text-brand-green-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-black text-white">{orders.length}</span>
            <span className="text-xs text-brand-green-400 font-semibold">+12% vs last week</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Pickups</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-black text-amber-400">{pendingCount}</span>
            <span className="text-xs text-slate-400">Needs Trial Preparation</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Products</span>
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-black text-white">{INITIAL_PRODUCTS.length}</span>
            <span className="text-xs text-slate-400">Across 8 Categories</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Limited Drops</span>
            <div className="w-10 h-10 rounded-xl bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-black text-brand-gold-400">
              {INITIAL_PRODUCTS.filter((p) => p.isLimited).length}
            </span>
            <span className="text-xs text-slate-400">Low Inventory Drops</span>
          </div>
        </div>
      </div>

      {/* Recent Pickup Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-white">Recent Showroom Orders</h2>
            <p className="text-xs text-slate-400">Manage pickup reservation statuses and customer trials.</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-brand-green-400 hover:underline flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-3">Order Reference</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Pickup Schedule</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-white">{order.orderNumber}</td>
                  <td className="p-3 font-semibold text-white">{order.customerName}</td>
                  <td className="p-3">
                    <a href={`tel:${order.customerPhone}`} className="text-brand-green-400 hover:underline flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{order.customerPhone}</span>
                    </a>
                  </td>
                  <td className="p-3">
                    <div>{order.pickupDate}</div>
                    <div className="text-[10px] text-slate-400">{order.pickupTime}</div>
                  </td>
                  <td className="p-3 font-bold text-white">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    {order.status === 'PENDING' && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] uppercase">
                        Pending Prep
                      </span>
                    )}
                    {order.status === 'READY_FOR_PICKUP' && (
                      <span className="px-2.5 py-1 rounded-full bg-brand-green-500/20 text-brand-green-400 font-bold text-[10px] uppercase">
                        Ready in Store
                      </span>
                    )}
                    {order.status === 'COMPLETED' && (
                      <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px] uppercase">
                        Picked Up &amp; Paid
                      </span>
                    )}
                    {order.status === 'CANCELLED' && (
                      <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 font-bold text-[10px] uppercase">
                        Cancelled
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-1">
                    {order.status === 'PENDING' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'READY_FOR_PICKUP')}
                        className="px-2.5 py-1 rounded-lg bg-brand-green-500 hover:bg-brand-green-600 text-white text-[10px] font-bold"
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'READY_FOR_PICKUP' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold"
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
