'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ views: 0, productCount: 0 });

  useEffect(() => {
    async function getData() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: rest } = await supabase.from('restaurants').select('*').eq('owner_id', user?.id).single();
      if (rest) {
        const { count } = await supabase.from('products').select('*', { count: 'exact', head: true }).eq('restaurant_id', rest.id);
        setStats({ views: rest.views || 0, productCount: count || 0 });
      }
    }
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-black text-[#0F172A] tracking-tighter">Genel Başlıü</h1>
        <div className="flex gap-4 items-center">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">Hızlı Akaionlar</span>
           <Link href="/admin/products" className="bg-[#FF9F43] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-orange-500/20">+ Ürün Ekle</Link>
           <Link href="/admin/qrcode" className="bg-[#FF9F43] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-orange-500/20">QR Oluştur</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-white">
          <h3 className="text-xl font-bold text-gray-800 mb-8">Bugüün Özeti</h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Menü Görüntülennen Sayısı</p>
          <h2 className="text-6xl font-black text-[#FF9F43]">{stats.views}</h2>
          <div className="flex justify-between items-center border-t mt-6 pt-4 text-sm font-bold text-gray-400">
            <span>Yeni Yorumlar</span> <span className="text-gray-800">12</span>
          </div>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-white">
          <h3 className="text-xl font-bold text-gray-800 mb-8">En Popüler Ürünler</h3>
          <div className="flex items-end justify-between h-40 gap-4">
            <div className="flex-1 bg-orange-100 rounded-xl h-[30%]"></div>
            <div className="flex-1 bg-orange-200 rounded-xl h-[60%]"></div>
            <div className="flex-1 bg-[#FF9F43] rounded-xl h-[100%]"></div>
            <div className="flex-1 bg-orange-50 rounded-xl h-[20%]"></div>
          </div>
        </div>
      </div>
    </>
  );
}