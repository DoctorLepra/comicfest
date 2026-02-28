"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowRight,
    Users,
    MapPin,
    Instagram,
    Tag,
    Ticket,
    Store,
} from "lucide-react";
import { ACTIVITIES, STATS } from "@/lib/constants";
import { BentoCard } from "@/components/ui/MagicBento";

/* ─────────────────────────────────────────────
   Section header
───────────────────────────────────────────── */
function SectionHeader({
    eyebrow,
    title,
    aside,
    delay = 0,
}: {
    eyebrow: string;
    title?: string;
    aside?: React.ReactNode;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay }}
            className="flex items-end justify-between mb-8"
        >
            <div>
                <p className="text-cf-yellow text-[11px] font-display font-semibold tracking-[0.4em] uppercase mb-1">
                    {eyebrow}
                </p>
                {title && (
                    <h2 className="font-display text-3xl md:text-4xl font-black text-white">
                        {title}
                    </h2>
                )}
            </div>
            {aside}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Activity card inner content
───────────────────────────────────────────── */
function ActivityCard({
    a,
    color,
    compact = false,
    showDesc = false,
    horizontal = false,
    externalHref,
}: {
    a: (typeof ACTIVITIES)[0];
    color: string;
    compact?: boolean;
    showDesc?: boolean;
    horizontal?: boolean;
    externalHref?: string;
}) {
    const href = externalHref ?? `/actividades/${a.slug}`;
    return (
        <Link
            href={href}
            target={externalHref ? "_blank" : undefined}
            rel={externalHref ? "noopener noreferrer" : undefined}
            className={`group p-6 min-h-[180px] overflow-hidden h-full flex ${horizontal ? "flex-row items-center gap-10" : "flex-col justify-between"
                }`}
        >
            {/* Badge + icon */}
            <div className={horizontal ? "shrink-0" : ""}>
                <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold uppercase tracking-widest mb-3"
                    style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
                >
                    {a.badge}
                </span>
                <div className="text-3xl mb-2">{a.icon}</div>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
                <h3
                    className="font-display font-black text-white leading-tight group-hover:opacity-75 transition-opacity"
                    style={{ fontSize: compact ? "0.95rem" : "1.1rem" }}
                >
                    {a.title}
                </h3>
                {!compact && (
                    <p className="text-white/40 text-xs font-body mt-0.5 truncate">{a.subtitle}</p>
                )}
                {showDesc && (
                    <p className="text-white/45 text-xs font-body mt-3 leading-relaxed line-clamp-4">
                        {a.description}
                    </p>
                )}
                {horizontal && (
                    <p className="text-white/45 text-sm font-body mt-2 leading-relaxed line-clamp-2">
                        {a.description}
                    </p>
                )}
            </div>

            {/* CTA */}
            {!compact && (
                <div
                    className="flex items-center gap-1 text-xs font-display font-semibold mt-3 group-hover:gap-2 transition-all shrink-0"
                    style={{ color }}
                >
                    Ver más <ArrowRight size={11} />
                </div>
            )}
        </Link>
    );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function BentoLanding() {
    // Colores por actividad (índice = ACTIVITIES array)
    // 0:Copa Cosplay  1:KPOP  2:Esports  3:Bruce  4:Glotonería  5:Rubik
    const C = ["#c9a227", "#ff6b9d", "#00d4ff", "#ff4444", "#ff8c00", "#00ff88"];

    // Links externos oficiales para inscripciones
    const LINKS: Record<string, string> = {
        "copa-cosplay": "https://www.comicfest.co/copacosplay",
        "kpop": "https://www.comicfest.co/campeonatokpop",
    };

    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-24">

                {/* ══════════════════════════════
            1. STATS
        ══════════════════════════════ */}
                <div>
                    <SectionHeader eyebrow="Comicfest en números" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {STATS.map((s, i) => (
                            <BentoCard key={s.label} accentColor="#c9a227" delay={i * 0.07}>
                                <div className="p-6 min-h-[180px] overflow-hidden flex flex-col items-center justify-center text-center gap-2">
                                    <div className="text-3xl">{s.icon}</div>
                                    <div className="font-display text-2xl md:text-3xl font-black text-gradient">
                                        {s.value}
                                    </div>
                                    <p className="text-white/40 text-xs font-body leading-snug">{s.label}</p>
                                </div>
                            </BentoCard>
                        ))}
                    </div>
                </div>

                {/* ══════════════════════════════
            2. ACTIVIDADES (6 tarjetas)
        ══════════════════════════════ */}
                <div>
                    <SectionHeader
                        eyebrow="Lo que te espera"
                        title="ACTIVIDADES"
                        aside={
                            <Link
                                href="/actividades"
                                className="hidden sm:flex items-center gap-1.5 text-white/40 hover:text-cf-yellow text-sm font-display font-semibold transition-colors shrink-0 mb-1"
                            >
                                Ver todas <ArrowRight size={13} />
                            </Link>
                        }
                    />

                    {/*
            Layout 3 cols · 4 filas:
            ┌─────────────────┬──────────┐
            │  Copa Cosplay   │  KPOP ↕  │  row 1-2
            ├────────┬────────┤          │
            │ Esport │ Bruce  │          │  row 2
            ├────────┴────────┴──────────┤
            │  Rubik (full span 3)       │  row 3
            ├──────────────┬─────────────┤
            │  Glotonería  │  — (vacío) │  row 4 → usamos span 2 + span 1
            └──────────────┴─────────────┘
            Simplificado en 2 sub-grids para mejor control:
          */}

                    {/* Fila A: Copa (2/3 wide) + KPOP tall (1/3 ancho, 2 filas alto) */}
                    <div
                        className="grid gap-6 mb-6"
                        style={{
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gridTemplateRows: "minmax(200px, auto) minmax(180px, auto)",
                        }}
                    >
                        {/* Copa Cosplay — wide row 1 */}
                        <BentoCard accentColor={C[0]} delay={0} className="col-span-2 row-span-1">
                            <ActivityCard a={ACTIVITIES[0]} color={C[0]} externalHref={LINKS["copa-cosplay"]} />
                        </BentoCard>

                        {/* KPOP — tall col 3, ocupa filas 1 y 2 */}
                        <BentoCard accentColor={C[1]} delay={0.08} className="col-span-1 row-span-2">
                            <ActivityCard a={ACTIVITIES[1]} color={C[1]} showDesc externalHref={LINKS["kpop"]} />
                        </BentoCard>

                        {/* Esports — col 1 fila 2 */}
                        <BentoCard accentColor={C[2]} delay={0.14} className="col-span-1 row-span-1">
                            <ActivityCard a={ACTIVITIES[2]} color={C[2]} compact />
                        </BentoCard>

                        {/* Bruce Challenge — col 2 fila 2 */}
                        <BentoCard accentColor={C[3]} delay={0.2} className="col-span-1 row-span-1">
                            <ActivityCard a={ACTIVITIES[3]} color={C[3]} compact />
                        </BentoCard>
                    </div>

                    {/* Fila B: Rubik (full) + Glotonería wide */}
                    <div
                        className="grid gap-6"
                        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
                    >
                        {/* Rubik — full width */}
                        <BentoCard accentColor={C[5]} delay={0.26} className="col-span-3">
                            <ActivityCard a={ACTIVITIES[5]} color={C[5]} horizontal />
                        </BentoCard>

                        {/* Glotonería — 2/3 */}
                        <BentoCard accentColor={C[4]} delay={0.32} className="col-span-2">
                            <ActivityCard a={ACTIVITIES[4]} color={C[4]} showDesc />
                        </BentoCard>

                        {/* Ver Todas CTA card */}
                        <BentoCard accentColor="#c9a227" delay={0.38} className="col-span-1">
                            <Link
                                href="/actividades"
                                className="p-6 min-h-[180px] overflow-hidden h-full flex flex-col items-center justify-center text-center gap-3 group"
                            >
                                <div className="text-3xl">🎪</div>
                                <p className="font-display font-black text-white text-sm leading-tight">
                                    VER TODAS LAS ACTIVIDADES
                                </p>
                                <div className="flex items-center gap-1 text-cf-yellow text-xs font-display font-semibold group-hover:gap-2 transition-all">
                                    Explorar <ArrowRight size={11} />
                                </div>
                            </Link>
                        </BentoCard>
                    </div>
                </div>

                {/* ══════════════════════════════
            3. ÚNETE AL EVENTO
        ══════════════════════════════ */}
                <div>
                    <SectionHeader eyebrow="Únete al evento" />

                    {/* Fila 1: Expositor (2/3) + Entradas (1/3) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                        <BentoCard accentColor="#c9a227" delay={0} className="sm:col-span-2">
                            <div className="p-6 min-h-[180px] overflow-hidden flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 rounded-xl bg-cf-yellow/10 border border-cf-yellow/20 flex items-center justify-center shrink-0">
                                            <Store size={16} className="text-cf-yellow" />
                                        </div>
                                        <p className="text-white/35 text-[10px] font-display uppercase tracking-widest">
                                            Para expositores
                                        </p>
                                    </div>
                                    <h3 className="font-display text-2xl md:text-3xl font-black text-white leading-tight mb-2">
                                        LLEVA TU MARCA<br />
                                        <span className="text-gradient">AL SIGUIENTE NIVEL</span>
                                    </h3>
                                    <p className="text-white/45 text-sm font-body leading-relaxed mt-2 max-w-md">
                                        Acceso a más de 15.000 asistentes por edición. Reserva tu stand fácil y rápido.
                                    </p>
                                </div>
                                <div className="flex gap-3 mt-6 flex-wrap">
                                    <Link
                                        href="/expositores"
                                        className="flex items-center gap-2 bg-cf-yellow text-cf-black font-display font-black px-5 py-2.5 rounded-xl hover:bg-cf-yellow-light transition-all text-sm"
                                    >
                                        Ser Expositor <ArrowRight size={13} />
                                    </Link>
                                    <Link
                                        href="/expositores/reserva"
                                        className="flex items-center gap-2 border border-cf-yellow/30 text-cf-yellow font-display font-bold px-5 py-2.5 rounded-xl hover:border-cf-yellow/60 transition-all text-sm"
                                    >
                                        Ver stands <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        </BentoCard>

                        <BentoCard accentColor="#ff6b9d" delay={0.1} className="sm:col-span-1">
                            <div className="p-6 min-h-[180px] overflow-hidden flex flex-col justify-between h-full">
                                <div>
                                    <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4">
                                        <Ticket size={16} className="text-pink-400" />
                                    </div>
                                    <h3 className="font-display text-xl font-black text-white mb-2 leading-tight">
                                        COMPRAR<br />ENTRADAS
                                    </h3>
                                    <p className="text-white/45 text-sm font-body">
                                        Desde $20.000 COP.<br />¡No te quedes sin tu lugar!
                                    </p>
                                </div>
                                <Link
                                    href="/entradas"
                                    className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-display font-bold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-all text-sm mt-6 w-fit"
                                >
                                    Ver precios <ArrowRight size={13} />
                                </Link>
                            </div>
                        </BentoCard>
                    </div>

                    {/* Fila 2: 4 mini info cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <BentoCard accentColor="#c9a227" delay={0.15}>
                            <div className="p-6 min-h-[180px] overflow-hidden flex flex-col items-center justify-center text-center gap-2">
                                <Users size={22} className="text-cf-yellow opacity-50 mb-1" />
                                <div className="font-display text-xl font-black text-gradient">15.000+</div>
                                <p className="text-white/35 text-xs">Visitantes por edición</p>
                            </div>
                        </BentoCard>

                        <BentoCard accentColor="#c9a227" delay={0.2}>
                            <div className="p-6 min-h-[180px] overflow-hidden flex flex-col items-center justify-center text-center gap-2">
                                <Tag size={22} className="text-cf-yellow opacity-50 mb-1" />
                                <div className="font-display text-xl font-black text-gradient">120+</div>
                                <p className="text-white/35 text-xs">Marcas expositoras</p>
                            </div>
                        </BentoCard>

                        <BentoCard accentColor="#c9a227" delay={0.25}>
                            <div className="p-6 min-h-[180px] overflow-hidden flex flex-col items-center justify-center text-center gap-2">
                                <MapPin size={22} className="text-cf-yellow opacity-50 mb-1" />
                                <div className="font-display text-base font-black text-white">C.C. La 14</div>
                                <p className="text-white/35 text-xs">Pereira · Marzo 2026</p>
                            </div>
                        </BentoCard>

                        <BentoCard accentColor="#ff6b9d" delay={0.3}>
                            <a
                                href="https://www.instagram.com/comicfestco"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-6 min-h-[180px] overflow-hidden flex flex-col items-center justify-center text-center gap-2 h-full"
                            >
                                <Instagram size={22} className="text-pink-400 opacity-60 mb-1" />
                                <div className="font-display text-base font-black text-white">@comicfestco</div>
                                <p className="text-white/35 text-xs">57K+ seguidores</p>
                            </a>
                        </BentoCard>
                    </div>
                </div>

            </div>
        </section>
    );
}
