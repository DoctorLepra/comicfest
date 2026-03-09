"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Instagram, Tag, Ticket, Store } from "lucide-react";
import { ACTIVITIES, STATS } from "@/lib/constants";
import TiltedCard from "@/components/ui/TiltedCard";
import { BentoCard } from "@/components/ui/MagicBento";

/* ── Image maps ── */
const STAT_IMAGES: string[] = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=75&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=75&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&q=75&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400&q=75&auto=format&fit=crop",
];

const ACTIVITY_IMAGES: Record<string, string> = {
    "copa-cosplay": "/images/cosplay.png",
    kpop: "/images/kpop.png",
    esports: "/images/esports.png",
    "bruce-challenge": "/images/bruce.png",
    "glotoneria-challenge": "/images/glotoneria.png",
    "cubo-rubik": "/images/rubik.png",
};

const ACTIVITY_COLORS = ["#f5c500", "#ff6b9d", "#00d4ff", "#ff4444", "#ff8c00", "#00ff88"];

const LINKS: Record<string, string> = {
    "copa-cosplay": "https://www.comicfest.co/copacosplay",
    kpop: "https://www.comicfest.co/campeonatokpop",
};

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
function SectionHeader({ eyebrow, title, aside }: { eyebrow: string; title?: string; aside?: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex items-end justify-between mb-8"
        >
            <div>
                <p className="text-cf-yellow text-[11px] font-display font-semibold tracking-[0.4em] uppercase mb-1">
                    {eyebrow}
                </p>
                {title && (
                    <h2 className="font-display text-3xl md:text-4xl font-black text-white">{title}</h2>
                )}
            </div>
            {aside}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function BentoLanding() {
    return (
        <section className="py-24 relative w-full">
            <div className="flex flex-col gap-24 px-6 md:px-12">

                {/* ══════════════════════════════
                    1. STATS
                ══════════════════════════════ */}
                <div>
                    <SectionHeader eyebrow="Comicfest en números" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {STATS.map((s, i) => (
                            <DarkCard key={s.label} color="#c9a227" delay={i * 0.07}>
                                <div className="flex flex-col">
                                    {/* Image */}
                                    <div style={{ height: "120px", flexShrink: 0 }}>
                                        <TiltedCard
                                            imageSrc={STAT_IMAGES[i]}
                                            altText={s.label}
                                            captionText={s.label}
                                            containerHeight="120px"
                                            containerWidth="100%"
                                            imageHeight="120px"
                                            imageWidth="100%"
                                            scaleOnHover={1.04}
                                            rotateAmplitude={8}
                                            showTooltip
                                        />
                                    </div>
                                    {/* Info */}
                                    <div className="flex flex-col items-center text-center gap-1 p-4">
                                        <div className="text-xl">{s.icon}</div>
                                        <div className="font-display text-2xl font-black text-gradient">{s.value}</div>
                                        <p className="text-white/40 text-xs font-body leading-snug">{s.label}</p>
                                    </div>
                                </div>
                            </DarkCard>
                        ))}
                    </div>
                </div>

                {/* ══════════════════════════════
                    2. ACTIVIDADES — grid 3x3
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                            <div className="p-6 flex flex-col flex-1">
                                                <h2 className="font-display text-xl font-black text-cf-white mb-1 text-center">
                                                    {activity.title}
                                                </h2>
                                                <p className="text-cf-white/40 text-sm text-center mb-4">{activity.subtitle}</p>

                                                <p className="text-cf-white/60 font-body text-sm leading-relaxed mb-5 flex-1">
                                                    {activity.description}
                                                </p>

                                                <ul className="space-y-1.5 mb-6">
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

                                                <Link
                                                    href={href}
                                                    target={isExternal ? "_blank" : undefined}
                                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-sm transition-all hover:opacity-80 mt-auto"
                                                    style={{
                                                        backgroundColor: `${activity.color}20`,
                                                        color: activity.color,
                                                        border: `1px solid ${activity.color}40`,
                                                    }}
                                                >
                                                    {isExternal ? "Inscribirse" : "Ver detalles"}
                                                    <ArrowRight size={13} />
                                                </Link>
                                            </div>

                                        </div>
                                    </BentoCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* ══════════════════════════════
                    3. ÚNETE AL EVENTO
                ══════════════════════════════ */}
                <div>
                    <SectionHeader eyebrow="Únete al evento" />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                        {/* Expositores */}
                        <DarkCard color="#c9a227" delay={0} className="sm:col-span-2">
                            <div className="p-6 min-h-[180px] flex flex-col justify-between h-full">
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
                        </DarkCard>

                        {/* Entradas */}
                        <DarkCard color="#ff6b9d" delay={0.1}>
                            <div className="p-6 min-h-[180px] flex flex-col justify-between h-full">
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
                                    className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-display font-bold rounded-xl hover:bg-white/10 transition-all text-sm mt-6 w-fit" style={{ padding: "16px 32px" }}
                                >
                                    Ver precios <ArrowRight size={13} />
                                </Link>
                            </div>
                        </DarkCard>
                    </div>

                    {/* Stats mini grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        <DarkCard color="#c9a227" delay={0.15}>
                            <div className="p-6 min-h-[140px] flex flex-col items-center justify-center text-center gap-2">
                                <Tag size={22} className="text-cf-yellow opacity-50 mb-1" />
                                <div className="font-display text-xl font-black text-gradient">120+</div>
                                <p className="text-white/35 text-xs">Marcas expositoras</p>
                            </div>
                        </DarkCard>

                        <DarkCard color="#c9a227" delay={0.2}>
                            <div className="p-6 min-h-[140px] flex flex-col items-center justify-center text-center gap-2">
                                <MapPin size={22} className="text-cf-yellow opacity-50 mb-1" />
                                <div className="font-display text-base font-black text-white">C.C. La 14</div>
                                <p className="text-white/35 text-xs">Pereira · Marzo 2026</p>
                            </div>
                        </DarkCard>

                        <DarkCard color="#ff6b9d" delay={0.25}>
                            <a
                                href="https://www.instagram.com/comicfestco"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-6 min-h-[140px] flex flex-col items-center justify-center text-center gap-2 h-full"
                            >
                                <Instagram size={22} className="text-pink-400 opacity-60 mb-1" />
                                <div className="font-display text-base font-black text-white">@comicfestco</div>
                                <p className="text-white/35 text-xs">57K+ seguidores</p>
                            </a>
                        </DarkCard>

                        <DarkCard color="#c9a227" delay={0.3}>
                            <div className="p-6 min-h-[140px] flex flex-col items-center justify-center text-center gap-2">
                                <div className="text-2xl">🎪</div>
                                <div className="font-display text-xl font-black text-gradient">15K+</div>
                                <p className="text-white/35 text-xs">Visitantes por edición</p>
                            </div>
                        </DarkCard>
                    </div>
                </div>

            </div>
        </section>
    );
}
