"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { MobileMenu } from "./mobile-menu"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="디자인 씽크 로고"
              width={200}
              height={64}
              priority
              className="h-14 w-auto"
            />
          </Link>
          {/* <Link href="/" className="text-2xl font-bold text-primary">
            디자인 씽크
          </Link> */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-primary transition-colors">
              홈
            </Link>
            <Link href="/products" className="hover:text-primary transition-colors">
              제품
            </Link>
            <Link href="/#directions" className="hover:text-primary transition-colors">
              오시는길
            </Link>
            {/* <Link href="/about" className="hover:text-primary transition-colors">
              소개
            </Link> */}
            {/* <Link href="/contact" className="hover:text-primary transition-colors">
              문의
            </Link> */}
          </nav>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-gray-800">
            <Menu size={24} />
          </button>
        </div>
      </header>
    </>
  )
}
