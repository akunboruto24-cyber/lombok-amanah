'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, CalendarCheck, Car, Users, MapPin,
  Package, Settings, LogOut, Menu, X, ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Booking', href: '/admin/bookings', icon: CalendarCheck },
  { label: 'Tour Packages', href: '/admin/tours', icon: Package },
  { label: 'Drivers', href: '/admin/drivers', icon: Users },
  { label: 'Kendaraan', href: '/admin/vehicles', icon: Car },
  { label: 'Destinasi', href: '/admin/destinations', icon: MapPin },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1E293B] text-white rounded-xl shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#0F172A] border-r border-white/5 z-50 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <Link href="/admin" className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-wide">
              LOMBOK <span className="text-[#C8A45A]">NUSA ALAM</span>
            </span>
            <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase">Admin Panel</span>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden text-white/40 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  active
                    ? 'bg-[#C8A45A]/10 text-[#C8A45A]'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${active ? 'text-[#C8A45A]' : 'text-white/30 group-hover:text-white/60'}`} />
                {item.label}
                {active && <ChevronRight className="w-4 h-4 ml-auto text-[#C8A45A]/50" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
