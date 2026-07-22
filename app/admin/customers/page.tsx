'use client';

import React from 'react';
import { Users, Phone, Mail, ShoppingBag } from 'lucide-react';

export default function AdminCustomersPage() {
  const customers = [
    { id: 'c-1', name: 'Mohammed Ashfaq', phone: '+91 98450 12345', email: 'ashfaq@example.com', totalOrders: 3, spent: 62997 },
    { id: 'c-2', name: 'Dr. Rahul Shetty', phone: '+91 98451 98765', email: 'rahul.shetty@gmail.com', totalOrders: 2, spent: 28498 },
    { id: 'c-3', name: 'Karthik Rao', phone: '+91 99001 12233', email: 'karthik.rao@outlook.com', totalOrders: 4, spent: 34996 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Customer Roster</h1>
        <p className="text-xs text-slate-400">Manage registered showroom patrons &amp; pickup histories.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
            <tr>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Phone Number</th>
              <th className="p-4">Email</th>
              <th className="p-4">Total Reservations</th>
              <th className="p-4">Total Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-slate-800/40">
                <td className="p-4 font-bold text-white">{c.name}</td>
                <td className="p-4 text-brand-green-400 font-mono">{c.phone}</td>
                <td className="p-4 text-slate-400">{c.email}</td>
                <td className="p-4 font-bold text-white">{c.totalOrders} Orders</td>
                <td className="p-4 font-bold text-brand-green-400">₹{c.spent.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
