"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

interface Order {
  id: string
  userId: string
  items: any[]
  total: number
  shipping: number
  status: string
  paymentMethod: string
  paymentStatus: string
  shippingInfo: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    district: string
    province: string
    notes: string
  }
  createdAt: string
}

export default function PaymentStatusPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
      return
    }

    if (!orderId) {
      router.push("/account/orders")
      return
    }

    const fetchOrder = async () => {
      try {
        // Mô phỏng gọi API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (user) {
          const ordersJson = localStorage.getItem(`orders_${user.id}`) || "[]"
          const orders = JSON.parse(ordersJson)

          const foundOrder = orders.find((o: Order) => o.id === orderId)

          if (foundOrder) {
            setOrder(foundOrder)
          } else {
            router.push("/account/orders")
          }
        }
      } catch (error) {
        console.error("Error fetching order:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchOrder()
    }
  }, [isLoading, isAuthenticated, router, orderId, user])

  if (isLoading || loading) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black mx-auto"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Thành công"
      case "processing":
        return "Đang xử lý"
      case "pending":
        return "Chờ xác nhận"
      case "cancelled":
        return "Đã hủy"
      default:
        return "Không xác định"
    }
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "cod":
        return "Thanh toán khi nhận hàng (COD)"
      case "bank":
        return "Chuyển khoản ngân hàng"
      case "momo":
        return "Ví MoMo"
      default:
        return "Không xác định"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
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
        <h1 className="text-2xl font-bold md:text-3xl">Đặt hàng thành công!</h1>
        <p className="text-gray-600">
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-6 rounded-lg border border-gray-200 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Đơn hàng #{order.id.slice(-8)}</h2>
              <p className="text-sm text-gray-600">Đặt ngày {formatDate(order.createdAt)}</p>
            </div>
            <div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
              >
                {getStatusText(order.status)}
              </span>
            </div>
          </div>

          <div className="mb-6 border-t border-gray-200 pt-4">
            <h3 className="mb-3 text-sm font-medium uppercase text-gray-500">Chi tiết đơn hàng</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    {item.image ? (
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.size} / {item.color.name}
                    </p>
                    <div className="mt-1 flex justify-between text-sm">
                      <p>
                        {item.quantity} x{" "}
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                        item.price * item.quantity,
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 border-t border-gray-200 pt-4">
            <h3 className="mb-3 text-sm font-medium uppercase text-gray-500">Tóm tắt thanh toán</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <p>Tạm tính</p>
                <p>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Phí vận chuyển</p>
                <p>
                  {order.shipping === 0
                    ? "Miễn phí"
                    : new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.shipping)}
                </p>
              </div>
              <div className="flex justify-between font-medium">
                <p>Tổng cộng</p>
                <p>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                    order.total + order.shipping,
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-medium uppercase text-gray-500">Thông tin giao hàng</h3>
              <p className="text-sm">{order.shippingInfo.fullName}</p>
              <p className="text-sm">{order.shippingInfo.phone}</p>
              <p className="text-sm">{order.shippingInfo.address}</p>
              <p className="text-sm">
                {order.shippingInfo.city}, {order.shippingInfo.district && `${order.shippingInfo.district},`}{" "}
                {order.shippingInfo.province}
              </p>
              {order.shippingInfo.notes && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Ghi chú:</p>
                  <p className="text-sm text-gray-600">{order.shippingInfo.notes}</p>
                </div>
              )}
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium uppercase text-gray-500">Phương thức thanh toán</h3>
              <p className="text-sm">{getPaymentMethodText(order.paymentMethod)}</p>
              <p className="mt-2 text-sm">
                <span className="font-medium">Trạng thái thanh toán:</span>{" "}
                <span className={order.paymentStatus === "completed" ? "text-green-600" : "text-yellow-600"}>
                  {order.paymentStatus === "completed" ? "Đã thanh toán" : "Chưa thanh toán"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              href="/account/orders"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Xem đơn hàng của tôi
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
