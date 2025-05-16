"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { motion } from "framer-motion"

export default function PaymentStatusPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCart()
  const [orderNumber, setOrderNumber] = useState("")

  // Get status from URL query parameter
  const status = searchParams.get("status") || "pending"

  useEffect(() => {
    // Generate random order number
    setOrderNumber(Math.floor(100000 + Math.random() * 900000).toString())

    // Clear cart if payment was successful
    if (status === "success") {
      clearCart()
    }

    // Redirect to home after 10 seconds if status is pending
    if (status === "pending") {
      const timer = setTimeout(() => {
        router.push("/")
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [status, clearCart, router])

  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-green-600">Thanh toán thành công!</h1>
          <p className="mb-2 text-xl font-semibold">Cảm ơn bạn đã mua hàng</p>
          <p className="mb-6 text-gray-600">
            Đơn hàng #{orderNumber} của bạn đã được xác nhận. Chúng tôi sẽ gửi email xác nhận và thông tin theo dõi đơn
            hàng cho bạn.
          </p>

          <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold">Thông tin đơn hàng</h3>
            <p className="text-sm text-gray-600">Mã đơn hàng: #{orderNumber}</p>
            <p className="text-sm text-gray-600">Ngày đặt hàng: {new Date().toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Phương thức thanh toán: Thanh toán khi nhận hàng</p>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/">Tiếp tục mua sắm</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/orders">Xem đơn hàng</Link>
            </Button>
          </div>
        </motion.div>
      )}

      {status === "failed" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-600"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-red-600">Thanh toán thất bại</h1>
          <p className="mb-6 text-gray-600">
            Rất tiếc, đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
          </p>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/checkout">Thử lại</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Quay lại trang chủ</Link>
            </Button>
          </div>
        </motion.div>
      )}

      {status === "pending" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-yellow-600"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-yellow-600">Đang xử lý thanh toán</h1>
          <p className="mb-2">Thanh toán của bạn đang được xử lý.</p>
          <p className="mb-6 text-gray-600">
            Vui lòng không đóng trang này. Bạn sẽ được chuyển hướng tự động khi quá trình hoàn tất.
          </p>

          <div className="mb-6 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
          </div>

          <p className="text-sm text-gray-500">Bạn sẽ được chuyển hướng tự động sau 10 giây...</p>
        </motion.div>
      )}
    </div>
  )
}
