// app/category/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import ProductCard from '@/components/ProductCard'
import Link from "next/link"

type Product = {
  id: number
  name: string
  price: number
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
  category: string
   discount?: number
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, description, images, sizes, colors, category, discount, created_at')
        .order('created_at', { ascending: false })

      console.log("📦 Supabase data:", data)

      if (error) {
        console.error('❌ Error loading products:', error.message)
      } else {
        console.log('✅ Fetched products:', data)
        setProducts(data as Product[])
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) return <p className="p-4">Đang tải sản phẩm...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tất cả sản phẩm</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="block">
          <ProductCard
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.images?.[0] || "/placeholder.svg"}
            discount={product.discount}
            category={product.category}
             showActions={true} // ✅ để hiển thị nút giỏ hàng & mua ngay
            />
          </Link>
          ))} 
      </div>
    </div>
  )
}
