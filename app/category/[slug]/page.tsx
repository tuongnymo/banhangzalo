import Image from "next/image"
import Link from "next/link"

// Sample products data
const allProducts = [
  {
    id: 1,
    name: "Classic Leather Sneakers",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "shoes",
  },
  {
    id: 2,
    name: "Slim Fit Cotton T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "clothing",
  },
  {
    id: 3,
    name: "Minimalist Watch",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
  },
  {
    id: 4,
    name: "Leather Wallet",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
  },
  {
    id: 5,
    name: "Canvas Backpack",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
  },
  {
    id: 6,
    name: "Denim Jacket",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "clothing",
  },
  {
    id: 7,
    name: "Casual Loafers",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "shoes",
  },
  {
    id: 8,
    name: "Wool Sweater",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "clothing",
  },
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Filter products by category or show all if slug is 'all'
  const products = slug === "all" ? allProducts : allProducts.filter((product) => product.category === slug)

  // Format category name for display
  const categoryName = slug === "all" ? "All Products" : slug.charAt(0).toUpperCase() + slug.slice(1)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <nav className="flex text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">{categoryName}</span>
        </nav>
      </div>

      <h1 className="mb-8 text-3xl font-bold">{categoryName}</h1>

      {/* Filters and Sort */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button className="btn btn-outline">Filter</button>
          <div className="hidden md:flex md:gap-4">
            <button className="text-sm text-gray-600 hover:text-black">Price</button>
            <button className="text-sm text-gray-600 hover:text-black">Color</button>
            <button className="text-sm text-gray-600 hover:text-black">Size</button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-black focus:outline-none">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
                <p className="text-gray-700">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="my-16 text-center">
          <h2 className="mb-4 text-2xl font-bold">No Products Found</h2>
          <p className="mb-8 text-gray-600">
            We couldn't find any products in this category. Please check back later or try another category.
          </p>
          <Link href="/category/all" className="btn btn-primary">
            View All Products
          </Link>
        </div>
      )}
    </div>
  )
}
