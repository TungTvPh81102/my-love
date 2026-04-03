"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Languages, Cpu, BookOpen, Gamepad2, Music, Globe, Lightbulb } from "lucide-react"
import ScrollReveal from "./scroll-reveal"
import { StaggerContainer, StaggerItem } from "./stagger-container"
import TiltCard from "./tilt-card"

const interests = [
  {
    icon: Languages,
    title: "Languages",
    description: "Fluent in English, Mandarin, and learning Japanese",
    color: "#00d4ff",
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description: "Exploring generative AI and neural networks",
    color: "#7c3aed",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "Always taking courses and reading tech blogs",
    color: "#3b82f6",
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    description: "Building indie games in my spare time",
    color: "#00d4ff",
  },
  {
    icon: Music,
    title: "Music Production",
    description: "Creating electronic beats and soundscapes",
    color: "#7c3aed",
  },
  {
    icon: Globe,
    title: "Travel & Culture",
    description: "Visited 25+ countries and counting",
    color: "#3b82f6",
  },
  {
    icon: Lightbulb,
    title: "Productivity Systems",
    description: "Building tools to optimize workflows",
    color: "#00d4ff",
  },
  {
    icon: Sparkles,
    title: "Creative Coding",
    description: "Generative art and visual experiments",
    color: "#7c3aed",
  },
]

export default function InterestsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-32 px-6">
      {/* Background */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00d4ff] rounded-full opacity-5 blur-[150px]"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-[#7c3aed] rounded-full opacity-5 blur-[120px]"
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#00d4ff]/20 border border-[#7c3aed]/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="w-6 h-6 text-[#7c3aed]" />
            </motion.div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Interests & Passions</h2>
              <p className="text-muted-foreground">What I love beyond code</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Interests Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
          {interests.map((interest, index) => {
            const Icon = interest.icon
            const isHovered = hoveredIndex === index
            return (
              <StaggerItem key={interest.title}>
                <TiltCard glowColor={interest.color}>
                  <motion.div
                    className="group relative h-full"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Glow */}
                    <motion.div
                      className="absolute -inset-1 rounded-2xl blur-lg"
                      style={{ backgroundColor: interest.color }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 0.4 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Card */}
                    <div className="relative bg-card/50 backdrop-blur-xl rounded-2xl p-6 border border-border/50 h-full">
                      {/* Floating Icon */}
                      <motion.div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                        style={{
                          background: `linear-gradient(135deg, ${interest.color}20, transparent)`,
                          border: `1px solid ${interest.color}30`,
                        }}
                        animate={isHovered ? { scale: 1.1, y: -4, rotate: 5 } : { scale: 1, y: 0, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-7 h-7" style={{ color: interest.color }} />
                      </motion.div>

                      <h3 className="text-lg font-semibold text-foreground mb-2">{interest.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{interest.description}</p>

                      {/* Decorative corner */}
                      <motion.div
                        className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl"
                        style={{
                          background: `radial-gradient(circle at top right, ${interest.color}15, transparent 70%)`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </TiltCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
