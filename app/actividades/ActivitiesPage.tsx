"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ACTIVITIES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function ActivitiesPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
            Desde torneos de videojuegos hasta pasarelas de cosplay, Comicfest tiene todo lo que necesitas para vivir una experiencia épica.
          </p>
        </motion.div>

        {/* Activities grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group glass border border-cf-white/5 rounded-2xl overflow-hidden hover:border-cf-yellow/25 transition-all duration-300"
            >
              {/* Top accent */}
              <div className="h-1 w-full" style={{ backgroundColor: activity.color }} />

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-widest mb-3"
                      style={{
                        color: activity.color,
                        backgroundColor: `${activity.color}18`,
                        border: `1px solid ${activity.color}30`,
                      }}
                    >
                      {activity.badge}
                    </span>
                    <h2 className="font-display text-2xl font-black text-cf-white">
                      {activity.title}
                    </h2>
                    <p className="text-cf-white/40 text-sm mt-1">{activity.subtitle}</p>
                  </div>
                  <span className="text-5xl">{activity.icon}</span>
                </div>

                <p className="text-cf-white/60 font-body text-sm leading-relaxed mb-6">
                  {activity.description}
                </p>

                <ul className="space-y-2 mb-8">
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
                  href={`/actividades/${activity.slug}`}
                  className="inline-flex items-center gap-2 font-display font-bold text-sm transition-all duration-200 group-hover:gap-3"
                  style={{ color: activity.color }}
                >
                  Inscribirse <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
