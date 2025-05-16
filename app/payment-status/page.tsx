"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function PaymentStatusPage() {
  const searchParams = useSearchParams()
  const status = searchParams.get("status") || "pending"
  const orderId = searchParams.get("orderId") || "Unknown"
  const [order, setOrder] = useState(null)

  useEffect(() => {
    // In a real app, we would fetch the order from an API
    // For demo purposes, we'll get it from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = orders.find((o) => o.id === orderId)
    if (foundOrder) {
      setOrder(foundOrder)
    }
  }, [orderId])

  const getStatusInfo = () => {
    switch (status) {
      case "success":
        return {
          title: "Đặt hàng thành công!",
          description: "Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.",
          icon: (
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          ),
          color: "text-green-600",
        }
      case "failed":
        return {
          title: "Thanh toán thất bại",
          description:
            "Đã xảy ra lỗi khi xử lý thanh toán của bạn. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.",
          icon: (
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-red-600"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
          ),
          color: "text-red-600",
        }
      default:
        return {
          title: "Đang xử lý",
          description: "Chúng tôi đang xử lý đơn hàng của bạn. Vui lòng chờ trong giây lát.",
          icon: (
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-blue-600"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          ),
          color: "text-blue-600",
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 p-8 shadow-sm">
        {statusInfo.icon}

        <h1 className={`mt-4 text-center text-2xl font-bold ${statusInfo.color}`}>{statusInfo.title}</h1>
        <p className="mt-2 text-center text-gray-600">{statusInfo.description}</p>

        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <div className="flex justify-between">
            <span className="font-medium">Mã đơn hàng:</span>
            <span>{orderId}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="font-medium">Ngày đặt hàng:</span>
            <span>
              {order ? new Date(order.date).toLocaleDateString("vi-VN") : new Date().toLocaleDateString("vi-VN")}
            </span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="font-medium">Trạng thái:</span>
            <span className={statusInfo.color}>
              {status === "success" ? "Thành công" : status === "failed" ? "Thất bại" : "Đang xử lý"}
            </span>
          </div>
          {order && (
            <div className="mt-2 flex justify-between">
              <span className="font-medium">Tổng tiền:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          )}
        </div>

        {order && (
          <>
            <Separator className="my-6" />

            <h2 className="mb-4 text-xl font-semibold">Thông tin đơn hàng</h2>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Thông tin khách hàng</h3>
                <div className="rounded-lg bg-gray-50 p-4">
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
              </div>

              <div>
                <h3 className="mb-2 font-medium">Sản phẩm</h3>
                <div className="rounded-lg bg-gray-50 p-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="mb-2 flex justify-between">
                      <span>
                        {item.name} ({item.color.name}, {item.size}) x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Tổng cộng:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-8 flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/">Tiếp tục mua sắm</Link>
          </Button>
          <Button asChild>
            <Link href="/orders">Xem đơn hàng của tôi</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
