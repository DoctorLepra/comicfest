"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Music, ArrowRight } from "lucide-react";
import Squares from "@/components/ui/Squares";

const EVENTOS = [
  {
    icon: Shield,
    emoji: "🏆",
    title: "Copa Cosplay",
    description:
      "Reglas generales, modalidad de presentación, criterios de evaluación y premiación del concurso de cosplay.",
    href: "/terminos/copa-cosplay",
    color: "rgba(245,197,0,0.12)",
    border: "rgba(245,197,0,0.25)",
  },
  {
    icon: Music,
    emoji: "🎤",
    title: "Campeonato K-pop",
    description:
      "Reglas generales, modalidad de presentación, criterios de evaluación y premiación del campeonato de K-pop.",
    href: "/terminos/campeonato-kpop",
    color: "rgba(245,197,0,0.08)",
    border: "rgba(245,197,0,0.18)",
  },
];

export default function TerminosIndexPage() {
  return (
    <div className="min-h-screen" style={{ paddingTop: "80px" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ height: "280px" }}>
        <div className="absolute inset-0">
          <Squares
            direction="diagonal"
            speed={0.12}
            borderColor="rgba(245, 197, 0, 0.12)"
            squareSize={48}
            hoverFillColor="rgba(245, 197, 0, 0.05)"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.95) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-4">
              Comicfest Colombia · 2026
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-cf-white leading-none mb-4">
              TÉRMINOS Y CONDICIONES
            </h1>
            <div className="w-12 h-1 bg-cf-yellow mx-auto mb-4" />
            <p className="text-cf-white/50 font-body text-sm">
              Selecciona el evento del que deseas consultar los términos
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Cards ── */}
      <div className="px-6 md:px-12 pt-12 pb-24 flex flex-col items-center gap-6">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {EVENTOS.map((ev, i) => (
            <motion.div
              key={ev.href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <Link
                href={ev.href}
                className="group block glass rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor: ev.border }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: ev.color, border: `1px solid ${ev.border}` }}
                    >
                      {ev.emoji}
                    </div>
                    <div>
                      <h2 className="font-display font-black text-cf-white text-xl mb-1 group-hover:text-cf-yellow transition-colors duration-200">
                        {ev.title}
                      </h2>
                      <p className="text-cf-white/50 font-body text-sm leading-relaxed">
                        {ev.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-cf-yellow/40 group-hover:text-cf-yellow group-hover:translate-x-1 transition-all duration-200 shrink-0"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-cf-white/20 text-xs font-body text-center mt-8"
        >
          ComicFest Colombia · Pereira 2026 · Todos los derechos reservados.
        </motion.p>
      </div>
    </div>
  );
}
