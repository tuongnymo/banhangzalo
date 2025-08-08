"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    href: "/category/giaycongsonam",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Giày công sở nam",
    label: "Giày công sở nam",
  },
  
  {
    href: "/category/giayluoinam",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Giày lười nam",
    label: "Giày lười nam",
  },

  {
    href: "/category/giaymlbnam",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Giày MLB nam",
    label: "Giày MLB nam",
  },

  {
    href: "/category/bootnam",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Boot nam",
    label: "Boot nam",
  },

  {
    href: "/category/giaythethaonam",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Giày thể thao nam",
    label: "Giày thể thao nam",
  },

  {
    href: "/category/giaycustomnu",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Giày custom nữ",
    label: "Giày custom nữ",
  },

  {
    href: "/category/giaysneakernu",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Giày sneaker nữ",
    label: "Giày sneaker nữ",
  },

  {
    href: "/category/bootnu",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Boot nữ",
    label: "Boot nữ",
  },

  {
    href: "/category/giaycaogot",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Giày cao gót",
    label: "Giày cao gót",
  },

  {
    href: "/category/depsandalnu",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Dép sandal nữ",
    label: "Dép sandal nữ",
  },

  {
    href: "/category/quantaynam",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Quần tây nam",
    label: "Quần tây nam",
  },

  {
    href: "/category/quanbonam",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Quần bò nam",
    label: "Quần bò nam",
  },

  {
    href: "/category/quanshortnam",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Quần short nam",
    label: "Quần short nam",
  },

  {
    href: "/category/aosominam",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Áo sơ mi nam",
    label: "Áo sơ mi nam",
  },

  {
    href: "/category/aopolonam",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Áo polo nam",
    label: "Áo polo nam",
  },

  {
    href: "/category/aophongnam",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Áo phông nam",
    label: "Áo phông nam",
  },

  {
    href: "/category/quantaynu",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Quần tây nữ",
    label: "Quần tây nữ",
  },

  {
    href: "/category/quanbonu",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Quần bò nữ",
    label: "Quần bò nữ",
  },

  {
    href: "/category/vaynu",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Váy nữ",
    label: "Váy nữ",
  },

  {
    href: "/category/aosominu",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Áo sơ mi nữ",
    label: "Áo sơ mi nữ",
  },

  {
    href: "/category/aophongnu",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Áo phông nữ",
    label: "Áo phông nữ",
  },

  {
    href: "/category/aokhoac",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Áo khoác",
    label: "Áo khoác",
  },

  {
    href: "/category/bobetrai",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Bộ bé trai",
    label: "Bộ bé trai",
  },

  {
    href: "/category/bobegai",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Bộ bé gái",
    label: "Bộ bé gái",
  },

  {
    href: "/category/vaybegai",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Váy bé gái",
    label: "Váy bé gái",
  },

  {
    href: "/category/tuinam",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Túi nam",
    label: "Túi nam",
  },

  {
    href: "/category/tuinu",
    src: "https://i.postimg.cc/Y9Nzn9ZL/giay-cong-so-nam.jpg",
    alt: "Túi nữ",
    label: "Túi nữ",
  },
  
];

export default function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="bg-gray-100 pt-2 pb-6 relative">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-2xl font-bold">Danh mục sản phẩm</h2>

        {/* Nút trái */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hidden md:block"
        >
          ◀
        </button>

        {/* Nút phải */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hidden md:block"
        >
          ▶
        </button>

        {/* Danh mục */}
        <div ref={scrollRef} className="overflow-x-auto scroll-smooth">
          <div className="grid grid-rows-2 grid-flow-col min-w-[768px] gap-6 px-2 py-2">
            {categories.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="flex flex-col items-center group"
              >
                <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">
                  {item.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
