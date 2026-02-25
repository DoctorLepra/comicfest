import Link from "next/link";
import { Instagram, Facebook, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { EVENT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-cf-black border-t border-cf-yellow/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-black text-cf-white mb-1">
              COMIC<span className="text-cf-yellow">FEST</span>
            </h2>
            <p className="text-cf-yellow/60 text-xs tracking-[0.3em] uppercase font-body mb-4">Colombia</p>
            <p className="text-cf-white/50 font-body text-sm leading-relaxed max-w-sm">
              Una de las convenciones más grandes de Colombia. Más de 250.000 personas fanáticas de los superhéroes, cómics, videojuegos y la cultura pop.
            </p>
            <div className="flex gap-4 mt-6">
              <a href={EVENT.socialMedia.instagram} target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-cf-yellow/20 flex items-center justify-center text-cf-white/50 hover:text-cf-yellow hover:border-cf-yellow/50 transition-all duration-200">
                <Instagram size={18} />
              </a>
              <a href={EVENT.socialMedia.facebook} target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-cf-yellow/20 flex items-center justify-center text-cf-white/50 hover:text-cf-yellow hover:border-cf-yellow/50 transition-all duration-200">
                <Facebook size={18} />
              </a>
              <a href={`https://wa.me/57${EVENT.whatsapp}`} target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-cf-yellow/20 flex items-center justify-center text-cf-white/50 hover:text-cf-yellow hover:border-cf-yellow/50 transition-all duration-200">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-display font-bold text-cf-white text-sm uppercase tracking-widest mb-4">Navegación</h3>
            <ul className="space-y-3">
              {[
                { href: "/actividades", label: "Actividades" },
                { href: "/agenda", label: "Agenda" },
                { href: "/entradas", label: "Entradas" },
                { href: "/expositores", label: "Expositores" },
                { href: "/prensa", label: "Prensa" },
                { href: "/trabaja-con-nosotros", label: "Trabaja con nosotros" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-cf-white/50 hover:text-cf-yellow text-sm font-body transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Evento */}
          <div>
            <h3 className="font-display font-bold text-cf-white text-sm uppercase tracking-widest mb-4">Próximo Evento</h3>
            <div className="space-y-3 text-sm font-body text-cf-white/50">
              <div className="flex gap-2">
                <MapPin size={16} className="text-cf-yellow shrink-0 mt-0.5" />
                <div>
                  <p className="text-cf-white/70 font-medium">{EVENT.venue}</p>
                  <p>{EVENT.address}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Clock size={16} className="text-cf-yellow shrink-0 mt-0.5" />
                <div>
                  <p className="text-cf-white/70 font-medium">{EVENT.dates} · {EVENT.year}</p>
                  <p>{EVENT.openingTime} – {EVENT.lastEntry}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Mail size={16} className="text-cf-yellow shrink-0 mt-0.5" />
                <a href={`https://wa.me/57${EVENT.whatsapp}`} className="hover:text-cf-yellow transition-colors">
                  WhatsApp: {EVENT.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cf-yellow/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cf-white/30 text-xs font-body">
            © 2026 Comicfest Colombia. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs font-body text-cf-white/30">
            <Link href="/terminos" className="hover:text-cf-yellow/60 transition-colors">Términos y condiciones</Link>
            <Link href="/privacidad" className="hover:text-cf-yellow/60 transition-colors">Política de privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
