import type { Metadata } from 'next';
import { getTourPackages } from '@/lib/data';
import { ToursContent } from '@/components/pages/ToursContent';

export const metadata: Metadata = {
  title: 'Tour Packages',
  description: 'Pilih paket tour terbaik di Lombok. Daily tour, airport transfer, car charter, dan custom tour.',
};

export default async function ToursPage() {
  const tours = await getTourPackages();
  return <ToursContent tours={tours} />;
}
