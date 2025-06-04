"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

  return (
    <section ref={heroRef} className="relative h-[550px] flex items-center justify-center overflow-hidden mt-20">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="디자인 씽크 인테리어"
          fill
          priority
          className="object-cover"
        />
      </motion.div >
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="container mx-auto px-4 relative z-20 text-white text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold my-6"
        >
          당신의 공간에 완벽한 가구
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 mx-auto"
        >
          디자인 씽크는 최고 품질의 씽크대, 냉장고장, 붙박이장, 맞춤가구를 제공합니다.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center items-center text-xl md:text-3xl mb-8 mx-auto"
        >
          <div className="mt-10">
            <p>대구광역시 동구 혁명로463</p>
            <p className="mt-5">010-2677-0170</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
