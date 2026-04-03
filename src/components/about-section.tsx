"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Heart, Zap, Target, Coffee, Rocket } from "lucide-react"
import ScrollReveal from "./scroll-reveal"
import { StaggerContainer, StaggerItem } from "./stagger-container"
import TiltCard from "./tilt-card"

const highlights = [
  { icon: Rocket, label: "8+ Years Experience", color: "#00d4ff" },
  { icon: Target, label: "50+ Projects Delivered", color: "#3b82f6" },
  { icon: Heart, label: "Passion for Innovation", color: "#7c3aed" },
  { icon: Coffee, label: "Fueled by Curiosity", color: "#00d4ff" },
]

const traits = [
  { label: "Creative Thinker", description: "Approaching problems with innovative solutions" },
  { label: "Detail Oriented", description: "Crafting pixel-perfect experiences" },
  { label: "Team Player", description: "Collaborating across disciplines" },
  { label: "Lifelong Learner", description: "Always exploring new technologies" },
]

export default function AboutSection() {
  const [hoveredTrait, setHoveredTrait] = useState<number | null>(null)

  return (
    <section id="about" className="relative py-32 px-6">
      {/* Background Elements with parallax effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#00d4ff] rounded-full opacity-5 blur-[150px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#7c3aed] rounded-full opacity-5 blur-[120px]"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#3b82f6]/20 border border-[#00d4ff]/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <User className="w-6 h-6 text-[#00d4ff]" />
            </motion.div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">About Me</h2>
              <p className="text-muted-foreground">My journey, story, and what drives me</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Story */}
          <div className="space-y-8">
            <ScrollReveal direction="left" delay={0.1}>
              <TiltCard glowColor="#00d4ff">
                <div className="relative bg-card/50 backdrop-blur-xl rounded-2xl p-8 border border-border/50">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#00d4ff]" />
                    My Story
                  </h3>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p className="text-pretty">
                      My journey into the digital realm began when I first discovered the magic of turning code into
                      living, breathing experiences. What started as curiosity quickly evolved into an obsession with
                      creating interfaces that feel almost alive.
                    </p>
                    <p className="text-pretty">
                      Over the years, I've had the privilege of working with startups, agencies, and Fortune 500
                      companies, helping them translate complex ideas into elegant digital solutions. Each project has
                      been a new adventure in pushing the boundaries of what's possible.
                    </p>
                    <p className="text-pretty">
                      Today, I specialize in crafting immersive experiences that blend cutting-edge technology with
                      thoughtful design. Whether it's spatial computing, generative AI, or traditional web development,
                      I approach each challenge with the same philosophy: technology should feel like magic.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Highlights Grid */}
            <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
              {highlights.map((item, index) => {
                const Icon = item.icon
                return (
                  <StaggerItem key={index}>
                    <motion.div
                      className="group relative bg-card/30 backdrop-blur-sm rounded-xl p-5 border border-border/30 transition-all duration-300"
                      whileHover={{ y: -5, borderColor: `${item.color}50` }}
                    >
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at center, ${item.color}10 0%, transparent 70%)`,
                        }}
                      />
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Icon className="w-8 h-8 mb-3 transition-colors duration-300" style={{ color: item.color }} />
                      </motion.div>
                      <span className="relative text-sm font-medium text-foreground">{item.label}</span>
                    </motion.div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>

          {/* Personality Traits */}
          <div className="space-y-6">
            <ScrollReveal direction="right" delay={0.2}>
              <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">What Defines Me</h3>
            </ScrollReveal>

            <StaggerContainer className="space-y-4" staggerDelay={0.15}>
              {traits.map((trait, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="group relative"
                    onMouseEnter={() => setHoveredTrait(index)}
                    onMouseLeave={() => setHoveredTrait(null)}
                    whileHover={{ x: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="absolute -inset-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-xl blur"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredTrait === index ? 0.3 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative bg-card/50 backdrop-blur-xl rounded-xl p-6 border border-border/50">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#3b82f6]"
                          animate={{ scale: hoveredTrait === index ? 1.5 : 1 }}
                        />
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-1">{trait.label}</h4>
                          <p className="text-muted-foreground text-sm">{trait.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Quote */}
            <ScrollReveal direction="up" delay={0.4}>
              <motion.div
                className="relative mt-8 p-6 rounded-xl bg-gradient-to-br from-[#00d4ff]/10 to-[#7c3aed]/10 border border-[#00d4ff]/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute -top-3 left-6 text-5xl text-[#00d4ff]/30 font-serif">"</div>
                <p className="text-foreground italic text-lg leading-relaxed pl-4">
                  The best technology disappears, leaving only the magic behind.
                </p>
                <p className="text-muted-foreground text-sm mt-3 pl-4">— My Design Philosophy</p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
