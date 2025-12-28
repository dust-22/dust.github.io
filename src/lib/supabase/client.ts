import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/index'; // Şimdilik hata verebilir, types dosyasını birazdan dolduracağız

export const supabase = createClientComponentClient<Database>();