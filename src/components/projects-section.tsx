"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Layers, ExternalLink, Github, ArrowRight } from "lucide-react"
import Image from "next/image"
import ScrollReveal from "./scroll-reveal"
import { StaggerContainer, StaggerItem } from "./stagger-container"
import TiltCard from "./tilt-card"

const projects = [
  {
    title: "Spatial Commerce",
    category: "WebXR / E-commerce",
    description:
      "An immersive shopping experience using WebXR and spatial computing. Users can visualize products in their real environment before purchasing.",
    image: "/futuristic-3d-ecommerce-platform-dark-interface.jpg",
    tags: ["Three.js", "WebXR", "React", "Node.js"],
    color: "#00d4ff",
    link: "#",
    github: "#",
  },
  {
    title: "Neural Canvas",
    category: "AI / Creative Tools",
    description:
      "A generative art platform powered by AI. Create unique digital artworks using natural language prompts and real-time style transfer.",
    image: "/ai-generative-art-platform-dark-futuristic.jpg",
    tags: ["Python", "TensorFlow", "Next.js", "WebGL"],
    color: "#7c3aed",
    link: "#",
    github: "#",
  },
  {
    title: "DataFlow Dashboard",
    category: "Analytics / SaaS",
    description:
      "Real-time analytics dashboard processing millions of events. Features beautiful data visualizations and predictive insights.",
    image: "/dark-analytics-dashboard-glowing-charts.jpg",
    tags: ["React", "D3.js", "GraphQL", "AWS"],
    color: "#3b82f6",
    link: "#",
    github: "#",
  },
  {
    title: "Harmony OS",
    category: "Design System",
    description:
      "A comprehensive design system with 100+ components, dark/light modes, and seamless developer experience.",
    image: "/design-system-components-dark-mode-preview.jpg",
    tags: ["TypeScript", "Storybook", "Tailwind", "Figma"],
    color: "#00d4ff",
    link: "#",
    github: "#",
  },
]

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="projects" className="relative py-32 px-6">
      {/* Background */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#7c3aed] rounded-full opacity-5 blur-[150px]"
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00d4ff] rounded-full opacity-5 blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-4">
              <motion.div
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#3b82f6]/20 border border-[#7c3aed]/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Layers className="w-6 h-6 text-[#7c3aed]" />
              </motion.div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Featured Projects</h2>
                <p className="text-muted-foreground">Selected works and case studies</p>
              </div>
            </div>
            <motion.a
              href="#"
              className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              whileHover={{ x: 4 }}
            >
              View All Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.15}>
          {projects.map((project, index) => (
            <StaggerItem key={project.title}>
              <TiltCard glowColor={project.color}>
                <motion.div
                  className="group relative"
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute -inset-2 rounded-3xl blur-xl"
                    style={{ backgroundColor: project.color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === index ? 0.3 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Card */}
                  <div className="relative bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <motion.div
                        animate={{ scale: hoveredProject === index ? 1.1 : 1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                      {/* Category Badge */}
                      <motion.div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                        style={{
                          backgroundColor: `${project.color}20`,
                          color: project.color,
                          border: `1px solid ${project.color}40`,
                        }}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {project.category}
                      </motion.div>

                      {/* Links */}
                      <motion.div
                        className="absolute top-4 right-4 flex gap-2"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{
                          y: hoveredProject === index ? 0 : -10,
                          opacity: hoveredProject === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.a
                          href={project.link}
                          className="w-9 h-9 rounded-lg bg-card/80 backdrop-blur-sm flex items-center justify-center border border-border/50 hover:border-[#00d4ff]/50 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                        <motion.a
                          href={project.github}
                          className="w-9 h-9 rounded-lg bg-card/80 backdrop-blur-sm flex items-center justify-center border border-border/50 hover:border-[#00d4ff]/50 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <motion.span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-md bg-secondary/50 text-muted-foreground"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
