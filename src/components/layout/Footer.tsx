'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { T } from '@/lib/language';
import type { SiteSettings } from '@/types/database';

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-navy-900 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-14">
          <div>
            <div className="flex flex-col leading-none mb-5">
              <span className="text-[20px] font-display font-bold text-white tracking-[0.02em]">
                LOMBOK <span className="text-gold-400">NUSA ALAM</span>
              </span>
              <span className="text-[9px] font-medium text-white/25 tracking-[0.25em] uppercase mt-1.5">
                Tour And Travel
              </span>
            </div>
            <p className="text-[13px] text-white/30 leading-[1.7]">
              <T en="Professional tour, transport, and travel services on Lombok Island, West Nusa Tenggara.">
                Jasa tour, transport, dan perjalanan wisata profesional di Pulau Lombok, Nusa Tenggara Barat.
              </T>
            </p>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-white/60 tracking-[0.1em] uppercase mb-5">
              <T en="Tour Packages">Paket Tour</T>
            </h4>
            <ul className="space-y-3">
              {[
                { id: 'Tour Harian', en: 'Daily Tour' },
                { id: 'Transfer Bandara', en: 'Airport Transfer' },
                { id: 'Sewa Mobil', en: 'Car Charter' },
                { id: 'Tour Custom', en: 'Custom Tour' },
              ].map((item) => (
                <li key={item.id}>
                  <Link href="/tours" className="text-[13px] text-white/30 hover:text-gold-400 transition-colors">
                    <T en={item.en}>{item.id}</T>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-white/60 tracking-[0.1em] uppercase mb-5">
              <T en="Destinations">Destinasi</T>
            </h4>
            <ul className="space-y-3">
              {['Kuta Mandalika', 'Senggigi', 'Gili Islands', 'Pink Beach', 'Sembalun', 'Sekotong'].map((item) => (
                <li key={item}>
                  <Link href="/destinations" className="text-[13px] text-white/30 hover:text-gold-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-white/60 tracking-[0.1em] uppercase mb-5">
              <T en="Contact">Kontak</T>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/30 hover:text-gold-400 transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Globe className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/30 hover:text-gold-400 transition-colors">
                  @lomboknusaalam
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-[13px] text-white/30 hover:text-gold-400 transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-[13px] text-white/30 leading-[1.7]">
                  {settings.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/20">&copy; 2026 Lombok Nusa Alam Tour &amp; Travel. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/faq" className="text-[12px] text-white/20 hover:text-gold-400 transition-colors">FAQ</Link>
            <Link href="/about" className="text-[12px] text-white/20 hover:text-gold-400 transition-colors"><T en="About">Tentang</T></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
