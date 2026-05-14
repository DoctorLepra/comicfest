"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, Eye, EyeOff } from "lucide-react";
import Particles from "@/components/ui/Particles";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg("Correo o contraseña incorrectos.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-32" style={{ paddingTop: "120px" }}>
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

      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-8 md:p-14"
        style={{
          background: "linear-gradient(135deg, rgba(18,18,18,0.98) 0%, rgba(28,28,28,0.96) 100%)",
          border: "1px solid rgba(245,197,0,0.20)",
          boxShadow: "0 0 60px rgba(245,197,0,0.08), 0 24px 48px rgba(0,0,0,0.5)",
        }}
      >
        <div className="h-5 mb-8 w-full" />

        <div className="mb-12 text-center">
          <p className="text-cf-yellow text-[10px] font-display font-bold tracking-[0.4em] uppercase mb-2">
            Comicfest Colombia
          </p>
          <h1 className="font-display text-3xl font-black text-white mb-2 text-center">
            Iniciar sesión
          </h1>
          <p className="text-white/40 text-sm font-body text-center">
            Accede a tu cuenta para gestionar tus entradas y actividades.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm mb-6 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-display font-semibold text-white/55 uppercase tracking-widest">
              Correo electrónico
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
                autoComplete="current-password"
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-5 rounded-xl font-display font-black text-sm transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
            style={{ backgroundColor: "#f5c500", color: "#0a0a0a" }}
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <LogIn size={15} strokeWidth={2.5} />
            )}
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-white/25 text-xs font-body">o</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        <p className="text-center text-sm font-body text-white/40">
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="text-cf-yellow hover:text-cf-yellow-light font-semibold transition-colors">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
