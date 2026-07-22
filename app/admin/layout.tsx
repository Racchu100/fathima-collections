'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/ui/BrandLogo';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Sparkles,
  ShoppingBag,
  Users,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Bell
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fc_admin_logged_in');
    }
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Limited Edition', href: '/admin/limited', icon: Sparkles, badge: 'Drops' },
    { name: 'Pickup Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  // Prevent SSR hydration mismatch on Vercel
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-heading text-xs">
        Loading Admin Portal...
      </div>
    );
  }

  // If on admin login page, skip admin layout wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row w-full">
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Logo & Portal Header */}
          <div className="flex items-center justify-between">
            <BrandLogo variant="dark" />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-green-500/20 text-brand-green-400 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-4 h-4 text-brand-green-400" />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-bold text-xs text-white truncate">Showroom Manager</p>
              <p className="text-[10px] text-slate-400">Admin Portal</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-green-500 text-white shadow-lg shadow-brand-green-500/20'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-gold-500 text-slate-950 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 w-full min-h-screen">
        {/* Top Admin Header Bar - Explicitly Fixed */}
        <header className="fixed top-0 left-0 lg:left-64 right-0 h-14 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 shadow-md">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800 shrink-0"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-heading font-bold text-xs sm:text-sm text-white truncate">
              Fathima Collection Admin Panel
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0">
            <span className="hidden md:inline text-slate-400 text-[11px]">Store: Falnir Road, Mangaluru</span>
            <div className="relative p-2 rounded-xl bg-slate-800 text-slate-300">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-green-400 animate-pulse" />
            </div>
          </div>
        </header>

        {/* Content Area with Top Padding for Fixed Header */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-18 sm:pt-20 max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
