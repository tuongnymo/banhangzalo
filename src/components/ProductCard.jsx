import { Link } from "react-router-dom"
import { FaHeart } from "react-icons/fa"

function ProductCard({ product }) {
  const { id, name, price, image, category, discount } = product

  const discountedPrice = discount ? price * (1 - discount / 100) : null

  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
        <img
          src={image || "https://via.placeholder.com/300"}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
        <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 text-gray-600 hover:text-red-500">
          <FaHeart />
        </button>
      </div>

      <div className="mt-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-sm font-medium text-gray-900">{name}</h3>
          <p className="mt-1 text-xs text-gray-500">{category}</p>
          <div className="mt-1 flex items-center">
            {discount ? (
              <>
                <span className="text-sm font-medium text-gray-900">${discountedPrice.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-900">${price.toFixed(2)}</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
