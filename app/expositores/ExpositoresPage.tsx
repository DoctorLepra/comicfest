"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Map } from "lucide-react";
import Image from "next/image";
import { EVENT } from "@/lib/constants";
import Squares from "@/components/ui/Squares";

const METRICS = [
  {
    title: "250K+",
    desc: "Asistentes al rededor del pais",
    image: "/images/asistentes.png",
  },
  {
    title: "11",
    desc: "Ciudades recorridas",
    image: "/images/ciudades.png",
  },
  {
    title: "57K+",
    desc: "Seguidores en Instagram.",
    image: "/images/seguidores.png",
  },
  {
    title: "120+",
    desc: "Marcas convocadas a nivel nacional",
    image: "/images/marcas-convocadas.png",
  }
];

export default function ExpositoresPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen" style={{ paddingTop: "120px" }}>

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
        {/* Gradient overlay */}
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
            <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-6">
              Para marcas y emprendedores
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-black text-cf-white leading-none mb-8">
              EXPOSITORES
            </h1>
            <div className="w-16 h-1 bg-cf-yellow mx-auto mb-8" />
            <p className="text-cf-white/60 font-body text-base md:text-lg max-w-xl leading-relaxed">
              ¿Tienes una marca relacionada a la cultura pop? Comicfest es tu plataforma ideal para conectar con tu audiencia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Back link ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Link
                href="/"
                className="inline-flex items-center gap-2 font-display font-black text-sm px-5 py-3 rounded-xl transition-all hover:scale-[1.03]"
                style={{ backgroundColor: "rgba(245,197,0,0.15)", color: "#f5c500", border: "1px solid rgba(245,197,0,0.40)" }}
            >
                <ArrowLeft size={15} /> Volver al inicio
            </Link>
        </motion.div>
      </div>

      {/* ── Metrics grid ── */}
      <div ref={ref} className="px-6 md:px-12 pt-28 pb-16 flex flex-col items-center overflow-hidden">
        
        {/* Title: NUESTRAS METRICAS with side lines */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center w-full max-w-6xl mb-16 gap-6"
        >
          <div className="h-[2px] bg-white/20 flex-1"></div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-cf-yellow tracking-tight uppercase whitespace-nowrap">
            NUESTRAS METRICAS
          </h2>
          <div className="h-[2px] bg-white/20 flex-1"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full max-w-7xl">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[440px] md:h-[500px] w-full rounded-[32px] overflow-hidden group border border-white/10 mx-auto max-w-[340px] sm:max-w-none"
              style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
            >
              {/* Background Image */}
              <Image 
                src={m.image}
                alt={m.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              
              {/* Dark gradient overlay for text readability */}
              <div 
                className="absolute inset-0"
                style={{ 
                  background: "linear-gradient(to top, rgba(15,15,15,0.98) 0%, rgba(15,15,15,0.6) 35%, transparent 100%)" 
                }}
              />
              
              {/* Content positioned at bottom */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-center z-10 transition-transform duration-500 group-hover:-translate-y-3">
                  <h3 
                    className="font-display text-[54px] leading-[1.1] font-black mb-3 drop-shadow-2xl"
                    style={{ color: "#f5c500" }}
                  >
                    {m.title}
                  </h3>
                  <p className="font-display font-black text-cf-white text-lg md:text-xl leading-tight drop-shadow-xl w-[90%] mx-auto">
                    {m.desc}
                  </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA section ── */}
      <div className="px-6 md:px-12 pb-32 pt-16 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass border border-cf-yellow/20 rounded-2xl p-12 md:p-20 w-full max-w-5xl mb-12 flex flex-col items-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-black text-cf-white mb-8 text-center">
            ¿LISTO PARA RESERVAR TU STAND?
          </h2>
          <p className="text-cf-white/60 font-body text-base max-w-xl mb-12 text-center">
            Accede a nuestra plataforma de expositores para seleccionar tu stand de forma visual e interactiva en el mapa del evento.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/login"
              className="flex items-center gap-2 bg-cf-yellow text-cf-black font-display font-black px-10 py-5 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-105 text-sm"
            >
              <Map size={18} />
              Ver mapa y reservar stand
              <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/57${EVENT.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-cf-yellow/30 text-cf-yellow font-display font-bold px-10 py-5 rounded-xl hover:border-cf-yellow/60 transition-all duration-200 text-sm"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </motion.div>

        <p className="text-cf-white/30 text-xs font-body text-center mt-6">
          Horario de atención comercial: Lunes a Viernes 9:00 am – 12:30 pm y 1:30 pm – 5:30 pm · WhatsApp: {EVENT.whatsapp}
        </p>
      </div>
    </div>
  );
}
