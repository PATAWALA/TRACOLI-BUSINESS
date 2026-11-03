"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Handshake,
  Mail,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Demandes", icon: Users },
  { href: "/admin/partners", label: "Partenaires", icon: Handshake },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
] as const;

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  onLogout: () => void;
}

export default function AdminSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-ink-100 px-4">
        <Link
          href="/admin"
          className="flex items-center gap-2.5 overflow-hidden"
          onClick={onMobileClose}
        >
          <span className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-ink-200 bg-white">
            <Image
              src="/logo.jpg"
              alt="TRACOLI"
              width={64}
              height={64}
              className="size-full object-cover"
            />
          </span>
          {!collapsed && (
            <div className="leading-none whitespace-nowrap">
              <span className="block text-[13px] font-extrabold tracking-tight text-tracoli-500">
                TRACOLI
              </span>
              <span className="block text-[9px] font-semibold tracking-widest text-ink-400 uppercase">
                Admin Panel
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all ${
                collapsed ? "justify-center" : ""
              } ${
                active
                  ? "bg-tracoli-50 text-tracoli-600 shadow-sm"
                  : "text-ink-500 hover:bg-ink-50 hover:text-ink-800"
              }`}
            >
              <item.icon
                className={`size-[18px] shrink-0 ${active ? "text-tracoli-500" : ""}`}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: collapse toggle + logout */}
      <div className="shrink-0 space-y-1 border-t border-ink-100 p-3">
        <button
          onClick={onToggle}
          className="hidden w-full items-center gap-3 rounded-xl px-3 py-2 text-[12px] font-medium text-ink-400 transition-all hover:bg-ink-50 hover:text-ink-600 lg:flex"
        >
          {collapsed ? (
            <ChevronsRight className="mx-auto size-[18px]" />
          ) : (
            <>
              <ChevronsLeft className="size-[18px]" />
              <span>Réduire</span>
            </>
          )}
        </button>
        <button
          onClick={onLogout}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink-500 transition-all hover:bg-red-50 hover:text-red-600 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="size-[18px] shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-ink-200 bg-white transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={onMobileClose}
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-lg text-ink-400 hover:bg-ink-50"
        >
          <X className="size-5" />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex lg:flex-col lg:shrink-0 border-r border-ink-200 bg-white transition-all duration-300 ${
          collapsed ? "lg:w-[72px]" : "lg:w-64"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
