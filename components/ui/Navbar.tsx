"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Ticket, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/actividades", label: "Actividades" },
  { href: "/agenda", label: "Agenda" },
  { href: "/entradas", label: "Entradas" },
  { href: "/expositores", label: "Expositores" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-cf-black/90 backdrop-blur-xl border-b border-cf-yellow/10"
            : "bg-transparent"
        )}
      >
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

            {/* CTA + burger */}
            <div className="flex items-center gap-3">
              <Link
                href="/entradas"
                className="hidden sm:flex items-center gap-2 bg-cf-yellow text-cf-black text-sm font-display font-bold px-5 py-2.5 rounded-lg hover:bg-cf-yellow-light transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Ticket size={16} />
                Entradas
              </Link>

              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2 text-cf-white/80 hover:text-cf-yellow transition-colors"
                aria-label="Menú"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-cf-black border-b border-cf-yellow/10 md:hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "px-4 py-3 text-base font-body font-medium rounded-lg transition-all duration-200",
                    pathname === href
                      ? "text-cf-yellow bg-cf-yellow/10 border border-cf-yellow/20"
                      : "text-cf-white/70 hover:text-cf-white hover:bg-cf-white/5"
                  )}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/entradas"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-cf-yellow text-cf-black text-sm font-display font-bold px-5 py-3 rounded-lg"
              >
                <Ticket size={16} />
                Comprar Entradas
              </Link>
              <Link
                href="/expositores/reserva"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 border border-cf-yellow/40 text-cf-yellow text-sm font-display font-bold px-5 py-3 rounded-lg"
              >
                <Map size={16} />
                Reservar Stand
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
