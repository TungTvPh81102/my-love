"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface SurpriseButtonProps {
    onSurprise: () => void; // callback để trigger HeartAnimation ở parent
}
// ✏️ Tin nhắn bất ngờ
const SURPRISE_MESSAGE = "Phần thưởng to đùng là mình nè 🤣🤣🤣";
export default function SurpriseButton({ onSurprise }: SurpriseButtonProps) {
    const [clicked, setClicked] = useState(false);
    const [bgChanged, setBgChanged] = useState(false);
    const handleClick = () => {
        if (clicked) return;SURPRISE_MESSAGE
        setClicked(true);
        onSurprise(); // trigger hearts
        // Đổi background màu ấm sau chút
        setTimeout(() => setBgChanged(true), 300);
    };
    // Đổi màu background body
    useEffect(() => {
        if (bgChanged) {
            document.body.style.transition = "background-color 1s ease";
            document.body.style.backgroundColor = "#FFF0EC";
        }
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, [bgChanged]);
    return (
        <div className="flex flex-col items-center gap-6">
            <motion.button
                onClick={handleClick}
                disabled={clicked}
                className={`px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300
  ${clicked
                    ? "bg-pink-200 text-pink-400 cursor-default shadow-pink-100"
                    : "bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-rose-200 active:scale-95"
                }`}
                animate={!clicked ? {
                    scale: [1, 1.05, 1]
                } : {}}
                transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                whileTap={!clicked ? { scale: 0.92 } : {}}
            >
                {clicked ? "💗 Đã mở rồi nè~" : "🎁 Xem bất ngờ"}
            </motion.button>
            {/* Surprise message */}
            <AnimatePresence>
                {clicked && (
                    <motion.div
                        className="max-w-sm text-center px-6 py-4 bg-white rounded-3xl border border-rose-100 shadow-sm shadow-rose-50"
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    >
                        <p
                            className="text-rose-500 text-[16px] font-bold"
                        >
                            {SURPRISE_MESSAGE}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}