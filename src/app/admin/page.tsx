import { getAdminStats, getAdminBookings } from '@/lib/data/admin';
import {
  CalendarCheck, Users, Car, MapPin, Package,
  TrendingUp, Clock, AlertCircle, CheckCircle, Loader2,
} from 'lucide-react';

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Pending', color: 'text-yellow-400 bg-yellow-500/10', icon: AlertCircle },
  confirmed: { label: 'Confirmed', color: 'text-blue-400 bg-blue-500/10', icon: CheckCircle },
  assigned: { label: 'Assigned', color: 'text-purple-400 bg-purple-500/10', icon: Users },
  running: { label: 'Running', color: 'text-green-400 bg-green-500/10', icon: Loader2 },
  completed: { label: 'Completed', color: 'text-emerald-400 bg-emerald-500/10', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-400 bg-red-500/10', icon: AlertCircle },
};

export default async function AdminDashboard() {
  const [stats, bookings] = await Promise.all([
    getAdminStats(),
    getAdminBookings(),
  ]);

  const statCards = [
    { label: 'Booking Hari Ini', value: stats.todayBookings, icon: CalendarCheck, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Pending', value: stats.pendingBookings, icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Sedang Berjalan', value: stats.runningBookings, icon: Loader2, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Driver Available', value: stats.availableDrivers, icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Total Tour', value: stats.totalTours, icon: Package, color: 'text-[#C8A45A]', bg: 'bg-[#C8A45A]/10' },
    { label: 'Total Destinasi', value: stats.totalDestinations, icon: MapPin, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Kendaraan', value: stats.totalVehicles, icon: Car, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Pendapatan Bulan Ini', value: `Rp ${stats.monthRevenue.toLocaleString('id-ID')}`, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', wide: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Overview bisnis hari ini</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <div
            key={s.label}
            className={`bg-white/[0.03] border border-white/5 rounded-xl p-4 ${(s as { wide?: boolean }).wide ? 'col-span-2 sm:col-span-3 lg:col-span-2' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-white/40 text-xs">{s.label}</p>
                <p className="text-white text-lg font-bold">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-white font-semibold">Booking Terbaru</h2>
          <a href="/admin/bookings" className="text-[#C8A45A] text-sm hover:underline">Lihat Semua →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/30 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="px-5 py-3 text-left">Kode</th>
                <th className="px-5 py-3 text-left">Customer</th>
                <th className="px-5 py-3 text-left">Tour</th>
                <th className="px-5 py-3 text-left">Tanggal</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((b) => {
                const sc = statusConfig[b.status] || statusConfig.pending;
                return (
                  <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3">
                      <span className="text-[#C8A45A] font-mono text-xs">{b.booking_code}</span>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-white font-medium">{b.customer?.name}</p>
                      <p className="text-white/30 text-xs">{b.customer?.country}</p>
                    </td>
                    <td className="px-5 py-3 text-white/60">{b.tour?.name}</td>
                    <td className="px-5 py-3 text-white/60">{b.booking_date}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${sc.color}`}>
                        <sc.icon className="w-3 h-3" />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-white font-medium">
                      Rp {(b.total_price || 0).toLocaleString('id-ID')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
