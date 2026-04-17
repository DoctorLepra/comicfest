"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, TrendingUp, Building2, Globe, Map } from "lucide-react";
import { EVENT } from "@/lib/constants";
import Squares from "@/components/ui/Squares";

const REASONS = [
  { icon: Users, title: "15.000+ visitantes", desc: "Accede a miles de clientes potenciales por edición" },
  { icon: TrendingUp, title: "120+ marcas", desc: "Forma parte del ecosistema de marcas de cultura pop más grande del país" },
  { icon: Globe, title: "11 ciudades", desc: "Expande tu presencia a nivel nacional con nosotros" },
  { icon: Building2, title: "Stands flexibles", desc: "Desde 6m² hasta 24m² para adaptarse a tu negocio" },
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

      {/* ── Reasons grid ── */}
      <div ref={ref} className="px-6 md:px-12 pt-24 pb-16 flex flex-col items-center">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass border border-cf-white/5 rounded-2xl p-8 hover:border-cf-yellow/20 transition-all duration-300 flex flex-col gap-5"
            >
              <div className="w-12 h-12 rounded-xl glass border border-cf-yellow/20 flex items-center justify-center shrink-0">
                <r.icon size={22} className="text-cf-yellow" />
              </div>
              <h3 className="font-display font-black text-cf-white">{r.title}</h3>
              <p className="text-cf-white/50 text-sm font-body leading-relaxed">{r.desc}</p>
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
