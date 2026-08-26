'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, MapPin, Star, Check, X as XIcon, ArrowLeft, Car, Calendar } from 'lucide-react';
import { T, useLanguage } from '@/lib/language';
import { formatPrice, idrToUsd } from '@/lib/data';
import { BookingForm } from '@/components/booking/BookingForm';
import { DestinationCarousel } from '@/components/tours/DestinationCarousel';
import type { TourPackage, SiteSettings } from '@/types/database';

export function TourDetailContent({ tour, settings }: { tour: TourPackage; settings: SiteSettings }) {
  const { t, lang } = useLanguage();

  return (
    <div className="pt-20">
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        {tour.cover_image && (
          <Image src={tour.cover_image} alt={tour.name} fill className="object-cover" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            <Link href="/tours" className="inline-flex items-center gap-2 text-white/60 text-[13px] hover:text-gold-400 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> <T en="Back to Tours">Kembali ke Tour</T>
            </Link>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white mb-3">{lang === 'en' ? tour.name_en || tour.name : tour.name}</h1>
            <div className="flex flex-wrap items-center gap-4">
              {tour.review_count && tour.review_count > 0 && (
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  <span className="text-white font-semibold text-[14px]">{tour.average_rating?.toFixed(1)}</span>
                  <span className="text-white/40 text-[13px]">({tour.review_count} {t('review', 'reviews')})</span>
                </div>
              )}
              <span className="text-2xl font-bold text-gold-400">{lang === 'en' ? formatPrice(idrToUsd(tour.price), 'USD') : formatPrice(tour.price)}<span className="text-[14px] text-white/40 font-normal">/{t('grup', 'group')}</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {tour.destinations?.some(d => d.slug === 'desa-sade' || d.name?.toLowerCase().includes('sade')) && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-700 text-lg font-bold">!</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-[15px] font-bold text-amber-900">
                      <T en="Notice: Desa Sade Temporarily Closed">Pemberitahuan: Desa Sade Sementara Ditutup</T>
                    </h3>
                    <p className="text-[13px] text-amber-800/90 leading-relaxed">
                      <T en="Due to a recent fire, Desa Sade is temporarily closed to visitors. During this period, the tour continues normally with a visit to Desa Ende (another authentic Sasak village nearby) offering a similar cultural experience. All other destinations in this tour remain unchanged. We appreciate your understanding.">
                        Karena kebakaran beberapa hari lalu, Desa Sade untuk sementara ditutup untuk kunjungan wisata. Selama masa penutupan, tour tetap berjalan dengan kunjungan ke Desa Ende (desa tradisional Sasak lainnya) yang menawarkan pengalaman budaya serupa. Destinasi lainnya di tour ini tidak berubah. Terima kasih atas pengertian Anda.
                      </T>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <section>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-4">Overview</h2>
              <p className="text-[15px] text-navy-900/60 leading-[1.8]">{lang === 'en' ? tour.description_en || tour.description : tour.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {tour.duration && (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <Clock className="w-5 h-5 text-gold-400" />
                    <div>
                      <p className="text-[11px] text-navy-900/40 uppercase tracking-wide"><T en="Duration">Durasi</T></p>
                      <p className="text-[14px] font-semibold text-navy-900">{tour.duration}</p>
                    </div>
                  </div>
                )}
                {tour.meeting_time && (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-gold-400" />
                    <div>
                      <p className="text-[11px] text-navy-900/40 uppercase tracking-wide"><T en="Start">Mulai</T></p>
                      <p className="text-[14px] font-semibold text-navy-900">{tour.meeting_time}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <Users className="w-5 h-5 text-gold-400" />
                  <div>
                    <p className="text-[11px] text-navy-900/40 uppercase tracking-wide">Max</p>
                    <p className="text-[14px] font-semibold text-navy-900">{tour.max_passenger} {t('orang', 'people')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <Car className="w-5 h-5 text-gold-400" />
                  <div>
                    <p className="text-[11px] text-navy-900/40 uppercase tracking-wide"><T en="Vehicle">Kendaraan</T></p>
                    <p className="text-[14px] font-semibold text-navy-900">Private</p>
                  </div>
                </div>
              </div>
            </section>

            {tour.destinations && tour.destinations.length > 0 && (
              <section>
                <h2 className="text-xl font-display font-bold text-navy-900 mb-4">
                  <T en="Destinations">Destinasi</T>
                  <span className="text-[13px] font-normal text-navy-900/40 ml-2">
                    ({tour.destinations.length})
                  </span>
                </h2>
                <DestinationCarousel destinations={tour.destinations} />
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.destinations.map((dest) => (
                    <div key={dest.id} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                      <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[14px] font-semibold text-navy-900">{lang === 'en' ? dest.name_en || dest.name : dest.name}</p>
                        <p className="text-[12px] text-navy-900/40 capitalize">{dest.category} • {dest.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {tour.itinerary && tour.itinerary.length > 0 && (() => {
              const groupedByDay = tour.itinerary.reduce((acc, item) => {
                const dayNum = item.day ?? 1;
                if (!acc[dayNum]) acc[dayNum] = { title: item.day_title, title_en: item.day_title_en, items: [] };
                acc[dayNum].items.push(item);
                return acc;
              }, {} as Record<number, { title?: string; title_en?: string; items: typeof tour.itinerary }>);
              const dayNums = Object.keys(groupedByDay).map(Number).sort((a, b) => a - b);
              const isMultiDay = dayNums.length > 1;

              return (
                <section>
                  <h2 className="text-xl font-display font-bold text-navy-900 mb-4">
                    <T en="Itinerary">Itinerary</T>
                  </h2>
                  <div className="space-y-6">
                    {dayNums.map((dayNum) => {
                      const day = groupedByDay[dayNum];
                      const dayLabel = isMultiDay
                        ? (lang === 'en' ? day.title_en || `Day ${dayNum}` : day.title || `Hari ${dayNum}`)
                        : null;
                      return (
                        <div key={dayNum}>
                          {dayLabel && (
                            <div className="flex items-center gap-3 mb-4">
                              <div className="px-3 py-1 bg-gold-400 text-navy-900 text-[11px] font-bold uppercase tracking-wider rounded-full">
                                <T en={`Day ${dayNum}`}>{`Hari ${dayNum}`}</T>
                              </div>
                              <h3 className="text-[15px] font-bold text-navy-900">{dayLabel.replace(/^(hari|day)\s*\d+\s*[—-]\s*/i, '')}</h3>
                            </div>
                          )}
                          <div className="space-y-0 ml-1">
                            {day.items!.map((item, i) => (
                              <div key={i} className="flex gap-4 relative">
                                {i < day.items!.length - 1 && (
                                  <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-gold-400/20" />
                                )}
                                <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center flex-shrink-0 z-10">
                                  <span className="text-gold-400 text-[11px] font-bold">{item.time}</span>
                                </div>
                                <div className="pb-5 pt-2">
                                  <p className="text-[14px] font-medium text-navy-900">
                                    {lang === 'en' ? item.activity_en || item.activity : item.activity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })()}

            {tour.is_multi_day && tour.price_tiers && tour.price_tiers.length > 0 && (
              <section>
                <h2 className="text-xl font-display font-bold text-navy-900 mb-4">
                  <T en="Price by Group Size">Harga Sesuai Jumlah Peserta</T>
                </h2>
                <div className="overflow-hidden rounded-xl border border-navy-900/10">
                  <table className="w-full text-[14px]">
                    <thead className="bg-navy-900 text-white">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold">
                          <T en="Group Size">Jumlah Peserta</T>
                        </th>
                        <th className="text-right px-4 py-3 font-semibold">
                          <T en="Total Price">Total Harga</T>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-900/[0.05]">
                      {tour.price_tiers.map((tier, i) => (
                        <tr key={i} className={i === 2 ? 'bg-gold-400/[0.06]' : ''}>
                          <td className="px-4 py-3 text-navy-900 font-medium">
                            {lang === 'en' ? tier.label_en : tier.label}
                            {i === 2 && (
                              <span className="ml-2 text-[10px] font-bold text-gold-500 uppercase tracking-wider">
                                <T en="Popular">Populer</T>
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-navy-900">
                            {tier.price_per_person > 0 ? (
                              lang === 'en'
                                ? formatPrice(idrToUsd(tier.price_per_person), 'USD')
                                : formatPrice(tier.price_per_person)
                            ) : (
                              <span className="text-gold-500 text-[13px] font-semibold">
                                <T en="Contact Us">Hubungi Kami</T>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[12px] text-navy-900/50 mt-2 italic">
                  <T en="Total price for the whole group (car + driver + fuel + parking). Entrance fees, guide fees, meals, and hotel are separate. Cash to driver on tour day.">
                    Total harga untuk seluruh grup (mobil + sopir + BBM + parkir). Tiket masuk, biaya guide, makanan, dan hotel terpisah. Pembayaran cash ke driver di hari tour.
                  </T>
                </p>
              </section>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tour.includes.length > 0 && (
                <section className="p-5 bg-green-50 rounded-xl">
                  <h3 className="text-[14px] font-bold text-green-800 mb-3"><T en="Included">Termasuk</T></h3>
                  <ul className="space-y-2">
                    {(lang === 'en' && tour.includes_en?.length ? tour.includes_en : tour.includes).map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-[13px] text-green-700">
                        <Check className="w-4 h-4 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {tour.excludes.length > 0 && (
                <section className="p-5 bg-red-50 rounded-xl">
                  <h3 className="text-[14px] font-bold text-red-800 mb-3"><T en="Not Included">Tidak Termasuk</T></h3>
                  <ul className="space-y-2">
                    {(lang === 'en' && tour.excludes_en?.length ? tour.excludes_en : tour.excludes).map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-[13px] text-red-700">
                        <XIcon className="w-4 h-4 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {tour.additional_info && (
              <section className="p-5 bg-blue-50 rounded-xl">
                <h3 className="text-[14px] font-bold text-blue-800 mb-2"><T en="Additional Information">Informasi Tambahan</T></h3>
                <p className="text-[13px] text-blue-700 leading-[1.7]">{lang === 'en' ? tour.additional_info_en || tour.additional_info : tour.additional_info}</p>
              </section>
            )}

            {tour.reviews && tour.reviews.length > 0 && (
              <section>
                <h2 className="text-xl font-display font-bold text-navy-900 mb-4"><T en="Customer Reviews">Review Pelanggan</T></h2>
                <div className="space-y-4">
                  {tour.reviews.map((review) => (
                    <div key={review.id} className="p-5 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                        ))}
                      </div>
                      <p className="text-[14px] text-navy-900/60 leading-[1.7] mb-3">{review.comment}</p>
                      <p className="text-[12px] font-semibold text-navy-900">{review.customer?.name} — <span className="font-normal text-navy-900/40">{review.customer?.country}</span></p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingForm tour={tour} whatsapp={settings.whatsapp} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
