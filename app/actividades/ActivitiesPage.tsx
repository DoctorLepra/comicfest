"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACTIVITIES } from "@/lib/constants";
import { BentoCard } from "@/components/ui/MagicBento";

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-3">
            Comicfest Pereira 2026
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black text-cf-white mb-4">
            ACTIVIDADES
          </h1>
          <div className="w-16 h-1 bg-cf-yellow mb-6" />
          <p className="text-cf-white/60 font-body text-lg max-w-2xl leading-relaxed">
            Copa Cosplay, Campeonato KPOP, Torneos Esports, Challenges y más.
            Vive una experiencia épica en cada rincón de Comicfest.
          </p>
        </motion.div>

        {/* Magic Bento grid — 6 actividades */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((activity, i) => {

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <BentoCard accentColor={activity.color} delay={i * 0.06}>
                  <div className="p-7 flex flex-col h-full min-h-[300px]">

                    {/* Top: badge + icon */}
                    <div className="flex items-start justify-between mb-5">
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold uppercase tracking-widest"
                        style={{
                          color: activity.color,
                          backgroundColor: `${activity.color}18`,
                          border: `1px solid ${activity.color}30`,
                        }}
                      >
                        {activity.badge}
                      </span>
                      <span className="text-4xl">{activity.icon}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-2xl font-black text-cf-white mb-1">
                      {activity.title}
                    </h2>
                    <p className="text-cf-white/40 text-sm mb-4">{activity.subtitle}</p>

                    {/* Description */}
                    <p className="text-cf-white/60 font-body text-sm leading-relaxed mb-5 flex-1">
                      {activity.description}
                    </p>

                    {/* Features */}
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

                    {/* CTA */}
                    <div className="flex items-center gap-3 flex-wrap mt-auto">
                      <Link
                        href={`/actividades/${activity.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-sm transition-all hover:opacity-80"
                        style={{
                          backgroundColor: `${activity.color}20`,
                          color: activity.color,
                          border: `1px solid ${activity.color}40`,
                        }}
                      >
                        {activity.slug === "copa-cosplay" || activity.slug === "kpop"
                          ? <>Inscribirse <ArrowRight size={13} /></>
                          : <>Ver detalles <ArrowRight size={13} /></>}
                      </Link>
                    </div>
                  </div>
                </BentoCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
