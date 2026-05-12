"use client";

import React, { useRef, useState, useEffect } from "react";
import { Bold, Italic, Underline, List, ListOrdered, FileText } from "lucide-react";
import DashboardModal from "./DashboardModal";

interface PolicyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { nombre: string; descripcion: string }) => void;
  initialData?: { title: string; content: string } | null;
}

export default function PolicyFormModal({ isOpen, onClose, onSave, initialData }: PolicyFormModalProps) {
  const [nombre, setNombre] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setNombre(initialData.title || "");
        if (editorRef.current) {
          editorRef.current.innerHTML = initialData.content || "";
        }
      } else {
        setNombre("");
        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }
      }
      setError("");
    }
  }, [isOpen, initialData]);

  const handleClose = () => {
    onClose();
  };

  const handleCommand = (command: string) => {
    document.execCommand(command, false, undefined);
    editorRef.current?.focus();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const descripcion = editorRef.current?.innerHTML?.trim() || "";
    const plainText = editorRef.current?.innerText?.trim() || "";

    if (!nombre.trim()) {
      setError("El nombre de la política es obligatorio.");
      return;
    }
    if (!plainText) {
      setError("La descripción no puede estar vacía.");
      return;
    }

    setIsSaving(true);
    try {
      await onSave({ nombre: nombre.trim(), descripcion });
      setNombre("");
      if (editorRef.current) editorRef.current.innerHTML = "";
    } catch {
      setError("Ocurrió un error al guardar. Inténtalo de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  const footer = (
    <>
      <button
        type="button"
        onClick={handleClose}
        className="px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors"
        style={{
          color: "rgba(255,255,255,0.55)",
          backgroundColor: "transparent",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
          e.currentTarget.style.color = "#fafafa";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "rgba(255,255,255,0.55)";
        }}
      >
        Cancelar
      </button>

      <button
        type="submit"
        disabled={isSaving}
        className="px-5 py-2.5 text-sm font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 font-display"
        style={{
          backgroundColor: isSaving ? "#c09a00" : "#f5c500",
          color: "#0a0a0a",
          opacity: isSaving ? 0.7 : 1,
          cursor: isSaving ? "not-allowed" : "pointer",
        }}
        onMouseEnter={e => {
          if (!isSaving) e.currentTarget.style.backgroundColor = "#ffd740";
        }}
        onMouseLeave={e => {
          if (!isSaving) e.currentTarget.style.backgroundColor = "#f5c500";
        }}
        onClick={handleSave}
      >
        {isSaving ? (
          <>
            <span
              className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin"
            />
            Guardando...
          </>
        ) : (
          "Guardar política"
        )}
      </button>
    </>
  );

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={handleClose}
      title={initialData ? "Editar Política" : "Crear Política"}
      icon={<FileText size={18} />}
      footer={footer}
    >
      <div className="flex flex-col gap-5">
        {/* Campo: Nombre */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="policy-nombre"
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            Nombre
          </label>
          <input
            id="policy-nombre"
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Ej: Política de Reembolsos"
            className="w-full rounded-xl px-4 py-3 text-sm font-body transition-all focus:outline-none"
            style={{
              backgroundColor: "#1a1a1a",   /* cf-black-3 */
              border: "1px solid rgba(245,197,0,0.12)",
              color: "#fafafa",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(245,197,0,0.50)")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(245,197,0,0.12)")}
          />
        </div>

        {/* Campo: Descripción (rich text) */}
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            Descripción
          </label>

          <div
            className="rounded-xl overflow-hidden transition-all"
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid rgba(245,197,0,0.12)",
            }}
            onFocusCapture={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,197,0,0.50)";
            }}
            onBlurCapture={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,197,0,0.12)";
            }}
          >
            {/* Toolbar */}
            <div
              className="flex items-center gap-1 px-3 py-2"
              style={{ borderBottom: "1px solid rgba(245,197,0,0.08)", backgroundColor: "#111111" }}
            >
              {[
                { cmd: "bold", icon: <Bold size={14} />, title: "Negrita" },
                { cmd: "italic", icon: <Italic size={14} />, title: "Cursiva" },
                { cmd: "underline", icon: <Underline size={14} />, title: "Subrayado" },
              ].map(btn => (
                <button
                  key={btn.cmd}
                  type="button"
                  title={btn.title}
                  onClick={() => handleCommand(btn.cmd)}
                  className="p-1.5 rounded-md transition-colors"
                  style={{ color: "rgba(255,255,255,0.40)" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#f5c500";
                    e.currentTarget.style.backgroundColor = "rgba(245,197,0,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.40)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {btn.icon}
                </button>
              ))}

              <div
                className="mx-1 self-stretch w-px"
                style={{ backgroundColor: "rgba(245,197,0,0.10)" }}
              />

              {[
                { cmd: "insertUnorderedList", icon: <List size={14} />, title: "Lista de viñetas" },
                { cmd: "insertOrderedList", icon: <ListOrdered size={14} />, title: "Lista numerada" },
              ].map(btn => (
                <button
                  key={btn.cmd}
                  type="button"
                  title={btn.title}
                  onClick={() => handleCommand(btn.cmd)}
                  className="p-1.5 rounded-md transition-colors"
                  style={{ color: "rgba(255,255,255,0.40)" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#f5c500";
                    e.currentTarget.style.backgroundColor = "rgba(245,197,0,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.40)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {btn.icon}
                </button>
              ))}
            </div>

            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              data-placeholder="Escribe la descripción de la política aquí..."
              className="w-full px-4 py-3 text-sm focus:outline-none cf-rich-editor"
              style={{
                minHeight: "180px",
                maxHeight: "360px",
                overflowY: "auto",
                color: "#fafafa",
                lineHeight: "1.6",
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  document.execCommand("insertLineBreak");
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>

        {error && (
          <p
            className="text-xs font-medium px-3 py-2 rounded-lg"
            style={{
              color: "#fbbf24",
              backgroundColor: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.20)",
            }}
          >
            {error}
          </p>
        )}
      </div>

      <style>{`
        .cf-rich-editor:empty:before {
          content: attr(data-placeholder);
          color: rgba(255,255,255,0.20);
          pointer-events: none;
        }
        .cf-rich-editor ul { list-style: disc; padding-left: 1.5rem; margin: 0.25rem 0; }
        .cf-rich-editor ol { list-style: decimal; padding-left: 1.5rem; margin: 0.25rem 0; }
      `}</style>
    </DashboardModal>
  );
}

