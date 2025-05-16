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
]

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Search Products</h1>

      {/* Search Form */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </div>

      {/* Search Results */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Search Results</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allProducts.map((product) => (
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
      </div>
    </div>
  )
}
