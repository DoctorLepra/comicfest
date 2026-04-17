"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/ui/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const NO_FOOTER_ROUTES = ["/login", "/registro"];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showFooter = !NO_FOOTER_ROUTES.includes(pathname);

  return (
    <>
      <main>{children}</main>
      {showFooter && <Footer />}
      <ScrollToTop />
    </>
  );
}
