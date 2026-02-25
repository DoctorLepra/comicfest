import type { Metadata } from "next";
import StandsReservaPage from "./StandsReservaPage";

export const metadata: Metadata = {
  title: "Reserva tu Stand — Expositores",
  description:
    "Selecciona y reserva tu stand en Comicfest Pereira 2026. Accede al mapa interactivo y elige la ubicación perfecta para tu marca.",
};

export default function Page() {
  return <StandsReservaPage />;
}
