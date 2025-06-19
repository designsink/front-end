"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

interface HeroSectionProps {
  title: string
  description: string
  address?: string
  phone?: string
  images?: string[]
}

export function HeroSection({ title, description, address, phone, images }: HeroSectionProps) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

  const validImages = (images || []).filter(Boolean)
  const displayImages = validImages.length > 0 ? validImages : ["/placeholder.svg?height=1080&width=1920"]

  return (
    <section ref={heroRef} className="relative h-[550px] flex items-center justify-center overflow-hidden mt-20">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <Carousel className="h-full w-full" interval={4000} opts={{ loop: true }}>
          <CarouselContent>
            {displayImages.map((img, idx) => (
              <CarouselItem key={idx} className="relative h-[550px] w-full min-w-full">
                <Image
                  src={img}
                  alt={`배너 이미지 ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="container mx-auto px-4 relative z-20 text-white text-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold my-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 mx-auto"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center items-center text-xl md:text-3xl mb-8 mx-auto"
        >
          <div className="mt-10">
            {address && <p>{address}</p>}
            {phone && <p className="mt-5">{phone}</p>}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
