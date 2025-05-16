"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products"
import { useCart } from "@/context/CartContext"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [isFavorite, setIsFavorite] = useState(false)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discount ? product.price * (1 - product.discount / 100) : product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    })
  }

  const handleBuyNow = () => {
    // Add to cart first
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discount ? product.price * (1 - product.discount / 100) : product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    })

    // Then navigate to checkout
    router.push("/checkout")
  }

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : null

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.image || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
          {product.discount && (
            <div className="absolute left-4 top-4 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
              -{product.discount}%
            </div>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((index) => (
            <button
              key={index}
              className="relative aspect-square h-20 w-20 overflow-hidden rounded-md border-2 border-transparent hover:border-black"
            >
              <img
                src={product.image || "/placeholder.svg?height=80&width=80"}
                alt={`${product.name} view ${index}`}
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>

        <div className="mt-2 flex items-center">
          {product.discount ? (
            <>
              <span className="text-xl font-bold text-gray-900">
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
              <span className="ml-2 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
              <span className="ml-2 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                {product.discount}% OFF
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          )}
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium">Size</h3>
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                <Label
                  htmlFor={`size-${size}`}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-sm transition-all hover:border-black peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white"
                >
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium">Color</h3>
          <RadioGroup
            value={selectedColor.name}
            onValueChange={(value) => {
              const color = product.colors.find((c) => c.name === value)
              if (color) setSelectedColor(color)
            }}
            className="flex flex-wrap gap-2"
          >
            {product.colors.map((color) => (
              <div key={color.name} className="flex items-center space-x-2">
                <RadioGroupItem value={color.name} id={`color-${color.name}`} className="peer sr-only" />
                <Label
                  htmlFor={`color-${color.name}`}
                  className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 transition-all hover:border-gray-300 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-black peer-data-[state=checked]:ring-offset-2"
                >
                  <span className="absolute inset-1 rounded-full" style={{ backgroundColor: color.hex }} />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="mt-6 flex items-center">
          <div className="flex items-center rounded-md border border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="h-10 w-10 rounded-none border-r border-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
              </svg>
              <span className="sr-only">Giảm số lượng</span>
            </Button>
            <div className="flex h-10 w-12 items-center justify-center text-sm font-medium">{quantity}</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={increaseQuantity}
              className="h-10 w-10 rounded-none border-l border-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              <span className="sr-only">Tăng số lượng</span>
            </Button>
          </div>
        </div>

        {/* Buttons for Add to Cart and Buy Now */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button onClick={handleAddToCart} className="bg-black text-white hover:bg-gray-800">
            Add to Cart
          </Button>
          <Button onClick={handleBuyNow} className="bg-red-600 text-white hover:bg-red-700">
            Mua ngay
          </Button>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn("flex items-center gap-1", isFavorite && "text-red-500")}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
            <span>{isFavorite ? "Đã lưu" : "Lưu"}</span>
          </Button>

          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" x2="12" y1="2" y2="15"></line>
            </svg>
            <span>Chia sẻ</span>
          </Button>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b border-gray-200 bg-transparent p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Mô tả
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Chi tiết
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Vận chuyển
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-4">
              <p className="text-gray-600">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="py-4">
              <ul className="space-y-2 text-gray-600">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="py-4">
              <div className="space-y-4 text-gray-600">
                <p>Miễn phí vận chuyển cho đơn hàng trên 1.000.000đ.</p>
                <p>Thời gian giao hàng dự kiến: 3-5 ngày làm việc.</p>
                <p>Vận chuyển nhanh có sẵn tại trang thanh toán.</p>
                <p>Vận chuyển quốc tế có sẵn cho các quốc gia được chọn.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
