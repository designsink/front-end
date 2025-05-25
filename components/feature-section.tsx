"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function FeatureSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-28">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">왜 디자인 씽크인가요?</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">맞춤 디자인</h3>
                  <p className="text-gray-600">고객의 공간과 요구에 맞는 완벽한 맞춤형 디자인을 제공합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">최고급 소재</h3>
                  <p className="text-gray-600">내구성과 아름다움을 갖춘 최고급 소재만을 사용합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">전문 시공</h3>
                  <p className="text-gray-600">숙련된 전문가들이 완벽한 시공을 보장합니다.</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="디자인 씽크 인테리어"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
