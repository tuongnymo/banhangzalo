import { createServerSupabase } from '@/lib/supabase';

export async function fetchProducts(params: {
  page?: number;
  limit?: number;
  category?: string | null;
  search?: string | null;
  featured?: string | null;
  sortBy?: string;
  sortOrder?: string;
}) {
  const {
    page = 1,
    limit = 10,
    category,
    search,
    featured,
    sortBy = 'created_at',
    sortOrder = 'desc',
  } = params;

  const supabase = createServerSupabase();
  const offset = (page - 1) * limit;

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

  const { data: products, error, count } = await query.count('exact');

  if (error) throw error;

  const totalProducts = count || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  return {
    products,
    pagination: {
      page,
      limit,
      totalProducts,
      totalPages,
    },
  };
}
