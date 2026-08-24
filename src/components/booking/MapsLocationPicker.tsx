'use client';

import { useState } from 'react';
import { MapPin, Loader2, ExternalLink, X, Navigation, Search, Link2, Building2 } from 'lucide-react';
import { T, useLanguage } from '@/lib/language';

interface Props {
  value: string;
  onChange: (mapsUrl: string) => void;
  areaHint?: string;
}

type Mode = 'idle' | 'hotel' | 'link';

function extractGoogleMapsLink(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  if (/^https?:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google\.[a-z.]+|maps\.app\.goo\.gl|goo\.gl\/maps)/i.test(trimmed)) {
    return trimmed;
  }

  const coordMatch = trimmed.match(/^(-?\d+\.\d+),\s*(-?\d+\.\d+)$/);
  if (coordMatch) {
    return `https://maps.google.com/?q=${coordMatch[1]},${coordMatch[2]}`;
  }

  return null;
}

function buildHotelSearchUrl(hotelName: string, area: string): string {
  const query = area ? `${hotelName} ${area} Lombok` : `${hotelName} Lombok`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.trim())}`;
}

export function MapsLocationPicker({ value, onChange, areaHint = '' }: Props) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>('idle');
  const [hotelInput, setHotelInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [error, setError] = useState('');

  async function getCurrentLocation() {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setError(t('Browser tidak mendukung lokasi.', 'Browser does not support geolocation.'));
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const url = `https://maps.google.com/?q=${lat},${lng}`;
        onChange(url);
        setLoading(false);
        setMode('idle');
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError(t(
            'Izin lokasi ditolak. Coba cari hotel dengan nama atau paste link Google Maps.',
            'Location denied. Try searching by hotel name or paste a Google Maps link.'
          ));
        } else {
          setError(t('Gagal mengambil lokasi. Coba metode lain.', 'Failed to get location. Try another method.'));
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  function applyHotelSearch() {
    const trimmed = hotelInput.trim();
    if (trimmed.length < 3) {
      setError(t('Nama hotel terlalu pendek (minimal 3 karakter).', 'Hotel name too short (min 3 characters).'));
      return;
    }
    const url = buildHotelSearchUrl(trimmed, areaHint);
    onChange(url);
    setHotelInput('');
    setMode('idle');
    setError('');
  }

  function applyLink() {
    const url = extractGoogleMapsLink(linkInput);
    if (!url) {
      setError(t(
        'Format tidak valid. Paste link Google Maps (contoh: maps.app.goo.gl/... atau -8.5569, 116.0773).',
        'Invalid format. Paste a Google Maps link (e.g. maps.app.goo.gl/... or -8.5569, 116.0773).'
      ));
      return;
    }
    onChange(url);
    setLinkInput('');
    setMode('idle');
    setError('');
  }

  function clearLocation() {
    onChange('');
    setError('');
  }

  return (
    <div className="space-y-2">
      <label className="block text-white/50 text-xs font-medium">
        <T en="Pickup Location on Map (recommended)">Lokasi Penjemputan di Maps (direkomendasikan)</T>
      </label>

      {value ? (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-green-300 text-xs font-medium">
                <T en="Location saved">Lokasi berhasil disimpan</T>
              </p>
              <p className="text-white/50 text-[10px]">
                <T en="Our driver can find your pickup easily">Driver mudah menemukan lokasi jemput</T>
              </p>
            </div>
            <button
              type="button"
              onClick={clearLocation}
              className="w-7 h-7 rounded-full hover:bg-red-500/20 flex items-center justify-center text-white/50 hover:text-red-400 transition-colors flex-shrink-0"
              aria-label={t('Hapus lokasi', 'Remove location')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
          >
            <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-[#C8A45A] flex-shrink-0" />
            <span className="text-white/60 text-xs truncate group-hover:text-white">{value}</span>
          </a>
        </div>
      ) : (
        <>
          {mode === 'idle' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={loading}
                className="flex flex-col items-center justify-center gap-1 px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs hover:bg-white/10 hover:border-[#C8A45A]/40 transition-all disabled:opacity-50 group"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#C8A45A]" />
                ) : (
                  <Navigation className="w-4 h-4 text-[#C8A45A]" />
                )}
                <span className="text-center leading-tight">
                  <T en="Use My GPS">Pakai GPS Saya</T>
                </span>
              </button>

              <button
                type="button"
                onClick={() => { setMode('hotel'); setError(''); }}
                className="flex flex-col items-center justify-center gap-1 px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs hover:bg-white/10 hover:border-[#C8A45A]/40 transition-all"
              >
                <Search className="w-4 h-4 text-[#C8A45A]" />
                <span className="text-center leading-tight">
                  <T en="Search Hotel Name">Cari Nama Hotel</T>
                </span>
              </button>

              <button
                type="button"
                onClick={() => { setMode('link'); setError(''); }}
                className="flex flex-col items-center justify-center gap-1 px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs hover:bg-white/10 hover:border-[#C8A45A]/40 transition-all"
              >
                <Link2 className="w-4 h-4 text-[#C8A45A]" />
                <span className="text-center leading-tight">
                  <T en="Paste Maps Link">Paste Link Maps</T>
                </span>
              </button>
            </div>
          )}

          {mode === 'hotel' && (
            <div className="space-y-2 p-3 bg-white/5 border border-[#C8A45A]/30 rounded-xl">
              <div className="flex items-center gap-2 text-white/70 text-xs">
                <Building2 className="w-4 h-4 text-[#C8A45A]" />
                <span className="font-medium">
                  <T en="Type your hotel or villa name">Ketik nama hotel atau villa Anda</T>
                </span>
              </div>
              <input
                type="text"
                value={hotelInput}
                onChange={(e) => setHotelInput(e.target.value)}
                placeholder={t('Contoh: Katamaran Resort, Kuta Lombok', 'e.g. Katamaran Resort, Kuta Lombok')}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-[#C8A45A]/50 placeholder:text-white/25"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    applyHotelSearch();
                  }
                }}
              />
              <p className="text-white/40 text-[10px] leading-relaxed">
                <T en="We will create a Google Maps search link. Driver can open it and navigate directly.">
                  Kami akan buat link pencarian Google Maps. Driver bisa buka dan langsung navigasi.
                </T>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={applyHotelSearch}
                  className="flex-1 px-3 py-2 bg-[#C8A45A] text-[#0F172A] text-sm font-semibold rounded-lg hover:bg-[#d4b06a] transition-colors"
                >
                  <T en="Create Maps Link">Buat Link Maps</T>
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('idle'); setHotelInput(''); setError(''); }}
                  className="px-3 py-2 bg-white/5 text-white/60 text-sm rounded-lg hover:bg-white/10 transition-colors"
                >
                  <T en="Back">Kembali</T>
                </button>
              </div>
            </div>
          )}

          {mode === 'link' && (
            <div className="space-y-2 p-3 bg-white/5 border border-[#C8A45A]/30 rounded-xl">
              <div className="flex items-center gap-2 text-white/70 text-xs">
                <Link2 className="w-4 h-4 text-[#C8A45A]" />
                <span className="font-medium">
                  <T en="Paste your Google Maps link">Paste link Google Maps Anda</T>
                </span>
              </div>
              <p className="text-white/50 text-[10px] leading-relaxed">
                <T en="Open Google Maps → search your hotel → tap Share → Copy link → paste here.">
                  Buka Google Maps → cari hotel Anda → tap Bagikan → Salin link → paste di sini.
                </T>
              </p>
              <input
                type="text"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder="https://maps.app.goo.gl/..."
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-[#C8A45A]/50 placeholder:text-white/25"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    applyLink();
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={applyLink}
                  className="flex-1 px-3 py-2 bg-[#C8A45A] text-[#0F172A] text-sm font-semibold rounded-lg hover:bg-[#d4b06a] transition-colors"
                >
                  <T en="Save Link">Simpan Link</T>
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('idle'); setLinkInput(''); setError(''); }}
                  className="px-3 py-2 bg-white/5 text-white/60 text-sm rounded-lg hover:bg-white/10 transition-colors"
                >
                  <T en="Back">Kembali</T>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {error && (
        <div className="px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-xs">{error}</p>
        </div>
      )}

      {!value && mode === 'idle' && !error && (
        <p className="text-white/30 text-[11px] leading-relaxed px-1">
          <T en="Any of these methods works. Sharing your location helps our driver find you fast on tour day.">
            Pilih salah satu metode. Berbagi lokasi membantu driver menemukan Anda dengan cepat di hari tour.
          </T>
        </p>
      )}
    </div>
  );
}
