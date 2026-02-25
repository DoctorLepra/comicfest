"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, TrendingUp, Building2, Globe, Map } from "lucide-react";
import { EVENT } from "@/lib/constants";

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
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-3">
            Para marcas y emprendedores
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black text-cf-white mb-4">
            EXPOSITORES
          </h1>
          <div className="w-16 h-1 bg-cf-yellow mb-6" />
          <p className="text-cf-white/60 font-body text-lg max-w-2xl leading-relaxed">
            ¿Tienes una marca relacionada a la cultura pop? Comicfest es tu plataforma ideal para conectar con tu audiencia.
          </p>
        </motion.div>

        {/* Reasons grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass border border-cf-white/5 rounded-2xl p-6 hover:border-cf-yellow/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl glass border border-cf-yellow/20 flex items-center justify-center mb-4">
                <r.icon size={22} className="text-cf-yellow" />
              </div>
              <h3 className="font-display font-black text-cf-white mb-1">{r.title}</h3>
              <p className="text-cf-white/50 text-sm font-body">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass border border-cf-yellow/20 rounded-2xl p-10 md:p-14 text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-black text-cf-white mb-4">
            ¿LISTO PARA RESERVAR TU STAND?
          </h2>
          <p className="text-cf-white/60 font-body text-base max-w-xl mx-auto mb-8">
            Accede a nuestra plataforma de expositores para seleccionar tu stand de forma visual e interactiva en el mapa del evento.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/expositores/reserva"
              className="flex items-center gap-2 bg-cf-yellow text-cf-black font-display font-black px-8 py-4 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-105 text-sm"
            >
              <Map size={18} />
              Ver mapa y reservar stand
              <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/57${EVENT.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-cf-yellow/30 text-cf-yellow font-display font-bold px-8 py-4 rounded-xl hover:border-cf-yellow/60 transition-all duration-200 text-sm"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </motion.div>

        <p className="text-cf-white/30 text-xs font-body text-center">
          Horario de atención comercial: Lunes a Viernes 9:00 am – 12:30 pm y 1:30 pm – 5:30 pm · WhatsApp: {EVENT.whatsapp}
        </p>
      </div>
    </div>
  );
}
