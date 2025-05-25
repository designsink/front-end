"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function GallerySection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">시공 갤러리</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">디자인 씽크의 다양한 시공 사례를 확인해보세요.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            >
              <Image
                src={`/placeholder.svg?height=300&width=300&text=Gallery${index + 1}`}
                alt={`갤러리 이미지 ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                <span className="text-white font-medium">자세히 보기</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            더 많은 갤러리 보기
          </Button>
        </div>
      </div>
    </section>
  )
}
