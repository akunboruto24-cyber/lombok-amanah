import Link from 'next/link';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-14">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-none mb-5">
              <span className="text-[20px] font-display font-bold text-white tracking-[0.02em]">
                LOMBOK <span className="text-gold-400">AMANAH</span>
              </span>
              <span className="text-[9px] font-medium text-white/25 tracking-[0.25em] uppercase mt-1.5">
                Tour And Travel
              </span>
            </div>
            <p className="text-[13px] text-white/30 leading-[1.7]">
              Jasa tour, transport, dan perjalanan wisata profesional di Pulau Lombok, Nusa Tenggara Barat.
            </p>
          </div>

          {/* Tours */}
          <div>
            <h4 className="text-[13px] font-semibold text-white/60 tracking-[0.1em] uppercase mb-5">Tour Packages</h4>
            <ul className="space-y-3">
              {['Daily Tour', 'Airport Transfer', 'Car Charter', 'Custom Tour'].map((item) => (
                <li key={item}>
                  <Link href="/tours" className="text-[13px] text-white/30 hover:text-gold-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-[13px] font-semibold text-white/60 tracking-[0.1em] uppercase mb-5">Destinations</h4>
            <ul className="space-y-3">
              {['Kuta Mandalika', 'Senggigi', 'Gili Islands', 'Pink Beach', 'Sembalun', 'Sekotong'].map((item) => (
                <li key={item}>
                  <Link href="/destinations" className="text-[13px] text-white/30 hover:text-gold-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[13px] font-semibold text-white/60 tracking-[0.1em] uppercase mb-5">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <a href="https://wa.me/6281907855550" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/30 hover:text-gold-400 transition-colors">
                  +62 819-0785-5550
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Globe className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <a href="https://instagram.com/lombokamanahtour" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/30 hover:text-gold-400 transition-colors">
                  @lombokamanahtour
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@lombokamanahtour.com" className="text-[13px] text-white/30 hover:text-gold-400 transition-colors">
                  hello@lombokamanahtour.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-[13px] text-white/30 leading-[1.7]">
                  Jl. Raya Senggigi No. 123<br />West Lombok, NTB 83355
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/20">&copy; 2026 Lombok Amanah Tour &amp; Travel. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/faq" className="text-[12px] text-white/20 hover:text-gold-400 transition-colors">FAQ</Link>
            <Link href="/about" className="text-[12px] text-white/20 hover:text-gold-400 transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
