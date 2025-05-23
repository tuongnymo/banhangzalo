export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          price: number
          sale_price: number | null
          stock_quantity: number
          category_id: number | null
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          price: number
          sale_price?: number | null
          stock_quantity?: number
          category_id?: number | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          price?: number
          sale_price?: number | null
          stock_quantity?: number
          category_id?: number | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          id: number
          product_id: number
          image_url: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: number
          product_id: number
          image_url: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          product_id?: number
          image_url?: string
          is_primary?: boolean
          created_at?: string
        }
      }
      sizes: {
        Row: {
          id: number
          name: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          created_at?: string
        }
      }
      colors: {
        Row: {
          id: number
          name: string
          color_code: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          color_code?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          color_code?: string | null
          created_at?: string
        }
      }
      product_variants: {
        Row: {
          id: number
          product_id: number
          size_id: number | null
          color_id: number | null
          sku: string | null
          price: number | null
          stock_quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          product_id: number
          size_id?: number | null
          color_id?: number | null
          sku?: string | null
          price?: number | null
          stock_quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          product_id?: number
          size_id?: number | null
          color_id?: number | null
          sku?: string | null
          price?: number | null
          stock_quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string
          status: string
          total_amount: number
          shipping_address: string
          shipping_city: string
          shipping_postal_code: string | null
          shipping_country: string
          shipping_fee: number
          payment_method: string | null
          payment_status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          status?: string
          total_amount: number
          shipping_address: string
          shipping_city: string
          shipping_postal_code?: string | null
          shipping_country: string
          shipping_fee?: number
          payment_method?: string | null
          payment_status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          status?: string
          total_amount?: number
          shipping_address?: string
          shipping_city?: string
          shipping_postal_code?: string | null
          shipping_country?: string
          shipping_fee?: number
          payment_method?: string | null
          payment_status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          product_variant_id: number | null
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: number
          order_id: number
          product_id: number
          product_variant_id?: number | null
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number
          product_variant_id?: number | null
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      carts: {
        Row: {
          id: number
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: number
          cart_id: number
          product_id: number
          product_variant_id: number | null
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          cart_id: number
          product_id: number
          product_variant_id?: number | null
          quantity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          cart_id?: number
          product_id?: number
          product_variant_id?: number | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: number
          product_id: number
          user_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: number
          product_id: number
          user_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          product_id?: number
          user_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: number
          user_id: string
          full_name: string | null
          phone: string | null
          address: string | null
          city: string | null
          postal_code: string | null
          country: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          full_name?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          full_name?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
