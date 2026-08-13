import { getTourPackages, getDestinations, getVehicles, getReviews, getSettings } from '@/lib/data';
import { HomeContent } from '@/components/home/HomeContent';
import { TransportBooking } from '@/components/home/TransportBooking';

export default async function HomePage() {
  const [tours, destinations, vehicles, reviews, settings] = await Promise.all([
    getTourPackages({ limit: 6 }),
    getDestinations({ limit: 12 }),
    getVehicles(),
    getReviews({ limit: 3 }),
    getSettings(),
  ]);

  return (
    <>
      <HomeContent
        tours={tours}
        destinations={destinations}
        vehicles={vehicles}
        reviews={reviews}
        settings={settings}
      />
      <TransportBooking whatsapp={settings.whatsapp} />
    </>
  );
}
