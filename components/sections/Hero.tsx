"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, Clock } from "lucide-react";
import dynamic from "next/dynamic";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { EVENT } from "@/lib/constants";

// GridScan uses browser APIs (WebGL) — must be client-only
const GridScan = dynamic(() => import("@/components/ui/GridScan"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center scanlines">
      {/* GridScan background — React Bits original, colores Comicfest */}
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
          scanPhaseTaper={0.15}
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

      {/* Overlay: mejora legibilidad del texto sobre el grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-cf-black/55 via-cf-black/20 to-cf-black pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <Image
            src="/images/logoCF.png"
            alt="Comicfest Colombia"
            width={600}
            height={300}
            className="object-contain drop-shadow-[0_0_60px_rgba(245,197,0,0.45)] w-[280px] sm:w-[400px] md:w-[520px] lg:w-[600px]"
            priority
          />
        </motion.div>

        {/* Badge — below logo, above subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="inline-flex items-center gap-2 glass border border-cf-yellow/30 rounded-full px-4 py-2 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cf-yellow animate-pulse" />
          <span className="text-cf-yellow text-xs font-display font-semibold tracking-widest uppercase">
            Pereira · Marzo 2026
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-cf-white/60 font-body text-base md:text-lg max-w-xl mx-auto mb-10"
        >
          La convención de cultura pop más grande de Colombia. Cómics, videojuegos,
          cosplay, torneos y mucho más.
        </motion.p>

        {/* Event info chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <div className="flex items-center gap-1.5 glass border border-cf-white/10 rounded-full px-4 py-2 text-cf-white/60 text-sm font-body">
            <Calendar size={14} className="text-cf-yellow" />
            13, 14 y 15 de Marzo 2026
          </div>
          <div className="flex items-center gap-1.5 glass border border-cf-white/10 rounded-full px-4 py-2 text-cf-white/60 text-sm font-body">
            <MapPin size={14} className="text-cf-yellow" />
            C.C. La 14 · Pereira
          </div>
          <div className="flex items-center gap-1.5 glass border border-cf-white/10 rounded-full px-4 py-2 text-cf-white/60 text-sm font-body">
            <Clock size={14} className="text-cf-yellow" />
            10:30 am – 7:30 pm
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-cf-white/30 text-xs font-body uppercase tracking-[0.3em]">El evento comienza en</p>
          <CountdownTimer targetDate={EVENT.startDate} />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cf-black to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-cf-white/20 text-xs font-body tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-cf-yellow/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
