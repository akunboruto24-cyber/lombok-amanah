'use client';

import { useState } from 'react';
import type { TourPackage, Vehicle } from '@/types/database';
import {
  User, Phone, Mail, MapPin, Calendar, Clock,
  Users, MessageSquare, CheckCircle, Loader2,
  ChevronDown, ExternalLink,
} from 'lucide-react';

const areaOptions = [
  'Senggigi', 'Kuta Mandalika', 'Mataram', 'Praya',
  'Sekotong', 'Selong', 'Sembalun', 'Bangsal/Pemenang',
  'Bandara Lombok (BIL)', 'Pelabuhan Lembar', 'Lainnya',
];

export function BookingFormPage({ tours, vehicles }: { tours: TourPackage[]; vehicles: Vehicle[] }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', country: '',
    tour: '', date: '', time: '08:00', pickup: '',
    area: '', passengers: '2', notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ bookingCode: string; whatsappUrl: string } | null>(null);

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data);
      }
    } catch {
      alert('Gagal mengirim booking. Coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Booking Berhasil!</h2>
              <p className="text-white/50">Kode booking Anda:</p>
              <p className="text-3xl font-mono font-bold text-[#C8A45A] mt-2">{result.bookingCode}</p>
            </div>
            <p className="text-white/40 text-sm">
              Lanjutkan via WhatsApp untuk konfirmasi dan pembayaran
            </p>
            <a
              href={result.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              Konfirmasi via WhatsApp
            </a>
            <button
              onClick={() => { setResult(null); setForm({ name: '', phone: '', email: '', country: '', tour: '', date: '', time: '08:00', pickup: '', area: '', passengers: '2', notes: '' }); }}
              className="text-white/40 text-sm hover:text-white/60 transition-colors"
            >
              Buat booking baru
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] pt-28 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#C8A45A] text-sm font-semibold tracking-wider uppercase">Booking Online</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 font-[family-name:var(--font-display)]">
            Pesan Tour Anda
          </h1>
          <p className="text-white/40 mt-2">Isi form di bawah, lalu konfirmasi via WhatsApp</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-2xl p-6 sm:p-8 space-y-5">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider">Data Diri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField icon={User} label="Nama Lengkap *" value={form.name} onChange={v => update('name', v)} required />
              <InputField icon={Phone} label="No. WhatsApp *" value={form.phone} onChange={v => update('phone', v)} placeholder="+62812..." required />
              <InputField icon={Mail} label="Email" value={form.email} onChange={v => update('email', v)} type="email" />
              <InputField icon={MapPin} label="Negara / Country" value={form.country} onChange={v => update('country', v)} placeholder="Indonesia" />
            </div>
          </div>

          {/* Tour Selection */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider">Detail Tour</h3>

            <div>
              <label className="block text-white/40 text-xs mb-1.5">Pilih Tour *</label>
              <div className="relative">
                <select
                  value={form.tour}
                  onChange={e => update('tour', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm appearance-none outline-none focus:ring-2 focus:ring-[#C8A45A]/50"
                >
                  <option value="" className="bg-[#1E293B]">— Pilih paket tour —</option>
                  {tours.map(t => (
                    <option key={t.id} value={t.name} className="bg-[#1E293B]">
                      {t.name} — Rp {t.price.toLocaleString('id-ID')}
                    </option>
                  ))}
                  <option value="Custom Tour" className="bg-[#1E293B]">Custom Tour (pilih sendiri)</option>
                  <option value="Airport Transfer" className="bg-[#1E293B]">Airport Transfer</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField icon={Calendar} label="Tanggal Tour *" value={form.date} onChange={v => update('date', v)} type="date" required />
              <InputField icon={Clock} label="Jam Jemput" value={form.time} onChange={v => update('time', v)} type="time" />
              <InputField icon={Users} label="Jumlah Penumpang" value={form.passengers} onChange={v => update('passengers', v)} type="number" />
            </div>
          </div>

          {/* Pickup */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider">Lokasi Penjemputan</h3>

            <div>
              <label className="block text-white/40 text-xs mb-1.5">Area</label>
              <div className="relative">
                <select
                  value={form.area}
                  onChange={e => update('area', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm appearance-none outline-none focus:ring-2 focus:ring-[#C8A45A]/50"
                >
                  <option value="" className="bg-[#1E293B]">— Pilih area —</option>
                  {areaOptions.map(a => (
                    <option key={a} value={a} className="bg-[#1E293B]">{a}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>

            <InputField
              icon={MapPin}
              label="Nama Hotel / Villa / Alamat Lengkap"
              value={form.pickup}
              onChange={v => update('pickup', v)}
              placeholder="Contoh: Hotel Katamaran Resort, Senggigi"
            />
          </div>

          {/* Notes */}
          <div className="pt-4 border-t border-white/5">
            <label className="block text-white/40 text-xs mb-1.5">Catatan Tambahan</label>
            <div className="flex items-start gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
              <MessageSquare className="w-4 h-4 text-white/20 mt-0.5" />
              <textarea
                value={form.notes}
                onChange={e => update('notes', e.target.value)}
                rows={3}
                placeholder="Child seat, alergi makanan, permintaan khusus..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/20 resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#C8A45A] text-[#0F172A] font-bold text-lg rounded-xl hover:bg-[#d4b06a] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Kirim Booking'
            )}
          </button>

          <p className="text-white/20 text-xs text-center">
            Setelah submit, Anda akan diarahkan ke WhatsApp untuk konfirmasi
          </p>
        </form>
      </div>
    </div>
  );
}

function InputField({
  icon: Icon, label, value, onChange, type = 'text', placeholder, required,
}: {
  icon: typeof User; label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-white/40 text-xs mb-1.5">{label}</label>
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus-within:ring-2 focus-within:ring-[#C8A45A]/50">
        <Icon className="w-4 h-4 text-white/20" />
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/20"
        />
      </div>
    </div>
  );
}
