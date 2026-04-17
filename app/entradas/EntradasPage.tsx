"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { TICKETS, EVENT } from "@/lib/constants";
import Squares from "@/components/ui/Squares";
import SpotlightCard from "@/components/ui/SpotlightCard";

const TICKET_COLORS: Record<string, { spotlight: `rgba(${number}, ${number}, ${number}, ${number})`; border: string; glow: string; badge: string }> = {
  general: {
    spotlight: "rgba(136, 136, 136, 0.18)",
    border: "rgba(136,136,136,0.2)",
    glow: "rgba(136,136,136,0.08)",
    badge: "",
  },
  parche: {
    spotlight: "rgba(245, 197, 0, 0.22)",
    border: "rgba(245,197,0,0.5)",
    glow: "rgba(245,197,0,0.12)",
    badge: "POPULAR",
  },
  fullpass: {
    spotlight: "rgba(0, 212, 255, 0.18)",
    border: "rgba(0,212,255,0.28)",
    glow: "rgba(0,212,255,0.10)",
    badge: "PREMIUM",
  },
};

export default function EntradasPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen" style={{ paddingTop: "120px" }}>

      {/* ── Hero header con Squares background (igual que Agenda) ── */}
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
              Pereira · Marzo 2026
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-black text-cf-white leading-none mb-8">
              ENTRADAS
            </h1>
            <div className="w-16 h-1 bg-cf-yellow mx-auto mb-8" />
            <p className="text-cf-white/60 font-body text-base md:text-lg max-w-xl leading-relaxed">
              Elige tu tipo de entrada. Las boletas parche e individual son válidas para un día.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contenido centrado ── */}
      <div ref={ref} className="px-6 md:px-12 pb-32 pt-24 flex flex-col items-center">

        {/* Tickets grid */}
        <div className="grid md:grid-cols-3 gap-10 w-full max-w-5xl mb-24">
          {TICKETS.map((ticket, i) => {
            const colors = TICKET_COLORS[ticket.id] ?? TICKET_COLORS.general;
            const isPopular = ticket.badge === "POPULAR";

            return (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className={isPopular ? "md:-mt-4 md:mb-4" : ""}
              >
                <SpotlightCard
                  spotlightColor={colors.spotlight}
                  className="h-full rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(20,20,20,0.97) 0%, rgba(30,30,30,0.95) 100%)",
                    border: `${isPopular ? "2px" : "1px"} solid ${colors.border}`,
                    boxShadow: `0 0 36px ${colors.glow}`,
                  }}
                >
                  {/* Badge top bar */}
                  {ticket.badge && (
                    <div
                      className={`py-2 text-center text-xs font-display font-black tracking-widest uppercase ${isPopular
                          ? "bg-cf-yellow text-cf-black"
                          : "bg-gradient-to-r from-cf-yellow-dark to-cf-yellow text-cf-black"
                        }`}
                    >
                      {ticket.badge}
                    </div>
                  )}

                  <div className="p-10 md:p-12">
                    <h2 className="font-display text-xl font-black text-cf-white mb-2">
                      {ticket.name}
                    </h2>
                    <p className="text-cf-white/50 text-sm font-body mb-10">
                      {ticket.description}
                    </p>

                    <div className="mb-12">
                      <span className="font-display text-4xl font-black text-gradient">
                        {ticket.priceLabel}
                      </span>
                      <span className="text-cf-white/40 text-sm font-body ml-2">COP</span>
                    </div>

                    <ul className="space-y-4 mb-12">
                      {ticket.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-cf-white/60 text-sm font-body">
                          <Check size={14} className="text-cf-yellow shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`https://wa.me/57${EVENT.whatsappTickets}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full flex items-center justify-center gap-2 py-5 rounded-xl font-display font-bold text-sm transition-all duration-200 hover:scale-105 ${isPopular
                          ? "bg-cf-yellow text-cf-black hover:bg-cf-yellow-light"
                          : "border border-cf-yellow/30 text-cf-yellow hover:border-cf-yellow/60 hover:bg-cf-yellow/5"
                        }`}
                    >
                      <MessageCircle size={16} />
                      Comprar por WhatsApp
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass border border-cf-yellow/15 rounded-2xl p-10 md:p-14 w-full max-w-5xl"
        >
          <h3 className="font-display text-xl font-black text-cf-white mb-4">
            Información importante
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-cf-white/60 font-body text-sm">
            <p>✓ Las boletas parche e individual son válidas por un día</p>
            <p>✓ Apertura: 10:30 am — Último ingreso: 7:30 pm</p>
            <p>✓ Pagan entrada a partir de los 3 años de edad</p>
            <p>✓ Menores de 3 años presentar registro civil</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
