import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// ✅ Hàm kiểm tra user đăng nhập và quyền admin
async function requireAdmin(supabase: any) {
  const { data: authUser, error: authError } = await supabase.auth.getUser();
  if (authError || !authUser?.user) {
    return { error: 'Unauthorized', status: 401 };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authUser.user.id)
    .single();

  if (profile?.role !== 'admin') {
    return { error: 'Forbidden', status: 403 };
  }

  return { user: authUser.user };
}

// ✅ GET: Lấy danh sách user (chỉ admin được phép)
export async function GET(req: NextRequest) {
  const supabase = createServerComponentClient({ cookies });
  const check = await requireAdmin(supabase);
  if (check.error) return NextResponse.json({ error: check.error }, { status: check.status });

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, phone, role, created_at')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ users: data });
}

// ✅ PUT: Đổi role user (chỉ admin được phép)
export async function PUT(req: NextRequest) {
  const supabase = createServerComponentClient({ cookies });
  const check = await requireAdmin(supabase);
  if (check.error) return NextResponse.json({ error: check.error }, { status: check.status });

  const { userId, role } = await req.json();
  if (!userId || !role) {
    return NextResponse.json({ error: 'Thiếu thông tin userId hoặc role' }, { status: 400 });
  }

  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

// ✅ DELETE: Xoá user (chỉ admin được phép)
export async function DELETE(req: NextRequest) {
  const supabase = createServerComponentClient({ cookies });
  const check = await requireAdmin(supabase);
  if (check.error) return NextResponse.json({ error: check.error }, { status: check.status });

  const { userId } = await req.json();
  if (!userId) {
    return NextResponse.json({ error: 'Thiếu userId' }, { status: 400 });
  }

  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
