"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const orderCode = searchParams?.get("orderCode")

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
      <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
        Cảm ơn bạn đã đặt hàng tại FULLSTORE FASHION!
      </h1>

      <p className="text-base text-gray-600 mb-6">
        Đơn hàng của bạn đã được ghi nhận thành công. Chúng tôi sẽ kiểm tra và xử lý sớm nhất.
      </p>

      {orderCode && (
  <div className="inline-block bg-gray-100 px-6 py-3 rounded-md shadow-sm mb-6">
    <p className="text-sm text-gray-500 mb-1">Mã đơn hàng</p>
    <p className="text-lg font-semibold text-gray-800">{orderCode}</p>
  </div>
)}

      <div className="text-left text-gray-700 space-y-4 mb-8">
        <p><strong>⏳ Xử lý:</strong> Đơn hàng sẽ được xác nhận và xử lý trong vòng 24 giờ.</p>
        <p><strong>🚚 Giao hàng:</strong> Thời gian dự kiến từ 2 – 5 ngày làm việc.</p>
        <p><strong>📨 Thông báo:</strong> Bạn sẽ nhận được email và tin nhắn khi đơn hàng được giao đi.</p>
        <p><strong>📞 Cần hỗ trợ?</strong> Vui lòng liên hệ qua <Link href="https://zalo.me/354268795269709851" className="text-blue-600 underline" target="_blank">Zalo Official</Link>.</p>
      </div>

      <Link
        href="/"
        className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
      >
        Quay về Trang chủ
      </Link>
    </div>
  )
}
