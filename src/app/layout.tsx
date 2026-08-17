import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { PublicShell } from '@/components/layout/PublicShell';
import { getSettings } from '@/lib/data';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Lombok Nusa Alam Tour & Travel — Private Transfers & Island Experiences',
    template: '%s | Lombok Nusa Alam Tour & Travel',
  },
  description: 'Lombok Nusa Alam Tour & Travel — Jasa tour, transport, dan perjalanan wisata profesional di Pulau Lombok, NTB.',
  keywords: ['lombok tour', 'lombok travel', 'tour lombok', 'transport lombok', 'private transfer lombok'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Lombok Nusa Alam Tour & Travel',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-body antialiased">
        <PublicShell settings={settings}>{children}</PublicShell>
      </body>
    </html>
  );
}
