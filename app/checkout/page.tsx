"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/utils"
import { motion } from "framer-motion"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cod")

  // Shipping cost calculation
  const shippingCost = cartTotal > 1000000 ? 0 : 30000
  const totalCost = cartTotal + shippingCost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to payment status page
    router.push("/payment-status?status=success")
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

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-6 text-2xl font-bold">Giỏ hàng trống</h1>
        <p className="mb-8 text-gray-600">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
        <Button asChild>
          <Link href="/">Tiếp tục mua sắm</Link>
        </Button>
      </div>
    )
  }

  return (
    <motion.div className="container mx-auto px-4 py-8" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.h1 className="mb-8 text-2xl font-bold md:text-3xl" variants={itemVariants}>
        Thanh toán
      </motion.h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Checkout Form */}
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <div className="mb-6 flex justify-between">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">1</div>
              <span className="ml-2 font-medium">Thông tin giao hàng</span>
            </div>
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">2</div>
              <span className="ml-2 font-medium">Thanh toán</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Thông tin giao hàng</h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName" className="mb-1 block text-sm font-medium">
                    Họ
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="mb-1 block text-sm font-medium">
                    Tên
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email" className="mb-1 block text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-1 block text-sm font-medium">
                    Số điện thoại
                  </Label>
                  <Input id="phone" name="phone" className="w-full rounded-md border border-gray-300 p-2" required />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="address" className="mb-1 block text-sm font-medium">
                  Địa chỉ
                </Label>
                <Input id="address" name="address" className="w-full rounded-md border border-gray-300 p-2" required />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="city" className="mb-1 block text-sm font-medium">
                    Thành phố
                  </Label>
                  <Input id="city" name="city" className="w-full rounded-md border border-gray-300 p-2" required />
                </div>
                <div>
                  <Label htmlFor="district" className="mb-1 block text-sm font-medium">
                    Quận/Huyện
                  </Label>
                  <Input
                    id="district"
                    name="district"
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="province" className="mb-1 block text-sm font-medium">
                    Tỉnh/Thành phố
                  </Label>
                  <select
                    id="province"
                    name="province"
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP HCM">TP HCM</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                  </select>
                </div>
              </div>

              <Separator className="my-6" />

              <h2 className="mb-4 text-xl font-semibold">Phương thức thanh toán</h2>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex flex-1 cursor-pointer items-center">
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
                      className="mr-3 h-5 w-5"
                    >
                      <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                      <circle cx="12" cy="12" r="2"></circle>
                      <path d="M6 12h.01M18 12h.01"></path>
                    </svg>
                    Thanh toán khi nhận hàng (COD)
                  </Label>
                </div>

                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex flex-1 cursor-pointer items-center">
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
                      className="mr-3 h-5 w-5"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                      <line x1="2" x2="22" y1="10" y2="10"></line>
                    </svg>
                    Chuyển khoản ngân hàng
                  </Label>
                </div>

                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                  <RadioGroupItem value="momo" id="momo" />
                  <Label htmlFor="momo" className="flex flex-1 cursor-pointer items-center">
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
                      className="mr-3 h-5 w-5"
                    >
                      <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3"></path>
                      <circle cx="18" cy="18" r="3"></circle>
                      <path d="m20.2 20.2-1.4-1.4"></path>
                    </svg>
                    Ví MoMo
                  </Label>
                </div>
              </RadioGroup>

              <div className="mt-6 flex justify-end">
                <Button
                  type="submit"
                  className="rounded-md bg-black px-6 py-2 text-white hover:bg-gray-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
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
                    "Hoàn tất đơn hàng"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div variants={itemVariants}>
          <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Tóm tắt đơn hàng</h2>

            <div className="max-h-80 overflow-y-auto">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color.name}`} className="mb-4 flex gap-3">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="font-medium line-clamp-1">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.color.name} / {item.size} / SL: {item.quantity}
                    </p>
                    <p className="mt-auto font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span>{shippingCost === 0 ? "Miễn phí" : formatPrice(shippingCost)}</span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between font-medium">
                <span>Tổng cộng</span>
                <span className="text-lg">{formatPrice(totalCost)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
