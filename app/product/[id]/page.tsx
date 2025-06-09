import { createClient } from "@supabase/supabase-js"
import ProductDetail from "@/components/ProductDetail"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!product || error) {
    return <div className="p-4">Sản phẩm không tồn tại.</div>
  }

  return <ProductDetail product={product} />
}
