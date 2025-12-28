'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Genel Bakış', icon: '🏠', path: '/admin/dashboard' },
    { name: 'Menü Yönetimi', icon: '📋', path: '/admin/products' },
    { name: 'QR Kodlarım', icon: '🔳', path: '/admin/qrcode' },
    { name: 'İstatistikler', icon: '📈', path: '/admin/stats' },
    { name: 'Ayarlar', icon: '⚙️', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex font-sans text-[#1E293B] p-4 md:p-8">
      {/* SABİT SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-[#2D3436] rounded-[2.5rem] p-8 flex-col shadow-2xl mr-8 sticky top-8 h-[calc(100vh-64px)]">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 text-white font-black text-xs">QR</div>
          <span className="text-2xl font-black text-white tracking-tight">Tık<span className="text-[#FF4F00]">Menü</span></span>
        </div>
        <nav className="space-y-3 flex-1">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${pathname === item.path ? 'bg-[#FF4F00] text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              <span className="text-lg">{item.icon}</span> {item.name}
            </Link>
          ))}
        </nav>
        <button onClick={() => supabase.auth.signOut().then(() => router.push('/login'))} className="mt-auto flex items-center justify-center gap-3 bg-[#FF4F00]/10 text-[#FF4F00] p-4 rounded-2xl font-bold hover:bg-[#FF4F00] hover:text-white transition-all border border-[#FF4F00]/20">
          <span>🚪</span> Çıkış Yap
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto pr-2">{children}</main>
    </div>
  );
}