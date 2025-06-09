import { createServerSupabase } from '@/src/lib/supabaseClient';

// Lấy danh sách sản phẩm nổi bật
export async function getFeaturedProducts() {
  const supabase = createServerSupabase();
  
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      price,
      sale_price,
      images:product_images(image_url, is_primary)
    `)
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(8);
  
  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
  
  return products;
}

// Lấy danh sách sản phẩm mới
export async function getNewArrivals() {
  const supabase = createServerSupabase();
  
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      price,
      sale_price,
      images:product_images(image_url, is_primary)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8);
  
  if (error) {
    console.error('Error fetching new arrivals:', error);
    return [];
  }
  
  return products;
}

// Lấy danh sách danh mục
export async function getCategories() {
  const supabase = createServerSupabase();
  
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return categories;
}

// Lấy chi tiết danh mục theo slug
export async function getCategoryBySlug(slug: string) {
  const supabase = createServerSupabase();
  
  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }
  
  return category;
}

// Lấy sản phẩm theo danh mục
export async function getProductsByCategory(categoryId: number, page = 1, limit = 12) {
  const supabase = createServerSupabase();
  const offset = (page - 1) * limit;
  
  const { data: products, error, count } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      price,
      sale_price,
      images:product_images(image_url, is_primary)
    `, { count: 'exact' })
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .range(offset, offset + limit - 1);
  
  if (error) {
    console.error('Error fetching products by category:', error);
    return { products: [], totalPages: 0 };
  }
  
  const totalPages = Math.ceil((count || 0) / limit);
  
  return { products, totalPages };
}

// Lấy chi tiết sản phẩm theo slug
export async function getProductBySlug(slug: string) {
  const supabase = createServerSupabase();
  
  const { data: product, error } = await supabase
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
      ),
      reviews(
        id,
        rating,
        comment,
        created_at,
        user:user_profiles(full_name)
      )
    `)
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  
  // Tính rating trung bình
  if (product.reviews && product.reviews.length > 0) {
    const totalRating = product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
    product.average_rating = totalRating / product.reviews.length;
  } else {
    product.average_rating = 0;
  }
  
  return product;
}

// Lấy sản phẩm liên quan
export async function getRelatedProducts(productId: number, categoryId: number) {
  const supabase = createServerSupabase();
  
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      price,
      sale_price,
      images:product_images(image_url, is_primary)
    `)
    .eq('category_id', categoryId)
    .neq('id', productId)
    .eq('is_active', true)
    .limit(4);
  
  if (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
  
  return products;
}

// Tìm kiếm sản phẩm
export async function searchProducts(query: string) {
  const supabase = createServerSupabase();
  
  const { data: products, error } = await supabase
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
    .eq('is_active', true);
  
  if (error) {
    console.error('Error searching products:', error);
    return [];
  }
  
  return products;
}

// Lấy danh sách đơn hàng của người dùng
export async function getUserOrders(userId: string) {
  const supabase = createServerSupabase();
  
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
    console.error('Error fetching user orders:', error);
    return [];
  }
  
  return orders;
}

// Lấy chi tiết đơn hàng
export async function getOrderById(orderId: number) {
  const supabase = createServerSupabase();
  
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
    .eq('id', orderId)
    .single();
  
  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }
  
  return order;
}

// Lấy hồ sơ người dùng
export async function getUserProfile(userId: string) {
  const supabase = createServerSupabase();
  
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return profile;
}
