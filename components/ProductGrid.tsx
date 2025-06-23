    import Link from "next/link"
    import type { Product } from "@/lib/products"

    interface ProductGridProps {
      products: Product[]
    }

    export default function ProductGrid({ products }: ProductGridProps) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Link href={`/products/${product.id}`} className="block">
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
                  <div className="h-full w-full bg-gray-200 transition-transform duration-300 group-hover:scale-105"></div>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">{product.category}</p>
                  <div className="mt-1 flex items-center">
                    {product.discount ? (
                      <>
                        <span className="text-sm font-medium text-gray-900">
                          ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )
    }
