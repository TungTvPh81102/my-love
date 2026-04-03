"use client"

import type React from "react"

import type { ReactNode } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"

interface TiltCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export default function TiltCard({ children, className = "", glowColor = "#00d4ff" }: TiltCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateXValue = ((y - height / 2) / height) * -20
    const rotateYValue = ((x - width / 2) / width) * 20

    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const background = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${glowColor}15, transparent 80%)`

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
        style={{ background }}
      />
      {children}
    </motion.div>
  )
}
