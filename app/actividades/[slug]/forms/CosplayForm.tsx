"use client";

import { useState } from "react";
import { Send, CheckCircle, Instagram, Link2, Image } from "lucide-react";

interface Props { accentColor: string; }

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all";
const labelCls = "block text-white/60 text-xs font-display font-semibold uppercase tracking-wider mb-2";

export default function CosplayForm({ accentColor }: Props) {
    const [form, setForm] = useState({ instagram: "", character: "", series: "", photoUrl: "", age: "", acceptTyc: false });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.instagram || !form.character || !form.series || !form.photoUrl) {
            setError("Por favor completa todos los campos obligatorios.");
            return;
        }
        if (!form.acceptTyc) {
            setError("Debes aceptar los términos y condiciones para inscribirte.");
            return;
        }
        setError("");
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                <CheckCircle size={48} className="text-green-400" />
                <h3 className="font-display text-2xl font-black text-white">¡Inscripción enviada!</h3>
                <p className="text-white/50 font-body text-sm max-w-sm">
                    Recibimos tu solicitud para la <strong>Copa Cosplay</strong>. Te contactaremos pronto con más información.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-8">
                <h2 className="font-display text-2xl font-black text-white mb-1">¡Inscríbete!</h2>
                <p className="text-white/40 text-sm font-body">
                    Modalidad individual · Mayores de 15 años · Convocatoria abierta hasta el 6 de marzo 2026
                </p>
            </div>

            {/* Instagram */}
            <div>
                <label className={labelCls}>
                    <Instagram size={11} className="inline mr-1.5 mb-0.5" />
                    Link de tu cuenta de Instagram *
                </label>
                <input
                    type="url"
                    placeholder="https://www.instagram.com/tu_usuario"
                    value={form.instagram}
                    onChange={(e) => set("instagram", e.target.value)}
                    className={inputCls}
                />
            </div>

            {/* Personaje */}
            <div>
                <label className={labelCls}>Nombre del personaje que vas a representar *</label>
                <input
                    type="text"
                    placeholder="Ej: Naruto Uzumaki"
                    value={form.character}
                    onChange={(e) => set("character", e.target.value)}
                    className={inputCls}
                />
            </div>

            {/* Serie / anime / videojuego */}
            <div>
                <label className={labelCls}>¿A qué serie, anime o videojuego pertenece? *</label>
                <input
                    type="text"
                    placeholder="Ej: Naruto Shippuden"
                    value={form.series}
                    onChange={(e) => set("series", e.target.value)}
                    className={inputCls}
                />
            </div>

            {/* Foto */}
            <div>
                <label className={labelCls}>
                    <Image size={11} className="inline mr-1.5 mb-0.5" />
                    Link de una foto del cosplay (en proceso o terminado) *
                </label>
                <input
                    type="url"
                    placeholder="https://drive.google.com/ o link directo a foto"
                    value={form.photoUrl}
                    onChange={(e) => set("photoUrl", e.target.value)}
                    className={inputCls}
                />
                <p className="text-white/30 text-xs mt-1.5 font-body">Puedes usar Google Drive, Imgur, Instagram u otro enlace público.</p>
            </div>

            {/* Edad */}
            <div>
                <label className={labelCls}>Edad</label>
                <input
                    type="number"
                    placeholder="Ej: 22"
                    min={15}
                    value={form.age}
                    onChange={(e) => set("age", e.target.value)}
                    className={inputCls}
                />
                <p className="text-white/30 text-xs mt-1.5 font-body">Menores de 18 años deben presentar permiso firmado por su acudiente.</p>
            </div>

            {/* TyC */}
            <div className="flex items-start gap-3 pt-2">
                <input
                    id="tyc-cosplay"
                    type="checkbox"
                    checked={form.acceptTyc}
                    onChange={(e) => set("acceptTyc", e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded accent-yellow-400 cursor-pointer"
                />
                <label htmlFor="tyc-cosplay" className="text-white/50 text-sm font-body cursor-pointer leading-relaxed">
                    He leído y acepto los{" "}
                    <a
                        href="/tyc/copa-cosplay"
                        className="underline text-white/70 hover:text-white transition-colors"
                    >
                        Términos y Condiciones
                    </a>{" "}
                    de la Copa Cosplay *
                </label>
            </div>

            {/* Error */}
            {error && <p className="text-red-400 text-sm font-body">{error}</p>}

            {/* Submit */}
            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-display font-black text-sm transition-all hover:opacity-85 active:scale-[0.98]"
                style={{ backgroundColor: accentColor, color: "#0a0a0a" }}
            >
                <Send size={15} /> Enviar inscripción
            </button>
        </form>
    );
}
