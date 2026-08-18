'use client';

import { useState } from 'react';
import { Calendar, Users, MapPin, Phone, MessageCircle } from 'lucide-react';
import { formatPrice, formatWhatsAppLink, idrToUsd } from '@/lib/data';
import { T, useLanguage } from '@/lib/language';
import type { TourPackage } from '@/types/database';

const pickupLocations = [
  { id: 'Bandara Internasional Lombok', en: 'Lombok International Airport' },
  { id: 'Area Senggigi', en: 'Senggigi Area' },
  { id: 'Kuta Lombok', en: 'Kuta Lombok' },
  { id: 'Kota Mataram', en: 'Mataram City' },
  { id: 'Pelabuhan Bangsal', en: 'Bangsal Harbor' },
  { id: 'Hotel / Villa', en: 'Hotel / Villa' },
  { id: 'Lokasi Lain', en: 'Other Location' },
];

export function BookingForm({ tour, whatsapp }: { tour: TourPackage; whatsapp: string }) {
  const { t, lang } = useLanguage();
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
      ? new Date(date).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : '-';

    const pplLabel = lang === 'en' ? 'people' : 'orang';

    const msg = lang === 'en'
      ? `Hello Lombok Nusa Alam! 🌴

I'd like to book a tour:

📦 *Package:* ${tour.name}
📍 *Route:* ${destNames}
💰 *Price:* ${formatPrice(idrToUsd(tour.price), 'USD')}/group
📅 *Date:* ${dateStr}
👥 *Guests:* ${pax} ${pplLabel}
📍 *Pickup:* ${pickup || '-'}
👤 *Name:* ${name || '-'}
📱 *Phone:* ${phone || '-'}
📝 *Notes:* ${notes || '-'}

Please confirm availability. Thank you!`
      : `Halo Lombok Nusa Alam! 🌴

Saya ingin memesan tour:

📦 *Paket:* ${tour.name}
📍 *Rute:* ${destNames}
💰 *Harga:* ${formatPrice(tour.price)}/grup
📅 *Tanggal:* ${dateStr}
👥 *Jumlah:* ${pax} ${pplLabel}
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
        <p className="text-[12px] text-white/40 uppercase tracking-wider mb-1"><T en="Starting from">Mulai dari</T></p>
        <p className="text-3xl font-bold text-gold-400">{lang === 'en' ? formatPrice(idrToUsd(tour.price), 'USD') : formatPrice(tour.price)}</p>
        <p className="text-[13px] text-white/40"><T en={`per group (max ${tour.max_passenger} people)`}>{`per grup (max ${tour.max_passenger} orang)`}</T></p>
      </div>

      {/* Form */}
      <div className="p-6 space-y-4">
        <div>
          <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-1.5 block">
            <T en="Full Name *">Nama Lengkap *</T>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('Masukkan nama', 'Enter your name')}
            className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-1.5 block">
            <Phone className="w-3 h-3 inline mr-1 -mt-0.5" />
            <T en="WhatsApp Number">No. WhatsApp</T>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08xx-xxxx-xxxx"
            className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-1.5 block">
            <Calendar className="w-3 h-3 inline mr-1 -mt-0.5" />
            <T en="Tour Date *">Tanggal Tour *</T>
          </label>
          <input
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-1.5 block">
            <Users className="w-3 h-3 inline mr-1 -mt-0.5" />
            <T en="Number of Guests">Jumlah Orang</T>
          </label>
          <select
            value={pax}
            onChange={(e) => setPax(Number(e.target.value))}
            className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all appearance-none cursor-pointer"
          >
            {Array.from({ length: 15 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {t('orang', 'people')}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-1.5 block">
            <MapPin className="w-3 h-3 inline mr-1 -mt-0.5" />
            <T en="Pickup Location *">Lokasi Jemput *</T>
          </label>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">{t('— Pilih lokasi —', '— Select location —')}</option>
            {pickupLocations.map((loc) => (
              <option key={loc.id} value={loc.id}>{t(loc.id, loc.en)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-1.5 block">
            <T en="Notes (optional)">Catatan (opsional)</T>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder={t('Permintaan khusus...', 'Special requests...')}
            className="w-full px-4 py-3 text-sm bg-slate-50 rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
          />
        </div>

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
          <T en="Book via WhatsApp">Pesan via WhatsApp</T>
        </button>

        <p className="text-[11px] text-navy-900/30 text-center leading-[1.6]">
          <T en="Click the button above to chat directly on WhatsApp. Fast response!">
            Klik tombol di atas untuk langsung chat ke WhatsApp kami. Respons cepat!
          </T>
        </p>
      </div>
    </div>
  );
}
