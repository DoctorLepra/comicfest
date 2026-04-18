"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Squares from "@/components/ui/Squares";
import Link from "next/link";
import { Send, CheckCircle, ArrowLeft } from "lucide-react";

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
            <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-4">
              Medios y comunicación
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-black text-cf-white leading-none mb-5">
              PRENSA
            </h1>
            <div className="w-16 h-1 bg-cf-yellow mx-auto mb-5" />
            <p className="text-cf-white/60 font-body text-base md:text-lg max-w-xl leading-relaxed">
              Si tienes un medio de comunicación o eres creador de contenido, puedes ayudarnos a que cada vez seamos más los que hacemos parte del universo Comicfest.
            </p>
            <div className="mt-8">
              <a
                href="#formulario"
                className="inline-flex items-center gap-2 bg-cf-yellow text-cf-black font-display font-black px-8 py-4 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-105 text-sm"
              >
                Regístrate
                <Send size={16} />
              </a>
            </div>
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

      {/* ── Formulario de registro ── */}
      <div id="formulario" className="px-6 md:px-12 pb-24 pt-16 flex flex-col items-center scroll-mt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl"
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
                  <h3 className="font-display text-2xl font-black text-white mb-2 uppercase">¡REGISTRO ENVIADO!</h3>
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
              <div>
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
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
                  Eres... *
                </label>
                <select
                  required
                  defaultValue=""
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-black">
                    Selecciona una opción
                  </option>
                  <option value="medio" className="text-black">
                    Medio de comunicación
                  </option>
                  <option value="creador" className="text-black">
                    Creador de contenido
                  </option>
                </select>
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
