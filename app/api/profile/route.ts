import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/src/lib/supabaseServer'

// GET: lấy thông tin cá nhân
export async function GET(req: NextRequest) {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Bạn chưa đăng nhập.' }, { status: 401 })
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('full_name, phone, birthday, avatar_url') // 👈 thêm avatar_url
    .eq('id', user.id)
    .single()

  if (error) {
    return NextResponse.json({ error: 'Không lấy được thông tin.' }, { status: 500 })
  }

  return NextResponse.json(profile)
}

// PUT: cập nhật thông tin cá nhân
export async function PUT(req: NextRequest) {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Bạn chưa đăng nhập.' }, { status: 401 })
  }

  const { full_name, phone, birthday, avatar_url } = await req.json() // 👈 nhận thêm avatar_url

  const { error } = await supabase
    .from('profiles')
    .update({ full_name, phone, birthday, avatar_url }) // 👈 cập nhật cả avatar_url
    .eq('id', user.id)

  if (error) {
    return NextResponse.json({ error: 'Cập nhật thất bại.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
