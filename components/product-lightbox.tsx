"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, X, ExternalLink } from "lucide-react"

interface Product {
  productId: number
  path: string
}

interface ProductLightboxProps {
  products: Product[]
  startIndex: number
  onClose: () => void
  categoryName: string
}

export function ProductLightbox({ products, startIndex, onClose, categoryName }: ProductLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? products.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === products.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext()
      else if (e.key === "ArrowLeft") goToPrevious()
      else if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex])

  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeThumbnail = thumbnailContainerRef.current.children[currentIndex] as HTMLDivElement
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      }
    }
  }, [currentIndex])

  const currentProduct = products[currentIndex]
  const imageUrl = `https://dsink.kr/images/${currentProduct.path}`

  const handleOpenOriginalImage = () => {
    const img = new window.Image()
    img.onload = () => {
      const screenWidth = window.screen.width
      const screenHeight = window.screen.height
      const imgWidth = img.naturalWidth
      const imgHeight = img.naturalHeight

      // 이미지가 화면보다 크면 화면 크기에 맞추고, 아니면 이미지 크기에 맞춤
      const popupWidth = Math.min(imgWidth, screenWidth * 0.9)
      const popupHeight = Math.min(imgHeight, screenHeight * 0.9)

      const left = (screenWidth - popupWidth) / 2
      const top = (screenHeight - popupHeight) / 2

      const features = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes`
      window.open(imageUrl, 'originalImage', features)
    }
    img.src = imageUrl
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 m-0 bg-white max-w-full w-full h-full border-none flex flex-col items-center justify-between">
        <DialogTitle className="sr-only">{`${categoryName} 제품 상세 이미지`}</DialogTitle>
        <div className="w-full flex justify-end items-center p-4 absolute top-0 left-0 z-50 bg-white/80 backdrop-blur-sm">
          <div>
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-black mr-2"
              onClick={handleOpenOriginalImage}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              원본보기
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-black" onClick={onClose}>
              <X size={24} />
            </Button>
          </div>
        </div>

        <div className="relative w-full h-full flex items-center justify-center pt-20 pb-40">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 text-gray-700 hover:text-black bg-white/50 hover:bg-white/80 rounded-full"
            onClick={goToPrevious}
          >
            <ArrowLeft size={32} />
          </Button>

          <div className="relative w-[85%] h-[80%] z-10">
            <Image
              src={imageUrl}
              alt={`제품 이미지 ${currentProduct.productId}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20 text-gray-700 hover:text-black bg-white/50 hover:bg-white/80 rounded-full"
            onClick={goToNext}
          >
            <ArrowRight size={32} />
          </Button>
        </div>

        <div className="w-full absolute bottom-0 left-0 py-4 bg-white/80 backdrop-blur-sm z-50">
          <div className="mx-auto max-w-xl px-4">
            <div ref={thumbnailContainerRef} className="flex items-center gap-2 overflow-x-auto pb-2">
              {products.map((p, index) => (
                <div
                  key={p.productId}
                  className={`relative w-20 h-20 shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${
                    currentIndex === index ? "border-primary" : "border-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <Image src={`https://dsink.kr/images/${p.path}`} alt={`썸네일 ${p.productId}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 