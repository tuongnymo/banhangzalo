'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const MenuDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Xác định thiết bị mobile/desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024) // <1024px = mobile/tablet
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative"
      // Mobile: toggle khi click
      onClick={() => {
        if (isMobile) setIsOpen(prev => !prev)
      }}
      // Desktop: mở khi hover
      onMouseEnter={() => {
        if (!isMobile) setIsOpen(true)
      }}
      onMouseLeave={() => {
        if (!isMobile) setIsOpen(false)
      }}
    >
      {/* Tiêu đề */}
      <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 text-lg font-semibold">
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <ul className="py-2">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-base hover:bg-gray-100"
                  onClick={() => setIsOpen(false)} // đóng khi click ở mobile
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MenuDropdown
