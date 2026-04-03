"use client";
import { useState } from "react";
import SurpriseButton from "@/components/SurpriseButton";
import HeartAnimation from "@/components/HeartAnimation";
import { motion } from "framer-motion";
import LoveMessage from "@/components/LoveMessage";
import SpinWheel from "@/components/SpinWheel";
// ✏️ Chỉnh thông tin cá nhân ở đây
const CONFIG = {
    recipientName: "tình yêu của mình",
    greeting: "Good morninggg~ ☀️",
    subGreeting: "Phần thưởng của tình yêu nè 🥱✨",
    ctaText: "Mở quà nhé hehe 💝",
    cardQuote: "Mo shii mo shii trời sáng rồi nè tình yêu ơiii",
    cardAuthor: "",
};
export default function Home() {
    const [opened, setOpened] = useState(false);
    const [showSurprise, setShowSurprise] = useState(false);
    return (
        <main className="min-h-screen bg-[#FFF8F5] overflow-x-hidden font-sans relative">
            {/* Floating hearts background */}
            {showSurprise && <HeartAnimation />}
            {/* === LANDING SCREEN === */}
            {!opened ? (
                <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-8">
                    {/* Decorative blobs */}
                    <div className="absolute top-10 left-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
                    <div className="absolute bottom-10 right-10 w-56 h-56 bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center gap-4"
                    >
                        {/* Greeting */}
                        <motion.p
                            className="text-sm uppercase tracking-widest text-pink-300 font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Dành cho {CONFIG.recipientName}
                        </motion.p>
                        <motion.h1
                            className="text-3xl md:text-6xl font-bold text-rose-400 leading-tight"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                        >
                            {CONFIG.greeting}
                        </motion.h1>
                        <motion.p
                            className="text-lg text-rose-300/80 max-w-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            {CONFIG.subGreeting}
                        </motion.p>
                    </motion.div>
                    {/* CTA Button */}
                    <motion.button
                        onClick={() => setOpened(true)}
                        className="mt-4 px-8 py-4 bg-rose-400 hover:bg-rose-500 text-white text-base font-semibold rounded-2xl shadow-lg shadow-rose-200 transition-all duration-300 hover:scale-105 active:scale-95"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        whileHover={{ y: -2 }}
                    >
                        {CONFIG.ctaText}
                    </motion.button>
                </section>
            ) : (
                // === GIFT CONTENT ===
                <section className="min-h-screen flex flex-col items-center px-6 py-16 gap-12">
                    {/* Blobs */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-80 pointer-events-none" />
                    <div className="absolute top-1/3 right-0 w-48 h-48 bg-purple-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
                    {/* Header */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-sm uppercase tracking-widest text-pink-300 font-medium mb-2">
                            Quà của tình yêu đây nè 🎀
                        </p>
                        <h2
                            className="text-4xl font-bold text-rose-400"
                        >
                            Hãy mở ra xem nhé~
                        </h2>
                    </motion.div>
                    {/* Love Messages */}
                    {/*<LoveMessage />*/}
                    {/* Cute Card */}
                    <motion.div
                        className="relative w-full max-w-md bg-white border border-rose-100 rounded-3xl shadow-sm shadow-rose-100 p-8 flex flex-col items-center text-center gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {/* Card decoration */}
                        <div className="flex gap-2 text-2xl">
                            <span>🌸</span>
                            <span>💗</span>
                            <span>🌸</span>
                        </div>
                        <p
                            className="text-rose-700/80 text-[14px] font-bold leading-relaxed italic"
                        >
                            "{CONFIG.cardQuote}"
                        </p>
                        <p className="text-rose-300 text-sm font-medium">{CONFIG.cardAuthor}</p>
                        {/* Corner deco */}
                        <span className="absolute top-4 right-4 text-pink-200 text-lg">✦</span>
                        <span className="absolute bottom-4 left-4 text-pink-200 text-lg">✦</span>
                    </motion.div>
                    {/* Surprise Button */}
                    <SurpriseButton onSurprise={() => setShowSurprise(true)} />

                    <SpinWheel/>

                    {/* Footer */}
                    <motion.footer
                        className="text-xs text-rose-300/60 tracking-wide"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        Made with ❤️ just for my beloved Dím
                    </motion.footer>
                </section>
            )}
        </main>
    );
}