"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import clsx from "clsx";
import {
  Users, Camera, Music, Scissors, Search,
  Loader2, ClipboardList, Download, Filter, X,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  ArrowUpAZ, ArrowDownAZ, Trash2,
} from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Pagination from "@/components/ui/Pagination";

type FormCategory = "ALL" | "ACTIVIDADES" | "CONVOCATORIAS";
type FormType     = "staff" | "media" | "kpop" | "cosplay";
type SortOrder    = "none" | "asc" | "desc";

const CATEGORIES = [
  { id: "ALL",           label: "Todos" },
  { id: "ACTIVIDADES",   label: "Actividades" },
  { id: "CONVOCATORIAS", label: "Convocatorias" },
] as const;

const FORMS = [
  { id: "staff",   label: "STAFF",               icon: Users,    category: "CONVOCATORIAS" },
  { id: "media",   label: "MEDIOS DE COMUNICACIÓN", icon: Camera, category: "CONVOCATORIAS" },
  { id: "kpop",    label: "CAMPEONATO KPOP",      icon: Music,    category: "ACTIVIDADES"   },
  { id: "cosplay", label: "COPA COSPLAY",          icon: Scissors, category: "ACTIVIDADES"   },
] as const;

const PAGE_SIZE = 20;

type ColDef = { key: string; label: string; type?: "text" | "date" | "boolean" | "file" | "tipo" | "link" | "expand"; center?: boolean };

// Tabla STAFF: sin ciudad ni trabajo_previo
const STAFF_COLUMNS: ColDef[] = [
  { key: "submitted_at",    label: "Fecha",     type: "date" },
  { key: "nombre",          label: "Nombre",    type: "text" },
  { key: "tipo_documento",  label: "Tipo Doc.", type: "text" },
  { key: "documento",       label: "Documento", type: "text" },
  { key: "telefono",        label: "Teléfono",  type: "text" },
  { key: "grupo_sanguineo", label: "RH",        type: "text" },
  { key: "eps",             label: "EPS",       type: "text" },
  { key: "rut_url",         label: "RUT",       type: "file" },
  { key: "cedula_url",      label: "Cédula",    type: "file" },
];

const MEDIA_COLUMNS: ColDef[] = [
  { key: "submitted_at", label: "Fecha",     type: "date" },
  { key: "nombre",       label: "Nombre",    type: "text" },
  { key: "documento",    label: "Documento", type: "text" },
  { key: "ciudad",       label: "Ciudad",    type: "text" },
  { key: "telefono",     label: "Teléfono",  type: "text" },
  { key: "instagram",    label: "Instagram", type: "text" },
  { key: "email",        label: "Email",     type: "text" },
  { key: "tipo",         label: "Tipo",      type: "tipo" },
];

const TIPO_LABEL: Record<string, string> = {
  medio:   "Medio de comunicación",
  creador: "Creador de contenido",
};

// Tabla KPOP: columnas principales (participantes se renderizan como sub-tabla)
const KPOP_COLUMNS = [
  { key: "submitted_at",      label: "Fecha",           type: "date",   center: false },
  { key: "team_name",         label: "Equipo",          type: "text",   center: false },
  { key: "num_participantes", label: "# Participantes", type: "text",   center: true  },
  { key: "song_link",         label: "Coreografía",     type: "link",   center: true  },
  { key: "__details",         label: "Detalles",        type: "expand", center: true  },
] as const;

// Tabla COSPLAY: columnas principales
const COSPLAY_COLUMNS: ColDef[] = [
  { key: "submitted_at",      label: "Fecha",           type: "date",   center: false },
  { key: "nombre",            label: "Nombre",          type: "text",   center: false },
  { key: "personaje",         label: "Personaje",       type: "text",   center: false },
  { key: "categoria",         label: "Categoría",       type: "text",   center: false },
  { key: "num_integrantes",   label: "# Participantes", type: "text",   center: true  },
  { key: "whatsapp",          label: "WhatsApp",        type: "text",   center: false },
  { key: "instagram",         label: "Instagram",       type: "text",   center: false },
  { key: "archivo_adjunto",   label: "Referencia",      type: "file",   center: true  },
];

