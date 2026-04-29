"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  ClipboardList, 
  FileText, 
  ShieldCheck,
  LogOut,
  Menu,
  X
} from "lucide-react";
import clsx from "clsx";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SIDEBAR_LINKS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Eventos", href: "/dashboard/eventos", icon: Calendar },
  { name: "CRM", href: "/dashboard/crm", icon: Users },
  { name: "Formularios", href: "/dashboard/formularios", icon: ClipboardList },
  { name: "CMS", href: "/dashboard/cms", icon: FileText },
  { name: "Usuarios", href: "/dashboard/usuarios", icon: ShieldCheck },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      
      // Forced password change check
      if (user.user_metadata?.requires_password_change && !pathname.includes("/update-password")) {
        router.push("/dashboard/update-password");
      }
    };
    
    checkUser();
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center justify-center border-b border-white/5">
        <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
          <Image 
            src="/images/pantalla-de-carga.png" 
            alt="Comicfest Logo" 
            width={120} 
            height={30} 
            className="object-contain"
          />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {SIDEBAR_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          const Icon = link.icon;
          
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-display font-medium",
                isActive 
                  ? "bg-cf-yellow/10 text-cf-yellow border border-cf-yellow/20" 
                  : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <Icon size={18} className={clsx(isActive ? "text-cf-yellow" : "text-white/40")} />
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 text-sm font-display font-medium"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#060606] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-[#0a0a0a] border-r border-white/5 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a] border-b border-white/5 z-30 flex items-center justify-between px-4">
        <Image 
          src="/images/pantalla-de-carga.png" 
          alt="Comicfest Logo" 
          width={100} 
          height={24} 
          className="object-contain"
        />
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-white/70 hover:text-white"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={clsx(
          "md:hidden fixed inset-0 z-20 transition-all duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
          onClick={() => setMobileOpen(false)}
        />
        <aside 
          className={clsx(
            "absolute top-0 bottom-0 left-0 w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SidebarContent />
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto pt-16 md:pt-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,197,0,0.03),transparent_40%)] pointer-events-none" />
        {children}
      </main>
    </div>
  );
}
