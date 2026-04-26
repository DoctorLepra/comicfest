"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Squares from "@/components/ui/Squares";
import Link from "next/link";
import { Send, CheckCircle, ArrowLeft, ChevronDown } from "lucide-react";

export default function PrensaPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const accentColor = "#f5c500";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: "80px" }}>
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
            <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-4">
              Medios y comunicación
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none text-white drop-shadow-2xl">
              PRENSA
            </h1>

            {/* ── Copa Cosplay Style Replacement ── */}
            <div className="flex flex-col items-center mt-12 text-center">
              <p className="text-white font-display font-bold text-lg max-w-xl mx-auto activity-header-spacing text-center">
                Si tienes un medio de comunicación o eres creador de contenido, puedes ayudarnos a que cada vez seamos más los que hacemos parte del universo Comicfest.
              </p>
              
              <div className="activity-button-spacing">
                <a
                  href="#formulario"
                  className="inline-flex items-center gap-2 bg-cf-yellow text-cf-black font-display font-black px-8 py-4 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-105 text-sm uppercase tracking-wider"
                >
                  Regístrate Ahora
                  <Send size={16} />
                </a>
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

      {/* ── Formulario de registro ── */}
      <div id="formulario" className="px-6 md:px-12 pb-24 pt-16 flex flex-col items-center scroll-mt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          {sent ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
              <div
                className="w-full max-w-md rounded-2xl p-10 flex flex-col items-center text-center gap-5"
                style={{
                  background: "linear-gradient(135deg, rgba(18,18,18,0.99) 0%, rgba(28,28,28,0.97) 100%)",
                  border: `1px solid ${accentColor}40`,
                  boxShadow: `0 0 60px ${accentColor}18, 0 24px 48px rgba(0,0,0,0.6)`,
                }}
              >
                <CheckCircle size={56} style={{ color: accentColor }} />
                <div>
                  <h3 className="font-display text-2xl font-black text-white modal-text-spacing mb-6 uppercase">¡REGISTRO ENVIADO!</h3>
                  <p className="text-white/55 font-body text-sm leading-relaxed">
                    Tu registro ha sido enviado exitosamente. Nos contactaremos contigo por <strong className="text-green-400">WhatsApp</strong> para confirmar tu acreditación de prensa.
                  </p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-display font-black text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
                  style={{ backgroundColor: accentColor, color: "#0a0a0a" }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-7 md:p-10 flex flex-col gap-6"
              style={{
                background: "rgba(20,20,20,0.97)",
                border: `1px solid ${accentColor}30`,
                boxShadow: `0 0 32px ${accentColor}12`,
              }}
            >
              <div className="flex flex-col items-center text-center">
                <h3 className="font-display text-2xl font-black text-white mb-1">¡REGÍSTRATE!</h3>
                <p className="text-white/40 text-sm font-body">Completa tus datos para solicitar acreditación de prensa.</p>
              </div>

              {/* Fila 1: Nombre + Documento */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
                    Nombre Completo <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
                    Número de documento <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Tu número"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              {/* Fila 2: Contacto */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
                  Número de contacto <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  required
                  placeholder="3XX XXX XXXX"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Fila 3: Instagram + Ciudad */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
                    Perfil de Instagram <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="@tuinstagram"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
                    Ciudad de residencia <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Bogotá"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              {/* Fila 4: Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
                  Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Fila 5: Eres... */}
              <div className="relative flex flex-col gap-1.5">
                <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
                  Eres... <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  defaultValue=""
                  className="w-full border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-cf-yellow/40 transition-colors appearance-none cursor-pointer"
                  style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}
                >
                  <option value="" disabled style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}>
                    Selecciona una opción
                  </option>
                  <option value="medio" style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}>
                    Medio de comunicación
                  </option>
                  <option value="creador" style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}>
                    Creador de contenido
                  </option>
                </select>
                <ChevronDown size={14} className="absolute right-4 bottom-4 text-white/30 pointer-events-none" />
              </div>

              {/* Nota */}
              <div className="pt-2">
                <p className="text-white/30 text-xs font-body leading-relaxed">
                  La invitación es válida para los 3 días del evento, es única e intransferible y no incluye gastos de transporte ni alimentación.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-black text-[15px] transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                style={{ backgroundColor: accentColor, color: "#0a0a0a" }}
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <Send size={16} />
                )}
                {loading ? "Enviando..." : "Enviar formulario"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
