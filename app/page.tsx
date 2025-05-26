"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { FeatureSection } from "@/components/feature-section"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { categories } from "@/data/site-data"
import DirectionsPage from "@/components/direction-page"
import { redirect } from "next/navigation"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="relative overflow-hidden">
      <Header />
      <HeroSection />
      <CategorySection categories={categories} />
      <div id="directions">
        <DirectionsPage />
      </div>
      {/* <FeatureSection /> */}
      {/* <ContactForm /> */}
      <Footer />
    </div>
  )
}
