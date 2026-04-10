"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/lib/constants";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

const CARD_COLORS = [
  "#f5c500",
  "#ff6b9d",
  "#00d4ff",
  "#ff4444",
  "#00ff88",
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24">
      {/* Header centrado */}
      <div className="text-center mb-4 px-6">
        <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-3">
          Dudas frecuentes
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-black text-cf-white">
          PREGUNTAS
        </h2>
        <div className="w-16 h-1 bg-cf-yellow mx-auto mt-4" />
      </div>

      {/* ScrollStack centrado */}
      <div className="flex justify-center w-full overflow-hidden" style={{ height: "80vh" }}>
        <div className="w-full max-w-2xl">
          <ScrollStack
            useWindowScroll={false}
            itemDistance={16}
            itemScale={0.04}
            itemStackDistance={20}
            stackPosition="25%"
            scaleEndPosition="8%"
            baseScale={0.88}
            blurAmount={1}
          >
            {FAQ.map((item, i) => {
              const color = CARD_COLORS[i % CARD_COLORS.length];
              return (
                <ScrollStackItem
                  key={i}
                  itemClassName="overflow-hidden"
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(20,20,20,0.97) 0%, rgba(30,30,30,0.95) 100%)",
                      border: `1px solid ${color}30`,
                      boxShadow: `0 0 30px ${color}12`,
                      borderRadius: "1.75rem",
                    }}
                  >
                    {/* Accent top bar */}
                    <div
                      style={{
                        height: "3px",
                        background: `linear-gradient(90deg, ${color}00, ${color}, ${color}00)`,
                        borderRadius: "9999px 9999px 0 0",
                      }}
                    />

                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left"
                    >
                      {/* Number badge */}
                      <span
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-black"
                        style={{
                          color,
                          backgroundColor: `${color}18`,
                          border: `1px solid ${color}40`,
                        }}
                      >
                        {i + 1}
                      </span>

                      <span className="flex-1 font-display font-semibold text-cf-white text-sm md:text-base leading-snug">
                        {item.q}
                      </span>

                      <motion.div
                        animate={{ rotate: open === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
                        style={{ color }}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {open === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p
                            className="px-7 pb-6 text-cf-white/60 font-body text-sm leading-relaxed border-t pt-4"
                            style={{ borderColor: `${color}20` }}
                          >
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
