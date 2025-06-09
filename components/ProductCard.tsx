"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingBag, Heart } from "lucide-react"
import { motion } from "framer-motion"

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  discount?: number
  category?: string
  showActions?: boolean
}

export default function ProductCard({ id, name, price, image, discount, category }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const discountedPrice = discount ? price * (1 - discount / 100) : price

  return (
    <motion.div
      className="group relative h-full rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.3 }}>
          <div className="relative h-64 w-full">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
            {discount && (
              <div className="absolute left-0 top-0 bg-red-500 px-2 py-1 text-xs font-bold text-white">
                -{discount}%
              </div>
            )}
          </div>
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-black shadow-md hover:bg-gray-100 transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingBag className="h-4 w-4" />
              Thêm vào giỏ hàng
            </button>
          </motion.div>
        </motion.div>
      </div>
      <motion.button
        className={`absolute right-2 top-2 rounded-full bg-white/80 p-1.5 backdrop-blur-sm ${
          isFavorite ? "text-red-500" : "text-gray-600"
        }`}
        onClick={(e) => {
          e.preventDefault()
          setIsFavorite(!isFavorite)
        }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        <span className="sr-only">Add to favorites</span>
      </motion.button>
      <div className="p-4">
        <h3 className="mb-1 text-base font-medium line-clamp-2 min-h-[2.5rem]">{name}</h3>
        {category && <p className="mb-2 text-xs text-gray-500 uppercase tracking-wider">{category}</p>}
        <div className="flex items-center">
          {discount ? (
            <>
              <span className="font-medium text-red-500">{discountedPrice.toLocaleString("vi-VN")}đ</span>
              <span className="ml-2 text-sm text-gray-500 line-through">{price.toLocaleString("vi-VN")}đ</span>
            </>
          ) : (
            <span className="font-medium">{price.toLocaleString("vi-VN")}đ</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
