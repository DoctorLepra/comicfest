"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Map, UserPlus, ArrowDown, Clock, MapPin, Calendar } from "lucide-react";
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const scrollToMetrics = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: "120px" }}>

      {/* ── Hero header con Squares background ── */}
      <section className="relative overflow-hidden" style={{ height: "580px" }}>
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
        <div className="relative z-10 h-full flex flex-col items-center justify-start pt-32 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-6">
              Para marcas y emprendedores
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none text-white drop-shadow-2xl">
              EXPOSITORES
            </h1>

            {/* ── Copa Cosplay Style Replacement ── */}
            <div className="flex flex-col items-center mt-12 text-center">
              <p className="text-white font-display font-bold text-lg max-w-xl mx-auto activity-header-spacing text-center">
                ¿Tienes una marca relacionada a la cultura pop? Comicfest es tu plataforma ideal para conectar con tu audiencia.
              </p>

              <div className="activity-button-spacing flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/registro"
                  className="flex items-center gap-2 bg-cf-yellow text-cf-black font-display font-black px-8 py-4 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-105 text-sm uppercase tracking-wider"
                >
                  <UserPlus size={18} />
                  REGISTRARSE
                </Link>
                <button
                  onClick={scrollToMetrics}
                  className="flex items-center gap-2 border border-cf-yellow/30 text-cf-yellow font-display font-bold px-8 py-4 rounded-xl hover:border-cf-yellow/60 transition-all duration-200 text-sm"
                >
                  <ArrowDown size={18} />
                  VER MÁS
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Back link ── */}
      <div className="px-6 md:px-12 pt-10 pb-2 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="h-[46px] w-full" />
        </div>
      </div>

      {/* ── Metrics grid ── */}
      <div id="metricas" ref={ref} className="px-6 md:px-12 pt-28 pb-16 flex flex-col items-center overflow-hidden">

        {/* Title: NUESTRAS METRICAS with side lines */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center w-full max-w-4xl mb-16 gap-6"
        >
          <div className="h-[2px] bg-white/20 flex-1"></div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-cf-yellow tracking-tight uppercase whitespace-nowrap">
            NUESTRAS METRICAS
          </h2>
          <div className="h-[2px] bg-white/20 flex-1"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full max-w-4xl">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[280px] md:h-[340px] w-full rounded-2xl overflow-hidden group border border-white/10 mx-auto max-w-[340px] sm:max-w-none"
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
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-center z-10 transition-transform duration-500 group-hover:-translate-y-3">
                <h3
                  className="font-display text-4xl leading-[1.1] font-black mb-3 drop-shadow-2xl"
                  style={{ color: "#f5c500" }}
                >
                  {m.title}
                </h3>
                <p className="font-display font-black text-cf-white text-sm md:text-base leading-tight drop-shadow-xl w-[90%] mx-auto">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA / Próximas Ciudades ── */}
      <div className="px-6 md:px-12 pb-32 pt-16 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header-spacing w-full max-w-4xl"
        >
          <h2 className="font-display text-3xl md:text-4xl font-black text-cf-yellow tracking-tight text-center uppercase m-0">
            RESERVA TU STAND
          </h2>
          <p className="text-cf-white/60 font-body text-base max-w-2xl text-center m-0">
            Acompáñanos en las próximas ediciones de la convención de cultura pop más grande de la región. Selecciona tu ciudad y visibiliza tu marca ante miles de asistentes.
          </p>
        </motion.div>

        <div className="flex flex-col gap-10 w-full max-w-5xl mb-12">
          {/* Card Cali */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="group relative rounded-2xl overflow-hidden h-[380px] w-full border border-white/5"
            style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}
          >
            <Image
              src="/images/cali.png"
              alt="Cali"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Dark overlay covering the whole card for center-text readability */}
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:bg-black/80" />

            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col items-center justify-center text-center gap-4 z-10 w-full h-full">
              {/* Top Pill */}
              <div className="bg-cf-yellow text-cf-black font-display font-extrabold px-4 py-1.5 rounded-full text-xs flex items-center gap-2 drop-shadow-md">
                <Clock size={14} /> 85 días para el evento
              </div>

              <div className="flex flex-col items-center">
                <h3 className="font-display text-4xl sm:text-5xl font-black text-white uppercase drop-shadow-2xl m-0 mb-1">COMICFEST CALI 2026</h3>
                <p className="text-white/90 font-body text-sm sm:text-base font-medium m-0 tracking-wide">vie, 17 de jul | Centro Comercial La 14 Calima</p>
              </div>

              {/* Location & Date block with background watermark */}
              <div className="relative flex flex-col items-center gap-1 my-4">
                <div className="absolute inset-0 flex items-center justify-center opacity-30 select-none -z-10 pointer-events-none">
                  <span className="font-display text-6xl sm:text-8xl font-black text-cf-yellow uppercase tracking-tight">CALI</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-cf-yellow font-bold drop-shadow-md">
                  <MapPin size={16} className="text-pink-500" /> Cali, Colombia
                </div>
                <div className="flex items-center gap-2 text-sm text-white font-medium drop-shadow-md">
                  <Calendar size={16} className="text-blue-400" /> 17-18-19-20 Julio
                </div>
              </div>

              <p className="text-white/80 font-body text-sm max-w-2xl leading-relaxed drop-shadow-md m-0 mb-4">
                El cómic, anime, superhéroes, videojuegos y K-pop!<br />
                Tres días llenos de experiencias, concursos, shows, cosplay, zonas gamer, artistas invitados y mucha cultura pop.
              </p>

              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-cf-yellow text-cf-black font-display font-black px-10 py-4 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-[1.02] text-sm uppercase tracking-wider"
              >
                RESERVA TU STAND
              </Link>
            </div>
          </motion.div>

          {/* Card Armenia */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="group relative rounded-2xl overflow-hidden h-[380px] w-full border border-white/5"
            style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}
          >
            <Image
              src="/images/armenia.png"
              alt="Armenia"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Dark overlay covering the whole card for center-text readability */}
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:bg-black/80" />

            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col items-center justify-center text-center gap-4 z-10 w-full h-full">
              {/* Top Pill */}
              <div className="bg-cf-yellow text-cf-black font-display font-extrabold px-4 py-1.5 rounded-full text-xs flex items-center gap-2 drop-shadow-md">
                <Clock size={14} /> 71 días para el evento
              </div>

              <div className="flex flex-col items-center">
                <h3 className="font-display text-4xl sm:text-5xl font-black text-white uppercase drop-shadow-2xl m-0 mb-1">COMICFEST ARMENIA 2026</h3>
                <p className="text-white/90 font-body text-sm sm:text-base font-medium m-0 tracking-wide">vie, 03 de jul | Centro Cultural Metropolitano de Convenc</p>
              </div>

              {/* Location & Date block with background watermark */}
              <div className="relative flex flex-col items-center gap-1 my-4">
                <div className="absolute inset-0 flex items-center justify-center opacity-30 select-none -z-10 pointer-events-none">
                  <span className="font-display text-6xl sm:text-8xl font-black text-cf-yellow uppercase tracking-tight">ARMENIA</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-cf-yellow font-bold drop-shadow-md">
                  <MapPin size={16} className="text-pink-500" /> Armenia, Colombia
                </div>
                <div className="flex items-center gap-2 text-sm text-white font-medium drop-shadow-md">
                  <Calendar size={16} className="text-blue-400" /> 03, 04 y 05 de Julio
                </div>
              </div>

              <p className="text-white/80 font-body text-sm max-w-2xl leading-relaxed drop-shadow-md m-0 mb-4">
                ¡Llega a Pereira el evento que reúne lo mejor del cómic, anime, superhéroes, videojuegos y K-pop!<br />
                Tres días llenos de experiencias, concursos, shows, cosplay, zonas gamer, artistas invitados y mucha cultura pop.
              </p>

              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-cf-yellow text-cf-black font-display font-black px-10 py-4 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-[1.02] text-sm uppercase tracking-wider"
              >
                RESERVA TU STAND
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Info & Soporte */}
        <div className="flex flex-col items-center gap-6 mt-4">
          <a
            href={`https://wa.me/57${EVENT.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-cf-yellow/30 text-cf-yellow font-display font-bold px-10 py-4 rounded-xl hover:border-cf-yellow/60 transition-all duration-200 text-sm uppercase tracking-wider bg-cf-yellow/5"
          >
            ¿Tienes dudas? Contactar por WhatsApp
          </a>

          <p className="text-cf-white/30 text-xs font-body text-center">
            Horario de atención comercial: Lunes a Viernes 9:00 am – 12:30 pm y 1:30 pm – 5:30 pm · WhatsApp: {EVENT.whatsapp}
          </p>
        </div>
      </div>
    </div>
  );
}
