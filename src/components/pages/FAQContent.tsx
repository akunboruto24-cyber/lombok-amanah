'use client';

import { Phone } from 'lucide-react';
import { T, useLanguage } from '@/lib/language';
import type { FAQ, SiteSettings } from '@/types/database';

export function FAQContent({ faqs, settings }: { faqs: FAQ[]; settings: SiteSettings }) {
  const { lang } = useLanguage();
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-gold-400" />
            <span className="text-gold-400 text-[11px] font-semibold tracking-[0.25em] uppercase">FAQ</span>
            <div className="w-10 h-[1px] bg-gold-400" />
          </div>
          <h1 className="text-3xl sm:text-[44px] font-display font-bold text-navy-900 leading-[1.15] mb-5">
            <T en="Frequently Asked Questions">Pertanyaan Umum</T>
          </h1>
          <p className="text-navy-900/50 text-[16px] font-light leading-[1.7]">
            <T en="Frequently asked questions about our tours and transport services.">
              Pertanyaan yang sering diajukan tentang layanan tour dan transport kami.
            </T>
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq) => (
            <details key={faq.id} className="group bg-slate-50 rounded-2xl border border-navy-900/[0.04] overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer text-[15px] font-semibold text-navy-900 hover:text-gold-400 transition-colors list-none">
                {lang === 'en' ? faq.question_en : faq.question}
                <span className="text-gold-400 text-xl font-light ml-4 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-[14px] text-navy-900/50 leading-[1.8]">{lang === 'en' ? faq.answer_en : faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="text-center bg-slate-50 rounded-2xl p-8 border border-navy-900/[0.04]">
          <p className="text-[15px] text-navy-900/60 mb-4"><T en="Still have questions?">Masih ada pertanyaan?</T></p>
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(lang === 'en' ? 'Hello Lombok Nusa Alam Tour & Travel! 🌴\n\nI have a question about your tour & transport services in Lombok.\n\nThank you 🙏' : 'Halo Lombok Nusa Alam Tour & Travel! 🌴\n\nSaya ada pertanyaan mengenai layanan tour & transport di Lombok.\n\nTerima kasih 🙏')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-400 text-navy-900 font-bold rounded-full hover:bg-gold-300 transition-all text-[14px]"
          >
            <Phone className="w-4 h-4" />
            <T en="Ask via WhatsApp">Tanya via WhatsApp</T>
          </a>
        </div>
      </div>
    </div>
  );
}
