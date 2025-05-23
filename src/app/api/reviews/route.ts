import { createServerSupabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const body = await request.json();
    
    const { productId, userId, rating, comment } = body;
    
    if (!productId || !userId || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Kiểm tra xem người dùng đã đánh giá sản phẩm này chưa
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('product_id', productId)
      .eq('user_id', userId)
      .single();
    
    if (existingReview) {
      // Cập nhật đánh giá hiện có
      const { data: review, error } = await supabase
        .from('reviews')
        .update({
          rating,
          comment: comment || null,
        })
        .eq('id', existingReview.id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return NextResponse.json({
        success: true,
        review,
        message: 'Review updated successfully',
      });
    } else {
      // Tạo đánh giá mới
      const { data: review, error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          user_id: userId,
          rating,
          comment: comment || null,
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return NextResponse.json({
        success: true,
        review,
        message: 'Review created successfully',
      });
    }
  } catch (error) {
    console.error('Error creating/updating review:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
