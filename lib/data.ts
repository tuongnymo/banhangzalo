export type Product = {
  id: string
  name: string
  price: number
  discount?: number
  category: string
  description: string
  sizes: string[]
  colors: { name: string; hex: string }[]
  details: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 29.99,
    category: "Men",
    description: "A comfortable and versatile white t-shirt made from 100% organic cotton.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#808080" },
    ],
    details: ["100% organic cotton", "Regular fit", "Crew neck", "Machine washable"],
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    price: 59.99,
    discount: 10,
    category: "Men",
    description: "Modern slim fit jeans with a slight stretch for comfort and mobility.",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Blue", hex: "#0000FF" },
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#808080" },
    ],
    details: ["98% cotton, 2% elastane", "Slim fit", "Five-pocket styling", "Machine washable"],
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    price: 49.99,
    category: "Women",
    description: "A lightweight floral dress perfect for summer days.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Blue", hex: "#0000FF" },
      { name: "Pink", hex: "#FFC0CB" },
    ],
    details: ["100% viscose", "Regular fit", "V-neck", "Machine washable"],
  },
  {
    id: "4",
    name: "Leather Crossbody Bag",
    price: 89.99,
    discount: 15,
    category: "Accessories",
    description: "A stylish and practical leather crossbody bag with multiple compartments.",
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#964B00" },
      { name: "Tan", hex: "#D2B48C" },
    ],
    details: ["Genuine leather", "Adjustable strap", "Multiple compartments", "Zip closure"],
  },
  {
    id: "5",
    name: "Oversized Hoodie",
    price: 45.99,
    category: "Women",
    description: "A cozy oversized hoodie perfect for lounging or casual outings.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Gray", hex: "#808080" },
      { name: "Black", hex: "#000000" },
      { name: "Pink", hex: "#FFC0CB" },
    ],
    details: ["80% cotton, 20% polyester", "Oversized fit", "Drawstring hood", "Kangaroo pocket", "Machine washable"],
  },
  {
    id: "6",
    name: "Leather Wallet",
    price: 39.99,
    category: "Accessories",
    description: "A sleek leather wallet with multiple card slots and a coin pocket.",
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#964B00" },
    ],
    details: ["Genuine leather", "Multiple card slots", "Coin pocket", "Bill compartment"],
  },
  {
    id: "7",
    name: "Denim Jacket",
    price: 79.99,
    discount: 20,
    category: "Men",
    description: "A classic denim jacket that never goes out of style.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blue", hex: "#0000FF" },
      { name: "Black", hex: "#000000" },
    ],
    details: ["100% cotton denim", "Regular fit", "Button closure", "Multiple pockets", "Machine washable"],
  },
  {
    id: "8",
    name: "High Waist Leggings",
    price: 34.99,
    category: "Women",
    description: "Comfortable high waist leggings perfect for workouts or casual wear.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#808080" },
      { name: "Navy", hex: "#000080" },
    ],
    details: ["88% polyester, 12% elastane", "High waist", "Four-way stretch", "Moisture-wicking", "Machine washable"],
  },
]
