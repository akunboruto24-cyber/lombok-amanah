import fs from 'fs';
import path from 'path';
import { getTourPackages, getDestinations, getVehicles, getReviews, getSettings } from '@/lib/data';
import { HomeContent } from '@/components/home/HomeContent';
import { TransportBooking } from '@/components/home/TransportBooking';

function getGalleryPhotos(): string[] {
  const dir = path.join(process.cwd(), 'public', 'gallery');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f)).sort();
}

export default async function HomePage() {
  const [tours, destinations, vehicles, reviews, settings] = await Promise.all([
    getTourPackages({ limit: 6 }),
    getDestinations({ limit: 12 }),
    getVehicles(),
    getReviews({ limit: 3 }),
    getSettings(),
  ]);

  const galleryPhotos = getGalleryPhotos();

  return (
    <>
      <HomeContent
        tours={tours}
        destinations={destinations}
        vehicles={vehicles}
        reviews={reviews}
        settings={settings}
        galleryPhotos={galleryPhotos}
      />
      <TransportBooking whatsapp={settings.whatsapp} />
    </>
  );
}
