"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ShieldCheck, UserPlus, Search, Edit2, Trash2, Loader2 } from "lucide-react";
import clsx from "clsx";
import UserFormModal from "@/components/ui/UserFormModal";

type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  phone: string;
  created_at: string;
  requires_password_change?: boolean;
};

export default function UsuariosPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userRequiresPasswordChange, setUserRequiresPasswordChange] = useState(true);
  
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
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  const filteredUsers = users.filter(user => 
    `${user.first_name} ${user.last_name} ${user.email} ${user.role}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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

  const openCreateModal = () => {
    setModalMode("create");
    setEditingUserId(null);
    setFormData({ firstName: "", lastName: "", email: "", phone: "", role: "admin", password: "" });
    setUserRequiresPasswordChange(true);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserProfile) => {
    setModalMode("edit");
    setEditingUserId(user.id);
    setFormData({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      password: "" // Empty by default
    });
    setUserRequiresPasswordChange(user.requires_password_change ?? false);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente al usuario ${name}?`)) return;
    
    setIsDeletingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al eliminar usuario");
      
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (modalMode === "create" && !validatePassword(formData.password)) {
      setFormError("La contraseña debe tener mínimo 8 caracteres, 1 mayúscula y 1 carácter especial.");
      return;
    }

    if (modalMode === "edit" && formData.password && !validatePassword(formData.password)) {
      setFormError("La nueva contraseña debe tener mínimo 8 caracteres, 1 mayúscula y 1 carácter especial.");
      return;
    }

    setIsSubmitting(true);
    try {
      const url = modalMode === "create" ? "/api/admin/users" : `/api/admin/users/${editingUserId}`;
      const method = modalMode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || `Error al ${modalMode === "create" ? "crear" : "actualizar"} usuario`);
      }

      // Success
      setIsModalOpen(false);
      fetchUsers(); // Refresh table
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          onClick={openCreateModal}
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
                {paginatedUsers.map((user) => (
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
                        <button 
                          onClick={() => openEditModal(user)}
                          className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id, `${user.first_name} ${user.last_name}`)}
                          disabled={isDeletingId === user.id}
                          className="p-2 text-white/40 hover:text-red-400 bg-white/5 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {isDeletingId === user.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Paginador */}
        {filteredUsers.length > 0 && totalPages > 1 && (
          <div className="p-4 border-t border-white/10 flex items-center justify-between bg-white/[0.01]">
            <span className="text-xs text-white/40 font-mono">
              Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} de {filteredUsers.length} registros
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white/40 hover:text-white hover:bg-white/5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                &laquo;
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white/40 hover:text-white hover:bg-white/5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                &lsaquo;
              </button>
              
              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                return (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-colors ${
                      currentPage === page 
                        ? "bg-cf-yellow text-black" 
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white/40 hover:text-white hover:bg-white/5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                &rsaquo;
              </button>
              <button 
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white/40 hover:text-white hover:bg-white/5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                &raquo;
              </button>
            </div>
          </div>
        )}
      </div>

      <UserFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        formError={formError}
        isSubmitting={isSubmitting}
        userRequiresPasswordChange={userRequiresPasswordChange}
      />
    </div>
  );
}
