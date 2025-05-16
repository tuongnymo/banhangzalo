export interface Product {
  id: string
  name: string
  description: string
  price: number
  discount?: number
  category: string
  images: string[]
  sizes: string[]
  colors: { name: string; hex: string }[]
  details: string[]
}

// Sample product data
const products: Product[] = [
  {
    id: "1",
    name: "Classic Leather Sneakers",
    description: "Premium leather sneakers with a timeless design. Perfect for casual wear and everyday style.",
    price: 129.99,
    category: "Shoes",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Brown", hex: "#964B00" },
    ],
    details: [
      "Premium full-grain leather upper",
      "Cushioned insole for all-day comfort",
      "Durable rubber outsole",
      "Breathable mesh lining",
      "Handcrafted in Italy",
    ],
  },
  {
    id: "2",
    name: "Running Performance Shoes",
    description: "Lightweight and responsive running shoes designed for maximum performance and comfort.",
    price: 149.99,
    discount: 15,
    category: "Shoes",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Blue", hex: "#0000FF" },
      { name: "Red", hex: "#FF0000" },
      { name: "Black", hex: "#000000" },
    ],
    details: [
      "Breathable mesh upper",
      "Responsive cushioning",
      "Lightweight design (8.5 oz)",
      "6mm heel-to-toe drop",
      "Reflective details for visibility",
    ],
  },
  {
    id: "3",
    name: "Premium Cotton T-Shirt",
    description: "Soft and comfortable cotton t-shirt with a modern fit. Made from 100% organic cotton.",
    price: 39.99,
    category: "Clothing",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#808080" },
      { name: "Navy", hex: "#000080" },
    ],
    details: [
      "100% organic cotton",
      "Medium weight (180 gsm)",
      "Pre-shrunk fabric",
      "Reinforced stitching",
      "Ethically manufactured",
    ],
  },
  {
    id: "4",
    name: "Designer Leather Wallet",
    description: "Slim and elegant leather wallet with multiple card slots and a minimalist design.",
    price: 79.99,
    discount: 10,
    category: "Accessories",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#964B00" },
    ],
    details: [
      "Full-grain Italian leather",
      "6 card slots",
      "2 bill compartments",
      "RFID blocking technology",
      "Handcrafted construction",
    ],
  },
  {
    id: "5",
    name: "Casual Denim Jacket",
    description: "Classic denim jacket with a modern cut. Perfect for layering in any season.",
    price: 89.99,
    category: "Clothing",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blue", hex: "#0000FF" },
      { name: "Black", hex: "#000000" },
    ],
    details: [
      "100% cotton denim",
      "Button front closure",
      "Chest and side pockets",
      "Adjustable waist tabs",
      "Stonewashed finish",
    ],
  },
  {
    id: "6",
    name: "Minimalist Watch",
    description: "Elegant timepiece with a clean design and premium materials. Swiss movement for accuracy.",
    price: 199.99,
    category: "Accessories",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    sizes: ["One Size"],
    colors: [
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Gold", hex: "#FFD700" },
      { name: "Rose Gold", hex: "#B76E79" },
    ],
    details: [
      "Swiss quartz movement",
      "Sapphire crystal glass",
      "Stainless steel case",
      "Genuine leather strap",
      "Water resistant to 50m",
    ],
  },
  {
    id: "7",
    name: "Hiking Boots",
    description: "Durable and waterproof hiking boots designed for challenging terrains and maximum comfort.",
    price: 159.99,
    discount: 20,
    category: "Shoes",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    colors: [
      { name: "Brown", hex: "#964B00" },
      { name: "Green", hex: "#008000" },
    ],
    details: [
      "Waterproof leather and textile upper",
      "Vibram outsole for traction",
      "Gore-Tex membrane",
      "Cushioned ankle support",
      "Removable OrthoLite footbed",
    ],
  },
  {
    id: "8",
    name: "Wool Beanie",
    description: "Warm and stylish beanie made from premium merino wool. Perfect for cold weather.",
    price: 29.99,
    category: "Accessories",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#808080" },
      { name: "Navy", hex: "#000080" },
      { name: "Red", hex: "#FF0000" },
    ],
    details: [
      "100% merino wool",
      "Ribbed knit construction",
      "Soft and non-itchy",
      "Naturally temperature regulating",
      "Ethically sourced materials",
    ],
  },
]

// Helper functions to get products
export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

export function getRelatedProducts(currentId: string, category: string, limit = 4): Product[] {
  return products
    .filter((product) => product.id !== currentId && product.category.toLowerCase() === category.toLowerCase())
    .slice(0, limit)
}
