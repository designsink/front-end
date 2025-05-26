"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { FeatureSection } from "@/components/feature-section"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { categories } from "@/data/site-data"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative overflow-hidden">
      <Header />
      <HeroSection />
      <CategorySection categories={categories} />
      <FeatureSection />
      {/* <ContactForm /> */}
      <Footer />
    </div>
  )
}
