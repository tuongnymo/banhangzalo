"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import ClickableProductCard from "@/components/ClickableProductCard"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
  const fetchFeatured = async () => {
    try {
      const res = await fetch("/api/allinone")
      const data = await res.json()
      console.log("🔥 Best sellers:", data.bestSellers)
      setProducts(data.bestSellers)
    } catch (err) {
      console.error("❌ Lỗi khi fetch featured products:", err)
    }
  }

  fetchFeatured()
}, [])

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2">Sản Phẩm Bán Chạy</h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Khám phá những sản phẩm được yêu thích nhất của chúng tôi, được chọn lọc dựa trên sự ưa chuộng của khách
            hàng
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
         {products.map((product) => (
  <Link key={product.id} href={`/product/${product.id}`}>
    <ClickableProductCard
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

        <div className="mt-12 text-center">
          <Link
            href="/category"
            className="inline-block px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Xem Tất Cả Sản Phẩm
          </Link>
        </div>
      </div>
    </section>
  )
}

function FeaturedProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
  <motion.div
    className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: product.id * 0.1 }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <Link href={`/product/${product.id}`}>
      {/* Khung ảnh */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          src={product.images?.[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-black shadow-md hover:bg-gray-100 transition-colors">
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Phần text */}
      <div className="p-4">
        <h3 className="mb-1 text-base font-medium line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="mb-2 text-xs text-gray-500 uppercase tracking-wider">
          {product.category}
        </p>
        <p className="font-medium">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  </motion.div>
)
}
