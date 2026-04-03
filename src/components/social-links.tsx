"use client"

import { useState } from "react"
import { Github, Twitter, Linkedin, Dribbble, Mail } from "lucide-react"

const socials = [
  { name: "GitHub", icon: Github, href: "#", color: "#00d4ff" },
  { name: "Twitter", icon: Twitter, href: "#", color: "#3b82f6" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "#7c3aed" },
  { name: "Dribbble", icon: Dribbble, href: "#", color: "#00d4ff" },
  { name: "Email", icon: Mail, href: "#", color: "#3b82f6" },
]

export default function SocialLinks() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  return (
    <div className="flex items-center gap-2">
      {socials.map((social) => {
        const Icon = social.icon
        const isHovered = hoveredSocial === social.name

        return (
          <a
            key={social.name}
            href={social.href}
            className="group relative"
            onMouseEnter={() => setHoveredSocial(social.name)}
            onMouseLeave={() => setHoveredSocial(null)}
            aria-label={social.name}
          >
            {/* Glow Effect */}
            <div
              className={`absolute -inset-2 rounded-xl blur-md transition-all duration-300 ${isHovered ? "opacity-60" : "opacity-0"}`}
              style={{ backgroundColor: social.color }}
            />

            {/* Button */}
            <div
              className={`relative flex items-center justify-center w-11 h-11 rounded-xl border transition-all duration-300 ${
                isHovered
                  ? "bg-secondary/80 border-transparent -translate-y-1 scale-110"
                  : "bg-secondary/40 border-border/50"
              }`}
              style={{
                boxShadow: isHovered ? `0 10px 40px -10px ${social.color}` : "none",
              }}
            >
              <Icon
                className={`w-5 h-5 transition-all duration-300 ${isHovered ? "text-foreground" : "text-muted-foreground"}`}
                style={{ color: isHovered ? social.color : undefined }}
              />
            </div>
          </a>
        )
      })}
    </div>
  )
}
