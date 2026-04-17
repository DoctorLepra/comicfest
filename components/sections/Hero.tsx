"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
import dynamic from "next/dynamic";
import CountdownTimer from "@/components/ui/CountdownTimer";
import ScrollFloat from "@/components/ui/ScrollFloat";
import { EVENT } from "@/lib/constants";

const GridScan = dynamic(() => import("@/components/ui/GridScan"), { ssr: false });

export default function Hero() {
  return (
    <>
      {/* ══════════════════════════════════════════════
          GRIDSCAN — solo COMICFEST + ciudad
      ══════════════════════════════════════════════ */}
      <section className="relative h-screen flex flex-col items-center justify-center scanlines overflow-hidden">

        {/* GridScan background */}
        <div className="absolute inset-0">
          <GridScan
            linesColor="#3d2a5e"
            scanColor="#c9a227"
            scanOpacity={0.85}
            gridScale={0.12}
            lineThickness={1.2}
            lineJitter={0}
            scanDirection="pingpong"
            scanGlow={1.2}
            scanSoftness={2.5}
            scanDuration={2.5}
            scanDelay={0.5}
            enablePost={true}
            bloomIntensity={0.35}
            bloomThreshold={0.1}
            bloomSmoothing={0.3}
            chromaticAberration={0.0015}
            noiseIntensity={0.008}
            sensitivity={0.4}
            scanOnClick={true}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cf-black/50 via-cf-black/15 to-cf-black/60 pointer-events-none" />

        {/* Contenido central: ciudad + título */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">

          {/* City badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-3 glass border border-cf-yellow/30 rounded-full px-5 py-2.5 mb-28"
          >
            <span className="w-2 h-2 rounded-full bg-cf-yellow animate-pulse" />
            <span className="text-cf-yellow text-xs font-display font-semibold tracking-widest uppercase">
              {EVENT.city} · {EVENT.year}
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-cf-white leading-none tracking-tight"
            style={{ textShadow: "0 0 80px rgba(245,197,0,0.25)" }}
          >
            COMIC<span className="text-cf-yellow">FEST</span>
          </motion.h1>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cf-black to-transparent pointer-events-none" />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-cf-white/20 text-xs font-body tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-cf-yellow/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          DEBAJO DEL GRIDSCAN
      ══════════════════════════════════════════════ */}
      <section className="py-32 relative w-full bg-cf-black overflow-hidden">
        <div className="flex flex-col px-6 md:px-12 gap-24">

          {/* ── Tagline + Description ── */}
          <div className="flex flex-col items-center text-center gap-10">
            <ScrollFloat
              scrollStart="top bottom"
              scrollEnd="center center"
              scrub={2}
              containerClassName="font-display text-4xl sm:text-5xl md:text-6xl font-black text-cf-white leading-tight"
              charClassName=""
            >
              {EVENT.tagline}
            </ScrollFloat>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-20 h-1 bg-cf-yellow"
            />

            <ScrollFloat
              scrollStart="top 90%"
              scrollEnd="center center"
              scrub={2}
              containerClassName="font-display text-xl sm:text-2xl md:text-3xl font-black text-cf-yellow/60 leading-tight"
              charClassName=""
            >
              {EVENT.description}
            </ScrollFloat>
          </div>

          {/* Separador */}
          <div className="h-px bg-gradient-to-r from-transparent via-cf-yellow/20 to-transparent" />

          {/* ── Info del evento en 3 columnas ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-cf-white/5 rounded-2xl overflow-hidden"
          >
            {[
              { icon: Calendar, label: "Fechas", value: `${EVENT.dates}`, sub: String(EVENT.year) },
              { icon: MapPin, label: "Lugar", value: EVENT.venue, sub: EVENT.city },
              { icon: Clock, label: "Horario", value: `${EVENT.openingTime} – ${EVENT.lastEntry}`, sub: "Último ingreso" },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="flex flex-col items-center text-center px-8 py-10 bg-cf-black hover:bg-cf-yellow/5 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-cf-yellow/10 border border-cf-yellow/20 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-cf-yellow" />
                </div>
                <p className="text-cf-white/30 text-[10px] font-display font-bold tracking-widest uppercase mb-2">{label}</p>
                <p className="text-cf-white font-display font-black text-base leading-snug mb-1">{value}</p>
                <p className="text-cf-white/40 text-sm font-body">{sub}</p>
              </div>
            ))}
          </motion.div>

          {/* Separador */}
          <div className="h-px bg-gradient-to-r from-transparent via-cf-yellow/20 to-transparent" />

          {/* ── Countdown ── */}
          <div className="flex flex-col items-center text-center gap-10">
            <ScrollFloat
              scrollStart="top 85%"
              scrollEnd="center center"
              scrub={2}
              containerClassName="text-cf-white/30 text-xs font-body uppercase tracking-[0.4em]"
              charClassName=""
            >
              El evento comienza en
            </ScrollFloat>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <CountdownTimer targetDate={EVENT.startDate} />
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}

