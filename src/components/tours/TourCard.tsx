'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, MapPin, Users, Star } from 'lucide-react';
import { formatPrice, idrToUsd } from '@/lib/data';
import { T, useLanguage } from '@/lib/language';
import type { TourPackage } from '@/types/database';

export function TourCard({ tour }: { tour: TourPackage }) {
  const { lang } = useLanguage();
  const destNames = tour.destinations?.map(d => lang === 'en' ? d.name_en || d.name : d.name).join(' • ') || '';

  return (
    <article className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-navy-900/[0.06] transition-all duration-500 hover:-translate-y-1 border border-navy-900/[0.06]">
      <Link href={`/tours/${tour.slug}`}>
        <div className="relative h-52 overflow-hidden bg-slate-100">
          {tour.cover_image && (
            <Image
              src={tour.cover_image}
              alt={tour.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {tour.is_popular && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-gold-400 text-navy-900 text-[10px] font-bold tracking-[0.1em] uppercase rounded-full">
              Popular
            </div>
          )}
          {tour.is_featured && !tour.is_popular && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-navy-900 text-white text-[10px] font-bold tracking-[0.1em] uppercase rounded-full">
              Featured
            </div>
          )}
          <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-navy-900 text-[14px] font-bold rounded-lg">
            {lang === 'en' ? formatPrice(idrToUsd(tour.price), 'USD') : formatPrice(tour.price)}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/tours/${tour.slug}`}>
          <h3 className="text-[18px] font-display font-bold text-navy-900 mb-2 group-hover:text-gold-400 transition-colors">
            {lang === 'en' ? tour.name_en || tour.name : tour.name}
          </h3>
        </Link>

        {tour.review_count && tour.review_count > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            <span className="text-[13px] font-semibold text-navy-900">{tour.average_rating?.toFixed(1)}</span>
            <span className="text-[12px] text-navy-900/40">({tour.review_count} reviews)</span>
          </div>
        )}

        {destNames && (
          <div className="flex items-start gap-2 mb-3">
            <MapPin className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
            <p className="text-[12px] text-navy-900/50 leading-[1.5] line-clamp-2">{destNames}</p>
          </div>
        )}

        <div className="flex items-center gap-4 pt-3 border-t border-navy-900/[0.06]">
          {tour.duration && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-navy-900/30" />
              <span className="text-[12px] text-navy-900/50">{tour.duration}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-navy-900/30" />
            <span className="text-[12px] text-navy-900/50">Max {tour.max_passenger} <T en="people">orang</T></span>
          </div>
        </div>
      </div>
    </article>
  );
}
