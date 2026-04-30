"use client";

import { useState } from "react";
import { Send, CheckCircle, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface CosplayFormProps {
  accentColor: string;
}

export default function CosplayForm({ accentColor }: CosplayFormProps) {
  const [categoria, setCategoria] = useState<"individual" | "grupal">("individual");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    personaje: "",
    instagram: "",
    num_integrantes: 2,
    whatsapp: ""
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      let fileUrl = "";

      // Upload file if exists (Audio/Image)
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `cosplay_${Date.now()}.${fileExt}`;
        const filePath = `cosplay/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('event-uploads')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('event-uploads').getPublicUrl(filePath);
        fileUrl = data.publicUrl;
      }

      // Build JSONB payload
      const payload = {
        nombre: formData.nombre,
        categoria: categoria,
        personaje: formData.personaje,
        instagram: formData.instagram,
        num_integrantes: categoria === 'grupal' ? formData.num_integrantes : 1,
        whatsapp: formData.whatsapp,
        archivo_adjunto: fileUrl
      };

      const { error: dbError } = await supabase
        .from('activity_applications')
        .insert({
          activity_type: 'cosplay',
          form_data: payload
        });

      if (dbError) throw dbError;

      setSubmitted(true);
    } catch (error: any) {
      console.error(error);
      setErrorMsg("Ocurrió un error al enviar tu inscripción. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
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
            <h3 className="font-display text-2xl font-black text-white modal-text-spacing mb-6">¡INSCRIPCIÓN ENVIADA!</h3>
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
      <div className="flex flex-col items-center text-center">
        <h3 className="font-display text-xl font-black text-white mb-1">Inscripción Copa Cosplay</h3>
        <p className="text-white/40 text-sm font-body">Completa el formulario y nos contactamos contigo.</p>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm mb-2 text-center">
          {errorMsg}
        </div>
      )}

      {/* Nombre */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Nombre completo <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="nombre"
          required
          value={formData.nombre}
          onChange={handleChange}
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
          name="personaje"
          required
          value={formData.personaje}
          onChange={handleChange}
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
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
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
            name="num_integrantes"
            required
            min={2}
            max={10}
            value={formData.num_integrantes}
            onChange={handleChange}
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
          name="whatsapp"
          required
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="3XX XXX XXXX"
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* File Upload for Audio/Reference Image */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-display font-semibold text-white/60 uppercase tracking-widest">
          Audio o Imagen de Referencia
        </label>
        <span className="text-xs text-white/40 mb-1 font-body">MP3, WAV o Imagen (Max 10MB)</span>
        <div className="relative">
          <input
            type="file"
            accept="audio/*,image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="bg-white/5 border border-dashed border-white/20 rounded-xl px-4 py-4 text-center flex flex-col items-center justify-center gap-1.5 hover:bg-white/10 transition-colors relative z-0">
            <Upload size={18} className="text-white/50" />
            <span className="text-white/60 text-sm font-body font-semibold truncate px-4">
              {file ? file.name : "Subir Archivo"}
            </span>
          </div>
        </div>
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
