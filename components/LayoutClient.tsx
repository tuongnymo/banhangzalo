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
            <Link href="/" className="text-xl font-bold">
              FULLSTORE FASHION
            </Link>
            <nav className="hidden space-x-6 md:flex">
              <Link href="/" className="hover:text-gray-500">Trang Chủ</Link>
              <Link href="/category/shoes" className="hover:text-gray-500">Shop Nam</Link>
              <Link href="/category/clothing" className="hover:text-gray-500">Shop Nữ</Link>
              <Link href="/category/accessories" className="hover:text-gray-500">Túi Xách & Phụ Kiện</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/search" className="hover:text-gray-500 p-2 touch-manipulation">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </Link>
              <CartIconBadge />
              <Link href="/account" className="hover:text-gray-500 p-2 touch-manipulation">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
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
                  <li><Link href="/category/all" className="hover:text-black block py-1">Tất cả sản phẩm</Link></li>
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
