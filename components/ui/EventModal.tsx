"use client";

import React, { useState, useEffect } from "react";
import { Bold, Italic, ListOrdered, Calendar, Clock, MapPin, Plus, Loader2, Search } from "lucide-react";
import DashboardModal from "./DashboardModal";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
  initialData?: any;
}

export default function EventModal({ isOpen, onClose, onSave, initialData }: EventModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    open_time: "",
    close_time: "",
    location: "",
  });

  const [charCount, setCharCount] = useState(0);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const MAX_CHARS = 215;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.location && formData.location.length > 3 && !isSearching) {
        searchLocation(formData.location);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.location]);

  const searchLocation = async (query: string) => {
    try {
      setIsSearching(true);
      const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`);
      const data = await res.json();
      if (data.features) {
        setSuggestions(data.features);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        start_date: initialData.start_date ? initialData.start_date.split('T')[0] : "",
        end_date: initialData.end_date ? initialData.end_date.split('T')[0] : "",
        open_time: initialData.open_time || "",
        close_time: initialData.close_time || "",
        location: initialData.location || "",
      });
      setCharCount(initialData.description?.length || 0);
    } else if (!initialData && isOpen) {
      setFormData({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        open_time: "",
        close_time: "",
        location: "",
      });
      setCharCount(0);
    }
  }, [initialData, isOpen]);

  const handleFormat = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("event-desc") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.description;
    const selectedText = text.substring(start, end);
    let newText = text;
    
    if (start === end && suffix === "") {
        newText = text.substring(0, start) + prefix + text.substring(end);
    } else {
        newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);
    }

    if (newText.length <= MAX_CHARS) {
      setFormData({ ...formData, description: newText });
      setCharCount(newText.length);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
      }, 0);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS) {
      setFormData({ ...formData, description: val });
      setCharCount(val.length);
    }
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
        }}
        className="px-5 py-2.5 rounded-xl font-bold text-sm bg-cf-yellow text-black hover:bg-yellow-400 hover:scale-[1.02] transition-all"
      >
        {initialData ? "Actualizar evento" : "Crear evento"}
      </button>
    </>
  );

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar Evento" : "Crear Evento"}
      icon={<Calendar size={20} />}
      footer={footer}
    >
      <div className="flex flex-col gap-6 pb-12">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Nombre del Evento</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej. Comicfest 2026 - Bogotá"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Descripción</label>
            <span className={`text-[10px] font-mono ${charCount >= MAX_CHARS ? 'text-red-400' : 'text-white/20'}`}>
              {charCount}/{MAX_CHARS}
            </span>
          </div>
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
              id="event-desc"
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Describe brevemente el evento..."
              className="w-full bg-transparent p-4 min-h-[100px] text-sm text-white focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Fecha de Inicio</label>
            <div className="relative">
              <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              <input 
                type="date" 
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Fecha de Finalización</label>
            <div className="relative">
              <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              <input 
                type="date" 
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Hora de Apertura</label>
            <div className="relative">
              <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              <input 
                type="time" 
                value={formData.open_time}
                onChange={(e) => setFormData({ ...formData, open_time: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Hora de Cierre</label>
            <div className="relative">
              <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              <input 
                type="time" 
                value={formData.close_time}
                onChange={(e) => setFormData({ ...formData, close_time: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Ubicación Física</label>
          <div className="relative">
            <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            <input 
              type="text" 
              value={formData.location}
              onChange={(e) => {
                setFormData({ ...formData, location: e.target.value });
              }}
              placeholder="Busca una dirección o recinto..."
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
            />
            {isSearching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 size={14} className="text-cf-yellow animate-spin" />
              </div>
            )}
          </div>

          {/* Sugerencias de Direcciones */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-[100] mt-1 bg-[#0f0f0f] border border-white/20 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[220px] animate-in fade-in slide-in-from-top-2 duration-200 custom-scrollbar">
              {suggestions.map((s, i) => {
                const name = s.properties.name || "";
                const city = s.properties.city || s.properties.state || "";
                const country = s.properties.country || "";
                const fullAddress = [name, city, country].filter(Boolean).join(", ");
                
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setFormData({ ...formData, location: fullAddress });
                      setSuggestions([]);
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors flex items-start gap-3 group"
                  >
                    <Search size={14} className="text-white/20 mt-0.5 group-hover:text-cf-yellow transition-colors" />
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{name}</span>
                      <span className="text-xs text-white/40">{[city, country].filter(Boolean).join(", ")}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          
          <p className="text-[10px] text-white/20 px-1 italic">Empieza a escribir para buscar lugares conocidos o direcciones exactas.</p>
        </div>
      </div>
    </DashboardModal>
  );
}
