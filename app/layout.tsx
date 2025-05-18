import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import MobileNavigation from "@/components/MobileNavigation"
import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Fashion Store",
  description: "Modern fashion e-commerce store",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <AuthProvider>
          <CartProvider>
            <header className="border-b border-gray-200">
              <div className="container mx-auto flex items-center justify-between p-4">
                <Link href="/" className="text-xl font-bold">
                  FASHION
                </Link>
                <nav className="hidden space-x-6 md:flex">
                  <Link href="/" className="hover:text-gray-500">
                    Home
                  </Link>
                  <Link href="/category/shoes" className="hover:text-gray-500">
                    Shoes
                  </Link>
                  <Link href="/category/clothing" className="hover:text-gray-500">
                    Clothing
                  </Link>
                  <Link href="/category/accessories" className="hover:text-gray-500">
                    Accessories
                  </Link>
                </nav>
                <div className="flex items-center space-x-4">
                  <Link href="/search" className="hover:text-gray-500 p-2 touch-manipulation">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </Link>
                  <Link href="/cart" className="hover:text-gray-500 p-2 touch-manipulation">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="8" cy="21" r="1"></circle>
                      <circle cx="19" cy="21" r="1"></circle>
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                  </Link>
                  <Link href="/account" className="hover:text-gray-500 p-2 touch-manipulation">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </Link>
                  <button className="md:hidden p-2 touch-manipulation">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="4" x2="20" y1="12" y2="12"></line>
                      <line x1="4" x2="20" y1="6" y2="6"></line>
                      <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </header>
            <main className="pb-20 md:pb-0">{children}</main>
            <footer className="bg-gray-100 py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                  <div>
                    <h3 className="mb-4 text-lg font-bold">FASHION</h3>
                    <p className="text-gray-600">
                      Premium quality fashion items for the modern individual. Discover our collections today.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-bold">Shop</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        <Link href="/category/shoes" className="hover:text-black block py-1">
                          Shoes
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/clothing" className="hover:text-black block py-1">
                          Clothing
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/accessories" className="hover:text-black block py-1">
                          Accessories
                        </Link>
                      </li>
                      <li>
                        <Link href="/category/all" className="hover:text-black block py-1">
                          All Products
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-bold">Company</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        <Link href="/about" className="hover:text-black block py-1">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="hover:text-black block py-1">
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms" className="hover:text-black block py-1">
                          Terms & Conditions
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy" className="hover:text-black block py-1">
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-bold">Connect</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="hover:text-gray-500 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                      <a href="#" className="hover:text-gray-500 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                        </svg>
                      </a>
                      <a href="#" className="hover:text-gray-500 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8 text-center">
                  <p className="text-gray-600">© 2024 FASHION. All rights reserved.</p>
                </div>
              </div>
            </footer>

            {/* Mobile Navigation */}
            <MobileNavigation />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
