"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-900">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left text-xl font-bold">NOIR</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col">
          <Link
            to="/category/shoes"
            className="flex items-center justify-between border-b border-gray-100 py-3 text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Shoes
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            to="/category/clothing"
            className="flex items-center justify-between border-b border-gray-100 py-3 text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Clothing
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            to="/category/accessories"
            className="flex items-center justify-between border-b border-gray-100 py-3 text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Accessories
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            to="/category/all"
            className="flex items-center justify-between border-b border-gray-100 py-3 text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            All Products
            <ChevronRight className="h-4 w-4" />
          </Link>
        </nav>
        <div className="mt-8">
          <h3 className="mb-4 text-sm font-bold uppercase">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/help" className="text-gray-600 hover:text-gray-900" onClick={() => setOpen(false)}>
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900" onClick={() => setOpen(false)}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="text-gray-600 hover:text-gray-900" onClick={() => setOpen(false)}>
                Shipping & Returns
              </Link>
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  )
}
