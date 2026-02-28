"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

const TYC_CONTENT = {
    "copa-cosplay": {
        title: "Términos y Condiciones — Copa Cosplay",
        returnLabel: "Inscribirme a Copa Cosplay",
        returnHref: "/actividades/copa-cosplay",
        sections: [
            {
                heading: "Generalidades",
                body: `Este concurso está dirigido a todos aquellos apasionados por el cosplay que quieran mostrar su talento y habilidades en este arte. Es de convocatoria nacional y dirigido a diferentes participantes de cualquier ubicación de Colombia.

Este concurso está organizado por COMICFEST y se desarrollará en PEREIRA RISARALDA el día domingo 15 de Marzo, en las instalaciones donde se realizará COMICFEST.

La única modalidad permitida será INDIVIDUAL.`,
            },
            {
                heading: "Reglas Generales — Modalidad Individual",
                body: `1. Pueden participar adultos de 18 años en adelante y adolescentes de los 15 años en adelante con permiso firmado por su acudiente, que también deberá acompañarlo en el concurso.

2. Pueden participar todos los personajes de ficción que aparezcan en anime, manga, videojuegos, cómics, cartoons, series y películas. No se permite la participación de personajes originales, fanarts, gijinka, fanzines ni gender vender o cantantes. El crossplay es permitido.

3. No está permitido el erocosplay.

4. Al ser un evento de carácter familiar está prohibido el uso de malas palabras, escenas de sexo explícito o violencia extrema, uso de drogas ilícitas o alcohol. La omisión de esta aclaración será causal de descalificación inmediata.

5. La falta de respeto entre participantes y/o con el staff de la organización será penalizado en la puntuación del participante hasta llegar a una descalificación dependiendo de su gravedad.

6. No podrán participar personas que estén o hayan estado vinculadas con COMICFEST ni su pareja o sus familiares hasta cuarto grado de consanguinidad. Tampoco participantes que hayan sido ganadores en ediciones inferiores a los 12 meses anteriores.

7. El cuidado permanente de los objetos personales tanto de cosplayers como de su staff es responsabilidad de estos. La organización no responde por pérdida de los mismos.

8. La inscripción al concurso no tendrá ningún costo, esta se debe realizar por medio del formulario establecido para esto. Cualquier inscripción realizada por otro medio no será válida.

9. El concurso se realizará con un mínimo de 15 participantes inscritos como cifra mínima.`,
            },
            {
                heading: "Modalidad de Presentación",
                body: `• El uso de armas de fuego, armas cortopunzantes, sustancias u objetos con fuego o que sean activados con el mismo; explosivos, pirotecnia de cualquier tipo, cualquier cosa que emitan chispas, flamas o humo producido por combustión o cualquier otro elemento que represente peligro para el cosplayer, staff o público son rotundamente prohibidos.

• La presencia del participante se evaluará mediante presencia en Pasarela que no deberá exceder los 2 minutos. Si por decisión del participante, desea vincular Props o Escenografía, tendrá 1:30 min para montaje y 1:30 min para desmontaje.

• Antes de las presentaciones el jurado evaluará los cosplays y props por lo que se darán puntos extra por llevar un portafolio donde se aprecie el proceso de elaboración.

• Está permitido tener trajes o props elaborados por personas diferentes al concursante, pero tendrá mayor puntuación aquellos elaborados por el concursante.

• Está prohibido bajarse del escenario durante la presentación y/o lanzar objetos fuera del escenario.

• Está permitido el uso de 1 staff o sombra, pero este deberá asumir el costo de su entrada al evento.`,
            },
            {
                heading: "Criterios de Evaluación",
                body: `Los criterios de evaluación serán de la siguiente manera:

• 50% Presentación escénica
• 50% Parentesco con el personaje (cosplay)

Estos porcentajes serán aplicados a diferentes ítems (fidelidad al personaje, originalidad de su presencia en Tarima/Pasarela, crafting, Elaboración autónoma de trajes y props) que llevarán un puntaje de 1 a 10 cada uno.`,
            },
            {
                heading: "Detalles Técnicos",
                body: `• El participante deberá llevar 2 copias del archivo de la presentación en USB el día del evento para cualquier eventualidad. No se permiten otros formatos.
• Los archivos deben ser en formato MP4.
• El escenario contará con sonido y pantalla tipo VideoWALL.`,
            },
            {
                heading: "Condiciones del Concurso",
                body: `• A todos los cosplayers se les entregará una acreditación o manilla personal e intransferible que garantizará el ingreso a la convención. Su staff o acompañantes deben pagar la entrada.
• El participante deberá presentarse en los horarios establecidos por la organización. El no cumplir con los horarios conlleva a una penalización en la puntuación final.
• La convocatoria del concurso estará abierta hasta el 06 de marzo 2026.`,
            },
            {
                heading: "Premiación",
                body: `1° Lugar: $500.000 + Obsequios
2° Lugar: $300.000 + Obsequios
3° Lugar: $200.000 + Obsequios

El premio se entrega únicamente al participante. En caso tal de ser menor de edad, el premio será entregado al acudiente que firma la autorización.

Como requisito de entrega se debe estar atento a las condiciones dispuestas por la organización, entre las cuales se encuentra: Presentación de RUT para legalización en bancarización y contar con cualquier tipo de cuenta de ahorros o corriente con su respectivo certificado bancario.

El total de la bolsa de premios acumula el valor de $2.000.000 representado en obsequios y dinero.

NOTA ACLARATORIA: La entrega de premiación está sujeta a cambios.`,
            },
        ],
    },
    kpop: {
        title: "Términos y Condiciones — Campeonato KPOP Grupal",
        returnLabel: "Inscribir mi equipo",
        returnHref: "/actividades/kpop",
        sections: [
            {
                heading: "Información General",
                body: `Tipo de evento: Competencia K-POP Comicfest Pereira 2026
Modalidad: Grupal
Cupos disponibles: Limitados
Fecha de competencia: Domingo 15 de Marzo

La competencia se llevará a cabo en 2 etapas.`,
            },
            {
                heading: "Primera Etapa",
                body: `• Presentación de TODOS los grupos inscritos y elección de los equipos a semifinal.
• La información del orden de presentación se dará ese mismo día.
• Después de finalizadas las presentaciones, los jurados cuentan con un tiempo de 15 a 30 minutos para elegir los equipos que pasan a los cuartos de final.`,
            },
            {
                heading: "Segunda Etapa (clasificados)",
                body: `• Presentación de los equipos semifinalistas, elección de finalistas.
• Presentación de los finalistas, elección del equipo ganador y protocolo de premiación.
• En esta etapa se enfrentan los 4 semifinalistas ante el público y jueces para determinar los ganadores del 1° y 2° lugar.`,
            },
            {
                heading: "Inscripción y Requisitos",
                body: `• La inscripción es GRATUITA para integrantes del grupo competidor. Acompañantes, familiares y espectadores deben presentar boleta de ingreso.

• El fonograma y coreografía con los que apliquen a la inscripción debe ser subido a YouTube y se debe adjuntar el link en el formulario. Debe ser la canción y coreografía preparada para el día de la presentación.

• Para el día de la competencia el grupo debe llevar en USB la canción de su coreografía. NO SE RECIBE MÚSICA DE CELULARES O AUDIOS SIMILARES. SOLO USB.

• Tamaño de equipo: mínimo 3 integrantes, máximo 8 integrantes.

• Podrán inscribirse desde los 14 años en adelante. Los menores de edad deben diligenciar el consentimiento informado junto a su acudiente.

• Solo se permite 1 (una) inscripción por grupo.

• Los integrantes NO deben estar presentes en más de 1 (un) equipo inscrito.

• Si al cierre de la fecha de inscripciones no existe la cifra mínima de 8 grupos inscritos, la competencia no se realizará.`,
            },
            {
                heading: "Responsabilidades",
                body: `• Los concursantes serán plenamente responsables por el traslado, gastos dentro de la ciudad, entrada al evento y viáticos monetarios que conlleven su participación.

• La organización no se hace responsable por objetos, indumentaria u obligaciones monetarias que impliquen la participación en el torneo.

• La organización no se responsabiliza por pérdida de accesorios, objetos personales o de valor dentro del evento.

• En caso de que la organización detecte cualquier tipo de saboteo, trampa o similar, tendrá la potestad de descalificar inmediatamente al participante y/o al grupo.`,
            },
            {
                heading: "Premiación",
                body: `1° Lugar: Bono por $500.000 + Obsequios
2° Lugar: Bono por $300.000 + Obsequios

El premio se entrega al líder del grupo. En caso de ser menor de edad, el premio será entregado al representante o acudiente del líder del equipo.

La organización solicitará: RUT, Certificado Bancario y Cédula del titular de la cuenta para legalizar la premiación monetaria.

El total de la bolsa de premios acumula el valor de $1.000.000 en obsequios y dinero.

NOTA ACLARATORIA: La entrega de premiación está sujeta a cambios.`,
            },
        ],
    },
};

