"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Calendar, MapPin, ArrowUpRight } from "lucide-react"
import ScrollReveal from "./scroll-reveal"

const experiences = [
  {
    company: "Nexus Technologies",
    role: "Senior Creative Developer",
    period: "2022 - Present",
    location: "San Francisco, CA",
    description:
      "Leading the development of immersive web experiences and spatial computing applications. Building next-generation interfaces that push the boundaries of what's possible on the web.",
    achievements: [
      "Led a team of 5 developers on a $2M product launch",
      "Reduced page load times by 60% through optimization",
      "Implemented AI-powered features serving 1M+ users",
    ],
    color: "#00d4ff",
  },
  {
    company: "Digital Frontier Agency",
    role: "Full Stack Developer",
    period: "2019 - 2022",
    location: "New York, NY",
    description:
      "Developed high-performance web applications for Fortune 500 clients. Specialized in creating interactive experiences and data visualizations.",
    achievements: [
      "Delivered 30+ projects across various industries",
      "Built real-time dashboards processing 10M+ events/day",
      "Mentored junior developers and established best practices",
    ],
    color: "#7c3aed",
  },
  {
    company: "Innovate Labs",
    role: "Frontend Developer",
    period: "2017 - 2019",
    location: "Austin, TX",
    description:
      "Created pixel-perfect interfaces and interactive prototypes. Collaborated with designers to bring creative visions to life.",
    achievements: [
      "Developed component library used across 15+ projects",
      "Won 'Best in Show' at company hackathon",
      "Improved accessibility scores from 65 to 98",
    ],
    color: "#3b82f6",
  },
  {
    company: "StartUp Studio",
    role: "Junior Developer",
    period: "2015 - 2017",
    location: "Los Angeles, CA",
    description:
      "Started my professional journey building MVPs and learning the fundamentals of modern web development.",
    achievements: [
      "Contributed to 10+ startup product launches",
      "Learned React, Node.js, and cloud technologies",
      "Built my first production Three.js application",
    ],
    color: "#00d4ff",
  },
]

function TimelineItem({
  exp,
  index,
  isActive,
  onClick,
}: {
  exp: (typeof experiences)[0]
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 4 }}
      className={`relative w-full text-left pl-10 pr-4 py-4 rounded-xl transition-all duration-300 ${
        isActive ? "bg-secondary/50" : "hover:bg-secondary/30"
      }`}
    >
      {/* Timeline Dot */}
      <motion.div
        className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2"
        style={{
          borderColor: exp.color,
          backgroundColor: isActive ? exp.color : "transparent",
        }}
        animate={{
          scale: isActive ? 1.25 : 1,
          boxShadow: isActive ? `0 0 20px ${exp.color}` : "none",
        }}
        transition={{ type: "spring", stiffness: 300 }}
      />

      <div className="font-medium text-foreground">{exp.company}</div>
      <div className="text-sm text-muted-foreground">{exp.period}</div>
    </motion.button>
  )
}

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="experience" className="relative py-32 px-6">
      {/* Background */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#3b82f6] rounded-full opacity-5 blur-[150px]"
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#00d4ff] rounded-full opacity-5 blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#3b82f6]/20 border border-[#00d4ff]/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Briefcase className="w-6 h-6 text-[#00d4ff]" />
            </motion.div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Work Experience</h2>
              <p className="text-muted-foreground">My professional journey</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Timeline Navigation */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="relative">
              {/* Vertical Line */}
              <motion.div
                className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff] via-[#7c3aed] to-[#3b82f6] opacity-30"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ originY: 0 }}
              />

              <div className="space-y-2">
                {experiences.map((exp, index) => (
                  <TimelineItem
                    key={exp.company}
                    exp={exp}
                    index={index}
                    isActive={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Experience Detail */}
          <ScrollReveal direction="right" delay={0.2}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-1 rounded-2xl blur-lg opacity-20"
                style={{ backgroundColor: experiences[activeIndex].color }}
                animate={{ opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
              <div className="relative bg-card/50 backdrop-blur-xl rounded-2xl p-8 border border-border/50">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{experiences[activeIndex].role}</h3>
                    <motion.div
                      className="flex items-center gap-2 text-lg"
                      style={{ color: experiences[activeIndex].color }}
                      whileHover={{ x: 4 }}
                    >
                      {experiences[activeIndex].company}
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {experiences[activeIndex].period}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {experiences[activeIndex].location}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
                  {experiences[activeIndex].description}
                </p>

                {/* Achievements */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Key Achievements
                  </h4>
                  <ul className="space-y-3">
                    {experiences[activeIndex].achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: experiences[activeIndex].color }}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                        />
                        <span className="text-foreground">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
