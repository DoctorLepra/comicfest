import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prensa",
  description: "Sala de prensa oficial de Comicfest Colombia. Información para medios y periodistas.",
};

export default function PrensaPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-3">
          Medios y comunicación
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-black text-cf-white mb-4">PRENSA</h1>
        <div className="w-16 h-1 bg-cf-yellow mb-10" />

        <div className="glass border border-cf-white/8 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-cf-white/60 font-body text-lg mb-6">
            Si eres periodista, influencer o representas un medio de comunicación y quieres cubrir Comicfest Colombia, contáctanos para gestionar tu acreditación de prensa.
          </p>
          <a
            href="https://wa.me/573244120444"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-cf-yellow text-cf-black font-display font-black px-8 py-4 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-105"
          >
            Solicitar acreditación de prensa
          </a>
        </div>
      </div>
    </div>
  );
}
