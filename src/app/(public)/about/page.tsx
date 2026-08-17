import type { Metadata } from 'next';
import { getSettings } from '@/lib/data';
import { AboutContent } from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Lombok Nusa Alam Tour & Travel — jasa tour, transport, dan perjalanan wisata profesional di Pulau Lombok.',
};

export default async function AboutPage() {
  const settings = await getSettings();
  return <AboutContent settings={settings} />;
}
