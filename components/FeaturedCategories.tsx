"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const categories = [
  {
    name: "Sneakers",
    image: "/placeholder.svg?height=300&width=300",
    link: "/category/shoes",
  },
  {
    name: "Boots",
    image: "/placeholder.svg?height=300&width=300",
    link: "/category/shoes",
  },
  {
    name: "Casual",
    image: "/placeholder.svg?height=300&width=300",
    link: "/category/clothing",
  },
  {
    name: "Formal",
    image: "/placeholder.svg?height=300&width=300",
    link: "/category/clothing",
  },
]

export default function FeaturedCategories() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.section
      className="bg-gray-50 py-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <div className="container mx-auto px-4">
        <motion.h2 className="mb-12 text-center text-2xl font-bold tracking-tight md:text-3xl" variants={item}>
          Shop by Category
        </motion.h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((category) => (
            <motion.div key={category.name} variants={item}>
              <Link href={category.link} className="group flex flex-col items-center">
                <motion.div
                  className="mb-4 overflow-hidden rounded-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={150}
                    height={150}
                    className="h-[150px] w-[150px] object-cover"
                  />
                </motion.div>
                <motion.h3 className="text-center text-lg font-medium" whileHover={{ scale: 1.05 }}>
                  {category.name}
                </motion.h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
