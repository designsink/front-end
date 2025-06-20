"use client"

import MainPageEditForm from "@/components/mypage-main-edit-form"
import ProductUploadForm from "@/components/mypage-product-upload-form"
import ProductListWithDelete from "@/components/mypage-product-list-with-delete"

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">마이페이지</h1>
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">메인페이지 정보 수정</h2>
          <MainPageEditForm />
        </section>
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">상품 등록</h2>
          <ProductUploadForm />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">상품 삭제</h2>
          <ProductListWithDelete />
        </section>
      </div>
    </div>
  )
} 