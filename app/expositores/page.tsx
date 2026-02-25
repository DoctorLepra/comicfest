import type { Metadata } from "next";
import ExpositoresPage from "./ExpositoresPage";

export const metadata: Metadata = {
  title: "Expositores",
  description:
    "Sé parte de Comicfest Colombia como expositor. Accede a más de 15.000 visitantes por edición. Reserva tu stand hoy.",
};

export default function Page() {
  return <ExpositoresPage />;
}
