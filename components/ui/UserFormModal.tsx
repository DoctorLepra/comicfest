"use client";

import React from "react";
import { UserPlus, Edit2, ShieldCheck, Loader2 } from "lucide-react";
import DashboardModal from "./DashboardModal";
import clsx from "clsx";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  formError: string;
  isSubmitting: boolean;
  userRequiresPasswordChange: boolean;
}

export default function UserFormModal({
  isOpen,
  onClose,
  mode,
  formData,
  setFormData,
  onSubmit,
  formError,
  isSubmitting,
  userRequiresPasswordChange,
}: UserFormModalProps) {
  const footer = (
    <>
      <button
        type="button"
        onClick={onClose}
        className="px-5 py-2.5 rounded-xl text-sm font-bold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
      >
        Cancelar
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        onClick={onSubmit}
        className="px-5 py-2.5 rounded-xl text-sm font-bold text-black bg-cf-yellow hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 font-display uppercase tracking-wider"
      >
        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : mode === "create" ? <UserPlus size={16} /> : <Edit2 size={16} />}
        {mode === "create" ? "Confirmar Creación" : "Guardar Cambios"}
      </button>
    </>
  );

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "create" ? "Crear Nuevo Usuario" : "Editar Usuario"}
      icon={<UserPlus size={20} />}
      footer={footer}
      maxWidth="max-w-md"
    >
      <form onSubmit={onSubmit} className="space-y-5">
        {formError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-display font-bold text-white/40 uppercase tracking-wider">Nombre</label>
            <input
              required
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-cf-yellow/50 focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-display font-bold text-white/40 uppercase tracking-wider">Apellidos</label>
            <input
              required
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-cf-yellow/50 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-display font-bold text-white/40 uppercase tracking-wider">Correo Electrónico</label>
          <input
            required
            disabled={mode === "edit"}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={clsx(
              "w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all",
              mode === "edit"
                ? "bg-white/5 border-transparent text-white/40 cursor-not-allowed"
                : "bg-[#1a1a1a] border-white/10 text-white focus:border-cf-yellow/50"
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-display font-bold text-white/40 uppercase tracking-wider">Teléfono</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-cf-yellow/50 focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-display font-bold text-white/40 uppercase tracking-wider">Rol de Acceso</label>
            <div className="relative">
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-cf-yellow/50 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="superadmin">Superadmin</option>
                <option value="admin">Administrador</option>
                <option value="coordinator">Coordinador</option>
                <option value="editor">Editor</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-display font-bold text-white/40 uppercase tracking-wider">
            {mode === "create" ? "Contraseña Temporal" : "Actualizar Contraseña"}
          </label>

          {mode === "edit" && !userRequiresPasswordChange ? (
            <div className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-2.5 text-white/40 text-sm cursor-not-allowed flex items-center justify-between">
              <span>Protegida por el usuario</span>
              <ShieldCheck size={16} />
            </div>
          ) : (
            <input
              required={mode === "create"}
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder={mode === "create" ? "Mínimo 8 caracteres, 1 mayúscula, 1 especial" : "Dejar en blanco para mantener"}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-cf-yellow/50 focus:outline-none transition-colors"
            />
          )}

          {mode === "create" ? (
            <p className="text-[10px] text-white/40 pt-1">El usuario deberá cambiarla obligatoriamente al iniciar sesión.</p>
          ) : userRequiresPasswordChange ? (
            <p className="text-[10px] text-cf-yellow/70 pt-1">El usuario aún no ha cambiado su contraseña temporal.</p>
          ) : (
            <p className="text-[10px] text-white/40 pt-1">El usuario ya personalizó su contraseña.</p>
          )}
        </div>
      </form>
    </DashboardModal>
  );
}
