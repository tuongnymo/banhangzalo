import { createServerSupabaseClient } from '@/src/lib/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createServerSupabaseClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  const supabase = createServerSupabaseClient();
  const body = await req.json();

  const { error } = await supabase.from('products').insert({
    name: body.name,
    price: body.price,
    description: body.description,
    images: body.images,
    sizes: body.sizes,
    colors: body.colors,
    category: body.category,
    discount: body.discount,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const supabase = createServerSupabaseClient();
  const body = await req.json();

  const { error } = await supabase.from('products').delete().eq('id', body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
