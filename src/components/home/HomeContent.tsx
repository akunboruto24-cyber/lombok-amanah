'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Shield, Clock, Users, MapPin, Phone, Luggage, UserCheck, Wind } from 'lucide-react';
import { T, useLanguage } from '@/lib/language';
import { TourCard } from '@/components/tours/TourCard';
import { TransportBooking } from '@/components/home/TransportBooking';
import { GallerySection } from '@/components/home/GallerySection';
import type { TourPackage, Destination, Vehicle, Review, SiteSettings } from '@/types/database';

interface Props {
  tours: TourPackage[];
  destinations: Destination[];
  vehicles: Vehicle[];
  reviews: Review[];
  settings: SiteSettings;
  galleryPhotos: string[];
}

export function HomeContent({ tours, destinations, vehicles, reviews, settings, galleryPhotos }: Props) {
  const { lang } = useLanguage();
  const featuredTours = tours.filter(t => t.is_featured || t.is_popular).slice(0, 6);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/38675673/pexels-photo-38675673.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Lombok coastline"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/50 to-navy-900/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center pt-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-gold-400/60" />
            <span className="text-gold-400 text-[11px] font-semibold tracking-[0.3em] uppercase">
              {settings.site_name}
            </span>
            <div className="w-10 h-[1px] bg-gold-400/60" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
            <T en="Explore Paradise &">Jelajahi Surga &</T><br />
            <span className="text-gold-gradient"><T en="Unforgettable Adventures">Petualangan Tak Terlupakan</T></span><br />
            <span className="text-3xl sm:text-5xl"><T en="In Lombok Island">Di Pulau Lombok</T></span>
          </h1>

          <p className="text-white/60 max-w-2xl mx-auto mb-10 text-[16px] font-light leading-[1.8]">
            <T en="From hidden waterfalls and pristine beaches to majestic mountains and tropical islands — discover the beauty of Lombok with our professional local team.">
              Dari air terjun tersembunyi dan pantai perawan hingga gunung megah dan pulau tropis — temukan keindahan Lombok bersama tim lokal profesional.
            </T>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tours"
              className="flex items-center gap-2 px-8 py-4 bg-gold-400 text-navy-900 font-bold rounded-full hover:bg-gold-300 transition-all hover:shadow-xl hover:shadow-gold-400/20 active:scale-[0.97] text-[15px]"
            >
              <T en="View Tour Packages">Lihat Paket Tour</T>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-[15px]"
            >
              <Phone className="w-4 h-4" />
              <T en="Contact Us">Hubungi Kami</T>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="bg-navy-900 py-5 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          {[
            { icon: Shield, id: 'Perusahaan Resmi', en: 'Licensed Company' },
            { icon: Users, id: 'Sopir Profesional', en: 'Professional Drivers' },
            { icon: Clock, id: 'Dukungan 24/7', en: '24/7 Support' },
            { icon: Star, id: 'Harga Transparan', en: 'Transparent Pricing' },
          ].map(({ icon: Icon, id, en }) => (
            <div key={id} className="flex items-center gap-2.5">
              <Icon className="w-4 h-4 text-gold-400" />
              <span className="text-[12px] text-white/50 font-medium tracking-wide"><T en={en}>{id}</T></span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 1. FEATURED TOURS ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-gold-400" />
              <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase"><T en="Tour Packages">Paket Tour</T></span>
              <div className="w-10 h-[1px] bg-gold-400" />
            </div>
            <h2 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
              <T en="Our Popular Tours">Tour Populer Kami</T>
            </h2>
            <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
              <T en="Choose our best tour packages. All include professional driver, comfortable vehicle, and fuel.">
                Pilih paket tour terbaik kami. Semua sudah termasuk sopir profesional, kendaraan nyaman, dan BBM.
              </T>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-navy-900/10 text-navy-900 font-semibold rounded-full hover:border-gold-400 hover:text-gold-400 transition-all text-[14px]"
            >
              <T en="View All Tours">Lihat Semua Tour</T>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 2. DESTINATIONS ===== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-gold-400" />
              <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase"><T en="Destinations">Destinasi</T></span>
              <div className="w-10 h-[1px] bg-gold-400" />
            </div>
            <h2 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
              <T en="Popular Destinations">Destinasi Populer</T>
            </h2>
            <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
              <T en="From exotic beaches to rich Sasak culture — explore the best places on Lombok Island.">
                Dari pantai eksotis hingga budaya Sasak yang kaya — jelajahi tempat-tempat terbaik di Pulau Lombok.
              </T>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {destinations.filter(d => d.cover_image).map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations#${dest.slug}`}
                className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden"
              >
                <Image src={dest.cover_image!} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3 h-3 text-gold-400" />
                    <p className="text-gold-400/80 text-[10px] font-medium uppercase tracking-wider">{dest.location}</p>
                  </div>
                  <h3 className="text-white font-bold text-[14px] sm:text-[15px]">{lang === 'en' ? dest.name_en || dest.name : dest.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-navy-900/10 text-navy-900 font-semibold rounded-full hover:border-gold-400 hover:text-gold-400 transition-all text-[14px]"
            >
              <T en="View All Destinations">Lihat Semua Destinasi</T>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 3. VEHICLES ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-gold-400" />
              <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase"><T en="Fleet">Armada</T></span>
              <div className="w-10 h-[1px] bg-gold-400" />
            </div>
            <h2 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
              <T en="Our Vehicles">Kendaraan Kami</T>
            </h2>
            <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
              <T en="All vehicles are well-maintained with experienced, friendly drivers who know every route in Lombok. Your safety and comfort are our top priority.">
                Semua kendaraan terawat prima dengan sopir berpengalaman yang ramah dan menguasai setiap rute di Lombok. Keselamatan dan kenyamanan Anda adalah prioritas utama kami.
              </T>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <article key={v.id} className="bg-white rounded-2xl overflow-hidden border border-navy-900/[0.04] hover:shadow-xl transition-all duration-500">
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  {v.photo && (
                    <Image src={v.photo} alt={v.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  )}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-navy-900 text-white text-[10px] font-bold tracking-[0.15em] uppercase rounded-full">
                    {v.name}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[14px] text-navy-900/50 leading-[1.6] mb-5">{lang === 'en' ? v.description_en || v.description : v.description}</p>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-navy-900/[0.06]">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gold-400" />
                      <span className="text-[13px] text-navy-900/70">{v.seat_capacity} <T en="Passengers">Penumpang</T></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Luggage className="w-4 h-4 text-gold-400" />
                      <span className="text-[13px] text-navy-900/70">{v.luggage_capacity} <T en="Luggage">Bagasi</T></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-gold-400" />
                      <span className="text-[13px] text-navy-900/70"><T en="Pro Driver">Sopir Pro</T></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-gold-400" />
                      <span className="text-[13px] text-navy-900/70"><T en="Cool AC">AC Dingin</T></span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. TRANSPORT BOOKING ===== */}
      <TransportBooking whatsapp={settings.whatsapp} />

      {/* ===== 5. GALLERY ===== */}
      <GallerySection photos={galleryPhotos} />

      {/* ===== REVIEWS ===== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-gold-400" />
              <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase"><T en="Testimonials">Testimoni</T></span>
              <div className="w-10 h-[1px] bg-gold-400" />
            </div>
            <h2 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15]">
              <T en="What They Say">Kata Mereka</T>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <article key={review.id} className="bg-white rounded-2xl p-6 border border-navy-900/[0.04]">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-[14px] text-navy-900/60 leading-[1.7] mb-5">{review.comment}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-navy-900/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center text-gold-400 font-bold text-[14px]">
                    {review.customer?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-navy-900">{review.customer?.name}</p>
                    <p className="text-[11px] text-navy-900/40">{review.customer?.country}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="rounded-3xl overflow-hidden bg-navy-900 px-8 py-16 sm:px-16 sm:py-20 relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-400/[0.06] rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold-400/[0.04] rounded-full blur-[100px]" />

            <div className="relative text-center">
              <h2 className="text-3xl sm:text-[44px] font-display font-bold text-white leading-[1.15] mb-6">
                <T en="Ready to Explore">Siap Menjelajahi</T><br />
                <span className="text-gold-gradient">Lombok?</span>
              </h2>
              <p className="text-white/40 max-w-lg mx-auto mb-10 text-[16px] font-light leading-[1.8]">
                <T en="Contact us now to book a tour or ask questions. Fast response via WhatsApp!">
                  Hubungi kami sekarang untuk booking tour atau tanya-tanya. Respons cepat via WhatsApp!
                </T>
              </p>
              <a
                href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(lang === 'en' ? 'Hello Lombok Nusa Alam Tour & Travel! 🌴\n\nI\'d like to book a tour in Lombok.\nCould you help me with the available packages?\n\nThank you 🙏' : 'Halo Lombok Nusa Alam Tour & Travel! 🌴\n\nSaya ingin booking tour di Lombok.\nBisa dibantu info paket yang tersedia?\n\nTerima kasih 🙏')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4.5 bg-gold-400 text-navy-900 font-semibold rounded-full hover:bg-gold-300 transition-all hover:shadow-xl hover:shadow-gold-400/20 active:scale-[0.97] text-[15px]"
              >
                <Phone className="w-5 h-5" />
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
