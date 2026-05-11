"use client";

import React, { useState, useRef } from "react";
import { Upload, MapPin, X, GripHorizontal } from "lucide-react";
import clsx from "clsx";
import { supabase } from "@/lib/supabase";

interface StandMapEditorProps {
  eventId: string;
  floorplanUrl: string | null;
  stands: any[];
  onUpdate: () => void;
}

const getCategoryColor = (category: string | null) => {
  const colors = [
    'bg-cf-yellow border-cf-yellow/50 text-black',
    'bg-blue-500 border-blue-400 text-white',
    'bg-emerald-500 border-emerald-400 text-white',
    'bg-purple-500 border-purple-400 text-white',
    'bg-rose-500 border-rose-400 text-white',
    'bg-orange-500 border-orange-400 text-white',
    'bg-cyan-500 border-cyan-400 text-white',
  ];
  if (!category) return colors[0];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const getDimensions = (dimensionsStr: string | null) => {
  const defaultSize = { width: 50, height: 50 }; // fallback
  if (!dimensionsStr) return defaultSize;
  const parts = dimensionsStr.toLowerCase().split('x');
  if (parts.length === 2) {
    const w = parseFloat(parts[0].trim());
    const h = parseFloat(parts[1].trim());
    if (!isNaN(w) && !isNaN(h)) {
      // 1 metro = 25px (factor de escala visual)
      return { width: w * 25, height: h * 25 };
    }
  }
  return defaultSize;
};

export default function StandMapEditor({ eventId, floorplanUrl, stands, onUpdate }: StandMapEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.includes("svg") && file.type !== "application/pdf") {
      alert("Solo se permiten archivos SVG y PDF.");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${eventId}-${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('floorplans')
        .upload(fileName, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('floorplans')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('events')
        .update({ floorplan_url: publicUrlData.publicUrl })
        .eq('id', eventId);

      if (updateError) throw updateError;
      
      onUpdate();
    } catch (err) {
      console.error("Error al subir plano:", err);
      alert("Hubo un error subiendo el plano.");
    } finally {
      setIsUploading(false);
    }
  };

  // Drag and drop for stands
  const mapRef = useRef<HTMLDivElement>(null);

  const handleStandDragStart = (e: React.DragEvent, standId: string, source: 'sidebar' | 'map') => {
    e.dataTransfer.setData("standId", standId);
    e.dataTransfer.setData("source", source);
  };

  const handleMapDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const standId = e.dataTransfer.getData("standId");
    const source = e.dataTransfer.getData("source");
    if (!standId || !mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert to percentage
    const pos_x = (x / rect.width) * 100;
    const pos_y = (y / rect.height) * 100;

    if (source === 'sidebar') {
      const sourceStand = stands.find(s => s.id === standId);
      if (!sourceStand) return;
      
      // Contar cuántos de esta categoría ya existen en el mapa para darle un nombre y numeración consecutivos
      const existingOfCategory = stands.filter(s => s.category === sourceStand.category && s.pos_x !== null);
      
      const prefix = sourceStand.numeracion || "0";
      const newNumeracion = `${prefix}.${existingOfCategory.length + 1}`;
      const newIdentifier = `${sourceStand.identifier}`;

      const { error } = await supabase.from('stands').insert({
        event_id: eventId,
        identifier: newIdentifier,
        category: sourceStand.category,
        dimensions: sourceStand.dimensions,
        base_price: sourceStand.base_price,
        description: sourceStand.description,
        sale_start_date: sourceStand.sale_start_date,
        sale_end_date: sourceStand.sale_end_date,
        status: sourceStand.status,
        numeracion: newNumeracion,
        pos_x,
        pos_y
      });

      if (error) {
        console.error("Error spawning stand:", error);
      } else {
        onUpdate();
      }
    } else {
      // Reposicionar un stand ya existente en el mapa
      const { error } = await supabase
        .from('stands')
        .update({ pos_x, pos_y })
        .eq('id', standId);

      if (error) {
        console.error("Error updating stand position:", error);
      } else {
        onUpdate();
      }
    }
  };

  const handleRemoveStandFromMap = async (standId: string) => {
    // Cuando lo quitamos del mapa, se elimina esta instancia física.
    const { error } = await supabase
      .from('stands')
      .delete()
      .eq('id', standId);
    
    if (error) {
      console.error("Error removing stand from map:", error);
    } else {
      onUpdate();
    }
  };

  const isPdf = floorplanUrl?.toLowerCase().includes('.pdf');

  if (!floorplanUrl) {
    return (
      <div 
        className={clsx(
          "w-full h-[500px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all",
          dragActive ? "border-cf-yellow bg-cf-yellow/5" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white/40">
          <Upload size={24} />
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-2">Sube el plano del evento</h3>
        <p className="text-white/40 text-sm mb-6 text-center max-w-sm">
          Arrastra y suelta tu archivo aquí o haz clic para buscar. Solo archivos <strong>SVG</strong> y <strong>PDF</strong>.
        </p>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} 
          accept=".svg,application/pdf"
          className="hidden"
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-6 py-3 rounded-xl font-bold text-sm bg-cf-yellow text-black hover:bg-yellow-400 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? "Subiendo..." : "Seleccionar Archivo"}
        </button>
      </div>
    );
  }

  // Plantillas/Categorías asignadas al evento
  const standTemplates = stands.filter(s => s.pos_x === null || s.pos_y === null);
  // Stands ya instanciados en el mapa
  const mappedStands = stands.filter(s => s.pos_x !== null && s.pos_y !== null);

  return (
    <div className="flex gap-6 h-[75vh] w-full">
      {/* Canvas Area */}
      <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative flex flex-col">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.01]">
          <h3 className="font-display font-semibold text-white">Lienzo del Plano</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40">Zonas ubicadas: {mappedStands.length}</span>
          </div>
        </div>
        
        <div 
          className="flex-1 relative overflow-auto bg-[#111]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleMapDrop}
        >
          <div 
            ref={mapRef}
            className="relative inline-block min-w-full min-h-full"
            style={{ width: 'max-content' }}
          >
            {isPdf ? (
              <object 
                data={floorplanUrl} 
                type="application/pdf" 
                className="w-[1200px] h-[800px] pointer-events-none opacity-80"
              />
            ) : (
              <img 
                src={floorplanUrl} 
                alt="Plano del evento" 
                className="max-w-none opacity-80 pointer-events-none select-none"
              />
            )}

            {/* Stands ubicados */}
            {mappedStands.map(stand => {
              const { width, height } = getDimensions(stand.dimensions);
              const colorClasses = getCategoryColor(stand.category);

              return (
                <div 
                  key={stand.id}
                  draggable
                  onDragStart={(e) => handleStandDragStart(e, stand.id, 'map')}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group/stand cursor-move"
                  style={{
                    left: `${stand.pos_x}%`,
                    top: `${stand.pos_y}%`,
                    width: `${width}px`,
                    height: `${height}px`,
                  }}
                >
                  <div className={clsx(
                    "w-full h-full backdrop-blur-md border-2 rounded shadow-lg flex items-center justify-center font-bold text-xs hover:brightness-110 transition-all relative overflow-hidden",
                    colorClasses
                  )}>
                    <span className="truncate px-1 text-sm">{stand.numeracion}</span>
                    
                    {/* Tooltip Delete */}
                    <button 
                      onClick={() => handleRemoveStandFromMap(stand.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover/stand:opacity-100 transition-opacity hover:bg-red-600 shadow-md z-10"
                    >
                      <X size={10} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar Inventario / Categorías */}
      <div className="w-80 bg-[#0a0a0a] border border-white/10 rounded-2xl flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-display font-semibold text-white mb-1">Categorías Asignadas</h3>
          <p className="text-xs text-white/40">Arrastra para agregar al plano</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {standTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <p className="text-sm text-white/40 mb-2">No hay categorías asignadas a este evento.</p>
              <p className="text-xs text-white/20">Ve a la pestaña de stands y asigna plantillas globales.</p>
            </div>
          ) : (
            standTemplates.map(stand => {
              const colorClasses = getCategoryColor(stand.category);
              
              return (
                <div 
                  key={stand.id}
                  draggable
                  onDragStart={(e) => handleStandDragStart(e, stand.id, 'sidebar')}
                  className={clsx(
                    "bg-white/[0.03] border border-white/10 rounded-xl p-3 flex items-start gap-3 cursor-grab active:cursor-grabbing hover:bg-white/[0.06] transition-all group/item",
                    "hover:border-white/20"
                  )}
                >
                  <div className="mt-1 text-white/20 group-hover/item:text-white/40 transition-colors">
                    <GripHorizontal size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">{stand.identifier}</h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className={clsx("text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded", colorClasses)}>
                        {stand.category || 'General'}
                      </span>
                      <span className="text-[10px] text-white/40">
                        {stand.dimensions}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
