"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Clock } from "lucide-react";
import LaserFlow from "@/components/ui/LaserFlow";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { EVENT } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden scanlines">
      {/* LaserFlow background */}
      <div className="absolute inset-0">
        <LaserFlow hue={48} speed={1.5} count={8} opacity={0.6} />
      </div>

      {/* Deep gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cf-black/50 via-transparent to-cf-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-cf-black/30 via-transparent to-cf-black/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 glass border border-cf-yellow/30 rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cf-yellow animate-pulse" />
          <span className="text-cf-yellow text-xs font-display font-semibold tracking-widest uppercase">
            Pereira · Marzo 2026
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="font-display font-black text-cf-white leading-[0.9] tracking-tight">
            <span className="block text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] text-cf-white">
              COMIC
            </span>
            <span className="block text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] text-gradient">
              FEST
            </span>
          </h1>
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

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/entradas"
            className="group flex items-center gap-2 bg-cf-yellow text-cf-black font-display font-black text-base px-8 py-4 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Comprar Entradas
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/actividades"
            className="flex items-center gap-2 border border-cf-yellow/30 text-cf-white font-display font-bold text-base px-8 py-4 rounded-xl hover:border-cf-yellow/60 hover:text-cf-yellow transition-all duration-200"
          >
            Ver Actividades
          </Link>
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
