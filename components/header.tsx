"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { MobileMenu } from "./mobile-menu"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // 로그인 상태 확인 (localStorage)
    setIsLoggedIn(typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('accessToken')
    setIsLoggedIn(false)
    window.location.href = "/" // 로그아웃 후 홈으로 이동
  }

  return (
    <>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="디자인 씽크 로고"
              width={200}
              height={64}
              priority
              className="h-14 w-auto my-2"
            />
          </Link>
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
            {isLoggedIn ? (
              <button onClick={handleLogout} className="hover:text-primary transition-colors bg-transparent border-none cursor-pointer">
                로그아웃
              </button>
            ) : (
              <Link href="/login" className="hover:text-primary transition-colors">
                로그인
              </Link>
            )}
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
