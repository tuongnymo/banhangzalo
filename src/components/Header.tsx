"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { ShoppingBag, Search } from "lucide-react"
import { Button } from "./ui/button"
import MobileMenu from "./MobileMenu"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-gray-200 bg-white transition-shadow ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center md:hidden">
          <MobileMenu />
        </div>

        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold tracking-tighter md:text-2xl">
            NOIR
          </Link>
        </div>

        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link
            to="/category/shoes"
            className={`text-sm font-medium transition-colors hover:text-gray-500 ${
              location.pathname.includes("/category/shoes") ? "text-black" : "text-gray-600"
            }`}
          >
            Shoes
          </Link>
          <Link
            to="/category/clothing"
            className={`text-sm font-medium transition-colors hover:text-gray-500 ${
              location.pathname.includes("/category/clothing") ? "text-black" : "text-gray-600"
            }`}
          >
            Clothing
          </Link>
          <Link
            to="/category/accessories"
            className={`text-sm font-medium transition-colors hover:text-gray-500 ${
              location.pathname.includes("/category/accessories") ? "text-black" : "text-gray-600"
            }`}
          >
            Accessories
          </Link>
          <Link
            to="/category/all"
            className={`text-sm font-medium transition-colors hover:text-gray-500 ${
              location.pathname === "/category/all" ? "text-black" : "text-gray-600"
            }`}
          >
            All Products
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-900">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-900" asChild>
            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
