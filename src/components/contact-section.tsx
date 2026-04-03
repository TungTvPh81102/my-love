"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Send, ArrowUpRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScrollReveal from "./scroll-reveal"
import TiltCard from "./tilt-card"

const contactLinks = [
  { label: "alex@example.com", href: "mailto:alex@example.com", icon: Mail },
  { label: "San Francisco, CA", href: "#", icon: MapPin },
]

export default function ContactSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [formHovered, setFormHovered] = useState(false)

  return (
    <section id="contact" className="relative py-32 px-6">
      {/* Background */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#00d4ff]/10 via-[#3b82f6]/5 to-transparent rounded-full blur-[100px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="w-4 h-4 text-[#00d4ff]" />
              </motion.div>
              <span className="text-sm text-muted-foreground">Available for new projects</span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Let's Create Something{" "}
              <span className="bg-gradient-to-r from-[#00d4ff] via-[#3b82f6] to-[#7c3aed] bg-clip-text text-transparent">
                Amazing
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Have a project in mind or just want to chat? I'd love to hear from you. Let's discuss how we can work
              together to bring your vision to life.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Card */}
        <ScrollReveal delay={0.2}>
          <TiltCard glowColor="#00d4ff">
            <motion.div
              className="relative"
              onMouseEnter={() => setFormHovered(true)}
              onMouseLeave={() => setFormHovered(false)}
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-[#00d4ff] via-[#3b82f6] to-[#7c3aed] rounded-3xl blur-lg"
                animate={{ opacity: formHovered ? 0.3 : 0.15 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-border/50">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Contact Info */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">Get in Touch</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your
                        vision.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {contactLinks.map((link, index) => {
                        const Icon = link.icon
                        return (
                          <motion.a
                            key={link.label}
                            href={link.href}
                            className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border/30 transition-all duration-300 hover:bg-secondary/50 hover:border-[#00d4ff]/30"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: -4 }}
                          >
                            <motion.div
                              className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d4ff]/20 to-[#3b82f6]/20 flex items-center justify-center"
                              whileHover={{ rotate: 10, scale: 1.1 }}
                            >
                              <Icon className="w-5 h-5 text-[#00d4ff]" />
                            </motion.div>
                            <span className="text-foreground font-medium">{link.label}</span>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.a>
                        )
                      })}
                    </div>
                  </div>

                  {/* Quick Form */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-foreground">Quick Message</h3>
                    <form className="space-y-4">
                      <motion.input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/20 transition-all duration-300"
                        whileFocus={{ scale: 1.01 }}
                      />
                      <motion.input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/20 transition-all duration-300"
                        whileFocus={{ scale: 1.01 }}
                      />
                      <motion.textarea
                        placeholder="Your Message"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/20 transition-all duration-300 resize-none"
                        whileFocus={{ scale: 1.01 }}
                      />
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          className="w-full group bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] hover:from-[#00d4ff]/90 hover:to-[#3b82f6]/90 text-background font-semibold py-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.4)]"
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <span className="flex items-center gap-2">
                            Send Message
                            <motion.div animate={{ x: isHovered ? 4 : 0, y: isHovered ? -4 : 0 }}>
                              <Send className="w-4 h-4" />
                            </motion.div>
                          </span>
                        </Button>
                      </motion.div>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal delay={0.3}>
          <motion.div
            className="text-center mt-16 pt-8 border-t border-border/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-muted-foreground text-sm">
              Designed & Built with passion by <span className="text-[#00d4ff]">Alex Chen</span> © 2025
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
