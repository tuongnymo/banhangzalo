'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function CategorySlugPage() {
  const { slug } = useParams() as { slug: string }
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('category', `%${slug}%`) // <-- linh hoạt hơn

      if (error) {
        console.error('Lỗi khi lấy sản phẩm:', error.message)
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }

    fetchProducts()
  }, [slug])

  if (loading) return <p className="p-4">Đang tải sản phẩm...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">Danh mục: {slug}</h1>
      {products.length === 0 ? (
        <p>Không có sản phẩm nào trong danh mục này.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images?.[0] || "/placeholder.svg"}
              discount={product.discount}
              category={product.category}
            />
          ))}
        </div>
      )}
    </div>
  )
}
