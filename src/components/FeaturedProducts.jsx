import { Link } from "react-router-dom"
import ProductCard from "./ProductCard"
import { FaChevronRight } from "react-icons/fa"

function FeaturedProducts({ title, products, viewAllLink }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <Link to={viewAllLink} className="flex items-center text-sm font-medium hover:underline">
            View All <FaChevronRight className="ml-1 h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
