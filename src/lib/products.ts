import { createServerSupabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Tính toán offset cho phân trang
    const offset = (page - 1) * limit;
    
    // Xây dựng query
    let query = supabase
      .from('products')
      .select(`
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
        )
      `)
      .eq('is_active', true)
      .order(sortBy as any, { ascending: sortOrder === 'asc' })
      .range(offset, offset + limit - 1);
    
    // Thêm các điều kiện lọc
    if (category) {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .single();
      
      if (categoryData) {
        query = query.eq('category_id', categoryData.id);
      }
    }
    
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    
    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }
    
    // Thực hiện query
    const { data: products, error, count } = await query.count('exact');
    
    if (error) {
      throw error;
    }
    
    // Tính toán thông tin phân trang
    const totalProducts = count || 0;
    const totalPages = Math.ceil(totalProducts / limit);
    
    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
