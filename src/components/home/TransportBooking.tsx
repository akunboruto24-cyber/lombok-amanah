'use client';

import { useState } from 'react';
import { MapPin, Calendar, Users, ArrowRight, Clock, Hotel } from 'lucide-react';
import { formatWhatsAppLink } from '@/lib/data';
import { T, useLanguage } from '@/lib/language';

interface Location {
  id: string;
  name: string;
  nameEn: string;
  maps: string;
}

const pickupLocations: Location[] = [
  { id: 'airport', name: 'Bandara Internasional Lombok (BIL)', nameEn: 'Lombok International Airport (BIL)', maps: 'https://maps.google.com/?q=-8.7573,116.2695' },
  { id: 'senggigi', name: 'Area Senggigi', nameEn: 'Senggigi Area', maps: 'https://maps.google.com/?q=-8.4889,116.0442' },
  { id: 'kuta', name: 'Kuta Lombok / Mandalika', nameEn: 'Kuta Lombok / Mandalika', maps: 'https://maps.google.com/?q=-8.8975,116.2918' },
  { id: 'mataram', name: 'Kota Mataram', nameEn: 'Mataram City', maps: 'https://maps.google.com/?q=-8.5833,116.1167' },
  { id: 'bangsal', name: 'Pelabuhan Bangsal', nameEn: 'Bangsal Harbor', maps: 'https://maps.google.com/?q=-8.4040,116.0770' },
  { id: 'lembar', name: 'Pelabuhan Lembar', nameEn: 'Lembar Harbor', maps: 'https://maps.google.com/?q=-8.7310,116.0700' },
  { id: 'praya', name: 'Kota Praya', nameEn: 'Praya City', maps: 'https://maps.google.com/?q=-8.7210,116.2940' },
];

const destinationLocations: Location[] = [
  { id: 'airport', name: 'Bandara Internasional Lombok (BIL)', nameEn: 'Lombok International Airport (BIL)', maps: 'https://maps.google.com/?q=-8.7573,116.2695' },
  { id: 'senggigi', name: 'Area Senggigi', nameEn: 'Senggigi Area', maps: 'https://maps.google.com/?q=-8.4889,116.0442' },
  { id: 'kuta', name: 'Kuta Lombok / Mandalika', nameEn: 'Kuta Lombok / Mandalika', maps: 'https://maps.google.com/?q=-8.8975,116.2918' },
  { id: 'mataram', name: 'Kota Mataram', nameEn: 'Mataram City', maps: 'https://maps.google.com/?q=-8.5833,116.1167' },
  { id: 'bangsal', name: 'Pelabuhan Bangsal (ke Gili)', nameEn: 'Bangsal Harbor (to Gili Islands)', maps: 'https://maps.google.com/?q=-8.4040,116.0770' },
  { id: 'lembar', name: 'Pelabuhan Lembar', nameEn: 'Lembar Harbor', maps: 'https://maps.google.com/?q=-8.7310,116.0700' },
  { id: 'mandalika', name: 'Sirkuit Mandalika / MotoGP', nameEn: 'Mandalika Circuit / MotoGP', maps: 'https://maps.google.com/?q=-8.8946,116.3247' },
  { id: 'sembalun', name: 'Sembalun (Gn. Rinjani)', nameEn: 'Sembalun (Mt. Rinjani)', maps: 'https://maps.google.com/?q=-8.4645,116.4900' },
  { id: 'senaru', name: 'Senaru (Gn. Rinjani)', nameEn: 'Senaru (Mt. Rinjani)', maps: 'https://maps.google.com/?q=-8.3920,116.4080' },
  { id: 'praya', name: 'Kota Praya', nameEn: 'Praya City', maps: 'https://maps.google.com/?q=-8.7210,116.2940' },
];

const areaOptions = ['Senggigi', 'Kuta Mandalika', 'Mataram', 'Praya', 'Sekotong', 'Selong', 'Sembalun', 'Bangsal / Pemenang'];

