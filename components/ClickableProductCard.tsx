import Link from "next/link"
import ProductCard from "./ProductCard"

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  discount?: number
  category?: string
}

export default function ClickableProductCard(props: ProductCardProps) {
  return (
    <Link href={`/product/${props.id}`} className="block">
      <ProductCard {...props} />
    </Link>
  )
}
