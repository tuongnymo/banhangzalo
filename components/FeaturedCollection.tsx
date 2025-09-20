"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function FeaturedCollection() {
  return (
    <motion.section
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-2xl font-bold tracking-tight md:text-3xl"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Bộ Sưu Tập
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            className="group relative overflow-hidden rounded-lg"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40"></div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Men's Collection"
                width={800}
                height={400}
                className="h-[400px] w-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
              <motion.h3
                className="mb-2 text-2xl font-bold"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Men's Collection
              </motion.h3>
              <motion.p
                className="mb-6 max-w-xs"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Tối giản. Mạnh mẽ. Lôi cuốn
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild className="bg-white text-black hover:bg-gray-200">
                  <Link href="/category/giaycongsonam">Shop Now</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="group relative overflow-hidden rounded-lg"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40"></div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Women's Collection"
                width={800}
                height={400}
                className="h-[400px] w-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
              <motion.h3
                className="mb-2 text-2xl font-bold"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Women's Collection
              </motion.h3>
              <motion.p
                className="mb-6 max-w-xs"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
               Đẹp nhẹ nhàng, cuốn hút tự nhiên
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild className="bg-white text-black hover:bg-gray-200">
                  <Link href="/category/bootnu">Shop Now</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
