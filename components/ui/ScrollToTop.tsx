"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Instagram, Facebook, MessageCircle } from "lucide-react";
import { EVENT } from "@/lib/constants";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-center gap-3">
      {/* Redes sociales (solo en móvil) */}
      <div className="flex md:hidden flex-col items-center gap-3">
        <a
          href={EVENT.socialMedia.facebook}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95"
          style={{
            background: "rgba(245,197,0,0.1)",
            border: "1px solid rgba(245,197,0,0.25)",
            color: "#f5c500",
            backdropFilter: "blur(10px)",
          }}
        >
          <Facebook size={16} />
        </a>
        <a
          href={EVENT.socialMedia.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95"
          style={{
            background: "rgba(245,197,0,0.1)",
            border: "1px solid rgba(245,197,0,0.25)",
            color: "#f5c500",
            backdropFilter: "blur(10px)",
          }}
        >
          <Instagram size={16} />
        </a>
        <a
          href={`https://wa.me/57${EVENT.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95"
          style={{
            background: "rgba(245,197,0,0.1)",
            border: "1px solid rgba(245,197,0,0.25)",
            color: "#f5c500",
            backdropFilter: "blur(10px)",
          }}
        >
          <MessageCircle size={16} />
        </a>
      </div>

      {/* Botón de subir */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver arriba"
        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(245,197,0,0.4)] active:scale-95"
        style={{
          background: "rgba(245,197,0,0.15)",
          border: "1px solid rgba(245,197,0,0.40)",
          color: "#f5c500",
          backdropFilter: "blur(10px)",
        }}
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
