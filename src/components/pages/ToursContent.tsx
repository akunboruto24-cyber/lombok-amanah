'use client';

import { TourCard } from '@/components/tours/TourCard';
import { T } from '@/lib/language';
import type { TourPackage } from '@/types/database';

export function ToursContent({ tours }: { tours: TourPackage[] }) {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase">Tour Packages</span>
            <div className="w-10 h-[1px] bg-gold-400" />
          </div>
          <h1 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
            <T en="All Tour Packages">Semua Paket Tour</T>
          </h1>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
            <T en="Choose the right tour package. All prices include professional driver, comfortable vehicle, fuel, and mineral water.">
              Pilih paket tour yang sesuai. Semua harga sudah termasuk sopir profesional, kendaraan nyaman, BBM, dan air mineral.
            </T>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  );
}
