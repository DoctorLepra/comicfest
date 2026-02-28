"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LaserFlowRB from "./LaserFlowRB";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 300);
          return 100;
        }
        return p + Math.random() * 2 + 1;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cf-black overflow-hidden"
        >
          {/* LaserFlow React Bits background */}
          <div className="absolute inset-0">
            <LaserFlowRB
              color="#ffffff"
              horizontalBeamOffset={0.0}
              verticalBeamOffset={0.0}
              horizontalSizing={0.5}
              verticalSizing={2}
              wispDensity={1}
              wispSpeed={15}
              wispIntensity={5}
              flowSpeed={0.35}
              flowStrength={0.25}
              fogIntensity={0.45}
              fogScale={0.3}
              decay={1.1}
              falloffStart={1.2}
              fogFallSpeed={0.6}
            />
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cf-black/30 to-cf-black/80 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
            {/* Logo image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative"
            >
              <Image
                src="/images/logoCF.png"
                alt="Comicfest Colombia"
                width={320}
                height={160}
                className="object-contain drop-shadow-[0_0_40px_rgba(245,197,0,0.5)] w-[220px] md:w-[320px]"
                priority
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-cf-white/50 font-body text-sm tracking-widest uppercase"
            >
              El lugar donde la magia se hace realidad
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "260px" }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative"
            >
              <div className="h-px w-[260px] bg-cf-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-white/60 via-white to-white/80 rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-white/50 text-xs font-display tracking-widest mt-3 text-center">
                {Math.min(Math.round(progress), 100)}%
              </p>
            </motion.div>

            {/* Decorative dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-cf-yellow/30" />
          <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-cf-yellow/30" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-cf-yellow/30" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-cf-yellow/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
