"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"

const banners = [
  {
    id: 1,
    title: "Elevate Your Style",
    subtitle: "Discover our new collection of premium shoes and fashion items",
    image: "/placeholder.svg?height=1080&width=1920",
    cta: { men: "Shop Men", women: "Shop Women" },
  },
  {
    id: 2,
    title: "Summer Collection 2025",
    subtitle: "Lightweight and breathable designs for the warmer days",
    image: "/placeholder.svg?height=1080&width=1920",
    cta: { primary: "Shop Collection" },
  },
  {
    id: 3,
    title: "Exclusive Limited Edition",
    subtitle: "Premium designs crafted with exceptional materials",
    image: "/placeholder.svg?height=1080&width=1920",
    cta: { primary: "Explore Now" },
  },
]

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, currentIndex])

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const currentBanner = banners[currentIndex]

  return (
    <section
      className="relative h-[70vh] w-full overflow-hidden bg-gray-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
            style={{ backgroundImage: `url(${currentBanner.image})` }}
          ></div>
          <div className="absolute inset-0 bg-black/40"></div>
          <motion.div
            className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.h1
              className="mb-4 text-4xl font-bold tracking-tight md:text-6xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {currentBanner.title}
            </motion.h1>
            <motion.p
              className="mb-8 max-w-md text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {currentBanner.subtitle}
            </motion.p>
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {currentBanner.cta.men && currentBanner.cta.women ? (
                <>
                  <Button className="bg-white text-black hover:bg-gray-200">{currentBanner.cta.men}</Button>
                  <Button className="bg-black text-white hover:bg-gray-800">{currentBanner.cta.women}</Button>
                </>
              ) : (
                <Button className="bg-white text-black hover:bg-gray-200">{currentBanner.cta.primary}</Button>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-8 rounded-full transition-all ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </section>
  )
}
