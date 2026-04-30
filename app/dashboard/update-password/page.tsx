"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ShieldAlert, Loader2, KeyRound } from "lucide-react";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validatePassword = (pass: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    return pass.length >= minLength && hasUpperCase && hasSpecialChar;
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!validatePassword(password)) {
      setError("La contraseña debe tener mínimo 8 caracteres, 1 mayúscula y 1 carácter especial.");
      return;
    }

    setLoading(true);
    try {
      // 1. Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
        data: { requires_password_change: false } // Remove the flag!
      });

      if (updateError) throw updateError;

      // 2. Success, redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Error al actualizar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#0a0a0a] border border-cf-yellow/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(245,197,0,0.1)] relative overflow-hidden">
        
        {/* BG Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cf-yellow/20 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-cf-yellow/10 flex items-center justify-center mb-4 border border-cf-yellow/20">
            <ShieldAlert size={32} className="text-cf-yellow" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white mb-2">Seguridad Requerida</h1>
          <p className="text-sm text-white/60">
            Por motivos de seguridad, es obligatorio que cambies la contraseña temporal asignada por tu administrador antes de continuar.
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4 relative z-10">
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-display font-bold text-white/50 uppercase tracking-wider">Nueva Contraseña</label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 especial"
                className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-cf-yellow/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-display font-bold text-white/50 uppercase tracking-wider">Confirmar Contraseña</label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Vuelve a escribir tu contraseña"
                className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-cf-yellow/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-black bg-cf-yellow hover:bg-yellow-400 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Actualizar y Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
