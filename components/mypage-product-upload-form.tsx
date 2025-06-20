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
  const [message, setMessage] = useState<string | null>(null)

  const handleCategoryChange = (value: string) => {
    setSelectedCategories([value])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!file || selectedCategories.length === 0) {
      setMessage("카테고리와 이미지를 모두 선택해 주세요.");
      return;
    }
    const formData = new FormData();
    formData.append("categories", selectedCategories[0]);
    formData.append("file", file);
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    try {
      const res = await fetch("https://jaemoon99.site/api/products", {
        method: "POST",
        headers: {
          ...(accessToken ? { "Authorization": accessToken } : {}),
        },
        body: formData,
        credentials: "include",
      });
      if (!res.ok) throw new Error("등록 실패");
      setMessage("등록되었습니다.");
      setFile(null);
      setSelectedCategories([]);
    } catch (err) {
      setMessage("상품 등록 실패");
    }
  }

  return (
    <form className="space-y-4 bg-white p-6 rounded-lg shadow" onSubmit={handleSubmit}>
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
      {message && <div className="text-green-600 text-center mt-2">{message}</div>}
    </form>
  )
} 