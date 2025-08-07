"use client"

import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import { Toaster } from "@/components/ui/toaster"
import MobileNavigation from "@/components/MobileNavigation"
import CartIconBadge from "@/components/CartIconBadge"
import Link from "next/link"
import { ReactNode } from "react"
import Script from "next/script"

export default function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <>
      <Script
        src="https://sp.zalo.me/sdk.js"
        strategy="beforeInteractive"
        onError={() => {
          console.error("❌ Không thể load Zalo Mini App SDK.")
        }}
      />
      <AuthProvider>
      <CartProvider>
  <header className="border-b border-gray-200">
    <div className="container mx-auto flex items-center justify-between p-4">
      
      {/* Menu chính */}
      <nav className="hidden md:flex space-x-6 font-semibold">
        
        {/* Trang Chủ */}
        <Link
          href="/"
          className="hover:text-red-500 transition-colors duration-200"
        >
          Trang Chủ
        </Link>

        {/* Giày Nam */}
        <div className="relative group">
          <Link
            href="/category/giay-nam"
            className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200"
          >
            Giày Nam
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <div className="absolute left-0 mt-2 hidden w-48 rounded-md bg-white shadow-lg group-hover:block">
            <ul className="py-2">
              <li><Link href="/category/giay-cong-so" className="block px-4 py-2 hover:bg-gray-100">Giày công sở</Link></li>
              <li><Link href="/category/giay-the-thao" className="block px-4 py-2 hover:bg-gray-100">Giày thể thao</Link></li>
              <li><Link href="/category/giay-luoi" className="block px-4 py-2 hover:bg-gray-100">Giày lười</Link></li>
              <li><Link href="/category/giay-mlb" className="block px-4 py-2 hover:bg-gray-100">Giày MLB</Link></li>
              <li><Link href="/category/boot-nam" className="block px-4 py-2 hover:bg-gray-100">Boot nam</Link></li>
            </ul>
          </div>
        </div>

        {/* Giày Nữ */}
        <div className="relative group">
          <Link
            href="/category/giay-nu"
            className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200"
          >
            Giày Nữ
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <div className="absolute left-0 mt-2 hidden w-48 rounded-md bg-white shadow-lg group-hover:block">
            <ul className="py-2">
              <li><Link href="/category/giay-custom" className="block px-4 py-2 hover:bg-gray-100">Giày custom</Link></li>
              <li><Link href="/category/giay-sneaker" className="block px-4 py-2 hover:bg-gray-100">Giày sneaker</Link></li>
              <li><Link href="/category/boot-nu" className="block px-4 py-2 hover:bg-gray-100">Boot nữ</Link></li>
              <li><Link href="/category/giay-cao-got" className="block px-4 py-2 hover:bg-gray-100">Giày cao gót</Link></li>
              <li><Link href="/category/sandal-nu" className="block px-4 py-2 hover:bg-gray-100">Dép sandal nữ</Link></li>
            </ul>
          </div>
        </div>

        {/* Quần Nam */}
        <div className="relative group">
          <Link
            href="/category/quan-nam"
            className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200"
          >
            Quần Nam
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <div className="absolute left-0 mt-2 hidden w-48 rounded-md bg-white shadow-lg group-hover:block">
            <ul className="py-2">
              <li><Link href="/category/quan-tay-nam" className="block px-4 py-2 hover:bg-gray-100">Quần tây</Link></li>
              <li><Link href="/category/quan-bo-nam" className="block px-4 py-2 hover:bg-gray-100">Quần bò</Link></li>
              <li><Link href="/category/quan-short-nam" className="block px-4 py-2 hover:bg-gray-100">Quần short</Link></li>
            </ul>
          </div>
        </div>

        {/* Áo Nam */}
        <div className="relative group">
          <Link
            href="/category/ao-nam"
            className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200"
          >
            Áo Nam
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <div className="absolute left-0 mt-2 hidden w-48 rounded-md bg-white shadow-lg group-hover:block">
            <ul className="py-2">
              <li><Link href="/category/ao-so-mi-nam" className="block px-4 py-2 hover:bg-gray-100">Áo sơ mi</Link></li>
              <li><Link href="/category/ao-polo-nam" className="block px-4 py-2 hover:bg-gray-100">Áo polo</Link></li>
              <li><Link href="/category/ao-phong-nam" className="block px-4 py-2 hover:bg-gray-100">Áo phông</Link></li>
            </ul>
          </div>
        </div>

        {/* Quần Nữ */}
        <div className="relative group">
          <Link
            href="/category/quan-nu"
            className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200"
          >
            Quần Nữ
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <div className="absolute left-0 mt-2 hidden w-48 rounded-md bg-white shadow-lg group-hover:block">
            <ul className="py-2">
              <li><Link href="/category/quan-tay-nu" className="block px-4 py-2 hover:bg-gray-100">Quần tây</Link></li>
              <li><Link href="/category/quan-bo-nu" className="block px-4 py-2 hover:bg-gray-100">Quần bò</Link></li>
              <li><Link href="/category/vay-nu" className="block px-4 py-2 hover:bg-gray-100">Váy nữ</Link></li>
            </ul>
          </div>
        </div>

        {/* Áo Nữ */}
        <div className="relative group">
          <Link
            href="/category/ao-nu"
            className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200"
          >
            Áo Nữ
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <div className="absolute left-0 mt-2 hidden w-48 rounded-md bg-white shadow-lg group-hover:block">
            <ul className="py-2">
              <li><Link href="/category/ao-so-mi-nu" className="block px-4 py-2 hover:bg-gray-100">Áo sơ mi</Link></li>
              <li><Link href="/category/ao-phong-nu" className="block px-4 py-2 hover:bg-gray-100">Áo phông</Link></li>
              <li><Link href="/category/ao-khoac-nu" className="block px-4 py-2 hover:bg-gray-100">Áo khoác</Link></li>
            </ul>
          </div>
        </div>

        {/* Quần Áo Trẻ Em */}
        <div className="relative group">
          <Link
            href="/category/tre-em"
            className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200"
          >
            Quần Áo Trẻ Em
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <div className="absolute left-0 mt-2 hidden w-56 rounded-md bg-white shadow-lg group-hover:block">
            <ul className="py-2">
              <li><Link href="/category/tre-em-nam" className="block px-4 py-2 hover:bg-gray-100">Bộ quần áo nam</Link></li>
              <li><Link href="/category/tre-em-nu" className="block px-4 py-2 hover:bg-gray-100">Bộ quần áo nữ</Link></li>
              <li><Link href="/category/vay-be-gai" className="block px-4 py-2 hover:bg-gray-100">Váy bé gái</Link></li>
            </ul>
          </div>
        </div>

        {/* Túi Xách */}
        <div className="relative group">
          <Link
            href="/category/tui-xach"
            className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200"
          >
            Túi Xách
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <div className="absolute left-0 mt-2 hidden w-48 rounded-md bg-white shadow-lg group-hover:block">
            <ul className="py-2">
              <li><Link href="/category/tui-xach-nam" className="block px-4 py-2 hover:bg-gray-100">Túi xách nam</Link></li>
              <li><Link href="/category/tui-xach-nu" className="block px-4 py-2 hover:bg-gray-100">Túi xách nữ</Link></li>
            </ul>
          </div>
        </div>

      </nav>

      {/* Icons bên phải */}
      <div className="flex items-center space-x-4">
        <Link href="/search" className="hover:text-red-500 p-2 touch-manipulation">
          🔍
        </Link>
        <CartIconBadge />
        <Link href="/account" className="hover:text-red-500 p-2 touch-manipulation">
          👤
        </Link>
      </div>
    </div>
  </header>

        <main className="pb-20 md:pb-0">{children}</main>

        <footer className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 text-lg font-bold">FULLSTORE FASHION</h3>
                <p className="text-gray-600">Uy tín, Chất lượng tạo nên thương hiệu</p>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Cửa Hàng</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><Link href="/category/shoes" className="hover:text-black block py-1">Shop Nam</Link></li>
                  <li><Link href="/category/clothing" className="hover:text-black block py-1">Shop Nữ</Link></li>
                  <li><Link href="/category/accessories" className="hover:text-black block py-1">Túi Xách & Phụ Kiện</Link></li>
                  <li><Link href="/category" className="hover:text-black block py-1">Tất cả sản phẩm</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Chăm Sóc Khách Hàng</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><Link href="/about" className="hover:text-black block py-1">Về chúng tôi</Link></li>
                  <li><Link href="/contact" className="hover:text-black block py-1">Liên hệ</Link></li>
                  <li><Link href="/terms" className="hover:text-black block py-1">Điều khoản và điều kiện</Link></li>
                  <li><Link href="/privacy" className="hover:text-black block py-1">Chính sách bảo mật</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Liên Kết</h3>
                <div className="flex space-x-4">
                  {["facebook", "instagram", "twitter"].map((item, idx) => (
                    <a key={idx} href="#" className="hover:text-gray-500 p-2">
                      {/* bạn có thể nhúng svg tương ứng */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-200 pt-8 text-center">
              <p className="text-gray-600">© 2025 FULLSTORE FASHION. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <MobileNavigation />
        <Toaster />
      </CartProvider>
    </AuthProvider>
    </>
  )
}