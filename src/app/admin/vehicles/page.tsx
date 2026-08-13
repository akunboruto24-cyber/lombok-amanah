import { getVehicles } from '@/lib/data';
import { Car, Users, Briefcase, Edit2 } from 'lucide-react';

export default async function AdminVehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Kendaraan</h1>
          <p className="text-white/40 text-sm mt-1">Kelola armada kendaraan</p>
        </div>
        <button className="px-4 py-2.5 bg-[#C8A45A] text-[#0F172A] text-sm font-bold rounded-xl hover:bg-[#d4b06a] transition-all">
          + Tambah Kendaraan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all">
            {v.photo && (
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${v.photo})` }} />
            )}
            <div className="p-4 space-y-3">
              <h3 className="text-white font-semibold text-lg">{v.name}</h3>
              <p className="text-white/40 text-sm">{v.description}</p>

              <div className="flex items-center gap-4 text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-white/30" />
                  {v.seat_capacity} seat
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-white/30" />
                  {v.luggage_capacity} bag
                </span>
              </div>

              {v.daily_price && (
                <p className="text-[#C8A45A] font-bold">
                  Rp {v.daily_price.toLocaleString('id-ID')}<span className="text-white/30 font-normal text-xs">/hari</span>
                </p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {v.features.map(f => (
                  <span key={f} className="px-2 py-0.5 bg-white/5 text-white/40 text-xs rounded-lg">{f}</span>
                ))}
              </div>

              <button className="w-full flex items-center justify-center gap-1.5 py-2 bg-white/5 text-white/60 text-xs font-medium rounded-lg hover:bg-white/10 transition-colors mt-2">
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
