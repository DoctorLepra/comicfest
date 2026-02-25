"use client";

import { useEffect, useRef } from "react";

interface LaserFlowProps {
  hue?: number;
  speed?: number;
  count?: number;
  opacity?: number;
}

export default function LaserFlow({
  hue = 50,
  speed = 2,
  count = 10,
  opacity = 0.75,
}: LaserFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const visibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Use device pixel ratio capped at 1.5 to save GPU
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = window.innerWidth;
    let H = window.innerHeight;

    const setSize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
    };
    setSize();

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    // Pause when tab/page not visible
    const onVisibility = () => { visibleRef.current = document.visibilityState === "visible"; };
    document.addEventListener("visibilitychange", onVisibility);

    // Pause when canvas not in viewport
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    interface Laser {
      x: number; y: number;
      vx: number; vy: number;
      length: number;
      width: number;
      hue: number;
      alpha: number;
      decay: number;
    }

    const spawn = (): Laser => {
      const angle = Math.random() * Math.PI * 2;
      const spd = (0.4 + Math.random() * 1.2) * speed;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        length: 60 + Math.random() * 200,
        width: 0.8 + Math.random() * 1.8,
        hue: hue + (Math.random() - 0.5) * 25,
        alpha: 0.3 + Math.random() * 0.55,
        decay: 0.004 + Math.random() * 0.005,
      };
    };

    const lasers: Laser[] = Array.from({ length: count }, spawn);

    // Target 30fps to halve CPU usage vs 60fps
    const TARGET_INTERVAL = 1000 / 30;

    const draw = (ts: number) => {
      animRef.current = requestAnimationFrame(draw);
      if (!visibleRef.current) return;
      const delta = ts - lastFrameRef.current;
      if (delta < TARGET_INTERVAL) return;
      lastFrameRef.current = ts - (delta % TARGET_INTERVAL);

      // Fade trail
      ctx.fillStyle = "rgba(10, 10, 10, 0.18)";
      ctx.fillRect(0, 0, W, H);

      for (const l of lasers) {
        const ex = l.x + l.vx / speed * l.length;
        const ey = l.y + l.vy / speed * l.length;

        const grad = ctx.createLinearGradient(l.x, l.y, ex, ey);
        grad.addColorStop(0, `hsla(${l.hue},100%,65%,0)`);
        grad.addColorStop(0.5, `hsla(${l.hue},100%,68%,${l.alpha * opacity})`);
        grad.addColorStop(1, `hsla(${l.hue},100%,75%,0)`);

        // Glow pass (wide, low alpha — no ctx.filter)
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = `hsla(${l.hue},100%,65%,${l.alpha * opacity * 0.25})`;
        ctx.lineWidth = l.width * 6;
        ctx.lineCap = "round";
        ctx.stroke();

        // Core line
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth = l.width;
        ctx.stroke();

        // Move
        l.x += l.vx;
        l.y += l.vy;
        l.alpha -= l.decay;

        if (l.alpha <= 0 || l.x < -250 || l.x > W + 250 || l.y < -250 || l.y > H + 250) {
          Object.assign(l, spawn());
        }
      }
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, [hue, speed, count, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block", willChange: "transform" }}
    />
  );
}
