"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
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

        {/* Contenido central: Ciudad y Evento */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">
          {/* City - El Título Principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black italic text-cf-white tracking-tighter uppercase leading-none drop-shadow-2xl">
              {EVENT.city}
            </h1>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="h-px w-12 bg-cf-yellow/50" />
              <span className="text-cf-yellow text-sm font-display font-bold tracking-[0.4em] uppercase">
                {EVENT.year}
              </span>
              <div className="h-px w-12 bg-cf-yellow/50" />
            </div>
          </motion.div>



          {/* Dates and Venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-wrap justify-center gap-8 mb-16"
          >
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-cf-yellow" />
              <span className="text-cf-white font-display font-black text-lg tracking-widest uppercase">{EVENT.dates}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-cf-yellow" />
              <span className="text-cf-white font-display font-black text-lg tracking-widest uppercase">{EVENT.venue}</span>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <p className="text-cf-white/30 text-[10px] font-display font-bold tracking-[0.4em] uppercase hero-countdown-spacing">El evento comienza en</p>
            <CountdownTimer targetDate={EVENT.startDate} />
          </motion.div>
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
          <span className="text-cf-white/20 text-xs font-display tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-cf-yellow/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          DEBAJO DEL GRIDSCAN — Más detalles
      ══════════════════════════════════════════════ */}
      <section className="py-20 relative w-full bg-cf-black overflow-hidden">
        <div className="flex flex-col px-6 md:px-12 gap-24">

          {/* ── Info del evento adicional o llamada a la acción ── */}
          <div className="flex flex-col items-center text-center gap-10">
            <ScrollFloat
              scrollStart="top bottom"
              scrollEnd="center center"
              scrub={2}
              containerClassName="font-display text-4xl sm:text-5xl md:text-6xl font-black text-cf-white leading-tight uppercase"
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-4xl"
            >
              <p className="font-display text-cf-white/80 text-lg md:text-xl leading-relaxed uppercase">
                {EVENT.description}
              </p>
            </motion.div>
          </div>

          {/* Separador */}
          <div className="h-px bg-gradient-to-r from-transparent via-cf-yellow/20 to-transparent" />

          {/* Aquí podrías añadir más contenido si es necesario */}
        </div>
      </section>
    </>
  );
}

