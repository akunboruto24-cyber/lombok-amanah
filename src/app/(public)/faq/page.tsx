import type { Metadata } from 'next';
import { getFAQs, getSettings } from '@/lib/data';
import { FAQContent } from '@/components/pages/FAQContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Pertanyaan yang sering diajukan tentang tour dan transport di Lombok.',
};

export default async function FAQPage() {
  const [faqs, settings] = await Promise.all([getFAQs(), getSettings()]);
  return <FAQContent faqs={faqs} settings={settings} />;
}
