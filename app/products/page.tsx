"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
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
  const [page, setPage] = useState(0)
  const [hasNext, setHasNext] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const searchParams = useSearchParams()
  const abortControllerRef = useRef<AbortController | null>(null)
  const [isResetting, setIsResetting] = useState(false);

  // 이전 카테고리 추적용 ref
  const prevCategoryRef = useRef(selectedCategory);
  useEffect(() => {
    prevCategoryRef.current = selectedCategory;
  }, [selectedCategory]);

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const categoryName = Object.keys(categoryMap).find(key => categoryMap[key] === categoryParam)
    if (categoryName) {
      setSelectedCategory(categoryName)
    }
  }, [searchParams])

  const fetchProducts = useCallback(
    async (category: string, pageNum: number, signal?: AbortSignal) => {
      setIsLoading(true);
      const apiCategory = categoryMap[category];
      const url = `https://dsink.kr/api/products?category=${apiCategory}&page=${pageNum}&size=10`;
      try {
        const res = await fetch(url, { signal });
        const data = await res.json();
        // 최신 category/page가 아니면 무시
        if (category !== selectedCategory || pageNum !== page) return;
        setProducts((prev: Product[]) => {
          const ids = new Set(prev.map((p: Product) => p.productId));
          const newProducts = (data.products || []).filter((p: Product) => !ids.has(p.productId));
          return [...prev, ...newProducts];
        });
        setHasNext(data.hasNext);
      } catch (error: any) {
        if (error.name === 'AbortError') return;
        setHasNext(false);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCategory, page]
  );

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    setProducts([]);
    setPage(0);
    setHasNext(true);
  }, [selectedCategory, searchParams]);

  // page가 0이 되는 순간에만 fetchProducts 호출
  useEffect(() => {
    if (products.length === 0 && page === 0) {
      fetchProducts(selectedCategory, 0, abortControllerRef.current?.signal);
    } else if (page > 0) {
      fetchProducts(selectedCategory, page, abortControllerRef.current?.signal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 페이지 헤더 */}
      <section className="pt-24 pb-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">제품</h1>
            <p className="text-sm md:text-base text-gray-600 max-w-4xl mx-auto">디자인 씽크의 다양한 맞춤형 가구를 만나보세요.</p>
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
                  onClick={() => {
                    setSelectedCategory(category);
                    setProducts([]);
                    setPage(0);
                    setHasNext(true);
                  }}
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
          {/* 초기화 중에는 무조건 로딩 메시지 */}
          {isResetting ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <span className="text-gray-500 text-lg">로딩 중...</span>
            </div>
          ) : isLoading && products.length === 0 ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <span className="text-gray-500 text-lg">로딩 중...</span>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer max-w-4xl w-full mx-auto"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={`https://dsink.kr/images/${product.path}`}
                      alt={`${product.path}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[400px]">
              <span className="text-gray-500 text-lg">제품이 없습니다.</span>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}