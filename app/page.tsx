"use client"

import Link from "next/link"
import Image from "next/image"
import BannerCarousel from "@/components/BannerCarousel"
import NewArrivals from "@/components/NewArrivals"
import FeaturedProducts from "@/components/FeaturedProducts"
import { useEffect, useState } from "react"
import FloatingButtons from "@/components/FloatingButtons"

export default function Home() {
  const [userInfo, setUserInfo] = useState<any>(null)
  const [sdkError, setSdkError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const categories = [
    { href: "/category/giay-cong-so-nam", src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg", alt: "Giày công sở nam", name: "Giày công sở nam" },
    { href: "/category/giay-the-thao-nam", src: "https://i.postimg.cc/tC7MdNq8/giay-the-thao-nam.jpg", alt: "Giày thể thao nam", name: "Giày thể thao nam" },
    { href: "/category/giay-luoi", src: "https://i.postimg.cc/5yQrHbDh/giay-luoi.jpg", alt: "Giày lười", name: "Giày lười" },
    { href: "/category/giay-mlb", src: "https://i.postimg.cc/fL8CFmSx/giay-mlb.jpg", alt: "Giày MLB", name: "Giày MLB" },
    { href: "/category/giay-boot-nam", src: "https://i.postimg.cc/wvwvDFYw/giay-boot-nam.jpg", alt: "Giày boot nam", name: "Giày boot nam" },
    { href: "/category/giay-custom-nu", src: "https://i.postimg.cc/kXYGrVpr/giay-custom-nu.jpg", alt: "Giày custom nữ", name: "Giày custom nữ" },
    { href: "/category/giay-sneaker-nu", src: "https://i.postimg.cc/xTw34pxY/giay-sneaker-nu.jpg", alt: "Giày sneaker nữ", name: "Giày sneaker nữ" },
    { href: "/category/giay-boot-nu", src: "https://i.postimg.cc/8CN1bYjb/giay-boot-nu.jpg", alt: "Giày boot nữ", name: "Giày boot nữ" },
    { href: "/category/giay-cao-got", src: "https://i.postimg.cc/Y9gVtdB9/giay-cao-got.jpg", alt: "Giày cao gót", name: "Giày cao gót" },
    { href: "/category/dep-sandal-nu", src: "https://i.postimg.cc/L8d08x8k/dep-sandal-nu.jpg", alt: "Dép sandal nữ", name: "Dép sandal nữ" },
    { href: "/category/phu-kien", src: "https://i.postimg.cc/mgCVs9mN/phu-kien.jpg", alt: "Phụ kiện", name: "Phụ kiện" },
    { href: "/category/tui-xach", src: "https://i.postimg.cc/FsMsc6Yj/tui-xach.jpg", alt: "Túi xách", name: "Túi xách" }
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <BannerCarousel />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none" />
      </div>

      {/* Categories */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-16 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase">
                Khám phá
              </span>
            </div>
            <h2 className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Danh mục sản phẩm
            </h2>
            <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
              Khám phá bộ sưu tập đa dạng với những thiết kế độc đáo và chất lượng cao
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 place-items-center">
            {categories.map((category, index) => (
              <Link 
                key={index}
                href={category.href} 
                className={`flex flex-col items-center group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative w-28 h-28 md:w-32 md:h-32 overflow-hidden rounded-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <Image
                    src={category.src || "/placeholder.svg"}
                    alt={category.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-purple-300 rounded-full transition-all duration-500" />
                </div>
                <p className="mt-4 text-sm md:text-base font-semibold text-gray-700 group-hover:text-purple-600 transition-colors duration-300 text-center px-2">
                  {category.name}
                </p>
                <div className="w-0 group-hover:w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="relative bg-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase">
                Bộ sưu tập đặc biệt
              </span>
            </div>
            <h2 className="mb-16 text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Bộ Sưu Tập
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {/* Men's Collection */}
            <div className={`group relative h-96 w-full overflow-hidden rounded-2xl shadow-xl transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-purple-600/60 to-pink-600/80 z-10" />
              <Image 
                src="https://i.postimg.cc/Wp92Z3Lv/3webp.webp" 
                alt="Men's Collection" 
                fill 
                className="object-cover object-bottom transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-8">
                <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-wide">Men's Collection</h3>
                  <p className="text-lg mb-6 opacity-90 max-w-xs">Tối giản. Mạnh mẽ. Lôi cuốn</p>
                  <Link href="/category/shoes">
                    <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      Khám phá ngay
                    </button>
                  </Link>
                </div>
              </div>
              <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-white/30 rounded-2xl transition-all duration-500 z-30" />
            </div>

            {/* Women's Collection */}
            <div className={`group relative h-96 w-full overflow-hidden rounded-2xl shadow-xl transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/80 via-purple-600/60 to-orange-600/80 z-10" />
              <Image
                src="https://i.postimg.cc/90NCHxtM/1webp.webp"
                alt="Women's Collection"
                fill
                className="object-cover object-bottom transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-8">
                <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-wide">Women's Collection</h3>
                  <p className="text-lg mb-6 opacity-90 max-w-xs">Đẹp nhẹ nhàng, cuốn hút tự nhiên</p>
                  <Link href="/category/clothing">
                    <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      Khám phá ngay
                    </button>
                  </Link>
                </div>
              </div>
              <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-white/30 rounded-2xl transition-all duration-500 z-30" />
            </div>
          </div>
        </div>
      </section>

      {/* NewArrivals */}
      <div className="relative">
        <NewArrivals />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
      </div>

      {/* Featured Products */}
      <div className="relative">
        <FeaturedProducts />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
      </div>

      {/* Newsletter */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent)]" />
        
        <div className="container mx-auto px-4 relative">
          <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase">
                Ưu đãi đặc biệt
              </span>
            </div>
            <h2 className="mb-6 text-4xl md:text-5xl font-bold text-white leading-tight">
              Đăng Ký Nhận 
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Ưu đãi</span>
            </h2>
            <p className="mb-10 text-gray-300 text-lg leading-relaxed">
              Hãy để lại thông tin liên hệ để có những ưu đãi dành riêng cho từng khách hàng thân thiết nhé!
            </p>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Số điện thoại của bạn"
                className="flex-1 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm px-6 py-4 text-white placeholder-gray-300 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-300"
              />
              <button className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 font-semibold text-gray-900 hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Đăng Ký
              </button>
            </div>
            
            <p className="mt-6 text-sm text-gray-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Chúng tôi cam kết bảo mật thông tin của bạn
            </p>
          </div>
        </div>
      </section>

      {/* Floating Buttons */}
      <FloatingButtons />
    </div>
  )
}
