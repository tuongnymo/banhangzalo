"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import ProductCard from "./ProductCard"
import SkeletonLoader from "./SkeletonLoader"
import { ArrowLeft, ArrowRight } from "lucide-react"

// Sample products data
const newArrivals = [
  {
    id: 5,
    name: "Giày thể thao nam cao cấp",
    price: 699.99,
    image: "https://i.imgur.com/UnOqBkj.jpeg?height=300&width=300",
    category: "shoes",
  },
  {
    id: 6,
    name: "Giày nữ thời trang",
    price: 529.99,
    image: "https://i.imgur.com/sK8hHdC.jpeg?height=300&width=300",
    category: "shoes",
    discount: 15,
  },
  {
    id: 7,
    name: "Túi xách nữ thời trang",
    price: 329.99,
    image: "https://i.imgur.com/5SYdtnG.jpeg?height=300&width=300",
    category: "accessories",
  },
  {
    id: 8,
    name: "Giày thể thao nữ",
    price: 449.99,
    image: "https://i.imgur.com/q3fxdD3.jpeg?height=300&width=300",
    category: "shoes",
    discount: 10,
  },
]

export default function NewArrivals() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<typeof newArrivals>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
    if (isRightSwipe && containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setProducts(newArrivals)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold md:text-3xl relative">
            Sản phẩm mới cập nhật
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-black"></span>
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={containerRef}
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 touch-pan-x"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {loading
              ? // Skeleton loaders while loading
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="min-w-[250px] flex-shrink-0">
                      <SkeletonLoader />
                    </div>
                  ))
              : // Actual products
                products.map((product) => (
                  <div key={product.id} className="min-w-[250px] flex-shrink-0">
                    <ProductCard {...product} />
                  </div>
                ))}
          </div>

          {/* Mobile scroll buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 md:hidden bg-white/80 p-2 rounded-full shadow-md"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 md:hidden bg-white/80 p-2 rounded-full shadow-md"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
