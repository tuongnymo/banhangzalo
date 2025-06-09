"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/components/ui/use-toast"

export default function CheckoutPage() {
  const { isAuthenticated, isLoading, user, session } = useAuth()
  const { cart, cartTotal, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    province: "",
    paymentMethod: "cod",
    notes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Chuyển hướng nếu chưa đăng nhập
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để tiếp tục thanh toán",
        variant: "destructive",
      })
      router.push("/login?redirect=checkout")
    }
  }, [isLoading, isAuthenticated, router, toast])

  // Điền thông tin người dùng vào form nếu đã đăng nhập
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.user_metadata?.name || prev.fullName,
        email: user.email || prev.email,
      }))
    }
  }, [user])

  // Chuyển hướng nếu giỏ hàng trống
  useEffect(() => {
  if (!isLoading && cart.length === 0 && !isCheckingOut) {
    toast({
      title: "Giỏ hàng trống",
      description: "Vui lòng thêm sản phẩm vào giỏ hàng để tiếp tục thanh toán",
    })
    router.push("/cart")
  }
}, [isLoading, cart, isCheckingOut, router, toast])

  // Hiển thị loading khi đang kiểm tra trạng thái đăng nhập
  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black mx-auto"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  // Nếu chưa đăng nhập hoặc giỏ hàng trống, không hiển thị gì (sẽ được chuyển hướng bởi useEffect)
  if (!isAuthenticated || cart.length === 0) {
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Kiểm tra dữ liệu nhập vào
    const requiredFields = ["fullName", "email", "phone", "address", "city", "province", "paymentMethod"]
    const emptyFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (emptyFields.length > 0) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Các trường có dấu * là bắt buộc",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
  const orderData = {
    userId: user?.id,
    items: cart,
    total: cartTotal,
    shipping_fee: cartTotal >= 1000000 ? 0 : 30000,
    payment_method: formData.paymentMethod,
    payment_status: formData.paymentMethod === "cod" ? "pending" : "processing",
    status: "pending",
    shipping_info: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      district: formData.district,
      province: formData.province,
      notes: formData.notes,
    },
  }

  const res = await fetch("/api/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.access_token}`,
  },
  body: JSON.stringify(orderData),
})

const data = await res.json()

if (!res.ok) {
  throw new Error(data.error || "Không thể tạo đơn hàng")
}

const { orderId, orderCode } = data

setIsCheckingOut(true)
clearCart()

setTimeout(() => {
  const redirectUrl =
    formData.paymentMethod === "cod"
      ? `/thankyou?orderCode=${orderCode}`
      : formData.paymentMethod === "bank"
      ? `/bankpayment?orderCode=${orderCode}`
      : `/payment-status?orderCode=${orderCode}`

  router.push(redirectUrl)
}, 0)

  // Hiển thị thông báo thành công
} catch (error) {
  console.error("Checkout error:", error)
  toast({
    title: "Lỗi thanh toán",
    description: "Đã xảy ra lỗi khi xử lý đơn hàng của bạn. Vui lòng thử lại sau.",
    variant: "destructive",
  })
}
 
    finally {
      setIsSubmitting(false)
    }
  }

  const shippingFee = cartTotal >= 1000000 ? 0 : 30000
  const totalWithShipping = cartTotal + shippingFee

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}> 
      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Thanh toán</h1>
        <p className="text-gray-600">Vui lòng điền thông tin để hoàn tất đơn hàng</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="space-y-6 rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-semibold">Thông tin giao hàng</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  placeholder="Nhập họ và tên"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  placeholder="Nhập email"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Nhập số điện thoại"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Nhập địa chỉ chi tiết"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label htmlFor="province" className="mb-1 block text-sm font-medium">
                  Tỉnh/Thành phố <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  placeholder="Tỉnh/Thành phố"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="district" className="mb-1 block text-sm font-medium">
                  Quận/Huyện <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  placeholder="Quận/Huyện"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="city" className="mb-1 block text-sm font-medium">
                  Phường/Xã <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  placeholder="Phường/Xã"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="mb-1 block text-sm font-medium">
                Ghi chú
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                disabled={isSubmitting}
              ></textarea>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">Phương thức thanh toán</h3>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center rounded-md border border-gray-300 p-3 hover:border-black">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-black focus:ring-black"
                    disabled={isSubmitting}
                  />
                  <span className="ml-2">Thanh toán khi nhận hàng (COD)</span>
                </label>
                <label className="flex cursor-pointer items-center rounded-md border border-gray-300 p-3 hover:border-black">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-black focus:ring-black"
                    disabled={isSubmitting}
                  />
                  <span className="ml-2">Chuyển khoản ngân hàng</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-semibold">Đơn hàng của bạn</h2>

          <div className="mb-4 max-h-80 overflow-y-auto">
            {cart.map((item, index) => (
              <div key={index} className="mb-4 flex items-center border-b border-gray-100 pb-4">
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
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {item.size} / {item.color.name}
                  </p>
                  <div className="mt-1 flex justify-between text-sm">
                    <p>
                      {item.quantity} x{" "}
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}
                    </p>
                    <p className="font-medium">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                        item.price * item.quantity,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm">
              <p>Tạm tính</p>
              <p>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(cartTotal)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Phí vận chuyển</p>
              <p>
                {shippingFee === 0
                  ? "Miễn phí"
                  : new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(shippingFee)}
              </p>
            </div>
            <div className="flex justify-between font-medium">
              <p>Tổng cộng</p>
              <p>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalWithShipping)}</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full rounded-md bg-black py-3 text-white transition hover:bg-gray-800 disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            Bằng cách đặt hàng, bạn đồng ý với{" "}
            <Link href="/terms" className="text-black underline">
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link href="/privacy" className="text-black underline">
              Chính sách bảo mật
            </Link>{" "}
            của chúng tôi.
          </div>
        </div>
      </div>
      </form>
    </div>
  )
}
