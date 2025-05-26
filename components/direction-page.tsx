"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Building, Mail, Plus, Minus, Navigation } from "lucide-react"

export default function DirectionsPage() {
  const [zoomLevel, setZoomLevel] = useState(15)

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 20))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 my-6">오시는길</h1>
        </div>

        {/* Map Section */}
        <div className="mb-8">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-[600px] bg-gray-100">

              </div>
            </CardContent>
          </Card>

          {/* Map Action Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" className="bg-gray-500 text-white hover:bg-gray-600">
              <Navigation className="w-4 h-4 mr-2" />
              길찾기
            </Button>
            <Button variant="outline" className="bg-gray-500 text-white hover:bg-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              지도에서 보기
            </Button>
          </div>
        </div>

        {/* Company Information */}
        <div className="flex justify-center w-full text-xl">
          <div className="w-full max-w-3xl mx-auto text-xl">
            <div className="border-b py-6 flex items-start gap-6">
              <MapPin className="w-6 h-6 text-gray-500" />
              <span className="font-medium text-gray-700 w-32 text-left">주소</span>
              <span className="text-gray-600 text-left">대구광역시 동구 혁명로463</span>
            </div>
            <div className="border-b py-6 flex items-start gap-6">
              <Phone className="w-6 h-6 text-gray-500" />
              <span className="font-medium text-gray-700 w-32 text-left">전화번호</span>
              <div className="flex flex-col text-gray-600 items-start">
                <span>010-2677-0170</span>
                <span>053-983-1333</span>
              </div>
            </div>
            <div className="border-b py-6 flex items-start gap-6">
              <Building className="w-6 h-6 text-gray-500" />
              <span className="font-medium text-gray-700 w-32 text-left">사업자정보</span>
              <div className="grid grid-cols-2 text-gray-600">
                <span className="text-left">상호명</span>
                <span className="text-left">디자인씽크</span>
                <span className="text-left">대표자</span>
                <span className="text-left">김지훈</span>
                <span className="text-left">사업자번호</span>
                <span className="text-left">182-55-00898</span>
                <span className="text-left">이메일</span>
                <span className="text-left">a529746@naver.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <Button size="icon" className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 shadow-lg">
            <MapPin className="w-6 h-6" />
          </Button>
        </div>

        {/* TOP Button */}
        <div className="fixed bottom-24 right-8">
          <Button
            variant="outline"
            size="sm"
            className="bg-white shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            TOP
          </Button>
        </div>
      </div>
    </div>
  )
}
