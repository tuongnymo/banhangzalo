import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-lg font-bold">FASHION</h3>
            <p className="text-gray-600">Your destination for stylish and quality fashion items.</p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Shop</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/category/men" className="hover:text-black">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/category/women" className="hover:text-black">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="hover:text-black">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/category/all" className="hover:text-black">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Company</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/about" className="hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
            <p className="mb-4 text-gray-600">
              Subscribe to our newsletter for updates on new products and promotions.
            </p>
            <form className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
              />
              <button className="rounded bg-black px-4 py-2 font-medium text-white hover:bg-gray-800">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Fashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
