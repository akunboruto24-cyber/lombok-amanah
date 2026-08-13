import { getDestinations } from '@/lib/data';
import { MapPin, Edit2, Image } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  beach: '🏖️ Pantai',
  waterfall: '💧 Air Terjun',
  mountain: '⛰️ Gunung/Bukit',
  culture: '🕌 Budaya',
  island: '🏝️ Pulau',
  city: '🏙️ Kota',
};

export default async function AdminDestinationsPage() {
  const dests = await getDestinations();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Destinasi</h1>
          <p className="text-white/40 text-sm mt-1">{dests.length} destinasi aktif</p>
        </div>
        <button className="px-4 py-2.5 bg-[#C8A45A] text-[#0F172A] text-sm font-bold rounded-xl hover:bg-[#d4b06a] transition-all">
          + Tambah Destinasi
        </button>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/30 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="px-4 py-3 text-left">Destinasi</th>
                <th className="px-4 py-3 text-left">Kategori</th>
                <th className="px-4 py-3 text-left">Lokasi</th>
                <th className="px-4 py-3 text-left">Tiket</th>
                <th className="px-4 py-3 text-center">Cover</th>
                <th className="px-4 py-3 text-center w-20">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dests.map((d) => (
                <tr key={d.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{d.name}</p>
                    <p className="text-white/30 text-xs mt-0.5 line-clamp-1">{d.description}</p>
                  </td>
                  <td className="px-4 py-3 text-white/60 whitespace-nowrap">
                    {categoryLabels[d.category] || d.category}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-white/50">
                      <MapPin className="w-3.5 h-3.5 text-white/30" />
                      {d.location}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/50">{d.entrance_fee}</td>
                  <td className="px-4 py-3 text-center">
                    {d.cover_image ? (
                      <span className="text-green-400 text-xs">✓</span>
                    ) : (
                      <Image className="w-4 h-4 text-white/20 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="p-1.5 bg-white/5 text-white/40 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
