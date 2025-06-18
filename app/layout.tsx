// import type React from "react"
// import "@/app/globals.css"
// import { ThemeProvider } from "@/components/theme-provider"

// export const metadata = {
//   title: "디자인 씽크 - 맞춤형 씽크대, 냉장고장, 붙박이장, 맞춤가구",
//   description: "디자인 씽크는 최고 품질의 씽크대, 냉장고장, 붙박이장, 맞춤가구를 제공합니다.",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="ko" suppressHydrationWarning>
//       <body>
//         <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }

import type React from "react"
import Script from "next/script"
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
      <head>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}`}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}