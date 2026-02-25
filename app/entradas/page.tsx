import type { Metadata } from "next";
import EntradasPage from "./EntradasPage";

export const metadata: Metadata = {
  title: "Entradas",
  description:
    "Compra tus entradas para Comicfest Pereira 2026. General $20.000 · Parche x5 $85.000 · Full Pass $125.000.",
};

export default function Page() {
  return <EntradasPage />;
}
