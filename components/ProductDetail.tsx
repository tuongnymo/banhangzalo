"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/components/ui/use-toast"

interface ProductDetailProps {
  product: any
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined)
  const [selectedColor, setSelectedColor] = useState<any>(undefined)
  const [quantity, setQuantity] = useState(1)
  const defaultImage = product.images?.[2] || "/placeholder.svg?height=600&width=600";
  const [selectdImage, setSelectImage] = useState(defaultImage)
  console.log("Product Detail", selectdImage)

  // ✅ NEW: Auto-select default size & color once product is available
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0])
      setSelectedColor(product.colors?.[0])
    }
  }, [product])

  // ✅ NEW: Guard rendering if product chưa sẵn sàng
  if (!product) {
    return <div className="p-4">Đang tải sản phẩm...</div>
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn kích thước và màu sắc",
        variant: "destructive",
      })
      return
    }

    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    }

    addToCart(item)
    setQuantity(1)

    // Hiệu ứng bay vào giỏ hàng
    const img = document.querySelector(`#product-image`)
    const cart = document.querySelector(`#cart-icon`)
    if (img && cart) {
      const imgRect = img.getBoundingClientRect()
      const cartRect = cart.getBoundingClientRect()
      const dx = cartRect.left - imgRect.left
      const dy = cartRect.top - imgRect.top

      const clone = img.cloneNode(true) as HTMLElement
      clone.classList.add("fly-image")
      clone.style.left = `${imgRect.left}px`
      clone.style.top = `${imgRect.top}px`
      clone.style.setProperty("--dx", `${dx}px`)
      clone.style.setProperty("--dy", `${dy}px`)

      document.body.appendChild(clone)
      setTimeout(() => clone.remove(), 800)
    }

    toast({
      title: "Thành công",
      description: "Đã thêm sản phẩm vào giỏ hàng",
    })
  }

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn kích thước và màu sắc",
        variant: "destructive",
      })
      return
    }

    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    }

    addToCart(item)
    router.push("/checkout")
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  console.log("Product Detail", product)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg bg-gray-100">
            <img
              src={selectdImage || "/placeholder.svg?height=600&width=600"}
              alt="Ảnh sản phẩm lớn"
              className="h-full w-full object-cover object-center"
              id="product-image"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-md bg-gray-100 cursor-pointer"
                onClick={() => setSelectImage(image)}
              >
                <img
                  src={image || `/placeholder.svg?height=150&width=150&text=Image ${index + 1}`}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>
          <p className="mt-2 text-xl font-semibold">
            {Number(product.price).toLocaleString("vi-VN")}đ
          </p>
          <div className="mt-4 prose max-w-none">
            <p>{product.description}</p>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium">Kích thước</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.isArray(product.sizes) &&
                product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`flex min-w-[3rem] items-center justify-center rounded-md border px-3 py-2 text-sm ${selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium">Màu sắc</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.isArray(product.colors) &&
                product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full border ${selectedColor?.name === color.name ? "border-black" : "border-gray-300"
                      }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <span
                      className="h-8 w-8 rounded-full"
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">{color.name}</span>
                    {selectedColor?.name === color.name && (
                      <span className="pointer-events-none absolute -inset-px rounded-full border-2 border-black"></span>
                    )}
                  </button>
                ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="text-sm font-medium">Số lượng</h3>
            <div className="mt-2 flex items-center">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-l-md border border-r-0 border-gray-300"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <input type="text" className="h-8 w-12 border border-gray-300 text-center" value={quantity} readOnly />
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-r-md border border-l-0 border-gray-300"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="flex-1 border-black text-black hover:bg-gray-100"
            >
              Thêm vào giỏ
            </Button>
            <Button onClick={handleBuyNow} className="flex-1 bg-black text-white hover:bg-gray-800">
              Mua ngay
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-2">Miễn phí vận chuyển cho đơn hàng trên 1.000.000đ</span>
            </div>
            <div className="mt-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="ml-2">Đổi trả trong vòng 30 ngày</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
