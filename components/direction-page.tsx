// "use client"
//
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { MapPin, Phone, Building, Mail, Plus, Minus, Navigation } from "lucide-react"
//
// export default function DirectionsPage() {
//   const [zoomLevel, setZoomLevel] = useState(15)
//
//   const handleZoomIn = () => {
//     setZoomLevel((prev) => Math.min(prev + 1, 20))
//   }
//
//   const handleZoomOut = () => {
//     setZoomLevel((prev) => Math.max(prev - 1, 1))
//   }
//
//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
//         {/* Page Title */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 my-6">오시는길</h1>
//         </div>
//
//         {/* Map Section */}
//         <div className="mb-8">
//             <Card className="overflow-hidden">
//               <CardContent className="p-0">
//               <div className="relative h-[600px] bg-gray-100">
//               </div>
//             </CardContent>
//           </Card>
//
//           {/* Map Action Buttons */}
//           <div className="flex justify-end space-x-2 mt-4">
//             <Button variant="outline" className="bg-gray-500 text-white hover:bg-gray-600">
//               <Navigation className="w-4 h-4 mr-2" />
//               길찾기
//             </Button>
//             <Button variant="outline" className="bg-gray-500 text-white hover:bg-gray-600">
//               <MapPin className="w-4 h-4 mr-2" />
//               지도에서 보기
//             </Button>
//           </div>
//         </div>
//
//         {/* Company Information */}
//         <div className="flex justify-center w-full text-xl">
//           <div className="w-full max-w-3xl mx-auto text-xl">
//             <div className="border-b py-6 flex items-start gap-6">
//               <MapPin className="w-6 h-6 text-gray-500" />
//               <span className="font-medium text-gray-700 w-32 text-left">주소</span>
//               <span className="text-gray-600 text-left">대구광역시 동구 혁명로463</span>
//             </div>
//             <div className="border-b py-6 flex items-start gap-6">
//               <Phone className="w-6 h-6 text-gray-500" />
//               <span className="font-medium text-gray-700 w-32 text-left">전화번호</span>
//               <div className="flex flex-col text-gray-600 items-start">
//                 <span>010-2677-0170</span>
//                 <span>053-983-1333</span>
//               </div>
//             </div>
//             <div className="border-b py-6 flex items-start gap-6">
//               <Building className="w-6 h-6 text-gray-500" />
//               <span className="font-medium text-gray-700 w-32 text-left">사업자정보</span>
//               <div className="grid grid-cols-2 text-gray-600">
//                 <span className="text-left">상호명</span>
//                 <span className="text-left">디자인씽크</span>
//                 <span className="text-left">대표자</span>
//                 <span className="text-left">김지훈</span>
//                 <span className="text-left">사업자번호</span>
//                 <span className="text-left">182-55-00898</span>
//                 <span className="text-left">이메일</span>
//                 <span className="text-left">a529746@naver.com</span>
//               </div>
//             </div>
//           </div>
//         </div>
//
//         {/* Floating Action Button */}
//         {/* <div className="fixed bottom-8 right-8">
//           <Button size="icon" className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 shadow-lg">
//             <MapPin className="w-6 h-6" />
//           </Button>
//         </div> */}
//
//         {/* TOP Button */}
//         {/* <div className="fixed bottom-24 right-8">
//           <Button
//             variant="outline"
//             size="sm"
//             className="bg-white shadow-lg"
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           >
//             TOP
//           </Button>
//         </div> */}
//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Building, Mail, Plus, Minus, Navigation } from "lucide-react"

export default function DirectionsPage() {
  const [zoomLevel, setZoomLevel] = useState(15)
  const mapRef = useRef<HTMLDivElement>(null)
  const kakaoMapRef = useRef<any>(null)

  // 카카오맵 초기화
  useEffect(() => {
    const initializeMap = () => {
      const kakao = (window as any).kakao;
      if (kakao && kakao.maps && mapRef.current) {
        kakao.maps.load(() => {
          const container = mapRef.current;
          if (!container) return; // 추가 안전장치

          const options = {
            center: new kakao.maps.LatLng(35.8714, 128.6014), // 대구 동구 좌표
            level: zoomLevel
          }

          const map = new kakao.maps.Map(container, options)
          kakaoMapRef.current = map

          // 마커 추가
          const markerPosition = new kakao.maps.LatLng(35.8714, 128.6014)
          const marker = new kakao.maps.Marker({
            position: markerPosition
          })
          marker.setMap(map)

          // 인포윈도우 추가
          const infoWindow = new kakao.maps.InfoWindow({
            content: '<div style="padding:10px;font-size:14px;">디자인씽크<br/>대구광역시 동구 화랑로 463</div>'
          })
          infoWindow.open(map, marker)
        })
      }
    }

    // SDK 로드 확인
    const checkKakao = setInterval(() => {
      if ((window as any).kakao && (window as any).kakao.maps) {
        initializeMap()
        clearInterval(checkKakao)
      }
    }, 100)

    return () => clearInterval(checkKakao)
  }, [zoomLevel])

  const handleZoomIn = () => {
    setZoomLevel((prev) => {
      const newLevel = Math.max(prev - 1, 1) // 카카오맵은 숫자가 작을수록 확대
      if (kakaoMapRef.current) {
        kakaoMapRef.current.setLevel(newLevel)
      }
      return newLevel
    })
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const newLevel = Math.min(prev + 1, 14) // 카카오맵은 숫자가 클수록 축소
      if (kakaoMapRef.current) {
        kakaoMapRef.current.setLevel(newLevel)
      }
      return newLevel
    })
  }

  const handleGetDirections = () => {
    // 카카오맵 길찾기 URL로 이동
    const url = `https://map.kakao.com/link/to/디자인씽크,35.8758147,128.6747199`
    window.open(url, '_blank')
  }

  //35.8758147!4d
  const handleViewInMap = () => {
    // 카카오맵에서 보기
    const url = `https://map.kakao.com/link/map/디자인씽크,35.8758147,128.6747199`
    window.open(url, '_blank')
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
                  {/* 카카오맵 컨테이너 */}
                  <div ref={mapRef} className="w-full h-full"></div>

                  {/* 줌 컨트롤 버튼 */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="bg-white shadow-md"
                        onClick={handleZoomIn}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="bg-white shadow-md"
                        onClick={handleZoomOut}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Action Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                  variant="outline"
                  className="bg-gray-500 text-white hover:bg-gray-600"
                  onClick={handleGetDirections}
              >
                <Navigation className="w-4 h-4 mr-2" />
                길찾기
              </Button>
              <Button
                  variant="outline"
                  className="bg-gray-500 text-white hover:bg-gray-600"
                  onClick={handleViewInMap}
              >
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
                <span className="text-gray-600 text-left">대구광역시 동구 화랑로 463</span>
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
        </div>
      </div>
  )
}