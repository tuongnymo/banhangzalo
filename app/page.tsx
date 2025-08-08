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

  return (
    <div>
      {/* Hero Section */}
      <BannerCarousel />

      {/* Categories */}
<section className="bg-gray-100 pt-2 pb-6">
  <div className="container mx-auto px-4 text-center">
    <h2 className="mb-6 text-2xl font-bold">Danh mục sản phẩm</h2>

    <div className="overflow-x-auto">
      <div className="grid grid-rows-2 grid-flow-col min-w-[768px] gap-4 px-2 py-2">
      {/* Danh mục 1 */}
      <Link href="/category/giaycongsonam" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg"
            alt="Giày công sở nam"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Giày công sở nam</p>
      </Link>

      {/* Danh mục 2 */}
      <Link href="/category/giaythethaonam" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/tC7MdNq8/giay-the-thao-nam.jpg"
            alt="Giày thể thao nam"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Giày thể thao nam</p>
      </Link>

      {/* Danh mục 3 */}
      <Link href="/category/giayluoinam" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/5yQrHbDh/giay-luoi.jpg"
            alt="Giày lười"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Giày lười nam</p>
      </Link>

      {/* Danh mục 4 */}
      <Link href="/category/giaymlb" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/fL8CFmSx/giay-mlb.jpg"
            alt="Giày MLB"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Giày MLB</p>
      </Link>

      {/* Danh mục 5 */}
      <Link href="/category/bootnam" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/wvwvDFYw/giay-boot-nam.jpg"
            alt="Giày boot nam"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Boot nam</p>
      </Link>

      {/* Danh mục 6 */}
      <Link href="/category/giaycustomnu" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/kXYGrVpr/giay-custom-nu.jpg"
            alt="Giày custom nữ"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Giày custom nữ</p>
      </Link>

      {/* Danh mục 7 */}
      <Link href="/category/giaysneakernu" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/xTw34pxY/giay-sneaker-nu.jpg"
            alt="Giày sneaker nữ"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Giày sneaker nữ</p>
      </Link>

      {/* Danh mục 8 */}
      <Link href="/category/bootnu" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/8CN1bYjb/giay-boot-nu.jpg"
            alt="Giày boot nữ"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Boot nữ</p>
      </Link>

      {/* Danh mục 9 */}
      <Link href="/category/giaycaogot" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/Y9gVtdB9/giay-cao-got.jpg"
            alt="Giày cao gót"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Giày cao gót</p>
      </Link>

      {/* Danh mục 10 */}
      <Link href="/category/depsandalnu" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/L8d08x8k/dep-sandal-nu.jpg"
            alt="Dép sandal nữ"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Dép sandal nữ</p>
      </Link>

      {/* Danh mục 11 */}
      <Link href="/category/quantaynam" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Quần tây nam</p>
      </Link>

      {/* Danh mục 12 */}
      <Link href="/category/quanbonam" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/FsMsc6Yj/tui-xach.jpg"
            alt="Túi xách"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Quần bò nam</p>
      </Link>

      {/* Danh mục 13 */}
      <Link href="/category/quanshortnam" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Quần short nam</p>
      </Link>

      {/* Danh mục 14 */}
      <Link href="/category/aosominam" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Áo sơ mi nam</p>
      </Link>

      {/* Danh mục 15 */}
      <Link href="/category/aopolonam" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Áo polo nam</p>
      </Link>

      {/* Danh mục 16 */}
      <Link href="/category/aophongnam" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Áo phông nam</p>
      </Link>

{/* Danh mục 17 */}
      <Link href="/category/quantaynu" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Quần tây nữ</p>
      </Link>

{/* Danh mục 18 */}
      <Link href="/category/quanbonu" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Quần bò nữ</p>
      </Link>

{/* Danh mục 19 */}
      <Link href="/category/vaynu" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Váy nữ</p>
      </Link>

      {/* Danh mục 20 */}
      <Link href="/category/aosominu" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Áo sơ mi nữ</p>
      </Link>

      {/* Danh mục 21 */}
      <Link href="/category/aophongnu" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Áo phông nữ</p>
      </Link>

      {/* Danh mục 22 */}
      <Link href="/category/aokhoac" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Áo khoác</p>
      </Link>

      {/* Danh mục 23 */}
      <Link href="/category/bobetrai" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Bộ bé trai</p>
      </Link>

      {/* Danh mục 24 */}
      <Link href="/category/bobegai" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Bộ bé gái</p>
      </Link>

      {/* Danh mục 25 */}
      <Link href="/category/vaybegai" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Váy bé gái</p>
      </Link>

      {/* Danh mục 26 */}
      <Link href="/category/tuinam" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Túi nam</p>
      </Link>

      {/* Danh mục 27 */}
      <Link href="/category/tuinu" className="flex flex-col items-center group">
        <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="https://i.postimg.cc/mgCVs9mN/phu-kien.jpg"
            alt="Phụ kiện"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">Túi nữ</p>
      </Link>

    </div>
  </div>
  </div>
</section>


      {/* Featured Collections */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-10 text-3xl font-bold">Bộ Sưu Tập</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Men's Collection */}
            <div className="relative h-80 w-full overflow-hidden rounded-lg">
              <Image src="https://i.postimg.cc/Wp92Z3Lv/3webp.webp" alt="Shoes" fill className="object-cover object-[bottom]" />
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
            <div className="relative h-80 w-full overflow-hidden rounded-lg">
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
