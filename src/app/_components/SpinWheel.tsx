"use client";
import { useEffect, useRef, useState } from "react";
// ============================================================
// ⚙️ CẤU HÌNH — chỉ sửa ở đây
// ============================================================
// weight = tỷ lệ xác suất (KHÔNG ảnh hưởng kích thước ô)
// Các ô luôn bằng nhau, weight chỉ quyết định độ may mắn
const SEGMENTS = [
    { label: "Trà sữa",        emoji: "🧋", weight: 4, bg: "#fde0ec", stroke: "#f5a8c0", text: "#c0587e" },
    { label: "Trái cây",       emoji: "🍓", weight: 4, bg: "#fff0db", stroke: "#ffd49a", text: "#b87030" },
    { label: "Thứ bạn thích",  emoji: "🎀", weight: 2, bg: "#efe0ff", stroke: "#d4aaff", text: "#7840b0" },
    { label: "Mỹ phẩm",       emoji: "💄", weight: 3, bg: "#dcf5e0", stroke: "#a8e0b0", text: "#3a8a50" },
    { label: "Đi chơi",        emoji: "🎡", weight: 3, bg: "#daeeff", stroke: "#a0d4ff", text: "#2870b0" },
    { label: "Quần áo",        emoji: "👗", weight: 2, bg: "#fde8d8", stroke: "#f0c0a0", text: "#a04828" },
];
// ============================================================
const N = SEGMENTS.length;
// Mỗi ô có arc bằng nhau — tránh lỗi tính góc khi weight khác nhau
const EQUAL_ARC = (2 * Math.PI) / N;
const totalWeight = SEGMENTS.reduce((s, seg) => s + seg.weight, 0);
// Chọn ô theo xác suất weight (arc vẫn bằng nhau, chỉ xác suất khác)
function pickWeightedIndex(): number {
    const rand = Math.random() * totalWeight;
    let acc = 0;
    for (let i = 0; i < N; i++) {
        acc += SEGMENTS[i].weight;
        if (rand < acc) return i;
    }
    return N - 1;
}
// Pointer nằm ở đỉnh (góc -PI/2 trong hệ canvas)
// Wheel bắt đầu vẽ từ góc `angle`, ô i chiếm [angle + i*ARC, angle + (i+1)*ARC]
// Để pointer trỏ vào giữa ô targetIdx, ta cần:
//   angle + targetIdx*ARC + ARC/2 = -PI/2  (mod 2PI)
//   => angle = -PI/2 - targetIdx*ARC - ARC/2
// Ta cần quay thêm: newAngle - currentAngle + N*2PI (để đủ vòng)
function calcRotationToTarget(currentAngle: number, targetIdx: number, extraSpins: number): number {
    const targetAngle = -Math.PI / 2 - targetIdx * EQUAL_ARC - EQUAL_ARC / 2;
    // Normalise diff vào (0, 2PI] để luôn quay chiều thuận
    let diff = ((targetAngle - currentAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    if (diff === 0) diff = 2 * Math.PI; // tránh không quay
    return extraSpins * 2 * Math.PI + diff;
}
function drawWheel(ctx: CanvasRenderingContext2D, angle: number, size: number) {
    const cx = size / 2;
    const cy = size / 2;
    const r  = size / 2 - 12;
    ctx.clearRect(0, 0, size, size);
    // ── Outer decorative ring
    ctx.beginPath();
    ctx.arc(cx, cy, r + 10, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(245,192,212,0.3)";
    ctx.lineWidth = 10;
    ctx.stroke();
    // ── Vẽ từng ô
    for (let i = 0; i < N; i++) {
        const seg    = SEGMENTS[i];
        const startA = angle + i * EQUAL_ARC;
        const endA   = startA + EQUAL_ARC;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, startA, endA);
        ctx.closePath();
        ctx.fillStyle = seg.bg;
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2.5;
        ctx.stroke();
    }
    // ── Viền ngoài
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = "#f5c0d4";
    ctx.lineWidth = 5;
    ctx.stroke();
    // ── Text + emoji cho từng ô
    // Chiều rộng ô tại khoảng giữa: 2 * sin(ARC/2) * dist
    // Với 6 ô đều: ARC = 60° => sin(30°) = 0.5 => chord = dist
    // Ta đặt emoji gần rìa, label gần tâm hơn
    const emojiR  = r * 0.70;
    const labelR  = r * 0.38;
    const emojiSz = Math.round(size * 0.066);
    const labelSz = Math.round(size * 0.040);
    for (let i = 0; i < N; i++) {
        const seg  = SEGMENTS[i];
        const midA = angle + i * EQUAL_ARC + EQUAL_ARC / 2;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(midA);
        // Emoji — vẽ nằm ngang trục x sau khi rotate
        ctx.font         = `${emojiSz}px sans-serif`;
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(seg.emoji, emojiR, 0);
        // Label — truncate nếu quá dài để không tràn ô
        ctx.font         = `700 ${labelSz}px 'Nunito', sans-serif`;
        ctx.fillStyle    = seg.text;
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        // Giới hạn chiều rộng tối đa = chord tại labelR  ≈ 2*sin(ARC/2)*labelR
        const maxW = 2 * Math.sin(EQUAL_ARC / 2) * labelR * 0.9;
        ctx.fillText(seg.label, labelR, 0, maxW);
        ctx.restore();
    }
    // ── Tâm
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.115, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#f5c0d0";
    ctx.lineWidth = 3;
    ctx.stroke();
}
function easeOutQuart(t: number) {
    return 1 - Math.pow(1 - t, 4.5);
}
// ── Particles
function Particles() {
    const pool  = ["💕", "🌸", "✨", "💝", "🌷", "🎀", "⭐", "🍀"];
    const items = Array.from({ length: 28 }, (_, i) => ({
        id:    i,
        emoji: pool[Math.floor(Math.random() * pool.length)],
        left:  5  + Math.random() * 90,
        top:   5  + Math.random() * 70,
        size:  14 + Math.random() * 18,
        delay: Math.random() * 0.7,
        dur:   1.4 + Math.random() * 1.0,
    }));
    return (
        <>
            <style>{`
       @keyframes floatUp {
         0%   { opacity: 1; transform: translateY(0)      scale(1)   rotate(0deg); }
         100% { opacity: 0; transform: translateY(-220px) scale(0.3) rotate(30deg); }
       }
     `}</style>
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999 }}>
                {items.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            position: "absolute",
                            left: `${p.left}%`,
                            top:  `${p.top}%`,
                            fontSize: p.size,
                            animation: `floatUp ${p.dur}s ease-out ${p.delay}s forwards`,
                        }}
                    >
                        {p.emoji}
                    </div>
                ))}
            </div>
        </>
    );
}
// ── Main component
export default function SpinWheel() {
    const canvasRef  = useRef<HTMLCanvasElement>(null);
    const angleRef   = useRef(0); // bắt đầu từ 0, pointer trỏ vào giữa ô 0 khi angle = -ARC/2
    const spinRef    = useRef(false);
    const [result,       setResult]       = useState<(typeof SEGMENTS)[0] | null>(null);
    const [spinning,     setSpinning]     = useState(false);
    const [done,         setDone]         = useState(false);
    const [showParticles,setShowParticles]= useState(false);
    // Canh pointer vào giữa ô đầu tiên lúc load
    // angle = -ARC/2 => ô 0 nằm đối xứng quanh đỉnh (-PI/2)
    const INIT_ANGLE = -EQUAL_ARC / 2;
    // Responsive size
    const [size, setSize] = useState(320);
    useEffect(() => {
        const update = () => setSize(window.innerWidth <= 430 ? 288 : 320);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);
    // Vẽ lại wheel khi size thay đổi
    useEffect(() => {
        angleRef.current = INIT_ANGLE;
        const canvas = canvasRef.current;
        if (!canvas) return;
        drawWheel(canvas.getContext("2d")!, angleRef.current, size);
    }, [size]);
    const canSpin = !spinning && !done;
    function handleSpin() {
        if (!canSpin) return;
        spinRef.current = true;
        setSpinning(true);
        setResult(null);
        const targetIdx = pickWeightedIndex();
        const extraSpins = 6 + Math.floor(Math.random() * 3);
        const totalRot   = calcRotationToTarget(angleRef.current, targetIdx, extraSpins);
        const DURATION  = 4200;
        const startTime = performance.now();
        const startAngle = angleRef.current;
        const ctx = canvasRef.current!.getContext("2d")!;
        function animate(now: number) {
            const t = Math.min((now - startTime) / DURATION, 1);
            angleRef.current = startAngle + easeOutQuart(t) * totalRot;
            drawWheel(ctx, angleRef.current, size);
            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                // Snap chính xác để không bị lệch pixel cuối
                angleRef.current = startAngle + totalRot;
                drawWheel(ctx, angleRef.current, size);
                spinRef.current = false;
                setSpinning(false);
                setDone(true);
                setResult(SEGMENTS[targetIdx]);
                setShowParticles(true);
                setTimeout(() => setShowParticles(false), 2600);
            }
        }
        requestAnimationFrame(animate);
    }
    return (
        <div
            style={{
                display:        "flex",
                flexDirection:  "column",
                alignItems:     "center",
                gap:            20,
                padding:        "32px 16px 36px",
                fontFamily:     "'Nunito', sans-serif",
                userSelect:     "none",
                position:       "relative",
                maxWidth:       460,
                margin:         "0 auto",
                width:          "100%",
                boxSizing:      "border-box",
            }}
        >
            <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
       @keyframes fadeIn {
         from { opacity: 0; transform: translateY(10px); }
         to   { opacity: 1; transform: translateY(0); }
       }
       @keyframes popIn {
         0%   { transform: scale(0.8);  opacity: 0; }
         70%  { transform: scale(1.07); }
         100% { transform: scale(1);    opacity: 1; }
       }
       @keyframes glow {
         0%, 100% { box-shadow: 0 6px 22px rgba(212,165,216,0.38); }
         50%       { box-shadow: 0 8px 32px rgba(212,165,216,0.58); }
       }
     `}</style>
            {/* ── Title */}
            <div style={{ textAlign: "center", animation: "fadeIn 0.6s ease" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#d4739a", letterSpacing: 0.6 }}>
                    🎀 Phần thưởng của tình yêuuu nè
                </div>
                <div style={{ fontSize: 13, color: "#d4a0b5", marginTop: 5 }}>
                    {done
                        ? "Chúc mừng em nhận được món quà 🎉"
                        : spinning
                            ? "Đang quay... 🌀"
                            : "Bấm nút bên dưới để quay nha~"}
                </div>
            </div>
            {/* ── Wheel wrapper — KHÔNG onClick */}
            <div
                style={{
                    position:   "relative",
                    width:      size,
                    height:     size,
                    flexShrink: 0,
                    filter:     canSpin
                        ? "drop-shadow(0 8px 28px rgba(220,140,170,0.38))"
                        : "drop-shadow(0 3px 12px rgba(220,140,170,0.16))",
                    transition: "filter 0.4s",
                }}
            >
                {/* Pointer */}
                <div
                    style={{
                        position:  "absolute",
                        top:       -22,
                        left:      "50%",
                        transform: "translateX(-50%)",
                        zIndex:    10,
                        lineHeight: 0,
                    }}
                >
                    <svg width="26" height="38" viewBox="0 0 26 38" fill="none">
                        <path d="M13 38 L1 8 Q13 -5 25 8 Z"  fill="#e8829e" />
                        <path d="M13 33 L4 10 Q13 0 22 10 Z"  fill="#f5a8c0" />
                        <circle cx="13" cy="10" r="4" fill="#fff" opacity="0.9" />
                    </svg>
                </div>
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    width={size}
                    height={size}
                    style={{ borderRadius: "50%", display: "block" }}
                />
                {/* Tâm trang trí */}
                <div
                    style={{
                        position:      "absolute",
                        top:           "50%",
                        left:          "50%",
                        transform:     "translate(-50%, -50%)",
                        width:         54,
                        height:        54,
                        borderRadius:  "50%",
                        background:    "#fff",
                        border:        "3px solid #f5c0d0",
                        display:       "flex",
                        alignItems:    "center",
                        justifyContent:"center",
                        fontSize:      24,
                        zIndex:        10,
                        boxShadow:     "0 2px 12px rgba(232,150,170,0.22), inset 0 1px 3px rgba(255,255,255,0.9)",
                        pointerEvents: "none",
                    }}
                >
                    {done ? "🎉" : "🎁"}
                </div>
            </div>
            {/* ── Nút quay */}
            <button
                onClick={handleSpin}
                disabled={!canSpin}
                style={{
                    padding:      "15px 56px",
                    borderRadius: 999,
                    border:       "none",
                    background:   canSpin
                        ? "linear-gradient(135deg, #f9a8c0 0%, #d4a5d8 100%)"
                        : "#f0d8e4",
                    color:        canSpin ? "#fff" : "#c8a0b8",
                    fontSize:     16,
                    fontWeight:   800,
                    fontFamily:   "'Nunito', sans-serif",
                    cursor:       canSpin ? "pointer" : "not-allowed",
                    letterSpacing:0.4,
                    transition:   "all 0.25s ease",
                    animation:    canSpin && !spinning ? "glow 2s ease-in-out infinite" : "none",
                    minWidth:     200,
                    minHeight:    52,
                    // Không dùng transform mặc định để tránh layout shift
                    willChange:   "transform",
                }}
                onMouseEnter={e => { if (canSpin) e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}
                onTouchStart={e => { if (canSpin) e.currentTarget.style.transform = "scale(0.96)"; }}
                onTouchEnd={e => { e.currentTarget.style.transform = "none"; }}
            >
                {spinning ? "Đang quay... 🌀" : done ? "Đã quay rồi 🥺" : "✨ Quay ngay!"}
            </button>
            {/* ── Result */}
            {result && (
                <div
                    style={{
                        padding:        "14px 36px",
                        borderRadius:   999,
                        background:     `linear-gradient(135deg, ${result.bg} 0%, #fff8fc 100%)`,
                        border:         `1.5px solid ${result.stroke}`,
                        fontSize:       18,
                        color:          result.text,
                        fontWeight:     800,
                        display:        "flex",
                        alignItems:     "center",
                        gap:            10,
                        boxShadow:      `0 4px 20px ${result.stroke}66`,
                        animation:      "popIn 0.5s cubic-bezier(.34,1.56,.64,1) both",
                        minWidth:       220,
                        justifyContent: "center",
                        textAlign:      "center",
                    }}
                >
                    <span style={{ fontSize: 26 }}>{result.emoji}</span>
                    {result.label} nha ! 💕
                </div>
            )}
            {showParticles && <Particles />}
        </div>
    );
}