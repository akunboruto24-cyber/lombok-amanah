import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Globe, Clock } from 'lucide-react';
import { getSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Hubungi Lombok Amanah Tour & Travel untuk booking tour dan transport di Lombok.',
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase">Kontak / Contact</span>
            <div className="w-10 h-[1px] bg-gold-400" />
          </div>
          <h1 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
            Hubungi Kami
          </h1>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-[16px] font-light leading-[1.7]">
            Kami siap membantu Anda merencanakan perjalanan terbaik di Lombok.<br />
            <span className="text-navy-900/30 text-[14px]">We&apos;re ready to help you plan the best trip in Lombok.</span>
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
              <p className="text-[11px] text-[#25D366] font-medium mt-1">Klik untuk chat langsung</p>
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
              <p className="text-[14px] text-navy-900/50">@lombokamanahtour</p>
            </div>
          </a>

          <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-navy-900/[0.04]">
            <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-navy-900 mb-1">Alamat / Address</p>
              <p className="text-[14px] text-navy-900/50 leading-[1.6]">{settings.address}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 p-6 bg-gold-50 rounded-2xl border border-gold-400/10">
          <Clock className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[13px] font-bold text-navy-900 mb-1">Jam Operasional / Operating Hours</p>
            <p className="text-[14px] text-navy-900/50">Setiap hari, 06:00 - 22:00 WITA (UTC+8)</p>
            <p className="text-[12px] text-navy-900/30 mt-1">Untuk booking di luar jam operasional, silakan kirim WhatsApp dan kami akan membalas secepatnya.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
