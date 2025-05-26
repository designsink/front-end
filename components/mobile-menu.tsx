"use client"

import Link from "next/link"
import { X } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
        <Link href="/" className="hover:text-primary transition-colors">
          홈
        </Link>
        <Link href="/products" className="hover:text-primary transition-colors">
          제품
        </Link>
        {/* <Link href="/about" className="hover:text-primary transition-colors">
          소개
        </Link> */}
        {/* <Link href="/contact" className="hover:text-primary transition-colors">
          문의
        </Link> */}
      </nav>
    </div>
  )
}
