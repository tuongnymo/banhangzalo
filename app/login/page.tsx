"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import { Phone } from "lucide-react"

export default function LoginPage() {

  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [phone, setPhone] = useState('');


  // Nếu đã đăng nhập, chuyển hướng về trang chủ
  if (isAuthenticated) {
    router.push("/account")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phone || !password) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const normalizedPhone = phone.startsWith("0")
  ? phone.replace(/^0/, "+84")
  : phone

const result = await signIn(normalizedPhone, password)

      
      console.log("🔐 Login result:", result)

if (!result.error) {
  toast({
    title: "Đăng nhập thành công",
    description: "Chào mừng bạn quay trở lại!",
  })
  router.push("/account")
} else {
  toast({
    title: "Đăng nhập thất bại",
    description: result.error?.message || "Sai email hoặc mật khẩu",
    variant: "destructive",
  })
}
    } catch (error) {
  console.error("🔥 Đăng nhập lỗi:", error)
  toast({
    title: "Lỗi hệ thống",
    description: "Không thể đăng nhập lúc này. Vui lòng thử lại sau.",
    variant: "destructive",
  })
}
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Đăng nhập</h1>
          <p className="mt-2 text-gray-600">Chào mừng bạn quay trở lại! Vui lòng đăng nhập để tiếp tục.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
              placeholder="Nhập số điện thoại của bạn"
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
              placeholder="Nhập mật khẩu của bạn"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <a href="#" className="text-sm text-gray-600 hover:text-black">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-800 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Bạn chưa có tài khoản?{" "}
          <Link href="/register" className="font-medium text-black hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  )
}
