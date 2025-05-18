"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./AuthContext"

export interface CartItem {
  id: string
  name: string
  price: number
  image?: string
  size: string
  color: {
    name: string
    hex: string
  }
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string, size: string, colorName: string) => void
  updateQuantity: (id: string, size: string, colorName: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({
  cart: [],
  cartCount: 0,
  cartTotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)
  const { user } = useAuth()

  // Load cart from localStorage on initial render (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return

    const loadCart = () => {
      try {
        // Nếu đã đăng nhập, lấy giỏ hàng của người dùng
        if (user) {
          const userCartKey = `cart_${user.id}`
          const savedCart = localStorage.getItem(userCartKey)

          if (savedCart) {
            setCart(JSON.parse(savedCart))
          } else {
            // Nếu chưa có giỏ hàng của người dùng, tạo mới
            localStorage.setItem(userCartKey, "[]")
            setCart([])
          }
        } else {
          // Nếu chưa đăng nhập, lấy giỏ hàng từ localStorage
          const savedCart = localStorage.getItem("cart")
          if (savedCart) {
            setCart(JSON.parse(savedCart))
          }
        }
      } catch (error) {
        console.error("Failed to load cart:", error)
        setCart([])
      }
    }

    loadCart()
  }, [user])

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      if (user) {
        // Lưu giỏ hàng vào localStorage theo ID người dùng
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart))
      } else {
        // Lưu giỏ hàng vào localStorage chung
        localStorage.setItem("cart", JSON.stringify(cart))
      }

      // Update cart count and total
      const count = cart.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(count)

      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      setCartTotal(total)
    } catch (error) {
      console.error("Failed to save cart:", error)
    }
  }, [cart, user])

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart (same id, size, and color)
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size && cartItem.color.name === item.color.name,
      )

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += item.quantity
        return updatedCart
      } else {
        // Item doesn't exist, add new item
        return [...prevCart, item]
      }
    })
  }

  const removeFromCart = (id: string, size: string, colorName: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.size === size && item.color.name === colorName)),
    )
  }

  const updateQuantity = (id: string, size: string, colorName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size, colorName)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.size === size && item.color.name === colorName ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
