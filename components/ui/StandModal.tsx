"use client";

import React, { useState, useEffect } from "react";
import { Bold, Italic, ListOrdered, MapPin } from "lucide-react";
import DashboardModal from "./DashboardModal";

interface StandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
  initialData?: any;
}

export default function StandModal({ isOpen, onClose, onSave, initialData }: StandModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    numeracion: "",
    categoria: "",
    metraje: "",
    descripcion: "",
    precio: "",
    sale_start_date: "",
    sale_end_date: "",
  });

  const [m2Calculado, setM2Calculado] = useState("");

  const categorias = ["Emprendimiento", "Artista", "Comercial", "Snacks", "Comidas"];
  const metrajes = ["2x2", "3x2", "4x2", "4x3", "4x5", "6x2", "6x3"];

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        nombre: initialData.identifier || "",
        numeracion: initialData.numeracion || "",
        categoria: initialData.category || "",
        metraje: initialData.dimensions || "",
        descripcion: initialData.description || "",
        precio: initialData.base_price ? new Intl.NumberFormat("es-CO").format(initialData.base_price) : "",
        sale_start_date: initialData.sale_start_date ? new Date(initialData.sale_start_date).toISOString().slice(0, 16) : "",
        sale_end_date: initialData.sale_end_date ? new Date(initialData.sale_end_date).toISOString().slice(0, 16) : "",
      });
    } else if (!initialData && isOpen) {
      setFormData({
        nombre: "",
        numeracion: "",
        categoria: "",
        metraje: "",
        descripcion: "",
        precio: "",
        sale_start_date: "",
        sale_end_date: "",
      });
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    if (formData.metraje) {
      const [w, h] = formData.metraje.split("x").map(Number);
      if (!isNaN(w) && !isNaN(h)) {
        setM2Calculado(`${w * h} m²`);
      } else {
        setM2Calculado("");
      }
    } else {
      setM2Calculado("");
    }
  }, [formData.metraje]);

  const handleFormat = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("stand-desc") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.descripcion;
    const selectedText = text.substring(start, end);
    let newText = text;
    if (start === end && suffix === "") {
        newText = text.substring(0, start) + prefix + text.substring(end);
    } else {
        newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);
    }
    setFormData({ ...formData, descripcion: newText });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const footer = (
    <>
      <button 
        onClick={onClose}
        className="px-5 py-2.5 rounded-xl font-bold text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
      >
        Cancelar
      </button>
      <button 
        onClick={() => {
          if (onSave) onSave(formData);
          onClose();
        }}
        className="px-5 py-2.5 rounded-xl font-bold text-sm bg-cf-yellow text-black hover:bg-yellow-400 hover:scale-[1.02] transition-all"
      >
        {initialData ? "Actualizar stand" : "Crear stand"}
      </button>
    </>
  );

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar Stand" : "Crear Stand"}
      icon={<MapPin size={20} />}
      footer={footer}
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Nombre del Stand</label>
            <input 
              type="text" 
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej. Stand VIP, Mesa central..."
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Numeración</label>
            <input 
              type="number"
              min="0"
              value={formData.numeracion}
              onChange={(e) => setFormData({ ...formData, numeracion: e.target.value })}
              placeholder="Ej. 1, 2, 3..."
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Categoría</label>
            <div className="relative">
              <select 
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 appearance-none cursor-pointer pr-10"
              >
                <option value="" disabled>Selecciona una categoría</option>
                {categorias.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Metraje</label>
            <div className="relative">
              <select 
                value={formData.metraje}
                onChange={(e) => setFormData({ ...formData, metraje: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 appearance-none cursor-pointer pr-10"
              >
                <option value="" disabled>Selecciona tamaño</option>
                {metrajes.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center justify-between">
              <span>Área (m²)</span>
              <span className="text-[10px] text-white/20 normal-case font-normal">*Automático</span>
            </label>
            <input 
              type="text" 
              value={m2Calculado}
              readOnly
              placeholder="0 m²"
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-cf-yellow font-bold focus:outline-none cursor-not-allowed"
            />
          </div>
          
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Precio Base (COP)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">$</span>
              <input 
                type="text" 
                value={formData.precio}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  const formattedValue = rawValue ? new Intl.NumberFormat("es-CO").format(Number(rawValue)) : "";
                  setFormData({ ...formData, precio: formattedValue });
                }}
                placeholder="0"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-8 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
              />
            </div>
          </div>
          
          {initialData?.event_id && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Inicio de Ventas</label>
                <input 
                  type="datetime-local" 
                  value={formData.sale_start_date}
                  onChange={(e) => setFormData({ ...formData, sale_start_date: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Fin de Ventas</label>
                <input 
                  type="datetime-local" 
                  value={formData.sale_end_date}
                  onChange={(e) => setFormData({ ...formData, sale_end_date: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Descripción</label>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden focus-within:border-cf-yellow/50 transition-colors flex flex-col">
            <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-white/[0.02]">
              <button 
                type="button"
                onClick={() => handleFormat("**", "**")}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                title="Negrita"
              >
                <Bold size={14} />
              </button>
              <button 
                type="button"
                onClick={() => handleFormat("*", "*")}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                title="Cursiva"
              >
                <Italic size={14} />
              </button>
              <div className="w-px h-4 bg-white/10 mx-1"></div>
              <button 
                type="button"
                onClick={() => handleFormat("1. ")}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                title="Lista Numerada"
              >
                <ListOrdered size={14} />
              </button>
            </div>
            <textarea 
              id="stand-desc"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Escribe los detalles del stand..."
              className="w-full bg-transparent p-4 min-h-[120px] text-sm text-white focus:outline-none resize-y"
            />
          </div>
        </div>
      </div>
    </DashboardModal>
  );
}
