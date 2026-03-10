import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import type { Metadata } from "next";

// Code-split below-the-fold sections (no ssr:false — this is a Server Component)
const Stats = dynamic(() => import("@/components/sections/Stats"));
const ActivitiesPreview = dynamic(() => import("@/components/sections/ActivitiesPreview"));
const ExhibitorsPreview = dynamic(() => import("@/components/sections/ExhibitorsPreview"));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection"));

export const metadata: Metadata = {
  title: "Comicfest Colombia — El lugar donde la magia se hace realidad",
  description:
    "La convención de cultura pop más grande de Colombia. Superhéroes, cómics, videojuegos, cosplay, torneos y mucho más. Pereira, 13-15 de Marzo 2026.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ActivitiesPreview />
      <ExhibitorsPreview />
      <FaqSection />
    </>
  );
}
