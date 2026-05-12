import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  labelName?: string;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  labelName = "registros",
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  
  if (totalItems <= itemsPerPage && totalItems !== 0) return null;

  return (
    <div className="shrink-0 px-4 py-3 border-t border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-between gap-4">
      <p className="text-xs text-white/40 font-mono">
        Mostrando {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}–{Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} {labelName}
      </p>
      
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded-md text-xs text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-colors"
        >
          «
        </button>
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
          .reduce<(number | "...")[]>((acc, p, idx, arr) => {
            if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("...");
            acc.push(p);
            return acc;
          }, [])
          .map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2 text-white/30 text-xs">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={clsx(
                  "w-7 h-7 rounded-md text-xs font-bold transition-colors",
                  currentPage === p
                    ? "bg-cf-yellow text-black"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                )}
              >
                {p}
              </button>
            )
          )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={14} />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded-md text-xs text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-colors"
        >
          »
        </button>
      </div>
    </div>
  );
}
