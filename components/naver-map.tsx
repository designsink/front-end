"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import { useRouter } from "next/navigation"

declare global {
  interface Window {
    naver: any
  }
}

interface MarkerData {
  dom_id: string
  title: string
  lat: number
  lng: number
}

interface NaverMapProps {
  markerData?: MarkerData
}

export function NaverMap({ markerData }: NaverMapProps) {
  const mapEl = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const markerRef = useRef<any>(null)
  const router = useRouter()

  // 1) 지도 초기화
  const initializeMap = () => {
    if (!window.naver || !mapEl.current) return
    let options: any
    if (markerData) {
      options = {
        center: new window.naver.maps.LatLng(markerData.lat, markerData.lng),
        zoom: 20,
      }
    } else {
      options = {
        center: new window.naver.maps.LatLng(35.8758170, 128.6746445), // 기본값
        zoom: 20,
      }
    }
    setMap(new window.naver.maps.Map(mapEl.current, options))
  }

  // 2) map 준비되면, 단일 마커 생성 & 클릭 시 router.push
  useEffect(() => {
    if (!map || !markerData) return

    // 이전 마커 제거
    if (markerRef.current) {
      markerRef.current.setMap(null)
    }

    const { dom_id: id, title, lat, lng } = markerData
    const position = new window.naver.maps.LatLng(lat, lng)

    const marker = new window.naver.maps.Marker({
      position,
      map,
      title,
      clickable: true,
    })
    markerRef.current = marker

    window.naver.maps.Event.addListener(marker, "click", () => {
      router.push(`/ground/${id}`)
    })
  }, [map, markerData, router])

  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_KEY}&submodules=geocoder`}
        onLoad={initializeMap}
        strategy="afterInteractive"
      />
      <div ref={mapEl} style={{ width: "100%", height: "600px" }} />
    </>
  )
} 