'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import type { Destination } from '@/types/database';

export function DestinationCarousel({ destinations }: { destinations: Destination[] }) {
  const { lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    const cardWidth = el.clientWidth;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [destinations]);

  const scrollTo = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth;
    el.scrollBy({ left: dir === 'right' ? cardWidth : -cardWidth, behavior: 'smooth' });
  };

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  if (!destinations || destinations.length === 0) return null;

  return (
    <div className="relative group">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-2xl"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="relative min-w-full snap-center aspect-[16/10] sm:aspect-[16/9]"
          >
            {dest.cover_image && (
              <Image
                src={dest.cover_image}
                alt={dest.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 text-[11px] font-semibold uppercase tracking-wider">
                  {dest.location}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                {lang === 'en' ? dest.name_en || dest.name : dest.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {destinations.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollTo('left')}
            disabled={!canScrollLeft}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all disabled:opacity-0 disabled:pointer-events-none opacity-0 group-hover:opacity-100 sm:opacity-100"
          >
            <ChevronLeft className="w-5 h-5 text-navy-900" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo('right')}
            disabled={!canScrollRight}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all disabled:opacity-0 disabled:pointer-events-none opacity-0 group-hover:opacity-100 sm:opacity-100"
          >
            <ChevronRight className="w-5 h-5 text-navy-900" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {destinations.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex ? 'bg-gold-400 w-6' : 'bg-white/60 w-1.5 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
