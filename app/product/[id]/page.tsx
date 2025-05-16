import Image from "next/image"
import Link from "next/link"

// This would normally come from a database or API
const products = [
  {
    id: 1,
    name: "Giày nam thể thao giới trẻ",
    price: 899.99,
    image: "https://i.imgur.com/heYWddM.jpeg?height=300&width=300",
    category: "shoes",
    description:
      "Giày thể thao nam với thiết kế hiện đại, phù hợp với giới trẻ. Chất liệu cao cấp, đế êm ái, phù hợp cho các hoạt động thể thao và đi lại hàng ngày.",
    images: [
      "https://i.imgur.com/heYWddM.jpeg?height=300&width=300",
      "https://i.imgur.com/UnOqBkj.jpeg?height=300&width=300",
      "https://i.imgur.com/H3G99OK.jpeg?height=300&width=300",
    ],
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["Black", "White", "Blue"],
  },
  {
    id: 2,
    name: "Dép sandand nữ mẫu mới nhất",
    price: 429.99,
    image: "https://i.imgur.com/gXFGSLT.jpeg?height=300&width=300",
    category: "clothing",
    description:
      "Dép sandal nữ với thiết kế mới nhất, phù hợp với mọi trang phục. Chất liệu cao cấp, đế êm ái, phù hợp cho các hoạt động hàng ngày và đi biển.",
    images: [
      "https://i.imgur.com/gXFGSLT.jpeg?height=300&width=300",
      "https://i.imgur.com/q3fxdD3.jpeg?height=300&width=300",
      "https://i.imgur.com/sK8hHdC.jpeg?height=300&width=300",
    ],
    sizes: ["35", "36", "37", "38", "39"],
    colors: ["Pink", "White", "Black"],
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId) || products[0]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category}`} className="hover:text-black">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images?.map((img, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>
          <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="mb-2 font-medium">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  className="min-w-[3rem] rounded-md border border-gray-300 px-3 py-2 text-center hover:border-black touch-manipulation"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="mb-2 font-medium">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors?.map((color) => (
                <button
                  key={color}
                  className="min-w-[4rem] rounded-md border border-gray-300 px-3 py-2 text-center hover:border-black touch-manipulation"
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex flex-col space-y-3 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="flex h-12 w-32">
              <button className="flex h-full w-12 items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-xl font-medium touch-manipulation">
                -
              </button>
              <input
                type="number"
                min="1"
                value="1"
                className="h-full w-full border border-gray-300 text-center"
                readOnly
              />
              <button className="flex h-full w-12 items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-gray-100 text-xl font-medium touch-manipulation">
                +
              </button>
            </div>
            <button className="btn btn-primary h-12 flex-1 touch-manipulation">Add to Cart</button>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Secure Checkout</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="M7 15h0M2 9.5h20"></path>
              </svg>
              <span>Free shipping on orders over $50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
