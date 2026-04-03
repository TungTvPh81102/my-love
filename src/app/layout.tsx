import type React from "react"
import type { Metadata } from "next"
import {Manrope} from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"


const manrope = Manrope({
    subsets: ["latin", "vietnamese"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-manrope",
    display: "swap",
})

export const metadata: Metadata = {
    title: "Hà Nguyễn - Hauyn",
    keywords: ["Hà Nguyễn", "Hauyn"],
    authors: [
        {
            name: "Hà Nguyễn",
            url: "https://yourwebsite.com",
        }
    ],
    creator: "Hà Nguyễn",
    publisher: "Hauyn",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${manrope.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
