import { Link } from "react-router-dom"

const categories = [
  {
    name: "Sneakers",
    image: "https://via.placeholder.com/300",
    link: "/category/shoes",
  },
  {
    name: "Boots",
    image: "https://via.placeholder.com/300",
    link: "/category/shoes",
  },
  {
    name: "Casual",
    image: "https://via.placeholder.com/300",
    link: "/category/clothing",
  },
  {
    name: "Formal",
    image: "https://via.placeholder.com/300",
    link: "/category/clothing",
  },
]

function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} to={category.link} className="group text-center">
              <div className="mb-4 overflow-hidden rounded-full mx-auto w-[150px] h-[150px]">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-medium">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCategories
