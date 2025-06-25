"use client"

import Link from "next/link"
import { X } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  isLoggedIn: boolean
  handleLogout: () => void
}

export function MobileMenu({ isOpen, onClose, isLoggedIn, handleLogout }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-gray-800">
          <X size={24} />
        </button>
      </div>
      <nav className="flex flex-col items-center gap-8 p-8 text-xl">
        <Link href="/" className="hover:text-primary transition-colors" onClick={onClose}>
          홈
        </Link>
        <Link href="/products" className="hover:text-primary transition-colors" onClick={onClose}>
          제품
        </Link>
        {isLoggedIn ? (
          <Link href="/mypage" className="hover:text-primary transition-colors" onClick={onClose}>
            마이페이지
          </Link>
        ) : (
          <Link href="/#directions" className="hover:text-primary transition-colors" onClick={onClose}>
            오시는길
          </Link>
        )}
        {isLoggedIn ? (
          <button onClick={() => { handleLogout(); onClose(); }} className="hover:text-primary transition-colors bg-transparent border-none cursor-pointer">
            로그아웃
          </button>
        ) : (
          <Link href="/login" className="hover:text-primary transition-colors" onClick={onClose}>
            로그인
          </Link>
        )}
      </nav>
    </div>
  )
}
