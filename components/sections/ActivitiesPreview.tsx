"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACTIVITIES } from "@/lib/constants";

export default function ActivitiesPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-3">
            Lo que te espera
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-cf-white">
            ACTIVIDADES
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {ACTIVITIES.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`group relative rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 cursor-pointer ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
              style={{
                background: "linear-gradient(135deg, rgba(20,20,20,0.97) 0%, rgba(30,30,30,0.95) 100%)",
                border: `1px solid ${activity.color}30`,
                boxShadow: `0 0 24px ${activity.color}10`,
              }}
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 20% 50%, ${activity.color}10 0%, transparent 60%)`,
                }}
              />

              {/* Badge */}
              <span
                className="inline-block px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-widest mb-4"
                style={{
                  color: activity.color,
                  backgroundColor: `${activity.color}18`,
                  border: `1px solid ${activity.color}30`,
                }}
              >
                {activity.badge}
              </span>

              {/* Icon */}
              <div className="text-4xl mb-4">{activity.icon}</div>

              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl font-black text-cf-white mb-1 group-hover:text-gradient transition-all duration-300">
                {activity.title}
              </h3>
              <p className="text-cf-white/40 text-sm font-body mb-4">{activity.subtitle}</p>

              {/* Description */}
              <p className="text-cf-white/60 text-sm font-body leading-relaxed mb-6 line-clamp-2">
                {activity.description}
              </p>

              {/* Features */}
              <ul className="space-y-1.5 mb-6">
                {activity.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-cf-white/50 text-xs font-body">
                    <span className="w-1 h-1 rounded-full bg-cf-yellow/60 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <Link
                href={`/actividades/${activity.slug}`}
                className="inline-flex items-center gap-1.5 text-cf-yellow text-sm font-display font-semibold group-hover:gap-3 transition-all duration-200"
              >
                Ver más
                <ArrowRight size={14} />
              </Link>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-20 h-20 opacity-10 rounded-bl-[60px]"
                style={{ backgroundColor: activity.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/actividades"
            className="flex items-center gap-2 border border-cf-yellow/30 text-cf-white font-display font-bold px-8 py-4 rounded-xl hover:border-cf-yellow/60 hover:bg-cf-yellow/5 transition-all duration-200"
          >
            Ver todas las actividades
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
