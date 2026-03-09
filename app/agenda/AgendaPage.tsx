"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { AGENDA } from "@/lib/constants";
import Squares from "@/components/ui/Squares";
import Stack from "@/components/ui/Stack";

const TYPE_COLORS: Record<string, string> = {
  general: "#888888",
  especial: "#f5c500",
  torneo: "#00d4ff",
  competencia: "#ff6b9d",
  entretenimiento: "#ff4444",
};

const TYPE_ICONS: Record<string, string> = {
  general: "🚪",
  especial: "⭐",
  torneo: "🏆",
  competencia: "🎭",
  entretenimiento: "🎉",
};

export default function AgendaPage() {
  const [activeDay, setActiveDay] = useState(0);

  const handleDayChange = useCallback((i: number) => {
    setActiveDay(i);
  }, []);

  const currentEvents = AGENDA[activeDay].events;

  const eventCards = useMemo(
    () =>
      currentEvents.map((event) => {
        const color = TYPE_COLORS[event.type] ?? "#888";
        const icon = TYPE_ICONS[event.type] ?? "📌";
        return (
          <div
            style={{
              width: "460px",
              height: "260px",
              flexShrink: 0,
              background: `linear-gradient(135deg, rgba(20,20,20,0.97) 0%, rgba(30,30,30,0.95) 100%)`,
              border: `1px solid ${color}30`,
              boxShadow: `0 0 30px ${color}12`,
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            {/* Top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-widest"
                style={{
                  color,
                  backgroundColor: `${color}18`,
                  border: `1px solid ${color}30`,
                }}
              >
                {event.type}
              </span>
              <span className="text-3xl">{icon}</span>
            </div>

            {/* Time + title */}
            <div>
              <p className="font-display text-cf-yellow text-4xl font-black mb-2 leading-none">
                {event.time}
              </p>
              <h3
                className="font-display text-white text-xl font-bold leading-tight"
                style={{ overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
              >
                {event.title}
              </h3>
            </div>

            {/* Bottom accent */}
            <div
              style={{ height: "2px", borderRadius: "9999px", backgroundColor: `${color}40` }}
            />
          </div>
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeDay]
  );

  return (
    <div className="min-h-screen" style={{ paddingTop: "80px" }}>

      {/* ── Hero header con Squares background ── */}
      <section className="relative overflow-hidden" style={{ height: "340px" }}>
        <div className="absolute inset-0">
          <Squares
            direction="diagonal"
            speed={0.16}
            borderColor="rgba(245, 197, 0, 0.15)"
            squareSize={48}
            hoverFillColor="rgba(245, 197, 0, 0.06)"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.85) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-4">
              13 · 14 · 15 de Marzo 2026
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-black text-cf-white leading-none mb-5">
              AGENDA
            </h1>
            <div className="w-16 h-1 bg-cf-yellow mx-auto mb-5" />
            <p className="text-cf-white/60 font-body text-base md:text-lg max-w-xl leading-relaxed">
              Centro Comercial La 14 · Pereira, Risaralda.<br />
              Programa pensado para que no te pierdas ni un momento.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="px-6 md:px-12 pb-20 pt-12 flex flex-col items-center">

        {/* ── Day tabs (fila horizontal centrada) ── */}
        <motion.div
          className="flex flex-row gap-3 mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {AGENDA.map((d, i) => (
            <button
              key={d.day}
              onClick={() => handleDayChange(i)}
              className={clsx(
                "px-7 py-3 rounded-2xl font-display font-bold text-sm transition-all duration-300 border text-left whitespace-nowrap",
                activeDay === i
                  ? "bg-cf-yellow text-cf-black border-cf-yellow shadow-lg shadow-cf-yellow/20"
                  : "bg-white/[0.05] border-white/10 text-white/60 hover:border-cf-yellow/30 hover:text-white hover:bg-white/[0.08]"
              )}
            >
              {d.day}
            </button>
          ))}
        </motion.div>

        {/* ── CardSwap centrado ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center"
          >
            {/* Count pill */}
            <div className="mb-10 flex items-center gap-3">
              <span className="font-display text-cf-white/40 text-sm font-semibold">
                {currentEvents.length} eventos · {AGENDA[activeDay].day}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cf-yellow" />
              <span className="font-body text-cf-white/30 text-xs">Auto-avanza cada 2s</span>
            </div>

            {/* Stack */}
            <div
              style={{
                height: "260px",
                width: "460px",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Stack
                cards={[...eventCards].reverse()}
                randomRotation={false}
                autoplay={true}
                pauseOnHover={false}
                sensitivity={200}
                autoplayDelay={1000}
                sendToBackOnClick={true}
              />
            </div>

            {/* Legend */}
            <div className="mt-20 flex flex-wrap gap-5 justify-center">
              {Object.entries(TYPE_COLORS).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2 text-xs font-body text-cf-white/40">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="capitalize">{type}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
