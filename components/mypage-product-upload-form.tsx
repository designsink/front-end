"use client"

import { useState } from "react"

const CATEGORY_OPTIONS = [
  { label: "씽크대", value: "SINK" },
  { label: "냉장고장", value: "FRIDGE_CABINET" },
  { label: "붙박이장", value: "BUILT_IN_CLOSET" },
  { label: "맞춤가구", value: "CUSTOM_FURNITURE" },
]

export default function ProductUploadForm() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [file, setFile] = useState<File | null>(null)

  const handleCategoryChange = (value: string) => {
    setSelectedCategories([value])
  }

  return (
    <form className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block font-medium mb-1">카테고리 선택</label>
        <div className="flex gap-4 flex-wrap">
          {CATEGORY_OPTIONS.map((cat) => (
            <label key={cat.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                value={cat.value}
                checked={selectedCategories[0] === cat.value}
                onChange={() => handleCategoryChange(cat.value)}
              />
              {cat.label}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">상품 사진 업로드</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files?.[0] || null)}
        />
        {file && <p className="mt-2 text-sm text-gray-600">선택된 파일: {file.name}</p>}
      </div>
      <button type="submit" className="w-full bg-primary text-white py-2 rounded mt-4">등록</button>
    </form>
  )
} 