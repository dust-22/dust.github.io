'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function ProductManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Ana Yemekler');
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const categories = ["Başlangıçlar", "Ana Yemekler", "Tatlılar", "İçecekler"];

  const fetchProducts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: rest } = await supabase.from('restaurants').select('id').eq('owner_id', user?.id).single();
    if (rest) {
      const { data } = await supabase.from('products').select('*').eq('restaurant_id', rest.id).order('created_at', { ascending: false });
      setProducts(data || []);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // YERELDEN RESİM YÜKLEME FONKSİYONU
  async function handleImageUpload(e: any) {
    try {
      setUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
    } catch (error) {
      alert('Resim yüklenirken hata oluştu!');
    } finally {
      setUploading(false);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: rest } = await supabase.from('restaurants').select('id').eq('owner_id', user?.id).single();
    
    if (rest) {
      await supabase.from('products').insert([{ 
        name, price: parseFloat(price), category, image_url: imageUrl, restaurant_id: rest.id 
      }]);
      setName(''); setPrice(''); setImageUrl(''); fetchProducts();
    }
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-5xl font-black text-[#0F172A] tracking-tighter mb-10">Menü Yönetimi</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-white sticky top-8">
            <h2 className="text-xl font-black mb-6">Yeni Ürün Ekle</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Ürün Adı" className="w-full p-4 bg-gray-50 rounded-2xl font-bold border-2 border-transparent focus:border-orange-500 transition-all outline-none" />
              
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl font-bold border-2 border-transparent focus:border-orange-500 outline-none">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <input required value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="Fiyat (₺)" className="w-full p-4 bg-gray-50 rounded-2xl font-bold border-2 border-transparent focus:border-orange-500 transition-all outline-none" />
              
              {/* DOSYA SEÇME ALANI */}
              <div className="relative">
                <label className="block w-full p-4 bg-orange-50 border-2 border-dashed border-orange-200 rounded-2xl text-center cursor-pointer hover:bg-orange-100 transition-all">
                  <span className="text-orange-600 font-bold text-sm">
                    {uploading ? 'Yükleniyor...' : imageUrl ? 'Resim Hazır ✅' : 'Resim Seç (Cihazdan)'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              <button disabled={uploading} className="w-full bg-[#FF4F00] text-white py-4 rounded-2xl font-black shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                MENÜYE EKLE
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
           {/* Ürün Listesi Buraya Gelecek (Önceki kodun aynısı) */}
        </div>
      </div>
    </div>
  );
}