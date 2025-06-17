"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

const banners = [
  {
    id: 1,
    image: "https://i.postimg.cc/LsBS84BG/2.webp",
  },
  {
    id: 2,
    image: "https://i.postimg.cc/260fnHtw/3.webp",
  },
  {
    id: 3,
    image: "https://i.postimg.cc/zBCr3zC9/4-11zon.webp",
  },
]

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      // Swiped left, go to next slide
      nextSlide()
    } else if (distance < -minSwipeDistance) {
      // Swiped right, go to previous slide
      prevSlide()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    // Auto-advance slides
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <section
      className="relative w-full aspect-[2/1] md:aspect-[16/7] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {loading ? (
        <div className="flex h-full w-full items-center justify-center bg-gray-200 animate-pulse">
          <div className="h-16 w-16 rounded-full border-4 border-gray-300 border-t-gray-800 animate-spin"></div>
        </div>
      ) : (
        <>
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="relative h-full w-full min-w-full">
                <Image
                  src={banner.image || "/placeholder.svg"}
                  alt={`Banner ${banner.id}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black shadow-md hover:bg-white touch-manipulation"
            aria-label="Previous slide"
          >
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
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black shadow-md hover:bg-white touch-manipulation"
            aria-label="Next slide"
          >
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
