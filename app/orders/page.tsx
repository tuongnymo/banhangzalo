"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

export default function OrdersPage() {
  const { user, isLoading } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || isLoading) return

    fetch(`/api/orders?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false))
  }, [user, isLoading])

  if (isLoading || loading) {
    return <div className="text-center py-12">Đang tải danh sách đơn hàng...</div>
  }

  if (!orders.length) {
    return <div className="text-center py-12">Bạn chưa có đơn hàng nào.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Đơn hàng của bạn</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            href={`/orders/${order.id}`}
            key={order.id}
            className="block border rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">Mã đơn: {order.id}</p>
              <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleString("vi-VN")}</p>
            </div>
            <p className="text-gray-700">Trạng thái: {order.status}</p>
            <p className="text-gray-700">
              Tổng cộng:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(order.total + order.shipping_fee)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
