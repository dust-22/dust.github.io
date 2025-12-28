'use client';
import { supabase } from '@/lib/supabase/client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
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
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Hoş Geldiniz</h1>
          <p className="text-gray-400 font-medium mt-2">Panelinize erişmek için giriş yapın.</p>
        </div>

        <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-4 bg-white border-2 border-gray-100 py-4 rounded-2xl font-bold text-[#1E293B] hover:bg-gray-50 transition-all mb-8 shadow-sm">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-5 h-5" alt="Google" />
          Google ile Giriş Yap
        </button>

        <div className="space-y-4">
          <input type="email" placeholder="E-posta" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#FF4F00] focus:bg-white outline-none transition-all font-medium" />
          <button className="w-full bg-[#FF4F00] text-white py-4 rounded-2xl font-black shadow-xl shadow-orange-500/20 hover:bg-[#E64600] transition-all transform active:scale-[0.98]">
            Giriş Yap
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Henüz hesabınız yok mu? <Link href="/register" className="text-[#FF4F00] font-bold hover:underline">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
}