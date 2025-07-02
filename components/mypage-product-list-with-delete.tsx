"use client"

import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from "react"
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
import { useToast } from "@/hooks/use-toast"

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
  sequence?: number
}

// SortableProduct 컴포넌트
function SortableProduct({ product, idx, onClickImg, onDelete, onExpand }: any) {
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
        onClick={() => onClickImg(product.productId)}
      />
      <button
        className="absolute top-2 right-2 bg-red-500 text-white rounded px-2 py-1 text-xs opacity-80 group-hover:opacity-100 transition"
        onClick={() => onDelete(product.productId)}
        onPointerDown={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
      >
        삭제
      </button>
      <button
        className="absolute top-2 right-16 bg-white text-gray-800 border border-gray-300 rounded px-2 py-1 text-xs opacity-80 group-hover:opacity-100 transition shadow"
        style={{ right: 48 }}
        onClick={e => {
          e.stopPropagation();
          onExpand(product.productId);
        }}
        onPointerDown={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
      >
        확대
      </button>
    </div>
  )
}

const ProductListWithDelete = forwardRef(function ProductListWithDelete(props: any, ref) {
  const { onOrderChanged } = props;
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));
  const loader = useRef<HTMLDivElement | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const getCategoryName = (value: string) => {
    const found = CATEGORY_OPTIONS.find((c) => c.value === value)
    return found ? found.label : "전체"
  }

  // 최신 selectedCategory/page만 반영하는 fetchProducts
  const fetchProducts = async (category: string, pageNum: number, signal?: AbortSignal) => {
    setIsLoading(true);
    let url = `https://dsink.kr/api/products?page=${pageNum}&size=10`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    try {
      const res = await fetch(url, { signal });
      const data = await res.json();
      if (category !== selectedCategory || pageNum !== page) return;
      setProducts(prev => {
        if (pageNum === 0) return data.products || [];
        const ids = new Set(prev.map((p: Product) => p.productId));
        const newUnique = (data.products || []).filter((p: Product) => !ids.has(p.productId));
        return [...prev, ...newUnique];
      });
      setHasNext(data.hasNext);
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      setHasNext(false);
    } finally {
      setIsLoading(false);
    }
  }

  // 카테고리 변경 시 초기화
  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    setProducts([]);
    setPage(0);
    setHasNext(true);
  }, [selectedCategory]);

  // page, selectedCategory가 바뀔 때마다 fetchProducts
  useEffect(() => {
    fetchProducts(selectedCategory, page, abortControllerRef.current?.signal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedCategory]);

  // 무한 스크롤 (옵션, 필요시)
  useEffect(() => {
    if (!hasNext || isLoading) return;
    const observer = new window.IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [hasNext, isLoading]);

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
      // 삭제 후 첫 페이지부터 다시 불러오기
      setProducts([]);
      setPage(0);
      setHasNext(true);
      setIsLoading(true);
      await fetchProducts(selectedCategory, 0, abortControllerRef.current?.signal);
      setIsLoading(false);
    } catch (err) {
      setMessage("상품 삭제 실패")
    }
  }

  // 썸네일 클릭 시 상세 API 호출
  const handleClickImg = async (productId: number) => {
    const res = await fetch(`https://dsink.kr/api/products/${productId}`);
    const data = await res.json();
    setSelectedProduct(data);
    setShowModal(true);
  };

  const handleExpand = async (productId: number) => {
    try {
      const res = await fetch(`https://dsink.kr/api/products/${productId}`);
      const data = await res.json();
      if (data && data.path) {
        setSelectedProduct(data);
        setShowModal(true);
      } else {
        alert('상세 이미지 정보를 불러올 수 없습니다.');
      }
    } catch {
      alert('상세 이미지 정보를 불러올 수 없습니다.');
    }
  };

  useImperativeHandle(ref, () => ({
    refetch: () => {
      setSelectedCategory("");
      setPage(0);
      setHasNext(true);
    },
    saveOrder: async () => {
      // 가장 큰 sequence부터 차례로 재할당
      const maxSequence = products.reduce((max, p) => Math.max(max, p.sequence ?? 0), 0);
      const orderList = products.map((p, idx) => ({
        id: p.productId,
        sequence: maxSequence - idx
      }));
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      try {
        const res = await fetch(`https://dsink.kr/api/products?category=${encodeURIComponent(selectedCategory)}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { "Authorization": accessToken } : {}),
          },
          body: JSON.stringify(orderList),
          credentials: "include",
        });
        if (!res.ok) throw new Error("순서 수정 실패");
        toast({ description: "순서가 성공적으로 수정되었습니다.", variant: "default" });
        if (onOrderChanged) onOrderChanged(false);
        return true;
      } catch (err) {
        toast({ description: "순서 수정 실패", variant: "destructive" });
        return false;
      }
    }
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
      {isLoading && products.length === 0 ? (
        <div className="text-center py-8">불러오는 중...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">등록된 상품이 없습니다.</div>
      ) :
        selectedCategory === "" ? (
          // 전체 카테고리일 때: 드래그 앤 드롭 없이 일반 그리드
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <div
                key={product.productId}
                className="relative group bg-white rounded-lg shadow p-2"
              >
                <img
                  src={`https://dsink.kr/images/${product.path}`}
                  alt={`상품 이미지 ${product.productId}`}
                  className="w-full h-48 object-cover rounded cursor-pointer"
                  onClick={() => handleClickImg(product.productId)}
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded px-2 py-1 text-xs opacity-80 group-hover:opacity-100 transition"
                  onClick={() => handleDelete(product.productId)}
                  onPointerDown={e => e.stopPropagation()}
                  onMouseDown={e => e.stopPropagation()}
                >
                  삭제
                </button>
                <button
                  className="absolute top-2 right-16 bg-white text-gray-800 border border-gray-300 rounded px-2 py-1 text-xs opacity-80 group-hover:opacity-100 transition shadow"
                  style={{ right: 48 }}
                  onClick={e => {
                    e.stopPropagation();
                    handleExpand(product.productId);
                  }}
                  onPointerDown={e => e.stopPropagation()}
                  onMouseDown={e => e.stopPropagation()}
                >
                  확대
                </button>
              </div>
            ))}
          </div>
        ) : (
          // 전체가 아닐 때만 드래그 앤 드롭
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
              if (!over || active.id === over.id) return;
              const oldIndex = products.findIndex(p => p.productId === active.id);
              const newIndex = products.findIndex(p => p.productId === over.id);
              const newProducts = arrayMove(products, oldIndex, newIndex);
              setProducts(newProducts);
              if (onOrderChanged) onOrderChanged(true);
            }}
          >
            <SortableContext items={products.map(p => p.productId)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product, idx) => (
                  <SortableProduct
                    key={product.productId}
                    product={product}
                    idx={idx}
                    onClickImg={handleClickImg}
                    onDelete={handleDelete}
                    onExpand={handleExpand}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )
      }
      {showModal && selectedProduct && (
        <div
          style={{
            position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          onClick={() => setShowModal(false)}
        >
          <img
            src={`https://dsink.kr/images/${selectedProduct.path}`}
            alt="상세 이미지"
            style={{ maxHeight: '80vh', maxWidth: '90vw', borderRadius: 8, background: '#fff', padding: 8 }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
      {hasNext && !isLoading && <div ref={loader} style={{ height: 40 }} />}
    </div>
  )
})

export default ProductListWithDelete 