'use client';

import Image from 'next/image';
import { Camera } from 'lucide-react';
import { T } from '@/lib/language';

interface Props {
  photos: string[];
}

export function GallerySection({ photos }: Props) {
  if (photos.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase">
              <T en="Documentation">Dokumentasi</T>
            </span>
            <div className="w-10 h-[1px] bg-gold-400" />
          </div>
          <h2 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
            <T en="Our Moments with Guests">Momen Bersama Tamu Kami</T>
          </h2>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
            <T en="Memorable moments from our tours with guests from around the world.">
              Momen berkesan dari perjalanan tour bersama tamu dari berbagai negara.
            </T>
          </p>
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {photos.map((photo, i) => (
            <div key={photo} className="break-inside-avoid rounded-xl overflow-hidden group relative">
              <Image
                src={`/gallery/${photo}`}
                alt={`Tour documentation ${i + 1}`}
                width={400}
                height={300}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-all duration-300 flex items-center justify-center">
                <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
