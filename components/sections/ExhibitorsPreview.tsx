"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, TrendingUp, Users } from "lucide-react";

const PERKS = [
  {
    icon: Users,
    title: "15.000+",
    description: "Visitantes potenciales por edición",
  },
  {
    icon: TrendingUp,
    title: "120+ Marcas",
    description: "Expositores convocados a nivel nacional",
  },
  {
    icon: Building2,
    title: "11 Ciudades",
    description: "Presencia en todo Colombia",
  },
];

export default function ExhibitorsPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Yellow accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cf-yellow/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-3">
              Para expositores
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-cf-white mb-8">
              LLEVA TU MARCA<br />
              <span className="text-gradient">AL SIGUIENTE NIVEL</span>
            </h2>
            <p className="text-cf-white/60 font-body text-base leading-relaxed mb-8">
              ¿Tienes una marca relacionada a la cultura pop? En Comicfest
              tendrás acceso a más de 15.000 usuarios potenciales por edición.
              Regístrate en nuestra plataforma y reserva tu stand de forma fácil
              y rápida.
            </p>

            {/* Perks */}
            <div className="space-y-4 mb-10">
              {PERKS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl glass border border-cf-yellow/20 flex items-center justify-center shrink-0">
                    <p.icon size={20} className="text-cf-yellow" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-cf-white text-sm">{p.title}</p>
                    <p className="text-cf-white/50 text-xs font-body">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <Link
                href="/expositores"
                className="flex items-center gap-2 bg-cf-yellow text-cf-black font-display font-black px-6 py-3 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-105 text-sm"
              >
                Ser Expositor
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/expositores/reserva"
                className="flex items-center gap-2 border border-cf-yellow/30 text-cf-yellow font-display font-bold px-6 py-3 rounded-xl hover:border-cf-yellow/60 transition-all duration-200 text-sm"
              >
                Ver mapa de stands
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Right: decorative stand map preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative"
          >
            <div className="glass border border-cf-yellow/15 rounded-3xl p-8 md:p-10 relative overflow-hidden">
              {/* Grid of stands */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {[...Array(30)].map((_, i) => {
                  const isReserved = [2, 5, 8, 11, 14, 17, 21, 25].includes(i);
                  const isPremium = [3, 9, 16, 22].includes(i);
                  return (
                    <div
                      key={i}
                      className={`rounded aspect-square flex items-center justify-center text-[9px] font-display font-bold transition-all duration-200 ${
                        isReserved
                          ? "bg-cf-white/5 border border-cf-white/10 text-cf-white/20"
                          : isPremium
                          ? "bg-cf-yellow/20 border border-cf-yellow/50 text-cf-yellow animate-pulse-glow"
                          : "bg-cf-yellow/8 border border-cf-yellow/20 text-cf-yellow/60 hover:bg-cf-yellow/15 cursor-pointer"
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex gap-4 flex-wrap mt-4">
                <div className="flex items-center gap-1.5 text-xs font-body text-cf-white/50">
                  <div className="w-3 h-3 rounded bg-cf-yellow/8 border border-cf-yellow/20" />
                  Disponible
                </div>
                <div className="flex items-center gap-1.5 text-xs font-body text-cf-white/50">
                  <div className="w-3 h-3 rounded bg-cf-yellow/20 border border-cf-yellow/50" />
                  Premium
                </div>
                <div className="flex items-center gap-1.5 text-xs font-body text-cf-white/50">
                  <div className="w-3 h-3 rounded bg-cf-white/5 border border-cf-white/10" />
                  Reservado
                </div>
              </div>

              <p className="text-cf-white/30 text-xs font-body mt-4 text-center">
                Visualización previa — Accede para ver el mapa completo
              </p>

              {/* Overlay CTA */}
              <div className="absolute inset-0 flex items-center justify-center bg-cf-black/60 backdrop-blur-sm rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Link
                  href="/expositores/reserva"
                  className="bg-cf-yellow text-cf-black font-display font-black px-6 py-3 rounded-xl text-sm hover:bg-cf-yellow-light transition-all"
                >
                  Reservar mi stand →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
