"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { ACTIVITIES } from "@/lib/constants";
import CosplayForm from "./forms/CosplayForm";
import KpopForm from "./forms/KpopForm";
import GenericForm from "./forms/GenericForm";
import Particles from "@/components/ui/Particles";
import EsportsPage from "./EsportsPage";

export default function ActivityDetailPage({ slug }: { slug: string }) {
    // Esports gets its own dedicated tournament page
    if (slug === "esports") return <EsportsPage />;

    const activity = ACTIVITIES.find((a) => a.slug === slug);

    if (!activity) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6">
                <p className="text-cf-yellow font-display text-sm tracking-widest uppercase mb-4">404</p>
                <h1 className="font-display text-4xl font-black text-white mb-6">Actividad no encontrada</h1>
                <Link href="/actividades" className="text-cf-yellow hover:underline flex items-center gap-2 font-display">
                    <ArrowLeft size={16} /> Ver todas las actividades
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ paddingTop: "80px" }}>

            {/* ── Hero con Particles background ── */}
            <section className="relative overflow-hidden" style={{ height: "340px" }}>
                {/* Particles canvas */}
                <Particles
                    particleCount={180}
                    particleSpread={8}
                    speed={0.08}
                    particleColors={[activity.color, "#ffffff", "#f5c500"]}
                    alphaParticles={true}
                    particleBaseSize={80}
                    sizeRandomness={1.2}
                    moveParticlesOnHover={true}
                    particleHoverFactor={0.4}
                />

                {/* Vignette overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.9) 100%)`,
                    }}
                />

                {/* Centered header */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65 }}
                    >
                        <span
                            className="inline-block px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-widest mb-4"
                            style={{
                                color: activity.color,
                                backgroundColor: `${activity.color}20`,
                                border: `1px solid ${activity.color}40`,
                            }}
                        >
                            {activity.badge}
                        </span>
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <span className="text-5xl">{activity.icon}</span>
                            <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-none">
                                {activity.title.toUpperCase()}
                            </h1>
                        </div>
                        <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: activity.color }} />
                        {slug === "copa-cosplay" || slug === "kpop" ? (
                            <div className="flex flex-col items-center">
                                <p className="text-white font-display font-bold text-lg max-w-xl mx-auto mb-6">
                                    ¡Porfavor lee los terminos y condiciones {slug === "kpop" ? "del campeonato" : "de la copa"} antes de llenar el formulario!
                                </p>
                                <div className="flex items-center justify-center gap-4">
                                    <Link
                                        href={slug === "kpop" ? "/terminos/campeonato-kpop" : "/terminos/copa-cosplay"}
                                        className="px-8 py-3.5 rounded-[2rem] font-display font-bold text-[15px] transition-all hover:scale-105"
                                        style={{ backgroundColor: "#1e1e1e", color: activity.color }}
                                    >
                                        Leer TyC
                                    </Link>
                                    <button
                                        onClick={() => {
                                            document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                        className="px-8 py-3.5 rounded-[2rem] font-display font-bold text-[15px] flex items-center gap-2 transition-all hover:scale-105"
                                        style={{ backgroundColor: "#1e1e1e", color: activity.color }}
                                    >
                                        Inscribete <ArrowLeft size={16} className="-rotate-90" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-white/55 font-body text-base max-w-lg mx-auto">
                                {activity.subtitle}
                            </p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* ── Back link ── */}
            <div className="max-w-5xl mx-auto px-6 md:px-10 pt-8">
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-10"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-display font-black text-sm px-5 py-3 rounded-xl transition-all hover:scale-[1.03]"
                        style={{ backgroundColor: "rgba(245,197,0,0.15)", color: "#f5c500", border: "1px solid rgba(245,197,0,0.40)" }}
                    >
                        <ArrowLeft size={15} /> Volver al inicio
                    </Link>
                </motion.div>

                {/* ── Body: description + features + form ── */}
                {slug === "copa-cosplay" || slug === "kpop" ? (
                    <div className="max-w-3xl mx-auto pb-20 flex flex-col gap-10">
                        {/* Top: Description in glassy panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="rounded-2xl p-7 flex flex-col items-center text-center w-full"
                            style={{
                                background: "rgba(20,20,20,0.97)",
                                border: `1px solid ${activity.color}30`,
                                boxShadow: `0 0 32px ${activity.color}12`,
                            }}
                        >
                            <h2 className="font-display text-xl font-black text-white mb-3">Descripción</h2>
                            <p className="text-white/60 font-body text-sm leading-relaxed mb-8 max-w-2xl">
                                {activity.description}
                            </p>

                            <h2 className="font-display text-xl font-black text-white mb-3">Detalles</h2>
                            <ul className="space-y-2 text-left inline-block mb-4">
                                {activity.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-white/55 text-sm font-body">
                                        <span
                                            className="w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ backgroundColor: activity.color }}
                                        />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Bottom: Form */}
                        <motion.div
                            id="form-section"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="w-full scroll-mt-28"
                        >
                            {slug === "copa-cosplay" && <CosplayForm accentColor={activity.color} />}
                            {slug === "kpop" && <KpopForm accentColor={activity.color} />}
                        </motion.div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-5 gap-12 pb-20">

                        {/* Left: info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="md:col-span-2"
                        >
                            <h2 className="font-display text-lg font-black text-white mb-3">Descripción</h2>
                            <p className="text-white/60 font-body text-sm leading-relaxed mb-8">
                                {activity.description}
                            </p>

                            <h2 className="font-display text-lg font-black text-white mb-3">Detalles</h2>
                            <ul className="space-y-2 mb-8">
                                {activity.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-white/55 text-sm font-body">
                                        <span
                                            className="w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ backgroundColor: activity.color }}
                                        />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* TyC link */}
                            {(slug === "copa-cosplay" || slug === "kpop") && (
                                <Link
                                    href="/terminos"
                                    className="inline-flex items-center gap-2 text-sm font-display font-bold px-5 py-3 rounded-xl transition-all hover:opacity-80"
                                    style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.70)", border: "1px solid rgba(255,255,255,0.15)" }}
                                >
                                    <AlertCircle size={14} /> Términos y Condiciones
                                </Link>
                            )}
                        </motion.div>

                        {/* Right: form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="md:col-span-3"
                        >
                            {slug === "copa-cosplay" && <CosplayForm accentColor={activity.color} />}
                            {slug === "kpop" && <KpopForm accentColor={activity.color} />}
                            {slug !== "copa-cosplay" && slug !== "kpop" && (
                                <GenericForm activity={activity} accentColor={activity.color} />
                            )}
                        </motion.div>

                    </div>
                )}
            </div>

        </div>
    );
}
