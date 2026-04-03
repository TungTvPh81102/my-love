"use client"

import { useState } from "react"

const skills = [
  { name: "React / Next.js", level: 95, color: "#00d4ff" },
  { name: "Three.js / WebGL", level: 88, color: "#7c3aed" },
  { name: "TypeScript", level: 92, color: "#3b82f6" },
  { name: "UI/UX Design", level: 85, color: "#00d4ff" },
  { name: "Node.js", level: 80, color: "#7c3aed" },
]

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Expertise</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="group relative"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div
              className={`absolute -inset-0.5 rounded-xl blur-sm transition-opacity duration-300 ${hoveredSkill === skill.name ? "opacity-50" : "opacity-0"}`}
              style={{ backgroundColor: skill.color }}
            />
            <div className="relative bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-xl px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: hoveredSkill === skill.name ? `${skill.level}%` : "30%",
                    backgroundColor: skill.color,
                    boxShadow: hoveredSkill === skill.name ? `0 0 10px ${skill.color}` : "none",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
