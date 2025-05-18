"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ success: false, message: "Not implemented" }),
  register: async () => ({ success: false, message: "Not implemented" }),
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Kiểm tra xem người dùng đã đăng nhập chưa khi trang được tải
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error)
          localStorage.removeItem("user")
        }
      }
      setIsLoading(false)
    }

    if (typeof window !== "undefined") {
      checkAuth()
    }
  }, [])

  // Trong thực tế, bạn sẽ gọi API để xác thực người dùng
  // Đây chỉ là mô phỏng cho mục đích demo
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // Mô phỏng gọi API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Kiểm tra thông tin đăng nhập từ localStorage
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)

      const foundUser = users.find((u: any) => u.email === email)

      if (!foundUser) {
        return { success: false, message: "Email không tồn tại" }
      }

      if (foundUser.password !== password) {
        return { success: false, message: "Mật khẩu không chính xác" }
      }

      // Đăng nhập thành công
      const authenticatedUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        avatar: foundUser.avatar,
      }

      setUser(authenticatedUser)
      localStorage.setItem("user", JSON.stringify(authenticatedUser))

      // Chuyển giỏ hàng từ localStorage sang giỏ hàng của người dùng
      const cartJson = localStorage.getItem("cart") || "[]"
      localStorage.setItem(`cart_${foundUser.id}`, cartJson)

      return { success: true, message: "Đăng nhập thành công" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "Đã xảy ra lỗi khi đăng nhập" }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)

      // Mô phỏng gọi API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Kiểm tra email đã tồn tại chưa
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)

      if (users.some((u: any) => u.email === email)) {
        return { success: false, message: "Email đã được sử dụng" }
      }

      // Tạo người dùng mới
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password, // Trong thực tế, mật khẩu phải được mã hóa
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        createdAt: new Date().toISOString(),
      }

      // Lưu vào "cơ sở dữ liệu" (localStorage)
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      // Đăng nhập người dùng mới
      const authenticatedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      }

      setUser(authenticatedUser)
      localStorage.setItem("user", JSON.stringify(authenticatedUser))

      // Tạo giỏ hàng mới cho người dùng
      localStorage.setItem(`cart_${newUser.id}`, "[]")

      return { success: true, message: "Đăng ký thành công" }
    } catch (error) {
      console.error("Register error:", error)
      return { success: false, message: "Đã xảy ra lỗi khi đăng ký" }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
