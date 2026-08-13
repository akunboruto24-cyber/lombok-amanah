import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { isAuthenticated } from '@/lib/admin-auth';

export const metadata = { title: 'Admin — Lombok Amanah' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated();

  if (!authed) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0B1120] flex">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
