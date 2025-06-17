"use client"

import Image from "next/image"

export default function FloatingButtons() {
  return (
    <div className="fixed right-4 top-3/4 z-50 flex flex-col gap-4">
      {/* Phone Button */}
      <a
        href="tel:0123456789"
        className="w-16 h-16 rounded-full bg-white/80 shadow-lg flex items-center justify-center animate-bounce hover:scale-110 transition-transform"
      >
        <Image
          src="https://i.postimg.cc/R0gZSjyL/t.webp"
          alt="Gọi điện"
          width={48}
          height={48}
        />
      </a>

      {/* Zalo Button */}
      <a
        href="https://zalo.me/2997034025843763325"
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 rounded-full bg-white/80 shadow-lg flex items-center justify-center animate-pulse hover:scale-110 transition-transform"
      >
        <Image
          src="https://i.postimg.cc/pXPVjVvJ/t-1.webp"
          alt="Chat Zalo"
          width={48}
          height={48}
        />
      </a>
    </div>
  )
}
