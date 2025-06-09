import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function createServerSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseKey)
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabase()
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    const categorySlug = searchParams.get("category")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured")
    const sortBy = searchParams.get("sortBy") || "created_at"
    const sortOrder = searchParams.get("sortOrder") === "asc" ? true : false

    let query = supabase
      .from("products")
      .select(`
  id, name, price, description, discount, is_active, created_at,
  category:categories(id, name, slug),
  images:product_images(id, image_url, is_primary),
  variants:product_variants(
    id, sku, price, stock_quantity,
    size:sizes(id, name),
    color:colors(id, name, color_code)
  )
`, { count: "exact" })
      .eq("is_active", true)
      .order(sortBy, { ascending: sortOrder })
      .range(offset, offset + limit - 1)

    // Filter by category slug
    if (categorySlug) {
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .single()

      if (categoryError || !categoryData) {
        return NextResponse.json(
          { success: false, error: "Invalid category" },
          { status: 400 }
        )
      }

      query = query.eq("category_id", categoryData.id)
    }

    // Filter by name search
    if (search) {
      query = query.ilike("name", `%${search}%`)
    }

    // Filter featured
    if (featured === "true") {
      query = query.eq("is_featured", true)
    }

    // Execute query
    const { data: products, error, count } = await query

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { success: false, error: "Database query error" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      products: products || [],
      pagination: {
        page,
        limit,
        totalProducts: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
