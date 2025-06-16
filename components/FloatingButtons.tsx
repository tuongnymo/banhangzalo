"use client"

import Image from "next/image"

export default function FloatingButtons() {
  return (
    <div className="fixed right-4 top-3/4 z-50 flex flex-col gap-4">
      {/* Phone Button */}
      <a href="https://zalo.me/2997034025843763325" className="w-12 h-12">
        <Image
          src="https://i.postimg.cc/fyVTBq3M/zalo1.png" // thay bằng đường dẫn ảnh bạn dùng, hoặc link trực tiếp
          alt="Gọi điện"
          width={48}
          height={48}
        />
      </a>

      {/* Zalo Button */}
      <a
        href="https://zalo.me/2997034025843763325" // hoặc ID Zalo shop bạn
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12"
      >
        <Image
          src="https://i.postimg.cc/gkpTyX1T/Icon-of-Zalo-svg.webp" // thay bằng ảnh zalo bạn muốn dùng
          alt="Chat Zalo"
          width={48}
          height={48}
        />
      </a>
    </div>
  )
}
