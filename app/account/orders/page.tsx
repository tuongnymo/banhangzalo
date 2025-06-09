"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

type Order = {
  id: string
  order_code: string | null
  total: number
  status: string
  created_at: string
}

export default function OrdersPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/user")
        const data = await res.json()
        console.log("📦 Đơn hàng từ API:", data)

        if (Array.isArray(data)) {
          setOrders(data)
        } else {
          console.warn("⚠️ Dữ liệu trả về không phải mảng:", data)
          setOrders([])
        }
      } catch (err) {
        console.error("❌ Lỗi khi lấy đơn hàng:", err)
        setOrders([])
      } finally {
        setLoadingOrders(false)
      }
    }

    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated])

  if (isLoading || loadingOrders) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Đang tải đơn hàng...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/account" className="mb-4 inline-flex items-center text-gray-600 hover:text-black">
          ← Quay lại tài khoản
        </Link>
        <h1 className="text-2xl font-bold md:text-3xl">Đơn hàng của tôi</h1>
        <p className="text-gray-600">Xem và theo dõi tất cả đơn hàng của bạn</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-md bg-gray-50 p-8 text-center border border-gray-200">
          <h4 className="mb-2 text-lg font-medium">Chưa có đơn hàng nào</h4>
          <p className="mb-4 text-gray-600">Bạn chưa có đơn hàng nào. Hãy mua sắm ngay!</p>
          <Link
            href="/category/all"
            className="inline-block rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-md border p-4 shadow-sm">
              <p className="text-sm text-gray-500">
                Mã đơn hàng: <strong>{order.order_code || order.id}</strong>
              </p>
              <p className="text-sm">Trạng thái: {order.status}</p>
              <p className="text-sm">Tổng tiền: {order.total.toLocaleString("vi-VN")}₫</p>
              <p className="text-sm text-gray-400">
                Ngày đặt: {new Date(order.created_at).toLocaleDateString("vi-VN")}
              </p>
            </div>
          ))}

          {/* 🧪 Debug view */}
          {/* <pre className="mt-6 text-xs text-gray-400">{JSON.stringify(orders, null, 2)}</pre> */}
        </div>
      )}
    </div>
  )
}
