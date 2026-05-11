"use client";

import React, { useState, useEffect } from "react";
import { Plus, Check, MapPin, Search } from "lucide-react";
import DashboardModal from "./DashboardModal";
import { supabase } from "@/lib/supabase";
import clsx from "clsx";

interface AssignStandsModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  onAssign: (standIds: string[]) => void;
  onCreateGlobal: () => void;
  assignedIdentifiers: string[];
}

export default function AssignStandsModal({ isOpen, onClose, eventId, onAssign, onCreateGlobal, assignedIdentifiers }: AssignStandsModalProps) {
  const [globalStands, setGlobalStands] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchGlobalStands();
      setSelectedIds([]);
      setSearchTerm("");
    }
  }, [isOpen]);

  const fetchGlobalStands = async () => {
    setLoading(true);
    // Fetch stands where event_id is null (global templates)
    const { data, error } = await supabase
      .from('stands')
      .select('*')
      .is('event_id', null)
      .order('identifier', { ascending: true });

    if (data) {
      setGlobalStands(data);
    }
    setLoading(false);
  };

  const filteredStands = globalStands.filter(s => 
    s.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
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
          onAssign(selectedIds);
        }}
        disabled={selectedIds.length === 0}
        className="px-5 py-2.5 rounded-xl font-bold text-sm bg-cf-yellow text-black hover:bg-yellow-400 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Agregar {selectedIds.length > 0 ? `(${selectedIds.length})` : ""} al evento
      </button>
    </>
  );

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title="Asignar Stands al Evento"
      icon={<MapPin size={20} />}
      footer={footer}
      maxWidth="max-w-2xl"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Buscar stand global..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
            />
          </div>
          <button 
            onClick={onCreateGlobal}
            className="flex items-center gap-2 px-4 py-2 border border-cf-yellow/20 bg-cf-yellow/10 text-cf-yellow rounded-xl text-sm font-bold hover:bg-cf-yellow/20 transition-all whitespace-nowrap"
          >
            <Plus size={16} /> Crear Stand General
          </button>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden max-h-[300px] overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="p-8 text-center text-white/40 text-sm">Cargando stands generales...</div>
          ) : filteredStands.length === 0 ? (
            <div className="p-8 text-center text-white/40 text-sm">
              No hay stands generales disponibles. <br/>Crea uno nuevo para asignarlo.
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-white/5">
              {filteredStands.map(stand => {
                const isAlreadyAssigned = assignedIdentifiers.includes(stand.identifier);
                return (
                  <div 
                    key={stand.id} 
                    onClick={() => !isAlreadyAssigned && toggleSelect(stand.id)}
                    className={clsx(
                      "flex items-center justify-between p-4 transition-colors",
                      isAlreadyAssigned ? "opacity-50 cursor-not-allowed bg-white/[0.01]" : 
                      selectedIds.includes(stand.id) ? "bg-cf-yellow/5 cursor-pointer" : "hover:bg-white/[0.02] cursor-pointer"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={clsx(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        isAlreadyAssigned ? "border-white/10" :
                        selectedIds.includes(stand.id) ? "bg-cf-yellow border-cf-yellow text-black" : "border-white/20"
                      )}>
                        {(selectedIds.includes(stand.id) || isAlreadyAssigned) && <Check size={12} strokeWidth={isAlreadyAssigned ? 2 : 4} className={isAlreadyAssigned ? "text-white/20" : ""} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          {stand.identifier}
                          {isAlreadyAssigned && <span className="text-[9px] uppercase tracking-wider bg-white/10 text-white/40 px-2 py-0.5 rounded-sm">Ya asignado</span>}
                        </h4>
                        <p className="text-xs text-white/40 mt-0.5">{stand.category} • {stand.dimensions} • ${new Intl.NumberFormat("es-CO").format(stand.base_price)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 leading-relaxed">
          <strong>Nota:</strong> Al agregar un stand a este evento, se creará una copia específica. Podrás modificar su nombre, descripción, precio y fechas de venta exclusivamente para este evento sin afectar el stand general.
        </div>
      </div>
    </DashboardModal>
  );
}
