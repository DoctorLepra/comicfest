"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ACTIVITIES, TICKETS } from "@/lib/constants";
import TiltedCard from "@/components/ui/TiltedCard";
import { BentoCard } from "@/components/ui/MagicBento";
import SpotlightCard from "@/components/ui/SpotlightCard";

/* ── Ticket styles ── */
const TICKET_STYLES: Record<string, { spotlight: string; border: string; glow: string }> = {
    general: { spotlight: "rgba(255, 255, 255, 0.22)", border: "rgba(255,255,255,0.28)", glow: "rgba(255,255,255,0.07)" },
    parche: { spotlight: "rgba(245, 197, 0, 0.22)", border: "rgba(245,197,0,0.5)", glow: "rgba(245,197,0,0.12)" },
    fullpass: { spotlight: "rgba(0, 212, 255, 0.18)", border: "rgba(0,212,255,0.28)", glow: "rgba(0,212,255,0.10)" },
};

const ACTIVITY_IMAGES: Record<string, string> = {
    "copa-cosplay": "/images/cosplay.png",
    kpop: "/images/kpop.png",
    esports: "/images/esports.png",
    "bruce-challenge": "/images/bruce.png",
    "glotoneria-challenge": "/images/glotoneria.png",
    "cubo-rubik": "/images/rubik.png",
};

const ACTIVITY_COLORS = ["#f5c500", "#ff6b9d", "#00d4ff", "#ff4444", "#ff8c00", "#00ff88"];

const LINKS: Record<string, string> = {};

