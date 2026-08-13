import type { Metadata } from 'next';
import './globals.css';
import { PublicShell } from '@/components/layout/PublicShell';
import { getSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: {
    default: 'Lombok Amanah Tour & Travel — Private Transfers & Island Experiences',
    template: '%s | Lombok Amanah Tour & Travel',
  },
  description: 'Lombok Amanah Tour & Travel — Jasa tour, transport, dan perjalanan wisata profesional di Pulau Lombok, NTB.',
  keywords: ['lombok tour', 'lombok travel', 'tour lombok', 'transport lombok', 'private transfer lombok'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Lombok Amanah Tour & Travel',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-body antialiased">
        <PublicShell settings={settings}>{children}</PublicShell>
      </body>
    </html>
  );
}
