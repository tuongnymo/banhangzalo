"use client"

import { useCart } from "@/context/CartContext"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()

  const total = cart.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity
    return sum + itemTotal
  }, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Giỏ Hàng Của Bạn</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Giỏ hàng đang trống.</p>
          <Link
            href="/category"
            className="mt-4 inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color.name}`}
              className="flex items-center gap-4 border-b pb-4"
            >
              <div className="relative w-24 h-24">
                <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  Màu:
                  <span
                    className="inline-block w-4 h-4 rounded-full border"
                    style={{ backgroundColor: item.color.hex }}
                  ></span>
                  {item.color.name}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.color.name, item.quantity - 1)
                    }
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.color.name, item.quantity + 1)
                    }
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                </p>
                <button
                  onClick={() => removeFromCart(item.id, item.size, item.color.name)}
                  className="text-red-500 hover:text-red-700 mt-2 inline-flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Xoá
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold mb-2">
              Tổng cộng: {total.toLocaleString("vi-VN")}đ
            </p>
            <Link href="/checkout">
              <Button className="w-full md:w-auto">Tiến hành thanh toán</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
