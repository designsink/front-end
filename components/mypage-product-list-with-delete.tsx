"use client"

import { useState, useEffect } from "react"
import { ProductLightbox } from "./product-lightbox"

const CATEGORY_OPTIONS = [
  { label: "전체", value: "" },
  { label: "씽크대", value: "SINK" },
  { label: "냉장고장", value: "FRIDGE_CABINET" },
  { label: "붙박이장", value: "BUILT_IN_CLOSET" },
  { label: "맞춤가구", value: "CUSTOM_FURNITURE" },
]

interface Product {
  productId: number
  path: string
}

export default function ProductListWithDelete() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const getCategoryName = (value: string) => {
    const found = CATEGORY_OPTIONS.find((c) => c.value === value)
    return found ? found.label : "전체"
  }

  useEffect(() => {
    setLoading(true)
    fetch(`https://jaemoon99.site/api/products?category=${selectedCategory}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [selectedCategory])

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-xl font-semibold">상품 삭제</h3>
        <div className="flex gap-2">
          {CATEGORY_OPTIONS.map(cat => (
            <button
              key={cat.value}
              className={`px-4 py-1 rounded-full border text-sm transition-all ${selectedCategory === cat.value ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-300 hover:border-primary"}`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="text-center py-8">불러오는 중...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">등록된 상품이 없습니다.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <div key={product.productId} className="relative group bg-white rounded-lg shadow p-2">
              <img
                src={`https://jaemoon99.site/images/${product.path}`}
                alt={`상품 이미지 ${product.productId}`}
                className="w-full h-48 object-cover rounded cursor-pointer"
                onClick={() => setLightboxIndex(idx)}
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded px-2 py-1 text-xs opacity-80 group-hover:opacity-100 transition"
                // onClick={() => handleDelete(product.productId)}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
      {lightboxIndex !== null && (
        <ProductLightbox
          products={products}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          categoryName={getCategoryName(selectedCategory)}
        />
      )}
    </div>
  )
} 