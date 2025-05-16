"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import BannerCarousel from "../components/BannerCarousel"
import AnimatedFeaturedSection from "../components/AnimatedFeaturedSection"
import AnimatedCategorySection from "../components/AnimatedCategorySection"
import AnimatedSection from "../components/AnimatedSection"
import AnimatedProductCard from "../components/AnimatedProductCard"
import { Button } from "../components/ui/button"
import { getAllProducts } from "../lib/products"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  // Scroll to top on page load and set mounted state
  useEffect(() => {
    window.scrollTo(0, 0)
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return null
  }

  const newArrivals = getAllProducts().slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Dynamic Banner Carousel */}
        <BannerCarousel />

        {/* Featured Products with Animation */}
        <AnimatedFeaturedSection />

        {/* Categories with Animation */}
        <AnimatedCategorySection />

        {/* Product Grid with Animation */}
        <AnimatedSection className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">New Arrivals</h2>
              <Link to="/category/all" className="flex items-center text-sm font-medium">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {newArrivals.map((product) => (
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
          </div>
        </AnimatedSection>

        {/* Newsletter with Animation */}
        <AnimatedSection className="bg-gray-100 py-16" delay={0.2}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Join Our Newsletter</h2>
            <p className="mb-8 mx-auto max-w-md text-gray-600">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button className="bg-black text-white hover:bg-gray-800">Subscribe</Button>
            </form>
          </div>
        </AnimatedSection>
      </main>
    </div>
  )
}
