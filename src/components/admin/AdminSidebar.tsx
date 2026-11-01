"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  Handshake,
  Mail,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/orders", label: "Commandes", icon: Package },
  { href: "/admin/partners", label: "Partenaires", icon: Handshake },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
] as const;

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function AdminSidebar({
  open,
  onClose,
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-ink-200 bg-white transition-transform duration-300 lg:relative lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-ink-100 px-5">
          <Link href="/admin" className="flex items-center gap-2.5" onClick={onClose}>
            <span className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-ink-200 bg-white">
              <Image
                src="/logo.jpg"
                alt="TRACOLI"
                width={64}
                height={64}
                className="size-full object-cover"
              />
            </span>
            <div className="leading-none">
              <span className="block text-[13px] font-extrabold tracking-tight text-tracoli-500">
                TRACOLI
              </span>
              <span className="block text-[9px] font-semibold tracking-widest text-ink-400 uppercase">
                Admin
              </span>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden">
            <X className="size-5 text-ink-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all ${
                  active
                    ? "bg-tracoli-50 text-tracoli-600 shadow-sm"
                    : "text-ink-500 hover:bg-ink-50 hover:text-ink-800"
                }`}
              >
                <item.icon className={`size-[18px] ${active ? "text-tracoli-500" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-ink-100 p-3">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink-500 transition-all hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="size-[18px]" />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}
