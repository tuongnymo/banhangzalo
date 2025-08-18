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
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const pageSize = 35

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // Lấy sản phẩm theo trang
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, description, images, sizes, colors, category, discount, created_at')
        .order('created_at', { ascending: false })
        .range(from, to)

      // Lấy tổng số sản phẩm để tính số trang
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.error('❌ Error loading products:', error.message)
      } else {
        setProducts(data as Product[])
        if (count) setTotalPages(Math.ceil(count / pageSize))
      }

      setLoading(false)
    }

    fetchProducts()
  }, [page])

  if (loading) return <p className="p-4">Đang tải sản phẩm...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tất cả sản phẩm</h1>

      {/* Grid sản phẩm */}
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
              showActions={true}
            />
          </Link>
        ))}
      </div>

      {/* Nút phân trang */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          ⬅ Trước
        </button>

        <span className="px-3 py-1">
          Trang {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Sau ➡
        </button>
      </div>
    </div>
  )
}
