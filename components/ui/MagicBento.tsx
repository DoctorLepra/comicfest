"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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

/* ── BentoCard — individual card with mouse-tracked spotlight ── */
export function BentoCard({
    size = "1x1",
    className = "",
    accentColor = "#c9a227",
    children,
    delay = 0,
}: BentoCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

    const sizeClasses: Record<BentoSize, string> = {
        "1x1": "col-span-1 row-span-1",
        "2x1": "col-span-2 row-span-1",
        "1x2": "col-span-1 row-span-2",
        "2x2": "col-span-2 row-span-2",
        "3x1": "col-span-3 row-span-1",
        "1x3": "col-span-1 row-span-3",
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        setSpotlight({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            opacity: 1,
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setSpotlight((s) => ({ ...s, opacity: 0 }));
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
            className={`
        relative rounded-2xl overflow-hidden
        bg-white/[0.03] border border-white/[0.07]
        backdrop-blur-sm
        transition-colors duration-300
        hover:border-white/[0.14]
        ${sizeClasses[size]}
        ${className}
      `}
        >
            {/* Mouse spotlight */}
            <div
                className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
                style={{
                    opacity: spotlight.opacity,
                    background: `radial-gradient(320px circle at ${spotlight.x}px ${spotlight.y}px, ${accentColor}18, transparent 65%)`,
                }}
            />

            {/* Border glow on hover */}
            <div
                className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
                style={{
                    opacity: spotlight.opacity * 0.5,
                    background: `radial-gradient(200px circle at ${spotlight.x}px ${spotlight.y}px, ${accentColor}28, transparent 70%)`,
                }}
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
