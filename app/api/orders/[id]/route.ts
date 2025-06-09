// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const { data, error } = await supabase.from("orders").select("*").eq("id", id).single()

  if (error) {
    return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 })
  }

  return NextResponse.json(data)
}
