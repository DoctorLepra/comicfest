"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket } from "lucide-react";

import clsx from "clsx";
import { gsap } from "gsap";
import { StaggeredMenuPanel } from "@/components/ui/StaggeredMenu";

const NAV_LINKS = [
  { href: "/", label: "Inicio", ariaLabel: "Ir a inicio" },
  { href: "/actividades", label: "Actividades", ariaLabel: "Ver actividades" },
  { href: "/agenda", label: "Agenda", ariaLabel: "Ver agenda del evento" },
  { href: "/entradas", label: "Entradas", ariaLabel: "Comprar entradas" },
  { href: "/expositores", label: "Expositores", ariaLabel: "Información para expositores" },
];

const SOCIAL_ITEMS = [
  { label: "Instagram", link: "https://www.instagram.com/comicfestco" },
  { label: "Facebook", link: "https://www.facebook.com/comicfestco" },
  { label: "TikTok", link: "https://www.tiktok.com/@comicfestco" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // GSAP refs for the toggle button animation
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(["Menú", "Cerrar"]);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);



  // Init GSAP state on mount
  useEffect(() => {
    const icon = iconRef.current;
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    const btn = toggleBtnRef.current;
    if (!icon || !plusH || !plusV || !btn) return;
    gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
    gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
    gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
    gsap.set(btn, { color: "#ffffff" });
  }, []);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    spinTweenRef.current = gsap.to(icon, {
      rotate: opening ? 225 : 0,
      duration: opening ? 0.8 : 0.35,
      ease: opening ? "power4.out" : "power3.inOut",
      overwrite: "auto",
    });
  }, []);

  const animateColor = useCallback((opening: boolean) => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    colorTweenRef.current?.kill();
    colorTweenRef.current = gsap.to(btn, {
      color: opening ? "#f5c500" : "#ffffff",
      delay: 0.18,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menú" : "Cerrar";
    const targetLabel = opening ? "Cerrar" : "Menú";
    const cycles = 3;
    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menú" ? "Cerrar" : "Menú";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);

    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
      onComplete: () => {
        // Reset to a clean single-item state so the label is always correct
        setTextLines([targetLabel]);
        gsap.set(inner, { yPercent: 0 });
      },
    });
  }, []);

  const handleToggle = useCallback(() => {
    const target = !menuOpen;
    setMenuOpen(target);
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [menuOpen, animateIcon, animateColor, animateText]);

  const handleClose = useCallback(() => {
    if (!menuOpen) return;
    setMenuOpen(false);
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [menuOpen, animateIcon, animateColor, animateText]);

  // Close on route change
  useEffect(() => {
    handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {/* ── Staggered Sidebar Panel (only the panel, no internal button) ── */}
      <StaggeredMenuPanel
        position="left"
        open={menuOpen}
        onClose={handleClose}
        items={NAV_LINKS}
        socialItems={SOCIAL_ITEMS}
        displaySocials={true}
        displayItemNumbering={false}
        colors={["#1a1000", "#2a1f00"]}
        accentColor="#f5c500"
      />

      {/* ── Top header bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cf-black/95 backdrop-blur-xl border-b border-cf-yellow/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <span className="font-display text-xl md:text-2xl font-black text-cf-white tracking-tight group-hover:text-cf-yellow transition-colors duration-200">
                  COMIC
                  <span className="text-cf-yellow">FEST</span>
                </span>
                <span className="block text-[9px] text-cf-yellow/60 tracking-[0.3em] uppercase -mt-1 font-body">
                  Colombia
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "px-4 py-2 text-sm font-body font-medium rounded-lg transition-all duration-200",
                    pathname === href
                      ? "text-cf-yellow bg-cf-yellow/10"
                      : "text-cf-white/70 hover:text-cf-white hover:bg-cf-white/5"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right side: Entradas CTA + Sidebar toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/entradas"
                className="hidden sm:flex items-center gap-2 bg-cf-yellow text-cf-black text-sm font-display font-bold px-5 py-2.5 rounded-lg hover:bg-cf-yellow-light transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Ticket size={16} />
                Entradas
              </Link>

              {/* GSAP-animated toggle button — directly in the navbar */}
              <button
                ref={toggleBtnRef}
                onClick={handleToggle}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
                aria-controls="staggered-menu-panel"
                type="button"
                className="sm-toggle"
                style={{ color: "#ffffff" }}
              >
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    height: "1em",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                  aria-hidden="true"
                >
                  <span
                    ref={textInnerRef}
                    style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
                  >
                    {textLines.map((l, i) => (
                      <span
                        key={i}
                        style={{ display: "block", height: "1em", lineHeight: 1 }}
                      >
                        {l}
                      </span>
                    ))}
                  </span>
                </span>
                <span
                  ref={iconRef}
                  style={{
                    position: "relative",
                    width: 14,
                    height: 14,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-hidden="true"
                >
                  <span
                    ref={plusHRef}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: "100%",
                      height: 2,
                      background: "currentColor",
                      borderRadius: 2,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                  <span
                    ref={plusVRef}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: "100%",
                      height: 2,
                      background: "currentColor",
                      borderRadius: 2,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
