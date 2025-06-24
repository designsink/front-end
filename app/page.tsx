"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { FeatureSection } from "@/components/feature-section"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { categories as defaultCategories } from "@/data/site-data"
import DirectionsPage from "@/components/direction-page"
import { redirect } from "next/navigation"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [mainData, setMainData] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    fetch("https://dsink.kr/api/main-page/1")
      .then(res => res.json())
      .then(setMainData)
  }, [])

  useEffect(() => {
    if (mounted && window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [mounted])

  if (!mounted || !mainData) return null

  // mainData에서 이미지 경로 추출
  const categoryImages = [
    mainData.sinkPath,
    mainData.fridgeCabinetPath,
    mainData.builtInClosetPath,
    mainData.customFurniturePath,
  ]

  // HeroSection용 이미지 배열 (null/빈 값 제거, 도메인 붙이기)
  const heroImages = categoryImages
    .filter(Boolean)
    .map(img => `https://dsink.kr/images/${img}`)
  const heroImagesProp = heroImages.length > 0 ? heroImages : undefined

  // 이미지 경로가 있으면 도메인 붙이기, 없으면 placeholder
  const categoriesWithApiImages = defaultCategories.map((cat, idx) => ({
    ...cat,
    image: categoryImages[idx]
      ? `https://dsink.kr/images/${categoryImages[idx]}`
      : "/placeholder.svg",
  }))

  return (
    <div className="relative overflow-hidden">
      <Header />
      <HeroSection
        title={mainData.title}
        description={mainData.description}
        address={mainData.address}
        phone={mainData.phone}
        images={heroImagesProp}
      />
      <CategorySection categories={categoriesWithApiImages} />
      <div id="directions">
        <DirectionsPage
          address={mainData.address}
          storePhone={mainData.storePhone}
          phone={mainData.phone}
          ceoName={mainData.ceoName}
          businessNumber={mainData.businessNumber}
          email={mainData.email}
          storeName={mainData.storeName}
        />
      </div>
      {/* <FeatureSection /> */}
      {/* <ContactForm /> */}
      <Footer />
    </div>
  )
}
