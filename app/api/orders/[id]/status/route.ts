import { createServerSupabaseClient } from '@/src/lib/supabaseServer'
import { NextResponse } from 'next/server'

// PATCH /api/orders/:id/status
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerSupabaseClient()

  // Lấy thông tin người dùng hiện tại
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Bạn chưa đăng nhập.' }, { status: 401 })
  }

  const { id } = params
  const body = await req.json()
  const { status } = body

  // ✅ Danh sách trạng thái hợp lệ
  const allowedStatuses = [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded',
  ]

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json({ error: 'Trạng thái không hợp lệ.' }, { status: 400 })
  }

  // 🔍 Kiểm tra đơn hàng có tồn tại và thuộc về user không
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('id, user_id')
    .eq('id', id)
    .single()

  if (orderError || !order) {
    return NextResponse.json({ error: 'Không tìm thấy đơn hàng.' }, { status: 404 })
  }

  if (order.user_id !== user.id) {
    return NextResponse.json({ error: 'Bạn không có quyền sửa đơn hàng này.' }, { status: 403 })
  }

  // ✏️ Cập nhật trạng thái đơn hàng
  const { error: updateError } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)

  if (updateError) {
    return NextResponse.json({ error: 'Cập nhật thất bại.' }, { status: 500 })
  }

  return NextResponse.json({ success: true, status })
}
