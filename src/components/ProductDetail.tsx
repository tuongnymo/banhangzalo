"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, Minus, Plus, Heart, Share2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { cn } from "../lib/utils"
import type { Product } from "../lib/products"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [mainImage, setMainImage] = useState(product.images[0])
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

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price)

  const discountedPrice = product.discount
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(product.price * (1 - product.discount / 100))
    : null

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-900">
          Home
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-gray-900">
          {product.category}
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div
            className="relative aspect-square overflow-hidden rounded-xl bg-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                <img
                  src={mainImage || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <motion.button
                key={index}
                className={cn(
                  "relative aspect-square h-20 w-20 overflow-hidden rounded-md border-2",
                  mainImage === image ? "border-black" : "border-transparent",
                )}
                onClick={() => setMainImage(image)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>

          <div className="mt-2 flex items-center">
            {product.discount ? (
              <>
                <span className="text-xl font-bold text-gray-900">{discountedPrice}</span>
                <span className="ml-2 text-lg text-gray-500 line-through">{formattedPrice}</span>
                <span className="ml-2 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                  {product.discount}% OFF
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">{formattedPrice}</span>
            )}
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-medium">Select Size</h3>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                  <Label
                    htmlFor={`size-${size}`}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-sm peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white"
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-medium">Select Color</h3>
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
                    className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-black peer-data-[state=checked]:ring-offset-2"
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
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <div className="flex h-10 w-12 items-center justify-center text-sm font-medium">{quantity}</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={increaseQuantity}
                className="h-10 w-10 rounded-none border-l border-gray-200"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>

            <div className="ml-4 flex-1">
              <Button className="w-full bg-black text-white hover:bg-gray-800" size="lg">
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn("flex items-center gap-1", isFavorite && "text-red-500")}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
              <span>{isFavorite ? "Saved" : "Save"}</span>
            </Button>

            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b border-gray-200 bg-transparent p-0">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Shipping
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-gray-600">{product.description}</p>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                <ul className="space-y-2 text-gray-600">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4">
                <div className="space-y-4 text-gray-600">
                  <p>Free standard shipping on all orders over $100.</p>
                  <p>Estimated delivery time: 3-5 business days.</p>
                  <p>Express shipping available at checkout.</p>
                  <p>International shipping available to select countries.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
