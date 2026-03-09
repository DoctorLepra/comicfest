"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACTIVITIES } from "@/lib/constants";
import { BentoCard } from "@/components/ui/MagicBento";
import Squares from "@/components/ui/Squares";
import TiltedCard from "@/components/ui/TiltedCard";

// Imágenes locales por actividad
const ACTIVITY_IMAGES: Record<string, string> = {
  "copa-cosplay": "/images/cosplay.png",
  kpop: "/images/kpop.png",
  esports: "/images/esports.png",
  "bruce-challenge": "/images/bruce.png",
  "glotoneria-challenge": "/images/glotoneria.png",
  "cubo-rubik": "/images/rubik.png",
};

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen" style={{ paddingTop: "80px" }}>

      {/* ── Hero header con Squares background ── */}
      <section className="relative overflow-hidden" style={{ height: "340px" }}>
        <div className="absolute inset-0">
          <Squares
            direction="diagonal"
            speed={0.16}
            borderColor="rgba(245, 197, 0, 0.15)"
            squareSize={48}
            hoverFillColor="rgba(245, 197, 0, 0.06)"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.85) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-4">
              Comicfest Pereira 2026
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-black text-cf-white leading-none mb-5">
              ACTIVIDADES
            </h1>
            <div className="w-16 h-1 bg-cf-yellow mx-auto mb-5" />
            <p className="text-cf-white/60 font-body text-base md:text-lg max-w-xl leading-relaxed">
              Copa Cosplay, Campeonato KPOP, Torneos Esports, Challenges y más.
              Vive una experiencia épica en cada rincón del evento.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Activity cards ── */}
      <div className="px-6 md:px-12 pb-20 pt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACTIVITIES.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <BentoCard accentColor={activity.color} delay={i * 0.06}>
                <div className="flex flex-col h-full min-h-[460px]">

                  {/* ── TiltedCard image area ── */}
                  <div className="relative" style={{ height: "220px" }}>
                    <TiltedCard
                      imageSrc={ACTIVITY_IMAGES[activity.slug]}
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
                    <h2
                      className="font-display text-xl font-black text-cf-white mb-1 text-center"
                      style={{ color: "#fff" }}
                    >
                      {activity.title}
                    </h2>
                    <p className="text-cf-white/40 text-sm text-center mb-4">{activity.subtitle}</p>

                    <p className="text-cf-white/60 font-body text-sm leading-relaxed mb-5 flex-1">
                      {activity.description}
                    </p>

                    <ul className="space-y-1.5 mb-6">
                      {activity.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-cf-white/50 text-sm font-body"
                        >
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
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-sm transition-all hover:opacity-80 mt-auto"
                      style={{
                        backgroundColor: `${activity.color}20`,
                        color: activity.color,
                        border: `1px solid ${activity.color}40`,
                      }}
                    >
                      {activity.slug === "copa-cosplay" || activity.slug === "kpop" ? (
                        <><span>Inscribirse</span> <ArrowRight size={13} /></>
                      ) : (
                        <><span>Ver detalles</span> <ArrowRight size={13} /></>
                      )}
                    </Link>
                  </div>

                </div>
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
