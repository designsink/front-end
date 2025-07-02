"use client"

import MainPageEditForm from "@/components/mypage-main-edit-form"
import ProductUploadForm from "@/components/mypage-product-upload-form"
import ProductListWithDelete from "@/components/mypage-product-list-with-delete"
import { CornerUpLeft } from "lucide-react"
import { useRef, useState } from "react"
import { Toaster } from "@/components/ui/toaster"

export default function MyPage() {
  const productListRef = useRef<any>(null)
  const handleProductUploaded = () => {
    productListRef.current?.refetch()
  }
  const [orderSaveLoading, setOrderSaveLoading] = useState(false);
  const [orderSaveError, setOrderSaveError] = useState<string | null>(null);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-24 pb-8 md:pb-12 w-full max-w-full overflow-x-hidden">
        <div className="w-full max-w-3xl mx-auto px-2 md:px-4 overflow-x-visible">
          <div className="flex items-center gap-1 md:gap-2 mb-4 md:mb-8">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex items-center p-2 rounded border border-gray-300 hover:bg-gray-100 text-gray-700 text-base md:text-lg font-medium transition"
              aria-label="뒤로가기"
            >
              <CornerUpLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <h1 className="ml-2 md:ml-4 text-2xl md:text-4xl font-bold">마이페이지</h1>
          </div>
          <section className="mb-6 md:mb-12">
            <h2 className="text-base md:text-xl font-semibold mb-2 md:mb-4">메인페이지 정보 수정</h2>
            <MainPageEditForm />
          </section>
          <section className="mb-6 md:mb-12">
            <h2 className="text-base md:text-xl font-semibold mb-2 md:mb-4">상품 등록</h2>
            <ProductUploadForm onUploaded={handleProductUploaded} />
          </section>
          <section>
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <h2 className="text-base md:text-xl font-semibold">상품 수정/삭제</h2>
            </div>
            {orderSaveError && <div className="text-red-600 text-sm mb-2">{orderSaveError}</div>}
            <ProductListWithDelete ref={productListRef} onOrderChanged={setIsOrderChanged} />
          </section>
        </div>
        {/* 오른쪽 아래 고정 수정 버튼 */}
        {isOrderChanged && (
          <button
            className="fixed bottom-8 right-8 z-50 bg-primary text-white rounded-full shadow-lg p-4 hover:bg-primary/90 transition-all text-base md:text-lg"
            style={{ minWidth: 64 }}
            disabled={orderSaveLoading}
            onClick={async () => {
              setOrderSaveLoading(true);
              setOrderSaveError(null);
              const ok = await productListRef.current.saveOrder();
              if (!ok) setOrderSaveError("순서 저장 실패");
              setOrderSaveLoading(false);
            }}
          >
            {orderSaveLoading ? "저장 중..." : "수정"}
          </button>
        )}
      </div>
      <Toaster />
    </>
  )
} 