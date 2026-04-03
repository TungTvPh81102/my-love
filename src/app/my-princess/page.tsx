"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Confetti {
    id: number;
    x: number;
    color: string;
    delay: number;
    duration: number;
    size: number;
    shape: "circle" | "rect" | "star";
}

interface Wish {
    id: number;
    emoji: string;
    color: string;
    title: string;
    message: string;
}

interface FunFact {
    emoji: string;
    front: string;
    back: string;
    color: string;
}

interface TimelineItem {
    date: string;
    emoji: string;
    caption: string;
    color: string;
    rotate: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const WISHES: Wish[] = [
    {
        id: 1,
        emoji: "🌸",
        color: "#FFB6C1",
        title: "Sức khỏe & Hạnh phúc",
        message:
            "Chúc Hà luôn khỏe mạnh, rạng rỡ như nắng sớm mùa hè, nụ cười luôn tươi tắn và trái tim luôn đầy ắp niềm vui! 🌈",
    },
    {
        id: 2,
        emoji: "🎓",
        color: "#C9B8F0",
        title: "Học tập & Sự nghiệp",
        message:
            "Mọi con đường Hà bước đi đều rải đầy hoa, mọi ước mơ Hà theo đuổi đều thành hiện thực. Hà xứng đáng được hưởng những điều tốt đẹp nhất! ✨",
    },
    {
        id: 3,
        emoji: "💕",
        color: "#FFCBA4",
        title: "Tình yêu & Kết nối",
        message:
            "Chúc Hà luôn được bao quanh bởi những người yêu thương, trân trọng Hà đúng với giá trị của một cô gái tuyệt vời như thế! 💝",
    },
    {
        id: 4,
        emoji: "🌟",
        color: "#B5EAD7",
        title: "Ước mơ & Khát vọng",
        message:
            "Năm 23 tuổi này sẽ là năm của những bước ngoặt kỳ diệu. Hà cứ mơ to, sống trọn, và tỏa sáng theo cách riêng của mình nhé! 🚀",
    },
    {
        id: 5,
        emoji: "🎀",
        color: "#FFC8DD",
        title: "Ngày đặc biệt này",
        message:
            "Hôm nay vũ trụ đã làm một điều tuyệt vời nhất: sinh ra Hà. Cảm ơn vì đã xuất hiện và làm cuộc đời của những người xung quanh thêm ý nghĩa! 🌙",
    },
    {
        id: 6,
        emoji: "✈️",
        color: "#BDE0FE",
        title: "Trải nghiệm & Phiêu lưu",
        message:
            "Chúc Hà được đặt chân đến những nơi Hà hằng mơ ước, ăn những món ngon, và tạo ra thật nhiều kỷ niệm đáng nhớ! 🗺️",
    },
];

const FUN_FACTS: FunFact[] = [
    {
        emoji: "☀️",
        front: "Sinh vào mùa Hè",
        back: "Sinh ngày 1/8 → khoa học đã chứng minh: đây là lý do chính khiến Hà... hot vl 🥵",
        color: "#FFE5B4",
    },
    {
        emoji: "🎂",
        front: "23 tuổi rồi đó!",
        back: "Tính ra Hà đã sống qua 8.400+ ngày, ăn ~25.000 bữa cơm và vẫn đáng yêu như ngày đầu 🥺",
        color: "#FFC8DD",
    },
    {
        emoji: "💅",
        front: "Cô nàng điệu đà",
        back: "Được sinh ra để làm chúa tể của sự cute. Hà không ở dưới chuẩn của ai cả, chỉ có người khác không đủ tiêu chuẩn thôi 👑",
        color: "#C9B8F0",
    },
    {
        emoji: "🌙",
        front: "Bí ẩn & Thú vị",
        back: "Càng tìm hiểu Hà, càng thấy có nhiều điều thú vị. Giống như một cuốn sách hay — không muốn gập lại 📖",
        color: "#B5EAD7",
    },
];

const TIMELINE: TimelineItem[] = [
    {
        date: "01/08/2002",
        emoji: "👶",
        caption: "Ngày Hà chào đời — vũ trụ chính thức nâng cấp lên phiên bản mới ✨",
        color: "#FFB6C1",
        rotate: "-3deg",
    },
    {
        date: "Hồi nhỏ",
        emoji: "🎒",
        caption: "Ngày đầu đi học, bắt đầu hành trình trở thành người giỏi giang nhất 📚",
        color: "#C9B8F0",
        rotate: "2deg",
    },
    {
        date: "Tuổi teen",
        emoji: "🌸",
        caption: "Giai đoạn Hà phát hiện ra: mình cute bẩm sinh, không cần cố 💁‍♀️",
        color: "#FFCBA4",
        rotate: "-2deg",
    },
    {
        date: "Đại học",
        emoji: "🎓",
        caption: "Hà tiếp tục chinh phục những đỉnh cao mới, vừa học vừa điệu 💪",
        color: "#B5EAD7",
        rotate: "3deg",
    },
    {
        date: "01/08/2025",
        emoji: "🎂",
        caption: "Hôm nay — một chương mới bắt đầu, và nó sẽ rất tuyệt vời! 🌈",
        color: "#FFC8DD",
        rotate: "-1deg",
    },
];

const LETTER_LINES = [
    "Hà ơi,",
    "",
    "Có những người xuất hiện trong cuộc đời mình",
    "và khiến mọi thứ trở nên sáng hơn một chút.",
    "Hà là một trong những người như vậy. 🌸",
    "",
    "Mình không biết nói hoa mỹ lắm,",
    "nhưng mình biết rằng:",
    "mỗi ngày có Hà ở bên là một ngày đáng sống hơn. 💕",
    "",
    "Chúc sinh nhật Hà thật vui,",
    "thật nhiều yêu thương,",
    "và luôn là phiên bản tuyệt vời nhất của chính mình. ✨",
    "",
    "Mãi yêu,",
    "Người thương của Hà 🎀",
];

// ─── Utils ───────────────────────────────────────────────────────────────────
function getAge() {
    const birth = new Date(2002, 7, 1); // Aug 1, 2002
    const now = new Date();
    const diffMs = now.getTime() - birth.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365.25);
    return { years, days };
}

