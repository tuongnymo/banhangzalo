// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// 👉 Thêm log kiểm tra biến môi trường
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY?.slice(0, 10)); // tránh log full key

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const { data, error } = await supabase.from("orders").select("*").eq("id", id).single()

  if (error) {
    return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 })
  }

  return NextResponse.json(data)
}
