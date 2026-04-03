"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code2, Palette, Wrench, Brain } from "lucide-react"
import ScrollReveal from "./scroll-reveal"

const skillCategories = [
  {
    title: "Technical",
    icon: Code2,
    color: "#00d4ff",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Three.js / WebGL", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "Python", level: 78 },
      { name: "GraphQL", level: 82 },
    ],
  },
  {
    title: "Design",
    icon: Palette,
    color: "#7c3aed",
    skills: [
      { name: "UI/UX Design", level: 90 },
      { name: "Figma", level: 92 },
      { name: "Motion Design", level: 85 },
      { name: "3D Modeling", level: 75 },
      { name: "Brand Identity", level: 80 },
      { name: "Design Systems", level: 88 },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    color: "#3b82f6",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "Docker", level: 80 },
      { name: "AWS / Vercel", level: 85 },
      { name: "CI/CD", level: 82 },
      { name: "Testing", level: 78 },
      { name: "Agile / Scrum", level: 88 },
    ],
  },
  {
    title: "Soft Skills",
    icon: Brain,
    color: "#00d4ff",
    skills: [
      { name: "Communication", level: 92 },
      { name: "Problem Solving", level: 95 },
      { name: "Leadership", level: 85 },
      { name: "Mentoring", level: 88 },
      { name: "Time Management", level: 82 },
      { name: "Adaptability", level: 90 },
    ],
  },
]

function SkillBar({ skill, color, delay }: { skill: { name: string; level: number }; color: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
    >
      <motion.div
        className="absolute -inset-0.5 rounded-xl blur transition-opacity duration-300 opacity-0 group-hover:opacity-40"
        style={{ backgroundColor: color }}
      />
      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-foreground">{skill.name}</span>
          <motion.span
            className="text-sm font-mono"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: delay + 0.3 }}
          >
            {skill.level}%
          </motion.span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1, delay: delay + 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function SkillsFullSection() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="skills" className="relative py-32 px-6">
      {/* Background */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#3b82f6] rounded-full opacity-5 blur-[150px]"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#7c3aed] rounded-full opacity-5 blur-[120px]"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#7c3aed]/20 border border-[#3b82f6]/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Code2 className="w-6 h-6 text-[#3b82f6]" />
            </motion.div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Skills & Expertise</h2>
              <p className="text-muted-foreground">Technologies and tools I work with</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-12">
            {skillCategories.map((category, index) => {
              const Icon = category.icon
              const isActive = activeCategory === index
              return (
                <motion.button
                  key={category.title}
                  onClick={() => setActiveCategory(index)}
                  className={`group relative flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-secondary/80 border-transparent"
                      : "bg-card/30 border-border/50 hover:bg-secondary/50"
                  } border`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-20 blur-sm"
                      style={{ backgroundColor: category.color }}
                      layoutId="activeTab"
                    />
                  )}
                  <Icon
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color: isActive ? category.color : undefined }}
                  />
                  <span className={`relative font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {category.title}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              color={skillCategories[activeCategory].color}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
