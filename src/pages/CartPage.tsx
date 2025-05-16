"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, Trash2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { motion } from "framer-motion"

// Sample cart items
const initialCartItems = [
  {
    id: "1",
    name: "Classic Leather Sneakers",
    price: 129.99,
    image: "/placeholder.svg?height=100&width=100",
    color: "Black",
    size: "42",
    quantity: 1,
  },
  {
    id: "3",
    name: "Premium Cotton T-Shirt",
    price: 39.99,
    image: "/placeholder.svg?height=100&width=100",
    color: "White",
    size: "L",
    quantity: 2,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [mounted, setMounted] = useState(false)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return null
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 4.99
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl">Your Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <Link to={`/product/${item.id}`} className="text-lg font-medium hover:underline">
                          {item.name}
                        </Link>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>

                      <div className="mt-1 text-sm text-gray-500">
                        <p>Color: {item.color}</p>
                        <p>Size: {item.size}</p>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-gray-200">
                          <button
                            className="px-3 py-1 text-gray-500 hover:text-gray-700"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            className="px-3 py-1 text-gray-500 hover:text-gray-700"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="flex items-center text-sm text-gray-500 hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="mt-6 w-full bg-black text-white hover:bg-gray-800">Proceed to Checkout</Button>

              <Link to="/" className="mt-4 flex items-center justify-center text-sm text-gray-600 hover:text-gray-900">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center">
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-8 text-gray-600">Looks like you haven't added any products to your cart yet.</p>
          <Button className="bg-black text-white hover:bg-gray-800" asChild>
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
