'use client';

import { useState, useMemo } from 'react';
import { TourCard } from '@/components/tours/TourCard';
import { T, useLanguage } from '@/lib/language';
import type { TourPackage } from '@/types/database';

type FilterKey = 'all' | 'full-day' | '2d' | '3d' | '4d' | '5d' | 'daily';

function matchFilter(tour: TourPackage, filter: FilterKey): boolean {
  if (filter === 'all') return true;
  if (filter === 'full-day') return tour.is_multi_day === true && tour.total_days === 1;
  if (filter === '2d') return tour.is_multi_day === true && tour.total_days === 2;
  if (filter === '3d') return tour.is_multi_day === true && tour.total_days === 3;
  if (filter === '4d') return tour.is_multi_day === true && tour.total_days === 4;
  if (filter === '5d') return tour.is_multi_day === true && tour.total_days === 5;
  if (filter === 'daily') return tour.category === 'daily_tour';
  return true;
}

export function ToursContent({ tours }: { tours: TourPackage[] }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterKey>('all');

  const filters: { key: FilterKey; label: string; label_en: string }[] = [
    { key: 'all', label: 'Semua Paket', label_en: 'All Packages' },
    { key: 'full-day', label: 'Full Day', label_en: 'Full Day' },
    { key: '2d', label: '2 Hari 1 Malam', label_en: '2 Days 1 Night' },
    { key: '3d', label: '3 Hari 2 Malam', label_en: '3 Days 2 Nights' },
    { key: '4d', label: '4 Hari 3 Malam', label_en: '4 Days 3 Nights' },
    { key: '5d', label: '5 Hari 4 Malam', label_en: '5 Days 4 Nights' },
    { key: 'daily', label: 'Tour Harian', label_en: 'Daily Tours' },
  ];

  const filtered = useMemo(() => tours.filter(t => matchFilter(t, filter)), [tours, filter]);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase">Tour Packages</span>
            <div className="w-10 h-[1px] bg-gold-400" />
          </div>
          <h1 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
            <T en="All Tour Packages">Semua Paket Tour</T>
          </h1>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
            <T en="Choose from daily tours or complete multi-day packages. All include professional driver, comfortable vehicle, and full itinerary support.">
              Pilih dari daily tour atau paket multi-hari yang lengkap. Semua termasuk sopir profesional, kendaraan nyaman, dan dukungan itinerary penuh.
            </T>
          </p>
        </div>

        <div className="mb-10 -mx-5 sm:mx-0 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 px-5 sm:px-0 sm:justify-center sm:flex-wrap">
            {filters.map(f => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-semibold transition-all border ${
                  filter === f.key
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-navy-900/60 border-navy-900/10 hover:border-gold-400/40 hover:text-navy-900'
                }`}
              >
                {t(f.label, f.label_en)}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-navy-900/40">
            <T en="No tours match this filter.">Tidak ada tour yang cocok dengan filter ini.</T>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
