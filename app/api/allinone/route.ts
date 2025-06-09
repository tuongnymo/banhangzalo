import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  console.log("✅ ENV CHECK")
  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    const { data, error } = await supabase.from('products').select('*')

    if (error) {
      console.error("❌ Supabase error:", error.message)
      throw error
    }

    const shuffled = [...(data || [])].sort(() => 0.5 - Math.random())
    const newProducts = shuffled.slice(0, 6)
    const bestSellers = shuffled.slice(6, 10)

    return NextResponse.json({ newProducts, bestSellers })
  } catch (err) {
    console.error("❌ API crashed:", err)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
