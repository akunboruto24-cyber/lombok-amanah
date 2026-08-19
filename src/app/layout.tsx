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
    default: 'Lombok Nusa Alam Tour & Travel — Private Tours, Transfers & Island Experiences',
    template: '%s | Lombok Nusa Alam Tour & Travel',
  },
  description: 'Lombok Nusa Alam Tour & Travel — Professional tour, transport & travel services in Lombok Island, Indonesia. Private tours, airport transfers, island hopping, waterfall tours. Jasa tour & transport profesional di Pulau Lombok, NTB.',
  keywords: [
    'lombok tour', 'lombok travel', 'tour lombok', 'transport lombok',
    'private transfer lombok', 'lombok island tour', 'lombok tour package',
    'lombok private driver', 'lombok airport transfer', 'lombok day tour',
    'gili islands tour', 'pink beach lombok', 'kuta lombok tour',
    'senggigi tour', 'sembalun tour', 'rinjani tour',
    'lombok waterfall tour', 'sasak village tour', 'lombok beach tour',
    'wisata lombok', 'paket tour lombok', 'sewa mobil lombok',
    'lombok nusa alam', 'lomboknusaalam',
  ],
  metadataBase: new URL('https://lomboknusaalam.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: 'en_US',
    siteName: 'Lombok Nusa Alam Tour & Travel',
    title: 'Lombok Nusa Alam Tour & Travel — Private Tours & Island Experiences',
    description: 'Professional tour & transport services in Lombok Island. Private tours, airport transfers, island hopping from $53/group.',
    url: 'https://lomboknusaalam.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lombok Nusa Alam Tour & Travel',
    description: 'Private tours & transport in Lombok Island from $53/group. Airport transfers, island hopping, waterfall tours.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GOOGLE_VERIFICATION_CODE',
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'Lombok Nusa Alam Tour & Travel',
              url: 'https://lomboknusaalam.com',
              telephone: '+62821-4332-571',
              email: 'lomboknusalam@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Jl. Raya Tanjung, Kekait',
                addressLocality: 'Gunungsari',
                addressRegion: 'Lombok Barat, NTB',
                postalCode: '83351',
                addressCountry: 'ID',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -8.5569,
                longitude: 116.0773,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '06:00',
                closes: '22:00',
              },
              priceRange: '$53 - $125',
              areaServed: {
                '@type': 'Place',
                name: 'Lombok Island, Indonesia',
              },
              description: 'Professional tour, transport & travel services in Lombok Island, Indonesia. Private tours, airport transfers, island hopping.',
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-screen font-body antialiased">
        <PublicShell settings={settings}>{children}</PublicShell>
      </body>
    </html>
  );
}
