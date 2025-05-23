import { createServerSupabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabase();
    const id = parseInt(params.id);
    
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(
          id,
          product_id,
          product_variant_id,
          quantity,
          price,
          product:products(
            id,
            name,
            slug,
            images:product_images(image_url, is_primary)
          ),
          variant:product_variants(
            id,
            size:sizes(name),
            color:colors(name, color_code)
          )
        ),
        user:user_profiles(
          full_name,
          phone,
          address,
          city,
          postal_code,
          country
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabase();
    const id = parseInt(params.id);
    const body = await request.json();
    
    const { status, payment_status } = body;
    
    const updateData: any = {};
    if (status) updateData.status = status;
    if (payment_status) updateData.payment_status = payment_status;
    
    const { data: order, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
