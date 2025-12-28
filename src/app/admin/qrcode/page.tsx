'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodePage() {
  const [slug, setSlug] = useState('');
  const [tableNumber, setTableNumber] = useState('1');
  const [mounted, setMounted] = useState(false); // Render kontrolü

  useEffect(() => {
    setMounted(true);
    async function getUrl() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase.from('restaurants').select('slug').eq('owner_id', user?.id).single();
      if (data) setSlug(data.slug);
    }
    getUrl();
  }, []);

  if (!mounted) return null;

  const finalUrl = slug ? `${window.location.origin}/menu/${slug}?table=${tableNumber}` : '';

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter mb-10">Masa QR Oluşturucu</h1>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-white flex flex-col items-center text-center">
          
          <input 
            type="number" 
            value={tableNumber} 
            onChange={(e) => setTableNumber(e.target.value)} 
            placeholder="Masa No"
            className="w-full p-4 mb-8 bg-gray-50 rounded-2xl font-black text-center border-2 border-orange-100 focus:border-orange-500 outline-none"
          />

          <div className="p-6 bg-white border-4 border-double border-gray-100 rounded-[2.5rem] mb-6 shadow-inner">
            {finalUrl ? (
              <QRCodeSVG value={finalUrl} size={200} includeMargin={true} />
            ) : (
              <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-300 font-bold italic">
                QR Hazırlanıyor...
              </div>
            )}
          </div>

          <p className="text-[10px] font-bold text-gray-300 mb-6 truncate w-full">{finalUrl}</p>

          <button className="w-full bg-[#FF4F00] text-white py-5 rounded-[1.5rem] font-black shadow-xl shadow-orange-500/30">
            QR KODU İNDİR
          </button>
        </div>
      </div>
    </div>
  );
}