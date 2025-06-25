"use client"

import MainPageEditForm from "@/components/mypage-main-edit-form"
import ProductUploadForm from "@/components/mypage-product-upload-form"
import ProductListWithDelete from "@/components/mypage-product-list-with-delete"
import { CornerUpLeft } from "lucide-react"

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-24 pb-8 md:pb-12">
      <div className="w-full max-w-3xl mx-auto px-2 md:px-4 overflow-x-auto">
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
          <ProductUploadForm />
        </section>
        <section>
          <h2 className="text-base md:text-xl font-semibold mb-2 md:mb-4">상품 삭제</h2>
          <ProductListWithDelete />
        </section>
      </div>
    </div>
  )
} 