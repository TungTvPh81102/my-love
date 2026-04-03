"use client";

import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

// Các emoji dùng trong animation

const EMOJIS = ["💗", "💕", "🌸", "✨", "💖", "🩷", "⭐️", "🌷"];

interface Particle {

    id: number;

    emoji: string;

    x: number;       // % từ trái

    size: number;    // rem

    duration: number; // giây

    delay: number;

}

// Tạo 1 particle ngẫu nhiên

function createParticle(id: number): Particle {

    return {

        id,

        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],

        x: Math.random() * 95,        // 0–95% chiều rộng

        size: 1.2 + Math.random() * 1.2, // 1.2–2.4rem

        duration: 3 + Math.random() * 3,  // 3–6 giây

        delay: Math.random() * 1.5,

    };

}

export default function HeartAnimation() {

    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {

        // Tạo 20 particles ban đầu

        const initial = Array.from({ length: 20 }, (_, i) => createParticle(i));

        setParticles(initial);

        // Thêm particles mới mỗi 800ms trong 6 giây

        let counter = 20;

        const interval = setInterval(() => {

            setParticles((prev) => [...prev.slice(-30), createParticle(counter++)]);

        }, 400);

        const stop = setTimeout(() => clearInterval(interval), 6000);

        return () => {

            clearInterval(interval);

            clearTimeout(stop);

        };

    }, []);

    return (

        // overlay toàn màn hình, pointer-events-none để không block click
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            <AnimatePresence>

                {particles.map((p) => (
                    <motion.span

                        key={p.id}

                        className="absolute bottom-0 select-none"

                        style={{

                            left: `${p.x}%`,

                            fontSize: `${p.size}rem`,

                        }}

                        initial={{ y: 0, opacity: 1, scale: 0.5 }}

                        animate={{

                            y: -(window.innerHeight + 100),

                            opacity: [1, 1, 0],

                            scale: [0.5, 1, 0.8],

                            x: [0, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 60],

                        }}

                        exit={{ opacity: 0 }}

                        transition={{

                            duration: p.duration,

                            delay: p.delay,

                            ease: "easeOut",

                        }}
                    >

                        {p.emoji}
                    </motion.span>

                ))}
            </AnimatePresence>
        </div>

    );

}
