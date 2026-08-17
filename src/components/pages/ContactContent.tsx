'use client';

import { Phone, Mail, MapPin, Globe, Clock } from 'lucide-react';
import { T } from '@/lib/language';
import type { SiteSettings } from '@/types/database';

export function ContactContent({ settings }: { settings: SiteSettings }) {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase"><T en="Contact">Kontak</T></span>
            <div className="w-10 h-[1px] bg-gold-400" />
          </div>
          <h1 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
            <T en="Contact Us">Hubungi Kami</T>
          </h1>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
            <T en="We're ready to help you plan the best trip in Lombok.">
              Kami siap membantu Anda merencanakan perjalanan terbaik di Lombok.
            </T>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <a
            href={`https://wa.me/${settings.whatsapp}?text=Halo%20Lombok%20Amanah!`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-6 bg-[#25D366]/5 rounded-2xl border border-[#25D366]/10 hover:border-[#25D366]/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-navy-900 mb-1">WhatsApp</p>
              <p className="text-[14px] text-navy-900/50">+62 819-0785-5550</p>
              <p className="text-[11px] text-[#25D366] font-medium mt-1"><T en="Click to chat directly">Klik untuk chat langsung</T></p>
            </div>
          </a>

          <a
            href={`mailto:${settings.email}`}
            className="group flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-navy-900/[0.04] hover:border-gold-400/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-navy-900 mb-1">Email</p>
              <p className="text-[14px] text-navy-900/50">{settings.email}</p>
            </div>
          </a>

          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-navy-900/[0.04] hover:border-gold-400/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-navy-900 mb-1">Instagram</p>
              <p className="text-[14px] text-navy-900/50">@lomboknusaalam</p>
            </div>
          </a>

          <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-navy-900/[0.04]">
            <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-navy-900 mb-1"><T en="Address">Alamat</T></p>
              <p className="text-[14px] text-navy-900/50 leading-[1.6]">{settings.address}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 p-6 bg-gold-50 rounded-2xl border border-gold-400/10">
          <Clock className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[13px] font-bold text-navy-900 mb-1"><T en="Operating Hours">Jam Operasional</T></p>
            <p className="text-[14px] text-navy-900/50"><T en="Every day, 06:00 - 22:00 WITA (UTC+8)">Setiap hari, 06:00 - 22:00 WITA (UTC+8)</T></p>
            <p className="text-[12px] text-navy-900/30 mt-1">
              <T en="For booking outside operating hours, please send a WhatsApp and we'll reply as soon as possible.">
                Untuk booking di luar jam operasional, silakan kirim WhatsApp dan kami akan membalas secepatnya.
              </T>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
