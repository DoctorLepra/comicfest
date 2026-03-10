"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { TICKETS, EVENT } from "@/lib/constants";

export default function EntradasPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-3">
            Pereira · Marzo 2026
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black text-cf-white mb-4">
            ENTRADAS
          </h1>
          <div className="w-16 h-1 bg-cf-yellow mx-auto mb-6" />
          <p className="text-cf-white/60 font-body text-base max-w-lg mx-auto">
            Elige tu tipo de entrada. Las boletas parche e individual son válidas para un día.
          </p>
        </motion.div>

        {/* Tickets grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {TICKETS.map((ticket, i) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative glass rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                ticket.badge === "POPULAR"
                  ? "border-2 border-cf-yellow ring-1 ring-cf-yellow/20"
                  : "border border-cf-white/8"
              }`}
            >
              {ticket.badge && (
                <div className={`py-2 text-center text-xs font-display font-black tracking-widest uppercase ${
                  ticket.badge === "POPULAR"
                    ? "bg-cf-yellow text-cf-black"
                    : ticket.badge === "PREMIUM"
                    ? "bg-gradient-to-r from-cf-yellow-dark to-cf-yellow text-cf-black"
                    : "bg-cf-gray text-cf-white"
                }`}>
                  {ticket.badge}
                </div>
              )}

              <div className="p-8">
                <h2 className="font-display text-xl font-black text-cf-white mb-1">
                  {ticket.name}
                </h2>
                <p className="text-cf-white/50 text-sm font-body mb-6">{ticket.description}</p>

                <div className="mb-8">
                  <span className="font-display text-4xl font-black text-gradient">
                    {ticket.priceLabel}
                  </span>
                  <span className="text-cf-white/40 text-sm font-body ml-2">COP</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {ticket.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-cf-white/60 text-sm font-body">
                      <Check
                        size={14}
                        className="text-cf-yellow shrink-0 mt-0.5"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/57${EVENT.whatsappTickets}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-display font-bold text-sm transition-all duration-200 hover:scale-105 ${
                    ticket.badge === "POPULAR"
                      ? "bg-cf-yellow text-cf-black hover:bg-cf-yellow-light"
                      : "border border-cf-yellow/30 text-cf-yellow hover:border-cf-yellow/60 hover:bg-cf-yellow/5"
                  }`}
                >
                  <MessageCircle size={16} />
                  Comprar por WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass border border-cf-yellow/15 rounded-2xl p-8 md:p-10"
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
