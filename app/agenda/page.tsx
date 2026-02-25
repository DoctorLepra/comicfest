import type { Metadata } from "next";
import AgendaPage from "./AgendaPage";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Cronograma oficial de Comicfest Pereira 2026. Conoce los horarios de los torneos, competencias y shows del 13 al 15 de Marzo.",
};

export default function Page() {
  return <AgendaPage />;
}
