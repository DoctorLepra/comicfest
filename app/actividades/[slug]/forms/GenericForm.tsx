"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import type { ACTIVITIES } from "@/lib/constants";

type Activity = (typeof ACTIVITIES)[number];

interface GenericFormProps {
  activity: Activity;
  accentColor: string;
}

export default function GenericForm({ activity, accentColor }: GenericFormProps) {
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
        <h3 className="font-display text-2xl font-black text-white">¡Solicitud recibida!</h3>
        <p className="text-white/55 font-body text-sm max-w-xs">
          Nos pondremos en contacto contigo por WhatsApp para darte más información sobre{" "}
          <span style={{ color: accentColor }}>{activity.title}</span>.
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
        <h3 className="font-display text-xl font-black text-white mb-1">
          Quiero participar
        </h3>
        <p className="text-white/40 text-sm font-body">
          Déjanos tus datos y te contactamos con más información sobre{" "}
          <span style={{ color: accentColor }}>{activity.title}</span>.
        </p>
      </div>

      {/* Nombre */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Nombre completo *
        </label>
        <input
          type="text"
          required
          placeholder="Tu nombre"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Correo electrónico
        </label>
        <input
          type="email"
          placeholder="tu@correo.com"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* WhatsApp */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          WhatsApp *
        </label>
        <input
          type="tel"
          required
          placeholder="3XX XXX XXXX"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Mensaje */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          ¿Alguna pregunta o comentario?
        </label>
        <textarea
          rows={3}
          placeholder="Escribe aquí..."
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
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
        {loading ? "Enviando..." : "Solicitar información"}
      </button>
    </form>
  );
}
