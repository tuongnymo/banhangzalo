"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Heart } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"
import { motion } from "framer-motion"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  discount?: number
}

export default function AnimatedProductCard({ id, name, price, image, category, discount }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)

  const discountedPrice = discount
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price * (1 - discount / 100))
    : null

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
        <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.3 }}>
          <img src={image || "/placeholder.svg"} alt={name} className="h-full w-full object-cover object-center" />
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
            <Button
              className="bg-white text-black hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault()
                // Add to cart logic
              }}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <motion.button
        className={cn(
          "absolute right-2 top-2 rounded-full bg-white/80 p-1.5 backdrop-blur-sm",
          isFavorite ? "text-red-500" : "text-gray-600",
        )}
        onClick={(e) => {
          e.preventDefault()
          setIsFavorite(!isFavorite)
        }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart className={cn("h-5 w-5", isFavorite ? "fill-current" : "")} />
        <span className="sr-only">Add to favorites</span>
      </motion.button>
      <div className="mt-3">
        <Link to={`/product/${id}`}>
          <h3 className="text-sm font-medium text-gray-900">{name}</h3>
          <p className="mt-1 text-xs text-gray-500">{category}</p>
          <div className="mt-1 flex items-center">
            {discount ? (
              <>
                <span className="text-sm font-medium text-gray-900">{discountedPrice}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">{formattedPrice}</span>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-900">{formattedPrice}</span>
            )}
          </div>
        </Link>
      </div>
    </motion.div>
  )
}
