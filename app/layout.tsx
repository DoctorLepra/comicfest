import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import PageLoader from "@/components/ui/PageLoader";
import ClientLayout from "@/components/ui/ClientLayout";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: {
    default: "Comicfest Colombia — El lugar donde la magia se hace realidad",
    template: "%s | Comicfest Colombia",
  },
  description:
    "Una de las convenciones más grandes de Colombia. Superhéroes, cómics, videojuegos, tecnología, cosplay y mucho más. Próxima edición: Pereira, 13-15 de Marzo de 2026.",
  keywords: [
    "comicfest",
    "colombia",
    "comics",
    "videojuegos",
    "cosplay",
    "kpop",
    "esports",
    "convención",
    "pereira",
    "geek",
    "anime",
  ],
  openGraph: {
    title: "Comicfest Colombia — Pereira 2026",
    description:
      "La convención de cultura pop más grande de Colombia. 13-15 de Marzo, Centro Comercial La 14, Pereira.",
    siteName: "Comicfest Colombia",
    locale: "es_CO",
    type: "website",
  },
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-cf-black text-cf-white font-body antialiased">
        <PageLoader />
        <Navbar />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
