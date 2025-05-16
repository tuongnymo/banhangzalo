import Link from "next/link"
import Image from "next/image"
import BannerCarousel from "@/components/BannerCarousel"
import NewArrivals from "@/components/NewArrivals"
import FeaturedProducts from "@/components/FeaturedProducts"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <BannerCarousel />

      {/* Categories */}
      <section className="bg-gray-100 pt-2 pb-6">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-12 text-3xl font-bold">Danh mục sản phẩm</h2>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 place-items-center">
            <Link href="/category/shoes" className="flex flex-col items-center group">
              <div className="relative w-32 h-32 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="https://i.imgur.com/OmDf1oQ.jpeg?height=300&width=300"
                  alt="Shoes"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-base font-semibold text-gray-800 group-hover:text-black">Giày Nam</p>
            </Link>

            <Link href="/category/clothing" className="flex flex-col items-center group">
              <div className="relative w-32 h-32 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="https://i.imgur.com/q3fxdD3.jpeg?height=300&width=300"
                  alt="Clothing"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-base font-semibold text-gray-800 group-hover:text-black">Giày Nữ</p>
            </Link>

            <Link href="/category/accessories" className="flex flex-col items-center group">
              <div className="relative w-32 h-32 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="https://i.imgur.com/i7zcxdp.jpeg?height=300&width=300"
                  alt="Accessories"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-base font-semibold text-gray-800 group-hover:text-black">Túi xách</p>
            </Link>

            <Link href="/category/sale" className="flex flex-col items-center group">
              <div className="relative w-32 h-32 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="https://i.imgur.com/Siyj4qg.jpeg?height=300&width=300"
                  alt="Accessories"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-base font-semibold text-gray-800 group-hover:text-black">Phụ kiện</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-10 text-3xl font-bold">Featured Collections</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Men's Collection */}
            <div className="relative h-80 w-full overflow-hidden rounded-lg">
              <Image src="https://i.imgur.com/UnOqBkj.jpeg" alt="Shoes" fill className="object-cover object-[bottom]" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                <h3 className="text-xl font-bold mb-2">Men's Collection</h3>
                <p className="text-sm mb-4 px-4">Thế giới dành cho phái mạnh</p>
                <Link href="/category/shoes">
                  <button className="px-4 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-100 transition">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Women's Collection */}
            <div className="relative h-80 w-full overflow-hidden rounded-lg">
              <Image
                src="https://i.imgur.com/sK8hHdC.jpeg"
                alt="Clothing"
                fill
                className="object-cover object-[bottom]"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                <h3 className="text-xl font-bold mb-2">Women's Collection</h3>
                <p className="text-sm mb-4 px-4">Sự quyến rũ của phái nữ</p>
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
    </div>
  )
}
