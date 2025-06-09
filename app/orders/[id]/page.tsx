// app/orders/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function OrderStatusPage() {
  const params = useParams()
  const id = params?.id
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="py-12 text-center">Đang tải đơn hàng...</div>
  }

  if (!order) {
    return <div className="py-12 text-center text-red-500">Không tìm thấy đơn hàng.</div>
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Trạng thái đơn hàng</h1>

      <div className="space-y-4 text-gray-700">
        <p><strong>Mã đơn hàng:</strong> {order!.id}</p>
        <p><strong>Phương thức thanh toán:</strong> {order!.payment_method}</p>
        <p><strong>Trạng thái thanh toán:</strong> {order!.payment_status}</p>
        <p><strong>Trạng thái đơn hàng:</strong> {order!.status}</p>
        <p><strong>Tổng cộng:</strong> {Number(order!.total).toLocaleString("vi-VN")}₫</p>

        {order!.shipping_info && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Thông tin giao hàng</h2>
            <p><strong>Họ tên:</strong> {order!.shipping_info.fullName}</p>
            <p><strong>Email:</strong> {order!.shipping_info.email}</p>
            <p><strong>SĐT:</strong> {order!.shipping_info.phone}</p>
            <p><strong>Địa chỉ:</strong> {order!.shipping_info.address}, {order!.shipping_info.city}, {order!.shipping_info.district}, {order!.shipping_info.province}</p>
            {order!.shipping_info.notes && (
              <p><strong>Ghi chú:</strong> {order!.shipping_info.notes}</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
          Quay về Trang chủ
        </Link>
      </div>
    </div>
  )
}
