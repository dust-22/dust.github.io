'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Hata: " + error.message);
    } else {
      router.push('/admin/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1E1E2D] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#2D3436] rounded-3xl p-8 shadow-2xl border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">Tık<span className="text-[#FF4F00]">Menü</span></h1>
          <p className="text-gray-400 mt-2">Yönetici Paneline Giriş Yapın</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">E-posta</label>
            <input 
              type="email" 
              className="w-full bg-[#1E1E2D] border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF4F00]"
              placeholder="admin@tikmenu.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Şifre</label>
            <input 
              type="password" 
              className="w-full bg-[#1E1E2D] border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF4F00]"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-[#FF4F00] text-white font-bold py-3 rounded-xl hover:bg-[#e64600] transition-colors shadow-lg shadow-orange-900/20"
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}