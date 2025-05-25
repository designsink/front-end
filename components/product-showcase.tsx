"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  title: string
  price: string
  image: string
}

interface ProductShowcaseProps {
  products: Product[]
}

export function ProductShowcase({ products }: ProductShowcaseProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">인기 제품</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            고객들에게 가장 사랑받는 디자인 씽크의 인기 제품을 만나보세요.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              className="bg-white rounded-lg overflow-hidden shadow-lg group"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-primary font-bold text-lg mb-4">{product.price}</p>
                <Button className="w-full">자세히 보기</Button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            모든 제품 보기
          </Button>
        </div>
      </div>
    </section>
  )
}
