"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ShieldCheck, UserPlus, Search, Edit2, Trash2, X, Loader2 } from "lucide-react";
import clsx from "clsx";

type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  phone: string;
  created_at: string;
};

export default function UsuariosPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "admin",
    password: ""
  });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok && data.users) {
        setUsers(data.users as UserProfile[]);
      } else {
        console.error("Error fetching users:", data.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUpperCase && hasSpecialChar;
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!validatePassword(formData.password)) {
      setFormError("La contraseña debe tener mínimo 8 caracteres, 1 mayúscula y 1 carácter especial.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Error al crear usuario");
      }

      // Success
      setIsModalOpen(false);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", role: "admin", password: "" });
      fetchUsers(); // Refresh table
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = users.filter((u) => 
    `${u.first_name} ${u.last_name} ${u.email} ${u.role}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 w-full h-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1 flex items-center gap-3">
            <ShieldCheck className="text-cf-yellow" size={24} />
            Gestión de Usuarios
          </h1>
          <p className="text-white/60 text-sm">Administra el personal, editores y coordinadores del evento.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-display font-bold text-sm bg-cf-yellow text-black hover:bg-yellow-400 hover:scale-[1.02] transition-all"
        >
          <UserPlus size={18} />
          Crear Usuario
        </button>
      </div>

      <div className="flex-1 flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <h2 className="text-lg font-display font-semibold text-white">Directorio del Sistema</h2>
          
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Buscar usuario..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cf-yellow/50 w-64 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-white/40 gap-4 min-h-[300px]">
              <Loader2 size={32} className="animate-spin text-cf-yellow" />
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#0a0a0a] z-10 shadow-[0_1px_0_rgba(255,255,255,0.1)]">
                <tr>
                  <th className="px-6 py-4 text-xs font-display font-bold text-white/50 uppercase tracking-wider">Usuario</th>
                  <th className="px-6 py-4 text-xs font-display font-bold text-white/50 uppercase tracking-wider">Contacto</th>
                  <th className="px-6 py-4 text-xs font-display font-bold text-white/50 uppercase tracking-wider">Rol</th>
                  <th className="px-6 py-4 text-xs font-display font-bold text-white/50 uppercase tracking-wider">Fecha Registro</th>
                  <th className="px-6 py-4 text-right text-xs font-display font-bold text-white/50 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{user.first_name} {user.last_name}</div>
                      <div className="text-xs text-white/40 font-mono mt-1">{user.id.slice(0, 8)}...</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white/80">{user.email}</div>
                      <div className="text-xs text-white/40 mt-1">{user.phone || "Sin teléfono"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border",
                        user.role === "superadmin" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                        user.role === "admin" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                        user.role === "coordinator" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                        user.role === "editor" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                        "bg-white/5 text-white/50 border-white/10"
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button className="p-2 text-white/40 hover:text-red-400 bg-white/5 hover:bg-red-400/10 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Crear Usuario */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
              <h3 className="text-xl font-display font-bold text-white">Crear Nuevo Usuario</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {formError}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-display font-bold text-white/50 uppercase tracking-wider">Nombre</label>
                  <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-cf-yellow/50 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-display font-bold text-white/50 uppercase tracking-wider">Apellidos</label>
                  <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-cf-yellow/50 focus:outline-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-display font-bold text-white/50 uppercase tracking-wider">Correo Electrónico</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-cf-yellow/50 focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-display font-bold text-white/50 uppercase tracking-wider">Teléfono</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-cf-yellow/50 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-display font-bold text-white/50 uppercase tracking-wider">Rol de Acceso</label>
                  <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-cf-yellow/50 focus:outline-none appearance-none">
                    <option value="admin">Administrador</option>
                    <option value="coordinator">Coordinador</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-display font-bold text-white/50 uppercase tracking-wider">Contraseña Temporal</label>
                <input 
                  required 
                  type="password" 
                  value={formData.password} 
                  onChange={e => setFormData({...formData, password: e.target.value})} 
                  placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 especial"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-cf-yellow/50 focus:outline-none" 
                />
                <p className="text-[10px] text-white/40 pt-1">El usuario deberá cambiarla obligatoriamente al iniciar sesión por primera vez.</p>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-black bg-cf-yellow hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
                  Confirmar Creación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
