"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";


const categories = [
  {
    href: "/category/giaycongsonam",
    src: "https://i.postimg.cc/yx22GHPV/gi-y-c-ng-s-nam.jpg",
    alt: "Giày công sở nam",
    label: "Giày công sở nam",
  },

  {
    href: "/category/bootnu",
    src: "https://i.postimg.cc/d1Hb8dZZ/boot-n.jpg",
    alt: "Boot nữ",
    label: "Boot nữ",
  },

  {
    href: "/category/giaythethaonam",
    src: "https://i.postimg.cc/cHHj4Hkx/gi-y-th-thao-nam.jpg",
    alt: "Giày thể thao nam",
    label: "Giày thể thao nam",
  },
  
  {
    href: "/category/giaycaogot",
    src: "https://i.postimg.cc/7Pcvh3yp/gi-y-cao-g-t.jpg",
    alt: "Giày cao gót",
    label: "Giày cao gót",
  },

  {
    href: "/category/giayluoinam",
    src: "https://i.postimg.cc/RZ72g2nB/gi-y-l-i-nam.jpg",
    alt: "Giày lười nam",
    label: "Giày lười nam",
  },

  {
    href: "/category/giaybupbe",
    src: "https://i.postimg.cc/MKjCQn6X/gi-y-custom-n.jpg",
    alt: "Giày búp bê",
    label: "Giày búp bê",
  },

  {
    href: "/category/giaycaoconam",
    src: "https://i.postimg.cc/0yRLd9jn/boot-nam.jpg",
    alt: "Giày cao cổ",
    label: "Giày cao cổ",
  },

  {
    href: "/category/giaysneakernu",
    src: "https://i.postimg.cc/8Cw9SWHX/gi-y-sneaker-n.webp",
    alt: "Giày sneaker nữ",
    label: "Giày sneaker nữ",
  },

  {
    href: "/category/depnam",
    src: "https://i.postimg.cc/W4KVpDLs/d-p-nam.jpg",
    alt: "Dép nam",
    label: "Dép nam",
  },

  {
    href: "/category/depnu",
    src: "https://i.postimg.cc/vT4pXB5q/d-p-sandal-n.webp",
    alt: "Dép nữ",
    label: "Dép nữ",
  },

  {
    href: "/category/quantaynam",
    src: "https://i.postimg.cc/rw5CxkRS/qu-n-t-y-nam.jpg",
    alt: "Quần tây nam",
    label: "Quần tây nam",
  },

  {
    href: "/category/quantaynu",
    src: "https://i.postimg.cc/g2BsGDh7/qu-n-t-y-n.jpg",
    alt: "Quần tây nữ",
    label: "Quần tây nữ",
  },

  {
    href: "/category/quanbonam",
    src: "https://i.postimg.cc/NFV77Gxx/qu-n-b-nam.jpg",
    alt: "Quần bò nam",
    label: "Quần bò nam",
  },

  {
    href: "/category/quanbonu",
    src: "https://i.postimg.cc/tgKzx42t/qu-n-b-n.webp",
    alt: "Quần bò nữ",
    label: "Quần bò nữ",
  },

  {
    href: "/category/quanshortnam",
    src: "https://i.postimg.cc/PrgQCxJX/qu-n-short-nam.jpg",
    alt: "Quần short nam",
    label: "Quần short nam",
  },

  {
    href: "/category/vaynu",
    src: "https://i.postimg.cc/7ZLXvc57/v-y-n.webp",
    alt: "Váy nữ",
    label: "Váy nữ",
  },

  {
    href: "/category/aosominam",
    src: "https://i.postimg.cc/7PQVyXyT/o-s-mi-nam.jpg",
    alt: "Áo sơ mi nam",
    label: "Áo sơ mi nam",
  },

  {
    href: "/category/aosominu",
    src: "https://i.postimg.cc/02PcnrxV/o-s-mi-n.webp",
    alt: "Áo sơ mi nữ",
    label: "Áo sơ mi nữ",
  },

  {
    href: "/category/aopolonam",
    src: "https://i.postimg.cc/QtfqCJ9w/o-polo-nam.jpg",
    alt: "Áo polo nam",
    label: "Áo polo nam",
  },

  {
    href: "/category/aophongnu",
    src: "https://i.postimg.cc/zX7pc5G8/o-ph-ng-n.webp",
    alt: "Áo phông nữ",
    label: "Áo phông nữ",
  },

  {
    href: "/category/aophongnam",
    src: "https://i.postimg.cc/cC6BntfH/o-ph-ng-nam.webp",
    alt: "Áo phông nam",
    label: "Áo phông nam",
  },

  {
    href: "/category/aokhoacnu",
    src: "https://i.postimg.cc/8CJHc6Bz/o-kho-c-n.jpg",
    alt: "Áo khoác nữ",
    label: "Áo khoác nữ",
  },

  {
    href: "/category/bobetrai",
    src: "https://i.postimg.cc/YSYd8F4y/b-b-trai.jpg",
    alt: "Bộ bé trai",
    label: "Bộ bé trai",
  },

  {
    href: "/category/tuinam",
    src: "https://i.postimg.cc/wMTF6bwS/t-i-nam.jpg",
    alt: "Túi nam",
    label: "Túi nam",
  },

  {
    href: "/category/bobegai",
    src: "https://i.postimg.cc/Z51frHqd/b-b-g-i.webp",
    alt: "Bộ bé gái",
    label: "Bộ bé gái",
  },

  {
    href: "/category/tuinu",
    src: "https://i.postimg.cc/k4yfPdvQ/t-i-n.jpg",
    alt: "Túi nữ",
    label: "Túi nữ",
  },

  {
    href: "/category/vaybegai",
    src: "https://i.postimg.cc/C10m2KkM/v-y-b-g-i.webp",
    alt: "Váy bé gái",
    label: "Váy bé gái",
  },

  {
    href: "/category/vali",
    src: "https://i.postimg.cc/0jPB9xQ8/vali.jpg",
    alt: "Vali",
    label: "Vali",
  },

  {
    href: "/category/kinhnam",
    src: "https://i.postimg.cc/tTxjsXpW/k-nh-nam.webp",
    alt: "Kính nam",
    label: "Kính nam",
  },

  {
    href: "/category/giaynamcaocap",
    src: "https://i.postimg.cc/wMYdJSjP/gi-y-nam-cao-c-p.jpg",
    alt: "Giày nam cao cấp",
    label: "Giày nam cao cấp",
  },

  {
    href: "/category/kinhnu",
    src: "https://i.postimg.cc/vT7wv31m/k-nh-n.jpg",
    alt: "Kính nữ",
    label: "Kính nữ",
  },

  {
    href: "/category/giaynucaocap",
    src: "https://i.postimg.cc/m2Rsrfq1/gi-y-n-cao-c-p.jpg",
    alt: "Giày nữ cao cấp",
    label: "Giày nữ cao cấp",
  },

  {
    href: "/category/munam",
    src: "https://i.postimg.cc/gc3pdkMP/m-nam.jpg",
    alt: "Mũ nam",
    label: "Mũ nam",
  },

  {
    href: "/category/munu",
    src: "https://i.postimg.cc/7YVyGt8s/m-n.jpg",
    alt: "Mũ nữ",
    label: "Mũ nữ",
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
    <section className="bg-gray-100 py-4 relative">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-2xl font-bold">Danh mục sản phẩm</h2>

        {/* Nút trái */}
        <button
          onClick={scrollLeft}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur shadow-md p-2 rounded-full hidden md:block"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Nút phải */}
        <button
          onClick={scrollRight}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur shadow-md p-2 rounded-full hidden md:block"
        >
          <ChevronRight className="w-5 h-5" />
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
                <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full bg-gray-200 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-xs md:text-sm font-medium text-gray-800 group-hover:text-black text-center">
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
