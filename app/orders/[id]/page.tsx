"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { motion } from "framer-motion"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false)

  // Sample order data - in a real app, you would fetch this from an API
  const order = {
    id: params.id,
    date: "2023-05-15",
    status: "Đã giao hàng",
    total: 1299000,
    shippingFee: 30000,
    items: [
      {
        id: "1",
        name: "Giày thể thao nam cao cấp",
        price: 699000,
        quantity: 1,
        size: "42",
        color: "Đen",
        image: "https://i.imgur.com/UnOoBKj.jpeg",
      },
      {
        id: "2",
        name: "Giày nữ thời trang",
        price: 600000,
        quantity: 1,
        size: "38",
        color: "Trắng",
        image: "https://i.imgur.com/sk9HdGC.jpeg",
      },
    ],
    shipping: {
      name: "Nguyễn Văn A",
      address: "123 Đường ABC, Quận 1",
      city: "TP HCM",
      phone: "0123456789",
    },
    payment: {
      method: "Thanh toán khi nhận hàng (COD)",
      status: "Đã thanh toán",
    },
  }

  const handleCancelOrder = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Đơn hàng đã được hủy thành công!")
    }, 1500)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="container mx-auto px-4 py-8" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <motion.h1 className="text-2xl font-bold md:text-3xl" variants={itemVariants}>
          Chi tiết đơn hàng #{order.id}
        </motion.h1>

        <motion.div className="flex gap-2" variants={itemVariants}>
          <Button asChild variant="outline">
            <Link href="/orders">Quay lại</Link>
          </Button>
          {order.status !== "Đã giao hàng" && (
            <Button variant="destructive" onClick={handleCancelOrder} disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                "Hủy đơn hàng"
              )}
            </Button>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between bg-gray-50 p-4">
              <div>
                <p className="font-medium">Trạng thái đơn hàng</p>
                <p className="text-sm text-gray-500">Cập nhật lần cuối: {new Date().toLocaleDateString()}</p>
              </div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                  order.status === "Đã giao hàng" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            <Separator />

            <div className="p-4">
              <h2 className="mb-4 text-lg font-semibold">Sản phẩm</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="font-medium">{item.name}</p>
                      <div className="mt-1 text-sm text-gray-500">
                        <p>Màu: {item.color}</p>
                        <p>Size: {item.size}</p>
                        <p>Số lượng: {item.quantity}</p>
                      </div>
                      <p className="mt-auto font-medium">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-gray-50 p-4">
                <h2 className="text-lg font-semibold">Tóm tắt đơn hàng</h2>
              </div>

              <Separator />

              <div className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{formatPrice(order.total - order.shippingFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span>{formatPrice(order.shippingFee)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-gray-50 p-4">
                <h2 className="text-lg font-semibold">Thông tin giao hàng</h2>
              </div>

              <Separator />

              <div className="p-4">
                <p className="font-medium">{order.shipping.name}</p>
                <p className="text-gray-600">{order.shipping.address}</p>
                <p className="text-gray-600">{order.shipping.city}</p>
                <p className="text-gray-600">SĐT: {order.shipping.phone}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-gray-50 p-4">
                <h2 className="text-lg font-semibold">Phương thức thanh toán</h2>
              </div>

              <Separator />

              <div className="p-4">
                <p>{order.payment.method}</p>
                <p className="mt-2 text-sm font-medium text-green-600">{order.payment.status}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