/* ── Reusable card shell ── */
function DarkCard({
    color = "#c9a227",
    delay = 0,
    className = "",
    children,
}: {
    color?: string;
    delay?: number;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ boxShadow: `0 0 40px ${color}28` } as never}
            className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${className}`}
            style={{
                background: "linear-gradient(135deg, rgba(20,20,20,0.97) 0%, rgba(30,30,30,0.95) 100%)",
                border: `1px solid ${color}35`,
                boxShadow: `0 0 24px ${color}12`,
            }}
        >
            {children}
        </motion.div>
    );
}

/* ── Section header ── */
function SectionHeader({ eyebrow, title }: { eyebrow: string; title?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-16"
        >
            <p className="text-cf-yellow text-[11px] font-display font-semibold tracking-[0.4em] uppercase mb-5">
                {eyebrow}
            </p>
            {title && (
                <h2 className="font-display text-3xl md:text-4xl font-black text-white">{title}</h2>
            )}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function BentoLanding() {
    return (
        <section className="py-32 relative w-full">
            <div className="flex flex-col gap-40 px-6 md:px-12">

                {/* ══════════════════════════════
                    1. ENTRADAS
                ══════════════════════════════ */}
                <div>
                    <SectionHeader eyebrow="Tus entradas" title="ACCEDE AL EVENTO" />
                    <div className="grid md:grid-cols-3 gap-10">
                        {TICKETS.map((ticket, i) => {
                            const colors = TICKET_STYLES[ticket.id] ?? TICKET_STYLES.general;
                            const isPopular = ticket.badge === "POPULAR";
                            return (
                                <motion.div
                                    key={ticket.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.55 }}
                                    className="h-full"
                                >
                                    <SpotlightCard
                                        spotlightColor={colors.spotlight as `rgba(${number}, ${number}, ${number}, ${number})`}
                                        className="h-full rounded-2xl flex flex-col"
                                        style={{
                                            background: "linear-gradient(135deg, rgba(20,20,20,0.97) 0%, rgba(30,30,30,0.95) 100%)",
                                            border: `${isPopular ? "2px" : "1px"} solid ${colors.border}`,
                                            boxShadow: `0 0 36px ${colors.glow}`,
                                        }}
                                    >
                                        {/* Badge top bar */}
                                        <div
                                            className={`py-2 text-center text-xs font-display font-black tracking-widest uppercase ${
                                                ticket.badge
                                                    ? isPopular
                                                        ? "bg-cf-yellow text-cf-black"
                                                        : "bg-gradient-to-r from-cf-yellow-dark to-cf-yellow text-cf-black"
                                                    : "opacity-0 pointer-events-none select-none"
                                            }`}
                                        >
                                            {ticket.badge || "\u00A0"}
                                        </div>
                                        <div className="p-10 flex flex-col flex-1">
                                            <h3 className="font-display text-xl font-black text-cf-white mb-1">
                                                {ticket.name}
                                            </h3>
                                            <p className="text-cf-white/50 text-sm font-body mb-8">
                                                {ticket.description}
                                            </p>
                                            <div className="mb-10">
                                                <span className="font-display text-4xl font-black text-gradient">
                                                    {ticket.priceLabel}
                                                </span>
                                                <span className="text-cf-white/40 text-sm font-body ml-2">COP</span>
                                            </div>
                                            <ul className="space-y-4">
                                                {ticket.features.map((f) => (
                                                    <li key={f} className="flex items-start gap-2.5 text-cf-white/60 text-sm font-body">
                                                        <Check size={13} className="text-cf-yellow shrink-0 mt-0.5" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* ══════════════════════════════
                    2. ACTIVIDADES — grid 3x3
                ══════════════════════════════ */}
                <div>
                    <SectionHeader eyebrow="Lo que te espera" title="ACTIVIDADES" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {ACTIVITIES.map((activity, i) => {
                            const img = ACTIVITY_IMAGES[activity.slug];
                            const href = LINKS[activity.slug] ?? `/actividades/${activity.slug}`;
                            const isExternal = !!LINKS[activity.slug];
                            return (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.6 }}
                                    className="h-full"
                                >
                                    <BentoCard accentColor={activity.color} delay={i * 0.06}>
                                        <div className="flex flex-col h-full min-h-[460px]">

                                            {/* ── TiltedCard image area ── */}
                                            <div className="relative" style={{ height: "220px" }}>
                                                <TiltedCard
                                                    imageSrc={img}
                                                    altText={activity.title}
                                                    captionText={activity.badge}
                                                    containerHeight="220px"
                                                    containerWidth="100%"
                                                    imageHeight="220px"
                                                    imageWidth="100%"
                                                    scaleOnHover={1.04}
                                                    rotateAmplitude={8}
                                                    showTooltip
                                                    displayOverlayContent
                                                    overlayContent={
                                                        <div
                                                            className="absolute inset-0 flex flex-col justify-end p-5"
                                                            style={{
                                                                background: `linear-gradient(to top, ${activity.color}cc 0%, transparent 60%)`,
                                                            }}
                                                        >
                                                            <span className="text-3xl mb-1">{activity.icon}</span>
                                                            <span
                                                                className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold uppercase tracking-widest w-fit"
                                                                style={{
                                                                    color: activity.color,
                                                                    backgroundColor: `rgba(0,0,0,0.55)`,
                                                                    border: `1px solid ${activity.color}50`,
                                                                }}
                                                            >
                                                                {activity.badge}
                                                            </span>
                                                        </div>
                                                    }
                                                />
                                            </div>

                                            {/* ── Text content ── */}
                                            <div className="p-8 md:p-10 flex flex-col flex-1">
                                                <h2 className="font-display text-xl font-black text-cf-white mb-1 text-center">
                                                    {activity.title}
                                                </h2>
                                                <p className="text-cf-white/40 text-sm text-center mb-6">{activity.subtitle}</p>

                                                <p className="text-cf-white/60 font-body text-sm leading-relaxed mb-6">
                                                    {activity.description}
                                                </p>

                                                <ul className="space-y-3 mb-8">
                                                    {activity.features.map((f) => (
                                                        <li key={f} className="flex items-center gap-2 text-cf-white/50 text-sm font-body">
                                                            <span
                                                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                                                style={{ backgroundColor: activity.color }}
                                                            />
                                                            {f}
                                                        </li>
                                                    ))}
                                                </ul>

                                                {(activity.slug === "copa-cosplay" || activity.slug === "kpop" || activity.slug === "esports") && (
                                                    <div className="card-action-spacing">
                                                        <Link
                                                            href={href}
                                                            target={isExternal ? "_blank" : undefined}
                                                            rel={isExternal ? "noopener noreferrer" : undefined}
                                                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-display font-bold text-sm transition-all hover:scale-[1.02]"
                                                            style={{
                                                                backgroundColor: `${activity.color}15`,
                                                                color: activity.color,
                                                                border: `1px solid ${activity.color}40`,
                                                            }}
                                                        >
                                                            {activity.slug === "copa-cosplay" || activity.slug === "kpop" ? "Inscribirse" : "Ver torneos"}
                                                            <ArrowRight size={14} />
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </BentoCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}