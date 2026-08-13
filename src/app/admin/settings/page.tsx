import { getSettings } from '@/lib/data';
import {
  Phone, Mail, MapPin, Globe,
  Save, Shield,
} from 'lucide-react';

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  const fields = [
    { label: 'Nama Bisnis', value: settings.site_name, icon: Globe },
    { label: 'Tagline', value: settings.tagline, icon: Globe },
    { label: 'Phone', value: settings.phone, icon: Phone },
    { label: 'WhatsApp', value: settings.whatsapp, icon: Phone },
    { label: 'Email', value: settings.email, icon: Mail },
    { label: 'Alamat', value: settings.address, icon: MapPin },
    { label: 'Instagram', value: settings.instagram, icon: Globe },
    { label: 'Facebook', value: settings.facebook, icon: Globe },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/40 text-sm mt-1">Pengaturan website & bisnis</p>
      </div>

      {/* Site Settings */}
      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-6 space-y-4">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#C8A45A]" />
          Informasi Bisnis
        </h2>

        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.label}>
              <label className="block text-white/40 text-xs mb-1.5">{f.label}</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl">
                <f.icon className="w-4 h-4 text-white/20" />
                <input
                  type="text"
                  defaultValue={f.value || ''}
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/20"
                  disabled
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-white/5">
          <p className="text-white/30 text-xs mb-3">
            * Editing akan aktif setelah Supabase terhubung
          </p>
          <button
            disabled
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C8A45A]/50 text-[#0F172A] text-sm font-bold rounded-xl cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-6 space-y-4">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#C8A45A]" />
          Keamanan
        </h2>

        <div>
          <label className="block text-white/40 text-xs mb-1.5">Admin Password</label>
          <div className="flex items-center gap-2 px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl">
            <input
              type="password"
              defaultValue="••••••••••"
              disabled
              className="flex-1 bg-transparent text-white text-sm outline-none"
            />
          </div>
          <p className="text-white/20 text-xs mt-1.5">Ubah di file .env.local (ADMIN_PASSWORD)</p>
        </div>
      </div>
    </div>
  );
}
