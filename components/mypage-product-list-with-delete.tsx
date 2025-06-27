"use client"

import { useState, useEffect, useImperativeHandle, forwardRef } from "react"
import { ProductLightbox } from "./product-lightbox"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

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

// SortableProduct 컴포넌트
function SortableProduct({ product, idx, onClickImg, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: product.productId })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 50 : 1,
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group bg-white rounded-lg shadow p-2 cursor-move"
    >
      <img
        src={`https://dsink.kr/images/${product.path}`}
        alt={`상품 이미지 ${product.productId}`}
        className="w-full h-48 object-cover rounded cursor-pointer"
        onClick={() => onClickImg(idx)}
      />
      <button
        className="absolute top-2 right-2 bg-red-500 text-white rounded px-2 py-1 text-xs opacity-80 group-hover:opacity-100 transition"
        onClick={() => onDelete(product.productId)}
      >
        삭제
      </button>
    </div>
  )
}

const ProductListWithDelete = forwardRef(function ProductListWithDelete(props, ref) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const sensors = useSensors(useSensor(PointerSensor));

  const getCategoryName = (value: string) => {
    const found = CATEGORY_OPTIONS.find((c) => c.value === value)
    return found ? found.label : "전체"
  }

  const fetchProducts = () => {
    setLoading(true)
    fetch(`https://dsink.kr/api/products?category=${selectedCategory}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory])

  const handleDelete = async (productId: number) => {
    setMessage(null)
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (!accessToken) {
      setMessage("로그인이 필요합니다.")
      return
    }
    try {
      const res = await fetch(`https://dsink.kr/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": accessToken,
        },
        credentials: "include",
      })
      if (!res.ok) throw new Error("삭제 실패")
      setMessage("삭제되었습니다.")
      fetchProducts()
    } catch (err) {
      setMessage("상품 삭제 실패")
    }
  }

  useImperativeHandle(ref, () => ({
    refetch: fetchProducts
  }))

  return (
    <div>
      <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
        <div className="flex gap-1 md:gap-2">
          {CATEGORY_OPTIONS.map(cat => (
            <button
              key={cat.value}
              className={`px-3 md:px-4 py-1 rounded-full border text-xs md:text-sm transition-all ${selectedCategory === cat.value ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-300 hover:border-primary"}`}
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (!over || active.id === over.id) return;
            const oldIndex = products.findIndex(p => p.productId === active.id);
            const newIndex = products.findIndex(p => p.productId === over.id);
            setProducts(arrayMove(products, oldIndex, newIndex));
          }}
        >
          <SortableContext items={products.map(p => p.productId)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product, idx) => (
                <SortableProduct
                  key={product.productId}
                  product={product}
                  idx={idx}
                  onClickImg={setLightboxIndex}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
      {message && <div className={`text-center mt-4 ${message.includes("성공") || message.includes("삭제되었습니다") ? "text-green-600" : "text-red-600"}`}>{message}</div>}
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
})

export default ProductListWithDelete 