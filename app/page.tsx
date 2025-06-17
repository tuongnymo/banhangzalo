"use client"

import Image from "next/image"

export default function FloatingButtons() {
  return (
    <div className="fixed right-4 top-[65%] md:top-[75%] z-50 flex flex-col gap-4">
      {/* Phone Button */}
      <a
        href="tel:0987654321" // thay bằng số thực tế nếu muốn
        className="w-16 h-16 transition-transform duration-300 hover:scale-110 drop-shadow-xl"
      >
        <Image
          src="https://i.postimg.cc/R0gZSjyL/t.webp" // icon gọi điện
          alt="Gọi điện"
          width={64}
          height={64}
        />
      </a>

      {/* Zalo Button */}
      <a
        href="https://zalo.me/2997034025843763325"
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 transition-transform duration-300 hover:scale-110 drop-shadow-xl"
      >
        <Image
          src="https://i.postimg.cc/pXPVjVvJ/t-1.webp" // icon zalo
          alt="Chat Zalo"
          width={64}
          height={64}
        />
      </a>
    </div>
  )
}