export default function FormulariosPage() {
  const [activeCategory, setActiveCategory] = useState<FormCategory>("ALL");
  const [selectedForm,   setSelectedForm]   = useState<FormType | null>(null);
  const [data,           setData]           = useState<any[]>([]);
  const [loading,        setLoading]        = useState(false);
  const [searchTerm,     setSearchTerm]     = useState("");
  const [downloading,    setDownloading]    = useState<string | null>(null);
  const [showFilters,    setShowFilters]    = useState(false);
  const [sortOrder,      setSortOrder]      = useState<SortOrder>("none");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo,   setFilterDateTo]   = useState("");
  const [filterTipo,     setFilterTipo]     = useState("");
  const [currentPage,    setCurrentPage]    = useState(1);
  const [selectedIds,    setSelectedIds]    = useState<Set<string>>(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting,       setDeleting]       = useState(false);
  const [expandedRows,   setExpandedRows]   = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const hasActiveFilters = !!(filterDateFrom || filterDateTo || filterTipo || sortOrder !== "none");

  const clearFilters = () => {
    setFilterDateFrom("");
    setFilterDateTo("");
    setFilterTipo("");
    setSortOrder("none");
    setCurrentPage(1);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === filteredSorted.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredSorted.map((r) => r.id)));
    }
  };

  const deleteSelected = async () => {
    setDeleting(true);
    try {
      const ids = Array.from(selectedIds);
      const table = (selectedForm === "staff" || selectedForm === "media") ? "applications" : "activity_applications";
      const { error } = await supabase.from(table).delete().in("id", ids);
      if (error) throw error;
      setData((prev) => prev.filter((r) => !selectedIds.has(r.id)));
      setSelectedIds(new Set());
      setShowDeleteModal(false);
    } catch (err: any) {
      console.error("Error deleting:", err?.message);
    } finally {
      setDeleting(false);
    }
  };

  /* ── Descarga forzada de archivo ─────────────────────────────────── */
  const forceDownload = async (url: string, filename: string) => {
    setDownloading(url);
    try {
      const res  = await fetch(url);
      const blob = await res.blob();
      const obj  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = obj; a.download = filename;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(obj);
    } catch { window.open(url, "_blank"); }
    finally  { setDownloading(null); }
  };

  /* ── Exportar CSV (selección > fechas > todos) ────────────── */
  const exportCSV = () => {
    let csvData: any[];
    let suffix: string;

    if (selectedIds.size > 0) {
      csvData = data.filter((r) => selectedIds.has(r.id));
      suffix  = `_seleccion_${selectedIds.size}`;
    } else if (filterDateFrom || filterDateTo || filterTipo) {
      csvData = data.filter((row) => {
        if (filterDateFrom && new Date(row.submitted_at) < new Date(filterDateFrom)) return false;
        if (filterDateTo   && new Date(row.submitted_at) > new Date(filterDateTo + "T23:59:59")) return false;
        if (filterTipo     && (row.form_data?.tipo || "").toLowerCase() !== filterTipo) return false;
        return true;
      });
      suffix = `_${filterTipo || "todos"}_${filterDateFrom || ""}_${filterDateTo || ""}`.replace(/_{2,}/g, "_").replace(/_$/, "");
    } else {
      csvData = data;
      suffix  = "_todos";
    }

    // ── Encabezados y mapeo según formulario ──────────────────────
    let headers: string[];
    let toRow: (row: any) => string[];

    if (selectedForm === "media") {
      headers = [
        "Horario de envío","Nombre_Completo","Número_documento","Número_contacto",
        "Perfil_instagram","Ciudad_residencia","Email","tipo_rp",
        "ID","Created Date","Updated Date","Owner","Copia de tipo_rp","Copia de tipo_rp 2",
      ];
      toRow = (row) => {
        const f    = row.form_data || {};
        const tipo = TIPO_LABEL[(f.tipo || "").toLowerCase()] || f.tipo || "";
        const hora = new Date(row.submitted_at).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
        const date = new Date(row.submitted_at).toLocaleDateString("es-CO");
        return [
          hora, f.nombre ?? "", f.documento ?? "", f.telefono ?? "",
          f.instagram ?? "", f.ciudad ?? "", f.email ?? "", tipo,
          row.id ?? "", date, "", "", tipo, tipo,
        ];
      };
    } else if (selectedForm === "kpop") {
      // KPOP: una fila por participante, datos del equipo repetidos
      const kpopHeaders = [
        "Fecha Registro","Equipo","# Participantes","Link Coreografía",
        "Nombre Participante","Tipo Documento","Número Documento","Teléfono","Email","Consentimiento",
      ];
      const kpopRows: string[][] = [];
      csvData.forEach((row) => {
        const f    = row.form_data || {};
        const date = new Date(row.submitted_at).toLocaleDateString("es-CO");
        const participants: any[] = f.participants || [];
        if (participants.length === 0) {
          kpopRows.push([date, f.team_name ?? "", String(f.num_participantes ?? ""), f.song_link ?? "", "", "", "", "", "", ""]);
        } else {
          participants.forEach((p: any) => {
            kpopRows.push([
              date, f.team_name ?? "", String(f.num_participantes ?? ""), f.song_link ?? "",
              p.nombre ?? "", p.tipo_documento ?? "", p.documento ?? "",
              p.telefono ?? "", p.email ?? "", p.consentimiento_url ?? "",
            ]);
          });
        }
      });
      const kpopCsv  = [kpopHeaders.join(","), ...kpopRows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
      const kpopBlob = new Blob(["\uFEFF" + kpopCsv], { type: "text/csv;charset=utf-8;" });
      const kpopUrl  = URL.createObjectURL(kpopBlob);
      const kpopA    = document.createElement("a");
      kpopA.href = kpopUrl; kpopA.download = `kpop${suffix}.csv`;
      kpopA.click(); URL.revokeObjectURL(kpopUrl);
      return;
    } else if (selectedForm === "cosplay") {
      const cosplayHeaders = [
        "Fecha Registro","Nombre/Equipo","Personaje","Categoría","# Participantes",
        "WhatsApp","Instagram","Link Referencia"
      ];
      const cosplayRows: string[][] = [];
      csvData.forEach((row) => {
        const f    = row.form_data || {};
        const date = new Date(row.submitted_at).toLocaleDateString("es-CO");
        cosplayRows.push([
          date, f.nombre ?? "", f.personaje ?? "", f.categoria ?? "", String(f.num_integrantes ?? f.num_participantes ?? ""),
          f.whatsapp ?? f.telefono ?? "", f.instagram ?? "", f.archivo_adjunto ?? f.referencia_url ?? ""
        ]);
      });
      const cosplayCsv  = [cosplayHeaders.join(","), ...cosplayRows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
      const cosplayBlob = new Blob(["\uFEFF" + cosplayCsv], { type: "text/csv;charset=utf-8;" });
      const cosplayUrl  = URL.createObjectURL(cosplayBlob);
      const cosplayA    = document.createElement("a");
      cosplayA.href = cosplayUrl; cosplayA.download = `cosplay${suffix}.csv`;
      cosplayA.click(); URL.revokeObjectURL(cosplayUrl);
      return;
    } else {
      // STAFF (y otros por defecto)
      headers = [
        "Created Date","Nombre_completo","Tipo_documento","Numero_documento",
        "Numero_telefono","Ciudad","Cedula","RUT","EPS","RH","Trabajo_previamente","Status",
      ];
      toRow = (row) => {
        const f = row.form_data || {};
        return [
          new Date(row.submitted_at).toLocaleDateString("es-CO"),
          f.nombre ?? "", f.tipo_documento ?? "", f.documento ?? "",
          f.telefono ?? "", f.ciudad ?? "", f.cedula_url ?? "", f.rut_url ?? "",
          f.eps ?? "", f.grupo_sanguineo ?? "",
          f.trabajo_previo ? "Sí" : "No", "Pendiente",
        ];
      };
    }

    const rows = csvData.map((row) => toRow(row).map((v) => `"${String(v).replace(/"/g, '""')}"`));
    const csv  = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    const formName = selectedForm ?? "formulario";
    a.href = url; a.download = `${formName}${suffix}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  /* ── Fetch ────────────────────────────────────────────────────────── */
  const fetchData = async (formType: FormType) => {
    setLoading(true); setData([]); setSearchTerm(""); setSelectedIds(new Set());
    setCurrentPage(1); clearFilters();
    try {
      if (formType === "media") {
        const { data: res, error } = await supabase
          .from("applications")
          .select("id, form_data, submitted_at, type, profiles(first_name, last_name, email)")
          .in("type", ["media_application", "creator_application"])
          .order("submitted_at", { ascending: false });
        if (error) throw error;
        setData(res || []);
      } else if (formType === "staff") {
        const { data: res, error } = await supabase
          .from("applications")
          .select("id, form_data, submitted_at, type, profiles(first_name, last_name, email)")
          .eq("type", "staff_application")
          .order("submitted_at", { ascending: false });
        if (error) throw error;
        setData(res || []);
      } else {
        const enumType = formType === "kpop" ? "kpop_dance" : "cosplay";
        const { data: res, error } = await supabase
          .from("activity_applications")
          .select("id, form_data, submitted_at, profiles(first_name, last_name, email)")
          .eq("activity_type", enumType)
          .order("submitted_at", { ascending: false });
        if (error) throw error;
        setData(res || []);
      }
    } catch (err: any) {
      console.error("Error fetching form data:", err?.message || err?.code || JSON.stringify(err));
    } finally { setLoading(false); }
  };

  useEffect(() => { if (selectedForm) fetchData(selectedForm); }, [selectedForm]);

  /* ── Filtrado + orden ─────────────────────────────────────────────── */
  const filteredSorted = useMemo(() => {
    let rows = data.filter((row) => {
      const f   = row.form_data || {};
      const str = JSON.stringify(f).toLowerCase();
      if (searchTerm    && !str.includes(searchTerm.toLowerCase()))                              return false;
      if (filterDateFrom && new Date(row.submitted_at) < new Date(filterDateFrom))               return false;
      if (filterDateTo   && new Date(row.submitted_at) > new Date(filterDateTo + "T23:59:59"))   return false;
      if (filterTipo     && (f.tipo || "").toLowerCase() !== filterTipo)                         return false;
      return true;
    });

    if (sortOrder !== "none") {
      rows = [...rows].sort((a, b) => {
        // Para kpop ordenar por nombre de equipo; para otros por nombre
        const keyA = selectedForm === "kpop" ? (a.form_data?.team_name || "") : (a.form_data?.nombre || "");
        const keyB = selectedForm === "kpop" ? (b.form_data?.team_name || "") : (b.form_data?.nombre || "");
        return sortOrder === "asc" ? keyA.toLowerCase().localeCompare(keyB.toLowerCase()) : keyB.toLowerCase().localeCompare(keyA.toLowerCase());
      });
    }
    return rows;
  }, [data, searchTerm, filterDateFrom, filterDateTo, filterTipo, sortOrder]);

  /* ── Paginación ───────────────────────────────────────────────────── */
  const totalPages  = Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE));
  const paginated   = filteredSorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Resetear página si filtros cambian
  useEffect(() => { setCurrentPage(1); }, [searchTerm, filterDateFrom, filterDateTo, filterTipo, sortOrder]);

  const getColumns = () => {
    if (selectedForm === "staff") return STAFF_COLUMNS;
    if (selectedForm === "media") return MEDIA_COLUMNS;
    if (selectedForm === "kpop")  return KPOP_COLUMNS as unknown as ColDef[];
    if (selectedForm === "cosplay") return COSPLAY_COLUMNS;
    if (!data.length) return [] as ColDef[];
    const cols: ColDef[] = [{ key: "submitted_at", label: "Fecha", type: "date" }];
    Object.keys(data[0].form_data || {}).forEach((key) => {
      if (!key.includes("_url"))
        cols.push({ key, label: key.replace(/_/g, " ").toUpperCase(), type: "text" });
    });
    return cols;
  };

  const columns   = getColumns();
  const formLabel = FORMS.find((f) => f.id === selectedForm)?.label ?? "";
  const filteredForms = FORMS.filter((f) => activeCategory === "ALL" || f.category === activeCategory);

  /* ── UI ───────────────────────────────────────────────────────────── */
  return (
    <div className="p-6 w-full h-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1">Bandeja de Formularios</h1>
        <p className="text-white/50 text-sm">Gestiona las solicitudes de actividades y convocatorias.</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 p-1 bg-white/5 w-fit rounded-lg border border-white/10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as FormCategory)}
            className={clsx(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
              activeCategory === cat.id
                ? "bg-cf-yellow/20 text-cf-yellow"
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Form cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredForms.map((form) => {
          const Icon       = form.icon;
          const isSelected = selectedForm === form.id;
          return (
            <div key={form.id} onClick={() => setSelectedForm(form.id)} className="cursor-pointer">
              <SpotlightCard
                spotlightColor={isSelected ? "rgba(245,197,0,0.3)" : "rgba(255,255,255,0.1)"}
                className={clsx(
                  "h-full border transition-all duration-300",
                  isSelected ? "border-cf-yellow/50 bg-cf-yellow/5" : "border-white/10 bg-white/[0.02] hover:border-white/20"
                )}
              >
                <div className="flex flex-col items-center justify-center py-5 px-4 text-center gap-3">
                  <div className={clsx("p-3 rounded-xl transition-colors", isSelected ? "bg-cf-yellow/20 text-cf-yellow" : "bg-white/5 text-white/60")}>
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className={clsx("font-display font-bold text-xs tracking-wide", isSelected ? "text-white" : "text-white/70")}>
                    {form.label}
                  </h3>
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>

      {/* Data Table */}
      {selectedForm && (
        <div className="flex-1 flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl min-h-0">

          {/* Toolbar */}
          <div className="px-4 py-3 border-b border-white/10 flex flex-wrap items-center gap-2 bg-white/[0.02] shrink-0">
            {/* Title + count */}
            <div className="flex items-center gap-2 mr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cf-yellow animate-pulse" />
              <h2 className="font-display font-bold text-white text-sm">{formLabel}</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-cf-yellow/15 text-cf-yellow border border-cf-yellow/20">
                {data.length}
              </span>
            </div>

            {/* Select all */}
            {filteredSorted.length > 0 && (
              <button
                onClick={selectAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10"
              >
                {selectedIds.size === filteredSorted.length ? "✓ Todos" : "Seleccionar todo"}
              </button>
            )}

            {/* Search */}
            <div className="relative flex-1 min-w-[160px] max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Buscar nombre, documento…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-cf-yellow/50 transition-colors"
              />
            </div>

            {/* Filters toggle */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={clsx(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                showFilters || hasActiveFilters
                  ? "bg-cf-yellow/15 text-cf-yellow border-cf-yellow/30"
                  : "bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10"
              )}
            >
              <Filter size={12} />
              Filtros
              {hasActiveFilters && <span className="bg-cf-yellow text-black rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-black">!</span>}
            </button>

            {/* Sort A-Z / Z-A */}
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "none" : "asc")}
              title="Ordenar A → Z"
              className={clsx(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                sortOrder === "asc"
                  ? "bg-cf-yellow/15 text-cf-yellow border-cf-yellow/30"
                  : "bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10"
              )}
            >
              <ArrowUpAZ size={13} /> A–Z
            </button>
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "none" : "desc")}
              title="Ordenar Z → A"
              className={clsx(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                sortOrder === "desc"
                  ? "bg-cf-yellow/15 text-cf-yellow border-cf-yellow/30"
                  : "bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10"
              )}
            >
              <ArrowDownAZ size={13} /> Z–A
            </button>

            {/* Delete selected */}
            {selectedIds.size > 0 && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 size={13} />
                Eliminar ({selectedIds.size})
              </button>
            )}

            {/* CSV */}
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors ml-auto"
            >
              <Download size={13} />
              {selectedIds.size > 0
                ? `CSV (${selectedIds.size} sel.)`
                : (filterDateFrom || filterDateTo) ? "CSV (filtrado)" : "Exportar CSV"}
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="px-4 py-3 border-b border-white/10 bg-white/[0.015] flex flex-wrap gap-4 items-end shrink-0">

              {/* Filtro de tipo — solo para Medios */}
              {selectedForm === "media" && (
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Tipo</label>
                  <select
                    value={filterTipo}
                    onChange={(e) => setFilterTipo(e.target.value)}
                    className="bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cf-yellow/40 appearance-none cursor-pointer pr-8"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
                  >
                    <option value="">Todos los tipos</option>
                    <option value="medio">Medio de comunicación</option>
                    <option value="creador">Creador de contenido</option>
                  </select>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Fecha Desde</label>
                <input type="date" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cf-yellow/40" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Fecha Hasta</label>
                <input type="date" value={filterDateTo} onChange={(e) => setFilterDateTo(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cf-yellow/40" />
              </div>
              {hasActiveFilters && (
                <button onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors">
                  <X size={11} /> Limpiar
                </button>
              )}
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-x-auto overflow-y-auto min-h-0">
            {loading ? (
              <div className="h-64 flex flex-col items-center justify-center text-white/40 gap-3">
                <Loader2 size={28} className="animate-spin text-cf-yellow" />
                <p className="text-xs uppercase tracking-widest font-display">Cargando...</p>
              </div>
            ) : filteredSorted.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-white/40 gap-2">
                <ClipboardList size={40} className="opacity-20" />
                <p className="text-sm">{data.length === 0 ? "Sin registros." : "Sin resultados para los filtros aplicados."}</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="sticky top-0 z-10 bg-[#0d0d0d] border-b border-white/10">
                  <tr>
                    <th className="px-3 py-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === filteredSorted.length && filteredSorted.length > 0}
                        onChange={selectAll}
                        className="w-4 h-4 rounded border-white/40 bg-white/10 checked:bg-white checked:border-white cursor-pointer appearance-none relative before:content-['✓'] before:absolute before:text-black before:text-[10px] before:font-bold before:opacity-0 checked:before:opacity-100 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 flex items-center justify-center transition-all"
                      />
                    </th>
                    <th className="px-3 py-3 text-[10px] font-display font-bold text-white/30 uppercase tracking-wider w-8 text-center">#</th>
                    {columns.map((col) => (
                      <th key={col.key} className={clsx(
                        "px-3 py-3 text-[10px] font-display font-bold text-white/50 uppercase tracking-wider whitespace-nowrap",
                        (col as any).center && "text-center"
                      )}>
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {paginated.map((row, index) => {
                    const jsonb       = row.form_data || {};
                    const globalIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
                    const isChecked   = selectedIds.has(row.id);
                    const isExpanded  = expandedRows.has(row.id);

                    /* ── KPOP: fila principal + sub-tabla de participantes ── */
                    if (selectedForm === "kpop") {
                      const participants: any[] = jsonb.participants || [];
                      return (
                        <React.Fragment key={row.id}>
                          <tr key={row.id} className={clsx("transition-colors", isChecked ? "bg-cf-yellow/5" : "hover:bg-white/[0.025]")}>
                            <td className="px-3 py-3 w-8">
                              <input type="checkbox" checked={isChecked} onChange={() => toggleSelect(row.id)}
                                className="w-4 h-4 rounded border-white/40 bg-white/10 checked:bg-white checked:border-white cursor-pointer appearance-none relative before:content-['✓'] before:absolute before:text-black before:text-[10px] before:font-bold before:opacity-0 checked:before:opacity-100 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 flex items-center justify-center transition-all" />
                            </td>
                            <td className="px-3 py-3 text-center text-xs font-mono text-white/25">{globalIndex}</td>
                            {/* Fecha */}
                            <td className="px-3 py-3 text-xs text-white/55 whitespace-nowrap">
                              {new Date(row.submitted_at).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}
                            </td>
                            {/* Equipo */}
                            <td className="px-3 py-3 text-xs text-white/85 font-semibold whitespace-nowrap">{jsonb.team_name ?? "—"}</td>
                            {/* # Participantes */}
                            <td className="px-3 py-3 text-center">
                              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/25">
                                {jsonb.num_participantes ?? participants.length}
                              </span>
                            </td>
                            {/* Coreografía — link */}
                            <td className="px-3 py-3 whitespace-nowrap text-center">
                              {jsonb.song_link ? (
                                <a href={jsonb.song_link} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-pink-500/10 text-pink-300 border border-pink-500/20 hover:bg-pink-500/20 transition-colors">
                                  Ver ↗
                                </a>
                              ) : <span className="text-white/20 text-xs">—</span>}
                            </td>
                            {/* Detalles — expand toggle */}
                            <td className="px-3 py-3 whitespace-nowrap text-center">
                              <button onClick={() => toggleExpand(row.id)}
                                className={clsx(
                                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold border transition-colors",
                                  isExpanded
                                    ? "bg-cf-yellow/15 text-cf-yellow border-cf-yellow/30"
                                    : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white"
                                )}>
                                {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                                {isExpanded ? "Cerrar" : "Ver"}
                              </button>
                            </td>
                          </tr>

                          {/* Sub-tabla de participantes */}
                          {isExpanded && (
                            <tr key={`${row.id}-detail`}>
                              <td colSpan={7} className="px-0 py-0 bg-white/[0.01]">
                                <div className="px-12 py-3 border-t border-b border-white/[0.06]">
                                  <p className="text-[10px] font-display font-bold text-cf-yellow/70 uppercase tracking-widest mb-2">
                                    Participantes — {jsonb.team_name}
                                  </p>
                                  {participants.length === 0 ? (
                                    <p className="text-xs text-white/30">Sin datos de participantes.</p>
                                  ) : (
                                    <table className="w-full text-left text-xs">
                                      <thead>
                                        <tr className="border-b border-white/[0.06]">
                                          {["#","Nombre Completo","Tipo Doc.","Documento","Teléfono","Email","Consentimiento"].map((h) => (
                                            <th key={h} className="px-2 py-1.5 text-[10px] font-bold text-white/30 uppercase tracking-wider whitespace-nowrap">{h}</th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-white/[0.04]">
                                        {participants.map((p: any, pi: number) => (
                                          <tr key={pi} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-2 py-2 text-white/25 font-mono">{pi + 1}</td>
                                            <td className="px-2 py-2 text-white/80 font-medium whitespace-nowrap">{p.nombre ?? "—"}</td>
                                            <td className="px-2 py-2 text-white/50">{p.tipo_documento ?? "—"}</td>
                                            <td className="px-2 py-2 text-white/50 font-mono">{p.documento ?? "—"}</td>
                                            <td className="px-2 py-2 text-white/50">{p.telefono ?? "—"}</td>
                                            <td className="px-2 py-2 text-white/50 max-w-[180px] truncate">{p.email ?? "—"}</td>
                                            <td className="px-2 py-2">
                                              {p.consentimiento_url ? (
                                                <button onClick={() => forceDownload(p.consentimiento_url, `consentimiento_${p.nombre?.replace(/\s/g,"_") ?? pi}.pdf`)}
                                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-cf-yellow/10 text-cf-yellow border border-cf-yellow/20 hover:bg-cf-yellow/20 transition-colors">
                                                  ↓ Descargar
                                                </button>
                                              ) : <span className="text-white/20">—</span>}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    }

                    /* ── Filas genéricas (STAFF, MEDIA, COSPLAY) ── */
                    return (
                      <React.Fragment key={row.id}>
                        <tr className={clsx("transition-colors", isChecked ? "bg-cf-yellow/5" : "hover:bg-white/[0.025]")}>
                          <td className="px-3 py-3 w-8">
                            <input type="checkbox" checked={isChecked} onChange={() => toggleSelect(row.id)}
                              className="w-4 h-4 rounded border-white/40 bg-white/10 checked:bg-white checked:border-white cursor-pointer appearance-none relative before:content-['✓'] before:absolute before:text-black before:text-[10px] before:font-bold before:opacity-0 checked:before:opacity-100 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 flex items-center justify-center transition-all" />
                          </td>
                          <td className="px-3 py-3 text-center text-xs font-mono text-white/25">{globalIndex}</td>
                          {columns.map((col) => {
                            /* Fecha */
                            if (col.key === "submitted_at") return (
                              <td key={col.key} className={clsx("px-3 py-3 text-xs text-white/55 whitespace-nowrap", (col as any).center && "text-center")}>
                                {new Date(row.submitted_at).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}
                              </td>
                            );
                            /* Num Participantes */
                            if (col.key === "num_participantes" || col.key === "num_integrantes") {
                              const participants: any[] = jsonb.participants || [];
                              const count = jsonb[col.key] ?? participants.length;
                              return (
                                <td key={col.key} className={clsx("px-3 py-3", (col as any).center && "text-center")}>
                                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/25">
                                    {count}
                                  </span>
                                </td>
                              );
                            }
                            /* Tipo medio/creador */
                            if (col.type === "tipo") {
                              const raw = (row.form_data?.tipo || "").toLowerCase();
                              const label = TIPO_LABEL[raw] || raw;
                              const isCreador = raw === "creador";
                              return (
                                <td key={col.key} className={clsx("px-3 py-3 whitespace-nowrap", (col as any).center && "text-center")}>
                                  <span className={clsx("px-2 py-0.5 rounded-full text-[11px] font-bold border",
                                    isCreador ? "bg-purple-500/15 text-purple-300 border-purple-500/25" : "bg-blue-500/15 text-blue-300 border-blue-500/25"
                                  )}>{label}</span>
                                </td>
                              );
                            }
                            /* Expand Toggle */
                            if (col.type === "expand") {
                              return (
                                <td key={col.key} className={clsx("px-3 py-3 whitespace-nowrap", (col as any).center && "text-center")}>
                                  <button onClick={() => toggleExpand(row.id)}
                                    className={clsx(
                                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold border transition-colors",
                                      isExpanded
                                        ? "bg-cf-yellow/15 text-cf-yellow border-cf-yellow/30"
                                        : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white"
                                    )}>
                                    {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                                    {isExpanded ? "Cerrar" : "Ver"}
                                  </button>
                                </td>
                              );
                            }
                            /* Archivo */
                            if (col.type === "file") {
                              const url  = jsonb[col.key];
                              const busy = downloading === url;
                              const ext  = url?.split(".").pop()?.split("?")[0] || "pdf";
                              const name = `${col.label.toLowerCase().replace(/\s/g,"_")}_${row.id?.slice(0,6)}.${ext}`;
                              return (
                                <td key={col.key} className={clsx("px-3 py-3 whitespace-nowrap", (col as any).center && "text-center")}>
                                  {url ? (
                                    <button onClick={() => forceDownload(url, name)} disabled={busy}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-cf-yellow/10 text-cf-yellow border border-cf-yellow/20 hover:bg-cf-yellow/20 transition-colors disabled:opacity-50">
                                      {busy ? <Loader2 size={10} className="animate-spin" /> : "↓"} {busy ? "…" : "Descargar"}
                                    </button>
                                  ) : <span className="text-white/20 text-xs">—</span>}
                                </td>
                              );
                            }
                            /* Texto */
                            const value = jsonb[col.key];
                            return (
                              <td key={col.key} className={clsx("px-3 py-3 text-xs text-white/75 max-w-[150px] truncate", (col as any).center && "text-center")}>
                                {typeof value === "boolean" ? (value ? "Sí" : "No") : String(value ?? "—")}
                              </td>
                            );
                          })}
                        </tr>

                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Paginador */}
          {!loading && <Pagination 
            currentPage={currentPage}
            totalItems={filteredSorted.length}
            itemsPerPage={PAGE_SIZE}
            onPageChange={setCurrentPage}
            labelName="registros"
          />}
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111] border border-red-500/30 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/15 rounded-xl">
                <Trash2 size={20} className="text-red-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base">Confirmar eliminación</h3>
                <p className="text-white/50 text-xs mt-0.5">
                  {selectedIds.size === 1
                    ? "Se eliminará 1 registro permanentemente."
                    : `Se eliminarán ${selectedIds.size} registros permanentemente.`}
                </p>
              </div>
            </div>
            <p className="text-white/40 text-xs mb-5 bg-red-500/5 border border-red-500/15 rounded-lg p-3">
              ⚠️ Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg text-sm font-bold text-white/60 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={deleteSelected}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white bg-red-600 hover:bg-red-500 transition-colors disabled:opacity-50"
              >
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                {deleting ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
