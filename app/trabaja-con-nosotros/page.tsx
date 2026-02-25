import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trabaja con nosotros",
  description: "Únete al equipo de Comicfest Colombia. Oportunidades de trabajo y voluntariado.",
};

export default function TrabajaPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-cf-yellow text-xs font-display font-semibold tracking-[0.4em] uppercase mb-3">
          Únete al equipo
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-black text-cf-white mb-4">TRABAJA CON<br />NOSOTROS</h1>
        <div className="w-16 h-1 bg-cf-yellow mb-10" />

        <div className="glass border border-cf-white/8 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-cf-white/60 font-body text-lg mb-6">
            ¿Te apasiona la cultura pop y quieres ser parte del equipo Comicfest? Escríbenos y cuéntanos cómo puedes contribuir a hacer del evento la mejor experiencia para todos.
          </p>
          <a
            href="https://wa.me/573244120444"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-cf-yellow text-cf-black font-display font-black px-8 py-4 rounded-xl hover:bg-cf-yellow-light transition-all duration-200 hover:scale-105"
          >
            Contáctanos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
