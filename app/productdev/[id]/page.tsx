import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { getProductById, getRelatedProducts } from "@/lib/products"
import ProductGrid from "@/components/ProductGrid"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(params.id, product.category)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-gray-900">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4 w-full md:w-1/2 md:max-w-md">
  <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
    <div className="h-full w-full bg-gray-200"></div>
  </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((index) => (
              <button
                key={index}
                className="relative aspect-square h-20 w-20 overflow-hidden rounded-md border-2 border-transparent"
              >
                <div className="h-full w-full bg-gray-200"></div>
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
    <span className="text-xl font-bold text-red-500">
      {(product.price * (1 - product.discount / 100)).toLocaleString("vi-VN")}đ
    </span>
    <span className="ml-2 text-lg text-gray-500 line-through">
      {product.price.toLocaleString("vi-VN")}đ
    </span>
    <span className="ml-2 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
      -{product.discount}%
    </span>
  </>
) : (
  <span className="text-xl font-bold text-gray-900">
    {Number(product.price).toLocaleString("vi-VN")}đ
  </span>
)}
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-medium">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <label
                  key={size}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-sm"
                >
                  {size}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-medium">Select Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <label
                  key={color.name}
                  className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200"
                >
                  <span className="absolute inset-1 rounded-full" style={{ backgroundColor: color.hex }}></span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center">
            <div className="flex items-center rounded-md border border-gray-200">
              <button className="h-10 w-10 rounded-none border-r border-gray-200">
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
                  className="mx-auto"
                >
                  <path d="M5 12h14"></path>
                </svg>
                <span className="sr-only">Decrease quantity</span>
              </button>
              <div className="flex h-10 w-12 items-center justify-center text-sm font-medium">1</div>
              <button className="h-10 w-10 rounded-none border-l border-gray-200">
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
                  className="mx-auto"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                <span className="sr-only">Increase quantity</span>
              </button>
            </div>

            <div className="ml-4 flex-1">
              <Button className="w-full bg-black text-white hover:bg-gray-800">Add to Cart</Button>
            </div>
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
                  <p>Free standard shipping on all orders over $100.</p>
                  <p>Estimated delivery time: 3-5 business days.</p>
                  <p>Express shipping available at checkout.</p>
                  <p>International shipping available to select countries.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16 border-t border-gray-200 pt-16">
        <h2 className="mb-8 text-2xl font-bold">You May Also Like</h2>
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  )
}
