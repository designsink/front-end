"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Building, Mail, Plus, Minus, Navigation } from "lucide-react"
import { NaverMap } from "./naver-map"

interface DirectionsPageProps {
  address?: string
  storePhone?: string
  phone?: string
  ceoName?: string
  businessNumber?: string
  email?: string
  storeName?: string
}

export default function DirectionsPage({
  address = "대구광역시 동구 혁명로463",
  storePhone = "053-983-1333",
  phone = "010-2677-0170",
  ceoName = "김지훈",
  businessNumber = "182-55-00898",
  email = "a529746@naver.com",
  storeName = "디자인씽크",
}: DirectionsPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 my-4 md:my-6">오시는길</h1>
        </div>

        {/* Map Section (네이버 지도 삽입) */}
        <div className="mb-8">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-[600px] bg-gray-100 flex items-center justify-center">
                <NaverMap markerData={{
                  dom_id: "dsink",
                  title: storeName,
                  lat: 35.8758170,
                  lng: 128.6746445,
                }} />
              </div>
            </CardContent>
          </Card>
          {/* 네이버 지도 액션 버튼 */}
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              className="border-gray-400 text-gray-800 hover:bg-gray-300"
              onClick={() => window.open(`https://map.naver.com/p/directions/-/14323996.7609055,4283547.6839002,%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%B1%ED%81%AC,1127603798,PLACE_POI/-/car?c=13.00,0,0,0,dh`, '_blank')}
            >
              <Navigation className="w-4 h-4 mr-2" />
              길찾기
            </Button>
            <Button
              variant="outline"
              className="border-gray-400 text-gray-800 hover:bg-gray-300"
              onClick={() => window.open(`https://map.naver.com/v5/search/%EB%8C%80%EA%B5%AC%20%ED%99%94%EB%9E%91%EB%A1%9C%20463%20%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%B1%ED%81%AC`, '_blank')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              지도에서 보기
            </Button>
          </div>
        </div>

        {/* Company Information */}
        <div className="flex justify-center w-full text-base md:text-xl">
          <div className="w-full max-w-3xl mx-auto text-base md:text-xl">
            <div className="border-b py-3 md:py-6 flex items-start gap-2 md:gap-6">
              <MapPin className="w-6 h-6 text-gray-500" />
              <span className="font-medium text-gray-700 w-24 md:w-32 text-left">주소</span>
              <span className="text-gray-600 text-left">{address}</span>
            </div>
            <div className="border-b py-3 md:py-6 flex items-start gap-2 md:gap-6">
              <Phone className="w-6 h-6 text-gray-500" />
              <span className="font-medium text-gray-700 w-24 md:w-32 text-left">전화번호</span>
              <div className="flex flex-col text-gray-600 items-start">
                <span>{phone}</span>
                <span>{storePhone}</span>
              </div>
            </div>
            <div className="border-b py-3 md:py-6 flex items-start gap-2 md:gap-6">
              <Building className="w-6 h-6 text-gray-500" />
              <span className="font-medium text-gray-700 w-24 md:w-32 text-left">사업자정보</span>
              <div className="grid grid-cols-2 text-gray-600 break-all">
                <span className="text-left">상호명</span>
                <span className="text-left">{storeName}</span>
                <span className="text-left">대표자</span>
                <span className="text-left">{ceoName}</span>
                <span className="text-left">사업자번호</span>
                <span className="text-left">{businessNumber}</span>
                <span className="text-left">이메일</span>
                <span className="text-left">{email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}