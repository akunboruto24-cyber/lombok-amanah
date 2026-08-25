'use client';

import { useState, useEffect } from 'react';
import { MapPin, ExternalLink, Check, X } from 'lucide-react';
import { T, useLanguage } from '@/lib/language';

interface Props {
  value: string;
  onChange: (mapsUrl: string) => void;
  areaHint?: string;
  hotelName?: string;
}

function isMapsUrl(input: string): boolean {
  const trimmed = input.trim();
  return /^https?:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google\.[a-z.]+|maps\.app\.goo\.gl|goo\.gl\/maps)/i.test(trimmed);
}

function isCoords(input: string): boolean {
  return /^-?\d+\.\d+,\s*-?\d+\.\d+$/.test(input.trim());
}

function coordsToUrl(input: string): string {
  const m = input.trim().match(/^(-?\d+\.\d+),\s*(-?\d+\.\d+)$/);
  return m ? `https://maps.google.com/?q=${m[1]},${m[2]}` : '';
}

function nameToSearchUrl(name: string, area: string): string {
  const query = area ? `${name} ${area} Lombok` : `${name} Lombok`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.trim())}`;
}

export function MapsLocationPicker({ value, onChange, areaHint = '', hotelName = '' }: Props) {
  const { t } = useLanguage();
  const [input, setInput] = useState('');

  const helperSearchUrl = nameToSearchUrl(
    hotelName || t('hotel saya', 'my hotel'),
    areaHint
  );

  useEffect(() => {
    if (!input.trim()) return;
    const trimmed = input.trim();
    if (isMapsUrl(trimmed)) {
      onChange(trimmed);
    } else if (isCoords(trimmed)) {
      onChange(coordsToUrl(trimmed));
    } else if (trimmed.length >= 3) {
      onChange(nameToSearchUrl(trimmed, areaHint));
    }
  }, [input, areaHint, onChange]);

  function clear() {
    setInput('');
    onChange('');
  }

  return (
    <div className="space-y-2">
      <label className="block text-white/50 text-xs font-medium">
        <T en="Google Maps Location (recommended for faster pickup)">
          Lokasi Google Maps (direkomendasikan agar penjemputan cepat)
        </T>
      </label>

      <div className="relative">
        <MapPin className="absolute left-3 top-3 w-4 h-4 text-white/30 pointer-events-none" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t(
            'Ketik nama hotel ATAU paste link Google Maps di sini',
            'Type hotel name OR paste Google Maps link here'
          )}
          className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-[#C8A45A]/50 placeholder:text-white/25"
        />
        {input && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            aria-label={t('Hapus', 'Clear')}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {value && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2.5 bg-green-500/10 border border-green-500/30 rounded-xl hover:bg-green-500/15 transition-colors group"
        >
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <Check className="w-3.5 h-3.5 text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-green-300 text-xs font-medium">
              <T en="Location saved — tap to preview on Google Maps">
                Lokasi tersimpan — klik untuk cek di Google Maps
              </T>
            </p>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-green-400 group-hover:text-green-300 flex-shrink-0" />
        </a>
      )}

      <a
        href={helperSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[#C8A45A] text-xs hover:text-[#d4b06a] transition-colors group"
      >
        <ExternalLink className="w-3 h-3" />
        <span className="underline underline-offset-2">
          <T en="Open Google Maps to find your hotel, then paste the link here">
            Buka Google Maps untuk cari hotel Anda, lalu paste link-nya di sini
          </T>
        </span>
      </a>
    </div>
  );
}
