import { getAdminBookings, getAdminDrivers } from '@/lib/data/admin';
import { BookingTable } from '@/components/admin/BookingTable';

export default async function AdminBookingsPage() {
  const [bookings, drivers] = await Promise.all([
    getAdminBookings(),
    getAdminDrivers(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Booking Management</h1>
        <p className="text-white/40 text-sm mt-1">Kelola semua booking masuk</p>
      </div>
      <BookingTable bookings={bookings} drivers={drivers} />
    </div>
  );
}