export default function TycPage({ slug }: { slug: "copa-cosplay" | "kpop" }) {
    const content = TYC_CONTENT[slug];

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-3xl mx-auto px-6 md:px-10">

                {/* Back */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-10"
                >
                    <Link
                        href={content.returnHref}
                        className="inline-flex items-center gap-2 text-white/40 hover:text-cf-yellow text-sm font-display font-semibold transition-colors"
                    >
                        <ArrowLeft size={15} /> {content.returnLabel}
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-cf-yellow/10 border border-cf-yellow/20 flex items-center justify-center">
                            <Scale size={16} className="text-cf-yellow" />
                        </div>
                        <p className="text-cf-yellow text-[11px] font-display font-semibold tracking-[0.35em] uppercase">
                            Comicfest Pereira 2026
                        </p>
                    </div>
                    <h1 className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                        {content.title}
                    </h1>
                    <div className="h-px bg-cf-yellow/25 w-20 mb-6" />
                    <p className="text-white/40 text-sm font-body">
                        Por favor lee detenidamente estos términos antes de inscribirte. La aceptación de estos términos es requisito obligatorio para participar.
                    </p>
                </motion.div>

                {/* Sections */}
                <div className="space-y-10">
                    {content.sections.map((section, i) => (
                        <motion.div
                            key={section.heading}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                            className="glass border border-white/5 rounded-2xl p-8"
                        >
                            <h2 className="font-display text-lg font-black text-cf-yellow mb-4 uppercase tracking-wide">
                                {section.heading}
                            </h2>
                            <div className="text-white/65 font-body text-sm leading-relaxed whitespace-pre-line">
                                {section.body}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 flex justify-center"
                >
                    <Link
                        href={content.returnHref}
                        className="inline-flex items-center gap-2 bg-cf-yellow text-cf-black font-display font-black px-8 py-3.5 rounded-xl hover:bg-cf-yellow-light transition-all text-sm"
                    >
                        ← {content.returnLabel}
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
