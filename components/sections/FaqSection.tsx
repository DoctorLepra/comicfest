"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/lib/constants";
import LightRays from "@/components/ui/LightRays";

const CARD_COLORS = ["#f5c500", "#ff6b9d", "#00d4ff", "#ff4444", "#00ff88"];

/* ── Individual animated FAQ item ──────────────────────────────────────── */
interface FaqItemProps {
  item: { q: string; a: string };
  index: number;
  color: string;
  scrollProgress: MotionValue<number>;
  showAt: number; /* scroll-progress threshold (0-1) at which item reveals */
  open: boolean;
  onToggle: () => void;
}

function FaqAnimatedItem({
  item,
  index,
  color,
  scrollProgress,
  showAt,
  open,
  onToggle,
}: FaqItemProps) {
  /* Replicate ReactBits AnimatedList: scale 0.7→1, opacity 0→1 */
  const duration = 0.07; // progress window for the reveal transition
  const opacity = useTransform(scrollProgress, [showAt, showAt + duration], [0, 1]);
  const scale   = useTransform(scrollProgress, [showAt, showAt + duration], [0.7, 1]);
  const y       = useTransform(scrollProgress, [showAt, showAt + duration], [28, 0]);

  return (
    <motion.div style={{ opacity, scale, y }} className="mb-3 will-change-transform">
      <div
        style={{
          background: "rgba(8,8,10,0.82)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${color}38`,
          boxShadow: `0 0 22px ${color}14`,
          borderRadius: "1rem",
        }}
      >
        {/* colour top bar */}
        <div
          style={{
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            borderRadius: "9999px 9999px 0 0",
          }}
        />

        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 px-6 py-5 text-left"
        >
          {/* number badge */}
          <span
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-black"
            style={{
              color,
              backgroundColor: `${color}18`,
              border: `1px solid ${color}40`,
            }}
          >
            {index + 1}
          </span>

          <span className="flex-1 font-display font-semibold text-white text-sm md:text-base leading-snug">
            {item.q}
          </span>

          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color }}
            className="shrink-0"
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <p
                className="px-6 pb-5 text-white/55 font-body text-sm leading-relaxed border-t pt-4"
                style={{ borderColor: `${color}20` }}
              >
                {item.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Main section ───────────────────────────────────────────────────────── */
export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /*
   * Outer wrapper: 300vh tall
   *   – first 100vh  = viewport height (sticky content)
   *   – next  200vh  = scroll "budget" for revealing items + hold time
   *
   * scrollYProgress maps 0→1 across those 200vh of scroll.
   *  0.00 – section enters viewport
   *  0.04 – title fades in
   *  0.12 – FAQ item 1 appears   (~24 vh of scroll)
   *  0.22 – FAQ item 2           (~44 vh)
   *  0.32 – FAQ item 3           (~64 vh)
   *  0.42 – FAQ item 4           (~84 vh)
   *  0.52 – FAQ item 5           (~104 vh)
   *  0.52–1.0 – hold: user can read & interact before section exits
   */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const titleY       = useTransform(scrollYProgress, [0, 0.05], [24, 0]);

  const ITEM_THRESHOLDS = FAQ.map((_, i) => 0.12 + i * 0.10);
  // → [0.12, 0.22, 0.32, 0.42, 0.52]

  return (
    /* ── Outer scroll container: defines how long the section "holds" ── */
    <div ref={wrapperRef} style={{ height: "300vh" }}>

      {/* ── Sticky panel: locks in viewport during scroll zone ── */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: "100vh", background: "#06060a" }}
      >

        {/* LightRays — full viewport */}
        <div className="absolute inset-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#a58417"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            fadeDistance={1}
            saturation={0.1}
            followMouse={true}
            mouseInfluence={0.1}
            pulsating={false}
            noiseAmount={0}
            distortion={0}
          />
        </div>

        {/* Top gradient: blends into previous section */}
        <div
          className="absolute inset-x-0 top-0 z-10 pointer-events-none"
          style={{
            height: "22%",
            background: "linear-gradient(to bottom, #0a0a0a 25%, transparent)",
          }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "16%",
            background: "linear-gradient(to top, #0a0a0a 25%, transparent)",
          }}
        />

        {/* ── FAQ content centred in viewport ── */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-xl">

            {/* Title */}
            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="text-center mb-8"
            >
              <p className="text-cf-yellow text-[11px] font-display font-semibold tracking-[0.45em] uppercase mb-3">
                Dudas frecuentes
              </p>
              <h2 className="font-display text-5xl md:text-6xl font-black text-white mb-2">
                PREGUNTAS
              </h2>
              <p className="text-white/40 text-xs font-body tracking-wider">
                Desplázate para ver las preguntas
              </p>
            </motion.div>

            {/* Animated FAQ items */}
            {FAQ.map((item, i) => (
              <FaqAnimatedItem
                key={i}
                item={item}
                index={i}
                color={CARD_COLORS[i % CARD_COLORS.length]}
                scrollProgress={scrollYProgress}
                showAt={ITEM_THRESHOLDS[i]}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
