"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera, Clock, Shirt, DollarSign, Send, ChevronDown, Upload,
} from "lucide-react";
import Squares from "@/components/ui/Squares";

/* ─── Shared styles ─── */
const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cf-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors";
const selectClass =
  "w-full border border-white/10 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-cf-yellow/40 transition-colors appearance-none cursor-pointer";
const selectStyle = { backgroundColor: "#1a1a1a", color: "#ffffff" };
const optStyle = { backgroundColor: "#1a1a1a", color: "#ffffff" };
const labelClass =
  "block text-xs font-display font-semibold text-cf-white/55 uppercase tracking-widest mb-1.5";

/* ─── Info cards ─── */
const INFO = [
  {
    icon: Camera,
    title: "¿Cuál será tu labor?",
    items: [
      "Guiar al público en la exhibición o actividad asignada.",
      "Realizar el registro fotográfico de cada experiencia.",
      "Dar una breve inducción sobre el uso de la consola o estación asignada.",
    ],
  },
  {
    icon: Clock,
    title: "Horarios del evento",
    items: [
      "Apertura al público: 10:30 a.m. – 7:30 p.m.",
      "Hora de llegada del staff: 9:30 a.m. (puntualidad obligatoria).",
    ],
  },
  {
    icon: Shirt,
    title: "¿Qué debes traer?",
    items: [
      "Hidratación personal y calzado cómodo.",
      "Se entrega: Camiseta oficial del evento (se devuelve al final) y credencial.",
      "Recibirás: Almuerzo y refrigerio diario.",
      "Dietas vegetarianas/veganas: notificar con al menos 1 semana de anticipación.",
    ],
  },
  {
    icon: DollarSign,
    title: "Fechas y pago",
    items: [
      "Días: Viernes 13, Sábado 14 y Domingo 15 de MARZO.",
      "Pago total: $195.000 COP.",
      "Fecha de pago: Domingo 15 de marzo, después del cierre (8:00 p.m.).",
      "Inducción obligatoria: Jueves 12 de marzo — Antigua 14 (al lado del Smart Fit).",
    ],
  },
];

/* ─── Options ─── */
const TIPO_DOC = ["C.C", "T.I", "C.E", "Pasaporte"];
const CIUDADES = ["Bogotá", "Manizales", "Pereira", "Armenia", "Cali", "Neiva", "Bucaramanga"];
const SANGRE = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const EPS_LIST = [
  "Aliansalud EPS",
  "Asmet Salud",
  "Capresoca EPS",
  "Comfachocó EPS",
  "Comfaoriente",
  "Compensar EPS",
  "Coosalud EPS",
  "Cruz Blanca EPS",
  "EPS Sanitas",
  "EPS Sura",
  "Famisanar",
  "Ferrocarriles (FFS)",
  "Magisterio (FIDUPREVISORA)",
  "Medimás EPS",
  "Nueva EPS",
  "Pijaos Salud EPSI",
  "Salud Bolívar EPS",
  "Salud MIA EPSI",
  "Salud Total EPS",
  "Savia Salud EPS",
  "SOS EPS",
  "Mutual SER EPSI",
  "Dusakawi EPSI",
  "AIC EPSI",
  "Mallamas EPSI",
  "ECOOPSOS ESS EPS-S",
  "Emssanar EPS",
  "Anas Wayuu EPSI",
  "No tengo / Vinculado",
  "Otra",
];