export function TransportBooking({ whatsapp }: { whatsapp: string }) {
  const { t, lang } = useLanguage();
  const [pickupMode, setPickupMode] = useState<'loc' | 'hotel'>('loc');
  const [pickup, setPickup] = useState('');
  const [pickupHotel, setPickupHotel] = useState('');
  const [pickupArea, setPickupArea] = useState('');

  const [destMode, setDestMode] = useState<'loc' | 'hotel'>('loc');
  const [dest, setDest] = useState('');
  const [destHotel, setDestHotel] = useState('');
  const [destArea, setDestArea] = useState('');

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pax, setPax] = useState(2);

  const minDate = new Date().toISOString().split('T')[0];

  function handleBook() {
    const dateStr = date
      ? new Date(date).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : '-';

    let pickupInfo = '';
    let pickupMaps = '';
    if (pickupMode === 'hotel') {
      pickupInfo = `🏨 ${pickupHotel} (Area: ${pickupArea || '-'})`;
    } else {
      const loc = pickupLocations.find(p => p.id === pickup);
      pickupInfo = loc?.name || '-';
      pickupMaps = loc?.maps ? `\n📌 Maps: ${loc.maps}` : '';
    }

    let destInfo = '';
    let destMaps = '';
    if (destMode === 'hotel') {
      destInfo = `🏨 ${destHotel} (Area: ${destArea || '-'})`;
    } else {
      const loc = destinationLocations.find(d => d.id === dest);
      destInfo = loc?.name || '-';
      destMaps = loc?.maps ? `\n📌 Maps: ${loc.maps}` : '';
    }

    const pplLabel = lang === 'en' ? 'passengers' : 'orang';

    const msg = lang === 'en'
      ? `Hello Lombok Nusa Alam! 🚗

I'd like to book a transport:

📍 *Pickup:* ${pickupInfo}${pickupMaps}
📍 *Destination:* ${destInfo}${destMaps}
📅 *Date:* ${dateStr}
⏰ *Time:* ${time || '-'}
👥 *Passengers:* ${pax} ${pplLabel}

Please let me know the price and availability. Thank you!`
      : `Halo Lombok Nusa Alam! 🚗

Saya ingin memesan transport:

📍 *Jemput:* ${pickupInfo}${pickupMaps}
📍 *Tujuan:* ${destInfo}${destMaps}
📅 *Tanggal:* ${dateStr}
⏰ *Jam:* ${time || '-'}
👥 *Penumpang:* ${pax} ${pplLabel}

Mohon info harga dan ketersediaan. Terima kasih!`;

    window.open(formatWhatsAppLink(whatsapp, msg), '_blank');
  }

  const pickupOk = pickupMode === 'hotel' ? (pickupHotel && pickupArea) : pickup;
  const destOk = destMode === 'hotel' ? (destHotel && destArea) : dest;
  const isValid = pickupOk && destOk && date && time;

  const inputCls = 'w-full px-4 py-3.5 text-sm bg-white rounded-xl border border-navy-900/[0.08] focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all text-navy-900';
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  function ModeToggle({ mode, onChange }: { mode: 'loc' | 'hotel'; onChange: (m: 'loc' | 'hotel') => void }) {
    return (
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => onChange('loc')}
          className={`text-[10px] px-2.5 py-1 rounded-full font-semibold transition-all ${mode === 'loc' ? 'bg-gold-400 text-navy-900' : 'bg-navy-900/5 text-navy-900/40 hover:bg-navy-900/10'}`}
        >
          <MapPin className="w-3 h-3 inline -mt-0.5 mr-0.5" /> <T en="Location">Lokasi</T>
        </button>
        <button
          type="button"
          onClick={() => onChange('hotel')}
          className={`text-[10px] px-2.5 py-1 rounded-full font-semibold transition-all ${mode === 'hotel' ? 'bg-gold-400 text-navy-900' : 'bg-navy-900/5 text-navy-900/40 hover:bg-navy-900/10'}`}
        >
          <Hotel className="w-3 h-3 inline -mt-0.5 mr-0.5" /> Hotel/Villa
        </button>
      </div>
    );
  }

  return (
    <section id="booking" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase">
              <T en="Book Transport">Pesan Transport</T>
            </span>
            <div className="w-10 h-[1px] bg-gold-400" />
          </div>
          <h2 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
            <T en="Book Your Private Ride">Pesan Kendaraan Pribadi</T>
          </h2>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
            <T en="Choose your pickup & destination, then book directly via WhatsApp. Fast and easy!">
              Pilih lokasi penjemputan &amp; tujuan, lalu pesan langsung via WhatsApp. Cepat dan mudah!
            </T>
          </p>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-navy-900/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Pickup */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em]">
                  <MapPin className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                  <T en="Pickup Location">Lokasi Jemput</T>
                </label>
                <ModeToggle mode={pickupMode} onChange={(m) => { setPickupMode(m); setPickup(''); setPickupHotel(''); setPickupArea(''); }} />
              </div>
              {pickupMode === 'loc' ? (
                <select value={pickup} onChange={(e) => setPickup(e.target.value)} className={selectCls}>
                  <option value="">{t('— Pilih lokasi jemput —', '— Select pickup location —')}</option>
                  {pickupLocations.map((loc) => (
                    <option key={loc.id} value={loc.id}>{t(loc.name, loc.nameEn)}</option>
                  ))}
                </select>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={pickupHotel}
                    onChange={(e) => setPickupHotel(e.target.value)}
                    placeholder={t('Nama hotel/villa (contoh: Katamaran Resort)', 'Hotel/villa name (e.g. Katamaran Resort)')}
                    className={inputCls}
                  />
                  <select value={pickupArea} onChange={(e) => setPickupArea(e.target.value)} className={selectCls}>
                    <option value="">{t('— Area lokasi hotel —', '— Hotel area —')}</option>
                    {areaOptions.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Destination */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em]">
                  <MapPin className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                  <T en="Destination">Tujuan</T>
                </label>
                <ModeToggle mode={destMode} onChange={(m) => { setDestMode(m); setDest(''); setDestHotel(''); setDestArea(''); }} />
              </div>
              {destMode === 'loc' ? (
                <select value={dest} onChange={(e) => setDest(e.target.value)} className={selectCls}>
                  <option value="">{t('— Pilih tujuan —', '— Select destination —')}</option>
                  {destinationLocations.map((loc) => (
                    <option key={loc.id} value={loc.id}>{t(loc.name, loc.nameEn)}</option>
                  ))}
                </select>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={destHotel}
                    onChange={(e) => setDestHotel(e.target.value)}
                    placeholder={t('Nama hotel/villa (contoh: Novotel Lombok)', 'Hotel/villa name (e.g. Novotel Lombok)')}
                    className={inputCls}
                  />
                  <select value={destArea} onChange={(e) => setDestArea(e.target.value)} className={selectCls}>
                    <option value="">{t('— Area lokasi hotel —', '— Hotel area —')}</option>
                    {areaOptions.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
            <div>
              <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-2 block">
                <Calendar className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                <T en="Date">Tanggal</T>
              </label>
              <input type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-2 block">
                <Clock className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                <T en="Pickup Time">Jam Jemput</T>
              </label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-navy-900/40 uppercase tracking-[0.15em] mb-2 block">
                <Users className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                <T en="Passengers">Penumpang</T>
              </label>
              <select value={pax} onChange={(e) => setPax(Number(e.target.value))} className={selectCls}>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} {t('orang', 'passengers')}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleBook}
              disabled={!isValid}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-[15px] transition-all duration-300 ${
                isValid
                  ? 'bg-gold-400 text-navy-900 hover:bg-gold-300 hover:shadow-xl hover:shadow-gold-400/20 active:scale-[0.97]'
                  : 'bg-navy-900/10 text-navy-900/30 cursor-not-allowed'
              }`}
            >
              <T en="Book via WhatsApp">Pesan via WhatsApp</T>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
