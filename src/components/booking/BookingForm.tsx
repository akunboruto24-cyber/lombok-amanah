'use client';

import { useState } from 'react';
import { Calendar, Users, MapPin, Phone, ArrowRight, MessageCircle } from 'lucide-react';
import { formatPrice, formatWhatsAppLink } from '@/lib/data';
import type { TourPackage } from '@/types/database';

const pickupLocations = [
  'Bandara Internasional Lombok',
  'Area Senggigi',
  'Kuta Lombok',
  'Kota Mataram',
  'Pelabuhan Bangsal',
  'Hotel / Villa',
  'Lokasi Lain',
];

export function BookingForm({ tour, whatsapp }: { tour: TourPackage; whatsapp: string }) {
  const [date, setDate] = useState('');
  const [pax, setPax] = useState(2);
  const [pickup, setPickup] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const minDate = new Date().toISOString().split('T')[0];
  const destNames = tour.destinations?.map(d => d.name).join(', ') || '';

  function handleBook() {
    const dateStr = date
      ? new Date(date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : '-';

    const msg = `Halo Lombok Nusa Alam! 🌴

Saya ingin memesan tour:

📦 *Paket:* ${tour.name}
📍 *Rute:* ${destNames}
💰 *Harga:* ${formatPrice(tour.price)}/grup
📅 *Tanggal:* ${dateStr}
👥 *Jumlah:* ${pax} orang
📍 *Jemput:* ${pickup || '-'}
👤 *Nama:* ${name || '-'}
📱 *HP:* ${phone || '-'}
📝 *Catatan:* ${notes || '-'}

Mohon konfirmasi ketersediaan. Terima kasih!`;

    window.open(formatWhatsAppLink(whatsapp, msg), '_blank');
  }

  const isValid = date && pickup && name;

  return (
    <div className="bg-white rounded-2xl border border-navy-900/[0.06] shadow-xl shadow-navy-900/[0.04] overflow-hidden">
      {/* Price Header */}
      <div className="bg-navy-900 px-6 py-5 text-center">
        <p className="text-[12px] text-white/40 uppercase tracking-wider mb-1">Mulai dari</p>
        <p className="text-3xl font-bold text-gold-400">{formatPrice(tour.price)}</p>
        <p className="text-[13px] text-white/40">per grup (max {tour.max_passenger} orang)</p>
      </div>

      {/* Form */}
      <div className="p-6 space-y-4">
        {/* Name */}
        <div>
          <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-1.5 block">
            Nama Lengkap *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama"
            className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-1.5 block">
            <Phone className="w-3 h-3 inline mr-1 -mt-0.5" />
            No. WhatsApp
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08xx-xxxx-xxxx"
            className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
          />
        </div>

        {/* Date */}
        <div>
          <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-1.5 block">
            <Calendar className="w-3 h-3 inline mr-1 -mt-0.5" />
            Tanggal Tour *
          </label>
          <input
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
          />
        </div>

        {/* Passengers */}
        <div>
          <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-1.5 block">
            <Users className="w-3 h-3 inline mr-1 -mt-0.5" />
            Jumlah Orang
          </label>
          <select
            value={pax}
            onChange={(e) => setPax(Number(e.target.value))}
            className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all appearance-none cursor-pointer"
          >
            {Array.from({ length: 15 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} orang</option>
            ))}
          </select>
        </div>

        {/* Pickup */}
        <div>
          <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-1.5 block">
            <MapPin className="w-3 h-3 inline mr-1 -mt-0.5" />
            Lokasi Jemput *
          </label>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">— Pilih lokasi —</option>
            {pickupLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-1.5 block">
            Catatan (opsional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Permintaan khusus..."
            className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleBook}
          disabled={!isValid}
          className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-[15px] transition-all duration-300 ${
            isValid
              ? 'bg-[#25D366] text-white hover:bg-[#20BD5A] hover:shadow-xl hover:shadow-[#25D366]/20 active:scale-[0.97]'
              : 'bg-navy-900/10 text-navy-900/30 cursor-not-allowed'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          Pesan via WhatsApp
        </button>

        <p className="text-[11px] text-navy-900/30 text-center leading-[1.6]">
          Klik tombol di atas untuk langsung chat ke WhatsApp kami. Respons cepat!
        </p>
      </div>
    </div>
  );
}
