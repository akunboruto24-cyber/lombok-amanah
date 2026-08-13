import { getTourPackages, getVehicles } from '@/lib/data';
import { BookingFormPage } from '@/components/booking/BookingFormPage';

export const metadata = {
  title: 'Booking Online',
  description: 'Pesan tour dan transport di Lombok secara online',
};

export default async function BookingPage() {
  const [tours, vehicles] = await Promise.all([
    getTourPackages(),
    getVehicles(),
  ]);

  return <BookingFormPage tours={tours} vehicles={vehicles} />;
}
