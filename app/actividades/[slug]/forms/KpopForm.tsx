"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

interface KpopFormProps {
  accentColor: string;
}

export default function KpopForm({ accentColor }: KpopFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4"
        style={{
          background: "rgba(20,20,20,0.97)",
          border: `1px solid ${accentColor}40`,
          boxShadow: `0 0 40px ${accentColor}18`,
        }}
      >
        <CheckCircle size={48} style={{ color: accentColor }} />
        <h3 className="font-display text-2xl font-black text-white">¡Inscripción recibida!</h3>
        <p className="text-white/55 font-body text-sm max-w-xs">
          Nos pondremos en contacto con tu grupo por WhatsApp para confirmar la participación en el Campeonato KPOP.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-7 flex flex-col gap-5"
      style={{
        background: "rgba(20,20,20,0.97)",
        border: `1px solid ${accentColor}30`,
        boxShadow: `0 0 32px ${accentColor}12`,
      }}
    >
      <div>
        <h3 className="font-display text-xl font-black text-white mb-1">Inscripción Campeonato KPOP</h3>
        <p className="text-white/40 text-sm font-body">Equipos de 2 a 8 integrantes.</p>
      </div>

      {/* Nombre del grupo */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Nombre del grupo *
        </label>
        <input
          type="text"
          required
          placeholder="Nombre de tu grupo"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Número de integrantes */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Número de integrantes *
        </label>
        <input
          type="number"
          required
          min={2}
          max={8}
          placeholder="2 – 8 personas"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Nombre del representante */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Nombre del representante *
        </label>
        <input
          type="text"
          required
          placeholder="Quién representa al grupo"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Géneros / artistas */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Canciones / artistas a presentar *
        </label>
        <input
          type="text"
          required
          placeholder="Ej: BTS - Dynamite, BLACKPINK - Kill This Love"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Redes sociales */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Instagram del grupo (opcional)
        </label>
        <input
          type="text"
          placeholder="@grupoinstagram"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* WhatsApp */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          WhatsApp de contacto *
        </label>
        <input
          type="tel"
          required
          placeholder="3XX XXX XXXX"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-display font-black text-sm transition-all hover:opacity-90 disabled:opacity-50"
        style={{
          backgroundColor: accentColor,
          color: "#0a0a0a",
        }}
      >
        {loading ? (
          <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <Send size={14} />
        )}
        {loading ? "Enviando..." : "Enviar inscripción"}
      </button>
    </form>
  );
}
