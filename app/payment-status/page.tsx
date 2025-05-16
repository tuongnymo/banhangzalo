"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function PaymentStatusPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const status = searchParams.get("status") || "pending"
  const [order, setOrder] = useState(null)

  useEffect(() => {
    // In a real app, you would fetch the order from an API
    // For demo purposes, we'll get it from localStorage
    if (typeof window !== "undefined" && orderId) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const foundOrder = orders.find((o) => o.id === orderId)
      if (foundOrder) {
        setOrder(foundOrder)
      }
    }
  }, [orderId])

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "success":
        return "Thanh toán thành công"
      case "failed":
        return "Thanh toán thất bại"
      default:
        return "Đang xử lý thanh toán"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )
      case "failed":
        return (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        {getStatusIcon()}

        <h1 className="mt-6 text-center text-2xl font-bold">{getStatusText()}</h1>

        <div className={`mt-4 rounded-md p-3 text-center ${getStatusColor()}`}>
          {status === "success"
            ? "Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ giao hàng trong thời gian sớm nhất."
            : status === "failed"
              ? "Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại hoặc chọn phương thức thanh toán khác."
              : "Đơn hàng của bạn đang được xử lý. Vui lòng chờ trong giây lát."}
        </div>

        {order && (
          <div className="mt-8">
            <div className="flex justify-between">
              <span className="font-medium">Mã đơn hàng:</span>
              <span>{order.id}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="font-medium">Ngày đặt hàng:</span>
              <span>{new Date(order.date).toLocaleDateString()}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="font-medium">Phương thức thanh toán:</span>
              <span>
                {order.paymentMethod === "cod"
                  ? "Thanh toán khi nhận hàng"
                  : order.paymentMethod === "bank"
                    ? "Chuyển khoản ngân hàng"
                    : "Ví MoMo"}
              </span>
            </div>

            <Separator className="my-4" />

            <h3 className="mb-3 font-semibold">Thông tin khách hàng</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Họ tên:</span> {order.customer.firstName} {order.customer.lastName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {order.customer.email}
              </p>
              <p>
                <span className="font-medium">Số điện thoại:</span> {order.customer.phone}
              </p>
              <p>
                <span className="font-medium">Địa chỉ:</span> {order.customer.address}, {order.customer.district},{" "}
                {order.customer.city}, {order.customer.province}
              </p>
            </div>

            <Separator className="my-4" />

            <h3 className="mb-3 font-semibold">Chi tiết đơn hàng</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color.name}`} className="flex items-center gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={item.image || "/placeholder.svg?height=48&width=48"}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.color.name} / {item.size} / SL: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span>${(order.total - order.shippingCost).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span>{order.shippingCost === 0 ? "Miễn phí" : `$${order.shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Tổng cộng</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button asChild className="flex-1">
            <Link href="/">Tiếp tục mua sắm</Link>
          </Button>
          {status === "success" && (
            <Button asChild variant="outline" className="flex-1">
              <Link href="/orders">Xem đơn hàng của tôi</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
