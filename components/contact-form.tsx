"use client"

import { Button } from "@/components/ui/button"

export function ContactForm() {
  return (
    <section className="py-20 bg-stone-100 text-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">무료 상담 신청</h2>
          <p className="max-w-2xl mx-auto opacity-90">
            디자인 씽크의 전문가가 고객님의 공간에 맞는 최적의 솔루션을 제안해 드립니다.
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="이름"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-stone-700/20 text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="연락처"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-stone-700/20 text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div>
              <textarea
                placeholder="문의 내용"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-stone-700/20 text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              ></textarea>
            </div>
            <div>
              <Button size="lg" className="w-full bg-white text-primary hover:bg-stone-700/10">
                상담 신청하기
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
