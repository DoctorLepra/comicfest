"use client";

import { useState } from "react";
import { Send, CheckCircle, Upload } from "lucide-react";

interface KpopFormProps {
  accentColor: string;
}

export default function KpopForm({ accentColor }: KpopFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numParticipantes, setNumParticipantes] = useState<number>(3);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const handleNumParticipantesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) {
        setNumParticipantes(3);
        return;
    }
    if (val > 8) val = 8;
    setNumParticipantes(val);
  };

  if (submitted) {
    return (
      <>
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
              <h3 className="font-display text-2xl font-black text-white mb-2">¡REGISTRO ENVIADO!</h3>
              <p className="text-white/55 font-body text-sm leading-relaxed">
                Tu registro ha sido enviado exitosamente. Nos contactaremos con tu grupo por{" "}
                <span className="text-green-400 font-semibold">WhatsApp</span> para confirmar su participación en el Campeonato KPOP.
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

  const renderParticipantFields = (index: number, isLeader: boolean) => {
    const title = isLeader ? "LÍDER DEL GRUPO" : `INTEGRANTE # ${index + 1}`;
    return (
      <div key={index} className="flex flex-col gap-5 mt-4 pt-6 border-t border-white/5">
        <h4 className="font-display font-bold text-white text-lg flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
          {title}
        </h4>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
            Nombre Completo <span className="text-red-500">*</span></label>
          <input
            type="text"
            required
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
              Tipo de documento <span className="text-red-500">*</span></label>
            <select
              required
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-white/30 transition-colors appearance-none"
            >
              <option value="" className="text-black">Selecciona</option>
              <option value="CC" className="text-black">Cédula de Ciudadanía</option>
              <option value="TI" className="text-black">Tarjeta de Identidad</option>
              <option value="CE" className="text-black">Cédula de Extranjería</option>
              <option value="Pasaporte" className="text-black">Pasaporte</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
              Número de documento <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
              Número de teléfono <span className="text-red-500">*</span></label>
            <input
              type="tel"
              required
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
              Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              required
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
            Sube tu consentimiento informado
          </label>
          <span className="text-xs text-white/40 mb-1 font-body">Solo menores de edad</span>
          <div className="relative">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="bg-white/5 border border-dashed border-white/20 rounded-xl px-4 py-4 text-center flex flex-col items-center justify-center gap-1.5 hover:bg-white/10 transition-colors relative z-0">
              <Upload size={18} className="text-white/50" />
              <span className="text-white/60 text-sm font-body font-semibold">Subir Archivo</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        <h3 className="font-display text-2xl font-black text-white mb-2 uppercase">¡INSCRIBE A TU EQUIPO!</h3>
      </div>

      {/* Nombre del grupo */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Nombre del grupo <span className="text-red-500">*</span></label>
        <input
          type="text"
          required
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Número de participantes */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          # de participantes <span className="text-red-500">*</span></label>
        <span className="text-xs text-white/40 mb-1 font-body">Min: 3, Max: 8</span>
        <input
          type="number"
          required
          min={3}
          max={8}
          value={numParticipantes || ""}
          onChange={handleNumParticipantesChange}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Participantes dinámicos */}
      {Array.from({ length: Math.max(3, Math.min(8, numParticipantes || 3)) }).map((_, index) => 
        renderParticipantFields(index, index === 0)
      )}

      {/* Link de coreografía */}
      <div className="flex flex-col gap-1.5 mt-6 pt-6 border-t border-white/5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Pega el link de tu coreografía <span className="text-red-500">*</span></label>
        <input
          type="url"
          required
          placeholder="https://..."
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-black text-[15px] transition-all hover:opacity-90 disabled:opacity-50"
        style={{
          backgroundColor: accentColor,
          color: "#0a0a0a",
        }}
      >
        {loading ? (
          <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <Send size={16} />
        )}
        {loading ? "Enviando..." : "Enviar formulario"}
      </button>
    </form>
  );
}
