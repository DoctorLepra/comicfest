"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, User, Mail, Phone, Building2, ChevronRight, LogIn } from "lucide-react";
import { STAND_TYPES } from "@/lib/constants";

// ── Types ─────────────────────────────────────────────────────────────────
type StandStatus = "available" | "reserved" | "selected" | "premium";

interface Stand {
  id: string;
  number: number;
  type: keyof typeof STAND_TYPE_MAP;
  status: StandStatus;
  row: number;
  col: number;
}

const STAND_TYPE_MAP = {
  standard: { label: "Estándar", price: "$500.000", size: "3m × 2m", color: "#444" },
  premium: { label: "Premium", price: "$900.000", size: "4m × 3m", color: "#f5c500" },
  corner: { label: "Corner", price: "$1.400.000", size: "4m × 4m", color: "#ffd740" },
  isla: { label: "Isla", price: "$2.200.000", size: "6m × 4m", color: "#00d4ff" },
};

// ── Generate stand map ────────────────────────────────────────────────────
function generateStands(): Stand[] {
  const RESERVED_IDS = [2, 5, 8, 11, 14, 17, 20, 27, 31];
  const PREMIUM_IDS = [3, 9, 16, 22, 29];
  const CORNER_IDS = [1, 7, 25, 34];
  const ISLA_IDS = [15, 28];

  return Array.from({ length: 36 }, (_, i) => {
    const n = i + 1;
    const type = ISLA_IDS.includes(n)
      ? "isla"
      : CORNER_IDS.includes(n)
      ? "corner"
      : PREMIUM_IDS.includes(n)
      ? "premium"
      : "standard";
    return {
      id: `stand-${n}`,
      number: n,
      type,
      status: RESERVED_IDS.includes(n) ? "reserved" : "available",
      row: Math.floor(i / 6),
      col: i % 6,
    };
  });
}

