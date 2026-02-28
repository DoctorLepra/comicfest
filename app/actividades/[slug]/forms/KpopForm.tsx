"use client";

import { useState } from "react";
import { Send, CheckCircle, Plus, Trash2, Video } from "lucide-react";

interface Props { accentColor: string; }

interface Member {
    nombre: string;
    documento: string;
    tipoDoc: string;
    telefono: string;
    email: string;
}

const emptyMember = (): Member => ({ nombre: "", documento: "", tipoDoc: "CC", telefono: "", email: "" });

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-all";
const labelCls = "block text-white/60 text-xs font-display font-semibold uppercase tracking-wider mb-2";
const selectCls = `${inputCls} cursor-pointer`;

export default function KpopForm({ accentColor }: Props) {
    const [grupo, setGrupo] = useState("");
    const [members, setMembers] = useState<Member[]>([emptyMember(), emptyMember()]);
    const [coreoUrl, setCoreoUrl] = useState("");
    const [acceptTyc, setAcceptTyc] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const setMember = (i: number, k: keyof Member, v: string) =>
        setMembers((prev) => prev.map((m, idx) => (idx === i ? { ...m, [k]: v } : m)));

    const addMember = () => {
        if (members.length < 8) setMembers((p) => [...p, emptyMember()]);
    };
    const removeMember = (i: number) => {
        if (members.length > 2) setMembers((p) => p.filter((_, idx) => idx !== i));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!grupo.trim() || !coreoUrl.trim()) {
            setError("Completa el nombre del grupo y el link de la coreografía.");
            return;
        }
        if (!acceptTyc) {
            setError("Debes aceptar los términos y condiciones.");
            return;
        }
        for (const m of members) {
            if (!m.nombre || !m.documento || !m.telefono || !m.email) {
                setError("Completa los datos de todos los integrantes.");
                return;
            }
        }
        setError("");
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                <CheckCircle size={48} className="text-green-400" />
                <h3 className="font-display text-2xl font-black text-white">¡Equipo inscrito!</h3>
                <p className="text-white/50 font-body text-sm max-w-sm">
                    Recibimos la inscripción de <strong>{grupo}</strong> al Campeonato KPOP. ¡Mucho éxito!
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="mb-6">
                <h2 className="font-display text-2xl font-black text-white mb-1">¡Inscribe a tu equipo!</h2>
                <p className="text-white/40 text-sm font-body">
                    Equipos de 2 a 8 personas · Mínimo 8 equipos para realizarse
                </p>
            </div>

            {/* Nombre del grupo */}
            <div>
                <label className={labelCls}>Nombre del grupo *</label>
                <input
                    type="text"
                    placeholder="Ej: K-Universe Crew"
                    value={grupo}
                    onChange={(e) => setGrupo(e.target.value)}
                    className={inputCls}
                />
            </div>

            {/* Miembros */}
            <div className="space-y-6">
                {members.map((m, i) => (
                    <div
                        key={i}
                        className="rounded-xl border border-white/8 p-5 space-y-4 relative"
                        style={{ borderColor: `${accentColor}25` }}
                    >
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="font-display font-black text-white text-sm">
                                {i === 0 ? "🎤 Líder del grupo" : `Integrante #${i + 1}`}
                            </h3>
                            {i >= 2 && (
                                <button
                                    type="button"
                                    onClick={() => removeMember(i)}
                                    className="text-red-400/60 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <label className={labelCls}>Nombre completo *</label>
                                <input type="text" placeholder="Nombre y apellido" value={m.nombre}
                                    onChange={(e) => setMember(i, "nombre", e.target.value)} className={inputCls} />
                            </div>
                            <div>
                                <label className={labelCls}>Tipo de documento *</label>
                                <select value={m.tipoDoc} onChange={(e) => setMember(i, "tipoDoc", e.target.value)} className={selectCls}>
                                    <option value="CC">Cédula de ciudadanía</option>
                                    <option value="TI">Tarjeta de identidad</option>
                                    <option value="CE">Cédula extranjería</option>
                                    <option value="PP">Pasaporte</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelCls}>Número de documento *</label>
                                <input type="text" placeholder="Número" value={m.documento}
                                    onChange={(e) => setMember(i, "documento", e.target.value)} className={inputCls} />
                            </div>
                            <div>
                                <label className={labelCls}>Teléfono *</label>
                                <input type="tel" placeholder="3001234567" value={m.telefono}
                                    onChange={(e) => setMember(i, "telefono", e.target.value)} className={inputCls} />
                            </div>
                            <div>
                                <label className={labelCls}>Email *</label>
                                <input type="email" placeholder="correo@ejemplo.com" value={m.email}
                                    onChange={(e) => setMember(i, "email", e.target.value)} className={inputCls} />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Agregar integrante */}
                {members.length < 8 && (
                    <button
                        type="button"
                        onClick={addMember}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/15 text-white/40 hover:text-white/70 hover:border-white/30 text-sm font-display font-semibold transition-all"
                    >
                        <Plus size={14} /> Agregar integrante ({members.length}/8)
                    </button>
                )}
            </div>

            {/* Link coreografía */}
            <div>
                <label className={labelCls}>
                    <Video size={11} className="inline mr-1.5 mb-0.5" />
                    Link de la coreografía *
                </label>
                <input
                    type="url"
                    placeholder="https://youtube.com/ o Google Drive"
                    value={coreoUrl}
                    onChange={(e) => setCoreoUrl(e.target.value)}
                    className={inputCls}
                />
                <p className="text-white/30 text-xs mt-1.5 font-body">YouTube, Google Drive u otro enlace público con el video de la coreografía.</p>
            </div>

            {/* TyC */}
            <div className="flex items-start gap-3">
                <input
                    id="tyc-kpop"
                    type="checkbox"
                    checked={acceptTyc}
                    onChange={(e) => setAcceptTyc(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded accent-pink-400 cursor-pointer"
                />
                <label htmlFor="tyc-kpop" className="text-white/50 text-sm font-body cursor-pointer leading-relaxed">
                    He leído y acepto los{" "}
                    <a
                        href="/tyc/kpop"
                        className="underline text-white/70 hover:text-white transition-colors"
                    >
                        Términos y Condiciones
                    </a>{" "}
                    del Campeonato KPOP *
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
                <Send size={15} /> Inscribir equipo
            </button>
        </form>
    );
}
