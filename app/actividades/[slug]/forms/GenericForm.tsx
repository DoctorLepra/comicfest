"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import type { ACTIVITIES } from "@/lib/constants";

interface Props {
    activity: (typeof ACTIVITIES)[0];
    accentColor: string;
}

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-all";
const labelCls = "block text-white/60 text-xs font-display font-semibold uppercase tracking-wider mb-2";

export default function GenericForm({ activity, accentColor }: Props) {
    const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.nombre || !form.email || !form.telefono) {
            setError("Por favor completa nombre, email y teléfono.");
            return;
        }
        setError("");
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                <CheckCircle size={48} className="text-green-400" />
                <h3 className="font-display text-2xl font-black text-white">¡Interés registrado!</h3>
                <p className="text-white/50 font-body text-sm max-w-sm">
                    Recibimos tu información para <strong>{activity.title}</strong>. Te avisaremos con más detalles próximamente.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
                <h2 className="font-display text-2xl font-black text-white mb-1">¿Te interesa participar?</h2>
                <p className="text-white/40 text-sm font-body">
                    Déjanos tus datos y te contactaremos con más información sobre {activity.title}.
                </p>
            </div>

            <div>
                <label className={labelCls}>Nombre completo *</label>
                <input
                    type="text"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={(e) => set("nombre", e.target.value)}
                    className={inputCls}
                />
            </div>

            <div>
                <label className={labelCls}>Email *</label>
                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={inputCls}
                />
            </div>

            <div>
                <label className={labelCls}>Teléfono / WhatsApp *</label>
                <input
                    type="tel"
                    placeholder="3001234567"
                    value={form.telefono}
                    onChange={(e) => set("telefono", e.target.value)}
                    className={inputCls}
                />
            </div>

            <div>
                <label className={labelCls}>Mensaje (opcional)</label>
                <textarea
                    placeholder={`¿Alguna pregunta sobre ${activity.title}?`}
                    value={form.mensaje}
                    onChange={(e) => set("mensaje", e.target.value)}
                    rows={3}
                    className={inputCls + " resize-none"}
                />
            </div>

            {error && <p className="text-red-400 text-sm font-body">{error}</p>}

            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-display font-black text-sm transition-all hover:opacity-85 active:scale-[0.98]"
                style={{ backgroundColor: accentColor, color: "#0a0a0a" }}
            >
                <Send size={15} /> Registrar interés
            </button>
        </form>
    );
}
