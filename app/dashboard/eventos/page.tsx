"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Calendar, MapPin, MoreHorizontal, ChevronDown, ChevronRight, Copy, Settings, Search, ArrowDownAZ, ArrowUpZA, Filter, Check } from "lucide-react";
import clsx from "clsx";
import StandModal from "@/components/ui/StandModal";
import PolicyFormModal from "@/components/ui/PolicyFormModal";
import { supabase } from "@/lib/supabase";

// Tipos de prueba (luego vendrán de Supabase)
type EventItem = {
  id: string;
  name: string;
  sales: string;
  reservations: number;
  location: string;
  startDate: string;
  status: "draft" | "published" | "archived";
};

type StandCategory = {
  id: string;
  name: string;
};

type PolicyItem = {
  id: string;
  name: string;
};

export default function EventosPage() {
  const [openAccordion, setOpenAccordion] = useState<"stands" | "policies" | null>(null);
  const [isStandModalOpen, setIsStandModalOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "archived" | "draft">("all");
  const [dateFilter, setDateFilter] = useState("");
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchEvents();
    fetchPolicies();
    fetchStands();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*').order('start_date', { ascending: false });
    if (data) {
      setEvents(data);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este evento?")) {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) {
        console.error("Error deleting event:", error);
      } else {
        fetchEvents();
        setSelectedEvents(selectedEvents.filter(eId => eId !== id));
      }
    }
  };

  const handleDeleteSelectedEvents = async () => {
    if (confirm(`¿Estás seguro de eliminar ${selectedEvents.length} eventos seleccionados?`)) {
      const { error } = await supabase.from('events').delete().in('id', selectedEvents);
      if (error) {
        console.error("Error deleting events:", error);
      } else {
        fetchEvents();
        setSelectedEvents([]);
      }
    }
  };

  let filteredEvents = [...events];

  if (searchTerm) {
    filteredEvents = filteredEvents.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  
  if (statusFilter !== "all") {
    filteredEvents = filteredEvents.filter(e => e.status === statusFilter);
  }

  if (dateFilter) {
    filteredEvents = filteredEvents.filter(e => e.start_date === dateFilter);
  }

  filteredEvents.sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name);
  });

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleSelectAll = () => {
    if (selectedEvents.length === filteredEvents.length && filteredEvents.length > 0) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(filteredEvents.map(e => e.id));
    }
  };

  const toggleSelectEvent = (id: string) => {
    if (selectedEvents.includes(id)) {
      setSelectedEvents(selectedEvents.filter(eId => eId !== id));
    } else {
      setSelectedEvents([...selectedEvents, id]);
    }
  };

  const [stands, setStands] = useState<any[]>([]);
  const [editingStand, setEditingStand] = useState<any>(null);

  const [policies, setPolicies] = useState<{id: string, title: string, content: string}[]>([]);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<any>(null);

  useEffect(() => {
    // Ya se cargan arriba
  }, []);

  const fetchStands = async () => {
    const { data, error } = await supabase.from('stands').select('*').order('created_at', { ascending: false });
    if (data) {
      setStands(data);
    }
  };

  const handleDeleteStand = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este stand?")) {
      const { error } = await supabase.from('stands').delete().eq('id', id);
      if (error) {
        console.error("Error deleting stand:", error);
      } else {
        fetchStands();
      }
    }
  };

  const handleSaveStand = async (data: any) => {
    try {
      const rawPrice = Number(data.precio.replace(/\D/g, ""));
      const payload = {
        identifier: data.nombre,
        category: data.categoria,
        dimensions: data.metraje,
        base_price: rawPrice,
        status: 'available',
        description: data.descripcion
      };

      if (editingStand) {
        const { error } = await supabase.from('stands').update(payload).eq('id', editingStand.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('stands').insert(payload);
        if (error) throw error;
      }
      
      setIsStandModalOpen(false);
      setEditingStand(null);
      fetchStands();
    } catch (err) {
      console.error("Error saving stand:", err);
    }
  };

  const fetchPolicies = async () => {
    const { data, error } = await supabase.from('policies').select('*').order('created_at', { ascending: false });
    if (data) {
      setPolicies(data);
    }
  };

  const handleDeletePolicy = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta política?")) {
      const { error } = await supabase.from('policies').delete().eq('id', id);
      if (error) {
        console.error("Error deleting policy:", error);
      } else {
        fetchPolicies();
      }
    }
  };

  const handleSavePolicy = async (data: { nombre: string; descripcion: string }) => {
    let error;
    if (editingPolicy) {
      const { error: updateError } = await supabase.from('policies').update({
        title: data.nombre,
        content: data.descripcion
      }).eq('id', editingPolicy.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('policies').insert({
        title: data.nombre,
        content: data.descripcion
      });
      error = insertError;
    }

    if (error) {
      console.error("Error saving policy:", error);
      throw new Error(error.message);
    }

    setIsPolicyModalOpen(false);
    setEditingPolicy(null);
    fetchPolicies();
  };


  const toggleAccordion = (section: "stands" | "policies") => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="p-6 w-full h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1 flex items-center gap-3">
            <Calendar className="text-cf-yellow" size={24} />
            Gestión de eventos
          </h1>
          <p className="text-white/60 text-sm">Administra los stands, detalles, reservas de cada evento</p>
        </div>
        
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl font-display font-bold text-sm bg-cf-yellow text-black hover:bg-yellow-400 hover:scale-[1.02] transition-all">
          <Plus size={18} />
          Crear evento
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Acordeón: Stands */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <button 
            onClick={() => toggleAccordion("stands")}
            className="w-full p-5 flex items-center justify-between bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <h2 className="text-lg font-display font-semibold text-white">Stands</h2>
            {openAccordion === "stands" ? <ChevronDown className="text-white/40" /> : <ChevronRight className="text-white/40" />}
          </button>
          
          {openAccordion === "stands" && (
            <div className="p-5 border-t border-white/10 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsStandModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs bg-cf-yellow/10 border border-cf-yellow/20 text-cf-yellow hover:bg-cf-yellow/20 hover:border-cf-yellow/30 transition-all"
                >
                  <Plus size={14} /> Crear stand
                </button>
              </div>
              
              <div className="flex flex-col gap-3">
                {stands.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                    <p className="text-sm text-white/40">No hay stands creados aún</p>
                  </div>
                ) : (
                  stands.map((stand, idx) => (
                    <div key={stand.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="text-white/40 font-mono text-sm">{idx + 1}.</span>
                        <div className="flex flex-col">
                          <span className="text-white font-medium text-sm">{stand.identifier}</span>
                          <span className="text-[10px] text-white/40">{stand.category} • {stand.dimensions}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setEditingStand(stand);
                            setIsStandModalOpen(true);
                          }}
                          className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteStand(stand.id)}
                          className="p-2 text-white/40 hover:text-red-400 bg-white/5 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Acordeón: Políticas */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <button 
            onClick={() => toggleAccordion("policies")}
            className="w-full p-5 flex items-center justify-between bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <h2 className="text-lg font-display font-semibold text-white">Políticas</h2>
            {openAccordion === "policies" ? <ChevronDown className="text-white/40" /> : <ChevronRight className="text-white/40" />}
          </button>
          
          {openAccordion === "policies" && (
            <div className="p-5 border-t border-white/10 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex justify-end">
                <button 
                  onClick={() => {
                    setEditingPolicy(null);
                    setIsPolicyModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs bg-cf-yellow/10 border border-cf-yellow/20 text-cf-yellow hover:bg-cf-yellow/20 hover:border-cf-yellow/30 transition-all">
                  <Plus size={14} /> Crear política
                </button>
              </div>
              
              <div className="flex flex-col gap-3">
                {policies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                    <p className="text-sm text-white/40">No hay políticas creadas aún</p>
                  </div>
                ) : (
                policies.map((policy, idx) => (
                  <div key={policy.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-white/40 font-mono text-sm">{idx + 1}.</span>
                      <span className="text-white font-medium text-sm">{policy.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setEditingPolicy(policy);
                          setIsPolicyModalOpen(true);
                        }}
                        className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeletePolicy(policy.id)}
                        className="p-2 text-white/40 hover:text-red-400 bg-white/5 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabla de Eventos */}
      <div className="flex-1 flex flex-col mt-4">
        <div className="py-4 flex items-center gap-3 overflow-x-auto">
          <div className="flex items-center gap-2 mr-2 whitespace-nowrap">
            <div className="w-1.5 h-1.5 rounded-full bg-cf-yellow animate-pulse"></div>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">Eventos</h2>
            <div className="px-2 py-0.5 rounded-md bg-cf-yellow/10 text-cf-yellow text-xs font-bold border border-cf-yellow/20">
              {filteredEvents.length}
            </div>
          </div>
          
          <button 
            onClick={toggleSelectAll}
            className={clsx(
              "whitespace-nowrap px-4 py-2 border rounded-xl text-sm font-medium transition-colors",
              (selectedEvents.length === filteredEvents.length && filteredEvents.length > 0)
                ? "bg-white/10 border-white/20 text-white" 
                : "bg-white/[0.03] border-white/10 text-[#8a94a6] hover:bg-white/10 hover:text-white"
            )}
          >
            Seleccionar todo
          </button>

          <div className="relative flex-1 min-w-[250px] max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Buscar nombre, documento..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#050505] border border-white/10 rounded-xl text-sm text-[#8a94a6] focus:outline-none focus:border-cf-yellow/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2">
            <Filter size={16} className="text-[#8a94a6]" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-sm font-medium text-[#8a94a6] focus:outline-none border-none appearance-none cursor-pointer pr-2"
            >
              <option value="all" className="bg-[#141414]">Todos los estados</option>
              <option value="published" className="bg-[#141414]">Abierto</option>
              <option value="archived" className="bg-[#141414]">Cerrado</option>
              <option value="draft" className="bg-[#141414]">Borrador</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2">
            <Calendar size={16} className="text-[#8a94a6]" />
            <input 
              type="date" 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent text-sm font-medium text-[#8a94a6] focus:outline-none border-none appearance-none cursor-pointer w-[120px]"
              style={{ colorScheme: 'dark' }}
            />
          </div>

          <button 
            onClick={() => setSortOrder("asc")}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 border border-white/10 rounded-xl text-sm font-medium transition-colors",
              sortOrder === "asc" ? "bg-white/10 text-white" : "bg-white/[0.03] text-[#8a94a6] hover:bg-white/10 hover:text-white"
            )}
          >
            <ArrowDownAZ size={16} /> A-Z
          </button>

          <button 
            onClick={() => setSortOrder("desc")}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 border border-white/10 rounded-xl text-sm font-medium transition-colors",
              sortOrder === "desc" ? "bg-white/10 text-white" : "bg-white/[0.03] text-[#8a94a6] hover:bg-white/10 hover:text-white"
            )}
          >
            <ArrowUpZA size={16} /> Z-A
          </button>

          {selectedEvents.length > 0 && (
            <button 
              onClick={handleDeleteSelectedEvents}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-colors animate-in fade-in slide-in-from-right-4 ml-auto"
            >
              <Trash2 size={16} /> Eliminar ({selectedEvents.length})
            </button>
          )}
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 bg-[#050505] z-10 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-white/40 bg-white/10 checked:bg-white checked:border-white cursor-pointer appearance-none relative before:content-['✓'] before:absolute before:text-black before:text-xs before:font-bold before:opacity-0 checked:before:opacity-100 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 flex items-center justify-center transition-all"
                    checked={filteredEvents.length > 0 && selectedEvents.length === filteredEvents.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4 text-xs font-display font-bold text-white/50 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-4 text-xs font-display font-bold text-white/50 uppercase tracking-wider">Ventas</th>
                <th className="px-6 py-4 text-xs font-display font-bold text-white/50 uppercase tracking-wider">Reservas</th>
                <th className="px-6 py-4 text-xs font-display font-bold text-white/50 uppercase tracking-wider">Lugar</th>
                <th className="px-6 py-4 text-xs font-display font-bold text-white/50 uppercase tracking-wider">Fecha de inicio</th>
                <th className="px-6 py-4 text-right text-xs font-display font-bold text-white/50 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedEvents.map((event) => (
                <tr 
                  key={event.id} 
                  className={clsx(
                    "transition-colors group",
                    selectedEvents.includes(event.id) ? "bg-cf-yellow/5" : "hover:bg-white/[0.02]"
                  )}
                >
                  <td className="px-6 py-4 w-12">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-white/40 bg-white/10 checked:bg-white checked:border-white cursor-pointer appearance-none relative before:content-['✓'] before:absolute before:text-black before:text-xs before:font-bold before:opacity-0 checked:before:opacity-100 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 flex items-center justify-center transition-all"
                      checked={selectedEvents.includes(event.id)}
                      onChange={() => toggleSelectEvent(event.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-white flex items-center gap-2">
                      {event.name}
                      {event.status === "archived" && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider">Cerrado</span>
                      )}
                    </div>
                  </td>
                   <td className="px-6 py-4 text-sm text-green-400 font-mono font-medium">$0</td>
                  <td className="px-6 py-4 text-sm text-white/80">0 stands</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <MapPin size={14} />
                      {event.location}
                    </div>
                  </td>
                   <td className="px-6 py-4 text-sm text-white/60">{event.start_date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block text-left group/dropdown">
                      <button className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors focus:outline-none">
                        <MoreHorizontal size={16} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#141414] border border-white/10 shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-20 overflow-hidden translate-y-1 group-hover/dropdown:translate-y-0">
                        <div className="py-1">
                          <button className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-2">
                            <Settings size={14} /> Administrar
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-2">
                            <Copy size={14} /> Duplicar
                          </button>
                           <button 
                            onClick={() => handleDeleteEvent(event.id)}
                            className="w-full text-left px-4 py-2 text-sm text-red-400/80 hover:bg-red-500/10 hover:text-red-400 flex items-center gap-2 border-t border-white/5 mt-1 pt-2"
                          >
                            <Trash2 size={14} /> Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginador */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-white/10 flex items-center justify-between bg-white/[0.01]">
            <span className="text-xs text-white/40 font-mono">
              Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredEvents.length)} de {filteredEvents.length} registros
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

      <StandModal 
        isOpen={isStandModalOpen} 
        initialData={editingStand}
        onClose={() => {
          setIsStandModalOpen(false);
          setEditingStand(null);
        }} 
        onSave={handleSaveStand}
      />
      <PolicyFormModal
        isOpen={isPolicyModalOpen}
        initialData={editingPolicy}
        onClose={() => {
          setIsPolicyModalOpen(false);
          setEditingPolicy(null);
        }}
        onSave={handleSavePolicy}
      />
    </div>
  );
}
