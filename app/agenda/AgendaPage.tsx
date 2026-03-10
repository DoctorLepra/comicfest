"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import clsx from "clsx";
import { AGENDA } from "@/lib/constants";

const TYPE_COLORS: Record<string, string> = {
  general: "#444444",
  especial: "#f5c500",
  torneo: "#00d4ff",
  competencia: "#ff6b9d",
  entretenimiento: "#ff4444",
};

export default function AgendaPage() {
  const [activeDay, setActiveDay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-3">
            13 · 14 · 15 de Marzo 2026
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black text-cf-white mb-4">
            AGENDA
          </h1>
          <div className="w-16 h-1 bg-cf-yellow mb-6" />
          <p className="text-cf-white/60 font-body text-lg">
            Centro Comercial La 14 · Pereira, Risaralda
          </p>
        </motion.div>

        {/* Day tabs */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {AGENDA.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(i)}
              className={clsx(
                "shrink-0 px-6 py-3 rounded-xl font-display font-bold text-sm transition-all duration-200",
                activeDay === i
                  ? "bg-cf-yellow text-cf-black"
                  : "glass border border-cf-white/10 text-cf-white/60 hover:border-cf-yellow/30 hover:text-cf-white"
              )}
            >
              {d.day}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cf-yellow/40 via-cf-yellow/20 to-transparent" />

          <div className="space-y-3 pl-16">
            {AGENDA[activeDay].events.map((event, i) => (
              <motion.div
                key={`${activeDay}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="relative glass border border-cf-white/5 rounded-xl px-6 py-4 hover:border-cf-yellow/20 transition-all duration-200"
              >
                {/* Dot */}
                <div
                  className="absolute -left-[2.3rem] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-cf-black"
                  style={{ backgroundColor: TYPE_COLORS[event.type] ?? "#444" }}
                />

                <div className="flex items-center gap-4">
                  <span className="font-display font-black text-cf-yellow text-sm w-12 shrink-0">
                    {event.time}
                  </span>
                  <div className="flex-1">
                    <p className="font-display font-semibold text-cf-white text-sm md:text-base">
                      {event.title}
                    </p>
                  </div>
                  <span
                    className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-display font-bold uppercase tracking-wide shrink-0"
                    style={{
                      color: TYPE_COLORS[event.type],
                      backgroundColor: `${TYPE_COLORS[event.type]}20`,
                    }}
                  >
                    {event.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap gap-4">
          {Object.entries(TYPE_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2 text-xs font-body text-cf-white/50">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
