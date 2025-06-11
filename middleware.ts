// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Chặn nếu truy cập admin
  if (pathname.startsWith('/admin')) {
    const access_token = req.cookies.get('sb-access-token')?.value;
    const refresh_token = req.cookies.get('sb-refresh-token')?.value;

    if (!access_token || !refresh_token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Gọi Supabase Auth API với token
    const { data: { user }, error } = await supabase.auth.getUser(access_token);

    if (!user) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Lấy role từ bảng profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

// 💡 Khai báo matcher ở đây:
export const config = {
  matcher: ['/admin/:path*'],
};