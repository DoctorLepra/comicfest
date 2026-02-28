"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle, AlertCircle } from "lucide-react";
import { ACTIVITIES } from "@/lib/constants";
import CosplayForm from "./forms/CosplayForm";
import KpopForm from "./forms/KpopForm";
import GenericForm from "./forms/GenericForm";

export default function ActivityDetailPage({ slug }: { slug: string }) {
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
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-6 md:px-10">

                {/* Back */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-10"
                >
                    <Link
                        href="/actividades"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-cf-yellow text-sm font-display font-semibold transition-colors"
                    >
                        <ArrowLeft size={15} /> Todas las actividades
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-14"
                >
                    <div className="flex items-start gap-5 mb-6">
                        <span className="text-6xl">{activity.icon}</span>
                        <div>
                            <span
                                className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold uppercase tracking-widest mb-3"
                                style={{
                                    color: activity.color,
                                    backgroundColor: `${activity.color}18`,
                                    border: `1px solid ${activity.color}30`,
                                }}
                            >
                                {activity.badge}
                            </span>
                            <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-tight">
                                {activity.title}
                            </h1>
                            <p className="text-white/50 mt-1 font-body">{activity.subtitle}</p>
                        </div>
                    </div>
                    <div className="h-px w-full" style={{ backgroundColor: `${activity.color}40` }} />
                </motion.div>

                {/* Body: description + features + form */}
                <div className="grid md:grid-cols-5 gap-12">

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
                            <a
                                href={
                                    slug === "copa-cosplay"
                                        ? "https://www.comicfest.co/terminosycondiciones/copacosplay"
                                        : "https://www.comicfest.co/terminos-y-condiciones/campeonatokpop"
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-display font-semibold border border-white/10 text-white/40 hover:text-white/70 hover:border-white/25 rounded-lg px-4 py-2.5 transition-all"
                            >
                                <AlertCircle size={13} /> Leer Términos y Condiciones
                            </a>
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

            </div>
        </div>
    );
}
