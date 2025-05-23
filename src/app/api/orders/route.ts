import { createServerSupabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createServerSupabase();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }
  
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(
          id,
          product_id,
          product_variant_id,
          quantity,
          price,
          product:products(name, slug),
          variant:product_variants(
            size:sizes(name),
            color:colors(name, color_code)
          )
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const body = await request.json();
    
    const {
      userId,
      items,
      totalAmount,
      shippingAddress,
      shippingCity,
      shippingPostalCode,
      shippingCountry,
      shippingFee,
      paymentMethod,
      notes,
    } = body;
    
    if (!userId || !items || !totalAmount || !shippingAddress || !shippingCity || !shippingCountry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Bắt đầu transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        shipping_address: shippingAddress,
        shipping_city: shippingCity,
        shipping_postal_code: shippingPostalCode || null,
        shipping_country: shippingCountry,
        shipping_fee: shippingFee || 0,
        payment_method: paymentMethod || 'COD',
        notes: notes || null,
      })
      .select()
      .single();
    
    if (orderError) {
      throw orderError;
    }
    
    // Thêm các sản phẩm vào đơn hàng
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_variant_id: item.product_variant_id || null,
      quantity: item.quantity,
      price: item.price,
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) {
      throw itemsError;
    }
    
    // Xóa giỏ hàng sau khi đặt hàng thành công
    if (body.clearCart) {
      const { data: cart } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (cart) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('cart_id', cart.id);
      }
    }
    
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        created_at: order.created_at,
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
