import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-6 flex items-center text-sm text-gray-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={item.href} className="flex items-center">
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}

            {isLast ? (
              <span className="text-gray-900">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-gray-900">
                {item.label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
