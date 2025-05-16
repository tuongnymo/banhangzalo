"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { motion } from "framer-motion"

// Sample order data
const orders = [
  {
    id: "123456",
    date: "2023-05-15",
    status: "Đã giao hàng",
    total: 1299000,
    items: [
      {
        id: "1",
        name: "Giày thể thao nam cao cấp",
        price: 699000,
        quantity: 1,
        image: "https://i.imgur.com/UnOoBKj.jpeg",
      },
      {
        id: "2",
        name: "Giày nữ thời trang",
        price: 600000,
        quantity: 1,
        image: "https://i.imgur.com/sk9HdGC.jpeg",
      },
    ],
  },
  {
    id: "789012",
    date: "2023-05-10",
    status: "Đang giao hàng",
    total: 329000,
    items: [
      {
        id: "3",
        name: "Túi xách nữ thời trang",
        price: 329000,
        quantity: 1,
        image: "https://i.imgur.com/SSV0tXG.jpeg",
      },
    ],
  },
]

export default function OrdersPage() {
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
      <motion.h1 className="mb-8 text-2xl font-bold md:text-3xl" variants={itemVariants}>
        Đơn hàng của tôi
      </motion.h1>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              className="overflow-hidden rounded-lg border border-gray-200 shadow-sm"
              variants={itemVariants}
            >
              <div className="flex flex-wrap items-center justify-between bg-gray-50 p-4 sm:flex-nowrap">
                <div>
                  <p className="font-medium">Đơn hàng #{order.id}</p>
                  <p className="text-sm text-gray-500">Đặt ngày: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="mt-2 flex w-full flex-wrap items-center gap-2 sm:mt-0 sm:w-auto sm:justify-end">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      order.status === "Đã giao hàng" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/orders/${order.id}`}>Xem chi tiết</Link>
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="p-4">
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">SL: {item.quantity}</p>
                        <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between bg-gray-50 p-4">
                <span className="font-medium">Tổng cộng:</span>
                <span className="font-bold">{formatPrice(order.total)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div className="rounded-lg border border-gray-200 p-8 text-center" variants={itemVariants}>
          <h2 className="mb-2 text-xl font-semibold">Bạn chưa có đơn hàng nào</h2>
          <p className="mb-6 text-gray-600">Hãy khám phá các sản phẩm của chúng tôi và đặt hàng ngay.</p>
          <Button asChild>
            <Link href="/">Mua sắm ngay</Link>
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
