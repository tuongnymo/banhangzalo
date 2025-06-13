import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// ✅ GET: Lấy danh sách đơn hàng (chỉ admin được phép)
export async function GET(req: Request) {
  const supabase = createServerComponentClient({ cookies });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.user.id)
    .single();

  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  let query = supabase
    .from('orders')
    .select('id, status, total_price, created_at, email, name')
    .order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data });
}


// ✅ PUT: Cập nhật trạng thái đơn hàng
export async function PUT(req: Request) {
  const supabase = createServerComponentClient({ cookies });

  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.user.id)
    .single();

  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { orderId, newStatus } = await req.json();

  if (!orderId || !newStatus) {
    return NextResponse.json({ error: 'Thiếu orderId hoặc trạng thái mới' }, { status: 400 });
  }

  const { error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// POST: Lấy chi tiết đơn hàng
export async function POST(req: Request) {
  const supabase = createServerComponentClient({ cookies });

  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.user.id)
    .single();

  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { orderId } = await req.json();
  if (!orderId) return NextResponse.json({ error: 'Thiếu orderId' }, { status: 400 });

  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      id, status, total, created_at, user_id,
      order_items (
        id, quantity, price,
        product:product_id (id, name)
      )
    `)
    .eq('id', orderId)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ order });
}

