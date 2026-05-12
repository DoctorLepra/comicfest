"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  LayoutDashboard, 
  ShieldCheck,
  Edit2, 
  ExternalLink,
  Globe,
  EyeOff,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowRight,
  Plus,
  Map,
  Trash2,
  FileText
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import AssignStandsModal from "@/components/ui/AssignStandsModal";
import StandModal from "@/components/ui/StandModal";
import StandMapEditor from "@/components/ui/StandMapEditor";
import DashboardModal from "@/components/ui/DashboardModal";
import PolicyFormModal from "@/components/ui/PolicyFormModal";
import AssignPoliciesModal from "@/components/ui/AssignPoliciesModal";
import { Search, Filter, Trash2 as TrashIcon, Check } from "lucide-react";

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");
  const [isMapMode, setIsMapMode] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEditStandModalOpen, setIsEditStandModalOpen] = useState(false);
  const [editingStandData, setEditingStandData] = useState<any>(null);

  // Policy Modal States
  const [isAssignPolicyModalOpen, setIsAssignPolicyModalOpen] = useState(false);
  const [isEditPolicyModalOpen, setIsEditPolicyModalOpen] = useState(false);
  const [editingPolicyData, setEditingPolicyData] = useState<any>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedReservations, setSelectedReservations] = useState<string[]>([]);
  const [reservationAlerts, setReservationAlerts] = useState<{id: string, message: string}[]>([]);

  useEffect(() => {
    fetchEventDetails();
    fetchReservations();
  }, [id]);

  const fetchEventDetails = async () => {
    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .select('*, stands:stands(*), policies:policies(*)')
      .eq('id', id)
      .single();

    if (eventData) {
      const { count: policiesCount } = await supabase
        .from('policies')
        .select('*', { count: 'exact', head: true });

      setEvent({
        ...eventData,
        stands_count: eventData.stands?.length || 0,
        policies_count: policiesCount || 0
      });
    }
    setLoading(false);
  };

  const handleStatusToggle = async () => {
    if (!event) return;
    
    const newStatus = event.status === 'published' ? 'draft' : 'published';
    
    const { error } = await supabase
      .from('events')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert("Error al actualizar el estado");
    } else {
      setEvent({ ...event, status: newStatus });
    }
  };

  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from('stand_reservations')
      .select(`
        *,
        exhibitor:profiles!exhibitor_id(brand_name, first_name, last_name),
        stand:stands!stand_id(numeracion, identifier)
      `)
      .eq('stand:stands.event_id', id);

    if (data) {
      // Filter manually because Supabase filter on joined tables might be tricky depending on API version
      // Or we can use nested filter if supported. 
      // Let's assume we fetch all and filter in JS if the query above returns everything.
      // Actually, a better way is to join from stands or filter by event_id if we have it in stand_reservations.
      // Looking at the schema, stand_reservations doesn't have event_id, only stand_id.
      
      // Let's get stand IDs for this event first
      const { data: eventStands } = await supabase.from('stands').select('id').eq('event_id', id);
      if (eventStands) {
        const standIds = eventStands.map(s => s.id);
        const { data: resData, error: resError } = await supabase
          .from('stand_reservations')
          .select(`
            *,
            exhibitor:profiles!exhibitor_id(brand_name, first_name, last_name),
            stand:stands!stand_id(id, numeracion, identifier)
          `)
          .in('stand_id', standIds)
          .order('created_at', { ascending: false });
        
        if (resData) setReservations(resData);
      }
    }
  };

  const handleDeleteReservation = async (reservationId: string) => {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) return;

    if (confirm("¿Estás seguro de eliminar esta reserva? El stand será liberado.")) {
      const { error: deleteError } = await supabase
        .from('stand_reservations')
        .delete()
        .eq('id', reservationId);

      if (!deleteError) {
        // Release stand
        await supabase
          .from('stands')
          .update({ status: 'available' })
          .eq('id', reservation.stand_id);

        // Show alert
        const alertId = Math.random().toString(36).substr(2, 9);
        const standLabel = reservation.stand?.numeracion || reservation.stand?.identifier || "N/A";
        setReservationAlerts(prev => [...prev, { id: alertId, message: `Stand ${standLabel} disponible para venta` }]);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
          setReservationAlerts(prev => prev.filter(a => a.id !== alertId));
        }, 5000);

        fetchReservations();
        fetchEventDetails();
      }
    }
  };

  const handleDeleteSelectedReservations = async () => {
    if (confirm(`¿Estás seguro de eliminar ${selectedReservations.length} reservas seleccionadas?`)) {
      for (const resId of selectedReservations) {
        const reservation = reservations.find(r => r.id === resId);
        if (reservation) {
          await supabase.from('stand_reservations').delete().eq('id', resId);
          await supabase.from('stands').update({ status: 'available' }).eq('id', reservation.stand_id);
          
          const standLabel = reservation.stand?.numeracion || reservation.stand?.identifier || "N/A";
          const alertId = Math.random().toString(36).substr(2, 9);
          setReservationAlerts(prev => [...prev, { id: alertId, message: `Stand ${standLabel} disponible para venta` }]);
          setTimeout(() => {
            setReservationAlerts(prev => prev.filter(a => a.id !== alertId));
          }, 5000);
        }
      }
      setSelectedReservations([]);
      fetchReservations();
      fetchEventDetails();
    }
  };

  const handleAssignStands = async (standIds: string[]) => {
    // Fetch the global stands to duplicate them
    const { data: globalStands } = await supabase
      .from('stands')
      .select('*')
      .in('id', standIds);
      
    if (globalStands && globalStands.length > 0) {
      const newStands = globalStands.map(gs => ({
        identifier: gs.identifier,
        numeracion: gs.numeracion,
        status: 'available', // default status for a new assigned stand (enum matches 'available')
        base_price: gs.base_price,
        dimensions: gs.dimensions,
        category: gs.category,
        description: gs.description,
        event_id: id // Assign to this event
      }));
      
      const { error } = await supabase.from('stands').insert(newStands);
      if (!error) {
        setIsAssignModalOpen(false);
        fetchEventDetails();
      } else {
        alert("Error al asignar stands");
      }
    }
  };

  const handleSaveStand = async (formData: any) => {
    const payload = {
      identifier: formData.nombre,
      numeracion: formData.numeracion,
      category: formData.categoria,
      dimensions: formData.metraje,
      description: formData.descripcion,
      base_price: parseFloat(formData.precio.replace(/\D/g, "")) || 0,
      sale_start_date: formData.sale_start_date ? new Date(formData.sale_start_date).toISOString() : null,
      sale_end_date: formData.sale_end_date ? new Date(formData.sale_end_date).toISOString() : null,
      event_id: id // If created from here, it belongs to the event
    };

    if (editingStandData?.id) {
      // Update
      const { error } = await supabase.from('stands').update(payload).eq('id', editingStandData.id);
      if (!error) {
        setIsEditStandModalOpen(false);
        fetchEventDetails();
      }
    } else {
      // Create new global stand (wait, the prompt says "si un stand no esta creado, tendra la posibilidad de crearlo de forma general para todos los eventos")
      // BUT if we create from "Agregar Stands -> Crear Stand General" it should have event_id null.
      // So if editingStandData is specifically flagged as global, we set event_id null.
      // Let's check a flag. We'll pass a special initialData for global creation.
      if (editingStandData?.isGlobal) {
        // @ts-ignore
        payload.event_id = null as any;
      }
      
      const { error } = await supabase.from('stands').insert([payload]);
      if (!error) {
        setIsEditStandModalOpen(false);
        fetchEventDetails();
      }
    }
  };

  const handleAssignPolicies = async (policyIds: string[]) => {
    const { data: globalPolicies } = await supabase
      .from('policies')
      .select('*')
      .in('id', policyIds);
      
    if (globalPolicies && globalPolicies.length > 0) {
      const newPolicies = globalPolicies.map(gp => ({
        title: gp.title,
        content: gp.content,
        type: gp.type || 'general',
        event_id: id // Assign to this event
      }));
      
      const { error } = await supabase.from('policies').insert(newPolicies);
      if (!error) {
        setIsAssignPolicyModalOpen(false);
        fetchEventDetails();
      } else {
        alert("Error al asignar políticas");
      }
    }
  };

  const handleSavePolicy = async (formData: any) => {
    const payload: any = {
      title: formData.nombre,
      content: formData.descripcion,
      event_id: id 
    };

    if (editingPolicyData?.id) {
      // Update existing
      const { error } = await supabase.from('policies').update(payload).eq('id', editingPolicyData.id);
      if (!error) {
        setIsEditPolicyModalOpen(false);
        fetchEventDetails();
      }
    } else {
      // Create new
      if (editingPolicyData?.isGlobal) {
        payload.event_id = null; // Create global policy
      }
      const { error } = await supabase.from('policies').insert([payload]);
      if (!error) {
        setIsEditPolicyModalOpen(false);
        fetchEventDetails();
      }
    }
  };

  const handleDeletePolicy = async (policyId: string) => {
    if (confirm("¿Estás seguro de eliminar esta política de este evento?")) {
      const { error } = await supabase.from('policies').delete().eq('id', policyId);
      if (!error) fetchEventDetails();
    }
  };

  const handleDeleteStand = async (standId: string) => {
    if (confirm("¿Seguro que deseas eliminar este stand del evento?")) {
      const { error } = await supabase.from('stands').delete().eq('id', standId);
      if (!error) {
        fetchEventDetails();
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 border-4 border-cf-yellow/20 border-t-cf-yellow rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-4">
        <p className="text-white/60">Evento no encontrado</p>
        <button 
          onClick={() => router.push('/dashboard/eventos')}
          className="text-cf-yellow hover:underline"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  const tabs = [
    { id: "general", label: "Información General", icon: LayoutDashboard },
    { id: "stands", label: "Mapa de Stands", icon: MapPin },
    { id: "policies", label: "Políticas", icon: ShieldCheck },
    { id: "reservations", label: "Reservas", icon: Users },
  ];

  const standsAssigned = (event as any)?.stands_count > 0 || (event?.stands?.length > 0);
  const hasStandsWithoutDates = event?.stands && event.stands.length > 0 
    ? event.stands.some((s: any) => !s.sale_start_date || !s.sale_end_date)
    : false;

  const checklistItems = [
    { 
      id: "stands", 
      label: "Asignar Stands", 
      description: "Define los espacios disponibles para el evento.",
      completed: standsAssigned,
      link: "#stands"
    },
    { 
      id: "stands_dates", 
      label: "Configurar Fechas de Venta", 
      description: "Asegúrate de que todos los stands tengan fecha de inicio y fin de reserva.",
      completed: standsAssigned && !hasStandsWithoutDates,
      link: "#stands"
    },
    { 
      id: "policies", 
      label: "Asignar Políticas", 
      description: "Carga los documentos legales y normativas.",
      completed: (event as any)?.policies_count > 0,
      link: "#policies"
    }
  ];

  const completedCount = checklistItems.filter(i => i.completed).length;
  const progressPercent = (completedCount / checklistItems.length) * 100;
  const isReadyToPublish = progressPercent === 100;

  return (
    <div className="p-6 max-w-[1600px] mx-auto w-full h-full flex flex-col gap-8 relative">
      {/* Notifications/Alerts */}
      <div className="fixed top-24 right-8 z-[200] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {reservationAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl bg-cf-yellow text-black shadow-[0_20px_40px_rgba(255,204,0,0.3)] border border-white/20 min-w-[300px]"
            >
              <div className="p-2 rounded-full bg-black/10">
                <CheckCircle2 size={20} />
              </div>
              <p className="font-bold text-sm tracking-tight">{alert.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.push('/dashboard/eventos')}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
            <ChevronLeft size={18} />
          </div>
          <span className="text-sm font-medium">Volver a eventos</span>
        </button>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
            <Edit2 size={16} />
            Editar evento
          </button>
          
          <div className="relative group/publish">
            <button 
              onClick={() => {
                if (event.status === 'published' || isReadyToPublish) {
                  handleStatusToggle();
                }
              }}
              disabled={event.status === 'draft' && !isReadyToPublish}
              className={clsx(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(0,0,0,0.1)]",
                event.status === 'published' 
                  ? "bg-white/10 text-white/70 hover:bg-white/20 border border-white/10" 
                  : (isReadyToPublish 
                      ? "bg-cf-yellow text-black hover:bg-yellow-400 hover:scale-[1.02]" 
                      : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed grayscale")
              )}
            >
              {event.status === 'published' ? (
                <>
                  <EyeOff size={16} />
                  Mover a borradores
                </>
              ) : (
                <>
                  <Globe size={16} />
                  Publicar evento
                </>
              )}
            </button>

            {event.status === 'draft' && !isReadyToPublish && (
              <div className="absolute top-full right-0 mt-2 w-48 p-3 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-2xl opacity-0 invisible group-hover/publish:opacity-100 group-hover/publish:visible transition-all z-[110]">
                <p className="text-[10px] text-white/60 leading-tight">
                  <span className="text-cf-yellow font-bold block mb-1">Acción Bloqueada</span>
                  Debes completar todos los pendientes de la checklist para poder publicar este evento.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 flex flex-col gap-8">
          {/* Main Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Calendar size={120} />
            </div>

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className={clsx(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                    event.status === 'published' ? "bg-green-500/10 text-green-400 border-green-500/20" : 
                    event.status === 'draft' ? "bg-cf-yellow/10 text-cf-yellow border-cf-yellow/20" :
                    "bg-red-500/10 text-red-400 border-red-500/20"
                  )}>
                    {event.status === 'published' ? 'Publicado' : event.status === 'draft' ? 'Borrador' : 'Cerrado'}
                  </span>
                </div>
                <h1 className="text-4xl font-display font-bold text-white tracking-tight">{event.name}</h1>
              </div>

              <p className="text-white/60 max-w-2xl leading-relaxed" dangerouslySetInnerHTML={{ __html: event.description || "Sin descripción disponible." }} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="p-3 rounded-xl bg-cf-yellow/10 text-cf-yellow">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Fecha</p>
                    <p className="text-sm text-white font-medium">
                      {new Date(event.start_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                      {event.end_date && ` - ${new Date(event.end_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Horario</p>
                    <p className="text-sm text-white font-medium">
                      {event.open_time?.slice(0, 5) || '--:--'} - {event.close_time?.slice(0, 5) || '--:--'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Ubicación</p>
                    <p className="text-sm text-white font-medium line-clamp-1">{event.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/10 self-start">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                    activeTab === tab.id 
                      ? "bg-cf-yellow text-black shadow-lg" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'stands' ? (
              <>
                {/* Modal del Editor de Mapa */}
                <DashboardModal
                  isOpen={isMapMode}
                  onClose={() => setIsMapMode(false)}
                  title="Editor de Mapa Interactivo"
                  maxWidth="max-w-[95vw]"
                >
                  <StandMapEditor 
                    eventId={event.id}
                    floorplanUrl={event.floorplan_url}
                    stands={event.stands || []}
                    onUpdate={fetchEventDetails}
                  />
                </DashboardModal>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-6"
                >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Stands del Evento</h3>
                    <p className="text-sm text-white/40">Gestiona los espacios físicos disponibles para este evento específico.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsMapMode(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-400 transition-all"
                    >
                      <Map size={16} /> Abrir Editor de Mapa
                    </button>
                    <button 
                      onClick={() => setIsAssignModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-cf-yellow text-black rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(255,204,0,0.2)] hover:bg-yellow-400 transition-all"
                    >
                      <Plus size={16} /> Agregar Stands
                    </button>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden">
                  {event.stands?.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center border-t border-white/5">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/20">
                        <MapPin size={32} />
                      </div>
                      <p className="text-white/60 mb-2 font-medium">Aún no hay stands asignados</p>
                      <p className="text-sm text-white/40 max-w-md">Asigna stands creados previamente o crea uno nuevo para empezar a vender espacios en este evento.</p>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.02]">
                          <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider">Identificador</th>
                          <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider">Categoría</th>
                          <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider">Metraje</th>
                          <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider">Precio Base</th>
                          <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider text-center">Asignaciones</th>
                          <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {(event.stands?.filter((s: any) => s.pos_x === null && s.pos_y === null) || []).map((template: any) => {
                          const assignments = (event.stands || []).filter((p: any) => p.pos_x !== null && p.category === template.category).length;
                          return (
                          <tr key={template.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="p-4 font-bold text-white">
                              {template.identifier} {template.numeracion ? `(#${template.numeracion})` : ''}
                            </td>
                            <td className="p-4 text-sm text-white/60">{template.category || '-'}</td>
                            <td className="p-4 text-sm text-white/60">{template.dimensions || '-'}</td>
                            <td className="p-4 text-sm text-white/60">${new Intl.NumberFormat("es-CO").format(template.base_price)}</td>
                            <td className="p-4 text-center">
                              <span className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-bold bg-cf-yellow/10 text-cf-yellow border border-cf-yellow/20">
                                {assignments}
                              </span>
                            </td>
                            <td className="p-4 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => {
                                  setEditingStandData(template);
                                  setIsEditStandModalOpen(true);
                                }}
                                className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button 
                                onClick={() => handleDeleteStand(template.id)}
                                className="p-2 text-red-400/70 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        )})}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>
              </>
            ) : activeTab === 'policies' ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Políticas del Evento</h3>
                    <p className="text-sm text-white/40">Gestiona los términos, condiciones y normativas para este evento específico.</p>
                  </div>
                  <button 
                    onClick={() => setIsAssignPolicyModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-cf-yellow text-black rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(255,204,0,0.2)] hover:bg-yellow-400 transition-all"
                  >
                    <Plus size={16} /> Agregar Políticas
                  </button>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden">
                  {event.policies?.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center border-t border-white/5">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/20">
                        <FileText size={32} />
                      </div>
                      <p className="text-white/60 mb-2 font-medium">Aún no hay políticas asignadas</p>
                      <p className="text-sm text-white/40 max-w-md">Asigna políticas generales o crea una específica para que aplique en este evento.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col divide-y divide-white/5">
                      {event.policies?.map((policy: any) => (
                        <div key={policy.id} className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors group">
                          <div>
                            <h4 className="font-bold text-white mb-1">{policy.title}</h4>
                            <p className="text-sm text-white/40 line-clamp-2 max-w-2xl">{policy.content.replace(/<[^>]+>/g, '')}</p>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => {
                                setEditingPolicyData(policy);
                                setIsEditPolicyModalOpen(true);
                              }}
                              className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeletePolicy(policy.id)}
                              className="p-2 text-red-400/70 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : activeTab === 'reservations' ? (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Reservas de Stands</h3>
                    <p className="text-sm text-white/40">Gestiona las reservas realizadas por los expositores para este evento.</p>
                  </div>
                  {selectedReservations.length > 0 && (
                    <button 
                      onClick={handleDeleteSelectedReservations}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-bold hover:bg-red-500/20 transition-all animate-in fade-in slide-in-from-right-4"
                    >
                      <Trash2 size={16} /> Eliminar seleccionadas ({selectedReservations.length})
                    </button>
                  )}
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  {reservations.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center border-t border-white/5">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/20">
                        <Users size={32} />
                      </div>
                      <p className="text-white/60 mb-2 font-medium">Aún no hay reservas registradas</p>
                      <p className="text-sm text-white/40 max-w-md">Las reservas aparecerán aquí una vez que los expositores completen el proceso de compra.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 bg-white/[0.02]">
                            <th className="p-4 w-12">
                              <button 
                                onClick={() => {
                                  if (selectedReservations.length === reservations.length) setSelectedReservations([]);
                                  else setSelectedReservations(reservations.map(r => r.id));
                                }}
                                className={clsx(
                                  "w-5 h-5 rounded border flex items-center justify-center transition-all",
                                  selectedReservations.length === reservations.length 
                                    ? "bg-cf-yellow border-cf-yellow text-black" 
                                    : "border-white/20 text-transparent"
                                )}
                              >
                                <Check size={12} strokeWidth={4} />
                              </button>
                            </th>
                            <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider">Nombre / Marca</th>
                            <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider">Código</th>
                            <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider">Fecha</th>
                            <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider text-center">Stand</th>
                            <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider">Valor</th>
                            <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider">Estado</th>
                            <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {reservations.map((res) => (
                            <tr key={res.id} className={clsx(
                              "hover:bg-white/[0.02] transition-colors group",
                              selectedReservations.includes(res.id) && "bg-cf-yellow/[0.02]"
                            )}>
                              <td className="p-4">
                                <button 
                                  onClick={() => {
                                    if (selectedReservations.includes(res.id)) setSelectedReservations(selectedReservations.filter(id => id !== res.id));
                                    else setSelectedReservations([...selectedReservations, res.id]);
                                  }}
                                  className={clsx(
                                    "w-5 h-5 rounded border flex items-center justify-center transition-all",
                                    selectedReservations.includes(res.id)
                                      ? "bg-cf-yellow border-cf-yellow text-black" 
                                      : "border-white/20 text-transparent hover:border-white/40"
                                  )}
                                >
                                  <Check size={12} strokeWidth={4} />
                                </button>
                              </td>
                              <td className="p-4">
                                <div className="flex flex-col">
                                  <span className="font-bold text-white text-sm">{res.exhibitor?.brand_name || `${res.exhibitor?.first_name} ${res.exhibitor?.last_name}`}</span>
                                  <span className="text-[10px] text-white/40">Expositor</span>
                                </div>
                              </td>
                              <td className="p-4 font-mono text-xs text-white/60">
                                REV-26{res.reservation_number?.toString().padStart(4, '0') || '----'}
                              </td>
                              <td className="p-4 text-sm text-white/60">
                                {new Date(res.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                              </td>
                              <td className="p-4 text-center">
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/80 font-bold text-xs">
                                  {res.stand?.numeracion || res.stand?.identifier || '-'}
                                </span>
                              </td>
                              <td className="p-4 text-sm font-bold text-green-400">
                                ${new Intl.NumberFormat("es-CO").format(res.total_amount)}
                              </td>
                              <td className="p-4">
                                <span className={clsx(
                                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                  res.payment_status === 'paid' || res.balance_due == 0 ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                  res.payment_status === 'partial' ? "bg-cf-yellow/10 text-cf-yellow border-cf-yellow/20" :
                                  res.payment_status === 'pending' ? "bg-white/10 text-white/60 border-white/20" :
                                  "bg-red-500/10 text-red-400 border-red-500/20"
                                )}>
                                  {res.payment_status === 'paid' || res.balance_due == 0 ? 'Pagado' : 
                                   res.payment_status === 'partial' ? (
                                     (res.total_amount - res.balance_due) >= (res.total_amount * 0.6) ? 'Abono 2/3' : 'Abono 1/3'
                                   ) : 
                                   res.payment_status === 'pending' ? 'Pendiente' : 'Cancelado'}
                                </span>
                              </td>
                              <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => handleDeleteReservation(res.id)}
                                  className="p-2 text-red-400/70 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                                  title="Eliminar reserva y liberar stand"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="min-h-[400px] rounded-3xl bg-[#0a0a0a] border border-white/10 p-8 flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="p-6 rounded-full bg-white/[0.02] text-white/10">
                  {tabs.find(t => t.id === activeTab)?.icon && React.createElement(tabs.find(t => t.id === activeTab)!.icon, { size: 48 })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{tabs.find(t => t.id === activeTab)?.label}</h3>
                  <p className="text-white/40 max-w-md mx-auto">Próximamente: Implementación detallada del módulo de {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.</p>
                </div>
                <button className="flex items-center gap-2 text-cf-yellow font-bold text-sm hover:underline">
                  Configurar ahora <ExternalLink size={14} />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Sidebar: Checklist */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertCircle size={20} className="text-cf-yellow" />
                Pendientes
              </h3>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Lanzamiento</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-white/60">Progreso</span>
                <span className="text-cf-yellow font-bold">{Math.round(progressPercent)}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-cf-yellow"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {checklistItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    const tabId = item.id === 'stands' ? 'stands' : item.id === 'policies' ? 'policies' : 'general';
                    setActiveTab(tabId);
                  }}
                  className="group flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all text-left"
                >
                  <div className={clsx(
                    "mt-0.5 p-1 rounded-full",
                    item.completed ? "text-cf-yellow bg-cf-yellow/10" : "text-white/20 bg-white/5"
                  )}>
                    {item.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className={clsx(
                      "text-sm font-bold transition-colors",
                      item.completed ? "text-white" : "text-white/60 group-hover:text-white"
                    )}>
                      {item.label}
                    </p>
                    <p className="text-[10px] text-white/40 leading-tight mt-1">{item.description}</p>
                  </div>
                  <ArrowRight size={14} className="text-white/0 group-hover:text-white/20 transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>

            {event.status === 'draft' && progressPercent < 100 && (
              <div className="p-4 rounded-2xl bg-cf-yellow/5 border border-cf-yellow/10">
                <p className="text-[11px] text-cf-yellow/70 leading-relaxed italic text-center">
                  Completa los pendientes para habilitar la publicación oficial del evento.
                </p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-cf-yellow/20 to-transparent border border-cf-yellow/10 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-cf-yellow opacity-10 rotate-12">
              <Globe size={100} />
            </div>
            <h4 className="text-sm font-bold text-white mb-2 relative z-10">Estado del Evento</h4>
            <p className="text-xs text-white/60 leading-relaxed relative z-10">
              Tu evento se encuentra actualmente en modo <strong>{event.status === 'published' ? 'Público' : 'Borrador'}</strong>. 
              {event.status === 'draft' ? ' Solo administradores pueden verlo.' : ' Es visible para todos los usuarios.'}
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AssignStandsModal 
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        eventId={id as string}
        onAssign={handleAssignStands}
        assignedIdentifiers={event?.stands?.map((s: any) => s.identifier) || []}
        onCreateGlobal={() => {
          setIsAssignModalOpen(false);
          setEditingStandData({ isGlobal: true });
          setIsEditStandModalOpen(true);
        }}
      />

      <StandModal
        isOpen={isEditStandModalOpen}
        onClose={() => setIsEditStandModalOpen(false)}
        onSave={handleSaveStand}
        initialData={editingStandData}
      />

      <AssignPoliciesModal
        isOpen={isAssignPolicyModalOpen}
        onClose={() => setIsAssignPolicyModalOpen(false)}
        eventId={id as string}
        onAssign={handleAssignPolicies}
        assignedTitles={event?.policies?.map((p: any) => p.title) || []}
        onCreateGlobal={() => {
          setIsAssignPolicyModalOpen(false);
          setEditingPolicyData({ isGlobal: true });
          setIsEditPolicyModalOpen(true);
        }}
      />

      <PolicyFormModal
        isOpen={isEditPolicyModalOpen}
        onClose={() => setIsEditPolicyModalOpen(false)}
        onSave={handleSavePolicy}
        initialData={editingPolicyData}
      />
    </div>
  );
}
