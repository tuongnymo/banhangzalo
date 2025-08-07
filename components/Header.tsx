"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { cartCount } = useCart()

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            FULLSTORE FASHION
          </Link>

          {/* Desktop Navigation */}
<nav className="hidden md:block">
  <ul className="flex space-x-8">
    {/* Trang chủ */}
    <li>
      <Link href="/" className="hover:text-gray-600">
        Trang Chủ
      </Link>
    </li>

    {/* Giày nam */}
    <li className="relative group">
      <Link href="#" className="hover:text-gray-600">Giày Nam</Link>
      <ul className="absolute left-0 mt-2 hidden w-48 bg-white shadow-lg group-hover:block">
        <li><Link href="/category/giay-cong-so" className="block px-4 py-2 hover:bg-gray-100">Giày công sở</Link></li>
        <li><Link href="/category/giay-the-thao" className="block px-4 py-2 hover:bg-gray-100">Giày thể thao</Link></li>
        <li><Link href="/category/giay-luoi" className="block px-4 py-2 hover:bg-gray-100">Giày lười</Link></li>
        <li><Link href="/category/giay-mlb" className="block px-4 py-2 hover:bg-gray-100">Giày MLB</Link></li>
        <li><Link href="/category/boot-nam" className="block px-4 py-2 hover:bg-gray-100">Boot nam</Link></li>
      </ul>
    </li>

    {/* Giày nữ */}
    <li className="relative group">
      <Link href="#" className="hover:text-gray-600">Giày Nữ</Link>
      <ul className="absolute left-0 mt-2 hidden w-48 bg-white shadow-lg group-hover:block">
        <li><Link href="/category/giay-custom" className="block px-4 py-2 hover:bg-gray-100">Giày custom</Link></li>
        <li><Link href="/category/giay-sneaker" className="block px-4 py-2 hover:bg-gray-100">Giày sneaker</Link></li>
        <li><Link href="/category/boot-nu" className="block px-4 py-2 hover:bg-gray-100">Boot nữ</Link></li>
        <li><Link href="/category/giay-cao-got" className="block px-4 py-2 hover:bg-gray-100">Giày cao gót</Link></li>
        <li><Link href="/category/dep-sandal-nu" className="block px-4 py-2 hover:bg-gray-100">Dép sandal nữ</Link></li>
      </ul>
    </li>

    {/* Quần nam */}
    <li className="relative group">
      <Link href="#" className="hover:text-gray-600">Quần Nam</Link>
      <ul className="absolute left-0 mt-2 hidden w-48 bg-white shadow-lg group-hover:block">
        <li><Link href="/category/quan-tay-nam" className="block px-4 py-2 hover:bg-gray-100">Quần tây</Link></li>
        <li><Link href="/category/quan-bo-nam" className="block px-4 py-2 hover:bg-gray-100">Quần bò</Link></li>
        <li><Link href="/category/quan-short-nam" className="block px-4 py-2 hover:bg-gray-100">Quần short</Link></li>
      </ul>
    </li>

    {/* Áo nam */}
    <li className="relative group">
      <Link href="#" className="hover:text-gray-600">Áo Nam</Link>
      <ul className="absolute left-0 mt-2 hidden w-48 bg-white shadow-lg group-hover:block">
        <li><Link href="/category/ao-so-mi-nam" className="block px-4 py-2 hover:bg-gray-100">Áo sơ mi</Link></li>
        <li><Link href="/category/ao-polo-nam" className="block px-4 py-2 hover:bg-gray-100">Áo polo</Link></li>
        <li><Link href="/category/ao-phong-nam" className="block px-4 py-2 hover:bg-gray-100">Áo phông</Link></li>
      </ul>
    </li>

    {/* Quần nữ */}
    <li className="relative group">
      <Link href="#" className="hover:text-gray-600">Quần Nữ</Link>
      <ul className="absolute left-0 mt-2 hidden w-48 bg-white shadow-lg group-hover:block">
        <li><Link href="/category/quan-tay-nu" className="block px-4 py-2 hover:bg-gray-100">Quần tây</Link></li>
        <li><Link href="/category/quan-bo-nu" className="block px-4 py-2 hover:bg-gray-100">Quần bò</Link></li>
        <li><Link href="/category/vay-nu" className="block px-4 py-2 hover:bg-gray-100">Váy nữ</Link></li>
      </ul>
    </li>

    {/* Áo nữ */}
    <li className="relative group">
      <Link href="#" className="hover:text-gray-600">Áo Nữ</Link>
      <ul className="absolute left-0 mt-2 hidden w-48 bg-white shadow-lg group-hover:block">
        <li><Link href="/category/ao-so-mi-nu" className="block px-4 py-2 hover:bg-gray-100">Áo sơ mi</Link></li>
        <li><Link href="/category/ao-phong-nu" className="block px-4 py-2 hover:bg-gray-100">Áo phông</Link></li>
        <li><Link href="/category/ao-khoac-nu" className="block px-4 py-2 hover:bg-gray-100">Áo khoác</Link></li>
      </ul>
    </li>

    {/* Quần áo trẻ em */}
    <li className="relative group">
      <Link href="#" className="hover:text-gray-600">Quần Áo Trẻ Em</Link>
      <ul className="absolute left-0 mt-2 hidden w-56 bg-white shadow-lg group-hover:block">
        <li><Link href="/category/bo-quan-ao-nam-tre-em" className="block px-4 py-2 hover:bg-gray-100">Bộ quần áo nam</Link></li>
        <li><Link href="/category/bo-quan-ao-nu-tre-em" className="block px-4 py-2 hover:bg-gray-100">Bộ quần áo nữ</Link></li>
        <li><Link href="/category/vay-be-gai" className="block px-4 py-2 hover:bg-gray-100">Váy bé gái</Link></li>
      </ul>
    </li>

    {/* Túi xách */}
    <li className="relative group">
      <Link href="#" className="hover:text-gray-600">Túi Xách</Link>
      <ul className="absolute left-0 mt-2 hidden w-48 bg-white shadow-lg group-hover:block">
        <li><Link href="/category/tui-xach-nam" className="block px-4 py-2 hover:bg-gray-100">Túi xách nam</Link></li>
        <li><Link href="/category/tui-xach-nu" className="block px-4 py-2 hover:bg-gray-100">Túi xách nữ</Link></li>
      </ul>
    </li>
  </ul>
</nav>


          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-500 hover:text-black">
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
                  <form action="/search" className="flex">
                    <input
                      type="text"
                      name="q"
                      placeholder="Search products..."
                      className="flex-1 border-none p-2 focus:outline-none"
                    />
                    <button type="submit" className="p-2 text-gray-500 hover:text-black">
                      <span className="sr-only">Search</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Account */}
            <div className="relative">
              {isAuthenticated ? (
                <Link href="/account" className="text-gray-500 hover:text-black">
                  <span className="sr-only">Account</span>
                  <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-200">
                    {user?.user_metadata?.avatar_url ? (
  <img
    src={user.user_metadata.avatar_url || "/placeholder.svg"}
    alt={user.user_metadata.full_name || "Avatar"}
    className="h-full w-full object-cover"
  />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    )}
                  </div>
                </Link>
              ) : (
                <Link href="/login" className="text-gray-500 hover:text-black">
                  <span className="sr-only">Login</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative text-gray-500 hover:text-black">
              <span className="sr-only">Cart</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
