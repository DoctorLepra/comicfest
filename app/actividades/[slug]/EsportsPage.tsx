"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";
import { BentoCard } from "@/components/ui/MagicBento";
import TiltedCard from "@/components/ui/TiltedCard";
import Particles from "@/components/ui/Particles";
import ElectricBorder from "@/components/ui/ElectricBorder";

const TOURNAMENTS = [
    {
        id: "mortal-kombat",
        title: "Mortal Kombat",
        subtitle: "Brutality Tournament",
        description: "Enfréntate en los combates más épicos. Clasificatorio 1v1, sistema de eliminación doble.",
        image: "/images/mk.png",
        color: "#f5c500",
        icon: "",
        spots: "32 cupos",
        prize: "Premio especial",
    },
    {
        id: "league-of-legends",
        title: "League of Legends",
        subtitle: "Nexus Cup Comicfest",
        description: "Demuestra tu dominio en la Grieta del Invocador. Formato 5v5 equipos. Cupos limitados.",
        image: "/images/lol.png",
        color: "#00d4ff",
        icon: "",
        spots: "16 equipos",
        prize: "Premio en efectivo",
    },
    {
        id: "valorant",
        title: "Valorant",
        subtitle: "Agent Showdown",
        description: "Táctica y puntería se unen en este torneo de Valorant. Equipos de 5, formato Swiss.",
        image: "/images/valorant.png",
        color: "#ff4655",
        icon: "",
        spots: "16 equipos",
        prize: "Premio en efectivo",
    },
    {
        id: "free-fire",
        title: "Free Fire",
        subtitle: "Battle Royale Clash",
        description: "Solo los mejores sobreviven. Torneo Battle Royale en escuadras de 4. Solo un equipo queda en pie.",
        image: "/images/freefire.png",
        color: "#ff8c00",
        icon: "",
        spots: "20 escuadras",
        prize: "Premio especial",
    },
    {
        id: "cod-mobile",
        title: "COD Mobile",
        subtitle: "Call of Duty Mobile Cup",
        description: "Acción táctica en tu móvil. Equipos de 5 en modalidad Multijugador clásico.",
        image: "/images/cod.png",
        color: "#76b900",
        icon: "",
        spots: "16 equipos",
        prize: "Premio especial",
    },
    {
        id: "lol-wildrift",
        title: "LoL Wild Rift",
        subtitle: "Wild Rift Arena",
        description: "League of Legends en móvil. Equipos de 5, formato liga con playoffs. ¡Demuestra tu rango!",
        image: "/images/wildrift.png",
        color: "#c89b3c",
        icon: "",
        spots: "16 equipos",
        prize: "Premio en efectivo",
    },
];

export default function EsportsPage() {
    return (
        <div className="min-h-screen" style={{ paddingTop: "80px" }}>

            {/* ── Hero con Particles ── */}
            <section className="relative overflow-hidden" style={{ height: "340px" }}>
                <Particles
                    particleCount={180}
                    particleSpread={8}
                    speed={0.08}
                    particleColors={["#00d4ff", "#f5c500", "#ffffff"]}
                    alphaParticles={true}
                    particleBaseSize={80}
                    sizeRandomness={1.2}
                    moveParticlesOnHover={true}
                    particleHoverFactor={0.4}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.9) 100%)",
                    }}
                />
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65 }}
                    >
                        <span
                            className="inline-block px-3 py-1 rounded-full text-[11px] font-display font-bold uppercase tracking-widest mb-4"
                            style={{ color: "#00d4ff", backgroundColor: "#00d4ff18", border: "1px solid #00d4ff30" }}
                        >
                            TORNEO
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl font-black text-cf-white leading-none mb-3">
                            TORNEOS ESPORTS
                        </h1>
                        <div className="w-16 h-1 bg-cf-yellow mx-auto mb-4" />
                        <p className="text-cf-white/60 font-body text-base max-w-xl">
                            Nexus Cup Comicfest · Demuestra tus habilidades en los mejores juegos del momento
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Back link ── */}
            <div className="px-6 md:px-12 pt-8 pb-2">
                <Link
                    href="/actividades"
                    className="inline-flex items-center gap-2 text-cf-white/40 hover:text-cf-yellow text-sm font-display font-semibold transition-colors"
                >
                    <ArrowLeft size={14} /> Volver a actividades
                </Link>
            </div>

            {/* ── Tournament grid ── */}
            <div className="px-6 md:px-12 pb-24 pt-8">
                <div className="flex items-center gap-3 mb-8">
                    <Trophy size={20} className="text-cf-yellow" />
                    <h2 className="font-display text-2xl font-black text-white">Juegos disponibles</h2>
                    <span className="text-cf-white/30 text-sm font-body">— Inscripciones próximamente</span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {TOURNAMENTS.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.6 }}
                        >
                            <ElectricBorder color={t.color} speed={0.8} chaos={0.01} borderRadius={16} className="w-full">
                                <BentoCard accentColor={t.color} delay={i * 0.07}>
                                    <div className="flex flex-col h-full min-h-[420px]">

                                        {/* ── TiltedCard game cover ── */}
                                        <div className="relative" style={{ height: "220px" }}>
                                            <TiltedCard
                                                imageSrc={t.image}
                                                altText={t.title}
                                                captionText={t.title}
                                                containerHeight="220px"
                                                containerWidth="100%"
                                                imageHeight="220px"
                                                imageWidth="100%"
                                                scaleOnHover={1.04}
                                                rotateAmplitude={8}
                                                showTooltip
                                            />
                                        </div>

                                        {/* ── Card content ── */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex items-center justify-between mb-3">
                                                <span
                                                    className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold uppercase tracking-widest"
                                                    style={{ color: t.color, backgroundColor: `${t.color}18`, border: `1px solid ${t.color}30` }}
                                                >
                                                    {t.spots}
                                                </span>
                                                <span className="text-2xl">{t.icon}</span>
                                            </div>

                                            <h3 className="font-display text-xl font-black text-white text-center mb-1">
                                                {t.title}
                                            </h3>
                                            <p className="text-cf-white/40 text-xs text-center mb-3 font-display">{t.subtitle}</p>

                                            <p className="text-cf-white/55 font-body text-sm leading-relaxed mb-5 flex-1">
                                                {t.description}
                                            </p>

                                            {/* Prize + CTA row */}
                                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.06]">
                                                <span className="text-xs font-body text-cf-white/35 flex items-center gap-1">
                                                    <Trophy size={11} style={{ color: t.color }} /> {t.prize}
                                                </span>
                                                <span
                                                    className="text-xs font-display font-bold flex items-center gap-1"
                                                    style={{ color: t.color }}
                                                >
                                                    Próximamente <ArrowRight size={11} />
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </BentoCard>
                            </ElectricBorder>
                        </motion.div>
                    ))}
                </div>

                {/* Info bottom note */}
                <div className="mt-12 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center">
                    <p className="text-cf-white/40 text-sm font-body mb-2">
                        Las inscripciones a los torneos estarán disponibles próximamente.
                    </p>
                    <p className="text-cf-white/25 text-xs font-body">
                        Cupos limitados por torneo · Más información en nuestro WhatsApp 3244120444
                    </p>
                </div>
            </div>

        </div>
    );
}
