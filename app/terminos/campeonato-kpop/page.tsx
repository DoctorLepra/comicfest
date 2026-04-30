"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Trophy, Shield, Music, AlertCircle, Star, Users } from "lucide-react";
import Squares from "@/components/ui/Squares";

const SECTIONS = [
  {
    icon: Shield,
    title: "Reglas Generales",
    items: [
      "El campeonato está abierto a participantes de todas las edades.",
      "Los participantes pueden concursar de manera individual o en grupos (duetos o tríos).",
      "La inscripción es completamente gratuita.",
      "Cada grupo o participante individual puede presentar máximo una (1) coreografía.",
      "La música debe corresponder al género K-pop, incluyendo grupos de K-pop reconocidos o artistas solistas del mismo género.",
      "Los menores de edad deben contar con autorización escrita de su acudiente.",
      "El comité organizador se reserva el derecho de descalificar cualquier participante que incumpla estas normas.",
    ],
  },
  {
    icon: Music,
    title: "Modalidad de Presentación",
    items: [
      "La presentación coreográfica tiene una duración mínima de 1 minuto y máxima de 3 minutos.",
      "El participante/grupo debe entregar su música en USB en formato MP4 antes del inicio del evento.",
      "No se permiten canciones con contenido explícito o inapropiado para todo público.",
      "Está permitido el uso de outfits, accesorios y maquillaje relacionados con el mundo K-pop.",
      "Se dispondrá de un VideoWALL para proyección o efectos visuales durante la presentación.",
      "El escenario contará con iluminación y sistema de sonido profesional.",
    ],
  },
  {
    icon: Users,
    title: "Criterios de Evaluación",
    items: [
      "40% Sincronización: coordinación entre los miembros y precisión en los tiempos de la coreografía.",
      "30% Técnica y ejecución: dominio de los movimientos, limpieza y dificultad coreográfica.",
      "20% Presentación artística: vestuario, maquillaje, expresión facial y conexión con el público.",
      "10% Originalidad: interpretación propia o toques creativos que diferencien la presentación.",
      "El jurado estará conformado por expertos en cultura K-pop, danza y entretenimiento.",
      "El fallo del jurado es inapelable.",
    ],
  },
  {
    icon: Star,
    title: "Premiación",
    items: [
      "1er lugar: Premio mayor en efectivo y trofeo oficial ComicFest.",
      "2do lugar: Premio en efectivo y reconocimiento oficial.",
      "3er lugar: Premio en efectivo y reconocimiento oficial.",
      "Para hacer efectivo el pago, el ganador deberá presentar RUT y certificación bancaria vigente.",
      "El premio será entregado el mismo día del evento, tras el cierre oficial.",
      "ComicFest no se hace responsable por los costos de transporte, hospedaje o alimentación de los participantes.",
    ],
  },
];

export default function KpopTerminosPage() {
  return (
    <div className="min-h-screen" style={{ paddingTop: "80px" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ height: "300px" }}>
        <div className="absolute inset-0">
          <Squares
            direction="diagonal"
            speed={0.14}
            borderColor="rgba(245, 197, 0, 0.15)"
            squareSize={48}
            hoverFillColor="rgba(245, 197, 0, 0.06)"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.9) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-4">
              Comicfest Colombia · 2026
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-cf-white leading-none mb-4">
              TÉRMINOS Y CONDICIONES
            </h1>
            <div className="w-12 h-1 bg-cf-yellow mx-auto mb-4" />
            <p className="text-cf-yellow font-display font-bold text-lg tracking-wide">
              🎤 Campeonato K-pop
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contenido ── */}
      <div className="px-6 md:px-12 pt-12 pb-24 flex flex-col items-center">
        <div className="w-full max-w-4xl">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <Link
              href="/actividades/kpop"
              className="inline-flex items-center gap-2 font-display font-black text-sm px-5 py-3 rounded-xl transition-all hover:scale-[1.03]"
              style={{ backgroundColor: "rgba(245,197,0,0.15)", color: "#f5c500", border: "1px solid rgba(245,197,0,0.40)" }}
            >
              <ArrowLeft size={15} /> Volver a Campeonato K-pop
            </Link>
          </motion.div>

          {/* Intro card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass border border-cf-yellow/15 rounded-2xl px-8 py-6 mb-10 flex items-start gap-4"
          >
            <AlertCircle size={20} className="text-cf-yellow shrink-0 mt-0.5" />
            <p className="text-cf-white/70 font-body text-sm leading-relaxed">
              Al inscribirse en el <strong className="text-cf-white">Campeonato K-pop ComicFest 2026</strong>, el participante
              acepta todos los términos y condiciones descritos en este documento. La organización se reserva el derecho
              de modificar estas condiciones en cualquier momento, notificando con anticipación.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {SECTIONS.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass border border-cf-white/5 rounded-2xl p-8 hover:border-cf-yellow/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl glass border border-cf-yellow/20 flex items-center justify-center shrink-0">
                    <section.icon size={18} className="text-cf-yellow" />
                  </div>
                  <h2 className="font-display font-black text-cf-white text-lg">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-cf-white/60 font-body text-sm leading-relaxed">
                      <span className="text-cf-yellow font-black shrink-0 mt-0.5">{j + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-cf-white/25 text-xs font-body text-center mt-12"
          >
            ComicFest Colombia · Pereira 2026 · Todos los derechos reservados.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
