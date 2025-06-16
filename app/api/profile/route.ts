// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// GET: Lấy thông tin user
export async function GET() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Không tìm thấy người dùng." }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    return NextResponse.json({ error: "Không tìm thấy hồ sơ người dùng." }, { status: 404 });
  }

  return NextResponse.json(profile);
}

// POST: Cập nhật thông tin user
export async function POST(req: Request) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Không xác thực được người dùng." }, { status: 401 });
  }

  const { full_name, phone } = await req.json();

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ full_name, phone })
    .eq("id", user.id);

  if (updateError) {
    return NextResponse.json({ error: "Cập nhật thất bại." }, { status: 500 });
  }

  return NextResponse.json({ message: "Cập nhật thành công." });
}

// PUT: Cập nhật thông tin người dùng (full_name, phone, birthday)
export async function PUT(req: Request) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Không xác thực được người dùng." }, { status: 401 });
  }

  try {
    const { full_name, phone, birthday } = await req.json();

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ full_name, phone, birthday })
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json({ error: "Cập nhật thất bại." }, { status: 500 });
    }

    const { data: updatedProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return NextResponse.json({ profile: updatedProfile });
  } catch (err) {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }
}