function generateConfetti(count: number): Confetti[] {
    const colors = ["#FFB6C1", "#C9B8F0", "#FFCBA4", "#B5EAD7", "#FFC8DD", "#BDE0FE", "#FDFFB6", "#FFC6FF"];
    const shapes: Array<"circle" | "rect" | "star"> = ["circle", "rect", "star"];
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 4,
        size: 6 + Math.random() * 10,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ConfettiPiece({ piece }: { piece: Confetti }) {
    return (
        <div
            className="fixed top-0 pointer-events-none z-50"
            style={{
                left: `${piece.x}%`,
                animation: `confettiFall ${piece.duration}s ${piece.delay}s infinite linear`,
                width: piece.size,
                height: piece.shape === "rect" ? piece.size * 0.4 : piece.size,
                backgroundColor: piece.color,
                borderRadius: piece.shape === "circle" ? "50%" : piece.shape === "star" ? "2px" : "2px",
                transform: piece.shape === "star" ? "rotate(45deg)" : undefined,
                opacity: 0.85,
            }}
        />
    );
}

function FloatingDecor() {
    const items = ["🌸", "⭐", "💕", "✨", "🌟", "💫", "🎀", "🌈", "🍭", "🦋"];
    return (
        <>
            {items.map((item, i) => (
                <span
                    key={i}
                    className="fixed text-2xl pointer-events-none select-none"
                    style={{
                        left: `${5 + (i * 9.5) % 95}%`,
                        top: `${10 + (i * 17) % 80}%`,
                        animation: `floatUpDown ${3 + i * 0.4}s ${i * 0.3}s infinite ease-in-out alternate`,
                        opacity: 0.15,
                        zIndex: 0,
                    }}
                >
          {item}
        </span>
            ))}
        </>
    );
}

function FlipCard({ fact }: { fact: FunFact }) {
    const [flipped, setFlipped] = useState(false);
    return (
        <div
            className="cursor-pointer"
            style={{ perspective: 1000, height: 200 }}
            onClick={() => setFlipped(!flipped)}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-lg"
                    style={{
                        backfaceVisibility: "hidden",
                        backgroundColor: fact.color,
                        border: "2px solid rgba(255,255,255,0.6)",
                    }}
                >
                    <span className="text-5xl">{fact.emoji}</span>
                    <p className="font-bold text-center px-4 text-gray-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        {fact.front}
                    </p>
                    <Badge variant="secondary" className="text-xs opacity-70">
                        Nhấn để lật 👆
                    </Badge>
                </div>
                {/* Back */}
                <div
                    className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-4 shadow-lg"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "linear-gradient(135deg, #fff0f7, #f8f0ff)",
                        border: "2px solid rgba(255,255,255,0.8)",
                    }}
                >
                    <p className="text-center text-gray-700 text-sm leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        {fact.back}
                    </p>
                </div>
            </div>
        </div>
    );
}

