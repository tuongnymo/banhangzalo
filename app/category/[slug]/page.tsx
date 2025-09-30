'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const PAGE_SIZE = 35

export default function CategorySlugPage() {
  const { slug } = useParams() as { slug: string }
  const router = useRouter()
  const searchParams = useSearchParams()

  // 🔥 đọc page từ query (mặc định 1)
  const currentPage = Number(searchParams.get("page") || 1)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const categoryNameMap: Record<string, string> = {
    shoes: 'Giày Nam',
    clothing: 'Giày Nữ',
    bags: 'Túi xách',
    accessories: 'Phụ kiện',
  }

  useEffect(() => {
    if (!slug) return

    const fetchProducts = async () => {
      setLoading(true)

      const from = (currentPage - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .ilike('category', `%${slug}%`)
        .range(from, to)

      if (error) {
        console.error('Lỗi khi lấy sản phẩm:', error.message)
      } else {
        setProducts(data || [])
        setTotal(count || 0)
      }
      setLoading(false)
    }

    fetchProducts()
  }, [slug, currentPage])

  if (loading) return <p className="p-4">Đang tải sản phẩm...</p>

  const totalPages = Math.ceil(total / PAGE_SIZE)

  const goToPage = (p: number) => {
    router.push(`/category/${slug}?page=${p}`)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Danh mục: {categoryNameMap[slug] || slug}
      </h1>

      {products.length === 0 ? (
        <p>Không có sản phẩm nào trong danh mục này.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}?page=${currentPage}`} // giữ page khi vào chi tiết
                className="block"
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images?.[0] || "/placeholder.svg"}
                  discount={product.discount}
                  category={product.category}
                />
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
  {/* Previous */}
  <button
    onClick={() => goToPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
  >
    &lt;
  </button>

  {/* Các trang */}
  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .slice(
      Math.max(0, currentPage - 3),
      Math.min(totalPages, currentPage + 2)
    )
    .map((p) => (
      <button
        key={p}
        onClick={() => goToPage(p)}
        className={`px-3 py-1 rounded ${
          currentPage === p ? "bg-red-500 text-white" : "bg-gray-100"
        }`}
      >
        {p}
      </button>
    ))}

  {/* Next */}
  <button
    onClick={() => goToPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
  >
    &gt;
  </button>
</div>

        </>
      )}
    </div>
  )
}
