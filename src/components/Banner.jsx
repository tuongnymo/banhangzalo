"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const banners = [
  {
    id: 1,
    title: "Elevate Your Style",
    subtitle: "Discover our new collection of premium shoes and fashion items",
    image: "https://via.placeholder.com/1920x1080",
    cta: { text: "Shop Now", link: "/category/all" },
  },
  {
    id: 2,
    title: "Summer Collection 2025",
    subtitle: "Lightweight and breathable designs for the warmer days",
    image: "https://via.placeholder.com/1920x1080",
    cta: { text: "Explore Collection", link: "/category/clothing" },
  },
  {
    id: 3,
    title: "Exclusive Limited Edition",
    subtitle: "Premium designs crafted with exceptional materials",
    image: "https://via.placeholder.com/1920x1080",
    cta: { text: "Shop Limited Edition", link: "/category/shoes" },
  },
]

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentBanner = banners[currentIndex]

  return (
    <div className="relative h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{ backgroundImage: `url(${currentBanner.image})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{currentBanner.title}</h1>
        <p className="text-lg max-w-md mb-8">{currentBanner.subtitle}</p>
        <Link
          to={currentBanner.cta.link}
          className="bg-white text-black px-6 py-2 rounded hover:bg-gray-100 transition"
        >
          {currentBanner.cta.text}
        </Link>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50"
        onClick={prevSlide}
      >
        <FaChevronLeft />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50"
        onClick={nextSlide}
      >
        <FaChevronRight />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-8 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner
