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
  const [mainBannerImages, setMainBannerImages] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
    fetch("https://dsink.kr/api/main-page/1")
      .then(res => res.json())
      .then(setMainData)
    // MAIN 카테고리 상품 이미지 fetch
    fetch("https://dsink.kr/api/products?category=MAIN")
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMainBannerImages(data.map((item) => `https://dsink.kr/images/${item.path}`))
        }
      })
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

  // 카테고리별 이미지 (기존 방식)
  const categoryImages = [
    mainData.sinkPath,
    mainData.fridgeCabinetPath,
    mainData.builtInClosetPath,
    mainData.customFurniturePath,
  ]
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
        images={mainBannerImages.length > 0 ? mainBannerImages : undefined}
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
