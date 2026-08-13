import type { Metadata } from 'next';
import { getSettings } from '@/lib/data';
import { ContactContent } from '@/components/pages/ContactContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Hubungi Lombok Amanah Tour & Travel untuk booking tour dan transport di Lombok.',
};

export default async function ContactPage() {
  const settings = await getSettings();
  return <ContactContent settings={settings} />;
}
