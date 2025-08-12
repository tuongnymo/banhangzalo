"use client"

import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import { Toaster } from "@/components/ui/toaster"
import MobileNavigation from "@/components/MobileNavigation"
import CartIconBadge from "@/components/CartIconBadge"
import Link from "next/link"
import { ReactNode } from "react"
import Script from "next/script"
import MenuDropdown from './ui/MenuDropdown'

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
  <div className="max-w-screen-xl mx-auto px-2 sm:px-4 py-4 overflow-visible"> {/* 👈 dùng max-w cụ thể */}
    
    {/* Logo + Icons */}
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0" /> {/* 👈 đảm bảo không chiếm chỗ cố định */}
      
      <div className="text-2xl sm:text-4xl font-bold text-red-700 text-center truncate">
        <Link href="/">THOITRANGNEW</Link>
      </div>
      
      <div className="flex-1 flex justify-end items-center gap-1 sm:gap-4 flex-shrink-0">
        <Link href="/search" className="hover:text-red-500 p-2">🔍</Link>
        <CartIconBadge />
        <Link href="/account" className="hover:text-red-500 p-2">👤</Link>
      </div>
    </div>

    {/* Menu chia 2 hàng - 5 cột và căn giữa */}
    <nav className="mt-6 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-6 text-lg font-semibold justify-items-center text-center">
  {/* Cột 1 */}
  <Link href="/" className="hover:text-red-500 transition">Trang chủ</Link>
  <Link href="/contact" className="hover:text-red-500 transition">Liên hệ</Link>

        {/* Cột 2 */}
        <MenuDropdown title="Giày nam" items={[
          { label: "Giày công sở", href: "/category/giaycongsonam" },
          { label: "Giày thể thao", href: "/category/giaythethaonam" },
          { label: "Giày lười", href: "/category/giayluoinam" },
          { label: "Giày MLB", href: "/category/giaymlbnam" },
          { label: "Boot nam", href: "/category/bootnam" }
        ]} />
        <MenuDropdown title="Giày nữ" items={[
          { label: "Giày custom", href: "/category/giaycustomnu" },
          { label: "Giày sneaker", href: "/category/giaysneakernu" },
          { label: "Boot nữ", href: "/category/bootnu" },
          { label: "Giày cao gót", href: "/category/giaycaogot" },
          { label: "Dép sandal nữ", href: "/category/depsandalnu" }
        ]} />

        {/* Cột 3 */}
        <MenuDropdown title="Quần nam" items={[
          { label: "Quần tây", href: "/category/quantaynam" },
          { label: "Quần bò", href: "/category/quanbonam" },
          { label: "Quần short", href: "/category/quanshortnam" }
        ]} />
        <MenuDropdown title="Quần nữ" items={[
          { label: "Quần tây", href: "/category/quantaynu" },
          { label: "Quần bò", href: "/category/quanbonu" },
          { label: "Váy nữ", href: "/category/vaynu" }
        ]} />

        {/* Cột 4 */}
        <MenuDropdown title="Áo nam" items={[
          { label: "Áo sơ mi", href: "/category/ao-so-mi-nam" },
          { label: "Áo polo", href: "/category/ao-polo-nam" },
          { label: "Áo phông", href: "/category/ao-phong-nam" }
        ]} />
        <MenuDropdown title="Áo nữ" items={[
          { label: "Áo sơ mi", href: "/category/ao-so-mi-nu" },
          { label: "Áo phông", href: "/category/ao-phong-nu" },
          { label: "Áo khoác", href: "/category/ao-khoac-nu" }
        ]} />

        {/* Cột 5 */}
        <MenuDropdown title="Quần áo trẻ em" items={[
          { label: "Bộ quần áo nam", href: "/category/tre-em-nam" },
          { label: "Bộ quần áo nữ", href: "/category/tre-em-nu" },
          { label: "Váy bé gái", href: "/category/vay-be-gai" }
        ]} />
        <MenuDropdown title="Túi xách" items={[
          { label: "Túi xách nam", href: "/category/tui-xach-nam" },
          { label: "Túi xách nữ", href: "/category/tui-xach-nu" }
        ]} />
      </nav>
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