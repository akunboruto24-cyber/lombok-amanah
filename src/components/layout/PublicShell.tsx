'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppFloat } from './WhatsAppFloat';
import { LanguageProvider } from '@/lib/language';
import type { SiteSettings } from '@/types/database';

export function PublicShell({ children, settings }: { children: React.ReactNode; settings: SiteSettings }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <div className="bg-white text-[#0F172A]">
        <Navbar />
        <main>{children}</main>
        <Footer settings={settings} />
        <WhatsAppFloat whatsapp={settings.whatsapp} />
      </div>
    </LanguageProvider>
  );
}
