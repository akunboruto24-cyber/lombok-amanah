'use client';

import { MessageCircle } from 'lucide-react';

const defaultMsg = `Halo Lombok Nusa Alam Tour & Travel! 🌴

Saya tertarik dengan layanan tour & transport di Lombok.
Boleh info paket dan harganya?

Terima kasih 🙏`;

export function WhatsAppFloat({ whatsapp }: { whatsapp: string }) {
  return (
    <a
      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(defaultMsg)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-7 right-7 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#25D366] text-white font-semibold rounded-full shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/35 hover:scale-105 transition-all active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-[13px] tracking-wide">Chat WhatsApp</span>
    </a>
  );
}
