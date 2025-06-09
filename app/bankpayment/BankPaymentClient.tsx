"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function BankPaymentClient() {
  const searchParams = useSearchParams()
  const orderCode = searchParams?.get("orderCode")

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl font-bold mb-4">💳 Thanh toán chuyển khoản</h1>
      <p className="mb-2">Mã đơn hàng của bạn: <strong>{orderCode}</strong></p>
      <p className="mb-6">Vui lòng quét mã QR bên dưới để chuyển khoản và xác nhận với chúng tôi.</p>

      <div className="flex justify-center mb-4">
        <Image
          src="https://i.postimg.cc/gj2sp3yR/Screenshot-1.jpg"
          alt="QR Code"
          width={200}
          height={200}
        />
      </div>

      <p className="mb-4 text-sm text-gray-600">
        💬 Sau khi chuyển khoản, hãy gửi ảnh xác nhận qua Zalo:
        <br />
        <Link
          href="https://zalo.me/2997034025843763325"
          target="_blank"
          className="text-blue-600 font-bold text-lg underline hover:text-blue-800"
        >
          Xác nhận đã thanh toán
        </Link>
      </p>

      <Link href="/" className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
        Quay về trang chủ
      </Link>
    </div>
  )
}
