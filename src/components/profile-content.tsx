"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ProfileAvatar from "./profile-avatar"
import SocialLinks from "./social-links"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowDown } from "lucide-react"

export default function ProfileContent() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full mx-auto text-center">
        <div className="flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <ProfileAvatar />
          </motion.div>

          {/* Name & Title */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]"></span>
              </span>
              <span className="text-sm text-muted-foreground font-medium">Available for work</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-balance"
            >
              <span className="bg-gradient-to-r from-foreground via-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent animate-gradient">
                TUNNY TRUONG
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl lg:text-2xl text-muted-foreground font-light"
            >
              Creative Developer & Designer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-2xl text-muted-foreground leading-relaxed text-pretty"
            >
              I craft immersive digital experiences at the intersection of design and technology. Specializing in
              spatial computing, generative AI, and the future of human-computer interaction.
            </motion.p>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <SocialLinks />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] hover:from-[#00d4ff]/90 hover:to-[#3b82f6]/90 text-background font-semibold px-8 py-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,212,255,0.4)]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              asChild
            >
              <a href="#contact">
                <span className="relative z-10 flex items-center gap-2">
                  Let's Connect
                  <ArrowRight className={`w-5 h-5 transition-transform ${isHovered ? "translate-x-1" : ""}`} />
                </span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border/50 bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 hover:border-[#00d4ff]/50 text-foreground px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]"
              asChild
            >
              <a href="#projects">
                <span className="flex items-center gap-2">
                  View Portfolio
                  <ArrowDown className="w-5 h-5" />
                </span>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