function WishScroll({ wish, onClick }: { wish: Wish; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-2 group transition-all duration-300 hover:scale-110 hover:-translate-y-2"
        >
            <div
                className="w-16 h-20 rounded-full flex items-center justify-center text-3xl shadow-md group-hover:shadow-xl transition-shadow duration-300"
                style={{
                    background: `linear-gradient(135deg, ${wish.color}, ${wish.color}88)`,
                    border: "3px solid rgba(255,255,255,0.8)",
                }}
            >
                {wish.emoji}
            </div>
            <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: "'Nunito', sans-serif" }}>
        {wish.title}
      </span>
        </button>
    );
}

function Star({ style }: { style: React.CSSProperties }) {
    return (
        <div
            className="absolute rounded-full bg-white"
            style={{
                animation: "twinkle 2s infinite alternate",
                ...style,
            }}
        />
    );
}

function Candle({ blown, onBlow }: { blown: boolean; onBlow: () => void }) {
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="relative flex flex-col items-center" style={{ animation: blown ? "none" : undefined }}>
                {/* Flame */}
                {!blown && (
                    <div className="relative mb-1">
                        <div
                            className="w-5 h-8 rounded-full"
                            style={{
                                background: "linear-gradient(to top, #FF6B35, #FFD700, #FFF)",
                                animation: "flicker 0.3s infinite alternate",
                                boxShadow: "0 0 15px 5px rgba(255,180,0,0.5)",
                                transformOrigin: "bottom center",
                            }}
                        />
                    </div>
                )}
                {blown && (
                    <div className="w-5 h-2 rounded-full bg-gray-300 mb-1 opacity-60" />
                )}
                {/* Candle body */}
                <div
                    className="w-10 h-32 rounded-xl shadow-lg relative overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, #FFB6C1, #FFC8DD, #FFB6C1)",
                        border: "2px solid rgba(255,255,255,0.5)",
                    }}
                >
                    <div className="absolute inset-0 opacity-30"
                         style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
                    {/* Drip */}
                    <div className="absolute top-0 left-3 w-3 h-6 rounded-b-full"
                         style={{ background: "#FFC8DD" }} />
                </div>
                {/* Base */}
                <div className="w-14 h-3 rounded-full"
                     style={{ background: "linear-gradient(135deg, #C9B8F0, #B5EAD7)" }} />
            </div>

            {!blown ? (
                <button
                    onClick={onBlow}
                    className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                        background: "linear-gradient(135deg, #FFB6C1, #C9B8F0)",
                        fontFamily: "'Quicksand', sans-serif",
                        border: "none",
                    }}
                >
                    🕯️ Thổi nến nào!
                </button>
            ) : (
                <div className="text-center" style={{ animation: "bounceIn 0.6s ease" }}>
                    <p className="text-5xl mb-4">🎊🎂🎉</p>
                    <h2
                        className="text-3xl font-black mb-2"
                        style={{
                            fontFamily: "'Quicksand', sans-serif",
                            background: "linear-gradient(135deg, #FFB6C1, #C9B8F0, #FFCBA4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            animation: "popIn 0.5s ease",
                        }}
                    >
                        Happy Birthday Hà! 🎀
                    </h2>
                    <p className="text-gray-600" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        Chúc Hà một năm mới thật tuyệt vời! ✨
                    </p>
                </div>
            )}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BirthdayPage() {
    const [confetti] = useState(() => generateConfetti(60));
    const [activeWish, setActiveWish] = useState<Wish | null>(null);
    const [blown, setBlown] = useState(false);
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const letterRef = useRef<HTMLDivElement>(null);
    const { years, days } = getAge();

    // Letter reveal on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    LETTER_LINES.forEach((_, i) => {
                        setTimeout(() => {
                            setVisibleLines((prev) => [...prev, i]);
                        }, i * 200);
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (letterRef.current) observer.observe(letterRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* ── Global Styles ── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700;800&family=Nunito:wght@400;500;600&family=Dancing+Script:wght@600;700&display=swap');
        
        body { margin: 0; overflow-x: hidden; background: #FFF8F0; }
        
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes floatUpDown {
          from { transform: translateY(0px) rotate(-5deg); }
          to   { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes flicker {
          from { transform: scaleX(0.9) scaleY(1); }
          to   { transform: scaleX(1.1) scaleY(0.95); }
        }
        @keyframes twinkle {
          from { opacity: 0.2; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1.2); }
        }
        @keyframes bounceFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes bounceIn {
          0%   { opacity: 0; transform: scale(0.3); }
          60%  { transform: scale(1.1); }
          80%  { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.5) rotate(-5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          14%       { transform: scale(1.3); }
          28%       { transform: scale(1); }
          42%       { transform: scale(1.3); }
          70%       { transform: scale(1); }
        }

        .cake-float { animation: bounceFloat 2.5s ease-in-out infinite; }
        .heart-beat { animation: heartBeat 1.5s ease infinite; }
        
        .section-fade {
          animation: slideUp 0.8s ease forwards;
        }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #FFF8F0; }
        ::-webkit-scrollbar-thumb { background: #FFB6C1; border-radius: 10px; }
      `}</style>

            {/* ── Confetti ── */}
            {confetti.map((piece) => (
                <ConfettiPiece key={piece.id} piece={piece} />
            ))}

            {/* ── Floating background decor ── */}
            <FloatingDecor />

            {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════ */}
            <section
                className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #FFF0F7 0%, #F0ECFF 40%, #E8F7FF 80%, #F0FFF5 100%)",
                }}
            >
                {/* Decorative blobs */}
                <div className="absolute top-10 left-10 w-40 h-40 rounded-full opacity-20 blur-3xl"
                     style={{ background: "#FFB6C1" }} />
                <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full opacity-20 blur-3xl"
                     style={{ background: "#C9B8F0" }} />
                <div className="absolute top-1/2 left-0 w-32 h-32 rounded-full opacity-15 blur-2xl"
                     style={{ background: "#B5EAD7" }} />

                <div className="relative z-10 max-w-2xl mx-auto">
                    {/* Cake */}
                    <div className="text-8xl mb-6 cake-float select-none">🎂</div>

                    {/* Badge */}
                    <div className="mb-4">
            <span
                className="inline-block px-5 py-2 rounded-full text-sm font-bold text-white shadow-md"
                style={{
                    background: "linear-gradient(135deg, #FFB6C1, #C9B8F0)",
                    fontFamily: "'Quicksand', sans-serif",
                    letterSpacing: "0.05em",
                }}
            >
              🎉 01 · 08 · 2002 → {new Date().getFullYear()} 🎉
            </span>
                    </div>

                    {/* Heading */}
                    <h1
                        className="text-5xl md:text-7xl font-black mb-4 leading-tight"
                        style={{
                            fontFamily: "'Quicksand', sans-serif",
                            background: "linear-gradient(135deg, #FF85A1, #C084FC, #60C8F5)",
                            backgroundSize: "200% 200%",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            animation: "shimmer 3s linear infinite",
                        }}
                    >
                        Chúc Mừng
                        <br />
                        Sinh Nhật
                        <br />
                        <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.2em" }}>
              Hà Yêu! 🎀
            </span>
                    </h1>

                    {/* Funny age counter */}
                    <div
                        className="mt-6 px-6 py-4 rounded-2xl text-sm md:text-base text-gray-600 shadow-sm max-w-md mx-auto"
                        style={{
                            background: "rgba(255,255,255,0.7)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,182,193,0.3)",
                            fontFamily: "'Nunito', sans-serif",
                            lineHeight: 1.7,
                        }}
                    >
                        🐣 Hà đã tồn tại được{" "}
                        <strong style={{ color: "#FF85A1" }}>{years} năm</strong> và{" "}
                        <strong style={{ color: "#C084FC" }}>{days.toLocaleString()} ngày</strong>
                        <br />
                        và vẫn cute như ngày đầu ✨
                        <br />
                        <span className="text-xs opacity-60">
              (Khoa học chưa giải thích được hiện tượng này 🔬)
            </span>
                    </div>

                    {/* Scroll hint */}
                    <div className="mt-12 opacity-50 text-gray-500 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        <div style={{ animation: "bounceFloat 1.5s ease-in-out infinite" }}>
                            ↓ Cuộn xuống để khám phá ↓
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — FUN FACTS
      ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 px-4 relative" style={{ background: "#FFF8F0" }}>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-4xl">🌸</span>
                        <h2
                            className="text-4xl font-black mt-2"
                            style={{
                                fontFamily: "'Quicksand', sans-serif",
                                color: "#4A3060",
                            }}
                        >
                            Hà là người như thế nào?
                        </h2>
                        <div className="w-24 h-1.5 rounded-full mx-auto mt-3"
                             style={{ background: "linear-gradient(to right, #FFB6C1, #C9B8F0)" }} />
                        <p className="mt-3 text-gray-500 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
                            Nhấn vào card để lật xem thôi nào! 🎴
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {FUN_FACTS.map((fact, i) => (
                            <FlipCard key={i} fact={fact} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — WISH JAR
      ══════════════════════════════════════════════════════════════════ */}
            <section
                className="py-20 px-4 relative overflow-hidden"
                style={{ background: "linear-gradient(160deg, #F0ECFF, #FFF0F7)" }}
            >
                <div className="max-w-2xl mx-auto text-center">
                    <span className="text-4xl">🫙</span>
                    <h2
                        className="text-4xl font-black mt-2 mb-2"
                        style={{ fontFamily: "'Quicksand', sans-serif", color: "#4A3060" }}
                    >
                        Hũ Điều Ước
                    </h2>
                    <div className="w-24 h-1.5 rounded-full mx-auto mb-3"
                         style={{ background: "linear-gradient(to right, #C9B8F0, #FFB6C1)" }} />
                    <p className="text-gray-500 text-sm mb-10" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        Chọn một cuộn giấy để xem điều ước dành cho Hà 🎁
                    </p>

                    {/* Jar illustration */}
                    <div
                        className="relative mx-auto mb-10 rounded-b-3xl"
                        style={{
                            width: 140,
                            height: 160,
                            background: "linear-gradient(135deg, rgba(201,184,240,0.3), rgba(255,182,193,0.2))",
                            border: "3px solid rgba(255,255,255,0.8)",
                            boxShadow: "inset 0 0 30px rgba(255,255,255,0.5), 0 8px 32px rgba(201,184,240,0.3)",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <div
                            className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-lg"
                            style={{
                                width: 100, height: 20,
                                background: "linear-gradient(135deg, #C9B8F0, #B5EAD7)",
                                border: "2px solid rgba(255,255,255,0.7)",
                            }}
                        />
                        <div className="absolute inset-0 flex flex-wrap gap-1 p-4 pt-6 items-center justify-center opacity-60">
                            {WISHES.map((w) => (
                                <span key={w.id} className="text-xl">{w.emoji}</span>
                            ))}
                        </div>
                    </div>

                    {/* Scroll icons */}
                    <div className="grid grid-cols-3 gap-6 max-w-xs mx-auto">
                        {WISHES.map((wish) => (
                            <WishScroll key={wish.id} wish={wish} onClick={() => setActiveWish(wish)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Wish Dialog */}
            <Dialog open={!!activeWish} onOpenChange={() => setActiveWish(null)}>
                <DialogContent
                    className="rounded-3xl text-center max-w-sm"
                    style={{
                        background: "linear-gradient(135deg, #FFF0F7, #F0ECFF)",
                        border: "2px solid rgba(255,255,255,0.8)",
                        fontFamily: "'Nunito', sans-serif",
                    }}
                >
                    {activeWish && (
                        <div className="py-4">
                            <div className="text-6xl mb-4">{activeWish.emoji}</div>
                            <h3
                                className="text-xl font-black mb-3"
                                style={{ fontFamily: "'Quicksand', sans-serif", color: "#4A3060" }}
                            >
                                {activeWish.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">{activeWish.message}</p>
                            <Button
                                onClick={() => setActiveWish(null)}
                                className="rounded-full px-6"
                                style={{
                                    background: "linear-gradient(135deg, #FFB6C1, #C9B8F0)",
                                    border: "none",
                                    color: "white",
                                    fontFamily: "'Quicksand', sans-serif",
                                    fontWeight: "700",
                                }}
                            >
                                Cảm ơn 💕
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — POLAROID TIMELINE
      ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 px-4 overflow-hidden" style={{ background: "#FFF8F0" }}>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-4xl">📸</span>
                        <h2
                            className="text-4xl font-black mt-2"
                            style={{ fontFamily: "'Quicksand', sans-serif", color: "#4A3060" }}
                        >
                            Những Khoảnh Khắc
                        </h2>
                        <div className="w-24 h-1.5 rounded-full mx-auto mt-3"
                             style={{ background: "linear-gradient(to right, #FFCBA4, #FFB6C1)" }} />
                    </div>

                    {/* Horizontal scroll */}
                    <div
                        className="flex gap-6 overflow-x-auto pb-6"
                        style={{ scrollSnapType: "x mandatory" }}
                    >
                        {TIMELINE.map((item, i) => (
                            <div
                                key={i}
                                className="flex-none"
                                style={{
                                    width: 200,
                                    scrollSnapAlign: "center",
                                    transform: `rotate(${item.rotate})`,
                                    transition: "transform 0.3s ease",
                                }}
                            >
                                {/* Polaroid */}
                                <div
                                    className="rounded-sm shadow-xl p-3 pb-8"
                                    style={{
                                        background: "white",
                                        border: "1px solid rgba(0,0,0,0.05)",
                                    }}
                                >
                                    {/* Washi tape */}
                                    <div
                                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-80"
                                        style={{ background: item.color }}
                                    />
                                    {/* Photo area */}
                                    <div
                                        className="w-full h-36 rounded-sm flex items-center justify-center text-6xl"
                                        style={{
                                            background: `linear-gradient(135deg, ${item.color}44, ${item.color}22)`,
                                        }}
                                    >
                                        {item.emoji}
                                    </div>
                                    {/* Caption */}
                                    <div className="mt-3">
                                        <p
                                            className="text-xs font-bold text-gray-400 mb-1"
                                            style={{ fontFamily: "'Nunito', sans-serif" }}
                                        >
                                            {item.date}
                                        </p>
                                        <p
                                            className="text-xs text-gray-600 leading-snug"
                                            style={{ fontFamily: "'Nunito', sans-serif" }}
                                        >
                                            {item.caption}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        ← Kéo ngang để xem thêm →
                    </p>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — LOVE LETTER
      ══════════════════════════════════════════════════════════════════ */}
            <section
                className="py-24 px-4 relative overflow-hidden"
                style={{ background: "#1A1040" }}
                ref={letterRef}
            >
                {/* Stars */}
                {Array.from({ length: 80 }).map((_, i) => (
                    <Star
                        key={i}
                        style={{
                            width: 1 + Math.random() * 3,
                            height: 1 + Math.random() * 3,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${1.5 + Math.random() * 2}s`,
                        }}
                    />
                ))}

                {/* Moon */}
                <div
                    className="absolute top-8 right-12 text-5xl opacity-60"
                    style={{ animation: "floatUpDown 4s ease-in-out infinite alternate" }}
                >
                    🌙
                </div>

                <div className="max-w-lg mx-auto relative z-10">
                    <div className="text-center mb-8">
                        <span className="text-4xl">💌</span>
                        <h2
                            className="text-3xl font-black mt-2 text-white"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                            Thư Gửi Hà
                        </h2>
                    </div>

                    {/* Letter card */}
                    <div
                        className="rounded-3xl p-8 md:p-10 shadow-2xl"
                        style={{
                            background: "linear-gradient(135deg, #FFF8F0, #FFF0F7)",
                            border: "1px solid rgba(255,255,255,0.2)",
                        }}
                    >
                        {LETTER_LINES.map((line, i) => (
                            <p
                                key={i}
                                className="transition-all duration-500"
                                style={{
                                    fontFamily: "'Dancing Script', cursive",
                                    fontSize: i === 0 ? "1.8rem" : i === LETTER_LINES.length - 1 || i === LETTER_LINES.length - 2 ? "1.4rem" : "1.1rem",
                                    color: i === 0 || i === LETTER_LINES.length - 1 || i === LETTER_LINES.length - 2 ? "#FF85A1" : "#4A3060",
                                    marginBottom: line === "" ? "1rem" : "0.25rem",
                                    opacity: visibleLines.includes(i) ? 1 : 0,
                                    transform: visibleLines.includes(i) ? "translateY(0)" : "translateY(10px)",
                                    lineHeight: 1.6,
                                }}
                            >
                                {line || "\u00A0"}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — FINALE: MAKE A WISH
      ══════════════════════════════════════════════════════════════════ */}
            <section
                className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #FFF0F7, #F0ECFF, #E8F7FF)",
                }}
            >
                {/* Confetti burst after blown */}
                {blown &&
                    generateConfetti(80).map((piece) => (
                        <ConfettiPiece key={piece.id + 1000} piece={piece} />
                    ))}

                <div className="text-center mb-6">
                    <h2
                        className="text-4xl md:text-5xl font-black"
                        style={{ fontFamily: "'Quicksand', sans-serif", color: "#4A3060" }}
                    >
                        Ước Một Điều Đi Hà! 🌟
                    </h2>
                    <p className="mt-3 text-gray-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        Nhắm mắt, nghĩ đến điều mình muốn nhất, rồi thổi nến nhé! 🕯️
                    </p>
                </div>

                <Candle blown={blown} onBlow={() => setBlown(true)} />

                {/* Footer */}
                <div className="mt-16 text-center opacity-50">
                    <p className="text-sm text-gray-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        Made with <span className="heart-beat inline-block">❤️</span> for Hà — 01/08/2025
                    </p>
                </div>
            </section>
        </>
    );
}
