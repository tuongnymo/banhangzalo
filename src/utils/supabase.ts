// src/utils/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/src/lib/supabaseTypes'; // Điều chỉnh đường dẫn nếu khác
import { headers } from 'next/headers'
// Client-side Supabase
const createClientSide = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};

let clientSideInstance: ReturnType<typeof createClientSide> | null = null;

export const getClientSideSupabase = () => {
  if (!clientSideInstance) {
    clientSideInstance = createClientSide();
  }
  return clientSideInstance;
};

// Server-side Supabase
export const createServerSupabase = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  const headerList = await headers() // ✅ await ở đây
  const token = headerList.get('authorization')?.replace('Bearer ', '')

  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  return supabase
}
