"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface Category {
  id: number
  title: string
  description: string
  image: string
}

interface CategorySectionProps {
  categories: Category[]
}

const categoryMap: { [key: string]: string } = {
  "전체": "",
  "씽크대": "SINK",
  "냉장고장": "FRIDGE_CABINET",
  "붙박이장": "BUILT_IN_CLOSET",
  "맞춤가구": "CUSTOM_FURNITURE",
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-4">제품 카테고리</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${categoryMap[category.title] ?? ""}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg group cursor-pointer"
              >
                <div className="relative h-36 md:h-60 overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-3 md:p-6">
                  <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">{category.title}</h3>
                  <p className="text-xs md:text-base text-gray-600 mb-2 md:mb-4">{category.description}</p>
                  <span className="text-primary font-medium flex items-center text-sm md:text-base">
                    자세히 보기 <ChevronRight size={16} className="ml-1" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
