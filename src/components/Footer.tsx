"use client"

import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">FULLSTORE FASHION</h3>
            <p className="text-sm text-gray-600">Uy tín, Chất lượng tạo nên thương hiệu.</p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/shoes" className="text-gray-600 hover:text-gray-900">
                  Shop Nam
                </Link>
              </li>
              <li>
                <Link to="/category/clothing" className="text-gray-600 hover:text-gray-900">
                  Shop Nữ
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-gray-600 hover:text-gray-900">
                  Túi Xách & Phụ Kiện
                </Link>
              </li>
              <li>
                <Link to="/category/all" className="text-gray-600 hover:text-gray-900">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-gray-900">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/stores" className="text-gray-600 hover:text-gray-900">
                  Stores
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-gray-900">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-600 hover:text-gray-900">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>© 2025 NOIR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
