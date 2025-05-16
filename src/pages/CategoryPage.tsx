"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronRight, SlidersHorizontal } from "lucide-react"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import AnimatedProductCard from "../components/AnimatedProductCard"
import CategoryFilters from "../components/CategoryFilters"
import { getProductsByCategory } from "../lib/products"
import LoadingSpinner from "../components/LoadingSpinner"

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
    setIsLoading(false)
    setMounted(true)
  }, [slug])

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return null
  }

  if (!slug) {
    return <div>Category not found</div>
  }

  const categoryTitle = slug === "all" ? "All Products" : slug.charAt(0).toUpperCase() + slug.slice(1)
  const products = getProductsByCategory(slug === "all" ? "" : slug)

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-900">
          Home
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-gray-900">{categoryTitle}</span>
      </nav>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold md:text-3xl">{categoryTitle}</h1>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center md:hidden"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Filters - Desktop */}
        <div className="hidden md:block">
          <CategoryFilters />
        </div>

        {/* Filters - Mobile */}
        {showMobileFilters && (
          <div className="mb-6 md:hidden">
            <div className="rounded-lg border border-gray-200 p-4">
              <CategoryFilters />
            </div>
          </div>
        )}

        {/* Products */}
        <div className="md:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">{products.length} products</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="rounded-md border border-gray-200 p-1 text-sm">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          <Separator className="mb-6" />

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <AnimatedProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images[0]}
                  category={product.category}
                  discount={product.discount}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h2 className="mb-2 text-xl font-semibold">No products found</h2>
              <p className="text-gray-600">Try adjusting your filters or check out our other categories.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
