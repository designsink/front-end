"use client"

import { useState, useEffect } from "react"

const INIT = {
  title: "",
  description: "",
  storeName: "",
  ceoName: "",
  businessNumber: "",
  email: "",
  address: "",
  storePhone: "",
  phone: "",
  sinkPath: null,
  fridgeCabinetPath: null,
  builtInClosetPath: null,
  customFurniturePath: null,
}

export default function MainPageEditForm() {
  const [form, setForm] = useState(INIT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://jaemoon99.site/api/main-page/1")
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title || "",
          description: data.description || "",
          storeName: data.storeName || "",
          ceoName: data.ceoName || "",
          businessNumber: data.businessNumber || "",
          email: data.email || "",
          address: data.address || "",
          storePhone: data.storePhone || "",
          phone: data.phone || "",
          sinkPath: null,
          fridgeCabinetPath: null,
          builtInClosetPath: null,
          customFurniturePath: null,
        })
        setLoading(false)
      })
      .catch(() => {
        setError("불러오기 실패")
        setLoading(false)
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    try {
      const res = await fetch("https://jaemoon99.site/api/main-page/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { "Authorization": accessToken } : {}),
        },
        credentials: 'include',
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("저장 실패")
      setSuccess(true)
    } catch (err) {
      setError("저장 실패")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-6 text-center">불러오는 중...</div>

  return (
    <form className="space-y-4 bg-white p-6 rounded-lg shadow" onSubmit={handleSubmit}>
      <div>
        <label className="block font-medium mb-1">타이틀</label>
        <input type="text" name="title" className="w-full border rounded px-3 py-2" value={form.title} onChange={handleChange} />
      </div>
      <div>
        <label className="block font-medium mb-1">설명</label>
        <textarea name="description" className="w-full border rounded px-3 py-2" value={form.description} onChange={handleChange} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">상호명</label>
          <input type="text" name="storeName" className="w-full border rounded px-3 py-2" value={form.storeName} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">대표자명</label>
          <input type="text" name="ceoName" className="w-full border rounded px-3 py-2" value={form.ceoName} onChange={handleChange} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">사업자등록번호</label>
          <input type="text" name="businessNumber" className="w-full border rounded px-3 py-2" value={form.businessNumber} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">이메일</label>
          <input type="email" name="email" className="w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} />
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">주소</label>
        <input type="text" name="address" className="w-full border rounded px-3 py-2" value={form.address} onChange={handleChange} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">매장 전화번호</label>
          <input type="text" name="storePhone" className="w-full border rounded px-3 py-2" value={form.storePhone} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">휴대폰 번호</label>
          <input type="text" name="phone" className="w-full border rounded px-3 py-2" value={form.phone} onChange={handleChange} />
        </div>
      </div>
      <button type="submit" className="w-full bg-primary text-white py-2 rounded mt-4" disabled={saving}>{saving ? "저장 중..." : "저장"}</button>
      {success && <div className="text-green-600 text-center mt-2">저장되었습니다.</div>}
      {error && <div className="text-red-500 text-center mt-2">{error}</div>}
    </form>
  )
} 