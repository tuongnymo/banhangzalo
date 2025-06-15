// layout.tsx

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import LayoutClient from "@/components/LayoutClient"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Fashion Store",
  description: "Modern fashion e-commerce store",
  generator: "v0.dev"
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