export default function TrabajaConNosotrosPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [trabajoPrevio, setTrabajoPrevio] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: "80px" }}>

      {/* ── Hero ── */}
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
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-4">
              Únete al equipo
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-black text-cf-white leading-none mb-5">
              TRABAJA CON NOSOTROS
            </h1>
            <div className="w-16 h-1 bg-cf-yellow mx-auto mb-5" />
            <p className="text-cf-white/60 font-body text-base md:text-lg max-w-2xl leading-relaxed">
              Bienvenido/a al proceso para el cargo de logística en ComicFest – PEREIRA 2026. Aquí encontrarás todo lo que debes saber sobre tus funciones, horarios y condiciones de participación.
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

      {/* ── Info cards ── */}
      <div className="px-6 md:px-12 pt-16 pb-8 flex flex-col items-center">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {INFO.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass border border-cf-white/5 rounded-2xl p-6 hover:border-cf-yellow/20 transition-all duration-300 flex flex-col gap-3"
            >
              <div className="w-11 h-11 rounded-xl glass border border-cf-yellow/20 flex items-center justify-center shrink-0">
                <card.icon size={20} className="text-cf-yellow" />
              </div>
              <h3 className="font-display font-black text-cf-white text-sm">{card.title}</h3>
              <ul className="space-y-1.5">
                {card.items.map((item) => (
                  <li key={item} className="text-cf-white/50 text-xs font-body leading-relaxed flex gap-1.5">
                    <span className="text-cf-yellow shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Aviso WhatsApp + edad ── */}
      <div className="px-6 md:px-12 pb-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl glass border border-cf-yellow/15 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-cf-white/70 font-body text-sm leading-relaxed">
            Si necesitas más información o tienes alguna duda, escríbenos a nuestra{" "}
            <a
              href="https://wa.me/message/KZIR2TIIHYAMC1"
              target="_blank"
              rel="noreferrer"
              className="text-cf-yellow hover:underline font-semibold"
            >
              línea de WhatsApp
            </a>
            {" "}— estaremos atentos para ayudarte.
          </p>
          <span className="shrink-0 text-xs font-display font-black tracking-widest uppercase bg-cf-yellow text-cf-black px-4 py-2 rounded-lg whitespace-nowrap">
            +18 años
          </span>
        </motion.div>
      </div>

      {/* ── Formulario ── */}
      <div id="formulario" className="px-6 md:px-12 pb-24 pt-10 flex flex-col items-center">
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
                Nos pondremos en contacto contigo pronto. ¡Gracias por querer ser parte del equipo ComicFest!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass border border-cf-white/8 rounded-2xl p-8 md:p-10 flex flex-col gap-6">

              {/* Nombre completo */}
              <div>
                <label className={labelClass}>Nombre Completo <span className="text-red-400">*</span></label>
                <input type="text" required className={inputClass} />
              </div>

              {/* Tipo de documento + Número de documento */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative">
                  <label className={labelClass}>Tipo de documento <span className="text-red-400">*</span></label>
                  <select required className={selectClass} style={selectStyle} defaultValue="">
                    <option value="" disabled style={optStyle}>Selecciona</option>
                    {TIPO_DOC.map((t) => <option key={t} value={t} style={optStyle}>{t}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 bottom-3.5 text-cf-white/30 pointer-events-none" />
                </div>
                <div>
                  <label className={labelClass}>Número de documento <span className="text-red-400">*</span></label>
                  <input type="text" required className={inputClass} />
                </div>
              </div>

              {/* Número de teléfono */}
              <div>
                <label className={labelClass}>Número de teléfono <span className="text-red-400">*</span></label>
                <input type="tel" required className={inputClass} />
              </div>

              {/* Ciudad + Grupo sanguíneo */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative">
                  <label className={labelClass}>Ciudad <span className="text-red-400">*</span></label>
                  <select required className={selectClass} style={selectStyle} defaultValue="">
                    <option value="" disabled style={optStyle}>Selecciona</option>
                    {CIUDADES.map((c) => <option key={c} value={c} style={optStyle}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 bottom-3.5 text-cf-white/30 pointer-events-none" />
                </div>
                <div className="relative">
                  <label className={labelClass}>Grupo sanguíneo <span className="text-red-400">*</span></label>
                  <select required className={selectClass} style={selectStyle} defaultValue="">
                    <option value="" disabled style={optStyle}>Selecciona</option>
                    {SANGRE.map((s) => <option key={s} value={s} style={optStyle}>{s}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 bottom-3.5 text-cf-white/30 pointer-events-none" />
                </div>
              </div>

              {/* EPS */}
              <div className="relative">
                <label className={labelClass}>EPS</label>
                <select className={selectClass} style={selectStyle} defaultValue="">
                  <option value="" style={optStyle}>Selecciona tu EPS</option>
                  {EPS_LIST.map((e) => <option key={e} value={e} style={optStyle}>{e}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 bottom-3.5 text-cf-white/30 pointer-events-none" />
              </div>

              {/* Archivos */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Cédula escaneada (PDF) <span className="text-red-400">*</span></label>
                  <label className="flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:border-cf-yellow/30 transition-colors">
                    <Upload size={16} className="text-cf-yellow shrink-0" />
                    <span className="text-cf-white/40 text-sm font-body truncate">Subir archivo PDF</span>
                    <input type="file" accept=".pdf" required className="hidden" />
                  </label>
                </div>
                <div>
                  <label className={labelClass}>RUT (PDF) <span className="text-red-400">*</span></label>
                  <label className="flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:border-cf-yellow/30 transition-colors">
                    <Upload size={16} className="text-cf-yellow shrink-0" />
                    <span className="text-cf-white/40 text-sm font-body truncate">Subir archivo PDF</span>
                    <input type="file" accept=".pdf" required className="hidden" />
                  </label>
                </div>
              </div>

              {/* Trabajo previo checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setTrabajoPrevio((v) => !v)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                    trabajoPrevio ? "bg-cf-yellow border-cf-yellow" : "border-white/20 bg-white/5 group-hover:border-cf-yellow/50"
                  }`}
                >
                  {trabajoPrevio && <span className="text-cf-black text-xs font-black leading-none">✓</span>}
                </div>
                <span className="text-cf-white/60 text-sm font-body">
                  ¿Has trabajado con nosotros previamente?
                </span>
              </label>

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
