"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", scrolled ? "py-4" : "py-6")}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className={cn(
            "flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500",
            scrolled
              ? "bg-card/80 backdrop-blur-xl border border-border/50 shadow-[0_0_30px_rgba(0,0,0,0.3)]"
              : "bg-transparent",
          )}
          layout
        >
          <motion.a
            href="#home"
            className="text-xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AC
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
                  activeSection === item.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence>
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      className="absolute inset-0 bg-secondary/50 rounded-lg"
                      layoutId="activeNav"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative">{item.label}</span>
              </motion.a>
            ))}
          </div>

          <motion.a
            href="#contact"
            className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] text-background rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me
          </motion.a>
        </motion.div>
      </div>
    </motion.nav>
  )
}
