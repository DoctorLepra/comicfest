"use client";

import React, { useState, useEffect } from "react";
import { Plus, Check, FileText, Search } from "lucide-react";
import DashboardModal from "./DashboardModal";
import { supabase } from "@/lib/supabase";
import clsx from "clsx";

interface AssignPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  onAssign: (policyIds: string[]) => void;
  onCreateGlobal: () => void;
  assignedTitles: string[];
}

export default function AssignPoliciesModal({ isOpen, onClose, eventId, onAssign, onCreateGlobal, assignedTitles }: AssignPoliciesModalProps) {
  const [globalPolicies, setGlobalPolicies] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchGlobalPolicies();
      setSelectedIds([]);
      setSearchTerm("");
    }
  }, [isOpen]);

  const fetchGlobalPolicies = async () => {
    setLoading(true);
    // Fetch policies where event_id is null (global templates)
    const { data, error } = await supabase
      .from('policies')
      .select('*')
      .is('event_id', null)
      .order('title', { ascending: true });

    if (data) {
      setGlobalPolicies(data);
    }
    setLoading(false);
  };

  const filteredPolicies = globalPolicies.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
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
      title="Asignar Políticas al Evento"
      icon={<FileText size={20} />}
      footer={footer}
      maxWidth="max-w-2xl"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Buscar política global..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-cf-yellow/50 transition-colors"
            />
          </div>
          <button 
            onClick={onCreateGlobal}
            className="flex items-center gap-2 px-4 py-2 border border-cf-yellow/20 bg-cf-yellow/10 text-cf-yellow rounded-xl text-sm font-bold hover:bg-cf-yellow/20 transition-all whitespace-nowrap"
          >
            <Plus size={16} /> Crear Política General
          </button>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden max-h-[300px] overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="p-8 text-center text-white/40 text-sm">Cargando políticas generales...</div>
          ) : filteredPolicies.length === 0 ? (
            <div className="p-8 text-center text-white/40 text-sm">
              No hay políticas generales disponibles. <br/>Crea una nueva para asignarla.
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-white/5">
              {filteredPolicies.map(policy => {
                const isAlreadyAssigned = assignedTitles.includes(policy.title);
                return (
                  <div 
                    key={policy.id} 
                    onClick={() => !isAlreadyAssigned && toggleSelect(policy.id)}
                    className={clsx(
                      "flex items-center justify-between p-4 transition-colors",
                      isAlreadyAssigned ? "opacity-50 cursor-not-allowed bg-white/[0.01]" : 
                      selectedIds.includes(policy.id) ? "bg-cf-yellow/5 cursor-pointer" : "hover:bg-white/[0.02] cursor-pointer"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={clsx(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        isAlreadyAssigned ? "border-white/10" :
                        selectedIds.includes(policy.id) ? "bg-cf-yellow border-cf-yellow text-black" : "border-white/20"
                      )}>
                        {(selectedIds.includes(policy.id) || isAlreadyAssigned) && <Check size={12} strokeWidth={isAlreadyAssigned ? 2 : 4} className={isAlreadyAssigned ? "text-white/20" : ""} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          {policy.title}
                          {isAlreadyAssigned && <span className="text-[9px] uppercase tracking-wider bg-white/10 text-white/40 px-2 py-0.5 rounded-sm">Ya asignada</span>}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 leading-relaxed">
          <strong>Nota:</strong> Al agregar una política a este evento, se creará una copia específica. Podrás modificar su contenido exclusivamente para este evento sin afectar la política general.
        </div>
      </div>
    </DashboardModal>
  );
}
