import type { Metadata } from "next";
import ActivitiesPage from "./ActivitiesPage";

export const metadata: Metadata = {
  title: "Actividades",
  description:
    "Conoce todas las actividades de Comicfest Colombia: Copa Cosplay, Campeonato KPOP, Torneos Esports, Bruce Challenge, Glotonería Challenge y más.",
};

export default function Page() {
  return <ActivitiesPage />;
}
