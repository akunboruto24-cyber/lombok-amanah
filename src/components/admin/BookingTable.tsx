'use client';

import { useState } from 'react';
import type { Booking, Driver } from '@/types/database';
import {
  AlertCircle, CheckCircle, Users, Loader2, Clock,
  Phone, Mail, MapPin, Calendar, ChevronDown, ChevronUp,
  MessageSquare, User,
} from 'lucide-react';

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  confirmed: { label: 'Confirmed', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  assigned: { label: 'Assigned', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  running: { label: 'Running', color: 'text-green-400', bg: 'bg-green-500/10' },
  completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  cancelled: { label: 'Cancelled', color: 'text-red-400', bg: 'bg-red-500/10' },
};

const paymentConfig: Record<string, { label: string; color: string }> = {
  unpaid: { label: 'Belum Bayar', color: 'text-red-400' },
  deposit_paid: { label: 'DP Lunas', color: 'text-yellow-400' },
  fully_paid: { label: 'Lunas', color: 'text-emerald-400' },
  refunded: { label: 'Refund', color: 'text-gray-400' },
};

export function BookingTable({ bookings, drivers }: { bookings: Booking[]; drivers: Driver[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);
  const availableDrivers = drivers.filter(d => d.status === 'available');

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'confirmed', 'assigned', 'running', 'completed'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === s
                ? 'bg-[#C8A45A] text-[#0F172A]'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            {s === 'all' ? 'Semua' : statusConfig[s]?.label || s}
            {s !== 'all' && (
              <span className="ml-1.5 opacity-60">
                ({bookings.filter(b => b.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/30 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="px-4 py-3 text-left">Kode</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Tour</th>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-left">Driver</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => {
                const sc = statusConfig[b.status] || statusConfig.pending;
                const pc = paymentConfig[b.payment_status] || paymentConfig.unpaid;
                const expanded = expandedId === b.id;

                return (
                  <BodyRow key={b.id}>
                    <tr
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => setExpandedId(expanded ? null : b.id)}
                    >
                      <td className="px-4 py-3">
                        <span className="text-[#C8A45A] font-mono text-xs">{b.booking_code}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{b.customer?.name}</p>
                        <p className="text-white/30 text-xs">{b.customer?.country}</p>
                      </td>
                      <td className="px-4 py-3 text-white/60">{b.tour?.name}</td>
                      <td className="px-4 py-3 text-white/60 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-white/30" />
                          {b.booking_date}
                        </div>
                        <p className="text-white/30 text-xs mt-0.5">{b.pickup_time}</p>
                      </td>
                      <td className="px-4 py-3">
                        {b.driver_id ? (
                          <span className="text-white/60 text-xs">
                            {drivers.find(d => d.id === b.driver_id)?.name || '-'}
                          </span>
                        ) : (
                          <span className="text-yellow-400/60 text-xs">Belum assign</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${sc.color} ${sc.bg}`}>
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="text-white font-medium">Rp {(b.total_price || 0).toLocaleString('id-ID')}</p>
                        <p className={`text-xs ${pc.color}`}>{pc.label}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {expanded ? (
                          <ChevronUp className="w-4 h-4 text-white/30" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white/30" />
                        )}
                      </td>
                    </tr>

                    {/* Expanded Detail */}
                    {expanded && (
                      <tr className="border-b border-white/5">
                        <td colSpan={8} className="px-4 py-4 bg-white/[0.01]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Customer Info */}
                            <div className="space-y-2">
                              <h4 className="text-white/50 text-xs uppercase tracking-wider font-semibold">Customer</h4>
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                  <User className="w-3.5 h-3.5 text-white/30" />
                                  {b.customer?.name}
                                </div>
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                  <Phone className="w-3.5 h-3.5 text-white/30" />
                                  {b.customer?.phone}
                                </div>
                                {b.customer?.email && (
                                  <div className="flex items-center gap-2 text-white/70 text-sm">
                                    <Mail className="w-3.5 h-3.5 text-white/30" />
                                    {b.customer.email}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Trip Info */}
                            <div className="space-y-2">
                              <h4 className="text-white/50 text-xs uppercase tracking-wider font-semibold">Detail Trip</h4>
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                  <MapPin className="w-3.5 h-3.5 text-white/30" />
                                  {b.pickup_location}
                                </div>
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                  <Users className="w-3.5 h-3.5 text-white/30" />
                                  {b.passenger_count} penumpang
                                </div>
                                {b.special_request && (
                                  <div className="flex items-start gap-2 text-white/70 text-sm">
                                    <MessageSquare className="w-3.5 h-3.5 text-white/30 mt-0.5" />
                                    {b.special_request}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-2">
                              <h4 className="text-white/50 text-xs uppercase tracking-wider font-semibold">Assign Driver</h4>
                              {!b.driver_id && availableDrivers.length > 0 ? (
                                <div className="space-y-2">
                                  {availableDrivers.map(d => (
                                    <button
                                      key={d.id}
                                      className="w-full flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors group"
                                    >
                                      <div className="text-left">
                                        <p className="text-white font-medium">{d.name}</p>
                                        <p className="text-white/30 text-xs">★ {d.rating} · {d.total_trips} trips</p>
                                      </div>
                                      <span className="text-[#C8A45A] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        Assign →
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              ) : b.driver_id ? (
                                <div className="flex items-center gap-2 px-3 py-2 bg-green-500/5 border border-green-500/10 rounded-lg">
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  <div>
                                    <p className="text-green-400 text-sm font-medium">
                                      {drivers.find(d => d.id === b.driver_id)?.name}
                                    </p>
                                    <p className="text-green-400/50 text-xs">Driver sudah di-assign</p>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-white/30 text-sm">Tidak ada driver available</p>
                              )}

                              {/* Quick Actions */}
                              <div className="flex gap-2 mt-3">
                                <a
                                  href={`https://wa.me/${b.customer?.phone?.replace(/\+/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 py-2 text-center bg-green-500/10 text-green-400 text-xs font-medium rounded-lg hover:bg-green-500/20 transition-colors"
                                >
                                  WhatsApp
                                </a>
                                {b.status === 'pending' && (
                                  <button className="flex-1 py-2 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-lg hover:bg-blue-500/20 transition-colors">
                                    Konfirmasi
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </BodyRow>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <AlertCircle className="w-8 h-8 text-white/20 mx-auto mb-2" />
            <p className="text-white/30 text-sm">Tidak ada booking</p>
          </div>
        )}
      </div>
    </div>
  );
}

function BodyRow({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
