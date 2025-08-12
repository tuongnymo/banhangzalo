"use client"

import Link from "next/link"
import Image from "next/image"
import BannerCarousel from "@/components/BannerCarousel"
import NewArrivals from "@/components/NewArrivals"
import Categories from "@/components/Categories"
import FeaturedProducts from "@/components/FeaturedProducts"
import { useEffect, useState } from "react"
import FloatingButtons from "@/components/FloatingButtons"


export default function Home() {
  const [userInfo, setUserInfo] = useState<any>(null)
  const [sdkError, setSdkError] = useState<string | null>(null)

  return (
    <div>
      {/* Hero Section */}
      <BannerCarousel />

      {/* Categories */}
      <Categories />

  
      {/* Featured Collections */}
<section className="bg-white py-12">
  <div className="container mx-auto px-4 text-center">
    <h2 className="mb-10 text-3xl font-bold">Bộ Sưu Tập</h2>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 place-items-center">
      {/* Men's Collection */}
      <div className="relative w-full max-w-[600px] aspect-[3/4] overflow-hidden rounded-lg">
        <Image
          src="https://i.postimg.cc/Wp92Z3Lv/3webp.webp"
          alt="Shoes"
          fill
          className="object-cover object-[bottom]"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <h3 className="text-xl font-bold mb-2">Men's Collection</h3>
          <p className="text-sm mb-4 px-4">Tối giản. Mạnh mẽ. Lôi cuốn</p>
          <Link href="/category/shoes">
            <button className="px-4 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-100 transition">
              Shop Now
            </button>
          </Link>
        </div>
      </div>

      {/* Women's Collection */}
      <div className="relative w-full max-w-[600px] aspect-[3/4] overflow-hidden rounded-lg">
        <Image
          src="https://i.postimg.cc/90NCHxtM/1webp.webp"
          alt="Clothing"
          fill
          className="object-cover object-[bottom]"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <h3 className="text-xl font-bold mb-2">Women's Collection</h3>
          <p className="text-sm mb-4 px-4">Đẹp nhẹ nhàng, cuốn hút tự nhiên</p>
          <Link href="/category/clothing">
            <button className="px-4 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-100 transition">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* NewArrivals */}
      <NewArrivals />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Newsletter */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold">Đăng Ký Nhận Ưu đãi</h2>
            <p className="mb-8 text-gray-600">
              Hãy để lại thông tin liên hệ để có những ưu đãi dành riêng cho từng khách hàng thân thiết nhé!
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <input
                type="email"
                placeholder="Số điện thoại của bạn"
                className="flex-1 rounded-md border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
              />
              <button className="rounded-md bg-black px-6 py-3 font-medium text-white hover:bg-gray-800 transition-colors">
                Đăng Ký
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">Chúng tôi cam kết bảo mật thông tin của bạn</p>
          </div>
        </div>
      </section>

      {/*Nút phím tắt Zalo*/}
      <FloatingButtons />
    </div>
  )
}
