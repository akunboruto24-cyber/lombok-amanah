'use client';

import { Shield, Users, Clock, Star, Car, MapPin, Phone } from 'lucide-react';
import { T, useLanguage } from '@/lib/language';
import type { SiteSettings } from '@/types/database';

export function AboutContent({ settings }: { settings: SiteSettings }) {
  const { lang } = useLanguage();
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase"><T en="About Us">Tentang Kami</T></span>
            <div className="w-10 h-[1px] bg-gold-400" />
          </div>
          <h1 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-6">
            Lombok Nusa Alam Tour &amp; Travel
          </h1>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.8]">
            <T en="We are an experienced tour and transportation company on Lombok Island, West Nusa Tenggara. We prioritize comfort, safety, and customer satisfaction in every journey.">
              Kami adalah perusahaan jasa tour dan transportasi yang berpengalaman di Pulau Lombok, Nusa Tenggara Barat. Kami mengutamakan kenyamanan, keamanan, dan kepuasan pelanggan dalam setiap perjalanan.
            </T>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Shield, id: 'Perusahaan Resmi', en: 'Licensed Company', descId: 'Terdaftar resmi sebagai perusahaan tour dan travel di Nusa Tenggara Barat.', descEn: 'Officially registered as a tour and travel company in West Nusa Tenggara.' },
            { icon: Users, id: 'Sopir Profesional', en: 'Professional Drivers', descId: 'Semua sopir kami berlisensi, berpengalaman, ramah, dan menguasai setiap rute di Lombok.', descEn: 'All our drivers are licensed, experienced, friendly, and know every route in Lombok.' },
            { icon: Car, id: 'Armada Terawat', en: 'Well-Maintained Fleet', descId: 'Kendaraan kami selalu dalam kondisi prima — bersih, ber-AC, dan siap jalan.', descEn: 'Our vehicles are always in top condition — clean, air-conditioned, and road-ready.' },
            { icon: Clock, id: 'Dukungan 24/7', en: '24/7 Support', descId: 'Tim kami siap membantu Anda kapan saja, sebelum, selama, dan setelah perjalanan.', descEn: 'Our team is ready to help you anytime — before, during, and after your trip.' },
            { icon: Star, id: 'Harga Transparan', en: 'Transparent Pricing', descId: 'Tidak ada biaya tersembunyi. Harga yang kami tawarkan sudah termasuk sopir, BBM, dan kendaraan.', descEn: 'No hidden fees. Our prices include driver, fuel, and vehicle.' },
            { icon: MapPin, id: 'Pengetahuan Lokal', en: 'Local Expertise', descId: 'Sebagai warga lokal Lombok, kami tahu tempat-tempat terbaik yang jarang dikunjungi wisatawan biasa.', descEn: 'As Lombok locals, we know the best places rarely visited by ordinary tourists.' },
          ].map(({ icon: Icon, id, en, descId, descEn }) => (
            <div key={id} className="p-6 bg-slate-50 rounded-2xl border border-navy-900/[0.04]">
              <Icon className="w-6 h-6 text-gold-400 mb-4" />
              <h3 className="text-[15px] font-bold text-navy-900 mb-2"><T en={en}>{id}</T></h3>
              <p className="text-[13px] text-navy-900/50 leading-[1.7]"><T en={descEn}>{descId}</T></p>
            </div>
          ))}
        </div>

        <div className="text-center bg-navy-900 rounded-3xl px-8 py-14 sm:px-16">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
            <T en="Ready to Explore Lombok?">Siap Menjelajahi Lombok?</T>
          </h2>
          <p className="text-white/40 mb-8 text-[15px]">
            <T en="Contact us now to book a tour or ask questions.">Hubungi kami sekarang untuk booking tour atau tanya-tanya.</T>
          </p>
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(lang === 'en' ? 'Hello Lombok Nusa Alam Tour & Travel! 🌴\n\nI\'m interested in your tour services in Lombok.\nCould you share more details?\n\nThank you 🙏' : 'Halo Lombok Nusa Alam Tour & Travel! 🌴\n\nSaya tertarik dengan layanan tour di Lombok.\nBisa info lebih lanjut?\n\nTerima kasih 🙏')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold-400 text-navy-900 font-bold rounded-full hover:bg-gold-300 transition-all text-[15px]"
          >
            <Phone className="w-5 h-5" />
            Chat WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
