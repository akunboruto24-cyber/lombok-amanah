'use client';

import { useState } from 'react';
import { MapPin, Loader2, ExternalLink, X, Navigation } from 'lucide-react';
import { T, useLanguage } from '@/lib/language';

interface Props {
  value: string;
  onChange: (mapsUrl: string) => void;
}

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

export function MapsLocationPicker({ value, onChange }: Props) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [manualInput, setManualInput] = useState('');
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
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError(t('Izin lokasi ditolak. Aktifkan di setting browser atau paste link Google Maps manual.', 'Location permission denied. Enable in browser settings or paste Google Maps link manually.'));
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError(t('Lokasi tidak tersedia. Coba paste link Google Maps manual.', 'Location unavailable. Try pasting Google Maps link manually.'));
        } else {
          setError(t('Gagal mengambil lokasi. Coba lagi.', 'Failed to get location. Try again.'));
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  function applyManual() {
    const url = extractGoogleMapsLink(manualInput);
    if (!url) {
      setError(t(
        'Format tidak valid. Paste link Google Maps atau koordinat (contoh: -8.5569, 116.0773).',
        'Invalid format. Paste a Google Maps link or coordinates (e.g. -8.5569, 116.0773).'
      ));
      return;
    }
    onChange(url);
    setShowManual(false);
    setManualInput('');
    setError('');
  }

  function clearLocation() {
    onChange('');
    setError('');
  }

  return (
    <div className="space-y-2">
      <label className="block text-white/40 text-xs">
        <T en="Share Google Maps Location (optional but recommended)">Bagikan Lokasi Google Maps (opsional tapi direkomendasikan)</T>
      </label>

      {value ? (
        <div className="flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-xl">
          <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-green-300 text-xs font-medium">
              <T en="Location shared">Lokasi terpasang</T>
            </p>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 text-xs truncate block hover:text-white transition-colors flex items-center gap-1"
            >
              <span className="truncate">{value}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
            </a>
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4 text-[#C8A45A]" />
            )}
            <T en="Use My Location">Gunakan Lokasi Saya</T>
          </button>
          <button
            type="button"
            onClick={() => setShowManual(!showManual)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/10 transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#C8A45A]" />
            <T en="Paste Maps Link">Paste Link Maps</T>
          </button>
        </div>
      )}

      {showManual && !value && (
        <div className="space-y-2 p-3 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-white/50 text-[11px] leading-relaxed">
            <T en="Open Google Maps → find your hotel → tap Share → Copy link → paste here.">
              Buka Google Maps → cari hotel Anda → tap Bagikan → Salin link → paste di sini.
            </T>
          </p>
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="https://maps.app.goo.gl/... atau -8.5569, 116.0773"
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-[#C8A45A]/50 placeholder:text-white/20"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                applyManual();
              }
            }}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={applyManual}
              className="flex-1 px-3 py-2 bg-[#C8A45A] text-[#0F172A] text-sm font-semibold rounded-lg hover:bg-[#d4b06a] transition-colors"
            >
              <T en="Save Link">Simpan Link</T>
            </button>
            <button
              type="button"
              onClick={() => { setShowManual(false); setManualInput(''); setError(''); }}
              className="px-3 py-2 bg-white/5 text-white/60 text-sm rounded-lg hover:bg-white/10 transition-colors"
            >
              <T en="Cancel">Batal</T>
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-300 text-xs px-2">{error}</p>
      )}

      {!value && !error && (
        <p className="text-white/30 text-[11px] leading-relaxed px-1">
          <T en="Sharing your Google Maps location helps our driver find you faster.">
            Berbagi lokasi Google Maps membantu driver menemukan Anda lebih cepat.
          </T>
        </p>
      )}
    </div>
  );
}
