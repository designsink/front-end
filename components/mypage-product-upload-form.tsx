"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const CATEGORY_OPTIONS = [
  { label: "씽크대", value: "SINK" },
  { label: "냉장고장", value: "FRIDGE_CABINET" },
  { label: "붙박이장", value: "BUILT_IN_CLOSET" },
  { label: "맞춤가구", value: "CUSTOM_FURNITURE" },
]

export default function ProductUploadForm({ onUploaded }: { onUploaded?: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [files, setFiles] = useState<File[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const { toast } = useToast();

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (files.length === 0 || !selectedCategory) {
      toast({ description: "카테고리와 이미지를 모두 선택해 주세요.", variant: "destructive" });
      return;
    }
    const formData = new FormData();
    formData.append("categories", selectedCategory);
    files.forEach(file => formData.append("file", file));
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    try {
      const res = await fetch("https://dsink.kr/api/products", {
        method: "POST",
        headers: {
          ...(accessToken ? { "Authorization": accessToken } : {}),
        },
        body: formData,
        credentials: "include",
      });
      if (!res.ok) throw new Error("등록 실패");
      toast({ description: "등록되었습니다.", variant: "default" });
      setFiles([]);
      setSelectedCategory("");
      if (onUploaded) onUploaded();
    } catch (err) {
      toast({ description: "상품 등록 실패", variant: "destructive" });
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
                checked={selectedCategory === cat.value}
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
          multiple
          onChange={e => setFiles(e.target.files ? Array.from(e.target.files) : [])}
        />
        {files.length > 0 && (
          <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="w-full bg-primary text-white py-2 rounded mt-4">등록</button>
    </form>
  )
} 