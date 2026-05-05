"use client";

import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string; // e.g., "max-w-md", "max-w-2xl"
}

export default function DashboardModal({
  isOpen,
  onClose,
  title,
  icon,
  children,
  footer,
  maxWidth = "max-w-2xl",
}: DashboardModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`w-full ${maxWidth} rounded-2xl shadow-2xl overflow-hidden my-auto`}
            style={{
              backgroundColor: "#111111", // cf-black-2
              border: "1px solid rgba(245, 197, 0, 0.15)",
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(245,197,0,0.10)", backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-center gap-3">
                {icon && (
                  <div
                    className="p-2.5 rounded-xl"
                    style={{ backgroundColor: "rgba(245,197,0,0.08)" }}
                  >
                    <div style={{ color: "#f5c500" }}>{icon}</div>
                  </div>
                )}
                <h2
                  className="font-display font-bold text-xl uppercase tracking-wider"
                  style={{ color: "#fafafa" }}
                >
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl transition-colors hover:bg-white/5"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f5c500")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                aria-label="Cerrar"
              >
                <X size={22} />
              </button>
            </div>

            {/* ── Body ── */}
            <div className="p-6">
              {children}
            </div>

            {/* ── Footer ── */}
            {footer && (
              <div
                className="px-6 py-5 flex items-center justify-end gap-3"
                style={{ 
                  borderTop: "1px solid rgba(245,197,0,0.08)",
                  backgroundColor: "rgba(255,255,255,0.01)" 
                }}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