// ── Main Component ────────────────────────────────────────────────────────
export default function StandsReservaPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [stands, setStands] = useState<Stand[]>(generateStands());
  const [selectedStand, setSelectedStand] = useState<Stand | null>(null);
  const [step, setStep] = useState<"map" | "form" | "success">("map");
  const [form, setForm] = useState({
    empresa: "",
    nit: "",
    tipo: "",
    contacto: "",
    telefono: "",
    email: "",
  });

  // ── Login handler ─────────────────────────────────────────────────────
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.email && loginData.password.length >= 6) {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Credenciales incorrectas. Usa cualquier email y al menos 6 caracteres.");
    }
  };

  // ── Stand click ───────────────────────────────────────────────────────
  const handleStandClick = (stand: Stand) => {
    if (stand.status === "reserved") return;
    setStands((prev) =>
      prev.map((s) => ({
        ...s,
        status:
          s.id === stand.id
            ? "selected"
            : s.status === "selected"
            ? "available"
            : s.status,
      }))
    );
    setSelectedStand(stand.status === "selected" ? null : stand);
  };

  // ── Submit ────────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  const standColor = (s: Stand) => {
    if (s.status === "reserved") return { bg: "bg-cf-white/5", border: "border-cf-white/10", text: "text-cf-white/20" };
    if (s.status === "selected") return { bg: "bg-cf-yellow/30", border: "border-cf-yellow", text: "text-cf-yellow" };
    const map = { standard: "border-cf-white/15 bg-cf-white/3 text-cf-white/40", premium: "border-cf-yellow/40 bg-cf-yellow/8 text-cf-yellow/70", corner: "border-cf-yellow-light/50 bg-cf-yellow-light/10 text-cf-yellow", isla: "border-cyan-400/50 bg-cyan-400/10 text-cyan-400" };
    const cls = map[s.type] || map.standard;
    return { bg: "", border: "", text: "", combined: cls };
  };

  // ── LOGIN SCREEN ──────────────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="glass border border-cf-yellow/15 rounded-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-xl glass border border-cf-yellow/30 flex items-center justify-center mx-auto mb-4">
                <LogIn size={24} className="text-cf-yellow" />
              </div>
              <h1 className="font-display text-2xl font-black text-cf-white mb-1">
                Portal Expositores
              </h1>
              <p className="text-cf-white/50 text-sm font-body">
                Inicia sesión para reservar tu stand
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-cf-white/60 text-xs font-display font-semibold uppercase tracking-widest mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cf-white/30" />
                  <input
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full glass border border-cf-white/10 rounded-xl pl-11 pr-4 py-3.5 text-cf-white font-body text-sm outline-none focus:border-cf-yellow/40 transition-colors"
                    placeholder="tu@empresa.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-cf-white/60 text-xs font-display font-semibold uppercase tracking-widest mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cf-white/30" />
                  <input
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full glass border border-cf-white/10 rounded-xl pl-11 pr-4 py-3.5 text-cf-white font-body text-sm outline-none focus:border-cf-yellow/40 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {loginError && (
                <p className="text-red-400 text-xs font-body bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-cf-yellow text-cf-black font-display font-black py-3.5 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-[1.02] mt-2"
              >
                Ingresar al portal
              </button>

              <p className="text-cf-white/30 text-xs font-body text-center mt-4">
                💡 Demo: usa cualquier email + 6+ caracteres de contraseña
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── SUCCESS SCREEN ────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass border border-cf-yellow/20 rounded-2xl p-10 md:p-14 max-w-lg w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-cf-yellow/20 border border-cf-yellow/50 flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-cf-yellow" />
          </div>
          <h2 className="font-display text-3xl font-black text-cf-white mb-3">¡Reserva enviada!</h2>
          <p className="text-cf-white/60 font-body text-sm mb-6">
            Tu solicitud de reserva para el Stand #{selectedStand?.number} ha sido recibida. Un asesor de Comicfest se comunicará contigo en las próximas 24 horas.
          </p>
          <button
            onClick={() => { setStep("map"); setSelectedStand(null); setStands(generateStands()); }}
            className="bg-cf-yellow text-cf-black font-display font-bold px-6 py-3 rounded-xl hover:bg-cf-yellow-light transition-all"
          >
            Ver mapa nuevamente
          </button>
        </motion.div>
      </div>
    );
  }

  // ── FORM SCREEN ───────────────────────────────────────────────────────
  if (step === "form" && selectedStand) {
    const typeInfo = STAND_TYPE_MAP[selectedStand.type];
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setStep("map")} className="flex items-center gap-2 text-cf-white/50 hover:text-cf-white text-sm font-body mb-8 transition-colors">
            ← Volver al mapa
          </button>

          <div className="glass border border-cf-yellow/20 rounded-2xl p-3 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center font-display font-black text-lg" style={{ backgroundColor: `${typeInfo.color}20`, color: typeInfo.color, border: `1px solid ${typeInfo.color}40` }}>
              #{selectedStand.number}
            </div>
            <div>
              <p className="font-display font-bold text-cf-white text-sm">Stand #{selectedStand.number} — {typeInfo.label}</p>
              <p className="text-cf-white/50 text-xs font-body">{typeInfo.size} · {typeInfo.price} COP</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass border border-cf-white/8 rounded-2xl p-8 space-y-5">
            <h2 className="font-display text-xl font-black text-cf-white mb-2">Datos del expositor</h2>

            {[
              { key: "empresa", label: "Nombre de empresa / marca", icon: Building2, placeholder: "Mi Empresa S.A.S." },
              { key: "nit", label: "NIT", icon: Building2, placeholder: "900.000.000-0" },
              { key: "contacto", label: "Nombre del contacto", icon: User, placeholder: "Juan Pérez" },
              { key: "telefono", label: "Teléfono / WhatsApp", icon: Phone, placeholder: "300 000 0000" },
              { key: "email", label: "Correo electrónico", icon: Mail, placeholder: "contacto@empresa.com" },
            ].map(({ key, label, icon: Icon, placeholder }) => (
              <div key={key}>
                <label className="block text-cf-white/60 text-xs font-display font-semibold uppercase tracking-widest mb-2">{label}</label>
                <div className="relative">
                  <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-cf-white/30" />
                  <input
                    required
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full glass border border-cf-white/10 rounded-xl pl-11 pr-4 py-3.5 text-cf-white font-body text-sm outline-none focus:border-cf-yellow/40 transition-colors"
                    placeholder={placeholder}
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-cf-white/60 text-xs font-display font-semibold uppercase tracking-widest mb-2">Tipo de expositor</label>
              <select
                required
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                className="w-full glass border border-cf-white/10 rounded-xl px-4 py-3.5 text-cf-white font-body text-sm outline-none focus:border-cf-yellow/40 transition-colors bg-cf-black"
              >
                <option value="">Selecciona una categoría</option>
                <option value="comics">Cómics y Manga</option>
                <option value="videojuegos">Videojuegos</option>
                <option value="tecnologia">Tecnología y Gadgets</option>
                <option value="ropa">Ropa y Accesorios</option>
                <option value="gastronomia">Gastronomía</option>
                <option value="arte">Arte y Coleccionables</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-cf-yellow text-cf-black font-display font-black py-4 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
            >
              Confirmar reserva
              <ChevronRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── MAP SCREEN ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-2">
                Expositor autenticado
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-black text-cf-white">
                MAPA DE STANDS
              </h1>
            </div>
            <button
              onClick={() => setLoggedIn(false)}
              className="text-cf-white/40 hover:text-cf-white text-xs font-body border border-cf-white/10 px-4 py-2 rounded-lg transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
          <p className="text-cf-white/50 font-body text-sm mt-2">
            Centro Comercial La 14 · Pereira · Marzo 2026 — Haz clic en un stand disponible para seleccionarlo
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Map */}
          <div className="glass border border-cf-white/8 rounded-2xl p-6 md:p-8 overflow-auto">
            {/* Stage */}
            <div className="flex justify-center mb-8">
              <div className="border border-cf-yellow/30 bg-cf-yellow/5 rounded-xl px-12 py-3 text-cf-yellow font-display font-bold text-sm tracking-widest uppercase">
                🎭 Escenario Principal
              </div>
            </div>

            {/* Stands grid */}
            <div className="grid grid-cols-6 gap-2.5 max-w-2xl mx-auto">
              {stands.map((stand) => {
                const colors = standColor(stand);
                const isIsla = stand.type === "isla";
                return (
                  <motion.button
                    key={stand.id}
                    onClick={() => handleStandClick(stand)}
                    disabled={stand.status === "reserved"}
                    whileHover={stand.status !== "reserved" ? { scale: 1.08 } : {}}
                    whileTap={stand.status !== "reserved" ? { scale: 0.95 } : {}}
                    className={`relative rounded-lg aspect-square flex items-center justify-center text-[10px] font-display font-black transition-all duration-200 border
                      ${colors.combined ?? `${colors.bg} ${colors.border} ${colors.text}`}
                      ${stand.status === "reserved" ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:brightness-125"}
                      ${isIsla ? "col-span-1 row-span-1 aspect-[3/2]" : ""}
                    `}
                    title={stand.status === "reserved" ? `Stand ${stand.number} — Reservado` : `Stand ${stand.number} — ${STAND_TYPE_MAP[stand.type].label} — ${STAND_TYPE_MAP[stand.type].price}`}
                  >
                    {stand.status === "selected"
                      ? <Check size={10} />
                      : <span>{stand.number}</span>
                    }
                    {stand.type !== "standard" && stand.status === "available" && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: STAND_TYPE_MAP[stand.type].color }} />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              {[
                { label: "Disponible", color: "#555" },
                { label: "Premium", color: "#f5c500" },
                { label: "Corner", color: "#ffd740" },
                { label: "Isla", color: "#00d4ff" },
                { label: "Reservado", color: "#333" },
                { label: "Seleccionado", color: "#f5c500", selected: true },
              ].map(({ label, color, selected }) => (
                <div key={label} className="flex items-center gap-1.5 text-[11px] font-body text-cf-white/50">
                  <div
                    className={`w-3 h-3 rounded ${selected ? "ring-1 ring-offset-1 ring-offset-cf-black ring-cf-yellow" : ""}`}
                    style={{ backgroundColor: `${color}30`, border: `1px solid ${color}60` }}
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Panel */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {selectedStand ? (
                <motion.div
                  key="selected"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass border border-cf-yellow/25 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-black text-cf-white text-lg">
                      Stand #{selectedStand.number}
                    </h3>
                    <button
                      onClick={() => { setSelectedStand(null); setStands((prev) => prev.map((s) => s.status === "selected" ? { ...s, status: "available" } : s)); }}
                      className="text-cf-white/40 hover:text-cf-white"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {(() => {
                    const info = STAND_TYPE_MAP[selectedStand.type];
                    return (
                      <>
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between text-sm font-body">
                            <span className="text-cf-white/50">Tipo</span>
                            <span className="text-cf-white font-medium" style={{ color: info.color }}>{info.label}</span>
                          </div>
                          <div className="flex justify-between text-sm font-body">
                            <span className="text-cf-white/50">Tamaño</span>
                            <span className="text-cf-white">{info.size}</span>
                          </div>
                          <div className="flex justify-between text-sm font-body">
                            <span className="text-cf-white/50">Precio</span>
                            <span className="text-cf-yellow font-bold font-display">{info.price}</span>
                          </div>
                          <div className="flex justify-between text-sm font-body">
                            <span className="text-cf-white/50">Estado</span>
                            <span className="text-green-400">Disponible</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setStep("form")}
                          className="w-full bg-cf-yellow text-cf-black font-display font-black py-3.5 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 text-sm"
                        >
                          Reservar este stand
                          <ChevronRight size={16} />
                        </button>
                      </>
                    );
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass border border-cf-white/5 rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl mb-3">🗺️</div>
                  <p className="font-display font-bold text-cf-white/60 text-sm mb-1">
                    Selecciona un stand
                  </p>
                  <p className="text-cf-white/30 text-xs font-body">
                    Haz clic en cualquier stand disponible del mapa
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stand types info */}
            <div className="glass border border-cf-white/5 rounded-2xl p-5">
              <h4 className="font-display font-bold text-cf-white text-xs uppercase tracking-widest mb-4">
                Tipos de stands
              </h4>
              <div className="space-y-3">
                {STAND_TYPES.map((t) => (
                  <div key={t.id} className="flex items-center justify-between text-xs font-body">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: `${t.borderColor}40`, border: `1px solid ${t.borderColor}` }} />
                      <span className="text-cf-white/70">{t.name}</span>
                      <span className="text-cf-white/30">{t.size}</span>
                    </div>
                    <span className="text-cf-yellow font-bold font-display">{t.priceLabel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
