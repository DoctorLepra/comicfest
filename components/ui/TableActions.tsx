'use client';

import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import clsx from 'clsx';

interface TableActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  extraActions?: {
    icon: React.ElementType;
    onClick: () => void;
    label: string;
    variant?: 'default' | 'danger' | 'info' | 'warning';
  }[];
  isDeleting?: boolean;
  className?: string;
}

const TableActions: React.FC<TableActionsProps> = ({
  onEdit,
  onDelete,
  onView,
  extraActions = [],
  isDeleting = false,
  className
}) => {
  return (
    <div className={clsx("flex items-center justify-end gap-2", className)}>
      {onView && (
        <button
          onClick={onView}
          className="p-2 text-blue-400/70 hover:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors"
          title="Ver detalle"
        >
          <Eye size={14} />
        </button>
      )}
      
      {onEdit && (
        <button
          onClick={onEdit}
          disabled={isDeleting}
          className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          title="Editar"
        >
          <Edit2 size={14} />
        </button>
      )}

      {extraActions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick}
          disabled={isDeleting}
          className={clsx(
            "p-2 rounded-lg transition-colors disabled:opacity-50",
            action.variant === 'danger' ? "text-red-400/70 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20" :
            action.variant === 'info' ? "text-blue-400/70 hover:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20" :
            action.variant === 'warning' ? "text-yellow-400/70 hover:text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20" :
            "text-white/40 hover:text-white bg-white/5 hover:bg-white/10"
          )}
          title={action.label}
        >
          <action.icon size={14} />
        </button>
      ))}

      {onDelete && (
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="p-2 text-red-400/70 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
          title="Eliminar"
        >
          {isDeleting ? (
            <div className="w-3.5 h-3.5 border-2 border-red-400/20 border-t-red-400 rounded-full animate-spin" />
          ) : (
            <Trash2 size={14} />
          )}
        </button>
      )}
    </div>
  );
};

export default TableActions;
