"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"

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
  const bannerListRef = useRef<{ refetch: () => void }>(null);

  useEffect(() => {
    fetch("https://dsink.kr/api/main-page/1")
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
      const res = await fetch("https://dsink.kr/api/main-page/1", {
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

  const handleBannerUploaded = () => {
    bannerListRef.current?.refetch();
  };

  if (loading) return <div className="p-6 text-center">불러오는 중...</div>

  return (
    <>
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
      <MainBannerUploadForm onUploaded={handleBannerUploaded} />
      <MainBannerListWithDelete ref={bannerListRef} />
    </>
  )
}

// --- 메인 베너 이미지 등록 폼 ---
function MainBannerUploadForm({ onUploaded }: { onUploaded?: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    if (files.length === 0) {
      setMessage("이미지를 선택해 주세요.")
      return
    }
    const formData = new FormData()
    formData.append("categories", "MAIN")
    files.forEach(file => formData.append("file", file))
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    try {
      const res = await fetch("https://dsink.kr/api/products", {
        method: "POST",
        headers: {
          ...(accessToken ? { "Authorization": accessToken } : {}),
        },
        body: formData,
        credentials: "include",
      })
      if (!res.ok) throw new Error("등록 실패")
      setMessage("등록되었습니다.")
      setFiles([])
      if (onUploaded) onUploaded()
    } catch {
      setMessage("등록 실패")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow mt-8">
      <label className="block font-medium mb-1">메인 베너 이미지 업로드</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={e => setFiles(e.target.files ? Array.from(e.target.files) : [])}
      />
      {files.length > 0 && (
        <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
          {files.map((file, idx) => <li key={idx}>{file.name}</li>)}
        </ul>
      )}
      <button type="submit" className="w-full bg-primary text-white py-2 rounded mt-4">등록</button>
      {message && <div className="text-green-600 text-center mt-2">{message}</div>}
    </form>
  )
}

// --- 메인 베너 이미지 목록 + 삭제 ---
const MainBannerListWithDelete = forwardRef(function MainBannerListWithDelete(props, ref) {
  const [banners, setBanners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://dsink.kr/api/main-page`);
      const data = await res.json();
      setBanners(Array.isArray(data) ? data : []);
    } catch {
      setBanners([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBanners();
  }, []);

  // refetch 메서드 외부 노출
  useImperativeHandle(ref, () => ({
    refetch: fetchBanners
  }));

  const handleDelete = async (productId: number) => {
    setMessage(null)
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    try {
      const res = await fetch(`https://dsink.kr/api/products/${productId}` , {
        method: "DELETE",
        headers: { ...(accessToken ? { "Authorization": accessToken } : {}) },
        credentials: "include",
      })
      if (!res.ok) throw new Error("삭제 실패")
      setMessage("삭제되었습니다.")
      fetchBanners();
    } catch {
      setMessage("삭제 실패")
    }
  }

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-2">등록된 메인 베너 이미지</h3>
      {loading ? (
        <div>불러오는 중...</div>
      ) : Array.isArray(banners) && banners.length === 0 ? (
        <div className="text-gray-500">등록된 이미지가 없습니다.</div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {Array.isArray(banners) && banners.map(banner => (
            <div key={banner.productId} className="relative w-40 h-24">
              <img
                src={`https://dsink.kr/images/${banner.path}`}
                alt={`메인 베너 ${banner.productId}`}
                className="w-full h-full object-cover rounded"
              />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 py-1 text-xs"
                onClick={() => handleDelete(banner.productId)}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
      {message && <div className="text-green-600 mt-2">{message}</div>}
    </div>
  )
}) 