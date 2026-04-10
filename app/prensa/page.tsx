"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Squares from "@/components/ui/Squares";
import { Send } from "lucide-react";

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cf-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors";

const selectClass =
  "w-full border border-white/10 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-cf-yellow/40 transition-colors appearance-none cursor-pointer";

const selectStyle = { backgroundColor: "#1a1a1a", color: "#ffffff" };

const labelClass =
  "block text-xs font-display font-semibold text-cf-white/55 uppercase tracking-widest mb-1.5";

export default function PrensaPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

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

      {/* ── Formulario de registro ── */}
      <div id="formulario" className="px-6 md:px-12 pb-24 pt-16 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl"
        >
          <h2 className="font-display text-3xl md:text-4xl font-black text-cf-white text-center mb-2">
            ¡REGÍSTRATE!
          </h2>
          <div className="w-12 h-1 bg-cf-yellow mx-auto mb-10" />

          {sent ? (
            <div className="glass border border-cf-yellow/20 rounded-2xl p-12 text-center">
              <p className="text-cf-yellow font-display font-black text-2xl mb-3">¡Formulario enviado!</p>
              <p className="text-cf-white/60 font-body text-base">
                Nos pondremos en contacto contigo pronto para gestionar tu acreditación de prensa.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass border border-cf-white/8 rounded-2xl p-8 md:p-10 flex flex-col gap-6">

              {/* Fila 1: Nombre + Documento */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Nombre Completo <span className="text-red-400">*</span></label>
                  <input type="text" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Número de documento <span className="text-red-400">*</span></label>
                  <input type="text" required className={inputClass} />
                </div>
              </div>

              {/* Fila 2: Contacto */}
              <div>
                <label className={labelClass}>Número de contacto <span className="text-red-400">*</span></label>
                <input type="tel" required className={inputClass} />
              </div>

              {/* Fila 3: Instagram + Ciudad */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Perfil de Instagram <span className="text-red-400">*</span></label>
                  <input type="text" required placeholder="@usuario" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Ciudad de residencia <span className="text-red-400">*</span></label>
                  <input type="text" required className={inputClass} />
                </div>
              </div>

              {/* Fila 4: Email */}
              <div>
                <label className={labelClass}>Email <span className="text-red-400">*</span></label>
                <input type="email" required className={inputClass} />
              </div>

              {/* Fila 5: Eres... */}
              <div>
                <label className={labelClass}>Eres... <span className="text-red-400">*</span></label>
                <select
                  required
                  className={selectClass}
                  style={selectStyle}
                  defaultValue=""
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
              </div>

              {/* Nota */}
              <p className="text-cf-white/30 text-xs font-body leading-relaxed">
                La invitación es válida para los 3 días del evento, es única e intransferible y no incluye gastos de transporte ni alimentación.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-black text-sm transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                style={{ backgroundColor: "#f5c500", color: "#0a0a0a" }}
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <Send size={15} strokeWidth={2.5} />
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
