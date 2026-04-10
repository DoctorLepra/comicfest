"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, ChevronDown } from "lucide-react";
import clsx from "clsx";

/* ── Navbar structure (fiel a comicfest.co) ── */
type NavItem =
  | { label: string; href: string; dropdown?: never }
  | {
      label: string;
      href?: never;
      dropdown: { label: string; href: string }[];
    };

const NAV: NavItem[] = [
  {
    label: "ACTIVIDADES",
    dropdown: [
      { label: "Copa Cosplay", href: "/actividades/copa-cosplay" },
      { label: "Campeonato KPOP", href: "/actividades/kpop" },
    ],
  },
  {
    label: "RELACIONES PÚBLICAS",
    dropdown: [{ label: "Prensa", href: "/prensa" }],
  },
  { label: "EXPOSITORES", href: "/expositores" },
  { label: "TRABAJA CON NOSOTROS", href: "/trabaja-con-nosotros" },
];

/* ── Dropdown item ── */
function DropdownMenu({
  items,
  visible,
}: {
  items: { label: string; href: string }[];
  visible: boolean;
}) {
  return (
    <div
      className={clsx(
        "absolute top-full left-1/2 -translate-x-1/2 mt-1 min-w-[200px] rounded-xl overflow-hidden transition-all duration-200 origin-top z-50",
        visible
          ? "opacity-100 scale-y-100 pointer-events-auto"
          : "opacity-0 scale-y-95 pointer-events-none"
      )}
      style={{
        background: "rgba(12,12,12,0.98)",
        border: "1px solid rgba(245,197,0,0.18)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,197,0,0.06)",
      }}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center px-5 py-3 text-sm font-display font-semibold text-white/70 hover:text-cf-yellow hover:bg-cf-yellow/5 transition-all duration-150 border-b border-white/[0.04] last:border-0"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

/* ── Desktop nav item ── */
function NavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const isActive =
    item.dropdown
      ? item.dropdown.some((d) => pathname.startsWith(d.href))
      : pathname === item.href;

  if (item.dropdown) {
    return (
      <div
        ref={ref}
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            "flex items-center gap-1 px-3 py-2 text-[11px] font-display font-bold tracking-wide uppercase rounded-lg transition-all duration-200 select-none",
            isActive
              ? "text-cf-yellow bg-cf-yellow/10"
              : "text-white/70 hover:text-white hover:bg-white/5"
          )}
        >
          {item.label}
          <ChevronDown
            size={12}
            strokeWidth={2.5}
            className={clsx(
              "transition-transform duration-200 mt-px",
              open && "rotate-180"
            )}
          />
        </button>
        <DropdownMenu items={item.dropdown} visible={open} />
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={clsx(
        "px-3 py-2 text-[11px] font-display font-bold tracking-wide uppercase rounded-lg transition-all duration-200",
        isActive
          ? "text-cf-yellow bg-cf-yellow/10"
          : "text-white/70 hover:text-white hover:bg-white/5"
      )}
    >
      {item.label}
    </Link>
  );
}

/* ── Mobile accordion item ── */
function MobileNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const isActive =
    item.dropdown
      ? item.dropdown.some((d) => pathname.startsWith(d.href))
      : pathname === (item as { href: string }).href;

  if (item.dropdown) {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            "w-full flex items-center justify-between px-4 py-3 text-xs font-display font-bold tracking-widest uppercase transition-colors",
            isActive ? "text-cf-yellow" : "text-white/50"
          )}
        >
          {item.label}
          <ChevronDown
            size={12}
            className={clsx("transition-transform duration-200", open && "rotate-180")}
          />
        </button>
        {open && (
          <div className="flex flex-col border-t border-white/5">
            {item.dropdown.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className={clsx(
                  "px-7 py-2.5 text-xs font-body transition-colors",
                  pathname === d.href ? "text-cf-yellow" : "text-white/40 hover:text-white/70"
                )}
              >
                {d.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={(item as { href: string }).href}
      className={clsx(
        "px-4 py-3 text-xs font-display font-bold tracking-widest uppercase transition-colors",
        isActive ? "text-cf-yellow" : "text-white/50 hover:text-white/70"
      )}
    >
      {item.label}
    </Link>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed left-0 right-0 z-50"
      style={{ top: scrolled ? "1rem" : "0", transition: "top 0.3s cubic-bezier(0.4,0,0.2,1)" }}
    >
      {/*
        Pill: inline style garantiza que margin-left y margin-right
        animen exactamente igual desde ambos lados → recoge simétrico.
      */}
      <div
        style={
          scrolled
            ? {
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                marginLeft: "4%",
                marginRight: "4%",
                borderRadius: "9999px",
                background: "rgba(8,8,8,0.85)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.55)",
              }
            : {
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                marginLeft: "0%",
                marginRight: "0%",
                borderRadius: "0",
                background: "rgba(12,12,12,0.85)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                /* Mismo border shorthand que en scrolled, pero transparente */
                border: "1px solid transparent",
                boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.05)",
              }
        }
      >
        {/* Inner content */}
        <div
          className="flex items-center justify-between gap-4"
          style={
            scrolled
              ? { transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", padding: "0 1.5rem", height: "3.5rem" }
              : { transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem", height: "4rem" }
          }
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div>
              <span className="font-display text-xl md:text-2xl font-black text-cf-white tracking-tight group-hover:text-cf-yellow transition-colors duration-200">
                COMIC<span className="text-cf-yellow">FEST</span>
              </span>
              <span className="block text-[9px] text-cf-yellow/60 tracking-[0.3em] uppercase -mt-1 font-body">
                Colombia
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {NAV.map((item) => (
              <NavItem key={item.label} item={item} pathname={pathname} />
            ))}
          </nav>

          {/* Right: login + mobile toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-display font-bold transition-all duration-200 border hover:scale-[1.03]"
              style={{
                backgroundColor: "rgba(245,197,0,0.08)",
                borderColor: "rgba(245,197,0,0.30)",
                color: "#f5c500",
              }}
            >
              <LogIn size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline">Iniciar sesión</span>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              <span
                className={clsx(
                  "w-5 h-0.5 bg-white/70 rounded-full transition-all duration-200",
                  mobileOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={clsx(
                  "w-5 h-0.5 bg-white/70 rounded-full transition-all duration-200",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={clsx(
                  "w-5 h-0.5 bg-white/70 rounded-full transition-all duration-200",
                  mobileOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — border only when open */}
      <div
        className={clsx(
          "md:hidden flex flex-col overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-[500px] border-t border-white/5" : "max-h-0"
        )}
        style={{ background: "rgba(10,10,10,0.99)" }}
      >
        {NAV.map((item) => (
          <MobileNavItem key={item.label} item={item} pathname={pathname} />
        ))}
      </div>
    </header>
  );
}
