'use client';
import { supabase } from '@/lib/supabase/client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 border border-gray-100">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-14 h-14 bg-[#FF4F00] rounded-2xl flex items-center justify-center font-black text-white shadow-xl shadow-orange-500/30 mb-6">TM</div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Hesap Oluştur</h1>
          <p className="text-gray-400 font-medium mt-2">Restoranınızı 2 dakikada dijitalleştirin.</p>
        </div>

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 bg-white border-2 border-gray-100 py-4 rounded-2xl font-bold text-[#1E293B] hover:bg-gray-50 transition-all mb-8 shadow-sm group"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
          {loading ? 'Yükleniyor...' : 'Google ile Kayıt Ol'}
        </button>

        <div className="space-y-4">
          <input type="email" placeholder="E-posta Adresiniz" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#FF4F00] focus:bg-white outline-none transition-all font-medium" />
          <input type="password" placeholder="Şifre Belirleyin" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#FF4F00] focus:bg-white outline-none transition-all font-medium" />
          <button className="w-full bg-[#1E293B] text-white py-4 rounded-2xl font-black shadow-xl hover:bg-[#0F172A] transition-all transform active:scale-[0.98]">
            Ücretsiz Başlat
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Zaten hesabınız var mı? <Link href="/login" className="text-[#FF4F00] font-bold hover:underline">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
}