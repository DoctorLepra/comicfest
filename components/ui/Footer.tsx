import Link from "next/link";
import { Instagram, Facebook, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { EVENT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative w-full bg-cf-black border-t border-cf-yellow/10">

      {/* ── Contenido principal ── */}
      <div className="flex flex-col px-6 md:px-12 py-20 gap-16">

        {/* Top: Brand + Nav + Evento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col items-start gap-5">
            <div>
              <h2 className="font-display text-3xl font-black text-cf-white">
                COMIC<span className="text-cf-yellow">FEST</span>
              </h2>
              <p className="text-cf-yellow/50 text-[10px] tracking-[0.35em] uppercase font-body mt-0.5">
                Colombia
              </p>
            </div>
            <p className="text-cf-white/45 font-body text-sm leading-relaxed max-w-sm">
              Una de las convenciones más grandes de Colombia. Más de 250.000 personas
              fanáticas de los superhéroes, cómics, videojuegos y la cultura pop.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href={EVENT.socialMedia.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-cf-white/40 hover:text-cf-yellow hover:border-cf-yellow/40 hover:bg-cf-yellow/5 transition-all duration-200"
              >
                <Instagram size={17} />
              </a>
              <a
                href={EVENT.socialMedia.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-cf-white/40 hover:text-cf-yellow hover:border-cf-yellow/40 hover:bg-cf-yellow/5 transition-all duration-200"
              >
                <Facebook size={17} />
              </a>
              <a
                href={`https://wa.me/57${EVENT.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-cf-white/40 hover:text-green-400 hover:border-green-400/40 hover:bg-green-400/5 transition-all duration-200"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-cf-white text-xs uppercase tracking-widest">
              Navegación
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/actividades/copa-cosplay", label: "Copa Cosplay" },
                { href: "/actividades/kpop", label: "Campeonato KPOP" },
                { href: "/prensa", label: "Prensa" },
                { href: "/expositores", label: "Expositores" },
                { href: "/trabaja-con-nosotros", label: "Trabaja con nosotros" },
                { href: "/entradas", label: "Entradas" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-cf-white/45 hover:text-cf-yellow text-sm font-body transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Evento */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-cf-white text-xs uppercase tracking-widest">
              Próximo Evento
            </h3>
            <div className="flex flex-col gap-4 text-sm font-body">
              <div className="flex gap-3 items-start group">
                <MapPin size={15} className="text-cf-yellow shrink-0 mt-0.5" />
                <div>
                  <p className="text-cf-white/70 font-medium group-hover:text-cf-white transition-colors">{EVENT.venue}</p>
                  <p className="text-cf-white/35 text-xs mt-0.5">{EVENT.address}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start group">
                <Clock size={15} className="text-cf-yellow shrink-0 mt-0.5" />
                <div>
                  <p className="text-cf-white/70 font-medium group-hover:text-cf-white transition-colors">{EVENT.dates} · {EVENT.year}</p>
                  <p className="text-cf-white/35 text-xs mt-0.5">{EVENT.openingTime} – {EVENT.lastEntry}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start group">
                <Mail size={15} className="text-cf-yellow shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/57${EVENT.whatsapp}`}
                  className="text-cf-white/45 hover:text-cf-yellow transition-colors text-sm"
                >
                  WhatsApp: {EVENT.whatsapp}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Separador */}
        <div className="h-px bg-gradient-to-r from-transparent via-cf-yellow/15 to-transparent" />

        {/* Bottom: copyright + legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cf-white/25 text-xs font-body">
            © 2026 Comicfest Colombia. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs font-body">
            <Link
              href="/terminos"
              className="text-cf-white/25 hover:text-cf-yellow/60 transition-colors duration-200"
            >
              Términos y condiciones
            </Link>
            <Link
              href="/privacidad"
              className="text-cf-white/25 hover:text-cf-yellow/60 transition-colors duration-200"
            >
              Política de privacidad
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
