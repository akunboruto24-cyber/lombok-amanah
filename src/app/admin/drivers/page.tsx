import { getAdminDrivers } from '@/lib/data/admin';
import { DriverList } from '@/components/admin/DriverList';

export default async function AdminDriversPage() {
  const drivers = await getAdminDrivers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Driver Management</h1>
          <p className="text-white/40 text-sm mt-1">Kelola semua driver</p>
        </div>
        <button className="px-4 py-2.5 bg-[#C8A45A] text-[#0F172A] text-sm font-bold rounded-xl hover:bg-[#d4b06a] transition-all">
          + Tambah Driver
        </button>
      </div>
      <DriverList drivers={drivers} />
    </div>
  );
}
