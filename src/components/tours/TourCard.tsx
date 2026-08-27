'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, MapPin, Users, Star, Sparkles } from 'lucide-react';
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
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {tour.is_popular && (
              <div className="px-3 py-1 bg-gold-400 text-navy-900 text-[10px] font-bold tracking-[0.1em] uppercase rounded-full">
                Popular
              </div>
            )}
            {tour.is_featured && !tour.is_popular && (
              <div className="px-3 py-1 bg-navy-900 text-white text-[10px] font-bold tracking-[0.1em] uppercase rounded-full">
                Featured
              </div>
            )}
          </div>
          <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-navy-900 rounded-lg">
            {tour.is_multi_day && !tour.price_per_person && (
              <div className="text-[9px] font-semibold text-navy-900/50 uppercase tracking-wider leading-none">
                <T en="From">Mulai dari</T>
              </div>
            )}
            <div className="text-[14px] font-bold leading-tight flex items-baseline gap-0.5">
              <span>{lang === 'en' ? formatPrice(idrToUsd(tour.price), 'USD') : formatPrice(tour.price)}</span>
              {tour.price_per_person && (
                <span className="text-[10px] font-medium text-navy-900/50">
                  /<T en="person">org</T>
                </span>
              )}
            </div>
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

        {tour.is_multi_day && tour.price_per_person ? (
          // All-inclusive adventure packages (Rinjani, Rafting) — show specific package tagline
          <div className="flex items-start gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
            <p className="text-[12px] text-navy-900/60 leading-[1.5] line-clamp-3">
              {tour.slug.includes('rinjani') ? (
                <T en="Guided trek to Mount Rinjani summit (3,726 masl) via Sembalun route. ALL-INCLUSIVE: guide, porter, tent, meals, park tickets — everything.">
                  Trek berpandu ke puncak Gunung Rinjani (3.726 mdpl) via jalur Sembalun. ALL-INCLUSIVE: guide, porter, tenda, makanan, tiket taman nasional — semua sudah termasuk.
                </T>
              ) : tour.slug.includes('rafting') ? (
                <T en="Whitewater rafting on Lombok river (grade 2-3 rapids). ALL-INCLUSIVE: guide, raft, safety gear, lunch, hotel pickup — everything.">
                  Rafting arus deras di sungai Lombok (jeram grade 2-3). ALL-INCLUSIVE: guide, perahu, alat keselamatan, makan siang, antar-jemput hotel — semua sudah termasuk.
                </T>
              ) : (
                <T en="All-inclusive adventure package. Click for full details.">
                  Paket adventure all-inclusive. Klik untuk detail lengkap.
                </T>
              )}
            </p>
          </div>
        ) : tour.is_multi_day ? (
          // Flex multi-day tours (Full Day to 5D4N) — free explore
          <div className="flex items-start gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
            <p className="text-[12px] text-navy-900/60 leading-[1.5] line-clamp-3">
              <T en="Freely explore anywhere in Lombok. We'll recommend hidden gems and popular spots you might not know yet. Click for full details.">
                Bebas explore ke mana saja di Lombok. Kami rekomendasikan hidden gem & tempat populer yang mungkin belum Anda tahu. Klik untuk detail.
              </T>
            </p>
          </div>
        ) : (
          destNames && (
            <div className="flex items-start gap-2 mb-3">
              <MapPin className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
              <p className="text-[12px] text-navy-900/50 leading-[1.5] line-clamp-2">{destNames}</p>
            </div>
          )
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
