import Image from "next/image"
import Link from "next/link"

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: "Classic Leather Sneakers",
    price: 89.99,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 1,
    size: "US 9",
    color: "Black",
  },
  {
    id: 3,
    name: "Minimalist Watch",
    price: 129.99,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 1,
    size: "One Size",
    color: "Silver/Black",
  },
]

export default function CartPage() {
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 10.0
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Cart Items */}
            <div className="rounded-lg border border-gray-200">
              <div className="hidden border-b border-gray-200 p-4 lg:grid lg:grid-cols-12">
                <div className="col-span-6">
                  <span className="font-medium">Product</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium">Quantity</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium">Price</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-medium">Total</span>
                </div>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="border-b border-gray-200 p-4 last:border-0">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-0 lg:items-center">
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">
                          <Link href={`/product/${item.id}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <button className="mt-1 text-sm text-gray-500 hover:text-black lg:hidden">Remove</button>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-between lg:justify-center">
                      <span className="lg:hidden">Quantity:</span>
                      <div className="flex items-center rounded-md border border-gray-300">
                        <button className="px-2 py-1 text-gray-500 hover:text-black">-</button>
                        <span className="px-2 py-1">{item.quantity}</span>
                        <button className="px-2 py-1 text-gray-500 hover:text-black">+</button>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-between lg:justify-center">
                      <span className="lg:hidden">Price:</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>

                    <div className="col-span-2 flex items-center justify-between lg:justify-end">
                      <span className="lg:hidden">Total:</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>

                    <div className="hidden lg:col-span-12 lg:flex lg:justify-end">
                      <button className="mt-2 text-sm text-gray-500 hover:text-black">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8">
              <Link href="/category/all" className="text-sm text-gray-600 hover:text-black">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
              <div className="space-y-3 border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${total.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary mt-6 w-full">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-16 text-center">
          <h2 className="mb-4 text-2xl font-bold">Your Cart is Empty</h2>
          <p className="mb-8 text-gray-600">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/category/all" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  )
}
