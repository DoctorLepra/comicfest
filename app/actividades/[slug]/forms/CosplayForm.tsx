"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

interface CosplayFormProps {
  accentColor: string;
}

export default function CosplayForm({ accentColor }: CosplayFormProps) {
  const [categoria, setCategoria] = useState<"individual" | "grupal">("individual");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de envío
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        {/* Modal overlay */}
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
              <h3 className="font-display text-2xl font-black text-white mb-2">¡INSCRIPCIÓN ENVIADA!</h3>
              <p className="text-white/55 font-body text-sm leading-relaxed">
                Tu registro ha sido enviado exitosamente. Nos contactaremos contigo por{" "}
                <span className="text-green-400 font-semibold">WhatsApp</span> para confirmar tu participación en la Copa Cosplay.
              </p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-display font-black text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: accentColor, color: "#0a0a0a" }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </>
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
        <h3 className="font-display text-xl font-black text-white mb-1">Inscripción Copa Cosplay</h3>
        <p className="text-white/40 text-sm font-body">Completa el formulario y nos contactamos contigo.</p>
      </div>

      {/* Nombre */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Nombre completo <span className="text-red-500">*</span></label>
        <input
          type="text"
          required
          placeholder="Tu nombre"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Categoría */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Categoría <span className="text-red-500">*</span></label>
        <div className="flex gap-3">
          {(["individual", "grupal"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoria(cat)}
              className="flex-1 py-2.5 rounded-xl text-sm font-display font-bold transition-all capitalize"
              style={{
                backgroundColor: categoria === cat ? `${accentColor}25` : "rgba(255,255,255,0.04)",
                color: categoria === cat ? accentColor : "rgba(255,255,255,0.4)",
                border: `1px solid ${categoria === cat ? accentColor + "60" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Personaje */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Personaje a representar <span className="text-red-500">*</span></label>
        <input
          type="text"
          required
          placeholder="Nombre del personaje y obra"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Instagram */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Instagram (opcional)
        </label>
        <input
          type="text"
          placeholder="@tuinstagram"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Número de integrantes (solo si grupal) */}
      {categoria === "grupal" && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
            Número de integrantes <span className="text-red-500">*</span></label>
          <input
            type="number"
            required
            min={2}
            max={10}
            placeholder="2 – 10 personas"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>
      )}

      {/* WhatsApp */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          WhatsApp de contacto <span className="text-red-500">*</span></label>
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
