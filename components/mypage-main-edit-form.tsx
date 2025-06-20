"use client"

export default function MainPageEditForm() {
  return (
    <form className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block font-medium mb-1">타이틀</label>
        <input type="text" className="w-full border rounded px-3 py-2" placeholder="타이틀" />
      </div>
      <div>
        <label className="block font-medium mb-1">설명</label>
        <textarea className="w-full border rounded px-3 py-2" placeholder="설명" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">상호명</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="상호명" />
        </div>
        <div>
          <label className="block font-medium mb-1">대표자명</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="대표자명" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">사업자등록번호</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="사업자등록번호" />
        </div>
        <div>
          <label className="block font-medium mb-1">이메일</label>
          <input type="email" className="w-full border rounded px-3 py-2" placeholder="이메일" />
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">주소</label>
        <input type="text" className="w-full border rounded px-3 py-2" placeholder="주소" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">매장 전화번호</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="매장 전화번호" />
        </div>
        <div>
          <label className="block font-medium mb-1">휴대폰 번호</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="휴대폰 번호" />
        </div>
      </div>
      <button type="submit" className="w-full bg-primary text-white py-2 rounded mt-4">저장</button>
    </form>
  )
} 