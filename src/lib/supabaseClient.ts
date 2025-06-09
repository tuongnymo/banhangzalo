import { createClient } from '@supabase/supabase-js';
import { Database } from '@/src/lib/supabaseTypes';
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"

export const supabase = createPagesBrowserClient()

// Tạo Supabase client cho client-side
const createClientSide = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};

// Singleton pattern để tránh nhiều instances
let clientSideInstance: ReturnType<typeof createClientSide> | null = null;

export const getClientSideSupabase = () => {
  if (!clientSideInstance) {
    clientSideInstance = createClientSide();
  }
  return clientSideInstance;
};

// Tạo Supabase client cho server-side
export const createServerSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL as string;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
