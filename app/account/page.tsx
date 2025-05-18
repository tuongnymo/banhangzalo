"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AccountPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()

  // Chuyển hướng nếu chưa đăng nhập
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

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

  // Nếu chưa đăng nhập, không hiển thị gì (sẽ được chuyển hướng bởi useEffect)
  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Tài khoản của tôi</h1>
          <p className="text-gray-600">Quản lý thông tin tài khoản và đơn hàng của bạn</p>
        </div>
        <button onClick={logout} className="mt-4 inline-flex items-center text-red-600 hover:text-red-800 md:mt-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Đăng xuất
        </button>
      </div>

      <div className="mb-8 flex items-center">
        <div className="mr-4 h-16 w-16 overflow-hidden rounded-full bg-gray-200">
          {user.avatar ? (
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-300 text-xl font-bold text-gray-600">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
          <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="addresses">Địa chỉ</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Đơn hàng của bạn</h3>
              <Link href="/account/orders" className="text-sm font-medium text-black underline hover:text-gray-700">
                Xem tất cả
              </Link>
            </div>

            <div className="rounded-md bg-gray-50 p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4 text-gray-400"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <h4 className="mb-2 text-lg font-medium">Chưa có đơn hàng nào</h4>
              <p className="mb-4 text-gray-600">Bạn chưa có đơn hàng nào. Hãy mua sắm ngay!</p>
              <Link
                href="/category/all"
                className="inline-block rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Mua sắm ngay
              </Link>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4 text-lg font-semibold">Thông tin cá nhân</h3>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    defaultValue={user.name}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={user.email}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                    placeholder="Nhập số điện thoại của bạn"
                  />
                </div>
                <div>
                  <label htmlFor="birthday" className="mb-1 block text-sm font-medium">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="currentPassword" className="mb-1 block text-sm font-medium">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  placeholder="Nhập mật khẩu hiện tại để thay đổi"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="newPassword" className="mb-1 block text-sm font-medium">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                    placeholder="Xác nhận mật khẩu mới"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Địa chỉ của bạn</h3>
              <button className="text-sm font-medium text-black underline hover:text-gray-700">Thêm địa chỉ mới</button>
            </div>

            <div className="rounded-md bg-gray-50 p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4 text-gray-400"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <h4 className="mb-2 text-lg font-medium">Chưa có địa chỉ nào</h4>
              <p className="mb-4 text-gray-600">Bạn chưa thêm địa chỉ nào vào tài khoản của mình.</p>
              <button className="inline-block rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                Thêm địa chỉ mới
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
