import { getTourPackages } from '@/lib/data';
import { Package, Edit2, Eye, Star } from 'lucide-react';

export default async function AdminToursPage() {
  const tours = await getTourPackages();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tour Packages</h1>
          <p className="text-white/40 text-sm mt-1">Kelola paket tour</p>
        </div>
        <button className="px-4 py-2.5 bg-[#C8A45A] text-[#0F172A] text-sm font-bold rounded-xl hover:bg-[#d4b06a] transition-all">
          + Tambah Tour
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tours.map((t) => (
          <div key={t.id} className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all">
            {t.cover_image && (
              <div className="h-36 bg-cover bg-center" style={{ backgroundImage: `url(${t.cover_image})` }} />
            )}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-semibold">{t.name}</h3>
                  <p className="text-white/30 text-xs mt-0.5">{t.category} · {t.duration}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  t.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/30'
                }`}>
                  {t.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="text-[#C8A45A] font-bold">Rp {t.price.toLocaleString('id-ID')}</span>
                <span className="text-white/30">max {t.max_passenger} pax</span>
                {t.average_rating && (
                  <span className="flex items-center gap-1 text-white/50">
                    <Star className="w-3 h-3 text-[#C8A45A]" />
                    {t.average_rating}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs">
                {t.is_featured && <span className="px-2 py-0.5 bg-[#C8A45A]/10 text-[#C8A45A] rounded">Featured</span>}
                {t.is_popular && <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded">Popular</span>}
              </div>

              <div className="flex gap-2 pt-2 border-t border-white/5">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 text-white/60 text-xs font-medium rounded-lg hover:bg-white/10 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <a href={`/tours/${t.slug}`} target="_blank" className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 text-white/60 text-xs font-medium rounded-lg hover:bg-white/10 transition-colors">
                  <Eye className="w-3.5 h-3.5" /> Preview
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
