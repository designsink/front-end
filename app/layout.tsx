import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "디자인 씽크 - 맞춤형 씽크대, 냉장고장, 붙박이장, 맞춤가구",
  description: "디자인 씽크는 최고 품질의 씽크대, 냉장고장, 붙박이장, 맞춤가구를 제공합니다.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
