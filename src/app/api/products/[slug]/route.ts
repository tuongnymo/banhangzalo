import { createServerSupabase } from '@/src/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabase();
    const id = params.id;
    
    // Kiểm tra xem id có phải là slug hay không
    const isSlug = isNaN(parseInt(id));
    
    let query = supabase.from('products').select(`
      *,
      category:categories(id, name, slug),
      images:product_images(id, image_url, is_primary),
      variants:product_variants(
        id, 
        sku, 
        price, 
        stock_quantity,
        size:sizes(id, name),
        color:colors(id, name, color_code)
      ),
      reviews(
        id,
        rating,
        comment,
        created_at,
        user:user_profiles(full_name)
      )
    `);
    
    if (isSlug) {
      query = query.eq('slug', id);
    } else {
      query = query.eq('id', parseInt(id));
    }
    
    const { data: product, error } = await query.single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    // Tính rating trung bình
    if (product.reviews && product.reviews.length > 0) {
      const totalRating = product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
      product.average_rating = totalRating / product.reviews.length;
    } else {
      product.average_rating = 0;
    }
    
    // Lấy các sản phẩm liên quan
    const { data: relatedProducts } = await supabase
      .from('products')
      .select(`
        id,
        name,
        slug,
        price,
        sale_price,
        images:product_images(image_url, is_primary)
      `)
      .eq('category_id', product.category_id)
      .neq('id', product.id)
      .eq('is_active', true)
      .limit(4);
    
    return NextResponse.json({
      product,
      relatedProducts,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
