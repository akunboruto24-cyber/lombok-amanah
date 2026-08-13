import { tourPackages, destinations, vehicles, reviews } from './seed';
import type { Booking, Driver } from '@/types/database';

// Seed data untuk admin — nanti diganti Supabase queries

const sampleDrivers: Driver[] = [
  {
    id: 'drv-001', name: 'Ahmad Fauzi', phone: '6281234567890', photo: null,
    license_number: 'SIM-A 1234567890', languages: ['id', 'en'],
    experience_years: 8, rating: 4.9, total_trips: 342, fee_per_trip: 150000,
    status: 'available', is_active: true,
  },
  {
    id: 'drv-002', name: 'Budi Santoso', phone: '6289876543210', photo: null,
    license_number: 'SIM-A 0987654321', languages: ['id'],
    experience_years: 5, rating: 4.7, total_trips: 218, fee_per_trip: 130000,
    status: 'available', is_active: true,
  },
  {
    id: 'drv-003', name: 'Made Surya', phone: '6281555666777', photo: null,
    license_number: 'SIM-A 5556667778', languages: ['id', 'en', 'jp'],
    experience_years: 12, rating: 5.0, total_trips: 567, fee_per_trip: 180000,
    status: 'busy', is_active: true,
  },
  {
    id: 'drv-004', name: 'Rizal Hidayat', phone: '6282111222333', photo: null,
    license_number: 'SIM-A 2111222333', languages: ['id'],
    experience_years: 3, rating: 4.5, total_trips: 89, fee_per_trip: 120000,
    status: 'off', is_active: true,
  },
];

const sampleBookings: Booking[] = [
  {
    id: 'bk-001', booking_code: 'LA-20260810-0001',
    customer_id: 'c1', tour_id: 'tour-001', vehicle_id: 'veh-001', driver_id: 'drv-003',
    booking_date: '2026-08-12', pickup_time: '08:00', pickup_location: 'Hotel Katamaran Senggigi',
    passenger_count: 3, special_request: null,
    package_price: 800000, driver_fee: 180000, fuel_cost: 100000, parking_cost: 30000, operational_cost: null,
    discount: 0, total_price: 800000, deposit_amount: 240000, remaining_amount: 560000,
    status: 'confirmed', payment_status: 'deposit_paid', notes: null,
    customer: { id: 'c1', name: 'Sarah Mitchell', email: 'sarah@email.com', phone: '+61412345678', country: 'Australia', language: 'en' },
    tour: tourPackages.find(t => t.id === 'tour-001'),
  },
  {
    id: 'bk-002', booking_code: 'LA-20260810-0002',
    customer_id: 'c2', tour_id: 'tour-002', vehicle_id: 'veh-002', driver_id: null,
    booking_date: '2026-08-13', pickup_time: '08:00', pickup_location: 'Villa Ombak Kuta',
    passenger_count: 2, special_request: 'Need child seat for 3yo',
    package_price: 800000, driver_fee: null, fuel_cost: null, parking_cost: null, operational_cost: null,
    discount: 0, total_price: 800000, deposit_amount: null, remaining_amount: 800000,
    status: 'pending', payment_status: 'unpaid', notes: null,
    customer: { id: 'c2', name: 'Thomas Weber', email: 'thomas@email.com', phone: '+49171234567', country: 'Germany', language: 'en' },
    tour: tourPackages.find(t => t.id === 'tour-002'),
  },
  {
    id: 'bk-003', booking_code: 'LA-20260809-0003',
    customer_id: 'c3', tour_id: 'tour-004', vehicle_id: 'veh-001', driver_id: 'drv-001',
    booking_date: '2026-08-10', pickup_time: '07:00', pickup_location: 'Hotel Lombok Raya Mataram',
    passenger_count: 4, special_request: null,
    package_price: 850000, driver_fee: 150000, fuel_cost: 120000, parking_cost: 40000, operational_cost: null,
    discount: 0, total_price: 850000, deposit_amount: 850000, remaining_amount: 0,
    status: 'running', payment_status: 'fully_paid', notes: null,
    customer: { id: 'c3', name: 'Rizal Pratama', email: null, phone: '+6281234567890', country: 'Indonesia', language: 'id' },
    tour: tourPackages.find(t => t.id === 'tour-004'),
  },
  {
    id: 'bk-004', booking_code: 'LA-20260808-0004',
    customer_id: 'c4', tour_id: 'tour-009', vehicle_id: 'veh-001', driver_id: 'drv-002',
    booking_date: '2026-08-09', pickup_time: '07:00', pickup_location: 'Novotel Lombok',
    passenger_count: 2, special_request: null,
    package_price: 900000, driver_fee: 130000, fuel_cost: 150000, parking_cost: 20000, operational_cost: null,
    discount: 0, total_price: 900000, deposit_amount: 900000, remaining_amount: 0,
    status: 'completed', payment_status: 'fully_paid', notes: 'Guest very satisfied',
    customer: { id: 'c4', name: 'Yuki Tanaka', email: 'yuki@email.com', phone: '+81901234567', country: 'Japan', language: 'en' },
    tour: tourPackages.find(t => t.id === 'tour-009'),
  },
];

export async function getAdminStats() {
  const today = new Date().toISOString().split('T')[0];
  return {
    totalBookings: sampleBookings.length,
    pendingBookings: sampleBookings.filter(b => b.status === 'pending').length,
    todayBookings: sampleBookings.filter(b => b.booking_date === today).length,
    runningBookings: sampleBookings.filter(b => b.status === 'running').length,
    totalDrivers: sampleDrivers.length,
    availableDrivers: sampleDrivers.filter(d => d.status === 'available').length,
    totalTours: tourPackages.filter(t => t.status === 'active').length,
    totalDestinations: destinations.filter(d => d.is_active).length,
    totalVehicles: vehicles.filter(v => v.is_active).length,
    totalReviews: reviews.filter(r => r.is_approved).length,
    monthRevenue: sampleBookings
      .filter(b => b.payment_status === 'fully_paid')
      .reduce((sum, b) => sum + (b.total_price || 0), 0),
  };
}

export async function getAdminBookings(): Promise<Booking[]> {
  return sampleBookings.sort((a, b) =>
    new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
  );
}

export async function getAdminDrivers(): Promise<Driver[]> {
  return sampleDrivers;
}

export async function getAdminBookingById(id: string): Promise<Booking | null> {
  return sampleBookings.find(b => b.id === id) || null;
}
