"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signUp, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Nếu đã đăng nhập, chuyển hướng về trang chủ
  if (isAuthenticated) {
    router.push("/account")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Kiểm tra dữ liệu nhập vào
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu xác nhận không khớp",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu phải có ít nhất 6 ký tự",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await signUp(email, password, name)

if (!result.error) {
  toast({
    title: "Đăng ký thành công",
    description: "Tài khoản của bạn đã được tạo thành công!",
  })
  router.push("/account")
} else {
  toast({
    title: "Đăng ký thất bại",
    description: result.error.message,
    variant: "destructive",
  })
}
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi đăng ký",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Đăng ký tài khoản</h1>
          <p className="mt-2 text-gray-600">Tạo tài khoản để mua sắm và theo dõi đơn hàng của bạn.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Họ và tên
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
              placeholder="Nhập họ và tên của bạn"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
              placeholder="Nhập email của bạn"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
              placeholder="Tạo mật khẩu"
              disabled={isLoading}
            />
            <p className="mt-1 text-xs text-gray-500">Mật khẩu phải có ít nhất 6 ký tự.</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
              placeholder="Xác nhận mật khẩu của bạn"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
              Tôi đồng ý với{" "}
              <Link href="/terms" className="font-medium text-black hover:underline">
                Điều khoản dịch vụ
              </Link>{" "}
              và{" "}
              <Link href="/privacy" className="font-medium text-black hover:underline">
                Chính sách bảo mật
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-800 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Bạn đã có tài khoản?{" "}
          <Link href="/login" className="font-medium text-black hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  )
}
