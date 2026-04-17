"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(245,197,0,0.4)]"
      style={{
        background: "rgba(245,197,0,0.15)",
        border: "1px solid rgba(245,197,0,0.40)",
        color: "#f5c500",
        backdropFilter: "blur(10px)",
      }}
    >
      <ArrowUp size={18} strokeWidth={2.5} />
    </button>
  );
}
