"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, Eye, EyeOff, CheckCircle } from "lucide-react";
import Particles from "@/components/ui/Particles";
import { supabase } from "@/lib/supabase";

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    instagram: "",
    marca: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.nombre,
          last_name: formData.apellidos,
          phone: formData.telefono,
          instagram: formData.instagram,
          brand_name: formData.marca,
          role: 'expositor'
        }
      }
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0a]">
        <div className="max-w-md w-full p-8 rounded-2xl flex flex-col items-center text-center gap-5 border border-[#f5c500] shadow-[0_0_40px_rgba(245,197,0,0.15)] bg-black/50">
          <CheckCircle size={56} className="text-[#f5c500]" />
          <h3 className="font-display text-2xl font-black text-white uppercase">¡Cuenta Creada!</h3>
          <p className="text-white/60 font-body text-sm">
            Tu registro como expositor ha sido exitoso. Por favor revisa tu bandeja de correo para verificar tu cuenta (si aplica) o procede a iniciar sesión.
          </p>
          <Link
            href="/login"
            className="mt-4 bg-[#f5c500] text-black font-display font-black px-8 py-3 rounded-xl uppercase text-sm hover:scale-105 transition-transform"
          >
            Ir al Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-32" style={{ paddingTop: "140px" }}>
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
          background: "radial-gradient(ellipse at 50% 40%, rgba(245,197,0,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-xl rounded-2xl p-8 md:p-14 my-8"
        style={{
          background: "linear-gradient(135deg, rgba(18,18,18,0.98) 0%, rgba(28,28,28,0.96) 100%)",
          border: "1px solid rgba(245,197,0,0.20)",
          boxShadow: "0 0 60px rgba(245,197,0,0.08), 0 24px 48px rgba(0,0,0,0.5)",
        }}
      >
        <div className="h-5 mb-8 w-full" />

        <div className="mb-12 text-center">
          <p className="text-cf-yellow text-[10px] font-display font-bold tracking-[0.4em] uppercase mb-2">
            Registro de expositores
          </p>
          <h1 className="font-display text-3xl font-black text-white mb-2 text-center">
            Crear cuenta
          </h1>
          <p className="text-white/40 text-sm font-body text-center">
            Únete como expositor a la convención de cultura pop más grande del eje cafetero.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm mb-6 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
                Apellidos
              </label>
              <input
                type="text"
                name="apellidos"
                required
                value={formData.apellidos}
                onChange={handleChange}
                placeholder="Tus apellidos"
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                required
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Número de celular"
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
                Link Instagram
              </label>
              <input
                type="url"
                name="instagram"
                required
                value={formData.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/tumarca"
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
              Nombre de marca
            </label>
            <input
              type="text"
              name="marca"
              required
              value={formData.marca}
              onChange={handleChange}
              placeholder="¿Cómo se llama tu emprendimiento?"
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="tu@correo.com"
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pr-11 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-cf-yellow/40 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-white/25 text-[11px] font-body mt-1">
              Debe contener al menos 8 caracteres.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-5 rounded-xl font-display font-black text-sm transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
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

        <div className="flex items-center gap-3 my-7">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-white/25 text-xs font-body">o</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        <p className="text-center text-sm font-body text-white/40">
          ¿Ya eres expositor?{" "}
          <Link href="/login" className="text-cf-yellow hover:text-cf-yellow-light font-semibold transition-colors">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
