import { createServerSupabase } from '@/src/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }
    
    // Tìm kiếm sản phẩm
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        id,
        name,
        slug,
        price,
        sale_price,
        images:product_images(image_url, is_primary)
      `)
      .ilike('name', `%${query}%`)
      .eq('is_active', true)
      .limit(5);
    
    if (productsError) {
      throw productsError;
    }
    
    // Tìm kiếm danh mục
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .ilike('name', `%${query}%`)
      .limit(3);
    
    if (categoriesError) {
      throw categoriesError;
    }
    
    return NextResponse.json({
      products,
      categories,
    });
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
