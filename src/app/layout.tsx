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
    title: "Trương Văn Tùng - TunnyTruong | Developer & Designer",
    description: "Premium personal profile showcasing futuristic design and creative portfolio",
    keywords: ["Trương Văn Tùng", "TunnyTruong", "Developer", "Designer", "Portfolio", "Web Developer"],
    authors: [
        {
            name: "Trương Văn Tùng",
            url: "https://yourwebsite.com",
        }
    ],
    creator: "Trương Văn Tùng",
    publisher: "TunnyTruong",
    metadataBase: new URL("https://yourwebsite.com"),
    openGraph: {
        type: "website",
        locale: "vi_VN",
        url: "https://yourwebsite.com",
        title: "Trương Văn Tùng - TunnyTruong | Developer & Designer",
        description: "Premium personal profile showcasing futuristic design and creative portfolio",
        siteName: "TunnyTruong Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "TunnyTruong Portfolio",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Trương Văn Tùng - TunnyTruong",
        description: "Premium personal profile showcasing futuristic design",
        creator: "@TunnyTruong",
        images: ["/og-image.png"],
    },
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
    },
    icons: {
        icon: "🤣🤣🤣",
        shortcut: "🤣🤣🤣",
        apple: "🤣🤣🤣",
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
