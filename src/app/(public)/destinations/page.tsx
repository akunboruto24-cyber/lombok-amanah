import type { Metadata } from 'next';
import { getDestinations } from '@/lib/data';
import { DestinationsContent } from '@/components/pages/DestinationsContent';

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Jelajahi destinasi wisata terbaik di Pulau Lombok — pantai, gunung, air terjun, budaya, dan pulau.',
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  return <DestinationsContent destinations={destinations} />;
}
