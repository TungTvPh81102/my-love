"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, y])

  return (
    <>
      {/* Outer glow */}
      <motion.div
        className="fixed pointer-events-none z-50 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{
          x,
          y,
          background: "radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)",
        }}
      />
      {/* Inner cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00d4ff]/60 mix-blend-screen"
        style={{ x, y }}
      />
    </>
  )
}
