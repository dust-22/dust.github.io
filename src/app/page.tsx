'use client';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FF4F00] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-white font-black text-xl">TM</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0F172A]">
            Tık<span className="text-[#FF4F00]">Menü</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
          <Link href="/login" className="hover:text-[#FF4F00] transition-colors">Giriş Yap</Link>
          <Link href="/register" className="border-2 border-[#FF4F00]/10 px-6 py-2 rounded-xl hover:bg-[#FF4F00]/5 transition-all text-[#FF4F00]">Ücretsiz Kayıt</Link>
          <Link href="/register" className="bg-[#1E293B] text-white px-6 py-2 rounded-xl shadow-lg hover:bg-[#0F172A] transition-all">Ücretsiz Dene</Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-black leading-[1.1] mb-6 text-[#0F172A]">
            TıkMenü: Menünüz bir tık uzağınıza.
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-md leading-relaxed">
            Restoranlar için hızlı, temassız ve dijital çözüm. Müşterileriniz QR kodu okutsun, menünüze anında ulaşsın.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/register" className="bg-[#FF4F00] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/30 hover:scale-105 transition-transform">
              Menünü Oluştur
            </Link>
            <button className="bg-white border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all">
              Nasıl Çalışır?
            </button>
          </div>
          
          {/* İstatistik Göstergesi */}
          <div className="mt-12 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 inline-block">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Bugünün Özeti</p>
            <div className="flex items-end gap-4">
              <span className="text-4xl font-black text-[#0F172A]">458</span>
              <span className="text-sm text-green-500 font-bold mb-1">↑ %12 Artış</span>
            </div>
          </div>
        </div>

        {/* Hero Görsel (Telefon Mockup) */}
        <div className="relative flex justify-center">
          <div className="w-[300px] h-[600px] bg-[#121212] rounded-[3rem] border-[8px] border-[#1E1E2D] shadow-2xl overflow-hidden relative z-10">
             <img src="/menu-screenshot.jpg" alt="Menü Tasarımı" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-12 bg-white p-6 rounded-3xl shadow-xl z-20 hidden lg:block border border-gray-100">
            <p className="font-bold text-sm">Müşterileriniz bayılacak.</p>
            <button className="mt-2 text-xs text-[#FF4F00] font-bold">Demo Menüyü İncele →</button>
          </div>
        </div>
      </section>

      {/* --- FİYATLANDIRMA PAKETLERİ --- */}
      <section className="bg-white py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16 text-[#0F172A]">Uygun Fiyatlı Paketler</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Eko', price: 'Ücretsiz', desc: 'Küçük işletmeler için temel özellikler.' },
              { name: 'Pro', price: '299₺', desc: 'Büyüyen restoranlar için gelişmiş panel.', popular: true },
              { name: 'Premium', price: '599₺', desc: 'Tam otomasyon ve özel tasarım desteği.' },
              { name: 'Kurumsal', price: 'Teklif Al', desc: 'Çoklu şube ve özel entegrasyonlar.' }
            ].map((pkg) => (
              <div key={pkg.name} className={`p-8 rounded-[2rem] border-2 ${pkg.popular ? 'border-[#FF4F00] shadow-xl relative' : 'border-gray-50 bg-[#FBFBFB]'}`}>
                {pkg.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF4F00] text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">En Popüler</span>}
                <h3 className="font-black text-xl mb-2">{pkg.name}</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">{pkg.desc}</p>
                <div className="text-2xl font-black mb-8">{pkg.price}</div>
                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${pkg.popular ? 'bg-[#FF4F00] text-white shadow-lg shadow-orange-500/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                  Dene
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="max-w-7xl mx-auto px-8 py-12 border-t border-gray-100 flex flex-wrap justify-between items-center gap-8">
        <div className="flex items-center gap-2 opacity-50">
          <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center text-[10px] text-white font-bold">TM</div>
          <span className="font-bold">TıkMenü</span>
        </div>
        <div className="flex gap-6 text-sm text-gray-400 font-medium">
          <Link href="#">Instagram</Link>
          <Link href="#">Twitter</Link>
          <Link href="#">Destek</Link>
          <Link href="#">Gizlilik Politikası</Link>
        </div>
      </footer>
    </div>
  );
}