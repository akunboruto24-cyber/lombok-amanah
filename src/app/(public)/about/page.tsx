import type { Metadata } from 'next';
import { Shield, Users, Clock, Star, Car, MapPin, Phone } from 'lucide-react';
import { getSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Lombok Amanah Tour & Travel — jasa tour, transport, dan perjalanan wisata profesional di Pulau Lombok.',
};

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase">Tentang Kami / About Us</span>
            <div className="w-10 h-[1px] bg-gold-400" />
          </div>
          <h1 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-6">
            Lombok Amanah Tour &amp; Travel
          </h1>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.8]">
            Kami adalah perusahaan jasa tour dan transportasi yang berpengalaman di Pulau Lombok, Nusa Tenggara Barat. Kami mengutamakan kenyamanan, keamanan, dan kepuasan pelanggan dalam setiap perjalanan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Shield, title: 'Perusahaan Resmi / Licensed Company', desc: 'Terdaftar resmi sebagai perusahaan tour dan travel di Nusa Tenggara Barat.' },
            { icon: Users, title: 'Sopir Profesional / Professional Drivers', desc: 'Semua sopir kami berlisensi, berpengalaman, ramah, dan menguasai setiap rute di Lombok.' },
            { icon: Car, title: 'Armada Terawat / Well-Maintained Fleet', desc: 'Kendaraan kami selalu dalam kondisi prima — bersih, ber-AC, dan siap jalan.' },
            { icon: Clock, title: 'Dukungan 24/7 / 24/7 Support', desc: 'Tim kami siap membantu Anda kapan saja, sebelum, selama, dan setelah perjalanan.' },
            { icon: Star, title: 'Harga Transparan / Transparent Pricing', desc: 'Tidak ada biaya tersembunyi. Harga yang kami tawarkan sudah termasuk sopir, BBM, dan kendaraan.' },
            { icon: MapPin, title: 'Pengetahuan Lokal / Local Expertise', desc: 'Sebagai warga lokal Lombok, kami tahu tempat-tempat terbaik yang jarang dikunjungi wisatawan biasa.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 bg-slate-50 rounded-2xl border border-navy-900/[0.04]">
              <Icon className="w-6 h-6 text-gold-400 mb-4" />
              <h3 className="text-[15px] font-bold text-navy-900 mb-2">{title}</h3>
              <p className="text-[13px] text-navy-900/50 leading-[1.7]">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-navy-900 rounded-3xl px-8 py-14 sm:px-16">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
            Siap Menjelajahi Lombok?
          </h2>
          <p className="text-white/40 mb-8 text-[15px]">
            Hubungi kami sekarang untuk booking tour atau tanya-tanya.
          </p>
          <a
            href={`https://wa.me/${settings.whatsapp}?text=Halo%20Lombok%20Amanah!%20Saya%20ingin%20tanya%20tentang%20tour.`}
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
