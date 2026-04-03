"use client"

import { useState } from "react"
import Image from "next/image"

export default function ProfileAvatar() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Glow Ring */}
      <div
        className={`absolute -inset-4 rounded-full bg-gradient-to-r from-[#00d4ff] via-[#3b82f6] to-[#7c3aed] transition-all duration-700 ${isHovered ? "opacity-60 blur-xl scale-110" : "opacity-30 blur-lg"}`}
      />

      {/* Animated Ring */}
      <div className="absolute -inset-2 rounded-full">
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00d4ff] via-[#3b82f6] to-[#7c3aed] animate-spin-slow"
          style={{ animationDuration: "8s" }}
        />
        <div className="absolute inset-0.5 rounded-full bg-background" />
      </div>

      {/* Inner Ring */}
      <div
        className={`absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-60"}`}
      />

      {/* Avatar Image */}
      <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden bg-secondary">
        <Image
          src="/professional-portrait-of-a-creative-developer-with.jpg"
          alt="Alex Chen"
          fill
          className={`object-cover transition-all duration-500 ${isHovered ? "scale-110 brightness-110" : "scale-100"}`}
        />

        {/* Holographic Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-[#00d4ff]/20 via-transparent to-[#7c3aed]/20 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Status Indicator */}
      <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-background flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-[#00d4ff] animate-pulse" />
      </div>
    </div>
  )
}
