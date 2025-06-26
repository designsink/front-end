"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductLightbox } from "@/components/product-lightbox"

const categories = ["전체", "씽크대", "냉장고장", "붙박이장", "맞춤가구"]
const categoryMap: { [key: string]: string } = {
  "전체": "",
  "씽크대": "SINK",
  "냉장고장": "FRIDGE_CABINET",
  "붙박이장": "BUILT_IN_CLOSET",
  "맞춤가구": "CUSTOM_FURNITURE",
}

interface Product {
  productId: number
  path: string
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const categoryName = Object.keys(categoryMap).find(key => categoryMap[key] === categoryParam)
    if (categoryName) {
      setSelectedCategory(categoryName)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      const apiCategory = categoryMap[selectedCategory]
      const url = `https://dsink.kr/api/products?category=${apiCategory}`
      
      try {
        const res = await fetch(url)
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 페이지 헤더 */}
      <section className="pt-24 pb-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">제품</h1>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">디자인 씽크의 다양한 맞춤형 가구를 만나보세요.</p>
          </div>
        </div>
      </section>

      {/* 카테고리 필터 */}
      <section className="pb-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-6 py-2 md:py-3 rounded-full border-2 text-sm md:text-base transition-all duration-200 whitespace-nowrap flex items-center gap-1 md:gap-2 ${
                    selectedCategory === category
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                  }`}
                >
                  {selectedCategory === category && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 제품 그리드 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-8">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-[825px] w-full rounded-lg" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer max-w-md w-full mx-auto"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={`https://dsink.kr/images/${product.path}`}
                      alt={`제품 이미지 ${product.productId}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={index < 3}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">아직 등록된 사진이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {selectedImageIndex !== null && (
        <ProductLightbox
          products={products}
          startIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          categoryName={selectedCategory}
        />
      )}

      <Footer />
    </div>
  )
}
