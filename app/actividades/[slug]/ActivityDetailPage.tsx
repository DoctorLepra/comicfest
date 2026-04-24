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

    // Si es KPOP, usamos el amarillo de la marca para las tarjetas y formularios
    const accentColor = slug === "kpop" ? "#f5c500" : activity.color;


    return (
        <div className="min-h-screen" style={{ paddingTop: "80px" }}>

            {/* ── Hero con Particles background ── */}
            <section className="relative overflow-hidden" style={{ height: "420px" }}>
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
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65 }}
                    >

                        <div className="flex items-center justify-center gap-3 mb-3">
                            <span className="text-5xl">{activity.icon}</span>
                            <h1 className="font-display text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none text-white drop-shadow-2xl">
                                {activity.title}
                            </h1>
                        </div>
                        {slug === "copa-cosplay" || slug === "kpop" ? (
                            <div className="flex flex-col items-center mt-12">
                                <p className="text-white font-display font-bold text-lg max-w-xl mx-auto activity-header-spacing">
                                    ¡Porfavor lee los terminos y condiciones {slug === "kpop" ? "del campeonato" : "de la copa"} antes de llenar el formulario!
                                </p>
                                <div className="flex items-center justify-center gap-4 activity-button-spacing">
                                    <Link
                                        href={slug === "kpop" ? "/terminos/campeonato-kpop" : "/terminos/copa-cosplay"}
                                        className="px-8 py-3.5 rounded-[2rem] font-display font-bold text-[15px] transition-all hover:scale-105"
                                        style={{ backgroundColor: "#1e1e1e", color: accentColor }}
                                    >
                                        Leer TyC
                                    </Link>
                                    <button
                                        onClick={() => {
                                            document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                        className="px-8 py-3.5 rounded-[2rem] font-display font-bold text-[15px] flex items-center gap-2 transition-all hover:scale-105"
                                        style={{ backgroundColor: "#1e1e1e", color: accentColor }}
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
                <div className="mb-10 h-[46px] w-full" />

                {/* ── Body: description + features + form ── */}
                {slug === "copa-cosplay" || slug === "kpop" ? (
                    <div className="max-w-5xl mx-auto pb-20 flex flex-col gap-10">
                        {/* Top: Description & Details in 2-column grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-32 xl:gap-40 w-full mb-10"
                        >
                            {/* Column 1: Descripción */}
                            <div className="flex flex-col items-start text-left">
                                <h2 className="font-display text-2xl font-black text-white mb-6 uppercase tracking-tight">Descripción</h2>
                                <p className="text-white/60 font-display text-lg md:text-xl leading-relaxed">
                                    {activity.description}
                                </p>
                            </div>

                            {/* Column 2: Detalles */}
                            <div className="flex flex-col items-start text-left">
                                <h2 className="font-display text-2xl font-black text-white mb-6 uppercase tracking-tight">Detalles</h2>
                                <ul className="space-y-4">
                                    {activity.features.map((f) => (
                                        <li key={f} className="flex items-center gap-3 text-white/55 text-base font-body">
                                            <span
                                                className="w-2 h-2 rounded-full shrink-0"
                                                style={{ backgroundColor: accentColor }}
                                            />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Bottom: Form */}
                        <motion.div
                            id="form-section"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="w-full scroll-mt-28"
                        >
                            {slug === "copa-cosplay" && <CosplayForm accentColor={accentColor} />}
                            {slug === "kpop" && <KpopForm accentColor={accentColor} />}
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
                                            style={{ backgroundColor: accentColor }}
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
                            {slug === "copa-cosplay" && <CosplayForm accentColor={accentColor} />}
                            {slug === "kpop" && <KpopForm accentColor={accentColor} />}
                            {slug !== "copa-cosplay" && slug !== "kpop" && (
                                <GenericForm activity={activity} accentColor={accentColor} />
                            )}
                        </motion.div>

                    </div>
                )}
            </div>

        </div>
    );
}
