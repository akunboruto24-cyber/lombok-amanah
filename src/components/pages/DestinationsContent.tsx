'use client';

import Image from 'next/image';
import { MapPin, Clock, Ticket } from 'lucide-react';
import { T, useLanguage } from '@/lib/language';
import type { Destination } from '@/types/database';

const categoryLabels: Record<string, { id: string; en: string }> = {
  beach: { id: 'Pantai', en: 'Beach' },
  mountain: { id: 'Gunung & Bukit', en: 'Mountain & Hill' },
  waterfall: { id: 'Air Terjun', en: 'Waterfall' },
  culture: { id: 'Budaya', en: 'Culture' },
  island: { id: 'Pulau', en: 'Island' },
};

export function DestinationsContent({ destinations }: { destinations: Destination[] }) {
  const { t } = useLanguage();
  const categories = [...new Set(destinations.map(d => d.category))];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase"><T en="Destinations">Destinasi</T></span>
            <div className="w-10 h-[1px] bg-gold-400" />
          </div>
          <h1 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
            <T en="Lombok Tourism Destinations">Destinasi Wisata Lombok</T>
          </h1>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
            <T en="From exotic beaches to Mount Rinjani — discover Lombok's natural beauty and culture.">
              Dari pantai eksotis hingga puncak Rinjani — temukan keindahan alam dan budaya Pulau Lombok.
            </T>
          </p>
        </div>

        {categories.map((cat) => {
          const items = destinations.filter(d => d.category === cat);
          const label = categoryLabels[cat];
          return (
            <section key={cat} className="mb-16">
              <h2 className="text-xl font-display font-bold text-navy-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-[2px] bg-gold-400" />
                {label ? t(label.id, label.en) : cat}
                <span className="text-[12px] text-navy-900/30 font-normal">({items.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((dest) => (
                  <article key={dest.id} id={dest.slug} className="bg-white rounded-2xl overflow-hidden border border-navy-900/[0.04] hover:shadow-lg transition-all duration-500">
                    {dest.cover_image ? (
                      <div className="relative h-48 bg-slate-100">
                        <Image src={dest.cover_image} alt={dest.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                    ) : (
                      <div className="h-32 bg-gradient-to-br from-gold-50 to-slate-100 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-gold-400/30" />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-[15px] font-bold text-navy-900 mb-1">{dest.name}</h3>
                      <p className="text-[11px] text-gold-400 font-medium uppercase tracking-wider mb-3">{dest.location}</p>
                      <p className="text-[13px] text-navy-900/50 leading-[1.7] mb-4">{dest.description}</p>
                      <div className="flex flex-wrap gap-3 pt-3 border-t border-navy-900/[0.06]">
                        {dest.opening_hours && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gold-400" />
                            <span className="text-[11px] text-navy-900/40">{dest.opening_hours}</span>
                          </div>
                        )}
                        {dest.entrance_fee && (
                          <div className="flex items-center gap-1.5">
                            <Ticket className="w-3.5 h-3.5 text-gold-400" />
                            <span className="text-[11px] text-navy-900/40">{dest.entrance_fee}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
