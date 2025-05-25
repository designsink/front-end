"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const categories = ["전체", "씽크대", "냉장고장", "붙박이장", "맞춤가구"]

// 샘플 제품 데이터
const allProducts = [
  {
    id: 1,
    title: "모던 씽크대 A-101",
    price: "₩1,200,000",
    category: "씽크대",
    image: "/placeholder.svg?height=300&width=300&text=씽크대1",
    description: "고급스러운 디자인의 모던 씽크대",
  },
  {
    id: 2,
    title: "클래식 씽크대 A-102",
    price: "₩980,000",
    category: "씽크대",
    image: "/placeholder.svg?height=300&width=300&text=씽크대2",
    description: "전통적인 스타일의 클래식 씽크대",
  },
  {
    id: 3,
    title: "프리미엄 냉장고장 B-201",
    price: "₩1,800,000",
    category: "냉장고장",
    image: "/placeholder.svg?height=300&width=300&text=냉장고장1",
    description: "공간 활용도가 뛰어난 냉장고장",
  },
  {
    id: 4,
    title: "스마트 냉장고장 B-202",
    price: "₩2,100,000",
    category: "냉장고장",
    image: "/placeholder.svg?height=300&width=300&text=냉장고장2",
    description: "최신 기술이 적용된 스마트 냉장고장",
  },
  {
    id: 5,
    title: "프리미엄 붙박이장 C-301",
    price: "₩2,500,000",
    category: "붙박이장",
    image: "/placeholder.svg?height=300&width=300&text=붙박이장1",
    description: "맞춤형 프리미엄 붙박이장",
  },
  {
    id: 6,
    title: "모던 붙박이장 C-302",
    price: "₩2,200,000",
    category: "붙박이장",
    image: "/placeholder.svg?height=300&width=300&text=붙박이장2",
    description: "현대적 디자인의 붙박이장",
  },
  {
    id: 7,
    title: "맞춤 서재 가구 D-401",
    price: "₩1,500,000",
    category: "맞춤가구",
    image: "/placeholder.svg?height=300&width=300&text=맞춤가구1",
    description: "개인 맞춤형 서재 가구",
  },
  {
    id: 8,
    title: "맞춤 침실 가구 D-402",
    price: "₩3,200,000",
    category: "맞춤가구",
    image: "/placeholder.svg?height=300&width=300&text=맞춤가구2",
    description: "침실 전용 맞춤 가구 세트",
  },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const searchParams = useSearchParams()

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  useEffect(() => {
    if (selectedCategory === "전체") {
      setFilteredProducts(allProducts)
    } else {
      setFilteredProducts(allProducts.filter((product) => product.category === selectedCategory))
    }
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 페이지 헤더 */}
      <section className="pt-24 pb-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">제품</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">디자인 씽크의 다양한 맞춤형 가구를 만나보세요.</p>
          </div>
        </div>
      </section>

      {/* 카테고리 필터 */}
      <section className="pb-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full border-2 transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">{product.category}</div>
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <Button size="sm">문의하기</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">해당 카테고리에 제품이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
