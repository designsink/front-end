"use client"

export default function ProductListWithDelete() {
  // 임시 샘플 데이터
  const products = [
    { productId: 1, path: "sample1.jpg" },
    { productId: 2, path: "sample2.jpg" },
    { productId: 3, path: "sample3.jpg" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.productId} className="relative group bg-white rounded-lg shadow p-2">
          <img
            src={`https://jaemoon99.site/images/${product.path}`}
            alt={`상품 이미지 ${product.productId}`}
            className="w-full h-48 object-cover rounded"
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
  )
} 