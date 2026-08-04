import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Shield, Clock, Users, Car, MapPin, Phone, Luggage, UserCheck, Wind } from 'lucide-react';
import { getTourPackages, getDestinations, getVehicles, getReviews, getSettings } from '@/lib/data';
import { TourCard } from '@/components/tours/TourCard';
import { TransportBooking } from '@/components/home/TransportBooking';

export default async function HomePage() {
  const [tours, destinations, vehicles, reviews, settings] = await Promise.all([
    getTourPackages({ limit: 6 }),
    getDestinations({ limit: 12 }),
    getVehicles(),
    getReviews({ limit: 3 }),
    getSettings(),
  ]);

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
            Explore Paradise &<br />
            <span className="text-gold-gradient">Unforgettable Adventures</span><br />
            <span className="text-3xl sm:text-5xl">In Lombok Island</span>
          </h1>

          <p className="text-white/60 max-w-2xl mx-auto mb-10 text-[16px] font-light leading-[1.8]">
            Dari air terjun tersembunyi dan pantai perawan hingga gunung megah dan pulau tropis — temukan keindahan Lombok bersama tim lokal profesional.
            <br />
            <span className="text-white/40 text-[14px]">
              From hidden waterfalls and pristine beaches to majestic mountains and tropical islands — discover the beauty of Lombok with our professional local team.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tours"
              className="flex items-center gap-2 px-8 py-4 bg-gold-400 text-navy-900 font-bold rounded-full hover:bg-gold-300 transition-all hover:shadow-xl hover:shadow-gold-400/20 active:scale-[0.97] text-[15px]"
            >
              Lihat Paket Tour
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-[15px]"
            >
              <Phone className="w-4 h-4" />
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="bg-navy-900 py-5 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          {[
            { icon: Shield, text: 'Perusahaan Resmi' },
            { icon: Users, text: 'Sopir Profesional' },
            { icon: Clock, text: '24/7 Support' },
            { icon: Star, text: 'Harga Transparan' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5">
              <Icon className="w-4 h-4 text-gold-400" />
              <span className="text-[12px] text-white/50 font-medium tracking-wide">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED TOURS ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-gold-400" />
              <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase">Paket Tour</span>
              <div className="w-10 h-[1px] bg-gold-400" />
            </div>
            <h2 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
              Tour Populer Kami
            </h2>
            <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
              Pilih paket tour terbaik kami. Semua sudah termasuk sopir profesional, kendaraan nyaman, dan BBM.
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
              Lihat Semua Tour
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== VEHICLES ===== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-gold-400" />
              <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase">Armada</span>
              <div className="w-10 h-[1px] bg-gold-400" />
            </div>
            <h2 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
              Kendaraan Kami
            </h2>
            <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
              Semua kendaraan terawat prima dengan sopir berpengalaman yang ramah dan menguasai setiap rute di Lombok. Keselamatan dan kenyamanan Anda adalah prioritas utama kami.
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
                  <p className="text-[14px] text-navy-900/50 leading-[1.6] mb-5">{v.description}</p>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-navy-900/[0.06]">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gold-400" />
                      <span className="text-[13px] text-navy-900/70">{v.seat_capacity} Penumpang</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Luggage className="w-4 h-4 text-gold-400" />
                      <span className="text-[13px] text-navy-900/70">{v.luggage_capacity} Bagasi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-gold-400" />
                      <span className="text-[13px] text-navy-900/70">Sopir Pro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-gold-400" />
                      <span className="text-[13px] text-navy-900/70">AC Dingin</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRANSPORT BOOKING ===== */}
      <TransportBooking whatsapp={settings.whatsapp} />

      {/* ===== DESTINATIONS ===== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-gold-400" />
              <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase">Destinasi</span>
              <div className="w-10 h-[1px] bg-gold-400" />
            </div>
            <h2 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
              Destinasi Populer
            </h2>
            <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
              Dari pantai eksotis hingga budaya Sasak yang kaya — jelajahi tempat-tempat terbaik di Pulau Lombok.
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
                  <h3 className="text-white font-bold text-[14px] sm:text-[15px]">{dest.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-navy-900/10 text-navy-900 font-semibold rounded-full hover:border-gold-400 hover:text-gold-400 transition-all text-[14px]"
            >
              Lihat Semua Destinasi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-gold-400" />
              <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase">Testimoni</span>
              <div className="w-10 h-[1px] bg-gold-400" />
            </div>
            <h2 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15]">
              Kata Mereka
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
                Siap Menjelajahi<br />
                <span className="text-gold-gradient">Lombok?</span>
              </h2>
              <p className="text-white/40 max-w-lg mx-auto mb-10 text-[16px] font-light leading-[1.8]">
                Hubungi kami sekarang untuk booking tour atau tanya-tanya. Respons cepat via WhatsApp!
              </p>
              <a
                href={`https://wa.me/${settings.whatsapp}?text=Halo%20Lombok%20Amanah!%20Saya%20ingin%20booking%20tour.`}
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
