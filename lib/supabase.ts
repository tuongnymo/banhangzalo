'use client'

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import type { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/src/lib/supabaseTypes';

// ✅ Supabase client cho phía client (trình duyệt)
export const supabase: SupabaseClient<Database> = createPagesBrowserClient<Database>()