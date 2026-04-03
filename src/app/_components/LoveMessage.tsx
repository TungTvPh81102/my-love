"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// ✏️ Chỉnh nội dung tin nhắn ở đây
const MESSAGES = [
    {
        id: 1,
        icon: "🌤️",
        text: "Buổi sáng của em bắt đầu rồi đó. Anh biết dậy sớm khó lắm, nhưng em làm được rồi nè.",
    },
    {
        id: 2,
        icon: "💌",
        text: "Cảm ơn em đã tin lời anh. Nhỏ thôi nhưng anh thấy ấm lòng thiệt.",
    },
    {
        id: 3,
        icon: "✨",
        text: "Hôm nay trời đẹp không? Dù sao thì trong mắt anh, hôm nay đẹp lắm rồi — vì có em.",
    },
];
// Hook: hiệu ứng typewriter
function useTypewriter(text: string, speed = 35, delay = 0) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);
    useEffect(() => {
        setDisplayed("");
        setDone(false);
        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayed(text.slice(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    setDone(true);
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, speed, delay]);
    return { displayed, done };
}
// Component một tin nhắn
function MessageCard({
                         message,
                         index,
                     }: {
    message: (typeof MESSAGES)[0];
    index: number;
}) {
    const { displayed } = useTypewriter(message.text, 30, index * 800);
    return (
        <motion.div
            className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-rose-100 rounded-3xl p-6 flex gap-4 items-start shadow-sm shadow-rose-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3, duration: 0.5 }}
        >
            <span className="text-2xl mt-1 shrink-0">{message.icon}</span>
            <p className="text-rose-700/70 text-base leading-relaxed min-h-[3rem]">
                {displayed}
                {/* Blinking cursor */}
                <span className="inline-block w-0.5 h-4 bg-rose-300 ml-0.5 animate-pulse align-middle" />
            </p>
        </motion.div>
    );
}
export default function LoveMessage() {
    return (
        <div className="flex flex-col items-center gap-4 w-full">
            {MESSAGES.map((msg, i) => (
                <MessageCard key={msg.id} message={msg} index={i} />
            ))}
        </div>
    );
}