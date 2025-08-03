import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies as getCookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"
import { Database } from "@/src/lib/supabaseTypes"
import { createServerSupabaseClient } from "@/src/lib/supabaseServer"

// Hàm tạo mã đơn hàng ngắn gọn
function generateOrderCode() {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ORD-${random}`
}

// Schema kiểm tra dữ liệu đơn hàng
const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(z.any()),
  total: z.number(),
  shipping: z.number(),
  status: z.string(),
  paymentMethod: z.string(),
  paymentStatus: z.string(),
  shippingInfo: z.object({
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    notes: z.string().optional(),
  }),
  createdAt: z.string(),
})

// GET: Lấy chi tiết đơn hàng theo ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => getCookies(),
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = params

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  if (data.user_id !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.json(data)
}

// POST: Tạo đơn hàng mới
export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => getCookies(),
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const {
    items,
    total,
    shipping_fee,
    payment_method,
    payment_status,
    status = "pending", // fallback nếu client không truyền
    shipping_info,
  } = body

  if (!items || !total || !shipping_fee || !payment_method || !payment_status || !shipping_info) {
    return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 })
  }

  const orderCode = generateOrderCode()

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: session.user.id, // 👈 đúng rồi
        items,
        total,
        shipping_fee,
        payment_method,
        payment_status,
        status,
        shipping_info,
        order_code: orderCode,
      },
    ])
    .select("id, order_code")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    orderId: data?.[0]?.id,
    orderCode: data?.[0]?.order_code,
  })
}
