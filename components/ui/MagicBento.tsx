"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

/* ── Types ── */
export type BentoSize = "1x1" | "2x1" | "1x2" | "2x2" | "3x1" | "1x3";

export interface BentoCardProps {
    size?: BentoSize;
    className?: string;
    accentColor?: string;
    children: React.ReactNode;
    delay?: number;
}

/* ── BentoCard — mouse-tracked spotlight via CSS custom properties (no setState, no repaint) ── */
export function BentoCard({
    size = "1x1",
    className = "",
    accentColor = "#c9a227",
    children,
    delay = 0,
}: BentoCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    const sizeClasses: Record<BentoSize, string> = {
        "1x1": "col-span-1 row-span-1",
        "2x1": "col-span-2 row-span-1",
        "1x2": "col-span-1 row-span-2",
        "2x2": "col-span-2 row-span-2",
        "3x1": "col-span-3 row-span-1",
        "1x3": "col-span-1 row-span-3",
    };

    // Update spotlight position via direct DOM mutation — no React re-render
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const card = cardRef.current;
        const spot = spotlightRef.current;
        if (!card || !spot) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spot.style.background = `radial-gradient(280px circle at ${x}px ${y}px, ${accentColor}18, transparent 65%)`;
        spot.style.opacity = "1";
    }, [accentColor]);

    const handleMouseLeave = useCallback(() => {
        const spot = spotlightRef.current;
        if (spot) spot.style.opacity = "0";
    }, []);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${sizeClasses[size]} ${className}`}
            style={{
                background: "linear-gradient(135deg, rgba(20,20,20,0.97) 0%, rgba(30,30,30,0.95) 100%)",
                border: `1px solid ${accentColor}30`,
                boxShadow: `0 0 28px ${accentColor}10`,
            }}
            whileHover={{ boxShadow: `0 0 40px ${accentColor}22`, borderColor: `${accentColor}55` } as never}
        >
            {/* Mouse spotlight — mutated directly, no React state */}
            <div
                ref={spotlightRef}
                className="pointer-events-none absolute inset-0 z-10"
                style={{ opacity: 0, transition: "opacity 0.3s" }}
            />

            {/* Content */}
            <div className="relative z-20 h-full">{children}</div>
        </motion.div>
    );
}

/* ── MagicBento — container grid ── */
interface MagicBentoProps {
    children: React.ReactNode;
    className?: string;
    columns?: 2 | 3 | 4;
}

export default function MagicBento({
    children,
    className = "",
    columns = 3,
}: MagicBentoProps) {
    const colClass = {
        2: "grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-2 lg:grid-cols-4",
    }[columns];

    return (
        <div className={`grid ${colClass} gap-4 ${className}`}>{children}</div>
    );
}
