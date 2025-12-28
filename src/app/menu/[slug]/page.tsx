'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';

export default function PublicMenu() {
  const { slug } = useParams();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadMenu() {
      // 1. Restoranı Slug ile bul
      const { data: rest } = await supabase.from('restaurants').select('*').eq('slug', slug).single();
      
      if (rest) {
        setRestaurant(rest);
        
        // 2. CANLI SAYAÇ: Görüntülenmeyi 1 artır
        await supabase.from('restaurants').update({ views: (rest.views || 0) + 1 }).eq('id', rest.id);

        // 3. Ürünleri Getir
        const { data: prods } = await supabase.from('products').select('*').eq('restaurant_id', rest.id);
        if (prods) setProducts(prods);
      }
    }
    if (slug) loadMenu();
  }, [slug]);

  if (!restaurant) return <div className="min-h-screen flex items-center justify-center font-black text-orange-500">MENÜ YÜKLENİYOR...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Restoran Başlık */}
      <div className="bg-white p-8 rounded-b-[3rem] shadow-sm text-center border-b border-gray-100">
        <h1 className="text-3xl font-black text-[#0F172A]">{restaurant.name}</h1>
        <p className="text-gray-400 font-bold text-sm mt-2 italic">Dijital Menümüze Hoş Geldiniz</p>
      </div>

      {/* Ürün Listesi */}
      <div className="p-6 max-w-2xl mx-auto space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-white flex justify-between items-center group active:scale-95 transition-all">
            <div className="flex-1">
              <h3 className="font-black text-[#0F172A] text-lg">{product.name}</h3>
              <p className="text-gray-400 text-xs font-medium line-clamp-1">{product.description || 'Nefis içeriklerle hazırlandı.'}</p>
              <p className="text-[#FF4F00] font-black mt-2 text-xl">{product.price} ₺</p>
            </div>
            {product.image_url && (
              <img src={product.image_url} className="w-24 h-24 rounded-2xl object-cover ml-4 shadow-md" alt="" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}