// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Tạo Supabase client với context từ middleware
  const supabase = createMiddlewareClient({ req, res });

  // Lấy session & user
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      // Chưa đăng nhập → redirect
      return NextResponse.redirect(new URL('/', req.url));
    }

    const { user } = session;

    // Lấy profile để kiểm tra role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*,/api/:path*'],
};
