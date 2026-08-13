'use client';

import { useState } from 'react';
import type { Driver } from '@/types/database';
import {
  Star, Phone, Car, Globe, MapPin, Edit2,
  ToggleLeft, ToggleRight, User,
} from 'lucide-react';

const statusColors: Record<string, { label: string; dot: string; bg: string; text: string }> = {
  available: { label: 'Available', dot: 'bg-green-400', bg: 'bg-green-500/10', text: 'text-green-400' },
  busy: { label: 'Busy', dot: 'bg-yellow-400', bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
  off: { label: 'Off', dot: 'bg-red-400', bg: 'bg-red-500/10', text: 'text-red-400' },
};

const langLabels: Record<string, string> = {
  id: 'Indonesia',
  en: 'English',
  jp: 'Japanese',
  zh: 'Chinese',
  ko: 'Korean',
  fr: 'French',
};

export function DriverList({ drivers }: { drivers: Driver[] }) {
  const [filter, setFilter] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = filter === 'all' ? drivers : drivers.filter(d => d.status === filter);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'available', 'busy', 'off'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === s
                ? 'bg-[#C8A45A] text-[#0F172A]'
                : 'bg-white/5 text-white/50 hover:bg-white/10'
            }`}
          >
            {s === 'all' ? 'Semua' : statusColors[s]?.label || s}
            {s !== 'all' && ` (${drivers.filter(d => d.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Driver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((d) => {
          const sc = statusColors[d.status] || statusColors.off;
          return (
            <div
              key={d.id}
              className="bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <User className="w-6 h-6 text-white/30" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{d.name}</h3>
                    <p className="text-white/30 text-xs font-mono">{d.license_number}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${sc.text} ${sc.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                  {sc.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Star className="w-3.5 h-3.5 text-[#C8A45A]" />
                  <span className="text-white font-medium">{d.rating}</span>
                  <span className="text-white/30">rating</span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Car className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-white font-medium">{d.total_trips}</span>
                  <span className="text-white/30">trips</span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-white/30" />
                  <span>{d.experience_years} tahun</span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Globe className="w-3.5 h-3.5 text-white/30" />
                  <span>{d.languages.map(l => langLabels[l] || l).join(', ')}</span>
                </div>
              </div>

              {d.phone && (
                <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
                  <Phone className="w-3.5 h-3.5" />
                  {d.phone}
                </div>
              )}

              {d.fee_per_trip && (
                <div className="text-white/40 text-xs mb-4">
                  Fee/trip: <span className="text-white font-medium">Rp {d.fee_per_trip.toLocaleString('id-ID')}</span>
                </div>
              )}

              <div className="flex gap-2 pt-3 border-t border-white/5">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 text-white/60 text-xs font-medium rounded-lg hover:bg-white/10 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <a
                  href={`https://wa.me/${d.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-500/10 text-green-400 text-xs font-medium rounded-lg hover:bg-green-500/20 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
                <button className="px-3 py-2 bg-white/5 text-white/40 rounded-lg hover:bg-white/10 transition-colors">
                  {d.status === 'available' ? (
                    <ToggleRight className="w-4 h-4 text-green-400" />
                  ) : (
                    <ToggleLeft className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <User className="w-8 h-8 text-white/20 mx-auto mb-2" />
          <p className="text-white/30 text-sm">Tidak ada driver</p>
        </div>
      )}

      {/* Add Driver Modal placeholder */}
      {showAddForm && (
        <AddDriverForm onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
}

function AddDriverForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-white font-bold text-lg mb-4">Tambah Driver Baru</h3>
        <p className="text-white/40 text-sm">Form akan terhubung ke Supabase</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-white/10 text-white rounded-lg text-sm">
          Tutup
        </button>
      </div>
    </div>
  );
}
