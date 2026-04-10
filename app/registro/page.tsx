"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Particles from "@/components/ui/Particles";

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-24" style={{ paddingTop: "120px" }}>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={120}
          particleSpread={6}
          speed={0.06}
          particleColors={["#f5c500", "#ffffff", "#f5c50060"]}
          alphaParticles
          particleBaseSize={60}
          sizeRandomness={1.2}
          moveParticlesOnHover
          particleHoverFactor={0.5}
        />
      </div>
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(245,197,0,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-xl rounded-2xl p-8 md:p-10 my-8"
        style={{
          background: "linear-gradient(135deg, rgba(18,18,18,0.98) 0%, rgba(28,28,28,0.96) 100%)",
          border: "1px solid rgba(245,197,0,0.20)",
          boxShadow: "0 0 60px rgba(245,197,0,0.08), 0 24px 48px rgba(0,0,0,0.5)",
        }}
      >
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-white/35 hover:text-cf-yellow text-xs font-display font-semibold transition-colors mb-8"
        >
          <ArrowLeft size={13} /> Volver al inicio
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-cf-yellow text-[10px] font-display font-bold tracking-[0.4em] uppercase mb-2">
            Registro de expositores
          </p>
          <h1 className="font-display text-3xl font-black text-white mb-2">
            Crear cuenta
          </h1>
          <p className="text-white/40 text-sm font-body">
            Únete como expositor a la convención de cultura pop más grande del eje cafetero.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Nombre */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
                Nombre
              </label>
              <input
                type="text"
                required
                placeholder="Tu nombre"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
              />
            </div>

            {/* Apellidos */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
                Apellidos
              </label>
              <input
                type="text"
                required
                placeholder="Tus apellidos"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Teléfono */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
                Teléfono
              </label>
              <input
                type="tel"
                required
                placeholder="Número de celular"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
              />
            </div>

            {/* Link Instagram */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
                Link Instagram
              </label>
              <input
                type="url"
                required
                placeholder="https://instagram.com/tumarca"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
              />
            </div>
          </div>

          {/* Nombre de marca */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
              Nombre de marca
            </label>
            <input
              type="text"
              required
              placeholder="¿Cómo se llama tu emprendimiento?"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="tu@correo.com"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-11 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-white/25 text-[11px] font-body mt-1">
              Debe contener al menos 8 caracteres.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-black text-sm transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
            style={{ backgroundColor: "#f5c500", color: "#0a0a0a" }}
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <UserPlus size={16} strokeWidth={2.5} />
            )}
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-7">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-white/25 text-xs font-body">o</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* Login link */}
        <p className="text-center text-sm font-body text-white/40">
          ¿Ya eres expositor?{" "}
          <Link
            href="/login"
            className="text-cf-yellow hover:text-cf-yellow-light font-semibold transition-colors"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
