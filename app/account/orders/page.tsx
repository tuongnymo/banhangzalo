"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

export default function OrdersPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Chuyển hướng nếu chưa đăng nhập
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Hiển thị loading khi đang kiểm tra trạng thái đăng nhập
  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black mx-auto"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  // Nếu chưa đăng nhập, không hiển thị gì (sẽ được chuyển hướng bởi useEffect)
  if (!isAuthenticated) {
    return null
  }

  // Mô phỏng danh sách đơn hàng trống
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/account" className="mb-4 inline-flex items-center text-gray-600 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          Quay lại tài khoản
        </Link>
        <h1 className="text-2xl font-bold md:text-3xl">Đơn hàng của tôi</h1>
        <p className="text-gray-600">Xem và theo dõi tất cả đơn hàng của bạn</p>
      </div>

      <div className="rounded-lg border border-gray-200">
        <div className="rounded-md bg-gray-50 p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-4 text-gray-400"
          >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <h4 className="mb-2 text-lg font-medium">Chưa có đơn hàng nào</h4>
          <p className="mb-4 text-gray-600">Bạn chưa có đơn hàng nào. Hãy mua sắm ngay!</p>
          <Link
            href="/category/all"
            className="inline-block rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Mua sắm ngay
          </Link>
        </div>
      </div>
    </div>
  )
}
